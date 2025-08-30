const jwt = require('jsonwebtoken');

const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken; 

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided." });
    }

    try {
        
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

       
        req.user = decoded;

        console.log("Refresh token decoded user:", req.user);

        next(); 
    } catch (err) {
        console.error("Refresh token verification failed:", err.message);
        res.status(403).json({ message: "Invalid or expired refresh token." });
    }
};

module.exports = verifyRefreshToken;
