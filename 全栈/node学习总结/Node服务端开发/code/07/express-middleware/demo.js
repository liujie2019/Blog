const express = require('express');
const app = express();

// app.use((req, res, next) => {
//     console.log('1');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('2');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('3');
//     // res.send('333 end');
// });

app.use('/', (req, res, next) => {
    console.log('1');
    next();
});

app.use('/a', (req, res, next) => {
    console.log('a');
    next();
});

app.use('/ab', (req, res, next) => {
    console.log('ab');
});

// app.use('/user', function(req, res, next) {
//   console.log('Request URL:', req.originalUrl);
//   next();
// }, function (req, res, next) {
//   console.log('Request Type:', req.method);
//   next();
// });

// app.get('/', function (req, res, next) {
//     console.log('1');
//     next();
// });

// app.get('/abc', function (req, res, next) {
//     console.log('abc');
//     next();
// });


app.listen(3000, () => {
    console.log('server is running at 3000');
});