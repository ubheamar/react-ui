import RcMenu, {
  SubMenu as RcSubMenu,
  SubMenuProps as RcSubMenuProps,
} from "rc-menu";
import React, { FC, isValidElement, useCallback } from "react";
import { cloneElement } from "../../utils/reactNode";
import classNames from "classnames";
import { ChevronRight } from "react-bootstrap-icons";

export interface SubMenuProps extends RcSubMenuProps {}

const SubMenu: FC<SubMenuProps> = ({
  children,
  ...restProps
}: SubMenuProps) => {
  return <RcSubMenu {...restProps}>{children}</RcSubMenu>;
};

export default SubMenu;
