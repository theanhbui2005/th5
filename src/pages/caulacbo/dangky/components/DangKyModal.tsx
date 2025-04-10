import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Radio, message } from 'antd';
import { DangKyThanhVien, GioiTinh, TrangThaiDangKy, CauLacBo } from '../../../../models/caulacbo/data.d';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

interface DangKyModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  values?: DangKyThanhVien;
  danhSachCLB: CauLacBo[];
  title?: string;
  readOnly?: boolean;
}

const DangKyModal: React.FC<DangKyModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  values,
  danhSachCLB,
  title,
  readOnly = false,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!values;
  
  const modalTitle = title || (isEdit ? 'Chỉnh sửa đơn đăng ký' : 'Thêm đơn đăng ký');

  // Thiết lập giá trị ban đầu cho form
  useEffect(() => {
    if (visible) {
      if (values) {
        form.setFieldsValue({
          ...values,
          ngayDangKy: values.ngayDangKy ? moment(values.ngayDangKy) : undefined,
          ngayCapNhat: values.ngayCapNhat ? moment(values.ngayCapNhat) : undefined,
        });
      } else {
        form.resetFields();
      }
    }
  }, [form, values, visible]);

  // Xử lý khi submit form
  const handleSubmit = async () => {
    try {
      const fieldsValue = await form.validateFields();
      
      // Chuyển đổi moment sang string
      const submitValues = {
        ...fieldsValue,
        ngayDangKy: fieldsValue.ngayDangKy?.format('YYYY-MM-DD'),
        ngayCapNhat: fieldsValue.ngayCapNhat?.format('YYYY-MM-DD'),
      };
      
      await onSubmit(submitValues);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onCancel={onCancel}
      onOk={readOnly ? onCancel : handleSubmit}
      width={700}
      maskClosable={false}
      destroyOnClose
      okText={readOnly ? 'Đóng' : 'Lưu'}
      cancelText={readOnly ? undefined : 'Hủy'}
      okButtonProps={{ style: readOnly ? { display: 'none' } : {} }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          gioiTinh: GioiTinh.Nam,
          trangThai: TrangThaiDangKy.Pending,
        }}
        disabled={readOnly}
      >
        <Form.Item
          name="hoTen"
          label="Họ tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Nhập họ tên" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="soDienThoai"
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="gioiTinh"
          label="Giới tính"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
        >
          <Radio.Group>
            <Radio value={GioiTinh.Nam}>{GioiTinh.Nam}</Radio>
            <Radio value={GioiTinh.Nu}>{GioiTinh.Nu}</Radio>
            <Radio value={GioiTinh.Khac}>{GioiTinh.Khac}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="diaChi"
          label="Địa chỉ"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>

        <Form.Item
          name="soTruong"
          label="Sở trường"
          rules={[{ required: true, message: 'Vui lòng nhập sở trường!' }]}
        >
          <Input placeholder="Nhập sở trường" />
        </Form.Item>

        <Form.Item
          name="cauLacBoId"
          label="Câu lạc bộ"
          rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ!' }]}
        >
          <Select placeholder="Chọn câu lạc bộ">
            {danhSachCLB.map(clb => (
              <Option key={clb.id} value={clb.id}>
                {clb.ten}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="lyDoDangKy"
          label="Lý do đăng ký"
          rules={[{ required: true, message: 'Vui lòng nhập lý do đăng ký!' }]}
        >
          <TextArea rows={4} placeholder="Nhập lý do đăng ký" />
        </Form.Item>

        {isEdit && (
          <>
            <Form.Item
              name="trangThai"
              label="Trạng thái"
            >
              <Select disabled>
                <Option value={TrangThaiDangKy.Pending}>{TrangThaiDangKy.Pending}</Option>
                <Option value={TrangThaiDangKy.Approved}>{TrangThaiDangKy.Approved}</Option>
                <Option value={TrangThaiDangKy.Rejected}>{TrangThaiDangKy.Rejected}</Option>
              </Select>
            </Form.Item>

            {values?.trangThai === TrangThaiDangKy.Rejected && (
              <Form.Item
                name="ghiChu"
                label="Ghi chú (Lý do từ chối)"
              >
                <TextArea rows={3} disabled />
              </Form.Item>
            )}

            <Form.Item
              name="ngayDangKy"
              label="Ngày đăng ký"
            >
              <DatePicker disabled style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>

            {values?.ngayCapNhat && (
              <Form.Item
                name="ngayCapNhat"
                label="Ngày cập nhật"
              >
                <DatePicker disabled style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
            )}
          </>
        )}
      </Form>
    </Modal>
  );
};

export default DangKyModal; 