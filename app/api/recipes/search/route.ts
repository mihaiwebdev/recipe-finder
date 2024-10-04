import { ErrorResponse } from "@/types/errorResponse";
import { RecipeResponse } from "@/types/recipeResponse";

import { findRecipes } from "@/util/ai";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest
): Promise<NextResponse<RecipeResponse | ErrorResponse>> => {
  try {
    const { searchParams } = new URL(request.url);
    const mealDescription = searchParams.get("description");

    if (!mealDescription || mealDescription.trim().length < 3) {
      return NextResponse.json(
        new ErrorResponse("Meal description is required"),
        { status: 400 }
      );
    }

    const response = await findRecipes(mealDescription);

    if (!response) {
      return NextResponse.json(
        new ErrorResponse("Could not find any recipes. Please try again!"),
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching recipes:", error);

    return NextResponse.json(
      new ErrorResponse("Failed to fetch recipes. Please try again."),
      { status: 500 }
    );
  }
};
