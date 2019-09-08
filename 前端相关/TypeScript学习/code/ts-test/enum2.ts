enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射。
console.log(Days['Sun']); // 0
console.log(Days['Mon']); // 1

console.log(Days[0]); // Sun
console.log(Days[1] === 'Mon'); // true