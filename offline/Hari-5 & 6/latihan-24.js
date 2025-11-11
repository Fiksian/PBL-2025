const angka = [2,3,1,9,12,8,9,7]

function max(number){
    let max = number[0]
    for(let i = 0; i < number.length; i++)
    if(number[i] > max){
            max = number[i]
    }
    return max
}

function min(number){
    let min = number[0]
    for(let i = 0; i < number.length; i++)
    if(number[i] < min){
            min = number[i]
    }
    return min
}


console.log(`Angka Terkecil Adalah = ` + min(angka))
console.log("Angka Terbesar Adalah = " + max(angka))