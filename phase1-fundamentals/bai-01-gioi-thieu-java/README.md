# Bài 01: Giới Thiệu Java – JVM, JDK, JRE và Hello World

> 🟢 **Phase 1 – Bài 1/7** | Thời gian: ~2 giờ

---

Chào bạn! Chào mừng bạn đến với bài học đầu tiên. Thầy rất vui vì bạn đã chọn Java — đây là một trong những ngôn ngữ được dùng nhiều nhất trên thế giới và cũng là nền tảng để sau này bạn làm việc với Spring Boot, Android, hay bất kỳ hệ thống lớn nào.

Trước khi bắt tay vào viết dòng code đầu tiên, thầy muốn bạn hiểu **Java là gì và tại sao nó hoạt động được**. Đừng bỏ qua phần này — nhiều người học xong cả năm vẫn không biết tại sao Java lại chạy được trên mọi hệ điều hành!

---

## 1. Java Được Dùng Ở Đâu?

Bạn có biết không — ứng dụng của dự án RaizeShop mà bạn đang tham khảo chính là viết bằng Java (Spring Boot). Minecraft — tựa game nổi tiếng — cũng viết bằng Java. Gần như mọi hệ thống ngân hàng lớn tại Việt Nam đều chạy Java ở phía backend.

| Lĩnh vực | Ví dụ cụ thể |
|---------|-------------|
| Backend web | Spring Boot (RaizeShop, các hệ thống lớn) |
| Android | Toàn bộ app Android gốc |
| Ngân hàng, tài chính | Core banking, ATM software |
| Big Data | Hadoop, Spark xử lý dữ liệu khổng lồ |
| Game | Minecraft |

---

## 2. JVM, JRE, JDK — Ba Khái Niệm Bạn Cần Phân Biệt Ngay

Thầy thấy đây là chỗ học sinh hay bị nhầm nhất ở bài đầu. Hãy hình dung thế này:

```
Bạn muốn XEM một bộ phim (chạy chương trình Java):
  → Cần TV (JVM) để chiếu
  → Cần đầu phim (JRE) để đọc đĩa
  → Cần cả bộ thiết bị + tua vít để tự LÀM đĩa (JDK)
```

Chính xác hơn:

```
┌──────────────────────────────────────────────┐
│                  JDK                         │  ← Bạn cần cái này để LẬP TRÌNH
│                                              │
│   ┌──────────────────────────────────────┐  │
│   │               JRE                    │  │  ← Cần để CHẠY chương trình Java
│   │                                      │  │
│   │   ┌──────────────────────────────┐   │  │
│   │   │           JVM                │   │   │  ← Máy ảo, thực sự thực thi code
│   │   └──────────────────────────────┘   │   │
│   │   + Thư viện chuẩn (java.util...)    │   │
│   └──────────────────────────────────────┘   │
│   + javac (compiler), debugger, tools...     │
└──────────────────────────────────────────────┘
```

**JVM** là trái tim của Java. Đây là lý do cho cái slogan nổi tiếng *"Write Once, Run Anywhere"* — bạn chỉ viết code một lần, JVM trên mọi hệ điều hành (Windows, Mac, Linux) sẽ tự biết cách chạy nó.

> 💡 **Kết luận thực tế:** Bạn chỉ cần nhớ một điều — hãy cài **JDK**, vì JDK đã bao gồm cả JRE lẫn JVM bên trong rồi.

---

## 3. Code Java Chạy Như Thế Nào? (Quan Trọng!)

Hãy để thầy kể cho bạn nghe hành trình của một file Java từ lúc bạn gõ đến lúc máy tính thực thị:

```
Bước 1: Bạn viết            Bước 2: Compile             Bước 3: Chạy
────────────────────         ───────────────────          ──────────────────
HelloWorld.java      ──→     HelloWorld.class     ──→     Kết quả trên màn hình
(code bạn hiểu)      javac   (bytecode – trung gian) JVM  (máy tính thực thi)
```

Điểm hay là file `.class` (bytecode) **không phải** code máy của Windows hay Mac cụ thể. Nó là ngôn ngữ "trung gian" mà JVM trên bất kỳ máy nào cũng hiểu được. Đó là lý do Java portable!

---

## 4. Viết Chương Trình Đầu Tiên

Thôi lý thuyết đủ rồi, bài đầu tiên mà. Hãy mở IDE lên và tạo file `HelloWorld.java`:

```java
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Xin chào Java!");
    }
}
```

Chạy thử đi. Bạn thấy `Xin chào Java!` in ra chưa? Tuyệt! Bây giờ thầy sẽ giải thích từng chữ, vì bạn cần hiểu chứ không chỉ copy-paste.

### `public class HelloWorld` nghĩa là gì?

```java
public   class    HelloWorld
  ↑        ↑          ↑
Ai cũng  Khai báo  Tên class — phải
truy cập  một class  khớp với tên file!
được
```

Quy tắc bắt buộc: **tên class phải đúng với tên file `.java`**. Nếu class tên là `HelloWorld`, file phải là `HelloWorld.java`. Sai chỗ này là lỗi ngay.

### `public static void main(String[] args)` — Dòng thần chú

Đây là **điểm bắt đầu** của mọi chương trình Java. Khi bạn bấm Run, JVM sẽ tìm đúng cái method này và bắt đầu từ đây. Bạn không cần hiểu hết ngay bây giờ, nhưng cần nhớ: **phải có đúng dòng này thì chương trình mới chạy được**.

### `System.out.println("...")`

Cách để in ra màn hình. `println` = print + line (in rồi xuống dòng). Nếu bạn không muốn xuống dòng, dùng `System.out.print(...)` thay thế.

---

## 5. Thử Nghiệm Thêm

Đừng chỉ copy bài thầy cho. Hãy thử tự tay chỉnh sửa và xem điều gì xảy ra:

```java
public class HelloWorld {
    public static void main(String[] args) {

        System.out.println("Xin chào Java!");        // println: in + xuống dòng
        System.out.print("Tôi đang học ");           // print: in, KHÔNG xuống dòng
        System.out.print("Java ");
        System.out.println("từ đầu!");               // → dòng này mới xuống

        // In các kiểu dữ liệu khác nhau
        System.out.println(2026);           // số nguyên
        System.out.println(3.14);           // số thực
        System.out.println(true);           // đúng/sai

        // Nối chuỗi với số bằng dấu +
        System.out.println("Năm " + 2026 + " tôi học Java!");

        // Format đẹp hơn với printf
        System.out.printf("Xin chào, %s! Bạn %d tuổi.%n", "Raize", 20);
        // %s = chuỗi, %d = số nguyên, %n = xuống dòng
    }
}
```

Kết quả:
```
Xin chào Java!
Tôi đang học Java từ đầu!
2026
3.14
true
Năm 2026 tôi học Java!
Xin chào, Raize! Bạn 20 tuổi.
```

---

## 6. Comment — Ghi Chú Trong Code

Comment là những dòng mà Java **hoàn toàn bỏ qua** khi compile. Chúng chỉ dành cho con người đọc. Hãy tập viết comment từ sớm — đây là thói quen phân biệt lập trình viên giỏi.

```java
// Đây là comment một dòng — Java bỏ qua hoàn toàn

/*
 * Đây là comment nhiều dòng
 * Dùng khi cần giải thích dài
 */

/**
 * Đây là Javadoc — dùng để tạo tài liệu tự động cho class/method
 * IDE sẽ hiển thị nội dung này khi bạn hover lên tên method
 */
```

> 💡 **Mẹo thầy hay dùng:** Khi bạn đang debug, hãy comment tạm dòng code đang bị lỗi thay vì xóa đi. Sau khi fix xong mới xóa. Tránh mất code chưa biết có cần lại không.

---

## 7. Quy Tắc Đặt Tên — Học Ngay Từ Bài 1

Java có quy tắc đặt tên mà **cả thế giới lập trình Java đều tuân theo**. Bạn học từ đầu đúng sẽ không phải sửa thói quen xấu sau này.

| Loại | Quy tắc | Ví dụ đúng | Ví dụ sai |
|------|---------|-----------|-----------|
| **Class** | ViếtHoaChữĐầu (PascalCase) | `HelloWorld`, `NguoiDung` | `helloWorld`, `nguoi_dung` |
| **method** | chữĐầuThường (camelCase) | `tinhTien()`, `inThongTin()` | `TinhTien()`, `tinh_tien()` |
| **biến** | chữĐầuThường (camelCase) | `soLuong`, `tenHang` | `SoLuong`, `so_luong` |
| **HẰNG SỐ** | VIẾT_HOA_GẠCHDưới | `MAX_SIZE`, `PI` | `maxSize`, `pi` |

---

## Tóm Tắt — Bài 01

Thầy muốn bạn ghi nhớ 4 điều sau bài này:

```
✅ JDK = Bộ công cụ để lập trình Java (bao gồm cả JRE và JVM)
✅ JVM = Lý do Java "write once, run anywhere" — máy ảo chạy bytecode
✅ Mọi chương trình Java bắt đầu từ: public static void main(String[] args)
✅ Tên class PHẢI khớp tên file .java
```

---

## ➡️ Bài Tiếp Theo

Bạn đã viết được chương trình Java đầu tiên. Nhưng in ra chữ cứng thế này thì chán lắm, phải không? Bài tiếp theo thầy sẽ dạy bạn cách dùng **biến** để lưu trữ dữ liệu — từ đó chương trình mới thực sự có ý nghĩa.

👉 **[Bài 02: Biến & Kiểu Dữ Liệu](../bai-02-bien-kieu-du-lieu/README.md)**
