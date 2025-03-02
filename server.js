require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const recipeRoutes = require("./src/routes/recipeRoutes");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port::${PORT}`);
});






