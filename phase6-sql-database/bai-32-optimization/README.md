# Bài 32: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)

> 🔵 **Phase 6: SQL Database – Bài 5/6** | Thời gian: ~3.5 giờ

---

Chào em! Trong phát triển phần mềm thực tế, viết một câu lệnh SQL chạy đúng mới chỉ là điều kiện cần. Điều kiện đủ là câu lệnh đó phải **chạy nhanh**. Khi dữ liệu của ứng dụng **RaizeShop** lên tới hàng triệu sản phẩm và hàng triệu lượt mua hàng, một câu truy vấn tệ có thể làm nghẽn toàn bộ cơ sở dữ liệu, gây sập hệ thống (database bottleneck).

Bài học này sẽ hướng dẫn em cách sử dụng **Chỉ mục (Index)** và cách dùng lệnh **`EXPLAIN`** của MySQL để kiểm tra và tối ưu hiệu năng câu lệnh SQL lên gấp hàng trăm lần.

---

## 1. Chỉ Mục (Index) Trong MySQL là gì?

Hãy tưởng tượng một cuốn sách dày 1000 trang. Nếu em muốn tìm chương nói về "Spring Boot", cách ngây thơ nhất là lật từng trang một từ đầu đến cuối (trong SQL gọi là **Full Table Scan - Đọc toàn bộ bảng**). Cách này cực kỳ chậm.
Thay vào đó, em lật ra phần **Mục lục (Index)** ở cuối sách, tìm từ khóa "Spring Boot", xem nó nằm ở trang 724, và lật thẳng tới trang đó.

Trong MySQL, **Index** là một cấu trúc dữ liệu đặc biệt (thường sử dụng mô hình **B-Tree** dưới nền tảng bộ máy InnoDB) lưu trữ giá trị của một hoặc nhiều cột để giúp tìm kiếm dòng dữ liệu tương ứng một cách nhanh chóng.

### Cú pháp tạo Index trong MySQL:
```sql
CREATE INDEX idx_products_price ON products(price);
```

---

## 2. Phân Loại Chỉ Mục Trong MySQL

MySQL hỗ trợ các loại chỉ mục phổ biến sau:

- **Clustered Index (Chỉ mục cụm)**: Mặc định chính là **Khóa chính (Primary Key)** của bảng. Dữ liệu thực tế của các dòng được sắp xếp vật lý trên ổ đĩa dựa theo khóa này. Mỗi bảng chỉ có duy nhất 1 Clustered Index.
- **Secondary Index (Chỉ mục phụ)**: Được tạo ra trên các cột thường xuyên dùng để tìm kiếm (như `email`, `username`, `price`). Nó lưu giá trị cột đó và con trỏ trỏ về khóa chính tương ứng.
- **Composite Index (Chỉ mục tổ hợp)**: Chỉ mục được tạo ra trên **nhiều cột cùng lúc**.
  ```sql
  CREATE INDEX idx_products_cat_price ON products(category_id, price);
  ```
  > [!IMPORTANT]
  > **Quy tắc Prefix ngoài cùng bên trái (Leftmost Prefix Rule):**
  > Composite Index trên `(category_id, price)` chỉ hỗ trợ tìm kiếm khi điều kiện lọc chứa `category_id` hoặc cả hai cột. Nếu em chỉ lọc theo `price` (không có `category_id`), MySQL sẽ không thể sử dụng index này.

---

## 3. Xem Kế Hoạch Thực Thi Với EXPLAIN trong MySQL

Để biết MySQL Engine sẽ chạy câu lệnh SQL của em như thế nào (có dùng index không, quét bao nhiêu dòng...), em chỉ cần thêm từ khóa **`EXPLAIN`** vào trước câu lệnh truy vấn.

```sql
EXPLAIN SELECT * FROM products WHERE price = 500000;
```

Khi chạy, MySQL sẽ trả về một bảng thông tin kế hoạch thực thi. Hãy đặc biệt chú ý đến 3 cột sau để tối ưu:

1. **`type` (Kiểu quét dữ liệu)**: Đây là cột quan trọng nhất. Thứ tự hiệu năng từ tốt nhất đến tệ nhất:
   - `const` / `system`: Quét bằng khóa chính hoặc unique index (chỉ đọc 1 dòng, cực nhanh).
   - `eq_ref` / `ref`: Sử dụng index thông thường để so sánh (rất tốt).
   - `range`: Quét trong một khoảng giá trị có sử dụng index (ví dụ: `price BETWEEN 100 AND 500`).
   - `index`: Đọc toàn bộ chỉ mục (tốt hơn ALL nhưng vẫn chậm).
   - **`ALL`**: Quét toàn bộ bảng (Full Table Scan - Tệ nhất, cần tối ưu nếu bảng lớn!).
2. **`key`**: Tên chỉ mục thực tế mà MySQL quyết định sử dụng. Nếu cột này bị `NULL`, nghĩa là MySQL đang không dùng bất kỳ index nào cho câu truy vấn của em.
3. **`rows`**: Số lượng dòng dự kiến mà MySQL cần đọc để tìm ra kết quả. Số dòng càng nhỏ, câu lệnh chạy càng nhanh.

---

## 4. 6 Quy Tắc Vàng Tối Ưu Hóa Truy Vấn (Query Optimization Rules)

Khi viết code SQL hoặc viết các câu lệnh trong file XML Mapper của MyBatis / Repository JPA trong Spring Boot, em hãy tuân thủ các quy tắc sau:

### Quy tắc 1: Tuyệt đối tránh SELECT *
Chỉ lấy các cột thực sự hiển thị. Việc lấy thừa cột làm tốn bộ nhớ đệm Buffer Pool của MySQL và tăng tải băng thông mạng.

### Quy tắc 2: Không thực hiện phép tính/hàm trên cột có chỉ mục
Nếu cột `created_date` đã có index, viết như sau sẽ **vô hiệu hóa index**:
```sql
-- ❌ Tệ: MySQL phải tính toán hàm YEAR cho từng dòng trong bảng, không dùng được index!
SELECT * FROM orders WHERE YEAR(created_date) = 2026;

-- ✅ Tốt: MySQL so sánh trực tiếp khoảng giá trị và sử dụng index nhanh chóng
SELECT * FROM orders WHERE created_date BETWEEN '2026-01-01' AND '2026-12-31';
```

### Quy tắc 3: Tránh tìm kiếm ký tự đại diện ở đầu chuỗi (Leading Wildcard)
```sql
-- ❌ Tệ: Không dùng được index (quét toàn bộ bảng)
SELECT * FROM products WHERE name LIKE '%Kiếm%';

-- ✅ Tốt: Sử dụng được index (quét theo khoảng index)
SELECT * FROM products WHERE name LIKE 'Kiếm%';
```

### Quy tắc 4: Chỉ mục hóa các cột dùng trong JOIN và WHERE
Mọi khóa ngoại (Foreign Key) và các trường lọc thường xuyên (`status`, `email`, `created_at`) nên được tạo chỉ mục để cải thiện tốc độ JOIN.

### Quy tắc 5: Tránh sử dụng OR quá nhiều
Toán tử `OR` thường làm MySQL từ chối sử dụng index và chuyển sang quét toàn bộ bảng. Nên cân nhắc tách thành 2 câu lệnh và kết hợp bằng `UNION` hoặc dùng `IN`.

### Quy tắc 6: Sử dụng LIMIT khi chỉ muốn kiểm tra sự tồn tại
Nếu em chỉ muốn kiểm tra xem có đơn hàng nào không, hãy thêm `LIMIT 1`. MySQL sẽ dừng quét ngay khi tìm thấy dòng đầu tiên thay vì quét hết bảng.

---

## 5. Kiến Thức Chuyên Sâu Cần Biết Khi Thiết Kế MySQL

### 5.1 Chọn Kiểu Dữ Liệu: DECIMAL vs FLOAT/DOUBLE
Trong các hệ thống thanh toán và e-commerce như **RaizeShop**, việc lưu trữ giá tiền sản phẩm hoặc số dư tài khoản bằng kiểu `FLOAT` hoặc `DOUBLE` là một lỗi thiết kế sơ đẳng nhưng nguy hiểm. 
* Kiểu `FLOAT` và `DOUBLE` lưu số thực dưới dạng **dấu phẩy động (floating-point)** theo chuẩn IEEE 754. Hệ nhị phân không thể biểu diễn chính xác tuyệt đối một số số thập phân hệ thập phân (ví dụ `0.1 + 0.2` sẽ bằng `0.30000000000000004`). Sau hàng triệu giao dịch, sai số làm tròn này sẽ gây lệch sổ sách tài chính.
* Kiểu **`DECIMAL(p, s)`** (hoặc `NUMERIC`) lưu số thập phân dưới dạng chuỗi nhị phân chính xác tuyệt đối (**fixed-point**). Trong đó `p` là tổng số chữ số (precision), và `s` là số chữ số sau dấu phẩy (scale).
  * Ví dụ: `price DECIMAL(12, 2)` hỗ trợ lưu giá trị tối đa `9,999,999,999.99` mà không bị bất kỳ sai số làm tròn nào.

### 5.2 Độ Đa Dạng Chỉ Mục (Index Cardinality)
Không phải cứ tạo Index cho cột nào là MySQL sẽ dùng Index đó. **Cardinality** là số lượng giá trị duy nhất (độ đa dạng) của một cột.
* **Cột có Cardinality Cao**: Cột chứa giá trị ít trùng lặp (ví dụ `email`, `username`, `phone_number`). Tạo index trên đây cực kỳ hiệu quả vì MySQL lọc được ngay dòng cần tìm.
* **Cột có Cardinality Thấp**: Cột chứa giá trị trùng lặp rất nhiều (ví dụ `gender` chỉ có Nam/Nữ, `status` chỉ có Đang hoạt động/Bị khóa). Lọc theo các cột này thường trả về 30% đến 50% số dòng của bảng.
  * MySQL Optimizer tính toán rằng việc đọc chỉ mục phụ rồi quay lại đọc dữ liệu ở Clustered Index (Bookmark Lookup) tốn tài nguyên hơn là đọc thẳng từ đầu đến cuối bảng. Do đó, **MySQL sẽ bỏ qua Index** và chạy **Full Table Scan (ALL)**. Hãy tránh tạo chỉ mục đơn lẻ cho các cột có độ đa dạng thấp!

---

## Tóm Tắt Bài Học

```
✅ Index hoạt động như mục lục cuốn sách, giúp tăng tốc độ tìm kiếm dòng.
✅ Bảng chỉ có duy nhất 1 Clustered Index (Primary Key); có thể tạo nhiều Secondary Index.
✅ Dùng EXPLAIN trước câu lệnh SELECT để xem MySQL có dùng index (cột key) và kiểu quét (cột type).
✅ Tránh quét toàn bộ bảng (type = ALL) bằng cách tạo index trên cột lọc WHERE và cột liên kết JOIN.
✅ Tránh viết các hàm biến đổi (YEAR, LOWER, CONCAT) lên cột có index trong mệnh đề WHERE.
✅ Sử dụng kiểu DECIMAL cho giá tiền/tài chính để tránh sai số dấu phẩy động của FLOAT/DOUBLE.
✅ Không tạo chỉ mục phụ cho các cột có độ đa dạng giá trị thấp (Cardinality thấp) như giới tính, trạng thái.
```

---

👉 **Bài Tiếp Theo:** [Bài 33: Truy Vấn Con (Subqueries) & Thay Đổi Dữ Liệu](../bai-33-subquery-write/README.md)

