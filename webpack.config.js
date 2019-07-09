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
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, 'node_modules'),
        loader: require.resolve('babel-loader'),
      },
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
        include: /node_modules/,
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
