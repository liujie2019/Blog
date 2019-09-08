const request = require('request');

request('http://www.baidu.com', (error, response, body) => {
    if (error) {
        console.error('error:', error);
        return;
    }
    // statusCode: 200
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});