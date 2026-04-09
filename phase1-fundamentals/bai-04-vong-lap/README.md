# Bài 04: Vòng Lặp

> 🟢 **Phase 1 – Bài 4/7** | Thời gian: ~3 giờ

---

Hãy thử tưởng tượng: bạn cần gửi email thông báo cho 10,000 người dùng RaizeShop. Lẽ nào viết 10,000 dòng code? Tất nhiên là không. Đây chính là lúc **vòng lặp** phát huy tác dụng.

Vòng lặp = làm đi làm lại một việc, cho đến khi điều kiện dừng được thỏa.

Java có 3 loại vòng lặp: `for`, `while`, và `do-while`. Mỗi loại phù hợp với một tình huống khác nhau.

---

## 1. Vòng Lặp `for` — Khi Biết Trước Số Lần

Đây là vòng lặp phổ biến nhất. Dùng khi bạn biết muốn lặp bao nhiêu lần.

```java
for (khởi_tạo; điều_kiện; cập_nhật) {
    // code lặp
}
```

Hãy xem nó chạy từng bước như thế nào:

```
for (int i = 0;  i < 5;   i++  )
         ↑          ↑        ↑
    Chạy 1 lần   Kiểm tra  Chạy sau
    trước tiên   trước mỗi  mỗi vòng
                 vòng lặp

Vòng 1: i=0 → 0<5 (true) → chạy code → i++ → i=1
Vòng 2: i=1 → 1<5 (true) → chạy code → i++ → i=2
Vòng 3: i=2 → 2<5 (true) → chạy code → i++ → i=3
Vòng 4: i=3 → 3<5 (true) → chạy code → i++ → i=4
Vòng 5: i=4 → 4<5 (true) → chạy code → i++ → i=5
         i=5 → 5<5 (false) → DỪNG
```

```java
// Đếm từ 1 đến 5
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}
// → 1 2 3 4 5

// Đếm ngược
for (int i = 10; i >= 1; i--) {
    System.out.print(i + " ");
}
// → 10 9 8 7 6 5 4 3 2 1

// Chỉ số chẵn
for (int i = 0; i <= 10; i += 2) {
    System.out.print(i + " ");
}
// → 0 2 4 6 8 10

// Tính tổng 1 + 2 + ... + 100
int tong = 0;
for (int i = 1; i <= 100; i++) {
    tong += i;
}
System.out.println("Tổng = " + tong);  // Tổng = 5050
```

### For-each — Duyệt mảng/danh sách đẹp hơn

```java
String[] sanPham = {"Kiếm Rồng", "Giáp Vàng", "Nhẫn Ma"};

// Cách cũ — phải dùng index:
for (int i = 0; i < sanPham.length; i++) {
    System.out.println(sanPham[i]);
}

// For-each — gọn và dễ đọc hơn:
for (String sp : sanPham) {    // "Với mỗi sp trong sanPham"
    System.out.println(sp);
}
```

> 💡 **Khi nào dùng for-each?** Khi bạn CHỈ cần đọc phần tử, không cần biết index. Khi cần index (để sửa phần tử, hoặc dùng `i` trong logic), hãy dùng `for` thường.

---

## 2. Vòng Lặp `while` — Khi Không Biết Trước Số Lần

Dùng khi bạn chỉ biết **điều kiện dừng**, không biết sẽ lặp bao nhiêu lần.

```java
while (điều_kiện) {
    // code lặp
    // phải có gì đó thay đổi điều kiện — nếu không → vòng lặp vô tận!
}
```

Ví dụ điển hình: game đoán số.

```java
import java.util.Scanner;
import java.util.Random;

public class DoanSo {
    public static void main(String[] args) {
        Random random = new Random();
        int soCanDoan = random.nextInt(100) + 1;  // 1-100
        Scanner scanner = new Scanner(System.in);
        int soDoan = -1;
        int soLan = 0;

        System.out.println("Đoán số từ 1-100. Nhập -1 để thoát.");

        while (soDoan != soCanDoan) {
            System.out.print("Lần " + (soLan + 1) + ": Nhập số đoán: ");
            soDoan = scanner.nextInt();
            soLan++;

            if (soDoan == -1) {
                System.out.println("Bạn bỏ cuộc! Số cần đoán là: " + soCanDoan);
                break;
            } else if (soDoan < soCanDoan) {
                System.out.println("Quá nhỏ! Thử lại.");
            } else if (soDoan > soCanDoan) {
                System.out.println("Quá lớn! Thử lại.");
            } else {
                System.out.println("🎉 Đúng rồi! Sau " + soLan + " lần.");
            }
        }

        scanner.close();
    }
}
```

> ⚠️ **Hãy cẩn thận với vòng lặp vô tận!** Nếu điều kiện trong `while` không bao giờ thành `false`, chương trình sẽ chạy mãi mãi và treo máy. Luôn đảm bảo có gì đó bên trong vòng lặp thay đổi điều kiện đó.

---

## 3. Vòng Lặp `do-while` — Luôn Chạy Ít Nhất 1 Lần

```java
do {
    // code — chạy trước, kiểm tra điều kiện SAU
} while (điều_kiện);
```

Sự khác biệt quan trọng:
- `while`: kiểm tra điều kiện **trước** → có thể không chạy lần nào
- `do-while`: chạy **trước** rồi mới kiểm tra → luôn chạy ít nhất 1 lần

Dùng rất hay để làm **menu lặp lại**:

```java
Scanner scanner = new Scanner(System.in);
int luaChon;

do {
    System.out.println("\n===== MENU =====");
    System.out.println("1. Xem danh sách sản phẩm");
    System.out.println("2. Tìm kiếm");
    System.out.println("3. Thoát");
    System.out.print("Chọn: ");

    luaChon = scanner.nextInt();

    switch (luaChon) {
        case 1 -> System.out.println("Đang tải danh sách...");
        case 2 -> System.out.println("Nhập từ khóa tìm kiếm...");
        case 3 -> System.out.println("Tạm biệt!");
        default -> System.out.println("Lựa chọn không hợp lệ, thử lại.");
    }
} while (luaChon != 3);   // Lặp cho đến khi user chọn thoát
```

---

## 4. `break` và `continue`

### `break` — Thoát khỏi vòng lặp ngay lập tức

```java
// Tìm phần tử đầu tiên thỏa điều kiện — xong thì dừng ngay
for (int i = 0; i < sanPham.length; i++) {
    if (sanPham[i].contains("Kiếm")) {
        System.out.println("Tìm thấy tại index: " + i);
        break;    // Dừng luôn, không tìm tiếp
    }
}
```

### `continue` — Bỏ qua vòng hiện tại, chuyển sang vòng tiếp theo

```java
// In tất cả số 1-10, nhưng bỏ qua số 5
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        continue;  // Nhảy lên đầu vòng lặp, tăng i lên 6
    }
    System.out.print(i + " ");
}
// → 1 2 3 4 6 7 8 9 10
```

---

## 5. Vòng Lặp Lồng Nhau

Vòng lặp bên trong vòng lặp. Hay dùng cho ma trận, bảng cửu chương, vẽ hình...

```java
// Bảng cửu chương 2-5
for (int bang = 2; bang <= 5; bang++) {
    System.out.println("=== Bảng " + bang + " ===");
    for (int i = 1; i <= 10; i++) {
        System.out.printf("%d × %2d = %3d%n", bang, i, bang * i);
    }
}
```

> 💡 **Quy tắc đặt tên biến vòng lặp:** Biến ngoài thường dùng `i`, vòng trong dùng `j`, vòng trong nữa dùng `k`. Đây là convention mọi lập trình viên Java đều quen.

---

## 6. Ví Dụ Thực Tế: Xử Lý Danh Sách Kho Hàng

```java
public class QuanLyKho {
    public static void main(String[] args) {
        String[] ten   = {"Kiếm Rồng", "Giáp Vàng", "Nhẫn Ma", "Hài Cát", "Mũ Thần"};
        int[] soLuong  = {3,           1,            5,          0,          2};
        double[] gia   = {1_200_000,   800_000,      500_000,    300_000,    400_000};

        System.out.printf("%-15s %8s %12s %10s%n", "Tên", "Số lượng", "Giá", "Thành tiền");
        System.out.println("─".repeat(50));

        double tongGiaTri = 0;

        for (int i = 0; i < ten.length; i++) {
            if (soLuong[i] == 0) {
                System.out.printf("%-15s %8s %12s %10s%n",
                    ten[i], "HẾT HÀNG", "---", "---");
                continue;  // Bỏ qua tính toán cho hàng hết
            }

            double thanhTien = soLuong[i] * gia[i];
            tongGiaTri += thanhTien;

            System.out.printf("%-15s %8d %,12.0f đ %,10.0f đ%n",
                ten[i], soLuong[i], gia[i], thanhTien);
        }

        System.out.println("─".repeat(50));
        System.out.printf("%-15s %28s → %,10.0f đ%n", "TỔNG GIÁ TRỊ", "", tongGiaTri);
    }
}
```

Hãy chạy thử và thay đổi dữ liệu. Tôi muốn bạn **thử nghiệm** chứ không chỉ copy xem.

---

## Tóm Tắt — Bài 04

```
✅ for: biết trước số lần lặp → dùng for
✅ while: chỉ biết điều kiện dừng → dùng while
✅ do-while: phải chạy ít nhất 1 lần (ví dụ: menu) → dùng do-while
✅ for-each: duyệt mảng/danh sách khi không cần index
✅ break: thoát khỏi vòng lặp
✅ continue: bỏ qua vòng hiện tại, sang vòng tiếp theo
✅ Vòng lặp vô tận = bug cực kỳ nguy hiểm — luôn đảm bảo có điều kiện dừng
```

---

## ➡️ Bài Tiếp Theo

Bài vừa rồi bạn đã dùng mảng (`ten[]`, `soLuong[]`, `gia[]`) nhưng chưa thực sự học về mảng. Bài tiếp theo Tôi sẽ đi sâu vào mảng và String — hai thứ bạn sẽ dùng hàng ngày.

👉 **[Bài 05: Mảng (Array) và Chuỗi (String)](../bai-05-array-string/README.md)**
