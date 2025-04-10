import { ClubStatistics, GeneralStatistics, Member } from '@/services/BaoCaoThongKe/typings';

export async function fetchGeneralStatistics(): Promise<GeneralStatistics> {
  const data = localStorage.getItem('generalStatistics');
  return data ? JSON.parse(data) : { totalClubs: 0, totalPending: 0, totalApproved: 0, totalRejected: 0 };
}

export async function fetchClubStatistics(): Promise<ClubStatistics[]> {
  const data = localStorage.getItem('clubStatistics');
  return data ? JSON.parse(data) : [];
}

export async function fetchApprovedMembers(): Promise<Member[]> {
  const data = localStorage.getItem('approvedMembers');
  return data ? JSON.parse(data) : [];
}

export function saveGeneralStatistics(data: GeneralStatistics): void {
  localStorage.setItem('generalStatistics', JSON.stringify(data));
}

export function saveClubStatistics(data: ClubStatistics[]): void {
  localStorage.setItem('clubStatistics', JSON.stringify(data));
}

export function saveApprovedMembers(data: Member[]): void {
  localStorage.setItem('approvedMembers', JSON.stringify(data));
}
