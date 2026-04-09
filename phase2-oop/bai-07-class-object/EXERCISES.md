# 📝 Bài Tập Thực Tế – Bài 07: Class & Object

> 🎯 **Bối cảnh dự án:** Thiết kế **domain model** cho RaizeShop — đây là nền tảng của mọi dự án Spring Boot/JPA thực tế.

---

## 🔴 Bài Tập 1: Thiết Kế Class Product ⭐⭐

**Bối cảnh thực tế:** Đây chính là Java Bean / JPA Entity bạn sẽ viết trong Spring Boot. Hiểu class từ đầu giúp bạn hiểu tại sao `@Entity`, `@Column` hoạt động như vậy.

**Yêu cầu:** Tạo `Product.java` và `ProductTest.java`:

```java
public class Product {
    // Fields (sẽ map vào cột database)
    String id;          // "RZ-WPN-0001"
    String name;        // "Kiếm Rồng +10"
    String description;
    double price;
    int stock;
    String category;    // "weapon", "armor", "magic"
    double rating;
    int reviewCount;
    boolean isActive;
    String createdAt;   // Dùng String cho đơn giản

    // Behaviors (methods)
    // 1. isInStock() → boolean
    // 2. applyDiscount(double percent) → void (sửa price)
    // 3. addReview(double newRating) → void (cập nhật rating TB)
    // 4. getDisplayInfo() → String (format đẹp để hiển thị)
    // 5. isExpensive() → boolean (price > 1,000,000)
    // 6. getSummary() → String (dùng cho danh sách, tối đa 50 ký tự)
}
```

**Test trong `ProductTest.java`:**
```java
// Tạo 3 objects Product, test tất cả method
Product sword = new Product();
sword.name = "Kiếm Rồng +10";
sword.price = 1_500_000;
sword.stock = 5;
sword.rating = 0;
sword.reviewCount = 0;
sword.isActive = true;

// Test 1: Ai đó mua → stock giảm
sword.stock--;
System.out.println("Còn hàng: " + sword.isInStock()); // true (còn 4)

// Test 2: Ai đó review 5 sao → rating cập nhật
sword.addReview(5.0);
sword.addReview(4.5);
System.out.printf("Rating: %.1f (%d lượt)%n", sword.rating, sword.reviewCount);

// Test 3: Admin giảm giá 20% → price cập nhật
sword.applyDiscount(20);
System.out.printf("Giá sau giảm: %,.0f đ%n", sword.price); // 1,200,000

System.out.println(sword.getDisplayInfo());
```

**Output `getDisplayInfo()` mong đợi:**
```
╔══════════════════════════════════════════╗
║ Kiếm Rồng +10                           ║
║ Danh mục: weapon | ID: RZ-WPN-0001      ║
║ Giá: 1,200,000 đ                        ║
║ Rating: 4.8 ⭐ (2 đánh giá)             ║
║ Tình trạng: ✅ Còn hàng (4 cái)         ║
╚══════════════════════════════════════════╝
```

---

## 🟡 Bài Tập 2: ShoppingCart Object ⭐⭐

**Bối cảnh thực tế:** Session cart (giỏ hàng) là stateful object điển hình — lưu state của người dùng trong một phiên mua sắm.

**Yêu cầu:** Tạo `ShoppingCart.java`:

```java
public class ShoppingCart {
    String userId;
    String[] productIds;   // Mảng ID sản phẩm trong giỏ
    int[] quantities;       // Số lượng tương ứng
    double[] prices;        // Giá tại thời điểm thêm vào giỏ
    int itemCount;          // Số loại sản phẩm hiện tại
    String voucherCode;     // Mã giảm giá (null nếu chưa áp)

    // Methods:
    // addItem(productId, price, qty) → thêm vào giỏ
    //   - Nếu đã có → tăng số lượng
    //   - Nếu giỏ đầy (max 10 loại) → in cảnh báo
    //
    // removeItem(productId) → xóa khỏi giỏ
    //
    // getSubtotal() → tổng trước khi giảm giá
    //
    // applyVoucher(code) → áp voucher (SALE20=20%, VIPONLY=30%)
    //
    // checkout() → in hóa đơn và "xóa" giỏ hàng
    //
    // displayCart() → in giỏ hàng dạng bảng đẹp
}
```

**Output `displayCart()` mong đợi:**
```
╔═══════════════════════════════════════════════════════╗
║                 GIỎ HÀNG CỦA raize99                 ║
╠══════╦═══════════════════════╦═══════╦═══════════════╣
║  STT ║ Sản phẩm              ║  SL   ║ Thành tiền    ║
╠══════╬═══════════════════════╬═══════╬═══════════════╣
║   1  ║ Kiếm Rồng +10         ║   2   ║  3,000,000 đ  ║
║   2  ║ Nhẫn Hộ Mệnh          ║   1   ║    350,000 đ  ║
║   3  ║ Giáp Băng Giá         ║   1   ║  1,200,000 đ  ║
╠══════╩═══════════════════════╩═══════╬═══════════════╣
║ Voucher: SALE20 (−20%)              ║   −910,000 đ  ║
╠═════════════════════════════════════╬═══════════════╣
║ TỔNG THANH TOÁN                     ║  3,640,000 đ  ║
╚═════════════════════════════════════╩═══════════════╝
```

---

## 🔴 Bài Tập 3: Multiple Objects Tương Tác ⭐⭐⭐

**Bối cảnh thực tế:** Trong một transaction, nhiều objects tương tác nhau: User → ShoppingCart → Product → Order. Đây là cách bạn hiểu Object interaction trước khi học Service layer.

**Yêu cầu:** Tạo `User.java`, `Order.java`, và `TransactionSimulator.java`:

```java
// User chứa thông tin và ví tiền
class User {
    String username;
    String email;
    double walletBalance;
    int loyaltyPoints;
    String memberClass; // "BRONZE", "SILVER", "GOLD", "DIAMOND"
    // ...
}

// Order lưu thông tin giao dịch
class Order {
    String orderId;
    String buyerUsername;
    String[] productIds;
    double totalAmount;
    double discountApplied;
    double finalAmount;
    String status; // "PENDING", "PAID", "CANCELLED"
    String createdAt;
}
```

**Simulate một session mua hàng hoàn chỉnh:**
```
1. User "raize99" đăng nhập (tạo User object)
2. Thêm 3 sản phẩm vào giỏ (ShoppingCart)
3. Áp voucher SALE20
4. Checkout → tạo Order object
5. Thanh toán từ ví → User.walletBalance giảm
6. Cộng loyalty points (1 điểm per 10,000đ)
7. In receipt đầy đủ
```

**Business Rules cần implement:**
- Membership discount chồng lên voucher: GOLD thêm 5%, DIAMOND thêm 10%
- Loyalty points: mỗi 10,000đ = 1 điểm; 1000 điểm = voucher 50,000đ
- Nếu ví không đủ tiền → Order status = "CANCELLED", in lý do

---

## 🟡 Bài Tập 4: Class Inventory Manager ⭐⭐

**Bối cảnh thực tế:** Admin cần quản lý kho hàng — thêm/bớt sản phẩm, check tồn kho, in báo cáo.

**Yêu cầu:** Tạo `Inventory.java`:

```java
public class Inventory {
    Product[] products;
    int productCount;
    int maxCapacity;    // Kho chứa tối đa bao nhiêu loại SP

    // Methods:
    // addProduct(Product p) → thêm SP vào kho
    //   - Nếu đã tồn tại (cùng ID) → cập nhật stock, không thêm mới
    //   - Nếu kho đầy → in cảnh báo
    //
    // removeProduct(String productId) → xóa SP khỏi kho
    //
    // findById(String id) → tìm Product theo ID
    // findByCategory(String category) → trả về mảng Product cùng danh mục
    // findLowStock(int threshold) → SP sắp hết hàng (stock <= threshold)
    //
    // getTotalValue() → tổng giá trị kho = sum(price * stock)
    //
    // printReport() → in báo cáo kho hàng
}
```

**Output `printReport()` mong đợi:**
```
╔══════════════════════════════════════════════════════════════╗
║              BÁO CÁO KHO HÀNG — RAIZESHOP                   ║
║              Ngày: 03/04/2024 | Admin: raize-admin           ║
╠═══════════════════════════╦══════╦═══════════════╦══════════╣
║ Sản phẩm                  ║  SL  ║ Đơn giá       ║ GT Kho   ║
╠═══════════════════════════╬══════╬═══════════════╬══════════╣
║ Kiếm Rồng +10 [WPN]       ║   5  ║ 1,500,000 đ  ║ 7,500,000║
║ Giáp Băng Giá [ARM]        ║   2  ║ 1,200,000 đ  ║ 2,400,000║
║ Nhẫn Hộ Mệnh [ACC]         ║   0  ║   350,000 đ  ║         0║ ⚠️
╠═══════════════════════════╩══════╩═══════════════╬══════════╣
║ TỔNG GIÁ TRỊ KHO                                ║ 9,900,000║
║ Tổng loại SP: 3 | Hết hàng: 1 | Còn hàng: 2    ║          ║
╚═════════════════════════════════════════════════╩══════════╝
⚠️  CẢNH BÁO: Nhẫn Hộ Mệnh hết hàng — cần nhập thêm!
```

---

## 🔴 Bài Tập 5 (BONUS): Object Serialization Thủ Công ⭐⭐

**Bối cảnh thực tế:** Trước khi học JSON library, hiểu cách convert object → string thủ công giúp bạn hiểu tại sao Gson/Jackson ra đời.

**Yêu cầu:** Tạo method `toJson()` và `fromCsv()` cho class Product:

```java
// Product → JSON string (tự build, không dùng library)
public String toJson() {
    return "{\n" +
           "  \"id\": \"" + id + "\",\n" +
           "  \"name\": \"" + name + "\",\n" +
           "  \"price\": " + price + ",\n" +
           "  \"stock\": " + stock + ",\n" +
           "  \"isActive\": " + isActive + "\n" +
           "}";
}

// CSV row → Product object
// Format: id,name,price,stock,category,isActive
// "RZ-WPN-0001,Kiếm Rồng +10,1500000,5,weapon,true"
public static Product fromCsv(String csvLine) {
    String[] parts = csvLine.split(",");
    Product p = new Product();
    p.id = parts[0];
    p.name = parts[1];
    // TODO: parse price, stock, category, isActive
    return p;
}

// Bài tập thêm:
// Tạo static method loadFromFile(String filename) → Product[]
// Đọc file CSV nhiều dòng, parse từng dòng thành Product
```

**Kiểm tra:** Tạo file `data/products.csv` với 5 sản phẩm, load vào mảng Product và in báo cáo.

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Tại sao `Product` ở bài 1 dùng `String createdAt` thay vì `java.util.Date`? Trong production dùng loại date nào và tại sao?
- [ ] Sau khi code `ShoppingCart`, bạn thấy field `productIds`, `quantities`, `prices` là 3 mảng song song — điều này có vấn đề gì? Cách fix là gì? (Hint: tạo class `CartItem`)
- [ ] `Object reference` vs `Object value`: nếu `Order o1 = order1; o1.status = "CANCELLED"` thì `order1.status` có bị thay đổi không? Giải thích.
- [ ] Khi nào một "thứ" nên là **class** riêng, khi nào chỉ cần là **field** trong class khác? Áp dụng vào thiết kế RaizeShop.
- [ ] Bài 5: tại sao `toJson()` tự viết không an toàn nếu `name` chứa dấu `"` hoặc dấu `\`? Jackson xử lý vấn đề này thế nào?

---

👉 **Tiếp theo:** [Bài 08 – Constructor, this, static](../bai-08-constructor-this-static/EXERCISES.md)
