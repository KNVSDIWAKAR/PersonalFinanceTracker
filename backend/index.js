require("dotenv").config();
const app = require("./app.js");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is connected!"))

  .catch((err) => console.error(err));

app.listen(814, () => {
  console.log("Server is up on Port 814");
});
