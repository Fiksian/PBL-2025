const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Konfigurasi Koneksi Database
const db = mysql.createConnection({
    host: 'localhost', // Ganti dengan host database Anda
    user: 'root',      // Ganti dengan user database Anda
    password: '123456789', // Ganti dengan password database Anda
    database: 'proyek' // Pastikan database 'proyek' sudah dibuat
});

// Koneksi ke database
db.connect(err => {
    if (err) {
        console.error('Koneksi database gagal: ' + err.stack);
        return;
    }
    console.log('Koneksi database berhasil dengan ID: ' + db.threadId);
});

// Middleware
// Menggunakan body-parser untuk memproses data dari form (urlencoded) dan JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Menyajikan file statis (seperti index.html)
app.use(express.static(path.join(__dirname, "public")));

// --- CRUD untuk Tabel AKUN (Contoh CRUD) ---

// 1. CREATE (Membuat Akun Baru)
app.post('/akun', (req, res) => {
    const { id, nama, pass, alamat, no_hp, status_akun } = req.body;
    const query = 'INSERT INTO akun (id, nama, pass, alamat, no_hp, status_akun) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [id, nama, pass, alamat, no_hp, status_akun], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal membuat akun.');
        }
        res.status(201).send(`Akun **${nama}** berhasil dibuat.`);
    });
});

// 2. READ (Membaca Semua Akun)
app.get('/akun', (req, res) => {
    const query = 'SELECT * FROM akun';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal mengambil data akun.');
        }
        // Mengembalikan data sebagai JSON
        res.json(results);
    });
});

// 3. READ by ID (Membaca Akun Berdasarkan ID)
app.get('/akun/:id', (req, res) => {
    const akunId = req.params.id;
    const query = 'SELECT * FROM akun WHERE id = ?';
    db.query(query, [akunId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal mengambil data akun.');
        }
        if (result.length === 0) {
            return res.status(404).send('Akun tidak ditemukan.');
        }
        res.json(result[0]);
    });
});

// 4. UPDATE (Memperbarui Akun)
app.put('/akun/:id', (req, res) => {
    const akunId = req.params.id;
    const { nama, pass, alamat, no_hp, status_akun } = req.body;
    const query = 'UPDATE akun SET nama = ?, pass = ?, alamat = ?, no_hp = ?, status_akun = ? WHERE id = ?';
    db.query(query, [nama, pass, alamat, no_hp, status_akun, akunId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal memperbarui akun.');
        }
        if (result.affectedRows === 0) {
             return res.status(404).send('Akun tidak ditemukan atau tidak ada perubahan.');
        }
        res.send(`Akun dengan ID **${akunId}** berhasil diperbarui.`);
    });
});

// 5. DELETE (Menghapus Akun)
app.delete('/akun/:id', (req, res) => {
    const akunId = req.params.id;
    const query = 'DELETE FROM akun WHERE id = ?';
    db.query(query, [akunId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal menghapus akun.');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Akun tidak ditemukan.');
        }
        res.send(`Akun dengan ID **${akunId}** berhasil dihapus.`);
    });
});


// Menjalankan Server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log("================================")
    console.log(`Buka http://localhost:${port}/index.html untuk pengujian.`);
});