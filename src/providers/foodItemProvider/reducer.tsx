"use client";
import { handleActions } from "redux-actions";
import { IFoodStateContext, INITIAL_FOOD_STATE } from "./context";
import { FoodActionEnums } from "./actions";

export const foodReducer = handleActions<IFoodStateContext, IFoodStateContext>(
  {
    //get all food items
    [FoodActionEnums.getAllFoodItemsPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [FoodActionEnums.getAllFoodItemsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getAllFoodItemsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Get Food Items by Category
    [FoodActionEnums.getFoodItemsByCategoryPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodItemsByCategorySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodItemsByCategoryError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Get Food Items by Search
    [FoodActionEnums.getFoodItemsBySearchPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodItemsBySearchSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.getFoodItemsBySearchError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Create Food Item
    [FoodActionEnums.createFoodItemPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.createFoodItemSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FoodActionEnums.createFoodItemError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Clear Created Food
    [FoodActionEnums.clearCreatedFood]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_FOOD_STATE 
);
