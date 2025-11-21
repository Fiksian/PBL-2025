// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const akunRoutes = require('./src/routes/akunRoutes'); // Import routes

// Hanya perlu memanggil db.js agar koneksi DB berjalan
require('./src/config/db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Untuk index.html

// --- Integrasi Routes ---
// Semua endpoint di akunRoutes akan dipasang pada '/api/akun'
app.use('/api/akun', akunRoutes);

// Menjalankan Server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log(`Endpoint API Akun: http://localhost:${port}/api/akun`);
    console.log(`Buka http://localhost:${port}/index.html untuk pengujian.`);
});