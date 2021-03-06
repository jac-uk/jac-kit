import { createTestSubject } from '../../helpers';
import TextareaInput from '@/draftComponents/Form/TextareaInput';

describe('components/Form/TextareaInput', () => {
  describe('props', () => {
    let prop;

    describe('rows', () => {
      beforeEach(() => {
        prop = TextareaInput.props.rows;
      });

      it('must be a String', () => {
        expect(prop.type()).toBeString();
      });

      it('defaults as \'5\'', () => {
        expect(prop.default).toBe('5');
      });

    });

    describe('value', () => {
      beforeEach(() => {
        prop = TextareaInput.props.value;
      });

      it('type is String', () => {
        expect(prop.type()).toBeString();
      });

      it('defaults as \'\'', () => {
        expect(prop.default).toBe('');
      });

    });

  });

  describe('component instance', () => {
  let wrapper;
  const mockProps = {
    id: 'mockId',
    label: 'mock label',
  };

  beforeEach(() => {
    wrapper = createTestSubject(TextareaInput, {
      mocks: {},
      stubs: [],
      propsData: mockProps,
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe('template', () => {
    describe('label', () => {
      it('sets the label to the value of the `label` prop', () => {
        wrapper.setProps({ label: 'My Form Label' }).then(()=>{
          expect(wrapper.find('label').text()).toBe('My Form Label');
        });
      });
    });

    describe('hint', () => {
      let hint;
      describe('when the prop is set', () => {
        beforeEach(() => {
          wrapper.setProps({ hint: 'my_hint' }).then(()=>{
            hint = wrapper.find('.govuk-hint');
          });
        });

        it('shows a hint', () => {
          expect(hint.exists()).toBe(true);
        });
        it('sets the hint to the value of the `hint` prop', () => {
          expect(hint.text()).toBe('my_hint');
        });
      });

      describe('when the prop is not set', () => {
        beforeEach(() => {
          hint = wrapper.find('.govuk-hint');
        });

        it('does not show hint', () => {
          expect(hint.exists()).toBe(false);
        });
      });
    });

    describe('id', () => {
      it('sets <label> `for` attribute', () => {
        wrapper.setProps({ id: 'my_unique_key' }).then(()=>{
          expect(wrapper.find('label').attributes().for).toBe('my_unique_key');
        });
      });

      it('sets <textarea> `id` attribute', () => {
        wrapper.setProps({ id: 'my_unique_key' }).then(()=>{
          expect(wrapper.find('textarea').attributes().id).toBe('my_unique_key');
        });
      });
    });

    describe('rows', () => {
      it('sets the rows prop to the default value of 5 when no value is set', () => {
        expect(wrapper.find('textarea').attributes().rows).toBe('5');
      });

      it('sets the rows to the value of the `rows` prop', () => {
        wrapper.setProps({ rows: '2' }).then(()=>{
          expect(wrapper.find('textarea').attributes().rows).toBe('2');
        });
      });
    });
  });

  describe('`v-model` interface', () => {
    describe('when text changes', () => {
      it('emits an input event with the new value', () => {
        wrapper.setData({ text: 'new-value' }).then(()=>{
          expect(wrapper.emitted().input).toEqual([['new-value']]);
        });
      });
    });

    describe('when value prop changes', () => {
      it('updates the `text` computed property', () => {
        wrapper.setProps({ value: 'my_value' });
        expect(wrapper.vm.text).toEqual('my_value');
      });
    });
  });
  });
});
