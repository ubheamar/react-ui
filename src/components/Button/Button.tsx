import React, { forwardRef, ReactNode } from "react";

import { BaseComponentPropsWithChildren, Variant } from "../../types";
import clsx from "clsx";

export interface ButtonProps extends BaseComponentPropsWithChildren {
  /**
   *Button variant
   * */
  variant?: Variant;
  /*
   * Button variant type
   * */
  variantType?: "outline" | "light";

  /**
   * How large should the button be?
   */
  size?: "sm" | "lg";
  /**
   * Button contents
   */
  label?: string;
  /**
   * Button disabled
   * */
  disabled?: boolean;
  /**
   * Button toggle state
   * */
  active?: boolean;
  /**
   * Button type html
   * */
  type?: "submit" | "button" | "reset";

  /*
   * Button design
   * */
  design?: "square" | "pill" | "text" | "circle";

  /*
   * Button icon
   * */
  icon?: ReactNode;
}

/**
 Buttons allow users to trigger an action.
 Buttons can trigger primary, secondary, semantic, and negative path actions.
 */
const Button = forwardRef<"button", ButtonProps>(
  (
    {
      variant = "primary",
      variantType,
      size,
      label,
      disabled,
      active,
      icon,
      design,
      type = "button",
      as: Component = "button",
      className,
      children,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const classNames = clsx(
      "btn",
      icon && !label && !children && `btn-icon`,
      variantType ? `btn-${variantType}-${variant}` : `btn-${variant}`,
      size && `btn-${size}`,
      disabled && `disabled`,
      active && `active`,
      design && `btn-${design}`,
      className
    );
    return (
      <Component {...props} className={classNames} type={type} ref={ref}>
        {icon && <span className="svg-icon">{icon}</span>}
        {label && label}

        {children}
      </Component>
    );
  }
);

export { Button };