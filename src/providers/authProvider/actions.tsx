import { createAction } from "redux-actions";
import { IAuthStateContext, IUser } from "./context";

export enum AuthActionEnums {
    loginPending = "LOGIN_PENDING",
    loginSuccess = "LOGIN_SUCCESS",
    loginError = "LOGIN_ERROR",

    registerTrainerPending = "REGISTER_TRAINER_PENDING",
    registerTrainerSuccess = "REGISTER_TRAINER_SUCCESS",
    registerTrainerError = "REGISTER_TRAINER_ERROR",

    registerClientPending = "REGISTER_CLIENT_PENDING",
    registerClientSuccess = "REGISTER_CLIENT_SUCCESS",
    registerClientError = "REGISTER_CLIENT_ERROR",
}

//state for trainer/client login
export const loginPending = createAction<IAuthStateContext>(
    AuthActionEnums.loginPending, () => ({isPending: true, isSuccess: false, isError: false})
);
export const loginSuccess =- createAction<IAuthStateContext, IUser>(
    AuthActionEnums.loginSuccess,
    (user: IUser) => ({isPending: false, isSuccess: true, isError: false, user})
);
export const loginError = createAction<IAuthStateContext>(
    AuthActionEnums.loginError, 
    () => ({isPending: false, isSuccess: false, isError: true})
);

//register trainer
export const registerTrainerPending = createAction<IAuthStateContext>(
  AuthActionEnums.registerTrainerPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const registerTrainerSuccess = createAction<IAuthStateContext, IUser>(
  AuthActionEnums.registerTrainerSuccess,
  () => ({ isPending: false, isSuccess: true, isError: false })
);
export const registerTrainerError = createAction<IAuthStateContext>(
  AuthActionEnums.registerTrainerError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//client registration
export const registerClientPending = createAction<IAuthStateContext>(
  AuthActionEnums.registerClientPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const registerClientSuccess = createAction<IAuthStateContext, IUser>(
  AuthActionEnums.registerClientSuccess,
  () => ({ isPending: false, isSuccess: true, isError: false })
);
export const registerClientError = createAction<IAuthStateContext>(
  AuthActionEnums.registerClientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
