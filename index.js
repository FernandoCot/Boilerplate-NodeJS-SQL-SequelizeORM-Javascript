
// Core
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

// Components
import { generateJWT, verifyToken } from './app/helpers/jwt';
import { User } from './app/models';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users/sign_up', async (req, res) => {
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

app.post('/users/login', async (req, res) => {
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

app.post('/validateToken', async (req, res) => {
  try {
    const usertoken = req.headers.usertoken;
    const tokenId = verifyToken(usertoken);
    res.json({
      id: tokenId.id,
    });
  } catch (e) {
    res.status(404).json('O token não existe ou está expirado.');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${3000}`));
