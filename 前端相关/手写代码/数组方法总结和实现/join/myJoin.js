Array.prototype.myJoin = function(joinWith) {
    return this.reduce((result, current, index) => {
        if (index === 0) {
            return current;
        }
        return `${result}${joinWith}${current}`;
    }, '');
}

const arr = [1, 2, 4];
console.log(arr.myJoin('!')); // 1!2!4