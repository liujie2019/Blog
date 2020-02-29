const str1:string = '123';
const str2:String = new String('test');
console.log(str1);
console.log(str2);
console.log(str1.length);
console.log(str2.length);

const t:boolean = true;
console.log(t);

const d:Date = new Date();
console.log(d); // 2020-02-02T09:50:43.484Z
const d2:Date = new Date(1000);
const d3:Date = new Date(2000);
console.log(d2); // 1970-01-01T00:00:01.000Z
console.log(d3); // 1970-01-01T00:00:02.000Z
const d4:Date = new Date('2020/02/02 05:55:00');
const d5:Date = new Date('2020-02-02 05:55:00');
const d6:Date = new Date('2020-02-02T05:55:00');
console.log(d4); // 2020-02-01T21:55:00.000Z
console.log(d5); // 2020-02-01T21:55:00.000Z
console.log(d6); // 2020-02-01T21:55:00.000Z

const reg1:RegExp = new RegExp('testreg');
console.log(reg1); // /testreg
const stra:string = 'testreg.com';
const res:boolean = reg1.test(stra);
console.log(res);
const reg2:RegExp = new RegExp('testreg', 'gi');
const res2:any = reg1.exec(stra);
console.log(res2); // [ 'testreg', index: 0, input: 'testreg.com' ]
console.log(reg2); // /testreg/gi

function run():void {
    console.log(111);
}
console.log(run()); // undefined