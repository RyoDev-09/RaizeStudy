# Bài 06: Method (Hàm / Phương Thức)

> 🟡 **Phase 1 – Bài 6/7** | Thời gian: ~3 giờ

---

Bạn có nhận ra điều này chưa: ở các bài trước, khi cần tính tổng, cần tìm max, cần format tiền — bạn phải viết đi viết lại cùng một logic. Trong dự án thực tế, điều này tạo ra "code trùng lặp" — thứ mà các kỹ sư phần mềm ghét nhất.

**Method** (hay còn gọi là hàm) là giải pháp: viết một lần, gọi được ở mọi nơi.

---

## 1. Tại Sao Cần Method?

```java
// ❌ Không có method — copy-paste khắp nơi:
// Chỗ 1: Tính tổng lớp A
int tongA = 0;
for (int d : diemLopA) tongA += d;
double tbA = (double) tongA / diemLopA.length;

// Chỗ 2: Tính tổng lớp B — cùng logic, copy lại!
int tongB = 0;
for (int d : diemLopB) tongB += d;
double tbB = (double) tongB / diemLopB.length;

// ✅ Có method — viết một lần dùng mọi nơi:
double tbA = tinhTrungBinh(diemLopA);
double tbB = tinhTrungBinh(diemLopB);
// Khi cần sửa logic → sửa một chỗ, tất cả nơi dùng đều được cập nhật!
```

---

## 2. Giải Phẫu Một Method

```java
public static double tinhTrungBinh(int[] diem) {
//   ↑       ↑        ↑                ↑
//   |       |     Kiểu trả về      Tham số đầu vào (parameter)
//   |       |
//   |    static: gọi được mà không cần tạo object
// public: ai cũng gọi được

    if (diem.length == 0) return 0;  // Xử lý edge case trước!

    int tong = 0;
    for (int d : diem) tong += d;
    return (double) tong / diem.length;  // Từ khóa return
}
```

Bốn thứ bạn cần xác định khi viết method:
1. **Tên** — động từ, camelCase: `tinhTrungBinh`, `formatTien`, `kiemTraEmail`
2. **Kiểu trả về** — trả về gì? Nếu không trả gì thì là `void`
3. **Tham số** — cần nhận vào những gì?
4. **Logic** — làm gì bên trong?

---

## 3. Method Trả Về Giá Trị

```java
// Trả về số
public static int tinhTong(int a, int b) {
    return a + b;
}

// Trả về String
public static String xepLoai(double diem) {
    if (diem >= 9.0) return "Xuất sắc";
    if (diem >= 8.0) return "Giỏi";
    if (diem >= 6.5) return "Khá";
    if (diem >= 5.0) return "Trung bình";
    return "Yếu";
}

// Trả về boolean — thường đặt tên bắt đầu bằng is/has/can
public static boolean laSoNguyenTo(int n) {
    if (n < 2) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

Gọi method và dùng kết quả:

```java
public static void main(String[] args) {
    System.out.println(tinhTong(5, 3));          // 8
    System.out.println(xepLoai(8.5));            // Giỏi
    System.out.println(laSoNguyenTo(17));        // true

    // Dùng trong điều kiện:
    if (laSoNguyenTo(29)) {
        System.out.println("29 là số nguyên tố");
    }

    // Dùng trong biểu thức:
    double diemHocSinh = 7.8;
    System.out.println("Học lực: " + xepLoai(diemHocSinh));
}
```

---

## 4. Method `void` — Thực Hiện Hành Động, Không Trả Về

```java
// void: không return giá trị, chỉ làm gì đó
public static void inDuongKe(int soKy) {
    System.out.println("─".repeat(soKy));
}

public static void inBangCuuChuong(int so) {
    System.out.println("=== Bảng " + so + " ===");
    for (int i = 1; i <= 10; i++) {
        System.out.printf("%d × %2d = %3d%n", so, i, so * i);
    }
}

// Gọi void method — không gán vào biến
inDuongKe(30);
inBangCuuChuong(7);
```

---

## 5. Parameter vs Argument — Đừng Nhầm

```java
// Khi ĐỊNH NGHĨA → gọi là "parameter" (tham số)
public static double tinh(double chieuDai, double chieuRong) {
//                                ↑               ↑
//                         tham số: chieuDai, chieuRong

// Khi GỌI → gọi là "argument" (đối số)
tinh(5.0, 3.0);
//    ↑    ↑
// đối số: 5.0, 3.0
```

tôi biết hai cái này nghe có vẻ giống nhau. Nhưng khi đi phỏng vấn hoặc đọc tài liệu kỹ thuật, bạn sẽ gặp hai từ này và cần biết phân biệt.

---

## 6. Java Luôn "Pass by Value"

Đây là điều làm nhiều người nhầm khi mới học:

```java
public static void tangLen(int x) {
    x = x + 100;
    System.out.println("Trong method: x = " + x);  // 105
}

public static void main(String[] args) {
    int a = 5;
    tangLen(a);
    System.out.println("Ngoài method: a = " + a);  // Vẫn là 5!
}
```

Tại sao? Vì Java **truyền bản sao** của giá trị vào method. `x` trong method là bản sao của `a`, không phải `a` thật. Thay đổi `x` không ảnh hưởng `a`.

> 💡 **Lưu ý:** Với Object (mảng, class...) thì khác hơn một chút — Java vẫn pass by value nhưng "value" ở đây là **địa chỉ** của object. Bạn sẽ hiểu rõ hơn khi học OOP ở bài 07.

---

## 7. Method Overloading — Cùng Tên, Khác Kiểu

```java
// Ba method cùng tên "cong" nhưng khác tham số — Java tự phân biệt:
public static int cong(int a, int b) {
    return a + b;
}

public static double cong(double a, double b) {
    return a + b;
}

public static int cong(int a, int b, int c) {
    return a + b + c;
}

// Java chọn đúng method dựa trên kiểu đối số bạn truyền vào:
cong(1, 2)         // → gọi cong(int, int)
cong(1.5, 2.5)     // → gọi cong(double, double)
cong(1, 2, 3)      // → gọi cong(int, int, int)
```

---

## 8. Varargs — Số Lượng Đối Số Không Cố Định

```java
// int... → bên trong method, soList là một mảng int
public static int tongNhieu(int... soList) {
    int tong = 0;
    for (int x : soList) tong += x;
    return tong;
}

// Gọi với bất kỳ số lượng nào:
tongNhieu(1, 2);               // 3
tongNhieu(1, 2, 3, 4, 5);     // 15
tongNhieu();                   // 0
tongNhieu(10, 20, 30, 40);    // 100
```

---

## 9. Đệ Quy (Recursion) — Method Tự Gọi Bản Thân

Đây là chủ đề hơi phức tạp nhưng rất thú vị. Một method có thể gọi lại chính nó!

```java
// Tính n! (giai thừa): 5! = 5 × 4 × 3 × 2 × 1 = 120
public static long giaiThua(int n) {
    if (n <= 1) return 1;              // ← BASE CASE: điều kiện dừng — BẮT BUỘC!
    return n * giaiThua(n - 1);        // ← RECURSIVE CASE: tự gọi với bài toán nhỏ hơn
}

// Trace call stack:
// giaiThua(5) = 5 × giaiThua(4)
//                     = 4 × giaiThua(3)
//                             = 3 × giaiThua(2)
//                                     = 2 × giaiThua(1)
//                                             = 1   ← Dừng ở đây!
// Kết quả được tính ngược lên: 2×1=2, 3×2=6, 4×6=24, 5×24=120
```

> ⚠️ **Phải có base case!** Nếu không có điều kiện dừng, method sẽ gọi nhau vô tận đến khi bộ nhớ hết — `StackOverflowError`. Đây là lỗi phổ biến khi viết đệ quy. Khi bạn gặp lỗi này, câu hỏi đầu tiên là: "Base case của mình đúng chưa?"

---

## 10. Ví Dụ Thực Tế: Bộ Helper Methods Cho Shop

```java
public class ShopUtils {

    // Format tiền Việt
    public static String formatTien(double so) {
        return String.format("%,.0f đ", so);
    }

    // Tính giá sau giảm
    public static double tinhGiaSauGiam(double giaGoc, double phanTramGiam) {
        if (phanTramGiam < 0 || phanTramGiam > 100) {
            throw new IllegalArgumentException("Phần trăm phải từ 0-100");
        }
        return giaGoc * (1 - phanTramGiam / 100.0);
    }

    // Kiểm tra username hợp lệ
    public static boolean hopLeUsername(String username) {
        return username != null
            && !username.isBlank()
            && username.length() >= 4
            && username.length() <= 20;
    }

    // Xếp hạng người bán
    public static String xepHangNguoiBan(double rating, int soGiaoDich) {
        if (soGiaoDich < 5)                      return "🆕 Mới";
        if (rating >= 4.5 && soGiaoDich >= 50)   return "⭐ Uy tín cao";
        if (rating >= 4.0 && soGiaoDich >= 20)   return "👍 Tốt";
        if (rating >= 3.0)                        return "😐 Trung bình";
        return "⚠️ Cẩn thận";
    }

    public static void main(String[] args) {
        System.out.println(formatTien(1_500_000));             // 1,500,000 đ

        double giaSau = tinhGiaSauGiam(1_000_000, 15);
        System.out.println("Giá sau giảm 15%: " + formatTien(giaSau)); // 850,000 đ

        System.out.println(hopLeUsername("raize99"));          // true
        System.out.println(hopLeUsername("ab"));               // false (< 4 ký tự)

        System.out.println(xepHangNguoiBan(4.7, 100));        // ⭐ Uy tín cao
        System.out.println(xepHangNguoiBan(3.5, 3));          // 🆕 Mới
    }
}
```

---

## Tóm Tắt — Bài 06

```
✅ Method = khối code có tên, làm một việc, gọi được nhiều lần
✅ Cú pháp: [modifier] kiểuTrảVề tênMethod(thamSo) { return ...; }
✅ void = không trả về giá trị
✅ Java pass by value — primitive không bị thay đổi bởi method
✅ Overloading: cùng tên, khác tham số
✅ Varargs (int... args): số lượng đối số linh hoạt
✅ Đệ quy: phải có base case — không có → StackOverflowError
```

---

## ➡️ Phase 2 Bắt Đầu!

Bạn vừa hoàn thành Phase 1 — nền tảng cơ bản của Java. Xin chúc mừng! Bạn đã biết lưu dữ liệu, ra quyết định, lặp lại, và tổ chức code thành method.

Nhưng bây giờ mọi thứ sẽ thú vị hơn rất nhiều. Phase 2 là **OOP — Lập Trình Hướng Đối Tượng**. Đây là phần mà Java "khác biệt" so với các ngôn ngữ script đơn giản. Và cũng là nền tảng để bạn hiểu được Spring Boot, Android và mọi framework Java lớn sau này.

👉 **[Bài 07: Class và Object — Nền Tảng OOP](../../phase2-oop/bai-07-class-object/README.md)**
