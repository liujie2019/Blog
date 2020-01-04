const fs = require('fs');
const thunkify = require('thunkify');
const readFileThunk = thunkify(fs.readFile);

const gen = function* () {
    const res = yield readFileThunk('name.txt');
    console.log(res.toString());
    const res2 = yield readFileThunk('age.txt');
    console.log(res2.toString());
}

const g = gen();
const res = g.next();

res.value((err, data) => {
    if (err) throw err;
    const res2 = g.next(data);
    res2.value((err, data) => {
        if (err) throw err;
        g.next(data);
    });
});