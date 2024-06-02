const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const formattedEmail = email.toLowerCase();

        // considering to use YUP, JOI, EXPRESS VALIDATOR  
        if (!name || !email || !password) {
            return res.status(400).json({
                errorMessage: "Please enter all fields",
            });
        }

        // checking existing user
        const isExistingUser = await User.findOne({ email: formattedEmail });
        if (isExistingUser) {
            return res.status(409).json({
                errorMessage: "User already exists",
            });
        }

        // password hashing using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({ name, email: formattedEmail, password: hashedPassword });
        await userData.save();

        res.status(201).json({
            message: "User registered successfully",
        })
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Please enter all fields",
            });
        }

        // checking existing user
        const userDetails = await User.findOne({ email: email });
        if (!userDetails) {
            return res.status(409).json({
                errorMessage: "User doesn't exist",
            });
        }

        // comparing password
        const isPasswordMatch = await bcrypt.compare(password, userDetails.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                errorMessage: "Invalid credentials",
            });
        }

        // jwt token
        const token = jwt.sign({ userID: userDetails._id }, process.env.JWT_SECRET, { expiresIn: "60h" });

        res.json({
            message: "User logged in successfully",
            token: token,
            name: userDetails.name,
        });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    registerUser,
    loginUser,
}