# 📝 Bài Tập Thực Tế – Bài 29: Spring Data JPA & Hibernate

> 🎯 **Bối cảnh dự án:** Thiết lập mô hình hóa lớp dữ liệu Entity đại diện cho tài khoản người dùng (`UserEntity`) của RaizeShop trong hệ thống JPA.

---

## 🔴 Bài Tập 1: Mô Phỏng Khai Báo Class Entity & Validate ⭐

**Bối cảnh thực tế:** Khi viết Entity, lập trình viên cần thiết lập chính xác các trường dữ liệu và ràng buộc. Trong bài tập này, hãy tạo một class mô phỏng cấu trúc của Entity `UserEntity`.

**Yêu cầu:** Viết class `UserEntity` gồm:
- Các trường private: `id` (Long), `username` (String), `balance` (Double).
- Có constructor đầy đủ tham số và không tham số.
- Viết phương thức `validate()` kiểm tra:
  - Nếu `username` bị null hoặc có độ dài nhỏ hơn 3 ký tự -> Ném ra ngoại lệ `IllegalArgumentException` với thông báo `"Username không hợp lệ!"`.
  - Nếu `balance` nhỏ hơn 0 -> Ném ra ngoại lệ `IllegalArgumentException` với thông báo `"Số dư tài khoản không được âm!"`.

**Mẫu mã nguồn khởi đầu:**
```java
public class UserEntity {
    private Long id;
    private String username;
    private Double balance;

    public UserEntity() {}

    public UserEntity(Long id, String username, Double balance) {
        this.id = id;
        this.username = username;
        this.balance = balance;
    }

    public void validate() {
        // TODO: Viết code kiểm tra ràng buộc tại đây
        if (username == null || username.length() < 3) {
            throw new IllegalArgumentException("Username không hợp lệ!");
        }
        if (balance == null || balance < 0) {
            throw new IllegalArgumentException("Số dư tài khoản không được âm!");
        }
    }

    public static void main(String[] args) {
        try {
            UserEntity user = new UserEntity(1L, "rz", 100.0);
            user.validate();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra
- [ ] JPA và Hibernate khác nhau thế nào? Hãy lấy ví dụ so sánh thực tế.
- [ ] Tại sao mọi JPA Entity bắt buộc phải có một Constructor không tham số (No-Arg Constructor)?
- [ ] Điều gì xảy ra khi bạn đặt tên phương thức trong Repository là `findByEmailAndStatus(String email, String status)`?
