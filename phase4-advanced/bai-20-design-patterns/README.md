# Bài 20: Design Patterns — Mẫu Thiết Kế

> 🔴 **Phase 4 – Bài 2/5** | Thời gian: ~5 giờ

---

Hãy tưởng tượng bạn gặp một vấn đề trong lập trình. Bạn nghĩ ra giải pháp, sau đó nhận ra người khác đã gặp vấn đề y hệt và đã có giải pháp tốt hơn, được kiểm chứng qua hàng thập kỷ. **Design Pattern** chính là những giải pháp đã được đặt tên và tài liệu hóa đó.

23 patterns trong cuốn "Gang of Four" (GoF) là nền tảng. Tôi sẽ dạy bạn những cái **hay gặp nhất trong code thực tế**, không phải học thuộc tất cả 23 cái.

---

## 1. Tại Sao Cần Design Patterns?

```
Không có pattern:                 Có pattern:
- Mỗi lần gặp vấn đề tương tự   - Nhận ra ngay "Đây là vấn đề Singleton"
  lại phải nghĩ lại từ đầu       - Áp dụng solution đã được kiểm chứng
- Khó giải thích cho đồng nghiệp - Đồng nghiệp đọc code nhận ra ngay cấu trúc
- Dễ mắc lỗi thiết kế             - Tránh được những cạm bẫy đã biết
```

---

## 2. Singleton Pattern — Chỉ Một Instance Duy Nhất

**Khi nào dùng:** Khi bạn cần đảm bảo **chỉ có 1 object** của một class trong toàn bộ ứng dụng. Ví dụ: connection pool, logger, config manager.

```java
public class ConfigManager {
    // Volatile đảm bảo thread-safe
    private static volatile ConfigManager instance;

    private String dbUrl;
    private String dbUser;

    // Constructor private — ngăn new từ bên ngoài
    private ConfigManager() {
        dbUrl = "jdbc:mysql://localhost:3306/raizeshop";
        dbUser = "root";
        System.out.println("ConfigManager khởi tạo (1 lần duy nhất)");
    }

    // Thread-safe lazy initialization (double-checked locking)
    public static ConfigManager getInstance() {
        if (instance == null) {
            synchronized (ConfigManager.class) {
                if (instance == null) {
                    instance = new ConfigManager();
                }
            }
        }
        return instance;
    }

    public String getDbUrl()  { return dbUrl; }
    public String getDbUser() { return dbUser; }
}

// Dùng:
ConfigManager cfg1 = ConfigManager.getInstance();
ConfigManager cfg2 = ConfigManager.getInstance();
System.out.println(cfg1 == cfg2);  // true — cùng object!
System.out.println(cfg1.getDbUrl());
```

### Enum Singleton — Đơn Giản Và An Toàn Hơn

```java
public enum AppConfig {
    INSTANCE;   // Enum đảm bảo chỉ có 1 instance — kể cả khi serialize/thread

    private final String dbUrl = "jdbc:mysql://localhost/raizeshop";
    public String getDbUrl() { return dbUrl; }
}

// Dùng:
AppConfig.INSTANCE.getDbUrl();
```

---

## 3. Factory Method Pattern — Tạo Object Linh Hoạt

**Khi nào dùng:** Khi muốn tạo object mà không muốn hard-code tên class cụ thể. Caller chỉ biết interface, factory lo phần còn lại.

```java
public interface ThongBao {
    void gui(String nguoiNhan, String noiDung);
}

class EmailThongBao implements ThongBao {
    public void gui(String nguoiNhan, String noiDung) {
        System.out.println("📧 Email → " + nguoiNhan + ": " + noiDung);
    }
}

class SMSThongBao implements ThongBao {
    public void gui(String nguoiNhan, String noiDung) {
        System.out.println("📱 SMS → " + nguoiNhan + ": " + noiDung);
    }
}

class TelegramThongBao implements ThongBao {
    public void gui(String nguoiNhan, String noiDung) {
        System.out.println("✈️ Telegram → " + nguoiNhan + ": " + noiDung);
    }
}

// Factory — trả về đúng loại ThongBao theo tên
public class ThongBaoFactory {
    public static ThongBao create(String loai) {
        return switch (loai.toUpperCase()) {
            case "EMAIL"    -> new EmailThongBao();
            case "SMS"      -> new SMSThongBao();
            case "TELEGRAM" -> new TelegramThongBao();
            default -> throw new IllegalArgumentException("Loại thông báo không hỗ trợ: " + loai);
        };
    }
}

// Caller không cần biết class cụ thể:
String loai = "email";  // Có thể đến từ config/database
ThongBao tb = ThongBaoFactory.create(loai);
tb.gui("user@mail.com", "Đơn hàng của bạn đã xác nhận!");
```

---

## 4. Builder Pattern — Tạo Object Phức Tạp Từng Bước

**Khi nào dùng:** Khi object có **nhiều field optional**, tránh constructor với 10+ tham số.

```java
// Không có Builder — constructor ngày càng dài:
public DonHang(String nguoiMua, String diaChi, List<SanPham> items,
               String phuongThucThanhToan, String phuongThucGiaoHang,
               String ghiChu, Double maGiamGia, LocalDateTime thoiGianYeuCau) { ... }
// Bạn có nhớ nổi thứ tự tham số không?

// Builder pattern:
public class DonHang {
    private final String nguoiMua;
    private final String diaChi;
    private final List<SanPham> items;
    private final String phuongThucThanhToan;
    private final String ghiChu;
    private final Double maGiamGia;

    private DonHang(Builder builder) {
        this.nguoiMua = builder.nguoiMua;
        this.diaChi = builder.diaChi;
        this.items = builder.items;
        this.phuongThucThanhToan = builder.phuongThucThanhToan;
        this.ghiChu = builder.ghiChu;
        this.maGiamGia = builder.maGiamGia;
    }

    public static class Builder {
        // Required
        private final String nguoiMua;
        private final String diaChi;
        // Optional
        private List<SanPham> items = new ArrayList<>();
        private String phuongThucThanhToan = "COD";
        private String ghiChu = "";
        private Double maGiamGia = null;

        public Builder(String nguoiMua, String diaChi) {
            this.nguoiMua = nguoiMua;
            this.diaChi = diaChi;
        }

        public Builder items(List<SanPham> items) { this.items = items; return this; }
        public Builder thanhToanQua(String pp) { this.phuongThucThanhToan = pp; return this; }
        public Builder ghiChu(String gc) { this.ghiChu = gc; return this; }
        public Builder giamGia(Double ma) { this.maGiamGia = ma; return this; }

        public DonHang build() {
            if (items.isEmpty()) throw new IllegalStateException("Đơn hàng phải có sản phẩm!");
            return new DonHang(this);
        }
    }
}

// Dùng — rõ ràng, đọc như tiếng Anh:
DonHang don = new DonHang.Builder("Raize99", "123 Đường ABC, Hà Nội")
    .items(gioHang.getItems())
    .thanhToanQua("MOMO")
    .ghiChu("Giao buổi chiều")
    .giamGia(0.15)  // Giảm 15%
    .build();
```

---

## 5. Observer Pattern — Đăng Ký Nhận Thông Báo

**Khi nào dùng:** Khi một object thay đổi trạng thái cần tự động thông báo đến nhiều observer. Đây là nền tảng của event system, Spring Application Events.

```java
// Observer interface
public interface DonHangObserver {
    void onDonHangThayDoi(String maDon, String trangThaiMoi);
}

// Subject
public class DonHang {
    private String maDon;
    private String trangThai;
    private List<DonHangObserver> observers = new ArrayList<>();

    public void themObserver(DonHangObserver o)  { observers.add(o); }
    public void xoaObserver(DonHangObserver o)   { observers.remove(o); }

    public void capNhatTrangThai(String trangThaiMoi) {
        this.trangThai = trangThaiMoi;
        // Thông báo tất cả observers
        for (DonHangObserver o : observers) {
            o.onDonHangThayDoi(maDon, trangThaiMoi);
        }
    }
}

// Các concrete observer
class EmailNotifier implements DonHangObserver {
    public void onDonHangThayDoi(String maDon, String trangThai) {
        System.out.println("📧 Email: Đơn " + maDon + " → " + trangThai);
    }
}

class LogService implements DonHangObserver {
    public void onDonHangThayDoi(String maDon, String trangThai) {
        System.out.println("[LOG] " + maDon + ": " + trangThai);
    }
}

// Dùng:
DonHang don = new DonHang("DH001");
don.themObserver(new EmailNotifier());
don.themObserver(new LogService());

don.capNhatTrangThai("CONFIRMED");   // Tự động gửi email + ghi log
don.capNhatTrangThai("SHIPPED");     // Lại tự động thông báo
```

---

## 6. Strategy Pattern — Đổi Thuật Toán Linh Hoạt

**Khi nào dùng:** Khi có nhiều thuật toán/chiến lược cho cùng một task, muốn đổi linh hoạt.

```java
// Strategy interface
@FunctionalInterface
public interface ChienLuocGiam {
    double tinh(double giaGoc);
}

// Các chiến lược
ChienLuocGiam khongGiam   = gia -> gia;
ChienLuocGiam giam10Phan  = gia -> gia * 0.9;
ChienLuocGiam giam30Phan  = gia -> gia * 0.7;
ChienLuocGiam giamCoDiv   = gia -> gia > 1_000_000 ? gia - 200_000 : gia;

// Context sử dụng strategy
public class GioHang {
    private ChienLuocGiam chienLuoc = gia -> gia;  // Mặc định không giảm

    public void apDungMaGiam(String maGiam) {
        this.chienLuoc = switch (maGiam.toUpperCase()) {
            case "RAIZE10"  -> gia -> gia * 0.9;
            case "RAIZE30"  -> gia -> gia * 0.7;
            case "VIP200K"  -> gia -> Math.max(gia - 200_000, 0);
            default -> gia -> gia;  // Mã không hợp lệ → không giảm
        };
    }

    public double tinhTong(double tongGoc) {
        return chienLuoc.tinh(tongGoc);
    }
}

// Dùng:
GioHang gio = new GioHang();
System.out.printf("Giá gốc: %,.0f đ%n", gio.tinhTong(2_000_000));  // 2,000,000

gio.apDungMaGiam("RAIZE30");
System.out.printf("Sau giảm 30%%: %,.0f đ%n", gio.tinhTong(2_000_000));  // 1,400,000
```

---

## 7. Tổng Hợp Patterns Hay Dùng

| Pattern | Nhóm | Dùng Khi |
|---------|-------|----------|
| **Singleton** | Creational | Cần 1 instance duy nhất |
| **Factory Method** | Creational | Tạo object linh hoạt, caller không biết class cụ thể |
| **Builder** | Creational | Object nhiều field optional |
| **Observer** | Behavioral | Một thay đổi → nhiều bên cần biết |
| **Strategy** | Behavioral | Nhiều thuật toán, đổi linh hoạt |
| **Template Method** | Behavioral | Định nghĩa flow, detail do subclass xử lý |
| **Decorator** | Structural | Thêm tính năng mà không sửa class gốc |
| **Repository** | Architectural | Tách biệt logic và data access layer |

---

## Tóm Tắt — Bài 20

```
✅ Design Pattern = giải pháp đã được kiểm chứng cho vấn đề phổ biến
✅ Singleton: 1 instance, lazy init thread-safe (hoặc dùng Enum)
✅ Factory: tạo object qua factory, caller không biết class cụ thể
✅ Builder: tạo object phức tạp fluent-style, tránh constructor nhiều tham số
✅ Observer: subject tự thông báo đến nhiều listeners khi thay đổi
✅ Strategy: swappable algorithms — dùng Functional Interface cho ngắn gọn
✅ QUAN TRỌNG: Đừng over-engineer — chỉ dùng pattern khi thực sự cần!
```

---

👉 **[Bài 21: Reflection & Annotations](../bai-21-reflection-annotations/README.md)**
