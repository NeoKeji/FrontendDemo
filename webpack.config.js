var config = {
   entry: {
	main:'./src/js/main.js'
   },
	
   output: {
      path:'./',
      filename: '[name].js',
   },
	
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
      }]
   }
	
}

module.exports = config;
