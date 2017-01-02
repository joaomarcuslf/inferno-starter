const { join } = require('path');
const { isProd, plugins } = require('./setup');
const babel = require('./babel');

const out = join(__dirname, '../dist');
const exclude = /(node_modules|bower_components)/;

if (isProd) {
	babel.presets.push('babili');
}

module.exports = {
	entry: {
		app: './src/index.js',
	},
	output: {
		path: out,
		filename: '[name].[hash].js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: exclude,
			loader: 'babel-loader',
			options: babel
		}, {
			test: /\.s(a|c)ss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}]
	},
	plugins: plugins,
	devtool: !isProd && 'eval',
	devServer: {
		contentBase: out,
		port: process.env.PORT || 3000,
		historyApiFallback: true,
		compress: isProd,
		inline: !isProd,
		hot: !isProd
	}
};
