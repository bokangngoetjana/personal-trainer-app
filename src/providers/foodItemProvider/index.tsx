"use client";

import React, { useContext, useReducer } from "react";
import { foodReducer } from "./reducer";
import {
  FoodStateContext,
  FoodActionContext,
  INITIAL_FOOD_STATE,
  IFood,
  IFoodInput,
} from "./context";
import {
  getAllFoodItemsPending,
  getAllFoodItemsSuccess,
  getAllFoodItemsError,
  getFoodItemsByCategoryPending,
  getFoodItemsByCategorySuccess,
  getFoodItemsByCategoryError,
  getFoodItemsBySearchPending,
  getFoodItemsBySearchSuccess,
  getFoodItemsBySearchError,
  createFoodItemPending,
  createFoodItemSuccess,
  createFoodItemError,
  updateFoodItemError,
  updateFoodItemPending,
  updateFoodItemSuccess,
  clearCreatedFood as clearCreatedFoodAction,
} from "./actions";
import axiosInstance from "@/utils/axiosInstance";

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(foodReducer, INITIAL_FOOD_STATE);

  // GET all food items
  const getAllFoodItems = async (token: string) => {
    dispatch(getAllFoodItemsPending());

    try {
      const response = await axiosInstance.get<{data: IFood[]}>("/food", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const foodItems: IFood[] = response.data.data;
      dispatch(getAllFoodItemsSuccess(foodItems));
    } catch (error) {
      console.error(error);
      dispatch(getAllFoodItemsError("Failed to get food items"));
    }
  };
  // Update Food Item
const updateFoodItem = async (token: string, foodId: string, foodInput: IFoodInput) => {
  dispatch(updateFoodItemPending());
  try {
    // Assuming your API endpoint for update is PUT /food/:id
    const response = await axiosInstance.put<{ data: IFood }>(`/food/${foodId}`, foodInput, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedFood: IFood = response.data.data;
    dispatch(updateFoodItemSuccess(updatedFood));
  } catch (error) {
    console.error(error);
    dispatch(updateFoodItemError("Failed to update food item"));
  }
};
  // GET food items by category
  const getFoodItemsByCategory = async (token: string, category: string) => {
    dispatch(getFoodItemsByCategoryPending());

    try {
      const response = await axiosInstance.get<{data: IFood[]}>(`/food/category/${category}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const foodItems: IFood[] = response.data.data;
      dispatch(getFoodItemsByCategorySuccess(foodItems));
    } catch (error) {
      console.error(error);
      dispatch(getFoodItemsByCategoryError("Failed to fetch by category"));
    }
  }; // ✅ FIXED: removed extra closing brace

  // GET food items by search
  const getFoodItemsBySearch = async (token: string, searchTerm: string) => {
    dispatch(getFoodItemsBySearchPending());

    try {
      const response = await axiosInstance.get<{data: IFood[]}>(`/food/search/${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const foodItems: IFood[] = response.data.data;
      dispatch(getFoodItemsBySearchSuccess(foodItems));
    } catch (error) {
      console.error(error);
      dispatch(getFoodItemsBySearchError("Failed to search food items"));
    }
  };

  // POST create food item
  const createFoodItem = async (token: string, foodInput: IFoodInput) => {
    dispatch(createFoodItemPending());

    try {
      const response = await axiosInstance.post<{ data: IFood }>("/api/food", foodInput, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const createdFood: IFood = response.data.data;
      dispatch(createFoodItemSuccess(createdFood));
    } catch (error) {
      console.error(error);
      dispatch(createFoodItemError("Failed to create food item"));
    }
  };

  const clearCreatedFood = () => {
    dispatch(clearCreatedFoodAction());
  };

  return (
    <FoodStateContext.Provider value={state}>
      <FoodActionContext.Provider
        value={{
          getAllFoodItems,
          getFoodItemsByCategory,
          getFoodItemsBySearch,
          createFoodItem,
          clearCreatedFood,
          updateFoodItem,
        }}
      >
        {children}
      </FoodActionContext.Provider>
    </FoodStateContext.Provider>
  );
};

// Optional custom hooks
export const useFoodState = () => {
  const context = useContext(FoodStateContext);
  if (!context) {
    throw new Error("useFoodState must be used within a FoodProvider");
  }
  return context;
};

export const useFoodActions = () => {
  const context = useContext(FoodActionContext);
  if (!context) {
    throw new Error("useFoodActions must be used within a FoodProvider");
  }
  return context;
};
