# Bài 11: Polymorphism — Đa Hình

> 🟡 **Phase 2 – Bài 5/6** | Thời gian: ~2.5 giờ

---

Thầy muốn kể cho bạn một tình huống thực tế. Hãy tưởng tượng bạn đang build hệ thống thông báo (notification) cho RaizeShop. Có nhiều loại thông báo: Email, SMS, Telegram. Mỗi loại có cách gửi khác nhau.

Nếu không có polymorphism:
```java
// Kiểm tra kiểu và gọi riêng — rất tệ!
if (kieu.equals("email"))    guiEmail(thongBao);
else if (kieu.equals("sms")) guiSMS(thongBao);
else if (kieu.equals("tele")) guiTelegram(thongBao);
```

Mỗi lần thêm loại thông báo mới, bạn phải sửa code cũ. Đây vi phạm nguyên tắc vàng: *Open/Closed — mở để mở rộng, đóng để sửa đổi*.

**Polymorphism** giải quyết điều này một cách thanh lịch.

---

## 1. Polymorphism Là Gì?

*Poly* = nhiều, *morph* = hình thái. Đa hình nghĩa là **cùng một interface, nhiều cách thực thi khác nhau**.

```java
// Tất cả đều là "ThongBao" nhưng hành vi khác nhau:
ThongBao email = new EmailThongBao("user@mail.com");
ThongBao sms   = new SMSThongBao("0912345678");
ThongBao tele  = new TelegramThongBao("@user");

// Cùng gọi .gui(), mỗi cái tự biết làm gì — đó là polymorphism!
email.gui("Đơn hàng của bạn đã được xác nhận!");
sms.gui("Đơn hàng của bạn đã được xác nhận!");
tele.gui("Đơn hàng của bạn đã được xác nhận!");
```

---

## 2. Runtime Polymorphism — Dynamic Dispatch

Đây là thứ ma thuật thực sự xảy ra bên dưới:

```java
public class NguoiDung {
    public void inThongTin() {
        System.out.println("Tôi là NguoiDung");
    }
}

public class Seller extends NguoiDung {
    @Override
    public void inThongTin() {
        System.out.println("Tôi là Seller");
    }
}

public class Admin extends NguoiDung {
    @Override
    public void inThongTin() {
        System.out.println("Tôi là Admin");
    }
}
```

```java
// Biến kiểu NguoiDung, nhưng chứa object Seller/Admin
NguoiDung u1 = new NguoiDung();
NguoiDung u2 = new Seller("shop", "shop@mail.com", "My Shop");
NguoiDung u3 = new Admin("admin", "admin@mail.com");

u1.inThongTin();   // "Tôi là NguoiDung"
u2.inThongTin();   // "Tôi là Seller"    — Java gọi phiên bản Seller!
u3.inThongTin();   // "Tôi là Admin"     — Java gọi phiên bản Admin!
```

JVM xác định method nào được gọi dựa trên **kiểu thực tế của object lúc runtime**, không phải kiểu biến khai báo. Điều này gọi là *Dynamic Method Dispatch* — xảy ra tự động, bạn không cần làm gì thêm.

---

## 3. Sức Mạnh Thực Sự: Mảng Đa Hình

```java
// Mảng NguoiDung chứa cả Seller lẫn Admin
NguoiDung[] tatCaNguoiDung = {
    new NguoiDung("user1", "u1@mail.com"),
    new Seller("shop1", "s1@mail.com", "Shop A"),
    new Admin("admin1", "a1@mail.com"),
    new Seller("shop2", "s2@mail.com", "Shop B"),
    new NguoiDung("user2", "u2@mail.com"),
};

// Duyệt và gọi inThongTin() — mỗi object tự biết phiên bản nào của mình!
System.out.println("=== Danh sách tất cả người dùng ===");
for (NguoiDung nd : tatCaNguoiDung) {
    nd.inThongTin();
    System.out.println("---");
}

// Đếm theo loại
int soSeller = 0, soAdmin = 0;
for (NguoiDung nd : tatCaNguoiDung) {
    if (nd instanceof Seller) soSeller++;
    if (nd instanceof Admin) soAdmin++;
}
System.out.println("Seller: " + soSeller + ", Admin: " + soAdmin);
```

Bạn có thấy không: với 5 object khác nhau, bạn chỉ viết 1 vòng `for` với 1 lần gọi `inThongTin()`. Polymorphism làm phần còn lại.

---

## 4. Ứng Dụng Hệ Thống Thông Báo

```java
// Abstract class (sẽ học kỹ Bài 12) — khuôn mẫu chung
public abstract class ThongBao {
    protected String tieuDe;

    public ThongBao(String tieuDe) {
        this.tieuDe = tieuDe;
    }

    // Mỗi class con PHẢI implement cái này theo cách riêng
    public abstract void gui(String nguoiNhan, String noiDung);

    // Method chung — không override
    public void inLog(String nguoiNhan) {
        System.out.printf("[LOG] Gửi '%s' tới %s%n", tieuDe, nguoiNhan);
    }
}

public class EmailThongBao extends ThongBao {
    public EmailThongBao() { super("Email Thông Báo"); }

    @Override
    public void gui(String nguoiNhan, String noiDung) {
        inLog(nguoiNhan);
        System.out.println("📧 Gửi email tới " + nguoiNhan + ": " + noiDung);
    }
}

public class SMSThongBao extends ThongBao {
    public SMSThongBao() { super("SMS Thông Báo"); }

    @Override
    public void gui(String nguoiNhan, String noiDung) {
        inLog(nguoiNhan);
        String noiDungNgan = noiDung.length() > 50
            ? noiDung.substring(0, 50) + "..."
            : noiDung;
        System.out.println("📱 SMS tới " + nguoiNhan + ": " + noiDungNgan);
    }
}

public class TelegramThongBao extends ThongBao {
    public TelegramThongBao() { super("Telegram Thông Báo"); }

    @Override
    public void gui(String nguoiNhan, String noiDung) {
        inLog(nguoiNhan);
        System.out.println("✈️ Telegram tới @" + nguoiNhan + ": " + noiDung);
    }
}
```

```java
// Dùng polymorphism — code không đổi dù thêm loại thông báo mới!
public class HeThongThongBao {

    public static void guiThongBaoDonHang(String tenUser, String email,
                                           String sdt, String telegram) {
        String noiDung = "Đơn hàng #1234 của bạn đã được xác nhận!";

        ThongBao[] loai = {
            new EmailThongBao(),
            new SMSThongBao(),
            new TelegramThongBao()
        };
        String[] nguoiNhan = {email, sdt, telegram};

        for (int i = 0; i < loai.length; i++) {
            loai[i].gui(nguoiNhan[i], noiDung);
        }
    }

    public static void main(String[] args) {
        guiThongBaoDonHang("raize99",
            "raize@gmail.com", "0912345678", "raize99");
    }
}
```

---

## 5. Compile-time Polymorphism — Method Overloading

Bài 06 bạn đã học **method overloading** — đây cũng là một dạng polymorphism. Java quyết định method nào được gọi lúc **compile time** (dựa trên tham số):

```java
public class InThongTin {
    public static void in(int x) { System.out.println("int: " + x); }
    public static void in(double x) { System.out.println("double: " + x); }
    public static void in(String x) { System.out.println("String: " + x); }

    public static void main(String[] args) {
        in(5);      // → int: 5
        in(3.14);   // → double: 3.14
        in("Java"); // → String: Java
    }
}
```

| | Compile-time (Overloading) | Runtime (Overriding) |
|--|---|---|
| **Xảy ra lúc** | Biên dịch | Chạy |
| **Cơ chế** | Khác tham số, cùng tên | Cùng tham số, kế thừa |
| **Gọi là** | Method overloading | Dynamic dispatch |

---

## 6. Khi Nào Dùng Polymorphism?

Mỗi khi bạn thấy code kiểu này:

```java
// ❌ Dấu hiệu cần refactor bằng polymorphism:
if (type.equals("email")) sendEmail(...);
else if (type.equals("sms")) sendSMS(...);
else if (type.equals("push")) sendPush(...);

// ✅ Sau refactor:
Notification n = factory.create(type);  // Factory tạo object đúng kiểu
n.send(recipient, content);              // Polymorphism làm phần còn lại
```

Luôn tự hỏi: "Nếu thêm một loại mới, tôi có phải sửa code cũ không?" Nếu có → có thể dùng polymorphism.

---

## Tóm Tắt — Bài 11

```
✅ Polymorphism = cùng lời gọi method, nhiều kết quả tùy object thực tế
✅ Runtime polymorphism: JVM tự chọn method đúng lúc chạy (dynamic dispatch)
✅ Upcasting (Seller → NguoiDung): tự động, hẫy dùng khi cần đa hình
✅ Mảng kiểu cha chứa nhiều kiểu con — rất powerful!
✅ Compile-time polymorphism = method overloading (bài 06)
✅ Dấu hiệu cần polymorphism: code có nhiều if/else kiểm tra kiểu object
```

---

## ➡️ Bài Cuối Phase 2!

Bạn để ý `abstract class ThongBao` chưa? Thầy dùng nó để định nghĩa "khuôn mẫu" nhưng không implement cụ thể. Đây chính là **Abstraction** — bài cuối của Phase 2 và cũng là nền tảng quan trọng nhất cho kiến trúc phần mềm.

👉 **[Bài 12: Abstraction — Abstract Class & Interface](../bai-12-abstraction/README.md)**
