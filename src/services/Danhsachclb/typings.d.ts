declare module Club {
    export interface Record {
      id: number;
      avatar: string;             // Đường link hoặc base64 của ảnh đại diện
      clubName: string;           // Tên câu lạc bộ
      foundingDate: string;       // Ngày thành lập (dạng string, vd: "YYYY-MM-DD")
      description: string;        // Mô tả dạng HTML
      leader: string;             // Chủ nhiệm CLB
      active: boolean;            // Trạng thái hoạt động: true (Có) hoặc false (Không)
    }
  }
  