function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    console.log(result);
    return result;
}
// 在调用的时候，可以指定它具体的类型为number
createArray<number>(3, 2); // [ 2, 2, 2 ]