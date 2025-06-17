"use client";
import {useRouter} from "next/navigation"
import React, { useReducer, useContext, useCallback } from "react";
import { AuthReducer } from "./reducer";
import { IUser } from "./context";
import { INITIAL_STATE, AuthStateContext, AuthActionContext, IUserLogin, IUserRegistration, IClientRegistration } from "./context";
import { loginPending, loginSuccess, loginError, registerTrainerPending, registerTrainerSuccess, registerTrainerError, registerClientPending, registerClientSuccess, registerClientError } from "./actions";
import axiosInstance from "@/utils/axiosInstance";

interface AuthProviderProps {
  children: React.ReactNode;
}
export interface IAuthResponse {
  user: IUser;
  token: string;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const router = useRouter();

  const login = useCallback(async (userLogin: IUserLogin) => {
    dispatch(loginPending());
    try {
      const response = await axiosInstance.post<IAuthResponse>('/users/login', userLogin);
      const {user, token} = response.data;

      sessionStorage.setItem("token", token);
      dispatch(loginSuccess(user));
      router.push(user.role === "Trainer" ? "/trainer" : "client");
    } catch (error) {
      dispatch(loginError());
      console.error('Login error:', error);
      throw error;
    }
  }, [router]);

  const registerTrainer = useCallback(async (userRegistration: IUserRegistration) => {
    dispatch(registerTrainerPending());
    try {

      const response = await axiosInstance.post<IAuthResponse>('/trainers/register/', userRegistration);
      const {user} = response.data;
      dispatch(registerTrainerSuccess(user));
      router.push("/trainer");
    } catch (error) {
      dispatch(registerTrainerError());
      console.error('Trainer registration error:', error);
      throw error;
    }
  }, [router]);

  const registerClient = useCallback(async (clientRegistration: IClientRegistration) => {
    dispatch(registerClientPending());
    try {
      const response = await axiosInstance.post<IAuthResponse>('/trainers/register/client', clientRegistration);
      const {user} = response.data;
      dispatch(registerClientSuccess(user));
      router.push("/client");
    } catch (error) {
      dispatch(registerClientError());
      console.error('Client registration error:', error);
      throw error;
    }
  }, [router]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionContext.Provider value={{ login, registerTrainer, registerClient }}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (context === undefined) {
    throw new Error('useAuthActions must be used within an AuthProvider');
  }
  return context;
};

const useAuth = () => {
  return {
    ...useAuthState(),
    ...useAuthActions(),
  };
};

export { AuthProvider, useAuthState, useAuthActions, useAuth };