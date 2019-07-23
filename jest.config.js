module.exports = {
    verbose: true, // helpful for debugging
    roots: [
        '<rootDir>/src'
    ],
    setupFiles: ['<rootDir>/src/__test__/setupTests.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
    },
    globals: {
        'ts-jest': { // need a tsconfig with jsx: react
            tsConfig: '<rootDir>/tsconfig.other.json'
        }
    },
    collectCoverage: true,
}
