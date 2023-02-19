// import HTTP Request and Response
import express, { Request, Response } from 'express';
import albumsRouter from './brands/brands.routes';
import artistsRouter from './founders/founders.routes';
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from "dotenv"

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use('/', [albumsRouter, artistsRouter]);

app.listen(port, () => {  console.log(`Example app listening at http://localhost:${port}`)});

if (process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode')
}

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to the Cars API</h1>');
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(cors());

app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);
