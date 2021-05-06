import React from "react";
import { Story, Meta } from "@storybook/react";
import Menu, { MenuProps } from "../components/menu";
import { Gear } from "react-bootstrap-icons";
import { Col } from "../index";
import { Row } from "react-bootstrap";

export default {
  title: "Component/Menu",
  component: Menu,
};

const renderMenu = (args: MenuProps) => {
  return (
    <Menu {...args}>
      <Menu.Item key="settings" itemIcon={<Gear />}>
        Settings
      </Menu.Item>
      <Menu.Item title="profile_title" key="profile">
        Profile
      </Menu.Item>
      <Menu.SubMenu title="Subscription">
        <Menu.Item key="referrals">Referrals</Menu.Item>
        <Menu.Item key="payment">Payment</Menu.Item>
        <Menu.Item key="billing">Billing</Menu.Item>
        <Menu.Item key="statements">Statements</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );
};

const Template: Story<MenuProps> = (args) => {
  return (
    <div>
      <Row className="bg-light">
        {renderMenu({
          mode: "vertical",
        })}
      </Row>
      <Row className="bg-primary">
        {renderMenu({
          mode: "inline",
        })}
      </Row>
      <Row className="bg-success">
        {renderMenu({
          mode: "horizontal",
        })}
      </Row>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  mode: "vertical",
};
