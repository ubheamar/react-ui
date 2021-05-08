import RcMenu, { ItemGroup, MenuProps as RcMenuProps } from "rc-menu";

import React, { FC, useState } from "react";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";
import classNames from "classnames";
import Divider from "./Divider";
import { ColorsVariant, TextVariant } from "../../utils/types";
import MenuContext, { MenuContextType } from "./MenuContext";

export interface MenuComposition {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  Divider: typeof Divider;
}
export interface MenuColorProps {
  variant?: ColorsVariant;
  bgColor?: ColorsVariant;
  textColor?: TextVariant;
  iconColor?: TextVariant;
  bgActiveColor?: ColorsVariant;
  textActiveColor?: TextVariant;
  iconActiveColor?: TextVariant;
  bgSelectedColor?: ColorsVariant;
  textSelectedColor?: TextVariant;
  iconSelectedColor?: TextVariant;
}
export interface MenuProps extends RcMenuProps, MenuColorProps {}

const Menu: FC<MenuProps> & MenuComposition = ({
  activeKey,
  variant,
  bgColor,
  textColor,
  iconColor,
  bgActiveColor,
  textActiveColor,
  iconActiveColor,
  bgSelectedColor,
  textSelectedColor,
  iconSelectedColor,
  className,
  children,
  ...restProps
}) => {
  const menuClassName = classNames(
    //variant && `bg-${variant} text-inverse-${variant}`,
    className
  );
  // debugger;
  const [config, setConfig] = useState<MenuContextType>({
    variant,
    bgColor,
    textColor,
    iconColor,
    bgActiveColor,
    textActiveColor,
    iconActiveColor,
    bgSelectedColor,
    textSelectedColor,
    iconSelectedColor,
  });
  React.useEffect(() => {
    setConfig(config);
  }, [
    variant,
    bgColor,
    textColor,
    iconColor,
    bgActiveColor,
    textActiveColor,
    iconActiveColor,
    bgSelectedColor,
    textSelectedColor,
    iconSelectedColor,
    setConfig,
  ]);

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
