const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    // watch: true,
    mode: 'production',
    optimization: {
        usedExports: true,
        sideEffects: false
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',

        }),
        new HtmlWebpackPlugin({
            title: 'Premature Optimization',
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
            
                },
                "css-loader",
                "sass-loader"
            ]
        }]
    }
};