import React, { useEffect, useState } from 'react';
import { Table, Card, Row, Col, message } from 'antd';
import { fetchGeneralStatistics, fetchClubStatistics } from '@/models/baocaothongke';
import { Bar } from '@ant-design/plots';
import ExportForm from './Form';

interface GeneralStats {
  totalClubs: number;
  totalPending: number;
  totalApproved: number;
}

interface ClubStat {
  clubName: string;
  pending: number;
  approved: number;
  rejected: number;
  value: number;
  status: string;
}

const BaoCaoThongKe: React.FC = () => {
  const [generalStats, setGeneralStats] = useState<GeneralStats | null>(null);
  const [clubStats, setClubStats] = useState<ClubStat[]>([]);

  useEffect(() => {
    fetchGeneralStatistics()
      .then(setGeneralStats)
      .catch(() => message.error('Failed to fetch general statistics'));
    fetchClubStatistics()
      .then((data) =>
        setClubStats(
          data.map((item) => ({
            ...item,
            value: item.pending + item.approved + item.rejected, // Example calculation for 'value'
            status: 'Total', // Example static value for 'status'
          }))
        )
      )
      .catch(() => message.error('Failed to fetch club statistics'));
  }, []);

  const columns = [
    { title: 'CLB', dataIndex: 'clubName', key: 'clubName' },
    { title: 'Pending', dataIndex: 'pending', key: 'pending', sorter: true },
    { title: 'Approved', dataIndex: 'approved', key: 'approved', sorter: true },
    { title: 'Rejected', dataIndex: 'rejected', key: 'rejected', sorter: true },
  ];

  const chartConfig = {
    data: clubStats,
    xField: 'clubName',
    yField: 'value',
    seriesField: 'status',
    isGroup: true,
    autoFit: true,
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Số CLB">{generalStats?.totalClubs}</Card>
        </Col>
        <Col span={8}>
          <Card title="Pending">{generalStats?.totalPending}</Card>
        </Col>
        <Col span={8}>
          <Card title="Approved">{generalStats?.totalApproved}</Card>
        </Col>
      </Row>
      <ExportForm clubStats={clubStats} />
      <Card title="Số đơn đăng ký theo từng CLB">
        <Bar {...chartConfig} />
      </Card>
      <Table dataSource={clubStats} columns={columns} rowKey="clubName" />
    </div>
  );
};

export default BaoCaoThongKe;
