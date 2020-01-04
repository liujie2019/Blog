const obj = {
    hobbies: ['🏀', '⚽️', '乒乓球'],
    [Symbol.iterator]() {
        const self = this;
        let nextIndex = 0;
        return {
            next() {
                const done = nextIndex >= self.hobbies.length;
                const value = done ? undefined : self.hobbies[nextIndex++];
                return {
                    value,
                    done
                };
            }
        };
    }
};

for (let i of obj) {
    console.log(i);
}