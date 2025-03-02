
```markdown
# **Allergen Label Generator**

This project processes recipes from an Excel file, extracts their ingredients, and determines the allergens that should be listed on the product label using external food data sources.

---

## ** Features**
- Upload an **Excel file** containing multiple recipes.  
- Extract ingredients for each recipe.  
- Identify allergens associated with each ingredient.  
- Handle **missing or unrecognized ingredients**.  
- Return structured **JSON output** with allergens and flagged ingredients.  

---

## ** Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Praduman1916/allergen-label-generator
cd allergen-label-generator
```

### **2️ Install Dependencies**
```sh
npm install
```

### **3️ Start the Server**
```sh
npm run dev
```
The API will run at:  
```
http://localhost:9000
```

---

## ** API Usage**
### **1️⃣ Upload Recipe Excel File**
#### **➡️ Endpoint:**  
```
POST /api/recipes/upload
```
#### **➡️ Request Type:**  
`multipart/form-data`  
#### **➡️ Request Body:**  
| Key  | Type  | Description  |
|------|------|-------------|
| file | File | Upload `.xlsx` file |

#### **➡️ Sample Request (Postman)**
1. **Select `POST` method.**
2. **Enter URL:** `http://localhost:9000/api/recipes/upload`
3. **Go to `Body` → `form-data`.**
4. **Upload the file under key: `"file"`**.

#### **📥 Sample Excel Format**
| Product | Ingredients |
|---------|------------|
| Margherita | Dough |
| Margherita | Tomato Sauce |
| Margherita | Mozzarella Cheese |
| Pepperoni | Dough |
| Pepperoni | Tomato Sauce |

---

## ** Sample API Response**
```json
{
    "recipes": [
        {
            "recipe_name": "Margherita",
            "allergens": [
                "gluten"
            ],
            "flagged_ingredients": {
                "dough": [
                    "gluten"
                ]
            },
            "unrecognized_ingredients": [],
            "message": "Processed successfully."
        },
        {
            "recipe_name": "Four Cheese",
            "allergens": [
                "gluten"
            ],
            "flagged_ingredients": {
                "dough": [
                    "gluten"
                ]
            },
            "unrecognized_ingredients": [
                "mozzarella",
                "cheddar",
                "parmesan",
                "blue cheese"
            ],
            "message": "Some ingredients were not recognized."
        },
    ]
}
```

---

## ** How It Works**
1. **Read Excel file**: Uses `xlsx` to extract **Product (recipe name)** and **Ingredients**.
2. **Process Ingredients**: Cleans data and removes duplicates.
3. **Fetch Allergen Information**:
   - Calls **Open Food Facts API** or uses a predefined allergen list.
   - Matches allergens for each ingredient.
4. **Format Response**:
   - `allergens`: List of detected allergens.
   - `flagged_ingredients`: Ingredients mapped to their allergens.
   - `unrecognized_ingredients`: Ingredients that were not found in the database.

---

## ** Potential Improvements**
### ** What Would We Do Differently If We Had More Time?**
- **Use More Reliable API**.Use a More Reliable API instead of Open Food Facts*
- **Improve Ingredient Matching** (e.g., fuzzy search to match similar ingredients).

### ** How Can This Be Scaled Further?**
- **Cache Results (Redis)** → Store frequent ingredient searches for faster response.
- **Parallel API Calls** → Improve performance by processing multiple ingredients at once.

### ** Additional Features**
- **User Dashboard** → Upload and track past analyses.
- **Mobile App Integration** → Scan barcodes and check allergens on the go.
- **Multilingual Support** → Display allergen info in different languages.



