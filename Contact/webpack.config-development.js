const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
	entry  : {
		jsx: "./jsx.js",
		app: "./app.js"
	},
	output : {
		path    : __dirname,
		filename: "[name].bundle.js"
	},
	stats  : {
		colors : true,
		reasons: true
	},
	cache  : true,
	debug  : true,
	watch  : true,
	devtool: 'source-map',
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		alias     : {
			styles    : path.join( __dirname, 'styles' ),
			scripts   : path.join( __dirname, 'scripts' ),
			bower     : path.join( __dirname, 'bower_components' ),
			components: path.join( __dirname, 'scripts', 'components' )
		}
	},
	module : {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: [ "imports?this=>window", "babel", "eslint" ] },
			{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?5000' },
			{ test: /\.css$/, loader: "style!css?sourceMap" },
			{ test: /\.json$/, loader: 'json' }
		]
	},
	plugins: [
		new webpack.ProvidePlugin(
				{
					$     : 'jquery',
					jQuery: 'jquery'
				}
		)
	],
	postcss: function( webpack ) {
		return [
			require( "postcss-cssnext" )()
		];
	}
};
