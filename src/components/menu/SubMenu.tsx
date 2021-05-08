import RcMenu, {
  SubMenu as RcSubMenu,
  SubMenuProps as RcSubMenuProps,
} from "rc-menu";
import React, { FC, isValidElement, useCallback } from "react";
import { cloneElement } from "../../utils/reactNode";
import classNames from "classnames";
import { ChevronRight } from "react-bootstrap-icons";
import { useMenuConfig } from "./MenuContext";

export interface SubMenuProps extends Omit<RcSubMenuProps, ""> {}

const SubMenu: FC<SubMenuProps> = ({
  className,
  rootPrefixCls,
  title,
  itemIcon,
  children,
  ...restProps
}: SubMenuProps) => {
  const { variant } = useMenuConfig();
  const renderTitle = useCallback(() => {
    const iconSpanClassNames = classNames(
      "svg-icon",
      rootPrefixCls && `${rootPrefixCls}-item-icon`
    );
    return (
      <>
        {itemIcon && (
          <span className={iconSpanClassNames}>
            {cloneElement(itemIcon, {
              className: classNames(
                isValidElement(itemIcon) ? itemIcon.props?.className : ""
              ),
            })}
          </span>
        )}
        {
          <span
            className={classNames(
              rootPrefixCls && `${rootPrefixCls}-item-content`
            )}
          >
            {title}
          </span>
        }
      </>
    );
  }, [title, itemIcon, rootPrefixCls]);

  const subMenuClassNames = classNames(
    className,
    variant && `bg-${variant} hoverable text-inverse-${variant}`
  );

  return (
    <RcSubMenu
      className={subMenuClassNames}
      rootPrefixCls={rootPrefixCls}
      title={renderTitle()}
      {...restProps}
    >
      {children}
    </RcSubMenu>
  );
};

export default SubMenu;
