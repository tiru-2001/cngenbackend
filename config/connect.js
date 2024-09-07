import mongoose from 'mongoose';
import colors from 'colors';

const connectToDb = async () => {
  try {
    const connect_db = await mongoose.connect(process.env.MONGOOSE_CONNECTION);
    console.log(colors.rainbow('connected to the database'));
  } catch (e) {
    console.log(e);
  }
};

export default connectToDb;
