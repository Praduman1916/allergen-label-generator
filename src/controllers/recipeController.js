const { parseExcelFile } = require("../services/excelService");
const { fetchAllergenData } = require("../services/allergenService");

exports.processRecipes = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        console.log("req.file.buffer----", req.file.buffer);
        const recipes = parseExcelFile(req.file.buffer);
        const processedRecipes = await Promise.all(
            recipes.map(async (recipe) => {
                console.log(recipe)
                const { recipeName, ingredients } = recipe;
                const { allergens, flaggedIngredients, unrecognizedIngredients } = await fetchAllergenData(ingredients);

                return {
                    recipe_name: recipeName,
                    allergens,
                    flagged_ingredients: flaggedIngredients,
                    unrecognized_ingredients: unrecognizedIngredients,
                    message: unrecognizedIngredients.length > 0 ? "Some ingredients were not recognized." : "Processed successfully."
                };
            })
        );

        return res.json({ recipes: processedRecipes });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
