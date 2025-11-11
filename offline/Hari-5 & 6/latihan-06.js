const pertama = "saya"
const kedua = "senang"
const ketiga = "belajar"
const keempat = "javascript"

var hasil1 = pertama.charAt(0).toUpperCase() + pertama.slice(1)
var hasil2 = kedua.charAt(0).toUpperCase() + kedua.substring(1, ((kedua.length)-1)) + kedua.charAt((kedua.length)-1).toUpperCase()
var hasil3 = ketiga.charAt(0).toUpperCase() + ketiga.substring(1, 6) + ketiga.charAt((ketiga.length)-1).toUpperCase()
var hasil4 = keempat.toUpperCase()

var gabungan = `${hasil1} ${hasil2} ${hasil3} ${hasil4}`
// OUTPUT yang diharapkan "Saya SenanG BelajaR JAVASCRIPT"

console.log(gabungan)

