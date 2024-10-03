import { RecipeResponse } from "@/models/recipeResponse";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";

const openai = new OpenAI();

const Recipe = z.object({
  name: z.string().describe("Short name of the recipe."),
  cookingTime: z.number().describe("The time it takes to make the meal."),
  mealImage: z
    .string()
    .describe(
      "A real url path from sites like: 'Freepik, Pexels, etc.' which take me to a descriptive image of the meal."
    ),
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
  description: string
): Promise<RecipeResponse | null> => {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Analyze the user description of what he wants to eat and respond with 5 matching recipes.",
      },
      { role: "user", content: description },
    ],
    response_format: zodResponseFormat(Recipes, "recipes"),
  });

  return completion.choices[0].message.parsed;
};
