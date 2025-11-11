let sisi = " 1 2 "
let jarijari = "7.5"

//Cara lain menhahapus spasi sisi.replace(/\s+/g, ""). dimana /\s menghapus semua karakter spasi dan /g dilakukan secara global dari satu variable 
//Cara lain menghapus sisi.replaceAll(" ", "")

sisi = sisi.charAt(1)+sisi.charAt(3)
sisi2 = sisi.replace(/\s+/g, '')

let luasPersegi = Number(sisi) * Number(sisi)

let luasLingkaran =  3.14 * (parseFloat(jarijari) ** 2)

console.log("Luas Persegi = " + luasPersegi)
console.log("Luas Lingkaran = " + luasLingkaran)
console.log(sisi2)