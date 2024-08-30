import { createTestSubject } from '../testHelpers';

import Navigation from '@/draftComponents/Navigation';

const $route = {
  path: '/some/path',
  name: 'someRouteName',
  meta: {
    pageName: 'somePageName',
  },
};

describe('components/Navigation', () => {

  describe('props', () => {
    let prop;

    describe('data', () => {
      beforeEach(() => {
        prop = Navigation.props.pages;
      });

      it('is required', () => {
        expect(prop.required).toBe(true);
      });

      it('should be array', () => {
        expect(prop.type).toBe(Array);
      });
    });

    describe('label', () => {
      beforeEach(() => {
        prop = Navigation.props.title;
      });
      
      it('is optional', () => {
        expect(prop.required).not.toBe(true);
      });
      
      it('has default value', () => {
        expect(prop.default).toBe('');
      });
      
      it('should be string', () => {
        expect(prop.type).toBe(String);
      });
    });
  });
  
  describe('template', () => {
    const navPages = [
      { page: 'Test', name: 'nav-test-name1' },
      { page: 'Test2', name: 'nav-test-name2' },
    ];
    
    let wrapper;
    
    beforeEach(() => {

      wrapper = createTestSubject(Navigation, { 
        mocks: {
          $route,
        },
        stubs: ['router-link'],
        propsData: {
          pages: navPages,
        },
      });
    });
    
    it('renders the component', () => {
      expect(wrapper.exists()).toBe(true);
    });
    
    it('renders items that is passed as prop', () => {
      expect(wrapper.findAll('li').length).toBe(2);
    });
    
    it('does not render if items array is empty', async () => {
      await wrapper.setProps({ pages: [] });
      expect(wrapper.findAll('li').length).toBe(0);
    });
    
    it('sets aria-label with label prop', async () => {
      await wrapper.setProps({ title: 'MyTestLabel' });
      expect(wrapper.find('nav').attributes('aria-label')).toBe('MyTestLabel');
    });
    
    describe('selected tabs', () => {
      beforeEach( async () => {
        navPages.push({ 
          page: 'Test2', 
          on: true, 
          name: 'nav-test-name2', 
          params: {
            nav: 'current',
            status: '',
          },
        });
        wrapper = await createTestSubject(Navigation, { 
          mocks: {
            $route,
          },
          stubs: ['router-link'],
          propsData: {
            pages: navPages,
          },
        });
      });
      it('is set for a link which is currently active', () => {
        const links = wrapper.findAll('li');
        expect(links.at(1).classes()).toEqual(['moj-side-navigation__item']);
        expect(links.at(2).classes()).toEqual(['moj-side-navigation__item', 'moj-side-navigation__item--active']);
        expect(links.at(0).classes()).toEqual(['moj-side-navigation__item']);
      });
      it('is set for a link which is currently active', () => {
        const links = wrapper.findAll('router-link-stub');
        expect(links.at(0).attributes()).not.toHaveProperty('aria-current');
        expect(links.at(1).attributes()).not.toHaveProperty('aria-current');
        expect(links.at(2).attributes()).toHaveProperty('aria-current');
      });
    });
  });
});
