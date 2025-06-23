import express from "express";
import mongoose from "mongoose";
import { Category, Product } from "./models.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const mongodb = mongoose.connect("mongodb://localhost:27017/product_catalog");
