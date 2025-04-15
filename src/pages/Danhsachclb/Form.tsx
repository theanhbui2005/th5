import { Button, Form, Input, DatePicker, Switch } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import moment from 'moment';

const ClubForm = () => {
  const [form] = Form.useForm();
  // Lấy các hàm xử lý và state từ model quản lý CLB (quanlyclb)
  const { addClub, updateClub, selectedClub, isEdit, setVisible, visible } = useModel('danhsachclb');

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    } else if (visible && selectedClub) {
      form.setFieldsValue({
        ...selectedClub,
        foundingDate: selectedClub.foundingDate ? moment(selectedClub.foundingDate, 'YYYY-MM-DD') : null,
      });
    }
  }, [visible, selectedClub, form]);

  return (
    <Form
      form={form}
      initialValues={{
        avatar: '',
        clubName: '',
        foundingDate: null,
        description: '',
        leader: '',
        active: true,
      }}
      onFinish={(values) => {
        const formattedValues = {
          ...values,
          foundingDate: values.foundingDate ? values.foundingDate.format('YYYY-MM-DD') : '',
        };
        if (isEdit && selectedClub) {
          updateClub({ ...selectedClub, ...formattedValues });
        } else {
          addClub(formattedValues);
        }
        setVisible(false);
        form.resetFields();
      }}
      layout="vertical"
    >
      <Form.Item
        label="Ảnh đại diện"
        name="avatar"
        rules={[{ required: true, message: 'Vui lòng nhập link ảnh đại diện!' }]}
      >
        <Input placeholder="Nhập link ảnh đại diện" />
      </Form.Item>

      <Form.Item
        label="Tên câu lạc bộ"
        name="clubName"
        rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ!' }]}
      >
        <Input placeholder="Nhập tên câu lạc bộ" />
      </Form.Item>

      <Form.Item
        label="Ngày thành lập"
        name="foundingDate"
        rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả cho câu lạc bộ!' }]}
      >
        <Input.TextArea rows={4} placeholder="Nhập mô tả (HTML)" />
      </Form.Item>

      <Form.Item
        label="Chủ nhiệm CLB"
        name="leader"
        rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm câu lạc bộ!' }]}
      >
        <Input placeholder="Nhập tên chủ nhiệm" />
      </Form.Item>

      <Form.Item
        label="Hoạt động"
        name="active"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái hoạt động!' }]}
        valuePropName="checked"
      >
        <Switch checkedChildren="Có" unCheckedChildren="Không" />
      </Form.Item>

      <div className="form-footer" style={{ textAlign: 'right' }}>
        <Button htmlType="submit" type="primary" style={{ marginRight: 8 }}>
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </Button>
        <Button onClick={() => { setVisible(false); form.resetFields(); }}>Hủy</Button>
      </div>
    </Form>
  );
};

export default ClubForm;
