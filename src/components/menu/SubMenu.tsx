import RcMenu, {
  SubMenu as RcSubMenu,
  SubMenuProps as RcSubMenuProps,
} from "rc-menu";
import React, { FC, isValidElement, useCallback } from "react";
import { cloneElement } from "../../utils/reactNode";
import classNames from "classnames";
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
              className: classNames(
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
