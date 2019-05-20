// const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: [
        'webpack-dev-server/client?http://localhost:8093/',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "/"),
        compress: true,
        port: 8093,
        hot: true,
        open: true,
        overlay: true
    },
    plugins: [
        // new MonacoWebpackPlugin()
    ]
};
