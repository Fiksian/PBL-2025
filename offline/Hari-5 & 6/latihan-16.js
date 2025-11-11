var sentence = "Fullstack Developer"
var hasil = ""

for (let i = 0; i < sentence.length ; i++){
    let huruf = sentence[i];
    if (!"aiueo".includes(huruf)){
        hasil += sentence[i];
    }
}
console.log(hasil)

/* 
for (let i = 0; i < sentence.length ; i++){
    if (sentence[i] != 'a' && sentence[i] != 'i' && sentence[i] != 'u'  && sentence[i] != 'e'  && sentence[i] != 'o'
    && sentence[i] != 'A' && sentence[i] != 'I' && sentence[i] != 'U' && sentence[i] != 'E' && sentence[i] != 'O'){
        hasil += sentence[i];
    }
}

*/