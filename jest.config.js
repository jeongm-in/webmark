// const chrome = require('sinon-chrome');
module.exports = {
    'verbose': true, // helpful for debugging
    'roots': [
        '<rootDir>/src'
    ],
    'transform': {
        '^.+\\.tsx?$': 'ts-jest',
        "^.+\\.jsx?$": "babel-jest",
    },
    "runner": "jest-runner-eslint",
    // "setupFiles": ["<rootDir>src/setupTests.js"],
    // "testEnvironment": "node",
    // 'globals': {
    //     'chrome': {
    //         'i18n': {
    //             getMessage: (messageName, substitutions = undefined) => { }
    //         }
    //     },
    // }
}
