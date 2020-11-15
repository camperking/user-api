const crypto = require('crypto');
const salt = "Y0ayIjoicG9pnVsnVsbCdXbH0oiLCJpZCCI6bXVwi";

exports.getHash = (password) => {
    var hash = crypto.createHash('sha256');
    hash.update(salt + password);
    return hash.digest('hex');
}