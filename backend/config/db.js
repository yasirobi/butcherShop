const mongoose = require('mongoose')


require("dotenv").config({ path: "./config/.env" });

const connectDb = async () => {
    try {
      await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
       
      })
      console.log(`MongoDB Database connected with HOST`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb