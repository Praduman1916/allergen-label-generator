const express = require("express");
const multer = require("multer");
const { processRecipes } = require("../controllers/recipeController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), processRecipes);

module.exports = router;
