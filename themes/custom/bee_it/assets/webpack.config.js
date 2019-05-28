/**
* -----------------------------------------------------------------------
Run `webpack` and it will produce unminified output with sourcemaps.
Run `NODE_ENV=production webpack` and it will minify the output and
de-dupe all the unnecessary code.
* -----------------------------------------------------------------------
*/

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	mode: 'development',
	context: path.join(__dirname, "js/"),
	// comment source map so drupal doesn't break when doing aggregation
	// devtool: debug ? "eval-source-map" : true,
	entry: "./bundle.js",
	watch: true,
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: [ 'es2015', 'stage-0'],
					plugins: [ ],
				}
			}
		]
	},
	output: {
		path: __dirname + "/js",
		filename: "./bundle.min.js",
		// library: 'forms',
		// libraryTarget: 'window',
		// libraryExport: 'default'
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourceMap: false }),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
};
