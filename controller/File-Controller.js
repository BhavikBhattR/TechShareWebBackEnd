import mongoose from "mongoose";
import multer from "multer";
import dotenv from 'dotenv';
import Grid from 'gridfs-stream';


const backedndURL = 'http://localhost:8000'
const conn = mongoose.connection;

let gfs, gridfsBucket;
conn.once("open", ()=>{
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
    bucketName: 'uploads' 
  });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
})

export const fileUpload_POST = (req,res) => {
  if(req.files.length > 0){
      let imageUrls = []
      for(let index=0; index<req.files.length; index++){
        imageUrls.push(`${backedndURL}/file/${req.files[index].filename}`)
      }
      return res.status(200).json({
          imageUrls: imageUrls
      })
  }
}

export const getImage = async(req,res)=>{
  try{
      const file = await gfs.files.findOne({filename: req.params.filename});
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
  }catch(error){
      return res.status(500).json({
        msg: 'no image found'
      })
  }
}

// import { gfs } from "../utils/upload.js";

// dotenv.config();

// const password = encodeURIComponent(process.env.MONGODB_PASS);
// const url = `mongodb+srv://bhattbhavikr340:${password}@cluster0.n4dx7fb.mongodb.net/?retryWrites=true&w=majority`
// const db = mongoose.createConnection(url, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });
// let gfs;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once("open", function(){
//   gfs = Grid(db.db, mongoose.mongo);
//   gfs.collection('uploads.files')
// })

// const imageURLs = [];
// const getFileUrl = (fileId) => {
//   console.log('getting url..')
//   return new Promise((resolve,reject)=>{
//     gfs.files.findOne({ _id: new mongoose.Types.ObjectId(fileId) }, function(err, file){
//       console.log('entered the good code')
//       if (err) {
//         const message = `File could not be uploaded ${req.files[index].originalname}`;
//         reject(message)
//      }else if(!file){
//        const message = 'file not found'
//        reject(message)
//      }else{
//        const readstream = gfs.createReadStream(req.files[index].filename);
//        console.log(readstream, 'readstream')
//        const fileUrl = readstream.path;
//        console.log(fileurl, 'fileurl')
//        resolve(fileurl)
//      }
//     })
//   })
// }


// export const fileUpload_POST = (req,res) => {
//   console.log('req received')
//   console.log(req.files.length, 'lrngth')
//     if(req.files.length == 0){
//       res.status(200).json({
//         msg: 'no file found in the request'
//       })
//     }
//    for(let index = 0; index<req.files.length; index++){
//     const fileId =  req.files[index].id.toString();
//     //req.files[index].id
//     console.log(typeof(fileId))
//     console.log('fileid', fileId)

//     if(mongoose.Types.ObjectId.isValid(fileId)){
//       console.log('isvalid')
//     }else{
//       console.log('not valid')
//     }

//       getFileUrl(fileId)
//       .then((fileURL)=> imageURLs.push(fileURL))
//       .catch((err)=> console.log('error', err))

//       console.log('imageurls', imageURLs)
//    }

//    res.status(200).json({
//       imageURLs: imageURLs
//    })
// }