# 📝 Bài Tập Thực Tế – Bài 06: Method

> 🎯 **Bối cảnh dự án:** Xây dựng **utility library** cho RaizeShop — các helper method dùng lại ở nhiều nơi trong codebase.

---

## 🔴 Bài Tập 1: ShopUtils Library ⭐⭐

**Bối cảnh thực tế:** Trong mọi dự án thực tế, team sẽ tạo một class utility chứa các method tái sử dụng. Đây là công việc của một Java developer ngay từ ngày đầu.

**Yêu cầu:** Tạo `ShopUtils.java` với đủ 8 utility method sau:

```java
public class ShopUtils {

    // 1. Format tiền VND đẹp: 1500000 → "1,500,000 đ"
    public static String formatVND(double amount) { ... }

    // 2. Format tiền ngắn: 1500000 → "1.5M" | 500000 → "500K"
    public static String formatShort(double amount) { ... }

    // 3. Tính giá sau giảm, throw exception nếu % giảm không hợp lệ
    public static double applyDiscount(double price, double discountPercent) { ... }

    // 4. Validate email (phải có @, có domain, không có space)
    public static boolean isValidEmail(String email) { ... }

    // 5. Validate số điện thoại VN (bắt đầu 0, đủ 10 số)
    public static boolean isValidPhone(String phone) { ... }

    // 6. Tạo order ID: "RZ-" + năm + tháng + "-" + 6 số ngẫu nhiên
    //    VD: "RZ-202404-836291"
    public static String generateOrderId() { ... }

    // 7. Mask thông tin nhạy cảm:
    //    "0912345678" → "091****678"
    //    "user@email.com" → "us**@e***.com"
    public static String maskSensitive(String data, String type) { ... }

    // 8. Tính điểm tích lũy: mỗi 10,000đ = 1 điểm, VIP nhân đôi
    public static int calculatePoints(double amount, boolean isVip) { ... }

    // Main để test tất cả method
    public static void main(String[] args) {
        System.out.println(formatVND(1_500_000));          // 1,500,000 đ
        System.out.println(formatShort(1_500_000));         // 1.5M
        System.out.println(applyDiscount(2_000_000, 15));   // 1700000.0
        System.out.println(isValidEmail("user@gmail.com")); // true
        System.out.println(isValidEmail("invalid.email"));  // false
        System.out.println(generateOrderId());              // RZ-202404-XXXXXX
        System.out.println(maskSensitive("0912345678", "phone")); // 091****678
        System.out.println(calculatePoints(150_000, false)); // 15 points
        System.out.println(calculatePoints(150_000, true));  // 30 points
    }
}
```

---

## 🟡 Bài Tập 2: Method Overloading — Tính Giá Linh Hoạt ⭐⭐

**Bối cảnh thực tế:** API design tốt thường cung cấp nhiều overload để caller có thể gọi theo cách phù hợp nhất với data họ có.

**Yêu cầu:** Tạo `PriceCalculator.java` với nhiều overload của `calculateTotal`:

```java
// Overload 1: Tính 1 sản phẩm (giá x số lượng)
public static double calculateTotal(double price, int qty) { ... }

// Overload 2: Tính có giảm giá
public static double calculateTotal(double price, int qty, double discountPercent) { ... }

// Overload 3: Tính có giảm giá VÀ VAT
public static double calculateTotal(double price, int qty, double discountPercent, boolean includeVat) { ... }

// Overload 4: Tính cho nhiều sản phẩm (mảng giá và số lượng)
public static double calculateTotal(double[] prices, int[] quantities) { ... }

// Overload 5: Varargs — tính tổng nhiều đơn hàng nhỏ
public static double calculateTotal(double... orderAmounts) { ... }
```

**Test case thực tế:**
```java
// Khách mua 3 Kiếm Rồng, giảm 20%, có VAT
double bill = calculateTotal(1_500_000, 3, 20, true);
// = 1,500,000 × 3 × 0.8 × 1.1 = 3,960,000 đ
System.out.println("Hóa đơn: " + ShopUtils.formatVND(bill));

// Admin tính tổng doanh thu nhiều đơn hàng
double tongDoanhThu = calculateTotal(1_500_000, 800_000, 2_300_000, 450_000);
```

---

## 🟡 Bài Tập 3: Validation Framework ⭐⭐

**Bối cảnh thực tế:** Trước khi lưu dữ liệu vào database, mọi backend đều phải validate input. Đây là pattern `static boolean is/validate...` cực kỳ phổ biến.

**Yêu cầu:** Tạo `InputValidator.java`:

```java
// Validate sản phẩm trước khi đăng lên shop
public static String validateProduct(String name, double price, 
                                      int quantity, String category) {
    // Kiểm tra từng field
    // name: không được null/blank, 3-100 ký tự, không có ký tự đặc biệt <>
    // price: > 0 và <= 999,999,999
    // quantity: >= 0 và <= 9999
    // category: phải thuộc ["weapon","armor","magic","accessory","pet"]
    //
    // Return: null nếu hợp lệ, hoặc String mô tả lỗi đầu tiên tìm thấy
}

// Validate hàng loạt và trả về danh sách lỗi
public static List<String> validateProductFull(String name, double price,
                                                int quantity, String category) {
    // Kiểm tra TẤT CẢ field và gom lỗi lại
    // Return: List rỗng nếu hợp lệ, hoặc List các dòng lỗi
}
```

**Test với data thực tế:**
```
✅ Kiếm Rồng +10, 1500000, 5, weapon       → HỢP LỆ
❌ "", 1500000, 5, weapon                  → Tên không được để trống
❌ Kiếm, -5000, 5, weapon                 → Giá phải > 0
❌ Kiếm<script>, 500000, 5, weapon        → Tên chứa ký tự không hợp lệ
❌ Kiếm Rồng, 500000, -1, robot          → Nhiều lỗi: số lượng âm, danh mục sai
```

---

## 🔴 Bài Tập 4: Recursive — Tính Phí Giới Thiệu (Referral) ⭐⭐⭐

**Bối cảnh thực tế:** Hệ thống MLM/referral: khi A giới thiệu B, B giới thiệu C... Khi C mua hàng, cả chuỗi đều nhận hoa hồng theo cấp. Đây là bài toán đệ quy điển hình trong fintech.

**Yêu cầu:** Tạo `ReferralSystem.java`:

```java
// Cấu trúc chuỗi giới thiệu (dùng array song song)
String[] users   = {"Root", "UserA", "UserB", "UserC", "UserD"};
int[]    parents = {-1,      0,       1,       2,       2      };
// Root không có parent (-1)
// UserA được Root giới thiệu
// UserB được UserA giới thiệu
// UserC được UserB giới thiệu
// UserD được UserB giới thiệu (cùng referrer với UserC)

// Hoa hồng theo cấp:
// Cấp 1 (trực tiếp): 5%
// Cấp 2: 2%
// Cấp 3: 1%
// Cấp 4+: 0.5%

// Khi UserD mua hàng 1,500,000 đ:
// UserB (cấp 1): 75,000 đ (5%)
// UserA (cấp 2): 30,000 đ (2%)
// Root  (cấp 3): 15,000 đ (1%)
// → Viết method đệ quy tính và in referral chain
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Tại sao validator method nên **return `List<String>` (tất cả lỗi)** thay vì throw exception ngay lỗi đầu tiên? Điều này ảnh hưởng thế nào đến UX của người dùng điền form?
- [ ] Pass by value với array: nếu method nhận `double[] prices` và sửa `prices[0] = 999`, giá trị ngoài có bị thay đổi không? Giải thích và khi nào đây là feature, khi nào là bug?
- [ ] `generateOrderId()` dùng `Math.random()` — điều này có thể gây ra **collision** (2 đơn hàng cùng ID) không? Trong production, developer dùng gì thay thế?
- [ ] Method `maskSensitive()` với logic phức tạp — test case nào quan trọng nhất cần test? Viết 5 test case biên (edge case).

---

👉 **Tiếp theo:** [Bài 07 – Class & Object](../../phase2-oop/bai-07-class-object/EXERCISES.md)
