// Import service-level functions for handling category data operations
import { generateToken } from "../middleware/generateToken.js";
import { addUsers, verifyUser } from "../services/userService.js";

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
