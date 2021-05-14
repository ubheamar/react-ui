import React from "react";
import { Story, Meta } from "@storybook/react";
import Paginator, { PaginatorProps } from "../components/paginator";
import { Pagination, PaginationProps } from "../index";

export default {
  title: "Component/Pagination",
  component: Pagination,
};

const Template: Story<PaginationProps> = (args) => {
  return (
    <div>
      <Pagination {...args} />
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  total: 150,
};
