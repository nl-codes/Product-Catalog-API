import jwt from "jsonwebtoken";

/**
 * @function generateToken
 * @description Generates a JSON Web Token (JWT) using the provided payload.
 *              The token is signed with a secret key from environment variables and expires in 1 hour.
 *
 * @param {Object} payload - The data to encode into the JWT
 * @returns {string} A signed JWT token valid for 1 hour.
 *
 * @throws {Error} If the JWT secret key (`process.env.JWT_SECRET_KEY`) is not set.
 *
 */
export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        throw new Error("JWT secret key is missing in environment variables");
    }

    return jwt.sign(payload, secret, { expiresIn: "1h" });
};
