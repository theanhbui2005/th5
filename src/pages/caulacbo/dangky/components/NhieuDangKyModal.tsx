import React from 'react';
import { Modal, Form, Input, Radio, Button } from 'antd';
import { DangKyThanhVien } from '../../../../models/caulacbo/data.d';

const { TextArea } = Input;

interface NhieuDangKyModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  selectedRows: DangKyThanhVien[];
  action: 'duyet' | 'tuchoi';
}

const NhieuDangKyModal: React.FC<NhieuDangKyModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  selectedRows,
  action,
}) => {
  const [form] = Form.useForm();
  
  const title = action === 'duyet' 
    ? `Duyệt ${selectedRows.length} đơn đăng ký` 
    : `Từ chối ${selectedRows.length} đơn đăng ký`;

  // Xử lý khi submit form
  const handleSubmit = async () => {
    try {
      const fieldsValue = await form.validateFields();
      const ids = selectedRows.map(row => row.id);
      
      await onSubmit({
        ids,
        ...fieldsValue,
      });
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {action === 'duyet' ? 'Duyệt' : 'Từ chối'}
        </Button>,
      ]}
      width={600}
      maskClosable={false}
      destroyOnClose
    >
      <p>Bạn đã chọn {selectedRows.length} đơn đăng ký. Vui lòng xác nhận thao tác.</p>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ghiChu: action === 'duyet' ? 'Đã duyệt đơn đăng ký' : 'Không đủ điều kiện',
        }}
      >
        <Form.Item
          name="ghiChu"
          label="Ghi chú"
        >
          <TextArea 
            rows={4} 
            placeholder={action === 'duyet' ? "Nhập ghi chú duyệt đơn" : "Nhập lý do từ chối"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NhieuDangKyModal; 