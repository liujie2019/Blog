const server = require('./server3');
const router = require('./router');
const handler = require('./hander2');

const handle = {};
handle["/"] = handler.home;
handle['/home'] = handler.home;
handle['/review'] = handler.review;
handle['/api/v1/records'] = handler.api_records;

server.startServer(router.route, handle);