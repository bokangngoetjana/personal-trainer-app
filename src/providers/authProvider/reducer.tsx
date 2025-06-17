import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";
import { AuthActionEnums } from "./actions";

/**
 * state transition logic
 * uses handleActions to define how to respond to each action and update the state accordingly
 */
export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>({
      [AuthActionEnums.loginPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
     [AuthActionEnums.loginSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.loginError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.registerTrainerPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.registerTrainerSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.registerTrainerError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    
    [AuthActionEnums.registerClientPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.registerClientSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.registerClientError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
}, INITIAL_STATE);