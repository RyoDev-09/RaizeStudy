# Bài 28: MySQL Cơ Bản & SELECT

> 🔵 **Phase 6: SQL Database – Bài 1/6** | Thời gian: ~2 giờ

---

Chào em! Chào mừng em đến với khóa học SQL Database. Sau khi đã nắm vững Java ở các phần trước, việc học SQL là mảnh ghép cực kỳ quan trọng tiếp theo. Hầu hết các ứng dụng Java Enterprise (như dự án **RaizeShop** sử dụng Spring Boot) đều cần lưu trữ dữ liệu lâu dài vào một hệ quản trị cơ sở dữ liệu quan hệ (RDBMS), và **MySQL** là lựa chọn phổ biến nhất thế giới.

Trong bài học đầu tiên này, chúng ta sẽ làm quen với cơ sở dữ liệu quan hệ và học cách lấy dữ liệu ra bằng lệnh `SELECT`.

---

## 1. Cơ Sở Dữ Liệu Quan Hệ (RDBMS) & MySQL là gì?

Hãy tưởng tượng, thay vì lưu thông tin sản phẩm và hóa đơn vào các file text hay Excel rời rạc (rất dễ bị lỗi đồng bộ, mất mát dữ liệu và cực kỳ chậm khi dữ liệu lớn), chúng ta lưu chúng vào các **Bảng (Tables)** có mối liên kết chặt chẽ với nhau. Đó là **Cơ sở dữ liệu quan hệ**.

Mỗi bảng gồm:
- **Cột (Columns / Fields)**: Định nghĩa kiểu dữ liệu (ví dụ: cột `name` lưu chuỗi chữ, cột `price` lưu số thực).
- **Dòng (Rows / Records)**: Chứa dữ liệu của từng đối tượng cụ thể (ví dụ: thông tin của sản phẩm "Kiếm Rồng").

**MySQL** là một RDBMS mã nguồn mở, hoạt động theo mô hình Client-Server. Ứng dụng Java của em sẽ đóng vai trò là Client, gửi các câu lệnh truy vấn đến MySQL Server bằng ngôn ngữ **SQL (Structured Query Language)** để đọc/ghi dữ liệu.

---

## 2. Truy Vấn SELECT Cơ Bản

Để lấy dữ liệu từ một bảng, câu lệnh đầu tiên và quan trọng nhất em cần học là `SELECT`.

### Lấy toàn bộ cột và dòng từ bảng
Cú pháp kinh điển để lấy mọi thông tin từ bảng `products`:
```sql
SELECT * FROM products;
```
> ⚠️ **Cảnh báo tối ưu (Query Optimization):** Dấu hoa thị `*` đại diện cho việc lấy **tất cả các cột**. Trong môi trường sản xuất (production), **TUYỆT ĐỐI TRÁNH** sử dụng `SELECT *` trừ khi thực sự cần thiết. Nó làm tốn tài nguyên mạng và băng thông của server, đồng thời làm giảm hiệu năng truy vấn.

### Lấy các cột cụ thể
Hãy chỉ lấy ra những cột thực sự cần thiết, ví dụ: tên sản phẩm (`name`) và giá tiền (`price`):
```sql
SELECT name, price FROM products;
```
> 💡 **Mẹo Mentor:** Việc chỉ định rõ tên cột giúp MySQL Server đọc dữ liệu từ ổ đĩa nhanh hơn và tối ưu hóa bộ nhớ đệm (buffer pool).

---

## 3. Bí Danh Của Cột (Alias với AS)

Nhiều khi tên cột trong database khá ngắn hoặc khó hiểu (ví dụ: `category_id`), em có thể đổi tên hiển thị ở kết quả trả về bằng từ khóa `AS`:
```sql
SELECT name AS ten_san_pham, price AS gia_ban FROM products;
```
Từ khóa `AS` giúp dữ liệu trả về cho backend Java có các key rõ ràng, khớp với các trường trong class DTO (Data Transfer Object) của em.

---

## 4. Loại Bỏ Trùng Lặp Với DISTINCT

Khi em muốn lấy danh sách các giá trị duy nhất trong một cột, hãy dùng `DISTINCT`.
Ví dụ, để biết cửa hàng game items đang có những mã danh mục (`category_id`) nào được gán cho sản phẩm:
```sql
SELECT DISTINCT category_id FROM products;
```
Nếu cột `category_id` có nhiều dòng trùng nhau, MySQL sẽ chỉ trả về mỗi ID danh mục một lần duy nhất.

---

## 5. Giới Hạn Dòng Trả Về Với LIMIT trong MySQL

Trong MySQL, khi bảng có hàng triệu dòng, em không thể load hết lên cùng lúc. Để giới hạn số lượng dòng trả về (phục vụ tính năng phân trang), MySQL cung cấp từ khóa `LIMIT`:
```sql
-- Chỉ lấy 3 dòng đầu tiên từ bảng products
SELECT name, price FROM products LIMIT 3;
```
Nếu muốn bỏ qua một số dòng đầu tiên, em dùng thêm `OFFSET`:
```sql
-- Bỏ qua 2 dòng đầu tiên, và lấy 3 dòng tiếp theo
SELECT name, price FROM products LIMIT 3 OFFSET 2;
```
Hoặc viết rút gọn theo cú pháp MySQL:
```sql
SELECT name, price FROM products LIMIT 2, 3; -- (Bỏ qua 2, lấy 3)
```

---

## Tóm Tắt Bài Học

```
✅ SQL là ngôn ngữ dùng để tương tác với Cơ sở dữ liệu quan hệ (RDBMS).
✅ Dùng SELECT col1, col2 FROM table_name để truy vấn các cột cụ thể.
✅ Tránh dùng SELECT * trong production để tối ưu hóa hiệu năng.
✅ Dùng AS để đặt bí danh hiển thị cho cột.
✅ Dùng DISTINCT để lấy các giá trị không trùng lặp.
✅ Dùng LIMIT và OFFSET để giới hạn dữ liệu trả về (phân trang).
```

---

👉 **Bài Tiếp Theo:** [Bài 29: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích](../bai-29-where-filtering/README.md)
