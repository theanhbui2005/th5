import { useState } from 'react';

// Import model phòng học
import './phonghoc';

export default () => {
	const [startLine, setStartLine] = useState<number>(0);
	const [headLine, setHeadLine] = useState<Record<string, string>>(); // A: "Mã"
	const [fileData, setFileData] = useState<Record<string, string>[]>(); // "Mã": "ABC"
	const [matchedColumns, setMatchedColumns] = useState<Record<string, string>>(); // ma: "Mã"
	const [dataImport, setDataImport] = useState<any[]>();

	return {
		startLine,
		setStartLine,
		headLine,
		setHeadLine,
		fileData,
		setFileData,
		matchedColumns,
		setMatchedColumns,
		dataImport,
		setDataImport,
	};
};
