import { createTestSubject } from '../helpers';
import Timeline from '@/draftComponents/Timeline';

const testData = [
  { entry: 'a', date: '11 Oct' },
  { entry: 'b', date: '12 Oct' },
  { entry: 'c', date: '13 Oct' },
];

describe('components/Timeline', () => {
  describe('properties', () => {
    let prop;

    describe('data', () => {
      beforeEach(() => {
        prop = Timeline.props.data;
      });

      it('is required', () => {
        expect(prop.required).toBe(true);
      });

      it('should be array', () => {
        expect(prop.type).toBe(Array);
      });
    });
  });
  
  describe('markup', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = createTestSubject(Timeline, {
        mocks: {},
        stubs: [],
        propsData: { 
          data: testData,
        },
      });
    });

    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('renders data that is passed as prop', () => {
      expect(wrapper.findAll('li').length).toBe(3);
    });
  });
});
