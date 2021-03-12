import { Meta, Story } from "@storybook/react/types-6-0";
import { Container, ContainerProps } from "./Container";

import React from "react";

export default {
  title: "Layout/Containers",
  component: Container,
  argTypes: {},
} as Meta;
/*

const Template: Story<ContainerProps> = (args) => (
  <Container {...args}>
    <h1>Content Goes Here</h1>
  </Container>
);
export const SimpleContainer = Template.bind({});
SimpleContainer.args = {
  className: "bg-primary",
};
export const FluidContainer = Template.bind({});
FluidContainer.args = {
  type: "fluid",
  className: "bg-primary",
};
*/
