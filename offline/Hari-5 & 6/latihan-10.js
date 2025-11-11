var nilai = 75;
var kategori;

if (nilai >= 80){
    kategori = "A"
}
else if(nilai < 80 && nilai >= 70){
    kategori = "B"
}
else if(nilai < 70 && nilai >= 60){
    kategori = "C"
}
else if(nilai < 60 && nilai >= 50){
    kategori = "D"
}
else {
    kategori = "E"
}

console.log(`Nilai ujian adalah ${nilai} dengan kategori ${kategori}`)

