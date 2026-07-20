export async function getRecipeFromGroq(ingredientsArr, groq_api_key) {
    const ingredientsString = ingredientsArr.join(", ")

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${groq_api_key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page." },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
            ],
            max_tokens: 1024,
            temperature: 0.7
        })
    })

    const data = await response.json()

    if (data.error) {
        throw new Error(data.error.message)
    }

    return data.choices[0].message.content
}