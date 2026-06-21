# 📝 Bài Tập Thực Tế – Bài 29: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích

> 🎯 **Bối cảnh dự án:** Thực hiện các chức năng tìm kiếm sản phẩm nâng cao và xử lý thông tin người dùng cho dự án **RaizeShop**.

---

## 🔴 Bài Tập 1: Tìm Kiếm Game Item Giá Trị Cao ⭐
**Yêu cầu:** Tìm tất cả sản phẩm trong bảng `products` có giá (`price`) lớn hơn hoặc bằng `1,000,000`đ. Hiển thị cột `name` và `price`.
**File lưu:** `query.sql`

---

## 🔴 Bài Tập 2: Lọc Sản Phẩm Theo Khoảng Giá ⭐
**Yêu cầu:** Tìm tất cả các sản phẩm có giá nằm trong khoảng từ `500,000`đ đến `1,500,000`đ (sử dụng toán tử `BETWEEN`).

---

## 🟡 Bài Tập 3: Tìm Kiếm Theo Từ Khóa Tên Sản Phẩm ⭐⭐
**Yêu cầu:** Lọc ra toàn bộ các sản phẩm có chứa từ `"Siêu"` hoặc `"Cấp"` ở bất kỳ vị trí nào trong tên sản phẩm (`name`).

---

## 🟡 Bài Tập 4: Chuẩn Hóa Chuỗi Email Người Dùng ⭐⭐
**Yêu cầu:** Truy vấn cột `username` và cột `email` của toàn bộ người dùng, nhưng cột `email` cần được chuyển thành chữ in hoa (`UPPER`) và đặt bí danh hiển thị là `EMAIL_HOA`.

---

## 🔴 Bài Tập 5: Định Dạng Tên Và Số Dư Tài Khoản ⭐
**Yêu cầu:** Hiển thị tên người dùng và số tiền trong ví của người dùng bằng cách dùng hàm `CONCAT` để hiển thị cột dạng: `"Tài khoản: [username] - Số dư: [balance]đ"`. Đặt bí danh cho cột hiển thị này là `thong_tin_vi`.
- Lưu ý: Chỉ hiển thị những người dùng có số dư (`balance`) lớn hơn 0.
