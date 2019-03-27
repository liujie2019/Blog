const fs = require('fs');

function route(handle, pathname, response, params) {
    console.log('Routing a request for ' + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, params);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/404.html', 'utf8').pipe(response);
    }
}

module.exports.route = route;