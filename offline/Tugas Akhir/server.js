// server.js

const express = require('express');
const mysql = require('mysql2/promise'); // Menggunakan promise untuk async/await
const path = require('path');
require('dotenv').config('/.env'); // Untuk memuat variabel dari .env

const app = express();
const PORT = 3001;

// Konfigurasi Database
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Mengakses file statis (CSS)

// Set View Engine ke EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fungsi untuk mendapatkan koneksi DB
async function getConnection() {
    try {
        return await mysql.createConnection(dbConfig);
    } catch (err) {
        console.error('Koneksi Database Gagal:', err);
        // Dalam aplikasi produksi, Anda bisa menghentikan server atau memberikan respons error yang sesuai
        throw new Error('Gagal terhubung ke database.');
    }
}

// --- ROUTING ---

// 1. Halaman Utama (Cek Status Laundry)
app.get('/', (req, res) => {
    res.render('index', { statusData: null, error: null });
});

// 2. Cek Status Pesanan
app.post('/check-status', async (req, res) => {
    const { no_pesanan } = req.body;
    let connection;
    try {
        connection = await getConnection();
        
        const query = `
            SELECT 
                p.no_pesanan, p.status_pesanan, p.tanggal_pesanan, p.tanggal_selesai, p.total_harga,
                a.nama AS nama_pelanggan, a.no_hp
            FROM pesanan p
            JOIN akun a ON p.id_akun = a.id
            WHERE p.no_pesanan = ?
        `;
        const [rows] = await connection.execute(query, [no_pesanan]);

        if (rows.length > 0) {
            res.render('index', { statusData: rows[0], error: null });
        } else {
            res.render('index', { statusData: null, error: 'Nomor pesanan tidak ditemukan.' });
        }

    } catch (err) {
        console.error('Error saat cek status:', err);
        res.render('index', { statusData: null, error: 'Terjadi kesalahan server saat memeriksa status.' });
    } finally {
        if (connection) connection.end();
    }
});


// 3. Halaman Invoice (Pembayaran)
app.get('/invoice/:no_pesanan', async (req, res) => {
    const { no_pesanan } = req.params;
    let connection;

    try {
        connection = await getConnection();

        // Query Detail Pesanan, Layanan, dan Pelanggan
        const detailQuery = `
            SELECT 
                p.no_pesanan, p.tanggal_pesanan, p.tanggal_selesai, p.total_harga, p.status_pesanan,
                a.nama AS nama_pelanggan, a.alamat, a.no_hp,
                dp.berat_kg, dp.subtotal,
                l.nama_layanan, l.harga_per_kg
            FROM pesanan p
            JOIN akun a ON p.id_akun = a.id
            JOIN detail_pesanan dp ON p.no_pesanan = dp.no_pesanan
            JOIN layanan l ON dp.id_layanan = l.id_layanan
            WHERE p.no_pesanan = ?
        `;
        
        // Query Informasi Pembayaran
        const paymentQuery = `
            SELECT metode, jumlah_bayar, tanggal_bayar 
            FROM pembayaran 
            WHERE no_pesanan = ?
            ORDER BY tanggal_bayar DESC
            LIMIT 1
        `;

        const [details] = await connection.execute(detailQuery, [no_pesanan]);
        const [payments] = await connection.execute(paymentQuery, [no_pesanan]);

        if (details.length === 0) {
            return res.status(404).render('error', { message: 'Invoice dengan nomor pesanan tersebut tidak ditemukan.' });
        }

        const invoiceData = {
            pesanan: details[0],
            details: details, // Berisi semua detail layanan
            pembayaran: payments.length > 0 ? payments[0] : null // Info pembayaran terbaru
        };

        res.render('invoice', { invoice: invoiceData });

    } catch (err) {
        console.error('Error saat menampilkan invoice:', err);
        res.status(500).render('error', { message: 'Terjadi kesalahan server saat memuat invoice.' });
    } finally {
        if (connection) connection.end();
    }
});

// 4. Halaman Formulir Pesanan Baru
app.get('/order/new', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        // Ambil daftar layanan untuk ditampilkan di formulir
        const [layanan] = await connection.execute('SELECT * FROM layanan');
        res.render('new_order', { layanan: layanan, message: null, error: null });
    } catch (err) {
        console.error('Error saat memuat layanan:', err);
        res.status(500).render('error', { message: 'Gagal memuat daftar layanan.' });
    } finally {
        if (connection) connection.end();
    }
});

// 5. Proses Penambahan Pesanan Baru
app.post('/order/new', async (req, res) => {
    const {
        nama_pelanggan, no_hp, alamat,
        id_layanan, berat_kg,
        pass // Password sementara untuk akun baru
    } = req.body;

    let connection;

    // Anggap berat_kg adalah array string, perlu diubah ke number
    const beratArray = Array.isArray(berat_kg) ? berat_kg.map(b => parseFloat(b)) : [parseFloat(berat_kg)];
    const layananArray = Array.isArray(id_layanan) ? id_layanan : [id_layanan];

    if (!nama_pelanggan || !no_hp || layananArray.some(l => !l) || beratArray.some(b => isNaN(b) || b <= 0)) {
        return res.status(400).render('error', { message: 'Data pelanggan atau detail layanan tidak lengkap/valid.' });
    }

    try {
        connection = await getConnection();
        await connection.beginTransaction(); // Mulai transaksi

        // --- 1. Cek atau Buat Akun Pelanggan ---
        let id_akun = `CUST-${Math.random().toString(36).substring(2, 8).toUpperCase()}`; // Generate ID unik

        // Cari apakah pelanggan sudah ada berdasarkan no_hp (simulasi sederhana)
        let [existingAccount] = await connection.execute('SELECT id FROM akun WHERE no_hp = ?', [no_hp]);
        
        if (existingAccount.length > 0) {
            id_akun = existingAccount[0].id;
        } else {
            // Jika akun baru, buat akun baru
            const passwordHash = pass || '12345'; // Gunakan password default jika tidak diberikan
            const insertAkunQuery = `
                INSERT INTO akun (id, nama, pass, alamat, no_hp, status_akun)
                VALUES (?, ?, ?, ?, ?, 'Customer')
            `;
            await connection.execute(insertAkunQuery, [id_akun, nama_pelanggan, passwordHash, alamat || 'N/A', no_hp]);
        }
        
        // --- 2. Buat Pesanan Baru ---
        const no_pesanan = `FCL-${Date.now().toString().slice(-5)}`; // Generate No. Pesanan sederhana
        const status_pesanan = 'Menunggu Diproses';
        const tanggal_pesanan = new Date();
        
        const insertPesananQuery = `
            INSERT INTO pesanan (no_pesanan, id_akun, status_pesanan, tanggal_pesanan)
            VALUES (?, ?, ?, ?)
        `;
        await connection.execute(insertPesananQuery, [no_pesanan, id_akun, status_pesanan, tanggal_pesanan]);

        // --- 3. Masukkan Detail Pesanan dan Hitung Total Harga ---
        let total_harga = 0;
        let max_estimasi_hari = 0;

        for (let i = 0; i < layananArray.length; i++) {
            const currentIdLayanan = layananArray[i];
            const currentBerat = beratArray[i];

            // Ambil detail layanan (harga/kg dan estimasi)
            const [layananDetail] = await connection.execute(
                'SELECT harga_per_kg, estimasi_hari FROM layanan WHERE id_layanan = ?', 
                [currentIdLayanan]
            );

            if (layananDetail.length === 0) throw new Error(`Layanan ${currentIdLayanan} tidak ditemukan.`);

            const harga_per_kg = layananDetail[0].harga_per_kg;
            const estimasi_hari = layananDetail[0].estimasi_hari;
            const subtotal = harga_per_kg * currentBerat;

            total_harga += subtotal;
            if (estimasi_hari > max_estimasi_hari) {
                max_estimasi_hari = estimasi_hari;
            }

            // Masukkan ke detail_pesanan
            const insertDetailQuery = `
                INSERT INTO detail_pesanan (no_pesanan, id_layanan, berat_kg, subtotal)
                VALUES (?, ?, ?, ?)
            `;
            await connection.execute(insertDetailQuery, [no_pesanan, currentIdLayanan, currentBerat, subtotal]);
        }

        // --- 4. Update Pesanan dengan Total Harga dan Tanggal Selesai ---
        const tanggal_selesai = new Date();
        tanggal_selesai.setDate(tanggal_selesai.getDate() + max_estimasi_hari);

        const updatePesananQuery = `
            UPDATE pesanan SET total_harga = ?, tanggal_selesai = ? WHERE no_pesanan = ?
        `;
        await connection.execute(updatePesananQuery, [total_harga, tanggal_selesai, no_pesanan]);


        await connection.commit(); // Selesaikan transaksi
        
        // Redirect ke halaman invoice untuk konfirmasi
        res.redirect(`/invoice/${no_pesanan}`); 

    } catch (err) {
        console.error('Error saat memproses pesanan baru:', err.message || err);
        if (connection) await connection.rollback(); // Batalkan jika ada error
        res.status(500).render('error', { message: 'Gagal memproses pesanan: ' + (err.message || 'Kesalahan Database') });
    } finally {
        if (connection) connection.end();
    }
});

// 5. Endpoint untuk Simulasi Pembayaran
app.post('/process-payment', async (req, res) => {
    const { no_pesanan, metode_pembayaran, jumlah_bayar } = req.body;
    let connection;
    
    // Perlu validasi input lebih lanjut di aplikasi nyata

    try {
        connection = await getConnection();
        await connection.beginTransaction();

        // 1. Masukkan data pembayaran
        const paymentInsertQuery = `
            INSERT INTO pembayaran (no_pesanan, metode, jumlah_bayar, tanggal_bayar)
            VALUES (?, ?, ?, NOW())
        `;
        await connection.execute(paymentInsertQuery, [no_pesanan, metode_pembayaran, jumlah_bayar]);

        // 2. Update status pesanan (Anggap lunas jika jumlah bayar >= total_harga)
        const [pesananResult] = await connection.execute('SELECT total_harga FROM pesanan WHERE no_pesanan = ?', [no_pesanan]);
        const totalHarga = pesananResult[0].total_harga;

        if (jumlah_bayar >= totalHarga) {
             // Update status hanya jika total_harga di DB sudah sesuai (ini kerangka dasar)
             const updateStatusQuery = 'UPDATE pesanan SET status_pesanan = ? WHERE no_pesanan = ?';
             await connection.execute(updateStatusQuery, ['Lunas', no_pesanan]);
        }
       
        await connection.commit();
        res.redirect(`/invoice/${no_pesanan}`); // Redirect kembali ke invoice

    } catch (err) {
        console.error('Error saat proses pembayaran:', err);
        if (connection) await connection.rollback();
        res.status(500).render('error', { message: 'Gagal memproses pembayaran. Silakan coba lagi.' });
    } finally {
        if (connection) connection.end();
    }
});


// Listener
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});