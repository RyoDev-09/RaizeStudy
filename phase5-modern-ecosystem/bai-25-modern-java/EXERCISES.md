# Bài Tập — Bài 24: Modern Java

> 🟣 **Phase 5 – Bài 1/3** | Ôn tập: Records, Sealed Classes, Pattern Matching, Text Blocks

---

## Bài 1: Records — Data Classes Gọn Gàng ⭐

### Part A — Chuyển Đổi Class Cũ Sang Record

Chuyển các class dưới đây sang `record`:

```java
// Class cũ 1 — chuyển sang record
public class ToaDo {
    private final double x;
    private final double y;

    public ToaDo(double x, double y) { this.x = x; this.y = y; }
    public double getX() { return x; }
    public double getY() { return y; }
    // equals, hashCode, toString...
}

// Class cũ 2 — chuyển sang record
public class SanPhamDTO {
    private final int id;
    private final String ten;
    private final double gia;

    // Constructor, getters, equals, hashCode, toString...
}
```

**Yêu cầu:**
1. Viết 2 record tương đương
2. Thêm method `khoangCach(ToaDo khac)` vào record `ToaDo` (tính khoảng cách Euclidean)
3. Thêm compact constructor vào `SanPhamDTO` để validate: gia > 0

### Part B — Generic Record cho API Response

```java
// TODO: Tạo generic record ApiResponse<T> với 3 fields:
// - boolean success
// - String message
// - T data

// Sử dụng:
// ApiResponse<String> ok = new ApiResponse<>(true, "Thành công", "Dữ liệu");
// ApiResponse<List<SanPhamDTO>> list = new ApiResponse<>(true, "OK", danhSach);
// ApiResponse<Void> loi = new ApiResponse<>(false, "Không tìm thấy", null);

// TODO: Viết main() để test cả 3 case trên
```

---

## Bài 2: Sealed Classes — Hệ Thống Hình Học ⭐⭐

**Yêu cầu:** Xây dựng hệ thống tính diện tích và chu vi cho nhiều hình:

```java
// TODO: Tạo sealed class HinhHoc với 4 permitted subtypes:
// - HinhTron(double banKinh)
// - HinhChuNhat(double dai, double rong)
// - HinhVuong(double canh)
// - HinhTamGiac(double a, double b, double c)  // 3 cạnh

// HinhHoc cần có 2 abstract method: dienTich() và chuVi()

// Gợi ý HinhTamGiac dùng công thức Heron:
// s = (a+b+c)/2
// dienTich = Math.sqrt(s*(s-a)*(s-b)*(s-c))

// TODO: Viết method moTa(HinhHoc h) dùng switch expression (pattern matching)
// In ra: tên hình + kích thước + diện tích + chu vi
// KHÔNG dùng default case (vì sealed class — Java biết tất cả subtypes)

public class HinhHocApp {
    public static String moTa(HinhHoc h) {
        return switch (h) {
            case HinhTron t     -> "Hình tròn R=%.2f | S=%.2f | C=%.2f"
                                    .formatted(t.banKinh(), t.dienTich(), t.chuVi());
            // TODO: case cho các hình còn lại
        };
    }

    public static void main(String[] args) {
        List<HinhHoc> cacHinh = List.of(
            new HinhTron(5),
            new HinhChuNhat(4, 6),
            new HinhVuong(3),
            new HinhTamGiac(3, 4, 5)  // Tam giác vuông
        );

        cacHinh.forEach(h -> System.out.println(moTa(h)));

        // TODO: Dùng Stream để tính tổng diện tích tất cả hình
        double tongDienTich = cacHinh.stream()
            // ...
            .sum();
        System.out.printf("Tổng diện tích: %.2f%n", tongDienTich);
    }
}
```

---

## Bài 3: Pattern Matching instanceof ⭐

```java
import java.util.List;

public class PhanLoai {

    // TODO: Viết method phanLoaiObject(Object obj) dùng pattern matching instanceof
    // - Integer i  → "Số nguyên: [value], chẵn/lẻ"
    // - Double d   → "Số thực: [value], làm tròn = [round]"
    // - String s   → "Chuỗi [length] ký tự: [toUpperCase]"
    // - List<?> l  → "Danh sách [size] phần tử"
    // - null       → "null"
    // - còn lại    → "Không xác định: [className]"
    public static String phanLoai(Object obj) {
        // TODO: Dùng if-else với pattern matching instanceof
        return "";
    }

    public static void main(String[] args) {
        List<Object> danhSach = List.of(
            42, 3.14, "Hello, Java!", List.of(1, 2, 3), true, 'A'
        );

        danhSach.forEach(obj -> System.out.println(phanLoai(obj)));
        System.out.println(phanLoai(null));
    }
}
```

**Bonus:** Viết lại `phanLoai` dùng **switch expression với pattern** (Java 21).

---

## Bài 4: Text Blocks — Template Builder ⭐

**Yêu cầu:** Dùng text block để tạo các template:

```java
public class TemplateBuilder {

    // TODO: Method taoEmailHtml(String ten, String cauLacBo, String ngayBatDau)
    // Trả về HTML email chào mừng thành viên mới
    // Dùng text block + .formatted()
    public static String taoEmailHtml(String ten, String cauLacBo, String ngayBatDau) {
        return """
               <!DOCTYPE html>
               <html>
               <body>
                   <h1>Chào mừng %s!</h1>
                   <!-- TODO: Hoàn thiện template -->
               </body>
               </html>
               """.formatted(/* TODO */);
    }

    // TODO: Method taoSQLQuery(String tenBang, String dieuKien, int limit)
    // Trả về SQL query động
    public static String taoSQLQuery(String tenBang, String dieuKien, int limit) {
        return """
               SELECT *
               FROM %s
               WHERE %s
               LIMIT %d
               """.formatted(/* TODO */);
    }

    // TODO: Method taoJsonNguoiDung(String username, String email, String role)
    // Trả về JSON string
    public static String taoJsonNguoiDung(String username, String email, String role) {
        // TODO
        return "";
    }

    public static void main(String[] args) {
        System.out.println(taoEmailHtml("Raize", "Java Learners", "2025-01-01"));
        System.out.println("---");
        System.out.println(taoSQLQuery("nguoi_dung", "active = true", 10));
        System.out.println("---");
        System.out.println(taoJsonNguoiDung("raize99", "r@mail.com", "ADMIN"));
    }
}
```

---

## Bài 5: var — Type Inference ⭐

**Yêu cầu:** Refactor đoạn code sau — thay kiểu tường minh bằng `var` ở những chỗ **phù hợp**:

```java
import java.util.*;
import java.util.stream.*;

public class VarDemo {
    public static void main(String[] args) {
        // TODO: Thay bằng var ở những chỗ kiểu rõ ràng từ ngữ cảnh
        ArrayList<String> tenList = new ArrayList<String>();
        tenList.add("Alice");
        tenList.add("Bob");
        tenList.add("Charlie");

        HashMap<String, Integer> diemMap = new HashMap<String, Integer>();
        diemMap.put("Alice", 95);
        diemMap.put("Bob", 87);
        diemMap.put("Charlie", 92);

        // Giữ nguyên kiểu tường minh ở những chỗ KHÔNG nên dùng var
        // (Nơi kiểu không rõ từ ngữ cảnh)
        List<String> result = tenList.stream()
            .filter(s -> diemMap.getOrDefault(s, 0) >= 90)
            .sorted()
            .collect(Collectors.toList());

        System.out.println("Học sinh giỏi: " + result);
    }
}
```

**Câu hỏi:**
1. Dòng nào **nên** dùng `var`? Dòng nào **không nên**?
2. Tại sao `var result = tenList.stream()...collect(Collectors.toList())` có thể gây hiểu nhầm?

---

## Bài 6 (Nâng Cao): Kết Hợp Tất Cả ⭐⭐⭐

**Mô phỏng hệ thống thanh toán** dùng toàn bộ tính năng Modern Java:

```java
// TODO: Tạo sealed interface PhuongThucThanhToan với 3 permits:
// - TheNganHang(String soThe, String nganHang, double hanMuc)
// - ViDienTu(String soDienThoai, double soDu)
// - TienMat()

// TODO: Tạo record HoaDon(String maHD, double soTien, PhuongThucThanhToan phuongThuc)
// Compact constructor: soTien > 0, maHD không blank

// TODO: Viết method xacNhanThanhToan(HoaDon hd) dùng switch expression:
// - TheNganHang: kiểm tra soTien <= hanMuc, in thông tin the
// - ViDienTu: kiểm tra soTien <= soDu, in thông tin vi
// - TienMat: luôn thành công, nhắc trả tiền thừa
// Trả về ApiResponse<String> (bài 1B)

public class ThanhToanApp {
    public static ApiResponse<String> xacNhan(HoaDon hd) {
        return switch (hd.phuongThuc()) {
            // TODO
        };
    }

    public static void main(String[] args) {
        var hoaDon1 = new HoaDon("HD001", 500_000,
            new TheNganHang("1234-5678", "Vietcombank", 2_000_000));
        var hoaDon2 = new HoaDon("HD002", 1_500_000,
            new ViDienTu("0901234567", 1_000_000));  // Không đủ tiền!
        var hoaDon3 = new HoaDon("HD003", 100_000, new TienMat());

        List.of(hoaDon1, hoaDon2, hoaDon3).forEach(hd -> {
            var ket = xacNhan(hd);
            System.out.printf("[%s] %s: %s%n",
                ket.success() ? "✅" : "❌", hd.maHD(), ket.message());
        });
    }
}
```

---

## Tóm Tắt Kiến Thức Cần Nhớ

```
✅ record: 1 dòng thay thế class data với constructor/getter/equals/toString
✅ Compact constructor trong record: validate data khi khởi tạo
✅ sealed class/interface: kiểm soát subtype — chỉ permitted class được extend/implement
✅ Pattern matching instanceof: if (obj instanceof Type t) — check + bind 1 bước
✅ Switch expression với pattern (Java 21): switch(obj) { case Type t -> ... }
✅ Text block ("""): chuỗi nhiều dòng, dùng .formatted() để truyền tham số
✅ var: type inference cho local variable — dùng khi kiểu rõ ràng từ ngữ cảnh
✅ Virtual threads (Java 21): nhẹ, hàng triệu thread cho I/O tasks
```

---

👉 **[Bài 25: Database với JDBC & JPA](../bai-25-database-jdbc-jpa/EXERCISES.md)**
