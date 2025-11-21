// src/controllers/AkunController.js
const AkunModel = require('../models/akunModels');

class AkunController {
    // Handler untuk GET /akun (READ ALL)
    static getAllAkun(req, res) {
        AkunModel.findAll((err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Gagal mengambil data akun.' });
            }
            res.json(results);
        });
    }

    // Handler untuk GET /akun/:id (READ by ID)
    static getAkunById(req, res) {
        const { id } = req.params;
        AkunModel.findById(id, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Gagal mengambil data akun.' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Akun tidak ditemukan.' });
            }
            res.json(result[0]);
        });
    }

    // Handler untuk POST /akun (CREATE)
    static createAkun(req, res) {
        const data = req.body;
        AkunModel.create(data, (err, result) => {
            if (err) {
                console.error(err);
                // Menangani error jika ID duplikat (tergantung driver DB)
                return res.status(500).json({ message: 'Gagal membuat akun.', error: err.code });
            }
            res.status(201).json({
                message: `Akun ${data.nama} berhasil dibuat.`,
                insertedId: data.id
            });
        });
    }

    // Handler untuk PUT /akun/:id (UPDATE)
    static updateAkun(req, res) {
        const { id } = req.params;
        const data = req.body;
        AkunModel.update(id, data, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Gagal memperbarui akun.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Akun tidak ditemukan atau tidak ada perubahan.' });
            }
            res.json({ message: `Akun dengan ID ${id} berhasil diperbarui.` });
        });
    }

    // Handler untuk DELETE /akun/:id (DELETE)
    static deleteAkun(req, res) {
        const { id } = req.params;
        AkunModel.delete(id, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Gagal menghapus akun.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Akun tidak ditemukan.' });
            }
            res.json({ message: `Akun dengan ID ${id} berhasil dihapus.` });
        });
    }
}

module.exports = AkunController;