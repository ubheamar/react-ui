import { Meta, Story } from "@storybook/react/types-6-0";
import { Col, ColProps } from "./Column";

import React from "react";
import { Container } from "../Container/Container";
import { Row } from "../Row/Row";

export default {
  title: "Layout/Col",
  component: Col,
  argTypes: {},
} as Meta;

const Template: Story<ColProps> = (args) => (
  <Container type="fluid">
    <Row>
      <Col {...args} className="bg-primary">
        <h1>One of three columns</h1>
      </Col>
      <Col {...args} className="bg-success">
        <h1>One of three columns</h1>
      </Col>
      <Col {...args} className="bg-info">
        <h1>One of three columns</h1>
      </Col>
    </Row>
  </Container>
);
export const SimpleCol = Template.bind({});
SimpleCol.args = {};
