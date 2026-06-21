# 📝 Bài Tập Thực Tế – Bài 31: Liên Kết Bảng (JOINs)

> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống báo cáo đơn hàng và liên kết thông tin đa chiều cho dự án **RaizeShop**.

---

## 🔴 Bài Tập 1: Tra Cứu Tên Danh Mục Của Sản Phẩm ⭐
**Yêu cầu:** Viết câu lệnh SQL hiển thị tên sản phẩm (`name` từ bảng `products`, đổi alias thành `ten_san_pham`) và tên danh mục (`name` từ bảng `categories`, đổi alias thành `ten_danh_muc`) bằng cách liên kết hai bảng này bằng `INNER JOIN`.
**File lưu:** `query.sql`

---

## 🔴 Bài Tập 2: Liệt Kê Toàn Bộ Danh Mục Kèm Sản Phẩm ⭐
**Yêu cầu:** Liệt kê toàn bộ các danh mục sản phẩm từ bảng `categories` (kể cả những danh mục chưa có sản phẩm nào) kèm theo tên các sản phẩm thuộc danh mục đó. Sử dụng `LEFT JOIN`.
- Hiển thị cột: `ten_danh_muc` (tên danh mục) và `ten_san_pham` (tên sản phẩm).

---

## 🟡 Bài Tập 3: Chi Tiết Đơn Hàng Mua Sắm ⭐⭐
**Yêu cầu:** Viết truy vấn lấy ra danh sách các đơn hàng trong bảng `orders` kèm tên người mua (`username` từ bảng `users`) và tên sản phẩm được mua (`name` từ bảng `products`).
- Hiển thị cột: `order_id` (ID của order), `username`, và `product_name`.
- Sử dụng `INNER JOIN`.

---

## 🟡 Bài Tập 4: Tính Tổng Tiền Khách Hàng Đã Mua ⭐⭐
**Yêu cầu:** Thống kê tổng số tiền mỗi người dùng đã chi tiêu để mua hàng.
- Gom nhóm theo `username` từ bảng `users`.
- Tính tổng tiền dựa trên công thức: `SUM(o.quantity * p.price)`. Đặt alias là `tong_chi_tieu`.
- Hiển thị cột: `username` và `tong_chi_tieu`.
- Chỉ hiển thị những khách hàng đã thực hiện ít nhất 1 đơn hàng (dùng `INNER JOIN`).

---

## 🔴 Bài Tập 5: Thống Kê Số Lượng Bán Theo Danh Mục ⭐
**Yêu cầu:** Tính tổng số lượng (`quantity`) sản phẩm đã bán ra cho từng danh mục sản phẩm.
- Hiển thị cột: `category_name` (tên danh mục) và `so_luong_ban` (tổng số lượng sản phẩm bán ra của danh mục đó).
- Sử dụng `INNER JOIN` liên kết 3 bảng: `categories`, `products`, và `orders`.
- Gom nhóm theo tên danh mục sản phẩm.
