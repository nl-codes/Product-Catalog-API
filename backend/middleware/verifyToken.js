import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token is missing" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userData) => {
        if (err) {
            return res.status(403).json({ error: "Invalid Token" });
        }
        req.user = userData;
        next();
    });
};
