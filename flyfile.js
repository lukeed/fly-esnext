// this will be included when fly imports plugins
// before it reaches this file so this is this easiest
// way to test it.
require('./index.js')

// `./test.js` has a async function function in it so
// if it doesn't run then it means this package doesn't work
module.exports.default = require('./test.js').default
