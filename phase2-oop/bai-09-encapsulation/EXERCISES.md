# 📝 Bài Tập Thực Tế – Bài 09: Encapsulation (Đóng Gói)

> 🎯 **Bối cảnh dự án:** Bảo vệ **data integrity** — đảm bảo không có code nào có thể set Stock âm, Price âm, hay Rating ngoài 0-5.

---

## 🔴 Bài Tập 1: Product với Encapsulation Đầy Đủ ⭐⭐

**Bối cảnh thực tế:** Đây chính là cách viết JPA Entity đúng chuẩn. Hibernate dùng getter/setter để đọc/ghi dữ liệu, và validation trong setter ngăn dữ liệu rác vào database.

**Yêu cầu:** Refactor `Product.java` — chuyển tất cả field sang `private` và implement getter/setter có validation:

```java
public class Product {
    private String id;
    private String name;
    private double price;
    private int stock;
    private String category;
    private double rating;      // 0.0 - 5.0
    private int reviewCount;
    private boolean active;

    // ❌ Setter SAU ĐÂY là sai — tại sao?
    // public void setPrice(double price) { this.price = price; }

    // ✅ Setter đúng với validation:
    public void setPrice(double price) {
        if (price <= 0) throw new IllegalArgumentException("Giá phải > 0, nhận được: " + price);
        if (price > 999_999_999) throw new IllegalArgumentException("Giá quá lớn: " + price);
        this.price = price;
    }

    public void setStock(int stock) {
        // Stock không được âm
        // ...
    }

    public void setRating(double rating) {
        // Rating phải 0.0 - 5.0
        // reviewCount phải tăng khi set rating mới
        // Cần tính rating TB? Hay chỉ set thẳng?
    }

    public void setName(String name) {
        // Trim whitespace
        // Không được null/blank
        // Không được quá 100 ký tự
    }

    // Derived getter (không có field tương ứng)
    public boolean isInStock() { return stock > 0; }
    public boolean isLowStock() { return stock > 0 && stock <= 3; }
    public String getStockStatus() {
        if (stock == 0) return "🔴 Hết hàng";
        if (stock <= 3) return "🟡 Sắp hết (" + stock + " còn lại)";
        return "🟢 Còn hàng (" + stock + ")";
    }
}
```

**Test "phá" validation:**
```java
Product p = new Product("Kiếm Rồng", 1_500_000);
try { p.setPrice(-500_000); } catch (Exception e) { System.out.println("✅ Bắt được: " + e.getMessage()); }
try { p.setStock(-1); }      catch (Exception e) { System.out.println("✅ Bắt được: " + e.getMessage()); }
try { p.setRating(6.0); }    catch (Exception e) { System.out.println("✅ Bắt được: " + e.getMessage()); }
```

---

## 🟡 Bài Tập 2: UserAccount — Bảo Mật Field Nhạy Cảm ⭐⭐

**Bối cảnh thực tế:** Password KHÔNG BAO GIỜ được expose ra ngoài. Đây là nguyên tắc bảo mật cơ bản — getter cho password là security hole.

**Yêu cầu:** Tạo `UserAccount.java`:

```java
public class UserAccount {
    private String username;
    private String hashedPassword; // Hash bằng SHA256 đơn giản (dùng String thôi)
    private String email;
    private double walletBalance;
    private String role;    // "USER", "SELLER", "ADMIN"
    private boolean locked;
    private int failedLoginAttempts;

    // ❌ KHÔNG có getter cho hashedPassword!
    // Thay vào đó:
    public boolean verifyPassword(String rawPassword) {
        String hashed = simpleHash(rawPassword); // Giả lập hash
        return hashed.equals(this.hashedPassword);
    }

    // ❌ KHÔNG có setter trực tiếp cho walletBalance!
    // Thay vào đó:
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Số tiền nạp phải > 0");
        this.walletBalance += amount;
        System.out.printf("[LOG] %s nạp %,.0f đ. Số dư mới: %,.0f đ%n",
                username, amount, walletBalance);
    }

    public void withdraw(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Số tiền rút phải > 0");
        if (amount > walletBalance) throw new IllegalStateException(
                "Số dư không đủ. Cần: " + amount + ", có: " + walletBalance);
        this.walletBalance -= amount;
    }

    // Chỉ ADMIN mới đổi được role
    public void setRole(String newRole, UserAccount requestedBy) {
        if (!"ADMIN".equals(requestedBy.getRole())) {
            throw new SecurityException("Không có quyền thay đổi role!");
        }
        this.role = newRole;
    }
}
```

---

## 🔴 Bài Tập 3: Immutable Config Object ⭐⭐⭐

**Bối cảnh thực tế:** Trong Java, `String`, `Integer`, `LocalDate` đều là **immutable**. Khi design API trả về data mà bạn không muốn caller sửa được, bạn dùng immutable object.

**Yêu cầu:** Tạo `PricingPolicy.java` — immutable object:

```java
public final class PricingPolicy { // final = không thể extend
    private final double vatRate;
    private final double platformFee;
    private final double vipDiscount;
    private final double[] tierThresholds;  // Ngưỡng tier (mảng!)

    public PricingPolicy(double vatRate, double platformFee,
                          double vipDiscount, double[] tierThresholds) {
        // Validate tất cả tham số
        // ⚠️ CẠNH BẪY: copy mảng để tránh caller vẫn giữ reference
        this.tierThresholds = tierThresholds.clone(); // Defensive copy!
    }

    // Chỉ có getters — không có setters
    public double getVatRate() { return vatRate; }

    // ⚠️ Trả về copy của mảng, không phải mảng gốc!
    public double[] getTierThresholds() {
        return tierThresholds.clone();
    }

    // Tạo policy mới với thay đổi (không sửa object cũ)
    // Đây là pattern của Java's Date và String
    public PricingPolicy withVatRate(double newVatRate) {
        return new PricingPolicy(newVatRate, this.platformFee,
                this.vipDiscount, this.tierThresholds);
    }
}
```

**Test immutability:**
```java
PricingPolicy policy = new PricingPolicy(10.0, 5.0, 20.0, new double[]{1M, 5M, 10M});

// Thử phá immutability:
double[] tiers = policy.getTierThresholds();
tiers[0] = 999_999_999; // Thay đổi array nhận về
System.out.println(policy.getTierThresholds()[0]); // Vẫn là 1000000 — immutable!
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Tại sao trong bài 3, ta phải `clone()` mảng cả khi nhận vào (constructor) lẫn khi trả ra (getter)? Viết code chứng minh bug nếu không clone.
- [ ] Lombok `@Data` tự generate getter/setter — nhưng setter không có validation. Cách đúng trong dự án thực là dùng `@Data` hay tự viết?
- [ ] `private` field + public getter/setter = encapsulation? Hay còn cần gì nữa? (Gợi ý: validation, defensive copy, business logic)
- [ ] Tại sao `String` trong Java được thiết kế immutable? Cho ví dụ security issue nếu String mutable trong authentication code.

---

👉 **Tiếp theo:** [Bài 10 – Inheritance](../bai-10-inheritance/EXERCISES.md)
