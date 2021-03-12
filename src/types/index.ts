/*Coming from react-bootstrap types*/
import React from "react";

export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  React.ComponentPropsWithRef<Inner>,
  P
> &
  P;

export interface ClassNameOnlyProps {
  className?: string;
}

export interface BaseComponentProps<
  As extends React.ElementType = React.ElementType
> extends ClassNameOnlyProps {
  className?: string;
  as?: As;
}

export type BaseComponentPropsWithChildren<
  As extends React.ElementType = React.ElementType
> = React.PropsWithChildren<BaseComponentProps<As>>;

export interface BaseRefForwardingComponent<
  TInitial extends React.ElementType,
  P = unknown
> {
  <As extends React.ElementType = TInitial>(
    props: React.PropsWithChildren<
      ReplaceProps<As, BaseComponentProps<As> & P>
    >,
    context?: any
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}
export class BaseComponent<
  As extends React.ElementType,
  P = unknown
> extends React.Component<ReplaceProps<As, BaseComponentProps<As> & P>> {}

export type BaseComponentClass<
  As extends React.ElementType,
  P = unknown
> = React.ComponentClass<ReplaceProps<As, BaseComponentProps<As> & P>>;


export type BreakPoints = "sm"|"md"|"lg"|"xl"|"xxl"

export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | string;
export type ButtonVariant =
    | Variant
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';
export type Color =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'white'
    | 'muted';