//import AppConfigContext from "./AppConfigContext";
import React, { FC, useContext, useState } from "react";
import { toast, ToastPosition } from "react-toastify";

export type DirectionType = "ltr" | "rtl";

export interface AppConfig {
  theme: string;
  toastPosition: ToastPosition;
  direction: DirectionType;
  setTheme: (theme: string) => void;
  setToastPosition: (position: ToastPosition) => void;
  setDirection: (value: boolean) => void;
}

interface AppConfigProviderProps extends AppConfig {}

const AppConfigContext = React.createContext({});
const { Consumer, Provider } = AppConfigContext;

AppConfigContext.displayName = "AppConfigContext";

export const AppConfigConsumer = Consumer;

export function useAppConfig() {
  return useContext(AppConfigContext) as AppConfigProviderProps;
}

// @ts-ignore
function AppConfigProvider({ children }) {
  const [theme, setTheme] = useState("");
  const [toastPosition, setToastPosition] = useState(
    toast.POSITION.BOTTOM_RIGHT
  );
  const [direction, setDirection] = useState("ltr");
  return (
    <Provider
      value={{
        toastPosition,
        theme,
        setTheme,
        setToastPosition,
        direction,
        setDirection,
      }}
    >
      {children}
    </Provider>
  );
}

export default AppConfigProvider;
