const express = require("express");
const app = express();
const connectDB = require("./config/database");

app.use(express.json());
//connection dataBase
connectDB();

app.use("/persons", require("./src/routes/person"));

//connection server
const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if (err) {
      throw err;
    } else {
      console.log(`server is running on port ${port}`);
    }
  });