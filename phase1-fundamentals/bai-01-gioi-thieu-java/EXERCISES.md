# 📝 Bài Tập Thực Tế – Bài 01: Giới Thiệu Java

> 🎯 **Bối cảnh dự án:** Mọi bài tập đều gắn với việc xây dựng **RaizeShop** — một hệ thống cửa hàng game items online.

---

## 🔴 Bài Tập 1: Trang Chào Mừng Ứng Dụng ⭐

**Bối cảnh thực tế:** Mọi ứng dụng thương mại đều có màn hình splash/welcome khi khởi động. Đây là thứ đầu tiên người dùng thấy.

**Yêu cầu:** Tạo file `WelcomeScreen.java` in ra màn hình chào mừng khi khởi động RaizeShop:

```
╔══════════════════════════════════╗
║         RAIZE SHOP v1.0          ║
║    Chợ Game Items Uy Tín #1      ║
╠══════════════════════════════════╣
║  ✅ Mua bán an toàn, nhanh chóng ║
║  ✅ Hỗ trợ 24/7                  ║
║  ✅ 10,000+ sản phẩm             ║
╚══════════════════════════════════╝
Đang khởi động hệ thống...
Phiên bản: 1.0.0 | Java 21
```

**Điều cần học:**
- Dùng `System.out.println()` in nhiều dòng
- Tạo border bằng ký tự `╔ ╗ ╚ ╝ ║ ═`
- Cách chạy file Java từ terminal

---

## 🔴 Bài Tập 2: Thông Tin Sản Phẩm Đầu Tiên ⭐

**Bối cảnh thực tế:** Một trang product detail trong shop cần hiển thị thông tin có format rõ ràng.

**Yêu cầu:** Tạo file `ProductDetail.java` hiển thị thông tin 1 sản phẩm:

```
==========================================
📦 CHI TIẾT SẢN PHẨM
==========================================
Tên sản phẩm : Kiếm Rồng Lửa +10
Danh mục     : Vũ khí
Giá          : 1,500,000 đ
Tình trạng   : Còn hàng
Người bán    : DragonMaster99
Đánh giá     : ⭐⭐⭐⭐⭐ (5.0/5.0)
==========================================
💬 Liên hệ ngay để mua!
==========================================
```

**Điều cần học:**
- `System.out.printf()` để format có căn chỉnh
- `%s` (string), `%d` (int), `%n` (newline), `%,.0f` (số có dấu phẩy)
- In ký tự emoji trong Java

---

## 🟡 Bài Tập 3: Tính Phí Giao Dịch ⭐⭐

**Bối cảnh thực tế:** Sàn giao dịch game items thu phí 5% từ người bán. Cần hiển thị ngay cho người bán biết họ nhận được bao nhiêu khi đăng sản phẩm.

**Yêu cầu:** Tạo `FeeCalculator.java` tính phí:

```
=== TÍNH PHÍ GIAO DỊCH ===
Giá đăng bán : 2,000,000 đ
Phí sàn (5%) :   100,000 đ
---------------------------
Bạn nhận được: 1,900,000 đ
```

Tính thêm:
- Nếu người bán là VIP: phí giảm còn 3%
- Nếu giá trị > 10,000,000 đ: phí giảm còn 2%

**Gợi ý code:**
```java
double giaBan = 2_000_000;
double phiTram = 5.0;
double phi = giaBan * phiTram / 100;
double nhanDuoc = giaBan - phi;

System.out.printf("Giá đăng bán : %,.0f đ%n", giaBan);
System.out.printf("Phí sàn (%.0f%%) : %,.0f đ%n", phiTram, phi);
```

---

## 🔴 Bài Tập 4: Receipt Generator ⭐⭐⭐

**Bối cảnh thực tế:** Sau mỗi giao dịch thành công, hệ thống tự động tạo receipt (biên lai). Đây là tính năng thực tế trong mọi sàn thương mại điện tử.

**Yêu cầu:** Tạo `Receipt.java` tạo biên lai giao dịch:

```
╔══════════════════════════════════════╗
║           BIÊN LAI GIAO DỊCH         ║
╠══════════════════════════════════════╣
║ Mã GD     : RZ-2024-08-001           ║
║ Thời gian : 03/04/2024 15:30:00      ║
╠══════════════════════════════════════╣
║ SẢN PHẨM                            ║
║   Kiếm Rồng +10                     ║
║   Nhẫn Ma Lực                       ║
╠══════════════════════════════════════╣
║ Tổng tiền : 2,300,000 đ             ║
║ Phí (5%)  :   115,000 đ             ║
║ THANH TOÁN: 2,415,000 đ             ║
╠══════════════════════════════════════╣
║ Trạng thái: ✅ THÀNH CÔNG           ║
╚══════════════════════════════════════╝
```

**Thử thách thêm:** Dùng `String.repeat()` để tạo đường kẻ động thay vì gõ cứng.

---

## 🟡 Bài Tập 5: System Info Log ⭐

**Bối cảnh thực tế:** Mỗi khi server khởi động, hệ thống ghi log thông tin môi trường. Đây là pattern phổ biến trong Startup class của Spring Boot.

**Yêu cầu:** Tạo `SystemInfo.java` in ra thông tin môi trường Java:

```java
public class SystemInfo {
    public static void main(String[] args) {
        // Dùng System.getProperty() để lấy thông tin hệ thống
        System.out.println("=== RAIZESHOP SERVER INFO ===");

        // In ra:
        // Java version         : 21.0.1
        // Java vendor          : Oracle Corporation
        // OS Name              : Windows 11
        // OS Architecture      : amd64
        // Available Processors : 8
        // Max Memory           : 1,024 MB
        // User Home            : C:\Users\raize
        // Working Directory    : C:\projects\raizeshop
        // =============================
        // Server Status        : ✅ READY

        // TODO: Lấy từng property và in ra
        // System.getProperty("java.version")
        // System.getProperty("os.name")
        // Runtime.getRuntime().availableProcessors()
        // Runtime.getRuntime().maxMemory() / (1024 * 1024) + " MB"
    }
}
```

**Bonus:** Thêm điều kiện: nếu RAM < 256 MB → in cảnh báo `⚠️ LOW MEMORY MODE`.

---

## 🔴 Bài Tập 6 (BONUS): ASCII Art Logo ⭐⭐

**Bối cảnh thực tế:** Nhiều CLI tools (Spring Boot, NestJS, Maven) in ASCII art logo khi start. Đây là cách tạo "brand identity" cho application.

**Yêu cầu:** Tạo `AsciiLogo.java` in logo RAIZE khi khởi động:

```
     ____      _    ___ _________
    |  _ \    / \  |_ _|__  / ___|   _
    | |_) |  / _ \  | |  / /| |  | |_| |  _   ___
    |  _ <  / ___ \ | | / /_| |__|  _  | | \ / _ \
    |_| \_\/_/   \_\___/____|\____|_| |_|_| \_\___/

    ╔══════════════════════════════════════════╗
    ║  Java Edition v1.0 — Built with ❤️        ║
    ╚══════════════════════════════════════════╝
```

**Gợi ý:** Vào [patorjk.com/software/taag](https://patorjk.com/software/taag) để generate ASCII art, sau đó dùng text block (Java 15+) để nhúng vào code:

```java
String logo = """
     ____      _    ___ _________
    |  _ \\    / \\  |_ _|__  / ___|
    ...
    """;
System.out.println(logo);
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

Sau khi làm xong, trả lời như một **junior dev giải thích cho team**:

- [ ] Tại sao phải dùng `%,.0f` mà không phải `%d` để in tiền VND đẹp?
- [ ] Khi chạy `javac`, lỗi `error: class WelcomeScreen is public, should be declared in a file named WelcomeScreen.java` nghĩa là gì?
- [ ] Tại sao không nên viết số `1500000` thẳng vào code mà nên dùng `1_500_000`?
- [ ] `System.out.print` vs `println` vs `printf` — dùng cái nào trong trường hợp nào?
- [ ] Bài 5: `System.getProperty()` vs biến môi trường `System.getenv()` — khác nhau thế nào? Khi nào dùng cái nào trong deployment?

---

👉 **Tiếp theo:** [Bài 02 – Biến và Kiểu Dữ Liệu](../bai-02-bien-kieu-du-lieu/EXERCISES.md)
