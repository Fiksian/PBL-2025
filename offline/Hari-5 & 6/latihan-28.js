const buah = [
    {
    nama: "Nanas",
    warna: "Kuning",
    adaBiji: "tidak",
    harga: 9000
  },
  {
    nama: "Jeruk",
    warna: "Oranye",
    adaBiji: "ada",
    harga: 8000
  },
  {
    nama: "Semangka",
    warna: "Hijau & Merah",
    adaBiji: "ada",
    harga: 10000
  },
  {
    nama: "Pisang",
    warna: "Kuning",
    adaBiji: "tidak",
    harga: 5000
  }
];


for(let i = 0; i < buah.length; i++){
    if (buah[i].adaBiji === "tidak"){
    console.log(buah[i])
    
    console.log(buah[i].nama + " Tidak memiliki biji")
    }
    /*else{
        console.log(buah[i].nama + " memiliki biji")
    }*/
}