const getData = () => new Promise((resovle, reject) => {
    setTimeout(() => {
        resovle('data');
    }, 1000);
});

async function test () {
    const data = await getData();
    console.log('data:', data);
    const data2 = await getData();
    console.log('data2:', data2);
    return 'success';
}

// 
test().then(data => {console.log(data)});