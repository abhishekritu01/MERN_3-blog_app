import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';



import Connection from './databse/db.js';
import Router from './routes/route.js';

const app = express()
config();

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use('/', Router)



const port = process.env.PORT

app.listen(port, () => console.log(`server is running ${port}`))
Connection();
