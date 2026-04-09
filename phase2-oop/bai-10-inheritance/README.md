# Bài 10: Inheritance — Kế Thừa

> 🟡 **Phase 2 – Bài 4/6** | Thời gian: ~3 giờ

---

Giả sử bạn đang xây dựng hệ thống người dùng cho RaizeShop. Có 3 loại: `NguoiDung` thường, `Seller` (người bán), `Admin`. Cả ba đều có `username`, `email`, `soDuVi`, đều có thể `napTien()` và `inThongTin()`.

Lẽ nào bạn sẽ copy-paste 3 class giống hệt nhau, chỉ thêm vài field riêng? Đó là cách làm tệ nhất. **Kế thừa** cho phép bạn định nghĩa **phần chung một lần**, rồi các class con chỉ thêm phần riêng của chúng.

---

## 1. Extends — Kế Thừa Class

```java
// Parent class (lớp cha) — chứa những gì CHUNG
public class NguoiDung {
    protected String username;   // protected: class con truy cập được!
    protected String email;
    protected double soDuVi;

    public NguoiDung(String username, String email) {
        this.username = username;
        this.email = email;
        this.soDuVi = 0;
    }

    public void napTien(double soTien) {
        if (soTien <= 0) throw new IllegalArgumentException("Số tiền phải > 0");
        soDuVi += soTien;
        System.out.printf("[%s] Nạp %,.0f đ. Số dư: %,.0f đ%n",
            username, soTien, soDuVi);
    }

    public void inThongTin() {
        System.out.println("Username: " + username);
        System.out.println("Email   : " + email);
        System.out.printf("Số dư   : %,.0f đ%n", soDuVi);
    }
}
```

```java
// Child class (lớp con) — kế thừa + thêm phần riêng
public class Seller extends NguoiDung {
    //              ↑
    // "extends" = kế thừa toàn bộ từ NguoiDung

    private String tenShop;
    private double doanhSo;
    private double rating;

    public Seller(String username, String email, String tenShop) {
        super(username, email);   // Gọi constructor của NguoiDung trước!
        this.tenShop = tenShop;
        this.doanhSo = 0;
        this.rating = 5.0;
    }

    // Method riêng của Seller
    public void dangBan(String tenSP, double gia) {
        System.out.printf("[Shop: %s] Đăng bán: %s - %,.0f đ%n",
            tenShop, tenSP, gia);
        doanhSo += gia;
    }

    @Override  // Override method từ parent
    public void inThongTin() {
        super.inThongTin();   // Gọi inThongTin() của NguoiDung trước
        // Rồi thêm thông tin riêng của Seller
        System.out.println("Shop    : " + tenShop);
        System.out.printf("Doanh số: %,.0f đ%n", doanhSo);
        System.out.printf("Rating  : %.1f ⭐%n", rating);
    }
}
```

```java
Seller seller = new Seller("shop_raize", "shop@gmail.com", "Raize Gaming Store");

// Dùng method thừa hưởng từ NguoiDung:
seller.napTien(500_000);        // Inherited!
seller.username;                 // protected — truy cập được từ con

// Dùng method riêng của Seller:
seller.dangBan("Kiếm Rồng", 1_200_000);

// inThongTin() đã được override — in cả thông tin cha lẫn của Seller
seller.inThongTin();
```

---

## 2. `super` — Gọi Đến Class Cha

`super` được dùng theo 2 cách:

### Gọi constructor cha:
```java
public Seller(String username, String email, String tenShop) {
    super(username, email);   // Phải là dòng ĐẦU TIÊN trong constructor con!
    //    ↑ Gọi NguoiDung(username, email)
    this.tenShop = tenShop;
}
```

### Gọi method cha khi đang override:
```java
@Override
public void inThongTin() {
    super.inThongTin();    // Chạy inThongTin của NguoiDung
    // Sau đó thêm thông tin riêng của Seller
    System.out.println("Shop: " + tenShop);
}
```

---

## 3. Method Overriding — Ghi Đè Hành Vi

Class con có thể **thay đổi hoàn toàn** cách hoạt động của method thừa hưởng:

```java
public class Admin extends NguoiDung {

    private String[] quyenHan;

    public Admin(String username, String email) {
        super(username, email);
        this.quyenHan = new String[]{"BAN_USER", "EDIT_LISTING", "VIEW_REPORT"};
        this.soDuVi = 0;  // Admin không cần số dư
    }

    // Override hoàn toàn — Admin không napTien giống user thường
    @Override
    public void napTien(double soTien) {
        System.out.println("Admin không thể nạp tiền qua form thông thường.");
    }

    public void khoaTaiKhoan(NguoiDung nguoiDung) {
        System.out.println("[ADMIN] " + username + " đã khóa: " + nguoiDung.username);
    }

    @Override
    public void inThongTin() {
        super.inThongTin();
        System.out.println("Quyền hạn: " + String.join(", ", quyenHan));
    }
}
```

> 💡 **Annotation `@Override`:** Luôn để `@Override` khi bạn muốn override. IDE sẽ báo lỗi nếu bạn gõ nhầm tên method — ví dụ gõ `inThongTinn` thì Java sẽ tạo method mới thay vì override, rất khó nhận ra bug.

---

## 4. Chuỗi Kế Thừa và `instanceof`

```java
// Phân cấp kế thừa:
//   Object (mọi class đều kế thừa từ đây)
//      ↑
//   NguoiDung
//      ↑
//   Seller, Admin
```

```java
Seller seller = new Seller("shop99", "shop@mail.com", "Shop 99");

// instanceof: kiểm tra object có phải kiểu đó không
System.out.println(seller instanceof Seller);    // true
System.out.println(seller instanceof NguoiDung); // true — vì Seller extends NguoiDung!
System.out.println(seller instanceof Admin);     // false

// Pattern matching (Java 16+) — kiểm tra và cast cùng lúc
if (seller instanceof Seller s) {
    System.out.println("Tên shop: " + s.tenShop);  // Dùng s như Seller
}
```

---

## 5. Upcasting và Downcasting

```java
// UPCASTING: Seller → NguoiDung (tự động, an toàn)
NguoiDung u = new Seller("shop", "shop@mail.com", "My Shop");
// u chỉ có thể dùng methods của NguoiDung!
u.napTien(100_000);     // ✅ Có trong NguoiDung
// u.dangBan("...", 0); // ❌ Compiler không biết u thực sự là Seller

// DOWNCASTING: NguoiDung → Seller (phải ép buộc, có thể lỗi)
if (u instanceof Seller seller) {     // Pattern matching — an toàn hơn
    seller.dangBan("Kiếm Rồng", 1_200_000);  // ✅ OK
}

// Cách cũ (dễ bị ClassCastException nếu làm sai):
Seller s = (Seller) u;   // Nếu u không thực sự là Seller → Runtime Error!
```

---

## 6. `final` Với Class và Method

```java
// final class: không cho extends — không ai kế thừa được
public final class String { ... }  // Đây là lý do bạn không thể extends String!

// final method: class con không override được method này
public class NguoiDung {
    public final void inIdNguoiDung() {  // final method
        System.out.println("ID: " + id);
    }
    // → Seller, Admin KHÔNG thể override inIdNguoiDung
}
```

---

## 7. Ví Dụ Thực Tế — Hệ Thống Thanh Toán Đa Dạng

```java
// Lớp cha: thanh toán chung
public abstract class PhuongThucThanhToan {
    protected String tenPhuongThuc;
    protected boolean kichHoat;

    public PhuongThucThanhToan(String tenPhuongThuc) {
        this.tenPhuongThuc = tenPhuongThuc;
        this.kichHoat = true;
    }

    // Template method — flow chung
    public final void thanhToan(double soTien) {
        if (!kichHoat) {
            System.out.println(tenPhuongThuc + " đang tắt!");
            return;
        }
        System.out.println("Bắt đầu thanh toán: " + soTien + " đ qua " + tenPhuongThuc);
        xuLyThanhToan(soTien);      // Mỗi loại xử lý khác nhau
        System.out.println("✅ Hoàn thành!");
    }

    protected abstract void xuLyThanhToan(double soTien);  // Sẽ học ở Bài 12!
}

// Lớp con: từng phương thức cụ thể
public class ThanhToanMomo extends PhuongThucThanhToan {
    private String soDienThoai;

    public ThanhToanMomo(String soDienThoai) {
        super("MoMo");
        this.soDienThoai = soDienThoai;
    }

    @Override
    protected void xuLyThanhToan(double soTien) {
        System.out.println("→ Gửi request đến MoMo API cho SĐT: " + soDienThoai);
    }
}

public class ThanhToanSepay extends PhuongThucThanhToan {
    private String bankCode;

    public ThanhToanSepay(String bankCode) {
        super("Sepay - Chuyển khoản");
        this.bankCode = bankCode;
    }

    @Override
    protected void xuLyThanhToan(double soTien) {
        System.out.println("→ Tạo mã QR Sepay, bank: " + bankCode);
    }
}
```

---

## Tóm Tắt — Bài 10

```
✅ extends: class con kế thừa tất cả từ class cha
✅ super(): gọi constructor cha — phải là dòng đầu tiên
✅ super.method(): gọi method cha khi đang override
✅ @Override: luôn dùng khi override — IDE check lỗi tên method
✅ protected: private với ngoài, nhưng class con truy cập được
✅ instanceof + pattern matching: kiểm tra kiểu an toàn
✅ Upcasting tự động, Downcasting cần kiểm tra
✅ final class/method: ngăn kế thừa/override
```

---

## ➡️ Bài Tiếp Theo

Bạn để ý không — khi bạn gọi `inThongTin()` trên `Seller`, nó tự động gọi phiên bản override của Seller chứ không phải của NguoiDung. Điều này xảy ra tự nhiên mà bạn không cần làm gì thêm. Đây là **Polymorphism** — bài tiếp theo.

👉 **[Bài 11: Polymorphism — Đa Hình](../bai-11-polymorphism/README.md)**
