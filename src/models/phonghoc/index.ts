import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PhongHoc, PhongHocState, LoaiPhong, NguoiPhuTrach } from './data.d';

const LOCAL_STORAGE_KEY = 'phonghoc-data';
const NGUOI_PHU_TRACH_KEY = 'nguoiphutrach-data';

export interface PhongHocModelType {
  namespace: 'phonghoc';
  state: PhongHocState;
  effects: {
    fetch: Effect;
    add: Effect;
    update: Effect;
    remove: Effect;
    fetchNguoiPhuTrach: Effect;
  };
  reducers: {
    save: Reducer<PhongHocState>;
  };
}

// Khởi tạo danh sách người phụ trách mẫu nếu chưa có
const initializeNguoiPhuTrach = (): NguoiPhuTrach[] => {
  const existingData = localStorage.getItem(NGUOI_PHU_TRACH_KEY);
  if (existingData) {
    return JSON.parse(existingData);
  }
  
  // Dữ liệu mẫu ban đầu
  const initialData: NguoiPhuTrach[] = [
    { id: uuidv4(), ten: 'Nguyễn Văn A' },
    { id: uuidv4(), ten: 'Trần Thị B' },
    { id: uuidv4(), ten: 'Lê Văn C' },
    { id: uuidv4(), ten: 'Phạm Thị D' },
    { id: uuidv4(), ten: 'Hoàng Văn E' },
  ];
  
  localStorage.setItem(NGUOI_PHU_TRACH_KEY, JSON.stringify(initialData));
  return initialData;
};

// Khởi tạo danh sách phòng học mẫu nếu chưa có
const initializePhongHoc = (): PhongHoc[] => {
  const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (existingData) {
    return JSON.parse(existingData);
  }
  
  // Dữ liệu mẫu ban đầu
  const initialData: PhongHoc[] = [
    {
      id: uuidv4(),
      maPhong: 'P001',
      tenPhong: 'Phòng học 101',
      soChoNgoi: 50,
      loaiPhong: LoaiPhong.LyThuyet,
      nguoiPhuTrach: 'Nguyễn Văn A',
    },
    {
      id: uuidv4(),
      maPhong: 'P002',
      tenPhong: 'Phòng thực hành 202',
      soChoNgoi: 25,
      loaiPhong: LoaiPhong.ThucHanh,
      nguoiPhuTrach: 'Trần Thị B',
    },
    {
      id: uuidv4(),
      maPhong: 'P003',
      tenPhong: 'Hội trường A',
      soChoNgoi: 150,
      loaiPhong: LoaiPhong.HoiTruong,
      nguoiPhuTrach: 'Lê Văn C',
    },
  ];
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

const PhongHocModel: PhongHocModelType = {
  namespace: 'phonghoc',

  state: {
    list: [],
    total: 0,
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } });
      try {
        const data = initializePhongHoc();
        yield put({
          type: 'save',
          payload: {
            list: data,
            total: data.length,
            loading: false,
          },
        });
      } catch (error) {
        yield put({ type: 'save', payload: { loading: false } });
        message.error('Không thể tải danh sách phòng học');
      }
    },

    *fetchNguoiPhuTrach(_, { call }) {
      try {
        return initializeNguoiPhuTrach();
      } catch (error) {
        message.error('Không thể tải danh sách người phụ trách');
        return [];
      }
    },

    *add({ payload }, { call, put }) {
      try {
        // Kiểm tra trùng mã phòng và tên phòng
        const existingData = initializePhongHoc();
        const isMaPhongExists = existingData.some(item => item.maPhong === payload.maPhong);
        const isTenPhongExists = existingData.some(item => item.tenPhong === payload.tenPhong);

        if (isMaPhongExists) {
          message.error('Mã phòng đã tồn tại!');
          return false;
        }

        if (isTenPhongExists) {
          message.error('Tên phòng đã tồn tại!');
          return false;
        }

        // Thêm id mới
        const newItem = {
          ...payload,
          id: uuidv4(),
        };

        // Lưu vào localStorage
        const newData = [...existingData, newItem];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetch' });
        message.success('Thêm phòng học thành công!');
        return true;
      } catch (error) {
        message.error('Thêm phòng học thất bại!');
        return false;
      }
    },

    *update({ payload }, { call, put }) {
      try {
        const { id, ...data } = payload;
        const existingData = initializePhongHoc();
        
        // Kiểm tra trùng mã phòng và tên phòng (trừ chính phòng đang cập nhật)
        const isMaPhongExists = existingData.some(
          item => item.maPhong === data.maPhong && item.id !== id
        );
        const isTenPhongExists = existingData.some(
          item => item.tenPhong === data.tenPhong && item.id !== id
        );

        if (isMaPhongExists) {
          message.error('Mã phòng đã tồn tại!');
          return false;
        }

        if (isTenPhongExists) {
          message.error('Tên phòng đã tồn tại!');
          return false;
        }

        // Cập nhật dữ liệu
        const newData = existingData.map(item => {
          if (item.id === id) {
            return { ...item, ...data };
          }
          return item;
        });

        // Lưu vào localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetch' });
        message.success('Cập nhật phòng học thành công!');
        return true;
      } catch (error) {
        message.error('Cập nhật phòng học thất bại!');
        return false;
      }
    },

    *remove({ payload }, { call, put }) {
      try {
        const { id } = payload;
        const existingData = initializePhongHoc();
        
        // Tìm phòng cần xóa
        const phongCanXoa = existingData.find(item => item.id === id);
        if (!phongCanXoa) {
          message.error('Không tìm thấy phòng học cần xóa!');
          return false;
        }

        // Kiểm tra điều kiện xóa: số chỗ ngồi < 30
        if (phongCanXoa.soChoNgoi >= 30) {
          message.error('Chỉ được phép xóa phòng có số chỗ ngồi dưới 30!');
          return false;
        }

        // Xóa phòng
        const newData = existingData.filter(item => item.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetch' });
        message.success('Xóa phòng học thành công!');
        return true;
      } catch (error) {
        message.error('Xóa phòng học thất bại!');
        return false;
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default PhongHocModel; 