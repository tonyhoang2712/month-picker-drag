const webpack = require('webpack');
const path = require('path');
const { name } = require("./package.json")

module.exports = {
    entry: path.resolve(__dirname,"./src/index.js"),
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: name + '.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/,
                options: {
                    loaders: {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                    }
                },
                cssSourceMap: true,
                transformToRequire: {
                    video: ["src", "poster"],
                    source: "src",
                    img: "src",
                    image: "xlink:href"
                }
            }
        }
    ]
  }
};