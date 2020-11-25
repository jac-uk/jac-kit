import MyBanner from '../../../packages/components/Banner/Banner';

export default {
  title: 'JAC-Kit/Banner',
  component: MyBanner,
  argTypes: {
    status: { control: { type: 'select', options: ['success', 'warning', 'information'] } }
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyBanner },
  template: '<MyBanner v-bind="$props" />',
});

export const Types = Template.bind({});
Types.args = {
  status: 'success',
  message: 'My initial message - pls test without message'
};
