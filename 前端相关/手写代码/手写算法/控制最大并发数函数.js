/**
 * 控制最大并发数函数
*/

function concurrentPoll() {
    this.tasks = []; // 存放队列函数
    this.max = 10; // 并发数
    this.res = [];
}

// 添加队列函数
concurrentPoll.prototype.addTask = function(task) {
    this.tasks.push(task);
}

concurrentPoll.prototype.run = function() {
    if (this.tasks.length === 0) { // 递归出口
        return;
    }
    let min = Math.min(this.tasks.length, this.max);
    for (let i = 0; i < min; i++) {
        this.max--;
        let currentTask = this.tasks.shift();
        currentTask().then(data => {
            this.res.push(data);
        }).catch(err => {
            this.res.push(err);
        }).finally(() => {
            this.max++; // 每请求完成一次，并发恢复1
            this.run();
        });
    }
}

const poll = new concurrentPoll();
for (let i = 0; i < 15; i++) {
    poll.addTask(() => {
        return new Promise((resolve, reject) => {
            const time = Math.round(Math.random() * 1e4);
            console.log('start' + i);
            setTimeout(() => {
                resolve('成功' + i);
                console.log('end' + i);
            }, time);
        });
    });
}

poll.run();
