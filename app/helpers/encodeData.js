import bcryptjs from 'bcryptjs';

const saltRounds = 10;

const encrypt = async (password) => {
  const hashedPass = await bcryptjs.hash(password, saltRounds);
  return hashedPass;
};

const decrypt = async (password, hash) => {
  const unhashedPassword = await bcryptjs.compare(password, hash);
  return unhashedPassword;
};

export { encrypt, decrypt };
