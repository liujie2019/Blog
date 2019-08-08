const fs = require('fs');

fs.createReadStream('./hrtime.js').pipe(process.stdout);