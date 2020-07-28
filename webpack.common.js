const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: ['@babel/polyfill','./src/js/elementsHandler.js'],
        results: ['@babel/polyfill','./src/js/searchMovies.js'],
        movieInfo: ['@babel/polyfill', './src/js/movieInfo.js'],
        recommendMovies: ['@babel/polyfill', './src/js/recommender.js']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
    },module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        "@babel/plugin-transform-async-to-generator"
                    ]
                },
            },
        }, {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: "css-loader",
                },
                {
                    loader: "postcss-loader"
                },
                {
                    loader: "sass-loader",
                    options: {
                        implementation: require("sass"),
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }
            ]
        },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
};