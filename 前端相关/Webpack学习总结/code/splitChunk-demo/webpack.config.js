const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
	// mode: "development" || "production",
	entry: {
		pageA: './src/pageA',
		pageB: './src/pageB',
		pageC: './src/pageC'
	},
	optimization: {
		splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-', // 设置打包分隔符
			cacheGroups: {
				commons: {
					chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5,
                    minSize: 0,
                    name: 'commons'
				},
				// vendor: {
				// 	test: /node_modules/,
				// 	chunks: 'initial',
				// 	name: 'vendor',
				// 	priority: 10,
				// 	enforce: true
                // },
                'vendor-pageA': {
					test: /vendor1/,
					chunks: 'initial',
					name: 'vendor-pageA',
					enforce: true
                },
                'vendor-pageB': {
					test: /vendor2/,
					chunks: 'initial',
					name: 'vendor-pageB',
					enforce: true
				}
            }
        },
        runtimeChunk: 'single'
        // runtimeChunk: {
        //     name: 'runtime'
        // }
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};