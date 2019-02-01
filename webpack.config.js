var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        host: '192.168.0.195',
        port: 3000,
        //useLocalIp: true,
        overlay: true
    },
    output: {
        path: __dirname + "/assets",
        filename: 'bundle.js',
        publicPath: '/',
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            BackendUrl: 'http://192.168.0.195:9000'
        })
    }
};
