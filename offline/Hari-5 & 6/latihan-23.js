let text1 = "Super Bootcamp Fullstack Dev 2022";

/*
function karakterUnik(text){
    let hasil = []
    let lower = text.toLowerCase();

    for(let i = 0; i < lower.length; i++){
        let huruf = lower[i]
        let jumlah = 0
        for(let j = 0; j < lower.length; j++){
            if(lower[j] === huruf){
                jumlah++
            }
        }
        if(jumlah === 1){
            hasil.push(huruf)
        }
    }
    return hasil
}

console.log(karakterUnik(text1).toString())
*/

function karakterUnik(text){
    let kalimat = text.toLowerCase()
    let hasil = ""

    for(let i = 0; i < text.length; i++){
        let huruf = text[i]
        let jumlah = kalimat.split(kalimat[i]).length-1
        //"aku suka roti".split("a")//
        //['', 'suk', 'roti']//
        //length = 3 --> jumlah kemunculan "a" -> 3-1 = 2//
        if(jumlah == 1){
            hasil += huruf
        }
    }

    return hasil.toLowerCase()
}


console.log(karakterUnik(text1))