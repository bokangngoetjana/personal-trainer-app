"use client";

import {createContext} from "react";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    contactNumber: string;
    planType?: string;
    plan?: string;
    activeState: boolean;
    trial?: boolean;
    policiesAccepted: boolean;
    date: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}
export interface IUserRegistration {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    contactNumber: string;
    planType: string;
    activeState: boolean;
    trial: boolean;
    policiesAccepted: boolean;
}
export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  user?: IUser;
  token?: string;
}
export interface IClientRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  //dateOfBirth: string;
  contactNumber: string;
  policiesAccepted: boolean;
  role: string;
}
export interface IAuthActionContext{
    login: (userLogin: IUserLogin) => void;
    registerTrainer: (userRegistration: IUserRegistration) => void;
    registerClient: (clientRegistration: IClientRegistration) => void;
}
export const INITIAL_STATE: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    token: undefined,
    user: undefined,
}
export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionContext>({
    login: () => {}, 
    registerTrainer: () => {},
    registerClient: () => {},
});
