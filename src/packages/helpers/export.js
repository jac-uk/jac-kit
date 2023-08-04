import XLSXPopulate from 'xlsx-populate';
import { save, saveSync } from 'save-file';

const downloadXLSX = async (data, options, isSync = false) => {
  const workbook = await XLSXPopulate.fromBlankAsync();

  workbook.property({
    Title: options.title,
    Author: 'JAC',
  });

  const sheet = workbook.sheet(0);

  /* NOTE:
   Sheet name length should not be more than 31 and not contain special characters
   */
  sheet.name(options.sheetName.replace(/[^\w\s-]/gi, '').substring(0, 30));

  sheet.cell('A1').value(data);
  sheet.row(1).style({
    bold: true,
    fill: 'eeeeee',
  });
  sheet.freezePanes(0, 1);

  const blob = await workbook.outputAsync();
  if (isSync) {
    saveSync(blob, options.fileName);
  } else {
    save(blob, options.fileName);
  }
};

export {
  downloadXLSX
};
