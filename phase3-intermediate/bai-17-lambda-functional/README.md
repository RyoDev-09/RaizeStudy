# Bài 17: Lambda & Functional Interface

> 🟠 **Phase 3 – Bài 5/6** | Thời gian: ~3 giờ

---

Java 8 (2014) là một cuộc cách mạng trong lịch sử của ngôn ngữ này. **Lambda expression** và **Functional Interface** đã thay đổi cách người ta viết Java — từ verbose, boilerplate nặng nề sang code gọn gàng, biểu đạt rõ ý hơn.

Thầy nhớ lần đầu thấy code Java 8, thầy không nhận ra đó là Java nữa. Bây giờ thầy không muốn quay lại Java 7 bao giờ nữa.

---

## 1. Trước Lambda — Code Cũ Rất Dài

```java
// Sắp xếp danh sách — Java 7 cần anonymous class:
List<String> ten = new ArrayList<>(List.of("Bình", "An", "Chi", "Duy"));

Collections.sort(ten, new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.compareTo(b);   // Sắp xếp alphabet
    }
});

// Chạy code trong thread mới — Java 7:
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Đang chạy trong thread mới");
    }
}).start();
```

---

## 2. Lambda Expression — Ngắn Gọn Hơn Rất Nhiều

```java
// Lambda = anonymous function gọn gàng
(thamSo) -> { thân_hàm }

// Các dạng lambda:
() -> System.out.println("Không có tham số")
(x) -> x * 2                              // 1 tham số, 1 biểu thức, return ẩn
(x, y) -> x + y                           // 2 tham số
(x, y) -> { int z = x + y; return z; }   // Thân block nhiều dòng

// Ví dụ sắp xếp với lambda:
Collections.sort(ten, (a, b) -> a.compareTo(b));
// Hoặc thậm chí ngắn hơn:
ten.sort(String::compareTo);  // Method reference — sẽ học sau

// Thread với lambda:
new Thread(() -> System.out.println("Đang chạy trong thread mới")).start();
```

---

## 3. Functional Interface — Nền Tảng Của Lambda

Lambda chỉ có thể dùng ở nơi cần **Functional Interface** — interface có đúng 1 abstract method.

```java
@FunctionalInterface
public interface BoLoc<T> {
    boolean kiemTra(T item);   // 1 abstract method duy nhất
}

// Dùng lambda để implement:
BoLoc<String> duoi10Ky = s -> s.length() < 10;
BoLoc<Integer> soLe = n -> n % 2 != 0;

System.out.println(duoi10Ky.kiemTra("Hello"));   // true
System.out.println(soLe.kiemTra(7));              // true
```

---

## 4. Các Functional Interface Có Sẵn Trong Java

Java 8 cung cấp sẵn nhiều functional interface trong `java.util.function`:

### `Predicate<T>` — Kiểm Tra Điều Kiện (T → boolean)

```java
import java.util.function.Predicate;

Predicate<String> laEmail = s -> s.contains("@");
Predicate<Integer> laAmChan = n -> n < 0 && n % 2 == 0;
Predicate<NguoiDung> daDangNhap = u -> u.isActive();

System.out.println(laEmail.test("raize@mail.com"));  // true

// Kết hợp Predicate:
Predicate<Integer> soDuong = n -> n > 0;
Predicate<Integer> soNho = n -> n < 100;
Predicate<Integer> duongVaNho = soDuong.and(soNho);   // AND

System.out.println(duongVaNho.test(50));   // true
System.out.println(duongVaNho.test(150));  // false

Predicate<Integer> either = soDuong.or(soNho);   // OR
Predicate<Integer> notDuong = soDuong.negate();   // NOT
```

### `Function<T, R>` — Chuyển Đổi (T → R)

```java
import java.util.function.Function;

Function<String, Integer> doDai = s -> s.length();
Function<Integer, String> intToStr = n -> "Số: " + n;

System.out.println(doDai.apply("Hello"));  // 5
System.out.println(intToStr.apply(42));    // "Số: 42"

// Compose functions (kết hợp):
Function<String, String> xuLy = doDai.andThen(intToStr);
// andThen: áp dụng Function đầu, rồi Function sau
System.out.println(xuLy.apply("Hello"));  // "Số: 5"
```

### `Consumer<T>` — Tiêu Thụ (T → void)

```java
import java.util.function.Consumer;

Consumer<String> in = s -> System.out.println(s);
Consumer<NguoiDung> capNhatLog = u -> Logger.info("User hoạt động: " + u.getUsername());

in.accept("Xin chào!");  // "Xin chào!"

// forEach dùng Consumer:
List<String> ten = List.of("An", "Bình", "Chi");
ten.forEach(t -> System.out.println("- " + t));
// Hoặc ngắn hơn:
ten.forEach(System.out::println);
```

### `Supplier<T>` — Cung Cấp (void → T)

```java
import java.util.function.Supplier;

Supplier<NguoiDung> taoUserMacDinh = () -> new NguoiDung("guest", "guest@mail.com");
Supplier<LocalDateTime> layGio = LocalDateTime::now;

NguoiDung guest = taoUserMacDinh.get();
System.out.println(layGio.get());
```

---

## 5. Method Reference — Lambda Càng Ngắn Hơn

Khi lambda chỉ gọi một method đã có sẵn, dùng `::` thay thế:

```java
// Lambda thường:
ten.forEach(s -> System.out.println(s));
ten.sort((a, b) -> a.compareTo(b));

// Method reference — ngắn hơn, cùng ý nghĩa:
ten.forEach(System.out::println);          // instance method của System.out
ten.sort(String::compareTo);               // instance method của String

// Static method reference:
List<String> soStr = List.of("3", "1", "4", "1", "5");
soStr.stream()
    .map(Integer::parseInt)               // Integer.parseInt là static method
    .forEach(System.out::println);

// Constructor reference:
Supplier<ArrayList<String>> taoList = ArrayList::new;
ArrayList<String> list = taoList.get();  // new ArrayList<>()
```

---

## 6. Ứng Dụng Thực Tế — Lọc và Sắp Xếp Danh Sách

```java
public class QuanLySanPham {

    public static List<SanPham> loc(List<SanPham> ds, Predicate<SanPham> boLoc) {
        List<SanPham> ketQua = new ArrayList<>();
        for (SanPham sp : ds) {
            if (boLoc.test(sp)) ketQua.add(sp);
        }
        return ketQua;
    }

    public static void sapXep(List<SanPham> ds, Comparator<SanPham> tieuChuan) {
        ds.sort(tieuChuan);
    }

    public static void main(String[] args) {
        List<SanPham> kho = List.of(
            new SanPham("Kiếm Rồng", 1_200_000, 3),
            new SanPham("Giáp Vàng", 800_000, 0),
            new SanPham("Nhẫn Ma", 500_000, 5),
            new SanPham("Hài Cát", 300_000, 2)
        );

        // Lễ sử dụng lambda như tham số!
        List<SanPham> conHang = loc(kho, sp -> sp.getSoLuong() > 0);
        List<SanPham> duoi1Trieu = loc(kho, sp -> sp.getGia() < 1_000_000);

        // Sắp xếp theo giá tăng dần
        List<SanPham> dsSapXep = new ArrayList<>(kho);
        sapXep(dsSapXep, (a, b) -> Double.compare(a.getGia(), b.getGia()));
        // Hoặc:
        sapXep(dsSapXep, Comparator.comparingDouble(SanPham::getGia));
        // Giảm dần:
        sapXep(dsSapXep, Comparator.comparingDouble(SanPham::getGia).reversed());

        System.out.println("Còn hàng: " + conHang.size());
        System.out.println("Dưới 1 triệu: " + duoi1Trieu.size());
    }
}
```

---

## Tóm Tắt — Bài 17

```
✅ Lambda = anonymous function gọn: (params) -> expression
✅ Chỉ dùng được khi cần Functional Interface (@FunctionalInterface)
✅ Predicate<T>: T → boolean (kiểm tra điều kiện)
✅ Function<T,R>: T → R (chuyển đổi)
✅ Consumer<T>: T → void (tiêu thụ/hành động)
✅ Supplier<T>: void → T (tạo ra giá trị)
✅ Method reference (::): ngắn hơn lambda khi gọi method có sẵn
✅ Lambda và Functional Interface là nền tảng cho Stream API bài tiếp theo
```

---

👉 **[Bài 18: Stream API](../bai-18-stream-api/README.md)**
