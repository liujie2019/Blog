function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
}

let genObj = dataConsumer();
console.log(genObj.next());
// console.log(genObj.next());
// console.log(genObj.next());