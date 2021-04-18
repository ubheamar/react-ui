import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import React, { FC, isValidElement } from "react";
import classNames from "classnames";
import { cloneElement } from "../../utils/reactNode";

export interface MenuItemProps extends Omit<RcMenuItemProps, "title"> {
  icon?: React.ReactNode;
  // danger?: boolean;
  title?: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({
  title,
  icon,
  className,
  children,
  ...restProps
}: MenuItemProps) => {
  const menuItemClassNames = classNames(className);
  return (
    <Item className={menuItemClassNames} title={title} {...restProps}>
      {icon && (
        <span className="svg-icon menu-item-icon">
          {cloneElement(icon, {
            className: classNames(
              isValidElement(icon) ? icon.props?.className : ""
            ),
          })}
        </span>
      )}
      <span className="menu-item-label">{children}</span>
    </Item>
  );
};
export default MenuItem;
