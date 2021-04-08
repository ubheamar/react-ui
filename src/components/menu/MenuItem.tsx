/*
import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import React from "react";
import { Component, isValidElement } from "react";
import { OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import { SiderContext, SiderContextProps } from "../layout/Sider";
import MenuContext, { MenuContextProps } from "./MenuContext";
import clsx from "clsx";
import toArray from "rc-util/lib/Children/toArray";
import { cloneElement } from "../../utils/reactNode";

export interface MenuItemProps extends Omit<RcMenuItemProps, "title"> {
  icon?: React.ReactNode;
  danger?: boolean;
  title?: React.ReactNode;
}

export default class MenuItem extends Component<MenuItemProps> {
  static isMenuItem = true;

  renderItemChildren(inlineCollapsed: boolean) {
    const { icon, children, level, rootPrefixCls } = this.props;
    if (!icon || (isValidElement(children) && children.type === "span")) {
      if (
        children &&
        inlineCollapsed &&
        level === 1 &&
        typeof children === "string"
      ) {
        return (
          <div className={`${rootPrefixCls}-inline-collapsed-noicon`}>
            {children.charAt(0)}
          </div>
        );
      }
      return children;
    }
    return <span>{children}</span>;
  }

  renderItem = ({ siderCollapsed }: SiderContextProps) => {
    const { level, className, children, rootPrefixCls } = this.props;
    const { title, icon, danger, ...rest } = this.props;

    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed }: MenuContextProps) => {
          let tooltipTitle = title;
          if (typeof title === "undefined") {
            tooltipTitle = level === 1 ? children : "";
          } else if (title === false) {
            tooltipTitle = "";
          }
          const tooltipData = {
            title: tooltipTitle,
            visible: false,
          };

          if (!siderCollapsed && !inlineCollapsed) {
            tooltipData.title = null;
            // Reset `visible` to fix control mode tooltip display not correct
            // ref: https://github.com/ant-design/ant-design/issues/16742
            tooltipData.visible = false;
          }
          const childrenLength = toArray(children).length;
          // @ts-ignore
          // @ts-ignore
          return (
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-id-show" show={tooltipData.visible}>
                  {tooltipData.title}
                </Tooltip>
              }
            >
              <Item
                {...rest}
                className={clsx(
                  {
                    [`${rootPrefixCls}-item-danger`]: danger,
                    [`${rootPrefixCls}-item-only-child`]:
                      (icon ? childrenLength + 1 : childrenLength) === 1,
                  },
                  className
                )}
                title={title}
              >
                {cloneElement(icon, {
                  className: clsx(
                    isValidElement(icon) ? icon.props?.className : "",
                    `${rootPrefixCls}-item-icon`
                  ),
                })}
                {this.renderItemChildren(inlineCollapsed)}
              </Item>
            </OverlayTrigger>
            /!*  <Tooltip
              {...tooltipProps}
              //  placement={direction === "rtl" ? "left" : "right"}
              overlayClassName={`${rootPrefixCls}-inline-collapsed-tooltip`}
            >
              <Item
                {...rest}
                className={clsx(
                  {
                    [`${rootPrefixCls}-item-danger`]: danger,
                    [`${rootPrefixCls}-item-only-child`]:
                      (icon ? childrenLength + 1 : childrenLength) === 1,
                  },
                  className
                )}
                title={title}
              >
                {cloneElement(icon, {
                  className: clsx(
                    isValidElement(icon) ? icon.props?.className : "",
                    `${rootPrefixCls}-item-icon`
                  ),
                })}
                {this.renderItemChildren(inlineCollapsed)}
              </Item>
            </Tooltip>*!/
          );
        }}
      </MenuContext.Consumer>
    );
  };

  render() {
    return <SiderContext.Consumer>{this.renderItem}</SiderContext.Consumer>;
  }
}
*/

import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import React, { FC, isValidElement } from "react";
import clsx from "clsx";
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
  const menuItemClassNames = clsx(className);
  return (
    <Item className={menuItemClassNames} title={title} {...restProps}>
      {icon && (
        <span className="svg-icon menu-item-icon">
          {cloneElement(icon, {
            className: clsx(isValidElement(icon) ? icon.props?.className : ""),
          })}
        </span>
      )}
      <span className="menu-item-label">{children}</span>
    </Item>
  );
};
export default MenuItem;
