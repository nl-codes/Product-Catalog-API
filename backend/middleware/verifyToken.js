import jwt from "jsonwebtoken";

/**
 * @function verifyToken
 * @description Middleware to verify and decode a JWT token from the Authorization header.
 *              If valid, attaches the decoded user data to `req.user` and calls the next middleware.
 *              Otherwise, responds with appropriate error messages.
 *
 * @returns {Object|void} Responds with a 401 status if token is missing,
 *                        or a 403 status if token is invalid.
 *                        Otherwise, proceeds to the next middleware.
 *
 * @note Expects the token in the format: Authorization: Bearer <token>
 */
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
