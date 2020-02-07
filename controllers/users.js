// Core
import express from 'express';
const router = express.Router();

// Components
import { User } from '../app/models';
import { encrypt, decrypt } from '../app/helpers/encodeData';
import { generateJWT, verifyToken } from '../app/helpers/jwt';

// Requests

router.get('/', verifyToken, async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "name",
      "email",
      "createdAt",
      "updatedAt",
    ],
  });
  res.json(users);
});

router.get('/:id', verifyToken, async (req, res) => {
  const singleUser = await User.findOne({
    where: { id: req.params.id },
    attributes: [
      "id",
      "name",
      "email",
      "createdAt",
      "updatedAt",
    ],
  });
  res.json(singleUser);
});

router.post('/sign_up', async (req, res) => {
  let user;
  try {
    user = await User.create(req.body);
    res.json({
      name: user.name,
      email: user.email,
      token: generateJWT(user),
    });
  } catch (e) {
    res.status(422).json(e.errors)
  }
});

router.post('/login', async (req, res) => {
  let user;
  try {
    user = await User.findOne({where: { email: req.body.email }});
    if (user && user.password == req.body.password) {
      res.json({
        name: user.name,
        email: user.email,
        token: generateJWT(user),
      });
    } else {
      res.status(404).json();
    }
  } catch (e) {
    res.status(404).json(e.errors);
  }
});

router.post('/encryptPass', async (req, res) => {
  try {
    const password = req.body.password;
    const encryptResult = encrypt(password);
    res.json({
      password: encryptResult
    })
  } catch (e) {
    res.status(404).json('Erro ao encriptar a senha!');
  }
});

router.post('/decryptPass', async (req, res) => {
  try {
    const password = req.body.password;
    const decryptResult = decrypt(password);
    res.json({
      password: decryptResult,
    })
  } catch (e) {
    res.status(404).json('Erro ao decriptar a senha!');
  }
});

export default router;