import SidePanel from '../../../packages/components/Table/SidePanel';

export default {
  title: 'JAC-Kit/SidePanel',
  component: SidePanel,
  argTypes: 'show',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SidePanel },
      template: '<SidePanel v-bind="$props"> <template #header>header</template> <template #default>content</template><template #footer>footer</template>',
});

export const Types = Template.bind({});
Types.args = {
  show: true,
};
