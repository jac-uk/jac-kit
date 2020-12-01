import MyModal from '@/components/Modal/Modal';
import ModalInner from '@/components/Modal/ModalInner';

export default {
  title: 'JAC-Kit/Modal',
  decorators: [
    () => ({ 
      methods: {
        openModal() {
          this.$children[0].$refs.modalRef.openModal();
        },
      },
      template: "<div><button @click='openModal'>Open Modal</button><story /></div>",
    }),
  ],
};

// Modal Inner
const Template = (args, { argTypes }) => ({
  components: { MyModal, ModalInner },
  props: Object.keys(argTypes),
  methods: {
    modalConfirmed() {
      this.$refs.modalRef.closeModal();
    },
    modalClosed() {
      this.$refs.modalRef.closeModal();
    },
  },
  template: '<div><MyModal ref="modalRef" v-bind="$props"><ModalInner @confirmed="modalConfirmed" @closed="modalClosed" v-bind="innerModalArgs" /></MyModal></div>',
});

export const iModal = Template.bind({});
iModal.args = {
  innerModalArgs: {
    cancelable: true,
    title: 'My own title',
    buttonText: 'Accept',
    message: 'Please confirm',
  },
};
iModal.storyName = 'Inner Modal';

// Free Text / Custom template
const TemplateFree = (args, { argTypes }) => ({
  components: { MyModal, ModalInner },
  props: Object.keys(argTypes),
  methods: {
    modalClosed() {
      this.$refs.modalRef.closeModal();
    },
  },
  template: '<div><MyModal ref="modalRef" v-bind="$props">{{ text }} <button @click="modalClosed">Close</button></MyModal></div>',
});

export const customTemplate = TemplateFree.bind({});
customTemplate.args = {
  text: 'This is a custom text',
};
customTemplate.storyName = 'Custom Template';
