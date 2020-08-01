// simple-plugin.js
//
module.exports = function({types: t}) {
    return {
        name: 'simple-babel-plugin',
        visitor: {
            Identifier(path, state) {
                console.log(state.opts); // { name: 'lisi', age: 12 }
                if (path.node.name === 'a') {
                    // path.node.name = 'test666';
                    path.node.name = state.opts.name;
                }
            }
        }
    };
};