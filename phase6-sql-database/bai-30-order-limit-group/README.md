# Bài 30: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)

> 🔵 **Phase 6: SQL Database – Bài 3/6** | Thời gian: ~2.5 giờ

---

Chào em! Trong phân tích dữ liệu và lập trình backend, chúng ta thường cần thống kê dữ liệu. Ví dụ: Tính tổng doanh thu của shop, tìm giá sản phẩm đắt nhất, hay đếm xem mỗi danh mục có bao nhiêu mặt hàng.

Bài học này sẽ trang bị cho em các công cụ mạnh mẽ nhất trong SQL để sắp xếp dữ liệu và thực hiện các thống kê gom nhóm phức tạp.

---

## 1. Sắp Xếp Dữ Liệu Với ORDER BY

Để sắp xếp các dòng kết quả theo thứ tự tăng dần hoặc giảm dần của một hoặc nhiều cột, em dùng mệnh đề `ORDER BY`:
- **`ASC`**: Tăng dần (mặc định nếu không viết gì).
- **`DESC`**: Giảm dần.

```sql
-- Lấy danh sách sản phẩm, sắp xếp theo giá giảm dần (từ đắt nhất đến rẻ nhất)
SELECT name, price FROM products ORDER BY price DESC;
```

Em cũng có thể sắp xếp theo nhiều cột. Ví dụ, sắp xếp theo mã danh mục tăng dần, nếu trùng danh mục thì sắp xếp theo giá giảm dần:
```sql
SELECT category_id, name, price FROM products ORDER BY category_id ASC, price DESC;
```

---

## 2. Các Hàm Gộp Dữ Liệu (Aggregate Functions)

Hàm gộp là các hàm tính toán trên một tập hợp các giá trị và trả về một giá trị duy nhất đại diện.
- **`COUNT(col)`**: Đếm số dòng (phi-NULL). `COUNT(*)` đếm tổng số dòng bao gồm cả NULL.
- **`SUM(col)`**: Tính tổng các giá trị số trong cột.
- **`AVG(col)`**: Tính giá trị trung bình cộng.
- **`MIN(col)`** / **`MAX(col)`**: Tìm giá trị nhỏ nhất / lớn nhất.

```sql
-- Tính tổng doanh thu và trung bình giá của tất cả sản phẩm
SELECT SUM(price) AS tong_gia_tri, AVG(price) AS gia_trung_binh FROM products;
```

---

## 3. Gom Nhóm Dữ Liệu Với GROUP BY

Mệnh đề `GROUP BY` dùng để gom các dòng có cùng giá trị trong các cột chỉ định vào các nhóm riêng biệt. Các hàm gộp khi đi kèm `GROUP BY` sẽ tính toán kết quả trên **từng nhóm** thay vì toàn bộ bảng.

Ví dụ, tính tổng số lượng tồn kho và giá trung bình cho từng danh mục sản phẩm:
```sql
SELECT category_id, SUM(stock) AS tong_ton_kho, AVG(price) AS gia_trung_binh 
FROM products 
GROUP BY category_id;
```

> [!IMPORTANT]
> **Quy tắc bắt buộc khi dùng GROUP BY:** 
> Bất kỳ cột nào xuất hiện trong phần `SELECT` mà **không** nằm trong hàm gộp (như SUM, AVG, COUNT...) thì **bắt buộc** phải được khai báo trong phần `GROUP BY`. Nếu không, MySQL sẽ báo lỗi cú pháp hoặc trả về kết quả không chính xác.

---

## 4. Lọc Nhóm Dữ Liệu Với HAVING

Khi muốn lọc dữ liệu của các nhóm sau khi đã gom nhóm và tính toán hàm gộp, em không thể dùng `WHERE` (vì `WHERE` chỉ lọc các dòng đơn lẻ trước khi gom nhóm). Thay vào đó, em phải dùng **`HAVING`**.

```sql
-- Tìm các danh mục có tổng số lượng tồn kho lớn hơn 10 cái
SELECT category_id, SUM(stock) AS tong_ton_kho 
FROM products 
GROUP BY category_id 
HAVING SUM(stock) > 10;
```

### So sánh WHERE và HAVING (Cực kỳ quan trọng!)
| Đặc điểm | WHERE | HAVING |
|---|---|---|
| **Thời điểm chạy** | Chạy **trước** khi gom nhóm (`GROUP BY`). | Chạy **sau** khi gom nhóm và tính hàm gộp. |
| **Đối tượng lọc** | Lọc từng dòng đơn lẻ của bảng. | Lọc các nhóm (thỏa mãn điều kiện gộp). |
| **Sử dụng hàm gộp** | **KHÔNG** được sử dụng hàm gộp (Ví dụ: `WHERE SUM(price) > 100` là sai). | **ĐƯỢC** phép sử dụng hàm gộp. |

---

## 5. Thứ Tự Thực Thi Câu Lệnh Trong MySQL (Query Execution Order)

Để tối ưu hóa query tốt và tránh các lỗi logic ngớ ngẩn, em cần thuộc lòng thứ tự thực thi một câu lệnh SQL của MySQL Engine dưới đây.

Mặc dù em viết câu lệnh theo thứ tự:
`SELECT` ➔ `FROM` ➔ `WHERE` ➔ `GROUP BY` ➔ `HAVING` ➔ `ORDER BY` ➔ `LIMIT`

Nhưng MySQL Engine thực tế sẽ chạy theo thứ tự sau:

```
1. FROM & JOINs      : Xác định các bảng nguồn cần đọc dữ liệu.
2. WHERE            : Lọc bỏ các dòng đơn lẻ không thỏa mãn điều kiện.
3. GROUP BY         : Chia các dòng còn lại thành các nhóm.
4. HAVING           : Lọc bỏ các nhóm không thỏa mãn điều kiện gộp.
5. SELECT           : Chọn ra các cột cần hiển thị và tính toán biểu thức.
6. DISTINCT         : Loại bỏ các dòng kết quả trùng lặp.
7. ORDER BY         : Sắp xếp các dòng kết quả cuối cùng.
8. LIMIT & OFFSET   : Giới hạn số dòng trả về hiển thị.
```

> [!TIP]
> **Giải thích lỗi đặt Alias trong WHERE:**
> Tại sao em viết `SELECT price AS gia_ban FROM products WHERE gia_ban > 100` lại báo lỗi `Unknown column 'gia_ban'`?
> Nhìn vào thứ tự thực thi: `WHERE` chạy ở bước 2, lúc này bước 5 (`SELECT` - nơi định nghĩa alias `gia_ban`) **chưa hề được chạy**! Do đó MySQL không biết `gia_ban` là gì. Ngược lại, `ORDER BY` ở bước 7 chạy sau `SELECT` nên em hoàn toàn có thể sắp xếp theo alias: `ORDER BY gia_ban DESC`.

---

## Tóm Tắt Bài Học

```
✅ ORDER BY [col] ASC/DESC dùng để sắp xếp kết quả hiển thị.
✅ Các hàm gộp COUNT, SUM, AVG, MIN, MAX dùng để tính toán thống kê.
✅ GROUP BY chia bảng thành các nhóm để tính hàm gộp trên từng nhóm.
✅ HAVING dùng để lọc các nhóm sau khi gộp (hỗ trợ hàm gộp).
✅ WHERE lọc dòng trước khi GROUP BY, HAVING lọc nhóm sau khi GROUP BY.
✅ Thứ tự thực thi logic: FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT.
```

---

👉 **Bài Tiếp Theo:** [Bài 31: Liên Kết Bảng (JOINs)](../bai-31-joins/README.md)
