import React, { FC } from "react";
import Separator from "../separator";
import classNames from "classnames";

export interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
}

const Divider: FC<DividerProps> = ({ className, children, ...restProps }) => {
  //return <RcDivider {...restProps}>{children}</RcDivider>;
  const classNamesSep = classNames(className, "my-2");
  return <Separator as="li" className={classNamesSep} />;
};

Divider.displayName = "Divider";
export default Divider;
