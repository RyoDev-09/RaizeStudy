# Bài 28: Spring Web MVC & REST APIs

> 🟢 **Phase 5 – Bài 28/32** | Thời gian: ~4 giờ

---

Trong các ứng dụng thực tế như RaizeShop, client (Web Browser, React, hoặc Mobile App) cần giao tiếp với server để lấy dữ liệu sản phẩm, đăng ký tài khoản,... Kiến trúc giao tiếp phổ biến nhất hiện nay là **REST API** được xây dựng trên nền tảng **Spring Web MVC**.

Bài học này giúp bạn nắm vững cách thiết kế và triển khai REST API chuẩn công nghiệp với Spring Boot.

---

## 1. REST API là gì?
**REST (Representational State Transfer)** là một kiểu kiến trúc phần mềm định nghĩa các ràng buộc cho việc giao tiếp qua giao thức HTTP.
*   **Resource (Tài nguyên)**: Mọi dữ liệu (sản phẩm, hóa đơn, người dùng) đều được xem là một tài nguyên và được định danh bằng một **URI** (Unique Resource Identifier). Ví dụ: `/api/v1/products`.
*   **HTTP Methods**: Sử dụng các phương thức chuẩn của HTTP để thực hiện hành động:
    *   `GET`: Lấy thông tin tài nguyên.
    *   `POST`: Tạo mới tài nguyên.
    *   `PUT`: Cập nhật toàn bộ tài nguyên.
    *   `DELETE`: Xóa tài nguyên.

---

## 2. Các Annotation Cốt Lõi Trong Spring Web
Spring Boot cung cấp các annotation tiện lợi để biến một class thông thường thành một REST Endpoint xử lý request:

*   `@RestController`: Đánh dấu class là một controller phục vụ API REST. Nó là sự kết hợp của `@Controller` và `@ResponseBody`, tự động chuyển đổi kiểu trả về (ví dụ List, Object) thành chuỗi JSON.
*   `@RequestMapping`: Định nghĩa tiền tố URI dùng chung cho cả class. Ví dụ: `@RequestMapping("/api/v1/products")`.
*   `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: Ánh xạ các HTTP method tương ứng vào các phương thức xử lý cụ thể.
*   `@PathVariable`: Trích xuất biến động trực tiếp từ URL path (ví dụ: `/products/{id}` -> `@PathVariable Long id`).
*   `@RequestParam`: Lấy các tham số query dạng key-value sau dấu hỏi chấm (ví dụ: `/products?category=weapon` -> `@RequestParam String category`).
*   `@RequestBody`: Chuyển đổi dữ liệu JSON từ thân (body) của HTTP Request sang đối tượng Java DTO tương ứng.

---

## 3. Ví dụ một Controller Spring Boot Chuẩn
Dưới đây là mô phỏng cấu trúc của `ProductController` trong thực tế:

```java
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    // 1. GET: Lấy danh sách sản phẩm (có lọc theo category)
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String category) {
        // Xử lý lấy dữ liệu...
        return ResponseEntity.ok(products);
    }

    // 2. GET: Lấy chi tiết sản phẩm theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        // Tìm sản phẩm...
        if (product == null) {
            return ResponseEntity.notFound().build(); // HTTP 404
        }
        return ResponseEntity.ok(product); // HTTP 200
    }

    // 3. POST: Đăng bán sản phẩm mới
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
        // Lưu sản phẩm...
        return ResponseEntity.status(201).body(savedProduct); // HTTP 210 Created
    }
}
```

---

## 4. ResponseEntity - Quản lý HTTP Response
Trong ứng dụng thực tế, ta không nên trả về đối tượng Java thô trực tiếp. Thay vào đó, hãy sử dụng `ResponseEntity` để kiểm soát toàn diện HTTP Response bao gồm:
*   **HTTP Status Code**: `200 OK` (thành công), `201 Created` (tạo mới thành công), `400 Bad Request` (dữ liệu lỗi), `404 Not Found` (không tìm thấy), `500 Internal Error` (lỗi server).
*   **Headers**: Các siêu dữ liệu đi kèm.
*   **Body**: Nội dung phản hồi (thường là JSON).

---

## Tóm Tắt — Bài 28
```
✅ @RestController = @Controller + @ResponseBody (tự serialize kết quả ra JSON).
✅ URI nên dùng danh từ số nhiều đại diện cho tài nguyên (ví dụ: /api/v1/users).
✅ HTTP Methods xác định hành động: GET (đọc), POST (tạo), PUT (sửa), DELETE (xóa).
✅ Dùng PathVariable cho biến URL, RequestParam cho query param, RequestBody cho JSON body.
✅ Dùng ResponseEntity để trả về đúng cấu trúc HTTP Status và Body.
```
