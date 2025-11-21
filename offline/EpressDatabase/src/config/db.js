// src/config/db.js
const mysql = require('mysql2');

// Konfigurasi Koneksi Database
const db = mysql.createConnection({
    host: 'localhost',      // Ganti sesuai environment Anda
    user: 'root',           // Ganti sesuai user Anda
    password: '12345678', // Ganti sesuai password Anda
    database: 'proyek'      // Pastikan database 'proyek' sudah dibuat
});

db.connect(err => {
    if (err) {
        console.error('Koneksi database gagal: ' + err.stack);
        // Penting: Keluar dari proses jika koneksi gagal
        process.exit(1);
        return;
    }
    console.log('Koneksi database berhasil dengan ID: ' + db.threadId);
});

module.exports = db;