import { useState, useRef, useEffect } from "react"
import IngredientsList from "./IngredientsList"
import Recipe from "./Recipe"
import Hero from "./Hero"
import { getRecipeFromGroq } from "../ai"

export default function Main() {

    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe != "" && recipeSection.current != null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipe])
    
    async function getRecipe(userAPI) {
        try {
            const recipeMarkdown = await getRecipeFromGroq(ingredients, userAPI)
            setRecipe(recipeMarkdown)
        } catch (err) {
            alert("Error generating recipe: " + err.message)
            console.error("Error: " + err.message)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient && newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()])
        }
    }

    function handleQuickAdd(newIngredient) {
        if (!ingredients.includes(newIngredient)) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano (at least 4 ingredients)"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add
                </button>
            </form>
            {ingredients.length === 0 && <Hero onQuickAdd={handleQuickAdd} />}
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} ref={recipeSection} />}
            {recipe && <Recipe recipe={recipe} />}
        </main>
    )
}
