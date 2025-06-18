"use client"
import { createContext } from "react";

export interface IFood {
  _id: string;
  name: string;
  category: string;
  servingSize: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  energy: number;
  date: string;
}
export interface IFoodInput{
  name: string;
  category: string;
  servingSize: number;
  protein: number;
  carbs: number;
  sugar: number;
  fat: number;
  fiber: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
  energy: number;
}
export interface IFoodStateContext{
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  foodItems?: IFood[];
  createdFood?: IFood;
  errorMessage?: string;
}
export interface IFoodActionContext {
  getAllFoodItems: (token: string) => Promise<void>;
  getFoodItemsByCategory: (token: string, category: string) => Promise<void>;
  getFoodItemsBySearch: (token: string, searchTerm: string) => Promise<void>;
  createFoodItem: (token: string, foodInput: IFoodInput) => Promise<void>;
  clearCreatedFood: () => void;
}
export const INITIAL_FOOD_STATE: IFoodStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  foodItems: [],
  createdFood: undefined,
  errorMessage: undefined,
};
export const FoodStateContext = createContext<IFoodStateContext>(INITIAL_FOOD_STATE);

export const FoodActionContext = createContext<IFoodActionContext>({
  getAllFoodItems: async () => {},
  getFoodItemsByCategory: async () => {},
  getFoodItemsBySearch: async () => {},
  createFoodItem: async () => {},
  clearCreatedFood: () => {},
});