const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.get('/time', (req, res) => {
    const currentTime = new Date();
    res.end(currentTime.toLocaleString());
    // setTimeout(() => {
    //     res.end(currentTime.toLocaleString());
    // }, 3000);
});

app.listen(8080, () => {
    console.log('server run on port 8080');
});