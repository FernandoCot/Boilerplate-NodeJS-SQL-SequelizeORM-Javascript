import bcrypt from 'bcrypt';

const saltRounds = 10;

const encrypt = async (password) => {
  const hashedPass = await bcrypt.hash(password, saltRounds)
  return hashedPass
}

const decrypt = async (password, hash) => {
  const unhashedPassword = await bcrypt.compare(password, hash)
  return unhashedPassword
};

export { encrypt, decrypt };