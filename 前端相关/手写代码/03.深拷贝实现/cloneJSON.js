function cloneJSON(source) {
    return JSON.parse(JSON.stringify(source));
}

function createData(deep, breadth) {
    let data = {};
    let temp = data;
    for (let i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for (let j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }
    return data;
}

cloneJSON(createData(1000));
cloneJSON(createData(10000)); // RangeError: Maximum call stack size exceeded