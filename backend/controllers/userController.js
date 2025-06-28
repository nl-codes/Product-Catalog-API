// Import service-level functions for handling category data operations
import { generateToken } from "../utils/generateToken.js";
import { addUsers, verifyUser } from "../services/userService.js";

/**
 * @function registerUser
 * @description Controller for handling user registration (admin or user).
 *              Calls the `addUsers` service to create a new user, generates a JWT token,
 *              and responds with a success message and token if registration succeeds.
 *
 * @throws {Error} Returns appropriate HTTP status codes:
 * - 404 if username or password is missing
 * - 400 for other input or server-side errors
 *
 * @returns {Object} JSON response with a success message and JWT token.
 *
 * @example Request
 * {
 *   "username": "john_doe",
 *   "password": "securePass123",
 *   "role": "user"
 * }
 *
 * @example Response
 * {
 *   "message": "Registration Successfull",
 *   "token": "<JWT_TOKEN>"
 * }
 *
 * @note Middleware like `attachRole("user")` or `attachRole("admin")` should be used beforehand
 *       to ensure the `role` field is present in `req.body`.
 */
export const registerUser = async (req, res) => {
    try {
        const registeredUser = await addUsers(req.body);
        const token = generateToken(registeredUser.toJSON());
        res.status(200).json({
            message: "Registration Successfull",
            token: token,
        });
    } catch (err) {
        let status = 400;
        if (err.message === "Username and Password required.") {
            status = 404;
        }
        console.error("❌ Error registering user: ", err);
        res.status(status).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const loginUser = await verifyUser(req.body);
        const token = generateToken(loginUser.toJSON());
        res.status(200).json({ messge: "Login Successful", token: token });
    } catch (err) {
        let status = 400;
        console.error("❌ Error registering user: ", err);
        res.status(status).json({ error: err.message });
    }
};
