//Ref from antd lib
import RcPagination from "rc-pagination";
import { useAppConfig } from "../config";
import classNames from "classnames";
import React from "react";
import { Select } from "../../index";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";

export interface PaginationProps {
  total?: number;
  defaultCurrent?: number;
  disabled?: boolean;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?: boolean | { goButton?: React.ReactNode };
  showTitle?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  size?: "default" | "small";
  responsive?: boolean;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  itemRender?: (
    page: number,
    type: string,
    element: React.ReactNode
  ) => React.ReactNode;
  role?: string;
  showLessItems?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  prefixCls: customizePrefixCls,
  selectPrefixCls: customizeSelectPrefixCls,
  className,
  size,
  locale: customLocale,
  ...restProps
}) => {
  const { direction } = useAppConfig();
  const prefixCls = customizePrefixCls || "pagination";

  const getIconsProps = () => {
    const ellipsis = <span className={`${prefixCls}-item-ellipsis`}>•••</span>;
    let prevIcon = (
      <a className={`${prefixCls}-item-link`}>
        <i className="previous" />
      </a>
    );
    let nextIcon = (
      <a className={`${prefixCls}-item-link`}>
        <i className="next" />
      </a>
    );
    let jumpPrevIcon = <a className={`${prefixCls}-item-link`}>{ellipsis}</a>;
    let jumpNextIcon = <a className={`${prefixCls}-item-link`}>{ellipsis}</a>;
    // change arrows direction in right-to-left direction
    if (direction === "rtl") {
      [prevIcon, nextIcon] = [nextIcon, prevIcon];
      [jumpPrevIcon, jumpNextIcon] = [jumpNextIcon, jumpPrevIcon];
    }
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon,
    };
  };

  const renderPagination = () => {
    const selectPrefixCls = customizeSelectPrefixCls || "select";
    const extendedClassName = classNames(
      {
        [`${prefixCls}-rtl`]: direction === "rtl",
      },
      className
    );

    return (
      <RcPagination
        {...restProps}
        prefixCls={prefixCls}
        selectPrefixCls={selectPrefixCls}
        {...getIconsProps()}
        className={extendedClassName}
        selectComponentClass={Select}
      />
    );
  };

  return <>{renderPagination()}</>;
};

Pagination.defaultProps = {
  locale: "enUS",
};

export default Pagination;
