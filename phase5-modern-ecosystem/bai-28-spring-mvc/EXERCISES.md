# 📝 Bài Tập Thực Tế – Bài 28: Spring Web MVC & REST APIs

> 🎯 **Bối cảnh dự án:** Xây dựng cổng định tuyến (Routing Handler) mô phỏng Controller xử lý các REST API request cho RaizeShop.

---

## 🔴 Bài Tập 1: Bộ Định Tuyến Controller Simulator ⭐

**Bối cảnh thực tế:** Trong Spring Boot, `@RestController` và các `@Mapping` điều hướng request đến method xử lý. Tại bài này, hãy viết logic Java mô phỏng cơ chế router đó.

**Yêu cầu:** Viết phương thức `handleRequest(String method, String path, String body)` phân tích yêu cầu HTTP và trả về phản hồi tương ứng:
- Nếu `method` là `GET` và `path` là `/api/v1/products` -> Trả về JSON: `{"status": 200, "data": "Danh sách 100 sản phẩm"}`.
- Nếu `method` là `POST` và `path` là `/api/v1/products` -> Trích xuất dữ liệu từ `body` và trả về JSON: `{"status": 201, "message": "Đã tạo sản phẩm: " + [tên sản phẩm lấy từ body]}` (Giả sử body có dạng thô là tên sản phẩm, ví dụ: `"Kiếm Rồng"`).
- Các trường hợp khác -> Trả về JSON: `{"status": 404, "error": "Không tìm thấy đường dẫn"}`.

**Mẫu mã nguồn khởi đầu:**
```java
public class ProductControllerSim {
    public static void main(String[] args) {
        System.out.println(handleRequest("GET", "/api/v1/products", ""));
        System.out.println(handleRequest("POST", "/api/v1/products", "Nhẫn Ma Thuật +5"));
        System.out.println(handleRequest("GET", "/api/v1/unknown", ""));
    }

    public static String handleRequest(String method, String path, String body) {
        // TODO: Viết logic định tuyến tại đây và trả về chuỗi JSON chính xác
        if ("GET".equals(method) && "/api/v1/products".equals(path)) {
            return "{\"status\": 200, \"data\": \"Danh sách 100 sản phẩm\"}";
        } else if ("POST".equals(method) && "/api/v1/products".equals(path)) {
            return "{\"status\": 201, \"message\": \"Đã tạo sản phẩm: " + body + "\"}";
        } else {
            return "{\"status\": 404, \"error\": \"Không tìm thấy đường dẫn\"}";
        }
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra
- [ ] Sự khác biệt lớn nhất giữa `@Controller` và `@RestController` là gì?
- [ ] Tại sao trong lập trình REST API, chúng ta nên sử dụng danh từ số nhiều (như `/products`) thay vì động từ hành động (như `/getProducts`)?
- [ ] Khi nào nên dùng `@RequestParam` thay cho `@PathVariable`?
