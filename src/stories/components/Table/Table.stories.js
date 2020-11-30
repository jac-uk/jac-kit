// import Table from '../../../packages/components/Table/Table';

// export default {
//   title: "JAC-Kit/Table",
//   component: Table,
//   argTypes: {
//     status: {
//       control: {
//         type: "select",
//         options: ["success", "warning", "information"]
//       }
//     }
//   }
// };

// const Template = (args, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   components: { Banner },
//   template: `
//     <Table
//       data-key="id"
//       :data="tableData"
//       :page-size="5"
//       :columns="[
//         { title: 'Column 1', sort: 'col1' },
//         { title: 'Column 2', sort: 'col2' },
//       ]"
//     >
//       <template #row="{row}">
//         <TableCell>{{ col1 }}</TableCell>
//         <TableCell>{{ col2 }}</TableCell>
//       </template>
//     </Table>
//   `.trim()
// });

// export const Types = Template.bind({});
// Types.args = {
//   status: "success",
//   message: "My initial message - pls test without message"
// };
