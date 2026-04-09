# Bài 09: Encapsulation — Đóng Gói Dữ Liệu

> 🟡 **Phase 2 – Bài 3/6** | Thời gian: ~2.5 giờ

---

Thầy muốn bạn thử một thứ với code bài trước:

```java
SanPham sp = new SanPham("Kiếm Rồng", 1_200_000, 3);
sp.gia = -999;       // Giá âm?! Java vẫn cho phép!
sp.soLuong = -100;   // Số lượng âm?! Không có lỗi!
```

Bạn thấy vấn đề chưa? Fields của class đang hoàn toàn mở — bất kỳ ai cũng có thể gán bất kỳ giá trị vào, kể cả giá trị vô nghĩa. Trong dự án thật, đây là nguồn gốc của rất nhiều bug nghiêm trọng.

**Encapsulation** (đóng gói) là nguyên tắc: **ẩn dữ liệu bên trong**, chỉ cho phép truy cập qua các method đã kiểm soát.

---

## 1. Access Modifiers — Kiểm Soát Quyền Truy Cập

Java có 4 mức truy cập, từ mở nhất đến kín nhất:

| Modifier | Cùng class | Cùng package | Subclass khác package | Mọi nơi |
|----------|-----------|-------------|----------------------|---------|
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| *(mặc định)* | ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

Quy tắc vàng cho encapsulation:
- **Fields: luôn `private`** — không ai gán trực tiếp
- **Methods công khai: `public`** — gateway để truy cập
- **Methods nội bộ: `private`** — chỉ dùng trong class

---

## 2. Getter và Setter — Cửa Ngõ Kiểm Soát

```java
public class SanPham {

    // Fields là private — bên ngoài KHÔNG gán/đọc trực tiếp được
    private String ten;
    private double gia;
    private int soLuong;

    public SanPham(String ten, double gia, int soLuong) {
        // Dùng setter để khởi tạo — tận dụng validation!
        this.ten = ten;
        setGia(gia);          // Kiểm tra luôn khi tạo
        setSoLuong(soLuong);   // Kiểm tra luôn khi tạo
    }

    // === GETTERS — Đọc giá trị ===
    public String getTen()    { return ten; }
    public double getGia()    { return gia; }
    public int getSoLuong()   { return soLuong; }

    // === SETTERS — Ghi giá trị CÓ kiểm tra ===
    public void setTen(String ten) {
        if (ten == null || ten.isBlank()) {
            throw new IllegalArgumentException("Tên sản phẩm không được rỗng!");
        }
        this.ten = ten;
    }

    public void setGia(double gia) {
        if (gia < 0) {
            throw new IllegalArgumentException("Giá không được âm: " + gia);
        }
        this.gia = gia;
    }

    public void setSoLuong(int soLuong) {
        if (soLuong < 0) {
            throw new IllegalArgumentException("Số lượng không được âm: " + soLuong);
        }
        this.soLuong = soLuong;
    }

    // Method có thể dùng nhiều fields cùng lúc
    public String getThongTinNgan() {
        return String.format("%s | %,.0f đ | Còn %d", ten, gia, soLuong);
    }
}
```

Bây giờ cố tình thử gán sai:

```java
SanPham sp = new SanPham("Kiếm Rồng", 1_200_000, 3);

sp.gia = -999;          // ❌ Lỗi compile! private — không gán được trực tiếp

sp.setGia(-999);        // IllegalArgumentException: Giá không được âm: -999.0
sp.setSoLuong(-100);    // IllegalArgumentException: Số lượng không được âm: -100

System.out.println(sp.getTen());    // Đọc được qua getter: "Kiếm Rồng"
System.out.println(sp.getGia());    // 1200000.0
```

---

## 3. Getter Không Nhất Thiết Là "Trả Về Thẳng" Field

Đây là điểm nhiều người bỏ qua. Getter có thể thêm logic:

```java
public class NguoiDung {
    private String username;
    private String password;     // Hash, không bao giờ trả về thật
    private double soDuVi;
    private boolean daBiKhoa;

    // Getter bình thường
    public String getUsername() { return username; }

    // Getter KHÔNG trả về field password — bảo mật
    // Không có getPassword() — đúng thiết kế!

    // Getter thêm logic: ẩn số dư khi bị khóa
    public double getSoDuVi() {
        if (daBiKhoa) {
            return -1;  // Tài khoản bị khóa, không hiển thị số dư
        }
        return soDuVi;
    }

    // Getter format sẵn
    public String getSoDuHienThi() {
        return String.format("%,.0f Linh Thạch", soDuVi);
    }
}
```

---

## 4. Immutable Object — Object Không Thay Đổi Được Sau Khi Tạo

Đôi khi bạn muốn một object **bất biến** — tạo ra với giá trị cố định, không ai thay đổi được:

```java
public final class DiaChi {   // final class: không ai extends được
    private final String thanhPho;   // final field: chỉ gán 1 lần
    private final String quanHuyen;
    private final String duongPho;

    public DiaChi(String thanhPho, String quanHuyen, String duongPho) {
        this.thanhPho = thanhPho;
        this.quanHuyen = quanHuyen;
        this.duongPho = duongPho;
    }

    // CHỈ có getters, KHÔNG có setters
    public String getThanhPho()  { return thanhPho; }
    public String getQuanHuyen() { return quanHuyen; }
    public String getDuongPho()  { return duongPho; }

    // Muốn "thay đổi" → tạo object mới
    public DiaChi doiDuong(String duongMoi) {
        return new DiaChi(this.thanhPho, this.quanHuyen, duongMoi);
    }

    @Override
    public String toString() {
        return duongPho + ", " + quanHuyen + ", " + thanhPho;
    }
}
```

```java
DiaChi dc = new DiaChi("Hà Nội", "Cầu Giấy", "Xuân Thủy");
System.out.println(dc);  // Xuân Thủy, Cầu Giấy, Hà Nội

// dc.thanhPho = "TP HCM";  // ❌ private!
// dc.setThanhPho("TP HCM"); // ❌ Không có setter!

// Muốn thay đổi → tạo object mới, object cũ không bị ảnh hưởng
DiaChi dcMoi = dc.doiDuong("Láng Hạ");
```

> 💡 **Tại sao Immutable hay được dùng?** Thread-safe tự nhiên (nhiều thread đọc cùng lúc không sợ conflict), dễ debug (giá trị không bao giờ bị ai thay đổi bất ngờ). `String` trong Java là immutable — đó là lý do tại sao bạn có thể truyền String vào nhiều thread mà không sợ gì.

---

## 5. `toString()` — Cách In Object Đẹp Hơn

```java
public class SanPham {
    private String ten;
    private double gia;
    private int soLuong;

    // ... constructor, getter, setter ...

    // Override toString() để print object đẹp hơn
    @Override
    public String toString() {
        return String.format("SanPham{ten='%s', gia=%,.0f đ, soLuong=%d}",
            ten, gia, soLuong);
    }
}
```

```java
SanPham sp = new SanPham("Kiếm Rồng", 1_200_000, 3);

System.out.println(sp);
// Không có toString(): SanPham@1b6d3586 (địa chỉ memory — vô nghĩa!)
// Có toString(): SanPham{ten='Kiếm Rồng', gia=1,200,000 đ, soLuong=3}
```

IDE (IntelliJ) có thể tự generate `toString()` cho bạn — nhấn `Alt+Insert` → `toString()`.

---

## 6. Ví Dụ Thực Tế — Class `NguoiDung` Đầy Đủ

```java
public class NguoiDung {
    private static int demId = 0;

    private final int id;
    private String username;
    private String email;
    private double soDuVi;
    private String role;
    private boolean active;

    public NguoiDung(String username, String email) {
        validateUsername(username);
        validateEmail(email);

        demId++;
        this.id = demId;
        this.username = username;
        this.email = email;
        this.soDuVi = 0;
        this.role = "USER";
        this.active = true;
    }

    // === Getters ===
    public int getId()          { return id; }
    public String getUsername() { return username; }
    public String getEmail()    { return email; }
    public String getRole()     { return role; }
    public boolean isActive()   { return active; }
    public double getSoDuVi()   { return soDuVi; }

    // === Setters có validation ===
    public void setEmail(String email) {
        validateEmail(email);
        this.email = email;
    }

    // === Business methods ===
    public void napTien(double soTien) {
        if (soTien <= 0) throw new IllegalArgumentException("Số tiền nạp phải > 0");
        if (!active)     throw new IllegalStateException("Tài khoản đang bị khóa");
        this.soDuVi += soTien;
        System.out.printf("[%s] Nạp %,.0f đ. Số dư mới: %,.0f đ%n",
            username, soTien, soDuVi);
    }

    public boolean tru(double soTien) {
        if (soTien > soDuVi) {
            System.out.printf("[%s] Không đủ số dư. Cần %,.0f đ, có %,.0f đ%n",
                username, soTien, soDuVi);
            return false;
        }
        this.soDuVi -= soTien;
        return true;
    }

    public void khoa()   { this.active = false; System.out.println("Đã khóa: " + username); }
    public void moKhoa() { this.active = true;  System.out.println("Đã mở khóa: " + username); }

    // === Private validation helpers ===
    private void validateUsername(String username) {
        if (username == null || username.length() < 4 || username.length() > 20)
            throw new IllegalArgumentException("Username phải từ 4-20 ký tự");
    }

    private void validateEmail(String email) {
        if (email == null || !email.contains("@"))
            throw new IllegalArgumentException("Email không hợp lệ: " + email);
    }

    @Override
    public String toString() {
        return String.format("NguoiDung{id=%d, username='%s', role='%s', soDu=%,.0f đ, active=%b}",
            id, username, role, soDuVi, active);
    }
}
```

---

## Tóm Tắt — Bài 09

```
✅ Encapsulation = fields private, truy cập qua getter/setter public
✅ Setter kiểm tra trước khi gán → object luôn ở trạng thái hợp lệ
✅ Getter có thể thêm logic — không nhất thiết chỉ return field
✅ Immutable: final class + final fields + chỉ getters → an toàn, thread-safe
✅ toString(): override để print object ý nghĩa (IDE generate được)
✅ Quy tắc vàng: Private by default, public chỉ khi thực sự cần
```

---

## ➡️ Bài Tiếp Theo

Bạn đang viết class `NguoiDung` và `Admin`. Bạn có nhận ra chúng có nhiều thứ chung không? (`username`, `email`, `napTien`...) Bài tiếp theo thầy sẽ dạy cách tái sử dụng code bằng **kế thừa** — thay vì copy-paste.

👉 **[Bài 10: Inheritance — Kế Thừa](../bai-10-inheritance/README.md)**
