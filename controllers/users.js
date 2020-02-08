// Core
import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';

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

router.post('/sign_up', [
  body('name')
    .notEmpty().withMessage("O campo 'name' é obrigatório!"),
  body('email')
    .notEmpty().withMessage("O campo 'email' é obrigatório!")
    .isString().withMessage("O campo 'email' deve ser uma string!")
    .isEmail().withMessage("Email inválido!"),
  body('password')
    .notEmpty().withMessage("O campo 'senha' é obrigatório!")
    .isString().withMessage("O campo 'senha' deve ser uma string!")
    .isLength({ min: 8, max: 8 }).withMessage("A senha deve ter 8 dígitos!")
], async (req, res) => {
  let user;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const hashedPassword = await encrypt(req.body.password);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      res.json({
        name: user.name,
        email: user.email,
        token: generateJWT(user),
      });
    } catch (err) {
      res.status(422).json(err.errors)
    }
  }
});

router.post('/login', async (req, res) => {
  let user;
  try {
    user = await User.findOne({where: { email: req.body.email }});
    if (user) {
      const decryptedPass = await decrypt(req.body.password, user.password);
      if (decryptedPass) {
        res.json({
          name: user.name,
          email: user.email,
          token: generateJWT(user),
        });
      } else {
        res.status(404).json('Informações incorretas!');
      }
    } else {
      res.status(404).json('Credenciais incorretas!');
    }
  } catch (err) {
    res.status(404).json(err.errors);
  }
});

router.post('/encryptPass', async (req, res) => {
  try {
    const encryptResult = await encrypt(req.body.password);
    res.json({
      password: encryptResult
    })
  } catch (err) {
    res.status(404).json('Erro ao encriptar a senha!');
  }
});

router.post('/decryptPass', async (req, res) => {
  try {
    const decryptResult = await decrypt(req.body.password, '$2b$10$lMRDR.K617JeKxI0UOJf8.qVMlkCFEpIkvH9uZ2EDMJxOAq6RsFWy');
    if (decryptResult) {
      res.json({
        password: req.body.password,
      })
    } else {
      res.status(404).json('Senha incorreta!');
    }
  } catch (err) {
    res.status(404).json('Erro ao decriptar a senha!');
  }
});

export default router;