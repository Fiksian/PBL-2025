USE book1;
-- Membuat kolom pada table


/*
CREATE TABLE IF NOT EXISTS SaklarLampu(
	Lampu VARCHAR(6)
);

INSERT Lampu VALUES 
	("On"),
    ("Off");

SELECT Lampu,
	IF(Lampu="On", "Nyala", "MATI")
FROM SaklarLampu;
*/

DROP TABLE IF EXISTS Kependudukan;

CREATE TABLE Kependudukan(
	Nama VARCHAR(10),
    JenisKelamin VARCHAR(6),
    Status VARCHAR(6)
);

INSERT INTO Kependudukan(Nama, JenisKelamin, Status) VALUES 
	("Anto", "Pria", "Lajang"),
    ("Sriyanto", "Pria", "Kawin"),
    ("Danang", "Pria", "Cerai"),
    ("Lena", "Wanita", "Lajang"),
    ("Yanti", "Wanita", "Kawin"),
    ("Nabila", "Wanita", "Cerai");

SELECT Nama, JenisKelamin, Status,
	CASE 
		WHEN JenisKelamin = "Pria" AND Status = "Lajang" THEN "Perjaka"
		WHEN JenisKelamin = "Pria" AND Status = "Kawin" THEN "Menikah"
        WHEN JenisKelamin = "Pria" AND Status = "Cerai" THEN "Duda"
        WHEN JenisKelamin = "Wanita" AND Status = "Lajang" THEN "Perawan"
        WHEN JenisKelamin = "Wanita" AND Status = "Kawin" THEN "Menikah"
        WHEN JenisKelamin = "Wanita" AND Status = "Cerai" THEN "Janda"
	END AS Keterangan_Case,
    
    IF(JenisKelamin="Pria", 
		IF(Status="Lajang",
			"Perjaka", 
				IF(Status="Kawin",
					"Menikah",
						"Duda")),
                        IF(Status="Lajang",
					"Perawan",
				IF(Status="Kawin",
			"Menikah",
		"Janda"
        ))) AS Keterangan_IF,
        
	IF(JenisKelamin = "Pria",
		CASE Status
			WHEN "Lajang" THEN "Perjaka"
            WHEN "Kawin" THEN "Menikah"
            ELSE "Duda"
		END,
        CASE Status
			WHEN "Lajang" THEN "Perawan"
            WHEN "Kawin" THEN "Menikah"
            ELSE "Janda"
		END
        )AS Keterangan_IF_CASE
        
FROM Kependudukan;