const arr = [1, 2, 3, 4, 5];

Array.prototype.shuffle = function() {
    this.sort((a, b) => {
        return Math.random() - 0.5;
    });
}
arr.shuffle();
console.log(arr);


var times = [0, 0, 0, 0, 0];

for (var i = 0; i < 100000; i++) {

    let arr = [1, 2, 3, 4, 5];

    arr.sort(() => Math.random() - 0.5);

    times[arr[4]-1]++;

}

console.log(times)