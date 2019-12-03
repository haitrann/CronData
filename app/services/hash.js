const CryptoJS = require("crypto-js");

const secretKey = '123'

const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

const decrypt = (data) => {
    let bytes  = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
}