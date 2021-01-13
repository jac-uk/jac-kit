import Search from '../../../packages/components/Table/Search';

export default {
  title: 'JAC-Kit/Search',
  component: Search,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Search },
  template: '<Search v-bind="$props" />',
});

export const Types = Template.bind({});
