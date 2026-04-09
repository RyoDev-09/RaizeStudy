# Bài 05: Mảng (Array) và Chuỗi (String) Nâng Cao

> 🟡 **Phase 1 – Bài 5/7** | Thời gian: ~3.5 giờ

---

Cho đến giờ bạn chỉ lưu được **một giá trị** trong một biến. Nhưng thực tế, bạn thường cần xử lý **nhiều giá trị cùng kiểu** — danh sách sản phẩm, điểm của cả lớp, lịch sử giao dịch...

Đây là lúc **mảng (array)** ra đời. Và cũng trong bài này, Tôi sẽ dạy bạn khai thác sức mạnh thực sự của `String` — thứ bạn đã dùng từ bài 1 nhưng chưa hiểu sâu.

---

## PHẦN A: MẢNG (ARRAY)

## 1. Mảng Là Gì?

Hãy hình dung thế này: nếu `int tuoi = 20` là một chiếc hộp, thì **mảng** là một dãy hộp được đánh số liên tiếp.

```
int[] diem = {80, 90, 75, 95, 65}

   [0]    [1]    [2]    [3]    [4]
 ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
 │ 80 │ │ 90 │ │ 75 │ │ 95 │ │ 65 │
 └────┘ └────┘ └────┘ └────┘ └────┘
    ↑
 Index bắt đầu từ 0, không phải 1!
```

> 💡 **Tại sao index bắt đầu từ 0?** Câu hỏi này tôi bị hỏi nhiều lắm. Câu trả lời: đây là quy ước từ những ngày đầu của lập trình, vì máy tính tính địa chỉ memory bắt đầu từ `0`. Gần như tất cả ngôn ngữ lập trình đều dùng 0-based index. Hãy quen với nó càng sớm càng tốt!

---

## 2. Khai Báo và Khởi Tạo Mảng

```java
// Cách 1: Khai báo với giá trị ngay
int[] diem = {80, 90, 75, 95, 65};
String[] tenSp = {"Kiếm Rồng", "Giáp Vàng", "Nhẫn Ma"};

// Cách 2: Khai báo kích thước, rồi gán sau
int[] diemLop = new int[30];     // 30 phần tử, mặc định = 0
String[] ten = new String[5];    // 5 phần tử, mặc định = null

diemLop[0] = 85;
diemLop[1] = 72;
// diemLop[30] → ❌ Lỗi! Index hợp lệ là 0 đến 29
```

Khi truy cập sai index, Java sẽ ném ra `ArrayIndexOutOfBoundsException`. Đây là lỗi bạn SẼ gặp nhiều lần khi mới học. Cứ bình tĩnh đọc thông báo lỗi — nó sẽ nói rõ index nào bị sai.

---

## 3. Duyệt Mảng và Thao Tác Cơ Bản

```java
int[] so = {5, 2, 8, 1, 9, 3, 7};

// Duyệt với index (khi cần vị trí)
for (int i = 0; i < so.length; i++) {
    System.out.printf("so[%d] = %d%n", i, so[i]);
}

// Duyệt for-each (khi chỉ cần giá trị)
for (int x : so) {
    System.out.print(x + " ");
}
```

Các thao tác hay dùng với mảng mà bạn nên thực hành:

```java
import java.util.Arrays;

int[] so = {5, 2, 8, 1, 9, 3, 7};

// Tìm max/min thủ công (luyện logic)
int max = so[0], min = so[0];
for (int x : so) {
    if (x > max) max = x;
    if (x < min) min = x;
}
System.out.println("Max = " + max + ", Min = " + min);  // Max=9, Min=1

// Tính tổng và trung bình
int tong = 0;
for (int x : so) tong += x;
double trungBinh = (double) tong / so.length;

// Sắp xếp - Java có sẵn, dùng luôn
Arrays.sort(so);
System.out.println(Arrays.toString(so));  // [1, 2, 3, 5, 7, 8, 9]

// In mảng đẹp mà không dùng Arrays.toString
System.out.print("[");
for (int i = 0; i < so.length; i++) {
    System.out.print(so[i]);
    if (i < so.length - 1) System.out.print(", ");
}
System.out.println("]");
```

> 💡 **Mẹo nhỏ của tôi:** Khi mới học, hãy tự implement tay các thao tác như tìm max/min, đảo mảng, tìm kiếm... để luyện logic. Sau khi hiểu rồi mới dùng `Arrays.sort()` và các method có sẵn.

---

## 4. Mảng 2 Chiều — Như Bảng Excel

```java
// Bảng 3 hàng × 4 cột
int[][] bang = {
    {1,  2,  3,  4},   // Hàng 0
    {5,  6,  7,  8},   // Hàng 1
    {9, 10, 11, 12}    // Hàng 2
};

// Truy cập: bang[hàng][cột]
System.out.println(bang[0][0]);  // 1
System.out.println(bang[1][2]);  // 7
System.out.println(bang[2][3]);  // 12

// Duyệt 2D
for (int[] hang : bang) {
    for (int o : hang) {
        System.out.printf("%4d", o);
    }
    System.out.println();
}

// Ứng dụng thực tế: điểm 5 học sinh × 3 môn
double[][] diemLop = {
    {8.5, 7.0, 9.0},   // An
    {6.5, 8.0, 7.5},   // Bình
    {9.0, 9.5, 8.0},   // Chi
};
String[] tenHS = {"An", "Bình", "Chi"};
String[] tenMon = {"Toán", "Lý", "Hóa"};

for (int i = 0; i < diemLop.length; i++) {
    double tb = (diemLop[i][0] + diemLop[i][1] + diemLop[i][2]) / 3;
    System.out.printf("%-6s → TB: %.2f%n", tenHS[i], tb);
}
```

---

## PHẦN B: STRING NÂNG CAO

## 5. String Là Bất Biến — Điều Quan Trọng Nhất

Đây là thứ tôi thấy nhiều học sinh không để ý và sau này bị bug mà không biết tại sao:

```java
String s = "hello";
s.toUpperCase();              // Gọi method — nhưng s VẪN là "hello"!
System.out.println(s);        // "hello" — không thay đổi

String sHoa = s.toUpperCase(); // Method trả về String MỚI
System.out.println(sHoa);      // "HELLO"
System.out.println(s);         // Vẫn "hello"
```

Mọi method của String đều **trả về String mới**, không thay đổi String gốc. String là **immutable** (bất biến). Đây là thiết kế có chủ đích — giúp Java an toàn hơn khi đa luồng, và JVM có thể tối ưu memory.

---

## 6. Các Method String Hay Dùng Nhất

tôi chọn lọc những cái bạn sẽ dùng thường xuyên nhất:

```java
String s = "  Hello, Java World!  ";

// === Kiểm tra ===
s.length()          // 22 — độ dài
s.isEmpty()         // false — "" mới là empty
s.isBlank()         // false — "   " mới là blank (Java 11+)
s.contains("Java")  // true
s.startsWith("  He") // true
s.endsWith("!  ")   // true
s.indexOf("Java")   // 9 — vị trí đầu tiên, -1 nếu không có

// === Biến đổi ===
s.trim()            // "Hello, Java World!" — bỏ khoảng trắng đầu/cuối
s.strip()           // Như trim nhưng hỗ trợ Unicode (Java 11+)
s.toUpperCase()     // "  HELLO, JAVA WORLD!  "
s.toLowerCase()     // "  hello, java world!  "
s.replace("Java", "Python")  // "  Hello, Python World!  "

// === Cắt, tách, ghép ===
s.substring(8, 12)  // "Java" — từ index 8 đến 11
s.charAt(8)         // 'J' — ký tự tại vị trí 8

"Toán,Lý,Hóa".split(",")          // ["Toán", "Lý", "Hóa"]
String.join(" | ", "A", "B", "C") // "A | B | C"

// === Chuyển đổi ===
String.valueOf(42)       // "42" — số → chuỗi
Integer.parseInt("123")  // 123 — chuỗi → số nguyên
Double.parseDouble("3.14") // 3.14 — chuỗi → số thực
```

> ⚠️ **Cạm bẫy phổ biến:** `Integer.parseInt("abc")` → `NumberFormatException`! Khi parse từ String sang số, hãy luôn xử lý trường hợp String không hợp lệ.

---

## 7. `StringBuilder` — Nối Chuỗi Hiệu Quả

```java
// ❌ Không hiệu quả trong vòng lặp:
String result = "";
for (int i = 1; i <= 1000; i++) {
    result += i + ",";
    // Mỗi vòng tạo ra 1 String object mới!
    // Với 1000 vòng = 1000 String objects tạm thời trong memory
}

// ✅ Dùng StringBuilder — tốt hơn rất nhiều:
StringBuilder sb = new StringBuilder();
for (int i = 1; i <= 1000; i++) {
    sb.append(i);
    if (i < 1000) sb.append(",");
}
String result2 = sb.toString();  // Chuyển sang String khi cần
```

```java
// Các method của StringBuilder:
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");   // "Hello World"
sb.insert(5, ",");     // "Hello, World"
sb.delete(5, 6);       // "Hello World"
sb.reverse();          // "dlroW olleH"
sb.replace(0, 5, "Hi"); // "Hi olleH"
System.out.println(sb.length()); // Độ dài hiện tại
```

> 💡 **Quy tắc tôi luôn dùng:** Nếu nối chuỗi trong vòng lặp hoặc nối nhiều hơn 5-6 lần → dùng `StringBuilder`. Nối 2-3 lần trong code thường → dùng `+` cho đơn giản.

---

## 8. Text Block — Chuỗi Nhiều Dòng (Java 15+)

Rất hay khi bạn cần nhúng JSON, SQL, HTML vào code:

```java
// Cũ — phải escape, xấu và khó đọc:
String json = "{\n  \"name\": \"Raize\",\n  \"role\": \"admin\"\n}";

// Mới — text block, đẹp hơn nhiều:
String json = """
        {
          "name": "Raize",
          "role": "admin"
        }
        """;

System.out.println(json);
// {
//   "name": "Raize",
//   "role": "admin"
// }
```

---

## 9. Ví Dụ Thực Tế: Tìm Kiếm Sản Phẩm

```java
public class TimKiem {
    public static void main(String[] args) {
        String[] ten    = {"Kiếm Rồng", "Giáp Vàng", "Nhẫn Ma Lực", "Kiếm Ánh Sáng", "Hài Cát"};
        int[] gia       = {1_200_000,   800_000,      500_000,        1_500_000,        300_000};
        int[] soLuong   = {3,           1,             5,              0,                2};

        String tuKhoa = "kiếm"; // Không phân biệt hoa thường!

        System.out.printf("=== Tìm kiếm: \"%s\" ===%n%n", tuKhoa);
        int demKetQua = 0;

        for (int i = 0; i < ten.length; i++) {
            // Tìm kiếm không phân biệt hoa thường
            if (ten[i].toLowerCase().contains(tuKhoa.toLowerCase())) {
                demKetQua++;
                String trangThai = soLuong[i] > 0
                    ? "Còn hàng (" + soLuong[i] + ")"
                    : "Hết hàng";
                System.out.printf("%-20s %,12d đ  [%s]%n",
                    ten[i], gia[i], trangThai);
            }
        }

        System.out.println();
        if (demKetQua == 0) {
            System.out.println("Không tìm thấy sản phẩm nào khớp với \"" + tuKhoa + "\"");
        } else {
            System.out.println("Tìm thấy " + demKetQua + " sản phẩm.");
        }
    }
}
```

---

## Tóm Tắt — Bài 05

```
✅ Mảng: dãy hộp đồng kiểu, index từ 0 đến length-1
✅ ArrayIndexOutOfBoundsException khi truy cập index sai
✅ Arrays.sort(), Arrays.toString() — tiện dụng, dùng nhiều
✅ String immutable — mọi method trả về String MỚI, không sửa gốc
✅ Dùng .equals() để so sánh, .equalsIgnoreCase() để bỏ qua hoa/thường
✅ StringBuilder cho nối chuỗi nhiều lần trong vòng lặp
✅ split() để tách, join() để ghép chuỗi
```

---

## ➡️ Bài Tiếp Theo

Bạn nhận ra các ví dụ đang ngày càng dài và lặp lại code giống nhau không? Ví dụ như phần tìm giá lớn nhất — bạn sẽ phải viết lại logic đó mỗi lần cần dùng. Bài tiếp theo Tôi sẽ dạy cách đóng gói code thành **method** để dùng lại ở nhiều chỗ.

👉 **[Bài 06: Method](../bai-06-method/README.md)**
