import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { CauLacBo, CauLacBoState, DangKyThanhVien, TrangThaiDangKy, GioiTinh, LichSuThaoTac } from './data.d';

const CLB_LOCAL_STORAGE_KEY = 'caulacbo-data';
const DANGKY_LOCAL_STORAGE_KEY = 'dangky-data';
const LICHSU_LOCAL_STORAGE_KEY = 'lichsu-data';

export interface CauLacBoModelType {
  namespace: 'caulacbo';
  state: CauLacBoState;
  effects: {
    fetchCLB: Effect;
    addCLB: Effect;
    updateCLB: Effect;
    removeCLB: Effect;
    fetchDangKy: Effect;
    addDangKy: Effect;
    updateDangKy: Effect;
    removeDangKy: Effect;
    duyetDangKy: Effect;
    tuChoiDangKy: Effect;
    duyetNhieuDangKy: Effect;
    tuChoiNhieuDangKy: Effect;
    fetchLichSu: Effect;
  };
  reducers: {
    save: Reducer<CauLacBoState>;
  };
}

// Khởi tạo danh sách câu lạc bộ mẫu nếu chưa có
const initializeCLB = (): CauLacBo[] => {
  const existingData = localStorage.getItem(CLB_LOCAL_STORAGE_KEY);
  if (existingData) {
    return JSON.parse(existingData);
  }
  
  // Dữ liệu mẫu ban đầu
  const initialData: CauLacBo[] = [
    {
      id: uuidv4(),
      ten: 'Arsenal FC',
      moTa: 'Câu lạc bộ bóng đá Arsenal, một trong những đội bóng lâu đời và thành công nhất nước Anh',
      chuNhiem: 'Mikel Arteta',
      ngayThanhLap: '1886-10-01',
      soDienThoai: '0987654321',
      email: 'arsenal@example.com',
      trangThai: true,
    },
    {
      id: uuidv4(),
      ten: 'Liverpool FC',
      moTa: 'Câu lạc bộ bóng đá Liverpool, đội bóng nổi tiếng với lịch sử vẻ vang và Anfield huyền thoại',
      chuNhiem: 'Jurgen Klopp',
      ngayThanhLap: '1892-06-03',
      soDienThoai: '0912345678',
      email: 'liverpool@example.com',
      trangThai: true,
    },
    {
      id: uuidv4(),
      ten: 'Manchester United FC',
      moTa: 'Câu lạc bộ bóng đá Manchester United, đội bóng thành công nhất nước Anh với Old Trafford "Nhà hát của những giấc mơ"',
      chuNhiem: 'Erik ten Hag',
      ngayThanhLap: '1878-03-05',
      soDienThoai: '0976543210',
      email: 'manutd@example.com',
      trangThai: true,
    },
  ];
  
  localStorage.setItem(CLB_LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Khởi tạo danh sách đơn đăng ký thành viên mẫu nếu chưa có
const initializeDangKy = (): DangKyThanhVien[] => {
  const existingData = localStorage.getItem(DANGKY_LOCAL_STORAGE_KEY);
  if (existingData) {
    return JSON.parse(existingData);
  }
  
  // Tạo dữ liệu mẫu ban đầu
  const danhSachCLB = initializeCLB();
  const initialData: DangKyThanhVien[] = [
    {
      id: uuidv4(),
      hoTen: 'Nguyễn Văn X',
      email: 'nguyenvanx@example.com',
      soDienThoai: '0912345678',
      gioiTinh: GioiTinh.Nam,
      diaChi: 'Hà Nội',
      soTruong: 'Tiền đạo, sút phạt',
      cauLacBoId: danhSachCLB[0].id,
      cauLacBoTen: danhSachCLB[0].ten,
      lyDoDangKy: 'Là fan Arsenal từ nhỏ, mong muốn được khoác áo đội bóng yêu thích',
      trangThai: TrangThaiDangKy.Pending,
      ngayDangKy: '2023-05-10',
    },
    {
      id: uuidv4(),
      hoTen: 'Trần Thị Y',
      email: 'tranthiy@example.com',
      soDienThoai: '0987654321',
      gioiTinh: GioiTinh.Nu,
      diaChi: 'Hồ Chí Minh',
      soTruong: 'Tiền vệ, kiến tạo',
      cauLacBoId: danhSachCLB[1].id,
      cauLacBoTen: danhSachCLB[1].ten,
      lyDoDangKy: 'Yêu Liverpool từ nhỏ, luôn mơ ước được đứng trên sân Anfield và cất tiếng hát "You\'ll Never Walk Alone"',
      trangThai: TrangThaiDangKy.Approved,
      ngayDangKy: '2023-06-15',
      ngayCapNhat: '2023-06-20',
    },
    {
      id: uuidv4(),
      hoTen: 'Lê Văn Z',
      email: 'levanz@example.com',
      soDienThoai: '0976543210',
      gioiTinh: GioiTinh.Nam,
      diaChi: 'Đà Nẵng',
      soTruong: 'Hậu vệ, tranh chấp',
      cauLacBoId: danhSachCLB[2].id,
      cauLacBoTen: danhSachCLB[2].ten,
      lyDoDangKy: 'Fan cuồng của Manchester United, mong muốn được tham gia đội bóng và góp phần vào sự trở lại của Quỷ Đỏ',
      trangThai: TrangThaiDangKy.Rejected,
      ghiChu: 'Lịch tập không phù hợp với lịch học',
      ngayDangKy: '2023-07-05',
      ngayCapNhat: '2023-07-10',
    },
  ];
  
  localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Khởi tạo danh sách lịch sử thao tác
const initializeLichSu = (): LichSuThaoTac[] => {
  const existingData = localStorage.getItem(LICHSU_LOCAL_STORAGE_KEY);
  if (existingData) {
    return JSON.parse(existingData);
  }
  
  // Dữ liệu mẫu ban đầu
  const initialData: LichSuThaoTac[] = [];
  
  localStorage.setItem(LICHSU_LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Lưu lịch sử thao tác
const saveLichSu = (lichSu: LichSuThaoTac) => {
  const existingData = initializeLichSu();
  const newData = [...existingData, lichSu];
  localStorage.setItem(LICHSU_LOCAL_STORAGE_KEY, JSON.stringify(newData));
  return newData;
};

const CauLacBoModel: CauLacBoModelType = {
  namespace: 'caulacbo',

  state: {
    danhSachCLB: [],
    danhSachDangKy: [],
    lichSuThaoTac: [],
    total: 0,
    loading: false,
  },

  effects: {
    *fetchCLB({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } });
      try {
        const data = initializeCLB();
        yield put({
          type: 'save',
          payload: {
            danhSachCLB: data,
            loading: false,
          },
        });
      } catch (error) {
        yield put({ type: 'save', payload: { loading: false } });
        message.error('Không thể tải danh sách câu lạc bộ');
      }
    },

    *addCLB({ payload }, { call, put }) {
      try {
        // Kiểm tra trùng tên
        const existingData = initializeCLB();
        const isTenExists = existingData.some(item => item.ten === payload.ten);

        if (isTenExists) {
          message.error('Tên câu lạc bộ đã tồn tại!');
          return false;
        }

        // Thêm id mới
        const newItem = {
          ...payload,
          id: uuidv4(),
        };

        // Lưu vào localStorage
        const newData = [...existingData, newItem];
        localStorage.setItem(CLB_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchCLB' });
        message.success('Thêm câu lạc bộ thành công!');
        return true;
      } catch (error) {
        message.error('Thêm câu lạc bộ thất bại!');
        return false;
      }
    },

    *updateCLB({ payload }, { call, put }) {
      try {
        const { id, ...data } = payload;
        const existingData = initializeCLB();
        
        // Kiểm tra trùng tên (trừ chính CLB đang cập nhật)
        const isTenExists = existingData.some(
          item => item.ten === data.ten && item.id !== id
        );

        if (isTenExists) {
          message.error('Tên câu lạc bộ đã tồn tại!');
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
        localStorage.setItem(CLB_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchCLB' });
        message.success('Cập nhật câu lạc bộ thành công!');
        return true;
      } catch (error) {
        message.error('Cập nhật câu lạc bộ thất bại!');
        return false;
      }
    },

    *removeCLB({ payload }, { call, put }) {
      try {
        const { id } = payload;
        const existingData = initializeCLB();
        
        // Tìm CLB cần xóa
        const clbCanXoa = existingData.find(item => item.id === id);
        if (!clbCanXoa) {
          message.error('Không tìm thấy câu lạc bộ cần xóa!');
          return false;
        }

        // Kiểm tra xem có đơn đăng ký nào liên quan không
        const danhSachDangKy = initializeDangKy();
        const hasDangKy = danhSachDangKy.some(item => item.cauLacBoId === id);
        if (hasDangKy) {
          message.error('Không thể xóa câu lạc bộ này vì có đơn đăng ký liên quan!');
          return false;
        }

        // Xóa CLB
        const newData = existingData.filter(item => item.id !== id);
        localStorage.setItem(CLB_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchCLB' });
        message.success('Xóa câu lạc bộ thành công!');
        return true;
      } catch (error) {
        message.error('Xóa câu lạc bộ thất bại!');
        return false;
      }
    },

    *fetchDangKy({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } });
      try {
        const data = initializeDangKy();
        yield put({
          type: 'save',
          payload: {
            danhSachDangKy: data,
            total: data.length,
            loading: false,
          },
        });
      } catch (error) {
        yield put({ type: 'save', payload: { loading: false } });
        message.error('Không thể tải danh sách đơn đăng ký');
      }
    },

    *addDangKy({ payload }, { call, put }) {
      try {
        const existingData = initializeDangKy();
        
        // Tìm thông tin câu lạc bộ
        const danhSachCLB = initializeCLB();
        const cauLacBo = danhSachCLB.find(clb => clb.id === payload.cauLacBoId);
        
        if (!cauLacBo) {
          message.error('Câu lạc bộ không tồn tại!');
          return false;
        }

        // Thêm id mới và thông tin bổ sung
        const newItem = {
          ...payload,
          id: uuidv4(),
          cauLacBoTen: cauLacBo.ten,
          ngayDangKy: new Date().toISOString().split('T')[0],
          trangThai: TrangThaiDangKy.Pending,
        };

        // Lưu vào localStorage
        const newData = [...existingData, newItem];
        localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        message.success('Thêm đơn đăng ký thành công!');
        return true;
      } catch (error) {
        message.error('Thêm đơn đăng ký thất bại!');
        return false;
      }
    },

    *updateDangKy({ payload }, { call, put }) {
      try {
        const { id, ...data } = payload;
        const existingData = initializeDangKy();
        
        // Tìm đơn đăng ký cần cập nhật
        const dangKyHienTai = existingData.find(item => item.id === id);
        if (!dangKyHienTai) {
          message.error('Không tìm thấy đơn đăng ký cần cập nhật!');
          return false;
        }

        // Nếu câu lạc bộ thay đổi, cập nhật tên câu lạc bộ
        let cauLacBoTen = dangKyHienTai.cauLacBoTen;
        if (data.cauLacBoId && data.cauLacBoId !== dangKyHienTai.cauLacBoId) {
          const danhSachCLB = initializeCLB();
          const cauLacBo = danhSachCLB.find(clb => clb.id === data.cauLacBoId);
          if (!cauLacBo) {
            message.error('Câu lạc bộ không tồn tại!');
            return false;
          }
          cauLacBoTen = cauLacBo.ten;
        }

        // Cập nhật dữ liệu
        const updatedItem = {
          ...dangKyHienTai,
          ...data,
          cauLacBoTen,
          ngayCapNhat: new Date().toISOString().split('T')[0],
        };

        const newData = existingData.map(item => {
          if (item.id === id) {
            return updatedItem;
          }
          return item;
        });

        // Lưu vào localStorage
        localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        message.success('Cập nhật đơn đăng ký thành công!');
        return true;
      } catch (error) {
        message.error('Cập nhật đơn đăng ký thất bại!');
        return false;
      }
    },

    *removeDangKy({ payload }, { call, put }) {
      try {
        const { id } = payload;
        const existingData = initializeDangKy();
        
        // Tìm đơn đăng ký cần xóa
        const dangKyCanXoa = existingData.find(item => item.id === id);
        if (!dangKyCanXoa) {
          message.error('Không tìm thấy đơn đăng ký cần xóa!');
          return false;
        }

        // Xóa đơn đăng ký
        const newData = existingData.filter(item => item.id !== id);
        localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        message.success('Xóa đơn đăng ký thành công!');
        return true;
      } catch (error) {
        message.error('Xóa đơn đăng ký thất bại!');
        return false;
      }
    },

    *fetchLichSu({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } });
      try {
        const data = initializeLichSu();
        yield put({
          type: 'save',
          payload: {
            lichSuThaoTac: data,
            loading: false,
          },
        });
      } catch (error) {
        yield put({ type: 'save', payload: { loading: false } });
        message.error('Không thể tải lịch sử thao tác');
      }
    },

    *duyetDangKy({ payload }, { call, put }) {
      try {
        const { id, ghiChu } = payload;
        const existingData = initializeDangKy();
        
        // Tìm đơn đăng ký cần duyệt
        const dangKyHienTai = existingData.find(item => item.id === id);
        if (!dangKyHienTai) {
          message.error('Không tìm thấy đơn đăng ký cần duyệt!');
          return false;
        }

        // Nếu đơn đăng ký đã được duyệt hoặc từ chối
        if (dangKyHienTai.trangThai !== TrangThaiDangKy.Pending) {
          message.error('Đơn đăng ký này đã được xử lý trước đó!');
          return false;
        }

        // Cập nhật trạng thái đơn đăng ký
        const updatedItem = {
          ...dangKyHienTai,
          trangThai: TrangThaiDangKy.Approved,
          ngayCapNhat: new Date().toISOString().split('T')[0],
        };

        // Lưu lịch sử
        const lichSu: LichSuThaoTac = {
          id: uuidv4(),
          dangKyId: id,
          nguoiThucHien: 'Admin',
          hanhDong: 'Duyệt đơn',
          thoiGian: new Date().toISOString(),
          ghiChu: ghiChu || 'Đã duyệt đơn đăng ký',
        };

        // Thêm vào lịch sử thao tác của đơn
        if (!updatedItem.lichSuThaoTac) {
          updatedItem.lichSuThaoTac = [];
        }
        updatedItem.lichSuThaoTac.push(lichSu);

        // Lưu lịch sử toàn cục
        saveLichSu(lichSu);

        // Cập nhật dữ liệu
        const newData = existingData.map(item => {
          if (item.id === id) {
            return updatedItem;
          }
          return item;
        });

        // Lưu vào localStorage
        localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        message.success('Duyệt đơn đăng ký thành công!');
        return true;
      } catch (error) {
        message.error('Duyệt đơn đăng ký thất bại!');
        return false;
      }
    },

    *tuChoiDangKy({ payload }, { call, put }) {
      try {
        const { id, ghiChu } = payload;
        const existingData = initializeDangKy();
        
        // Tìm đơn đăng ký cần từ chối
        const dangKyHienTai = existingData.find(item => item.id === id);
        if (!dangKyHienTai) {
          message.error('Không tìm thấy đơn đăng ký cần từ chối!');
          return false;
        }

        // Nếu đơn đăng ký đã được duyệt hoặc từ chối
        if (dangKyHienTai.trangThai !== TrangThaiDangKy.Pending) {
          message.error('Đơn đăng ký này đã được xử lý trước đó!');
          return false;
        }

        // Cập nhật trạng thái đơn đăng ký
        const updatedItem = {
          ...dangKyHienTai,
          trangThai: TrangThaiDangKy.Rejected,
          ghiChu: ghiChu || 'Không đủ điều kiện',
          ngayCapNhat: new Date().toISOString().split('T')[0],
        };

        // Lưu lịch sử
        const lichSu: LichSuThaoTac = {
          id: uuidv4(),
          dangKyId: id,
          nguoiThucHien: 'Admin',
          hanhDong: 'Từ chối đơn',
          thoiGian: new Date().toISOString(),
          ghiChu: ghiChu || 'Đã từ chối đơn đăng ký',
        };

        // Thêm vào lịch sử thao tác của đơn
        if (!updatedItem.lichSuThaoTac) {
          updatedItem.lichSuThaoTac = [];
        }
        updatedItem.lichSuThaoTac.push(lichSu);

        // Lưu lịch sử toàn cục
        saveLichSu(lichSu);

        // Cập nhật dữ liệu
        const newData = existingData.map(item => {
          if (item.id === id) {
            return updatedItem;
          }
          return item;
        });

        // Lưu vào localStorage
        localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        message.success('Từ chối đơn đăng ký thành công!');
        return true;
      } catch (error) {
        message.error('Từ chối đơn đăng ký thất bại!');
        return false;
      }
    },

    *duyetNhieuDangKy({ payload }, { call, put }) {
      try {
        const { ids, ghiChu } = payload;
        if (!ids || ids.length === 0) {
          message.error('Không có đơn đăng ký nào được chọn!');
          return false;
        }

        const existingData = initializeDangKy();
        let successCount = 0;
        let failCount = 0;
        const newData = [...existingData];
        
        for (const id of ids) {
          // Tìm đơn đăng ký cần duyệt
          const index = newData.findIndex(item => item.id === id);
          if (index === -1) {
            failCount++;
            continue;
          }

          const dangKyHienTai = newData[index];

          // Nếu đơn đăng ký đã được duyệt hoặc từ chối
          if (dangKyHienTai.trangThai !== TrangThaiDangKy.Pending) {
            failCount++;
            continue;
          }

          // Cập nhật trạng thái đơn đăng ký
          const updatedItem = {
            ...dangKyHienTai,
            trangThai: TrangThaiDangKy.Approved,
            ngayCapNhat: new Date().toISOString().split('T')[0],
          };

          // Lưu lịch sử
          const lichSu: LichSuThaoTac = {
            id: uuidv4(),
            dangKyId: id,
            nguoiThucHien: 'Admin',
            hanhDong: 'Duyệt đơn (hàng loạt)',
            thoiGian: new Date().toISOString(),
            ghiChu: ghiChu || 'Đã duyệt đơn đăng ký',
          };

          // Thêm vào lịch sử thao tác của đơn
          if (!updatedItem.lichSuThaoTac) {
            updatedItem.lichSuThaoTac = [];
          }
          updatedItem.lichSuThaoTac.push(lichSu);

          // Lưu lịch sử toàn cục
          saveLichSu(lichSu);

          // Cập nhật dữ liệu
          newData[index] = updatedItem;
          successCount++;
        }

        // Lưu vào localStorage
        localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        
        if (successCount > 0) {
          message.success(`Đã duyệt thành công ${successCount} đơn đăng ký.`);
        }
        if (failCount > 0) {
          message.warning(`Có ${failCount} đơn không thể duyệt.`);
        }
        return successCount > 0;
      } catch (error) {
        message.error('Duyệt đơn đăng ký hàng loạt thất bại!');
        return false;
      }
    },

    *tuChoiNhieuDangKy({ payload }, { call, put }) {
      try {
        const { ids, ghiChu } = payload;
        if (!ids || ids.length === 0) {
          message.error('Không có đơn đăng ký nào được chọn!');
          return false;
        }

        const existingData = initializeDangKy();
        let successCount = 0;
        let failCount = 0;
        const newData = [...existingData];
        
        for (const id of ids) {
          // Tìm đơn đăng ký cần từ chối
          const index = newData.findIndex(item => item.id === id);
          if (index === -1) {
            failCount++;
            continue;
          }

          const dangKyHienTai = newData[index];

          // Nếu đơn đăng ký đã được duyệt hoặc từ chối
          if (dangKyHienTai.trangThai !== TrangThaiDangKy.Pending) {
            failCount++;
            continue;
          }

          // Cập nhật trạng thái đơn đăng ký
          const updatedItem = {
            ...dangKyHienTai,
            trangThai: TrangThaiDangKy.Rejected,
            ghiChu: ghiChu || 'Không đủ điều kiện',
            ngayCapNhat: new Date().toISOString().split('T')[0],
          };

          // Lưu lịch sử
          const lichSu: LichSuThaoTac = {
            id: uuidv4(),
            dangKyId: id,
            nguoiThucHien: 'Admin',
            hanhDong: 'Từ chối đơn (hàng loạt)',
            thoiGian: new Date().toISOString(),
            ghiChu: ghiChu || 'Đã từ chối đơn đăng ký',
          };

          // Thêm vào lịch sử thao tác của đơn
          if (!updatedItem.lichSuThaoTac) {
            updatedItem.lichSuThaoTac = [];
          }
          updatedItem.lichSuThaoTac.push(lichSu);

          // Lưu lịch sử toàn cục
          saveLichSu(lichSu);

          // Cập nhật dữ liệu
          newData[index] = updatedItem;
          successCount++;
        }

        // Lưu vào localStorage
        localStorage.setItem(DANGKY_LOCAL_STORAGE_KEY, JSON.stringify(newData));
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        
        if (successCount > 0) {
          message.success(`Đã từ chối thành công ${successCount} đơn đăng ký.`);
        }
        if (failCount > 0) {
          message.warning(`Có ${failCount} đơn không thể từ chối.`);
        }
        return successCount > 0;
      } catch (error) {
        message.error('Từ chối đơn đăng ký hàng loạt thất bại!');
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

export default CauLacBoModel; 