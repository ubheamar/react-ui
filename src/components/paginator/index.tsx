import React, { FC } from "react";
import PaginatorLinks from "./PaginatorLinks";
import PaginatorToolbar from "./PaginatorToolbar";
import { Col, Row } from "react-bootstrap";

export type PageSize = {
  text: string;
  value: number;
};

export type PaginatorProps = {
  totalCount: number;
  currentPage: number;
  limit: number;
  showCount: number;
  onPage: (p: number) => void;
  loading: boolean;
  pageSizeList: PageSize[];
  onPageSizeChange: (size: number) => void;
};

const Paginator: FC<PaginatorProps> = (props: PaginatorProps) => {
  return (
    <Row>
      <Col
        sm="12"
        md="6"
        className="d-flex align-items-center justify-content-center justify-content-md-start"
      >
        <PaginatorToolbar paginatorProps={props} />
      </Col>
      <Col
        sm="12"
        md="6"
        className="d-flex align-items-center justify-content-center justify-content-md-end"
      >
        <PaginatorLinks paginatorProps={props} />
      </Col>
    </Row>
  );
};
export default Paginator;
