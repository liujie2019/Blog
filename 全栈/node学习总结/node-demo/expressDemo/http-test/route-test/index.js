const server = require("./server");
const router = require("./router");

server.start(router.route);