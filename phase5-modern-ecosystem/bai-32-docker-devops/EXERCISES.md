# 📝 Bài Tập Thực Tế – Bài 32: Docker & DevOps cho Java

> 🎯 **Bối cảnh dự án:** Xây dựng module kiểm tra cấu hình biến môi trường (Environment Variables) trước khi khởi chạy ứng dụng RaizeShop trong Container Docker.

---

## 🔴 Bài Tập 1: Trình Xác Thực Cấu Hình Khởi Động Container Simulator ⭐

**Bối cảnh thực tế:** Trong Docker/DevOps, cấu hình ứng dụng được truyền qua biến môi trường. Trước khi kết nối CSDL, ứng dụng cần validate xem các biến môi trường cấu hình bắt buộc đã được định nghĩa đúng hay chưa.

**Yêu cầu:** Viết phương thức `validateEnv(String dbHost, String dbPassword)` thực hiện:
- Kiểm tra xem `dbHost` có bị null hoặc rỗng hay không. Nếu có, trả về: `"LỖI: Thiếu biến môi trường DB_HOST!"`.
- Kiểm tra xem `dbPassword` có bị null hoặc rỗng hay không. Nếu có, trả về: `"LỖI: Thiếu biến môi trường DB_PASSWORD!"`.
- Nếu đầy đủ: Trả về `"OK: Môi trường cấu hình hợp lệ!"`.

**Mẫu mã nguồn khởi đầu:**
```java
public class EnvValidator {
    public static void main(String[] args) {
        System.out.println(validateEnv("localhost", "123456")); // Output: OK: Môi trường cấu hình hợp lệ!
        System.out.println(validateEnv(null, "123456")); // Output: LỖI: Thiếu biến môi trường DB_HOST!
        System.out.println(validateEnv("localhost", "")); // Output: LỖI: Thiếu biến môi trường DB_PASSWORD!
    }

    public static String validateEnv(String dbHost, String dbPassword) {
        // TODO: Viết code kiểm tra và trả về thông báo tương ứng tại đây
        if (dbHost == null || dbHost.trim().isEmpty()) {
            return "LỖI: Thiếu biến môi trường DB_HOST!";
        }
        if (dbPassword == null || dbPassword.trim().isEmpty()) {
            return "LỖI: Thiếu biến môi trường DB_PASSWORD!";
        }
        return "OK: Môi trường cấu hình hợp lệ!";
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra
- [ ] So sánh sự khác biệt cơ bản giữa Docker Container và máy ảo (Virtual Machine).
- [ ] Hãy kể tên 3 chỉ thị (instruction) thông dụng nhất trong Dockerfile và giải thích vai trò của chúng.
- [ ] Vai trò của CI (Tích hợp liên tục) là gì trong phát triển phần mềm Agile/DevOps?
