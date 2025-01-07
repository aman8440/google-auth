import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import './db/connection';
import { OAuth2Client } from 'google-auth-library';

const api = require("./routes/user");
dotenv.config();
const app = express();

const client_id = new OAuth2Client();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.use(api);

app.listen(process.env.PORT,()=>{
  console.log(`app running at ${process.env.PORT} and http://localhost:${process.env.PORT}`)
});