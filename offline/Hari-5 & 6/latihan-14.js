// Menggunakan Case
console.log("Menggunakan for dan switch")
for(let i = 1; i <= 20; i++){
    switch(true){
    case (i % 3 === 0 && i % 2 !== 0) :
    console.log(i + " - I love Coding")
    break;

    case (i % 3 === 0 && i % 2 === 0):
    console.log(i + " - ToT")
    break;
    
    case (i % 2 === 0):
    console.log(i + " - Berkualitas")
    break;

    default:
    console.log(i + " - Santai")
    break;
    }
}

// meggunakan for dan if else
console.log("Menggunakan for dan else if")
for(let i = 1; i <= 20; i++){
    if(i % 3 === 0 && i % 2 !== 0) {
    console.log(i + " - I love Coding")
    }

    else if(i % 3 === 0 && i % 2 === 0){
    console.log(i + " - ToT")
    }

    else if (i % 2 === 0){
    console.log(i + " - Berkualitas")
    }

    else{
    console.log(i + " - Santai")
    }
}