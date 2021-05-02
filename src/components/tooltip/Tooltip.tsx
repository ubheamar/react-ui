import React, { FC, ReactNode } from "react";
import { OverlayTrigger, Tooltip as BsTooltip } from "react-bootstrap";

export interface TooltipProps {
  content?: string | ReactNode;
  children?: any;
}

const Tooltip: FC<TooltipProps> = ({ content, children, ...restProps }) => {
  console.log(children);
  return (
    <OverlayTrigger overlay={<BsTooltip id="bs-tooltip">{content}</BsTooltip>}>
      {children ? children : <div></div>}
    </OverlayTrigger>
  );
};
export default Tooltip;
