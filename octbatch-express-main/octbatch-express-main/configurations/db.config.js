const mongoose = require("mongoose");

async function dbConfig() {
  const uri = process.env.MONGO_URI ||
    "mongodb+srv://express-main:123express-main@cluster0.jnj9mxw.mongodb.net/sample_mflix?appName=Cluster0";

  try {
    await mongoose.connect(uri);
    console.log("DB is connected successfully!!");
  } catch (error) {
    console.error("DB connection error:", error);
  }
}
module.exports = { dbConfig };
