import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import ExcelJS from 'exceljs';

const dataDir = path.resolve(process.cwd(), 'test-data');

/** Read JSON test data file */
export function readJson<T = Record<string, unknown>>(fileName: string): T {
  const filePath = path.join(dataDir, 'json', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

/** Read CSV test data file and return as array of objects */
export function readCsv<T = Record<string, string>>(fileName: string): T[] {
  const filePath = path.join(dataDir, 'csv', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as T[];
}

/** Read Excel test data file and return as array of objects */
export async function readExcel<T = Record<string, unknown>>(
  fileName: string,
  sheetName?: string,
): Promise<T[]> {
  const filePath = path.join(dataDir, 'excel', fileName);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = sheetName
    ? workbook.getWorksheet(sheetName)
    : workbook.worksheets[0];

  if (!worksheet) {
    throw new Error(`Worksheet not found: ${sheetName ?? 'first sheet'}`);
  }

  const headers: string[] = [];
  const data: T[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell) => {
        headers.push(String(cell.value));
      });
    } else {
      const rowData: Record<string, unknown> = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1];
        if (header) {
          rowData[header] = cell.value;
        }
      });
      data.push(rowData as T);
    }
  });

  return data;
}
