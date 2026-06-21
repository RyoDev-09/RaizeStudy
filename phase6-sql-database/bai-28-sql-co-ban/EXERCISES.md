# 📝 Bài Tập Thực Tế – Bài 28: MySQL Cơ Bản & SELECT

> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống báo cáo sản phẩm và khách hàng cho dự án cửa hàng game items **RaizeShop**.

---

## 🔴 Bài Tập 1: Danh Sách Toàn Bộ Sản Phẩm ⭐
**Yêu cầu:** Viết câu lệnh SQL hiển thị toàn bộ cột và dòng từ bảng `products`.
**File lưu:** `query.sql`

---

## 🔴 Bài Tập 2: Lấy Tên Và Giá Sản Phẩm ⭐
**Yêu cầu:** Chỉ truy vấn hai cột tên sản phẩm (`name`) và giá tiền (`price`) của toàn bộ sản phẩm trong bảng `products`.

---

## 🟡 Bài Tập 3: Đặt Biệt Danh Cho Cột Dữ Liệu ⭐⭐
**Yêu cầu:** Truy vấn cột `name` với biệt danh hiển thị là `ten_san_pham`, và cột `price` hiển thị là `gia_ban` từ bảng `products`.

---

## 🟡 Bài Tập 4: Tìm Các Danh Mục Sản Phẩm Đang Có ⭐⭐
**Yêu cầu:** Tìm danh sách các `category_id` duy nhất (không trùng lặp) đang được bán trong bảng `products`.

---

## 🔴 Bài Tập 5: Lấy Top 3 Người Dùng Đăng Ký Đầu Tiên ⭐
**Yêu cầu:** Truy vấn cột `username` và `email` từ bảng `users` nhưng giới hạn chỉ lấy đúng 3 người đầu tiên (dựa trên thứ tự mặc định trong bảng).
