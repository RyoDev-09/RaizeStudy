# Bài 31: Microservices & Spring Cloud

> 🟢 **Phase 5 – Bài 31/32** | Thời gian: ~6 giờ

---

Khi một hệ thống như RaizeShop phát triển lớn mạnh với lượng truy cập khổng lồ, việc duy trì một mã nguồn duy nhất (**Monolithic Architecture**) sẽ bộc lộ nhiều hạn chế về khả năng mở rộng và bảo trì. **Microservices (Kiến trúc vi dịch vụ)** ra đời giúp chia nhỏ hệ thống thành các dịch vụ độc lập kết nối với nhau thông qua hệ sinh thái **Spring Cloud**.

---

## 1. Monolithic vs Microservices
Hãy hình dung sự khác biệt giữa hai lối kiến trúc hệ thống phổ biến:

```
    MONOLITHIC (Khối duy nhất)              MICROSERVICES (Vi dịch vụ)
    ┌─────────────────────────┐            ┌──────────────┐   ┌──────────────┐
    │  UI + Business + DB     │            │ USER SERVICE │   │ ITEM SERVICE │
    │  (Chạy chung 1 server)  │            └──────┬───────┘   └──────┬───────┘
    └─────────────────────────┘                   │                  │
                                           ┌──────▼──────────────────▼──────┐
                                           │          API GATEWAY           │
                                           └────────────────────────────────┘
```

*   **Monolithic (Kiến trúc nguyên khối)**: Toàn bộ chức năng (quản lý user, sản phẩm, thanh toán) chạy chung trong một ứng dụng duy nhất, sử dụng chung một cơ sở dữ liệu.
    *   *Ưu điểm*: Dễ phát triển ở giai đoạn đầu, dễ deploy.
    *   *Nhược điểm*: Khó mở rộng riêng lẻ, một module lỗi có thể làm sập toàn bộ hệ thống, thời gian build lâu.
*   **Microservices (Kiến trúc vi dịch vụ)**: Chia nhỏ ứng dụng thành các dịch vụ nhỏ (ví dụ: `UserService`, `ProductService`, `OrderService`), hoạt động độc lập, tự quản lý CSDL riêng và giao tiếp với nhau qua HTTP (REST API) hoặc Message Queue.
    *   *Ưu điểm*: Phát triển độc lập, dễ dàng scale-up dịch vụ có tải cao, tăng khả năng chịu lỗi.
    *   *Nhược điểm*: Hệ thống phân tán phức tạp, khó quản lý giao dịch CSDL (distributed transactions).

---

## 2. Các Thành Phần Cốt Lõi Trong Spring Cloud
Spring Cloud cung cấp các công cụ thiết lập hạ tầng chịu lỗi và điều phối Microservices:

### 1. Service Discovery (Eureka Server)
Trong hệ thống Microservices, các server/container có thể khởi động hoặc tắt đi liên tục dẫn đến IP thay đổi.
*   **Eureka Server** đóng vai trò như một **danh bạ điện thoại**.
*   Mỗi dịch vụ khi khởi động sẽ tự đăng ký tên và địa chỉ của nó với Eureka (gọi là Service Registration).
*   Khi `OrderService` cần gọi `UserService`, nó chỉ cần hỏi Eureka địa chỉ của `UserService` mà không cần cấu hình cứng IP (Service Discovery).

### 2. API Gateway (Spring Cloud Gateway)
Đóng vai trò là **cửa ngõ duy nhất** đón nhận mọi request từ Client:
*   Định tuyến request đến đúng microservice đích ở phía sau.
*   Thực hiện kiểm tra bảo mật, xác thực tập trung (Token check) tại cổng vào trước khi cho phép đi tiếp vào các service nội bộ.
*   Hỗ trợ cân bằng tải (Load Balancing) giữa các instance của một service.

### 3. Declarative HTTP Client (OpenFeign)
Giúp việc gọi REST API giữa các service dễ dàng như gọi một phương thức Java cục bộ:
```java
// Khai báo Feign Client để gọi UserService
@FeignClient(name = "USER-SERVICE")
public interface UserClient {
    @GetMapping("/api/v1/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);
}
```

---

## Tóm Tắt — Bài 31
```
✅ Monolithic chạy chung một khối, Microservices chia nhỏ thành các dịch vụ chạy độc lập.
✅ Microservices giúp mở rộng linh hoạt nhưng làm tăng độ phức tạp trong cấu hình và quản trị hệ thống.
✅ Eureka Server hoạt động như danh bạ giúp các dịch vụ tự động đăng ký và tìm thấy địa chỉ của nhau.
✅ API Gateway là cổng vào duy nhất, chịu trách nhiệm xác thực tập trung và định tuyến request.
✅ OpenFeign giúp gọi API giữa các microservices một cách tường minh và ngắn gọn.
```
