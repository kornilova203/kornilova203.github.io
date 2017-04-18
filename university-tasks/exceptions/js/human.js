class Human {
    constructor(name) {
        if (name === undefined) {
            throw ReferenceError("Name must be at least 1 character long");
        }
        if (typeof name !== 'string') {
            throw TypeError("Name must be type of string");
        }
        this.name = name;
        this.age = 18;
    }
    say(message) {
        console.log(this.name + ': ' + message);
    }
    setAge(newAge) {
        if (typeof newAge !== 'number') {
            throw TypeError('Age must be a number');
        }
        if (newAge <= 0 || newAge > 100) {
            throw RangeError("Age must be bigger than 0 and less (or equal) than 100");
        }
        this.age = newAge;
    }
    getAge() {
        return this.age;
    }
}
