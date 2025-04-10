
import React from 'react';
import { Column } from '@ant-design/plots';

const Statistics = () => {
	const data = [
		{ club: 'Club A', members: 50 },
		{ club: 'Club B', members: 30 },
		{ club: 'Club C', members: 20 },
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

	return (
		<div>
			<h1>Club Statistics</h1>
			<Column {...config} />
		</div>
	);
};

export default Statistics;