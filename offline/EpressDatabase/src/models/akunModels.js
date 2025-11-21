// src/models/AkunModel.js
const db = require('../config/db');

class AkunModel {
    // READ ALL
    static findAll(callback) {
        const query = 'SELECT * FROM akun';
        db.query(query, callback);
    }

    // READ by ID
    static findById(id, callback) {
        const query = 'SELECT * FROM akun WHERE id = ?';
        db.query(query, [id], callback);
    }

    // CREATE
    static create(data, callback) {
        const { id, nama, pass, alamat, no_hp, status_akun } = data;
        const query = 'INSERT INTO akun (id, nama, pass, alamat, no_hp, status_akun) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [id, nama, pass, alamat, no_hp, status_akun], callback);
    }

    // UPDATE
    static update(id, data, callback) {
        const { nama, pass, alamat, no_hp, status_akun } = data;
        const query = 'UPDATE akun SET nama = ?, pass = ?, alamat = ?, no_hp = ?, status_akun = ? WHERE id = ?';
        db.query(query, [nama, pass, alamat, no_hp, status_akun, id], callback);
    }

    // DELETE
    static delete(id, callback) {
        const query = 'DELETE FROM akun WHERE id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = AkunModel;