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
      <Menu.Item title="profile_title" key="profile" disabled>
        Profile
      </Menu.Item>
      <Menu.SubMenu title="Subscription">
        <Menu.Item key="referrals">Referrals</Menu.Item>
        <Menu.Item key="payment">Payment</Menu.Item>
        <Menu.Item key="billing">Billing</Menu.Item>
        <Menu.Item key="statements">Statements</Menu.Item>
        <Menu.SubMenu title="Status">
          <Menu.Item key="online">Online</Menu.Item>
          <Menu.Item key="offline">Offline</Menu.Item>
          <Menu.Item key="busy">Busy</Menu.Item>
          <Menu.Item key="dnd">Do not disturb</Menu.Item>
        </Menu.SubMenu>
      </Menu.SubMenu>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );
};

const Template: Story<MenuProps> = (args) => {
  const { mode, ...restProps } = args;
  return (
    <div>
      <Row
        className="bg-light mt-3"
        style={{
          width: "250px",
        }}
      >
        {renderMenu({
          mode: "vertical",
          ...restProps,
        })}
      </Row>
      <Row
        className="bg-primary mt-3"
        style={{
          width: "250px",
        }}
      >
        {renderMenu({
          mode: "inline",
          ...restProps,
        })}
      </Row>
      <Row className="bg-success mt-3">
        {renderMenu({
          mode: "horizontal",
          ...restProps,
        })}
      </Row>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  mode: "vertical",
  variant: undefined,
  bgColor: "success",
  textColor: undefined,
  bgActiveColor: undefined,
  textActiveColor: undefined,
  iconActiveColor: undefined,
  bgSelectedColor: undefined,
  textSelectedColor: undefined,
  iconSelectedColor: undefined,
};
