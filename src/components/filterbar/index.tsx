import React, { FC } from "react";
import { BaseComponentPropsWithChildren } from "../../types";
import { Col, Form, Row } from "react-bootstrap";
import Button from "../button";

export interface FilterBarProps extends BaseComponentPropsWithChildren {
  loading?: boolean;
  onSubmit?: () => void;
  onReset?: (e: any) => void;
}

const FilterBar: FC<FilterBarProps> = ({
  onSubmit,
  onReset,
  loading,
  children,
  ...restProps
}) => {
  return (
    <Form onSubmit={onSubmit} onReset={onReset} {...restProps}>
      <Row className="align-items-center gx-3 gy-3">
        {children}
        <Col className="align-self-end">
          <Button
            variant="default"
            variantType="outline"
            type="reset"
            className="me-2"
          >
            Reset
          </Button>
          <Button
            loading={loading}
            variant="primary"
            type="submit"
            className="me-2"
          >
            Query
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default FilterBar;
