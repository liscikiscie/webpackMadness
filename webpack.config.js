module.exports = {
    entry: './src/js/app.js',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'bundle.js'
    },
    watch: true,
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        present: [ [ 'env', {
                            targets: {
                                browsers: [ '> 1%', 'last 2 versions' ] //https://github.com/browserslist/browserslist#queries
                            }
                        } ] ]
                    }
                }
            }
        ]
    }
};
