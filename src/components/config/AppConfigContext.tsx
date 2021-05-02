import { toast, ToastPosition } from "react-toastify";
import React, { useContext } from "react";

interface AppConfigContextType {
  theme: string;
  toastPosition: ToastPosition;
  rtl: boolean;
  setTheme: (theme: string) => void;
  setToastPosition: (position: ToastPosition) => void;
  setRtl: (value: boolean) => void;
}

const AppConfigContext = React.createContext<Partial<AppConfigContextType>>({
  theme: "light",
  toastPosition: toast.POSITION.TOP_RIGHT,
  rtl: false,
});

AppConfigContext.displayName = "AppConfigContext";

export default AppConfigContext;

export const useAppConfig = useContext(AppConfigContext);
