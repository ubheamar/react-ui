import React, { useCallback, useState } from "react";
import { Story, Meta } from "@storybook/react";
import Menu, { MenuProps } from "../components/menu";
import {
  App,
  ClipboardCheck,
  CreditCard,
  Gear,
  ShieldLock,
  TextLeft,
} from "react-bootstrap-icons";
import { Row } from "react-bootstrap";
import { Button } from "../index";

export default {
  title: "Component/Menu",
  component: Menu,
};

const renderMenu = (args: MenuProps) => {
  return (
    <Menu {...args}>
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
  theme: "dark",
};

const DynamicTemplate: Story<MenuProps> = (args) => {
  let style =
    args.mode != "horizontal"
      ? {
          width: "265px",
        }
      : undefined;

  return <div style={style}>{renderMenu(args)}</div>;
};

export const VerticalMenu = DynamicTemplate.bind({});
VerticalMenu.args = {
  mode: "vertical",
  theme: undefined,
};
export const InlineMenu = DynamicTemplate.bind({});
InlineMenu.args = {
  mode: "inline",
  theme: undefined,
};
export const HorizontalMenu = DynamicTemplate.bind({});
HorizontalMenu.args = {
  mode: "horizontal",
  theme: undefined,
};

const CollapsedMenuTemplate: Story<MenuProps> = (args) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = useCallback(() => {
    setCollapsed((prevState) => !prevState);
  }, [setCollapsed]);
  args.inlineCollapsed = collapsed;
  return (
    <div
      style={{
        width: "265px",
      }}
    >
      <Button
        variant="light-primary"
        icon={<TextLeft />}
        style={{ marginBottom: 16 }}
        onClick={toggleCollapsed}
      />
      {renderMenu(args)}
    </div>
  );
};
export const CollapsibleMenu = CollapsedMenuTemplate.bind({});
CollapsibleMenu.args = {
  mode: "inline",
  theme: undefined,
};
