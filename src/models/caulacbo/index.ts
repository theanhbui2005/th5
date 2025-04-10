import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { CauLacBo, CauLacBoState, DangKyThanhVien, TrangThaiDangKy, GioiTinh, LichSuThaoTac } from './data.d';
import * as API from '@/services/caulacbo/api';

// Không cần các key localStorage nữa vì sẽ lưu dữ liệu trên server
// const CLB_LOCAL_STORAGE_KEY = 'caulacbo-data';
// const DANGKY_LOCAL_STORAGE_KEY = 'dangky-data';
// const LICHSU_LOCAL_STORAGE_KEY = 'lichsu-data';

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
        const data = yield call(API.getCauLacBoList);
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
        // Lấy danh sách để kiểm tra trùng tên
        const existingData = yield call(API.getCauLacBoList);
        const isTenExists = existingData.some(item => item.ten === payload.ten);

        if (isTenExists) {
          message.error('Tên câu lạc bộ đã tồn tại!');
          return false;
        }

        // Thêm id mới
        const newItem = {
          ...payload,
          id: uuidv4(), // Hoặc để server tự sinh id
        };

        // Gọi API để thêm mới
        yield call(API.createCauLacBo, newItem);
        
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
        
        // Lấy danh sách để kiểm tra trùng tên
        const existingData = yield call(API.getCauLacBoList);
        
        // Kiểm tra trùng tên (trừ chính CLB đang cập nhật)
        const isTenExists = existingData.some(
          item => item.ten === data.ten && item.id !== id
        );

        if (isTenExists) {
          message.error('Tên câu lạc bộ đã tồn tại!');
          return false;
        }

        // Gọi API để cập nhật
        yield call(API.updateCauLacBo, id, { id, ...data });
        
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
        
        // Kiểm tra xem có đơn đăng ký nào thuộc CLB này không
        const danhSachDangKy = yield call(API.getDangKyByCauLacBoId, id);
        
        if (danhSachDangKy && danhSachDangKy.length > 0) {
          message.error('Không thể xóa! Câu lạc bộ này đã có đơn đăng ký.');
          return false;
        }

        // Gọi API để xóa
        yield call(API.deleteCauLacBo, id);
        
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
        const data = yield call(API.getDangKyList);
        yield put({
          type: 'save',
          payload: {
            danhSachDangKy: data,
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
        // Thêm thông tin
        const cauLacBo = yield call(API.getCauLacBoById, payload.cauLacBoId);
        
        const newItem = {
          ...payload,
          id: uuidv4(),
          cauLacBoTen: cauLacBo.ten,
          trangThai: TrangThaiDangKy.Pending,
          ngayDangKy: new Date().toISOString().slice(0, 10),
        };

        // Gọi API để thêm mới
        yield call(API.createDangKy, newItem);
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        message.success('Đăng ký thành công! Đơn của bạn đang chờ duyệt.');
        return true;
      } catch (error) {
        message.error('Đăng ký thất bại!');
        return false;
      }
    },

    *updateDangKy({ payload }, { call, put }) {
      try {
        const { id, ...data } = payload;
        
        // Lấy thông tin hiện tại
        const currentDangKy = yield call(API.getDangKyById, id);
        
        // Cập nhật tên CLB nếu thay đổi CLB
        let cauLacBoTen = currentDangKy.cauLacBoTen;
        
        if (data.cauLacBoId && data.cauLacBoId !== currentDangKy.cauLacBoId) {
          const cauLacBo = yield call(API.getCauLacBoById, data.cauLacBoId);
          cauLacBoTen = cauLacBo.ten;
        }
        
        // Tạo item cập nhật
        const updatedItem = {
          ...currentDangKy,
          ...data,
          cauLacBoTen,
          ngayCapNhat: new Date().toISOString().slice(0, 10),
        };
        
        // Gọi API để cập nhật
        yield call(API.updateDangKy, id, updatedItem);
        
        // Thêm lịch sử
        const lichSu = {
          id: uuidv4(),
          dangKyId: id,
          hoTen: updatedItem.hoTen,
          trangThaiCu: currentDangKy.trangThai,
          trangThaiMoi: updatedItem.trangThai,
          ghiChu: 'Cập nhật thông tin đơn đăng ký',
          nguoiThucHien: 'Admin',
          thoiGian: new Date().toISOString(),
        };
        
        // Gọi API để lưu lịch sử (giả định có API này)
        // yield call(API.createLichSu, lichSu);
        
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
        
        // Gọi API để xóa
        yield call(API.deleteDangKy, id);
        
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
      // Trong phiên bản hiện tại, lịch sử có thể lưu trữ trực tiếp trong state
      // Nếu có API riêng, bạn có thể gọi tương tự như các API khác
      
      // const lichSuThaoTac = yield call(API.getLichSuList);
      // yield put({
      //   type: 'save',
      //   payload: {
      //     lichSuThaoTac,
      //   },
      // });
    },

    *duyetDangKy({ payload }, { call, put }) {
      try {
        const { id, ghiChu } = payload;
        
        // Lấy thông tin hiện tại
        const currentDangKy = yield call(API.getDangKyById, id);
        
        if (currentDangKy.trangThai === TrangThaiDangKy.Approved) {
          message.error('Đơn đăng ký này đã được duyệt!');
          return false;
        }
        
        // Cập nhật trạng thái
        const updatedDangKy = {
          ...currentDangKy,
          trangThai: TrangThaiDangKy.Approved,
          ghiChu: ghiChu,
          ngayCapNhat: new Date().toISOString().slice(0, 10),
        };
        
        // Gọi API để cập nhật
        yield call(API.updateDangKy, id, updatedDangKy);
        
        // Thêm lịch sử
        const lichSu = {
          id: uuidv4(),
          dangKyId: id,
          hoTen: currentDangKy.hoTen,
          trangThaiCu: currentDangKy.trangThai,
          trangThaiMoi: TrangThaiDangKy.Approved,
          ghiChu: ghiChu || 'Đã duyệt đơn đăng ký',
          nguoiThucHien: 'Admin',
          thoiGian: new Date().toISOString(),
        };
        
        // Giả sử có API để lưu lịch sử
        // yield call(API.createLichSu, lichSu);
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        message.success('Đã duyệt đơn đăng ký thành công!');
        return true;
      } catch (error) {
        message.error('Duyệt đơn đăng ký thất bại!');
        return false;
      }
    },

    *tuChoiDangKy({ payload }, { call, put }) {
      try {
        const { id, ghiChu } = payload;
        
        if (!ghiChu) {
          message.error('Vui lòng nhập lý do từ chối!');
          return false;
        }
        
        // Lấy thông tin hiện tại
        const currentDangKy = yield call(API.getDangKyById, id);
        
        if (currentDangKy.trangThai === TrangThaiDangKy.Rejected) {
          message.error('Đơn đăng ký này đã bị từ chối!');
          return false;
        }
        
        // Cập nhật trạng thái
        const updatedDangKy = {
          ...currentDangKy,
          trangThai: TrangThaiDangKy.Rejected,
          ghiChu: ghiChu,
          ngayCapNhat: new Date().toISOString().slice(0, 10),
        };
        
        // Gọi API để cập nhật
        yield call(API.updateDangKy, id, updatedDangKy);
        
        // Thêm lịch sử
        const lichSu = {
          id: uuidv4(),
          dangKyId: id,
          hoTen: currentDangKy.hoTen,
          trangThaiCu: currentDangKy.trangThai,
          trangThaiMoi: TrangThaiDangKy.Rejected,
          ghiChu: ghiChu,
          nguoiThucHien: 'Admin',
          thoiGian: new Date().toISOString(),
        };
        
        // Giả sử có API để lưu lịch sử
        // yield call(API.createLichSu, lichSu);
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        message.success('Đã từ chối đơn đăng ký!');
        return true;
      } catch (error) {
        message.error('Từ chối đơn đăng ký thất bại!');
        return false;
      }
    },

    *duyetNhieuDangKy({ payload }, { call, put }) {
      try {
        const { ids, ghiChu } = payload;
        
        // Kiểm tra danh sách ID
        if (!ids || !ids.length) {
          message.error('Không có đơn đăng ký nào được chọn!');
          return false;
        }
        
        // Xử lý từng đơn đăng ký
        for (const id of ids) {
          // Lấy thông tin hiện tại
          const currentDangKy = yield call(API.getDangKyById, id);
          
          if (currentDangKy.trangThai !== TrangThaiDangKy.Approved) {
            // Cập nhật trạng thái
            const updatedDangKy = {
              ...currentDangKy,
              trangThai: TrangThaiDangKy.Approved,
              ghiChu: ghiChu,
              ngayCapNhat: new Date().toISOString().slice(0, 10),
            };
            
            // Gọi API để cập nhật
            yield call(API.updateDangKy, id, updatedDangKy);
            
            // Thêm lịch sử
            const lichSu = {
              id: uuidv4(),
              dangKyId: id,
              hoTen: currentDangKy.hoTen,
              trangThaiCu: currentDangKy.trangThai,
              trangThaiMoi: TrangThaiDangKy.Approved,
              ghiChu: ghiChu || 'Đã duyệt đơn đăng ký (hàng loạt)',
              nguoiThucHien: 'Admin',
              thoiGian: new Date().toISOString(),
            };
            
            // Giả sử có API để lưu lịch sử
            // yield call(API.createLichSu, lichSu);
          }
        }
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        message.success(`Đã duyệt ${ids.length} đơn đăng ký thành công!`);
        return true;
      } catch (error) {
        message.error('Duyệt đơn đăng ký hàng loạt thất bại!');
        return false;
      }
    },

    *tuChoiNhieuDangKy({ payload }, { call, put }) {
      try {
        const { ids, ghiChu } = payload;
        
        // Kiểm tra danh sách ID
        if (!ids || !ids.length) {
          message.error('Không có đơn đăng ký nào được chọn!');
          return false;
        }
        
        if (!ghiChu) {
          message.error('Vui lòng nhập lý do từ chối!');
          return false;
        }
        
        // Xử lý từng đơn đăng ký
        for (const id of ids) {
          // Lấy thông tin hiện tại
          const currentDangKy = yield call(API.getDangKyById, id);
          
          if (currentDangKy.trangThai !== TrangThaiDangKy.Rejected) {
            // Cập nhật trạng thái
            const updatedDangKy = {
              ...currentDangKy,
              trangThai: TrangThaiDangKy.Rejected,
              ghiChu: ghiChu,
              ngayCapNhat: new Date().toISOString().slice(0, 10),
            };
            
            // Gọi API để cập nhật
            yield call(API.updateDangKy, id, updatedDangKy);
            
            // Thêm lịch sử
            const lichSu = {
              id: uuidv4(),
              dangKyId: id,
              hoTen: currentDangKy.hoTen,
              trangThaiCu: currentDangKy.trangThai,
              trangThaiMoi: TrangThaiDangKy.Rejected,
              ghiChu: ghiChu || 'Đã từ chối đơn đăng ký (hàng loạt)',
              nguoiThucHien: 'Admin',
              thoiGian: new Date().toISOString(),
            };
            
            // Giả sử có API để lưu lịch sử
            // yield call(API.createLichSu, lichSu);
          }
        }
        
        // Cập nhật state
        yield put({ type: 'fetchDangKy' });
        yield put({ type: 'fetchLichSu' });
        message.success(`Đã từ chối ${ids.length} đơn đăng ký!`);
        return true;
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