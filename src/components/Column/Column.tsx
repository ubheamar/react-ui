import React, { forwardRef } from "react";

import { BaseComponentPropsWithChildren } from "../../types";
import clsx from "clsx";
import { DEVICE_SIZES } from "../../constants";

type NumberAttr =
  | number
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

type ColSize = NumberAttr | "auto";
type ColOrder = NumberAttr | "first" | "last";
type ColOffset = number | string;
type ColObjectType = {
  /**
   * The number of columns to span
   * */
  span?: ColSize;
  /**
   * Use order property for controlling the visual order of your content.
   * */
  order?: ColOrder;
  offset?: ColOffset;
};
type ColSpec = ColSize | ColObjectType;

export interface ColProps extends BaseComponentPropsWithChildren {
  /**
   * The number of columns to span
   *
   * */
  span?: ColSize;

  /**
   * Use order property for controlling the visual order of your content.
   * */
  order?: ColOrder;

  /**
   * You can offset grid columns with help of this property
   * */
  offset?: ColOffset;
  /**
   * The number of columns to span on small devices
   * */
  sm?: ColSize | ColSpec;
  /**
   * The number of columns to span on medium devices
   * */
  md?: ColSize | ColSpec;

  /**
   * The number of columns to span on large devices
   * */
  lg?: ColSize | ColSpec;

  /**
   * The number of columns to span on extra large devices
   * */
  xl?: ColSize | ColSpec;

  /**
   * The number of columns to span on extra extra large devices
   * */
  xxl?: ColSize | ColSpec;
}

const Col = forwardRef<"div", ColProps>(
  (
    {
      span,
      offset,
      order,
      as: Component = "div",
      className,
      children,
      ...props
    }: ColProps,
    ref
  ) => {
    const spans: string[] = [];
    const classes: string[] = [];

    DEVICE_SIZES.forEach((brkPoint) => {
      const propValue = props[brkPoint];

      let spanDevice: ColSize | undefined;
      let offsetDevice: ColOffset | undefined;
      let orderDevice: ColOrder | undefined;

      if (typeof propValue === "object" && propValue != null) {
        ({
          span: spanDevice,
          offset: offsetDevice,
          order: orderDevice,
        } = propValue);
      } else {
        spanDevice = propValue;
      }
      if (spanDevice) {
        spans.push(`col-${brkPoint}-${spanDevice}`);
      }
      if (orderDevice != null) classes.push(`order-${brkPoint}-${order}`);
      if (offsetDevice != null) classes.push(`offset-${brkPoint}-${offset}`);
    });
    const classNames = clsx(
      "col",
      span && `col-${span}`,
      offset && `col-${offset}`,
      order && `col-${order}`,
      spans,
      classes,
      className
    );

    return (
      <Component {...props} className={classNames} ref={ref}>
        {children}
      </Component>
    );
  }
);

export { Col };
