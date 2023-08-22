const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("database connection failed");
  }
};
module.exports = {
  dbConnection,
};
