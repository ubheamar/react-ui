import RcMenu, { ItemGroup, MenuProps as RcMenuProps } from "rc-menu";

import React, { FC } from "react";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";
import classNames from "classnames";
import Divider from "./Divider";

export interface MenuComposition {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  Divider: typeof Divider;
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
Menu.SubMenu = SubMenu;
Menu.Divider = Divider;

export default Menu;
export type { MenuItemProps, SubMenuProps };
