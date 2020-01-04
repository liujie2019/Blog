const path = require('path');
console.log(path.resolve('/foo/bar', '/bar/faa', '..', 'a/../c')); // /bar/c