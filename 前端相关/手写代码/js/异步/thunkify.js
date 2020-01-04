const thunkify = require('thunkify');
const fs = require('fs');

const read = thunkify(fs.readFile);
read('package.json')((err, data) => {
    console.log(data.toString());
});