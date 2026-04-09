# Bài 02: Biến & Kiểu Dữ Liệu

> 🟢 **Phase 1 – Bài 2/7** | Thời gian: ~3 giờ

---

Bài trước bạn đã in được chữ ra màn hình — nhưng dữ liệu đó được gõ thẳng vào code, cứng đơ. Bài này thầy sẽ dạy bạn cách **lưu trữ dữ liệu vào biến** để chương trình linh hoạt hơn rất nhiều.

Hãy tưởng tượng biến như một **chiếc hộp có nhãn dán**. Bạn có thể bỏ bất cứ thứ gì vào hộp, lấy ra, hoặc thay thế nội dung bên trong — miễn là đúng kiểu dữ liệu của hộp đó.

---

## 1. Khai Báo Biến

```java
int tuoi = 20;
//  ↑     ↑  ↑
//Kiểu  Tên  Giá trị
```

Đây là cú pháp cơ bản. Nhưng cái quan trọng không phải cú pháp — mà là **kiểu dữ liệu**. Java bắt buộc bạn phải nói trước: "Hộp này chứa số nguyên" hay "Hộp này chứa chuỗi chữ". Không như Python hay JavaScript cho bạn bỏ bất cứ thứ gì vào. Đây là điểm mạnh của Java — máy tính biết trước kiểu dữ liệu nên chạy nhanh và ít lỗi hơn.

---

## 2. 8 Kiểu Dữ Liệu Nguyên Thủy (Primitive Types)

Java có đúng 8 kiểu nguyên thủy. Thầy sẽ giải thích từng cái theo thứ tự từ hay dùng nhất:

### Nhóm số nguyên

```java
int soLuong = 1000;         // Dùng nhiều nhất – đủ cho hầu hết mọi trường hợp
long soTienVND = 5_000_000_000L;  // Số rất lớn (hậu tố L bắt buộc!)
byte tuoi = 20;             // Nhỏ gọn nhưng giới hạn -128 đến 127
short soItem = 30000;       // Ít gặp trong thực tế
```

> ⚠️ **Hay nhầm:** Dấu gạch dưới `_` trong số (như `5_000_000_000L`) là hợp lệ từ Java 7. Java tự bỏ qua nó khi compile — chỉ để bạn đọc cho dễ. Rất tiện với số tiền VND!

### Nhóm số thực

```java
double pi = 3.14159265358979;  // Dùng cho số thực – chính xác hơn float
float nhietDo = 36.5f;          // Hậu tố f bắt buộc, ít dùng hơn double
```

Thầy gần như luôn dùng `double`, không dùng `float`. Lý do đơn giản: `double` chính xác hơn và máy tính hiện đại gần như không tốn thêm chi phí gì khi dùng `double`.

> ⚠️ **Cạm bẫy kinh điển với số thực:**
> ```java
> System.out.println(0.1 + 0.2);
> // Kết quả: 0.30000000000000004  ← Không phải 0.3!
> ```
> Tại sao? Vì máy tính dùng hệ nhị phân, không biểu diễn chính xác tất cả số thực. Nếu bạn làm app tài chính, hãy dùng `BigDecimal` thay vì `double`. Bạn sẽ học `BigDecimal` sau.

### Ký tự và Boolean

```java
char kyTu = 'A';         // Một ký tự đơn — dùng nháy đơn, không phải nháy đôi!
boolean daDangNhap = true;  // Chỉ có true hoặc false
```

Bạn sẽ dùng `boolean` rất nhiều khi làm điều kiện if/else. Còn `char` thì ít gặp hơn.

---

## 3. Bảng Tóm Tắt 8 Kiểu

| Kiểu | Kích thước | Phạm vi | Khi nào dùng |
|------|-----------|---------|-------------|
| `byte` | 1 byte | -128 → 127 | Lưu giá trị nhỏ (hiếm dùng) |
| `short` | 2 bytes | -32,768 → 32,767 | Hiếm dùng |
| **`int`** | 4 bytes | ±2.1 tỷ | **Số nguyên thông thường** |
| `long` | 8 bytes | Rất lớn | ID, timestamp, tiền VND lớn |
| `float` | 4 bytes | ~7 chữ số | Ít dùng |
| **`double`** | 8 bytes | ~15 chữ số | **Số thực thông thường** |
| `char` | 2 bytes | Một ký tự Unicode | Xử lý ký tự đơn |
| `boolean` | 1 bit | true/false | Điều kiện |

---

## 4. Kiểu `String` — Không Phải Primitive Nhưng Dùng Liên Tục

```java
String ten = "Nguyễn Văn A";
String rong = "";          // String rỗng
String chuaCoGi = null;   // null = không trỏ đến gì cả (cẩn thận khi dùng!)
```

`String` không phải kiểu nguyên thủy — nó là một **class**. Nhưng Java ưu ái nó đặc biệt nên bạn dùng nó giống như primitive. Sự khác biệt quan trọng là: khi so sánh String, **không được dùng `==`**!

```java
String s1 = "hello";
String s2 = "hello";

System.out.println(s1 == s2);         // Có thể true, có thể false — KHÔNG ĐÁNG TIN!
System.out.println(s1.equals(s2));    // ✅ Luôn đúng — đây là cách đúng
System.out.println(s1.equalsIgnoreCase("HELLO")); // true — không phân biệt hoa/thường
```

> 💡 **Mẹo nhớ:** `==` so sánh **địa chỉ trong memory**. `.equals()` so sánh **nội dung**. Với String bạn cần so sánh nội dung, nên luôn dùng `.equals()`.

---

## 5. Hằng Số với `final`

Đôi khi bạn có giá trị không bao giờ thay đổi — như số PI, thuế suất, tên ứng dụng. Hãy khai báo nó là hằng số:

```java
final double PI = 3.14159265358979;
final int THUE_VAT = 10;  // 10%
final String TEN_APP = "RaizeShop";

PI = 3.14;  // ❌ Lỗi compile ngay! final = không thay đổi được
```

Quy tắc đặt tên hằng số: **VIẾT_HOA_VÀ_DÙNG_GẠCH_DƯỚI**. Java community đặt ra quy tắc này để chỉ nhìn vào tên là biết ngay đây là hằng số.

---

## 6. `var` — Tự Suy Kiểu (Java 10+)

```java
var ten = "Raize";        // Java tự hiểu là String
var tuoi = 20;            // Java tự hiểu là int
var diemTB = 8.5;         // Java tự hiểu là double

// var chỉ dùng được trong phạm vi method (local variable)
// Không dùng được cho field của class
```

`var` giúp code ngắn hơn khi kiểu dữ liệu đã rõ ràng từ ngữ cảnh. Nhưng thầy khuyên: khi mới học, **đừng dùng `var`** — hãy ghi rõ kiểu để tự luyện não.

---

## 7. Toán Tử

### Số học

```java
int a = 10, b = 3;

System.out.println(a + b);   // 13
System.out.println(a - b);   // 7
System.out.println(a * b);   // 30
System.out.println(a / b);   // 3  ← Chú ý! Chia nguyên, không phải 3.33!
System.out.println(a % b);   // 1  ← Modulo: phần dư của phép chia
```

> ⚠️ **Học sinh sai nhiều nhất chỗ này:** `10 / 3 = 3`, không phải `3.33`! Đây là **chia nguyên** vì cả hai đều là `int`. Muốn kết quả thập phân, phải có ít nhất một số thực:
> ```java
> System.out.println(10.0 / 3);   // 3.3333...
> System.out.println((double)10 / 3); // Ép kiểu — cũng ra 3.3333...
> ```

### Gán kết hợp — viết tắt tiện lợi

```java
int x = 10;
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x %= 4;   // x = x % 4  → 2
```

### Tăng giảm — `++` và `--`

```java
int x = 5;
System.out.println(x++);  // In ra 5, SAU ĐÓ mới tăng → x = 6
System.out.println(++x);  // Tăng TRƯỚC → x = 7, rồi in ra 7
```

Thầy biết hai cái này hơi rối. Mẹo đơn giản: `++x` (trước) = tăng rồi mới lấy. `x++` (sau) = lấy rồi mới tăng. Trong thực tế, thầy hầu như chỉ dùng trong vòng `for` nên hiếm khi cần phân biệt.

### So sánh và Logic

```java
// So sánh — kết quả luôn là boolean
int a = 10, b = 5;
System.out.println(a > b);    // true
System.out.println(a == b);   // false
System.out.println(a != b);   // true

// Logic
boolean t = true, f = false;
System.out.println(t && f);   // false — AND: cả hai phải true
System.out.println(t || f);   // true  — OR: ít nhất một true
System.out.println(!t);       // false — NOT: đảo ngược

// Ví dụ thực tế:
int tuoi = 20;
boolean coTheLaiXe = (tuoi >= 18) && coGiayPhep;
```

---

## 8. Type Casting — Ép Kiểu

Đôi khi bạn cần chuyển kiểu dữ liệu này sang kiểu khác:

```java
// Tự động (widening): từ nhỏ → lớn, an toàn
int i = 42;
double d = i;         // int tự chuyển thành double: 42.0

// Ép buộc (narrowing): từ lớn → nhỏ, CÓ THỂ mất dữ liệu
double pi = 3.99;
int piInt = (int) pi;  // Cắt phần thập phân thẳng, KHÔNG làm tròn!
System.out.println(piInt);  // 3 (không phải 4!)
```

> 💡 **Ghi nhớ:** `(int) 3.99 = 3`, không phải 4. Java cắt phần lẻ chứ không làm tròn. Nhiều bạn nghĩ Java sẽ làm tròn — sai!

---

## 9. Ví Dụ Thực Tế: Hóa Đơn Mua Hàng

Bây giờ hãy kết hợp tất cả lại. Thầy sẽ viết một chương trình tính hóa đơn đơn giản:

```java
public class HoaDon {
    public static void main(String[] args) {
        // Thông tin hàng
        String tenSanPham = "Kiếm Rồng Cấp 10";
        int soLuong = 3;
        double donGia = 150_000.0;

        // Tính toán
        double tongTien = soLuong * donGia;
        double giamGia10Phan = tongTien * 0.10;  // Giảm 10%
        double thanhToan = tongTien - giamGia10Phan;

        // In hóa đơn
        System.out.println("========= HÓA ĐƠN =========");
        System.out.printf("Sản phẩm  : %s%n", tenSanPham);
        System.out.printf("Số lượng  : %d%n", soLuong);
        System.out.printf("Đơn giá   : %,.0f đ%n", donGia);
        System.out.printf("Tổng tiền : %,.0f đ%n", tongTien);
        System.out.printf("Giảm 10%%  : -%,.0f đ%n", giamGia10Phan);
        System.out.println("----------------------------");
        System.out.printf("Thành tiền: %,.0f đ%n", thanhToan);
    }
}
```

Hãy **tự chạy** và thay thử số liệu khác nhau. Bạn thử thay `soLuong = 5`, `donGia = 250_000` xem kết quả ra sao.

---

## Tóm Tắt — Bài 02

```
✅ 8 kiểu primitive: byte, short, int, long, float, double, char, boolean
✅ Hay dùng nhất: int, double, boolean, String
✅ String dùng .equals() để so sánh — KHÔNG dùng ==
✅ final → hằng số, không thay đổi được, đặt tên UPPER_SNAKE_CASE
✅ 10 / 3 = 3 (chia nguyên), muốn 3.33 phải dùng 10.0 / 3
✅ (int) 3.99 = 3 — cắt, không làm tròn
```

---

## ➡️ Bài Tiếp Theo

Bây giờ bạn đã có thể lưu dữ liệu vào biến rồi. Nhưng chương trình vẫn chỉ chạy một chiều — bước 1, bước 2, bước 3... Bài tiếp theo thầy sẽ dạy bạn cách làm chương trình "thông minh" hơn: biết ra quyết định dựa trên điều kiện.

👉 **[Bài 03: Câu Lệnh Điều Kiện](../bai-03-dieu-kien/README.md)**
