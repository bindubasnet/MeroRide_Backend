const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Missing token!" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        if (err.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired!" });
        return res.status(403).json({ message: "Invalid token!" });
    }
};

module.exports = verifyToken;

