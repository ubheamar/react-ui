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

export interface SelectProps extends RcSelectProps {}

type Select = BaseRefForwardingComponent<"select", SelectProps>;

const Select: Select = forwardRef(({ prefixCls, children, ...props }, ref) => {
  return (
    <RcSelect prefixCls={prefixCls || "select"} ref={ref as any} {...props}>
      {children}
    </RcSelect>
  );
});

export default Object.assign(Select, {
  Option: Option,
});
