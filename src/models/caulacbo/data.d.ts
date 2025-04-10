export enum TrangThaiDangKy {
  Pending = 'Đang xử lý',
  Approved = 'Đã duyệt',
  Rejected = 'Đã từ chối',
}

export enum GioiTinh {
  Nam = 'Nam',
  Nu = 'Nữ',
  Khac = 'Khác',
}

export interface LichSuThaoTac {
  id: string;
  dangKyId: string;
  nguoiThucHien: string;
  hanhDong: string;
  thoiGian: string;
  ghiChu?: string;
}

export interface CauLacBo {
  id: string;
  ten: string;
  moTa: string;
  chuNhiem: string;
  ngayThanhLap: string;
  soDienThoai: string;
  email: string;
  trangThai: boolean;
}

export interface DangKyThanhVien {
  id: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  gioiTinh: GioiTinh;
  diaChi: string;
  soTruong: string;
  cauLacBoId: string;
  cauLacBoTen: string;
  lyDoDangKy: string;
  trangThai: TrangThaiDangKy;
  ghiChu?: string;
  ngayDangKy: string;
  ngayCapNhat?: string;
  lichSuThaoTac?: LichSuThaoTac[];
}

export interface CauLacBoState {
  danhSachCLB: CauLacBo[];
  danhSachDangKy: DangKyThanhVien[];
  lichSuThaoTac: LichSuThaoTac[];
  total: number;
  loading: boolean;
} 