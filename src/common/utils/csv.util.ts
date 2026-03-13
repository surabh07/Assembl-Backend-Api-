export function arrayToCsv(rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return '';

  const headers = Object.keys(rows[0]!);
  const headerRow = headers.join(',');

  const dataRows = rows.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        const str = value === null || value === undefined ? '' : String(value);
        // Escape commas and quotes
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      })
      .join(','),
  );

  return [headerRow, ...dataRows].join('\n');
}
