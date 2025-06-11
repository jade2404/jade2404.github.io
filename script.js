document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables to store user selections
    let selectedTime = '';
    let selectedIngredients = '';
    let selectedRestrictions = '';
    let selectedMood = '';

    // Get references to HTML elements
    const timeOptions = document.querySelectorAll('input[name="time"]');
    const ingredientsOptions = document.querySelectorAll('input[name="ingredients"]');
    const restrictionsOptions = document.querySelectorAll('input[name="restrictions"]');
    const moodOptions = document.querySelectorAll('input[name="mood"]');
    const generateButton = document.getElementById('generate-recipe-btn');
    const recipeNameDisplay = document.getElementById('recipe-name');
    const errorMessageDisplay = document.getElementById('error-message');

    // Get references to feedback messages
    const timeFeedback = document.getElementById('time-feedback');
    const ingredientsFeedback = document.getElementById('ingredients-feedback');
    const restrictionsFeedback = document.getElementById('restrictions-feedback');
    const moodFeedback = document.getElementById('mood-feedback');

    // Function to update selected value and provide visual feedback
    const updateSelection = (options, feedbackElement, category) => {
        options.forEach(option => {
            option.addEventListener('change', (event) => {
                const label = event.target.closest('.option-label');

                // Remove 'selected' class from all labels in the group
                options.forEach(opt => {
                    opt.closest('.option-label').classList.remove('selected');
                });

                // Add 'selected' class to the currently chosen label
                label.classList.add('selected');

                // Store the selected value
                switch (category) {
                    case 'time':
                        selectedTime = event.target.value;
                        break;
                    case 'ingredients':
                        selectedIngredients = event.target.value;
                        break;
                    case 'restrictions':
                        selectedRestrictions = event.target.value;
                        break;
                    case 'mood':
                        selectedMood = event.target.value;
                        break;
                }

                // Hide feedback message if an option is selected
                feedbackElement.style.display = 'none';
            });
        });
    };

    // Attach change listeners to all option groups
    updateSelection(timeOptions, timeFeedback, 'time');
    updateSelection(ingredientsOptions, ingredientsFeedback, 'ingredients');
    updateSelection(restrictionsOptions, restrictionsFeedback, 'restrictions');
    updateSelection(moodOptions, moodFeedback, 'mood');

    // Function to get recipe based on selections
    const getRecipe = (time, ingredients, restrictions, mood) => {
        // Recipe data with names and URLs
        const recipes = {
            'Spicy chicken stir-fry': 'https://www.allrecipes.com/recipe/223382/quick-chicken-stir-fry/',
            'Mac and cheese': 'https://www.allrecipes.com/recipe/11679/homemade-mac-and-cheese/',
            'Soya-glazed veggie stir-fry': 'https://www.bbcgoodfood.com/recipes/soy-glazed-vegetable-stir-fry',
            'Peanut butter banana smoothie': 'https://www.allrecipes.com/recipe/213742/peanut-butter-banana-smoothie/',
            'Menemen (turkish eggs)': 'https://www.bbcgoodfood.com/recipes/menemen',
            'Honey glazed chicken and veggies': 'https://www.delish.com/cooking/recipe-ideas/a26084913/honey-garlic-chicken-and-veggies/',
            'Spicy veggie Tacos': 'https://www.bbcgoodfood.com/recipes/spicy-veggie-tacos',
            'Garlic chicken rice': 'https://www.allrecipes.com/recipe/87910/garlic-chicken-fried-rice/',
            'Creamy mushroom risotto': 'https://www.bbcgoodfood.com/recipes/mushroom-risotto',
            'Coconut carrot curry': 'https://www.bbcgoodfood.com/recipes/coconut-carrot-curry',
            'Lentil soup': 'https://www.allrecipes.com/recipe/13978/lentil-soup/',
            'Spicy baked chicken enchilladas': 'https://www.allrecipes.com/recipe/22831/chicken-enchiladas/',
            'Stuffed Peppers with rice and veggies': 'https://www.allrecipes.com/recipe/16354/stuffed-peppers/',
            'Sweet Potatoe Casserole': 'https://www.allrecipes.com/recipe/13715/sweet-potato-casserole-ii/'
        };

        let recipeName = null;

        // Implement the logical statements provided
        // <15 ∧ C ∧ N ∧ SP → SCSF
        if (time === '<15' && ingredients === 'C' && restrictions === 'N' && mood === 'SP') recipeName = 'Spicy chicken stir-fry';
        // <15 ∧ M ∧ N ∧ SA → M&C
        else if (time === '<15' && ingredients === 'M' && restrictions === 'N' && mood === 'SA') recipeName = 'Mac and cheese';
        // <15 ∧ V ∧ VE ∧ SA → SVSF
        else if (time === '<15' && ingredients === 'V' && restrictions === 'VE' && mood === 'SA') recipeName = 'Soya-glazed veggie stir-fry';
        // <15 ∧ M ∧ VEG ∧ SW → PBBS
        else if (time === '<15' && ingredients === 'M' && restrictions === 'VEG' && mood === 'SW') recipeName = 'Peanut butter banana smoothie';
        // <15 ∧ V ∧ VEG ∧ SP → MEN
        else if (time === '<15' && ingredients === 'V' && restrictions === 'VEG' && mood === 'SP') recipeName = 'Menemen (turkish eggs)';
        // 15-45 ∧ C ∧ N ∧ SW → HCV
        else if (time === '15-45' && ingredients === 'C' && restrictions === 'N' && mood === 'SW') recipeName = 'Honey glazed chicken and veggies';
        // 15-45 ∧ V ∧ VE ∧ SP → SVT
        else if (time === '15-45' && ingredients === 'V' && restrictions === 'VE' && mood === 'SP') recipeName = 'Spicy veggie Tacos';
        // 15-45 ∧ C ∧ N ∧ SA → GCR
        else if (time === '15-45' && ingredients === 'C' && restrictions === 'N' && mood === 'SA') recipeName = 'Garlic chicken rice';
        // 15-45 ∧ V ∧ VEG ∧ SA → CMR
        else if (time === '15-45' && ingredients === 'V' && restrictions === 'VEG' && mood === 'SA') recipeName = 'Creamy mushroom risotto';
        // 15-45 ∧ V ∧ VE ∧ SW → CCC
        else if (time === '15-45' && ingredients === 'V' && restrictions === 'VE' && mood === 'SW') recipeName = 'Coconut carrot curry';
        // 45< ∧ (M ∨ V) ∧ VE ∧ SA → LS
        else if (time === '45<' && (ingredients === 'M' || ingredients === 'V') && restrictions === 'VE' && mood === 'SA') recipeName = 'Lentil soup';
        // 45< ∧ C ∧ N ∧ SP → SBCE
        else if (time === '45<' && ingredients === 'C' && restrictions === 'N' && mood === 'SP') recipeName = 'Spicy baked chicken enchilladas';
        // 45< ∧ V ∧ VE ∧ SA → SPRV
        else if (time === '45<' && ingredients === 'V' && restrictions === 'VE' && mood === 'SA') recipeName = 'Stuffed Peppers with rice and veggies';
        // 45< ∧ V ∧ VE ∧ SW → SPC
        else if (time === '45<' && ingredients === 'V' && restrictions === 'VE' && mood === 'SW') recipeName = 'Sweet Potatoe Casserole';

        if (recipeName && recipes[recipeName]) {
            return {
                name: recipeName,
                url: recipes[recipeName]
            };
        }

        return null; // No recipe found
    };

    // Event listener for the Generate Recipe button
    generateButton.addEventListener('click', () => {
        // Reset previous messages
        errorMessageDisplay.classList.add('hidden');
        recipeNameDisplay.textContent = 'Select your preferences and click "Generate Recipe"!';
        recipeNameDisplay.style.color = '#333'; // Reset color

        // Validate that all questions have been answered
        let allAnswered = true;
        if (!selectedTime) {
            timeFeedback.style.display = 'block';
            allAnswered = false;
        } else {
            timeFeedback.style.display = 'none';
        }
        if (!selectedIngredients) {
            ingredientsFeedback.style.display = 'block';
            allAnswered = false;
        } else {
            ingredientsFeedback.style.display = 'none';
        }
        if (!selectedRestrictions) {
            restrictionsFeedback.style.display = 'block';
            allAnswered = false;
        } else {
            restrictionsFeedback.style.display = 'none';
        }
        if (!selectedMood) {
            moodFeedback.style.display = 'block';
            allAnswered = false;
        } else {
            moodFeedback.style.display = 'none';
        }

        if (!allAnswered) {
            recipeNameDisplay.textContent = 'Please answer all questions to generate a recipe.';
            recipeNameDisplay.style.color = '#d32f2f'; // Red text for warning
            return; // Stop if not all questions are answered
        }

        // Generate recipe
        const recipe = getRecipe(selectedTime, selectedIngredients, selectedRestrictions, selectedMood);

        if (recipe) {
            // Create a clickable link for the recipe
            recipeNameDisplay.innerHTML = `<a href="${recipe.url}" target="_blank" rel="noopener noreferrer">${recipe.name}</a>`;
            recipeNameDisplay.style.color = '#1976d2'; // Blue text for success
        } else {
            // Display error message if no recipe is found
            errorMessageDisplay.classList.remove('hidden');
            recipeNameDisplay.textContent = 'No recipe found for your current selections.';
            recipeNameDisplay.style.color = '#d32f2f'; // Red text for error
        }
    });
});
