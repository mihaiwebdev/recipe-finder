import { RecipeResponse, RecipeType } from "@/types/recipeResponse";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";
import { randomUUID } from "crypto";
import { LlmRecipe, LlmRecipeResponse } from "@/types/llmRecipeResponse";
import Replicate from "replicate";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const Recipe = z.object({
  name: z.string().describe("Short name of the recipe."),
  mealImage: z.string().describe("Generate a image of the meal"),
  cookingTime: z.number().describe("The time it takes to make the meal."),
  ingredients: z
    .array(z.string())
    .describe("The ingredients of the recipe as an array of strings."),
  instructions: z
    .array(z.string())
    .describe(
      "The step-by-step instructions of the recipe as an array of strings."
    ),
});

const Recipes = z.object({
  recipes: z.array(Recipe),
});

export const findRecipes = async (
  description: string,
  excludedMeals: string[]
): Promise<RecipeResponse | null> => {
  let userMessage = description;
  if (excludedMeals.length > 0) {
    userMessage = `${description}, make sure to exclude these dishes: ${excludedMeals.join(
      ","
    )}`;
  }
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Analyze the user description of what he wants to eat and respond with 5 matching recipes.",
      },
      { role: "user", content: userMessage },
    ],
    response_format: zodResponseFormat(Recipes, "recipes"),
  });

  const response: LlmRecipeResponse | null =
    completion.choices[0].message.parsed;

  if (!response) {
    return null;
  }

  const recipesWithImages = await getRecipesWithImage(response.recipes);

  const recipeResponse: RecipeResponse = {
    recipes: recipesWithImages,
  };

  return recipeResponse;
};

const getRecipesWithImage = async (
  recipes: LlmRecipe[]
): Promise<RecipeType[]> => {
  const recipesWithImagesPromises = recipes.map(async (recipe) => ({
    ...recipe,
    id: randomUUID(),
    mealImage: await generateMealImage(
      recipe.name,
      recipe.ingredients.join(",")
    ),
  }));

  return Promise.all(recipesWithImagesPromises);
};

const generateMealImage = async (
  mealName: string,
  mealIngrendients: string
): Promise<string> => {
  const promptForImageGeneration = await getPromptForImageGeneration(
    mealName,
    mealIngrendients
  );
  const defaultPrompt = `A very photorealistic image of a ${mealName} meal with this ingredients: ${mealIngrendients}`;

  const input = {
    prompt: promptForImageGeneration || defaultPrompt,
    guidance: 3.5,
  };

  const output = (await replicate.run(
    "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
    { input }
  )) as string[];

  return output[0] || "";
};

const getPromptForImageGeneration = async (
  mealName: string,
  mealIngredients: string
): Promise<string | null> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Write the best prompt of maximum 900 characters, in order to generate a very photorealistic image of ${mealName} with this ingredients: ${mealIngredients}.
        Important!: Prompt length must be of maximum 900 characters.
        Crucial!: Prompt must be safe and mustn't violate any content_policy_violation.
        Remove anything that may violate the content policy.`,
      },
    ],
  });

  return completion.choices[0].message.content;
};
