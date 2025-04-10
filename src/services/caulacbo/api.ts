import { request } from 'umi';

// URL cơ sở của json-server
const BASE_URL = 'http://localhost:3000';

// API cho câu lạc bộ
export async function getCauLacBoList() {
  return request(`${BASE_URL}/caulacbo`, {
    method: 'GET',
  });
}

export async function getCauLacBoById(id: number) {
  return request(`${BASE_URL}/caulacbo/${id}`, {
    method: 'GET',
  });
}

export async function createCauLacBo(data: any) {
  return request(`${BASE_URL}/caulacbo`, {
    method: 'POST',
    data,
  });
}

export async function updateCauLacBo(id: number, data: any) {
  return request(`${BASE_URL}/caulacbo/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteCauLacBo(id: number) {
  return request(`${BASE_URL}/caulacbo/${id}`, {
    method: 'DELETE',
  });
}

// API cho đăng ký
export async function getDangKyList() {
  return request(`${BASE_URL}/dangky`, {
    method: 'GET',
  });
}

export async function getDangKyById(id: number) {
  return request(`${BASE_URL}/dangky/${id}`, {
    method: 'GET',
  });
}

export async function createDangKy(data: any) {
  return request(`${BASE_URL}/dangky`, {
    method: 'POST',
    data,
  });
}

export async function updateDangKy(id: number, data: any) {
  return request(`${BASE_URL}/dangky/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteDangKy(id: number) {
  return request(`${BASE_URL}/dangky/${id}`, {
    method: 'DELETE',
  });
}

// API cho sinh viên
export async function getSinhVienList() {
  return request(`${BASE_URL}/sinhvien`, {
    method: 'GET',
  });
}

export async function getSinhVienById(id: string) {
  return request(`${BASE_URL}/sinhvien/${id}`, {
    method: 'GET',
  });
}

// API đặc biệt
export async function getDangKyByCauLacBoId(caulacboId: number) {
  return request(`${BASE_URL}/dangky?caulacboId=${caulacboId}`, {
    method: 'GET',
  });
}

export async function getDangKyBySinhVien(sinhVienId: string) {
  return request(`${BASE_URL}/dangky?sinhVienId=${sinhVienId}`, {
    method: 'GET',
  });
} 