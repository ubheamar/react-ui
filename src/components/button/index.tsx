import React, { forwardRef, ReactNode } from "react";

import classNames from "classnames";
import { Variant } from "react-bootstrap/types";
import { BaseComponentPropsWithChildren } from "../../types";

export interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    BaseComponentPropsWithChildren {
  /**
   *Button variant
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
   * */
  variant?: Variant;
  /*
   * Button variant type
   * */
  variantType?: "outline" | "light";

  /**
   * How large should the button be?
   * @type "sm" | "lg" | undefined
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

  /**
   * Icon span class
   * */
  iconSpanClass?: string;
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
      iconSpanClass,
      children,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const classNamesButton = classNames(
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
      <Component {...props} className={classNamesButton} type={type} ref={ref}>
        {icon && (
          <span className={classNames("svg-icon", iconSpanClass)}>{icon}</span>
        )}
        {label && label}
        {children}
      </Component>
    );
  }
);

export default Button;
