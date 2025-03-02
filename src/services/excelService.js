const xlsx = require("xlsx");
exports.parseExcelFile = (fileBuffer) => {
    const xlsx = require("xlsx");
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    let recipes = {};

    data.forEach(row => {
        let recipeName = row["Product"]?.trim();
        let ingredient = row["Ingredients"]?.trim().toLowerCase();

        if (!recipeName || !ingredient) return;

        if (!recipes[recipeName]) {
            recipes[recipeName] = new Set();
        }
        recipes[recipeName].add(ingredient);
    });

    return Object.keys(recipes).map(recipeName => ({
        recipeName,
        ingredients: Array.from(recipes[recipeName])
    }));
};
