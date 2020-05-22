function clone(source) {
    // let target = {};
    let target = new source.constructor();
    for (let key in source) {
        if (source.hasOwnProperty(key)){
            if (typeof source[key] === 'object') {
                target[key] = clone(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}