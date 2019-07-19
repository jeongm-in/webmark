global.a = 'a';
// Without the following line, the following error occurs
// in the files imported into .test.ts files:
// ReferenceError: chrome is not defined 
global.chrome = require('sinon-chrome');
