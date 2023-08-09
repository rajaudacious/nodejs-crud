const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());

// connect to db
mongoose.connect(process.env.DB_CONNECT)
.then(()=>{console.log("db connected")}).catch((error)=>{console.log(error)})

// Import routes
const productRoutes = require("./routes/product");
const userRoute = require("./routes/user")

// Route Middleweres
app.use("/api/product",productRoutes);
app.use("/user",userRoute);

app.listen(4000, () => console.log("server up and runing on port 4000!"));