export interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    clubId: number;
  }