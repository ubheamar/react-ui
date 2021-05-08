import React from "react";
import { Story, Meta } from "@storybook/react";
import Menu, { MenuProps } from "../components/menu";
import {
  App,
  ClipboardCheck,
  CreditCard,
  Gear,
  ShieldLock,
} from "react-bootstrap-icons";
import { Button, Col, Dropdown } from "../index";
import { Row } from "react-bootstrap";

export default {
  title: "Component/Dropdown",
  component: Dropdown,
};

const renderMenu = (args: MenuProps) => {
  return (
    <Menu prefix="menu" {...args}>
      <Menu.ItemGroup title="Components">
        <Menu.Item key="profile-name" icon={<Gear />}>
          Profile
        </Menu.Item>
        <Menu.Item key="settings" icon={<Gear />}>
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item icon={<ShieldLock />} key="logout">
          Logout
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.Item icon={<App />} title="profile_title" key="profile" disabled>
        Profile
      </Menu.Item>
      <Menu.SubMenu icon={<CreditCard />} title="Subscription">
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
      <Menu.SubMenu icon={<ClipboardCheck />} title="Career" disabled>
        <Menu.Item key="applyonline">Apply-Online</Menu.Item>
        <Menu.Item key="refer">Refer</Menu.Item>
      </Menu.SubMenu>
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
        <Button variant="light-primary">Button Dropdown</Button>
      </Dropdown>
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
