import Recipe from "@/models/Recipe";
import { ErrorResponse } from "@/types/errorResponse";
import connectDB from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { recipe } = await request.json();

    if (!recipe) {
      return NextResponse.json(new ErrorResponse("Recipe data is required."), {
        status: 400,
      });
    }

    await connectDB();

    const newRecipe = new Recipe(recipe);
    await newRecipe.save();

    return NextResponse.json({ message: "Successfully added to favorites!" });
  } catch (error) {
    console.error("Error adding recipe to favorites", error);
    return NextResponse.json(new ErrorResponse("Failed to add to favorites."), {
      status: 500,
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { recipeID } = await request.json();

    if (!recipeID) {
      return NextResponse.json(new ErrorResponse("Recipe id is required."), {
        status: 400,
      });
    }

    await connectDB();

    const deletedRecipe = await Recipe.deleteOne({ id: recipeID });

    if (!deletedRecipe) {
      return NextResponse.json(
        new ErrorResponse("Could not remove recipe from favorites."),
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      message: "Successfully removed from  favorites!",
    });
  } catch (error) {
    console.error("Error removing recipe from favorites", error);
    return NextResponse.json(
      new ErrorResponse("Failed to remove from favorites."),
      {
        status: 500,
      }
    );
  }
};
