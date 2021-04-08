/*
import React, { isValidElement } from "react";
import { Component } from "react";
import MenuContext, { MenuContextProps } from "./MenuContext";
import omit from "rc-util/lib/omit";
import { SubMenu as RcSubMenu } from "rc-menu";
import clsx from "clsx";

interface TitleEventEntity {
  key: string;
  domEvent: Event;
}

export interface SubMenuProps {
  rootPrefixCls?: string;
  className?: string;
  disabled?: boolean;
  level?: number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  onTitleClick?: (e: TitleEventEntity) => void;
  onTitleMouseEnter?: (e: TitleEventEntity) => void;
  onTitleMouseLeave?: (e: TitleEventEntity) => void;
  popupOffset?: [number, number];
  popupClassName?: string;
}

class SubMenu extends Component<SubMenuProps, any> {
  static contextType = MenuContext;

  // fix issue:https://github.com/ant-design/ant-design/issues/8666
  static isSubMenu = 1;

  renderTitle(inlineCollapsed: boolean) {
    const { icon, title, level, rootPrefixCls } = this.props;
    if (!icon) {
      return inlineCollapsed &&
        level === 1 &&
        title &&
        typeof title === "string" ? (
        <div className={`${rootPrefixCls}-inline-collapsed-noicon`}>
          {title.charAt(0)}
        </div>
      ) : (
        title
      );
    }
    // inline-collapsed.md demo 依赖 span 来隐藏文字,有 icon 属性，则内部包裹一个 span
    // ref: https://github.com/ant-design/ant-design/pull/23456
    const titleIsSpan = isValidElement(title) && title.type === "span";
    return (
      <>
        {icon}
        {titleIsSpan ? title : <span>{title}</span>}
      </>
    );
  }

  render() {
    const { rootPrefixCls, popupClassName } = this.props;
    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed }: MenuContextProps) => (
          <RcSubMenu
            {...omit(this.props, ["icon"])}
            title={this.renderTitle(inlineCollapsed)}
            popupClassName={clsx(rootPrefixCls, popupClassName)}
          />
        )}
      </MenuContext.Consumer>
    );
  }
}

export default SubMenu;
*/

import RcMenu, {
  SubMenu as RcSubMenu,
  SubMenuProps as RcSubMenuProps,
} from "rc-menu";
import React, { FC, isValidElement, useCallback } from "react";
import { cloneElement } from "../../utils/reactNode";
import clsx from "clsx";
import { ChevronRight } from "react-bootstrap-icons";

export interface SubMenuProps extends RcSubMenuProps {
  icon?: React.ReactNode;
  // danger?: boolean;
  title?: React.ReactNode;
}

const SubMenu: FC<SubMenuProps> = ({
  expandIcon,
  title,
  icon,
  children,
  ...restProps
}: SubMenuProps) => {
  const renderTitle = useCallback(() => {
    return (
      <>
        {icon && (
          <span className="svg-icon menu-item-icon">
            {cloneElement(icon, {
              className: clsx(
                isValidElement(icon) ? icon.props?.className : ""
              ),
            })}
          </span>
        )}
        {<span className="menu-item-label">{title}</span>}
      </>
    );
  }, [title, icon]);

  return (
    <RcSubMenu
      expandIcon={
        expandIcon || (
          <span className="d-flex flex-grow-1 justify-content-end align-items-center">
            <i className="menu-submenu-arrow" />
          </span>
        )
      }
      title={renderTitle()}
      {...restProps}
    >
      {children}
    </RcSubMenu>
  );
};

export default SubMenu;
