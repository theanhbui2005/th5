import { Button, Table, Modal, Tabs, Input } from 'antd';
import { useModel } from 'umi';
import OrderForm from './Form';
import { useState } from 'react';




const OrderPage = () => {
  const {
    orders,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedOrder,
    setSelectedOrder,
    deleteOrder,
  } = useModel('quanlydonhang');

  const [searchText, setSearchText] = useState('');
  const handleEdit = (record: Order.Record) => {
    setSelectedOrder(record);
    setIsEdit(true);
    setVisible(true);
  };
  

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận hủy đơn hàng',
      content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      onOk: () => deleteOrder(id),
    });
  };
  const filteredOrders = orders.filter(order => 
    order.orderCode.toLowerCase().includes(searchText.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchText.toLowerCase())
  );

  const orderColumns = [
    { title: 'Mã đơn hàng', dataIndex: 'orderCode', key: 'orderCode' },
    { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
    { title: 'Ngày đặt hàng', dataIndex: 'orderDate', key: 'orderDate' },
    { 
      title: 'Tổng tiền', 
      dataIndex: 'totalAmount', 
      key: 'totalAmount',
      render: (value: number) => value.toLocaleString()
    },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { 
      title: 'Sản phẩm', 
      dataIndex: 'products', 
      key: 'products',
      render: (products: string[]) => products.join(", ")
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Order.Record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="link">Sửa</Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger>Hủy</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setSelectedOrder(null);
          setIsEdit(false);
          setVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Thêm đơn hàng
      </Button>
      <Input.Search
          placeholder="Tìm kiếm theo mã đơn hàng hoặc khách hàng"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
       <Table columns={orderColumns} dataSource={filteredOrders} rowKey="id" />


      <Modal
        title={isEdit ? "Sửa đơn hàng" : "Thêm đơn hàng"}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <OrderForm />
      </Modal>
    </div>
  );
};

export default OrderPage;
