import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import React, { FC, isValidElement } from "react";
import classNames from "classnames";
import { useMenuConfig } from "./MenuContext";

export interface MenuItemProps extends Omit<RcMenuItemProps, "mode"> {
  mode?: "horizontal" | "vertical" | "inline";
  itemIconSpanClass?: string;
}

const MenuItem: FC<MenuItemProps> = ({
  rootPrefixCls,
  itemIcon,
  itemIconSpanClass,
  title,
  className,
  children,
  ...restProps
}: MenuItemProps) => {
  const { variant } = useMenuConfig();
  debugger;
  console.log(`Variant:${variant}`);
  const menuItemClassNames = classNames(
    className,
    variant && `bg-${variant} hoverable`
  );
  const iconSpanClassNames = classNames(
    `svg-icon ${rootPrefixCls}-item-icon`,
    itemIconSpanClass
  );
  return (
    <Item
      rootPrefixCls={rootPrefixCls}
      className={menuItemClassNames}
      title={title}
      {...restProps}
    >
      {itemIcon && <span className={iconSpanClassNames}>{itemIcon}</span>}
      <div className={`${rootPrefixCls}-item-content`}>{children}</div>
    </Item>
  );
};
MenuItem.defaultProps = {};
export default MenuItem;
