//ref from antd
import { Item, MenuItemProps as RcMenuItemProps } from "rc-menu";
import React, { createRef, FC, isValidElement } from "react";
import classNames from "classnames";
import MenuContext, { MenuContextType, useMenuConfig } from "./MenuContext";
import { SiderContext, SiderContextProps } from "../layout/Sider";
import { cloneElement } from "../../utils/reactNode";
import toArray from "rc-util/lib/Children/toArray";
import {
  Overlay,
  OverlayTrigger,
  Tooltip,
  TooltipProps,
} from "react-bootstrap";

export interface MenuItemProps extends Omit<RcMenuItemProps, "title"> {
  icon?: React.ReactNode;
  danger?: boolean;
  title?: React.ReactNode;
  iconSpanClass?: string;
}

export default class MenuItem extends React.Component<MenuItemProps> {
  static isMenuItem = true;
  private menuRef = createRef<HTMLElement>();
  renderItemChildren(inlineCollapsed: boolean | undefined) {
    const { icon, iconSpanClass, children, level, rootPrefixCls } = this.props;
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
    return <div className={`${rootPrefixCls}-item-content`}>{children}</div>;
  }

  renderItem = ({ siderCollapsed }: SiderContextProps) => {
    const { level, className, children, rootPrefixCls } = this.props;
    const { title, icon, iconSpanClass, danger, ...rest } = this.props;

    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed, direction }) => {
          let tooltipTitle = title;
          if (typeof title === "undefined") {
            tooltipTitle = level === 1 ? children : "";
          } else if (title === false) {
            tooltipTitle = "";
          }
          const tooltipProps: TooltipProps = {
            id: "menu-collapsed-tooltip",
            children: tooltipTitle,
          };

          if (!siderCollapsed && !inlineCollapsed) {
            tooltipProps.children = null;
            tooltipProps.show = false;
          }
          const childrenLength = toArray(children).length;
          return (
            <>
              <Overlay
                target={this.menuRef}
                show={tooltipProps.show}
                placement={direction === "rtl" ? "left" : "right"}
              >
                <Tooltip id={tooltipProps.id}> {tooltipProps.children}</Tooltip>
              </Overlay>
              <Item
                ref={this.menuRef}
                {...rest}
                className={classNames(
                  {
                    [`${rootPrefixCls}-item-danger`]: danger,
                    [`${rootPrefixCls}-item-only-child`]:
                      (icon ? childrenLength + 1 : childrenLength) === 1,
                  },
                  className
                )}
                title={title}
              >
                {icon && (
                  <span
                    className={classNames(
                      `${rootPrefixCls}-item-icon svg-icon`,
                      iconSpanClass
                    )}
                  >
                    {cloneElement(icon, {
                      className: classNames(
                        isValidElement(icon) ? icon.props?.className : ""
                      ),
                    })}
                  </span>
                )}
                {this.renderItemChildren(inlineCollapsed)}
              </Item>
            </>
          );
        }}
      </MenuContext.Consumer>
    );
  };

  render() {
    return <SiderContext.Consumer>{this.renderItem}</SiderContext.Consumer>;
  }
}

/*const MenuItem: FC<MenuItemProps> = ({
  rootPrefixCls,
  itemIcon,
  itemIconSpanClass,
  title,
  className,
  children,
  ...restProps
}: MenuItemProps) => {
  const {} = useMenuConfig();

  const menuItemClassNames = classNames(className);
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
export default MenuItem;*/
