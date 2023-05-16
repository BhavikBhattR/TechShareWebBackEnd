import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv'
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const password = encodeURIComponent(process.env.MONGODB_PASS);

const app = express()


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router);


app.use((req,res,next)=>{
    res.status(500).json({
        msg: 'there was an error'
    })
})
  

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`Server is running on PORT ${PORT}`);
    await connection(password)
})