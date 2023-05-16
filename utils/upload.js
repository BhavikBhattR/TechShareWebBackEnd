import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';


dotenv.config();


const password = encodeURIComponent(process.env.MONGODB_PASS);
const url = `mongodb+srv://bhattbhavikr340:${password}@cluster0.n4dx7fb.mongodb.net/?retryWrites=true&w=majority`

// dotenv.config();


// const password = encodeURIComponent(process.env.MONGODB_PASS);
// const url = `mongodb+srv://bhattbhavikr340:${password}@cluster0.n4dx7fb.mongodb.net/?retryWrites=true&w=majority`
// const db = mongoose.connection;
// export let gfs;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once("open", function(){
//   gfs = Grid(db.db, mongoose.mongo);
//   gfs.collection('uploads')
// })



const storage = new GridFsStorage({
    url: url ,
    options: {useNewUrlParser: true} ,
    file: (req, file) => {

        const match = ["image/png", "image/jpg", "image/jpeg"]

        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-blog-${file.originalname}`
        }

        return new Promise((resolve,reject)=>{
            const fileInfo = {
                bucketName: 'uploads',
                fileName: `${Date.now()}-blog-${file.originalname}`
            };
            resolve(fileInfo)
        })
    }
})

const upload = multer({storage})

export default upload