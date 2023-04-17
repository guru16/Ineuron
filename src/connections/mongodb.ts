import mongoose, {ConnectOptions} from "mongoose";
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

mongoose
  .connect('mongodb://127.0.0.1:27017/ineuron' || "http://localhost:8000", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions)
  .then((db) => {
    console.log("Database Connected Successfuly.");
  })
  .catch((err) => {
    console.log("Error Connectiong to the Database");
  });