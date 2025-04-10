import React from 'react';
import { Column } from '@ant-design/plots';

const Statistics: React.FC = () => {
  const data = [
    { club: 'Football Club', members: 20 },
    { club: 'Chess Club', members: 15 },
  ];

  const config = {
    data,
    xField: 'club',
    yField: 'members',
    columnWidthRatio: 0.8,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };

  return <Column {...config} />;
};

export default Statistics;