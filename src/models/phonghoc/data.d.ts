export enum LoaiPhong {
  LyThuyet = 'Lý thuyết',
  ThucHanh = 'Thực hành',
  HoiTruong = 'Hội trường',
}

export interface PhongHoc {
  id: string;
  maPhong: string;
  tenPhong: string;
  soChoNgoi: number;
  loaiPhong: LoaiPhong;
  nguoiPhuTrach: string;
}

export interface PhongHocState {
  list: PhongHoc[];
  total: number;
  loading: boolean;
}

export interface NguoiPhuTrach {
  id: string;
  ten: string;
} 