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


CREATE VIEW vw_profil_pns AS
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

DROP TABLE IF EXISTS Agama;

CREATE TABLE Agama (
	kd_Agama CHAR(1) PRIMARY KEY,
    nm_Agama VARCHAR(10)
);
    
INSERT Agama VALUES 
("1", "Islam");

DELIMITER //
CREATE PROCEDURE ins_agama( 
	pkd_agama CHAR(1),
    pnm_agama VARCHAR(10)
)
 BEGIN
	INSERT Agama VALUES (pkd_agama,pnm_agama);
 END//
DELIMITER ;

CALL ins_agama("2", "Katholik");
CALL ins_agama("3", "Protestan");
CALL ins_agama("4", "Budha");
CALL ins_agama("5", "Hindu");
CALL ins_agama("6", "Kong Huchu");
CALL ins_agama("7", "Kejawen");
CALL ins_agama("8", "Ortodox");

ALTER TABLE Agama
	MODIFY nm_agama VARCHAR(30);

UPDATE Agama 
SET nm_Agama = "Islam Kejawen"
WHERE kd_Agama = "7";    

DELIMITER //
CREATE PROCEDURE upt_agama(
	pkd_agama CHAR(1),
    pnm_agama VARCHAR(25)
) BEGIN
	UPDATE Agama 
	SET nm_Agama = pnm_agama
	WHERE kd_Agama = pkd_agama;
    SELECT * 
    FROM Agama;
END//
DELIMITER ;

CALL upt_agama("8", "Kristen Ortodox");

DELETE FROM Agama 
	WHERE nm_Agama = "Islam Kejawen";
 
DELIMITER //
CREATE PROCEDURE del_agama(
	pkd_agama CHAR(1)
) BEGIN
	DELETE FROM Agama 
		WHERE kd_Agama = pkd_agama;
        
    SELECT * 
    FROM Agama;
END//
DELIMITER ;

CALL del_agama("8");

ALTER TABLE PNS
	ADD kode_agama CHAR(1),
    ADD CONSTRAINT PNS2Agama FOREIGN KEY(kode_Agama)
    REFERENCES Agama(kd_Agama);

UPDATE PNS 
SET kode_agama = "1";

DELIMITER //
CREATE PROCEDURE upt_pns(
	nip_add CHAR(18),
    nama_add VARCHAR(25),
    kd_agm_add CHAR(1)
    
) BEGIN
	INSERT INTO PNS(NIP, Nama, kode_agama)
	VALUES (nip_add, nama_add, kd_agm_add);
    
END//
DELIMITER ;

CALL upt_pns("197009172010012010", "Melaini", "3");
CALL upt_pns("197309172005112006", "Siti Nur Mahmudah", "1");
CALL upt_pns("181009172010122007", "Dika Gardena", "6");
CALL upt_pns("200109172008092026", "Lestari Maini", "2");
CALL upt_pns("198206252020012100", "Meini Hook", "4");
CALL upt_pns("196004132014052009", "Ruby Gardena", "5");

CREATE VIEW vw_agama AS
SELECT NIP, Nama, nm_Agama AS agama_pns
FROM PNS, Agama
WHERE PNS.kode_agama = Agama.kd_agama;

SELECT agama_pns, COUNT(agama_pns) AS count_agama
FROM vw_agama
GROUP BY agama_pns;

SELECT agama_pns,
COUNT(agama_pns) AS count_agama
FROM vw_agama
WHERE agama_pns LIKE "K%" #REGEX --> Regular Expression
GROUP BY agama_pns;