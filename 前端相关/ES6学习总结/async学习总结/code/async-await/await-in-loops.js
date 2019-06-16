const fetch = require('node-fetch');
const bluebird = require('bluebird');

async function getZhihuColumn(id) {
  await bluebird.delay(1000);
  const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
  const response = await fetch(url);
  return await response.json();
}

const getColumnInfo = async () => {
  console.time('getColumnInfo');
  const names = ['feweekly', 'toolingtips'];
  const promises = names.map(x => getZhihuColumn(x));
  //在 for 循环中正确的使用 await
  // 并行，先发送请求再await
  for (const promise of promises) {
    const column = await promise;
    console.log(`Name: ${column.name}`);
    console.log(`Intro: ${column.intro}`);
  }
  console.timeEnd('getColumnInfo');
};

getColumnInfo();
