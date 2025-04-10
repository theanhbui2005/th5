import React from 'react';
import * as XLSX from 'xlsx';

const ExportButton = ({ data, fileName }) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName || 'export.xlsx');
  };

  return (
    <button onClick={handleExport}>
      Xuất ra file XLSX
    </button>
  );
};

export default ExportButton;
