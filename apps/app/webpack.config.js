const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = () => {
    const env = dotenv.config().parsed
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next])
        return prev
    }, {})

    return {
        resolve: {
            alias: {
                "../../theme.config$": path.join(__dirname, "/semantic-ui/theme.config"),
                "../semantic-ui/site": path.join(__dirname, "/semantic-ui/site")
            }
        },
        mode: 'production',
        entry: './src/index.tsx',
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    include: path.resolve(__dirname, 'src'),
                    exclude: path.resolve(__dirname, 'node_modules')
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                    exclude: '/node_modules/'
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            },
                        }
                    ]
                }
            ]
        },
        output: {
            filename: 'bundle.min.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html' 
            }),
            new webpack.DefinePlugin(envKeys)
            //new BundleAnalyzerPlugin({
                //analyzerMode: 'json'
            //})
        ],
        devServer: {
            historyApiFallback: true
        },
        devtool: false
    }
}
