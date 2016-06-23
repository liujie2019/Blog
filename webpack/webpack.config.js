// var webpack = require('webpack');
// var config = {
//     entry: {
//     	index : "./entry.js"
//     },
//     output: {
//     	  //__dirname表示当前目录
//         path: __dirname + '/dist',
//         filename: "[name].bundle.js"
//     },
//     module: {
//         loaders: [
//             { test: /\.css$/, loader: "style!css" }
//         ]
//     }
// };
// module.exports = config;
/*

 */
var webpack = require('webpack');
var config = {
    entry:{
        main1:'./main1',
        main2:'./main2'
    },
    output:{
        filename:'bundle.[name].js'
    },
    plugins: [
        new  webpack.optimize.CommonsChunkPlugin('common.js', ['main1', 'main2'])
    ]
};
module.exports = config;
