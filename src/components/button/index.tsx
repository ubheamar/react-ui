import React, { forwardRef, ReactNode } from "react";

import classNames from "classnames";
import { BaseComponentPropsWithChildren } from "../../types";
import { ButtonVariant, TextVariant } from "../../utils/types";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import ConditionalWrapper from "../../utils/ConditionalWrapper";

export interface ButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    BaseComponentPropsWithChildren {
  /**
   *Button variant
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
   * */
  variant?: ButtonVariant;
  /*
   * Button variant type
   * @type 'outline' | 'bg'
   * */
  variantType?: "outline" | "bg";

  textVariant?: TextVariant;

  iconVariant?: TextVariant;

  /*Button active variant*/
  activeVariant?: ButtonVariant;

  activeTextVariant?: TextVariant;

  activeIconVariant?: TextVariant;

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

  loading?: boolean;

  tooltip?: string | ReactNode;
}

/**
 Buttons allow users to trigger an action.
 Buttons can trigger primary, secondary, semantic, and negative path actions.
 */
const Button = forwardRef<"button", ButtonProps>(
  (
    {
      variant,
      variantType,
      textVariant,
      iconVariant,
      activeVariant,
      activeTextVariant,
      activeIconVariant,
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
      loading,
      tooltip,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const classNamesButton = classNames(
      "btn",
      icon && !label && !children && `btn-icon`,
      variantType === "outline" && `btn-outline btn-outline-dashed`,
      variant
        ? variantType
          ? `btn-${variantType}-${variant}`
          : `btn-${variant}`
        : "",
      iconVariant && `btn-icon-${textVariant}`,
      textVariant && `text-color-${textVariant}`,
      activeVariant && `btn-active-${activeVariant}`,
      activeIconVariant && `btn-active-icon-${activeIconVariant}`,
      activeTextVariant && `btn-active-text-${activeTextVariant}`,
      size && `btn-${size}`,
      disabled && `disabled`,
      active && `active`,
      design && `btn-${design}`,
      className
    );

    return (
      <ConditionalWrapper
        condition={!!tooltip}
        wrapper={(children) => (
          <OverlayTrigger
            overlay={<Tooltip id="button-tooltip">{tooltip}</Tooltip>}
          >
            {children}
          </OverlayTrigger>
        )}
      >
        <Component
          {...props}
          className={classNamesButton}
          type={type}
          ref={ref}
        >
          {icon && (
            <span className={classNames("svg-icon", iconSpanClass)}>
              {icon}
            </span>
          )}

          {label && label}
          {children}
          {loading && (
            <Spinner
              animation="border"
              size="sm"
              className="align-middle ms-2"
            />
          )}
        </Component>
      </ConditionalWrapper>
    );
  }
);

Button.displayName = "Button";

export default Button;
