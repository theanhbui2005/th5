declare module Order {
  export interface Record {
    id: number;
    orderCode: string;      
    customer: string;     
    orderDate: string;      
    totalAmount: number;    
    status: "Chờ xác nhận" | "Đang giao" | "Hoàn thành" | "Hủy"; 
    
  }
}