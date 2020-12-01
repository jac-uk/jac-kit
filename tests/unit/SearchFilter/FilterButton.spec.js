import { createTestSubject } from '../helpers';
import FilterButton from '@/components/SearchFilter/FilterButton';

describe('components/FilterButton', () => {
  let wrapper;

  describe('props', () => {
    let prop;
    describe('numOfFilters', () => {
      beforeEach(() => {
        prop = FilterButton.props.numOfFilters;
      });

      it('0 by default', () => {
        expect(prop.default).toBe(0);
      });
      it('type is number', () => {
        expect(prop.type).toBe(Number);
      });
    });

    describe('showTab', () => {
      beforeEach(() => {
        prop = FilterButton.props.showTab;
      });

      it('is required', () => {
        expect(prop.required).toBe(true);
      });
      it('type is Boolean', () => {
        expect(prop.type).toBe(Boolean);
      });
    });
  });

  describe('template', () => {
    beforeEach(() => {
      wrapper = createTestSubject(FilterButton, {
        propsData: {
          showTab: false,
        },
        stubs: [],
        mocks: [],
      });
    });

    it('renders the component', () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    describe('when showTab is false', () => {
      beforeEach(() => {
        wrapper.setProps({
          showTab: false,
        });
      });

      it("button text is 'Show filters'", () => {
        expect(wrapper.find('div .govuk-button').text()).toBe('Show filters');
      });

      describe('with 5 filters', () => {
        beforeEach(() => {
          wrapper.setProps({
            numOfFilters: 5,
          });
        });
        it("button text is 'Show filters'", () => {
          expect(wrapper.find('div .badge').text()).toBe('5');
        });
      });
    });

    describe('when showTab is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          showTab: true,
        });
      });

      it("button text is 'Hide filters'", () => {
        expect(wrapper.find('div .govuk-button').text()).toBe('Hide filters');
      });

      describe('with 5 filters', () => {
        beforeEach(() => {
          wrapper.setProps({
            numOfFilters: 5,
          });
        });

        it("badge text is '5'", () => {
          expect(wrapper.find('div .badge').text()).toBe('5');
        });

      });
    });
  });
});
