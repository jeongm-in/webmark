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
