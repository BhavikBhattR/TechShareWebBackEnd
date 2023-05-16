import mongoose, { mongo } from 'mongoose'

const connection = async (password) => {
    const URL = `mongodb+srv://bhattbhavikr340:${password}@cluster0.n4dx7fb.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL)
        console.log('database connected successfully')
    }catch(error){
        console.log('error while connecting', error)
    }
}

export default connection;