module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [ // needed only for link.reac.test.js
        '@babel/plugin-proposal-class-properties'
    ]
};
