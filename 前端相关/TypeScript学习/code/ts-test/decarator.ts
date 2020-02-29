// 类装饰器
// function log(params:any) {
//     console.log(params); // [Function: HttpClient]
//     // params就是当前类
//     // 给当前类的原型添加apiUrl属性和run方法
//     params.prototype.apiUrl = '11111';
//     params.prototype.run = function() {
//         console.log('我是run方法');
//     }
// }
// @log
// class HttpClient {
//     constructor() {}
//     getData() {}
// }

// let client:any = new HttpClient();
// console.log(client.apiUrl);

// 装饰器工厂
// function log(params:string) {
//     return function(target:any) {
//         // target是当前类
//         console.log(target);
//         console.log(params);
//         target.prototype.name = params;
//     }
// }
// @log('hello')
// class HttpClient {
//     constructor() {

//     }
//     getData() {

//     }
// }
// let client:any = new HttpClient();
// console.log(client.name);

// // 装饰器重载构造函数
// function log(target:any) {
//     return class extends target {
//         apiUrl:any = '我是修改后的数据';
//         getData() {
//             this.apiUrl = this.apiUrl + '----'
//             console.log(this.apiUrl);
//         }
//     }
// }
// @log
// class HttpClient {
//     public apiUrl:string | undefined;
//     constructor() {
//         this.apiUrl = '我是构造函数中的apiUrl';
//     }
//     getData() {
//         console.log(this.apiUrl);
//     }
// }
// let client:any = new HttpClient();
// client.getData();

// 类装饰器
function log(params:any) {
    // console.log(params);
    // params就是当前类
    params.prototype.apiUrl = '11111';
    params.prototype.run = function() {
        console.log('我是run方法');
    }
}
// 属性装饰器
function property(params:any) {
    return function(target:any, attr: any) {
        // console.log(target);
        // console.log(attr); // url属性名称
        target[attr] = params;
    }
}
// 方法装饰器
function methods(params:any) {
    return function(target:any, methodName:any, desc: any) {
        console.log(target);
        console.log(methodName); // getData
        console.log(desc); // 是当前属性的描述器
        /*
        { value: [Function],
          writable: true,
          enumerable: true,
          configurable: true }
        */
        // 修改装饰器的方法，把装饰器方法里面传入的所有参数改为string类型
        // 1. 保存当前方法
        let oMthod = desc.value;
        desc.value = function(...args:any[]) {
            // 将参数统一转为字符串
            args = args.map(value => String(value));
            // console.log(args); // ["123", "test"]
            // 然后调用原方法
            oMthod.apply(this, args);
        }
    }
}
@log
class HttpClient {
    @property('www.baidu.com')
    public url:string | undefined;
    constructor() {

    }
    @methods('get方法')
    getData(...args:any[]) {
        console.log(args); // ["123", "test"]
        console.log(this.url);
    }
}

let client:any = new HttpClient();
client.getData(123, 'test');

// 装饰器执行顺序
// 类装饰器
// function log1(params:any) {
//     return function(target:any) {
//         console.log('类装饰器1');
//     }
// }
// function log2(params:any) {
//     return function(target:any) {
//         console.log('类装饰器2');
//     }
// }
// // 属性装饰器
// function property(params:any) {
//     return function(target:any, attr: any) {
//         console.log('属性装饰器1');
//     }
// }
// function property2(params:any) {
//     return function(target:any, attr: any) {
//         console.log('属性装饰器2');
//     }
// }
// // 方法装饰器
// function methods(params:any) {
//     return function(target:any, methodName:any, desc: any) {
//         console.log('方法装饰器1');
//     }
// }
// function methods2(params:any) {
//     return function(target:any, methodName:any, desc: any) {
//         console.log('方法装饰器2');
//     }
// }
// // 方法参数装饰器
// function paramsMethods1(params:any) {
//     return function(target:any, methodName:any, desc: any) {
//         console.log('方法参数装饰器1');
//     }
// }
// function paramsMethods2(params:any) {
//     return function(target:any, methodName:any, desc: any) {
//         console.log('方法参数装饰器2');
//     }
// }
// @log1('1')
// @log2('2')
// class HttpClient {
//     @property('www.baidu.com')
//     @property2('www.baidu.com2')
//     public url:string | undefined;
//     constructor() {

//     }
//     @methods('get方法')
//     @methods2('get方法2')
//     getData() {
//         console.log(this.url);
//     }
//     setData(@paramsMethods1() attr1:any, @paramsMethods2() attr2:any) {

//     }
// }

// let client:any = new HttpClient();
// client.getData(123, 'test');
/*
属性装饰器2
属性装饰器1
方法装饰器2
方法装饰器1
方法参数装饰器2
方法参数装饰器1
类装饰器2
类装饰器1
*/
