const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'background': './src/background.ts',
    'option': './src/Option.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: "tsconfig.other.json"
        }
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  }
};
