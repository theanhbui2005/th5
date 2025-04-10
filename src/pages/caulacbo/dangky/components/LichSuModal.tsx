import React from 'react';
import { Modal, Table, Tag, Typography } from 'antd';
import { LichSuThaoTac } from '../../../../models/caulacbo/data.d';
import moment from 'moment';

const { Text } = Typography;

interface LichSuModalProps {
  visible: boolean;
  onCancel: () => void;
  lichSuThaoTac: LichSuThaoTac[];
  title?: string;
}

const LichSuModal: React.FC<LichSuModalProps> = ({
  visible,
  onCancel,
  lichSuThaoTac,
  title = 'Lịch sử thao tác',
}) => {
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      width: 180,
      render: (text: string) => (
        <span>{moment(text).format('HH:mm:ss DD/MM/YYYY')}</span>
      ),
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'nguoiThucHien',
      key: 'nguoiThucHien',
      width: 120,
    },
    {
      title: 'Hành động',
      dataIndex: 'hanhDong',
      key: 'hanhDong',
      width: 120,
      render: (text: string) => {
        let color = 'blue';
        if (text.includes('Duyệt')) color = 'green';
        if (text.includes('Từ chối')) color = 'red';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghiChu',
      key: 'ghiChu',
    },
  ];

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      width={800}
      footer={null}
    >
      {lichSuThaoTac.length === 0 ? (
        <Text>Chưa có lịch sử thao tác nào.</Text>
      ) : (
        <Table
          dataSource={lichSuThaoTac}
          columns={columns}
          rowKey="id"
          pagination={false}
          size="small"
        />
      )}
    </Modal>
  );
};

export default LichSuModal; 