
// Core
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

// Routes
import routeUsers from './routes/users';

// Calling Configs
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Calling Routes
app.use('/users', routeUsers);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${3000}`));
