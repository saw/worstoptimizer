const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    watch: true,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'out.bundle.js'
    },
    plugins:[
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
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