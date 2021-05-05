import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import React, { FC, isValidElement } from "react";
import classNames from "classnames";

export interface MenuItemProps extends Omit<RcMenuItemProps, ""> {}

const MenuItem: FC<MenuItemProps> = ({
  title,
  className,
  children,
  ...restProps
}: MenuItemProps) => {
  const menuItemClassNames = classNames(className);
  return (
    <Item className={menuItemClassNames} title={title} {...restProps}>
      {children}
    </Item>
  );
};
export default MenuItem;
