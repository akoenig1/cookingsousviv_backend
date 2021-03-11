import mongoose from 'mongoose';
import keys from '../config/keys'

const connectToDb = async () => {
  const mongoDB = keys.MONGO_DB_URI
  
  try {
    const connection = await mongoose.connect(mongoDB, { 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    console.log(`Connected to database ${connection.connections[0].name}`);
  } catch (err) {
    console.log(err);
  }
} 

export default connectToDb;