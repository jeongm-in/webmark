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
}
