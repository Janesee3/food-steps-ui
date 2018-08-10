const mongoose = require("mongoose");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/food-steps-cypress";
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