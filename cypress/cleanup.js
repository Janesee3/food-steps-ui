require('dotenv').config();
const mongoose = require("mongoose");

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) console.log('process.env.MONGODB_URI is not defined for cleanup script.');
mongoose.connect(
  mongodbUri,
  async () => {
    try {
      await mongoose.connection.db.dropDatabase();
      console.log('Database dropped successfully.')
    } catch (err) {
      console.log('Oops, database not dropped!', err);
    }
    mongoose.connection.close();
  }
);