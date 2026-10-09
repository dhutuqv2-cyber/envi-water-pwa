# ENVI Water Station

PWA kết nối trực tiếp với máy ENVI trong mạng Wi-Fi nội bộ. Có giám sát, điều khiển, cài đặt, lịch sử và tải CSV.

## Xuất bản

Đưa nội dung thư mục này vào repository GitHub của bạn, nhánh main. Trong Settings > Pages > Build and deployment, chọn GitHub Actions. Workflow Publish ENVI PWA sẽ xuất bản thư mục pwa. Lấy URL chính xác từ kết quả workflow hoặc Settings > Pages.

Không cần Node, máy chủ dữ liệu hay dịch vụ cloud đo lường. Không đưa mã firmware, mật khẩu hay dữ liệu SD vào repository này.

## Cài

Mở link Pages bằng Chrome/Edge hoặc Safari. Đợi thông báo đã lưu giao diện để mở ngoại tuyến.
- Android và máy tính: Cài ứng dụng hoặc menu trình duyệt > Cài đặt ứng dụng.
- iPhone: Safari > Chia sẻ > Thêm vào Màn hình chính.

Cùng Wi-Fi với máy chính, cho phép truy cập mạng nội bộ rồi chọn máy và đăng nhập. Bản đã cài từ tên miền cũ là một ứng dụng riêng: sau khi cài bản GitHub Pages và kiểm tra thành công, có thể gỡ bản cũ. Danh sách máy không tự chuyển giữa hai tên miền.

## Giới hạn đã biết

GitHub Pages phục vụ giao diện HTTPS; không chuyển máy chính HTTP sang HTTPS. Kết nối LAN phụ thuộc quyền và hỗ trợ của trình duyệt, cần kiểm tra trên điện thoại thật. Không thể khẳng định đổi nơi host sẽ khắc phục mọi lỗi kết nối. Giao diện có bộ nhớ ngoại tuyến; trình duyệt/xóa dữ liệu ứng dụng có thể xóa bộ nhớ này. ZIP nguồn không phải bộ cài exe/apk.
