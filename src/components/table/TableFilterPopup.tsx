import React, {forwardRef} from "react";
import {
    BaseComponentPropsWithChildren,
    BaseRefForwardingComponent,
} from "../../types";

export interface TableFilterPopupProps extends BaseComponentPropsWithChildren {
}

type TableFilterPopup = BaseRefForwardingComponent<"div",
    TableFilterPopupProps>;

const TableFilterPopup: TableFilterPopup = forwardRef(
  ({ children, as: Component = "div", ...props }, ref) => {
    return (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);

export default TableFilterPopup;
