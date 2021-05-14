//source:antd menu refer
import RcMenu, { ItemGroup, MenuProps as RcMenuProps } from "rc-menu";
import React, { FC, forwardRef, useState } from "react";
import Item from "./MenuItem";
import { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";
import classNames from "classnames";
import Divider from "./Divider";

import MenuContext, { MenuTheme } from "./MenuContext";
import { SiderContext, SiderContextProps } from "../layout/Sider";
import devWarning from "../../utils/devWarning";
import { cloneElement } from "../../utils/reactNode";
import { AppConfig, AppConfigConsumer, useAppConfig } from "../config";

export type MenuMode = "vertical" | "horizontal" | "inline";

export interface MenuProps extends RcMenuProps {
  theme?: MenuTheme;
  inlineIndent?: number;
  focusable?: boolean;
}
type InternalMenuProps = MenuProps & SiderContextProps;

class InternalMenu extends React.Component<InternalMenuProps> {
  static defaultProps: Partial<MenuProps> = {
    className: "",
    theme: "default",
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

  renderMenu = ({ direction }: AppConfig) => {
    const rootPrefixCls = "";

    const {
      prefixCls: customizePrefixCls,
      className,
      theme,
      expandIcon,
    } = this.props;

    const prefixCls = customizePrefixCls || "menu";
    const menuClassName = classNames(
      `${prefixCls}-${theme}`,
      {
        [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
      },
      className
    );

    return (
      <MenuContext.Provider
        value={{
          inlineCollapsed: this.getInlineCollapsed() || false,
          theme: theme,
          direction,
        }}
      >
        <RcMenu
          {...this.props}
          className={menuClassName}
          prefixCls={prefixCls}
          direction={direction}
          expandIcon={cloneElement(expandIcon, {
            className: `${prefixCls}-submenu-expand-icon`,
          })}
        />
      </MenuContext.Provider>
    );
  };

  render() {
    // @ts-ignore
    return <AppConfigConsumer>{this.renderMenu}</AppConfigConsumer>;
  }
}

// We should keep this as ref-able
export interface MenuComposition
  extends React.ForwardRefExoticComponent<
    MenuProps & React.RefAttributes<any>
  > {
  Item: typeof Item;
  SubMenu: typeof SubMenu;
  Divider: typeof Divider;
  ItemGroup: typeof ItemGroup;
}
const Menu = forwardRef<InternalMenu, MenuProps>((props, ref) => {
  return (
    <SiderContext.Consumer>
      {(context: SiderContextProps) => (
        <InternalMenu ref={ref} {...props} {...context} />
      )}
    </SiderContext.Consumer>
  );
}) as MenuComposition;

Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.Divider = Divider;
Menu.ItemGroup = ItemGroup;

/*
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
*/

export { MenuTheme, SubMenuProps, MenuItemProps };

export default Menu;

/*export interface MenuComposition {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  Divider: typeof Divider;
}
export interface MenuColorProps {
  variant?: "default" | string;
}
export interface MenuProps extends RcMenuProps, MenuColorProps {}

const Menu: FC<MenuProps> & MenuComposition = ({
  variant,
  className,
  children,
  ...restProps
}) => {
  const menuClassName = classNames(
    variant && `${variant}-theme-menu`,
    className
  );
  const [config, setConfig] = useState<MenuContextType>({
    variant,
  });
  React.useEffect(() => {
    setConfig(config);
  }, [variant, setConfig]);

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

Menu.defaultProps = {
  variant: "default",
};

export default Menu;
export type { MenuItemProps, SubMenuProps };*/
