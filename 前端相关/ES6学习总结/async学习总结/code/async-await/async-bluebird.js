const bluebird = require('bluebird');

const fn = async () => {
    console.log('waiting');
    // 延迟2秒
    await bluebird.delay(2000);
    console.log('done');
}
fn();