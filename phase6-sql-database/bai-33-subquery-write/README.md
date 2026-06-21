# Bài 33: Truy Vấn Con & Ghi Dữ Liệu (INSERT, UPDATE, DELETE & Subqueries)

> 🔵 **Phase 6: SQL Database – Bài 6/6** | Thời gian: ~3 giờ

---

Chào em! Trong các bài học trước, chúng ta chỉ tập trung vào việc đọc dữ liệu ra (DQL - Data Query Language). Tuy nhiên, một ứng dụng e-commerce như **RaizeShop** cần phải tạo mới tài khoản người dùng, cập nhật số lượng tồn kho sản phẩm sau khi bán, hoặc hủy đơn hàng lỗi.

Bài học cuối cùng này sẽ hướng dẫn em cách viết các câu lệnh ghi/sửa dữ liệu và cách sử dụng **Truy vấn con (Subquery)** cũng như hiểu được tầm quan trọng của **Giao dịch (Transaction)** trong an toàn dữ liệu.

---

## 1. Truy Vấn Con (Subqueries)

**Subquery** là một câu lệnh `SELECT` lồng bên trong một câu lệnh SQL khác (có thể nằm trong `SELECT`, `FROM`, `WHERE` hoặc `HAVING`).

### Subquery trả về giá trị đơn lẻ (Scalar Subquery)
Tìm các sản phẩm có giá lớn hơn giá trung bình của toàn bộ cửa hàng:
```sql
SELECT name, price 
FROM products 
WHERE price > (SELECT AVG(price) FROM products);
```

### Subquery với toán tử IN / EXISTS
Tìm tất cả khách hàng đã từng thực hiện ít nhất một đơn hàng:
```sql
-- Dùng IN
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);

-- Dùng EXISTS (Thường có hiệu năng tốt hơn vì dừng quét ngay khi tìm thấy dòng khớp)
SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
```

---

## 2. Thêm Dữ Liệu Mới Với INSERT INTO

Để thêm các dòng dữ liệu mới vào một bảng, em sử dụng lệnh `INSERT INTO`.

### Thêm một dòng đầy đủ các cột:
```sql
INSERT INTO categories (id, name) VALUES (5, 'Thời trang game');
```

### Thêm nhiều dòng cùng lúc để tối ưu hiệu năng:
```sql
INSERT INTO categories (id, name) VALUES 
(6, 'Gói tài nguyên'),
(7, 'Thẻ giảm giá');
```
> [!TIP]
> **Tối ưu ghi dữ liệu (Batch Insert):**
> Gộp nhiều dòng vào một câu lệnh `INSERT` duy nhất giúp giảm thiểu số lượng gói tin truyền tải trên mạng và giảm số lần commit vật lý trên ổ cứng của database server, giúp tốc độ ghi nhanh hơn gấp hàng chục lần so với viết nhiều câu lệnh INSERT đơn lẻ.

---

## 3. Cập Nhật Dữ Liệu Với UPDATE

Mệnh đề `UPDATE` dùng để thay đổi các giá trị hiện có trong bảng.

```sql
UPDATE products 
SET price = 1350000.0, stock = 10 
WHERE id = 1;
```

> [!CAUTION]
> **CẢNH BÁO NGUY HIỂM:** Luôn luôn sử dụng mệnh đề `WHERE` khi chạy lệnh `UPDATE`. Nếu em quên `WHERE`, toàn bộ các dòng trong bảng sẽ bị ghi đè giá trị mới!

---

## 4. Xóa Dữ Liệu Với DELETE

Mệnh đề `DELETE` dùng để xóa các dòng hiện có ra khỏi bảng.

```sql
DELETE FROM products WHERE id = 8;
```

> [!CAUTION]
> **CẢNH BÁO NGUY HIỂM:** Giống như `UPDATE`, luôn luôn phải có mệnh đề `WHERE` khi thực hiện `DELETE` để tránh việc vô tình xóa sạch toàn bộ dữ liệu trong bảng của dự án.
> Nếu muốn xóa sạch bảng nhanh chóng không cần phục hồi (không ghi log rollback), ta dùng lệnh `TRUNCATE TABLE table_name;` (nhanh hơn nhiều so với `DELETE FROM` không có WHERE).

---

## 5. Giao Dịch Trong Cơ Sở Dữ Liệu (Transactions: COMMIT & ROLLBACK)

Hãy tưởng tượng bối cảnh chuyển tiền tại **RaizeShop**:
1. Trừ 100,000đ trong ví người dùng A (`UPDATE users SET balance = balance - 100000 WHERE id = 1;`).
2. Cộng 100,000đ vào ví người bán B (`UPDATE users SET balance = balance + 100000 WHERE id = 2;`).

Điều gì xảy ra nếu bước 1 thành công, nhưng trước khi chạy bước 2 thì server bị mất điện đột ngột? Tiền của người dùng A bị mất vô lý còn người B thì không nhận được gì!

Để giải quyết vấn đề này, cơ sở dữ liệu quan hệ cung cấp tính năng **Transaction (Giao dịch)** tuân thủ nguyên tắc ACID, đảm bảo rằng cả hai lệnh trên phải **cùng thành công** hoặc **cùng thất bại (không có trạng thái dở dang)**.

- **`START TRANSACTION`** (hoặc `BEGIN TRANSACTION`): Bắt đầu một giao dịch cô lập. Các thay đổi tạm thời chỉ lưu trong bộ nhớ đệm của transaction đó, người dùng khác chưa nhìn thấy.
- **`COMMIT`**: Xác nhận hoàn thành giao dịch. Tất cả các lệnh ghi dữ liệu trong transaction sẽ được ghi vĩnh viễn vào ổ đĩa.
- **`ROLLBACK`**: Hủy bỏ giao dịch. Khôi phục lại trạng thái dữ liệu nguyên vẹn như trước khi bắt đầu transaction, loại bỏ hoàn toàn các thay đổi tạm thời nếu có bất kỳ lỗi nào xảy ra ở các bước trung gian.

---

---

## 6. Kiến Thức Nâng Cao: Thiết Kế Hệ Thống Trong MySQL

### 6.1 So Sánh Storage Engine: InnoDB vs MyISAM
MySQL hỗ trợ nhiều bộ máy lưu trữ (Storage Engine) khác nhau cho từng bảng. Hai bộ máy phổ biến nhất là **InnoDB** (mặc định từ MySQL 5.5) và **MyISAM**:

| Đặc tính | InnoDB | MyISAM |
| :--- | :--- | :--- |
| **Transaction (Giao dịch)** | **Có** (Hỗ trợ ACID, COMMIT/ROLLBACK) | **Không** (Ghi trực tiếp, không thể khôi phục) |
| **Foreign Key (Khóa ngoại)** | **Có** (Đảm bảo ràng buộc toàn vẹn dữ liệu) | **Không** (Bỏ qua kiểm tra khóa ngoại) |
| **Cơ chế khóa (Locking)** | **Khóa cấp dòng (Row-level lock)** - Tối ưu ghi đồng thời cao | **Khóa cấp bảng (Table-level lock)** - Gây nghẽn khi ghi nhiều |
| **Khôi phục lỗi (Crash Recovery)**| Tự động phục hồi qua Redo Log | Dễ bị hỏng chỉ mục/dữ liệu khi sập nguồn |

> [!IMPORTANT]
> Hầu hết ứng dụng Java thực tế đều sử dụng **InnoDB** để bảo vệ dữ liệu giao dịch và hỗ trợ đa luồng ghi tốt hơn.

### 6.2 Các Cấp Độ Cô Lập Giao Dịch (Transaction Isolation Levels)
Khi nhiều giao dịch chạy đồng thời (concurrency), các xung đột dữ liệu có thể xảy ra. SQL định nghĩa 4 cấp độ cô lập nhằm cân bằng giữa **tính an toàn dữ liệu** và **hiệu năng hệ thống**:

1. **READ UNCOMMITTED (Đọc dữ liệu chưa commit)**:
   * Cho phép đọc dữ liệu đang thay đổi tạm thời của transaction khác dù chưa commit.
   * Gây ra lỗi **Dirty Read (Đọc bẩn)**: Đọc phải dữ liệu ảo mà sau đó bị rollback.
2. **READ COMMITTED (Đọc dữ liệu đã commit)**:
   * Chỉ đọc các dữ liệu đã được commit vĩnh viễn. Tránh được lỗi Dirty Read.
   * Gây ra lỗi **Non-repeatable Read (Đọc không lặp lại)**: Trong cùng một transaction, đọc dòng dữ liệu lần 1 ra giá trị A, lần 2 ra giá trị B vì transaction khác vừa UPDATE và COMMIT dòng đó ở giữa hai lần đọc.
3. **REPEATABLE READ (Đọc lặp lại được - Mặc định của MySQL InnoDB)**:
   * Đảm bảo mọi lần đọc một dòng dữ liệu trong cùng một transaction đều ra kết quả giống hệt nhau. Tránh được Non-repeatable Read.
   * Có thể gây ra lỗi **Phantom Read (Đọc bóng ma)**: Khi chạy lệnh lọc tập hợp dòng (ví dụ đếm số lượng), lần 1 đếm ra 10 dòng, lần 2 đếm ra 11 dòng vì transaction khác vừa INSERT và COMMIT một dòng mới thỏa mãn điều kiện lọc.
4. **SERIALIZABLE (Tuần tự hóa)**:
   * Cấp độ an toàn tuyệt đối cao nhất. Khóa toàn bộ các dòng được truy vấn, ép các transaction khác phải xếp hàng chờ đợi chạy tuần tự.
   * Tránh được toàn bộ các lỗi trên, nhưng làm giảm hiệu năng hệ thống nghiêm trọng (dễ gây Deadlock).

---

## Tóm Tắt Bài Học

```
✅ Subquery là câu truy vấn SELECT lồng trong một câu lệnh SQL khác.
✅ Lệnh INSERT INTO dùng để tạo mới bản ghi (dòng dữ liệu) vào bảng.
✅ Lệnh UPDATE thay đổi dữ liệu hiện có; Lệnh DELETE xóa bớt bản ghi khỏi bảng.
✅ Luôn dùng WHERE khi UPDATE hoặc DELETE để tránh hủy hoại toàn bộ bảng dữ liệu.
✅ Transaction gom nhóm nhiều lệnh ghi dữ liệu nhằm đảm bảo tính toàn vẹn (tất cả hoặc không gì cả).
✅ COMMIT để lưu vĩnh viễn thay đổi; ROLLBACK để khôi phục lại trạng thái cũ khi gặp lỗi.
✅ InnoDB là Storage Engine mặc định của MySQL hỗ trợ Khóa ngoại và Giao dịch ACID.
✅ Có 4 cấp độ cô lập Transaction: Read Uncommitted, Read Committed, Repeatable Read (mặc định), và Serializable.
```

---

Chúc mừng em đã hoàn thành khóa học SQL Database của RaizeStudy! Giờ đây em đã có đủ kiến thức nền tảng vững chắc để xây dựng các ứng dụng Java kết nối cơ sở dữ liệu thực tế bằng Spring Boot và MySQL.

