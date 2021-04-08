import { createContext } from "react";

export interface MenuContextProps {
  inlineCollapsed: boolean;
}

const MenuContext = createContext<MenuContextProps>({
  inlineCollapsed: false,
});

export default MenuContext;
