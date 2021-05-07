import RcMenu, { ItemGroup, MenuProps as RcMenuProps } from "rc-menu";

import React, { FC, useState } from "react";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";
import classNames from "classnames";
import Divider from "./Divider";
import { ColorsVariant } from "../../utils/types";
import MenuContext, { MenuProvider } from "./MenuContext";

export interface MenuComposition {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  Divider: typeof Divider;
}
export interface MenuProps extends RcMenuProps {
  variant?: ColorsVariant;
  iconVariant?: string;
  iconActiveVariant?: string;
}

const Menu: FC<MenuProps> & MenuComposition = ({
  variant,
  iconVariant,
  iconActiveVariant,
  className,
  children,
  ...restProps
}) => {
  const menuClassName = classNames(
    variant && `bg-${variant} text-inverse-${variant}`,
    className
  );
  // debugger;
  const [config, setConfig] = useState<MenuContextType>({
    variant,
    iconVariant,
    iconActiveVariant,
  });
  React.useEffect(() => {
    setConfig(config);
  }, [config, setConfig]);

  return (
    <MenuContext.Provider value={config}>
      <RcMenu prefixCls="menu" className={menuClassName} {...restProps}>
        {children}
      </RcMenu>
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Divider = Divider;

export default Menu;
export type { MenuItemProps, SubMenuProps };
