module.exports = {
  entry: "./src/Index.js",
  output: {
    path: __dirname,
    filename: "./docs/js/index.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
