import React, { FC, useCallback } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { PaginatorProps } from "./index";

type PaginatorToolbarProps = {
  paginatorProps: PaginatorProps;
};

const PaginatorToolbar: FC<PaginatorToolbarProps> = ({ paginatorProps }) => {
  const {
    loading,
    totalCount,
    currentPage,
    limit,
    pageSizeList,
    onPageSizeChange,
  } = paginatorProps;

  const onSizeChange = useCallback((event) => {
    const newSize = +event.target.value;
    onPageSizeChange(newSize);
  }, []);

  return (
    <Row>
      {loading && (
        <Col sm={1}>
          {/*     <div className="mx-2 text-muted">Loading...</div>*/}
          <Spinner animation="border" variant="primary" size="sm" />
        </Col>
      )}
      <Col sm={4}>
        <Form.Control
          as="select"
          disabled={totalCount === 0}
          className={`form-select form-select-sm form-select-solid ${
            totalCount === 0 && "disabled"
          }`}
          onChange={onSizeChange}
          value={limit}
        >
          {pageSizeList.map((option) => {
            const isSelect = limit === option.value;
            return (
              <option
                key={option.text}
                value={option.value}
                className={`btn ${isSelect ? "active" : ""}`}
              >
                {option.text}
              </option>
            );
          })}
        </Form.Control>
      </Col>
      <Col sm={7}>
        <span className="text-muted">
          Displaying {limit} of {totalCount} records
        </span>
      </Col>
    </Row>
  );
};

export default PaginatorToolbar;
