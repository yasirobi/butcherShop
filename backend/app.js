const express = require("express");
const bodyParser = require("body-parser");
 const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')

const app = express();

const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')
const blogRoute = require('./routes/blog')

const connectDb = require('./config/db')

connectDb()

require('dotenv').config({
    path: './config/.env'
})
// if (process.env.NODE_ENV === 'development') {
//     app.use(cors({
//         origin: process.env.CLIENT_URL
//     }))
    
// }

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(express.static('./public'));
// app.use("/uploads", express.static("uploads"));

  app.use(express.json())
  app.use(cookieParser());
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors())
  app.use(morgan('dev'))


app.use('/api/v1', userRoute)
app.use('/api/v1', productRoute)
app.use('/api/v1', categoryRoute)
app.use('/api/v1', blogRoute)

  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`);
  });
  