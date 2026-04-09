# Bài 14: Exception Handling — Xử Lý Lỗi

> 🟠 **Phase 3 – Bài 2/6** | Thời gian: ~3 giờ

---

Trong đời thực, mọi thứ đều có thể xảy ra ngoài mong đợi. User nhập sai dữ liệu. Network bị ngắt. File bị xóa. Server database quá tải.

Một ứng dụng tốt **không crash** khi gặp những tình huống này — nó xử lý khéo léo và thông báo lỗi rõ ràng. Đây là mục tiêu của **Exception Handling**.

---

## 1. Exception Là Gì?

**Exception** = Sự kiện bất thường xảy ra khi runtime, phá vỡ luồng chạy bình thường.

```java
int[] arr = {1, 2, 3};
System.out.println(arr[10]);   // ArrayIndexOutOfBoundsException!

String s = null;
s.length();                    // NullPointerException!

int x = Integer.parseInt("abc");  // NumberFormatException!
```

Khi exception xảy ra mà không được xử lý → chương trình **crash** và in stack trace đỏ vào terminal.

---

## 2. Cây Phân Cấp Exception

```
Throwable
├── Error (nghiêm trọng, thường không handle được)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── Checked Exception (bắt buộc phải xử lý — compiler báo)
    │   ├── IOException
    │   ├── SQLException
    │   └── FileNotFoundException
    └── RuntimeException = Unchecked (không bắt buộc xử lý)
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        ├── IllegalArgumentException
        └── NumberFormatException
```

> 💡 **Quy tắc phân biệt:** Checked exception = lỗi mà bạn biết trước có thể xảy ra (file không tồn tại, network lỗi). Unchecked = lỗi do code sai logic (truy cập null, sai index).

---

## 3. `try / catch / finally`

```java
try {
    // Code có thể gây ra exception
    int ketQua = 10 / 0;              // ArithmeticException
    System.out.println(ketQua);       // Dòng này KHÔNG chạy nếu exception xảy ra
} catch (ArithmeticException e) {
    // Xử lý exception này
    System.out.println("Lỗi: " + e.getMessage());  // "/ by zero"
} finally {
    // Luôn chạy dù có exception hay không — dùng để dọn dẹp tài nguyên
    System.out.println("Khối finally luôn chạy");
}
```

```java
// Bắt nhiều loại exception khác nhau
public static int lamPhepTinh(String s1, String s2) {
    try {
        int a = Integer.parseInt(s1);  // Có thể NumberFormatException
        int b = Integer.parseInt(s2);
        return a / b;                   // Có thể ArithmeticException
    } catch (NumberFormatException e) {
        System.out.println("Dữ liệu đầu vào không phải số: " + e.getMessage());
        return 0;
    } catch (ArithmeticException e) {
        System.out.println("Không thể chia cho 0!");
        return 0;
    } catch (Exception e) {
        // Catch-all cho mọi exception khác — để cuối cùng!
        System.out.println("Lỗi không xác định: " + e.getMessage());
        return 0;
    }
}

// Bắt nhiều exception cùng 1 catch (Java 7+):
} catch (NumberFormatException | ArithmeticException e) {
    System.out.println("Lỗi: " + e.getMessage());
}
```

---

## 4. `throw` — Ném Exception Thủ Công

Đôi khi bạn muốn tự tạo và ném exception khi điều kiện không hợp lệ:

```java
public void setGia(double gia) {
    if (gia < 0) {
        throw new IllegalArgumentException("Giá không được âm: " + gia);
    }
    if (gia > 100_000_000) {
        throw new IllegalArgumentException("Giá quá lớn: " + gia);
    }
    this.gia = gia;
}
```

```java
// Bên ngoài, caller bắt exception này:
try {
    sanPham.setGia(-500);
} catch (IllegalArgumentException e) {
    System.out.println("Lỗi dữ liệu: " + e.getMessage());
}
```

---

## 5. `throws` — Khai Báo Method Có Thể Ném

Với **Checked Exception**, bạn phải xử lý HOẶC khai báo cho người gọi biết:

```java
// Cách 1: Xử lý bên trong method (try/catch)
public String docFile(String duongDan) {
    try {
        return Files.readString(Path.of(duongDan));
    } catch (IOException e) {
        return "";
    }
}

// Cách 2: Khai báo throws — đẩy trách nhiệm cho người gọi
public String docFile(String duongDan) throws IOException {
    return Files.readString(Path.of(duongDan));
    // Người gọi phải xử lý IOException!
}
```

---

## 6. Custom Exception — Tạo Exception Riêng

Trong dự án thực tế, bạn thường tạo exception riêng có tên mô tả rõ ràng:

```java
// Exception cho business logic của shop
public class SoDuKhongDuException extends RuntimeException {
    private final double soDuHienTai;
    private final double soTienCan;

    public SoDuKhongDuException(double soDuHienTai, double soTienCan) {
        super(String.format("Số dư không đủ! Hiện có: %,.0f đ, cần: %,.0f đ",
            soDuHienTai, soTienCan));
        this.soDuHienTai = soDuHienTai;
        this.soTienCan = soTienCan;
    }

    public double getSoDuHienTai() { return soDuHienTai; }
    public double getSoTienCan()   { return soTienCan; }
}

// Ném nó:
public boolean muaVatPham(double gia) {
    if (soDuVi < gia) {
        throw new SoDuKhongDuException(soDuVi, gia);
    }
    soDuVi -= gia;
    return true;
}

// Bắt nó:
try {
    user.muaVatPham(5_000_000);
} catch (SoDuKhongDuException e) {
    System.out.println(e.getMessage());
    System.out.printf("Cần nạp thêm: %,.0f đ%n", e.getSoTienCan() - e.getSoDuHienTai());
}
```

---

## 7. Try-with-Resources (Java 7+)

Khi làm việc với tài nguyên (file, kết nối database...) cần đóng lại sau khi dùng:

```java
// Cách cũ — dễ quên đóng:
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"));
    String line = reader.readLine();
    // xử lý...
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (reader != null) {
        try { reader.close(); } catch (IOException e) { /* ignore */ }
    }
}

// Cách mới — tự động close, gọn và an toàn hơn:
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    String line = reader.readLine();
    // xử lý...
} catch (IOException e) {
    System.out.println("Không đọc được file: " + e.getMessage());
}
// reader.close() tự động gọi dù có exception hay không
```

---

## 8. Best Practices — tôi Hay Thấy Code Tệ Về Exception

```java
// ❌ ĐỪNG bắt exception rồi im lặng:
try {
    lamGiDo();
} catch (Exception e) {
    // Trống rỗng — lỗi biến mất, không ai biết!
}

// ❌ ĐỪNG bắt Exception quá chung chung ở logic bình thường:
try {
    int a = 1 + 1;   // Không thể lỗi, bao try làm gì?
} catch (Exception e) { }

// ❌ ĐỪNG dùng exception cho flow control thông thường:
try {
    int val = map.get(key);  // Dùng map.containsKey() thay vì catch NullPointerException
} catch (NullPointerException e) { }

// ✅ Xử lý exception ở đúng tầng — không phải mọi nơi đều cần catch:
// Tầng Repository: ném exception nếu lỗi DB
// Tầng Service: bắt và convert thành Business exception
// Tầng Controller/UI: bắt Business exception, trả về message cho user
```

---

## 9. Ví Dụ Thực Tế — Validate Input Người Dùng

```java
public class DangKyService {

    public void dangKy(String username, String email, String password) {
        // Validate và ném exception ngay nếu sai
        if (username == null || username.length() < 4) {
            throw new IllegalArgumentException("Username phải có ít nhất 4 ký tự");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Email không hợp lệ: " + email);
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Mật khẩu phải có ít nhất 8 ký tự");
        }
        // Nếu tới đây thì tất cả hợp lệ
        System.out.println("Đăng ký thành công: " + username);
    }

    public static void main(String[] args) {
        DangKyService service = new DangKyService();

        // Test nhiều case
        String[][] testCases = {
            {"raize99", "raize@mail.com", "matkhau123"},   // Hợp lệ
            {"ab", "raize@mail.com", "matkhau123"},         // Username ngắn
            {"raize99", "khonghople", "123"},                // Email sai + pass ngắn
        };

        for (String[] tc : testCases) {
            try {
                service.dangKy(tc[0], tc[1], tc[2]);
            } catch (IllegalArgumentException e) {
                System.out.println("❌ Lỗi: " + e.getMessage());
            }
        }
    }
}
```

---

## Tóm Tắt — Bài 14

```
✅ Exception = sự kiện bất thường, 2 loại: Checked và Unchecked
✅ try/catch/finally: catch xử lý lỗi, finally luôn chạy
✅ throw: ném exception thủ công khi điều kiện không hợp lệ
✅ throws: khai báo method có thể ném Checked Exception
✅ Custom exception: extends RuntimeException để đặt tên có ý nghĩa
✅ try-with-resources: tự động close tài nguyên
✅ Đừng im lặng exception — luôn log hoặc xử lý thích hợp
```

---

👉 **[Bài 15: File I/O — Đọc và Ghi File](../bai-15-file-io/README.md)**
