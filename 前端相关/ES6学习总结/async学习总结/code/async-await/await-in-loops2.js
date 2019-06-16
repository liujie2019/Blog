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
  //在 for 循环中正确的使用 await
  // 串行
  for (const name of names) {
    const column = await getZhihuColumn(name);
    console.log(`Name: ${column.title}`);
    console.log(`Intro: ${column.intro}`);
  }
  console.timeEnd('getColumnInfo');
};

getColumnInfo();
