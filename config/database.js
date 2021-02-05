const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose.connect(config.get("MONGO_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },(err) => {
      if (err) {
        console.log(err);
      } else console.log("database connected");
    }
  );
};
module.exports = connectDB;
