const path = require("path");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[id].css"}),
        new PurifyCSS({
            paths: glob.sync([
                // 要做CSS Tree Shaking的路径文件
                path.resolve(__dirname, "./*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, "./src/*.js")
            ])
        })
    ]
};
