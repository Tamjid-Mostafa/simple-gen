"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

// ---------------- Types ------------------
interface GlobalState {
  isModalOpen: boolean;
  isNavbarOpen: boolean;
  keyword: string;
}

type Action =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "OPEN_NAVBAR" }
  | { type: "CLOSE_NAVBAR" }
  | { type: "SET_KEYWORD"; keyword: string };

interface GlobalStateContextType extends GlobalState {
  openModal: () => void;
  closeModal: () => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  setKeyword: (keyword: string) => void;
}

const initialState: GlobalState = {
  isModalOpen: false,
  isNavbarOpen: false,
  keyword: "",
};

// ---------------- Reducer ------------------
function reducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false };
    case "OPEN_NAVBAR":
      return { ...state, isNavbarOpen: true };
    case "CLOSE_NAVBAR":
      return { ...state, isNavbarOpen: false };
    case "SET_KEYWORD":
      return { ...state, keyword: action.keyword };
    default:
      return state;
  }
}

// ---------------- Context ------------------
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

// ---------------- Provider ------------------
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = useCallback(() => dispatch({ type: "OPEN_MODAL" }), []);
  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);
  const openNavbar = useCallback(() => dispatch({ type: "OPEN_NAVBAR" }), []);
  const closeNavbar = useCallback(() => dispatch({ type: "CLOSE_NAVBAR" }), []);
  const setKeyword = useCallback((keyword: string) => dispatch({ type: "SET_KEYWORD", keyword }), []);


  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      openNavbar,
      closeNavbar,
      setKeyword,
    }),
    [state]
  );

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// ---------------- Hook ------------------
export function useGlobalState(): GlobalStateContextType {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error("Must be used within GlobalStateProvider");
  return context;
}
