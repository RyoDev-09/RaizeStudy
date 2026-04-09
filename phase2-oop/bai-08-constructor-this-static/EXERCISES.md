# 📝 Bài Tập Thực Tế – Bài 08: Constructor, this, static

> 🎯 **Bối cảnh dự án:** Hoàn thiện domain model với **constructor đúng chuẩn** và **class-level state** — nền tảng của Spring Bean, Singleton pattern.

---

## 🔴 Bài Tập 1: Product với Multiple Constructors ⭐⭐

**Bối cảnh thực tế:** Spring Data JPA yêu cầu **no-arg constructor**. Nhưng code của bạn lại muốn constructor đầy đủ fields. Đây là lý do `@Entity` class cần cả hai. Bây giờ bạn sẽ hiểu tại sao.

**Yêu cầu:** Nâng cấp `Product.java` với 4 constructor:

```java
public class Product {
    private String id;
    private String name;
    private double price;
    private int stock;
    private String category;
    private double rating;
    private int reviewCount;
    private boolean isActive;
    private static int totalProductsCreated = 0; // Class-level counter

    // Constructor 1: No-arg (bắt buộc cho JPA/serialization)
    public Product() { ... }

    // Constructor 2: Chỉ cần tên và giá (tạo draft product)
    public Product(String name, double price) { ... }

    // Constructor 3: Đầy đủ fields cần thiết
    public Product(String name, double price, int stock, String category) { ... }

    // Constructor 4: Copy constructor (clone object)
    public Product(Product other) { ... }

    // Static method: factory method pattern
    public static Product createWeapon(String name, double price) { ... }
    public static Product createArmor(String name, double price)  { ... }

    // Static: tổng số product đã tạo (monitoring)
    public static int getTotalCreated() { return totalProductsCreated; }
}
```

**Test:**
```java
Product p1 = new Product("Kiếm Rồng", 1_500_000, 5, "weapon");
Product p2 = Product.createArmor("Giáp Kim Cương", 3_000_000);
Product p3 = new Product(p1); // Clone p1
p3.applyDiscount(10); // Đảm bảo sửa p3 không ảnh hưởng p1

System.out.println("Tổng products đã tạo: " + Product.getTotalCreated()); // 3
```

---

## 🟡 Bài Tập 2: AppConfig — Singleton Pattern với static ⭐⭐

**Bối cảnh thực tế:** Configuration trong Spring Boot (`@ConfigurationProperties`) hoạt động theo nguyên tắc này: chỉ có **1 instance** duy nhất, đọc config một lần, dùng khắp nơi.

**Yêu cầu:** Tạo `AppConfig.java`:

```java
public class AppConfig {
    // Static instance duy nhất (Singleton)
    private static AppConfig instance;

    // Cấu hình ứng dụng
    private final String appName;
    private final String version;
    private final double vatRate;
    private final double platformFee;
    private final int maxCartItems;
    private final int sessionTimeout; // phút

    // Constructor private — không ai tạo trực tiếp được
    private AppConfig() {
        this.appName = "RaizeShop";
        this.version = "1.0.0";
        this.vatRate = 10.0;
        this.platformFee = 5.0;
        this.maxCartItems = 10;
        this.sessionTimeout = 30;
    }

    // Static factory method — điểm truy cập duy nhất
    public static AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
            System.out.println("[INFO] AppConfig khởi tạo lần đầu");
        }
        return instance;
    }

    // Getters (không có setters — immutable config!)
    public double getVatRate() { return vatRate; }
    // ...
}

// Test: gọi getInstance() 5 lần → chỉ in "[INFO]..." một lần
AppConfig cfg1 = AppConfig.getInstance();
AppConfig cfg2 = AppConfig.getInstance();
System.out.println(cfg1 == cfg2); // true — cùng một object!
System.out.println("VAT: " + cfg1.getVatRate() + "%");
```

---

## 🟡 Bài Tập 3: OrderIdGenerator — static state ⭐⭐

**Bối cảnh thực tế:** Trong database, auto-increment ID là tính năng của DB engine. Nhưng khi mock hoặc test, bạn cần tự implement ID generation. `static` counter là cách đơn giản nhất.

**Yêu cầu:** Tạo `OrderIdGenerator.java`:

```java
public class OrderIdGenerator {
    private static int dailyCounter = 0;
    private static String currentDate = "";

    // Tạo ID dạng: RZ-20240403-00001
    // Mỗi ngày mới → reset counter về 0
    public static synchronized String next() {
        String today = getCurrentDate(); // Format: yyyyMMdd
        if (!today.equals(currentDate)) {
            currentDate = today;
            dailyCounter = 0;
            System.out.println("[INFO] Reset counter cho ngày mới: " + today);
        }
        return String.format("RZ-%s-%05d", today, ++dailyCounter);
    }

    public static int getDailyCount() { return dailyCounter; }
    // ...
}

// Test: tạo 5 orders
for (int i = 0; i < 5; i++) {
    System.out.println(OrderIdGenerator.next());
}
// RZ-20240403-00001
// RZ-20240403-00002
// ...
System.out.println("Hôm nay đã tạo: " + OrderIdGenerator.getDailyCount() + " orders");
```

---

## 🔴 Bài Tập 4: Builder Pattern — Đặt Order Phức Tạp ⭐⭐⭐

**Bối cảnh thực tế:** `Builder pattern` dùng `this` để chain method — Lombok's `@Builder` generate code này tự động. Hiểu nó giúp bạn debug Lombok và đọc được code của người khác.

**Yêu cầu:** Implement `OrderBuilder`:

```java
// Mục tiêu: tạo Order theo kiểu fluent, đọc như "câu văn"
Order order = new OrderBuilder()
    .buyer("raize99")
    .addItem("RZ-WPN-001", 1_500_000, 2)
    .addItem("RZ-ARM-001", 800_000, 1)
    .applyVoucher("SALE20")
    .shippingAddress("HCM, Quận 1")
    .paymentMethod("WALLET")
    .build();

System.out.println(order.getReceipt());
```

**Implement `OrderBuilder`** với `return this` ở mỗi method để chain được.

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Tại sao Singleton lại cần `synchronized` keyword trong môi trường multi-thread? (Preview bài 19)
- [ ] Copy constructor vs `clone()` — Lombok's `@Builder` dùng cách nào? Khi nào shallow copy gây bug?
- [ ] `this()` gọi constructor khác vs `super()` — khác nhau thế nào? Quy tắc: phải nằm dòng **đầu tiên** của constructor — tại sao Java enforce điều này?
- [ ] `static final` CONSTANT vs `static` counter — cả hai đều là class-level state, nhưng khác nhau thế nào về thread-safety?

---

👉 **Tiếp theo:** [Bài 09 – Encapsulation](../bai-09-encapsulation/EXERCISES.md)
