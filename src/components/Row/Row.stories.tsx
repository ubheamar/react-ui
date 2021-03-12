import { Meta, Story } from "@storybook/react/types-6-0";
import { Row, RowProps } from "./Row";

import React from "react";
import { Container } from "../Container/Container";
import { Col } from "../Column/Column";

export default {
  title: "Layout/Row",
  component: Row,
  argTypes: {},
} as Meta;

const Template: Story<RowProps> = (args) => (
  <Container type="fluid">
    <Row {...args}>
      <Col >
        <div className="bg-primary">One of three columns</div>
      </Col>
      <Col >
        <div className="bg-success">One of three columns</div>
      </Col>
      <Col  >
        <div className="bg-info">One of three columns</div>
      </Col>
      <Col  >
        <div className="bg-primary">One of three columns</div>
      </Col>
      <Col >
        <div className="bg-success">One of three columns</div>
      </Col>
      <Col>
        <div className="bg-info">One of three columns</div>
      </Col>
    </Row>
  </Container>
);
export const SimpleRow = Template.bind({});
SimpleRow.args = {
  columns:3,
  space: 2,
};
