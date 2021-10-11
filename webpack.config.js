const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
module.exports = {
	mode: 'development',
	entry: [ './src/index.js' ],
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{ test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.css$/, use: [ 'vue-style-loader', 'css-loader' ] }
        ]
	},
	plugins: [
		new VueLoaderPlugin(),
	],
}
