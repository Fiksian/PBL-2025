DROP DATABASE proyek;

-- Membuat database
CREATE DATABASE IF NOT EXISTS proyek;
USE proyek;

-- DROP jika ingin reset
DROP TABLE IF EXISTS detail_pesanan;
DROP TABLE IF EXISTS pesanan;
DROP TABLE IF EXISTS layanan;
DROP TABLE IF EXISTS pelanggan;
DROP TABLE IF EXISTS pembayaran;

----------------------------------------------------
-- TABLE PELANGGAN
----------------------------------------------------
CREATE TABLE IF NOT EXISTS akun (
    id              VARCHAR(20) PRIMARY KEY,
    nama            VARCHAR(50),
    pass            VARCHAR(100),
    alamat          VARCHAR(255),
    no_hp           VARCHAR(20),
    status_akun		VARCHAR(10)
);

----------------------------------------------------
-- TABLE PESANAN (relasi ke pelanggan)
----------------------------------------------------
CREATE TABLE IF NOT EXISTS pesanan (
    no_pesanan          VARCHAR(20) PRIMARY KEY,
    id_akun        		VARCHAR(20),
    status_pesanan      VARCHAR(30),
    tanggal_pesanan     DATE,
    tanggal_selesai     DATE,
    total_harga         INT DEFAULT 0,

    FOREIGN KEY (id_akun) REFERENCES akun(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

----------------------------------------------------
-- TABLE LAYANAN (jenis layanan laundry)
----------------------------------------------------
CREATE TABLE IF NOT EXISTS layanan (
    id_layanan      VARCHAR(20) PRIMARY KEY,
    nama_layanan    VARCHAR(50),
    harga_per_kg    INT,
    estimasi_hari   INT
);

----------------------------------------------------
-- TABLE DETAIL PESANAN (relasi pesanan ↔ layanan)
----------------------------------------------------
CREATE TABLE IF NOT EXISTS detail_pesanan (
    id_detail       INT AUTO_INCREMENT PRIMARY KEY,
    no_pesanan      VARCHAR(20),
    id_layanan      VARCHAR(20),
    berat_kg        DECIMAL(5,2),
    subtotal        INT,

    FOREIGN KEY (no_pesanan) REFERENCES pesanan(no_pesanan)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (id_layanan) REFERENCES layanan(id_layanan)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

----------------------------------------------------
-- OPTIONAL: TABLE PEMBAYARAN
----------------------------------------------------
CREATE TABLE IF NOT EXISTS pembayaran (
    id_bayar        INT AUTO_INCREMENT PRIMARY KEY,
    no_pesanan      VARCHAR(20),
    metode          VARCHAR(30),
    jumlah_bayar    INT,
    tanggal_bayar   DATETIME,

    FOREIGN KEY (no_pesanan) REFERENCES pesanan(no_pesanan)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
