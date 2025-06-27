// Import service-level functions for handling category data operations
import { addUsers, verifyUser } from "../services/userService.js";

export const registerUser = async (req, res) => {
    try {
        const registerdUser = await addUsers(req.body);
        res.status(200).json(registerdUser);
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
        res.status(200).json(loginUser);
    } catch (err) {
        let status = 400;
        console.error("❌ Error registering user: ", err);
        res.status(status).json({ error: err.message });
    }
};
