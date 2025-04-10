import React from 'react';
import MemberTable from '@/components/ClubManagement/MemberTable';
import { Member, Club } from '@/models';

const members: Member[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123456789', status: 'Approved', clubId: 1 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987654321', status: 'Approved', clubId: 2 },
];

const clubs: Club[] = [
  { id: 1, name: 'Football Club', description: 'Football enthusiasts' },
  { id: 2, name: 'Chess Club', description: 'Chess lovers' },
];

const Members: React.FC = () => {
  return <MemberTable members={members} clubs={clubs} />;
};

export default Members;