require("dotenv").config()
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const port = process.env.PORT || 8000;
const fileuploads = require("express-fileupload");
require("./database/db");


app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
}));



app.use(express.json());
app.use(fileuploads());

const userRoute = require("./route/userRoute")
app.use("/user", userRoute);

const adminRoute = require("./route/adminRoute")
app.use("/admin", adminRoute);


app.use(express.json());

app.listen(port || 8000, () => {
    console.log(`App Is listing On a Port: ${port}`)
})