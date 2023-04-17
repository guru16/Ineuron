import express, { Application } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
require('express-async-errors');
import morgan from "morgan";
import router from './routes'
import './connections/mongodb';
import dotenv from "dotenv"
dotenv.config()
import * as swaggerUI from 'swagger-ui-express';
const swaggerFile = require('../swagger_output.json')


export const app: Application = express();
const port: Number = Number(process.env.PORT) || 3006;

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api', router);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))



app.listen(port, () => {
    console.log('Connect to server ', port);
});
