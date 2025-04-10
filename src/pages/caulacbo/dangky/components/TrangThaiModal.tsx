import React, { useState } from 'react';
import { Modal, Form, Input, Typography } from 'antd';
import { DangKyThanhVien, TrangThaiDangKy } from '../../../../models/caulacbo/data.d';

const { TextArea } = Input;
const { Text } = Typography;

interface TrangThaiModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  record: DangKyThanhVien;
  action: 'duyet' | 'tuchoi';
}

const TrangThaiModal: React.FC<TrangThaiModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  record,
  action,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const isApprove = action === 'duyet';
  const title = isApprove ? 'Duyệt đơn đăng ký' : 'Từ chối đơn đăng ký';
  
  // Xử lý khi submit form
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      if (isApprove) {
        await onSubmit({ id: record.id });
      } else {
        const { ghiChu } = await form.validateFields();
        await onSubmit({ id: record.id, ghiChu });
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      console.error('Validate Failed:', error);
    }
  };

  // Reset form khi modal mở
  React.useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={isApprove ? 'Duyệt' : 'Từ chối'}
      cancelText="Hủy"
      confirmLoading={submitting}
    >
      <div style={{ marginBottom: 16 }}>
        <Text strong>Họ tên: </Text>
        <Text>{record.hoTen}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Email: </Text>
        <Text>{record.email}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Số điện thoại: </Text>
        <Text>{record.soDienThoai}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Câu lạc bộ: </Text>
        <Text>{record.cauLacBoTen}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Lý do đăng ký: </Text>
        <Text>{record.lyDoDangKy}</Text>
      </div>
      
      {!isApprove && (
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="ghiChu"
            label="Lý do từ chối"
            rules={[{ required: true, message: 'Vui lòng nhập lý do từ chối!' }]}
          >
            <TextArea rows={4} placeholder="Nhập lý do từ chối" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default TrangThaiModal; 