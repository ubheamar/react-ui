import RcMenu, { Divider, ItemGroup, MenuProps as RcMenuProps } from "rc-menu";

import React, { FC } from "react";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";
import classNames from "classnames";

export interface MenuComposition {
  Item: typeof MenuItem;
  Submenu: typeof SubMenu;
}
export interface MenuProps extends RcMenuProps {}

const Menu: FC<MenuProps> & MenuComposition = ({
  className,
  children,
  ...restProps
}) => {
  const menuClassName = classNames(className);
  return (
    <RcMenu prefixCls="menu" className={menuClassName} {...restProps}>
      {children}
    </RcMenu>
  );
};

Menu.Item = MenuItem;
Menu.Submenu = SubMenu;

export default Menu;
export type { MenuItemProps, SubMenuProps };
