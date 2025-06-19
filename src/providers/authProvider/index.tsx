"use client";
import {useRouter} from "next/navigation"
import React, { useReducer, useContext, useCallback } from "react";
import { AuthReducer } from "./reducer";
import { IUser } from "./context";
import { INITIAL_STATE, AuthStateContext, AuthActionContext, IUserLogin, IUserRegistration, IClientRegistration } from "./context";
import { registerTrainerSuccess, loginSuccess, loginError, registerTrainerPending, registerTrainerError, registerClientPending, registerClientSuccess, registerClientError } from "./actions";
import axiosInstance from "@/utils/axiosInstance";
import { message } from "antd";

interface AuthProviderProps {
  children: React.ReactNode;
}
export interface IAuthResponse {
  message?: string;
  token?: string;
  trainerId?:string;
  clientId?: string;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const router = useRouter();

 const login = useCallback(async (userLogin: IUserLogin) => {
 try{
   const payload = new URLSearchParams({
    email: userLogin.email,
    password: userLogin.password,
  });
  const response = await axiosInstance.post<IAuthResponse>(
    "/users/login", payload,{
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
    }
  );
  const {trainerId, token} = response.data;
  if (!token) {
      throw new Error('No token returned by API');
    }
  sessionStorage.setItem("token", token || "");
  dispatch(loginSuccess({id: trainerId || "", role: "Trainer"} as IUser));
  router.push("/trainer");
 } catch (error){
  dispatch(loginError());
  console.error("Login error: ", error);
  throw error;
 }
 }, [router]);

const registerTrainer = useCallback(
  async (userRegistration: IUserRegistration) => {
    dispatch(registerTrainerPending());
    try {
      // Construct the body like Postman
      const body = new URLSearchParams();
      body.append('name', userRegistration.name);
      body.append('email', userRegistration.email);
      body.append('password', userRegistration.password);
      body.append('confirmPassword', userRegistration.confirmPassword);
      body.append('role', 'admin');             // Fixed as per Postman
      body.append('contactNumber', userRegistration.contactNumber);
      body.append('planType', 'base');          // Fixed as per Postman
      body.append('activeState', 'true');       // as string
      body.append('trial', 'false');            // as string
      body.append('policiesAccepted', 'true');  // as string

      const response = await axiosInstance.post<IAuthResponse>(
        '/users/register',
        body,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );

      // NOTE: This endpoint returns { message, trainerId } — no token
      const { trainerId, token } = response.data;
      sessionStorage.setItem("token", token || "");
      dispatch(
        registerTrainerSuccess({ id: trainerId!, role: 'Trainer' } as IUser)
      );
      message.success('Trainer registration successful.');
      router.push('/trainer'); // Redirect after register
    } catch (error) {
      dispatch(registerTrainerError());
      console.error('Trainer registration error:', error);
      message.error('Trainer registration failed.');
      throw error;
    }
  },
  [router]
);

  const registerClient = useCallback(
    async (clientRegistration: IClientRegistration) => {
      dispatch(registerClientPending());
      try {
        const payload = new URLSearchParams({
          name: clientRegistration.name,
          email: clientRegistration.email,
          password: clientRegistration.password,
          confirmPassword: clientRegistration.confirmPassword,
          contactNumber: clientRegistration.contactNumber,
          policiesAccepted: "true",
        });

        const response = await axiosInstance.post<IAuthResponse>(
          "/users/register/mobile",
          payload,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        const { clientId, token } = response.data;
        if (token) sessionStorage.setItem("token", token);
        dispatch(registerClientSuccess({ id: clientId || "", role: "Client" } as IUser));
        router.push("/client");
      } catch (error) {
        dispatch(registerClientError());
        console.error("Client registration error:", error);
        throw error;
      }
    },
    [router]
  );


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
