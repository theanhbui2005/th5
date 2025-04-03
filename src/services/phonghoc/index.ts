import { request } from 'umi';
import { PhongHoc } from '../../models/phonghoc/data.d';


export async function queryPhongHoc(): Promise<PhongHoc[]> {
  const data = localStorage.getItem('phonghoc-data');
  return data ? JSON.parse(data) : [];
}

export async function addPhongHoc(params: Omit<PhongHoc, 'id'>): Promise<boolean> {
  return true;
}

export async function updatePhongHoc(params: PhongHoc): Promise<boolean> {
  return true;
}

export async function removePhongHoc(id: string): Promise<boolean> {
  return true;
} 