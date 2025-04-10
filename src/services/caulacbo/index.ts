import { CauLacBo, DangKyThanhVien } from '../../models/caulacbo/data.d';

// Services cho câu lạc bộ
export async function queryCauLacBo(): Promise<CauLacBo[]> {
  const data = localStorage.getItem('caulacbo-data');
  return data ? JSON.parse(data) : [];
}

export async function addCauLacBo(params: Omit<CauLacBo, 'id'>): Promise<boolean> {
  return true;
}

export async function updateCauLacBo(params: CauLacBo): Promise<boolean> {
  return true;
}

export async function removeCauLacBo(id: string): Promise<boolean> {
  return true;
}

// Services cho đơn đăng ký thành viên
export async function queryDangKyThanhVien(): Promise<DangKyThanhVien[]> {
  const data = localStorage.getItem('dangky-data');
  return data ? JSON.parse(data) : [];
}

export async function addDangKyThanhVien(params: Omit<DangKyThanhVien, 'id' | 'ngayDangKy' | 'trangThai' | 'cauLacBoTen'>): Promise<boolean> {
  return true;
}

export async function updateDangKyThanhVien(params: DangKyThanhVien): Promise<boolean> {
  return true;
}

export async function removeDangKyThanhVien(id: string): Promise<boolean> {
  return true;
}

export async function duyetDangKyThanhVien(id: string): Promise<boolean> {
  return true;
}

export async function tuChoiDangKyThanhVien(id: string, ghiChu: string): Promise<boolean> {
  return true;
} 