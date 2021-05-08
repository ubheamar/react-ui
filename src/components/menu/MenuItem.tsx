import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import React, { FC, isValidElement } from "react";
import classNames from "classnames";
import { useMenuConfig } from "./MenuContext";

export interface MenuItemProps extends Omit<RcMenuItemProps, "mode"> {
  mode?: "horizontal" | "vertical" | "inline";
  itemIconSpanClass?: string;
}

const MenuItem: FC<MenuItemProps> = ({
  /*active,
  isSelected,*/
  rootPrefixCls,
  itemIcon,
  itemIconSpanClass,
  title,
  className,
  children,
  ...restProps
}: MenuItemProps) => {
  const {
    variant,
    bgColor,
    textColor,
    bgActiveColor,
    textActiveColor,
    iconActiveColor,
    bgSelectedColor,
    textSelectedColor,
    iconSelectedColor,
  } = useMenuConfig();
  /*const menuItemClassNames = classNames(
    className,
    variant &&
      `bg-${variant} hoverable text-inverse-${variant} text-hover-inverse-${variant}`
  );*/
  let menuItemClassBuilder = classNames(className);
  /*console.log(`Active:${active}`);
  if (active) {
    menuItemClassBuilder += classNames(
      variant && !bgActiveColor ? `hoverable` : `bg-${bgActiveColor}`,
      variant && !textActiveColor
        ? `text-hover-inverse-${variant}`
        : `text-${textActiveColor}`
    );
  } else if (isSelected) {
    menuItemClassBuilder += classNames(
      variant && !bgSelectedColor
        ? `bg-active-${variant} selected`
        : `bg-${bgSelectedColor}`,
      variant && !textSelectedColor
        ? `text-active-inverse-${variant}`
        : `text-${textSelectedColor}`
    );
  } else {
    menuItemClassBuilder += classNames(
      variant && !bgColor && `bg-${variant}`,
      !variant && bgColor && `bg-${bgColor}`,
      variant && !textColor && `text-inverse-${variant}`,
      !variant && textColor && `text-${textColor}`
    );
  }*/
  const menuItemClassNames = menuItemClassBuilder;
  const iconSpanClassNames = classNames(
    `svg-icon ${rootPrefixCls}-item-icon`,
    itemIconSpanClass
  );
  return (
    <Item
      /*  active={active}
      isSelected={isSelected}*/
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
