'use strict'
const crypto = require('crypto');
const secret = 'abcdegg';
module.exports = function crypt (whatToCrypt) {
  let hash = crypto.createHmac('sha512', secret)
                   .update(whatToCrypt)
                   .digest('hex');
return (hash);
}
