let text = "LOOPING PERTAMA"
let text1 = "LOOPING KEDUA"
//Menggunakan loop for
console.log(text)
for(let i = 2; i<=20; i+=2){
console.log(`${i} - I love Coding`)
}

console.log(text1)
for(let i = 20; i >=2 ; i-=2){
console.log(`${i} - I will become a MERN Stack Developer`)
}

//Menggunakan loop while
console.log(text)
p = 2;
while (p <= 20 ){
    console.log(`${p} - I love Coding`)
    p += 2
}

//Menggunakan loop do while
console.log(text1)
l = 20;
do {
    console.log(`${l} - I will become a MERN Stack Developer`)
    l -= 2
}
while(l >= 2)

