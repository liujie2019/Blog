const person = {
    name: 'lisi',
    hobbies: ['Coding', 'Sleeping', 'Reading'],
    sayHobbies() {
        // console.log(this); // person
        const self = this;
        this.hobbies.forEach(function(hobby) {
            // console.log(this); // Window
            console.log(`${self.name} loves ${hobby}`);
        });
    }
}

person.sayHobbies();

const person = {
    name: 'lisi',
    hobbies: ['Coding', 'Sleeping', 'Reading'],
    sayHobbies() {
        console.log(this); // person
        this.hobbies.forEach(hobby => {
            console.log(this); // person
            console.log(`${this.name} loves ${hobby}`);
        });
    }
}

person.sayHobbies();