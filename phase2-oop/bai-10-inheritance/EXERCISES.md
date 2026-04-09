# 📝 Bài Tập Thực Tế – Bài 10: Kế Thừa (Inheritance)

> 🎯 **Bối cảnh dự án:** Thiết kế **hierarchy cho hệ thống User** — phân loại buyer, seller, admin với quyền hạn khác nhau.

---

## 🔴 Bài Tập 1: User Hierarchy ⭐⭐

**Bối cảnh thực tế:** Mọi hệ thống quản lý user đều có hierarchy. Spring Security xây dựng trên nguyên tắc này — `UserDetails` là "base class" cho mọi loại user.

**Yêu cầu:** Tạo hierarchy `User → Buyer → Seller → Admin`:

```java
// Base class — thông tin chung của mọi user
public class User {
    protected String id;
    protected String username;
    protected String email;
    protected double walletBalance;
    protected String createdAt;
    protected boolean isActive;

    public User(String username, String email) { ... }

    public void deposit(double amount) { ... }
    public String getDisplayName() { return username; }
    public String getRole() { return "USER"; }
    public boolean canBuy() { return false; }    // Override ở subclass
    public boolean canSell() { return false; }
    public boolean canAdmin() { return false; }
}

// Buyer: người mua hàng
public class Buyer extends User {
    private int loyaltyPoints;
    private String memberLevel; // "BRONZE", "SILVER", "GOLD", "DIAMOND"
    private int totalOrders;

    public Buyer(String username, String email) {
        super(username, email);
        // ...
    }

    @Override public boolean canBuy() { return true; }
    @Override public String getRole() { return "BUYER"; }

    public void earnPoints(int points) { ... }
    public boolean redeemPoints(int points) { ... }
    public String getMemberLevel() { ... } // Tính dựa trên totalOrders
}

// Seller: người bán
public class Seller extends User {
    private String shopName;
    private double sellerRating;
    private int totalSales;
    private String sellerTier; // "bronze", "silver", "gold", "diamond"
    private double commissionRate; // % phí sàn

    @Override public boolean canBuy() { return true; }  // Seller cũng mua được
    @Override public boolean canSell() { return true; }
    @Override public String getRole() { return "SELLER"; }

    public void completeSale(double amount) { ... }
    public double calculateCommission(double saleAmount) { ... }
}

// Admin: quản trị
public class Admin extends User {
    private String adminLevel; // "L1", "L2", "SUPER"
    private String[] permissions;

    @Override public boolean canAdmin() { return true; }
    @Override public String getRole() { return "ADMIN"; }

    public void banUser(User target, String reason) { ... }
    public void adjustBalance(User target, double amount, String reason) { ... }
}
```

---

## 🟡 Bài Tập 2: Product Hierarchy ⭐⭐

**Bối cảnh thực tế:** Table per hierarchy (TPH) trong JPA — một table Products có `dtype` column để phân biệt loại. Đây cách Hibernate implement `@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`.

**Yêu cầu:** Thiết kế `Product → WeaponProduct → ArmorProduct → SpecialProduct`:

```java
public abstract class Product {
    protected String id;
    protected String name;
    protected double basePrice;
    // ...

    // Abstract: mỗi loại tính giá theo cách riêng
    public abstract double getFinalPrice();

    // Abstract: mô tả đặc điểm riêng của từng loại
    public abstract String getSpecifications();

    // Concrete: dùng chung
    public String getDisplayCard() {
        return String.format("[%s] %s — %s",
                getCategory(), name, ShopUtils.formatVND(getFinalPrice()));
    }
}

public class WeaponProduct extends Product {
    private int attackPower;     // Sức tấn công cơ bản
    private int enhanceLevel;    // Cấp độ tăng cường (+0 đến +15)
    private String weaponType;   // "sword", "bow", "staff"

    // Giá tăng 20% cho mỗi cấp tăng cường
    @Override
    public double getFinalPrice() {
        return basePrice * Math.pow(1.2, enhanceLevel);
    }
}

public class ArmorProduct extends Product {
    private int defense;
    private String material;     // "iron", "mythril", "dragon_scale"
    private String[] resistances; // ["fire", "ice"]
}

// SpecialProduct: bundle nhiều item
public class BundleProduct extends Product {
    private Product[] items;
    private double bundleDiscount; // % giảm khi mua bundle

    @Override
    public double getFinalPrice() {
        double total = 0;
        for (Product item : items) total += item.getFinalPrice();
        return total * (1 - bundleDiscount / 100);
    }
}
```

---

## 🔴 Bài Tập 3: Notification System ⭐⭐⭐

**Bối cảnh thực tế:** Observer pattern + Inheritance — cách Spring Event, Android BroadcastReceiver hoạt động. Mỗi loại notification có cách gửi khác nhau nhưng cùng interface.

**Yêu cầu:** Tạo notification hierarchy:

```java
// Base
public abstract class Notification {
    protected String recipientId;
    protected String title;
    protected String message;
    protected String timestamp;
    protected boolean isRead;

    public abstract void send();
    public abstract String getChannel(); // "EMAIL", "SMS", "PUSH", "IN_APP"

    public void markAsRead() { this.isRead = true; }
    public String getSummary() {
        return String.format("[%s] %s: %s", getChannel(), title,
                message.length() > 50 ? message.substring(0, 50) + "..." : message);
    }
}

public class EmailNotification extends Notification {
    private String toEmail;
    private String htmlTemplate; // Email có thể là HTML

    @Override
    public void send() {
        // Giả lập gửi email
        System.out.printf("[EMAIL] Gửi tới: %s%n  Subject: %s%n  Body: %s%n",
                toEmail, title, message);
    }
}

public class SmsNotification extends Notification {
    private String phoneNumber;
    private static final int MAX_LENGTH = 160; // SMS limit

    @Override
    public void send() {
        // Truncate nếu quá 160 ký tự
        String sms = message.length() > MAX_LENGTH
                ? message.substring(0, 157) + "..."
                : message;
        System.out.printf("[SMS] Gửi tới: %s%n  Nội dung: %s%n", phoneNumber, sms);
    }
}
```

**Simulate notification center:**
```java
// Khi user B mua hàng của seller S, gửi 3 loại notification:
Notification[] notifications = {
    new EmailNotification(seller.getEmail(), "Đơn hàng mới!", orderDetails),
    new SmsNotification(seller.getPhone(), "Bạn có đơn hàng mới"),
    new PushNotification(seller.getDeviceToken(), "Đơn hàng mới từ " + buyer.getUsername())
};

for (Notification n : notifications) {
    n.send(); // Polymorphism!
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `Seller extends User` nghĩa là Seller IS-A User. Nhưng `Seller extends Product` sẽ là gì? Tại sao điều đó SAI về mặt thiết kế?
- [ ] Tại sao `protected` field (như `protected String id`) lại nguy hiểm hơn `private` + getter, đặc biệt khi dự án lớn với nhiều developer?
- [ ] Khi nào nên dùng **inheritance** vs **composition**? Áp dụng vào bài 3: `EmailNotification` có nên extend `Notification` hay nên implement `Sendable` interface?
- [ ] `super.method()` vs override hoàn toàn — trong `Seller.getDisplayName()`, muốn thêm shop name vào nhưng vẫn giữ từ base class, làm thế nào?

---

👉 **Tiếp theo:** [Bài 11 – Polymorphism](../bai-11-polymorphism/EXERCISES.md)
