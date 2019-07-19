// const chrome = require('sinon-chrome');
module.exports = {
    'verbose': true, // helpful for debugging
    'roots': [
        '<rootDir>/src'
    ],
    'setupFiles': ['<rootDir>/src/__test__/setupTests.js'],
    'transform': {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    // globals: {
    //     'ts-jest': {
    //         diagnostics: false
    //     }
    // }
    // 'testEnvironment': 'node',
    // 'globals': {
    //     'chrome': {
    //         'i18n': {
    //             getMessage: (messageName, substitutions = undefined) => { }
    //         }
    //     },
    // }
}
