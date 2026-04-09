# Bài 03: Câu Lệnh Điều Kiện

> 🟢 **Phase 1 – Bài 3/7** | Thời gian: ~2.5 giờ

---

Bài trước bạn học cách lưu dữ liệu. Bài này Tôi sẽ dạy bạn cách làm chương trình **đưa ra quyết định** — giống như não bạn lúc sáng dậy: "Nếu trời mưa thì mang ô, không thì thôi."

Trong lập trình ta gọi đây là **câu lệnh điều kiện**. Và đây là thứ mà bạn sẽ dùng trong hầu hết mọi class bạn viết.

---

## 1. `if / else if / else`

Cú pháp đọc rất tự nhiên, gần như tiếng Anh:

```java
if (điều_kiện_là_true) {
    // làm cái này
} else if (điều_kiện_khác_là_true) {
    // làm cái kia
} else {
    // không điều kiện nào thỏa → làm cái này
}
```

Hãy xem ví dụ thực tế: phân loại học sinh theo điểm trung bình.

```java
double diemTB = 8.3;

if (diemTB >= 9.0) {
    System.out.println("Xuất sắc");
} else if (diemTB >= 8.0) {
    System.out.println("Giỏi");        // ← bài này in chỗ này vì 8.3 >= 8.0
} else if (diemTB >= 6.5) {
    System.out.println("Khá");
} else if (diemTB >= 5.0) {
    System.out.println("Trung bình");
} else {
    System.out.println("Yếu");
}
```

> 💡 **Cách Java đọc:** Nó kiểm tra từ trên xuống, gặp điều kiện nào đúng trước thì chạy nhánh đó rồi **nhảy ra luôn** — không kiểm tra tiếp. Vì vậy thứ tự các điều kiện quan trọng!

Ví dụ sai thứ tự (bug phổ biến):
```java
// ❌ Sai — diem = 9.5 sẽ vào ngay điều kiện đầu tiên >= 5.0!
if (diemTB >= 5.0) {
    System.out.println("Trung bình");  // Luôn in cái này!
} else if (diemTB >= 8.0) {
    System.out.println("Giỏi");        // Không bao giờ tới đây
}

// ✅ Đúng — điều kiện chặt hơn phải đứng trước
if (diemTB >= 9.0) { ... }
else if (diemTB >= 8.0) { ... }
```

---

## 2. Toán Tử Ba Ngôi `? :` — Viết Tắt Tiện Lợi

Khi điều kiện đơn giản chỉ có 2 nhánh, bạn có thể viết gọn trên một dòng:

```java
// Cách dài:
String ketQua;
if (diem >= 5.0) {
    ketQua = "Đạt";
} else {
    ketQua = "Rớt";
}

// Cách ngắn với ternary:
String ketQua = diem >= 5.0 ? "Đạt" : "Rớt";
//                   ↑           ↑       ↑
//               Điều kiện   Nếu true  Nếu false
```

Đọc như vậy: *"Nếu điểm >= 5 thì 'Đạt', không thì 'Rớt'"*.

```java
// Thêm ví dụ thực tế:
int tuoi = 17;
String loaiVe = tuoi < 18 ? "Vé trẻ em (giảm 50%)" : "Vé người lớn";

int a = 15, b = 27;
int soLonHon = a > b ? a : b;  // Lấy số lớn hơn

boolean online = true;
String trangThai = online ? "🟢 Đang hoạt động" : "🔴 Ngoại tuyến";
```

> ⚠️ **Không nên:** Lồng ternary trong ternary. tôi thấy nhiều học sinh cố viết như này và sau đó chính họ không hiểu code của mình:
> ```java
> // Rất khó đọc — đừng làm vậy!
> String xepLoai = diem >= 9 ? "XS" : diem >= 8 ? "Giỏi" : diem >= 6.5 ? "Khá" : "TB";
> // Hãy dùng if/else if cho trường hợp nhiều nhánh như này
> ```

---

## 3. `switch` — Khi So Sánh Một Giá Trị Với Nhiều Lựa Chọn

Khi bạn cần so sánh **một biến với nhiều giá trị cụ thể**, `switch` gọn hơn chuỗi `if/else if`:

```java
// Không có switch — dài dòng:
if (ngay == 1) System.out.println("Thứ Hai");
else if (ngay == 2) System.out.println("Thứ Ba");
else if (ngay == 3) System.out.println("Thứ Tư");
// ...

// Có switch — gọn hơn nhiều:
int ngay = 3;
switch (ngay) {
    case 1:
        System.out.println("Thứ Hai");
        break;          // ← BẮT BUỘC! Không có break → chạy luôn xuống case tiếp theo!
    case 2:
        System.out.println("Thứ Ba");
        break;
    case 3:
        System.out.println("Thứ Tư");  // In ra đây
        break;
    // ...
    default:
        System.out.println("Không hợp lệ");
}
```

> ⚠️ **Lỗi phổ biến nhất với switch:** Quên `break`. Nếu quên, Java sẽ chạy thẳng xuống case bên dưới — gọi là *fall-through*. Đây là nguồn gốc của rất nhiều bug khó tìm. Hãy tập thói quen: viết `case` xong viết `break` ngay, rồi mới điền code.

Nhiều case dùng chung một hành động:
```java
switch (thang) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        System.out.println("Tháng 31 ngày");
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        System.out.println("Tháng 30 ngày");
        break;
    case 2:
        System.out.println("Tháng 28 hoặc 29 ngày");
        break;
}
```

---

## 4. Switch Expression — Cách Mới Gọn Hơn (Java 14+)

Java 14 giới thiệu cú pháp mới, không cần `break`, không có fall-through:

```java
// Rất gọn, không cần break
String tenNgay = switch (ngay) {
    case 1 -> "Thứ Hai";
    case 2 -> "Thứ Ba";
    case 3 -> "Thứ Tư";
    case 4 -> "Thứ Năm";
    case 5 -> "Thứ Sáu";
    case 6 -> "Thứ Bảy";
    case 7 -> "Chủ Nhật";
    default -> "Không hợp lệ";
};

// Gộp nhiều case:
int soNgayTrongThang = switch (thang) {
    case 1, 3, 5, 7, 8, 10, 12 -> 31;
    case 4, 6, 9, 11            -> 30;
    case 2                      -> 28; // Đơn giản hóa, bỏ qua năm nhuận
    default -> throw new IllegalArgumentException("Tháng không hợp lệ: " + thang);
};
```

tôi **khuyên dùng switch expression** khi viết Java 14+ vì nó an toàn hơn (không có fall-through) và đọc rõ ràng hơn.

---

## 5. Điều Kiện Lồng Nhau

Đôi khi cần kiểm tra nhiều điều kiện phối hợp:

```java
int tuoi = 16;
boolean coGiayPhep = false;

if (tuoi >= 18) {
    if (coGiayPhep) {
        System.out.println("Bạn được phép lái xe");
    } else {
        System.out.println("Đủ tuổi nhưng chưa có bằng");
    }
} else {
    System.out.println("Chưa đủ 18 tuổi");
}
```

Hoặc gọn hơn bằng `&&`:
```java
boolean duocLaiXe = tuoi >= 18 && coGiayPhep;
if (duocLaiXe) {
    System.out.println("Được phép lái xe");
}
```

---

## 6. Ví Dụ Thực Tế: Phân Loại Đơn Hàng

```java
public class PhanLoaiDon {
    public static void main(String[] args) {
        String trangThai = "COMPLETED";
        double soTienDon = 850_000;

        // Phân loại trạng thái đơn
        String moTa = switch (trangThai) {
            case "PENDING"    -> "⏳ Đang chờ xử lý";
            case "PROCESSING" -> "🔄 Đang xử lý";
            case "COMPLETED"  -> "✅ Hoàn thành";
            case "CANCELLED"  -> "❌ Đã hủy";
            default           -> "❓ Không xác định";
        };
        System.out.println("Trạng thái: " + moTa);

        // Phân loại theo giá trị đơn
        String huy;
        if (soTienDon >= 1_000_000) {
            huy = "💎 Đơn VIP";
        } else if (soTienDon >= 500_000) {
            huy = "🥇 Đơn Gold";
        } else if (soTienDon >= 100_000) {
            huy = "🥈 Đơn Silver";
        } else {
            huy = "🥉 Đơn thường";
        }
        System.out.printf("Giá trị: %,.0f đ → %s%n", soTienDon, huy);
    }
}
```

---

## Tóm Tắt — Bài 03

```
✅ if/else if/else: điều kiện chặt hơn đứng TRƯỚC (tránh bug thứ tự)
✅ Ternary (? :): viết gọn cho điều kiện đơn giản 2 nhánh
✅ switch: so sánh 1 giá trị với nhiều case — nhớ break!
✅ switch expression (Java 14+): gọn hơn, không cần break, không fall-through
✅ Luôn dùng .equals() thay == khi so sánh String trong điều kiện
```

---

## ➡️ Bài Tiếp Theo

Code của bạn bây giờ có thể quyết định. Nhưng nếu cần làm một việc 100 lần thì sao? Bài tiếp theo Tôi giải thích cách tự động hóa sự lặp lại — **vòng lặp**.

👉 **[Bài 04: Vòng Lặp](../bai-04-vong-lap/README.md)**
