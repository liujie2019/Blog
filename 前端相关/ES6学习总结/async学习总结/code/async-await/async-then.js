const fn = async () => {
    const num = await 890;
    // 相当于一个立即resolve的Promise
    const num = await Promise.resolve(890);
    console.log(num);
    return num;
}
fn();
// fn().then(num => console.log(num));