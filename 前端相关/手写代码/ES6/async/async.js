// async function sendRequest(url) {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url,
//             type: 'GET',
//             success: data => resolve(data),
//             error: error => reject(error)
//         });
//     });
// }

// async function getNews(url) {
//     const res = await sendRequest(url);
//     const res2 = await sendRequest(res.commentsUrl);
//     console.log(res, res2);
// }

// getNews('http://www.example.com/news?newsID=123');

function* testGenerator() {
    yield 'hello';
    yield 'world';
    return 'end';
}
const gen = testGenerator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());