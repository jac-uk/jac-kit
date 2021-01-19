import Badge from '../../../packages/components/Table/Badge';

export default {
  title: 'JAC-Kit/Table/Badge',
  component: Badge,
  argTypes: 'number',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Badge },
  template: '<Badge v-bind="$props" />',
});

export const Types = Template.bind({});
Types.args = {
  number: 10,
};
