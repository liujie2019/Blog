var path = require("path");

module.exports = {
    // mode: "development",
    mode: "production",
	entry: {
		pageA: "./src/pageA",
		pageB: "./src/pageB",
		pageC: "./src/pageC"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: { // 默认priority为0
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks,
                },
                vendorA: {
                    test: /lodash/, // 直接使用test来做路径匹配
                    chunks: "initial",
                    name: "vendor-pageA",
                    enforce: true,
                },
                vendorB: {
                    test: /react/, // 直接使用test来做路径匹配
                    chunks: "initial",
                    name: "vendor-pageB",
                    enforce: true,
                }
				// vendor: {
				// 	test: /node_modules/,
				// 	chunks: "initial",
				// 	name: "vendor",
				// 	priority: 10,
				// 	enforce: true
				// }
			}
        },
        runtimeChunk: 'single'
        // 等价于
        // runtimeChunk: {
        //     name: 'runtime'
        // }
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js"
	}
};