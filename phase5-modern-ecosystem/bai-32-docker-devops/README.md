# Bài 32: Docker & DevOps cho Java

> 🟢 **Phase 5 – Bài 32/32** | Thời gian: ~4 giờ

---

Trong môi trường phát triển phần mềm hiện đại, việc ứng dụng hoạt động tốt trên máy tính của lập trình viên nhưng gặp lỗi khi deploy lên server sản xuất (production) là vấn đề thường thấy. **Docker** giúp đóng gói toàn bộ ứng dụng và môi trường chạy vào một khối thống nhất, làm tiền đề thiết lập luồng tự động hóa **DevOps** (CI/CD).

---

## 1. Ảo Hóa Container và Docker
*   **Docker** là một nền tảng mã nguồn mở cho phép đóng gói ứng dụng cùng toàn bộ các thư viện và cấu hình đi kèm thành một **Container** độc lập.
*   **Khác biệt với Máy ảo (Virtual Machine)**:
    *   *Virtual Machine (VM)*: Cần cài đặt một Hệ điều hành khách (Guest OS) hoàn chỉnh trên mỗi máy ảo -> Nặng, khởi động chậm, tốn tài nguyên.
    *   *Docker Container*: Sử dụng chung Nhân hệ điều hành (Kernel) với máy chủ vật lý, chỉ cô lập các tài nguyên phần mềm -> Nhẹ, khởi động trong vài mili-giây, tốn rất ít tài nguyên.

```
    VIRTUAL MACHINE (VM)                      DOCKER CONTAINER
 ┌─────────────────────────┐             ┌─────────────────────────┐
 │ App A  │ App B  │ App C  │             │ App A  │ App B  │ App C  │  ← Container nhẹ
 ├────────┼────────┼────────┤             ├────────┼────────┼────────┤
 │ Guest  │ Guest  │ Guest  │             │  Bins/Thư viện chia sẻ   │
 │ OS A   │ OS B   │ OS C   │             ├─────────────────────────┤
 ├────────┴────────┴────────┤             │      Docker Engine      │  ← Chia sẻ Kernel
 │       Hypervisor        │             ├─────────────────────────┤
 ├─────────────────────────┤             │         Host OS         │
 │     Hạ tầng vật lý      │             ├─────────────────────────┤
 └─────────────────────────┘             │     Hạ tầng vật lý      │
                                         └─────────────────────────┘
```

---

## 2. Dockerfile Cho Ứng Dụng Spring Boot
**Dockerfile** là một tệp văn bản chứa các chỉ thị từng bước để Docker xây dựng một Container Image.
Dưới đây là một ví dụ Dockerfile chuẩn hóa cho ứng dụng Spring Boot đã build ra file JAR:

```dockerfile
# Bước 1: Chọn Base Image chứa sẵn JRE (Java 21) nhẹ
FROM eclipse-temurin:21-jre-alpine

# Bước 2: Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Bước 3: Sao chép file JAR đã build từ máy ngoài vào container
COPY target/raizeshop-1.0.0.jar app.jar

# Bước 4: Mở cổng cổng mạng 8080 để bên ngoài kết nối
EXPOSE 8080

# Bước 5: Lệnh mặc định khởi động ứng dụng Java bên trong container
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 3. Docker Compose - Phối Hợp Nhiều Container
Thực tế, RaizeShop cần cả Web App (Spring Boot) và Database (MySQL).
**Docker Compose** cho phép định nghĩa và chạy nhiều container cùng lúc bằng một file cấu hình duy nhất `docker-compose.yml`:

```yaml
version: '3.8'
services:
  # 1. Container Cơ sở dữ liệu
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: raize_study
    ports:
      - "3306:3306"

  # 2. Container Ứng dụng Spring Boot
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db # Khởi động database trước, app sau
```

---

## 4. DevOps và Quy Trình CI/CD
*   **CI (Continuous Integration - Tích hợp liên tục)**: Mỗi khi developer đẩy code lên GitHub, một hệ thống tự động (như GitHub Actions hoặc Jenkins) sẽ kích hoạt biên dịch ứng dụng, chạy toàn bộ Unit Tests để phát hiện lỗi sớm.
*   **CD (Continuous Delivery/Deployment - Triển khai liên tục)**: Khi code vượt qua tất cả các bài kiểm tra, hệ thống tự động build Docker Image, đẩy lên kho lưu trữ (Docker Hub) và deploy trực tiếp lên máy chủ mà không cần con người thao tác thủ công.

---

## Tóm Tắt — Bài 32
```
✅ Docker đóng gói ứng dụng và môi trường chạy vào một Container duy nhất.
✅ Container nhẹ hơn VM rất nhiều vì sử dụng chung Nhân hệ điều hành (Kernel) của máy chủ.
✅ Dockerfile định nghĩa các bước đóng gói (FROM, WORKDIR, COPY, EXPOSE, ENTRYPOINT).
✅ Docker Compose quản lý và điều phối các ứng dụng gồm nhiều container (App + CSDL).
✅ CI/CD tự động hóa kiểm thử, đóng gói và deploy, tăng tốc độ phát hành sản phẩm.
```
