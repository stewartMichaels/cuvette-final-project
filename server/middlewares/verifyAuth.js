const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    try {
        // const token = req.cookies.token;
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader;

        // console.log(`Token: ${token}`);
        // console.log(`Header: ${authorizationHeader}`);

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decode);
        req.currentUserID = decode.userID;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access! Invalid Token",
        });
    }
}

module.exports = verifyToken;