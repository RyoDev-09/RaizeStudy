# Bài 29: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích

> 🔵 **Phase 6: SQL Database – Bài 2/6** | Thời gian: ~2 giờ

---

Chào em! Trong bài học trước, chúng ta đã lấy được dữ liệu từ bảng ra. Nhưng thực tế, em hiếm khi lấy toàn bộ các dòng. Ví dụ: Khách hàng chỉ muốn tìm sản phẩm dưới 500,000đ, hoặc kiểm tra xem tài khoản đã xác thực chưa. 

Để làm được việc đó, chúng ta sẽ dùng mệnh đề **`WHERE`** để lọc dữ liệu, và kết hợp các **Hàm Tiện Ích (Utility Functions)** có sẵn của MySQL để xử lý chuỗi và số.

---

## 1. Mệnh Đề WHERE & Các Toán Tử So Sánh

Mệnh đề `WHERE` được đặt ngay sau tên bảng trong câu lệnh `SELECT`, giúp lọc ra các dòng thỏa mãn điều kiện chỉ định.

```sql
SELECT name, price FROM products WHERE price > 1000000;
```

Các toán tử so sánh cơ bản trong MySQL:
- `=` : So sánh bằng.
- `<>` hoặc `!=` : So sánh khác.
- `>`, `<`, `>=`, `<=` : Lớn hơn, nhỏ hơn, lớn hơn hoặc bằng, nhỏ hơn hoặc bằng.

---

## 2. Kết Hợp Nhiều Điều Kiện Với Toán Tử Logic

Em có thể kết hợp nhiều bộ lọc bằng các toán tử logic:
- **`AND`**: Trả về dòng thỏa mãn **tất cả** các điều kiện.
- **`OR`**: Trả về dòng thỏa mãn **ít nhất một** trong các điều kiện.
- **`NOT`**: Phủ định điều kiện đứng sau nó.

```sql
-- Lấy sản phẩm thuộc danh mục ID = 1 và có giá từ 1 triệu trở lên
SELECT * FROM products WHERE category_id = 1 AND price >= 1000000;
```

---

## 3. Các Phép Lọc Đặc Biệt: BETWEEN, IN, LIKE

### Toán tử BETWEEN
Thay vì viết `price >= 500000 AND price <= 1500000`, em viết gọn hơn:
```sql
SELECT * FROM products WHERE price BETWEEN 500000 AND 1500000;
```

### Toán tử IN
Lọc các dòng có giá trị thuộc một danh sách cho trước:
```sql
SELECT * FROM products WHERE category_id IN (1, 2, 4);
```

### Toán tử LIKE (Tìm kiếm chuỗi gần đúng)
Dùng để tìm kiếm mẫu chuỗi bằng các ký tự đại diện (wildcards):
- `%` : Đại diện cho bất kỳ chuỗi ký tự nào (bao gồm cả chuỗi rỗng).
- `_` : Đại diện cho đúng 1 ký tự duy nhất.

```sql
-- Tìm sản phẩm có tên bắt đầu bằng từ "Kiếm"
SELECT * FROM products WHERE name LIKE 'Kiếm%';

-- Tìm sản phẩm có từ "Rồng" ở bất kỳ vị trí nào
SELECT * FROM products WHERE name LIKE '%Rồng%';
```

---

## 4. Xử Lý Giá Trị NULL Trong MySQL

Trong SQL, `NULL` đại diện cho dữ liệu bị thiếu hoặc chưa xác định. Nó **không phải là số 0** hay **chuỗi rỗng `""`**.

### Lọc giá trị NULL
- Để tìm dòng bị trống: dùng `IS NULL` (không dùng `= NULL`).
- Để tìm dòng có giá trị: dùng `IS NOT NULL`.

```sql
SELECT * FROM products WHERE category_id IS NULL;
```

### Hàm xử lý NULL trong MySQL: IFNULL và COALESCE
Trong MySQL, để hiển thị một giá trị mặc định thay thế cho giá trị NULL ở kết quả:
- **`IFNULL(col, default_val)`**: Trả về `default_val` nếu cột `col` bị NULL.
- **`COALESCE(val1, val2, ...)`**: Trả về giá trị phi-NULL đầu tiên trong danh sách tham số.

```sql
-- Nếu sản phẩm chưa được gán danh mục, hiển thị 'Chưa phân loại'
SELECT name, IFNULL(category_id, 'Chưa phân loại') FROM products;
```

---

## 5. Các Hàm Tiện Ích Tiêu Biểu Trong MySQL

Để viết ứng dụng chuyên nghiệp, em cần làm chủ các hàm tích hợp sẵn của MySQL để định dạng dữ liệu trực tiếp từ DB.

### Hàm Xử Lý Chuỗi (String Functions)
- **`CONCAT(str1, str2, ...)`**: Nối các chuỗi lại với nhau.
- **`LOWER(str)` / `UPPER(str)`**: Chuyển chữ thường / chữ hoa.
- **`LENGTH(str)`**: Độ dài chuỗi (tính theo byte).

```sql
-- Hiển thị tên người dùng kèm email ở dạng: "raize (raize@raize.vn)"
SELECT CONCAT(username, ' (', email, ')') AS user_info FROM users;
```

### Hàm Toán Học (Math Functions)
- **`ROUND(number, decimals)`**: Làm tròn số đến số chữ số thập phân chỉ định.
- **`ABS(number)`**: Lấy giá trị tuyệt đối.
- **`CEIL(number)` / `FLOOR(number)`**: Làm tròn lên / làm tròn xuống số nguyên gần nhất.

---

## Tóm Tắt Bài Học

```
✅ Dùng WHERE [điều kiện] để lọc dữ liệu.
✅ Dùng AND, OR, NOT để kết hợp logic nhiều điều kiện.
✅ BETWEEN lọc giá trị trong khoảng; IN lọc giá trị trong tập hợp.
✅ LIKE dùng kèm % hoặc _ để tìm kiếm chuỗi gần đúng.
✅ Không so sánh bằng = NULL, phải dùng IS NULL hoặc IS NOT NULL.
✅ Hàm IFNULL và COALESCE dùng để xử lý hiển thị giá trị mặc định cho NULL.
✅ MySQL cung cấp hàm CONCAT, ROUND, LOWER, UPPER để định dạng dữ liệu trực quan.
```

---

👉 **Bài Tiếp Theo:** [Bài 30: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)](../bai-30-order-limit-group/README.md)
