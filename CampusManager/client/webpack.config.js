const path = require('path');

module.exports = {
	context: __dirname,
	entry: [
		'babel-polyfill',
		path.resolve(__dirname, 'index'),
	],
	output: {
		path: '../wwwroot/dist',
		publicPath: '/',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0', 'react', ],
					plugins: ['transform-decorators-legacy', ],
				},
			},
			{
				test: /(\.css)$/,
				use: [
					{ loader: 'style-loader', },
					{ loader: 'css-loader', },
				],
			},
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx', ],
	},
	eslint: {
		configFile: './.eslintrc',
	},
	devtool: 'source-map',
};
