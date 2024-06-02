require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const verifyAuth = require('./middlewares/verifyAuth');

// routes
const authRoute = require('./routes/auth');
const quizRoute = require('./routes/quiz');

const app = express();

app.use(express.json());
app.use(cors({ Credentials: true, origin: "http://localhost:5173" }));

const PORT = 3000;

app.get('/test', verifyAuth, (req, res) => {
    console.log("Test API");
    res.json({
        service: "Test API",
        status: "OK",
        time: new Date(),
    });
});

// api
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/quiz', verifyAuth, quizRoute);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        errorMessage: "Something went wrong!"
    });
});


app.listen(PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
});