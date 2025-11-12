var people =[
{name: "John", job: "Programmer", gender: "male", age: 30},
{name: "Sarah", job: "Model", gender: "female", age: 27},
{name: "Jack", job: "Engineer", gender: "male", age: 25},
{name: "Ellie", job: "Designer", gender: "female", age: 35},
{name: "Danny", job: "Footballer", gender: "male", age: 30},
]

let total = 0
for(let i = 0; i < people.length; i++){
    total += (people[i].age)
}

let rata2Usia = total/people.length

console.log(rata2Usia)