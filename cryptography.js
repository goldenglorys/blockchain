const UUID = require('uuid');
const HASH = require('hash.js') //this required minimalistic-assert module
const SHAJS = require('sha.js'); //this required safe-buffer module
const MD5 = require('md5.js'); //this required hash-base module
const BASE64 = require('js-base64').Base64;


// console.log(UUID.v4());

// console.log(HASH.sha256().update('abc').digest('hex'));

// console.log(new SHAJS.sha256().update('42').digest('hex'));
// console.log(SHAJS('sha256').update('42').digest('hex'))
console.log(SHAJS('sha256').update('42').toString('hex'))

// console.log(new MD5().update('42').digest('hex'))

// console.log(BASE64.encode('Glory'));
// console.log(BASE64.decode('R2xvcnk'));

