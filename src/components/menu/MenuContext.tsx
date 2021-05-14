import React, { FC, useContext, useState } from "react";
import { DirectionType } from "../config";

export type MenuTheme = "default" | "dark" | string;

export interface MenuContextType {
  inlineCollapsed: boolean;
  theme?: MenuTheme;
  direction?: DirectionType;
}
const MenuContext = React.createContext<Partial<MenuContextType>>({
  inlineCollapsed: false,
});
MenuContext.displayName = "MenuContext";

export default MenuContext;

export function useMenuConfig() {
  return useContext(MenuContext);
}

/*
export const useMenuConfig = useContext(MenuContext);

interface MenuProviderProps {}

export const MenuProvider: FC<MenuProviderProps> = ({
  children,
  ...restProps
}) => {
  const [config] = useState<MenuContextType>({});
  return <MenuContext.Provider value={config}>{children}</MenuContext.Provider>;
};
*/
