import React, { forwardRef } from "react";

import { BaseComponentPropsWithChildren } from "../../types";
import clsx from "clsx";

export interface RowProps extends BaseComponentPropsWithChildren {
  /**
   * This property helps quickly set the number of columns that best render your content and layout
   * the row columns are set on the parent HBox as a shortcut
   * */
  columns?: "auto" | number;
  /**
   * Number of column fit for small devices
   * */
  sm?: number;
  /**
   * Number of column fit for medium scale devices
   * */
  md?: number;

  /**
   * Number of column fit for large scale devices
   * */
  lg?: number;

  /**
   * Number of column fit for extra large scale devices
   * */
  xl?: number;

  /**
   * Number of column fit for extra extra large scale devices
   * */
  xxl?: number;

  /*
   * Spacing
   * */
  space?: number;

  spaceX?: number;
  spaceY?: number;
}

const Row = forwardRef<"div", RowProps>(
  (
    {
      columns,
      sm,
      md,
      lg,
      xl,
      xxl,
      space,
      spaceX,
      spaceY,
      as: Component = "div",
      className,
      children,
      ...props
    }: RowProps,
    ref
  ) => {
    const classNames = clsx(
      "row",
      columns && `row-cols-${columns}`,
      sm && `row-cols-sm-${sm}`,
      md && `row-cols-md-${md}`,
      lg && `row-cols-lg-${lg}`,
      xl && `row-cols-xl-${xl}`,
      xxl && `row-cols-xxl-${xxl}`,
      space && `g-${space}`,
      spaceX && `gx-${spaceX}`,
      spaceY && `gy-${spaceY}`,
      className
    );

    return (
      <Component {...props} className={classNames} ref={ref}>
        {children}
      </Component>
    );
  }
);

export { Row };
