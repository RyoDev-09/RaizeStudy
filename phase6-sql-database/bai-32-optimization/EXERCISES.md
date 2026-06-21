# 📝 Bài Tập Thực Tế – Bài 32: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)

> 🎯 **Bối cảnh dự án:** Tối ưu hóa các câu truy vấn chậm và thiết lập chỉ mục để nâng cấp tốc độ tải trang cho ứng dụng **RaizeShop**.

---

## 🔴 Bài Tập 1: Phân Tích Kế Hoạch Truy Vấn Bằng EXPLAIN ⭐
**Yêu cầu:** Viết câu lệnh `EXPLAIN` cho câu truy vấn lấy toàn bộ cột của sản phẩm có giá chính xác bằng `1,500,000`đ.
- Phân tích xem hệ thống có sử dụng chỉ mục (`key`) nào không và kiểu quét (`type`) là gì.
**File lưu:** `query.sql`

---

## 🔴 Bài Tập 2: Thiết Lập Chỉ Mục Cho Giá Sản Phẩm ⭐
**Yêu cầu:** Tạo một chỉ mục (index) có tên là `idx_products_price` trên cột `price` của bảng `products` để tăng tốc độ lọc tìm kiếm sản phẩm theo giá.

---

## 🟡 Bài Tập 3: Tối Ưu Tìm Kiếm Không Sử Dụng Hàm ⭐⭐
**Yêu cầu:** Cho câu lệnh truy vấn bị chậm sau (vô hiệu hóa chỉ mục):
```sql
SELECT * FROM orders WHERE SUBSTR(order_date, 1, 10) = '2026-06-15';
```
Hãy viết lại câu truy vấn trên một cách tối ưu nhất (sử dụng so sánh khoảng giá trị trực tiếp hoặc toán tử `LIKE` bắt đầu để tận dụng chỉ mục trên cột `order_date`).

---

## 🟡 Bài Tập 4: Tạo Chỉ Mục Tổ Hợp (Composite Index) ⭐⭐
**Yêu cầu:** Tạo một Composite Index tên là `idx_prod_cat_price` bao gồm hai cột: `category_id` và `price` trên bảng `products`.
- Viết câu truy vấn SELECT tận dụng tối đa chỉ mục tổ hợp này để lọc sản phẩm thuộc `category_id = 1` và có giá lớn hơn `500,000`đ.

---

## 🔴 Bài Tập 5: Tối Ưu Sử Dụng EXISTS Thay Cho IN ⭐
**Yêu cầu:** Cho câu truy vấn lấy thông tin người dùng đã từng mua hàng sử dụng toán tử `IN` (hiệu năng trung bình):
```sql
SELECT * FROM users WHERE id IN (SELECT DISTINCT user_id FROM orders);
```
Hãy viết lại câu lệnh trên sử dụng toán tử liên kết liên quan `EXISTS` để tối ưu hóa quá trình duyệt tìm kiếm trong MySQL.
- Sử dụng cú pháp `WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id)`.
