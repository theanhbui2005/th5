# Hướng dẫn sử dụng JSON Server

## Giới thiệu
Dự án này sử dụng JSON Server để làm REST API giả lập, cho phép lưu trữ và quản lý dữ liệu câu lạc bộ và đơn đăng ký.

## Cài đặt
Có hai cách để sử dụng JSON Server:

### Cách 1: Cài đặt globally
```
npm install -g json-server
```

Sau đó chạy server bằng lệnh:
```
json-server --watch db.json --port 3000
```

### Cách 2: Sử dụng file cấu hình db-server.json
```
npm install
npm start
```

## Cấu trúc dữ liệu
File `db.json` chứa các collection sau:

- `caulacbo`: Danh sách câu lạc bộ
- `dangky`: Danh sách đơn đăng ký
- `sinhvien`: Danh sách sinh viên

## API Endpoints

### Câu lạc bộ
- `GET /caulacbo`: Lấy danh sách câu lạc bộ
- `GET /caulacbo/:id`: Lấy thông tin 1 câu lạc bộ theo ID
- `POST /caulacbo`: Tạo câu lạc bộ mới
- `PUT /caulacbo/:id`: Cập nhật thông tin câu lạc bộ
- `DELETE /caulacbo/:id`: Xóa câu lạc bộ

### Đơn đăng ký
- `GET /dangky`: Lấy danh sách đơn đăng ký
- `GET /dangky/:id`: Lấy thông tin 1 đơn đăng ký theo ID
- `POST /dangky`: Tạo đơn đăng ký mới
- `PUT /dangky/:id`: Cập nhật thông tin đơn đăng ký
- `DELETE /dangky/:id`: Xóa đơn đăng ký
- `GET /dangky?caulacboId=:id`: Lấy đơn đăng ký theo ID câu lạc bộ
- `GET /dangky?sinhVienId=:id`: Lấy đơn đăng ký theo ID sinh viên

### Sinh viên
- `GET /sinhvien`: Lấy danh sách sinh viên
- `GET /sinhvien/:id`: Lấy thông tin 1 sinh viên theo ID

## Lưu ý
- Dữ liệu sẽ được lưu trữ trong file `db.json`
- Mọi thay đổi đều được tự động lưu vào file này
- Server chạy ở địa chỉ http://localhost:3000 