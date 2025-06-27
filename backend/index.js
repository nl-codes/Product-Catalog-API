import express from "express";
import connectDB from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

connectDB();

app.use("/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
