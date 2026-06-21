# 📝 Bài Tập Thực Tế – Bài 30: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)

> 🎯 **Bối cảnh dự án:** Xây dựng các báo cáo thống kê kho hàng, ví tiền và giao dịch mua bán game items của **RaizeShop**.

---

## 🔴 Bài Tập 1: Danh Sách Sản Phẩm Rẻ Nhất ⭐
**Yêu cầu:** Viết câu lệnh truy vấn lấy ra tên sản phẩm (`name`) và giá (`price`) từ bảng `products`, sắp xếp theo thứ tự giá tăng dần (`ASC`), giới hạn chỉ lấy 3 sản phẩm rẻ nhất.
**File lưu:** `query.sql`

---

## 🔴 Bài Tập 2: Thống Kê Số Lượng Sản Phẩm ⭐
**Yêu cầu:** Đếm tổng số lượng sản phẩm đang có trong bảng `products`. Đặt tên cột kết quả là `tong_so_luong`.

---

## 🟡 Bài Tập 3: Thống Kê Hàng Tồn Kho Theo Danh Mục ⭐⭐
**Yêu cầu:** Gom nhóm các sản phẩm theo `category_id`, tính tổng số lượng tồn kho (`stock`) và trung bình điểm đánh giá (`rating`) của các sản phẩm trong từng danh mục đó.
- Cột tổng tồn kho hiển thị đặt tên là: `tong_ton`.
- Cột trung bình đánh giá hiển thị đặt tên là: `tb_danh_gia`.

---

## 🟡 Bài Tập 4: Lọc Các Danh Mục Nhiều Hàng Tồn ⭐⭐
**Yêu cầu:** Viết truy vấn lấy ra các `category_id` có tổng số lượng tồn kho (`stock`) lớn hơn `15` sản phẩm.
- Sử dụng mệnh đề `GROUP BY` kết hợp với `HAVING`.

---

## 🔴 Bài Tập 5: Thống Kê Ví Tiền Người Dùng Lớn Nhất ⭐
**Yêu cầu:** Tìm số dư lớn nhất (`max_balance`) và trung bình số dư (`avg_balance`) của tất cả người dùng trong bảng `users` có email kết thúc bằng đuôi `"@gmail.com"`.
- Làm tròn cột trung bình số dư về 1 chữ số thập phân (`ROUND`).
