const repl = require('repl');
const con = repl.start().context;
con.msg = "示例消息";
con.testFunction = () => {
    console.log(con.msg);
};