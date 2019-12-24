// Importing Core
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

// Importing Routes
import routeUsers from './routes/users';

// Calling Configs
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// Calling Routes
app.use('/users', routeUsers);

// Handling unmatched endpoints
app.use((req, res, next) => {
  const erro = new Error('Rota não encontrada');
  erro.status = 404;
  next(erro);
})

// Generic error treatment (You can pass status and message error)
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    erro: {
      mensagem: error.message
    }
  })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${3000}`));
