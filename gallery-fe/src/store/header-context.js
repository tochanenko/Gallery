import { createContext, useReducer } from "react";

export const HEADER_ACTION = {
  HIDE_MOBILE: "HIDE_MOBILE",
  TOGGLE_MOBILE: "TOGGLE_MOBILE"
}

export const HeaderContext = createContext({
  mobileVisible: false,
  handleHideMobile: () => {},
  handleToggleMobile: () => {}
});

function headerReducer(state, action) {
  switch(action.type) {
    case HEADER_ACTION.HIDE_MOBILE:
      return {
        ...state,
        mobileVisible: false
      };
    case HEADER_ACTION.TOGGLE_MOBILE:
      return {
        ...state,
        mobileVisible: !state.mobileVisible
      };
    default:
      return state;
  }
}

export default function HeaderContextProvider({ children }) {
  const [headerState, dispatchHeaderState] = useReducer(
    headerReducer,
    {
      mobileVisible: false
    }
  );

  function handleHideMobile() {
    dispatchHeaderState({ type: HEADER_ACTION.HIDE_MOBILE });
  }

  function handleToggleMobile() {
    dispatchHeaderState({ type: HEADER_ACTION.TOGGLE_MOBILE });
  }

  const ctxValue = {
    mobileVisible: headerState.mobileVisible,
    handleHideMobile: handleHideMobile,
    handleToggleMobile: handleToggleMobile
  };

  return <HeaderContext.Provider value={ctxValue}>{children}</HeaderContext.Provider>
}