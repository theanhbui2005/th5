import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, TableColumnProps } from 'antd';
import { Button, Popconfirm, message, Space, Tag, Input, Select, Typography, Row, Col, Form } from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  FilterOutlined, 
  SortAscendingOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import { PhongHoc, LoaiPhong, NguoiPhuTrach } from '../../models/phonghoc/data.d';
import PhongHocModal from './components/PhongHocModal';

const { Text } = Typography;
const { Option } = Select;

const PhongHocList: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const actionRef = useRef<any>();
  const { list, loading, total } = useSelector((state: any) => state.phonghoc);
  const [nguoiPhuTrachList, setNguoiPhuTrachList] = useState<NguoiPhuTrach[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<PhongHoc | undefined>(undefined);
  const [filteredList, setFilteredList] = useState<PhongHoc[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedLoaiPhong, setSelectedLoaiPhong] = useState<string | undefined>(undefined);
  const [selectedNguoiPhuTrach, setSelectedNguoiPhuTrach] = useState<string | undefined>(undefined);
  
  // Tải danh sách phòng học
  useEffect(() => {
    dispatch({
      type: 'phonghoc/fetch',
    });
    
    // Tải danh sách người phụ trách
    const fetchNguoiPhuTrach = async () => {
      const result = await dispatch({
        type: 'phonghoc/fetchNguoiPhuTrach',
      });
      if (result) {
        setNguoiPhuTrachList(result);
      }
    };
    fetchNguoiPhuTrach();
  }, [dispatch]);

  // Cập nhật danh sách lọc khi danh sách chính thay đổi
  useEffect(() => {
    if (list) {
      let result = [...list];
      
      // Lọc theo từ khóa tìm kiếm
      if (searchText) {
        result = result.filter(item => 
          item.maPhong.toLowerCase().includes(searchText.toLowerCase()) || 
          item.tenPhong.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      
      // Lọc theo loại phòng
      if (selectedLoaiPhong) {
        result = result.filter(item => item.loaiPhong === selectedLoaiPhong);
      }
      
      // Lọc theo người phụ trách
      if (selectedNguoiPhuTrach) {
        result = result.filter(item => item.nguoiPhuTrach === selectedNguoiPhuTrach);
      }
      
      setFilteredList(result);
    }
  }, [list, searchText, selectedLoaiPhong, selectedNguoiPhuTrach]);

  // Xử lý thêm phòng học mới
  const handleAdd = () => {
    setCurrentRecord(undefined);
    setModalVisible(true);
  };

  // Xử lý chỉnh sửa phòng học
  const handleEdit = (record: PhongHoc) => {
    setCurrentRecord(record);
    setModalVisible(true);
  };

  // Xử lý xóa phòng học
  const handleDelete = async (id: string) => {
    const success = await dispatch({
      type: 'phonghoc/remove',
      payload: { id },
    });
    
    if (success) {
      dispatch({
        type: 'phonghoc/fetch',
      });
    }
  };

  // Xử lý đóng modal
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // Xử lý lưu phòng học (thêm mới hoặc cập nhật)
  const handleSave = async (values: PhongHoc) => {
    let success;
    
    if (currentRecord) {
      // Cập nhật
      success = await dispatch({
        type: 'phonghoc/update',
        payload: { id: currentRecord.id, ...values },
      });
    } else {
      // Thêm mới
      success = await dispatch({
        type: 'phonghoc/add',
        payload: values,
      });
    }
    
    if (success) {
      setModalVisible(false);
      dispatch({
        type: 'phonghoc/fetch',
      });
    }
  };

  // Xử lý đặt lại bộ lọc
  const handleReset = () => {
    setSearchText('');
    setSelectedLoaiPhong(undefined);
    setSelectedNguoiPhuTrach(undefined);
    form.resetFields();
  };

  // Định nghĩa các cột trong bảng
  const columns: TableColumnProps<PhongHoc>[] = [
    {
      title: 'Mã phòng',
      dataIndex: 'maPhong',
      key: 'maPhong',
      width: 100,
      sorter: (a, b) => a.maPhong.localeCompare(b.maPhong),
    },
    {
      title: 'Tên phòng',
      dataIndex: 'tenPhong',
      key: 'tenPhong',
      width: 200,
      sorter: (a, b) => a.tenPhong.localeCompare(b.tenPhong),
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'soChoNgoi',
      key: 'soChoNgoi',
      width: 100,
      sorter: (a, b) => a.soChoNgoi - b.soChoNgoi,
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Loại phòng',
      dataIndex: 'loaiPhong',
      key: 'loaiPhong',
      width: 120,
      render: (text) => {
        let color = 'blue';
        if (text === LoaiPhong.ThucHanh) color = 'green';
        if (text === LoaiPhong.HoiTruong) color = 'purple';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'nguoiPhuTrach',
      key: 'nguoiPhuTrach',
      width: 150,
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Thao tác',
      dataIndex: 'option',
      key: 'option',
      width: 100,
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            title="Sửa"
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phòng học này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            disabled={record.soChoNgoi >= 30}
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              danger={record.soChoNgoi < 30}
              disabled={record.soChoNgoi >= 30}
              title={record.soChoNgoi >= 30 ? "Không thể xóa phòng có từ 30 chỗ trở lên" : "Xóa"}
              onClick={(e) => {
                if (record.soChoNgoi >= 30) {
                  e.stopPropagation();
                  message.warning('Không thể xóa phòng có số chỗ ngồi từ 30 trở lên!');
                }
              }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="Quản lý phòng học">
      <div style={{ background: '#fff', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Tìm kiếm:</span>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm theo mã hoặc tên phòng"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ width: '240px' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Loại phòng:</span>
            <Select
              placeholder="Lọc theo loại phòng"
              value={selectedLoaiPhong}
              onChange={(value) => setSelectedLoaiPhong(value)}
              allowClear
              style={{ width: '180px' }}
            >
              <Option value={LoaiPhong.LyThuyet}>{LoaiPhong.LyThuyet}</Option>
              <Option value={LoaiPhong.ThucHanh}>{LoaiPhong.ThucHanh}</Option>
              <Option value={LoaiPhong.HoiTruong}>{LoaiPhong.HoiTruong}</Option>
            </Select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Người phụ trách:</span>
            <Select
              placeholder="Lọc theo người phụ trách"
              value={selectedNguoiPhuTrach}
              onChange={(value) => setSelectedNguoiPhuTrach(value)}
              allowClear
              style={{ width: '180px' }}
            >
              {nguoiPhuTrachList.map(item => (
                <Option key={item.id} value={item.ten}>{item.ten}</Option>
              ))}
            </Select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleReset} 
              style={{ marginRight: '8px' }}
              danger
            >
              Đặt lại
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd}
              style={{ backgroundColor: '#c8102e', borderColor: '#c8102e' }}
            >
              Thêm phòng học
            </Button>
          </div>
        </div>
        
        <Table<PhongHoc>
          rowKey="id"
          dataSource={filteredList}
          columns={columns}
          loading={loading}
          pagination={{
            pageSize: 10,
            total: filteredList.length,
            showTotal: (total) => `Tổng số: ${total} phòng học`,
          }}
          bordered
        />
      </div>
      
      {modalVisible && (
        <PhongHocModal
          visible={modalVisible}
          onCancel={handleModalClose}
          onSubmit={handleSave}
          values={currentRecord}
          nguoiPhuTrachList={nguoiPhuTrachList}
        />
      )}
    </PageContainer>
  );
};

export default PhongHocList; 