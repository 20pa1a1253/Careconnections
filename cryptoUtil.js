const crypto=require('crypto');
require('dotenv').config();

const algorithm='aes-256-cbc';
const secretakey=Buffer.from(process.env.SESSION_SECRET,'base64');
const ivLength=16;
const encrypt=(text)=>{
    const iv=crypto.randomBytes(ivLength);
    const cipher=crypto.createCipheriv(algorithm,secretakey,iv);
    let encrypted=cipher.update(text);
    encrypted=Buffer.concat([encrypted,cipher.final()]);
    return iv.toString('hex')+':'+encrypted.toLocaleString('hex');
};
const decrypt=(text)=>{
    const textparts=text.split(':');
    const iv=Buffer.from(textparts.shift(),'hex');
    const encryptedtext=Buffer.from(textparts.join(':'),'hex');
    const decipher=crypto.createDecipheriv(algorithm,secretakey,iv);
    let decrypted=decipher.update(encryptedtext);
    decrypted=Buffer.concat([decrypted,decipher.final()]);
    return decrypted.toString();

};
module.exports={
    encrypt,decrypt
};