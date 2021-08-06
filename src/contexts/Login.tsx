import React, { useContext, useReducer } from "react";

type ContextProps = {
  isLogged: boolean;
};

type LoginContextProps = {
  state: ContextProps;
  dispatch: (a: Action) => void;
};

export enum ACTIONS {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type Action = {
  type: ACTIONS;
  payload: boolean;
};

interface ILoginProvider {
  children: React.ReactNode;
}

const initialState: ContextProps = {
  isLogged: false,
};

export const LoginContext = React.createContext<LoginContextProps>({
  state: initialState,
  dispatch: () => {},
});

export const reducer = (state: ContextProps, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.LOGIN: {
      return { ...state, isLogged: payload };
    }
    case ACTIONS.LOGOUT: {
      return { ...state, isLogged: false };
    }
    default:
      return state;
  }
};

export const LoginProvider = ({ children }: ILoginProvider) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const store = { state, dispatch };
  return (
    <LoginContext.Provider value={store}>{children}</LoginContext.Provider>
  );
};

export const LoginConsumer = LoginContext.Consumer;

export const useLoginContext = () => useContext(LoginContext);
