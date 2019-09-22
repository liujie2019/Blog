import {readFile, writeFile as wfs} from 'fs';
import {promisify} from 'util';
import {resolve as r} from 'path';
import * as qs from 'querystring';

// promisify(readFile)(r(__dirname, '../package.json'))
//     .then(data => {
//         data = JSON.parse(data);
//         console.log(data);
//         wfs(r(__dirname, './name.txt'), String(data.name), 'utf-8');
//     })

const readAsync = promisify(readFile);
async function run() {
    let data = await readAsync(r(__dirname, '../package.json'));
    // let data = await readAsync('../package.json');
    data = JSON.parse(data);
    console.log(data.name);
}
run();