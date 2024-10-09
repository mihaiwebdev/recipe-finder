# AI Recipe Finder

AI Recipe Finder is a Next.js application that helps users discover and manage recipes using AI-powered search.

## Features

- AI-powered recipe search based on meal descriptions
- Favorite recipes management
- Detailed recipe view with ingredients and instructions
- Responsive design for mobile and desktop

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/ai-recipe-finder.git
cd ai-recipe-finder
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js app router pages
- `components/`: React components
- `store/`: Context for state management
- `types/`: TypeScript type definitions

## Key Components

- `SearchBar`: Allows users to input meal descriptions for recipe search
- `Recipes`: Displays search results or favorite recipes
- `RecipeCard`: Individual recipe display with favorite toggle
- `RecipeDetails`: Detailed view of a selected recipe

## State Management

The project uses React Context (`RecipesContext`) for state management, handling:

- Recipe search results
- Favorite recipes
- Loading states
- Current recipe details

## API Routes

The project assumes the existence of API routes for:

- Searching recipes
- Managing favorite recipes

Ensure these are implemented in the `app/api/` directory.

## Styling

The project uses Tailwind CSS for styling. Custom styles can be added in the `tailwind.config.js` file.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
