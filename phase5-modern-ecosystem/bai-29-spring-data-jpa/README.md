# Bài 29: Spring Data JPA & Hibernate

> 🟢 **Phase 5 – Bài 29/32** | Thời gian: ~4 giờ

---

Trong các ứng dụng Java truyền thống, việc kết nối cơ sở dữ liệu đòi hỏi viết rất nhiều mã nguồn lặp đi lặp lại (JDBC boilerplate code). **Spring Data JPA** kết hợp với **Hibernate** ra đời nhằm giải quyết triệt để vấn đề này bằng cách tự động hóa ánh xạ dữ liệu và cung cấp các phương thức tương tác tiện lợi.

---

## 1. ORM và Hibernate là gì?
*   **ORM (Object-Relational Mapping)**: Là kỹ thuật lập trình ánh xạ trực tiếp các bảng dữ liệu quan hệ (RDBMS) sang các lớp đối tượng Java (OOP).
*   **JPA (Java Persistence API)**: Là bộ đặc tả tiêu chuẩn (Specification/Interface) của Java định nghĩa cách quản lý dữ liệu ORM.
*   **Hibernate**: Là một Framework triển khai cụ thể (Implementation) phổ biến nhất của JPA. Nó thực sự đảm nhận việc chuyển hóa code Java thành các câu lệnh SQL phù hợp với hệ quản trị CSDL đích (MySQL, Oracle, PostgreSQL...).

---

## 2. Các Annotation Định Nghĩa Entity (Thực thể)
Để ánh xạ một lớp Java thành một bảng trong CSDL, ta dùng các JPA annotation sau:

*   `@Entity`: Đánh dấu class là một thực thể CSDL (bắt buộc phải có constructor không tham số).
*   `@Table`: Chỉ định tên bảng trong CSDL. Ví dụ: `@Table(name = "products")`.
*   `@Id`: Đánh dấu trường làm Khóa chính (Primary Key).
*   `@GeneratedValue`: Cấu hình chiến lược tự động sinh khóa chính. Ví dụ: `@GeneratedValue(strategy = GenerationType.IDENTITY)`.
*   `@Column`: Cấu hình chi tiết cho cột dữ liệu (tên cột, độ dài, nullable, unique...).

Ví dụ định nghĩa Entity `Product`:
```java
import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name", nullable = false, length = 100)
    private String name;

    private Double price; // Nếu không có @Column, tên cột mặc định trùng tên biến

    // Constructors, Getters & Setters
}
```

---

## 3. JpaRepository - Tự Động Hóa Truy Vấn
Spring Data JPA cung cấp interface `JpaRepository` chứa đầy đủ các chức năng CRUD cơ bản. Lập trình viên chỉ cần khai báo interface kế thừa từ nó mà không cần viết bất kỳ dòng triển khai nào:

```java
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // 1. Tự động sinh query tìm theo tên chính xác
    List<Product> findByName(String name);

    // 2. Tìm các sản phẩm có giá lớn hơn một mốc
    List<Product> findByPriceGreaterThan(Double minPrice);
}
```

### Cách thức hoạt động:
Khi khởi chạy ứng dụng, Spring Boot sẽ quét qua interface `ProductRepository`, tự động biên dịch cấu trúc tên phương thức (ví dụ: `findByPriceGreaterThan`) thành câu lệnh SQL tương đương:
`SELECT * FROM products WHERE price > ?` và tạo đối tượng Bean tiêm vào các service.

---

## Tóm Tắt — Bài 29
```
✅ ORM là cầu nối chuyển đổi giữa lập trình hướng đối tượng (Java) và cơ sở dữ liệu quan hệ (SQL).
✅ JPA là tiêu chuẩn (interface), Hibernate là bộ cài đặt thực tế (class triển khai).
✅ Dùng @Entity, @Table, @Id, @Column để ánh xạ lớp Java thành bảng trong CSDL.
✅ Extends JpaRepository giúp tự động hóa 100% các câu lệnh CRUD cơ bản mà không cần viết code triển khai.
✅ Query Creation giúp tạo các câu lệnh SQL tự động dựa trên quy ước đặt tên phương thức.
```
