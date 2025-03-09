const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();

const connectDB = require('./config/db');
const serverRoutes = require('./routes/apiRoutes')

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/", serverRoutes);


app.listen(5500, () => console.log("Server running on port 5500"));