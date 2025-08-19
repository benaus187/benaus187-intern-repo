# benaus187-intern-repo

## React + Tailwind CSS Setup

### Steps I Followed

1. Created a new React project with Vite:
    npm create vite@latest my-i18n-app
    cd my-app
    npm install
2. Installed Tailwind CSS and required tools:
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
3. Configured tailwind.config.js:
    export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: { extend: {} },
    plugins: [],
    };
4. Added Tailwind imports in src/styles.css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
5. Updated App.jsx with Tailwind classes to confirm it works.
6. Ran the app:
    npm run dev
