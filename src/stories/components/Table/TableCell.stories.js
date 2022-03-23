import Table from '../../../packages/components/Table/Table';
import TableCell from '../../../packages/components/Table/TableCell';

export default {
  title: 'JAC-Kit/Table/TableCell',
  component: TableCell,
};

const columns = [
  { title: 'Name', sort: 'col1' },
  { title: 'City', sort: 'col2' },
  { title: 'Reference Number', sort: 'col4' },
  { title: 'Status', sort: 'col3' },
];

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
        <TableCell
          :row='row'
          :title="columns[0].title"
        >
          {{ row.col1 }}
        </TableCell>
        <TableCell
          :row='row'
          :title="columns[1].title"
        >
          {{ row.col2 }}
        </TableCell>
        <TableCell
          :row='row'
        >
          {{ row.col3 }}
        </TableCell>
        <TableCell
          :row='row'
        >
          {{ row.col4 }}
        </TableCell>
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
      col4: 'applied',
      col3: '0001',
      id: 1021,
    },
    {
      col1: 'Francisco Reyes',
      col2: 'London',
      col4: 'pending',
      col3: '0005',
      id: 1022,
    },
  ],
  dataKey: 'id',
  columns: columns,
  pageSize: 1,
  pageItemType: 'number',
};
Types.storyName = 'Table Component';

// export const Search = Template.bind({});
// Search.args = {
//   data: [
//     {
//       col1: 'Priscilla Rees',
//       col2: 'London',
//       id: 1021,
//     },
//   ],
//   search: ['P'],
//   dataKey: 'id',
//   columns: [
//     { title: 'Name', sort: 'col1' },
//     { title: 'City', sort: 'col2' },
//   ],
// };
// Search.storyName = 'Search';
