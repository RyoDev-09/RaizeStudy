# Bài 24: Modern Java — Records, Sealed Classes, Pattern Matching

> 🟣 **Phase 5 – Bài 1/3** | Thời gian: ~3 giờ

---

Java đang phát triển nhanh hơn bao giờ hết. Từ Java 14 đến Java 21, rất nhiều tính năng mới được thêm vào để code Java ngắn hơn, an toàn hơn và expressive hơn. Bài này thầy sẽ giới thiệu những thứ thực sự hữu ích và bạn sẽ gặp trong codebase hiện đại.

---

## 1. Records — Immutable Data Classes (Java 16)

Trước đây, muốn tạo một class chứa dữ liệu (data carrier) cần rất nhiều boilerplate:

```java
// Cách cũ — dài dòng:
public class DiemSo {
    private final String monHoc;
    private final double diem;

    public DiemSo(String monHoc, double diem) {
        this.monHoc = monHoc;
        this.diem = diem;
    }

    public String getMonHoc() { return monHoc; }
    public double getDiem()   { return diem; }

    @Override public boolean equals(Object o) { ... }   // 10 dòng
    @Override public int hashCode() { ... }              // 5 dòng
    @Override public String toString() { ... }           // 5 dòng
}

// Cách mới với Record — 1 dòng, đầy đủ tính năng:
public record DiemSo(String monHoc, double diem) {}
```

**Record tự động có:**
- Constructor với tất cả fields
- Getter (`monHoc()`, `diem()` — không có get prefix!)
- `equals()`, `hashCode()`, `toString()` dựa trên fields
- Immutable (tất cả fields là `final`)

```java
DiemSo d = new DiemSo("Toán", 9.5);
System.out.println(d.monHoc());  // "Toán" (không phải getMonHoc()!)
System.out.println(d.diem());    // 9.5
System.out.println(d);           // DiemSo[monHoc=Toán, diem=9.5]

// Có thể thêm custom method:
public record SanPham(String ten, double gia, int soLuong) {
    // Compact constructor — validate
    public SanPham {
        if (gia < 0) throw new IllegalArgumentException("Giá không được âm");
        if (soLuong < 0) throw new IllegalArgumentException("Số lượng không được âm");
    }

    // Custom method
    public double tongGiaTri() { return gia * soLuong; }
    public boolean conHang()   { return soLuong > 0; }
}

// Perfect cho Data Transfer Object (DTO), API response:
public record ApiResponse<T>(boolean success, String message, T data) {}

ApiResponse<String> resp = new ApiResponse<>(true, "OK", "Dữ liệu");
System.out.println(resp.success());  // true
```

---

## 2. Sealed Classes — Kiểm Soát Hierarchy (Java 17)

**Vấn đề:** Interface/abstract class mở, bất kỳ ai ở đâu cũng có thể implement/extend → khó biết tất cả subtype là gì.

```java
// Sealed class: chỉ những class được liệt kê mới được extends
public sealed class HinhHoc
    permits HinhTron, HinhChuNhat, HinhTamGiac {

    public abstract double dienTich();
}

// Các permitted class phải là final, sealed, hoặc non-sealed
public final class HinhTron extends HinhHoc {
    private final double banKinh;
    public HinhTron(double banKinh) { this.banKinh = banKinh; }

    @Override
    public double dienTich() { return Math.PI * banKinh * banKinh; }
}

public final class HinhChuNhat extends HinhHoc {
    private final double dai, rong;
    public HinhChuNhat(double dai, double rong) { this.dai = dai; this.rong = rong; }

    @Override
    public double dienTich() { return dai * rong; }
}

// Lợi ích: pattern matching exhaustive (Java biết tất cả subtypes)
public String moTa(HinhHoc h) {
    return switch (h) {
        case HinhTron c   -> "Hình tròn R=" + c.banKinh();
        case HinhChuNhat r -> "HCN " + r.dai() + "x" + r.rong();
        case HinhTamGiac t -> "Tam giác";
        // Không cần default vì Java biết đây là tất cả!
    };
}
```

---

## 3. Pattern Matching `instanceof` (Java 16)

```java
// Cách cũ — verbose:
if (obj instanceof NguoiDung) {
    NguoiDung u = (NguoiDung) obj;  // Cast thủ công
    System.out.println(u.getUsername());
}

// Pattern matching — gọn hơn:
if (obj instanceof NguoiDung u) {  // Check và bind trong 1 bước
    System.out.println(u.getUsername());
}

// Trong switch (Java 21):
Object obj = getValue();
String ket = switch (obj) {
    case Integer i   -> "Số nguyên: " + i;
    case String s    -> "Chuỗi: " + s.toUpperCase();
    case NguoiDung u -> "User: " + u.getUsername();
    case null        -> "null";
    default          -> "Khác: " + obj;
};
```

---

## 4. Text Blocks (Java 15)

```java
// Cũ — khó đọc, phải escape:
String sql = "SELECT u.username, u.email\n" +
             "FROM nguoi_dung u\n" +
             "WHERE u.active = true\n" +
             "ORDER BY u.created_at DESC";

// Text block — sạch, dễ đọc:
String sql = """
        SELECT u.username, u.email
        FROM nguoi_dung u
        WHERE u.active = true
        ORDER BY u.created_at DESC
        """;

// JSON template:
String json = """
        {
          "username": "%s",
          "email": "%s",
          "role": "%s"
        }
        """.formatted(username, email, role);
```

---

## 5. Switch Expressions (Java 14) — Nhắc Lại

```java
// Đã học ở Bài 03, nhưng Power-up thêm với pattern matching:
int so = 5;
String loai = switch (so) {
    case 1, 2, 3 -> "Nhỏ";
    case 4, 5, 6 -> "Vừa";
    case 7, 8, 9 -> "Lớn";
    default      -> "Khác";
};

// Với yield (nếu cần nhiều câu lệnh):
String ket = switch (so) {
    case 1, 2, 3 -> {
        System.out.println("Xử lý số nhỏ...");
        yield "Nhỏ";  // yield thay cho return trong switch expression
    }
    default -> "Khác";
};
```

---

## 6. String Methods Mới

```java
// Java 11+
"  hello  ".strip();           // "hello" (Unicode-aware trim)
"  ".isBlank();                // true
"a\nb\nc".lines().count();    // 3 (Stream<String>)
"abc".repeat(3);               // "abcabcabc"

// Java 12+
String result = """
        hello
        world
        """.indent(4);  // Thêm 4 spaces indent mỗi dòng

// Java 15+: String.formatted() (như String.format nhưng gọi trên instance)
String msg = "Xin chào %s, bạn có %d thông báo".formatted("Raize", 5);
```

---

## 7. Local Variable Type Inference `var` (Java 10)

```java
// var: Java tự suy kiểu, chỉ dùng được cho local variable
var tenList = new ArrayList<String>();  // ArrayList<String>
var userMap = new HashMap<String, NguoiDung>();  // HashMap<String, NguoiDung>

// Tốt khi kiểu rõ ràng từ ngữ cảnh:
var users = userRepository.findAll();  // Rõ là List<NguoiDung>

// Không dùng được khi kiểu không rõ:
var x = null;  // ❌ Lỗi!
var list;      // ❌ Lỗi — phải khởi tạo ngay
```

---

## 8. Virtual Threads (Java 21 — Project Loom)

```java
// Virtual thread = lightweight thread, hàng triệu cái mà không tốn RAM nhiều
// Perfect cho I/O-bound tasks (DB queries, API calls, file ops)

// Tạo virtual thread:
Thread.ofVirtual().start(() -> {
    System.out.println("Virtual thread: " + Thread.currentThread().isVirtual()); // true
});

// Executor với virtual thread:
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 100_000; i++) {
        executor.submit(() -> {
            Thread.sleep(Duration.ofMillis(100));  // I/O wait
            return "done";
        });
    }
}
// 100,000 virtual threads chạy thoải mái — thử với platform thread = OutOfMemoryError!
```

---

## Tóm Tắt — Bài 24

```
✅ Record: immutable data class 1 dòng, tự có constructor/getter/equals/toString
✅ Sealed class: kiểm soát hierarchy — chỉ permitted class được extends
✅ Pattern matching instanceof: check + cast + bind trong 1 bước
✅ Text block ("""): chuỗi nhiều dòng dễ đọc, ít escape
✅ Switch expression với pattern (Java 21): match theo kiểu object
✅ Virtual Threads: hàng triệu thread nhẹ cho I/O tasks
✅ Java ra release mới mỗi 6 tháng (LTS mỗi 2 năm: 11, 17, 21, 25...)
```

---

👉 **[Bài 25: Database với JDBC & JPA](../bai-25-database-jdbc-jpa/README.md)**
