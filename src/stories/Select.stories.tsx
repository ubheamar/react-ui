import React from "react";
import { Story, Meta } from "@storybook/react";
import { Col, Form, Select, SelectProps } from "../index";
import { Row } from "react-bootstrap";

export default {
  title: "Component/Select",
  component: Select,
};
const { Option } = Select;

const Template: Story<SelectProps> = (args) => {
  return (
    <>
      <Row className="p-4">
        <Col>
          <Form.Select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Col>
        <Col>
          <Select {...args}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
            <Option value="LongText">Very Long Text By Person</Option>
          </Select>
        </Col>
      </Row>
    </>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  placeholder: "Please select item",
  loading: true,
};
