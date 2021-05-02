import React, { forwardRef } from "react";
import RcSelect, {
  Option,
  OptGroup,
  SelectProps as RcSelectProps,
} from "rc-select";
import {
  BaseComponentPropsWithChildren,
  BaseRefForwardingComponent,
} from "../../types";

export interface SelectProps extends BaseComponentPropsWithChildren {}

type Select = BaseRefForwardingComponent<"select", SelectProps>;

const Select: Select = forwardRef(({ children, ...props }, ref) => {
  return (
    <RcSelect ref={ref as any} {...props}>
      {children}
    </RcSelect>
  );
});

export default Select;
