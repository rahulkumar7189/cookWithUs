# CookWithUs

#### Video Demo: `<YOUR YOUTUBE URL HERE>`

#### Description:

**CookWithUs** is an AI-powered recipe generator built as a modern web application using React 19 and the Groq API. The idea is simple: you tell the app what ingredients you already have at home, and an AI chef powered by Meta's Llama 3.3 large language model instantly generates a complete, step-by-step recipe tailored specifically to your available ingredients. No more staring into the fridge and wondering what to cook — CookWithUs figures it out for you.

This project was built as the final project for CS50x 2026 and represents the culmination of everything learned throughout the course, particularly the weeks covering HTML, CSS, JavaScript, and the web in general. While CS50x introduced these concepts using traditional approaches, this project takes those fundamentals and applies them within a modern JavaScript ecosystem using React and a third-party AI API.

---

## Why I Built This

The inspiration for CookWithUs came from a real, everyday frustration: having ingredients in the fridge but no idea what to make with them. Searching for recipes online usually requires you to know what you want to cook already, and it rarely accounts for the exact combination of ingredients you happen to have. An AI language model, however, can handle fuzzy, open-ended problems like this perfectly. I wanted to build something genuinely useful that I would use myself, and that combined two things I was learning about simultaneously — modern frontend development and AI APIs.

---

## Tech Stack

- **React 19** — The entire UI is built with React components, making use of hooks like `useState`, `useEffect`, and `useRef` for state management and DOM interaction.
- **Vite** — The development and build tool that provides an ultra-fast local development server.
- **Groq API (Llama 3.3 70B)** — The AI backend. Groq is chosen specifically for its incredible inference speed, making recipe generation feel near-instant for the user.
- **Vanilla CSS** — All styling is hand-written with custom CSS variables, glassmorphism effects, keyframe animations, and a fully responsive layout. No CSS framework was used.
- **React Markdown** — Used to render the AI's markdown-formatted recipe response into beautiful, structured HTML.

---

## File Structure & What Each File Does

### `index.html`
The root HTML file that Vite uses as an entry point. It loads the Google Fonts (`Outfit`) for modern typography, sets the favicon to our custom SVG logo, and contains the `<div id="root">` where the entire React application is mounted.

### `src/main.jsx`
The JavaScript entry point of the application. It imports React's `StrictMode` and `createRoot` to render the top-level `<App />` component into the `root` div from `index.html`. Strict Mode is kept on to highlight any potential problems during development.

### `src/App.jsx`
The top-level React component. It acts as the root layout container, rendering just two components: `<Header />` and `<Main />`. This keeps the application structure clean and easy to understand at a glance.

### `src/ai.js`
This is the brain of the application. It exports a single async function, `getRecipeFromGroq`, which accepts the list of ingredients and the user's Groq API key, then makes a `POST` request to Groq's OpenAI-compatible API endpoint. The function crafts a detailed system prompt that instructs the AI model to act as a chef and to format its response in Markdown. It also handles error cases by throwing meaningful errors if the API returns a failure response.

A key design decision here was to require the user to supply their own Groq API key rather than hardcoding one. This was an important choice for both security (never expose a private key in frontend code) and practicality (Groq's free tier is very generous, and users can get a key in seconds).

### `src/index.css`
All of the application's visual styling lives here. The design is a **Premium Dark Mode** theme built entirely from scratch using CSS custom properties (variables). Key design decisions include:
- A deep slate (`#0b0f19`) background with a subtle grid pattern overlay to add texture.
- Two fixed, blurred radial gradient "orbs" in the background that create a sense of depth.
- Glassmorphism (`backdrop-filter: blur`) on all major UI containers for a frosted-glass effect.
- A vibrant sunset gradient (`#FF512F` to `#DD2476`) applied to primary text, buttons, and the logo.
- CSS `@keyframe` animations (`slideUp`, `slideDown`, `popIn`, `fadeIn`) on all interactive elements to make the UI feel alive and dynamic.

### `src/components/Header.jsx`
Renders the application's sticky top navigation bar featuring the custom SVG logo and the "CookWithUs" brand name. The header uses `backdrop-filter: blur` so it stays legible as the user scrolls through content below it.

### `src/components/Hero.jsx`
This component renders the landing/empty state that the user sees when they first open the app and haven't added any ingredients yet. It displays a welcoming headline ("What's in your fridge?"), a subtitle, and a row of "Quick Add" suggestion chips (Chicken, Garlic, Broccoli, Tomato, Onion, Lemon). These chips are interactive — clicking any of them immediately adds that ingredient to your list, which was an important UX decision to make the empty page feel useful and engaging rather than blank and confusing.

### `src/components/Main.jsx`
This is the core state-management component of the application. It uses `useState` to track two pieces of state: the `ingredients` array and the generated `recipe` string. It uses `useRef` and `useEffect` together to automatically smooth-scroll the page down to the generated recipe section when a new recipe arrives, so the user doesn't have to manually scroll to see the result. It also renders the three major sub-components conditionally: `Hero` (when no ingredients exist), `IngredientsList` (when ingredients have been added), and `Recipe` (when a recipe has been generated).

### `src/components/IngredientsList.jsx`
Displays the ingredients the user has added as stylish, animated pill-shaped "chip" tags instead of a boring bullet list. When more than 3 ingredients have been added, it reveals a "Get a Recipe" panel. This panel includes a form where the user enters their Groq API key to unlock recipe generation. The component validates that the key starts with `gsk_` (the standard Groq key prefix) before submitting, providing immediate feedback if an invalid key is entered.

### `src/components/Recipe.jsx`
A simple but critical component that receives the raw Markdown string returned by the Groq API and renders it into proper HTML using the `ReactMarkdown` library. The surrounding CSS classes ensure the recipe text is beautifully formatted, with styled headings, lists, and bold text all optimized for the dark theme.

### `src/assets/logo.svg`
A custom logo created entirely with SVG code — no image files were used. The logo depicts a steaming cooking pot using geometric shapes and path elements. It uses the same `#FF512F` to `#DD2476` gradient and a `feGaussianBlur` SVG filter to add a glowing effect, ensuring the logo perfectly matches the application's premium aesthetic.

---

## Design Decisions

**Why Groq instead of OpenAI?** Speed. Groq's inference hardware is dramatically faster than standard GPU-based inference, making the user experience feel responsive and instant rather than requiring a long loading spinner.

**Why Vanilla CSS instead of Tailwind or a UI library?** CSS frameworks add significant bundle overhead and can constrain design choices. Since a core part of CS50 teaches fundamental CSS, writing every style from scratch was both a learning exercise and the right technical choice for full creative control.

**Why require the user's own API key?** Embedding an API key in a client-side application is a significant security vulnerability — anyone could inspect the source code and steal the key. Requiring users to bring their own key is the correct, professional approach for a public web app.

---

## How to Run Locally

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd cookwithus

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173/cookWithUs
```

You will need a free Groq API key from [console.groq.com/keys](https://console.groq.com/keys) to generate recipes.

---

*This was CS50x! 🎓*
