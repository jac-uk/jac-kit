import FilterButton from '@/components/SearchFilter/FilterButton';

export default {
  title: 'JAC-Kit/FilterButton',
  component: FilterButton,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FilterButton },
  template: '<FilterButton v-bind="$props" />',
});

export const Types = Template.bind({});
Types.args = {
  showTab: false,
  numOfFilters: 0,
};
