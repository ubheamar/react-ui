//ref from bootstrap dropdown
import React, { forwardRef, isValidElement, ReactNode } from "react";
import BsDropdown, {
  DropdownProps as BsDropdownProps,
} from "react-bootstrap/Dropdown";

import { BsPrefixRefForwardingComponent } from "react-bootstrap/helpers";
import BsDropdownItem from "react-bootstrap/DropdownItem";
//import BsDropdownMenu from "react-bootstrap/DropdownMenu";
import BsDropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "./DropdownMenu";

export interface DropdownProps extends BsDropdownProps {}

const Dropdown: BsPrefixRefForwardingComponent<
  "div",
  DropdownProps
> = React.forwardRef<HTMLElement, DropdownProps>((pProps, ref) => {
  return <BsDropdown ref={ref} {...pProps} />;
});

Dropdown.displayName = "Dropdown";

export default Object.assign(Dropdown, {
  Toggle: BsDropdownToggle,
  Menu: DropdownMenu,
  Item: BsDropdownItem,
  ItemText: BsDropdown.ItemText,
  Divider: BsDropdown.Divider,
  Header: BsDropdown.Header,
});

//export default Dropdown;
