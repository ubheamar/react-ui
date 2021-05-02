//import AppConfigContext from "./AppConfigContext";
import React, { FC, useContext, useState } from "react";
import { toast, ToastPosition } from "react-toastify";

interface AppConfigProviderProps {
  theme: string;
  toastPosition: ToastPosition;
  rtl: boolean;
  setTheme: (theme: string) => void;
  setToastPosition: (position: ToastPosition) => void;
  setRtl: (value: boolean) => void;
}

const AppConfigContext = React.createContext({});
const { Consumer, Provider } = AppConfigContext;
AppConfigContext.displayName = "AppConfigContext";

export function useAppConfig() {
  return useContext(AppConfigContext);
}

// @ts-ignore
function AppConfigProvider({ children }) {
  const [theme, setTheme] = useState("");
  const [toastPosition, setToastPosition] = useState(
    toast.POSITION.BOTTOM_RIGHT
  );
  const [rtl, setRtl] = useState(false);
  return (
    <Provider
      value={{
        toastPosition,
        theme,
        setTheme,
        setToastPosition,
        rtl,
        setRtl,
      }}
    >
      {children}
    </Provider>
  );
}

export default AppConfigProvider;
