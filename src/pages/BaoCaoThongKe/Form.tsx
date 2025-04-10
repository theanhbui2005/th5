import React from 'react';
import { Button } from 'antd';
import * as XLSX from 'xlsx';
import { fetchApprovedMembers } from '@/models/baocaothongke';

const ExportForm: React.FC<{ clubStats: any[] }> = ({ clubStats }) => {
  const exportToXLSX = async () => {
    const members = await fetchApprovedMembers();
    const worksheet = XLSX.utils.json_to_sheet(members);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Approved Members');
    XLSX.writeFile(workbook, 'ApprovedMembers.xlsx');
  };

  const exportClubStatsToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(clubStats);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Club Statistics');
    XLSX.writeFile(workbook, 'ClubStatistics.xlsx');
  };

  return (
    <>
      <Button onClick={exportToXLSX}>Export Approved Members</Button>
      <Button onClick={exportClubStatsToXLSX} style={{ marginLeft: 8 }}>
        Export Club Statistics
      </Button>
    </>
  );
};

export default ExportForm;
