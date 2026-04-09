# Bài 12: Abstraction — Abstract Class & Interface

> 🟡 **Phase 2 – Bài 6/6** | Thời gian: ~3.5 giờ

---

Đây là bài cuối của Phase 2 và cũng là bài thầy thấy học sinh hay bị nhầm nhất. Thầy sẽ giải thích rõ ràng từng bước.

Câu hỏi mở: Khi bạn viết class `ThongBao` ở bài trước, bạn có nhận ra `ThongBao` không thể tồn tại "một mình" không? Thông báo không có kiểu cụ thể thì *gửi bằng gì?* Nó chỉ là khái niệm trừu tượng — một khuôn mẫu.

**Abstraction** là nghệ thuật thiết kế khuôn mẫu — định nghĩa **PHẢI LÀM GÌ** mà không quan tâm **LÀM THẾ NÀO**.

---

## 1. Abstract Class — Khuôn Mẫu Chưa Hoàn Chỉnh

```java
// Abstract class: KHÔNG thể new trực tiếp được
public abstract class ThongBao {
    protected String tieuDe;
    protected String nguoiGui;

    public ThongBao(String tieuDe, String nguoiGui) {
        this.tieuDe = tieuDe;
        this.nguoiGui = nguoiGui;
    }

    // Abstract method: PHẢI override ở class con — không có thân hàm!
    public abstract void gui(String nguoiNhan, String noiDung);

    // Method thường: class con thừa hưởng, có thể override hoặc không
    public void inLog(String nguoiNhan) {
        System.out.printf("[LOG] '%s' → %s%n", tieuDe, nguoiNhan);
    }

    // Template method pattern: định nghĩa flow, bước cụ thể do con xử lý
    public final void guiCoLog(String nguoiNhan, String noiDung) {
        inLog(nguoiNhan);          // Bước 1: log luôn chạy
        gui(nguoiNhan, noiDung);   // Bước 2: gửi — class con quyết định làm gì
        System.out.println("✅ Đã gửi!\n");  // Bước 3: confirm luôn chạy
    }
}
```

```java
ThongBao tb = new ThongBao("A", "B");  // ❌ Lỗi compile! Cannot instantiate abstract class
ThongBao email = new EmailThongBao();  // ✅ OK — EmailThongBao là class cụ thể
```

**Quy tắc:** Nếu class có ít nhất 1 abstract method → class đó phải là `abstract`. Class con phải implement **tất cả** abstract method — nếu không, class con đó cũng phải là `abstract`.

---

## 2. Interface — Hợp Đồng Thuần Túy

Interface là một bước trừu tượng hơn nữa. Không có implementation gì cả — chỉ là tập hợp **các method mà class phải thực hiện**.

```java
// Interface: định nghĩa "hợp đồng"
public interface CoTheMua {
    boolean mua(int soLuong);   // abstract ngầm định
    double tinhGia(int soLuong);
}

public interface CoTheGiaoHang {
    void datGiao(String diaDiem);
    String xemTrangThai();
}

// Class implements nhiều interface (điều abstract class không làm được!)
public class SanPhamVatLy implements CoTheMua, CoTheGiaoHang {
    private String ten;
    private double gia;
    private int soLuong;

    public SanPhamVatLy(String ten, double gia, int soLuong) {
        this.ten = ten;
        this.gia = gia;
        this.soLuong = soLuong;
    }

    @Override
    public boolean mua(int soLuongMua) {
        if (soLuongMua > soLuong) return false;
        soLuong -= soLuongMua;
        System.out.printf("Mua thành công %d x %s%n", soLuongMua, ten);
        return true;
    }

    @Override
    public double tinhGia(int soLuong) {
        return this.gia * soLuong;
    }

    @Override
    public void datGiao(String diaDiem) {
        System.out.println("Đặt giao " + ten + " đến: " + diaDiem);
    }

    @Override
    public String xemTrangThai() {
        return "Đang chuẩn bị hàng";
    }
}
```

---

## 3. Abstract Class vs Interface — Khi Nào Dùng Cái Nào?

Đây là câu hỏi thầy bị hỏi nhiều nhất. Hãy nhớ bảng này:

| | Abstract Class | Interface |
|--|---|---|
| **Mục đích** | "Là một loại" (is-a) | "Có khả năng" (can-do) |
| **Extends/Implements** | `extends` (kế thừa) | `implements` (cam kết) |
| **Số lượng** | Chỉ extends 1 class | Implements nhiều interface |
| **Constructor** | ✅ Có | ❌ Không |
| **Field** | ✅ Mọi kiểu | Chỉ `public static final` |
| **Method** | Abstract + concrete | Abstract + default (Java 8+) |

**Ví dụ thực tế để nhớ:**
- `ChimCanh extends DongVat` — Chim Cánh là Động Vật (is-a) → abstract class
- `ChimCanh implements CoTheBay` — Có Khả Năng Bay (can-do) → interface
- `HeoRung extends DongVat` — Heo Rừng là Động Vật (is-a) → abstract class
- `HeoRung implements CoTheBoi` — Có Khả Năng Bơi (can-do) → interface

---

## 4. Default Method Trong Interface (Java 8+)

```java
public interface CoTheMua {
    boolean mua(int soLuong);
    double tinhGia(int soLuong);

    // Default method — có implementation sẵn, class con có thể dùng hoặc override
    default String formatGia(int soLuong) {
        return String.format("%,.0f đ", tinhGia(soLuong));
    }

    // Static method trong interface
    static CoTheMua taoMienphi() {
        return new CoTheMua() {
            public boolean mua(int sl) { return true; }      // Luôn thành công
            public double tinhGia(int sl) { return 0; }       // Miễn phí
        };
    }
}
```

Default method giải quyết vấn đề: khi thêm method mới vào interface, tất cả class đang implement phải sửa code (breaking change). Default method cho phép thêm method mà không phá vỡ code cũ.

---

## 5. Interface Functional (Java 8+)

Interface chỉ có **1 abstract method** được gọi là *functional interface*. Đây là nền tảng của Lambda (bạn sẽ học Bài 17):

```java
@FunctionalInterface
public interface BoLocSanPham {
    boolean kiemTra(SanPham sp);   // Duy nhất 1 abstract method
}

// Dùng:
BoLocSanPham locTheoDuoi500k = (sp) -> sp.getGia() < 500_000;
BoLocSanPham locConHang = (sp) -> sp.getSoLuong() > 0;

// Áp dụng:
for (SanPham sp : danhSachSP) {
    if (locTheoDuoi500k.kiemTra(sp)) {
        System.out.println(sp.getTen());
    }
}
```

---

## 6. Ví Dụ Thực Tế — Thiết Kế Repository Pattern (Spring Boot dùng cái này!)

Đây là design pattern bạn sẽ gặp trong dự án Java thực tế.

```java
// Interface định nghĩa "hợp đồng" — cần làm gì
public interface SanPhamRepository {
    SanPham findById(int id);
    List<SanPham> findAll();
    void save(SanPham sp);
    void delete(int id);
    List<SanPham> findByGiaDuoi(double giaMax);
}

// Implement 1: lưu trong memory (dùng để test)
public class MemorySanPhamRepository implements SanPhamRepository {
    private List<SanPham> db = new ArrayList<>();

    @Override
    public SanPham findById(int id) {
        for (SanPham sp : db) {
            if (sp.getId() == id) return sp;
        }
        return null;
    }

    @Override
    public void save(SanPham sp) {
        db.add(sp);
    }

    // ... các method khác
}

// Implement 2: lưu trong MySQL (dùng thật)
public class MySQLSanPhamRepository implements SanPhamRepository {
    @Override
    public SanPham findById(int id) {
        // Kết nối MySQL và query thật
        // "SELECT * FROM san_pham WHERE id = ?"
        return null; // Simplified
    }
    // ...
}

// Service chỉ biết đến interface — không quan tâm implementation nào!
public class SanPhamService {
    private SanPhamRepository repo;   // Kiểu là interface!

    // Inject implementation từ constructor
    public SanPhamService(SanPhamRepository repo) {
        this.repo = repo;
    }

    public SanPham laySanPham(int id) {
        return repo.findById(id);   // Polymorphism: Memory hay MySQL tùy vào inject
    }
}

// Dùng:
SanPhamService service = new SanPhamService(new MemorySanPhamRepository());  // Test
SanPhamService service2 = new SanPhamService(new MySQLSanPhamRepository());  // Production
```

Bạn thấy không: `SanPhamService` viết một lần, nhưng có thể chạy với bất kỳ "database" nào bằng cách inject implementation khác. **Đây chính xác là cách Spring Boot hoạt động!**

---

## 7. Bức Tranh Tổng Thể Phase 2

```
┌─────────────────────────────────────────────────────────┐
│                  OOP 4 Trụ Cột                          │
├────────────────┬────────────────────────────────────────┤
│ ENCAPSULATION  │ private fields + getter/setter          │
│ (Bài 09)       │ → Bảo vệ dữ liệu, kiểm soát access     │
├────────────────┼────────────────────────────────────────┤
│ INHERITANCE    │ extends: kế thừa field + method        │
│ (Bài 10)       │ → Tái sử dụng code, phân cấp           │
├────────────────┼────────────────────────────────────────┤
│ POLYMORPHISM   │ override: cùng lời gọi, nhiều hành vi  │
│ (Bài 11)       │ → Linh hoạt, dễ mở rộng                │
├────────────────┼────────────────────────────────────────┤
│ ABSTRACTION    │ abstract class + interface              │
│ (Bài 12)       │ → Định nghĩa khuôn mẫu, tách biệt      │
│                │   "làm gì" và "làm thế nào"            │
└────────────────┴────────────────────────────────────────┘
```

---

## Tóm Tắt — Bài 12

```
✅ abstract class: có cả method cụ thể và abstract, không thể new
✅ abstract method: không có body, class con PHẢI override
✅ interface: hợp đồng thuần túy, một class implements nhiều interface
✅ Khi nào dùng abstract: khi có code chung (is-a relationship)
✅ Khi nào dùng interface: khi định nghĩa khả năng (can-do)
✅ Default method: thêm implementation vào interface mà không phá code cũ
✅ Repository pattern: interface tách biệt logic và data access
```

---

## 🎉 Chúc Mừng — Bạn Đã Hoàn Thành Phase 2!

Đây là giai đoạn khó nhất về tư duy trong lộ trình Java. Nếu bạn hiểu được Bài 07-12, bạn đã có nền tảng để đọc và hiểu bất kỳ codebase Java nào.

Phase 3 sẽ thực tế hơn: **Collections** (List, Map, Set), **Exception Handling**, **File I/O**, **Lambda** và **Stream API** — những thứ bạn dùng hàng ngày khi code Java.

👉 **[Bài 13: Collections Framework — Danh Sách, Tập Hợp, Bản Đồ](../../phase3-intermediate/bai-13-collections/README.md)**
