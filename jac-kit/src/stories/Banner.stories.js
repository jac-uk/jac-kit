import MyBanner from '../components/Banner/Banner';

export default {
  title: 'MOJ-Kit/Banner',
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

export const Status = Template.bind({});
Status.args = {
  status: 'success',
  message: 'My initial message - pls test without message'
};
