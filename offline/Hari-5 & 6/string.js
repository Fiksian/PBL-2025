let text = " hello world! "; 
let length = text.length;
let text1 = text.charAt(5);
let text2 = text.slice(2, 6)
let text3 = text.substring(2, 5)
let text4 = text.toUpperCase()
let text5 = text.toLowerCase()
let text6 = text.concat(" ", text2)
let text7 = text.trim()
let text8 = text.split(" ")
let text9 = text.replace("world", "dunia")

console.log(`ini adalah text :   ${text} + ${length}`)
console.log(`ini adalah text1 :  ${text1}`)
console.log(`ini adalah text2 :  ${text2}`)
console.log(`ini adalah text3 :  ${text3}`)
console.log(`ini adalah text4 :  ${text4}`)
console.log(`ini adalah text5 :  ${text5}`)
console.log(`ini adalah text6 :  ${text6}`)
console.log(`ini adalah text7 :  ${text7}`)
console.log(`ini adalah text8 :  ${text8}`)
console.log(`ini adalah text9 :  ${text9}`)