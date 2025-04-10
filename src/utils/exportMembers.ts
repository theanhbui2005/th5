import * as XLSX from 'xlsx';

export function exportApprovedMembersByClub(clubData: { clubName: string; members: { name: string; email: string; status: string }[] }[]) {
  const workbook = XLSX.utils.book_new();

  clubData.forEach((club) => {
    const approvedMembers = club.members.filter((member) => member.status === 'Approved');
    const worksheetData = approvedMembers.map((member) => ({
      Name: member.name,
      Email: member.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, club.clubName);
  });

  XLSX.writeFile(workbook, 'ApprovedMembers.xlsx');
}
