export default function Hero({ onQuickAdd }) {
    const quickAddItems = [
        { icon: "🍗", name: "Chicken" },
        { icon: "🧄", name: "Garlic" },
        { icon: "🥦", name: "Broccoli" },
        { icon: "🍅", name: "Tomato" },
        { icon: "🧅", name: "Onion" },
        { icon: "🍋", name: "Lemon" }
    ];

    return (
        <section className="hero-section">
            <h2 className="hero-title">What's in your fridge?</h2>
            <p className="hero-subtitle">
                Enter your available ingredients, and let our AI Chef craft a culinary masterpiece just for you.
            </p>
            <div className="quick-add-container">
                <p>Try adding these:</p>
                <div className="quick-add-chips">
                    {quickAddItems.map(item => (
                        <button 
                            key={item.name} 
                            className="quick-add-chip"
                            onClick={() => onQuickAdd(item.name)}
                            type="button"
                        >
                            <span>{item.icon}</span> {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
