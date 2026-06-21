# 📝 Bài Tập Thực Tế – Bài 30: Spring Security & JWT

> 🎯 **Bối cảnh dự án:** Xây dựng bộ lọc xác thực (Authentication Filter) trích xuất và kiểm tra định dạng Token gửi lên trong Header của ứng dụng RaizeShop.

---

## 🔴 Bài Tập 1: Trích Xuất và Xác Thực Định Dạng Token ⭐

**Bối cảnh thực tế:** Trong Spring Security Filter, bước đầu tiên khi xử lý request là kiểm tra xem tiêu đề `Authorization` có chứa token dạng `Bearer <token>` hợp lệ hay không.

**Yêu cầu:** Viết phương thức `extractToken(String authHeaderValue)` thực hiện:
- Kiểm tra xem `authHeaderValue` có hợp lệ (không null, không rỗng, bắt đầu bằng `"Bearer "` và phần token phía sau không được trống hay không).
- Nếu hợp lệ: Trích xuất và trả về chuỗi token thực sự phía sau chữ `"Bearer "`.
- Nếu không hợp lệ: Ném ra ngoại lệ `SecurityException` với thông báo `"Định dạng tiêu đề xác thực không hợp lệ!"`.

**Mẫu mã nguồn khởi đầu:**
```java
public class JwtHeaderValidator {
    public static void main(String[] args) {
        try {
            String header = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
            String token = extractToken(header);
            System.out.println("Token trích xuất thành công: " + token);
            
            // Chạy thử trường hợp lỗi
            extractToken("Basic YWRtaW46MTIzNDU2");
        } catch (Exception e) {
            System.out.println("Lỗi: " + e.getMessage());
        }
    }

    public static String extractToken(String authHeaderValue) {
        // TODO: Viết code trích xuất token tại đây
        if (authHeaderValue == null || !authHeaderValue.startsWith("Bearer ")) {
            throw new SecurityException("Định dạng tiêu đề xác thực không hợp lệ!");
        }
        String token = authHeaderValue.substring(7).trim();
        if (token.isEmpty()) {
            throw new SecurityException("Định dạng tiêu đề xác thực không hợp lệ!");
        }
        return token;
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra
- [ ] Tại sao sử dụng kiến trúc Stateless REST API lại không khuyên dùng Stateful Session truyền thống?
- [ ] Phần chữ ký (Signature) trong JWT Token được tạo ra nhằm ngăn chặn rủi ro an ninh nào?
- [ ] Spring Security Filter Chain hoạt động theo cơ chế nào? Request sẽ đi qua filter trước hay đi vào controller trước?
