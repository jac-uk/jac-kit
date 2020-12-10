import { createTestSubject } from '../../helpers';
import Currency from '@/draftComponents/Form/Currency';

describe('components/Form/Currency', () => {
  describe('props', () => {
    describe('value', () => {
      let prop;
      beforeEach(() => {
        prop = Currency.props.value;
      });
      it('is not required', () => {
        expect(prop.required).toBeFalsy();
      });
      it('defaults as null', () => {
        expect(prop.default).toBe(null);
      });
      it('is a string', () => {
        expect(prop.type).toBeString;
      });
    });
  });

  describe('component instance', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createTestSubject(Currency, {
        propsData: {
          id: 'mockId',
        },
        stubs: ['FormFieldError'],
      });
    });
    
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });
    
    describe('template', () => {
      
      describe('containing div', () => {
        describe('with errorMessage', () => {
          beforeEach(() => {
            wrapper.vm.setError('test error');
          });
          it('has gov-uk-form-group--error class', () => {
            expect(wrapper.find('div').attributes('class')).toContain('govuk-form-group--error');
          });
        });
        describe('without errorMessage', () => {
          it('doesn\'t have gov-uk-form-group--error class', () => {
            wrapper.setData({ errorMessage: '' });
            expect(wrapper.find('div').attributes('class')).not.toContain('govuk-form-group--error');
          });
        });
      });

      describe('label', () => {
        beforeEach(() => {
          wrapper.setProps({ 
            label: 'My Form Label' ,
            id: 'my_unique_key',
          });
        });
          it('sets the label to the value of the `label` prop', () => {
            expect(wrapper.find('label').text()).toBe('My Form Label');
          });
          it('id sets `for` attribute', () => {
            expect(wrapper.find('label').attributes().for).toBe('my_unique_key');
          });
          it('has govuk-heading-m govuk-!-margin-bottom-2 classes', () => {
            expect(wrapper.find('label').attributes('class')).toBe('govuk-heading-m govuk-!-margin-bottom-2');
          });
      });

      describe('hint span', () => {
        describe('when the prop is set', () => {
          beforeEach(() => {
            wrapper.setProps({ hint: 'my_hint' });
          });
          it('shows a hint', () => {
            expect(wrapper.find('.govuk-hint').exists()).toBe(true);
          });
          it('sets the hint to the value of the `hint` prop', () => {
            expect(wrapper.find('.govuk-hint').text()).toBe('my_hint');
          });
        });
        describe('when the prop is not set', () => {
          it('does not show hint', () => {
            expect(wrapper.find('.govuk-hint').exists()).toBe(false);
          });
        });
      });

      describe('FormFieldFrror', () => {
        beforeEach(() => {
          wrapper.vm.setError('test error');
        });

        it('id sets `id` attribute', () => {
          expect(wrapper.find('formfielderror-stub').attributes().id).toBe('mockId');
        });

        it('errorMessage sets `error-message` attribute', () => {
          expect(wrapper.find('formfielderror-stub').attributes().errormessage).toBe('test error');
        });
      });

      describe('input', () => {
        beforeEach(()=>{
          wrapper.setProps({ id: 'my_unique_key' });
        });
        it('id sets `id` attribute', () => {
          expect(wrapper.find('input').attributes().id).toBe('my_unique_key');
        });
        xit('v-model', () => {
        });
        it('has govuk-input moj-input__currency govuk-input--width-10 classes', () => {
          expect(wrapper.find('input').attributes('class')).toBe('govuk-input moj-input__currency govuk-!-width-one-third');
        });
        it('has input type of number', () => {
          expect(wrapper.find('input').attributes('type')).toBe('number');
        });
        xit('@change', () => {
        });
      });

      describe('currency label span', () => {
        it('contains \'£\' text', () => {
          expect(wrapper.find('span').text()).toBe('£');
        });
        it('has x class', () => {
          expect(wrapper.find('span').attributes('class')).toBe('moj-label__currency');
        });
      });
    });

    describe('computed', () => {
      describe('currencyInput', () => {
        beforeEach(() => {
          wrapper.setProps({ value: 'test123' });
        });

        it('get', () => {
          expect(wrapper.vm.currencyInput).toBe(wrapper.vm.value);
        });

        xit('set', () => {
          wrapper.vm.currencyInput = '321tset';
          expect(wrapper.vm.value).toBe('??');
        });
      });
    });

    describe('`v-model` interface', () => {
    describe('when `currencyInput` changes', () => {
      it('emits an input event with the new value', () => {
        wrapper.setData({ currencyInput: '25' });
        expect(wrapper.emitted().input).toEqual([['25']]);
      });
    });

    describe('when value prop changes', () => {
      it('updates the `currencyInput` computed property', () => {
        wrapper.setProps({ value: 25 });
        expect(wrapper.vm.currencyInput).toEqual(25);
      });
    });
  });

  });
});
