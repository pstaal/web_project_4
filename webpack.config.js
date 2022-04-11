// webpack.config.js

const path = require("path"); // connect path to webpack config

module.exports = {
    devtool: 'inline-source-map',
    entry: {
      main: './src/index.js'
    },
    stats: 'errors-only',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js", 
        publicPath: ""
      },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'), // specifies a folder from where to serve the application and its contents
        compress: true, // this will speed up file loading in development mode
        port: 8080, // will open your site at localhost:8080 (you can use another port)
        open: true // site will open automatically in the browser after executing npm run dev
      },
};