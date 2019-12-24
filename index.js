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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${3000}`));
