import React from 'react';
import ExportButton from '../components/ExportButton';

const IndexPage = () => {
  const sampleData = [
    { Name: 'John Doe', Age: 30, City: 'New York' },
    { Name: 'Jane Smith', Age: 25, City: 'London' },
    { Name: 'Sam Brown', Age: 35, City: 'Sydney' },
  ];

  return (
    <div>
      <h1>Trang chính</h1>
      <ExportButton data={sampleData} fileName="sample-data.xlsx" />
    </div>
  );
};

export default IndexPage;
