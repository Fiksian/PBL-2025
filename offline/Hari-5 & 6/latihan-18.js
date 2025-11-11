const sayuran = []
sayuran.push("Kangkung", "Bayam", "Buncis", "Kubis", "Timun", "Seledri", "Tauge")
sayuran.sort()

let sayur = "";
for (let j = 0; j < sayuran.length; j++) {
  sayur += (j + 1) + ". " + sayuran[j] + "\n";
}
console.log(sayur);


for(let i = 0; i < sayuran.length; i++){
    console.log(i+1 + '. ' + sayuran[i])
}