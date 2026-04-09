# Bài 07: Class và Object — Nền Tảng OOP

> 🟡 **Phase 2 – Bài 1/6** | Thời gian: ~4 giờ

---

Chào mừng bạn đến với Phase 2! Thầy phải nói thật: đây là bài học quan trọng nhất trong toàn bộ lộ trình Java. Không hiểu Class và Object thì bạn không thể hiểu Spring Boot, không hiểu được codebase của bất kỳ dự án thực tế nào.

Thầy sẽ không vội. Hãy đọc chậm, chạy code theo, và hỏi "tại sao" cho mỗi thứ bạn thấy.

---

## 1. Vấn Đề Với Cách Tiếp Cận Cũ

Nhìn lại code bài 04 và 05 — bạn có nhận ra vấn đề không?

```java
// Dữ liệu của SẢN PHẨM bị tách rời thành nhiều mảng riêng lẻ:
String[] ten    = {"Kiếm Rồng", "Giáp Vàng"};
int[] soLuong   = {3, 1};
double[] gia    = {1_200_000, 800_000};

// Để in thông tin sản phẩm thứ 0:
System.out.println(ten[0] + " | " + soLuong[0] + " cái | " + gia[0] + " đ");
```

Có gì sai ở đây? Dữ liệu của MỘT sản phẩm bị nằm rải rác ở 3 mảng khác nhau. Nếu bạn muốn thêm field `moTa`, bạn phải thêm thêm một mảng nữa. Nếu cần truyền sản phẩm vào một method, bạn phải truyền 3, 4 tham số riêng lẻ...

**Class** là giải pháp: đóng gói tất cả dữ liệu liên quan vào **một đơn vị duy nhất**.

---

## 2. Class — Bản Thiết Kế

Hãy nghĩ Class như bản vẽ thiết kế ngôi nhà. Bản vẽ mô tả ngôi nhà có gì (phòng ngủ, phòng khách...) và làm được gì (mở cửa, bật điện...). Nhưng bản vẽ không phải ngôi nhà thật.

```java
public class SanPham {

    // ===== FIELDS = thuộc tính, dữ liệu của sản phẩm =====
    String ten;
    double gia;
    int soLuong;
    String danhMuc;
    boolean dangBan;

    // ===== METHODS = hành vi, thao tác lên sản phẩm =====

    void inThongTin() {
        System.out.println("═══════════════════════");
        System.out.println("Tên   : " + ten);
        System.out.printf("Giá   : %,.0f đ%n", gia);
        System.out.println("SL    : " + soLuong);
        System.out.println("Danh mục: " + danhMuc);
        System.out.println("Trạng thái: " + (dangBan ? "Đang bán" : "Ngừng bán"));
    }

    boolean conHang() {
        return soLuong > 0;
    }

    void giam5Phan() {
        gia = gia * 0.95;  // Giảm 5%
    }

    boolean mua(int soLuongMua) {
        if (soLuongMua > soLuong) {
            System.out.println("Không đủ hàng! Chỉ còn " + soLuong + " sản phẩm.");
            return false;
        }
        soLuong -= soLuongMua;
        System.out.printf("Mua thành công %d x %s. Còn lại: %d%n", soLuongMua, ten, soLuong);
        return true;
    }
}
```

---

## 3. Object — Thực Thể Cụ Thể Từ Class

Từ một class `SanPham`, bạn có thể tạo ra hàng nghìn sản phẩm khác nhau:

```java
public class Main {
    public static void main(String[] args) {

        // "new SanPham()" = xây ngôi nhà từ bản vẽ
        SanPham kiem = new SanPham();
        kiem.ten = "Kiếm Rồng Cấp 10";
        kiem.gia = 1_200_000;
        kiem.soLuong = 3;
        kiem.danhMuc = "Vũ khí";
        kiem.dangBan = true;

        SanPham giap = new SanPham();
        giap.ten = "Giáp Vàng Tinh Luyện";
        giap.gia = 800_000;
        giap.soLuong = 1;
        giap.danhMuc = "Phòng thủ";
        giap.dangBan = true;

        // Gọi method trên từng object
        kiem.inThongTin();

        System.out.println("\nKiếm còn hàng? " + kiem.conHang());  // true

        kiem.mua(2);         // Mua 2 cái
        kiem.mua(5);         // Không đủ — chỉ còn 1

        System.out.println("\n=== Sau khi giảm giá 5% ===");
        giap.giam5Phan();
        giap.inThongTin();
    }
}
```

**Mỗi object là độc lập hoàn toàn.** Thay đổi `kiem.soLuong` không ảnh hưởng gì đến `giap.soLuong`. Họ chia sẻ cùng *template* (class) nhưng có dữ liệu riêng.

---

## 4. Memory Model — Object Sống Ở Đâu Trong RAM?

Đây là kiến thức "hậu trường" giúp bạn hiểu những điều kỳ lạ sẽ gặp sau này:

```
Stack (bộ nhớ nhỏ, nhanh)       Heap (bộ nhớ lớn, chứa objects)
─────────────────────────        ─────────────────────────────────────────
kiem  ──────────────────────────→  SanPham { ten="Kiếm Rồng", gia=1200000, soLuong=1 }

giap  ──────────────────────────→  SanPham { ten="Giáp Vàng", gia=760000, soLuong=1 }
```

Biến `kiem` và `giap` trên Stack **không chứa object**. Chúng chứa **địa chỉ** — con trỏ trỏ đến object thật sự nằm trên Heap.

### Hệ quả quan trọng — Tham chiếu (Reference):

```java
SanPham a = new SanPham();
a.ten = "Kiếm Rồng";
a.gia = 1_200_000;

SanPham b = a;  // b KHÔNG tạo object mới!
                // b chỉ copy ĐỊA CHỈ từ a → cả hai trỏ đến cùng object

b.gia = 500_000;  // Thay đổi qua b

System.out.println(a.gia);  // 500_000 — a cũng thấy sự thay đổi!
// Vì a và b đang trỏ đến CÙNG một object trong Heap
```

Lần đầu thấy điều này, thầy debug mất cả buổi mà không hiểu tại sao. Bây giờ bạn biết trước rồi — đừng để vào bẫy nhé!

---

## 5. `null` — Không Trỏ Đến Đâu Cả

```java
SanPham sp = null;   // sp không trỏ đến object nào

sp.inThongTin();     // ❌ NullPointerException!
                     // Gọi method trên null = báo lỗi ngay
```

**NullPointerException** là lỗi bạn sẽ gặp nhiều nhất trong cuộc đời lập trình Java. Cách phòng tránh:

```java
if (sp != null) {
    sp.inThongTin();
}

// Hoặc viết ngắn hơn với Objects.requireNonNull:
// import java.util.Objects;
// Objects.requireNonNull(sp, "Sản phẩm không được null!");
```

---

## 6. `static` vs Instance — Phân Biệt Quan Trọng

```java
public class SanPham {
    // INSTANCE field: mỗi object có bản riêng
    String ten;
    double gia;

    // STATIC field: CHUNG cho tất cả objects
    static int tongSoSanPham = 0;   // Đếm đã tạo bao nhiêu sản phẩm

    // INSTANCE method: cần object cụ thể để gọi
    void inThongTin() {
        System.out.println(ten + ": " + gia + " đ");
    }

    // STATIC method: không cần object, gọi qua tên class
    static int layTongSo() {
        return tongSoSanPham;
    }
}
```

```java
SanPham sp1 = new SanPham(); sp1.ten = "Kiếm"; SanPham.tongSoSanPham++;
SanPham sp2 = new SanPham(); sp2.ten = "Giáp"; SanPham.tongSoSanPham++;

System.out.println(SanPham.tongSoSanPham);  // 2 — static field là CHUNG
System.out.println(SanPham.layTongSo());    // 2

sp1.inThongTin();           // Gọi qua object: "Kiếm: 0.0 đ"
// SanPham.inThongTin();    // ❌ Không được! Instance method cần object cụ thể
```

> 💡 **Ghi nhớ:** `static` = thuộc về class, không phụ thuộc vào object cụ thể. Đó là lý do `main` phải là `static` — JVM gọi `main` mà không tạo object nào.

---

## 7. Mảng Object

```java
SanPham[] kho = new SanPham[3];  // Tạo mảng 3 ô — tất cả đang là null!

kho[0] = new SanPham();
kho[0].ten = "Kiếm Rồng"; kho[0].gia = 1_200_000; kho[0].soLuong = 3;

kho[1] = new SanPham();
kho[1].ten = "Giáp Vàng"; kho[1].gia = 800_000; kho[1].soLuong = 1;

kho[2] = new SanPham();
kho[2].ten = "Nhẫn Ma"; kho[2].gia = 500_000; kho[2].soLuong = 5;

// Duyệt và in
for (SanPham sp : kho) {
    if (sp != null) {   // Luôn kiểm tra null khi duyệt mảng object!
        sp.inThongTin();
    }
}
```

---

## Tóm Tắt — Bài 07

```
✅ Class = bản thiết kế; Object = thực thể tạo từ class bằng "new"
✅ Fields = dữ liệu của object; Methods = hành vi của object
✅ Dot notation: object.field, object.method()
✅ Mỗi object độc lập — thay đổi object này không ảnh hưởng object kia
✅ Biến reference: không chứa object, chứa địa chỉ đến object trong Heap
✅ Gán b = a → cả hai cùng trỏ 1 object (không phải copy!)
✅ null = không trỏ đến đâu → gọi method trên null = NullPointerException
✅ static = thuộc class, dùng chung; instance = thuộc object, mỗi cái riêng
```

---

## ➡️ Bài Tiếp Theo

Bạn có nhận ra không: khi tạo object, bạn đang gán từng field một — rất dài dòng và dễ quên. Bài tiếp theo thầy sẽ dạy **Constructor** — cách tạo object gọn gàng, đúng đắn ngay từ đầu.

👉 **[Bài 08: Constructor, `this` và `static` Nâng Cao](../bai-08-constructor-this-static/README.md)**
