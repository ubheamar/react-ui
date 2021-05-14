import React from "react";
import BsDropdownMenu, {
  DropdownMenuProps as BsDropdownMenuProps,
} from "react-bootstrap/DropdownMenu";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
import { MenuTheme } from "../menu";
import { Menu } from "../../index";
import { cloneElement } from "../../utils/reactNode";
import classNames from "classnames";

interface DropdownMenuProps extends BsDropdownMenuProps {
  theme?: MenuTheme;
}

type DropdownMenu = BsPrefixRefForwardingComponent<"div", DropdownMenuProps>;

const DropdownMenu: DropdownMenu = React.forwardRef(
  ({ className, theme, children, ...props }, ref) => {
    const ChildrenComponent = React.Children.map(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child as React.ReactElement<any>).type === Menu
      ) {
        const extendedProps = { ...child.props };
        if (!extendedProps.theme) {
          extendedProps.theme = theme;
        }
        return cloneElement(child, extendedProps);
      }
      return child;
    });
    return (
      <BsDropdownMenu
        className={classNames(className, theme && `dropdown-theme-${theme}`)}
        ref={ref}
        {...props}
      >
        {ChildrenComponent}
      </BsDropdownMenu>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
