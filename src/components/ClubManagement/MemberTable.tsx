import React, { useState } from 'react';
import { Table, Button, Modal, Select } from 'antd';
import { Member, Club } from '@/models';

const MemberTable: React.FC<{ members: Member[]; clubs: Club[] }> = ({ members, clubs }) => {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [targetClub, setTargetClub] = useState<number | null>(null);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  ];

  const handleTransfer = () => {
    console.log('Transferring members:', selectedMembers, 'to club:', targetClub);
    setIsModalVisible(false);
  };

  return (
    <>
      <Table
        rowSelection={{
          onChange: (selectedRowKeys) => setSelectedMembers(selectedRowKeys as number[]),
        }}
        columns={columns}
        dataSource={members.filter((m) => m.status === 'Approved')}
        rowKey="id"
      />
      <Button
        type="primary"
        disabled={selectedMembers.length === 0}
        onClick={() => setIsModalVisible(true)}
      >
        Transfer Club
      </Button>
      <Modal
        title="Transfer Club"
        visible={isModalVisible}
        onOk={handleTransfer}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Transferring {selectedMembers.length} members</p>
        <Select
          placeholder="Select Club"
          style={{ width: '100%' }}
          onChange={(value) => setTargetClub(value)}
        >
          {clubs.map((club) => (
            <Select.Option key={club.id} value={club.id}>
              {club.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default MemberTable;