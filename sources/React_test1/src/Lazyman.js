function _LazyMan(name) {
    this.tasks = [];//新建一个任务队列  
    var self = this;
    var fn = (function(name) {
        return function() {
            console.log("Hi! This is " + name + "!");
            self.next();
        }
    })(name);
    //将fn加入到任务队列中
    this.tasks.push(fn);
    //此处用settimeout执行是因为settimeout会在同步线程都进行完了之后再执行
    //如果不用settimeout就会同步触发,事件还未都放在队列中,就已经开始执行了
    setTimeout(function() {
        self.next();
    }, 0); // 在下一个事件循环启动任务，依次执行任务队列中的函数
}

//next是实现函数在队列中顺序执行功能的函数
_LazyMan.prototype.next = function() { 
    //shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
    var fn = this.tasks.shift();
    fn && fn();
}
_LazyMan.prototype.eat = function(name) {
    var self = this;
    var fn = (function(name){
        return function(){
            console.log("Eat " + name + "~");
            self.next()
        }
    })(name);
    this.tasks.push(fn);
    return this; //实现链式调用
}
_LazyMan.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(time) {
        return function() {
            setTimeout(function() {
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.push(fn);
    return this;
}
_LazyMan.prototype.sleepFirst = function(time) {
    var self = this;
    var fn = (function(time) {
        return function() {
            setTimeout(function() {
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    //unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度
    this.tasks.unshift(fn);
    return this;
}

//工厂函数
function LazyMan(name) {
    return new _LazyMan(name);
}

//调用Lazyman的时候不需要使用new关键字，这意味着我们需要使用工厂函数
LazyMan("Hank").sleep(2).eat("supper").sleepFirst(5);