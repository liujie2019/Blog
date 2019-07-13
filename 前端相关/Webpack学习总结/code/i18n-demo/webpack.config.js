const path = require('path');
const I18nPlugin = require('i18n-webpack-plugin');
const languages = {
	en: require('./en.json'),
	cn: require('./cn.json')
};
module.exports = Object.keys(languages).map(function(language) {
	return {
        name: language,
        mode: 'none',
		// mode: 'development || 'production',
		entry: './src/index.js',
		output: {
			path: path.join(__dirname, 'dist'),
			filename: language + '.output.js'
		},
		plugins: [new I18nPlugin(languages[language])]
	};
});