# 📝 Bài Tập Thực Tế – Bài 31: Microservices & Spring Cloud

> 🎯 **Bối cảnh dự án:** Xây dựng module định tuyến định danh dịch vụ mô phỏng API Gateway cho hệ thống Microservices của RaizeShop.

---

## 🔴 Bài Tập 1: Phân Tích Đường Dẫn Định Tuyến API Gateway Simulator ⭐

**Bối cảnh thực tế:** API Gateway nhận toàn bộ request từ client, phân tích URI path để xác định xem cần chuyển tiếp (route) request này tới microservice nào chạy ở phía sau backend.

**Yêu cầu:** Viết phương thức `routeRequest(String path)` phân tích đường dẫn URL và trả về tên Service tương ứng:
- Nếu path bắt đầu bằng `/api/v1/users` -> Trả về: `"USER-SERVICE"`.
- Nếu path bắt đầu bằng `/api/v1/products` hoặc `/api/v1/items` -> Trả về: `"PRODUCT-SERVICE"`.
- Nếu path bắt đầu bằng `/api/v1/orders` -> Trả về: `"ORDER-SERVICE"`.
- Các trường hợp khác -> Trả về: `"UNKNOWN-SERVICE"`.

**Mẫu mã nguồn khởi đầu:**
```java
public class GatewayRouterSim {
    public static void main(String[] args) {
        System.out.println(routeRequest("/api/v1/users/profile")); // Output: USER-SERVICE
        System.out.println(routeRequest("/api/v1/products/1001")); // Output: PRODUCT-SERVICE
        System.out.println(routeRequest("/api/v1/orders/checkout")); // Output: ORDER-SERVICE
        System.out.println(routeRequest("/api/v1/unknown")); // Output: UNKNOWN-SERVICE
    }

    public static String routeRequest(String path) {
        // TODO: Viết logic phân tích path và trả về tên Service chính xác tại đây
        if (path == null) {
            return "UNKNOWN-SERVICE";
        }
        if (path.startsWith("/api/v1/users")) {
            return "USER-SERVICE";
        } else if (path.startsWith("/api/v1/products") || path.startsWith("/api/v1/items")) {
            return "PRODUCT-SERVICE";
        } else if (path.startsWith("/api/v1/orders")) {
            return "ORDER-SERVICE";
        } else {
            return "UNKNOWN-SERVICE";
        }
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra
- [ ] So sánh kiến trúc Monolith và Microservices. Tại sao các startup thường bắt đầu bằng Monolith?
- [ ] Eureka Server giúp giải quyết vấn đề gì trong hạ tầng Microservices khi các dịch vụ liên tục thay đổi IP/Port?
- [ ] API Gateway đóng vai trò gì? Tại sao không cho Client gọi trực tiếp tới từng Microservice ở phía sau?
