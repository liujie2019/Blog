const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.get('/time', (req, res) => {
    setInterval(() => {
        const currentTime = new Date().toLocaleString();
        res.write(`
            <script type="text/javascript">
                parent.document.querySelector('#time').innerHTML = '${currentTime}'; // 改变父窗口dom元素
            </script>
        `);
    }, 1000);
});

app.listen(8080, () => {
    console.log('server run on port 8080');
});