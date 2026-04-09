# 📝 Bài Tập Thực Tế – Bài 02: Biến & Kiểu Dữ Liệu

> 🎯 **Bối cảnh dự án:** Xây dựng **data model** cơ bản cho RaizeShop — nơi lưu trữ thông tin sản phẩm, người dùng, và giao dịch.

---

## 🔴 Bài Tập 1: Khai Báo Model Sản Phẩm ⭐

**Bối cảnh thực tế:** Trong Spring Boot/Hibernate, trước khi tạo `@Entity`, developer cần xác định đúng kiểu dữ liệu cho từng field. Sai kiểu → bug tiền tệ cực kỳ nguy hiểm!

**Yêu cầu:** Tạo `ProductModel.java`, khai báo đúng kiểu dữ liệu cho từng trường:

```java
public class ProductModel {
    public static void main(String[] args) {
        // ❓ Hãy chọn kiểu đúng cho từng biến
        ??? productId     = 1001;           // ID sản phẩm
        ??? productName   = "Kiếm Rồng +10"; // Tên sản phẩm
        ??? price         = 1_500_000.0;    // Giá (VND) — tại sao không dùng int?
        ??? quantity      = 5;              // Số lượng còn lại
        ??? isAvailable   = true;           // Còn hàng không?
        ??? rating        = 4.8;            // Điểm đánh giá (0.0 - 5.0)
        ??? sellerId      = 9_876_543_210L; // ID người bán (rất lớn)
        ??? category      = 'W';           // W=Weapon, A=Armor, M=Magic

        // In thông tin và giải thích tại sao chọn kiểu đó
        System.out.printf("ID: %d | Tên: %s | Giá: %,.0f đ%n",
                productId, productName, price);
    }
}
```

**Thử thách:** Thêm `final` cho những field nào sẽ KHÔNG BAO GIỜ thay đổi sau khi set. Giải thích tại sao.

---

## 🟡 Bài Tập 2: Tính Hóa Đơn Với VAT ⭐⭐

**Bối cảnh thực tế:** Mọi hệ thống thanh toán ở Việt Nam đều phải tính VAT (10%). Đây là logic bắt buộc trong mọi e-commerce app.

**Yêu cầu:** Tạo `InvoiceCalculator.java`:

```
=== HÓA ĐƠN RAIZE SHOP ===
Sản phẩm           : Kiếm Rồng +10 x3
Đơn giá            :    500,000 đ
Số lượng           :          3
─────────────────────────────────
Tổng trước VAT     :  1,500,000 đ
VAT (10%)          :    150,000 đ
Mã giảm giá (15%)  :   -225,000 đ
─────────────────────────────────
THÀNH TIỀN         :  1,425,000 đ
```

**Lưu ý quan trọng:**
```java
final double VAT_RATE = 10.0;           // Hằng số — không được thay đổi
final double DISCOUNT_RATE = 15.0;

// ❌ Sai: dùng int cho tiền → mất dữ liệu khi tính phần trăm
int tong = soLuong * (int)donGia;

// ✅ Đúng:
double tong = soLuong * donGia;
```

Giải thích tại sao **không dùng `float`** mà dùng `double` cho tiền tệ, và khi nào cần dùng `BigDecimal`.

---

## 🟡 Bài Tập 3: Kiểm Tra Điều Kiện Mua Hàng ⭐⭐

**Bối cảnh thực tế:** Hệ thống cần validate trước khi cho phép giao dịch — người dùng đủ tuổi? Tài khoản đủ tiền? Sản phẩm còn hàng?

**Yêu cầu:** Tạo `PurchaseValidator.java`:

```java
// Dữ liệu người dùng
int userAge = 17;
double userBalance = 2_500_000;
boolean isVerified = true;

// Dữ liệu sản phẩm  
double productPrice = 1_500_000;
int productStock = 3;
boolean isItemLocked = false; // Item đang bị khóa bởi admin

// TODO: Tính và in ra
// 1. Người dùng đủ tuổi không? (>= 18)
// 2. Ví đủ tiền không?
// 3. Giao dịch có thể thực hiện không? (kết hợp TẤT CẢ điều kiện)
// 4. Số dư còn lại nếu mua thành công
```

**Output mong đợi:**
```
=== KIỂM TRA GIAO DỊCH ===
Đủ tuổi (>= 18)  : ❌ Không (17 tuổi)
Ví đủ tiền       : ✅ Có (còn 2,500,000 đ)
Item khả dụng    : ✅ Có (3 cái còn lại)
Tài khoản xác thực: ✅ Đã xác thực
─────────────────────────────
Kết quả          : ❌ KHÔNG THỂ GIAO DỊCH
Lý do            : Người dùng chưa đủ 18 tuổi
```

---

## 🔴 Bài Tập 4: Type Casting Nguy Hiểm Trong Thực Tế ⭐⭐⭐

**Bối cảnh thực tế:** Đây là BUG phổ biến trong production gây thiệt hại thực sự: tính toán tiền thưởng, phần trăm hoa hồng bị sai do type casting.

**Yêu cầu:** Tạo `TypeCastingBug.java`, TÌM và SỬA 3 bug:

```java
public class TypeCastingBug {
    public static void main(String[] args) {
        // BUG 1: Tính hoa hồng người bán
        int doanhThu = 7_500_000;
        int hoaHongPhan = 8; // 8%
        int hoaHong = doanhThu * hoaHongPhan / 100; // Bug ẩn ở đây!
        System.out.println("Hoa hồng: " + hoaHong + " đ"); // Kết quả đúng chưa?

        // BUG 2: Tính rating trung bình
        int tongRating = 47;
        int soLuotDanhGia = 10;
        double ratingTB = tongRating / soLuotDanhGia; // Bug!
        System.out.println("Rating TB: " + ratingTB); // Phải là 4.7, thực tế là?

        // BUG 3: Kiểm tra số dư đủ không
        long soDuVi = 10_000_000_000L; // 10 tỷ (người dùng VIP)
        int giaItem = 2_147_483_648;   // Bug tinh vi — tại sao lỗi compile?
        // → Sửa để hoạt động đúng
    }
}
```

**Sau khi sửa, giải thích:** Trong hệ thống tài chính, tại sao nhiều công ty dùng **đơn vị xu (cents)** thay vì đồng/dollar để lưu tiền?

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Tại sao field `userId` nên là `long` thay vì `int` trong database thực tế?
- [ ] `final double PI` vs `static final double PI` — khác nhau thế nào? Cái nào nên dùng cho hằng số của app?
- [ ] Floating point error: `0.1 + 0.2 != 0.3` — giải thích và khi nào code thanh toán THỰC SỰ bị ảnh hưởng bởi điều này?
- [ ] Tại sao `int` max là ~2.1 tỷ? Tính `2 ^ 31 - 1` và giải thích tại sao `-1`.

---

👉 **Tiếp theo:** [Bài 03 – Điều Kiện](../bai-03-dieu-kien/EXERCISES.md)
