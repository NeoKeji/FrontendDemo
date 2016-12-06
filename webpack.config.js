var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
   entry: {
	main:'./src/js/main.js'
   },
	
   output: {
      path:'./',
      filename: '[name].js',
   },
   plugins: [new HtmlWebpackPlugin({
      title: 'My App',
      filename: '/index.html',
	  template: 'src/views/index.html',
	  inject: true
    })],
	
   devServer: {
      inline: true,
      port: 7776
   },
	
   module: {
      loaders: [ {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel',
			
         query: {
            presets: ['es2015', 'react']
         }
      },{
          test: /\.less$/,
          loader: "style!css!less"
      }]
   }
	
}

module.exports = config;
