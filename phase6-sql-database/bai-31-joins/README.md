# Bài 31: Liên Kết Bảng (JOINs)

> 🔵 **Phase 6: SQL Database – Bài 4/6** | Thời gian: ~3 giờ

---

Chào em! Trong các hệ thống thực tế như **RaizeShop**, dữ liệu được phân tách ra nhiều bảng để tránh trùng lặp dữ liệu (chuẩn hóa dữ liệu - Normalization). Ví dụ: Bảng `products` lưu thông tin sản phẩm, bảng `categories` lưu thông tin danh mục, và bảng `orders` lưu lịch sử mua hàng.

Khi cần hiển thị thông tin đầy đủ cho người dùng (ví dụ: tên sản phẩm kèm theo tên danh mục của nó), chúng ta cần kết hợp dữ liệu từ các bảng này dựa trên mối liên kết giữa chúng. Đó chính là kỹ thuật **`JOIN`**.

---

## 1. Khóa Chính (Primary Key) & Khóa Ngoại (Foreign Key)

Trước khi thực hiện `JOIN`, em cần hiểu rõ cách các bảng liên kết với nhau:
- **Khóa chính (Primary Key - PK)**: Cột chứa giá trị duy nhất định danh cho mỗi dòng trong bảng (ví dụ: cột `id` trong bảng `categories`). Không được phép trùng lặp và không được NULL.
- **Khóa ngoại (Foreign Key - FK)**: Cột trong một bảng trỏ đến Khóa chính của bảng khác (ví dụ: cột `category_id` trong bảng `products` trỏ đến cột `id` của bảng `categories`).

---

## 2. Liên Kết INNER JOIN (Lấy Phần Giao)

`INNER JOIN` là loại liên kết phổ biến nhất. Nó chỉ trả về các dòng khi điều kiện liên kết được thỏa mãn ở **cả hai** bảng. Nếu một dòng ở bảng này không tìm thấy dòng khớp ở bảng kia, dòng đó sẽ bị loại bỏ khỏi kết quả.

```sql
-- Lấy tên sản phẩm kèm theo tên danh mục tương ứng
SELECT p.name AS ten_san_pham, c.name AS ten_danh_muc
FROM products p
INNER JOIN categories c ON p.category_id = c.id;
```
> 💡 **Mẹo Mentor:** Hãy dùng ký tự viết tắt đại diện cho bảng (như `products p` và `categories c`) làm alias cho bảng. Nó giúp câu lệnh ngắn gọn hơn rất nhiều.

---

## 3. Liên Kết LEFT JOIN & RIGHT JOIN (Lấy Lệch Bảng)

Đôi khi, em muốn hiển thị tất cả các dòng của một bảng bất kể nó có dữ liệu liên kết ở bảng kia hay không.

### LEFT JOIN (hoặc LEFT OUTER JOIN)
Trả về **tất cả** các dòng từ bảng bên trái (`FROM`), và các dòng khớp từ bảng bên phải (`JOIN`). Nếu không có dòng khớp ở bảng bên phải, các cột của bảng bên phải sẽ hiển thị giá trị `NULL`.

```sql
-- Hiển thị tất cả danh mục sản phẩm, kể cả những danh mục chưa có sản phẩm nào
SELECT c.name AS ten_danh_muc, p.name AS ten_san_pham
FROM categories c
LEFT JOIN products p ON p.category_id = c.id;
```

### RIGHT JOIN (hoặc RIGHT OUTER JOIN)
Ngược lại với `LEFT JOIN`. Trả về tất cả các dòng từ bảng bên phải, và các dòng khớp từ bảng bên trái. (Thực tế ít dùng vì ta có thể đổi vị trí hai bảng và dùng LEFT JOIN cho dễ đọc).

---

## 4. FULL OUTER JOIN trong MySQL

`FULL OUTER JOIN` trả về tất cả các dòng khi có sự khớp ở một trong hai bảng trái hoặc phải. 
> ⚠️ **Chú ý đặc thù MySQL:** **MySQL không hỗ trợ từ khóa FULL JOIN trực tiếp.** 
Để thực hiện FULL OUTER JOIN trong MySQL, chúng ta phải kết hợp kết quả của `LEFT JOIN` và `RIGHT JOIN` bằng từ khóa **`UNION`**:

```sql
-- Mô phỏng FULL OUTER JOIN trong MySQL
SELECT c.name AS ten_danh_muc, p.name AS ten_san_pham
FROM categories c
LEFT JOIN products p ON p.category_id = c.id
UNION
SELECT c.name AS ten_danh_muc, p.name AS ten_san_pham
FROM categories c
RIGHT JOIN products p ON p.category_id = c.id;
```

---

## 5. Liên Kết Nhiều Bảng (Multiple JOINS)

Trong một câu lệnh SQL, em có thể liên kết 3 bảng, 4 bảng hoặc nhiều hơn nữa. Câu lệnh sẽ chạy tuần tự từ trái qua phải.

Ví dụ thực tế của **RaizeShop**: Truy vấn xem khách hàng nào đã mua sản phẩm gì, số lượng bao nhiêu (liên kết 3 bảng: `orders`, `users`, `products`):

```sql
SELECT u.username AS nguoi_mua, p.name AS ten_vat_pham, o.quantity AS so_luong, o.order_date
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN products p ON o.product_id = p.id;
```

---

## Tóm Tắt Bài Học

```
✅ Khóa chính (PK) định danh duy nhất một dòng; Khóa ngoại (FK) liên kết các bảng.
✅ INNER JOIN trả về dòng khớp dữ liệu ở cả 2 bảng.
✅ LEFT JOIN trả về mọi dòng ở bảng bên trái, điền NULL nếu bảng phải không khớp.
✅ MySQL không hỗ trợ FULL JOIN, phải dùng LEFT JOIN UNION RIGHT JOIN.
✅ Có thể JOIN nhiều bảng liên tục để tạo ra các báo cáo dữ liệu phức tạp.
```

---

👉 **Bài Tiếp Theo:** [Bài 32: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)](../bai-32-optimization/README.md)
