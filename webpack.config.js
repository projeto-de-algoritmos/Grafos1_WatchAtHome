const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/js/elementsHandler.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
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
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
    mode: 'development'
};

//Aprender como usar um loader para transpilar arquivos css.