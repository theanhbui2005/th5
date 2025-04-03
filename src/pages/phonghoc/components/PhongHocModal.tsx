import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PhongHoc, LoaiPhong, NguoiPhuTrach } from '../../../models/phonghoc/data.d';

const { Option } = Select;

interface PhongHocModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: PhongHoc) => Promise<void>;
  values?: PhongHoc;
  nguoiPhuTrachList: NguoiPhuTrach[];
}

const PhongHocModal: React.FC<PhongHocModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  values,
  nguoiPhuTrachList,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!values;
  const title = isEdit ? 'Chỉnh sửa phòng học' : 'Thêm phòng học mới';

  // Thiết lập giá trị ban đầu cho form
  useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [form, values]);

  // Xử lý khi submit form
  const handleSubmit = async () => {
    try {
      const fieldsValue = await form.validateFields();
      await onSubmit(fieldsValue as PhongHoc);
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      maskClosable={false}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="phong_hoc_form"
        initialValues={{
          maPhong: '',
          tenPhong: '',
          soChoNgoi: 30,
          loaiPhong: LoaiPhong.LyThuyet,
          nguoiPhuTrach: nguoiPhuTrachList.length > 0 ? nguoiPhuTrachList[0].ten : '',
        }}
      >
        <Form.Item
          name="maPhong"
          label="Mã phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập mã phòng!' },
            { max: 10, message: 'Mã phòng không được vượt quá 10 ký tự!' },
          ]}
        >
          <Input placeholder="Nhập mã phòng" disabled={isEdit} />
        </Form.Item>

        <Form.Item
          name="tenPhong"
          label="Tên phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phòng!' },
            { max: 50, message: 'Tên phòng không được vượt quá 50 ký tự!' },
          ]}
        >
          <Input placeholder="Nhập tên phòng" />
        </Form.Item>

        <Form.Item
          name="soChoNgoi"
          label="Số chỗ ngồi"
          rules={[
            { required: true, message: 'Vui lòng nhập số chỗ ngồi!' },
            { type: 'number', min: 10, message: 'Số chỗ ngồi tối thiểu là 10!' },
            { type: 'number', max: 200, message: 'Số chỗ ngồi tối đa là 200!' },
          ]}
        >
          <InputNumber 
            placeholder="Nhập số chỗ ngồi" 
            style={{ width: '100%' }} 
            min={10} 
            max={200} 
          />
        </Form.Item>

        <Form.Item
          name="loaiPhong"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
        >
          <Select placeholder="Chọn loại phòng">
            <Option value={LoaiPhong.LyThuyet}>{LoaiPhong.LyThuyet}</Option>
            <Option value={LoaiPhong.ThucHanh}>{LoaiPhong.ThucHanh}</Option>
            <Option value={LoaiPhong.HoiTruong}>{LoaiPhong.HoiTruong}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="nguoiPhuTrach"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách!' }]}
        >
          <Select placeholder="Chọn người phụ trách">
            {nguoiPhuTrachList.map(item => (
              <Option key={item.id} value={item.ten}>
                {item.ten}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PhongHocModal; 