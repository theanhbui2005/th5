import { useState } from "react";
type OrderRecord = Order.Record;

const useOrderModel = () => {
  
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  
  const addOrder = (order: Omit<OrderRecord, "id">) => {
    
    if (
      orders.some(
        (o) =>
          o.orderCode.trim().toLowerCase() ===
          order.orderCode.trim().toLowerCase()
      )
    ) {
      alert("Mã đơn hàng đã tồn tại!");
      return;
    }
    const newOrder: OrderRecord = { id: Date.now(), ...order };
    const newOrders = [...orders, newOrder];
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  
  const updateOrder = (updatedOrder: OrderRecord) => {
    if (
      orders.some(
        (o) =>
          o.orderCode.trim().toLowerCase() ===
            updatedOrder.orderCode.trim().toLowerCase() &&
          o.id !== updatedOrder.id
      )
    ) {
      alert("Mã đơn hàng đã tồn tại!");
      return;
    }
    const newOrders = orders.map((o) =>
      o.id === updatedOrder.id ? updatedOrder : o
    );
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  
  const deleteOrder = (orderId: number) => {
    const orderToDelete = orders.find((o) => o.id === orderId);
    if (orderToDelete && orderToDelete.status !== "Chờ xác nhận") {
      alert("Chỉ cho phép hủy đơn hàng ở trạng thái 'Chờ xác nhận'!");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      const newOrders = orders.filter((o) => o.id !== orderId);
      localStorage.setItem("orders", JSON.stringify(newOrders));
      setOrders(newOrders);
    }
  };

  return {
    orders,
    setOrders,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedOrder,
    setSelectedOrder,
    addOrder,
    updateOrder,
    deleteOrder,
  };
};

export default useOrderModel;
