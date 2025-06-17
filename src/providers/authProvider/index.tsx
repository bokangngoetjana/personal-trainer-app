"use client";

import React, { useReducer, useContext, useCallback } from "react";
import { AuthReducer } from "./reducer";
import { INITIAL_STATE, AuthStateContext, AuthActionContext, IUserLogin, IUserRegistration, IClientRegistration } from "./context";
import { loginPending, loginSuccess, loginError, registerTrainerPending, registerTrainerSuccess, registerTrainerError, registerClientPending, registerClientSuccess, registerClientError } from "./actions";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const login = useCallback(async (userLogin: IUserLogin) => {
    dispatch(loginPending());
    try {
      // Replace with your actual login API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      dispatch(loginSuccess(data.user));
      // You might want to store the token in cookies/localStorage here
    } catch (error) {
      dispatch(loginError());
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const registerTrainer = useCallback(async (userRegistration: IUserRegistration) => {
    dispatch(registerTrainerPending());
    try {
      // Replace with your actual trainer registration API call
      const response = await fetch('/api/auth/register/trainer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRegistration),
      });
      
      if (!response.ok) {
        throw new Error('Trainer registration failed');
      }
      
      const data = await response.json();
      dispatch(registerTrainerSuccess(data.user));
    } catch (error) {
      dispatch(registerTrainerError());
      console.error('Trainer registration error:', error);
      throw error;
    }
  }, []);

  const registerClient = useCallback(async (clientRegistration: IClientRegistration) => {
    dispatch(registerClientPending());
    try {
      // Replace with your actual client registration API call
      const response = await fetch('/api/auth/register/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientRegistration),
      });
      
      if (!response.ok) {
        throw new Error('Client registration failed');
      }
      
      const data = await response.json();
      dispatch(registerClientSuccess(data.user));
    } catch (error) {
      dispatch(registerClientError());
      console.error('Client registration error:', error);
      throw error;
    }
  }, []);

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