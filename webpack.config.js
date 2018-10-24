const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: 'main.scss'
});

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    watch: true,
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [ 'css-loader', 'sass-loader' ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ [ 'env', {
                            targets: {
                                browsers: [ '> 1%', 'last 2 versions' ] //https://github.com/browserslist/browserslist#queries
                            }
                        } ] ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'image/',
                            publicPath: 'image/'
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        extractPlugin,
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin([
            'dist'
        ])
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    }
};
