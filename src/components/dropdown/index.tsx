import React, { forwardRef } from "react";
import {
  BaseComponentPropsWithChildren,
  BaseRefForwardingComponent,
  tuple,
} from "../../types";
import RcDropdown from "rc-dropdown";
import { DropdownProps as RcDropdownProps } from "rc-dropdown/lib/Dropdown";
import { useAppConfig } from "../config";
import classNames from "classnames";

const Placements = tuple(
  "topStart",
  "topCenter",
  "topEnd",
  "bottomStart",
  "bottomCenter",
  "bottomEnd"
);
type Placement = typeof Placements[number];

export interface DropdownProps
  extends Omit<RcDropdownProps, "placement" | "trigger" | "animation"> {
  placement?: Placement;
  trigger?: ("click" | "hover" | "contextMenu")[];
}

type Dropdown = BaseRefForwardingComponent<"div", DropdownProps>;

const Dropdown: Dropdown = forwardRef(
  (
    { placement, overlayClassName, trigger, prefixCls, children, ...props },
    ref
  ) => {
    const { rtl } = useAppConfig();
    let newPlacement: string | undefined = placement;
    if (placement) {
      if (placement.indexOf("Start") != -1) {
        newPlacement = rtl
          ? placement.replace("Start", "Right")
          : placement.replace("Start", "Left");
      } else if (placement.indexOf("End") != -1) {
        newPlacement = rtl
          ? placement.replace("End", "Left")
          : placement.replace("End", "Right");
      }
    }
    // overlayClassName = classNames(overlayClassName, `placement-${placement}`);

    return (
      <RcDropdown
        trigger={trigger}
        placement={newPlacement}
        overlayClassName={overlayClassName}
        prefixCls={prefixCls || "dropdown"}
        ref={ref}
        {...props}
      >
        {children}
      </RcDropdown>
    );
  }
);

export default Dropdown;
