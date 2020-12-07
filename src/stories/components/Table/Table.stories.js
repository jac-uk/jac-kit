import Table from '../../../packages/components/Table/Table';
import TableCell from '../../../packages/components/Table/TableCell';

export default {
  title: 'JAC-Kit/Table',
  component: Table,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Table, TableCell },
  methods: {
    emittedChange(result) {
      console.log('change:', result);
    },
  },
  template: `
    <Table
      v-bind="$props"
      @change="emittedChange"
    >
      <template #row="{row}">
        <TableCell>{{ row.col1 }}</TableCell>
        <TableCell>{{ row.col2 }}</TableCell>
      </template>
    </Table>
  `.trim(),
});

export const Types = Template.bind({});
Types.args = {
  data: [
    {
      col1: 'Priscilla Rees',
      col2: 'London',
      id: 1021,
    },
    {
      col1: 'Zahra Franco',
      col2: 'Montreal',
      id: 1022,
    },
    {
      col1: 'Jennifer Jones',
      col2: 'Paris',
      id: 1023,
    },
    {
      col1: 'Abigail Lindsay',
      col2: 'London',
      id: 1025,
    },
  ],
  dataKey: 'id',
  columns: [
    { title: 'Name', sort: 'col1' },
    { title: 'City', sort: 'col2' },
  ],
  pageSize: 1,
};
Types.storyName = 'Table Component';

export const Search = Template.bind({});
Search.args = {
  data: [
    {
      col1: 'Priscilla Rees',
      col2: 'London',
      id: 1021,
    },
  ],
  search: ['P'],
  dataKey: 'id',
  columns: [
    { title: 'Name', sort: 'col1' },
    { title: 'City', sort: 'col2' },
  ],
};
Search.storyName = 'Search';