# Bài 30: Spring Security & JWT

> 🟢 **Phase 5 – Bài 30/32** | Thời gian: ~5 giờ

---

Trong các ứng dụng Web như RaizeShop, việc bảo vệ hệ thống khỏi các truy cập trái phép là nhiệm vụ tối quan trọng. **Spring Security** cung cấp giải pháp bảo mật toàn diện, kết hợp cùng **JWT (JSON Web Token)** để triển khai cơ chế xác thực không trạng thái (Stateless Authentication) hiện đại.

---

## 1. Authentication và Authorization là gì?
Đây là hai khái niệm nền tảng thường bị nhầm lẫn trong bảo mật thông tin:

```
┌──────────────────────────────────────┐
│  Authentication (Xác thực)          │  ← Bạn là ai? (Đăng nhập bằng User/Pass)
└──────────────────┬───────────────────┘
                   │  (Sau khi xác thực thành công)
                   ▼
┌──────────────────────────────────────┐
│  Authorization (Phân quyền)          │  ← Bạn được phép làm gì? (Role: ADMIN, USER)
└──────────────────────────────────────┘
```

*   **Authentication (Xác thực)**: Quá trình xác minh danh tính người dùng (ví dụ: đối khớp Username/Password hoặc Token).
*   **Authorization (Phân quyền)**: Quá trình kiểm tra xem danh tính đã xác thực có quyền truy cập vào tài nguyên cụ thể hay không (ví dụ: chỉ có quyền `ADMIN` mới được xóa sản phẩm).

---

## 2. Stateless Authentication với JWT
Trong kiến trúc REST API hiện đại, máy chủ thường không lưu trữ Session của người dùng trong bộ nhớ (Stateless) nhằm tối ưu hóa hiệu năng và khả năng mở rộng. Thay vào đó, ta sử dụng **JWT (JSON Web Token)**.

### Quy trình xác thực JWT:
1.  **Client** gửi request đăng nhập (Username/Password) tới Server.
2.  **Server** xác thực tài khoản. Nếu đúng, server tạo ra một chuỗi mã hóa ký số gọi là **JWT Token** và trả về cho Client.
3.  **Client** lưu trữ token này (trong LocalStorage hoặc Cookie).
4.  Ở mỗi request tiếp theo, Client gửi token này trong tiêu đề HTTP Header:
    `Authorization: Bearer <token>`
5.  **Server** (thông qua Spring Security Filters) trích xuất token, giải mã kiểm tra tính hợp lệ của chữ ký (signature) mà không cần truy vấn lại CSDL. Nếu hợp lệ, cho phép request đi tiếp.

---

## 3. Cấu trúc của một JSON Web Token (JWT)
Một chuỗi JWT gồm 3 phần được phân tách bằng dấu chấm `.`:
`xxxxx.yyyyy.zzzzz`

*   **Header (Phần đầu - xxxxx)**: Chứa kiểu token (JWT) và thuật toán băm chữ ký (ví dụ: HS256).
*   **Payload (Phần thân - yyyyy)**: Chứa thông tin khai báo (Claims) về người dùng (ví dụ: `userId`, `username`, `roles`, thời gian hết hạn `exp`).
*   **Signature (Chữ ký - zzzzz)**: Được tạo bằng cách lấy phần Header và Payload mã hóa kết hợp với một chuỗi khóa bí mật (Secret Key) trên server. Giúp ngăn chặn việc Client tự ý chỉnh sửa nội dung token.

---

## 4. Tích hợp Spring Security
Spring Security hoạt động thông qua một chuỗi các bộ lọc (**Filter Chain**). Mỗi request gửi đến ứng dụng đều phải đi qua các filter này để kiểm tra xem có chứa token hợp lệ trong Header hay không:

```java
// Cấu hình bảo mật cơ bản trong Spring Security
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Tắt CSRF vì ứng dụng dùng Stateless API
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Cho phép công khai các route đăng nhập/đăng ký
                .requestMatchers("/api/admin/**").hasRole("ADMIN") // Chỉ Admin truy cập
                .anyRequest().authenticated() // Các endpoint khác bắt buộc phải đăng nhập
            );
        return http.build();
    }
}
```

---

## Tóm Tắt — Bài 30
```
✅ Authentication xác định danh tính (Bạn là ai). Authorization quyết định quyền hạn (Bạn làm được gì).
✅ JWT hỗ trợ cơ chế Stateless Auth, giúp Server không cần lưu Session trong bộ nhớ.
✅ JWT gồm 3 phần: Header (Metadata), Payload (Claims/Data), Signature (Chống giả mạo).
✅ Token được gửi trong HTTP Header dưới định dạng: Authorization: Bearer <JWT_Token>.
✅ Spring Security quản lý luồng bảo mật thông qua một chuỗi các Filter (Filter Chain).
```
