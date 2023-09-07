const mongoose = require("mongoose");
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const PORT = process.env.PORT || 3500;

const DB_URI = process.env.DB_URI;

const dbConnection = async (app) => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database Connected");
    app.listen(PORT, () => console.log("Server is running on port " + PORT));
  } catch (error) {
    console.log(`Database Connection Error: ${error.message}`);
  }
};

module.exports = dbConnection;
