import React, { useState } from 'react';
import { Button, Table, Modal, Input, Space } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';
import ClubForm from './Form';

const ClubPage = () => {
  const {
    clubs,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedClub,
    setSelectedClub,
    deleteClub,
  } = useModel('danhsachclb');

  const [searchText, setSearchText] = useState('');
  const [viewMembersVisible, setViewMembersVisible] = useState(false);
  const [selectedClubMembers, setSelectedClubMembers] = useState<Club.Record | null>(null);

  const handleEdit = (record: Club.Record) => {
    setSelectedClub(record);
    setIsEdit(true);
    setVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa câu lạc bộ',
      content: 'Bạn có chắc chắn muốn xóa câu lạc bộ này?',
      onOk: () => deleteClub(id),
    });
  };

  const handleViewMembers = (record: Club.Record) => {
    // Mở modal xem danh sách thành viên
    setSelectedClubMembers(record);
    setViewMembersVisible(true);
  };

  // Tìm kiếm theo tên câu lạc bộ
  const filteredClubs = clubs.filter((club) =>
    club.clubName.toLowerCase().includes(searchText.toLowerCase())
  );

  const clubColumns = [
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string) => (
        <img
          src={text}
          alt="avatar"
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Tên câu lạc bộ',
      dataIndex: 'clubName',
      key: 'clubName',
      sorter: (a: Club.Record, b: Club.Record) =>
        a.clubName.localeCompare(b.clubName),
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'foundingDate',
      key: 'foundingDate',
      sorter: (a: Club.Record, b: Club.Record) =>
        moment(a.foundingDate).unix() - moment(b.foundingDate).unix(),
      render: (date: string) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'leader',
      key: 'leader',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'active',
      key: 'active',
      width: 80,
      render: (active: boolean) => (active ? 'Có' : 'Không'),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 200,
      render: (_: any, record: Club.Record) => (
        <Space>
          <Button onClick={() => handleEdit(record)} type="link">
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger>
            Xóa
          </Button>
          <Button onClick={() => handleViewMembers(record)} type="link">
            Xem danh sách thành viên
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm câu lạc bộ theo tên"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={() => {
            setSelectedClub(null);
            setIsEdit(false);
            setVisible(true);
          }}
        >
          Thêm mới câu lạc bộ
        </Button>
      </Space>

      <Table dataSource={filteredClubs} columns={clubColumns} rowKey="id" />

      <Modal
        title={isEdit ? 'Chỉnh sửa câu lạc bộ' : 'Thêm mới câu lạc bộ'}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <ClubForm />
      </Modal>

      <Modal
        title="Danh sách thành viên"
        visible={viewMembersVisible}
        footer={null}
        onCancel={() => setViewMembersVisible(false)}
      >
        {selectedClubMembers ? (
          <div>
            <p>Câu lạc bộ: {selectedClubMembers.clubName}</p>
            <p>Danh sách thành viên sẽ được hiển thị ở đây...</p>
          </div>
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </Modal>
    </div>
  );
};

export default ClubPage;
