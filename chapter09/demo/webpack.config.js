var path = require('path')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,//当遇到.css结尾的文件时
    //             use: [
    //                 'style-loader',//再通过style-loader转换，最后打包
    //                 'css-loader'//先通过css-loader加载器转换
    //             ]
    //         }
    //     ]
    // }
    module: {
        rules: [
            {
                test: /\.css$/,//当遇到.css结尾的文件时
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // 这里可以指定一个 publicPath
                        // 默认使用 webpackOptions.output中的publicPath
                        publicPath: '../'
                    },
                },
                    'css-loader',]
            }
        ]
    },
    plugins: [
        //重命名提取后的css文件
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]

}
module.exports = config;
// export default config;