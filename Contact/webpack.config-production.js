const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        jsx: "./jsx.js",
        app: "./app.js"
    },
    output: {
        path: __dirname,
        filename: "[name].bundle.js"
    },
    stats: {
        colors: true,
        reasons: true
    },
    // cache: true,
    // debug: true,
    watch: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            styles: path.join(__dirname, 'styles'),
            scripts: path.join(__dirname, 'scripts'),
            bower: path.join(__dirname, 'bower_components'),
            components: path.join(__dirname, 'scripts', 'components')
        }
    },
    module: {
        preLoaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint'}
        ],
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: ["imports?this=>window", "babel"]},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url?5000'},
            {test: /\.css$/, loader: "style!css!postcss"},
            {test: /\.json$/, loader: 'json'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compressor: {
                warnings: false
            }
        })
    ],
    postcss: function () {
        return [
            require("postcss-cssnext")()
        ];
    }
};
