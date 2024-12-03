import XLSXPopulate from 'xlsx-populate';
import { saveSync } from 'save-file';

/**
 * Sanitise cell data to ensure that values starting with special characters
 * (e.g., '=', '+', '-', '@') are treated as plain text.
 * @param {string} input - The cell data to be sanitised.
 * @returns {string} - The sanitised cell data.
 */
const sanitiseForExcel = (input) => {
  if (input && /^[=+\-@]/.test(input)) {
    return `'${input}`;
  }
  return input;
};

/**
 * Download data as .xlsx file
 *
 * @param {Array} data
 * @param {Object} options
 * Check all available styles in https://github.com/dtjohnson/xlsx-populate?tab=readme-ov-file#styles-1.
 * ex. {
 *       column: {
 *         'S': {
 *           wrapText: true,
 *         },
 *       },
 *     }
 */
const downloadXLSX = async (data, options) => {
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

  // Sanitize data before populating the sheet
  const sanitizedData = data.map(row => row.map(cell => sanitiseForExcel(cell)));  // Sanitize each cell

  sheet.cell('A1').value(sanitizedData);

  if (!options.styles) {
    options.styles = {
      row: {
        1: {
          bold: true,
          fill: 'eeeeee',
        }
      }
    }
  }

  if (!options.freezePanes) {
    options.freezePanes = [
      {
        xSplit: 0,
        ySplit: 1,
      },
    ];
    sheet.freezePanes(0, 1);
  }

  if (options.styles) {
    // Set up styles for specific columns
    const columnStyles = options.styles.column || {};
    for (const [colNo, colStyle] of Object.entries(columnStyles)) {
      sheet.column(colNo).style(colStyle);
    }

    // Set up styles for specific rows
    const rowStyles = options.styles.row || {};
    for (const [rowNo, rowStyle] of Object.entries(rowStyles)) {
      sheet.row(rowNo).style(rowStyle);
    }

    // Set up styles for specific cells
    const cellStyles = options.styles.cell || {};
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

  // Freeze panes
  if (Array.isArray(options.freezePanes) && options.freezePanes.length) {
    options.freezePanes.forEach((pane) => {
      if (typeof pane.xSplit === 'number' && typeof pane.ySplit === 'number')
        sheet.freezePanes(pane.xSplit, pane.ySplit);
      else if (pane.topLeftCell)
        sheet.freezePanes(pane.topLeftCell);
    });
  }

  const blob = await workbook.outputAsync();
  saveSync(blob, options.fileName);
};

export {
  downloadXLSX
};
