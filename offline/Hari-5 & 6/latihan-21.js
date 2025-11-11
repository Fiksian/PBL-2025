const data = [
    [1,3,5,7,8,9],
    [4,5,6,2,3,1],
    [6,7,8,1,3,5],
]

const hasil = []
console.log(data.length)

for(let i = 0; i < data.length; i++){
    let total = 0
    for(let j = 0; j < data[i].length; j++){
        total += data[i][j]
    }
    hasil.push(total)
}

console.log(hasil)