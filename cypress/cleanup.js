const mongoose = require("mongoose");

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost/food-steps-cypress";
mongoose.connect(
  mongodbUri,
  async () => {
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped successfully.')
    mongoose.connection.close();
  }
);