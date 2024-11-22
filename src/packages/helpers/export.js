import XLSXPopulate from 'xlsx-populate';
import { saveSync } from 'save-file';

/**
 * Download data as .xlsx file
 *
 * @param {Array} data
 * @param {Object} options
 * @param {Object} styles Set up styles for rows and columns.
 * Check all available styles in https://github.com/dtjohnson/xlsx-populate?tab=readme-ov-file#styles-1.
 * ex. {
 *       column: {
 *         'S': {
 *           wrapText: true,
 *         },
 *       },
 *     }
 */
const downloadXLSX = async (data, options, styles) => {
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

  if (styles) {
    // Set up styles for specific columns
    const columnStyles = styles.column || {};
    for (const [colNo, colStyle] of Object.entries(columnStyles)) {
      sheet.column(colNo).style(colStyle);
    }

    // Set up styles for specific rows
    const rowStyles = styles.row || {};
    for (const [rowNo, rowStyle] of Object.entries(rowStyles)) {
      sheet.column(rowNo).style(rowStyle);
    }

    // Set up styles for specific cells
    const cellStyles = styles.cell || {};
    for (const [cellNo, cellStyle] of Object.entries(cellStyles)) {
      sheet.cell(cellNo).style(cellStyle);
    }
  }

  // Merge cells
  if (Array.isArray(options.merges) && options.merges.length) {
    options.merges.forEach((merge) => {
      sheet.range(merge).merged(true);
    });
  }

  sheet.freezePanes(0, 1);

  const blob = await workbook.outputAsync();
  saveSync(blob, options.fileName);
};

export {
  downloadXLSX
};
