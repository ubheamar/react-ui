import React, { FC, useContext, useState } from "react";

import { MenuColorProps } from "./index";

export interface MenuContextType extends MenuColorProps {}
const MenuContext = React.createContext<Partial<MenuContextType>>({});
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
