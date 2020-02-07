// import crypto from 'crypto';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const encrypt = (password) => {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(hash)
    return hash;
  })
}

const decrypt = (password) => {

};


// iv = Initialization Vector

// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

//const encrypt = (password) => {
//  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//  let encrypted = cipher.update(password);
//  encrypted = Buffer.concat([encrypted, cipher.final()]);

//  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
//};

/*const decrypt = (password) => {
  let iv = Buffer.from(password.iv, 'hex');
  let encryptedPassword = Buffer.from(password.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedPassword);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};*/

export { encrypt, decrypt };