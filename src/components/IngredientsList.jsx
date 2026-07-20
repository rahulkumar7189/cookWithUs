export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <li key={index} className="ingredient-chip">{ingredient}</li>
    ))

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userAPI = formData.get("groq-api")

        if (!userAPI || !userAPI.startsWith('gsk_')) {
            alert(('Please enter a valid Groq API key'))
            return
        }

        props.getRecipe(userAPI)
    }

    return (
        <section className="ingredients-section">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && (
                <div className="get-recipe-container" ref={props.ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a culinary masterpiece from your list of ingredients.</p>
                    <form onSubmit={handleSubmit} className="get-recipe-form">
                        <label htmlFor="groq-api">Groq API key: </label>
                        <input type="password" id="groq-api" name="groq-api" placeholder="Enter your Groq API Key (gsk_...)" required />
                        <button type="submit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                            Generate Recipe
                        </button>
                        <a href="https://console.groq.com/keys" className="groq-tutorial" target="_blank" rel="noopener noreferrer">Don't have an API key? Get one here.</a>
                    </form>
                </div>
            )}
        </section>
    )
}