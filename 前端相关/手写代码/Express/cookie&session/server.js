const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const router = require('./router');
const sessionRouter = require('./router/sessionRouter');

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    name: 'sessionId',
    secret: 'session_test',
    resave: true,
    saveUninitialized: true
}));

app.use('/cookie', router);
app.use('/session', sessionRouter);

app.listen(3000, () => {
    console.log('server is running at port 3000');
});
