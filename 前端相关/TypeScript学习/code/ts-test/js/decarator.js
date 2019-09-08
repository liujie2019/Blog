"use strict";
// // 类装饰器
// function log(params:any) {
//     // console.log(params);
//     // params就是当前类
//     params.prototype.apiUrl = '11111';
//     params.prototype.run = function() {
//         console.log('我是run方法');
//     }
// }
// @log
// class HttpClient {
//     constructor() {
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//     }
//     getData() {
//     }
// }
// let client:any = new HttpClient();
// console.log(client.apiUrl);
// // 装饰器工厂
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
// // 类装饰器
// function log(params:any) {
//     // console.log(params);
//     // params就是当前类
//     params.prototype.apiUrl = '11111';
//     params.prototype.run = function() {
//         console.log('我是run方法');
//     }
// }
// // 属性装饰器
// function property(params:any) {
//     return function(target:any, attr: any) {
//         // console.log(target);
//         // console.log(attr); // url属性名称
//         target[attr] = params;
//     }
// }
// // 方法装饰器
// function methods(params:any) {
//     return function(target:any, methodName:any, desc: any) {
//         console.log(target);
//         console.log(methodName); // getData
//         console.log(desc); // 是当前属性的描述器
//         // 修改装饰器的方法，把装饰器方法里面传入的所有参数改为string类型
//         // 1. 保存当前方法
//         let oMthod = desc.value;
//         desc.value = function(...args:any[]) {
//             args = args.map(value => String(value));
//             // console.log(args); // ["123", "test"]
//             oMthod.apply(this, args);
//         }
//     }
// }
// @log
// class HttpClient {
//     @property('www.baidu.com')
//     public url:string | undefined;
//     constructor() {
//     }
//     @methods('get方法')
//     getData(...args:any[]) {
//         console.log(args); // ["123", "test"]
//         console.log(this.url);
//     }
// }
// let client:any = new HttpClient();
// client.getData(123, 'test');
// 装饰器执行顺序
// 类装饰器
function log1(params) {
    return function (target) {
        console.log('类装饰器1');
    };
}
function log2(params) {
    return function (target) {
        console.log('类装饰器2');
    };
}
// 属性装饰器
function property(params) {
    return function (target, attr) {
        console.log('属性装饰器1');
    };
}
function property2(params) {
    return function (target, attr) {
        console.log('属性装饰器2');
    };
}
// 方法装饰器
function methods(params) {
    return function (target, methodName, desc) {
        console.log('方法装饰器1');
    };
}
function methods2(params) {
    return function (target, methodName, desc) {
        console.log('方法装饰器2');
    };
}
// 方法参数装饰器
function paramsMethods1(params) {
    return function (target, methodName, desc) {
        console.log('方法参数装饰器1');
    };
}
function paramsMethods2(params) {
    return function (target, methodName, desc) {
        console.log('方法参数装饰器2');
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log(this.url);
    };
    HttpClient.prototype.setData = function (attr1, attr2) {
    };
    __decorate([
        property('www.baidu.com'),
        property2('www.baidu.com2')
    ], HttpClient.prototype, "url", void 0);
    __decorate([
        methods('get方法'),
        methods2('get方法2')
    ], HttpClient.prototype, "getData", null);
    __decorate([
        __param(0, paramsMethods1()), __param(1, paramsMethods2())
    ], HttpClient.prototype, "setData", null);
    HttpClient = __decorate([
        log1('1'),
        log2('2')
    ], HttpClient);
    return HttpClient;
}());
var client = new HttpClient();
client.getData(123, 'test');
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
