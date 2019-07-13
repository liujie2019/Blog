const phoneNumber = new Proxy({}, {
    set(target, key, value) {
        target[key] = value.match(/[0-9]/g).join('');
    },
    get(target, key) {
        return target[key].replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
});
phoneNumber.home = '131 1122 9876';
phoneNumber.company = '134 342 96876';

// { home: '13111229876', company: '13434296876' }
// console.log(phoneNumber);
console.log(phoneNumber.home);
console.log(phoneNumber.company);
