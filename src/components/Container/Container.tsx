import React, { forwardRef } from "react";

import { BaseComponentPropsWithChildren, BreakPoints } from "../../types";
import clsx from "clsx";

export interface ContainerProps extends BaseComponentPropsWithChildren {
  /**
   * Allow the Container to fill all of its available horizontal space.
   * @type "sm"|"md"|"lg"|"xl"|"xxl"|"fluid"
   */
  type?: (BreakPoints & "fluid") | string;
}

/**
 * Containers are a fundamental building block of React UI that contain, pad, and align your content within a given device or viewport.
 * */
const Container = forwardRef<"div", ContainerProps>(
  (
    {
      type,
      as: Component = "div",
      className,
      children,
      ...props
    }: ContainerProps,
    ref
  ) => {
    const classNames = clsx(
      type ? `container-${type}` : `container`,
      className
    );
    return (
      <Component {...props} className={classNames} ref={ref}>
        {children}
      </Component>
    );
  }
);

export { Container };
