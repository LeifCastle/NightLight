const mongoose = require("mongoose");

//------Models
const User = require("./user.js");

const host = "mongodb://localhost/nightLight";

mongoose.connect(host, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log(
    `Connected to MongoDB: NightLight at --> HOST: ${db.host} PORT: ${db.port}`
  );
});

db.on("error", (err) => {
  console.log(`Database error: ${err}`);
});

module.exports = {
  User,
};
