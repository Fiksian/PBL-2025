function introduce(nama, jk, pekerjaan, umur){
    if(jk == "laki-laki"){
        let kel = "Pak"
        return kel +" "+ nama + " adalah seorang " + pekerjaan + " yang berusia " + umur
    }
    else{
        let kel = "Bu"
        return kel +" "+ nama + " adalah seorang " + pekerjaan + " yang berusia " + umur
    }

    // return (jk == "laki-laki" ? "Pak" : "Bu" + nama +" adalah seorang "+ pekerjaan + " yang berusia "+ umur)
}

let john = introduce("john", "laki-laki", "penulis", "30")
let sarah = introduce("sarah", "perempuan", "model", "28")

console.log(john)
console.log(sarah)