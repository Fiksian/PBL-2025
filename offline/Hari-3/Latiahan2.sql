DROP DATABASE IF EXISTS Kepegawaian;

CREATE DATABASE /*IF NOT EXISTS*/ Kepegawaian;

USE Kepegawaian;

CREATE TABLE IF NOT EXISTS PNS(
	NIP CHAR(18),
    Nama VARCHAR(30)
);

INSERT INTO PNS(NIP, Nama) VALUES
	("197209172005011002","Mohamad Septiawan"),
	("198201312023082003","Damayanti"),
    ("200901202025031006","Mohamad Naufal Dzakiy"),
    ("201407142025121007","Moohamad Tsaniy Atilla Dzaka"),
    ("201511142025122002","Nabila Tsalsa Nuraisyah");

SELECT NIP, Nama,

	DATE_FORMAT(STR_TO_DATE(SUBSTRING(NIP, 1, 8), "%Y%m%d"), "%W, %d-%M-%Y") AS tglLahir,
    
	DATE_FORMAT(
		STR_TO_DATE(CONCAT(SUBSTRING(NIP, 9, 6), "01") ,"%Y%m%d"), "%M-%Y"
    ) AS tglPengangkatan,
    
    IF(SUBSTRING(NIP, 15, 1)="1",
		"Pria", "Wanita"
	) AS Jenis_Kelamin,
    
    SUBSTRING(NIP, 16, 3) AS No_Urut
FROM PNS;

ALTER TABLE PNS
	ADD PRIMARY KEY (NIP);