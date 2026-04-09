# Bài 15: File I/O — Đọc và Ghi File

> 🟠 **Phase 3 – Bài 3/6** | Thời gian: ~2.5 giờ

---

Dữ liệu trong RAM sẽ mất khi tắt máy. **File I/O** cho phép bạn lưu dữ liệu xuống đĩa và đọc lại sau. Một kỹ năng thiết yếu: đọc file config, ghi log, xử lý file CSV, import/export dữ liệu...

Java có hai cách tiếp cận: **API cũ** (`java.io`) và **NIO.2** (`java.nio.file` — Java 7+). Thầy sẽ dạy cả hai nhưng nhấn mạnh NIO.2 vì nó sạch hơn và mạnh hơn.

---

## 1. Path — Đường Dẫn File

```java
import java.nio.file.Path;
import java.nio.file.Paths;

// Tạo Path
Path file = Path.of("data.txt");                    // Relative path
Path absPath = Path.of("C:/Users/Raize/data.txt");  // Windows
Path linuxPath = Path.of("/home/raize/data.txt");   // Linux/Mac

// Thao tác trên Path
System.out.println(file.getFileName());   // data.txt
System.out.println(file.toAbsolutePath()); // C:\Users\...\data.txt
System.out.println(file.getParent());     // null (không có thư mục cha)

Path folder = Path.of("logs/2026/march/app.log");
System.out.println(folder.getParent());       // logs/2026/march
System.out.println(folder.getFileName());     // app.log
System.out.println(folder.getNameCount());    // 4
```

---

## 2. `Files` — Đọc/Ghi Đơn Giản (NIO.2)

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.io.IOException;

// === GHI FILE ===

// Ghi toàn bộ nội dung (tạo mới hoặc ghi đè)
String noiDung = "Xin chào Java!\nDây là dòng 2.";
Files.writeString(Path.of("hello.txt"), noiDung);

// Ghi với encoding cụ thể
Files.writeString(Path.of("hello.txt"), noiDung, StandardCharsets.UTF_8);

// Ghi nối thêm vào cuối file (append)
Files.writeString(Path.of("hello.txt"), "\nDòng 3 được thêm vào",
    StandardOpenOption.APPEND);

// Ghi danh sách dòng
List<String> lines = List.of("Dòng 1", "Dòng 2", "Dòng 3");
Files.write(Path.of("lines.txt"), lines);


// === ĐỌC FILE ===

// Đọc toàn bộ thành String (file nhỏ)
String content = Files.readString(Path.of("hello.txt"));
System.out.println(content);

// Đọc thành List<String> — mỗi phần tử là một dòng
List<String> danhSachDong = Files.readAllLines(Path.of("lines.txt"));
for (String dong : danhSachDong) {
    System.out.println(dong);
}

// Stream<String> — hiệu quả hơn với file lớn
try (var stream = Files.lines(Path.of("bigfile.txt"))) {
    stream.filter(line -> line.contains("ERROR"))
          .forEach(System.out::println);
}
```

---

## 3. Kiểm Tra và Thao Tác File/Folder

```java
Path path = Path.of("data/users.txt");

// Kiểm tra
System.out.println(Files.exists(path));        // Có tồn tại không?
System.out.println(Files.isFile(path));        // Là file?
System.out.println(Files.isDirectory(path));   // Là folder?
System.out.println(Files.isReadable(path));    // Đọc được không?

// Tạo thư mục
Files.createDirectory(Path.of("logs"));          // Tạo 1 cấp
Files.createDirectories(Path.of("logs/2026/march")); // Tạo nhiều cấp

// Sao chép, di chuyển, xóa
Files.copy(Path.of("source.txt"), Path.of("dest.txt"));
Files.move(Path.of("old.txt"), Path.of("new.txt"));
Files.delete(path);                    // Lỗi nếu không tồn tại
Files.deleteIfExists(path);            // An toàn hơn

// Thông tin file
System.out.println(Files.size(path) + " bytes");
```

---

## 4. BufferedReader / BufferedWriter — API Cũ Nhưng Vẫn Dùng

Gặp trong nhiều codebase cũ, cần biết đọc hiểu:

```java
import java.io.*;

// Ghi file
try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Dòng 1");
    writer.newLine();       // Xuống dòng
    writer.write("Dòng 2");
}

// Đọc file từng dòng
try (BufferedReader reader = new BufferedReader(new FileReader("output.txt"))) {
    String dong;
    while ((dong = reader.readLine()) != null) {
        System.out.println(dong);
    }
}
```

---

## 5. Ví Dụ Thực Tế — Ghi và Đọc File Log

```java
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.IOException;

public class Logger {

    private static final Path LOG_FILE = Path.of("logs/app.log");
    private static final DateTimeFormatter FMT =
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static void log(String level, String message) {
        String entry = String.format("[%s] %s - %s%n",
            LocalDateTime.now().format(FMT), level, message);
        try {
            Files.createDirectories(LOG_FILE.getParent());
            Files.writeString(LOG_FILE, entry, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            System.err.println("Không ghi được log: " + e.getMessage());
        }
    }

    public static void info(String msg)  { log("INFO ", msg); }
    public static void warn(String msg)  { log("WARN ", msg); }
    public static void error(String msg) { log("ERROR", msg); }

    public static void main(String[] args) throws IOException {
        Logger.info("Ứng dụng khởi động");
        Logger.info("User 'raize99' đăng nhập");
        Logger.warn("Thử đăng nhập thất bại: user 'hacker'");
        Logger.error("Kết nối database thất bại");

        System.out.println("=== Nội dung file log ===");
        Files.readAllLines(LOG_FILE).forEach(System.out::println);
    }
}
```

---

## 6. Ví Dụ Thực Tế — Đọc File CSV

```java
public class DocCSV {
    public static void main(String[] args) throws IOException {
        // File data.csv:
        // username,email,soDu
        // raize99,r@mail.com,500000
        // gamer,g@mail.com,1200000

        List<String> lines = Files.readAllLines(Path.of("data.csv"));

        // Bỏ qua header (dòng đầu)
        for (int i = 1; i < lines.size(); i++) {
            String[] parts = lines.get(i).split(",");
            if (parts.length < 3) continue;  // Bỏ qua dòng thiếu dữ liệu

            String username = parts[0].trim();
            String email = parts[1].trim();
            double soDu = Double.parseDouble(parts[2].trim());

            System.out.printf("%-12s %-20s %,10.0f đ%n", username, email, soDu);
        }
    }
}
```

---

## Tóm Tắt — Bài 15

```
✅ Path.of(): tạo đường dẫn (NIO.2 — nên dùng)
✅ Files.writeString() / Files.readString(): ghi/đọc đơn giản
✅ Files.readAllLines(): đọc tất cả dòng thành List<String>
✅ StandardOpenOption.APPEND: ghi nối thêm vào cuối
✅ Files.createDirectories(): tạo cả cây thư mục
✅ try-with-resources: tự động close tài nguyên (dùng với BufferedReader/Writer)
✅ Tất cả File I/O đều throw IOException → phải xử lý
```

---

👉 **[Bài 16: Generics](../bai-16-generics/README.md)**
