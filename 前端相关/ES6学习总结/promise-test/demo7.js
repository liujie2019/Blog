// 问题一
doSomething()
    .then(function () {
        return doSomethingElse();
    })
    .then(finalHandler);

// 答案
// doSomething
// |-----------|
//             doSomethingElse(undefined)
//             |------------|
//                          finalHandler(resultOfDoSomethingElse)
//                          |------------|


// 问题二
doSomething()
    .then(function () {
        doSomethingElse();
    })
    .then(finalHandler);

// 答案
// doSomething
// |------------------|
//                    doSomethingElse(undefined)
//                    |------------------|
//                    finalHandler(undefined)
//                    |------------------|


// 问题三
doSomething()
    .then(doSomethingElse())
    .then(finalHandler);

// 答案
// doSomething
// |------------------|
// doSomethingElse(undefined)
// |----------------------------------|
//                    finalHandler(resultOfDoSomething)
//                    |------------------|


// 问题四
doSomething()
    .then(doSomethingElse)
    .then(finalHandler);

// 答案
// doSomething
// |-----------|
//             doSomethingElse(resultOfDoSomething)
//             |------------|
//                         finalHandler(resultOfDoSomethingElse)
//                         |------------------|
