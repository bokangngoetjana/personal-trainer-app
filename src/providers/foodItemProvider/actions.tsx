"use client";
import { IFood, IFoodStateContext } from "./context";
import { createAction } from "redux-actions";

export enum FoodActionEnums {
  getAllFoodItemsPending = "GET_ALL_FOOD_ITEMS_PENDING",
  getAllFoodItemsSuccess = "GET_ALL_FOOD_ITEMS_SUCCESS",
  getAllFoodItemsError = "GET_ALL_FOOD_ITEMS_ERROR",

  getFoodItemsByCategoryPending = "GET_FOOD_ITEMS_BY_CATEGORY_PENDING",
  getFoodItemsByCategorySuccess = "GET_FOOD_ITEMS_BY_CATEGORY_SUCCESS",
  getFoodItemsByCategoryError = "GET_FOOD_ITEMS_BY_CATEGORY_ERROR",

  getFoodItemsBySearchPending = "GET_FOOD_ITEMS_BY_SEARCH_PENDING",
  getFoodItemsBySearchSuccess = "GET_FOOD_ITEMS_BY_SEARCH_SUCCESS",
  getFoodItemsBySearchError = "GET_FOOD_ITEMS_BY_SEARCH_ERROR",

  createFoodItemPending = "CREATE_FOOD_ITEM_PENDING",
  createFoodItemSuccess = "CREATE_FOOD_ITEM_SUCCESS",
  createFoodItemError = "CREATE_FOOD_ITEM_ERROR",

  updateFoodItemPending = "UPDATE_FOOD_ITEM_PENDING",
  updateFoodItemSuccess = "UPDATE_FOOD_ITEM_SUCCESS",
  updateFoodItemError = "UPDATE_FOOD_ITEM_ERROR",

  deleteFoodItemPending = "DELETE_FOOD_ITEM_PENDING",
  deleteFoodItemSuccess = "DELETE_FOOD_ITEM_SUCCESS",
  deleteFoodItemError = "DELETE_FOOD_ITEM_ERROR",

  clearCreatedFood = "CLEAR_CREATED_FOOD"
}

export const updateFoodItemPending = createAction<IFoodStateContext>(
    FoodActionEnums.updateFoodItemPending, () => ({
        isPending: true,
        isSuccess: false,
        isError: false,
    })
);
export const updateFoodItemSuccess = createAction<IFoodStateContext, IFood>(
  FoodActionEnums.updateFoodItemSuccess,
  (updatedFood: IFood) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    createdFood: updatedFood, // reuse createdFood to hold the updated item
  })
);
export const updateFoodItemError = createAction<IFoodStateContext, string>(
  FoodActionEnums.updateFoodItemError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

// Delete Food Item actions
export const deleteFoodItemPending = createAction<IFoodStateContext>(
  FoodActionEnums.deleteFoodItemPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
  })
);



// export const deleteFoodItemError = createAction<IFoodStateContext, string>(
//   FoodActionEnums.deleteFoodItemError,
//   (errorMessage: string) => ({
//     isPending: false,
//     isSuccess: false,
//     isError: true,
//     errorMessage,
//   })
// );

export const getAllFoodItemsPending = createAction<IFoodStateContext>(
  FoodActionEnums.getAllFoodItemsPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
  })
);
export const getAllFoodItemsSuccess = createAction<IFoodStateContext, IFood[]>(
  FoodActionEnums.getAllFoodItemsSuccess,
  (foodItems: IFood[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
  })
);
export const getAllFoodItemsError = createAction<IFoodStateContext, string>(
  FoodActionEnums.getAllFoodItemsError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);
//Get Food Items by Category
export const getFoodItemsByCategoryPending = createAction<IFoodStateContext>(
  FoodActionEnums.getFoodItemsByCategoryPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
  })
);

export const getFoodItemsByCategorySuccess = createAction<
  IFoodStateContext,
  IFood[]
>(
  FoodActionEnums.getFoodItemsByCategorySuccess,
  (foodItems: IFood[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
  })
);

export const getFoodItemsByCategoryError = createAction<IFoodStateContext, string>(
  FoodActionEnums.getFoodItemsByCategoryError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);
//Get Food Items by Search
export const getFoodItemsBySearchPending = createAction<IFoodStateContext>(
  FoodActionEnums.getFoodItemsBySearchPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
  })
);

export const getFoodItemsBySearchSuccess = createAction<IFoodStateContext, IFood[]>(
  FoodActionEnums.getFoodItemsBySearchSuccess,
  (foodItems: IFood[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    foodItems,
  })
);

export const getFoodItemsBySearchError = createAction<IFoodStateContext, string>(
  FoodActionEnums.getFoodItemsBySearchError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

//Create Food Item
export const createFoodItemPending = createAction<IFoodStateContext>(
  FoodActionEnums.createFoodItemPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
  })
);

export const createFoodItemSuccess = createAction<IFoodStateContext, IFood>(
  FoodActionEnums.createFoodItemSuccess,
  (createdFood: IFood) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    createdFood,
  })
);

export const createFoodItemError = createAction<IFoodStateContext, string>(
  FoodActionEnums.createFoodItemError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

//Clear Created Food
export const clearCreatedFood = createAction<IFoodStateContext>(
  FoodActionEnums.clearCreatedFood,
  () => ({
    createdFood: undefined,
    isPending: false,
    isSuccess: false,
    isError: false,
  })
);