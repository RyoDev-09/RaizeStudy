# 📝 Bài Tập Thực Tế – Bài 33: Truy Vấn Con & Ghi Dữ Liệu (INSERT, UPDATE, DELETE & Subqueries)

> 🎯 **Bối cảnh dự án:** Xây dựng các chức năng ghi nhận giao dịch, cập nhật số dư ví và cấu trúc lại dữ liệu cho ứng dụng **RaizeShop**.

---

## 🔴 Bài Tập 1: Tìm Sản Phẩm Giá Trên Trung Bình ⭐
**Yêu cầu:** Viết câu truy vấn SELECT lấy ra tên sản phẩm (`name`) và giá (`price`) của các sản phẩm có giá cao hơn mức giá trung bình (`AVG`) của tất cả sản phẩm trong bảng `products`.
- Sử dụng truy vấn con (subquery) trong mệnh đề `WHERE`.
**File lưu:** `query.sql`

---

## 🔴 Bài Tập 2: Thêm Sản Phẩm Mới ⭐
**Yêu cầu:** Viết câu lệnh `INSERT INTO` để thêm một sản phẩm mới vào bảng `products`:
- Tên sản phẩm: `"Kiếm Ánh Sáng v2"`
- Giá: `1800000.0`
- Tồn kho: `10`
- ID danh mục: `1`
- Đánh giá: `5.0`

---

## 🟡 Bài Tập 3: Cập Nhật Số Dư Tài Khoản Khách Hàng ⭐⭐
**Yêu cầu:** Sau khi khách hàng nạp thẻ thành công, hãy viết câu lệnh `UPDATE` để cộng thêm `500,000`đ vào số dư (`balance`) của người dùng có tên đăng nhập (`username`) là `"gameraise"`.

---

## 🟡 Bài Tập 4: Xóa Tài Khoản Chưa Từng Mua Hàng ⭐⭐
**Yêu cầu:** Viết câu lệnh `DELETE` để xóa toàn bộ những người dùng ra khỏi bảng `users` mà **chưa từng thực hiện bất kỳ đơn hàng nào** trong bảng `orders`.
- Sử dụng mệnh đề `NOT IN` kết hợp với truy vấn con lấy toàn bộ danh sách `user_id` từ bảng `orders`.

---

## 🔴 Bài Tập 5: Thống Kê Người Dùng Có Số Dư Lớn Nhất ⭐
**Yêu cầu:** Sử dụng truy vấn con để lấy ra `username` và `balance` của người dùng đang sở hữu số dư ví cao nhất trong bảng `users`.
- Gợi ý: `WHERE balance = (SELECT MAX(balance) FROM users)`.
