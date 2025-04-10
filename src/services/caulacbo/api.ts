import { request } from 'umi';

// URL cơ sở của json-server
const BASE_URL = 'http://localhost:3000';

// API cho câu lạc bộ (clubs)
export async function getClubList() {
  return request(`${BASE_URL}/clubs`, {
    method: 'GET',
  });
}

export async function getClubById(id: string) {
  return request(`${BASE_URL}/clubs/${id}`, {
    method: 'GET',
  });
}

export async function createClub(data: any) {
  return request(`${BASE_URL}/clubs`, {
    method: 'POST',
    data,
  });
}

export async function updateClub(id: string, data: any) {
  return request(`${BASE_URL}/clubs/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteClub(id: string) {
  return request(`${BASE_URL}/clubs/${id}`, {
    method: 'DELETE',
  });
}

// API cho đơn đăng ký (applications)
export async function getApplicationList() {
  return request(`${BASE_URL}/applications`, {
    method: 'GET',
  });
}

export async function getApplicationById(id: string) {
  return request(`${BASE_URL}/applications/${id}`, {
    method: 'GET',
  });
}

export async function createApplication(data: any) {
  return request(`${BASE_URL}/applications`, {
    method: 'POST',
    data,
  });
}

export async function updateApplication(id: string, data: any) {
  return request(`${BASE_URL}/applications/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteApplication(id: string) {
  return request(`${BASE_URL}/applications/${id}`, {
    method: 'DELETE',
  });
}

// API cho sinh viên (students)
export async function getStudentList() {
  return request(`${BASE_URL}/students`, {
    method: 'GET',
  });
}

export async function getStudentById(id: string) {
  return request(`${BASE_URL}/students/${id}`, {
    method: 'GET',
  });
}

// API cho lịch sử thao tác (actionLogs)
export async function getActionLogList() {
  return request(`${BASE_URL}/actionLogs`, {
    method: 'GET',
  });
}

export async function getActionLogById(id: string) {
  return request(`${BASE_URL}/actionLogs/${id}`, {
    method: 'GET',
  });
}

export async function createActionLog(data: any) {
  return request(`${BASE_URL}/actionLogs`, {
    method: 'POST',
    data,
  });
}

// API đặc biệt
export async function getApplicationsByClubId(clubId: string) {
  return request(`${BASE_URL}/applications?clubId=${clubId}`, {
    method: 'GET',
  });
}

export async function getActionLogsByApplicationId(applicationId: string) {
  return request(`${BASE_URL}/actionLogs?applicationId=${applicationId}`, {
    method: 'GET',
  });
}

export async function getApplicationsByStatus(status: string) {
  return request(`${BASE_URL}/applications?status=${status}`, {
    method: 'GET',
  });
} 