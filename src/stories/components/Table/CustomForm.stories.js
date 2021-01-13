import CustomForm from '../../../packages/components/Table/CustomForm';

export default {
  title: 'JAC-Kit/CustomForm',
  component: CustomForm,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CustomForm },
  template: '<CustomForm v-bind="$props" />',
});

export const Types = Template.bind({});
Types.args = {
  fields: [
    { type: 'checkbox' },
    { type: 'keyword' },
    { type: 'dateRange' },
    { type: 'customDateRange' },
  ],
  data: {},
};
