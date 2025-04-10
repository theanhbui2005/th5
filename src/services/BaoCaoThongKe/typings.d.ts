export interface ClubStatistics {
  clubName: string;
  pending: number;
  approved: number;
  rejected: number;
}

export interface GeneralStatistics {
  totalClubs: number;
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
}

export interface Member {
  id: string;
  name: string;
  clubName: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}
