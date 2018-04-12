'use strict';
let webpack = require('webpack');

module.exports = {
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'angular2']
				}
			},
			{
				test: /\.html$/,
				loader: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['raw-loader']
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		],
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],

	devtool: 'source-map'
};
