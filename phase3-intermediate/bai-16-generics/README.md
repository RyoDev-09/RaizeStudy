# Bài 16: Generics — Kiểu Dữ Liệu Tổng Quát

> 🟠 **Phase 3 – Bài 4/6** | Thời gian: ~2.5 giờ

---

Bạn có bao giờ thắc mắc tại sao có thể viết `List<String>`, `List<Integer>`, `List<NguoiDung>` mà vẫn là cùng một class `ArrayList`? Đó là nhờ **Generics** — tính năng cho phép bạn viết code "tổng quát" cho nhiều kiểu dữ liệu.

---

## 1. Vấn Đề Mà Generics Giải Quyết

Giả sử bạn muốn viết class Pair (cặp giá trị) để lưu 2 thứ bất kỳ:

```java
// ❌ Cách không có Generics — dùng Object:
class Pair {
    Object first;
    Object second;
}

Pair p = new Pair();
p.first = "Raize";
p.second = 100;

String ten = (String) p.first;   // Cần cast thủ công
int diem = (int) p.second;       // Nguy hiểm — nếu cast sai → ClassCastException!
```

```java
// ✅ Generics — type-safe, không cần cast:
class Pair<F, S> {
    F first;
    S second;

    Pair(F first, S second) {
        this.first = first;
        this.second = second;
    }
}

Pair<String, Integer> p = new Pair<>("Raize", 100);
String ten = p.first;    // Không cần cast!
int diem = p.second;     // Compiler đảm bảo kiểu đúng
```

---

## 2. Generic Class

```java
// T = Type parameter — tên tùy bạn đặt (T, E, K, V là convention)
public class HopChua<T> {
    private T giaTri;
    private String nhan;

    public HopChua(String nhan, T giaTri) {
        this.nhan = nhan;
        this.giaTri = giaTri;
    }

    public T layRa() { return giaTri; }
    public void dung(T giaTri) { this.giaTri = giaTri; }

    @Override
    public String toString() {
        return "Hộp[" + nhan + "] = " + giaTri;
    }
}

// Dùng với nhiều kiểu:
HopChua<String> tenHop = new HopChua<>("tên", "Kiếm Rồng");
HopChua<Integer> diemHop = new HopChua<>("điểm", 2500);
HopChua<NguoiDung> userHop = new HopChua<>("user", new NguoiDung("raize99", "r@m.com"));

System.out.println(tenHop);     // Hộp[tên] = Kiếm Rồng
String ten = tenHop.layRa();    // Không cần cast!
```

---

## 3. Generic Method

```java
// Method có thể áp dụng lên nhiều kiểu
public static <T> T phantToken(T[] mang, int index) {
    if (index < 0 || index >= mang.length) return null;
    return mang[index];
}

// Hoán đổi 2 phần tử trong mảng
public static <T> void swap(T[] mang, int i, int j) {
    T tam = mang[i];
    mang[i] = mang[j];
    mang[j] = tam;
}

String[] ten = {"An", "Bình", "Chi"};
swap(ten, 0, 2);  // Đổi chỗ "An" và "Chi"
System.out.println(Arrays.toString(ten));  // [Chi, Bình, An]

Integer[] so = {1, 2, 3, 4, 5};
swap(so, 1, 3);
System.out.println(Arrays.toString(so));  // [1, 4, 3, 2, 5]
```

---

## 4. Bounded Wildcards — Giới Hạn Kiểu

```java
// <T extends Comparable<T>>: T phải implement Comparable (có thể so sánh)
public static <T extends Comparable<T>> T timMax(List<T> ds) {
    if (ds.isEmpty()) return null;
    T max = ds.get(0);
    for (T item : ds) {
        if (item.compareTo(max) > 0) max = item;
    }
    return max;
}

// Dùng được với bất kỳ kiểu implement Comparable:
List<Integer> soList = List.of(3, 1, 7, 2, 9);
System.out.println(timMax(soList));  // 9

List<String> tenList = List.of("Bình", "An", "Chi");
System.out.println(timMax(tenList));  // Chi (theo thứ tự alphabet)
```

### Wildcard `?` — Linh Hoạt Hơn

```java
// ? extends Number: chấp nhận List<Integer>, List<Double>, List<Long>...
public static double tinhTong(List<? extends Number> ds) {
    double tong = 0;
    for (Number n : ds) {
        tong += n.doubleValue();
    }
    return tong;
}

tinhTong(List.of(1, 2, 3));        // List<Integer> — OK!
tinhTong(List.of(1.5, 2.5, 3.5)); // List<Double> — OK!
```

---

## 5. Ứng Dụng Thực Tế — ApiResponse Generic

Trong dự án RaizeShop, tôi thấy pattern này rất phổ biến:

```java
// Không có Generics — phải viết nhiều class response:
class StringResponse { String data; boolean success; String message; }
class UserResponse   { NguoiDung data; boolean success; String message; }
class ListResponse   { List<?> data; boolean success; String message; }

// Có Generics — một class xử lý tất cả:
public class ApiResponse<T> {
    private T data;
    private boolean success;
    private String message;

    private ApiResponse(T data, boolean success, String message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }

    // Factory methods
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data, true, "Thành công");
    }

    public static <T> ApiResponse<T> loi(String message) {
        return new ApiResponse<>(null, false, message);
    }

    public T getData()      { return data; }
    public boolean isOk()   { return success; }
    public String getMessage() { return message; }

    @Override
    public String toString() {
        return String.format("ApiResponse{success=%b, message='%s', data=%s}",
            success, message, data);
    }
}

// Dùng:
ApiResponse<NguoiDung> userResp = ApiResponse.ok(new NguoiDung("raize99", "r@m.com"));
ApiResponse<List<SanPham>> listResp = ApiResponse.ok(danhSachSP);
ApiResponse<Void> errResp = ApiResponse.loi("Không tìm thấy user");

System.out.println(userResp);
NguoiDung user = userResp.getData();  // Type-safe, không cần cast!
```

---

## Tóm Tắt — Bài 16

```
✅ Generics: viết code tổng quát cho nhiều kiểu, type-safe lúc compile
✅ <T>: type parameter trong class/method
✅ <T extends Interface>: bounded type — T phải là subtype
✅ <?> wildcard: linh hoạt khi đọc, không ghi
✅ Ứng dụng thực: generic response wrapper, pair, repository pattern
✅ Type erasure: Generics chỉ tồn tại lúc compile, runtime không có thông tin kiểu
```

---

👉 **[Bài 17: Lambda & Functional Interface](../bai-17-lambda-functional/README.md)**
