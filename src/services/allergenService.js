const axios = require("axios");


exports.fetchAllergenData = async (ingredients) => {
    let allergens = new Set();
    let flaggedIngredients = {};
    let unrecognizedIngredients = [];

    for (let ingredient of ingredients) {
        try {
            const searchQuery = ingredient
                .replace(/\(.*?\)/g, "")
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "-");

            const response = await axios.get(
                `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&search_simple=1&json=1`
            );

            if (!response.data.products || response.data.products.length === 0) {
                unrecognizedIngredients.push(ingredient);
                continue;
            }

            const productData = response.data.products[0];
            const productAllergens = productData.allergens_tags || [];

            if (productAllergens.length > 0) {
                allergens = new Set([...allergens, ...productAllergens.map(a => a.replace("en:", ""))]);
                flaggedIngredients[ingredient] = productAllergens.map(a => a.replace("en:", ""));
            }
        } catch (error) {
            console.error(`⚠️ Error fetching data for ${ingredient}:`, error.message);
            unrecognizedIngredients.push(ingredient);
        }
    }

    return {
        allergens: [...allergens],
        flaggedIngredients,
        unrecognizedIngredients
    };
};


