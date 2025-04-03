import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import moment from 'moment';

const { Option } = Select;


const productList = [
  { id: 'Áo', name: 'Áo thun cộc tay ', price: 100000 },
  { id: 'Mũ', name: 'Mũ thời trang', price: 200000 },
  { id: 'Quần nỉ ', name: 'Quần nỉ nam xám tiêu', price: 150000 },
  { id: 'Quần bò ', name: 'Quần bò nam nữ ống xuông ', price: 200000 },
  { id: 'Tất ', name: 'Tất uniqlo ', price: 20000 },
  { id: 'Giày  ', name: 'Giày nam thể thao ', price: 250000 },
];

const OrderForm = () => {
  const [form] = Form.useForm();
  const { addOrder, updateOrder, selectedOrder, isEdit, setVisible, visible } = useModel('quanlydonhang');

  
  useEffect(() => {
    if (!visible) {
      form.resetFields();
    } else if (visible && selectedOrder) {
      form.setFieldsValue({
        ...selectedOrder,
        orderDate: selectedOrder.orderDate ? moment(selectedOrder.orderDate, 'YYYY-MM-DD') : null,
      });
    }
  }, [visible, selectedOrder, form]);

  
  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.products) {
      const selectedProducts = allValues.products || [];
      const total = selectedProducts.reduce((sum: number, prodId: string) => {
        const product = productList.find(p => p.id === prodId);
        return sum + (product ? product.price : 0);
      }, 0);
      form.setFieldsValue({ totalAmount: total });
    }
  };

  return (
    <Form
      form={form}
      initialValues={{
        orderCode: '',
        customer: '',
        orderDate: null,
        totalAmount: 0,
        status: 'Chờ xác nhận',
        products: [],
      }}
      onValuesChange={onValuesChange}
      onFinish={(values) => {
        const formattedValues = {
          ...values,
          orderDate: values.orderDate ? values.orderDate.format('YYYY-MM-DD') : '',
        };
        if (isEdit && selectedOrder) {
          updateOrder({ ...selectedOrder, ...formattedValues });
        } else {
          addOrder(formattedValues);
        }
        setVisible(false);
        form.resetFields();
      }}
      layout="vertical"
    >
      <Form.Item
        label="Mã đơn hàng"
        name="orderCode"
        rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Khách hàng"
        name="customer"
        rules={[{ required: true, message: 'Vui lòng chọn khách hàng!' }]}
      >
        <Select placeholder="Chọn khách hàng">
          
          <Option value="Khách hàng 1">Khách hàng 1</Option>
          <Option value="Khách hàng 2">Khách hàng 2</Option>
          <Option value="Khách hàng 3">Khách hàng 3</Option>
          <Option value="Khách hàng 4">Khách hàng 4</Option>
          <Option value="Khách hàng 5">Khách hàng 5</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ngày đặt hàng"
        name="orderDate"
        rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Tổng tiền"
        name="totalAmount"
        rules={[{ required: true, message: 'Tổng tiền không được để trống!' }]}
      >
        <InputNumber style={{ width: '100%' }} disabled />
      </Form.Item>

      <Form.Item
        label="Trạng thái đơn hàng"
        name="status"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng!' }]}
      >
        <Select placeholder="Chọn trạng thái">
          <Option value="Chờ xác nhận">Chờ xác nhận</Option>
          <Option value="Đang giao">Đang giao</Option>
          <Option value="Hoàn thành">Hoàn thành</Option>
          <Option value="Hủy">Hủy</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Sản phẩm"
        name="products"
        rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
      >
        <Select mode="multiple" placeholder="Chọn sản phẩm">
          {productList.map(product => (
            <Option key={product.id} value={product.id}>
              {product.name} - {product.price.toLocaleString()} đ
            </Option>
          ))}
        </Select>
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

export default OrderForm;
