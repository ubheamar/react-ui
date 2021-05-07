import React from "react";
import { Story, Meta } from "@storybook/react";
import Menu, { MenuProps } from "../components/menu";
import { Gear } from "react-bootstrap-icons";
import { Button, Col, Dropdown } from "../index";
import { Row } from "react-bootstrap";

export default {
  title: "Component/Dropdown",
  component: Dropdown,
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
  return (
    <div>
      <Dropdown
        overlay={renderMenu({
          mode: "vertical",
        })}
      >
        <Button>Button Dropdown</Button>
      </Dropdown>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
