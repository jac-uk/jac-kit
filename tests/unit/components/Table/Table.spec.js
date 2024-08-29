import { createTestSubject } from '../../testHelpers';

import Table from '@/components/Table/Table';

describe('components/Banner', () => {
  describe('props', () => {
    let prop;
    describe('message', () => {
      beforeEach(() => {
        prop = Table.props.columns;
      });
      it('is a string', () => {
        expect(prop.type()).toBeArray();
      });
    });
  });
  
  describe('component instance', () => {
    let wrapper;
      beforeEach(() => {
      wrapper = createTestSubject(Table, {
        mocks: {},
        stubs: [],
        propsData: {
          columns: [],
          data: [],
          dataKey: 'mockDataKey',
        },
      });
    });
      
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });
    
    xit('displays message when data is empty', () => {
      expect(wrapper.find('div .govuk-body').text()).toBe('No results found');
    });
  });
});
