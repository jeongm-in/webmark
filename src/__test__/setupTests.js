global.a = 'a';
// ReferenceError: chrome is not defined
// occurs in the files imported into .test.ts files:
// without the following line.
global.chrome = require('sinon-chrome');
