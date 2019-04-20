const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    watch: true,
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'out.[chunkhash].js'
    },
    plugins:[
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[chunkhash].css',

        }),
        new HtmlWebpackPlugin({
            title: 'Premature Optimization',
            // Load a custom template (lodash by default)
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new CopyPlugin([
            { from: path.resolve(__dirname, 'src', 'CNAME'), to: path.resolve(__dirname, 'docs') },
        ]),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
            test: /\.(sass|scss)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                    //   publicPath:path.resolve(__dirname, 'public'),
                    //   hmr: process.env.NODE_ENV === 'development',
                    },
            
                },
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    }
};