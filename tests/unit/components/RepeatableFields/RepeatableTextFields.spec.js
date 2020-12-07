import TextField from '@/draftComponents/Form/TextField';
import { shallowMount } from '@vue/test-utils';

// repeatable components
import DraftingJudge from '@/draftComponents/RepeatableFields/DraftingJudge';
import StatutoryConsultee from '@/draftComponents/RepeatableFields/StatutoryConsultee';
import SelectionExerciseOfficer from '@/draftComponents/RepeatableFields/SelectionExerciseOfficer';
import AssignedCommissioner from '@/draftComponents/RepeatableFields/AssignedCommissioner';
import OtherShortlistingMethod from '@/draftComponents/RepeatableFields/OtherShortlistingMethod';

// add repeatable text component to this array
const repeatableTextFields = [
  ['DraftingJudge', DraftingJudge],
  ['StatutoryConsultee', StatutoryConsultee],
  ['SelectionExerciseOfficer', SelectionExerciseOfficer],
  ['AssignedCommissioner', AssignedCommissioner],
  ['OtherShortlistingMethod', OtherShortlistingMethod],
];

describe('Repeatable text fields', () => {
  describe.each(repeatableTextFields)('@/components/RepeatableFields/%s', (label, component) => {
    it('renders TextField component', () => {
      const wrapper = shallowMount(component, {
        propsData: {
          row: {},
          index: 1,
        },
      });
      expect(wrapper.find(TextField).exists()).toBe(true);
    });

    describe('props', () => {
      describe('row', () => {
        let prop;

        beforeEach(() => {
          prop = component.props.row;
        });

        it('is required', () => {
          expect(prop.required).toBe(true);
        });

        it('has a type object', () => {
          expect(prop.type).toBe(Object);
        });
      });

      describe('index', () => {
        let prop;

        beforeEach(() => {
          prop = component.props.index;
        });

        it('is required', () => {
          expect(prop.required).toBe(true);
        });

        it('has a type number', () => {
          expect(prop.type).toBe(Number);
        });
      });
    });
  });
});
