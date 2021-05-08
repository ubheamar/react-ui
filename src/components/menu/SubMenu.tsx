import RcMenu, { SubMenu as RcSubMenu } from "rc-menu";
import React, { FC, isValidElement, useCallback } from "react";
import classNames from "classnames";
import MenuContext from "./MenuContext";
import omit from "rc-util/lib/omit";

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

class SubMenu extends React.Component<SubMenuProps, any> {
  static contextType = MenuContext;
  static isSubMenu = 1;

  renderTitle(inlineCollapsed: boolean | undefined) {
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
        <div className={`${rootPrefixCls}-item-content`}>{title}</div>
      );
    }

    const titleIsSpan = isValidElement(title) && title.type === "span";
    return (
      <>
        {icon && (
          <span className={classNames(`${rootPrefixCls}-item-icon svg-icon`)}>
            {icon}
          </span>
        )}
        <div className={`${rootPrefixCls}-item-content`}>
          {titleIsSpan ? title : <span>{title}</span>}
        </div>
      </>
    );
  }

  render() {
    const { rootPrefixCls, popupClassName } = this.props;
    return (
      <MenuContext.Consumer>
        {({ inlineCollapsed, theme }) => (
          <RcSubMenu
            {...omit(this.props, ["icon"])}
            title={this.renderTitle(inlineCollapsed)}
            popupClassName={classNames(
              rootPrefixCls,
              `${rootPrefixCls}-${theme}`,
              popupClassName
            )}
          />
        )}
      </MenuContext.Consumer>
    );
  }
}

export default SubMenu;
