/*
import RcMenu, { Divider, ItemGroup, MenuProps as RcMenuProps } from "rc-menu";
import { Component } from "react";
import { SiderContext, SiderContextProps } from "../layout/Sider";
import devWarning from "../../utils/devWarning";
import clsx from "clsx";
import MenuContext from "./MenuContext";
import React from "react";
import { cloneElement } from "../../utils/reactNode";
import collapseMotion from "../../utils/motion";
import SubMenu, { SubMenuProps } from "./SubMenu";
import Item, { MenuItemProps } from "./MenuItem";

export { MenuItemGroupProps } from "rc-menu";

export interface MenuProps extends RcMenuProps {
  inlineIndent?: number;
  focusable?: boolean;
}

export type MenuMode =
  | "vertical"
  | "vertical-start"
  | "vertical-end"
  | "horizontal"
  | "inline";

type InternalMenuProps = MenuProps & SiderContextProps;

class InternalMenu extends Component<InternalMenuProps> {
  static defaultProps: Partial<MenuProps> = {
    className: "",
    focusable: false,
  };

  constructor(props: InternalMenuProps) {
    super(props);

    devWarning(
      !("inlineCollapsed" in props && props.mode !== "inline"),
      "Menu",
      "`inlineCollapsed` should only be used when `mode` is inline."
    );

    devWarning(
      !(props.siderCollapsed !== undefined && "inlineCollapsed" in props),
      "Menu",
      "`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead."
    );
  }

  getInlineCollapsed() {
    const { inlineCollapsed, siderCollapsed } = this.props;
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }

  render() {
    const rootPrefixCls = "menu";

    const { prefixCls: customizePrefixCls, className, expandIcon } = this.props;
    const defaultMotions = {
      horizontal: { motionName: `${rootPrefixCls}-slide-up` },
      inline: collapseMotion,
      other: { motionName: `${rootPrefixCls}-zoom-big` },
    };

    const prefixCls = "menu";
    const menuClassName = clsx(
      `${prefixCls}`,
      {
        [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
      },
      className
    );

    return (
      <MenuContext.Provider
        value={{
          inlineCollapsed: this.getInlineCollapsed() || false,
        }}
      >
        <RcMenu
          //getPopupContainer={getPopupContainer}
          {...this.props}
          className={menuClassName}
          prefixCls={prefixCls}
          defaultMotions={defaultMotions}
          expandIcon={cloneElement(expandIcon, {
            className: `${prefixCls}-submenu-expand-icon`,
          })}
        />
      </MenuContext.Provider>
    );
  }

  //render = () => this.renderMenu;
}

// We should keep this as ref-able
class Menu extends React.Component<MenuProps, {}> {
  static Divider = Divider;
  static Item = Item;
  static SubMenu = SubMenu;

  static ItemGroup = ItemGroup;

  render() {
    return (
      <SiderContext.Consumer>
        {(context: SiderContextProps) => (
          <InternalMenu {...this.props} {...context} />
        )}
      </SiderContext.Consumer>
    );
  }
}

export { SubMenuProps, MenuItemProps };

export default Menu;
*/
import RcMenu, { Divider, ItemGroup, MenuProps as RcMenuProps } from "rc-menu";

import React, { FC } from "react";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";
import clsx from "clsx";

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
  const menuClassName = clsx(className);
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
