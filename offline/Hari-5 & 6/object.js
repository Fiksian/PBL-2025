/*const Person = {
    firstName   : "Johnny",
    lastName    : "Doe",
    age         : "50",
    id          : "5566",
    fullName    : function(){
        return this.firstName + " " +this.lastName
    }
}

console.log(Person.firstName + " is " + Person.age + " years old.")
console.log(Person["firstName"] + " is " + Person["age"] + " years old.")

let names = Person.fullName()

console.log(names)
*/

function Person(first, last , age){
    this.firstName  = first
    this.lastName   = last
    this.age        = age
}

const mySelf = new Person("Johnny", "Rally", 22)
mySelf.nationality = "Indonesia"

Person.prototype.nationality = "English"

console.log(Person.prototype.nationality)