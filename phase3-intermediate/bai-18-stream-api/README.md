# Bài 18: Stream API

> 🟠 **Phase 3 – Bài 6/6** | Thời gian: ~4 giờ

---

Nếu Lambda là cách viết hàm gọn gàng, thì **Stream API** là cách xử lý tập hợp dữ liệu một cách thanh lịch đến mức thầy có thể nói: "Đây là tính năng thay đổi cách tôi viết Java nhất."

Trước Stream API, xử lý danh sách phải dùng vòng lặp, biến tạm, logic rải rác khắp nơi. Với Stream, bạn có thể diễn đạt **MUỐN LÀM GÌ** thay vì **LÀM THẾ NÀO**.

---

## 1. Stream Là Gì?

Stream là **luồng dữ liệu** — bạn tạo một pipeline (đường ống) các phép biến đổi, rồi kết thúc bằng một thao tác thu thập kết quả.

```
Nguồn dữ liệu → [filter] → [map] → [sort] → Kết quả
```

```java
List<String> sanPham = List.of("Kiếm Rồng", "Giáp Vàng", "Nhẫn Ma Lực",
                                 "Kiếm Ánh Sáng", "Hài Cát", "Mũ Thần");

// Không có Stream — dài và phức tạp:
List<String> ketQua = new ArrayList<>();
for (String sp : sanPham) {
    if (sp.contains("Kiếm")) {           // Lọc
        String upper = sp.toUpperCase();  // Biến đổi
        ketQua.add(upper);
    }
}
Collections.sort(ketQua);

// Với Stream — đọc như tiếng Anh:
List<String> ketQua2 = sanPham.stream()
    .filter(sp -> sp.contains("Kiếm"))      // Lọc
    .map(String::toUpperCase)               // Biến đổi
    .sorted()                               // Sắp xếp
    .collect(Collectors.toList());          // Thu thập
```

---

## 2. Tạo Stream

```java
// Từ Collection:
List<Integer> soList = List.of(1, 2, 3, 4, 5);
Stream<Integer> stream1 = soList.stream();

// Từ mảng:
int[] arr = {1, 2, 3, 4, 5};
IntStream stream2 = Arrays.stream(arr);

// Tạo trực tiếp:
Stream<String> stream3 = Stream.of("A", "B", "C");

// Stream vô hạn — dùng với limit():
Stream<Integer> vonhan = Stream.iterate(0, n -> n + 2).limit(10); // 0,2,4,...,18
Stream<Double> random = Stream.generate(Math::random).limit(5);
```

---

## 3. Intermediate Operations — Biến Đổi Trung Gian

Trả về Stream mới, có thể chain tiếp. Thực tế **lười** — chỉ chạy khi có terminal operation.

### `filter()` — Lọc

```java
List<SanPham> dsSP = getDS(); // List sản phẩm

// Lọc sản phẩm giá dưới 500k và còn hàng
dsSP.stream()
    .filter(sp -> sp.getGia() < 500_000)
    .filter(sp -> sp.getSoLuong() > 0)
    .forEach(sp -> System.out.println(sp.getTen()));
```

### `map()` — Biến Đổi Từng Phần Tử

```java
// Chuyển List<SanPham> → List<String> (chỉ lấy tên)
List<String> tenList = dsSP.stream()
    .map(SanPham::getTen)            // Lấy tên của từng sản phẩm
    .collect(Collectors.toList());

// Biến đổi chuỗi
List<String> tenVietHoa = tenList.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// map sang kiểu khác
List<Integer> doTai = dsSP.stream()
    .map(SanPham::getSoLuong)       // SanPham → Integer
    .collect(Collectors.toList());
```

### `sorted()` — Sắp Xếp

```java
// Sắp xếp tên theo alphabet
dsSP.stream()
    .sorted(Comparator.comparing(SanPham::getTen))
    .forEach(sp -> System.out.println(sp.getTen()));

// Sắp xếp giá giảm dần
dsSP.stream()
    .sorted(Comparator.comparingDouble(SanPham::getGia).reversed())
    .forEach(sp -> System.out.printf("%s: %,.0f đ%n", sp.getTen(), sp.getGia()));
```

### `distinct()`, `limit()`, `skip()`

```java
List<Integer> so = List.of(1, 2, 2, 3, 3, 3, 4, 5);

so.stream().distinct().forEach(System.out::print);    // 1 2 3 4 5
so.stream().limit(3).forEach(System.out::print);      // 1 2 2
so.stream().skip(4).forEach(System.out::print);       // 3 3 4 5

// Phân trang — bỏ qua N phần tử, lấy M phần tử tiếp theo:
int trang = 2, kichThuoc = 3;
dsSP.stream()
    .skip((long)(trang - 1) * kichThuoc)  // Bỏ qua (trang-1) * kichThuoc phần tử
    .limit(kichThuoc)                      // Lấy kichThuoc phần tử
    .forEach(sp -> System.out.println(sp.getTen()));
```

---

## 4. Terminal Operations — Kết Thúc Pipeline

### `collect()` — Thu Thập Kết Quả

```java
import java.util.stream.Collectors;

// Thành List
List<SanPham> dsLoc = dsSP.stream()
    .filter(sp -> sp.getGia() > 1_000_000)
    .collect(Collectors.toList());

// Thành Set (loại trùng)
Set<String> danhMuc = dsSP.stream()
    .map(SanPham::getDanhMuc)
    .collect(Collectors.toSet());

// Thành Map (id → sản phẩm)
Map<Integer, SanPham> mapSP = dsSP.stream()
    .collect(Collectors.toMap(SanPham::getId, sp -> sp));

// Nhóm theo danh mục
Map<String, List<SanPham>> nhomTheoDanhMuc = dsSP.stream()
    .collect(Collectors.groupingBy(SanPham::getDanhMuc));
// {"Vũ khí": [Kiếm Rồng, Kiếm ÁS], "Phòng thủ": [Giáp Vàng], ...}

// Join chuỗi
String tenGhep = dsSP.stream()
    .map(SanPham::getTen)
    .collect(Collectors.joining(", "));  // "Kiếm Rồng, Giáp Vàng, Nhẫn Ma"
```

### `count()`, `findFirst()`, `anyMatch()`, `allMatch()`

```java
// Đếm
long soSPConHang = dsSP.stream()
    .filter(sp -> sp.getSoLuong() > 0)
    .count();

// Tìm phần tử đầu tiên khớp
Optional<SanPham> spTimThay = dsSP.stream()
    .filter(sp -> sp.getTen().contains("Kiếm"))
    .findFirst();

if (spTimThay.isPresent()) {
    System.out.println("Tìm thấy: " + spTimThay.get().getTen());
}

// Kiểm tra điều kiện
boolean coSPHetHang = dsSP.stream().anyMatch(sp -> sp.getSoLuong() == 0);
boolean tatCaConHang = dsSP.stream().allMatch(sp -> sp.getSoLuong() > 0);
boolean khongCoSpAm = dsSP.stream().noneMatch(sp -> sp.getGia() < 0);
```

### `reduce()` — Tổng Hợp

```java
// Tính tổng số lượng tất cả sản phẩm
int tongSoLuong = dsSP.stream()
    .mapToInt(SanPham::getSoLuong)  // IntStream
    .sum();

// Tính tổng giá trị kho (gia × soLuong)
double tongGiaTri = dsSP.stream()
    .mapToDouble(sp -> sp.getGia() * sp.getSoLuong())
    .sum();

// reduce thủ công:
Optional<Integer> tongCong = List.of(1, 2, 3, 4, 5).stream()
    .reduce((a, b) -> a + b);  // 15
```

---

## 5. Optional — Tránh NullPointerException

Khi một phép tính có thể trả về null, dùng `Optional`:

```java
Optional<SanPham> timSP = dsSP.stream()
    .filter(sp -> sp.getId() == 99)
    .findFirst();

// Kiểm tra và lấy giá trị an toàn:
timSP.ifPresent(sp -> System.out.println(sp.getTen()));

String ten = timSP.map(SanPham::getTen).orElse("Không tìm thấy");

SanPham sp = timSP.orElseThrow(() ->
    new RuntimeException("Sản phẩm #99 không tồn tại!"));
```

---

## 6. Ví Dụ Tổng Hợp — Báo Cáo Kho Hàng

```java
public class BaoCaoKho {

    public static void main(String[] args) {
        List<SanPham> kho = List.of(
            new SanPham(1, "Kiếm Rồng",     "Vũ khí",   1_200_000, 3),
            new SanPham(2, "Giáp Vàng",     "Phòng thủ", 800_000,  0),
            new SanPham(3, "Nhẫn Ma Lực",   "Trang sức", 500_000,  5),
            new SanPham(4, "Kiếm Ánh Sáng", "Vũ khí",   1_500_000, 1),
            new SanPham(5, "Hài Tốc Độ",   "Phòng thủ", 300_000,  4),
            new SanPham(6, "Mũ Thần",       "Phòng thủ", 400_000,  2)
        );

        // 1. Tổng giá trị kho (chỉ hàng còn)
        double tongGiaTri = kho.stream()
            .filter(sp -> sp.getSoLuong() > 0)
            .mapToDouble(sp -> sp.getGia() * sp.getSoLuong())
            .sum();

        // 2. Sản phẩm đắt nhất
        Optional<SanPham> datNhat = kho.stream()
            .max(Comparator.comparingDouble(SanPham::getGia));

        // 3. Nhóm theo danh mục — đếm số lượng mỗi danh mục
        Map<String, Long> theoDanhMuc = kho.stream()
            .collect(Collectors.groupingBy(SanPham::getDanhMuc, Collectors.counting()));

        // 4. Danh sách tên sản phẩm hết hàng
        String hetHang = kho.stream()
            .filter(sp -> sp.getSoLuong() == 0)
            .map(SanPham::getTen)
            .collect(Collectors.joining(", "));

        // 5. Top 3 đắt nhất còn hàng
        System.out.println("=== TOP 3 ĐẮT NHẤT CÒN HÀNG ===");
        kho.stream()
            .filter(sp -> sp.getSoLuong() > 0)
            .sorted(Comparator.comparingDouble(SanPham::getGia).reversed())
            .limit(3)
            .forEach(sp -> System.out.printf("  %s: %,.0f đ (còn %d)%n",
                sp.getTen(), sp.getGia(), sp.getSoLuong()));

        System.out.printf("%nTổng giá trị kho: %,.0f đ%n", tongGiaTri);
        datNhat.ifPresent(sp ->
            System.out.printf("Đắt nhất: %s (%,.0f đ)%n", sp.getTen(), sp.getGia()));
        System.out.println("Theo danh mục: " + theoDanhMuc);
        System.out.println("Hết hàng: " + hetHang);
    }
}
```

---

## Tóm Tắt — Bài 18

```
✅ Stream: pipeline xử lý dữ liệu — đọc như mô tả "muốn làm gì"
✅ Intermediate: filter(), map(), sorted(), distinct(), limit(), skip()
✅ Terminal: collect(), count(), findFirst(), anyMatch(), reduce()
✅ Collectors: toList(), toSet(), toMap(), groupingBy(), joining()
✅ Optional: tránh NullPointerException khi có thể trả về null
✅ Stream lười (lazy): chỉ thực sự chạy khi gặp terminal operation
✅ Stream không làm thay đổi nguồn — luôn tạo dữ liệu mới
```

---

## 🎉 Phase 3 Hoàn Thành!

Bạn vừa học 6 kỹ năng cốt lõi của Java trung cấp. Từ đây, bạn có thể đọc và hiểu hầu hết code Java trong các dự án thực tế.

Phase 4 sẽ đưa bạn vào **vùng đất của các kỹ sư senior**: Threading, Design Patterns, JVM internals, Testing...

👉 **[Bài 19: Multithreading & Concurrency](../../phase4-advanced/bai-19-multithreading/README.md)**
