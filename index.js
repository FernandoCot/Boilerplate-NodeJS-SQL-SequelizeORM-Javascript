// Importing Core
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

// Importing Routes
import controllerUsers from './controllers/users';

// Calling Configs
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// Calling Routes
app.use('/users', controllerUsers);

// Handling unmatched endpoints
app.use((req, res, next) => {
  const erro = new Error('Rota não encontrada');
  erro.status = 404;
  next(erro);
});

// Generic error treatment (You can pass "status" and "message")
app.use((erro, req, res) => {
  res.status(erro.status || 500);
  res.json({
    erro: {
      status: erro.status || 500,
      mensagem: erro.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${3000}`));
