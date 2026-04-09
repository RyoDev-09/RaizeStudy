# Bài 08: Constructor, `this` và `static` Nâng Cao

> 🟡 **Phase 2 – Bài 2/6** | Thời gian: ~3 giờ

---

Hãy nhìn lại cách bạn tạo object ở bài trước:

```java
SanPham sp = new SanPham();
sp.ten = "Kiếm Rồng";
sp.gia = 1_200_000;
sp.soLuong = 3;
sp.danhMuc = "Vũ khí";
```

Năm dòng chỉ để tạo một sản phẩm. Và nếu bạn quên gán một field thì sao? Object sẽ có giá trị `null` hoặc `0` ở đó mà bạn không hay biết — dẫn đến bug rất khó tìm.

Hôm nay Tôi sẽ dạy bạn cách viết **Constructor** để tạo object an toàn, gọn gàng hơn rất nhiều.

---

## 1. Constructor Là Gì?

**Constructor** là một method đặc biệt chạy tự động ngay khi bạn `new` một object. Mục đích: **khởi tạo object với trạng thái hợp lệ ngay từ đầu**.

```java
public class SanPham {
    String ten;
    double gia;
    int soLuong;

    // ← Đây là constructor! Cùng tên với class, không có kiểu trả về
    public SanPham(String ten, double gia, int soLuong) {
        this.ten = ten;          // "this.ten" là field của object
        this.gia = gia;          // "ten" là tham số của constructor
        this.soLuong = soLuong;
    }
}
```

Bây giờ tạo object chỉ cần 1 dòng:

```java
SanPham kiem = new SanPham("Kiếm Rồng", 1_200_000, 3);
SanPham giap = new SanPham("Giáp Vàng", 800_000, 1);
SanPham nhan = new SanPham("Nhẫn Ma",   500_000, 5);
```

Gọn hơn nhiều, và **bắt buộc** phải cung cấp đủ thông tin khi tạo — không quên được nữa!

---

## 2. `this` Keyword — "Tôi Chính Là Object Này"

Bạn có thấy `this.ten = ten` không? Ở đây:

```java
public SanPham(String ten, double gia, int soLuong) {
//                  ↑
//           Tham số constructor — che khuất field cùng tên

    this.ten = ten;
//   ↑          ↑
// Field của   Tham số constructor
// object này
```

Khi tham số constructor trùng tên với field, Java cần cách phân biệt. `this.ten` nghĩa là "field `ten` của object **này**". Nếu bạn viết `ten = ten` (không có `this`), Java sẽ hiểu nhầm — tham số gán lại tham số, field không được gán gì cả!

> 💡 **Mẹo:** Khi đặt tên tham số constructor, nhiều người dùng tên khác để tránh nhầm: `tenSP` thay vì `ten`. Nhưng convention phổ biến vẫn là trùng tên và dùng `this` để phân biệt.

### `this` còn dùng để gọi method khác trong cùng class:

```java
public void inThongTinChiTiet() {
    this.inThongTinNgan();  // Gọi method khác trong cùng class
    System.out.println("Giá trị kho: " + (this.gia * this.soLuong));
}
```

---

## 3. Overloading Constructor — Nhiều Cách Tạo Object

Bạn có thể có nhiều constructor với tham số khác nhau:

```java
public class NguoiDung {
    String username;
    String email;
    String role;
    double soDuVi;

    // Constructor đầy đủ
    public NguoiDung(String username, String email, String role) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.soDuVi = 0;   // Mặc định bắt đầu với 0 đ
    }

    // Constructor rút gọn — role mặc định là "USER"
    public NguoiDung(String username, String email) {
        this(username, email, "USER");  // Gọi constructor đầy đủ ở trên!
    }

    // Constructor đơn giản nhất — chỉ cần username
    public NguoiDung(String username) {
        this(username, username + "@raizeshop.com");  // Email tự tạo
    }
}
```

```java
// Ba cách tạo NguoiDung:
NguoiDung admin  = new NguoiDung("admin", "admin@raizeshop.com", "ADMIN");
NguoiDung player = new NguoiDung("raize99", "raize@gmail.com");   // role = "USER"
NguoiDung quick  = new NguoiDung("gamer");         // email và role tự động
```

> 💡 **Chú ý `this(...)`:** Khi một constructor gọi constructor khác của cùng class, dùng `this(...)`. Dòng này phải là **dòng đầu tiên** trong constructor. Đây là cách tránh trùng lặp code giữa các constructor.

---

## 4. Constructor Mặc Định

Nếu bạn **không viết constructor nào**, Java tự tạo một constructor không tham số (gọi là *default constructor*):

```java
public class SanPham {
    String ten;
    double gia;
    // Java tự tạo: public SanPham() {} (không làm gì cả)
}

SanPham sp = new SanPham();  // Hoạt động — Java dùng default constructor
```

Nhưng hễ bạn viết **bất kỳ** constructor nào, Java sẽ **xóa** default constructor đi:

```java
public class SanPham {
    String ten;
    public SanPham(String ten) { this.ten = ten; }  // Bạn viết constructor này
    // → Java KHÔNG tạo default constructor nữa
}

SanPham sp = new SanPham();         // ❌ Lỗi compile!
SanPham sp = new SanPham("Kiếm");  // ✅ OK
```

tôi hay gặp lỗi này trong dự án khi dùng Framework — biết trước để không bị bất ngờ.

---

## 5. `static` Nâng Cao — Static Initializer và Factory Method

### Static field và khi nào dùng:

```java
public class SanPham {
    // Static: đếm tổng số sản phẩm đã tạo trong toàn bộ chương trình
    private static int daDuocTao = 0;

    String ten;
    int id;

    public SanPham(String ten) {
        daDuocTao++;
        this.id = daDuocTao;  // ID tự tăng
        this.ten = ten;
    }

    public static int getDaDuocTao() {
        return daDuocTao;
    }
}

SanPham sp1 = new SanPham("Kiếm");  // id = 1
SanPham sp2 = new SanPham("Giáp");  // id = 2
SanPham sp3 = new SanPham("Nhẫn");  // id = 3

System.out.println(SanPham.getDaDuocTao());  // 3
System.out.println(sp1.id);  // 1
System.out.println(sp3.id);  // 3
```

### Factory Method — Constructor thay thế

Đôi khi bạn muốn đặt tên cho cách tạo object để dễ đọc hơn:

```java
public class NguoiDung {
    String username;
    String role;

    private NguoiDung(String username, String role) {  // private!
        this.username = username;
        this.role = role;
    }

    // Factory methods — tên gọi rõ ràng hơn "new NguoiDung(...)"
    public static NguoiDung taoAdmin(String username) {
        return new NguoiDung(username, "ADMIN");
    }

    public static NguoiDung taoPlayer(String username) {
        return new NguoiDung(username, "USER");
    }
}

// Dùng factory methods — tên gọi tự giải thích:
NguoiDung admin  = NguoiDung.taoAdmin("admin");
NguoiDung player = NguoiDung.taoPlayer("raize99");
```

---

## 6. Ví Dụ Thực Tế — Hệ Thống Đơn Hàng

```java
public class DonHang {
    private static int soThuTu = 0;  // Auto-increment ID

    int id;
    String nguoiMua;
    String tenSanPham;
    int soLuong;
    double donGia;
    String trangThai;
    long thoiGianTao;  // Unix timestamp

    public DonHang(String nguoiMua, String tenSanPham, int soLuong, double donGia) {
        soThuTu++;
        this.id = soThuTu;
        this.nguoiMua = nguoiMua;
        this.tenSanPham = tenSanPham;
        this.soLuong = soLuong;
        this.donGia = donGia;
        this.trangThai = "PENDING";
        this.thoiGianTao = System.currentTimeMillis();
    }

    double tinhTongTien() {
        return soLuong * donGia;
    }

    void xacNhan() {
        if ("PENDING".equals(trangThai)) {
            this.trangThai = "CONFIRMED";
            System.out.println("Đơn #" + id + " đã xác nhận.");
        }
    }

    void huy() {
        if ("PENDING".equals(trangThai) || "CONFIRMED".equals(trangThai)) {
            this.trangThai = "CANCELLED";
            System.out.println("Đơn #" + id + " đã hủy.");
        } else {
            System.out.println("Không thể hủy đơn ở trạng thái: " + trangThai);
        }
    }

    void inThongTin() {
        System.out.printf("Đơn #%d | %s mua %d x %s | %,.0f đ | [%s]%n",
            id, nguoiMua, soLuong, tenSanPham, tinhTongTien(), trangThai);
    }

    public static void main(String[] args) {
        DonHang d1 = new DonHang("raize99", "Kiếm Rồng", 2, 1_200_000);
        DonHang d2 = new DonHang("gamer_pro", "Giáp Vàng", 1, 800_000);
        DonHang d3 = new DonHang("newbie01", "Nhẫn Ma", 3, 500_000);

        d1.inThongTin();  // Đơn #1 | raize99 mua 2 x Kiếm Rồng | 2,400,000 đ | [PENDING]
        d2.inThongTin();
        d3.inThongTin();

        d1.xacNhan();
        d1.huy();   // Không thể hủy — đã CONFIRMED
        // d1.huy() nếu muốn hủy sau confirmed thì tùy business logic

        System.out.println("\nTổng số đơn: " + soThuTu);
    }
}
```

---

## Tóm Tắt — Bài 08

```
✅ Constructor: method đặc biệt, cùng tên class, không kiểu trả về
   → Chạy tự động khi "new", đảm bảo object hợp lệ từ đầu
✅ this.field: tham chiếu đến field của object hiện tại — dùng khi tên tham số trùng tên field
✅ this(...): gọi constructor khác trong cùng class (phải là dòng đầu tiên!)
✅ Bạn viết constructor → Java KHÔNG tạo default constructor nữa
✅ Factory method: static method trả về object — tên gọi rõ nghĩa hơn constructor
```

---

## ➡️ Bài Tiếp Theo

Bạn đang gán field trực tiếp: `sp.gia = -1000` — Java cho làm! Nhưng giá âm là vô nghĩa. Làm sao ngăn người khác gán giá trị sai vào object của bạn? Đó chính là **Encapsulation** — chủ đề bài tiếp theo.

👉 **[Bài 09: Encapsulation — Đóng Gói Dữ Liệu](../bai-09-encapsulation/README.md)**
