const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
//Set up system
require("dotenv").config();
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');

const app = express();

//Connect DataBase
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})
    .then(() => { console.log("Successfully connect with DB"); })
    .catch((err) => { console.log(err); });

//MiddleWare to work with Express && API response JSON to Client
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Route
app.use('/api', blogRoute);
app.use('/api', authRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Start server on port ${port}`));
