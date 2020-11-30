import SearchFilter from "../../../packages/components/SearchFilter/SearchFilter";

const checkbox = {
  type: "checkbox",
  title: "Checkbox Example",
  options: ["one", "two", "three"]
};

const dateRange = {
  type: "dateRange",
  title: "Date Range Example"
};

const keyword = {
  type: "keyword",
  title: "keyword"
};

export default {
  title: "JAC-Kit/SearchFilter",
  component: SearchFilter,
  argTypes: {
    terms: {
      control: {
        type: "check",
        options: {
          checkbox: checkbox,
          dateRange: dateRange,
          keyword: keyword
        }
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SearchFilter },
  template: '<SearchFilter v-bind="$props" />'
});

export const Types = Template.bind({});
Types.args = {
  showTab: true,
  terms: [dateRange]
};
