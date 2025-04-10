import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, TableColumnProps, Button, Space, Tag, Input, Select, message, Popconfirm, Row, Col, Form, Typography } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  ReloadOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HistoryOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import { DangKyThanhVien, TrangThaiDangKy, GioiTinh, CauLacBo, LichSuThaoTac } from '../../../models/caulacbo/data.d';
import DangKyModal from './components/DangKyModal';
import TrangThaiModal from './components/TrangThaiModal';
import LichSuModal from './components/LichSuModal';
import NhieuDangKyModal from './components/NhieuDangKyModal';

const { Option } = Select;
const { Text } = Typography;

const DangKyThanhVienList: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { danhSachDangKy, danhSachCLB, lichSuThaoTac, loading, total } = useSelector((state: any) => state.caulacbo);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [trangThaiModalVisible, setTrangThaiModalVisible] = useState(false);
  const [lichSuModalVisible, setLichSuModalVisible] = useState(false);
  const [nhieuDangKyModalVisible, setNhieuDangKyModalVisible] = useState(false);
  
  const [currentRecord, setCurrentRecord] = useState<DangKyThanhVien | undefined>(undefined);
  const [actionType, setActionType] = useState<'duyet' | 'tuchoi'>('duyet');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<DangKyThanhVien[]>([]);
  const [currentLichSu, setCurrentLichSu] = useState<LichSuThaoTac[]>([]);
  
  const [filteredList, setFilteredList] = useState<DangKyThanhVien[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTrangThai, setSelectedTrangThai] = useState<string | undefined>(undefined);
  const [selectedCauLacBo, setSelectedCauLacBo] = useState<string | undefined>(undefined);
  
  // Tải danh sách đơn đăng ký, câu lạc bộ và lịch sử
  useEffect(() => {
    dispatch({
      type: 'caulacbo/fetchDangKy',
    });
    
    dispatch({
      type: 'caulacbo/fetchCLB',
    });

    dispatch({
      type: 'caulacbo/fetchLichSu',
    });
  }, [dispatch]);

  // Cập nhật danh sách lọc khi danh sách chính thay đổi
  useEffect(() => {
    if (danhSachDangKy) {
      let result = [...danhSachDangKy];
      
      // Lọc theo từ khóa tìm kiếm
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        result = result.filter(item => 
          item.hoTen.toLowerCase().includes(searchLower) || 
          item.email.toLowerCase().includes(searchLower) ||
          item.soDienThoai.includes(searchText)
        );
      }
      
      // Lọc theo trạng thái
      if (selectedTrangThai) {
        result = result.filter(item => item.trangThai === selectedTrangThai);
      }
      
      // Lọc theo câu lạc bộ
      if (selectedCauLacBo) {
        result = result.filter(item => item.cauLacBoId === selectedCauLacBo);
      }
      
      setFilteredList(result);
    }
  }, [danhSachDangKy, searchText, selectedTrangThai, selectedCauLacBo]);

  // Xử lý thêm đơn đăng ký mới
  const handleAdd = () => {
    setCurrentRecord(undefined);
    setModalVisible(true);
  };

  // Xử lý chỉnh sửa đơn đăng ký
  const handleEdit = (record: DangKyThanhVien) => {
    setCurrentRecord(record);
    setModalVisible(true);
  };

  // Xử lý xem chi tiết đơn đăng ký
  const handleView = (record: DangKyThanhVien) => {
    setCurrentRecord(record);
    setViewModalVisible(true);
  };

  // Xử lý xem lịch sử thao tác của đơn đăng ký
  const handleViewLichSu = (record: DangKyThanhVien) => {
    // Lấy lịch sử của đơn đăng ký này
    const lichSuDon = lichSuThaoTac.filter((ls: LichSuThaoTac) => ls.dangKyId === record.id);
    setCurrentLichSu(lichSuDon);
    setLichSuModalVisible(true);
  };

  // Xử lý xóa đơn đăng ký
  const handleDelete = async (id: string) => {
    const success = await dispatch({
      type: 'caulacbo/removeDangKy',
      payload: { id },
    });
    
    if (success) {
      dispatch({
        type: 'caulacbo/fetchDangKy',
      });
    }
  };

  // Xử lý đóng modal
  const handleModalClose = () => {
    setModalVisible(false);
    setViewModalVisible(false);
    setTrangThaiModalVisible(false);
    setLichSuModalVisible(false);
    setNhieuDangKyModalVisible(false);
  };

  // Xử lý lưu đơn đăng ký (thêm mới hoặc cập nhật)
  const handleSave = async (values: any) => {
    let success;
    
    if (currentRecord) {
      // Cập nhật
      success = await dispatch({
        type: 'caulacbo/updateDangKy',
        payload: { id: currentRecord.id, ...values },
      });
    } else {
      // Thêm mới
      success = await dispatch({
        type: 'caulacbo/addDangKy',
        payload: values,
      });
    }
    
    if (success) {
      setModalVisible(false);
      dispatch({
        type: 'caulacbo/fetchDangKy',
      });
    }
  };

  // Xử lý duyệt đơn đăng ký
  const handleApprove = (record: DangKyThanhVien) => {
    setCurrentRecord(record);
    setActionType('duyet');
    setTrangThaiModalVisible(true);
  };

  // Xử lý từ chối đơn đăng ký
  const handleReject = (record: DangKyThanhVien) => {
    setCurrentRecord(record);
    setActionType('tuchoi');
    setTrangThaiModalVisible(true);
  };

  // Xử lý duyệt nhiều đơn đăng ký
  const handleApproveMany = () => {
    setActionType('duyet');
    setNhieuDangKyModalVisible(true);
  };

  // Xử lý từ chối nhiều đơn đăng ký
  const handleRejectMany = () => {
    setActionType('tuchoi');
    setNhieuDangKyModalVisible(true);
  };

  // Xử lý xác nhận thay đổi trạng thái
  const handleTrangThaiSubmit = async (values: any) => {
    let success;
    
    if (actionType === 'duyet') {
      success = await dispatch({
        type: 'caulacbo/duyetDangKy',
        payload: values,
      });
    } else {
      success = await dispatch({
        type: 'caulacbo/tuChoiDangKy',
        payload: values,
      });
    }
    
    if (success) {
      setTrangThaiModalVisible(false);
      dispatch({
        type: 'caulacbo/fetchDangKy',
      });
      dispatch({
        type: 'caulacbo/fetchLichSu',
      });
    }
  };

  // Xử lý xác nhận thay đổi trạng thái nhiều đơn
  const handleNhieuDangKySubmit = async (values: any) => {
    let success;
    
    if (actionType === 'duyet') {
      success = await dispatch({
        type: 'caulacbo/duyetNhieuDangKy',
        payload: values,
      });
    } else {
      success = await dispatch({
        type: 'caulacbo/tuChoiNhieuDangKy',
        payload: values,
      });
    }
    
    if (success) {
      setNhieuDangKyModalVisible(false);
      setSelectedRowKeys([]);
      setSelectedRows([]);
      dispatch({
        type: 'caulacbo/fetchDangKy',
      });
      dispatch({
        type: 'caulacbo/fetchLichSu',
      });
    }
  };

  // Xử lý đặt lại bộ lọc
  const handleReset = () => {
    setSearchText('');
    setSelectedTrangThai(undefined);
    setSelectedCauLacBo(undefined);
    form.resetFields();
  };

  // Cấu hình chọn nhiều dòng
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[], selectedItems: DangKyThanhVien[]) => {
      setSelectedRowKeys(selectedKeys as string[]);
      setSelectedRows(selectedItems);
    },
    getCheckboxProps: (record: DangKyThanhVien) => ({
      disabled: record.trangThai !== TrangThaiDangKy.Pending,
      name: record.id,
    }),
  };

  // Định nghĩa các cột trong bảng
  const columns: TableColumnProps<DangKyThanhVien>[] = [
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: 120,
      sorter: (a, b) => a.hoTen.localeCompare(b.hoTen),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'SĐT',
      dataIndex: 'soDienThoai',
      key: 'soDienThoai',
      width: 100,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      key: 'gioiTinh',
      width: 70,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Sở trường',
      dataIndex: 'soTruong',
      key: 'soTruong',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Lý do',
      dataIndex: 'lyDoDangKy',
      key: 'lyDoDangKy',
      width: 150,
      ellipsis: true,
      render: (text) => <div title={text}>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</div>,
    },
    {
      title: 'Câu lạc bộ',
      dataIndex: 'cauLacBoTen',
      key: 'cauLacBoTen',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 90,
      render: (text) => {
        let color = 'blue';
        if (text === TrangThaiDangKy.Approved) color = 'green';
        if (text === TrangThaiDangKy.Rejected) color = 'red';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 160,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => handleView(record)} 
            title="Xem chi tiết"
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            title="Chỉnh sửa"
          />
          <Button 
            type="text" 
            icon={<HistoryOutlined />} 
            onClick={() => handleViewLichSu(record)} 
            title="Xem lịch sử"
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa đơn đăng ký này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button 
              type="text" 
              danger
              icon={<DeleteOutlined />} 
              title="Xóa"
            />
          </Popconfirm>
          
          {record.trangThai === TrangThaiDangKy.Pending && (
            <>
              <Button 
                type="text" 
                icon={<CheckCircleOutlined />} 
                style={{ color: 'green' }}
                onClick={() => handleApprove(record)} 
                title="Duyệt đơn"
              />
              <Button 
                type="text" 
                icon={<CloseCircleOutlined />} 
                danger
                onClick={() => handleReject(record)} 
                title="Từ chối đơn"
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="Quản lý đơn đăng ký thành viên">
      <div style={{ background: '#fff', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Tìm kiếm:</span>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm theo tên, email, sđt"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ width: '240px' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Trạng thái:</span>
            <Select
              placeholder="Lọc theo trạng thái"
              value={selectedTrangThai}
              onChange={(value) => setSelectedTrangThai(value)}
              allowClear
              style={{ width: '180px' }}
            >
              <Option value={TrangThaiDangKy.Pending}>{TrangThaiDangKy.Pending}</Option>
              <Option value={TrangThaiDangKy.Approved}>{TrangThaiDangKy.Approved}</Option>
              <Option value={TrangThaiDangKy.Rejected}>{TrangThaiDangKy.Rejected}</Option>
            </Select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px' }}>Câu lạc bộ:</span>
            <Select
              placeholder="Lọc theo câu lạc bộ"
              value={selectedCauLacBo}
              onChange={(value) => setSelectedCauLacBo(value)}
              allowClear
              style={{ width: '180px' }}
            >
              {danhSachCLB?.map((clb: CauLacBo) => (
                <Option key={clb.id} value={clb.id}>{clb.ten}</Option>
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
              style={{ backgroundColor: '#c8102e', borderColor: '#c8102e', marginRight: '8px' }}
            >
              Thêm đơn đăng ký
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem('caulacbo-data');
                localStorage.removeItem('dangky-data');
                localStorage.removeItem('lichsu-data');
                message.success('Đã xóa dữ liệu cũ!');
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            >
              Reset dữ liệu
            </Button>
          </div>
        </div>
        
        {selectedRowKeys.length > 0 && (
          <div style={{ marginBottom: '16px', background: '#f0f2f5', padding: '8px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong>Đã chọn {selectedRowKeys.length} đơn đăng ký</Text>
            </div>
            <div>
              <Button 
                type="primary" 
                icon={<CheckOutlined />} 
                onClick={handleApproveMany}
                style={{ marginRight: '8px' }}
              >
                Duyệt {selectedRowKeys.length} đơn
              </Button>
              <Button 
                danger 
                icon={<CloseCircleOutlined />} 
                onClick={handleRejectMany}
              >
                Từ chối {selectedRowKeys.length} đơn
              </Button>
            </div>
          </div>
        )}
        
        <Table<DangKyThanhVien>
          rowKey="id"
          dataSource={filteredList}
          columns={columns}
          loading={loading}
          rowSelection={rowSelection}
          pagination={{
            pageSize: 10,
            total: filteredList.length,
            showTotal: (total) => `Tổng số: ${total} đơn đăng ký`,
          }}
          bordered
          scroll={{ x: 1500 }}
          size="small"
        />
      </div>
      
      {/* Các Modal */}
      {modalVisible && (
        <DangKyModal
          visible={modalVisible}
          onCancel={handleModalClose}
          onSubmit={handleSave}
          values={currentRecord}
          danhSachCLB={danhSachCLB || []}
        />
      )}
      
      {viewModalVisible && currentRecord && (
        <DangKyModal
          visible={viewModalVisible}
          onCancel={handleModalClose}
          onSubmit={async () => {}}
          values={currentRecord}
          danhSachCLB={danhSachCLB || []}
          title="Chi tiết đơn đăng ký"
          readOnly
        />
      )}
      
      {trangThaiModalVisible && currentRecord && (
        <TrangThaiModal
          visible={trangThaiModalVisible}
          onCancel={handleModalClose}
          onSubmit={handleTrangThaiSubmit}
          record={currentRecord}
          action={actionType}
        />
      )}
      
      {lichSuModalVisible && (
        <LichSuModal
          visible={lichSuModalVisible}
          onCancel={handleModalClose}
          lichSuThaoTac={currentLichSu}
          title={`Lịch sử thao tác ${currentRecord?.hoTen ? 'của ' + currentRecord.hoTen : ''}`}
        />
      )}
      
      {nhieuDangKyModalVisible && (
        <NhieuDangKyModal
          visible={nhieuDangKyModalVisible}
          onCancel={handleModalClose}
          onSubmit={handleNhieuDangKySubmit}
          selectedRows={selectedRows}
          action={actionType}
        />
      )}
    </PageContainer>
  );
};

export default DangKyThanhVienList; 