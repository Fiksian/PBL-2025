var sentence = "Saya Sangat Senang Sekali Belajar Programming dan Saya Juga Sengan Belajar Javascript"

var huruf = sentence.length
var huruf2 = sentence.replaceAll(" ", "").length

var pjg = ""

if (huruf < 10 ){
    pjg = "pendek"
}
else if (huruf >= 10 && huruf <= 30){
    pjg = "sedang"
}
else{
    pjg = "panjang"
}

console.log(sentence)
console.log("Panjang huruf kalimat diatas adalah = " + pjg + `, dengan banyak huruf ${huruf2}`)


/*
if (sentence.length < 10 ){
    pjg = "pendek"
}
else if (sentence.length >= 30){
    pjg = "panjang"
}
else{
    pjg = "sedang"
} 
*/