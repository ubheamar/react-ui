import React, { forwardRef } from "react";
import {
  BaseComponentPropsWithChildren,
  BaseRefForwardingComponent,
} from "../../types";
import classNames from "classnames";
import { PrimaryColors } from "../../utils/types";

export interface SeparatorProps extends BaseComponentPropsWithChildren {
  size?: "2" | "3" | "4" | "5";
  variant?: PrimaryColors;
  type?: "dashed" | "dotted";
}

type Separator = BaseRefForwardingComponent<"div", SeparatorProps>;

const Separator: Separator = forwardRef(
  (
    {
      size,
      variant,
      type,
      className,
      children,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const classNamesComp = classNames(
      "separator",
      size && `border-${size}`,
      variant && `border-${variant}`,
      type && `separator-${type}`,
      className
    );
    return (
      <Component className={classNamesComp} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);

export default Separator;
