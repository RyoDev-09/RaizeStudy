// Tệp dữ liệu tự động sinh ra bởi build_db.js
const lessonsData = [
  {
    "id": 1,
    "title": "Giới Thiệu Java & Cài Đặt",
    "phase": "Phase 1: Fundamentals",
    "time": "2 giờ",
    "difficulty": "Dễ",
    "theory": "﻿# Bài 01: Giới Thiệu Java – JVM, JDK, JRE và Hello World\n\n> 🟢 **Phase 1 – Bài 1/7** | Thời gian: ~2 giờ\n\n---\n\nChào bạn! Chào mừng bạn đến với bài học đầu tiên. Tôi rất vui vì bạn đã chọn Java — đây là một trong những ngôn ngữ được dùng nhiều nhất trên thế giới và cũng là nền tảng để sau này bạn làm việc với Spring Boot, Android, hay bất kỳ hệ thống lớn nào.\n\nTrước khi bắt tay vào viết dòng code đầu tiên, Tôi muốn bạn hiểu **Java là gì và tại sao nó hoạt động được**. Đừng bỏ qua phần này — nhiều người học xong cả năm vẫn không biết tại sao Java lại chạy được trên mọi hệ điều hành!\n\n---\n\n## 1. Java Được Dùng Ở Đâu?\n\nBạn có biết không — ứng dụng của dự án RaizeShop mà bạn đang tham khảo chính là viết bằng Java (Spring Boot). Minecraft — tựa game nổi tiếng — cũng viết bằng Java. Gần như mọi hệ thống ngân hàng lớn tại Việt Nam đều chạy Java ở phía backend.\n\n| Lĩnh vực | Ví dụ cụ thể |\n|---------|-------------|\n| Backend web | Spring Boot (RaizeShop, các hệ thống lớn) |\n| Android | Toàn bộ app Android gốc |\n| Ngân hàng, tài chính | Core banking, ATM software |\n| Big Data | Hadoop, Spark xử lý dữ liệu khổng lồ |\n| Game | Minecraft |\n\n---\n\n## 2. JVM, JRE, JDK — Ba Khái Niệm Bạn Cần Phân Biệt Ngay\n\ntôi thấy đây là chỗ học sinh hay bị nhầm nhất ở bài đầu. Hãy hình dung thế này:\n\n```\nBạn muốn XEM một bộ phim (chạy chương trình Java):\n  → Cần TV (JVM) để chiếu\n  → Cần đầu phim (JRE) để đọc đĩa\n  → Cần cả bộ thiết bị + tua vít để tự LÀM đĩa (JDK)\n```\n\nChính xác hơn:\n\n```\n┌──────────────────────────────────────────────┐\n│                  JDK                         │  ← Bạn cần cái này để LẬP TRÌNH\n│                                              │\n│   ┌──────────────────────────────────────┐  │\n│   │               JRE                    │  │  ← Cần để CHẠY chương trình Java\n│   │                                      │  │\n│   │   ┌──────────────────────────────┐   │  │\n│   │   │           JVM                │   │   │  ← Máy ảo, thực sự thực thi code\n│   │   └──────────────────────────────┘   │   │\n│   │   + Thư viện chuẩn (java.util...)    │   │\n│   └──────────────────────────────────────┘   │\n│   + javac (compiler), debugger, tools...     │\n└──────────────────────────────────────────────┘\n```\n\n**JVM** là trái tim của Java. Đây là lý do cho cái slogan nổi tiếng *\"Write Once, Run Anywhere\"* — bạn chỉ viết code một lần, JVM trên mọi hệ điều hành (Windows, Mac, Linux) sẽ tự biết cách chạy nó.\n\n> 💡 **Kết luận thực tế:** Bạn chỉ cần nhớ một điều — hãy cài **JDK**, vì JDK đã bao gồm cả JRE lẫn JVM bên trong rồi.\n\n---\n\n## 3. Code Java Chạy Như Thế Nào? (Quan Trọng!)\n\nHãy để Tôi kể cho bạn nghe hành trình của một file Java từ lúc bạn gõ đến lúc máy tính thực thị:\n\n```\nBước 1: Bạn viết            Bước 2: Compile             Bước 3: Chạy\n────────────────────         ───────────────────          ──────────────────\nHelloWorld.java      ──→     HelloWorld.class     ──→     Kết quả trên màn hình\n(code bạn hiểu)      javac   (bytecode – trung gian) JVM  (máy tính thực thi)\n```\n\nĐiểm hay là file `.class` (bytecode) **không phải** code máy của Windows hay Mac cụ thể. Nó là ngôn ngữ \"trung gian\" mà JVM trên bất kỳ máy nào cũng hiểu được. Đó là lý do Java portable!\n\n---\n\n## 4. Viết Chương Trình Đầu Tiên\n\nThôi lý thuyết đủ rồi, bài đầu tiên mà. Hãy mở IDE lên và tạo file `HelloWorld.java`:\n\n```java\npublic class HelloWorld {\n\n    public static void main(String[] args) {\n        System.out.println(\"Xin chào Java!\");\n    }\n}\n```\n\nChạy thử đi. Bạn thấy `Xin chào Java!` in ra chưa? Tuyệt! Bây giờ Tôi sẽ giải thích từng chữ, vì bạn cần hiểu chứ không chỉ copy-paste.\n\n### `public class HelloWorld` nghĩa là gì?\n\n```java\npublic   class    HelloWorld\n  ↑        ↑          ↑\nAi cũng  Khai báo  Tên class — phải\ntruy cập  một class  khớp với tên file!\nđược\n```\n\nQuy tắc bắt buộc: **tên class phải đúng với tên file `.java`**. Nếu class tên là `HelloWorld`, file phải là `HelloWorld.java`. Sai chỗ này là lỗi ngay.\n\n### `public static void main(String[] args)` — Dòng thần chú\n\nĐây là **điểm bắt đầu** của mọi chương trình Java. Khi bạn bấm Run, JVM sẽ tìm đúng cái method này và bắt đầu từ đây. Bạn không cần hiểu hết ngay bây giờ, nhưng cần nhớ: **phải có đúng dòng này thì chương trình mới chạy được**.\n\n### `System.out.println(\"...\")`\n\nCách để in ra màn hình. `println` = print + line (in rồi xuống dòng). Nếu bạn không muốn xuống dòng, dùng `System.out.print(...)` thay thế.\n\n---\n\n## 5. Thử Nghiệm Thêm\n\nĐừng chỉ copy bài tôi cho. Hãy thử tự tay chỉnh sửa và xem điều gì xảy ra:\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n\n        System.out.println(\"Xin chào Java!\");        // println: in + xuống dòng\n        System.out.print(\"Tôi đang học \");           // print: in, KHÔNG xuống dòng\n        System.out.print(\"Java \");\n        System.out.println(\"từ đầu!\");               // → dòng này mới xuống\n\n        // In các kiểu dữ liệu khác nhau\n        System.out.println(2026);           // số nguyên\n        System.out.println(3.14);           // số thực\n        System.out.println(true);           // đúng/sai\n\n        // Nối chuỗi với số bằng dấu +\n        System.out.println(\"Năm \" + 2026 + \" tôi học Java!\");\n\n        // Format đẹp hơn với printf\n        System.out.printf(\"Xin chào, %s! Bạn %d tuổi.%n\", \"Raize\", 20);\n        // %s = chuỗi, %d = số nguyên, %n = xuống dòng\n    }\n}\n```\n\nKết quả:\n```\nXin chào Java!\nTôi đang học Java từ đầu!\n2026\n3.14\ntrue\nNăm 2026 tôi học Java!\nXin chào, Raize! Bạn 20 tuổi.\n```\n\n---\n\n## 6. Comment — Ghi Chú Trong Code\n\nComment là những dòng mà Java **hoàn toàn bỏ qua** khi compile. Chúng chỉ dành cho con người đọc. Hãy tập viết comment từ sớm — đây là thói quen phân biệt lập trình viên giỏi.\n\n```java\n// Đây là comment một dòng — Java bỏ qua hoàn toàn\n\n/*\n * Đây là comment nhiều dòng\n * Dùng khi cần giải thích dài\n */\n\n/**\n * Đây là Javadoc — dùng để tạo tài liệu tự động cho class/method\n * IDE sẽ hiển thị nội dung này khi bạn hover lên tên method\n */\n```\n\n> 💡 **Mẹo tôi hay dùng:** Khi bạn đang debug, hãy comment tạm dòng code đang bị lỗi thay vì xóa đi. Sau khi fix xong mới xóa. Tránh mất code chưa biết có cần lại không.\n\n---\n\n## 7. Quy Tắc Đặt Tên — Học Ngay Từ Bài 1\n\nJava có quy tắc đặt tên mà **cả thế giới lập trình Java đều tuân theo**. Bạn học từ đầu đúng sẽ không phải sửa thói quen xấu sau này.\n\n| Loại | Quy tắc | Ví dụ đúng | Ví dụ sai |\n|------|---------|-----------|-----------|\n| **Class** | ViếtHoaChữĐầu (PascalCase) | `HelloWorld`, `NguoiDung` | `helloWorld`, `nguoi_dung` |\n| **method** | chữĐầuThường (camelCase) | `tinhTien()`, `inThongTin()` | `TinhTien()`, `tinh_tien()` |\n| **biến** | chữĐầuThường (camelCase) | `soLuong`, `tenHang` | `SoLuong`, `so_luong` |\n| **HẰNG SỐ** | VIẾT_HOA_GẠCHDưới | `MAX_SIZE`, `PI` | `maxSize`, `pi` |\n\n---\n\n## Tóm Tắt — Bài 01\n\nTôi muốn bạn ghi nhớ 4 điều sau bài này:\n\n```\n✅ JDK = Bộ công cụ để lập trình Java (bao gồm cả JRE và JVM)\n✅ JVM = Lý do Java \"write once, run anywhere\" — máy ảo chạy bytecode\n✅ Mọi chương trình Java bắt đầu từ: public static void main(String[] args)\n✅ Tên class PHẢI khớp tên file .java\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBạn đã viết được chương trình Java đầu tiên. Nhưng in ra chữ cứng thế này thì chán lắm, phải không? Bài tiếp theo Tôi sẽ dạy bạn cách dùng **biến** để lưu trữ dữ liệu — từ đó chương trình mới thực sự có ý nghĩa.\n\n👉 **[Bài 02: Biến & Kiểu Dữ Liệu](../bai-02-bien-kieu-du-lieu/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 01: Giới Thiệu Java\n\n> 🎯 **Bối cảnh dự án:** Mọi bài tập đều gắn với việc xây dựng **RaizeShop** — một hệ thống cửa hàng game items online.\n\n---\n\n## 🔴 Bài Tập 1: Trang Chào Mừng Ứng Dụng ⭐\n\n**Bối cảnh thực tế:** Mọi ứng dụng thương mại đều có màn hình splash/welcome khi khởi động. Đây là thứ đầu tiên người dùng thấy.\n\n**Yêu cầu:** Tạo file `WelcomeScreen.java` in ra màn hình chào mừng khi khởi động RaizeShop:\n\n```\n╔══════════════════════════════════╗\n║         RAIZE SHOP v1.0          ║\n║    Chợ Game Items Uy Tín #1      ║\n╠══════════════════════════════════╣\n║  ✅ Mua bán an toàn, nhanh chóng ║\n║  ✅ Hỗ trợ 24/7                  ║\n║  ✅ 10,000+ sản phẩm             ║\n╚══════════════════════════════════╝\nĐang khởi động hệ thống...\nPhiên bản: 1.0.0 | Java 21\n```\n\n**Điều cần học:**\n- Dùng `System.out.println()` in nhiều dòng\n- Tạo border bằng ký tự `╔ ╗ ╚ ╝ ║ ═`\n- Cách chạy file Java từ terminal\n\n---\n\n## 🔴 Bài Tập 2: Thông Tin Sản Phẩm Đầu Tiên ⭐\n\n**Bối cảnh thực tế:** Một trang product detail trong shop cần hiển thị thông tin có format rõ ràng.\n\n**Yêu cầu:** Tạo file `ProductDetail.java` hiển thị thông tin 1 sản phẩm:\n\n```\n==========================================\n📦 CHI TIẾT SẢN PHẨM\n==========================================\nTên sản phẩm : Kiếm Rồng Lửa +10\nDanh mục     : Vũ khí\nGiá          : 1,500,000 đ\nTình trạng   : Còn hàng\nNgười bán    : DragonMaster99\nĐánh giá     : ⭐⭐⭐⭐⭐ (5.0/5.0)\n==========================================\n💬 Liên hệ ngay để mua!\n==========================================\n```\n\n**Điều cần học:**\n- `System.out.printf()` để format có căn chỉnh\n- `%s` (string), `%d` (int), `%n` (newline), `%,.0f` (số có dấu phẩy)\n- In ký tự emoji trong Java\n\n---\n\n## 🟡 Bài Tập 3: Tính Phí Giao Dịch ⭐⭐\n\n**Bối cảnh thực tế:** Sàn giao dịch game items thu phí 5% từ người bán. Cần hiển thị ngay cho người bán biết họ nhận được bao nhiêu khi đăng sản phẩm.\n\n**Yêu cầu:** Tạo `FeeCalculator.java` tính phí:\n\n```\n=== TÍNH PHÍ GIAO DỊCH ===\nGiá đăng bán : 2,000,000 đ\nPhí sàn (5%) :   100,000 đ\n---------------------------\nBạn nhận được: 1,900,000 đ\n```\n\nTính thêm:\n- Nếu người bán là VIP: phí giảm còn 3%\n- Nếu giá trị > 10,000,000 đ: phí giảm còn 2%\n\n**Gợi ý code:**\n```java\ndouble giaBan = 2_000_000;\ndouble phiTram = 5.0;\ndouble phi = giaBan * phiTram / 100;\ndouble nhanDuoc = giaBan - phi;\n\nSystem.out.printf(\"Giá đăng bán : %,.0f đ%n\", giaBan);\nSystem.out.printf(\"Phí sàn (%.0f%%) : %,.0f đ%n\", phiTram, phi);\n```\n\n---\n\n## 🔴 Bài Tập 4: Receipt Generator ⭐⭐⭐\n\n**Bối cảnh thực tế:** Sau mỗi giao dịch thành công, hệ thống tự động tạo receipt (biên lai). Đây là tính năng thực tế trong mọi sàn thương mại điện tử.\n\n**Yêu cầu:** Tạo `Receipt.java` tạo biên lai giao dịch:\n\n```\n╔══════════════════════════════════════╗\n║           BIÊN LAI GIAO DỊCH         ║\n╠══════════════════════════════════════╣\n║ Mã GD     : RZ-2024-08-001           ║\n║ Thời gian : 03/04/2024 15:30:00      ║\n╠══════════════════════════════════════╣\n║ SẢN PHẨM                            ║\n║   Kiếm Rồng +10                     ║\n║   Nhẫn Ma Lực                       ║\n╠══════════════════════════════════════╣\n║ Tổng tiền : 2,300,000 đ             ║\n║ Phí (5%)  :   115,000 đ             ║\n║ THANH TOÁN: 2,415,000 đ             ║\n╠══════════════════════════════════════╣\n║ Trạng thái: ✅ THÀNH CÔNG           ║\n╚══════════════════════════════════════╝\n```\n\n**Thử thách thêm:** Dùng `String.repeat()` để tạo đường kẻ động thay vì gõ cứng.\n\n---\n\n## 🟡 Bài Tập 5: System Info Log ⭐\n\n**Bối cảnh thực tế:** Mỗi khi server khởi động, hệ thống ghi log thông tin môi trường. Đây là pattern phổ biến trong Startup class của Spring Boot.\n\n**Yêu cầu:** Tạo `SystemInfo.java` in ra thông tin môi trường Java:\n\n```java\npublic class SystemInfo {\n    public static void main(String[] args) {\n        // Dùng System.getProperty() để lấy thông tin hệ thống\n        System.out.println(\"=== RAIZESHOP SERVER INFO ===\");\n\n        // In ra:\n        // Java version         : 21.0.1\n        // Java vendor          : Oracle Corporation\n        // OS Name              : Windows 11\n        // OS Architecture      : amd64\n        // Available Processors : 8\n        // Max Memory           : 1,024 MB\n        // User Home            : C:\\Users\\raize\n        // Working Directory    : C:\\projects\\raizeshop\n        // =============================\n        // Server Status        : ✅ READY\n\n        // TODO: Lấy từng property và in ra\n        // System.getProperty(\"java.version\")\n        // System.getProperty(\"os.name\")\n        // Runtime.getRuntime().availableProcessors()\n        // Runtime.getRuntime().maxMemory() / (1024 * 1024) + \" MB\"\n    }\n}\n```\n\n**Bonus:** Thêm điều kiện: nếu RAM < 256 MB → in cảnh báo `⚠️ LOW MEMORY MODE`.\n\n---\n\n## 🔴 Bài Tập 6 (BONUS): ASCII Art Logo ⭐⭐\n\n**Bối cảnh thực tế:** Nhiều CLI tools (Spring Boot, NestJS, Maven) in ASCII art logo khi start. Đây là cách tạo \"brand identity\" cho application.\n\n**Yêu cầu:** Tạo `AsciiLogo.java` in logo RAIZE khi khởi động:\n\n```\n     ____      _    ___ _________\n    |  _ \\    / \\  |_ _|__  / ___|   _\n    | |_) |  / _ \\  | |  / /| |  | |_| |  _   ___\n    |  _ <  / ___ \\ | | / /_| |__|  _  | | \\ / _ \\\n    |_| \\_\\/_/   \\_\\___/____|\\____|_| |_|_| \\_\\___/\n\n    ╔══════════════════════════════════════════╗\n    ║  Java Edition v1.0 — Built with ❤️        ║\n    ╚══════════════════════════════════════════╝\n```\n\n**Gợi ý:** Vào [patorjk.com/software/taag](https://patorjk.com/software/taag) để generate ASCII art, sau đó dùng text block (Java 15+) để nhúng vào code:\n\n```java\nString logo = \"\"\"\n     ____      _    ___ _________\n    |  _ \\\\    / \\\\  |_ _|__  / ___|\n    ...\n    \"\"\";\nSystem.out.println(logo);\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\nSau khi làm xong, trả lời như một **junior dev giải thích cho team**:\n\n- [ ] Tại sao phải dùng `%,.0f` mà không phải `%d` để in tiền VND đẹp?\n- [ ] Khi chạy `javac`, lỗi `error: class WelcomeScreen is public, should be declared in a file named WelcomeScreen.java` nghĩa là gì?\n- [ ] Tại sao không nên viết số `1500000` thẳng vào code mà nên dùng `1_500_000`?\n- [ ] `System.out.print` vs `println` vs `printf` — dùng cái nào trong trường hợp nào?\n- [ ] Bài 5: `System.getProperty()` vs biến môi trường `System.getenv()` — khác nhau thế nào? Khi nào dùng cái nào trong deployment?\n\n---\n\n👉 **Tiếp theo:** [Bài 02 – Biến và Kiểu Dữ Liệu](../bai-02-bien-kieu-du-lieu/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Thành phần nào trực tiếp thực thi mã bytecode (.class) của Java?",
        "options": [
          "JDK",
          "JRE",
          "JVM",
          "javac (compiler)"
        ],
        "answer": 2,
        "explanation": "JVM (Java Virtual Machine) là thành phần cốt lõi thông dịch và thực thi bytecode thành mã máy của hệ điều hành tương ứng."
      },
      {
        "q": "Tại sao Java được mệnh danh là 'Write Once, Run Anywhere'?",
        "options": [
          "Code Java tự biên dịch ra mã máy của hệ điều hành đó.",
          "Bytecode Java chạy trên JVM, mỗi hệ điều hành cài JVM phù hợp là chạy được.",
          "Java không dùng compiler mà chỉ dùng thông dịch từ file .java.",
          "Java chỉ hỗ trợ Windows vì Windows có thị phần lớn nhất."
        ],
        "answer": 1,
        "explanation": "Mã nguồn Java biên dịch sang Bytecode - mã trung gian. JVM trên mỗi hệ điều hành dịch bytecode sang mã máy bản địa."
      },
      {
        "q": "Quy tắc đặt tên file mã nguồn Java chứa một public class là gì?",
        "options": [
          "Đặt tên gì cũng được, miễn có đuôi .class",
          "Tên file phải giống hoàn toàn tên public class (phân biệt hoa thường) và có đuôi .java",
          "Tên file viết thường hoàn toàn, tên class viết hoa",
          "Tên file phải bắt đầu bằng từ khóa 'Class'"
        ],
        "answer": 1,
        "explanation": "Quy tắc bắt buộc: tên file mã nguồn phải trùng hoàn toàn với tên public class trong nó (ví dụ: public class HelloWorld → HelloWorld.java)."
      },
      {
        "q": "JDK (Java Development Kit) bao gồm những thành phần gì?",
        "options": [
          "Chỉ bao gồm JVM",
          "Chỉ bao gồm JRE",
          "Bao gồm JRE + các công cụ phát triển như javac, javadoc, jar",
          "Chỉ bao gồm trình biên dịch javac"
        ],
        "answer": 2,
        "explanation": "JDK là bộ công cụ phát triển đầy đủ gồm JRE (chứa JVM) cộng với các công cụ như javac (compiler), javadoc, jar, jdb (debugger)."
      },
      {
        "q": "File .class chứa loại code nào?",
        "options": [
          "Mã nguồn Java (.java)",
          "Mã máy trực tiếp của CPU",
          "Bytecode - mã trung gian mà JVM hiểu được",
          "Mã nhị phân 0/1 thuần túy"
        ],
        "answer": 2,
        "explanation": "File .class chứa Bytecode - là mã trung gian được tạo ra sau khi biên dịch. JVM sẽ dịch bytecode này sang mã máy khi chạy chương trình."
      },
      {
        "q": "Lệnh nào dùng để biên dịch file HelloWorld.java thành bytecode?",
        "options": [
          "java HelloWorld.java",
          "javac HelloWorld.java",
          "run HelloWorld.java",
          "compile HelloWorld.java"
        ],
        "answer": 1,
        "explanation": "Lệnh `javac HelloWorld.java` gọi trình biên dịch Java để biên dịch file .java thành file .class (bytecode)."
      },
      {
        "q": "Lệnh nào dùng để chạy chương trình Java đã biên dịch?",
        "options": [
          "javac HelloWorld",
          "java HelloWorld.class",
          "java HelloWorld",
          "run HelloWorld"
        ],
        "answer": 2,
        "explanation": "Lệnh `java HelloWorld` (không cần đuôi .class) sẽ khởi động JVM và thực thi bytecode trong file HelloWorld.class."
      },
      {
        "q": "Java thuộc loại ngôn ngữ lập trình nào?",
        "options": [
          "Ngôn ngữ thông dịch thuần túy (Interpreted)",
          "Ngôn ngữ biên dịch thuần túy (Compiled)",
          "Ngôn ngữ kết hợp biên dịch + thông dịch (Compiled + Interpreted)",
          "Ngôn ngữ kịch bản (Scripting)"
        ],
        "answer": 2,
        "explanation": "Java là ngôn ngữ kết hợp: Giai đoạn 1 biên dịch .java → .class (bytecode). Giai đoạn 2 JVM thông dịch bytecode sang mã máy khi chạy."
      },
      {
        "q": "Phương thức main trong Java có chữ ký đúng là gì?",
        "options": [
          "public void main(String args)",
          "public static void main(String[] args)",
          "static main(String args[])",
          "void main()"
        ],
        "answer": 1,
        "explanation": "Chữ ký chuẩn là `public static void main(String[] args)`. JVM sẽ tìm đúng chữ ký này để khởi động chương trình."
      },
      {
        "q": "System.out.println() và System.out.print() khác nhau điểm gì?",
        "options": [
          "println() in hoa còn print() in thường",
          "println() in xong tự xuống dòng, print() không xuống dòng",
          "Chúng hoàn toàn giống nhau",
          "print() nhanh hơn println()"
        ],
        "answer": 1,
        "explanation": "`println()` in chuỗi rồi thêm ký tự xuống dòng `\\n`. `print()` chỉ in chuỗi mà không xuống dòng."
      },
      {
        "q": "Kiểu của comment một dòng trong Java là gì?",
        "options": [
          "/* comment */",
          "# comment",
          "// comment",
          "<!-- comment -->"
        ],
        "answer": 2,
        "explanation": "Java dùng `//` để ghi chú một dòng. `/* ... */` để ghi chú nhiều dòng. `/** ... */` là Javadoc comment."
      },
      {
        "q": "Package trong Java dùng để làm gì?",
        "options": [
          "Tăng tốc độ chạy chương trình",
          "Tổ chức các class theo không gian tên (namespace) để tránh xung đột tên và dễ quản lý",
          "Nén file .java lại cho nhỏ hơn",
          "Tự động tạo tài liệu code"
        ],
        "answer": 1,
        "explanation": "Package tổ chức các class liên quan vào cùng một thư mục/không gian tên. Ví dụ: `com.raizeshop.service` chứa các class service của RaizeShop."
      },
      {
        "q": "Điều gì xảy ra khi ta gọi System.exit(0) trong chương trình Java?",
        "options": [
          "Chương trình bị treo",
          "JVM kết thúc chương trình với mã thoát 0 (thành công)",
          "Hệ điều hành bị tắt",
          "Chương trình tiếp tục chạy vòng lặp vô tận"
        ],
        "answer": 1,
        "explanation": "`System.exit(0)` yêu cầu JVM kết thúc toàn bộ chương trình. Tham số 0 nghĩa là thoát bình thường (thành công)."
      }
    ],
    "practice": {
      "fileName": "WelcomeScreen.java",
      "instructions": "### Yêu cầu:\nTạo file `WelcomeScreen.java` in ra màn hình chào mừng của cửa hàng **RAIZE SHOP** khi khởi động.\nĐầu ra console phải chứa chính xác dòng `RAIZE SHOP v1.0` và các cam kết bán hàng.\n\n### Mẫu đầu ra mong muốn:\n```\n╔══════════════════════════════════╗\n║         RAIZE SHOP v1.0          ║\n║    Chợ Game Items Uy Tín #1      ║\n╠══════════════════════════════════╣\n║  ✅ Mua bán an toàn, nhanh chóng ║\n║  ✅ Hỗ trợ 24/7                  ║\n║  ✅ 10,000+ sản phẩm             ║\n╚══════════════════════════════════╝\nĐang khởi động hệ thống...\nPhiên bản: 1.0.0 | Java 21\n```\n",
      "starterCode": "public class WelcomeScreen {\n    public static void main(String[] args) {\n        // Viết các câu lệnh System.out.println() của em ở đây\n        System.out.println(\"╔══════════════════════════════════╗\");\n        System.out.println(\"║         RAIZE SHOP v1.0          ║\");\n        System.out.println(\"║    Chợ Game Items Uy Tín #1      ║\");\n        System.out.println(\"╠══════════════════════════════════╣\");\n        System.out.println(\"║  ✅ Mua bán an toàn, nhanh chóng ║\");\n        System.out.println(\"║  ✅ Hỗ trợ 24/7                  ║\");\n        System.out.println(\"║  ✅ 10,000+ sản phẩm             ║\");\n        System.out.println(\"╚══════════════════════════════════╝\");\n        System.out.println(\"Đang khởi động hệ thống...\");\n        System.out.println(\"Phiên bản: 1.0.0 | Java 21\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"class WelcomeScreen\")) {\r\n        return { pass: false, msg: \"Tên lớp phải là 'WelcomeScreen'!\" };\r\n      }\r\n      if (!code.includes(\"public static void main\")) {\r\n        return { pass: false, msg: \"Thiếu phương thức main khởi tạo!\" };\r\n      }\r\n      if (!output.includes(\"RAIZE SHOP v1.0\")) {\r\n        return { pass: false, msg: \"Output console thiếu chuỗi định danh 'RAIZE SHOP v1.0'!\" };\r\n      }\r\n      if (!output.includes(\"Mua bán an toàn\") || !output.includes(\"10,000+ sản phẩm\")) {\r\n        return { pass: false, msg: \"Chưa in đầy đủ các cam kết của cửa hàng trong banner!\" };\r\n      }\r\n      return { pass: true, msg: \"Quá tốt! Banner khởi động RaizeShop của em đã đạt chuẩn và in ra rất đẹp mắt!\" };\r\n    }"
    }
  },
  {
    "id": 2,
    "title": "Biến & Kiểu Dữ Liệu",
    "phase": "Phase 1: Fundamentals",
    "time": "3 giờ",
    "difficulty": "Dễ",
    "theory": "# Bài 02: Biến & Kiểu Dữ Liệu\n\n> 🟢 **Phase 1 – Bài 2/7** | Thời gian: ~3 giờ\n\n---\n\nBài trước bạn đã in được chữ ra màn hình — nhưng dữ liệu đó được gõ thẳng vào code, cứng đơ. Bài này Tôi sẽ dạy bạn cách **lưu trữ dữ liệu vào biến** để chương trình linh hoạt hơn rất nhiều.\n\nHãy tưởng tượng biến như một **chiếc hộp có nhãn dán**. Bạn có thể bỏ bất cứ thứ gì vào hộp, lấy ra, hoặc thay thế nội dung bên trong — miễn là đúng kiểu dữ liệu của hộp đó.\n\n---\n\n## 1. Khai Báo Biến\n\n```java\nint tuoi = 20;\n//  ↑     ↑  ↑\n//Kiểu  Tên  Giá trị\n```\n\nĐây là cú pháp cơ bản. Nhưng cái quan trọng không phải cú pháp — mà là **kiểu dữ liệu**. Java bắt buộc bạn phải nói trước: \"Hộp này chứa số nguyên\" hay \"Hộp này chứa chuỗi chữ\". Không như Python hay JavaScript cho bạn bỏ bất cứ thứ gì vào. Đây là điểm mạnh của Java — máy tính biết trước kiểu dữ liệu nên chạy nhanh và ít lỗi hơn.\n\n---\n\n## 2. 8 Kiểu Dữ Liệu Nguyên Thủy (Primitive Types)\n\nJava có đúng 8 kiểu nguyên thủy. Tôi sẽ giải thích từng cái theo thứ tự từ hay dùng nhất:\n\n### Nhóm số nguyên\n\n```java\nint soLuong = 1000;         // Dùng nhiều nhất – đủ cho hầu hết mọi trường hợp\nlong soTienVND = 5_000_000_000L;  // Số rất lớn (hậu tố L bắt buộc!)\nbyte tuoi = 20;             // Nhỏ gọn nhưng giới hạn -128 đến 127\nshort soItem = 30000;       // Ít gặp trong thực tế\n```\n\n> ⚠️ **Hay nhầm:** Dấu gạch dưới `_` trong số (như `5_000_000_000L`) là hợp lệ từ Java 7. Java tự bỏ qua nó khi compile — chỉ để bạn đọc cho dễ. Rất tiện với số tiền VND!\n\n### Nhóm số thực\n\n```java\ndouble pi = 3.14159265358979;  // Dùng cho số thực – chính xác hơn float\nfloat nhietDo = 36.5f;          // Hậu tố f bắt buộc, ít dùng hơn double\n```\n\ntôi gần như luôn dùng `double`, không dùng `float`. Lý do đơn giản: `double` chính xác hơn và máy tính hiện đại gần như không tốn thêm chi phí gì khi dùng `double`.\n\n> ⚠️ **Cạm bẫy kinh điển với số thực:**\n> ```java\n> System.out.println(0.1 + 0.2);\n> // Kết quả: 0.30000000000000004  ← Không phải 0.3!\n> ```\n> Tại sao? Vì máy tính dùng hệ nhị phân, không biểu diễn chính xác tất cả số thực. Nếu bạn làm app tài chính, hãy dùng `BigDecimal` thay vì `double`. Bạn sẽ học `BigDecimal` sau.\n\n### Ký tự và Boolean\n\n```java\nchar kyTu = 'A';         // Một ký tự đơn — dùng nháy đơn, không phải nháy đôi!\nboolean daDangNhap = true;  // Chỉ có true hoặc false\n```\n\nBạn sẽ dùng `boolean` rất nhiều khi làm điều kiện if/else. Còn `char` thì ít gặp hơn.\n\n---\n\n## 3. Bảng Tóm Tắt 8 Kiểu\n\n| Kiểu | Kích thước | Phạm vi | Khi nào dùng |\n|------|-----------|---------|-------------|\n| `byte` | 1 byte | -128 → 127 | Lưu giá trị nhỏ (hiếm dùng) |\n| `short` | 2 bytes | -32,768 → 32,767 | Hiếm dùng |\n| **`int`** | 4 bytes | ±2.1 tỷ | **Số nguyên thông thường** |\n| `long` | 8 bytes | Rất lớn | ID, timestamp, tiền VND lớn |\n| `float` | 4 bytes | ~7 chữ số | Ít dùng |\n| **`double`** | 8 bytes | ~15 chữ số | **Số thực thông thường** |\n| `char` | 2 bytes | Một ký tự Unicode | Xử lý ký tự đơn |\n| `boolean` | 1 bit | true/false | Điều kiện |\n\n---\n\n## 4. Kiểu `String` — Không Phải Primitive Nhưng Dùng Liên Tục\n\n```java\nString ten = \"Nguyễn Văn A\";\nString rong = \"\";          // String rỗng\nString chuaCoGi = null;   // null = không trỏ đến gì cả (cẩn thận khi dùng!)\n```\n\n`String` không phải kiểu nguyên thủy — nó là một **class**. Nhưng Java ưu ái nó đặc biệt nên bạn dùng nó giống như primitive. Sự khác biệt quan trọng là: khi so sánh String, **không được dùng `==`**!\n\n```java\nString s1 = \"hello\";\nString s2 = \"hello\";\n\nSystem.out.println(s1 == s2);         // Có thể true, có thể false — KHÔNG ĐÁNG TIN!\nSystem.out.println(s1.equals(s2));    // ✅ Luôn đúng — đây là cách đúng\nSystem.out.println(s1.equalsIgnoreCase(\"HELLO\")); // true — không phân biệt hoa/thường\n```\n\n> 💡 **Mẹo nhớ:** `==` so sánh **địa chỉ trong memory**. `.equals()` so sánh **nội dung**. Với String bạn cần so sánh nội dung, nên luôn dùng `.equals()`.\n\n---\n\n## 5. Hằng Số với `final`\n\nĐôi khi bạn có giá trị không bao giờ thay đổi — như số PI, thuế suất, tên ứng dụng. Hãy khai báo nó là hằng số:\n\n```java\nfinal double PI = 3.14159265358979;\nfinal int THUE_VAT = 10;  // 10%\nfinal String TEN_APP = \"RaizeShop\";\n\nPI = 3.14;  // ❌ Lỗi compile ngay! final = không thay đổi được\n```\n\nQuy tắc đặt tên hằng số: **VIẾT_HOA_VÀ_DÙNG_GẠCH_DƯỚI**. Java community đặt ra quy tắc này để chỉ nhìn vào tên là biết ngay đây là hằng số.\n\n---\n\n## 6. `var` — Tự Suy Kiểu (Java 10+)\n\n```java\nvar ten = \"Raize\";        // Java tự hiểu là String\nvar tuoi = 20;            // Java tự hiểu là int\nvar diemTB = 8.5;         // Java tự hiểu là double\n\n// var chỉ dùng được trong phạm vi method (local variable)\n// Không dùng được cho field của class\n```\n\n`var` giúp code ngắn hơn khi kiểu dữ liệu đã rõ ràng từ ngữ cảnh. Nhưng tôi khuyên: khi mới học, **đừng dùng `var`** — hãy ghi rõ kiểu để tự luyện não.\n\n---\n\n## 7. Toán Tử\n\n### Số học\n\n```java\nint a = 10, b = 3;\n\nSystem.out.println(a + b);   // 13\nSystem.out.println(a - b);   // 7\nSystem.out.println(a * b);   // 30\nSystem.out.println(a / b);   // 3  ← Chú ý! Chia nguyên, không phải 3.33!\nSystem.out.println(a % b);   // 1  ← Modulo: phần dư của phép chia\n```\n\n> ⚠️ **Học sinh sai nhiều nhất chỗ này:** `10 / 3 = 3`, không phải `3.33`! Đây là **chia nguyên** vì cả hai đều là `int`. Muốn kết quả thập phân, phải có ít nhất một số thực:\n> ```java\n> System.out.println(10.0 / 3);   // 3.3333...\n> System.out.println((double)10 / 3); // Ép kiểu — cũng ra 3.3333...\n> ```\n\n### Gán kết hợp — viết tắt tiện lợi\n\n```java\nint x = 10;\nx += 5;   // x = x + 5  → 15\nx -= 3;   // x = x - 3  → 12\nx *= 2;   // x = x * 2  → 24\nx /= 4;   // x = x / 4  → 6\nx %= 4;   // x = x % 4  → 2\n```\n\n### Tăng giảm — `++` và `--`\n\n```java\nint x = 5;\nSystem.out.println(x++);  // In ra 5, SAU ĐÓ mới tăng → x = 6\nSystem.out.println(++x);  // Tăng TRƯỚC → x = 7, rồi in ra 7\n```\n\ntôi biết hai cái này hơi rối. Mẹo đơn giản: `++x` (trước) = tăng rồi mới lấy. `x++` (sau) = lấy rồi mới tăng. Trong thực tế, tôi hầu như chỉ dùng trong vòng `for` nên hiếm khi cần phân biệt.\n\n### So sánh và Logic\n\n```java\n// So sánh — kết quả luôn là boolean\nint a = 10, b = 5;\nSystem.out.println(a > b);    // true\nSystem.out.println(a == b);   // false\nSystem.out.println(a != b);   // true\n\n// Logic\nboolean t = true, f = false;\nSystem.out.println(t && f);   // false — AND: cả hai phải true\nSystem.out.println(t || f);   // true  — OR: ít nhất một true\nSystem.out.println(!t);       // false — NOT: đảo ngược\n\n// Ví dụ thực tế:\nint tuoi = 20;\nboolean coTheLaiXe = (tuoi >= 18) && coGiayPhep;\n```\n\n---\n\n## 8. Type Casting — Ép Kiểu\n\nĐôi khi bạn cần chuyển kiểu dữ liệu này sang kiểu khác:\n\n```java\n// Tự động (widening): từ nhỏ → lớn, an toàn\nint i = 42;\ndouble d = i;         // int tự chuyển thành double: 42.0\n\n// Ép buộc (narrowing): từ lớn → nhỏ, CÓ THỂ mất dữ liệu\ndouble pi = 3.99;\nint piInt = (int) pi;  // Cắt phần thập phân thẳng, KHÔNG làm tròn!\nSystem.out.println(piInt);  // 3 (không phải 4!)\n```\n\n> 💡 **Ghi nhớ:** `(int) 3.99 = 3`, không phải 4. Java cắt phần lẻ chứ không làm tròn. Nhiều bạn nghĩ Java sẽ làm tròn — sai!\n\n---\n\n## 9. Ví Dụ Thực Tế: Hóa Đơn Mua Hàng\n\nBây giờ hãy kết hợp tất cả lại. Tôi sẽ viết một chương trình tính hóa đơn đơn giản:\n\n```java\npublic class HoaDon {\n    public static void main(String[] args) {\n        // Thông tin hàng\n        String tenSanPham = \"Kiếm Rồng Cấp 10\";\n        int soLuong = 3;\n        double donGia = 150_000.0;\n\n        // Tính toán\n        double tongTien = soLuong * donGia;\n        double giamGia10Phan = tongTien * 0.10;  // Giảm 10%\n        double thanhToan = tongTien - giamGia10Phan;\n\n        // In hóa đơn\n        System.out.println(\"========= HÓA ĐƠN =========\");\n        System.out.printf(\"Sản phẩm  : %s%n\", tenSanPham);\n        System.out.printf(\"Số lượng  : %d%n\", soLuong);\n        System.out.printf(\"Đơn giá   : %,.0f đ%n\", donGia);\n        System.out.printf(\"Tổng tiền : %,.0f đ%n\", tongTien);\n        System.out.printf(\"Giảm 10%%  : -%,.0f đ%n\", giamGia10Phan);\n        System.out.println(\"----------------------------\");\n        System.out.printf(\"Thành tiền: %,.0f đ%n\", thanhToan);\n    }\n}\n```\n\nHãy **tự chạy** và thay thử số liệu khác nhau. Bạn thử thay `soLuong = 5`, `donGia = 250_000` xem kết quả ra sao.\n\n---\n\n## 10. Bản Chất Hoạt Động Của Biến Trong Bộ Nhớ (Stack vs Heap) & Các Bí Mật Của Java\n\nĐây là phần **hay và cốt lõi nhất** của Java mà các lập trình viên thường bỏ qua. Khi bạn khai báo một biến, Java quản lý và phân bổ bộ nhớ cho nó như thế nào?\n\nTrong Java, bộ nhớ của ứng dụng được chia thành hai vùng chính: **Stack (Ngăn xếp)** và **Heap (Đống)**.\n\n```text\n       BỘ NHỚ JVM RUNTIME\n┌─────────────────────────────────┐\n│  STACK MEMORY                   │\n│  (Quản lý các Stack Frame)      │\n│  - Lưu Primitives (int, double) │\n│  - Lưu địa chỉ biến tham chiếu  │\n│                                 │\n│   [main() Stack Frame]          │\n│   ├── age: 20                   │\n│   └── nameRef: 0x77A  ──────────┼───┐\n└─────────────────────────────────┘   │\n                                      │ (Tham chiếu/Trỏ sang)\n┌─────────────────────────────────┐   │\n│  HEAP MEMORY                    │   │\n│  (Lưu đối tượng thực tế)        │   │\n│  - Lưu Objects (String, Array)  │   │\n│  - String Constant Pool         │   │\n│                                 │   │\n│   [0x77A] ───────────           │   │\n│   └── \"Nguyễn Văn A\"  ◄─────────┼───┘\n└─────────────────────────────────┘\n```\n\n### A. Biến được lưu như thế nào và lưu ở đâu?\n\n| Loại biến | Ví dụ | Vị trí trong RAM | Cách hoạt động thực tế |\n| :--- | :--- | :--- | :--- |\n| **Biến nguyên thủy cục bộ** (Local Primitives) | `int age = 20;` khai báo trong hàm. | **Stack Memory** | Được cấp phát trực tiếp trên Stack Frame của luồng thực thi. Truy cập siêu nhanh. Bị xóa sạch ngay khi hàm thoát ra khỏi Stack (LIFO). |\n| **Biến tham chiếu cục bộ** (Local References) | `String name = \"Raize\";` khai báo trong hàm. | **Địa chỉ (0x...) trên Stack, Đối tượng trên Heap** | Biến `name` chỉ là một con trỏ (4/8 bytes) nằm trên Stack, chứa địa chỉ ô nhớ dẫn tới đối tượng thật trên Heap. |\n| **Biến thuộc tính Class** (Instance Variables) | `double price;` khai báo trực tiếp trong class. | **Heap Memory** | Luôn đi liền với đối tượng chứa nó. Khi đối tượng được tạo bằng `new`, các thuộc tính này nằm hoàn toàn trên Heap. |\n\n### B. Minh họa thực tế: Pass-By-Value (Luôn luôn truyền tham trị)\n\nNhiều lập trình viên nghĩ rằng Java truyền đối tượng bằng tham chiếu. Thực tế, **Java luôn truyền tham trị (Pass-By-Value)**. Java copy giá trị khi truyền vào phương thức.\n\nHãy xem ví dụ thực tế cực kỳ thú vị sau:\n\n```java\npublic class TestMemory {\n    public static void main(String[] args) {\n        int number = 10;\n        Product p = new Product(\"Kiếm Rồng\", 100);\n\n        changeData(number, p);\n\n        System.out.println(\"Number sau hàm: \" + number); // Vẫn là 10 (bản sao bị thay đổi, bản gốc trên Stack chính giữ nguyên)\n        System.out.println(\"Tên sản phẩm sau hàm: \" + p.name); // Bị đổi thành \"Kiếm Gỗ\"! Tại sao?\n    }\n\n    public static void changeData(int num, Product prod) {\n        num = 99; // Thay đổi trị trên bản sao của Stack frame changeData\n        prod.name = \"Kiếm Gỗ\"; // Thay đổi thuộc tính của vùng nhớ Heap mà prod trỏ tới\n        \n        // Trực quan hóa:\n        // prod = new Product(\"Khiên Bạc\", 500); // Nếu gán thế này, prod trỏ sang vùng Heap mới. p ngoài main không bị ảnh hưởng!\n    }\n}\n\nclass Product {\n    String name;\n    int price;\n    Product(String name, int price) { this.name = name; this.price = price; }\n}\n```\n\n### C. String Constant Pool (Bộ tối ưu chuỗi của Java)\n\nTại sao lại có sự khác biệt giữa so sánh `==` và `.equals()`? Đó là do **String Constant Pool** nằm trên Heap.\n\n```java\nString s1 = \"Raize\"; // Nằm trong String Constant Pool\nString s2 = \"Raize\"; // Trỏ trực tiếp tới chuỗi đã có sẵn trong Pool để tiết kiệm RAM\nString s3 = new String(\"Raize\"); // Bắt buộc tạo một đối tượng mới nằm ngoài Pool trên Heap\n\nSystem.out.println(s1 == s2); // true (Chung địa chỉ ô nhớ trong Pool!)\nSystem.out.println(s1 == s3); // false (Khác địa chỉ ô nhớ!)\nSystem.out.println(s1.equals(s3)); // true (So sánh nội dung ký tự thực tế)\n```\n\n### D. IEEE-754: Sự cạm bẫy của kiểu double/float trong tính toán tiền tệ\n\nHãy chạy thử đoạn code sau trong Sandbox:\n```java\nSystem.out.println(1.0 - 0.9);\n```\nKết quả in ra sẽ là: `0.09999999999999998` thay vì `0.1` tròn trĩnh! \n* **Tại sao?** Vì máy tính biểu diễn số thực bằng chuẩn nhị phân IEEE-754. Hệ nhị phân không thể biểu diễn chính xác các phân số thập phân có mẫu số không phải là lũy thừa của 2 (như `1/10 = 0.1`).\n* **Hậu quả:** Nếu dự án **RaizeShop** dùng `double` để tính toán hàng triệu giao dịch, sai số tích tụ sẽ gây thất thoát tiền tệ nghiêm trọng.\n* **Giải pháp:** Sử dụng `BigDecimal` hoặc quy đổi toàn bộ tiền tệ về đơn vị nhỏ nhất (ví dụ: `long` tính theo đơn vị Đồng/Cents thay vì Triệu/Dollar) để tính toán số nguyên tuyệt đối.\n\n### E. Bộ nhớ lưu trữ số nguyên nguyên thủy hoạt động như thế nào? (Overflow)\n\nKiểu `int` chiếm 4 bytes (32 bits). Bit đầu tiên là bit dấu (0 = dương, 1 = âm).\nGiá trị tối đa của kiểu `int` là $2^{31} - 1 = 2,147,483,647$.\nNếu ta cộng thêm 1 vào giá trị tối đa này:\n```java\nint max = 2_147_483_647;\nSystem.out.println(max + 1); // Kết quả in ra: -2,147,483,648!\n```\nĐây gọi là hiện tượng **Tràn số (Integer Overflow)** do cơ chế bù hai (Two's Complement) của máy tính. Bit dấu bị chuyển thành 1 dẫn đến số dương lớn nhất biến thành số âm nhỏ nhất. Trong thực tế, hãy luôn dùng `long` khi xử lý ID tự tăng hoặc số lượng giao dịch khổng lồ để tránh lỗi bảo mật nghiêm trọng này.\n\n---\n\n## Tóm Tắt — Bài 02\n\n```\n✅ 8 kiểu primitive: byte, short, int, long, float, double, char, boolean\n✅ Hay dùng nhất: int, double, boolean, String\n✅ String dùng .equals() để so sánh — KHÔNG dùng ==\n✅ final → hằng số, không thay đổi được, đặt tên UPPER_SNAKE_CASE\n✅ 10 / 3 = 3 (chia nguyên), muốn 3.33 phải dùng 10.0 / 3\n✅ (int) 3.99 = 3 — cắt, không làm tròn\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBây giờ bạn đã có thể lưu dữ liệu vào biến rồi. Nhưng chương trình vẫn chỉ chạy một chiều — bước 1, bước 2, bước 3... Bài tiếp theo Tôi sẽ dạy bạn cách làm chương trình \"thông minh\" hơn: biết ra quyết định dựa trên điều kiện.\n\n👉 **[Bài 03: Câu Lệnh Điều Kiện](../bai-03-dieu-kien/README.md)**\n\n\n---\n\n## 💡 Kiến thức bổ trợ cho Newbie: Lớp Scanner nhập dữ liệu\nĐể viết chương trình tương tác, bạn cần nhập dữ liệu từ bàn phím. Java cung cấp lớp `java.util.Scanner`:\n```java\nimport java.util.Scanner; // Khai báo import ở đầu file\n\npublic class NhapLieu {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in); // Tạo đối tượng scanner\n        \n        System.out.print(\"Nhập tên của bạn: \");\n        String ten = scanner.nextLine(); // Đọc 1 dòng chữ\n        \n        System.out.print(\"Nhập tuổi của bạn: \");\n        int tuoi = scanner.nextInt(); // Đọc 1 số nguyên\n        \n        System.out.println(\"Xin chào \" + ten + \", \" + tuoi + \" tuổi!\");\n        scanner.close(); // Đóng tài nguyên sau khi dùng xong\n    }\n}\n```\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 02: Biến & Kiểu Dữ Liệu\n\n> 🎯 **Bối cảnh dự án:** Xây dựng **data model** cơ bản cho RaizeShop — nơi lưu trữ thông tin sản phẩm, người dùng, và giao dịch.\n\n---\n\n## 🔴 Bài Tập 1: Khai Báo Model Sản Phẩm ⭐\n\n**Bối cảnh thực tế:** Trong Spring Boot/Hibernate, trước khi tạo `@Entity`, developer cần xác định đúng kiểu dữ liệu cho từng field. Sai kiểu → bug tiền tệ cực kỳ nguy hiểm!\n\n**Yêu cầu:** Tạo `ProductModel.java`, khai báo đúng kiểu dữ liệu cho từng trường:\n\n```java\npublic class ProductModel {\n    public static void main(String[] args) {\n        // ❓ Hãy chọn kiểu đúng cho từng biến\n        ??? productId     = 1001;           // ID sản phẩm\n        ??? productName   = \"Kiếm Rồng +10\"; // Tên sản phẩm\n        ??? price         = 1_500_000.0;    // Giá (VND) — tại sao không dùng int?\n        ??? quantity      = 5;              // Số lượng còn lại\n        ??? isAvailable   = true;           // Còn hàng không?\n        ??? rating        = 4.8;            // Điểm đánh giá (0.0 - 5.0)\n        ??? sellerId      = 9_876_543_210L; // ID người bán (rất lớn)\n        ??? category      = 'W';           // W=Weapon, A=Armor, M=Magic\n\n        // In thông tin và giải thích tại sao chọn kiểu đó\n        System.out.printf(\"ID: %d | Tên: %s | Giá: %,.0f đ%n\",\n                productId, productName, price);\n    }\n}\n```\n\n**Thử thách:** Thêm `final` cho những field nào sẽ KHÔNG BAO GIỜ thay đổi sau khi set. Giải thích tại sao.\n\n---\n\n## 🟡 Bài Tập 2: Tính Hóa Đơn Với VAT ⭐⭐\n\n**Bối cảnh thực tế:** Mọi hệ thống thanh toán ở Việt Nam đều phải tính VAT (10%). Đây là logic bắt buộc trong mọi e-commerce app.\n\n**Yêu cầu:** Tạo `InvoiceCalculator.java`:\n\n```\n=== HÓA ĐƠN RAIZE SHOP ===\nSản phẩm           : Kiếm Rồng +10 x3\nĐơn giá            :    500,000 đ\nSố lượng           :          3\n─────────────────────────────────\nTổng trước VAT     :  1,500,000 đ\nVAT (10%)          :    150,000 đ\nMã giảm giá (15%)  :   -225,000 đ\n─────────────────────────────────\nTHÀNH TIỀN         :  1,425,000 đ\n```\n\n**Lưu ý quan trọng:**\n```java\nfinal double VAT_RATE = 10.0;           // Hằng số — không được thay đổi\nfinal double DISCOUNT_RATE = 15.0;\n\n// ❌ Sai: dùng int cho tiền → mất dữ liệu khi tính phần trăm\nint tong = soLuong * (int)donGia;\n\n// ✅ Đúng:\ndouble tong = soLuong * donGia;\n```\n\nGiải thích tại sao **không dùng `float`** mà dùng `double` cho tiền tệ, và khi nào cần dùng `BigDecimal`.\n\n---\n\n## 🟡 Bài Tập 3: Kiểm Tra Điều Kiện Mua Hàng ⭐⭐\n\n**Bối cảnh thực tế:** Hệ thống cần validate trước khi cho phép giao dịch — người dùng đủ tuổi? Tài khoản đủ tiền? Sản phẩm còn hàng?\n\n**Yêu cầu:** Tạo `PurchaseValidator.java`:\n\n```java\n// Dữ liệu người dùng\nint userAge = 17;\ndouble userBalance = 2_500_000;\nboolean isVerified = true;\n\n// Dữ liệu sản phẩm  \ndouble productPrice = 1_500_000;\nint productStock = 3;\nboolean isItemLocked = false; // Item đang bị khóa bởi admin\n\n// TODO: Tính và in ra\n// 1. Người dùng đủ tuổi không? (>= 18)\n// 2. Ví đủ tiền không?\n// 3. Giao dịch có thể thực hiện không? (kết hợp TẤT CẢ điều kiện)\n// 4. Số dư còn lại nếu mua thành công\n```\n\n**Output mong đợi:**\n```\n=== KIỂM TRA GIAO DỊCH ===\nĐủ tuổi (>= 18)  : ❌ Không (17 tuổi)\nVí đủ tiền       : ✅ Có (còn 2,500,000 đ)\nItem khả dụng    : ✅ Có (3 cái còn lại)\nTài khoản xác thực: ✅ Đã xác thực\n─────────────────────────────\nKết quả          : ❌ KHÔNG THỂ GIAO DỊCH\nLý do            : Người dùng chưa đủ 18 tuổi\n```\n\n---\n\n## 🔴 Bài Tập 4: Type Casting Nguy Hiểm Trong Thực Tế ⭐⭐⭐\n\n**Bối cảnh thực tế:** Đây là BUG phổ biến trong production gây thiệt hại thực sự: tính toán tiền thưởng, phần trăm hoa hồng bị sai do type casting.\n\n**Yêu cầu:** Tạo `TypeCastingBug.java`, TÌM và SỬA 3 bug:\n\n```java\npublic class TypeCastingBug {\n    public static void main(String[] args) {\n        // BUG 1: Tính hoa hồng người bán\n        int doanhThu = 7_500_000;\n        int hoaHongPhan = 8; // 8%\n        int hoaHong = doanhThu * hoaHongPhan / 100; // Bug ẩn ở đây!\n        System.out.println(\"Hoa hồng: \" + hoaHong + \" đ\"); // Kết quả đúng chưa?\n\n        // BUG 2: Tính rating trung bình\n        int tongRating = 47;\n        int soLuotDanhGia = 10;\n        double ratingTB = tongRating / soLuotDanhGia; // Bug!\n        System.out.println(\"Rating TB: \" + ratingTB); // Phải là 4.7, thực tế là?\n\n        // BUG 3: Kiểm tra số dư đủ không\n        long soDuVi = 10_000_000_000L; // 10 tỷ (người dùng VIP)\n        int giaItem = 2_147_483_648;   // Bug tinh vi — tại sao lỗi compile?\n        // → Sửa để hoạt động đúng\n    }\n}\n```\n\n**Sau khi sửa, giải thích:** Trong hệ thống tài chính, tại sao nhiều công ty dùng **đơn vị xu (cents)** thay vì đồng/dollar để lưu tiền?\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Tại sao field `userId` nên là `long` thay vì `int` trong database thực tế?\n- [ ] `final double PI` vs `static final double PI` — khác nhau thế nào? Cái nào nên dùng cho hằng số của app?\n- [ ] Floating point error: `0.1 + 0.2 != 0.3` — giải thích và khi nào code thanh toán THỰC SỰ bị ảnh hưởng bởi điều này?\n- [ ] Tại sao `int` max là ~2.1 tỷ? Tính `2 ^ 31 - 1` và giải thích tại sao `-1`.\n\n---\n\n👉 **Tiếp theo:** [Bài 03 – Điều Kiện](../bai-03-dieu-kien/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Kết quả của phép chia nguyên trong Java: 10 / 3 sẽ ra bao nhiêu?",
        "options": [
          "3.3333",
          "3",
          "4",
          "Lỗi biên dịch"
        ],
        "answer": 1,
        "explanation": "Khi chia 2 số nguyên int, Java thực hiện integer division và lấy phần nguyên. 10 / 3 = 3."
      },
      {
        "q": "Kiểu dữ liệu nào biểu diễn số thực với độ chính xác cao hơn và được khuyên dùng mặc định?",
        "options": [
          "float",
          "double",
          "decimal",
          "BigDecimal"
        ],
        "answer": 1,
        "explanation": "`double` (8 bytes) có độ chính xác cao hơn `float` (4 bytes) và là lựa chọn mặc định trong Java."
      },
      {
        "q": "Để so sánh nội dung hai chuỗi String s1 và s2, cách nào chính xác?",
        "options": [
          "s1 == s2",
          "s1.equals(s2)",
          "s1 === s2",
          "compare(s1, s2) == 0"
        ],
        "answer": 1,
        "explanation": "`==` so sánh địa chỉ ô nhớ. `.equals()` so sánh nội dung ký tự bên trong chuỗi."
      },
      {
        "q": "Kiểu dữ liệu `byte` trong Java có phạm vi giá trị nào?",
        "options": [
          "-128 đến 127",
          "0 đến 255",
          "-32768 đến 32767",
          "-2^31 đến 2^31-1"
        ],
        "answer": 0,
        "explanation": "`byte` chiếm 8 bit, biểu diễn số nguyên có dấu từ -128 đến 127."
      },
      {
        "q": "Giá trị mặc định của biến kiểu int khai báo trong class là bao nhiêu?",
        "options": [
          "null",
          "-1",
          "0",
          "Không xác định"
        ],
        "answer": 2,
        "explanation": "Biến instance (trong class) kiểu int có giá trị mặc định là 0. Biến boolean mặc định là false, tham chiếu (object) mặc định là null."
      },
      {
        "q": "Cách ép kiểu (casting) nào chuyển double sang int trong Java?",
        "options": [
          "double d = (double) 5;",
          "int i = (int) 3.14;",
          "int i = int(3.14);",
          "int i = to_int(3.14);"
        ],
        "answer": 1,
        "explanation": "Để ép kiểu thu hẹp (widening cast), ta dùng cú pháp `(kiểu_đích) giá_trị`. `int i = (int) 3.14;` sẽ cho kết quả i = 3 (bỏ phần thập phân)."
      },
      {
        "q": "Kết quả của biểu thức `5 % 3` trong Java là gì?",
        "options": [
          "1.666",
          "1",
          "2",
          "0"
        ],
        "answer": 2,
        "explanation": "Toán tử `%` là toán tử lấy phần dư. 5 chia 3 được 1, dư 2. Vậy `5 % 3 = 2`."
      },
      {
        "q": "Biến `final int MAX = 100;` có đặc điểm gì?",
        "options": [
          "Có thể thay đổi giá trị bất kỳ lúc nào",
          "Là hằng số, không thể thay đổi sau khi khởi tạo",
          "Tự động tăng giá trị sau mỗi lần dùng",
          "Chỉ dùng được trong phương thức main"
        ],
        "answer": 1,
        "explanation": "Từ khóa `final` tạo ra hằng số - giá trị không thể thay đổi sau khi gán lần đầu. Cố gắng gán lại sẽ gây lỗi biên dịch."
      },
      {
        "q": "Toán tử `++i` (pre-increment) và `i++` (post-increment) khác nhau điểm gì?",
        "options": [
          "Hoàn toàn giống nhau",
          "++i tăng i trước rồi lấy giá trị, i++ lấy giá trị hiện tại rồi mới tăng",
          "i++ tăng nhanh hơn ++i",
          "++i tăng thêm 2 còn i++ tăng thêm 1"
        ],
        "answer": 1,
        "explanation": "Với `++i`: tăng i lên 1 trước, sau đó trả về giá trị mới. Với `i++`: trả về giá trị hiện tại của i trước, sau đó mới tăng i lên 1."
      },
      {
        "q": "Kết quả của `true && false || true` trong Java là gì?",
        "options": [
          "false",
          "true",
          "Lỗi biên dịch",
          "null"
        ],
        "answer": 1,
        "explanation": "Theo độ ưu tiên toán tử: `&&` cao hơn `||`. Tính: `true && false` = false; rồi `false || true` = true."
      },
      {
        "q": "Kiểu dữ liệu `char` trong Java lưu trữ gì?",
        "options": [
          "Một chuỗi ký tự",
          "Một ký tự Unicode duy nhất (16 bit)",
          "Một số nguyên 32 bit",
          "Giá trị boolean"
        ],
        "answer": 1,
        "explanation": "`char` lưu một ký tự Unicode 16 bit (từ \\u0000 đến \\uFFFF). Ví dụ: `char c = 'A';` hoặc `char c = '\\u0041';`."
      },
      {
        "q": "Tại sao nên dùng kiểu `long` thay vì `int` khi lưu ID người dùng trong hệ thống có hàng tỷ users?",
        "options": [
          "Vì long in ra nhanh hơn int",
          "Vì int chỉ chứa tối đa ~2.1 tỷ, còn long chứa được đến ~9.2 × 10^18",
          "Vì long chính xác hơn int",
          "Vì int không dùng được trong database"
        ],
        "answer": 1,
        "explanation": "`int` max là 2,147,483,647 (~2.1 tỷ). Với hệ thống lớn có thể vượt ngưỡng này, dùng `long` (max ~9.2 * 10^18) để an toàn."
      },
      {
        "q": "Phép toán nào trong Java dùng để kiểm tra điều kiện theo dạng một dòng (ternary operator)?",
        "options": [
          "if ? else :",
          "condition ? valueIfTrue : valueIfFalse",
          "switch(condition)",
          "boolean ? (a) : (b)"
        ],
        "answer": 1,
        "explanation": "Toán tử ba ngôi (ternary): `bieuThuc ? giaTriDung : giaTriSai`. Ví dụ: `String role = age >= 18 ? \"Adult\" : \"Minor\";`"
      },
      {
        "q": "Phương thức Math.ceil(4.1) trả về kết quả nào?",
        "options": [
          "4.0",
          "5.0",
          "4",
          "5"
        ],
        "answer": 1,
        "explanation": "Math.ceil(x) làm tròn lên số nguyên tiếp theo và trả về kiểu double."
      },
      {
        "q": "Phương thức nào dùng để tính căn bậc hai của một số trong Java?",
        "options": [
          "Math.sqr()",
          "Math.sqrt()",
          "Math.pow()",
          "Math.root()"
        ],
        "answer": 1,
        "explanation": "Math.sqrt(x) trả về căn bậc hai (square root) của x dưới dạng kiểu double."
      }
    ],
    "practice": {
      "fileName": "ProductDetail.java",
      "instructions": "### Yêu cầu:\nTạo file `ProductDetail.java`. Khai báo các thông tin biến của sản phẩm và sử dụng `System.out.printf()` để định dạng in ra thông tin sản phẩm game item đẹp đẽ.\nSản phẩm có giá tiền là số thực `1500000` VND, cần được định dạng in ra có dấu phẩy ngăn cách hàng nghìn (ví dụ: `1,500,000`).\n\n### Đầu ra mong muốn:\n```\n==========================================\n📦 CHI TIẾT SẢN PHẨM: Kiếm Rồng Lửa +10\n==========================================\nGiá          : 1,500,000 đ\nDanh mục     : Vũ khí\nTình trạng   : Còn hàng\nNgười bán    : DragonMaster99\n==========================================\n```\n",
      "starterCode": "public class ProductDetail {\n    public static void main(String[] args) {\n        String tenSanPham = \"Kiếm Rồng Lửa +10\";\n        String danhMuc = \"Vũ khí\";\n        double gia = 1500000.0;\n        String nguoiBan = \"DragonMaster99\";\n        \n        System.out.println(\"==========================================\");\n        System.out.printf(\"📦 CHI TIẾT SẢN PHẨM: %s%n\", tenSanPham);\n        System.out.println(\"==========================================\");\n        // TODO: Viết code dùng printf để in thông tin còn lại\n        // Chú ý: Sử dụng %,.0f đ để format tiền tệ đẹp đẽ.\n        System.out.printf(\"Giá          : %,.0f đ%n\", gia);\n        System.out.printf(\"Danh mục     : %s%n\", danhMuc);\n        System.out.printf(\"Tình trạng   : Còn hàng%n\");\n        System.out.printf(\"Người bán    : %s%n\", nguoiBan);\n        System.out.println(\"==========================================\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"%,.0f\") && !code.includes(\"%,d\") && !output.includes(\"1,500,000\")) {\r\n        return { pass: false, msg: \"Em cần sử dụng định dạng %,.0f hoặc %,d để hiển thị số tiền có dấu phẩy phân cách hàng nghìn!\" };\r\n      }\r\n      if (!output.includes(\"Kiếm Rồng Lửa +10\")) {\r\n        return { pass: false, msg: \"Thiếu tên sản phẩm trong đầu ra!\" };\r\n      }\r\n      if (!output.includes(\"DragonMaster99\")) {\r\n        return { pass: false, msg: \"Thiếu người bán DragonMaster99 trong chi tiết sản phẩm!\" };\r\n      }\r\n      return { pass: true, msg: \"Tuyệt vời! Em đã sử dụng printf rất thành thạo để tạo một bảng chi tiết sản phẩm chuẩn chỉnh!\" };\r\n    }"
    }
  },
  {
    "id": 3,
    "title": "Câu Lệnh Điều Kiện",
    "phase": "Phase 1: Fundamentals",
    "time": "3 giờ",
    "difficulty": "Dễ",
    "theory": "﻿# Bài 03: Câu Lệnh Điều Kiện\n\n> 🟢 **Phase 1 – Bài 3/7** | Thời gian: ~2.5 giờ\n\n---\n\nBài trước bạn học cách lưu dữ liệu. Bài này Tôi sẽ dạy bạn cách làm chương trình **đưa ra quyết định** — giống như não bạn lúc sáng dậy: \"Nếu trời mưa thì mang ô, không thì thôi.\"\n\nTrong lập trình ta gọi đây là **câu lệnh điều kiện**. Và đây là thứ mà bạn sẽ dùng trong hầu hết mọi class bạn viết.\n\n---\n\n## 1. `if / else if / else`\n\nCú pháp đọc rất tự nhiên, gần như tiếng Anh:\n\n```java\nif (điều_kiện_là_true) {\n    // làm cái này\n} else if (điều_kiện_khác_là_true) {\n    // làm cái kia\n} else {\n    // không điều kiện nào thỏa → làm cái này\n}\n```\n\nHãy xem ví dụ thực tế: phân loại học sinh theo điểm trung bình.\n\n```java\ndouble diemTB = 8.3;\n\nif (diemTB >= 9.0) {\n    System.out.println(\"Xuất sắc\");\n} else if (diemTB >= 8.0) {\n    System.out.println(\"Giỏi\");        // ← bài này in chỗ này vì 8.3 >= 8.0\n} else if (diemTB >= 6.5) {\n    System.out.println(\"Khá\");\n} else if (diemTB >= 5.0) {\n    System.out.println(\"Trung bình\");\n} else {\n    System.out.println(\"Yếu\");\n}\n```\n\n> 💡 **Cách Java đọc:** Nó kiểm tra từ trên xuống, gặp điều kiện nào đúng trước thì chạy nhánh đó rồi **nhảy ra luôn** — không kiểm tra tiếp. Vì vậy thứ tự các điều kiện quan trọng!\n\nVí dụ sai thứ tự (bug phổ biến):\n```java\n// ❌ Sai — diem = 9.5 sẽ vào ngay điều kiện đầu tiên >= 5.0!\nif (diemTB >= 5.0) {\n    System.out.println(\"Trung bình\");  // Luôn in cái này!\n} else if (diemTB >= 8.0) {\n    System.out.println(\"Giỏi\");        // Không bao giờ tới đây\n}\n\n// ✅ Đúng — điều kiện chặt hơn phải đứng trước\nif (diemTB >= 9.0) { ... }\nelse if (diemTB >= 8.0) { ... }\n```\n\n---\n\n## 2. Toán Tử Ba Ngôi `? :` — Viết Tắt Tiện Lợi\n\nKhi điều kiện đơn giản chỉ có 2 nhánh, bạn có thể viết gọn trên một dòng:\n\n```java\n// Cách dài:\nString ketQua;\nif (diem >= 5.0) {\n    ketQua = \"Đạt\";\n} else {\n    ketQua = \"Rớt\";\n}\n\n// Cách ngắn với ternary:\nString ketQua = diem >= 5.0 ? \"Đạt\" : \"Rớt\";\n//                   ↑           ↑       ↑\n//               Điều kiện   Nếu true  Nếu false\n```\n\nĐọc như vậy: *\"Nếu điểm >= 5 thì 'Đạt', không thì 'Rớt'\"*.\n\n```java\n// Thêm ví dụ thực tế:\nint tuoi = 17;\nString loaiVe = tuoi < 18 ? \"Vé trẻ em (giảm 50%)\" : \"Vé người lớn\";\n\nint a = 15, b = 27;\nint soLonHon = a > b ? a : b;  // Lấy số lớn hơn\n\nboolean online = true;\nString trangThai = online ? \"🟢 Đang hoạt động\" : \"🔴 Ngoại tuyến\";\n```\n\n> ⚠️ **Không nên:** Lồng ternary trong ternary. tôi thấy nhiều học sinh cố viết như này và sau đó chính họ không hiểu code của mình:\n> ```java\n> // Rất khó đọc — đừng làm vậy!\n> String xepLoai = diem >= 9 ? \"XS\" : diem >= 8 ? \"Giỏi\" : diem >= 6.5 ? \"Khá\" : \"TB\";\n> // Hãy dùng if/else if cho trường hợp nhiều nhánh như này\n> ```\n\n---\n\n## 3. `switch` — Khi So Sánh Một Giá Trị Với Nhiều Lựa Chọn\n\nKhi bạn cần so sánh **một biến với nhiều giá trị cụ thể**, `switch` gọn hơn chuỗi `if/else if`:\n\n```java\n// Không có switch — dài dòng:\nif (ngay == 1) System.out.println(\"Thứ Hai\");\nelse if (ngay == 2) System.out.println(\"Thứ Ba\");\nelse if (ngay == 3) System.out.println(\"Thứ Tư\");\n// ...\n\n// Có switch — gọn hơn nhiều:\nint ngay = 3;\nswitch (ngay) {\n    case 1:\n        System.out.println(\"Thứ Hai\");\n        break;          // ← BẮT BUỘC! Không có break → chạy luôn xuống case tiếp theo!\n    case 2:\n        System.out.println(\"Thứ Ba\");\n        break;\n    case 3:\n        System.out.println(\"Thứ Tư\");  // In ra đây\n        break;\n    // ...\n    default:\n        System.out.println(\"Không hợp lệ\");\n}\n```\n\n> ⚠️ **Lỗi phổ biến nhất với switch:** Quên `break`. Nếu quên, Java sẽ chạy thẳng xuống case bên dưới — gọi là *fall-through*. Đây là nguồn gốc của rất nhiều bug khó tìm. Hãy tập thói quen: viết `case` xong viết `break` ngay, rồi mới điền code.\n\nNhiều case dùng chung một hành động:\n```java\nswitch (thang) {\n    case 1:\n    case 3:\n    case 5:\n    case 7:\n    case 8:\n    case 10:\n    case 12:\n        System.out.println(\"Tháng 31 ngày\");\n        break;\n    case 4:\n    case 6:\n    case 9:\n    case 11:\n        System.out.println(\"Tháng 30 ngày\");\n        break;\n    case 2:\n        System.out.println(\"Tháng 28 hoặc 29 ngày\");\n        break;\n}\n```\n\n---\n\n## 4. Switch Expression — Cách Mới Gọn Hơn (Java 14+)\n\nJava 14 giới thiệu cú pháp mới, không cần `break`, không có fall-through:\n\n```java\n// Rất gọn, không cần break\nString tenNgay = switch (ngay) {\n    case 1 -> \"Thứ Hai\";\n    case 2 -> \"Thứ Ba\";\n    case 3 -> \"Thứ Tư\";\n    case 4 -> \"Thứ Năm\";\n    case 5 -> \"Thứ Sáu\";\n    case 6 -> \"Thứ Bảy\";\n    case 7 -> \"Chủ Nhật\";\n    default -> \"Không hợp lệ\";\n};\n\n// Gộp nhiều case:\nint soNgayTrongThang = switch (thang) {\n    case 1, 3, 5, 7, 8, 10, 12 -> 31;\n    case 4, 6, 9, 11            -> 30;\n    case 2                      -> 28; // Đơn giản hóa, bỏ qua năm nhuận\n    default -> throw new IllegalArgumentException(\"Tháng không hợp lệ: \" + thang);\n};\n```\n\ntôi **khuyên dùng switch expression** khi viết Java 14+ vì nó an toàn hơn (không có fall-through) và đọc rõ ràng hơn.\n\n---\n\n## 5. Điều Kiện Lồng Nhau\n\nĐôi khi cần kiểm tra nhiều điều kiện phối hợp:\n\n```java\nint tuoi = 16;\nboolean coGiayPhep = false;\n\nif (tuoi >= 18) {\n    if (coGiayPhep) {\n        System.out.println(\"Bạn được phép lái xe\");\n    } else {\n        System.out.println(\"Đủ tuổi nhưng chưa có bằng\");\n    }\n} else {\n    System.out.println(\"Chưa đủ 18 tuổi\");\n}\n```\n\nHoặc gọn hơn bằng `&&`:\n```java\nboolean duocLaiXe = tuoi >= 18 && coGiayPhep;\nif (duocLaiXe) {\n    System.out.println(\"Được phép lái xe\");\n}\n```\n\n---\n\n## 6. Ví Dụ Thực Tế: Phân Loại Đơn Hàng\n\n```java\npublic class PhanLoaiDon {\n    public static void main(String[] args) {\n        String trangThai = \"COMPLETED\";\n        double soTienDon = 850_000;\n\n        // Phân loại trạng thái đơn\n        String moTa = switch (trangThai) {\n            case \"PENDING\"    -> \"⏳ Đang chờ xử lý\";\n            case \"PROCESSING\" -> \"🔄 Đang xử lý\";\n            case \"COMPLETED\"  -> \"✅ Hoàn thành\";\n            case \"CANCELLED\"  -> \"❌ Đã hủy\";\n            default           -> \"❓ Không xác định\";\n        };\n        System.out.println(\"Trạng thái: \" + moTa);\n\n        // Phân loại theo giá trị đơn\n        String huy;\n        if (soTienDon >= 1_000_000) {\n            huy = \"💎 Đơn VIP\";\n        } else if (soTienDon >= 500_000) {\n            huy = \"🥇 Đơn Gold\";\n        } else if (soTienDon >= 100_000) {\n            huy = \"🥈 Đơn Silver\";\n        } else {\n            huy = \"🥉 Đơn thường\";\n        }\n        System.out.printf(\"Giá trị: %,.0f đ → %s%n\", soTienDon, huy);\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 03\n\n```\n✅ if/else if/else: điều kiện chặt hơn đứng TRƯỚC (tránh bug thứ tự)\n✅ Ternary (? :): viết gọn cho điều kiện đơn giản 2 nhánh\n✅ switch: so sánh 1 giá trị với nhiều case — nhớ break!\n✅ switch expression (Java 14+): gọn hơn, không cần break, không fall-through\n✅ Luôn dùng .equals() thay == khi so sánh String trong điều kiện\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nCode của bạn bây giờ có thể quyết định. Nhưng nếu cần làm một việc 100 lần thì sao? Bài tiếp theo Tôi giải thích cách tự động hóa sự lặp lại — **vòng lặp**.\n\n👉 **[Bài 04: Vòng Lặp](../bai-04-vong-lap/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 03: Câu Lệnh Điều Kiện\n\n> 🎯 **Bối cảnh dự án:** Xây dựng **business logic** — phần lõi của RaizeShop: phân loại người dùng, áp dụng khuyến mãi, kiểm tra quyền hạn.\n\n---\n\n## 🔴 Bài Tập 1: Hệ Thống Phân Cấp Người Bán ⭐\n\n**Bối cảnh thực tế:** Mọi marketplace (Shopee, Amazon, Tiki) đều có hệ thống xếp loại người bán dựa trên doanh số và đánh giá. Đây là logic `if-else` điển hình trong production.\n\n**Yêu cầu:** Tạo `SellerRankSystem.java`:\n\n```java\ndouble rating = 4.6;       // Điểm đánh giá\nint soGiaoDich = 75;       // Số giao dịch thành công\ndouble doanhThu = 50_000_000; // Doanh thu tháng (VND)\nint soKhieuNai = 2;        // Số khiếu nại\n\n// Quy tắc xếp hạng:\n// 🏆 DIAMOND: rating >= 4.8 VÀ giaoDich >= 100 VÀ khieuNai == 0\n// 🥇 GOLD   : rating >= 4.5 VÀ giaoDich >= 50  VÀ khieuNai <= 2\n// 🥈 SILVER : rating >= 4.0 VÀ giaoDich >= 20\n// 🥉 BRONZE : rating >= 3.5\n// ⚠️ WARNING: Còn lại (cần cải thiện)\n\n// Quyền lợi tương ứng:\n// DIAMOND → phí 2%, ưu tiên hiển thị, hỗ trợ riêng 24/7\n// GOLD    → phí 3%, hiển thị tốt, hỗ trợ ưu tiên\n// SILVER  → phí 4%, hiển thị bình thường\n// BRONZE  → phí 5%\n// WARNING → phí 7%, có thể bị suspend\n```\n\n**Output mong đợi:**\n```\n=== KẾT QUẢ XẾP HẠNG NGƯỜI BÁN ===\nRating      : 4.6 ⭐\nGiao dịch   : 75\nDoanh thu   : 50,000,000 đ\nKhiếu nại   : 2\n──────────────────────────────────\nHạng hiện tại: 🥇 GOLD\nPhí giao dịch: 3%\nQuyền lợi    : Hiển thị tốt + Hỗ trợ ưu tiên\nPhí ước tính : 1,500,000 đ/tháng\n```\n\n---\n\n## 🟡 Bài Tập 2: Engine Khuyến Mãi ⭐⭐\n\n**Bối cảnh thực tế:** Shopee, Lazada có hệ thống voucher/coupon cực kỳ phức tạp. Đây là phiên bản mini của engine đó.\n\n**Yêu cầu:** Tạo `PromotionEngine.java` — áp dụng đúng 1 khuyến mãi tốt nhất:\n\n```java\ndouble tongDonHang = 3_500_000; // Giá trị đơn hàng\nString maVoucher = \"SALE30\";    // Mã voucher người dùng nhập\nboolean laMemberVIP = true;      // Thành viên VIP?\nboolean laKhachMoi = false;      // Khách mới?\nint soSanPham = 5;               // Số sản phẩm trong giỏ\n\n// BẢNG KHUYẾN MÃI:\n// \"SALE30\"  : Giảm 30% nếu đơn >= 2,000,000 đ, tối đa giảm 500,000 đ\n// \"NEWUSER\" : Giảm 50% cho khách mới, chỉ dùng lần đầu\n// \"VIP20\"   : Giảm 20% cho VIP member\n// Mua >= 5 sản phẩm: tặng thêm 5% (có thể cộng với voucher)\n// Không có voucher hợp lệ: chỉ áp dụng chiết khấu sản phẩm (nếu có)\n\n// TODO: Tính tiền sau khuyến mãi và in ra bảng kết quả rõ ràng\n```\n\n**Output mong đợi:**\n```\n=== ÁP DỤNG KHUYẾN MÃI ===\nĐơn hàng gốc    : 3,500,000 đ\nVoucher SALE30  : -500,000 đ (cap 500k)\nMua 5+ sản phẩm : -150,000 đ (5% thêm)\n──────────────────────────────────────\nTỔNG TIẾT KIỆM  : -650,000 đ\nTHANH TOÁN      :  2,850,000 đ\n```\n\n---\n\n## 🟡 Bài Tập 3: Hệ Thống Xác Thực Đăng Nhập ⭐⭐\n\n**Bối cảnh thực tế:** Mọi app đều cần authentication. Logic kiểm tra account status là `if-else` điển hình nhất trong backend.\n\n**Yêu cầu:** Tạo `LoginValidator.java`:\n\n- Account có các trạng thái: `ACTIVE`, `SUSPENDED`, `BANNED`, `PENDING_VERIFICATION`\n- Nếu nhập sai mật khẩu 5 lần → tự động SUSPEND 30 phút\n- Admin có thể đăng nhập kể cả khi account bị SUSPEND\n\n```java\nString username = \"raize_user\";\nString inputPassword = \"password123\";\nString actualPassword = \"securePass!99\";\nString accountStatus = \"ACTIVE\";\nint failedAttempts = 4;    // Đã nhập sai bao nhiêu lần\nboolean isAdmin = false;\nlong suspendedUntil = -1;  // Unix timestamp, -1 = không bị suspend\n\n// TODO: Implement logic kiểm tra đăng nhập đầy đủ\n```\n\n**Output mong đợi (khi sai password lần 5):**\n```\n=== KẾT QUẢ ĐĂNG NHẬP ===\nUsername    : raize_user\nTrạng thái  : ACTIVE → SUSPENDED\nLý do       : Nhập sai mật khẩu 5 lần\nMở khóa sau : 30 phút\nHành động   : ❌ ĐĂNG NHẬP THẤT BẠI\nGợi ý       : Kiểm tra email để reset mật khẩu\n```\n\n---\n\n## 🔴 Bài Tập 4: Report Logic Phức Tạp ⭐⭐⭐\n\n**Bối cảnh thực tế:** Báo cáo doanh thu cuối tháng của admin — kết hợp nhiều điều kiện để phân tích dữ liệu.\n\n**Yêu cầu:** Tạo `MonthlyReport.java` phân tích doanh thu tháng:\n\n```java\ndouble doanhThuThang = 125_000_000;\ndouble doanhThuThangTruoc = 98_000_000;\nint soGiaoDich = 1_247;\nint soKhieuNai = 15;\nint soNguoiBan = 430;\nint soNguoiMua = 2_891;\n\n// Phân tích:\n// 1. Tăng trưởng doanh thu (%) so với tháng trước\n// 2. Tỉ lệ chuyển đổi (giaoDich / nguoiMua * 100)\n// 3. Tỉ lệ khiếu nại (khieuNai / giaoDich * 100)\n// 4. Đánh giá tháng: XUẤT SẮC / TỐT / TRUNG BÌNH / KÉM\n//    XUẤT SẮC: tăng trưởng >= 25% VÀ tỉ lệ khiếu nại < 1%\n//    TỐT      : tăng trưởng >= 10% VÀ tỉ lệ khiếu nại < 2%\n//    TRUNG BÌNH: dương VÀ tỉ lệ khiếu nại < 5%\n//    KÉM      : còn lại\n// 5. Đề xuất hành động cụ thể cho từng trường hợp\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Tại sao **không nên** dùng `if (status == \"ACTIVE\")` mà phải dùng `.equals()`? Giải thích bằng ví dụ thực tế có thể gây bug production.\n- [ ] `switch` vs `if-else if` — trong hệ thống xếp hạng (nhiều mức), cái nào phù hợp hơn và tại sao?\n- [ ] Toán tử `? :` (ternary) — đọc code nào dễ hơn? Khi nào dùng ternary làm code TỆ HƠN?\n- [ ] Trong bài 2, nếu có 10+ loại voucher, bạn sẽ cấu trúc code thế nào để tránh `if-else if` dài 100 dòng?\n\n---\n\n👉 **Tiếp theo:** [Bài 04 – Vòng Lặp](../bai-04-vong-lap/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Switch expression (Java 14+) dùng từ khóa nào để trả về giá trị từ khối code phức tạp?",
        "options": [
          "return",
          "yield",
          "break",
          "output"
        ],
        "answer": 1,
        "explanation": "Trong Switch Expression, khi cần nhiều câu lệnh trước khi trả về giá trị, dùng từ khóa `yield`."
      },
      {
        "q": "Switch Expression khác Switch Statement ở điểm quan trọng nào?",
        "options": [
          "Switch Expression bắt buộc có break mỗi case.",
          "Switch Expression dùng mũi tên -> và có thể trả về giá trị trực tiếp.",
          "Switch Expression không hỗ trợ default.",
          "Switch Expression chỉ dùng với int."
        ],
        "answer": 1,
        "explanation": "Switch Expression dùng `->` không bị fall-through và có thể gán giá trị trực tiếp: `String result = switch(x) { case 1 -> \"Một\"; default -> \"Khác\"; };`"
      },
      {
        "q": "Khi điều kiện trong if-else lồng nhau, từ khóa else gắn với if nào?",
        "options": [
          "Với if đầu tiên gần nhất trước nó",
          "Với if gần nhất chưa có else tương ứng",
          "Với if đầu tiên trong toàn bộ cấu trúc",
          "Ngẫu nhiên"
        ],
        "answer": 1,
        "explanation": "Quy tắc 'dangling else': else gắn với if gần nhất chưa được ghép đôi. Nên dùng dấu ngoặc nhọn {} để rõ ràng hơn."
      },
      {
        "q": "Biểu thức điều kiện `(x > 0 && y > 0)` trả về true khi nào?",
        "options": [
          "Khi x > 0 hoặc y > 0",
          "Khi cả x và y đều > 0",
          "Khi x > 0 mà không cần y",
          "Khi tổng x + y > 0"
        ],
        "answer": 1,
        "explanation": "Toán tử `&&` (AND) chỉ trả về true khi cả hai điều kiện đều true."
      },
      {
        "q": "Short-circuit evaluation trong Java là gì?",
        "options": [
          "Việc JVM tối ưu các vòng lặp ngắn",
          "Khi dùng &&, nếu vế trái là false thì vế phải không được tính; với ||, nếu vế trái true thì vế phải không tính",
          "Cách rút gọn câu lệnh if thành 1 dòng",
          "Kỹ thuật nén mã bytecode"
        ],
        "answer": 1,
        "explanation": "Short-circuit: với `a && b`, nếu `a` là false thì b không được đánh giá. Với `a || b`, nếu `a` là true thì b không được đánh giá."
      },
      {
        "q": "Lệnh switch-case truyền thống có vấn đề gì nếu thiếu `break`?",
        "options": [
          "Chương trình bị lỗi biên dịch",
          "Fall-through: code tiếp tục chạy vào case tiếp theo dù không khớp",
          "Chương trình bị treo vô hạn",
          "Case tiếp theo bị bỏ qua"
        ],
        "answer": 1,
        "explanation": "Thiếu `break`, sau khi khớp case, code 'rơi xuống' (fall-through) và tiếp tục thực thi tất cả case bên dưới cho đến khi gặp `break` hoặc hết switch."
      },
      {
        "q": "Kiểu dữ liệu nào KHÔNG thể dùng trong lệnh switch trong Java cũ (trước Java 7)?",
        "options": [
          "int",
          "char",
          "String",
          "float"
        ],
        "answer": 3,
        "explanation": "Switch truyền thống chỉ hỗ trợ `int`, `char`, `byte`, `short` và các wrapper class tương ứng. `float` không được hỗ trợ. Java 7+ thêm String."
      },
      {
        "q": "Toán tử `||` (OR) trả về true khi nào?",
        "options": [
          "Chỉ khi cả hai điều kiện đều true",
          "Khi ít nhất một trong hai điều kiện là true",
          "Khi cả hai điều kiện đều false",
          "Khi điều kiện đầu tiên là true và điều kiện thứ hai là false"
        ],
        "answer": 1,
        "explanation": "Toán tử `||` (OR) trả về true khi ít nhất một trong hai điều kiện là true. Chỉ trả về false khi cả hai đều false."
      },
      {
        "q": "Cú pháp đúng của lệnh if-else if-else là gì?",
        "options": [
          "if() {} elif {} else {}",
          "if() {} else if() {} else {}",
          "if() {} elseif() {} else {}",
          "if() {} else() {} default {}"
        ],
        "answer": 1,
        "explanation": "Cú pháp đúng trong Java là `else if` (hai từ riêng biệt), không phải `elif` hay `elseif`."
      },
      {
        "q": "Phát biểu nào đúng về toán tử `!` (NOT) trong Java?",
        "options": [
          "!true = true",
          "!false = true",
          "!(5 > 3) = true",
          "!(null) = true"
        ],
        "answer": 1,
        "explanation": "`!` đảo ngược giá trị boolean. `!false = true`. `!true = false`."
      },
      {
        "q": "Trong switch-case, nhánh `default` có bắt buộc phải đặt ở cuối không?",
        "options": [
          "Có, bắt buộc phải ở cuối",
          "Không, có thể đặt ở bất kỳ vị trí nào nhưng thường đặt cuối cho dễ đọc",
          "Không cần thiết có default",
          "default chỉ có trong switch expression"
        ],
        "answer": 1,
        "explanation": "`default` không bắt buộc phải ở cuối, nhưng đặt cuối là thông lệ. Nếu không ở cuối và không có break, code có thể fall-through vào case tiếp theo."
      },
      {
        "q": "Cần kiểm tra một số có nằm trong khoảng [1, 100] không. Điều kiện nào đúng?",
        "options": [
          "n > 1 && n < 100",
          "n >= 1 && n <= 100",
          "n >= 1 || n <= 100",
          "1 <= n => n <= 100"
        ],
        "answer": 1,
        "explanation": "Khoảng [1, 100] bao gồm cả 2 đầu, dùng `>=` và `<=`: `n >= 1 && n <= 100`."
      }
    ],
    "practice": {
      "fileName": "ShippingCalculator.java",
      "instructions": "### Yêu cầu:\nTạo chương trình tính phí vận chuyển vật phẩm game vật lý dựa trên khoảng cách (km) và tình trạng hội viên VIP:\n- Khoảng cách dưới 5km: Phí là `15000` đ.\n- Khoảng cách từ 5km đến 10km: Phí là `30000` đ.\n- Khoảng cách trên 10km: Phí là `50000` đ.\n- Đặc biệt: Nếu khách hàng là hội viên VIP (`isVip = true`), họ sẽ được giảm **50%** phí vận chuyển.\n\nHãy thiết lập khoảng cách `12.5` km và `isVip = true` để chạy chương trình. In kết quả cuối cùng ra màn hình dạng: `Phí ship: [số tiền] đ`.\n",
      "starterCode": "public class ShippingCalculator {\n    public static void main(String[] args) {\n        double khoangCach = 12.5; // km\n        boolean isVip = true;\n        double phiShip = 0;\n\n        // TODO: Viết logic if-else tính phí ship ở đây\n        if (khoangCach < 5) {\n            phiShip = 15000;\n        } else if (khoangCach <= 10) {\n            phiShip = 30000;\n        } else {\n            phiShip = 50000;\n        }\n        \n        if (isVip) {\n            phiShip = phiShip * 0.5;\n        }\n\n        System.out.println(\"Phí ship: \" + (int)phiShip + \" đ\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!output.includes(\"25000\") && !output.includes(\"25,000\")) {\r\n        return { pass: false, msg: \"Kết quả phí ship tính ra chưa chính xác. Với khoảng cách 12.5km (>10km) và có VIP (giảm 50% của 50,000) thì phí ship phải là 25,000 đ.\" };\r\n      }\r\n      if (!code.includes(\"if\") || !code.includes(\"else\")) {\r\n        return { pass: false, msg: \"Em cần sử dụng cấu trúc rẽ nhánh if-else để kiểm tra khoảng cách và tính phí ship!\" };\r\n      }\r\n      return { pass: true, msg: \"Chuẩn xác! Logic rẽ nhánh của em hoạt động rất trơn tru. Newbie làm vậy là cực tốt!\" };\r\n    }"
    }
  },
  {
    "id": 4,
    "title": "Vòng Lặp (Loops)",
    "phase": "Phase 1: Fundamentals",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 04: Vòng Lặp\n\n> 🟢 **Phase 1 – Bài 4/7** | Thời gian: ~3 giờ\n\n---\n\nHãy thử tưởng tượng: bạn cần gửi email thông báo cho 10,000 người dùng RaizeShop. Lẽ nào viết 10,000 dòng code? Tất nhiên là không. Đây chính là lúc **vòng lặp** phát huy tác dụng.\n\nVòng lặp = làm đi làm lại một việc, cho đến khi điều kiện dừng được thỏa.\n\nJava có 3 loại vòng lặp: `for`, `while`, và `do-while`. Mỗi loại phù hợp với một tình huống khác nhau.\n\n---\n\n## 1. Vòng Lặp `for` — Khi Biết Trước Số Lần\n\nĐây là vòng lặp phổ biến nhất. Dùng khi bạn biết muốn lặp bao nhiêu lần.\n\n```java\nfor (khởi_tạo; điều_kiện; cập_nhật) {\n    // code lặp\n}\n```\n\nHãy xem nó chạy từng bước như thế nào:\n\n```\nfor (int i = 0;  i < 5;   i++  )\n         ↑          ↑        ↑\n    Chạy 1 lần   Kiểm tra  Chạy sau\n    trước tiên   trước mỗi  mỗi vòng\n                 vòng lặp\n\nVòng 1: i=0 → 0<5 (true) → chạy code → i++ → i=1\nVòng 2: i=1 → 1<5 (true) → chạy code → i++ → i=2\nVòng 3: i=2 → 2<5 (true) → chạy code → i++ → i=3\nVòng 4: i=3 → 3<5 (true) → chạy code → i++ → i=4\nVòng 5: i=4 → 4<5 (true) → chạy code → i++ → i=5\n         i=5 → 5<5 (false) → DỪNG\n```\n\n```java\n// Đếm từ 1 đến 5\nfor (int i = 1; i <= 5; i++) {\n    System.out.print(i + \" \");\n}\n// → 1 2 3 4 5\n\n// Đếm ngược\nfor (int i = 10; i >= 1; i--) {\n    System.out.print(i + \" \");\n}\n// → 10 9 8 7 6 5 4 3 2 1\n\n// Chỉ số chẵn\nfor (int i = 0; i <= 10; i += 2) {\n    System.out.print(i + \" \");\n}\n// → 0 2 4 6 8 10\n\n// Tính tổng 1 + 2 + ... + 100\nint tong = 0;\nfor (int i = 1; i <= 100; i++) {\n    tong += i;\n}\nSystem.out.println(\"Tổng = \" + tong);  // Tổng = 5050\n```\n\n### For-each — Duyệt mảng/danh sách đẹp hơn\n\n```java\nString[] sanPham = {\"Kiếm Rồng\", \"Giáp Vàng\", \"Nhẫn Ma\"};\n\n// Cách cũ — phải dùng index:\nfor (int i = 0; i < sanPham.length; i++) {\n    System.out.println(sanPham[i]);\n}\n\n// For-each — gọn và dễ đọc hơn:\nfor (String sp : sanPham) {    // \"Với mỗi sp trong sanPham\"\n    System.out.println(sp);\n}\n```\n\n> 💡 **Khi nào dùng for-each?** Khi bạn CHỈ cần đọc phần tử, không cần biết index. Khi cần index (để sửa phần tử, hoặc dùng `i` trong logic), hãy dùng `for` thường.\n\n---\n\n## 2. Vòng Lặp `while` — Khi Không Biết Trước Số Lần\n\nDùng khi bạn chỉ biết **điều kiện dừng**, không biết sẽ lặp bao nhiêu lần.\n\n```java\nwhile (điều_kiện) {\n    // code lặp\n    // phải có gì đó thay đổi điều kiện — nếu không → vòng lặp vô tận!\n}\n```\n\nVí dụ điển hình: game đoán số.\n\n```java\nimport java.util.Scanner;\nimport java.util.Random;\n\npublic class DoanSo {\n    public static void main(String[] args) {\n        Random random = new Random();\n        int soCanDoan = random.nextInt(100) + 1;  // 1-100\n        Scanner scanner = new Scanner(System.in);\n        int soDoan = -1;\n        int soLan = 0;\n\n        System.out.println(\"Đoán số từ 1-100. Nhập -1 để thoát.\");\n\n        while (soDoan != soCanDoan) {\n            System.out.print(\"Lần \" + (soLan + 1) + \": Nhập số đoán: \");\n            soDoan = scanner.nextInt();\n            soLan++;\n\n            if (soDoan == -1) {\n                System.out.println(\"Bạn bỏ cuộc! Số cần đoán là: \" + soCanDoan);\n                break;\n            } else if (soDoan < soCanDoan) {\n                System.out.println(\"Quá nhỏ! Thử lại.\");\n            } else if (soDoan > soCanDoan) {\n                System.out.println(\"Quá lớn! Thử lại.\");\n            } else {\n                System.out.println(\"🎉 Đúng rồi! Sau \" + soLan + \" lần.\");\n            }\n        }\n\n        scanner.close();\n    }\n}\n```\n\n> ⚠️ **Hãy cẩn thận với vòng lặp vô tận!** Nếu điều kiện trong `while` không bao giờ thành `false`, chương trình sẽ chạy mãi mãi và treo máy. Luôn đảm bảo có gì đó bên trong vòng lặp thay đổi điều kiện đó.\n\n---\n\n## 3. Vòng Lặp `do-while` — Luôn Chạy Ít Nhất 1 Lần\n\n```java\ndo {\n    // code — chạy trước, kiểm tra điều kiện SAU\n} while (điều_kiện);\n```\n\nSự khác biệt quan trọng:\n- `while`: kiểm tra điều kiện **trước** → có thể không chạy lần nào\n- `do-while`: chạy **trước** rồi mới kiểm tra → luôn chạy ít nhất 1 lần\n\nDùng rất hay để làm **menu lặp lại**:\n\n```java\nScanner scanner = new Scanner(System.in);\nint luaChon;\n\ndo {\n    System.out.println(\"\\n===== MENU =====\");\n    System.out.println(\"1. Xem danh sách sản phẩm\");\n    System.out.println(\"2. Tìm kiếm\");\n    System.out.println(\"3. Thoát\");\n    System.out.print(\"Chọn: \");\n\n    luaChon = scanner.nextInt();\n\n    switch (luaChon) {\n        case 1 -> System.out.println(\"Đang tải danh sách...\");\n        case 2 -> System.out.println(\"Nhập từ khóa tìm kiếm...\");\n        case 3 -> System.out.println(\"Tạm biệt!\");\n        default -> System.out.println(\"Lựa chọn không hợp lệ, thử lại.\");\n    }\n} while (luaChon != 3);   // Lặp cho đến khi user chọn thoát\n```\n\n---\n\n## 4. `break` và `continue`\n\n### `break` — Thoát khỏi vòng lặp ngay lập tức\n\n```java\n// Tìm phần tử đầu tiên thỏa điều kiện — xong thì dừng ngay\nfor (int i = 0; i < sanPham.length; i++) {\n    if (sanPham[i].contains(\"Kiếm\")) {\n        System.out.println(\"Tìm thấy tại index: \" + i);\n        break;    // Dừng luôn, không tìm tiếp\n    }\n}\n```\n\n### `continue` — Bỏ qua vòng hiện tại, chuyển sang vòng tiếp theo\n\n```java\n// In tất cả số 1-10, nhưng bỏ qua số 5\nfor (int i = 1; i <= 10; i++) {\n    if (i == 5) {\n        continue;  // Nhảy lên đầu vòng lặp, tăng i lên 6\n    }\n    System.out.print(i + \" \");\n}\n// → 1 2 3 4 6 7 8 9 10\n```\n\n---\n\n## 5. Vòng Lặp Lồng Nhau\n\nVòng lặp bên trong vòng lặp. Hay dùng cho ma trận, bảng cửu chương, vẽ hình...\n\n```java\n// Bảng cửu chương 2-5\nfor (int bang = 2; bang <= 5; bang++) {\n    System.out.println(\"=== Bảng \" + bang + \" ===\");\n    for (int i = 1; i <= 10; i++) {\n        System.out.printf(\"%d × %2d = %3d%n\", bang, i, bang * i);\n    }\n}\n```\n\n> 💡 **Quy tắc đặt tên biến vòng lặp:** Biến ngoài thường dùng `i`, vòng trong dùng `j`, vòng trong nữa dùng `k`. Đây là convention mọi lập trình viên Java đều quen.\n\n---\n\n## 6. Ví Dụ Thực Tế: Xử Lý Danh Sách Kho Hàng\n\n```java\npublic class QuanLyKho {\n    public static void main(String[] args) {\n        String[] ten   = {\"Kiếm Rồng\", \"Giáp Vàng\", \"Nhẫn Ma\", \"Hài Cát\", \"Mũ Thần\"};\n        int[] soLuong  = {3,           1,            5,          0,          2};\n        double[] gia   = {1_200_000,   800_000,      500_000,    300_000,    400_000};\n\n        System.out.printf(\"%-15s %8s %12s %10s%n\", \"Tên\", \"Số lượng\", \"Giá\", \"Thành tiền\");\n        System.out.println(\"─\".repeat(50));\n\n        double tongGiaTri = 0;\n\n        for (int i = 0; i < ten.length; i++) {\n            if (soLuong[i] == 0) {\n                System.out.printf(\"%-15s %8s %12s %10s%n\",\n                    ten[i], \"HẾT HÀNG\", \"---\", \"---\");\n                continue;  // Bỏ qua tính toán cho hàng hết\n            }\n\n            double thanhTien = soLuong[i] * gia[i];\n            tongGiaTri += thanhTien;\n\n            System.out.printf(\"%-15s %8d %,12.0f đ %,10.0f đ%n\",\n                ten[i], soLuong[i], gia[i], thanhTien);\n        }\n\n        System.out.println(\"─\".repeat(50));\n        System.out.printf(\"%-15s %28s → %,10.0f đ%n\", \"TỔNG GIÁ TRỊ\", \"\", tongGiaTri);\n    }\n}\n```\n\nHãy chạy thử và thay đổi dữ liệu. Tôi muốn bạn **thử nghiệm** chứ không chỉ copy xem.\n\n---\n\n## Tóm Tắt — Bài 04\n\n```\n✅ for: biết trước số lần lặp → dùng for\n✅ while: chỉ biết điều kiện dừng → dùng while\n✅ do-while: phải chạy ít nhất 1 lần (ví dụ: menu) → dùng do-while\n✅ for-each: duyệt mảng/danh sách khi không cần index\n✅ break: thoát khỏi vòng lặp\n✅ continue: bỏ qua vòng hiện tại, sang vòng tiếp theo\n✅ Vòng lặp vô tận = bug cực kỳ nguy hiểm — luôn đảm bảo có điều kiện dừng\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBài vừa rồi bạn đã dùng mảng (`ten[]`, `soLuong[]`, `gia[]`) nhưng chưa thực sự học về mảng. Bài tiếp theo Tôi sẽ đi sâu vào mảng và String — hai thứ bạn sẽ dùng hàng ngày.\n\n👉 **[Bài 05: Mảng (Array) và Chuỗi (String)](../bai-05-array-string/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 04: Vòng Lặp\n\n> 🎯 **Bối cảnh dự án:** Xử lý **dữ liệu hàng loạt** — duyệt danh sách sản phẩm, tạo báo cáo, tính toán tự động cho RaizeShop.\n\n---\n\n## 🔴 Bài Tập 1: Tạo Mã Sản Phẩm Tự Động ⭐\n\n**Bối cảnh thực tế:** Khi admin upload hàng loạt sản phẩm, hệ thống cần tự động tạo mã SKU (Stock Keeping Unit) cho từng sản phẩm.\n\n**Yêu cầu:** Tạo `SkuGenerator.java`, sinh ra 25 mã SKU theo định dạng:\n\n```\nRZ-WPN-0001    (Vũ khí)\nRZ-WPN-0002\n...\nRZ-ARM-0001    (Giáp)\nRZ-ARM-0002\n...\nRZ-MGC-0001    (Ma thuật)\n```\n\n**Yêu cầu cụ thể:**\n- Mỗi danh mục: 5 mã (WPN, ARM, MGC, ACC, PET)\n- Số thứ tự padding 4 chữ số: `0001`, `0002`...\n- Dùng `String.format(\"RZ-%s-%04d\", category, i)`\n\n**Output bảng thống kê cuối:**\n```\n=== THỐNG KÊ MÃ SKU ===\nWPN (Vũ khí)  : 5 mã — RZ-WPN-0001 đến RZ-WPN-0005\nARM (Giáp)    : 5 mã — RZ-ARM-0001 đến RZ-ARM-0005\nMGC (Ma thuật): 5 mã — RZ-MGC-0001 đến RZ-MGC-0005\nACC (Phụ kiện): 5 mã — RZ-ACC-0001 đến RZ-ACC-0005\nPET (Thú cưng): 5 mã — RZ-PET-0001 đến RZ-PET-0005\nTỔNG          : 25 mã\n```\n\n---\n\n## 🟡 Bài Tập 2: Phân Trang Danh Sách Sản Phẩm ⭐⭐\n\n**Bối cảnh thực tế:** Pagination là tính năng bắt buộc trong mọi e-commerce. Backend API trả về kết quả theo từng trang để tránh load quá nhiều dữ liệu.\n\n**Yêu cầu:** Tạo `ProductPagination.java`:\n\n```java\nint tongSanPham = 47;\nint mauPerPage = 10;    // Số sản phẩm mỗi trang\nint trangHienTai = 3;   // Đang xem trang 3\n\n// TODO:\n// 1. Tính tổng số trang (ceiling division: không dùng Math.ceil)\n// 2. Tính chỉ số bắt đầu/kết thúc của trang hiện tại\n// 3. Dùng vòng lặp \"simulate\" in ra các sản phẩm trên trang đó\n// 4. In navigation bar: << Trang trước | 1 2 [3] 4 5 | Trang sau >>\n```\n\n**Output mong đợi:**\n```\n=== TRANG 3/5 ===\n[21] Kiếm Rồng +8          - 800,000 đ\n[22] Nhẫn Hộ Mệnh           - 250,000 đ\n...\n[30] Hài Tốc Độ +3          - 600,000 đ\n\nHiển thị 21-30 / 47 sản phẩm\n<< Trang trước  |  1  2  [3]  4  5  |  Trang tiếp >>\n```\n\n**Gợi ý:** `int soTrang = (tongSanPham + mauPerPage - 1) / mauPerPage;` → ceiling division không cần float!\n\n---\n\n## 🟡 Bài Tập 3: Cron Job Tính Lãi Suất ⭐⭐\n\n**Bối cảnh thực tế:** RaizeShop có tính năng \"Gửi tiết kiệm item\" — người dùng gửi tiền vào ví RaizeWallet để nhận lãi hàng ngày. Backend có cronjob chạy mỗi ngày để tính lãi.\n\n**Yêu cầu:** Tạo `InterestCalculator.java` mô phỏng cronjob tính lãi kép 30 ngày:\n\n```java\ndouble soTienGoc = 10_000_000; // 10 triệu\ndouble laiSuatNgay = 0.05;     // 0.05% mỗi ngày\nint soNgay = 30;\n\n// In bảng:\n// Ngày | Tiền đầu ngày | Tiền lãi | Tiền cuối ngày\n// ─────────────────────────────────────────────────\n//   1  | 10,000,000   |  5,000  |  10,005,000\n//   2  | 10,005,000   |  5,003  |  10,010,003\n// ...\n//  30  | ...          |  ...    |  ...\n// TỔNG LÃI: ...\n```\n\n**Thử thách:** Tính lãi thêm \"tiền thưởng\" vào ngày 7, 14, 21, 28 (bonus 1% trên lãi ngày đó).\n\n---\n\n## 🔴 Bài Tập 4: Real-time Fraud Detection ⭐⭐⭐\n\n**Bối cảnh thực tế:** Hệ thống phát hiện gian lận theo dõi chuỗi giao dịch để tìm pattern bất thường. Đây là ứng dụng thực tế của while + nested loop.\n\n**Yêu cầu:** Tạo `FraudDetector.java`:\n\n```java\n// Mô phỏng 100 giao dịch gần nhất (dùng vòng lặp tạo data giả)\n// Giao dịch i có giá trị = (i * 37 % 500 + 50) * 1000\n\n// LUẬT PHÁT HIỆN GIAN LẶN:\n// 1. GD đột biến: giá trị > 5 lần giá trị TB của 10 GD trước\n// 2. Tần suất cao: > 5 GD trong 1 \"phút\" (mô phỏng bằng cứ 10 GD = 1 phút)\n// 3. Vòng tiền: tổng 3 GD liên tiếp > 2,000,000 đ\n\n// Output:\n// In ra tất cả GD bị flag là suspicious\n// Tổng kết: Bao nhiêu GD suspicious / tổng\n// Risk score: LOW / MEDIUM / HIGH / CRITICAL\n```\n\n**Điều thực tế:** Đây là phiên bản đơn giản hóa của thuật toán fraud detection mà các công ty fintech như MoMo, VNPay dùng.\n\n---\n\n## 🟡 Bài Tập 5: Bảng Cửu Chương Tùy Chỉnh ⭐\n\n**Bối cảnh thực tế:** Tính toán hoa hồng, discount matrix — đây là nested loop phổ biến nhất trong báo cáo tài chính.\n\n**Yêu cầu:** Tạo `CommissionMatrix.java` — bảng tính hoa hồng theo hạng người bán và giá trị đơn hàng:\n\n```\n=== BẢNG HOA HỒNG (%) ===\nGiá trị đơn \\ Hạng  BRONZE  SILVER  GOLD  DIAMOND\n        < 1 triệu     5.0%    4.0%  3.0%     2.0%\n     1 - 5 triệu     4.5%    3.5%  2.5%     1.5%\n     5 - 20 triệu    4.0%    3.0%  2.0%     1.0%\n       > 20 triệu    3.0%    2.0%  1.5%     0.5%\n```\n\n**Yêu cầu kỹ thuật:**\n- Dùng nested loop để tạo bảng\n- Căn chỉnh cột bằng `%-10s` và `%6.1f%%`\n- Thêm logic: tính hoa hồng thực tế cho 1 đơn hàng với hạng cho trước\n\n---\n\n## 🔴 Bài Tập 6 (BONUS): ASCII Progress Bar ⭐⭐\n\n**Bối cảnh thực tế:** Giao diện CLI của các tool DevOps (npm install, pip, maven) đều có progress bar. Đây là cách dùng `\\r` để update dòng hiện tại.\n\n```\nUpload sản phẩm: [████████████░░░░░░░░] 60% (6/10)\n```\n\n**Yêu cầu:** Tạo `ProgressBar.java`:\n\n```java\n// Simulate upload 10 sản phẩm, mỗi cái mất \"2 giây\"\n// Dùng Thread.sleep(200) để tạo delay\n// Dùng \\r để clear dòng hiện tại và print lại\n\nfor (int i = 1; i <= total; i++) {\n    // Tính % hoàn thành\n    // Tính số ô đã fill và chưa fill\n    // Print: [████░░░] XX% (i/total)\n    // Thread.sleep(200);\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `for` vs `while` vs `do-while` — trong hệ thống retry kết nối database (thử tối đa 3 lần), dùng cái nào? Tại sao?\n- [ ] Vòng lặp vô hạn `while(true)` — trong production, điều này có hợp lệ không? Đưa ra ví dụ hợp lệ.\n- [ ] `break` vs `return` khi thoát vòng lặp sớm — khác nhau thế nào? Bài 4 (fraud detection) nên dùng cái nào?\n- [ ] Bài toán pagination (bài 2): tại sao `(n + pageSize - 1) / pageSize` là ceiling division? Chứng minh bằng 3 case.\n- [ ] Nested loop bài 5: độ phức tạp thời gian là O(n²). Với bảng hoa hồng 100x100, bao nhiêu phép tính? Khi nào O(n²) là vấn đề?\n\n---\n\n👉 **Tiếp theo:** [Bài 05 – Array & String](../bai-05-array-string/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Sự khác biệt cơ bản giữa vòng lặp `while` và `do-while` là gì?",
        "options": [
          "`while` chạy ít nhất 1 lần, `do-while` có thể không chạy lần nào.",
          "`do-while` luôn chạy ít nhất 1 lần trước khi kiểm tra điều kiện, `while` kiểm tra trước.",
          "`while` nhanh hơn `do-while`.",
          "`do-while` chỉ dùng cho số nguyên."
        ],
        "answer": 1,
        "explanation": "`do-while` thực thi khối lệnh trước rồi mới kiểm tra điều kiện. Do đó luôn chạy ít nhất 1 lần."
      },
      {
        "q": "`break` và `continue` hoạt động như thế nào trong vòng lặp?",
        "options": [
          "`break` thoát vòng lặp hiện tại; `continue` bỏ qua lần lặp hiện tại và chuyển sang lần kế tiếp.",
          "`break` dừng toàn bộ chương trình; `continue` làm vòng lặp chạy nhanh hơn.",
          "`break` chuyển đến nhãn tiếp theo; `continue` dừng vòng lặp.",
          "Cả hai đều thoát vòng lặp nhưng `continue` dọn dẹp bộ nhớ."
        ],
        "answer": 0,
        "explanation": "`break` kết thúc hoàn toàn vòng lặp. `continue` bỏ qua phần còn lại của lần lặp hiện tại và nhảy sang lần lặp kế tiếp."
      },
      {
        "q": "Vòng lặp for-each (enhanced for) trong Java được dùng để làm gì?",
        "options": [
          "Lặp với bộ đếm i từ 0 đến n",
          "Duyệt qua từng phần tử của mảng hoặc collection mà không cần chỉ số",
          "Chỉ dùng được với ArrayList",
          "Thay thế hoàn toàn vòng lặp while"
        ],
        "answer": 1,
        "explanation": "For-each `for (Kieu phanTu : tap_hop)` giúp duyệt qua mảng/collection mà không cần quản lý chỉ số, code gọn hơn nhưng không thể dùng khi cần biết index."
      },
      {
        "q": "Số lần lặp của `for(int i = 0; i < 5; i++)` là bao nhiêu?",
        "options": [
          "4 lần",
          "5 lần",
          "6 lần",
          "Vô hạn"
        ],
        "answer": 1,
        "explanation": "i chạy từ 0, 1, 2, 3, 4 (5 lần). Khi i = 5 thì điều kiện `i < 5` sai, vòng lặp kết thúc."
      },
      {
        "q": "Vòng lặp nào phù hợp nhất khi không biết trước số lần lặp?",
        "options": [
          "for loop",
          "while loop",
          "do-while loop",
          "for-each loop"
        ],
        "answer": 1,
        "explanation": "`while` phù hợp khi số lần lặp phụ thuộc vào điều kiện không biết trước (ví dụ: đọc dữ liệu cho đến khi người dùng nhập 'quit')."
      },
      {
        "q": "Điều gì xảy ra với vòng lặp `while(true)` nếu không có `break`?",
        "options": [
          "Chỉ chạy 1 lần rồi dừng",
          "Vòng lặp vô hạn - chương trình không bao giờ kết thúc",
          "Lỗi biên dịch",
          "JVM tự dừng sau 100 lần"
        ],
        "answer": 1,
        "explanation": "Điều kiện `true` luôn đúng, nên vòng lặp chạy mãi mãi (infinite loop). Cần có `break` hoặc `return` bên trong để thoát."
      },
      {
        "q": "Trong vòng lặp `for(int i = 10; i > 0; i--)`, giá trị cuối cùng của i khi thực hiện lần lặp cuối cùng là bao nhiêu?",
        "options": [
          "0",
          "1",
          "-1",
          "10"
        ],
        "answer": 1,
        "explanation": "Lần lặp cuối: i = 1, thực hiện thân vòng lặp, sau đó i-- làm i = 0, kiểm tra 0 > 0 là false, vòng lặp dừng. Giá trị i khi chạy lần cuối là 1."
      },
      {
        "q": "Vòng lặp lồng nhau (nested loop) có ứng dụng gì phổ biến?",
        "options": [
          "Chỉ dùng để in số nguyên tố",
          "In ma trận, duyệt bảng 2 chiều, so sánh mọi cặp phần tử trong danh sách",
          "Thay thế vòng lặp while",
          "Chỉ dùng trong thuật toán sắp xếp"
        ],
        "answer": 1,
        "explanation": "Nested loop thường dùng để: in bảng cửu chương, duyệt ma trận 2D, kiểm tra mọi cặp phần tử (O(n²))."
      },
      {
        "q": "Labeled break trong Java dùng để làm gì?",
        "options": [
          "Đặt tên cho vòng lặp để tài liệu hóa code",
          "Thoát ra khỏi vòng lặp bên ngoài trong cấu trúc vòng lặp lồng nhau",
          "Break với điều kiện kèm theo",
          "Không tồn tại trong Java"
        ],
        "answer": 1,
        "explanation": "Labeled break cho phép thoát ra khỏi một vòng lặp ngoài cụ thể khi đang ở trong vòng lặp lồng. Ví dụ: `outer: for(...) { for(...) { break outer; } }`"
      },
      {
        "q": "Phần khởi tạo (init) của vòng lặp `for` được thực hiện bao nhiêu lần?",
        "options": [
          "Mỗi lần lặp",
          "Chỉ một lần duy nhất trước khi bắt đầu vòng lặp",
          "Sau mỗi lần lặp",
          "Không bao giờ nếu điều kiện ban đầu sai"
        ],
        "answer": 1,
        "explanation": "Phần init (ví dụ `int i = 0`) chỉ thực hiện đúng 1 lần trước khi bắt đầu vòng lặp, bất kể số lần lặp là bao nhiêu."
      },
      {
        "q": "Cách viết vòng lặp for ngược từ 10 đến 1 là gì?",
        "options": [
          "for(int i = 10; i >= 1; i--)",
          "for(int i = 1; i <= 10; i++)",
          "for(int i = 10; i > 0; i++)",
          "for(int i = 10; i < 1; i--)"
        ],
        "answer": 0,
        "explanation": "Để đếm ngược, khởi tạo i = 10, điều kiện tiếp tục `i >= 1`, bước nhảy `i--` (giảm dần)."
      },
      {
        "q": "Kết quả của đoạn code sau:\n`int sum = 0; for(int i = 1; i <= 3; i++) sum += i; System.out.println(sum);`",
        "options": [
          "3",
          "6",
          "9",
          "0"
        ],
        "answer": 1,
        "explanation": "i=1: sum=1; i=2: sum=3; i=3: sum=6. Kết quả là 6 (= 1+2+3)."
      }
    ],
    "practice": {
      "fileName": "CartTotal.java",
      "instructions": "### Yêu cầu:\nGiả lập giỏ hàng của khách hàng tại RaizeShop chứa 5 vật phẩm game với đơn giá lưu trong một mảng số nguyên.\nHãy sử dụng vòng lặp `for` hoặc `while` để duyệt qua mảng `itemPrices` và cộng dồn tính tổng số tiền của giỏ hàng.\nIn kết quả ra màn hình dạng: `Tổng tiền giỏ hàng: [tổng số tiền] đ`.\n",
      "starterCode": "public class CartTotal {\n    public static void main(String[] args) {\n        int[] itemPrices = {120000, 450000, 30000, 1500000, 85000};\n        int tongTien = 0;\n\n        // TODO: Sử dụng vòng lặp để duyệt mảng và tính tổng\n        for (int price : itemPrices) {\n            tongTien += price;\n        }\n\n        System.out.println(\"Tổng tiền giỏ hàng: \" + tongTien + \" đ\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!output.includes(\"2235000\") && !output.includes(\"2,235,000\")) {\r\n        return { pass: false, msg: \"Tổng số tiền tính ra chưa chính xác. Đáp án đúng của tổng mảng là 2,235,000 đ.\" };\r\n      }\r\n      if (!code.includes(\"for\") && !code.includes(\"while\")) {\r\n        return { pass: false, msg: \"Em hãy dùng vòng lặp for (hoặc for-each, while) để duyệt qua các phần tử của mảng!\" };\r\n      }\r\n      return { pass: true, msg: \"Làm tốt lắm em! Việc duyệt mảng bằng vòng lặp là viên gạch nền móng đầu tiên của thuật toán.\" };\r\n    }"
    }
  },
  {
    "id": 5,
    "title": "Mảng & Chuỗi (Array & String)",
    "phase": "Phase 1: Fundamentals",
    "time": "4 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 05: Mảng (Array) và Chuỗi (String) Nâng Cao\n\n> 🟡 **Phase 1 – Bài 5/7** | Thời gian: ~3.5 giờ\n\n---\n\nCho đến giờ bạn chỉ lưu được **một giá trị** trong một biến. Nhưng thực tế, bạn thường cần xử lý **nhiều giá trị cùng kiểu** — danh sách sản phẩm, điểm của cả lớp, lịch sử giao dịch...\n\nĐây là lúc **mảng (array)** ra đời. Và cũng trong bài này, Tôi sẽ dạy bạn khai thác sức mạnh thực sự của `String` — thứ bạn đã dùng từ bài 1 nhưng chưa hiểu sâu.\n\n---\n\n## PHẦN A: MẢNG (ARRAY)\n\n## 1. Mảng Là Gì?\n\nHãy hình dung thế này: nếu `int tuoi = 20` là một chiếc hộp, thì **mảng** là một dãy hộp được đánh số liên tiếp.\n\n```\nint[] diem = {80, 90, 75, 95, 65}\n\n   [0]    [1]    [2]    [3]    [4]\n ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐\n │ 80 │ │ 90 │ │ 75 │ │ 95 │ │ 65 │\n └────┘ └────┘ └────┘ └────┘ └────┘\n    ↑\n Index bắt đầu từ 0, không phải 1!\n```\n\n> 💡 **Tại sao index bắt đầu từ 0?** Câu hỏi này tôi bị hỏi nhiều lắm. Câu trả lời: đây là quy ước từ những ngày đầu của lập trình, vì máy tính tính địa chỉ memory bắt đầu từ `0`. Gần như tất cả ngôn ngữ lập trình đều dùng 0-based index. Hãy quen với nó càng sớm càng tốt!\n\n---\n\n## 2. Khai Báo và Khởi Tạo Mảng\n\n```java\n// Cách 1: Khai báo với giá trị ngay\nint[] diem = {80, 90, 75, 95, 65};\nString[] tenSp = {\"Kiếm Rồng\", \"Giáp Vàng\", \"Nhẫn Ma\"};\n\n// Cách 2: Khai báo kích thước, rồi gán sau\nint[] diemLop = new int[30];     // 30 phần tử, mặc định = 0\nString[] ten = new String[5];    // 5 phần tử, mặc định = null\n\ndiemLop[0] = 85;\ndiemLop[1] = 72;\n// diemLop[30] → ❌ Lỗi! Index hợp lệ là 0 đến 29\n```\n\nKhi truy cập sai index, Java sẽ ném ra `ArrayIndexOutOfBoundsException`. Đây là lỗi bạn SẼ gặp nhiều lần khi mới học. Cứ bình tĩnh đọc thông báo lỗi — nó sẽ nói rõ index nào bị sai.\n\n---\n\n## 3. Duyệt Mảng và Thao Tác Cơ Bản\n\n```java\nint[] so = {5, 2, 8, 1, 9, 3, 7};\n\n// Duyệt với index (khi cần vị trí)\nfor (int i = 0; i < so.length; i++) {\n    System.out.printf(\"so[%d] = %d%n\", i, so[i]);\n}\n\n// Duyệt for-each (khi chỉ cần giá trị)\nfor (int x : so) {\n    System.out.print(x + \" \");\n}\n```\n\nCác thao tác hay dùng với mảng mà bạn nên thực hành:\n\n```java\nimport java.util.Arrays;\n\nint[] so = {5, 2, 8, 1, 9, 3, 7};\n\n// Tìm max/min thủ công (luyện logic)\nint max = so[0], min = so[0];\nfor (int x : so) {\n    if (x > max) max = x;\n    if (x < min) min = x;\n}\nSystem.out.println(\"Max = \" + max + \", Min = \" + min);  // Max=9, Min=1\n\n// Tính tổng và trung bình\nint tong = 0;\nfor (int x : so) tong += x;\ndouble trungBinh = (double) tong / so.length;\n\n// Sắp xếp - Java có sẵn, dùng luôn\nArrays.sort(so);\nSystem.out.println(Arrays.toString(so));  // [1, 2, 3, 5, 7, 8, 9]\n\n// In mảng đẹp mà không dùng Arrays.toString\nSystem.out.print(\"[\");\nfor (int i = 0; i < so.length; i++) {\n    System.out.print(so[i]);\n    if (i < so.length - 1) System.out.print(\", \");\n}\nSystem.out.println(\"]\");\n```\n\n> 💡 **Mẹo nhỏ của tôi:** Khi mới học, hãy tự implement tay các thao tác như tìm max/min, đảo mảng, tìm kiếm... để luyện logic. Sau khi hiểu rồi mới dùng `Arrays.sort()` và các method có sẵn.\n\n---\n\n## 4. Mảng 2 Chiều — Như Bảng Excel\n\n```java\n// Bảng 3 hàng × 4 cột\nint[][] bang = {\n    {1,  2,  3,  4},   // Hàng 0\n    {5,  6,  7,  8},   // Hàng 1\n    {9, 10, 11, 12}    // Hàng 2\n};\n\n// Truy cập: bang[hàng][cột]\nSystem.out.println(bang[0][0]);  // 1\nSystem.out.println(bang[1][2]);  // 7\nSystem.out.println(bang[2][3]);  // 12\n\n// Duyệt 2D\nfor (int[] hang : bang) {\n    for (int o : hang) {\n        System.out.printf(\"%4d\", o);\n    }\n    System.out.println();\n}\n\n// Ứng dụng thực tế: điểm 5 học sinh × 3 môn\ndouble[][] diemLop = {\n    {8.5, 7.0, 9.0},   // An\n    {6.5, 8.0, 7.5},   // Bình\n    {9.0, 9.5, 8.0},   // Chi\n};\nString[] tenHS = {\"An\", \"Bình\", \"Chi\"};\nString[] tenMon = {\"Toán\", \"Lý\", \"Hóa\"};\n\nfor (int i = 0; i < diemLop.length; i++) {\n    double tb = (diemLop[i][0] + diemLop[i][1] + diemLop[i][2]) / 3;\n    System.out.printf(\"%-6s → TB: %.2f%n\", tenHS[i], tb);\n}\n```\n\n---\n\n## PHẦN B: STRING NÂNG CAO\n\n## 5. String Là Bất Biến — Điều Quan Trọng Nhất\n\nĐây là thứ tôi thấy nhiều học sinh không để ý và sau này bị bug mà không biết tại sao:\n\n```java\nString s = \"hello\";\ns.toUpperCase();              // Gọi method — nhưng s VẪN là \"hello\"!\nSystem.out.println(s);        // \"hello\" — không thay đổi\n\nString sHoa = s.toUpperCase(); // Method trả về String MỚI\nSystem.out.println(sHoa);      // \"HELLO\"\nSystem.out.println(s);         // Vẫn \"hello\"\n```\n\nMọi method của String đều **trả về String mới**, không thay đổi String gốc. String là **immutable** (bất biến). Đây là thiết kế có chủ đích — giúp Java an toàn hơn khi đa luồng, và JVM có thể tối ưu memory.\n\n---\n\n## 6. Các Method String Hay Dùng Nhất\n\ntôi chọn lọc những cái bạn sẽ dùng thường xuyên nhất:\n\n```java\nString s = \"  Hello, Java World!  \";\n\n// === Kiểm tra ===\ns.length()          // 22 — độ dài\ns.isEmpty()         // false — \"\" mới là empty\ns.isBlank()         // false — \"   \" mới là blank (Java 11+)\ns.contains(\"Java\")  // true\ns.startsWith(\"  He\") // true\ns.endsWith(\"!  \")   // true\ns.indexOf(\"Java\")   // 9 — vị trí đầu tiên, -1 nếu không có\n\n// === Biến đổi ===\ns.trim()            // \"Hello, Java World!\" — bỏ khoảng trắng đầu/cuối\ns.strip()           // Như trim nhưng hỗ trợ Unicode (Java 11+)\ns.toUpperCase()     // \"  HELLO, JAVA WORLD!  \"\ns.toLowerCase()     // \"  hello, java world!  \"\ns.replace(\"Java\", \"Python\")  // \"  Hello, Python World!  \"\n\n// === Cắt, tách, ghép ===\ns.substring(8, 12)  // \"Java\" — từ index 8 đến 11\ns.charAt(8)         // 'J' — ký tự tại vị trí 8\n\n\"Toán,Lý,Hóa\".split(\",\")          // [\"Toán\", \"Lý\", \"Hóa\"]\nString.join(\" | \", \"A\", \"B\", \"C\") // \"A | B | C\"\n\n// === Chuyển đổi ===\nString.valueOf(42)       // \"42\" — số → chuỗi\nInteger.parseInt(\"123\")  // 123 — chuỗi → số nguyên\nDouble.parseDouble(\"3.14\") // 3.14 — chuỗi → số thực\n```\n\n> ⚠️ **Cạm bẫy phổ biến:** `Integer.parseInt(\"abc\")` → `NumberFormatException`! Khi parse từ String sang số, hãy luôn xử lý trường hợp String không hợp lệ.\n\n---\n\n## 7. `StringBuilder` — Nối Chuỗi Hiệu Quả\n\n```java\n// ❌ Không hiệu quả trong vòng lặp:\nString result = \"\";\nfor (int i = 1; i <= 1000; i++) {\n    result += i + \",\";\n    // Mỗi vòng tạo ra 1 String object mới!\n    // Với 1000 vòng = 1000 String objects tạm thời trong memory\n}\n\n// ✅ Dùng StringBuilder — tốt hơn rất nhiều:\nStringBuilder sb = new StringBuilder();\nfor (int i = 1; i <= 1000; i++) {\n    sb.append(i);\n    if (i < 1000) sb.append(\",\");\n}\nString result2 = sb.toString();  // Chuyển sang String khi cần\n```\n\n```java\n// Các method của StringBuilder:\nStringBuilder sb = new StringBuilder(\"Hello\");\nsb.append(\" World\");   // \"Hello World\"\nsb.insert(5, \",\");     // \"Hello, World\"\nsb.delete(5, 6);       // \"Hello World\"\nsb.reverse();          // \"dlroW olleH\"\nsb.replace(0, 5, \"Hi\"); // \"Hi olleH\"\nSystem.out.println(sb.length()); // Độ dài hiện tại\n```\n\n> 💡 **Quy tắc tôi luôn dùng:** Nếu nối chuỗi trong vòng lặp hoặc nối nhiều hơn 5-6 lần → dùng `StringBuilder`. Nối 2-3 lần trong code thường → dùng `+` cho đơn giản.\n\n---\n\n## 8. Text Block — Chuỗi Nhiều Dòng (Java 15+)\n\nRất hay khi bạn cần nhúng JSON, SQL, HTML vào code:\n\n```java\n// Cũ — phải escape, xấu và khó đọc:\nString json = \"{\\n  \\\"name\\\": \\\"Raize\\\",\\n  \\\"role\\\": \\\"admin\\\"\\n}\";\n\n// Mới — text block, đẹp hơn nhiều:\nString json = \"\"\"\n        {\n          \"name\": \"Raize\",\n          \"role\": \"admin\"\n        }\n        \"\"\";\n\nSystem.out.println(json);\n// {\n//   \"name\": \"Raize\",\n//   \"role\": \"admin\"\n// }\n```\n\n---\n\n## 9. Ví Dụ Thực Tế: Tìm Kiếm Sản Phẩm\n\n```java\npublic class TimKiem {\n    public static void main(String[] args) {\n        String[] ten    = {\"Kiếm Rồng\", \"Giáp Vàng\", \"Nhẫn Ma Lực\", \"Kiếm Ánh Sáng\", \"Hài Cát\"};\n        int[] gia       = {1_200_000,   800_000,      500_000,        1_500_000,        300_000};\n        int[] soLuong   = {3,           1,             5,              0,                2};\n\n        String tuKhoa = \"kiếm\"; // Không phân biệt hoa thường!\n\n        System.out.printf(\"=== Tìm kiếm: \\\"%s\\\" ===%n%n\", tuKhoa);\n        int demKetQua = 0;\n\n        for (int i = 0; i < ten.length; i++) {\n            // Tìm kiếm không phân biệt hoa thường\n            if (ten[i].toLowerCase().contains(tuKhoa.toLowerCase())) {\n                demKetQua++;\n                String trangThai = soLuong[i] > 0\n                    ? \"Còn hàng (\" + soLuong[i] + \")\"\n                    : \"Hết hàng\";\n                System.out.printf(\"%-20s %,12d đ  [%s]%n\",\n                    ten[i], gia[i], trangThai);\n            }\n        }\n\n        System.out.println();\n        if (demKetQua == 0) {\n            System.out.println(\"Không tìm thấy sản phẩm nào khớp với \\\"\" + tuKhoa + \"\\\"\");\n        } else {\n            System.out.println(\"Tìm thấy \" + demKetQua + \" sản phẩm.\");\n        }\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 05\n\n```\n✅ Mảng: dãy hộp đồng kiểu, index từ 0 đến length-1\n✅ ArrayIndexOutOfBoundsException khi truy cập index sai\n✅ Arrays.sort(), Arrays.toString() — tiện dụng, dùng nhiều\n✅ String immutable — mọi method trả về String MỚI, không sửa gốc\n✅ Dùng .equals() để so sánh, .equalsIgnoreCase() để bỏ qua hoa/thường\n✅ StringBuilder cho nối chuỗi nhiều lần trong vòng lặp\n✅ split() để tách, join() để ghép chuỗi\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBạn nhận ra các ví dụ đang ngày càng dài và lặp lại code giống nhau không? Ví dụ như phần tìm giá lớn nhất — bạn sẽ phải viết lại logic đó mỗi lần cần dùng. Bài tiếp theo Tôi sẽ dạy cách đóng gói code thành **method** để dùng lại ở nhiều chỗ.\n\n👉 **[Bài 06: Method](../bai-06-method/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 05: Array & String\n\n> 🎯 **Bối cảnh dự án:** Xử lý **dữ liệu catalogue sản phẩm** — tìm kiếm, filter, sắp xếp, format chuỗi trong RaizeShop.\n\n---\n\n## 🔴 Bài Tập 1: Inventory Manager ⭐⭐\n\n**Bối cảnh thực tế:** Hệ thống quản lý kho hàng — đây là nghiệp vụ cốt lõi của mọi e-commerce. Cần thống kê realtime để quyết định nhập hàng.\n\n**Yêu cầu:** Tạo `InventoryManager.java`:\n\n```java\nString[] ten       = {\"Kiếm Rồng +10\", \"Giáp Địa Long\", \"Nhẫn Ma Lực\", \n                      \"Hài Cát Bụi\", \"Kiếm Ánh Sáng\", \"Khiên Sắt\", \n                      \"Gậy Pháp Sư\", \"Dây Chuyền TP\"};\ndouble[] gia       = {2_500_000, 3_200_000, 800_000, \n                      450_000,   1_800_000, 1_200_000, \n                      950_000,   600_000};\nint[] soLuong      = {5, 0, 12, 3, 0, 8, 1, 15};\ndouble[] doanhThu  = {12_500_000, 0, 9_600_000, \n                      1_350_000,  0, 9_600_000, \n                      950_000,    9_000_000};\n```\n\n**Yêu cầu phân tích:**\n1. In danh sách sản phẩm HẾT HÀNG với alert\n2. In Top 3 sản phẩm doanh thu cao nhất\n3. Tính tổng giá trị tồn kho hiện tại (giá × số lượng còn)\n4. Tìm sản phẩm có số lượng tồn thấp nhất (cần nhập thêm)\n5. Sắp xếp và in danh sách theo giá GIẢM DẦN\n\n**Output mong đợi:**\n```\n⚠️  CẢNH BÁO HẾT HÀNG:\n    - Giáp Địa Long   (mã: RZ-ARM-0002) — Liên hệ nhà cung cấp!\n    - Kiếm Ánh Sáng   (mã: RZ-WPN-0005)\n\n🏆 TOP 3 DOANH THU THÁNG:\n    1. Kiếm Rồng +10  — 12,500,000 đ\n    2. Giáp Địa Long  —  9,600,000 đ (dù hết hàng!)\n    2. Khiên Sắt      —  9,600,000 đ\n\n📦 GIÁ TRỊ TỒN KHO: 68,200,000 đ\n🔴 CẦN NHẬP THÊM  : Gậy Pháp Sư (còn 1 cái)\n```\n\n---\n\n## 🟡 Bài Tập 2: Full-text Search Engine ⭐⭐\n\n**Bối cảnh thực tế:** Tính năng tìm kiếm là trái tim của mọi marketplace. Elasticsearch, Solr đều build trên nguyên tắc này.\n\n**Yêu cầu:** Tạo `SearchEngine.java` implement **full-text search**:\n\n```java\n// Dữ liệu: 15 sản phẩm với mô tả chi tiết\nString[] ten = {...};\nString[] moTa = {\n    \"Kiếm rồng huyền thoại, sát thương tối đa, phù hợp warrior\",\n    \"Giáp địa long cấp 80, phòng thủ cao, kháng phép thuật\",\n    ...\n};\nString[] tuKhoa = {\"kiếm\", \"giáp\", \"nhẫn\", \"hài\", ...};\n\n// Implement tìm kiếm:\n// 1. Tìm trong TÊN sản phẩm (weight: 3 điểm)\n// 2. Tìm trong MÔ TẢ (weight: 1 điểm)\n// 3. Tìm trong TỪ KHÓA (weight: 2 điểm)\n// 4. Tính relevance score cho mỗi kết quả\n// 5. Sắp xếp theo relevance score giảm dần\n// 6. Không phân biệt hoa/thường\n```\n\n**Output mong đợi:**\n```\n🔍 Tìm kiếm: \"kiếm rồng\"\n\nKết quả (3 sản phẩm, sắp xếp theo độ phù hợp):\n────────────────────────────────────────────────\n[Score: 9] Kiếm Rồng +10        — 2,500,000 đ  ⭐⭐⭐⭐⭐\n[Score: 5] Kiếm Ánh Sáng        — 1,800,000 đ  ⭐⭐⭐⭐  \n[Score: 2] Giáp Địa Long        — 3,200,000 đ  ⭐⭐⭐   (mention trong mô tả)\n```\n\n---\n\n## 🔴 Bài Tập 3: CSV Parser ⭐⭐⭐\n\n**Bối cảnh thực tế:** Admin thường import sản phẩm từ file Excel/CSV. Backend cần parse CSV string thành data objects — đây là bài toán String manipulation thực tế nhất.\n\n**Yêu cầu:** Tạo `CsvParser.java`:\n\n```java\n// Dữ liệu CSV thô (như nhận từ file upload)\nString csvData = \"\"\"\n    id,name,price,category,quantity,status\n    1001,Kiếm Rồng +10,2500000,weapon,5,active\n    1002,\"Giáp Địa Long, Cấp 80\",3200000,armor,0,out_of_stock\n    1003,Nhẫn Ma Lực,800000,magic,12,active\n    1004,\"Hài Cát, Phiên bản Limited\",450000,accessory,3,active\n    1005,INVALID_PRICE,not_a_number,weapon,5,active\n    \"\"\";\n\n// TODO:\n// 1. Split theo newline để lấy từng dòng\n// 2. Parse header dòng đầu tiên\n// 3. Parse từng dòng data (chú ý: field trong nháy kép có thể chứa dấu phẩy!)\n// 4. Validate: price phải là số hợp lệ, quantity >= 0\n// 5. In báo cáo: X dòng thành công, Y dòng lỗi\n// 6. In chi tiết dòng lỗi và lý do lỗi\n```\n\n**Output mong đợi:**\n```\n=== KẾT QUẢ IMPORT CSV ===\n✅ Thành công: 4 sản phẩm\n❌ Lỗi       : 1 dòng\n\nSản phẩm đã import:\n  [1001] Kiếm Rồng +10              — 2,500,000 đ (5 cái)\n  [1002] Giáp Địa Long, Cấp 80      — 3,200,000 đ (hết hàng)\n  ...\n\nDòng lỗi:\n  Dòng 6: price=\"not_a_number\" — Không phải số hợp lệ\n```\n\n---\n\n## 🟡 Bài Tập 4: Log Formatter ⭐⭐\n\n**Bối cảnh thực tế:** Mọi hệ thống backend đều cần ghi log (Logback, Log4j). Đây là cách họ format log message với StringBuilder.\n\n**Yêu cầu:** Tạo `LogFormatter.java` tạo log entry đúng chuẩn:\n\n```java\n// Format: [LEVEL] timestamp | requestId | userId | action | details | duration\n\n// Implement LogFormatter.format() dùng StringBuilder để build log string\n// Ví dụ output:\n// [INFO ] 2024-04-03 15:30:00 | REQ-abc123 | USR-456 | PURCHASE | item=Kiếm Rồng +10 price=2500000 | 125ms\n// [ERROR] 2024-04-03 15:30:01 | REQ-abc124 | USR-456 | PAYMENT  | error=InsufficientFunds balance=500000 needed=2500000 | 23ms\n// [WARN ] 2024-04-03 15:30:02 | REQ-abc125 | USR-789 | LOGIN     | attempts=4 ip=192.168.1.1 | 8ms\n\n// Tạo 20 log entries cho một \"session\" mua hàng điển hình\n// Đếm số log mỗi level: INFO, WARN, ERROR\n// Tính average response time\n```\n\n**Thử thách:** Implement `StringBuilder.insert()` để thêm `[CRITICAL]` prefix vào mọi dòng ERROR trong log sau khi đã tạo xong.\n\n---\n\n## 🔴 Bài Tập 5 (BONUS): 2D Array — Ma Trận Giá Theo Khung Giờ ⭐⭐⭐\n\n**Bối cảnh thực tế:** Grab, Gojek tính giá theo giờ và ngày trong tuần. RaizeShop có thể áp dụng \"flash sale\" theo mô hình tương tự.\n\n**Yêu cầu:** Tạo `DynamicPricing.java`:\n\n```java\n// Ma trận giảm giá: [7 ngày trong tuần][24 giờ trong ngày]\ndouble[][] giaGiam = new double[7][24];\n\n// Điền dữ liệu:\n// Giờ vàng (6-8am, 12-14pm, 8-10pm): giảm 20%\n// Cuối tuần (Sat, Sun): tất cả giờ giảm thêm 5%\n// Flash sale (thứ 6, 20-22pm): giảm 40%\n// Nếu không có sale: 0%\n\n// In bảng nhiệt (heatmap) dạng text:\n// Hàng = ngày, Cột = giờ (chỉ in 6am-11pm)\n// [ 0] = không sale | [10] = 10% | [20] = 20% | [40] = 40%\n\n// Tìm: Tổng số slot có sale, giờ nào có sale nhiều nhất\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Bài CSV Parser: tại sao không thể dùng `.split(\",\")` cho CSV có field trong nháy kép? Viết regex đúng hoặc logic xử lý thủ công.\n- [ ] StringBuilder vs String concatenation: trong bài Log Formatter với 1 triệu log entries, hiệu năng chênh nhau bao nhiêu? (Ước tính, giải thích tại sao)\n- [ ] Tại sao `Arrays.sort()` dùng được cho `int[]` nhưng không dùng được trực tiếp cho sort custom object theo field? (preview của Comparable/Comparator)\n- [ ] `String.split()` với regex: `\"a,,b\".split(\",\")` trả về mấy phần tử? Kết quả là gì? Bạn có biết tham số limit?\n\n---\n\n👉 **Tiếp theo:** [Bài 06 – Method](../bai-06-method/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Khi thay đổi nội dung String (ví dụ s = s + \"abc\"), điều gì xảy ra trong bộ nhớ?",
        "options": [
          "String ban đầu được cập nhật trực tiếp.",
          "Một String mới hoàn toàn được tạo ra, biến s trỏ sang đối tượng mới.",
          "Java tự giải phóng vùng nhớ cũ và ghi đè.",
          "Câu lệnh gây lỗi biên dịch vì String không thể đổi."
        ],
        "answer": 1,
        "explanation": "String trong Java là Immutable (bất biến). Mỗi lần thay đổi, Java tạo String mới chứ không sửa trực tiếp ô nhớ cũ."
      },
      {
        "q": "Để nối chuỗi hiệu quả trong vòng lặp chạy nhiều lần, class nào được khuyên dùng?",
        "options": [
          "String",
          "StringBuffer",
          "StringBuilder",
          "StringJoiner"
        ],
        "answer": 2,
        "explanation": "`StringBuilder` được thiết kế để sửa đổi chuỗi mà không tạo nhiều đối tượng rác. Nhanh hơn StringBuffer (không đồng bộ)."
      },
      {
        "q": "Phần tử đầu tiên của mảng `int[] arr = {10, 20, 30}` có chỉ số (index) là bao nhiêu?",
        "options": [
          "1",
          "0",
          "-1",
          "Phụ thuộc vào khai báo"
        ],
        "answer": 1,
        "explanation": "Mảng trong Java (và hầu hết ngôn ngữ lập trình) được đánh chỉ số từ 0. Phần tử đầu tiên có index = 0."
      },
      {
        "q": "Điều gì xảy ra khi truy cập chỉ số vượt quá giới hạn mảng?",
        "options": [
          "Trả về 0",
          "Trả về null",
          "Ném ra ngoại lệ ArrayIndexOutOfBoundsException",
          "Lỗi biên dịch"
        ],
        "answer": 2,
        "explanation": "Truy cập index ngoài phạm vi mảng ném ra `ArrayIndexOutOfBoundsException` lúc runtime, không phải lỗi biên dịch."
      },
      {
        "q": "Cách lấy độ dài của mảng `int[] arr` là gì?",
        "options": [
          "arr.length()",
          "arr.size()",
          "arr.length",
          "length(arr)"
        ],
        "answer": 2,
        "explanation": "Mảng trong Java có thuộc tính `length` (không phải phương thức, không có dấu ()). Ví dụ: `arr.length`."
      },
      {
        "q": "String `s.charAt(0)` trả về gì?",
        "options": [
          "Toàn bộ chuỗi s",
          "Ký tự đầu tiên của chuỗi s",
          "Mã ASCII của ký tự đầu",
          "Độ dài chuỗi"
        ],
        "answer": 1,
        "explanation": "`charAt(index)` trả về ký tự tại vị trí index. `charAt(0)` trả về ký tự đầu tiên của chuỗi."
      },
      {
        "q": "`\"Hello\".substring(1, 3)` trả về gì?",
        "options": [
          "\"Hello\"",
          "\"el\"",
          "\"ell\"",
          "\"He\""
        ],
        "answer": 1,
        "explanation": "`substring(beginIndex, endIndex)` lấy từ beginIndex đến endIndex-1. Từ 1 đến 2 (không bao gồm 3): 'e', 'l' → \"el\"."
      },
      {
        "q": "`\"  Hello  \".trim()` trả về gì?",
        "options": [
          "\"Hello\"",
          "\"  Hello  \"",
          "\"Hello  \"",
          "\"  Hello\""
        ],
        "answer": 0,
        "explanation": "`trim()` loại bỏ khoảng trắng ở đầu và cuối chuỗi. \"  Hello  \" → \"Hello\"."
      },
      {
        "q": "Phương thức nào dùng để kiểm tra chuỗi s có chứa chuỗi con \"java\" không?",
        "options": [
          "s.has(\"java\")",
          "s.contains(\"java\")",
          "s.includes(\"java\")",
          "s.indexOf(\"java\") != -1 (cũng đúng, nhưng contains đơn giản hơn)"
        ],
        "answer": 1,
        "explanation": "`s.contains(\"java\")` trả về true nếu s chứa chuỗi con \"java\". Đây là cách đơn giản và trực quan nhất."
      },
      {
        "q": "Mảng 2 chiều trong Java khai báo thế nào?",
        "options": [
          "int arr[][]",
          "int[][] arr",
          "int[2][3] arr = new int;",
          "Cả A và B đều đúng"
        ],
        "answer": 3,
        "explanation": "Cả hai cú pháp `int[][] arr` và `int arr[][]` đều hợp lệ trong Java, nhưng `int[][] arr` được khuyên dùng hơn vì rõ ràng hơn."
      },
      {
        "q": "`\"Java\".toUpperCase()` trả về gì?",
        "options": [
          "\"java\"",
          "\"JAVA\"",
          "\"Java\"",
          "Lỗi"
        ],
        "answer": 1,
        "explanation": "`toUpperCase()` chuyển tất cả ký tự trong chuỗi thành chữ hoa. \"Java\" → \"JAVA\"."
      },
      {
        "q": "Để tạo một mảng 5 phần tử kiểu int khởi tạo bằng 0, cú pháp nào đúng?",
        "options": [
          "int[] arr = new int[5];",
          "int[] arr = {0, 0, 0, 0, 0};",
          "Cả hai đều đúng",
          "int arr = new int(5);"
        ],
        "answer": 2,
        "explanation": "Cả hai đều hợp lệ. `new int[5]` tạo mảng 5 phần tử và mặc định khởi tạo bằng 0. Cú pháp `{}` khởi tạo tường minh."
      },
      {
        "q": "`String.valueOf(42)` làm gì?",
        "options": [
          "Chuyển chuỗi \"42\" sang int 42",
          "Chuyển int 42 sang chuỗi \"42\"",
          "Kiểm tra xem 42 có phải String không",
          "Trả về null"
        ],
        "answer": 1,
        "explanation": "`String.valueOf()` chuyển đổi bất kỳ kiểu dữ liệu nào sang String. `String.valueOf(42)` → \"42\"."
      },
      {
        "q": "Lớp nào trong gói java.util.regex được dùng để định nghĩa một mẫu tìm kiếm biểu thức chính quy?",
        "options": [
          "Matcher",
          "RegEx",
          "Pattern",
          "PatternMatcher"
        ],
        "answer": 2,
        "explanation": "Lớp Pattern dùng để biên dịch biểu thức chính quy thành một mẫu (pattern)."
      }
    ],
    "practice": {
      "fileName": "UsernameStandardizer.java",
      "instructions": "### Yêu cầu:\nKhi người dùng đăng ký tài khoản game trên hệ thống, họ thường gõ tên cẩu thả (nhiều dấu cách thừa, viết hoa lộn xộn).\nHãy dùng các hàm xử lý chuỗi (`trim`, `split`, `toUpperCase`, `substring`) để chuẩn hóa chuỗi `rawUsername = \"   ngUyen   vaN   aN   \"`\nvề dạng chuẩn đẹp: `Nguyen Van An`.\nIn kết quả dạng: `Tên sau chuẩn hóa: [tên đã chuẩn hóa]`.\n",
      "starterCode": "public class UsernameStandardizer {\n    public static void main(String[] args) {\n        String rawUsername = \"   ngUyen   vaN   aN   \";\n        String cleanName = \"\";\n\n        // TODO: Viết code xử lý chuỗi ở đây để làm sạch và chuẩn hóa chữ hoa/thường\n        String[] words = rawUsername.trim().split(\"\\\\s+\");\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < words.length; i++) {\n            String w = words[i];\n            if (w.length() > 0) {\n                sb.append(w.substring(0, 1).toUpperCase());\n                sb.append(w.substring(1).toLowerCase());\n                if (i < words.length - 1) {\n                    sb.append(\" \");\n                }\n            }\n        }\n        cleanName = sb.toString();\n\n        System.out.println(\"Tên sau chuẩn hóa: \" + cleanName);\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!output.includes(\"Nguyen Van An\")) {\r\n        return { pass: false, msg: \"Tên chưa được chuẩn hóa đúng. Phải ra kết quả chính xác là 'Nguyen Van An' (không chứa khoảng trắng thừa ở hai đầu và giữa các từ).\" };\r\n      }\r\n      return { pass: true, msg: \"Xử lý chuỗi rất mượt mà! Kỹ năng thao tác String này cực kỳ cần thiết cho việc xử lý dữ liệu đầu vào sau này.\" };\r\n    }"
    }
  },
  {
    "id": 6,
    "title": "Phương Thức (Method)",
    "phase": "Phase 1: Fundamentals",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 06: Method (Hàm / Phương Thức)\n\n> 🟡 **Phase 1 – Bài 6/7** | Thời gian: ~3 giờ\n\n---\n\nBạn có nhận ra điều này chưa: ở các bài trước, khi cần tính tổng, cần tìm max, cần format tiền — bạn phải viết đi viết lại cùng một logic. Trong dự án thực tế, điều này tạo ra \"code trùng lặp\" — thứ mà các kỹ sư phần mềm ghét nhất.\n\n**Method** (hay còn gọi là hàm) là giải pháp: viết một lần, gọi được ở mọi nơi.\n\n---\n\n## 1. Tại Sao Cần Method?\n\n```java\n// ❌ Không có method — copy-paste khắp nơi:\n// Chỗ 1: Tính tổng lớp A\nint tongA = 0;\nfor (int d : diemLopA) tongA += d;\ndouble tbA = (double) tongA / diemLopA.length;\n\n// Chỗ 2: Tính tổng lớp B — cùng logic, copy lại!\nint tongB = 0;\nfor (int d : diemLopB) tongB += d;\ndouble tbB = (double) tongB / diemLopB.length;\n\n// ✅ Có method — viết một lần dùng mọi nơi:\ndouble tbA = tinhTrungBinh(diemLopA);\ndouble tbB = tinhTrungBinh(diemLopB);\n// Khi cần sửa logic → sửa một chỗ, tất cả nơi dùng đều được cập nhật!\n```\n\n---\n\n## 2. Giải Phẫu Một Method\n\n```java\npublic static double tinhTrungBinh(int[] diem) {\n//   ↑       ↑        ↑                ↑\n//   |       |     Kiểu trả về      Tham số đầu vào (parameter)\n//   |       |\n//   |    static: gọi được mà không cần tạo object\n// public: ai cũng gọi được\n\n    if (diem.length == 0) return 0;  // Xử lý edge case trước!\n\n    int tong = 0;\n    for (int d : diem) tong += d;\n    return (double) tong / diem.length;  // Từ khóa return\n}\n```\n\nBốn thứ bạn cần xác định khi viết method:\n1. **Tên** — động từ, camelCase: `tinhTrungBinh`, `formatTien`, `kiemTraEmail`\n2. **Kiểu trả về** — trả về gì? Nếu không trả gì thì là `void`\n3. **Tham số** — cần nhận vào những gì?\n4. **Logic** — làm gì bên trong?\n\n---\n\n## 3. Method Trả Về Giá Trị\n\n```java\n// Trả về số\npublic static int tinhTong(int a, int b) {\n    return a + b;\n}\n\n// Trả về String\npublic static String xepLoai(double diem) {\n    if (diem >= 9.0) return \"Xuất sắc\";\n    if (diem >= 8.0) return \"Giỏi\";\n    if (diem >= 6.5) return \"Khá\";\n    if (diem >= 5.0) return \"Trung bình\";\n    return \"Yếu\";\n}\n\n// Trả về boolean — thường đặt tên bắt đầu bằng is/has/can\npublic static boolean laSoNguyenTo(int n) {\n    if (n < 2) return false;\n    for (int i = 2; i <= Math.sqrt(n); i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}\n```\n\nGọi method và dùng kết quả:\n\n```java\npublic static void main(String[] args) {\n    System.out.println(tinhTong(5, 3));          // 8\n    System.out.println(xepLoai(8.5));            // Giỏi\n    System.out.println(laSoNguyenTo(17));        // true\n\n    // Dùng trong điều kiện:\n    if (laSoNguyenTo(29)) {\n        System.out.println(\"29 là số nguyên tố\");\n    }\n\n    // Dùng trong biểu thức:\n    double diemHocSinh = 7.8;\n    System.out.println(\"Học lực: \" + xepLoai(diemHocSinh));\n}\n```\n\n---\n\n## 4. Method `void` — Thực Hiện Hành Động, Không Trả Về\n\n```java\n// void: không return giá trị, chỉ làm gì đó\npublic static void inDuongKe(int soKy) {\n    System.out.println(\"─\".repeat(soKy));\n}\n\npublic static void inBangCuuChuong(int so) {\n    System.out.println(\"=== Bảng \" + so + \" ===\");\n    for (int i = 1; i <= 10; i++) {\n        System.out.printf(\"%d × %2d = %3d%n\", so, i, so * i);\n    }\n}\n\n// Gọi void method — không gán vào biến\ninDuongKe(30);\ninBangCuuChuong(7);\n```\n\n---\n\n## 5. Parameter vs Argument — Đừng Nhầm\n\n```java\n// Khi ĐỊNH NGHĨA → gọi là \"parameter\" (tham số)\npublic static double tinh(double chieuDai, double chieuRong) {\n//                                ↑               ↑\n//                         tham số: chieuDai, chieuRong\n\n// Khi GỌI → gọi là \"argument\" (đối số)\ntinh(5.0, 3.0);\n//    ↑    ↑\n// đối số: 5.0, 3.0\n```\n\ntôi biết hai cái này nghe có vẻ giống nhau. Nhưng khi đi phỏng vấn hoặc đọc tài liệu kỹ thuật, bạn sẽ gặp hai từ này và cần biết phân biệt.\n\n---\n\n## 6. Java Luôn \"Pass by Value\"\n\nĐây là điều làm nhiều người nhầm khi mới học:\n\n```java\npublic static void tangLen(int x) {\n    x = x + 100;\n    System.out.println(\"Trong method: x = \" + x);  // 105\n}\n\npublic static void main(String[] args) {\n    int a = 5;\n    tangLen(a);\n    System.out.println(\"Ngoài method: a = \" + a);  // Vẫn là 5!\n}\n```\n\nTại sao? Vì Java **truyền bản sao** của giá trị vào method. `x` trong method là bản sao của `a`, không phải `a` thật. Thay đổi `x` không ảnh hưởng `a`.\n\n> 💡 **Lưu ý:** Với Object (mảng, class...) thì khác hơn một chút — Java vẫn pass by value nhưng \"value\" ở đây là **địa chỉ** của object. Bạn sẽ hiểu rõ hơn khi học OOP ở bài 07.\n\n---\n\n## 7. Method Overloading — Cùng Tên, Khác Kiểu\n\n```java\n// Ba method cùng tên \"cong\" nhưng khác tham số — Java tự phân biệt:\npublic static int cong(int a, int b) {\n    return a + b;\n}\n\npublic static double cong(double a, double b) {\n    return a + b;\n}\n\npublic static int cong(int a, int b, int c) {\n    return a + b + c;\n}\n\n// Java chọn đúng method dựa trên kiểu đối số bạn truyền vào:\ncong(1, 2)         // → gọi cong(int, int)\ncong(1.5, 2.5)     // → gọi cong(double, double)\ncong(1, 2, 3)      // → gọi cong(int, int, int)\n```\n\n---\n\n## 8. Varargs — Số Lượng Đối Số Không Cố Định\n\n```java\n// int... → bên trong method, soList là một mảng int\npublic static int tongNhieu(int... soList) {\n    int tong = 0;\n    for (int x : soList) tong += x;\n    return tong;\n}\n\n// Gọi với bất kỳ số lượng nào:\ntongNhieu(1, 2);               // 3\ntongNhieu(1, 2, 3, 4, 5);     // 15\ntongNhieu();                   // 0\ntongNhieu(10, 20, 30, 40);    // 100\n```\n\n---\n\n## 9. Đệ Quy (Recursion) — Method Tự Gọi Bản Thân\n\nĐây là chủ đề hơi phức tạp nhưng rất thú vị. Một method có thể gọi lại chính nó!\n\n```java\n// Tính n! (giai thừa): 5! = 5 × 4 × 3 × 2 × 1 = 120\npublic static long giaiThua(int n) {\n    if (n <= 1) return 1;              // ← BASE CASE: điều kiện dừng — BẮT BUỘC!\n    return n * giaiThua(n - 1);        // ← RECURSIVE CASE: tự gọi với bài toán nhỏ hơn\n}\n\n// Trace call stack:\n// giaiThua(5) = 5 × giaiThua(4)\n//                     = 4 × giaiThua(3)\n//                             = 3 × giaiThua(2)\n//                                     = 2 × giaiThua(1)\n//                                             = 1   ← Dừng ở đây!\n// Kết quả được tính ngược lên: 2×1=2, 3×2=6, 4×6=24, 5×24=120\n```\n\n> ⚠️ **Phải có base case!** Nếu không có điều kiện dừng, method sẽ gọi nhau vô tận đến khi bộ nhớ hết — `StackOverflowError`. Đây là lỗi phổ biến khi viết đệ quy. Khi bạn gặp lỗi này, câu hỏi đầu tiên là: \"Base case của mình đúng chưa?\"\n\n---\n\n## 10. Ví Dụ Thực Tế: Bộ Helper Methods Cho Shop\n\n```java\npublic class ShopUtils {\n\n    // Format tiền Việt\n    public static String formatTien(double so) {\n        return String.format(\"%,.0f đ\", so);\n    }\n\n    // Tính giá sau giảm\n    public static double tinhGiaSauGiam(double giaGoc, double phanTramGiam) {\n        if (phanTramGiam < 0 || phanTramGiam > 100) {\n            throw new IllegalArgumentException(\"Phần trăm phải từ 0-100\");\n        }\n        return giaGoc * (1 - phanTramGiam / 100.0);\n    }\n\n    // Kiểm tra username hợp lệ\n    public static boolean hopLeUsername(String username) {\n        return username != null\n            && !username.isBlank()\n            && username.length() >= 4\n            && username.length() <= 20;\n    }\n\n    // Xếp hạng người bán\n    public static String xepHangNguoiBan(double rating, int soGiaoDich) {\n        if (soGiaoDich < 5)                      return \"🆕 Mới\";\n        if (rating >= 4.5 && soGiaoDich >= 50)   return \"⭐ Uy tín cao\";\n        if (rating >= 4.0 && soGiaoDich >= 20)   return \"👍 Tốt\";\n        if (rating >= 3.0)                        return \"😐 Trung bình\";\n        return \"⚠️ Cẩn thận\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(formatTien(1_500_000));             // 1,500,000 đ\n\n        double giaSau = tinhGiaSauGiam(1_000_000, 15);\n        System.out.println(\"Giá sau giảm 15%: \" + formatTien(giaSau)); // 850,000 đ\n\n        System.out.println(hopLeUsername(\"raize99\"));          // true\n        System.out.println(hopLeUsername(\"ab\"));               // false (< 4 ký tự)\n\n        System.out.println(xepHangNguoiBan(4.7, 100));        // ⭐ Uy tín cao\n        System.out.println(xepHangNguoiBan(3.5, 3));          // 🆕 Mới\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 06\n\n```\n✅ Method = khối code có tên, làm một việc, gọi được nhiều lần\n✅ Cú pháp: [modifier] kiểuTrảVề tênMethod(thamSo) { return ...; }\n✅ void = không trả về giá trị\n✅ Java pass by value — primitive không bị thay đổi bởi method\n✅ Overloading: cùng tên, khác tham số\n✅ Varargs (int... args): số lượng đối số linh hoạt\n✅ Đệ quy: phải có base case — không có → StackOverflowError\n```\n\n---\n\n## ➡️ Phase 2 Bắt Đầu!\n\nBạn vừa hoàn thành Phase 1 — nền tảng cơ bản của Java. Xin chúc mừng! Bạn đã biết lưu dữ liệu, ra quyết định, lặp lại, và tổ chức code thành method.\n\nNhưng bây giờ mọi thứ sẽ thú vị hơn rất nhiều. Phase 2 là **OOP — Lập Trình Hướng Đối Tượng**. Đây là phần mà Java \"khác biệt\" so với các ngôn ngữ script đơn giản. Và cũng là nền tảng để bạn hiểu được Spring Boot, Android và mọi framework Java lớn sau này.\n\n👉 **[Bài 07: Class và Object — Nền Tảng OOP](../../phase2-oop/bai-07-class-object/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 06: Method\n\n> 🎯 **Bối cảnh dự án:** Xây dựng **utility library** cho RaizeShop — các helper method dùng lại ở nhiều nơi trong codebase.\n\n---\n\n## 🔴 Bài Tập 1: ShopUtils Library ⭐⭐\n\n**Bối cảnh thực tế:** Trong mọi dự án thực tế, team sẽ tạo một class utility chứa các method tái sử dụng. Đây là công việc của một Java developer ngay từ ngày đầu.\n\n**Yêu cầu:** Tạo `ShopUtils.java` với đủ 8 utility method sau:\n\n```java\npublic class ShopUtils {\n\n    // 1. Format tiền VND đẹp: 1500000 → \"1,500,000 đ\"\n    public static String formatVND(double amount) { ... }\n\n    // 2. Format tiền ngắn: 1500000 → \"1.5M\" | 500000 → \"500K\"\n    public static String formatShort(double amount) { ... }\n\n    // 3. Tính giá sau giảm, throw exception nếu % giảm không hợp lệ\n    public static double applyDiscount(double price, double discountPercent) { ... }\n\n    // 4. Validate email (phải có @, có domain, không có space)\n    public static boolean isValidEmail(String email) { ... }\n\n    // 5. Validate số điện thoại VN (bắt đầu 0, đủ 10 số)\n    public static boolean isValidPhone(String phone) { ... }\n\n    // 6. Tạo order ID: \"RZ-\" + năm + tháng + \"-\" + 6 số ngẫu nhiên\n    //    VD: \"RZ-202404-836291\"\n    public static String generateOrderId() { ... }\n\n    // 7. Mask thông tin nhạy cảm:\n    //    \"0912345678\" → \"091****678\"\n    //    \"user@email.com\" → \"us**@e***.com\"\n    public static String maskSensitive(String data, String type) { ... }\n\n    // 8. Tính điểm tích lũy: mỗi 10,000đ = 1 điểm, VIP nhân đôi\n    public static int calculatePoints(double amount, boolean isVip) { ... }\n\n    // Main để test tất cả method\n    public static void main(String[] args) {\n        System.out.println(formatVND(1_500_000));          // 1,500,000 đ\n        System.out.println(formatShort(1_500_000));         // 1.5M\n        System.out.println(applyDiscount(2_000_000, 15));   // 1700000.0\n        System.out.println(isValidEmail(\"user@gmail.com\")); // true\n        System.out.println(isValidEmail(\"invalid.email\"));  // false\n        System.out.println(generateOrderId());              // RZ-202404-XXXXXX\n        System.out.println(maskSensitive(\"0912345678\", \"phone\")); // 091****678\n        System.out.println(calculatePoints(150_000, false)); // 15 points\n        System.out.println(calculatePoints(150_000, true));  // 30 points\n    }\n}\n```\n\n---\n\n## 🟡 Bài Tập 2: Method Overloading — Tính Giá Linh Hoạt ⭐⭐\n\n**Bối cảnh thực tế:** API design tốt thường cung cấp nhiều overload để caller có thể gọi theo cách phù hợp nhất với data họ có.\n\n**Yêu cầu:** Tạo `PriceCalculator.java` với nhiều overload của `calculateTotal`:\n\n```java\n// Overload 1: Tính 1 sản phẩm (giá x số lượng)\npublic static double calculateTotal(double price, int qty) { ... }\n\n// Overload 2: Tính có giảm giá\npublic static double calculateTotal(double price, int qty, double discountPercent) { ... }\n\n// Overload 3: Tính có giảm giá VÀ VAT\npublic static double calculateTotal(double price, int qty, double discountPercent, boolean includeVat) { ... }\n\n// Overload 4: Tính cho nhiều sản phẩm (mảng giá và số lượng)\npublic static double calculateTotal(double[] prices, int[] quantities) { ... }\n\n// Overload 5: Varargs — tính tổng nhiều đơn hàng nhỏ\npublic static double calculateTotal(double... orderAmounts) { ... }\n```\n\n**Test case thực tế:**\n```java\n// Khách mua 3 Kiếm Rồng, giảm 20%, có VAT\ndouble bill = calculateTotal(1_500_000, 3, 20, true);\n// = 1,500,000 × 3 × 0.8 × 1.1 = 3,960,000 đ\nSystem.out.println(\"Hóa đơn: \" + ShopUtils.formatVND(bill));\n\n// Admin tính tổng doanh thu nhiều đơn hàng\ndouble tongDoanhThu = calculateTotal(1_500_000, 800_000, 2_300_000, 450_000);\n```\n\n---\n\n## 🟡 Bài Tập 3: Validation Framework ⭐⭐\n\n**Bối cảnh thực tế:** Trước khi lưu dữ liệu vào database, mọi backend đều phải validate input. Đây là pattern `static boolean is/validate...` cực kỳ phổ biến.\n\n**Yêu cầu:** Tạo `InputValidator.java`:\n\n```java\n// Validate sản phẩm trước khi đăng lên shop\npublic static String validateProduct(String name, double price, \n                                      int quantity, String category) {\n    // Kiểm tra từng field\n    // name: không được null/blank, 3-100 ký tự, không có ký tự đặc biệt <>\n    // price: > 0 và <= 999,999,999\n    // quantity: >= 0 và <= 9999\n    // category: phải thuộc [\"weapon\",\"armor\",\"magic\",\"accessory\",\"pet\"]\n    //\n    // Return: null nếu hợp lệ, hoặc String mô tả lỗi đầu tiên tìm thấy\n}\n\n// Validate hàng loạt và trả về danh sách lỗi\npublic static List<String> validateProductFull(String name, double price,\n                                                int quantity, String category) {\n    // Kiểm tra TẤT CẢ field và gom lỗi lại\n    // Return: List rỗng nếu hợp lệ, hoặc List các dòng lỗi\n}\n```\n\n**Test với data thực tế:**\n```\n✅ Kiếm Rồng +10, 1500000, 5, weapon       → HỢP LỆ\n❌ \"\", 1500000, 5, weapon                  → Tên không được để trống\n❌ Kiếm, -5000, 5, weapon                 → Giá phải > 0\n❌ Kiếm<script>, 500000, 5, weapon        → Tên chứa ký tự không hợp lệ\n❌ Kiếm Rồng, 500000, -1, robot          → Nhiều lỗi: số lượng âm, danh mục sai\n```\n\n---\n\n## 🔴 Bài Tập 4: Recursive — Tính Phí Giới Thiệu (Referral) ⭐⭐⭐\n\n**Bối cảnh thực tế:** Hệ thống MLM/referral: khi A giới thiệu B, B giới thiệu C... Khi C mua hàng, cả chuỗi đều nhận hoa hồng theo cấp. Đây là bài toán đệ quy điển hình trong fintech.\n\n**Yêu cầu:** Tạo `ReferralSystem.java`:\n\n```java\n// Cấu trúc chuỗi giới thiệu (dùng array song song)\nString[] users   = {\"Root\", \"UserA\", \"UserB\", \"UserC\", \"UserD\"};\nint[]    parents = {-1,      0,       1,       2,       2      };\n// Root không có parent (-1)\n// UserA được Root giới thiệu\n// UserB được UserA giới thiệu\n// UserC được UserB giới thiệu\n// UserD được UserB giới thiệu (cùng referrer với UserC)\n\n// Hoa hồng theo cấp:\n// Cấp 1 (trực tiếp): 5%\n// Cấp 2: 2%\n// Cấp 3: 1%\n// Cấp 4+: 0.5%\n\n// Khi UserD mua hàng 1,500,000 đ:\n// UserB (cấp 1): 75,000 đ (5%)\n// UserA (cấp 2): 30,000 đ (2%)\n// Root  (cấp 3): 15,000 đ (1%)\n// → Viết method đệ quy tính và in referral chain\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Tại sao validator method nên **return `List<String>` (tất cả lỗi)** thay vì throw exception ngay lỗi đầu tiên? Điều này ảnh hưởng thế nào đến UX của người dùng điền form?\n- [ ] Pass by value với array: nếu method nhận `double[] prices` và sửa `prices[0] = 999`, giá trị ngoài có bị thay đổi không? Giải thích và khi nào đây là feature, khi nào là bug?\n- [ ] `generateOrderId()` dùng `Math.random()` — điều này có thể gây ra **collision** (2 đơn hàng cùng ID) không? Trong production, developer dùng gì thay thế?\n- [ ] Method `maskSensitive()` với logic phức tạp — test case nào quan trọng nhất cần test? Viết 5 test case biên (edge case).\n\n---\n\n👉 **Tiếp theo:** [Bài 07 – Class & Object](../../phase2-oop/bai-07-class-object/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Nạp chồng phương thức (Method Overloading) xác định dựa trên yếu tố nào?",
        "options": [
          "Các phương thức trùng tên nhưng khác kiểu trả về.",
          "Các phương thức trùng tên nhưng khác danh sách tham số.",
          "Các phương thức khác tên nhưng cùng tham số.",
          "Các phương thức trùng tên và tham số nhưng khác access modifier."
        ],
        "answer": 1,
        "explanation": "Overloading yêu cầu cùng tên nhưng khác danh sách tham số (khác kiểu, khác số lượng, hoặc khác thứ tự)."
      },
      {
        "q": "Varargs trong Java khai báo bằng ký hiệu nào?",
        "options": [
          "String[] args",
          "String... args",
          "String args*",
          "String args[]..."
        ],
        "answer": 1,
        "explanation": "Varargs dùng `...` sau kiểu dữ liệu. Trong phương thức, biến này được đối xử như một mảng."
      },
      {
        "q": "Giá trị trả về (return value) của phương thức `void` là gì?",
        "options": [
          "null",
          "0",
          "false",
          "Không có giá trị nào - void không trả về gì"
        ],
        "answer": 3,
        "explanation": "Phương thức `void` không trả về bất kỳ giá trị nào. Từ khóa `return;` trong void chỉ để thoát khỏi phương thức sớm."
      },
      {
        "q": "Phương thức đệ quy (recursive method) là gì?",
        "options": [
          "Phương thức gọi phương thức khác trong cùng class",
          "Phương thức tự gọi chính nó",
          "Phương thức lặp lại code nhiều lần",
          "Phương thức không có tham số"
        ],
        "answer": 1,
        "explanation": "Đệ quy là kỹ thuật phương thức tự gọi chính nó. Mỗi lần gọi đệ quy phải tiến đến điều kiện dừng (base case) để tránh vòng đệ quy vô hạn."
      },
      {
        "q": "Tham số trong Java được truyền theo cơ chế nào?",
        "options": [
          "Pass-by-reference (tham chiếu) cho mọi kiểu dữ liệu",
          "Pass-by-value (tham trị) cho mọi kiểu dữ liệu",
          "Pass-by-reference cho primitive, pass-by-value cho object",
          "Pass-by-value cho primitive, pass-by-reference (trị của địa chỉ) cho object"
        ],
        "answer": 3,
        "explanation": "Java luôn truyền tham trị. Với primitive: truyền giá trị số. Với object: truyền giá trị của địa chỉ (reference value), không phải object. Nên thay đổi trường của object thì thấy được, nhưng gán lại biến thì không ảnh hưởng bên ngoài."
      },
      {
        "q": "Access modifier `private` cho phương thức có nghĩa gì?",
        "options": [
          "Phương thức chỉ truy cập được từ cùng package",
          "Phương thức chỉ truy cập được từ cùng class định nghĩa nó",
          "Phương thức truy cập được từ mọi class",
          "Phương thức chỉ truy cập được từ subclass"
        ],
        "answer": 1,
        "explanation": "`private` giới hạn truy cập hoàn toàn trong class định nghĩa nó. Các class khác, kể cả subclass, không thể gọi trực tiếp."
      },
      {
        "q": "Phương thức `static` khác phương thức `instance` ở điểm nào?",
        "options": [
          "static method chạy chậm hơn",
          "static method thuộc về class, gọi qua tên class. Instance method thuộc về object, cần tạo object trước.",
          "static method chỉ dùng được trong main()",
          "Instance method không cần tham số"
        ],
        "answer": 1,
        "explanation": "Static method thuộc class → gọi: `ClassName.method()`. Instance method thuộc object → phải tạo object trước: `obj.method()`."
      },
      {
        "q": "Kết quả của factorial(3) khi factorial(n) = n * factorial(n-1), factorial(0) = 1?",
        "options": [
          "3",
          "6",
          "9",
          "1"
        ],
        "answer": 1,
        "explanation": "factorial(3) = 3 * factorial(2) = 3 * 2 * factorial(1) = 3 * 2 * 1 * factorial(0) = 3 * 2 * 1 * 1 = 6."
      },
      {
        "q": "Khi gọi phương thức trong Java, Stack Frame được tạo ra để làm gì?",
        "options": [
          "Lưu toàn bộ chương trình",
          "Lưu các biến cục bộ và trạng thái của lần gọi phương thức đó",
          "Lưu kết nối database",
          "Xử lý ngoại lệ"
        ],
        "answer": 1,
        "explanation": "Mỗi lần gọi phương thức, JVM tạo một Stack Frame chứa: tham số, biến cục bộ, và thông tin trở về. Frame bị xóa khi phương thức kết thúc."
      },
      {
        "q": "Có thể có bao nhiêu lệnh `return` trong một phương thức Java?",
        "options": [
          "Chỉ một",
          "Tối đa 2",
          "Nhiều tùy ý, nhưng mỗi lần gọi chỉ chạy một lệnh return",
          "Không có giới hạn nhưng phải là lệnh cuối cùng"
        ],
        "answer": 2,
        "explanation": "Phương thức có thể có nhiều lệnh `return` (ví dụ: trong các nhánh if-else), nhưng khi chạy, chỉ một lệnh `return` được thực thi mỗi lần gọi."
      },
      {
        "q": "Phương thức nào sau đây được gọi là phương thức utility/helper?",
        "options": [
          "Phương thức main()",
          "Phương thức private thực hiện nhiệm vụ nhỏ được gọi bởi các phương thức khác",
          "Phương thức constructor",
          "Phương thức abstract"
        ],
        "answer": 1,
        "explanation": "Helper/utility method là phương thức (thường private) thực hiện một chức năng nhỏ, cụ thể, được tái sử dụng bởi các phương thức khác trong class."
      }
    ],
    "practice": {
      "fileName": "TaxCalculator.java",
      "instructions": "### Yêu cầu:\nXây dựng một lớp `TaxCalculator` chứa phương thức tự định nghĩa:\n- Phương thức `calculateFinalPrice` nhận vào giá bán gốc (`double`), tính toán và trả về giá cuối cùng sau khi cộng thêm **10%** thuế VAT và **5%** phí sàn giao dịch (tổng cộng cộng thêm **15%** vào giá gốc).\n- Trong phương thức `main`, gọi phương thức trên với giá trị gốc là `2000000` đ và in kết quả ra màn hình.\n",
      "starterCode": "public class TaxCalculator {\n    public static void main(String[] args) {\n        double price = 2000000;\n        double finalPrice = calculateFinalPrice(price);\n        System.out.println(\"Thành tiền: \" + (int)finalPrice);\n    }\n\n    // TODO: Khai báo phương thức calculateFinalPrice tại đây\n    public static double calculateFinalPrice(double basePrice) {\n        return basePrice * 1.15;\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"calculateFinalPrice\") || !code.includes(\"static\")) {\r\n        return { pass: false, msg: \"Em cần khai báo một phương thức static có tên là 'calculateFinalPrice'!\" };\r\n      }\r\n      if (!output.includes(\"2300000\") && !output.includes(\"2,300,000\")) {\r\n        return { pass: false, msg: \"Giá trị tính toán trả về chưa đúng. 2,000,000 đ cộng thêm 15% phải là 2,300,000 đ.\" };\r\n      }\r\n      return { pass: true, msg: \"Tuyệt cú mèo! Em đã biết cách khai báo và gọi phương thức tĩnh (static method) chuẩn chỉnh.\" };\r\n    }"
    }
  },
  {
    "id": 7,
    "title": "Lớp & Đối Tượng (Class & Object)",
    "phase": "Phase 2: Hướng Đối Tượng",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 07: Class và Object — Nền Tảng OOP\n\n> 🟡 **Phase 2 – Bài 1/6** | Thời gian: ~4 giờ\n\n---\n\nChào mừng bạn đến với Phase 2! tôi phải nói thật: đây là bài học quan trọng nhất trong toàn bộ lộ trình Java. Không hiểu Class và Object thì bạn không thể hiểu Spring Boot, không hiểu được codebase của bất kỳ dự án thực tế nào.\n\nTôi sẽ không vội. Hãy đọc chậm, chạy code theo, và hỏi \"tại sao\" cho mỗi thứ bạn thấy.\n\n---\n\n## 1. Vấn Đề Với Cách Tiếp Cận Cũ\n\nNhìn lại code bài 04 và 05 — bạn có nhận ra vấn đề không?\n\n```java\n// Dữ liệu của SẢN PHẨM bị tách rời thành nhiều mảng riêng lẻ:\nString[] ten    = {\"Kiếm Rồng\", \"Giáp Vàng\"};\nint[] soLuong   = {3, 1};\ndouble[] gia    = {1_200_000, 800_000};\n\n// Để in thông tin sản phẩm thứ 0:\nSystem.out.println(ten[0] + \" | \" + soLuong[0] + \" cái | \" + gia[0] + \" đ\");\n```\n\nCó gì sai ở đây? Dữ liệu của MỘT sản phẩm bị nằm rải rác ở 3 mảng khác nhau. Nếu bạn muốn thêm field `moTa`, bạn phải thêm thêm một mảng nữa. Nếu cần truyền sản phẩm vào một method, bạn phải truyền 3, 4 tham số riêng lẻ...\n\n**Class** là giải pháp: đóng gói tất cả dữ liệu liên quan vào **một đơn vị duy nhất**.\n\n---\n\n## 2. Class — Bản Thiết Kế\n\nHãy nghĩ Class như bản vẽ thiết kế ngôi nhà. Bản vẽ mô tả ngôi nhà có gì (phòng ngủ, phòng khách...) và làm được gì (mở cửa, bật điện...). Nhưng bản vẽ không phải ngôi nhà thật.\n\n```java\npublic class SanPham {\n\n    // ===== FIELDS = thuộc tính, dữ liệu của sản phẩm =====\n    String ten;\n    double gia;\n    int soLuong;\n    String danhMuc;\n    boolean dangBan;\n\n    // ===== METHODS = hành vi, thao tác lên sản phẩm =====\n\n    void inThongTin() {\n        System.out.println(\"═══════════════════════\");\n        System.out.println(\"Tên   : \" + ten);\n        System.out.printf(\"Giá   : %,.0f đ%n\", gia);\n        System.out.println(\"SL    : \" + soLuong);\n        System.out.println(\"Danh mục: \" + danhMuc);\n        System.out.println(\"Trạng thái: \" + (dangBan ? \"Đang bán\" : \"Ngừng bán\"));\n    }\n\n    boolean conHang() {\n        return soLuong > 0;\n    }\n\n    void giam5Phan() {\n        gia = gia * 0.95;  // Giảm 5%\n    }\n\n    boolean mua(int soLuongMua) {\n        if (soLuongMua > soLuong) {\n            System.out.println(\"Không đủ hàng! Chỉ còn \" + soLuong + \" sản phẩm.\");\n            return false;\n        }\n        soLuong -= soLuongMua;\n        System.out.printf(\"Mua thành công %d x %s. Còn lại: %d%n\", soLuongMua, ten, soLuong);\n        return true;\n    }\n}\n```\n\n---\n\n## 3. Object — Thực Thể Cụ Thể Từ Class\n\nTừ một class `SanPham`, bạn có thể tạo ra hàng nghìn sản phẩm khác nhau:\n\n```java\npublic class Main {\n    public static void main(String[] args) {\n\n        // \"new SanPham()\" = xây ngôi nhà từ bản vẽ\n        SanPham kiem = new SanPham();\n        kiem.ten = \"Kiếm Rồng Cấp 10\";\n        kiem.gia = 1_200_000;\n        kiem.soLuong = 3;\n        kiem.danhMuc = \"Vũ khí\";\n        kiem.dangBan = true;\n\n        SanPham giap = new SanPham();\n        giap.ten = \"Giáp Vàng Tinh Luyện\";\n        giap.gia = 800_000;\n        giap.soLuong = 1;\n        giap.danhMuc = \"Phòng thủ\";\n        giap.dangBan = true;\n\n        // Gọi method trên từng object\n        kiem.inThongTin();\n\n        System.out.println(\"\\nKiếm còn hàng? \" + kiem.conHang());  // true\n\n        kiem.mua(2);         // Mua 2 cái\n        kiem.mua(5);         // Không đủ — chỉ còn 1\n\n        System.out.println(\"\\n=== Sau khi giảm giá 5% ===\");\n        giap.giam5Phan();\n        giap.inThongTin();\n    }\n}\n```\n\n**Mỗi object là độc lập hoàn toàn.** Thay đổi `kiem.soLuong` không ảnh hưởng gì đến `giap.soLuong`. Họ chia sẻ cùng *template* (class) nhưng có dữ liệu riêng.\n\n---\n\n## 4. Memory Model — Object Sống Ở Đâu Trong RAM?\n\nĐây là kiến thức \"hậu trường\" giúp bạn hiểu những điều kỳ lạ sẽ gặp sau này:\n\n```\nStack (bộ nhớ nhỏ, nhanh)       Heap (bộ nhớ lớn, chứa objects)\n─────────────────────────        ─────────────────────────────────────────\nkiem  ──────────────────────────→  SanPham { ten=\"Kiếm Rồng\", gia=1200000, soLuong=1 }\n\ngiap  ──────────────────────────→  SanPham { ten=\"Giáp Vàng\", gia=760000, soLuong=1 }\n```\n\nBiến `kiem` và `giap` trên Stack **không chứa object**. Chúng chứa **địa chỉ** — con trỏ trỏ đến object thật sự nằm trên Heap.\n\n### Hệ quả quan trọng — Tham chiếu (Reference):\n\n```java\nSanPham a = new SanPham();\na.ten = \"Kiếm Rồng\";\na.gia = 1_200_000;\n\nSanPham b = a;  // b KHÔNG tạo object mới!\n                // b chỉ copy ĐỊA CHỈ từ a → cả hai trỏ đến cùng object\n\nb.gia = 500_000;  // Thay đổi qua b\n\nSystem.out.println(a.gia);  // 500_000 — a cũng thấy sự thay đổi!\n// Vì a và b đang trỏ đến CÙNG một object trong Heap\n```\n\nLần đầu thấy điều này, tôi debug mất cả buổi mà không hiểu tại sao. Bây giờ bạn biết trước rồi — đừng để vào bẫy nhé!\n\n---\n\n## 5. `null` — Không Trỏ Đến Đâu Cả\n\n```java\nSanPham sp = null;   // sp không trỏ đến object nào\n\nsp.inThongTin();     // ❌ NullPointerException!\n                     // Gọi method trên null = báo lỗi ngay\n```\n\n**NullPointerException** là lỗi bạn sẽ gặp nhiều nhất trong cuộc đời lập trình Java. Cách phòng tránh:\n\n```java\nif (sp != null) {\n    sp.inThongTin();\n}\n\n// Hoặc viết ngắn hơn với Objects.requireNonNull:\n// import java.util.Objects;\n// Objects.requireNonNull(sp, \"Sản phẩm không được null!\");\n```\n\n---\n\n## 6. `static` vs Instance — Phân Biệt Quan Trọng\n\n```java\npublic class SanPham {\n    // INSTANCE field: mỗi object có bản riêng\n    String ten;\n    double gia;\n\n    // STATIC field: CHUNG cho tất cả objects\n    static int tongSoSanPham = 0;   // Đếm đã tạo bao nhiêu sản phẩm\n\n    // INSTANCE method: cần object cụ thể để gọi\n    void inThongTin() {\n        System.out.println(ten + \": \" + gia + \" đ\");\n    }\n\n    // STATIC method: không cần object, gọi qua tên class\n    static int layTongSo() {\n        return tongSoSanPham;\n    }\n}\n```\n\n```java\nSanPham sp1 = new SanPham(); sp1.ten = \"Kiếm\"; SanPham.tongSoSanPham++;\nSanPham sp2 = new SanPham(); sp2.ten = \"Giáp\"; SanPham.tongSoSanPham++;\n\nSystem.out.println(SanPham.tongSoSanPham);  // 2 — static field là CHUNG\nSystem.out.println(SanPham.layTongSo());    // 2\n\nsp1.inThongTin();           // Gọi qua object: \"Kiếm: 0.0 đ\"\n// SanPham.inThongTin();    // ❌ Không được! Instance method cần object cụ thể\n```\n\n> 💡 **Ghi nhớ:** `static` = thuộc về class, không phụ thuộc vào object cụ thể. Đó là lý do `main` phải là `static` — JVM gọi `main` mà không tạo object nào.\n\n---\n\n## 7. Mảng Object\n\n```java\nSanPham[] kho = new SanPham[3];  // Tạo mảng 3 ô — tất cả đang là null!\n\nkho[0] = new SanPham();\nkho[0].ten = \"Kiếm Rồng\"; kho[0].gia = 1_200_000; kho[0].soLuong = 3;\n\nkho[1] = new SanPham();\nkho[1].ten = \"Giáp Vàng\"; kho[1].gia = 800_000; kho[1].soLuong = 1;\n\nkho[2] = new SanPham();\nkho[2].ten = \"Nhẫn Ma\"; kho[2].gia = 500_000; kho[2].soLuong = 5;\n\n// Duyệt và in\nfor (SanPham sp : kho) {\n    if (sp != null) {   // Luôn kiểm tra null khi duyệt mảng object!\n        sp.inThongTin();\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 07\n\n```\n✅ Class = bản thiết kế; Object = thực thể tạo từ class bằng \"new\"\n✅ Fields = dữ liệu của object; Methods = hành vi của object\n✅ Dot notation: object.field, object.method()\n✅ Mỗi object độc lập — thay đổi object này không ảnh hưởng object kia\n✅ Biến reference: không chứa object, chứa địa chỉ đến object trong Heap\n✅ Gán b = a → cả hai cùng trỏ 1 object (không phải copy!)\n✅ null = không trỏ đến đâu → gọi method trên null = NullPointerException\n✅ static = thuộc class, dùng chung; instance = thuộc object, mỗi cái riêng\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBạn có nhận ra không: khi tạo object, bạn đang gán từng field một — rất dài dòng và dễ quên. Bài tiếp theo Tôi sẽ dạy **Constructor** — cách tạo object gọn gàng, đúng đắn ngay từ đầu.\n\n👉 **[Bài 08: Constructor, `this` và `static` Nâng Cao](../bai-08-constructor-this-static/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 07: Class & Object\n\n> 🎯 **Bối cảnh dự án:** Thiết kế **domain model** cho RaizeShop — đây là nền tảng của mọi dự án Spring Boot/JPA thực tế.\n\n---\n\n## 🔴 Bài Tập 1: Thiết Kế Class Product ⭐⭐\n\n**Bối cảnh thực tế:** Đây chính là Java Bean / JPA Entity bạn sẽ viết trong Spring Boot. Hiểu class từ đầu giúp bạn hiểu tại sao `@Entity`, `@Column` hoạt động như vậy.\n\n**Yêu cầu:** Tạo `Product.java` và `ProductTest.java`:\n\n```java\npublic class Product {\n    // Fields (sẽ map vào cột database)\n    String id;          // \"RZ-WPN-0001\"\n    String name;        // \"Kiếm Rồng +10\"\n    String description;\n    double price;\n    int stock;\n    String category;    // \"weapon\", \"armor\", \"magic\"\n    double rating;\n    int reviewCount;\n    boolean isActive;\n    String createdAt;   // Dùng String cho đơn giản\n\n    // Behaviors (methods)\n    // 1. isInStock() → boolean\n    // 2. applyDiscount(double percent) → void (sửa price)\n    // 3. addReview(double newRating) → void (cập nhật rating TB)\n    // 4. getDisplayInfo() → String (format đẹp để hiển thị)\n    // 5. isExpensive() → boolean (price > 1,000,000)\n    // 6. getSummary() → String (dùng cho danh sách, tối đa 50 ký tự)\n}\n```\n\n**Test trong `ProductTest.java`:**\n```java\n// Tạo 3 objects Product, test tất cả method\nProduct sword = new Product();\nsword.name = \"Kiếm Rồng +10\";\nsword.price = 1_500_000;\nsword.stock = 5;\nsword.rating = 0;\nsword.reviewCount = 0;\nsword.isActive = true;\n\n// Test 1: Ai đó mua → stock giảm\nsword.stock--;\nSystem.out.println(\"Còn hàng: \" + sword.isInStock()); // true (còn 4)\n\n// Test 2: Ai đó review 5 sao → rating cập nhật\nsword.addReview(5.0);\nsword.addReview(4.5);\nSystem.out.printf(\"Rating: %.1f (%d lượt)%n\", sword.rating, sword.reviewCount);\n\n// Test 3: Admin giảm giá 20% → price cập nhật\nsword.applyDiscount(20);\nSystem.out.printf(\"Giá sau giảm: %,.0f đ%n\", sword.price); // 1,200,000\n\nSystem.out.println(sword.getDisplayInfo());\n```\n\n**Output `getDisplayInfo()` mong đợi:**\n```\n╔══════════════════════════════════════════╗\n║ Kiếm Rồng +10                           ║\n║ Danh mục: weapon | ID: RZ-WPN-0001      ║\n║ Giá: 1,200,000 đ                        ║\n║ Rating: 4.8 ⭐ (2 đánh giá)             ║\n║ Tình trạng: ✅ Còn hàng (4 cái)         ║\n╚══════════════════════════════════════════╝\n```\n\n---\n\n## 🟡 Bài Tập 2: ShoppingCart Object ⭐⭐\n\n**Bối cảnh thực tế:** Session cart (giỏ hàng) là stateful object điển hình — lưu state của người dùng trong một phiên mua sắm.\n\n**Yêu cầu:** Tạo `ShoppingCart.java`:\n\n```java\npublic class ShoppingCart {\n    String userId;\n    String[] productIds;   // Mảng ID sản phẩm trong giỏ\n    int[] quantities;       // Số lượng tương ứng\n    double[] prices;        // Giá tại thời điểm thêm vào giỏ\n    int itemCount;          // Số loại sản phẩm hiện tại\n    String voucherCode;     // Mã giảm giá (null nếu chưa áp)\n\n    // Methods:\n    // addItem(productId, price, qty) → thêm vào giỏ\n    //   - Nếu đã có → tăng số lượng\n    //   - Nếu giỏ đầy (max 10 loại) → in cảnh báo\n    //\n    // removeItem(productId) → xóa khỏi giỏ\n    //\n    // getSubtotal() → tổng trước khi giảm giá\n    //\n    // applyVoucher(code) → áp voucher (SALE20=20%, VIPONLY=30%)\n    //\n    // checkout() → in hóa đơn và \"xóa\" giỏ hàng\n    //\n    // displayCart() → in giỏ hàng dạng bảng đẹp\n}\n```\n\n**Output `displayCart()` mong đợi:**\n```\n╔═══════════════════════════════════════════════════════╗\n║                 GIỎ HÀNG CỦA raize99                 ║\n╠══════╦═══════════════════════╦═══════╦═══════════════╣\n║  STT ║ Sản phẩm              ║  SL   ║ Thành tiền    ║\n╠══════╬═══════════════════════╬═══════╬═══════════════╣\n║   1  ║ Kiếm Rồng +10         ║   2   ║  3,000,000 đ  ║\n║   2  ║ Nhẫn Hộ Mệnh          ║   1   ║    350,000 đ  ║\n║   3  ║ Giáp Băng Giá         ║   1   ║  1,200,000 đ  ║\n╠══════╩═══════════════════════╩═══════╬═══════════════╣\n║ Voucher: SALE20 (−20%)              ║   −910,000 đ  ║\n╠═════════════════════════════════════╬═══════════════╣\n║ TỔNG THANH TOÁN                     ║  3,640,000 đ  ║\n╚═════════════════════════════════════╩═══════════════╝\n```\n\n---\n\n## 🔴 Bài Tập 3: Multiple Objects Tương Tác ⭐⭐⭐\n\n**Bối cảnh thực tế:** Trong một transaction, nhiều objects tương tác nhau: User → ShoppingCart → Product → Order. Đây là cách bạn hiểu Object interaction trước khi học Service layer.\n\n**Yêu cầu:** Tạo `User.java`, `Order.java`, và `TransactionSimulator.java`:\n\n```java\n// User chứa thông tin và ví tiền\nclass User {\n    String username;\n    String email;\n    double walletBalance;\n    int loyaltyPoints;\n    String memberClass; // \"BRONZE\", \"SILVER\", \"GOLD\", \"DIAMOND\"\n    // ...\n}\n\n// Order lưu thông tin giao dịch\nclass Order {\n    String orderId;\n    String buyerUsername;\n    String[] productIds;\n    double totalAmount;\n    double discountApplied;\n    double finalAmount;\n    String status; // \"PENDING\", \"PAID\", \"CANCELLED\"\n    String createdAt;\n}\n```\n\n**Simulate một session mua hàng hoàn chỉnh:**\n```\n1. User \"raize99\" đăng nhập (tạo User object)\n2. Thêm 3 sản phẩm vào giỏ (ShoppingCart)\n3. Áp voucher SALE20\n4. Checkout → tạo Order object\n5. Thanh toán từ ví → User.walletBalance giảm\n6. Cộng loyalty points (1 điểm per 10,000đ)\n7. In receipt đầy đủ\n```\n\n**Business Rules cần implement:**\n- Membership discount chồng lên voucher: GOLD thêm 5%, DIAMOND thêm 10%\n- Loyalty points: mỗi 10,000đ = 1 điểm; 1000 điểm = voucher 50,000đ\n- Nếu ví không đủ tiền → Order status = \"CANCELLED\", in lý do\n\n---\n\n## 🟡 Bài Tập 4: Class Inventory Manager ⭐⭐\n\n**Bối cảnh thực tế:** Admin cần quản lý kho hàng — thêm/bớt sản phẩm, check tồn kho, in báo cáo.\n\n**Yêu cầu:** Tạo `Inventory.java`:\n\n```java\npublic class Inventory {\n    Product[] products;\n    int productCount;\n    int maxCapacity;    // Kho chứa tối đa bao nhiêu loại SP\n\n    // Methods:\n    // addProduct(Product p) → thêm SP vào kho\n    //   - Nếu đã tồn tại (cùng ID) → cập nhật stock, không thêm mới\n    //   - Nếu kho đầy → in cảnh báo\n    //\n    // removeProduct(String productId) → xóa SP khỏi kho\n    //\n    // findById(String id) → tìm Product theo ID\n    // findByCategory(String category) → trả về mảng Product cùng danh mục\n    // findLowStock(int threshold) → SP sắp hết hàng (stock <= threshold)\n    //\n    // getTotalValue() → tổng giá trị kho = sum(price * stock)\n    //\n    // printReport() → in báo cáo kho hàng\n}\n```\n\n**Output `printReport()` mong đợi:**\n```\n╔══════════════════════════════════════════════════════════════╗\n║              BÁO CÁO KHO HÀNG — RAIZESHOP                   ║\n║              Ngày: 03/04/2024 | Admin: raize-admin           ║\n╠═══════════════════════════╦══════╦═══════════════╦══════════╣\n║ Sản phẩm                  ║  SL  ║ Đơn giá       ║ GT Kho   ║\n╠═══════════════════════════╬══════╬═══════════════╬══════════╣\n║ Kiếm Rồng +10 [WPN]       ║   5  ║ 1,500,000 đ  ║ 7,500,000║\n║ Giáp Băng Giá [ARM]        ║   2  ║ 1,200,000 đ  ║ 2,400,000║\n║ Nhẫn Hộ Mệnh [ACC]         ║   0  ║   350,000 đ  ║         0║ ⚠️\n╠═══════════════════════════╩══════╩═══════════════╬══════════╣\n║ TỔNG GIÁ TRỊ KHO                                ║ 9,900,000║\n║ Tổng loại SP: 3 | Hết hàng: 1 | Còn hàng: 2    ║          ║\n╚═════════════════════════════════════════════════╩══════════╝\n⚠️  CẢNH BÁO: Nhẫn Hộ Mệnh hết hàng — cần nhập thêm!\n```\n\n---\n\n## 🔴 Bài Tập 5 (BONUS): Object Serialization Thủ Công ⭐⭐\n\n**Bối cảnh thực tế:** Trước khi học JSON library, hiểu cách convert object → string thủ công giúp bạn hiểu tại sao Gson/Jackson ra đời.\n\n**Yêu cầu:** Tạo method `toJson()` và `fromCsv()` cho class Product:\n\n```java\n// Product → JSON string (tự build, không dùng library)\npublic String toJson() {\n    return \"{\\n\" +\n           \"  \\\"id\\\": \\\"\" + id + \"\\\",\\n\" +\n           \"  \\\"name\\\": \\\"\" + name + \"\\\",\\n\" +\n           \"  \\\"price\\\": \" + price + \",\\n\" +\n           \"  \\\"stock\\\": \" + stock + \",\\n\" +\n           \"  \\\"isActive\\\": \" + isActive + \"\\n\" +\n           \"}\";\n}\n\n// CSV row → Product object\n// Format: id,name,price,stock,category,isActive\n// \"RZ-WPN-0001,Kiếm Rồng +10,1500000,5,weapon,true\"\npublic static Product fromCsv(String csvLine) {\n    String[] parts = csvLine.split(\",\");\n    Product p = new Product();\n    p.id = parts[0];\n    p.name = parts[1];\n    // TODO: parse price, stock, category, isActive\n    return p;\n}\n\n// Bài tập thêm:\n// Tạo static method loadFromFile(String filename) → Product[]\n// Đọc file CSV nhiều dòng, parse từng dòng thành Product\n```\n\n**Kiểm tra:** Tạo file `data/products.csv` với 5 sản phẩm, load vào mảng Product và in báo cáo.\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Tại sao `Product` ở bài 1 dùng `String createdAt` thay vì `java.util.Date`? Trong production dùng loại date nào và tại sao?\n- [ ] Sau khi code `ShoppingCart`, bạn thấy field `productIds`, `quantities`, `prices` là 3 mảng song song — điều này có vấn đề gì? Cách fix là gì? (Hint: tạo class `CartItem`)\n- [ ] `Object reference` vs `Object value`: nếu `Order o1 = order1; o1.status = \"CANCELLED\"` thì `order1.status` có bị thay đổi không? Giải thích.\n- [ ] Khi nào một \"thứ\" nên là **class** riêng, khi nào chỉ cần là **field** trong class khác? Áp dụng vào thiết kế RaizeShop.\n- [ ] Bài 5: tại sao `toJson()` tự viết không an toàn nếu `name` chứa dấu `\"` hoặc dấu `\\`? Jackson xử lý vấn đề này thế nào?\n\n---\n\n👉 **Tiếp theo:** [Bài 08 – Constructor, this, static](../bai-08-constructor-this-static/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Lớp (Class) và Đối tượng (Object) có mối quan hệ như thế nào?",
        "options": [
          "Class là thực thể chạy trong bộ nhớ, Object là bản thiết kế.",
          "Class là bản thiết kế định nghĩa thuộc tính và hành vi; Object là thực thể cụ thể tạo ra từ Class.",
          "Class và Object hoàn toàn giống nhau.",
          "Một Object có thể chứa nhiều Class bên trong."
        ],
        "answer": 1,
        "explanation": "Class như khuôn đúc. Object là sản phẩm cụ thể đúc ra từ khuôn đó, chiếm không gian thực trong bộ nhớ RAM."
      },
      {
        "q": "Từ khóa `new` trong Java dùng để làm gì?",
        "options": [
          "Khai báo biến mới",
          "Tạo ra một đối tượng mới trong bộ nhớ Heap và gọi constructor",
          "Tạo một phương thức mới",
          "Khởi tạo mảng chỉ"
        ],
        "answer": 1,
        "explanation": "`new` là toán tử tạo đối tượng: cấp phát bộ nhớ trên Heap, khởi tạo đối tượng và gọi constructor tương ứng."
      },
      {
        "q": "Thuộc tính (field/attribute) trong class được khai báo ở đâu?",
        "options": [
          "Bên trong phương thức",
          "Bên trong constructor",
          "Bên ngoài phương thức, trực tiếp trong thân class",
          "Chỉ trong phương thức main"
        ],
        "answer": 2,
        "explanation": "Các thuộc tính (instance fields) khai báo trực tiếp trong thân class, không nằm trong bất kỳ phương thức nào."
      },
      {
        "q": "OOP viết tắt của gì?",
        "options": [
          "Object-Oriented Protocol",
          "Object-Oriented Programming",
          "Object-Organized Project",
          "Open-Oriented Process"
        ],
        "answer": 1,
        "explanation": "OOP là viết tắt của Object-Oriented Programming (Lập trình Hướng đối tượng)."
      },
      {
        "q": "Có bao nhiêu tính chất cơ bản của OOP?",
        "options": [
          "2 (Đóng gói và Kế thừa)",
          "3 (Đóng gói, Kế thừa, Đa hình)",
          "4 (Đóng gói, Kế thừa, Đa hình, Trừu tượng)",
          "5"
        ],
        "answer": 2,
        "explanation": "4 tính chất cơ bản của OOP: Encapsulation (Đóng gói), Inheritance (Kế thừa), Polymorphism (Đa hình), Abstraction (Trừu tượng)."
      },
      {
        "q": "Từ khóa `this` trong Java dùng để chỉ điều gì?",
        "options": [
          "Lớp cha (superclass)",
          "Đối tượng hiện tại đang thực thi phương thức",
          "Đối tượng tiếp theo trong danh sách",
          "Lớp hiện tại (không phải đối tượng)"
        ],
        "answer": 1,
        "explanation": "`this` là tham chiếu đến đối tượng hiện tại đang được gọi phương thức. Dùng để phân biệt biến instance với tham số cùng tên."
      },
      {
        "q": "Trong Java, một class có thể kế thừa từ bao nhiêu class cha trực tiếp?",
        "options": [
          "Không giới hạn",
          "Tối đa 2",
          "Chỉ 1 (Java không hỗ trợ đa kế thừa class)",
          "3"
        ],
        "answer": 2,
        "explanation": "Java không hỗ trợ đa kế thừa class (Multiple Inheritance) để tránh Diamond Problem. Một class chỉ extends được 1 class. Tuy nhiên có thể implements nhiều interface."
      },
      {
        "q": "Phương thức `toString()` trong Java dùng để làm gì?",
        "options": [
          "Chuyển đổi số sang chuỗi",
          "Trả về biểu diễn chuỗi của đối tượng khi cần in ra",
          "Xóa đối tượng khỏi bộ nhớ",
          "Kiểm tra hai đối tượng có bằng nhau không"
        ],
        "answer": 1,
        "explanation": "`toString()` trả về biểu diễn dạng String của đối tượng. Khi dùng `System.out.println(obj)`, Java tự động gọi `obj.toString()`."
      },
      {
        "q": "Phương thức `equals()` trong Object class mặc định so sánh điều gì?",
        "options": [
          "Nội dung bên trong đối tượng",
          "Địa chỉ bộ nhớ (reference) của hai đối tượng",
          "Tên class của hai đối tượng",
          "Số lượng thuộc tính của hai đối tượng"
        ],
        "answer": 1,
        "explanation": "`equals()` mặc định trong Object class so sánh địa chỉ bộ nhớ (tương đương `==`). Cần override để so sánh nội dung."
      },
      {
        "q": "Ký hiệu UML nào biểu diễn mối quan hệ 'HAS-A' (có chứa) giữa hai class?",
        "options": [
          "Mũi tên kế thừa (rỗng đặc)",
          "Association (đường thẳng) hoặc Composition (hình thoi đặc)",
          "Mũi tên đứt nét (Dependency)",
          "Không có ký hiệu chuẩn"
        ],
        "answer": 1,
        "explanation": "'HAS-A' thể hiện một class chứa một class khác như thuộc tính. Trong UML dùng Association hoặc Composition (quan hệ sở hữu mạnh hơn)."
      },
      {
        "q": "Khai báo `public class Dog {}` và `class Dog {}` khác nhau điểm gì?",
        "options": [
          "Không có sự khác biệt",
          "`public class Dog` có thể truy cập từ mọi package, `class Dog` (package-private) chỉ trong cùng package",
          "`public class Dog` nhanh hơn",
          "`class Dog` là abstract"
        ],
        "answer": 1,
        "explanation": "Thiếu `public` → class là package-private, chỉ truy cập được trong cùng package. `public class` truy cập được từ mọi nơi."
      },
      {
        "q": "Khái niệm 'instanceof' trong Java dùng để làm gì?",
        "options": [
          "Tạo ra một instance mới của class",
          "Kiểm tra xem một đối tượng có phải là thực thể của một class (hoặc subclass) cụ thể không",
          "So sánh hai đối tượng theo giá trị",
          "Xóa đối tượng khỏi heap"
        ],
        "answer": 1,
        "explanation": "`obj instanceof ClassName` trả về true nếu obj là thực thể của ClassName hoặc bất kỳ subclass nào của nó."
      },
      {
        "q": "Làm thế nào để khởi tạo một non-static InnerClass (Inner) từ bên ngoài OuterClass (Outer)?",
        "options": [
          "Outer.Inner inner = new Outer.Inner();",
          "Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();",
          "Inner inner = new Outer().Inner();",
          "Outer.Inner inner = new Inner(outer);"
        ],
        "answer": 1,
        "explanation": "Với non-static inner class, bạn phải tạo thực thể OuterClass trước, sau đó dùng outer.new Inner()."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Lớp & Đối Tượng (Class & Object)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 07: Class & Object\n\n> 🎯 **Bối cảnh dự án:** Thiết kế **domain model** cho RaizeShop — đây là nền tảng của mọi dự án Spring Boot/JPA thực tế.\n\n---\n\n## 🔴 Bài Tập 1: Thiết Kế Class Product ⭐⭐\n\n**Bối cảnh thực tế:** Đây chính là Java Bean / JPA Entity bạn sẽ viết trong Spring Boot. Hiểu class từ đầu giúp bạn hiểu tại sao `@Entity`, `@Column` hoạt động như vậy.\n\n**Yêu cầu:** Tạo `Product.java` và `ProductTest.java`:\n\n```java\npublic class Product {\n    // Fields (sẽ map vào cột database)\n    String id;          // \"RZ-WPN-0001\"\n    String name;        // \"Kiếm Rồng +10\"\n    String description;\n    double price;\n    int stock;\n    String category;    // \"weapon\", \"armor\", \"magic\"\n    double rating;\n    int reviewCount;\n    boolean isActive;\n    String createdAt;   // Dùng String cho đơn giản\n\n    // Behaviors (methods)\n    // 1. isInStock() → boolean\n    // 2. applyDiscount(double percent) → void (sửa price)\n    // 3. addReview(double newRating) → void (cập nhật r...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 8,
    "title": "Constructor, static & this",
    "phase": "Phase 2: Hướng Đối Tượng",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 08: Constructor, `this` và `static` Nâng Cao\n\n> 🟡 **Phase 2 – Bài 2/6** | Thời gian: ~3 giờ\n\n---\n\nHãy nhìn lại cách bạn tạo object ở bài trước:\n\n```java\nSanPham sp = new SanPham();\nsp.ten = \"Kiếm Rồng\";\nsp.gia = 1_200_000;\nsp.soLuong = 3;\nsp.danhMuc = \"Vũ khí\";\n```\n\nNăm dòng chỉ để tạo một sản phẩm. Và nếu bạn quên gán một field thì sao? Object sẽ có giá trị `null` hoặc `0` ở đó mà bạn không hay biết — dẫn đến bug rất khó tìm.\n\nHôm nay Tôi sẽ dạy bạn cách viết **Constructor** để tạo object an toàn, gọn gàng hơn rất nhiều.\n\n---\n\n## 1. Constructor Là Gì?\n\n**Constructor** là một method đặc biệt chạy tự động ngay khi bạn `new` một object. Mục đích: **khởi tạo object với trạng thái hợp lệ ngay từ đầu**.\n\n```java\npublic class SanPham {\n    String ten;\n    double gia;\n    int soLuong;\n\n    // ← Đây là constructor! Cùng tên với class, không có kiểu trả về\n    public SanPham(String ten, double gia, int soLuong) {\n        this.ten = ten;          // \"this.ten\" là field của object\n        this.gia = gia;          // \"ten\" là tham số của constructor\n        this.soLuong = soLuong;\n    }\n}\n```\n\nBây giờ tạo object chỉ cần 1 dòng:\n\n```java\nSanPham kiem = new SanPham(\"Kiếm Rồng\", 1_200_000, 3);\nSanPham giap = new SanPham(\"Giáp Vàng\", 800_000, 1);\nSanPham nhan = new SanPham(\"Nhẫn Ma\",   500_000, 5);\n```\n\nGọn hơn nhiều, và **bắt buộc** phải cung cấp đủ thông tin khi tạo — không quên được nữa!\n\n---\n\n## 2. `this` Keyword — \"Tôi Chính Là Object Này\"\n\nBạn có thấy `this.ten = ten` không? Ở đây:\n\n```java\npublic SanPham(String ten, double gia, int soLuong) {\n//                  ↑\n//           Tham số constructor — che khuất field cùng tên\n\n    this.ten = ten;\n//   ↑          ↑\n// Field của   Tham số constructor\n// object này\n```\n\nKhi tham số constructor trùng tên với field, Java cần cách phân biệt. `this.ten` nghĩa là \"field `ten` của object **này**\". Nếu bạn viết `ten = ten` (không có `this`), Java sẽ hiểu nhầm — tham số gán lại tham số, field không được gán gì cả!\n\n> 💡 **Mẹo:** Khi đặt tên tham số constructor, nhiều người dùng tên khác để tránh nhầm: `tenSP` thay vì `ten`. Nhưng convention phổ biến vẫn là trùng tên và dùng `this` để phân biệt.\n\n### `this` còn dùng để gọi method khác trong cùng class:\n\n```java\npublic void inThongTinChiTiet() {\n    this.inThongTinNgan();  // Gọi method khác trong cùng class\n    System.out.println(\"Giá trị kho: \" + (this.gia * this.soLuong));\n}\n```\n\n---\n\n## 3. Overloading Constructor — Nhiều Cách Tạo Object\n\nBạn có thể có nhiều constructor với tham số khác nhau:\n\n```java\npublic class NguoiDung {\n    String username;\n    String email;\n    String role;\n    double soDuVi;\n\n    // Constructor đầy đủ\n    public NguoiDung(String username, String email, String role) {\n        this.username = username;\n        this.email = email;\n        this.role = role;\n        this.soDuVi = 0;   // Mặc định bắt đầu với 0 đ\n    }\n\n    // Constructor rút gọn — role mặc định là \"USER\"\n    public NguoiDung(String username, String email) {\n        this(username, email, \"USER\");  // Gọi constructor đầy đủ ở trên!\n    }\n\n    // Constructor đơn giản nhất — chỉ cần username\n    public NguoiDung(String username) {\n        this(username, username + \"@raizeshop.com\");  // Email tự tạo\n    }\n}\n```\n\n```java\n// Ba cách tạo NguoiDung:\nNguoiDung admin  = new NguoiDung(\"admin\", \"admin@raizeshop.com\", \"ADMIN\");\nNguoiDung player = new NguoiDung(\"raize99\", \"raize@gmail.com\");   // role = \"USER\"\nNguoiDung quick  = new NguoiDung(\"gamer\");         // email và role tự động\n```\n\n> 💡 **Chú ý `this(...)`:** Khi một constructor gọi constructor khác của cùng class, dùng `this(...)`. Dòng này phải là **dòng đầu tiên** trong constructor. Đây là cách tránh trùng lặp code giữa các constructor.\n\n---\n\n## 4. Constructor Mặc Định\n\nNếu bạn **không viết constructor nào**, Java tự tạo một constructor không tham số (gọi là *default constructor*):\n\n```java\npublic class SanPham {\n    String ten;\n    double gia;\n    // Java tự tạo: public SanPham() {} (không làm gì cả)\n}\n\nSanPham sp = new SanPham();  // Hoạt động — Java dùng default constructor\n```\n\nNhưng hễ bạn viết **bất kỳ** constructor nào, Java sẽ **xóa** default constructor đi:\n\n```java\npublic class SanPham {\n    String ten;\n    public SanPham(String ten) { this.ten = ten; }  // Bạn viết constructor này\n    // → Java KHÔNG tạo default constructor nữa\n}\n\nSanPham sp = new SanPham();         // ❌ Lỗi compile!\nSanPham sp = new SanPham(\"Kiếm\");  // ✅ OK\n```\n\ntôi hay gặp lỗi này trong dự án khi dùng Framework — biết trước để không bị bất ngờ.\n\n---\n\n## 5. `static` Nâng Cao — Static Initializer và Factory Method\n\n### Static field và khi nào dùng:\n\n```java\npublic class SanPham {\n    // Static: đếm tổng số sản phẩm đã tạo trong toàn bộ chương trình\n    private static int daDuocTao = 0;\n\n    String ten;\n    int id;\n\n    public SanPham(String ten) {\n        daDuocTao++;\n        this.id = daDuocTao;  // ID tự tăng\n        this.ten = ten;\n    }\n\n    public static int getDaDuocTao() {\n        return daDuocTao;\n    }\n}\n\nSanPham sp1 = new SanPham(\"Kiếm\");  // id = 1\nSanPham sp2 = new SanPham(\"Giáp\");  // id = 2\nSanPham sp3 = new SanPham(\"Nhẫn\");  // id = 3\n\nSystem.out.println(SanPham.getDaDuocTao());  // 3\nSystem.out.println(sp1.id);  // 1\nSystem.out.println(sp3.id);  // 3\n```\n\n### Factory Method — Constructor thay thế\n\nĐôi khi bạn muốn đặt tên cho cách tạo object để dễ đọc hơn:\n\n```java\npublic class NguoiDung {\n    String username;\n    String role;\n\n    private NguoiDung(String username, String role) {  // private!\n        this.username = username;\n        this.role = role;\n    }\n\n    // Factory methods — tên gọi rõ ràng hơn \"new NguoiDung(...)\"\n    public static NguoiDung taoAdmin(String username) {\n        return new NguoiDung(username, \"ADMIN\");\n    }\n\n    public static NguoiDung taoPlayer(String username) {\n        return new NguoiDung(username, \"USER\");\n    }\n}\n\n// Dùng factory methods — tên gọi tự giải thích:\nNguoiDung admin  = NguoiDung.taoAdmin(\"admin\");\nNguoiDung player = NguoiDung.taoPlayer(\"raize99\");\n```\n\n---\n\n## 6. Ví Dụ Thực Tế — Hệ Thống Đơn Hàng\n\n```java\npublic class DonHang {\n    private static int soThuTu = 0;  // Auto-increment ID\n\n    int id;\n    String nguoiMua;\n    String tenSanPham;\n    int soLuong;\n    double donGia;\n    String trangThai;\n    long thoiGianTao;  // Unix timestamp\n\n    public DonHang(String nguoiMua, String tenSanPham, int soLuong, double donGia) {\n        soThuTu++;\n        this.id = soThuTu;\n        this.nguoiMua = nguoiMua;\n        this.tenSanPham = tenSanPham;\n        this.soLuong = soLuong;\n        this.donGia = donGia;\n        this.trangThai = \"PENDING\";\n        this.thoiGianTao = System.currentTimeMillis();\n    }\n\n    double tinhTongTien() {\n        return soLuong * donGia;\n    }\n\n    void xacNhan() {\n        if (\"PENDING\".equals(trangThai)) {\n            this.trangThai = \"CONFIRMED\";\n            System.out.println(\"Đơn #\" + id + \" đã xác nhận.\");\n        }\n    }\n\n    void huy() {\n        if (\"PENDING\".equals(trangThai) || \"CONFIRMED\".equals(trangThai)) {\n            this.trangThai = \"CANCELLED\";\n            System.out.println(\"Đơn #\" + id + \" đã hủy.\");\n        } else {\n            System.out.println(\"Không thể hủy đơn ở trạng thái: \" + trangThai);\n        }\n    }\n\n    void inThongTin() {\n        System.out.printf(\"Đơn #%d | %s mua %d x %s | %,.0f đ | [%s]%n\",\n            id, nguoiMua, soLuong, tenSanPham, tinhTongTien(), trangThai);\n    }\n\n    public static void main(String[] args) {\n        DonHang d1 = new DonHang(\"raize99\", \"Kiếm Rồng\", 2, 1_200_000);\n        DonHang d2 = new DonHang(\"gamer_pro\", \"Giáp Vàng\", 1, 800_000);\n        DonHang d3 = new DonHang(\"newbie01\", \"Nhẫn Ma\", 3, 500_000);\n\n        d1.inThongTin();  // Đơn #1 | raize99 mua 2 x Kiếm Rồng | 2,400,000 đ | [PENDING]\n        d2.inThongTin();\n        d3.inThongTin();\n\n        d1.xacNhan();\n        d1.huy();   // Không thể hủy — đã CONFIRMED\n        // d1.huy() nếu muốn hủy sau confirmed thì tùy business logic\n\n        System.out.println(\"\\nTổng số đơn: \" + soThuTu);\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 08\n\n```\n✅ Constructor: method đặc biệt, cùng tên class, không kiểu trả về\n   → Chạy tự động khi \"new\", đảm bảo object hợp lệ từ đầu\n✅ this.field: tham chiếu đến field của object hiện tại — dùng khi tên tham số trùng tên field\n✅ this(...): gọi constructor khác trong cùng class (phải là dòng đầu tiên!)\n✅ Bạn viết constructor → Java KHÔNG tạo default constructor nữa\n✅ Factory method: static method trả về object — tên gọi rõ nghĩa hơn constructor\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBạn đang gán field trực tiếp: `sp.gia = -1000` — Java cho làm! Nhưng giá âm là vô nghĩa. Làm sao ngăn người khác gán giá trị sai vào object của bạn? Đó chính là **Encapsulation** — chủ đề bài tiếp theo.\n\n👉 **[Bài 09: Encapsulation — Đóng Gói Dữ Liệu](../bai-09-encapsulation/README.md)**\n\n\n---\n\n## 💡 Kiến thức bổ trợ cho Newbie: Mô hình bộ nhớ Stack & Heap\nKhi làm việc với Hướng đối tượng, hiểu được cách bộ nhớ hoạt động là chìa khóa để tránh lỗi:\n* **Stack (Bộ nhớ ngăn xếp)**: Lưu trữ các biến nguyên thủy (int, double, boolean...) và các **biến tham chiếu** (địa chỉ/con trỏ trỏ đến đối tượng thực sự).\n* **Heap (Bộ nhớ đống)**: Lưu trữ **đối tượng thực sự** được tạo ra bằng từ khóa `new` (ví dụ: `new Dog()`).\n* Khi viết `Dog dog1 = new Dog();`: Biến `dog1` nằm ở Stack và giữ giá trị là địa chỉ ô nhớ `0x777` trỏ sang vùng Heap nơi đối tượng `Dog` thực sự nằm.\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 08: Constructor, this, static\n\n> 🎯 **Bối cảnh dự án:** Hoàn thiện domain model với **constructor đúng chuẩn** và **class-level state** — nền tảng của Spring Bean, Singleton pattern.\n\n---\n\n## 🔴 Bài Tập 1: Product với Multiple Constructors ⭐⭐\n\n**Bối cảnh thực tế:** Spring Data JPA yêu cầu **no-arg constructor**. Nhưng code của bạn lại muốn constructor đầy đủ fields. Đây là lý do `@Entity` class cần cả hai. Bây giờ bạn sẽ hiểu tại sao.\n\n**Yêu cầu:** Nâng cấp `Product.java` với 4 constructor:\n\n```java\npublic class Product {\n    private String id;\n    private String name;\n    private double price;\n    private int stock;\n    private String category;\n    private double rating;\n    private int reviewCount;\n    private boolean isActive;\n    private static int totalProductsCreated = 0; // Class-level counter\n\n    // Constructor 1: No-arg (bắt buộc cho JPA/serialization)\n    public Product() { ... }\n\n    // Constructor 2: Chỉ cần tên và giá (tạo draft product)\n    public Product(String name, double price) { ... }\n\n    // Constructor 3: Đầy đủ fields cần thiết\n    public Product(String name, double price, int stock, String category) { ... }\n\n    // Constructor 4: Copy constructor (clone object)\n    public Product(Product other) { ... }\n\n    // Static method: factory method pattern\n    public static Product createWeapon(String name, double price) { ... }\n    public static Product createArmor(String name, double price)  { ... }\n\n    // Static: tổng số product đã tạo (monitoring)\n    public static int getTotalCreated() { return totalProductsCreated; }\n}\n```\n\n**Test:**\n```java\nProduct p1 = new Product(\"Kiếm Rồng\", 1_500_000, 5, \"weapon\");\nProduct p2 = Product.createArmor(\"Giáp Kim Cương\", 3_000_000);\nProduct p3 = new Product(p1); // Clone p1\np3.applyDiscount(10); // Đảm bảo sửa p3 không ảnh hưởng p1\n\nSystem.out.println(\"Tổng products đã tạo: \" + Product.getTotalCreated()); // 3\n```\n\n---\n\n## 🟡 Bài Tập 2: AppConfig — Singleton Pattern với static ⭐⭐\n\n**Bối cảnh thực tế:** Configuration trong Spring Boot (`@ConfigurationProperties`) hoạt động theo nguyên tắc này: chỉ có **1 instance** duy nhất, đọc config một lần, dùng khắp nơi.\n\n**Yêu cầu:** Tạo `AppConfig.java`:\n\n```java\npublic class AppConfig {\n    // Static instance duy nhất (Singleton)\n    private static AppConfig instance;\n\n    // Cấu hình ứng dụng\n    private final String appName;\n    private final String version;\n    private final double vatRate;\n    private final double platformFee;\n    private final int maxCartItems;\n    private final int sessionTimeout; // phút\n\n    // Constructor private — không ai tạo trực tiếp được\n    private AppConfig() {\n        this.appName = \"RaizeShop\";\n        this.version = \"1.0.0\";\n        this.vatRate = 10.0;\n        this.platformFee = 5.0;\n        this.maxCartItems = 10;\n        this.sessionTimeout = 30;\n    }\n\n    // Static factory method — điểm truy cập duy nhất\n    public static AppConfig getInstance() {\n        if (instance == null) {\n            instance = new AppConfig();\n            System.out.println(\"[INFO] AppConfig khởi tạo lần đầu\");\n        }\n        return instance;\n    }\n\n    // Getters (không có setters — immutable config!)\n    public double getVatRate() { return vatRate; }\n    // ...\n}\n\n// Test: gọi getInstance() 5 lần → chỉ in \"[INFO]...\" một lần\nAppConfig cfg1 = AppConfig.getInstance();\nAppConfig cfg2 = AppConfig.getInstance();\nSystem.out.println(cfg1 == cfg2); // true — cùng một object!\nSystem.out.println(\"VAT: \" + cfg1.getVatRate() + \"%\");\n```\n\n---\n\n## 🟡 Bài Tập 3: OrderIdGenerator — static state ⭐⭐\n\n**Bối cảnh thực tế:** Trong database, auto-increment ID là tính năng của DB engine. Nhưng khi mock hoặc test, bạn cần tự implement ID generation. `static` counter là cách đơn giản nhất.\n\n**Yêu cầu:** Tạo `OrderIdGenerator.java`:\n\n```java\npublic class OrderIdGenerator {\n    private static int dailyCounter = 0;\n    private static String currentDate = \"\";\n\n    // Tạo ID dạng: RZ-20240403-00001\n    // Mỗi ngày mới → reset counter về 0\n    public static synchronized String next() {\n        String today = getCurrentDate(); // Format: yyyyMMdd\n        if (!today.equals(currentDate)) {\n            currentDate = today;\n            dailyCounter = 0;\n            System.out.println(\"[INFO] Reset counter cho ngày mới: \" + today);\n        }\n        return String.format(\"RZ-%s-%05d\", today, ++dailyCounter);\n    }\n\n    public static int getDailyCount() { return dailyCounter; }\n    // ...\n}\n\n// Test: tạo 5 orders\nfor (int i = 0; i < 5; i++) {\n    System.out.println(OrderIdGenerator.next());\n}\n// RZ-20240403-00001\n// RZ-20240403-00002\n// ...\nSystem.out.println(\"Hôm nay đã tạo: \" + OrderIdGenerator.getDailyCount() + \" orders\");\n```\n\n---\n\n## 🔴 Bài Tập 4: Builder Pattern — Đặt Order Phức Tạp ⭐⭐⭐\n\n**Bối cảnh thực tế:** `Builder pattern` dùng `this` để chain method — Lombok's `@Builder` generate code này tự động. Hiểu nó giúp bạn debug Lombok và đọc được code của người khác.\n\n**Yêu cầu:** Implement `OrderBuilder`:\n\n```java\n// Mục tiêu: tạo Order theo kiểu fluent, đọc như \"câu văn\"\nOrder order = new OrderBuilder()\n    .buyer(\"raize99\")\n    .addItem(\"RZ-WPN-001\", 1_500_000, 2)\n    .addItem(\"RZ-ARM-001\", 800_000, 1)\n    .applyVoucher(\"SALE20\")\n    .shippingAddress(\"HCM, Quận 1\")\n    .paymentMethod(\"WALLET\")\n    .build();\n\nSystem.out.println(order.getReceipt());\n```\n\n**Implement `OrderBuilder`** với `return this` ở mỗi method để chain được.\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Tại sao Singleton lại cần `synchronized` keyword trong môi trường multi-thread? (Preview bài 19)\n- [ ] Copy constructor vs `clone()` — Lombok's `@Builder` dùng cách nào? Khi nào shallow copy gây bug?\n- [ ] `this()` gọi constructor khác vs `super()` — khác nhau thế nào? Quy tắc: phải nằm dòng **đầu tiên** của constructor — tại sao Java enforce điều này?\n- [ ] `static final` CONSTANT vs `static` counter — cả hai đều là class-level state, nhưng khác nhau thế nào về thread-safety?\n\n---\n\n👉 **Tiếp theo:** [Bài 09 – Encapsulation](../bai-09-encapsulation/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Thành viên tĩnh (static) thuộc về thực thể nào?",
        "options": [
          "Từng đối tượng cụ thể tạo ra từ class.",
          "Chính Class đó, chia sẻ chung cho tất cả đối tượng, gọi trực tiếp không cần tạo đối tượng.",
          "Thuộc JVM và chỉ chạy khi khởi động.",
          "Thuộc Heap và bị hủy khi phương thức kết thúc."
        ],
        "answer": 1,
        "explanation": "Static member thuộc về class, không phải object. Chỉ có một bản sao duy nhất, chia sẻ cho tất cả instance."
      },
      {
        "q": "Constructor trong Java có đặc điểm gì?",
        "options": [
          "Có kiểu trả về void",
          "Không có kiểu trả về, tên phải trùng tên class, tự động gọi khi tạo object",
          "Phải khai báo là static",
          "Chỉ có thể có một constructor trong mỗi class"
        ],
        "answer": 1,
        "explanation": "Constructor: tên trùng tên class, không có kiểu trả về (kể cả void), tự động được gọi bởi toán tử `new`."
      },
      {
        "q": "Nếu class không khai báo constructor nào, Java sẽ làm gì?",
        "options": [
          "Báo lỗi biên dịch",
          "Tự động tạo một default constructor không tham số",
          "Class không thể tạo đối tượng",
          "Buộc phải viết ít nhất một constructor"
        ],
        "answer": 1,
        "explanation": "Khi không có constructor nào, Java tự động cung cấp no-arg default constructor. Nếu đã khai báo một constructor bất kỳ, default constructor sẽ không được tạo."
      },
      {
        "q": "Từ khóa `super()` trong constructor dùng để làm gì?",
        "options": [
          "Gọi phương thức của lớp con",
          "Gọi constructor của lớp cha (superclass)",
          "Tạo đối tượng mới",
          "Truy cập biến static"
        ],
        "answer": 1,
        "explanation": "`super()` gọi constructor của class cha. Phải là câu lệnh đầu tiên trong constructor. Java tự chèn `super()` nếu không khai báo."
      },
      {
        "q": "Khi gọi `this()` trong một constructor, nghĩa là gì?",
        "options": [
          "Gọi phương thức này chính nó (đệ quy)",
          "Gọi một constructor khác trong cùng class (constructor chaining)",
          "Khởi tạo lại đối tượng hiện tại",
          "Không hợp lệ trong Java"
        ],
        "answer": 1,
        "explanation": "`this()` gọi constructor khác trong cùng class, giúp tái sử dụng code khởi tạo (constructor overloading/chaining)."
      },
      {
        "q": "Biến static trong class được lưu ở vùng nhớ nào của JVM?",
        "options": [
          "Heap",
          "Stack",
          "Method Area (Metaspace trong Java 8+)",
          "PC Register"
        ],
        "answer": 2,
        "explanation": "Biến static được lưu trong Method Area (còn gọi là Metaspace từ Java 8+), được tải một lần và tồn tại suốt vòng đời ứng dụng."
      },
      {
        "q": "Đặc điểm của block khởi tạo tĩnh (static initializer block) `static { ... }` là gì?",
        "options": [
          "Chạy mỗi lần tạo đối tượng mới",
          "Chạy một lần duy nhất khi class được nạp vào JVM, trước cả constructor",
          "Giống như constructor nhưng cho static",
          "Chỉ dùng để khai báo hằng số"
        ],
        "answer": 1,
        "explanation": "Static initializer block chạy đúng một lần khi class được load vào JVM, trước bất kỳ constructor nào được gọi."
      },
      {
        "q": "Phương thức `clone()` trong Java dùng để làm gì?",
        "options": [
          "Xóa đối tượng khỏi bộ nhớ",
          "Tạo ra một bản sao của đối tượng",
          "So sánh hai đối tượng",
          "Chuyển đổi kiểu dữ liệu"
        ],
        "answer": 1,
        "explanation": "`clone()` tạo ra bản sao (copy) của đối tượng. Class phải implements `Cloneable` interface để dùng. Cần phân biệt shallow copy và deep copy."
      },
      {
        "q": "Mục đích chính của setter method trong OOP là gì?",
        "options": [
          "Đọc giá trị thuộc tính",
          "Kiểm soát việc gán giá trị cho thuộc tính private (validation, logging)",
          "Xóa thuộc tính",
          "Tạo object mới"
        ],
        "answer": 1,
        "explanation": "Setter cho phép kiểm soát và validate dữ liệu trước khi gán vào thuộc tính private. Đây là nguyên tắc Encapsulation."
      },
      {
        "q": "Biến instance (instance variable) khác biến static (class variable) ở điểm nào?",
        "options": [
          "Instance variable nhanh hơn",
          "Instance variable riêng cho từng object, static variable chia sẻ chung cho tất cả object của class",
          "Static variable không thể thay đổi",
          "Không có sự khác biệt"
        ],
        "answer": 1,
        "explanation": "Mỗi object có bản sao riêng của instance variable. Static variable chỉ có một bản sao duy nhất, chia sẻ giữa tất cả objects của class."
      },
      {
        "q": "Điều gì xảy ra khi biến object được gán `null`?",
        "options": [
          "Đối tượng bị xóa ngay lập tức",
          "Biến không trỏ đến đối tượng nào, đối tượng cũ có thể bị Garbage Collector thu hồi sau",
          "Lỗi biên dịch",
          "Giá trị của object trở thành 0"
        ],
        "answer": 1,
        "explanation": "Gán null làm biến không tham chiếu đến object nào. Object cũ (nếu không còn biến nào trỏ vào) sẽ được GC thu hồi bộ nhớ."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Constructor, static & this\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 08: Constructor, this, static\n\n> 🎯 **Bối cảnh dự án:** Hoàn thiện domain model với **constructor đúng chuẩn** và **class-level state** — nền tảng của Spring Bean, Singleton pattern.\n\n---\n\n## 🔴 Bài Tập 1: Product với Multiple Constructors ⭐⭐\n\n**Bối cảnh thực tế:** Spring Data JPA yêu cầu **no-arg constructor**. Nhưng code của bạn lại muốn constructor đầy đủ fields. Đây là lý do `@Entity` class cần cả hai. Bây giờ bạn sẽ hiểu tại sao.\n\n**Yêu cầu:** Nâng cấp `Product.java` với 4 constructor:\n\n```java\npublic class Product {\n    private String id;\n    private String name;\n    private double price;\n    private int stock;\n    private String category;\n    private double rating;\n    private int reviewCount;\n    private boolean isActive;\n    private static int totalProductsCreated = 0; // Class-level counter\n\n    // Constructor 1: No-arg (bắt buộc cho JPA/serialization)\n    public Product() { ... }\n\n    // Constructor 2: Chỉ cần tên và giá (tạo draft product)\n    pub...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 9,
    "title": "Tính Đóng Gói (Encapsulation)",
    "phase": "Phase 2: Hướng Đối Tượng",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 09: Encapsulation — Đóng Gói Dữ Liệu\n\n> 🟡 **Phase 2 – Bài 3/6** | Thời gian: ~2.5 giờ\n\n---\n\nTôi muốn bạn thử một thứ với code bài trước:\n\n```java\nSanPham sp = new SanPham(\"Kiếm Rồng\", 1_200_000, 3);\nsp.gia = -999;       // Giá âm?! Java vẫn cho phép!\nsp.soLuong = -100;   // Số lượng âm?! Không có lỗi!\n```\n\nBạn thấy vấn đề chưa? Fields của class đang hoàn toàn mở — bất kỳ ai cũng có thể gán bất kỳ giá trị vào, kể cả giá trị vô nghĩa. Trong dự án thật, đây là nguồn gốc của rất nhiều bug nghiêm trọng.\n\n**Encapsulation** (đóng gói) là nguyên tắc: **ẩn dữ liệu bên trong**, chỉ cho phép truy cập qua các method đã kiểm soát.\n\n---\n\n## 1. Access Modifiers — Kiểm Soát Quyền Truy Cập\n\nJava có 4 mức truy cập, từ mở nhất đến kín nhất:\n\n| Modifier | Cùng class | Cùng package | Subclass khác package | Mọi nơi |\n|----------|-----------|-------------|----------------------|---------|\n| `public` | ✅ | ✅ | ✅ | ✅ |\n| `protected` | ✅ | ✅ | ✅ | ❌ |\n| *(mặc định)* | ✅ | ✅ | ❌ | ❌ |\n| `private` | ✅ | ❌ | ❌ | ❌ |\n\nQuy tắc vàng cho encapsulation:\n- **Fields: luôn `private`** — không ai gán trực tiếp\n- **Methods công khai: `public`** — gateway để truy cập\n- **Methods nội bộ: `private`** — chỉ dùng trong class\n\n---\n\n## 2. Getter và Setter — Cửa Ngõ Kiểm Soát\n\n```java\npublic class SanPham {\n\n    // Fields là private — bên ngoài KHÔNG gán/đọc trực tiếp được\n    private String ten;\n    private double gia;\n    private int soLuong;\n\n    public SanPham(String ten, double gia, int soLuong) {\n        // Dùng setter để khởi tạo — tận dụng validation!\n        this.ten = ten;\n        setGia(gia);          // Kiểm tra luôn khi tạo\n        setSoLuong(soLuong);   // Kiểm tra luôn khi tạo\n    }\n\n    // === GETTERS — Đọc giá trị ===\n    public String getTen()    { return ten; }\n    public double getGia()    { return gia; }\n    public int getSoLuong()   { return soLuong; }\n\n    // === SETTERS — Ghi giá trị CÓ kiểm tra ===\n    public void setTen(String ten) {\n        if (ten == null || ten.isBlank()) {\n            throw new IllegalArgumentException(\"Tên sản phẩm không được rỗng!\");\n        }\n        this.ten = ten;\n    }\n\n    public void setGia(double gia) {\n        if (gia < 0) {\n            throw new IllegalArgumentException(\"Giá không được âm: \" + gia);\n        }\n        this.gia = gia;\n    }\n\n    public void setSoLuong(int soLuong) {\n        if (soLuong < 0) {\n            throw new IllegalArgumentException(\"Số lượng không được âm: \" + soLuong);\n        }\n        this.soLuong = soLuong;\n    }\n\n    // Method có thể dùng nhiều fields cùng lúc\n    public String getThongTinNgan() {\n        return String.format(\"%s | %,.0f đ | Còn %d\", ten, gia, soLuong);\n    }\n}\n```\n\nBây giờ cố tình thử gán sai:\n\n```java\nSanPham sp = new SanPham(\"Kiếm Rồng\", 1_200_000, 3);\n\nsp.gia = -999;          // ❌ Lỗi compile! private — không gán được trực tiếp\n\nsp.setGia(-999);        // IllegalArgumentException: Giá không được âm: -999.0\nsp.setSoLuong(-100);    // IllegalArgumentException: Số lượng không được âm: -100\n\nSystem.out.println(sp.getTen());    // Đọc được qua getter: \"Kiếm Rồng\"\nSystem.out.println(sp.getGia());    // 1200000.0\n```\n\n---\n\n## 3. Getter Không Nhất Thiết Là \"Trả Về Thẳng\" Field\n\nĐây là điểm nhiều người bỏ qua. Getter có thể thêm logic:\n\n```java\npublic class NguoiDung {\n    private String username;\n    private String password;     // Hash, không bao giờ trả về thật\n    private double soDuVi;\n    private boolean daBiKhoa;\n\n    // Getter bình thường\n    public String getUsername() { return username; }\n\n    // Getter KHÔNG trả về field password — bảo mật\n    // Không có getPassword() — đúng thiết kế!\n\n    // Getter thêm logic: ẩn số dư khi bị khóa\n    public double getSoDuVi() {\n        if (daBiKhoa) {\n            return -1;  // Tài khoản bị khóa, không hiển thị số dư\n        }\n        return soDuVi;\n    }\n\n    // Getter format sẵn\n    public String getSoDuHienThi() {\n        return String.format(\"%,.0f Linh Thạch\", soDuVi);\n    }\n}\n```\n\n---\n\n## 4. Immutable Object — Object Không Thay Đổi Được Sau Khi Tạo\n\nĐôi khi bạn muốn một object **bất biến** — tạo ra với giá trị cố định, không ai thay đổi được:\n\n```java\npublic final class DiaChi {   // final class: không ai extends được\n    private final String thanhPho;   // final field: chỉ gán 1 lần\n    private final String quanHuyen;\n    private final String duongPho;\n\n    public DiaChi(String thanhPho, String quanHuyen, String duongPho) {\n        this.thanhPho = thanhPho;\n        this.quanHuyen = quanHuyen;\n        this.duongPho = duongPho;\n    }\n\n    // CHỈ có getters, KHÔNG có setters\n    public String getThanhPho()  { return thanhPho; }\n    public String getQuanHuyen() { return quanHuyen; }\n    public String getDuongPho()  { return duongPho; }\n\n    // Muốn \"thay đổi\" → tạo object mới\n    public DiaChi doiDuong(String duongMoi) {\n        return new DiaChi(this.thanhPho, this.quanHuyen, duongMoi);\n    }\n\n    @Override\n    public String toString() {\n        return duongPho + \", \" + quanHuyen + \", \" + thanhPho;\n    }\n}\n```\n\n```java\nDiaChi dc = new DiaChi(\"Hà Nội\", \"Cầu Giấy\", \"Xuân Thủy\");\nSystem.out.println(dc);  // Xuân Thủy, Cầu Giấy, Hà Nội\n\n// dc.thanhPho = \"TP HCM\";  // ❌ private!\n// dc.setThanhPho(\"TP HCM\"); // ❌ Không có setter!\n\n// Muốn thay đổi → tạo object mới, object cũ không bị ảnh hưởng\nDiaChi dcMoi = dc.doiDuong(\"Láng Hạ\");\n```\n\n> 💡 **Tại sao Immutable hay được dùng?** Thread-safe tự nhiên (nhiều thread đọc cùng lúc không sợ conflict), dễ debug (giá trị không bao giờ bị ai thay đổi bất ngờ). `String` trong Java là immutable — đó là lý do tại sao bạn có thể truyền String vào nhiều thread mà không sợ gì.\n\n---\n\n## 5. `toString()` — Cách In Object Đẹp Hơn\n\n```java\npublic class SanPham {\n    private String ten;\n    private double gia;\n    private int soLuong;\n\n    // ... constructor, getter, setter ...\n\n    // Override toString() để print object đẹp hơn\n    @Override\n    public String toString() {\n        return String.format(\"SanPham{ten='%s', gia=%,.0f đ, soLuong=%d}\",\n            ten, gia, soLuong);\n    }\n}\n```\n\n```java\nSanPham sp = new SanPham(\"Kiếm Rồng\", 1_200_000, 3);\n\nSystem.out.println(sp);\n// Không có toString(): SanPham@1b6d3586 (địa chỉ memory — vô nghĩa!)\n// Có toString(): SanPham{ten='Kiếm Rồng', gia=1,200,000 đ, soLuong=3}\n```\n\nIDE (IntelliJ) có thể tự generate `toString()` cho bạn — nhấn `Alt+Insert` → `toString()`.\n\n---\n\n## 6. Ví Dụ Thực Tế — Class `NguoiDung` Đầy Đủ\n\n```java\npublic class NguoiDung {\n    private static int demId = 0;\n\n    private final int id;\n    private String username;\n    private String email;\n    private double soDuVi;\n    private String role;\n    private boolean active;\n\n    public NguoiDung(String username, String email) {\n        validateUsername(username);\n        validateEmail(email);\n\n        demId++;\n        this.id = demId;\n        this.username = username;\n        this.email = email;\n        this.soDuVi = 0;\n        this.role = \"USER\";\n        this.active = true;\n    }\n\n    // === Getters ===\n    public int getId()          { return id; }\n    public String getUsername() { return username; }\n    public String getEmail()    { return email; }\n    public String getRole()     { return role; }\n    public boolean isActive()   { return active; }\n    public double getSoDuVi()   { return soDuVi; }\n\n    // === Setters có validation ===\n    public void setEmail(String email) {\n        validateEmail(email);\n        this.email = email;\n    }\n\n    // === Business methods ===\n    public void napTien(double soTien) {\n        if (soTien <= 0) throw new IllegalArgumentException(\"Số tiền nạp phải > 0\");\n        if (!active)     throw new IllegalStateException(\"Tài khoản đang bị khóa\");\n        this.soDuVi += soTien;\n        System.out.printf(\"[%s] Nạp %,.0f đ. Số dư mới: %,.0f đ%n\",\n            username, soTien, soDuVi);\n    }\n\n    public boolean tru(double soTien) {\n        if (soTien > soDuVi) {\n            System.out.printf(\"[%s] Không đủ số dư. Cần %,.0f đ, có %,.0f đ%n\",\n                username, soTien, soDuVi);\n            return false;\n        }\n        this.soDuVi -= soTien;\n        return true;\n    }\n\n    public void khoa()   { this.active = false; System.out.println(\"Đã khóa: \" + username); }\n    public void moKhoa() { this.active = true;  System.out.println(\"Đã mở khóa: \" + username); }\n\n    // === Private validation helpers ===\n    private void validateUsername(String username) {\n        if (username == null || username.length() < 4 || username.length() > 20)\n            throw new IllegalArgumentException(\"Username phải từ 4-20 ký tự\");\n    }\n\n    private void validateEmail(String email) {\n        if (email == null || !email.contains(\"@\"))\n            throw new IllegalArgumentException(\"Email không hợp lệ: \" + email);\n    }\n\n    @Override\n    public String toString() {\n        return String.format(\"NguoiDung{id=%d, username='%s', role='%s', soDu=%,.0f đ, active=%b}\",\n            id, username, role, soDuVi, active);\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 09\n\n```\n✅ Encapsulation = fields private, truy cập qua getter/setter public\n✅ Setter kiểm tra trước khi gán → object luôn ở trạng thái hợp lệ\n✅ Getter có thể thêm logic — không nhất thiết chỉ return field\n✅ Immutable: final class + final fields + chỉ getters → an toàn, thread-safe\n✅ toString(): override để print object ý nghĩa (IDE generate được)\n✅ Quy tắc vàng: Private by default, public chỉ khi thực sự cần\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBạn đang viết class `NguoiDung` và `Admin`. Bạn có nhận ra chúng có nhiều thứ chung không? (`username`, `email`, `napTien`...) Bài tiếp theo Tôi sẽ dạy cách tái sử dụng code bằng **kế thừa** — thay vì copy-paste.\n\n👉 **[Bài 10: Inheritance — Kế Thừa](../bai-10-inheritance/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 09: Encapsulation (Đóng Gói)\n\n> 🎯 **Bối cảnh dự án:** Bảo vệ **data integrity** — đảm bảo không có code nào có thể set Stock âm, Price âm, hay Rating ngoài 0-5.\n\n---\n\n## 🔴 Bài Tập 1: Product với Encapsulation Đầy Đủ ⭐⭐\n\n**Bối cảnh thực tế:** Đây chính là cách viết JPA Entity đúng chuẩn. Hibernate dùng getter/setter để đọc/ghi dữ liệu, và validation trong setter ngăn dữ liệu rác vào database.\n\n**Yêu cầu:** Refactor `Product.java` — chuyển tất cả field sang `private` và implement getter/setter có validation:\n\n```java\npublic class Product {\n    private String id;\n    private String name;\n    private double price;\n    private int stock;\n    private String category;\n    private double rating;      // 0.0 - 5.0\n    private int reviewCount;\n    private boolean active;\n\n    // ❌ Setter SAU ĐÂY là sai — tại sao?\n    // public void setPrice(double price) { this.price = price; }\n\n    // ✅ Setter đúng với validation:\n    public void setPrice(double price) {\n        if (price <= 0) throw new IllegalArgumentException(\"Giá phải > 0, nhận được: \" + price);\n        if (price > 999_999_999) throw new IllegalArgumentException(\"Giá quá lớn: \" + price);\n        this.price = price;\n    }\n\n    public void setStock(int stock) {\n        // Stock không được âm\n        // ...\n    }\n\n    public void setRating(double rating) {\n        // Rating phải 0.0 - 5.0\n        // reviewCount phải tăng khi set rating mới\n        // Cần tính rating TB? Hay chỉ set thẳng?\n    }\n\n    public void setName(String name) {\n        // Trim whitespace\n        // Không được null/blank\n        // Không được quá 100 ký tự\n    }\n\n    // Derived getter (không có field tương ứng)\n    public boolean isInStock() { return stock > 0; }\n    public boolean isLowStock() { return stock > 0 && stock <= 3; }\n    public String getStockStatus() {\n        if (stock == 0) return \"🔴 Hết hàng\";\n        if (stock <= 3) return \"🟡 Sắp hết (\" + stock + \" còn lại)\";\n        return \"🟢 Còn hàng (\" + stock + \")\";\n    }\n}\n```\n\n**Test \"phá\" validation:**\n```java\nProduct p = new Product(\"Kiếm Rồng\", 1_500_000);\ntry { p.setPrice(-500_000); } catch (Exception e) { System.out.println(\"✅ Bắt được: \" + e.getMessage()); }\ntry { p.setStock(-1); }      catch (Exception e) { System.out.println(\"✅ Bắt được: \" + e.getMessage()); }\ntry { p.setRating(6.0); }    catch (Exception e) { System.out.println(\"✅ Bắt được: \" + e.getMessage()); }\n```\n\n---\n\n## 🟡 Bài Tập 2: UserAccount — Bảo Mật Field Nhạy Cảm ⭐⭐\n\n**Bối cảnh thực tế:** Password KHÔNG BAO GIỜ được expose ra ngoài. Đây là nguyên tắc bảo mật cơ bản — getter cho password là security hole.\n\n**Yêu cầu:** Tạo `UserAccount.java`:\n\n```java\npublic class UserAccount {\n    private String username;\n    private String hashedPassword; // Hash bằng SHA256 đơn giản (dùng String thôi)\n    private String email;\n    private double walletBalance;\n    private String role;    // \"USER\", \"SELLER\", \"ADMIN\"\n    private boolean locked;\n    private int failedLoginAttempts;\n\n    // ❌ KHÔNG có getter cho hashedPassword!\n    // Thay vào đó:\n    public boolean verifyPassword(String rawPassword) {\n        String hashed = simpleHash(rawPassword); // Giả lập hash\n        return hashed.equals(this.hashedPassword);\n    }\n\n    // ❌ KHÔNG có setter trực tiếp cho walletBalance!\n    // Thay vào đó:\n    public void deposit(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"Số tiền nạp phải > 0\");\n        this.walletBalance += amount;\n        System.out.printf(\"[LOG] %s nạp %,.0f đ. Số dư mới: %,.0f đ%n\",\n                username, amount, walletBalance);\n    }\n\n    public void withdraw(double amount) {\n        if (amount <= 0) throw new IllegalArgumentException(\"Số tiền rút phải > 0\");\n        if (amount > walletBalance) throw new IllegalStateException(\n                \"Số dư không đủ. Cần: \" + amount + \", có: \" + walletBalance);\n        this.walletBalance -= amount;\n    }\n\n    // Chỉ ADMIN mới đổi được role\n    public void setRole(String newRole, UserAccount requestedBy) {\n        if (!\"ADMIN\".equals(requestedBy.getRole())) {\n            throw new SecurityException(\"Không có quyền thay đổi role!\");\n        }\n        this.role = newRole;\n    }\n}\n```\n\n---\n\n## 🔴 Bài Tập 3: Immutable Config Object ⭐⭐⭐\n\n**Bối cảnh thực tế:** Trong Java, `String`, `Integer`, `LocalDate` đều là **immutable**. Khi design API trả về data mà bạn không muốn caller sửa được, bạn dùng immutable object.\n\n**Yêu cầu:** Tạo `PricingPolicy.java` — immutable object:\n\n```java\npublic final class PricingPolicy { // final = không thể extend\n    private final double vatRate;\n    private final double platformFee;\n    private final double vipDiscount;\n    private final double[] tierThresholds;  // Ngưỡng tier (mảng!)\n\n    public PricingPolicy(double vatRate, double platformFee,\n                          double vipDiscount, double[] tierThresholds) {\n        // Validate tất cả tham số\n        // ⚠️ CẠNH BẪY: copy mảng để tránh caller vẫn giữ reference\n        this.tierThresholds = tierThresholds.clone(); // Defensive copy!\n    }\n\n    // Chỉ có getters — không có setters\n    public double getVatRate() { return vatRate; }\n\n    // ⚠️ Trả về copy của mảng, không phải mảng gốc!\n    public double[] getTierThresholds() {\n        return tierThresholds.clone();\n    }\n\n    // Tạo policy mới với thay đổi (không sửa object cũ)\n    // Đây là pattern của Java's Date và String\n    public PricingPolicy withVatRate(double newVatRate) {\n        return new PricingPolicy(newVatRate, this.platformFee,\n                this.vipDiscount, this.tierThresholds);\n    }\n}\n```\n\n**Test immutability:**\n```java\nPricingPolicy policy = new PricingPolicy(10.0, 5.0, 20.0, new double[]{1M, 5M, 10M});\n\n// Thử phá immutability:\ndouble[] tiers = policy.getTierThresholds();\ntiers[0] = 999_999_999; // Thay đổi array nhận về\nSystem.out.println(policy.getTierThresholds()[0]); // Vẫn là 1000000 — immutable!\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Tại sao trong bài 3, ta phải `clone()` mảng cả khi nhận vào (constructor) lẫn khi trả ra (getter)? Viết code chứng minh bug nếu không clone.\n- [ ] Lombok `@Data` tự generate getter/setter — nhưng setter không có validation. Cách đúng trong dự án thực là dùng `@Data` hay tự viết?\n- [ ] `private` field + public getter/setter = encapsulation? Hay còn cần gì nữa? (Gợi ý: validation, defensive copy, business logic)\n- [ ] Tại sao `String` trong Java được thiết kế immutable? Cho ví dụ security issue nếu String mutable trong authentication code.\n\n---\n\n👉 **Tiếp theo:** [Bài 10 – Inheritance](../bai-10-inheritance/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Access modifier nào hạn chế truy cập nhất?",
        "options": [
          "public",
          "protected",
          "default (package-private)",
          "private"
        ],
        "answer": 3,
        "explanation": "`private` giới hạn truy cập tuyệt đối, chỉ trong cùng class định nghĩa nó."
      },
      {
        "q": "Tính đóng gói (Encapsulation) trong OOP có nghĩa là gì?",
        "options": [
          "Đặt tất cả code vào một class duy nhất",
          "Ẩn chi tiết triển khai, chỉ để lộ interface công khai, bảo vệ dữ liệu bên trong",
          "Kế thừa từ nhiều class",
          "Sử dụng các phương thức đệ quy"
        ],
        "answer": 1,
        "explanation": "Encapsulation là bundling data (fields) và methods vào class, ẩn dữ liệu bằng `private` và cung cấp getter/setter để kiểm soát truy cập."
      },
      {
        "q": "Access modifier `protected` cho phép truy cập từ đâu?",
        "options": [
          "Chỉ trong cùng class",
          "Cùng class + cùng package + subclass (kể cả ở package khác)",
          "Chỉ cùng package",
          "Mọi nơi"
        ],
        "answer": 1,
        "explanation": "`protected` cho phép: cùng class, cùng package, và các subclass (dù ở package khác)."
      },
      {
        "q": "Tại sao nên khai báo các thuộc tính (fields) là private?",
        "options": [
          "Để code chạy nhanh hơn",
          "Để bảo vệ tính nhất quán của dữ liệu, ngăn bên ngoài trực tiếp sửa giá trị không hợp lệ",
          "Vì Java bắt buộc phải private",
          "Để tiết kiệm bộ nhớ"
        ],
        "answer": 1,
        "explanation": "Private fields là nguyên tắc Encapsulation: kiểm soát truy cập, validate dữ liệu qua setter, bảo vệ class khỏi trạng thái không hợp lệ."
      },
      {
        "q": "Getter method thường có dạng nào theo chuẩn Java Bean?",
        "options": [
          "get() không tham số",
          "getFieldName() trả về kiểu của field",
          "returnFieldName()",
          "readFieldName()"
        ],
        "answer": 1,
        "explanation": "Chuẩn Java Bean: getter có tên `getFieldName()` (hoặc `isFieldName()` cho boolean) và trả về giá trị của field tương ứng."
      },
      {
        "q": "Điều gì là sai về Encapsulation?",
        "options": [
          "Encapsulation ẩn chi tiết triển khai bên trong",
          "Encapsulation dùng access modifier để kiểm soát truy cập",
          "Encapsulation nghĩa là bắt buộc phải có getter và setter cho mọi field",
          "Encapsulation giúp code dễ maintain hơn"
        ],
        "answer": 2,
        "explanation": "Không phải lúc nào cũng cần getter/setter cho mọi field. Đôi khi muốn field là read-only (chỉ có getter), đôi khi không cần expose nó ra ngoài."
      },
      {
        "q": "Default access modifier (không viết gì) cho phép truy cập từ đâu?",
        "options": [
          "Chỉ cùng class",
          "Cùng class và cùng package (package-private)",
          "Cùng class và tất cả subclass",
          "Mọi nơi"
        ],
        "answer": 1,
        "explanation": "Khi không khai báo modifier, là package-private: chỉ truy cập được từ cùng package."
      },
      {
        "q": "Một class chứa tất cả các thuộc tính là private. Bên ngoài class muốn đọc giá trị thuộc tính đó, phải làm gì?",
        "options": [
          "Không thể đọc được",
          "Dùng Reflection API để bypass",
          "Gọi phương thức getter public được cung cấp bởi class",
          "Kế thừa class đó"
        ],
        "answer": 2,
        "explanation": "Đây là mẫu Encapsulation chuẩn: thuộc tính private + getter public. Bên ngoài chỉ đọc qua getter."
      },
      {
        "q": "Immutable class trong Java là gì? Ví dụ điển hình?",
        "options": [
          "Class không thể kế thừa",
          "Class mà đối tượng của nó không thể thay đổi trạng thái sau khi tạo. Ví dụ: String, Integer",
          "Class không có constructor",
          "Class chỉ chứa static method"
        ],
        "answer": 1,
        "explanation": "Immutable class: tất cả fields là final và private, không có setter. Ví dụ: String, Integer, LocalDate. Giúp thread-safe và an toàn chia sẻ."
      },
      {
        "q": "Tại sao Encapsulation giúp code dễ maintenance hơn?",
        "options": [
          "Vì code ít dòng hơn",
          "Vì thay đổi chi tiết triển khai bên trong class không ảnh hưởng đến code bên ngoài dùng class đó",
          "Vì không cần viết comment",
          "Vì Encapsulation tự sửa lỗi"
        ],
        "answer": 1,
        "explanation": "Bên ngoài chỉ phụ thuộc vào interface (public methods). Khi sửa nội bộ class, không cần sửa code bên ngoài - đây là nguyên lý Information Hiding."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Tính Đóng Gói (Encapsulation)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 09: Encapsulation (Đóng Gói)\n\n> 🎯 **Bối cảnh dự án:** Bảo vệ **data integrity** — đảm bảo không có code nào có thể set Stock âm, Price âm, hay Rating ngoài 0-5.\n\n---\n\n## 🔴 Bài Tập 1: Product với Encapsulation Đầy Đủ ⭐⭐\n\n**Bối cảnh thực tế:** Đây chính là cách viết JPA Entity đúng chuẩn. Hibernate dùng getter/setter để đọc/ghi dữ liệu, và validation trong setter ngăn dữ liệu rác vào database.\n\n**Yêu cầu:** Refactor `Product.java` — chuyển tất cả field sang `private` và implement getter/setter có validation:\n\n```java\npublic class Product {\n    private String id;\n    private String name;\n    private double price;\n    private int stock;\n    private String category;\n    private double rating;      // 0.0 - 5.0\n    private int reviewCount;\n    private boolean active;\n\n    // ❌ Setter SAU ĐÂY là sai — tại sao?\n    // public void setPrice(double price) { this.price = price; }\n\n    // ✅ Setter đúng với validation:\n    public void setPrice(double price) {\n        if ...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 10,
    "title": "Inheritance — Kế Thừa",
    "phase": "Phase 2: Hướng Đối Tượng",
    "time": "4 giờ",
    "difficulty": "Trung bình",
    "theory": "# Bài 10: Inheritance — Kế Thừa\n\n> 🟡 **Phase 2 – Bài 4/6** | Thời gian: ~3 giờ\n\n---\n\nGiả sử bạn đang xây dựng hệ thống người dùng cho RaizeShop. Có 3 loại: `NguoiDung` thường, `Seller` (người bán), `Admin`. Cả ba đều có `username`, `email`, `soDuVi`, đều có thể `napTien()` và `inThongTin()`.\n\nLẽ nào bạn sẽ copy-paste 3 class giống hệt nhau, chỉ thêm vài field riêng? Đó là cách làm tệ nhất. **Kế thừa** cho phép bạn định nghĩa **phần chung một lần**, rồi các class con chỉ thêm phần riêng của chúng.\n\n---\n\n## 1. Extends — Kế Thừa Class\n\n```java\n// Parent class (lớp cha) — chứa những gì CHUNG\npublic class NguoiDung {\n    protected String username;   // protected: class con truy cập được!\n    protected String email;\n    protected double soDuVi;\n\n    public NguoiDung(String username, String email) {\n        this.username = username;\n        this.email = email;\n        this.soDuVi = 0;\n    }\n\n    public void napTien(double soTien) {\n        if (soTien <= 0) throw new IllegalArgumentException(\"Số tiền phải > 0\");\n        soDuVi += soTien;\n        System.out.printf(\"[%s] Nạp %,.0f đ. Số dư: %,.0f đ%n\",\n            username, soTien, soDuVi);\n    }\n\n    public void inThongTin() {\n        System.out.println(\"Username: \" + username);\n        System.out.println(\"Email   : \" + email);\n        System.out.printf(\"Số dư   : %,.0f đ%n\", soDuVi);\n    }\n}\n```\n\n```java\n// Child class (lớp con) — kế thừa + thêm phần riêng\npublic class Seller extends NguoiDung {\n    //              ↑\n    // \"extends\" = kế thừa toàn bộ từ NguoiDung\n\n    private String tenShop;\n    private double doanhSo;\n    private double rating;\n\n    public Seller(String username, String email, String tenShop) {\n        super(username, email);   // Gọi constructor của NguoiDung trước!\n        this.tenShop = tenShop;\n        this.doanhSo = 0;\n        this.rating = 5.0;\n    }\n\n    // Method riêng của Seller\n    public void dangBan(String tenSP, double gia) {\n        System.out.printf(\"[Shop: %s] Đăng bán: %s - %,.0f đ%n\",\n            tenShop, tenSP, gia);\n        doanhSo += gia;\n    }\n\n    @Override  // Override method từ parent\n    public void inThongTin() {\n        super.inThongTin();   // Gọi inThongTin() của NguoiDung trước\n        // Rồi thêm thông tin riêng của Seller\n        System.out.println(\"Shop    : \" + tenShop);\n        System.out.printf(\"Doanh số: %,.0f đ%n\", doanhSo);\n        System.out.printf(\"Rating  : %.1f ⭐%n\", rating);\n    }\n}\n```\n\n```java\nSeller seller = new Seller(\"shop_raize\", \"shop@gmail.com\", \"Raize Gaming Store\");\n\n// Dùng method thừa hưởng từ NguoiDung:\nseller.napTien(500_000);        // Inherited!\nseller.username;                 // protected — truy cập được từ con\n\n// Dùng method riêng của Seller:\nseller.dangBan(\"Kiếm Rồng\", 1_200_000);\n\n// inThongTin() đã được override — in cả thông tin cha lẫn của Seller\nseller.inThongTin();\n```\n\n---\n\n## 2. `super` — Gọi Đến Class Cha\n\n`super` được dùng theo 2 cách:\n\n### Gọi constructor cha:\n```java\npublic Seller(String username, String email, String tenShop) {\n    super(username, email);   // Phải là dòng ĐẦU TIÊN trong constructor con!\n    //    ↑ Gọi NguoiDung(username, email)\n    this.tenShop = tenShop;\n}\n```\n\n### Gọi method cha khi đang override:\n```java\n@Override\npublic void inThongTin() {\n    super.inThongTin();    // Chạy inThongTin của NguoiDung\n    // Sau đó thêm thông tin riêng của Seller\n    System.out.println(\"Shop: \" + tenShop);\n}\n```\n\n---\n\n## 3. Method Overriding — Ghi Đè Hành Vi\n\nClass con có thể **thay đổi hoàn toàn** cách hoạt động của method thừa hưởng:\n\n```java\npublic class Admin extends NguoiDung {\n\n    private String[] quyenHan;\n\n    public Admin(String username, String email) {\n        super(username, email);\n        this.quyenHan = new String[]{\"BAN_USER\", \"EDIT_LISTING\", \"VIEW_REPORT\"};\n        this.soDuVi = 0;  // Admin không cần số dư\n    }\n\n    // Override hoàn toàn — Admin không napTien giống user thường\n    @Override\n    public void napTien(double soTien) {\n        System.out.println(\"Admin không thể nạp tiền qua form thông thường.\");\n    }\n\n    public void khoaTaiKhoan(NguoiDung nguoiDung) {\n        System.out.println(\"[ADMIN] \" + username + \" đã khóa: \" + nguoiDung.username);\n    }\n\n    @Override\n    public void inThongTin() {\n        super.inThongTin();\n        System.out.println(\"Quyền hạn: \" + String.join(\", \", quyenHan));\n    }\n}\n```\n\n> 💡 **Annotation `@Override`:** Luôn để `@Override` khi bạn muốn override. IDE sẽ báo lỗi nếu bạn gõ nhầm tên method — ví dụ gõ `inThongTinn` thì Java sẽ tạo method mới thay vì override, rất khó nhận ra bug.\n\n---\n\n## 4. Chuỗi Kế Thừa và `instanceof`\n\n```java\n// Phân cấp kế thừa:\n//   Object (mọi class đều kế thừa từ đây)\n//      ↑\n//   NguoiDung\n//      ↑\n//   Seller, Admin\n```\n\n```java\nSeller seller = new Seller(\"shop99\", \"shop@mail.com\", \"Shop 99\");\n\n// instanceof: kiểm tra object có phải kiểu đó không\nSystem.out.println(seller instanceof Seller);    // true\nSystem.out.println(seller instanceof NguoiDung); // true — vì Seller extends NguoiDung!\nSystem.out.println(seller instanceof Admin);     // false\n\n// Pattern matching (Java 16+) — kiểm tra và cast cùng lúc\nif (seller instanceof Seller s) {\n    System.out.println(\"Tên shop: \" + s.tenShop);  // Dùng s như Seller\n}\n```\n\n---\n\n## 5. Upcasting và Downcasting\n\n```java\n// UPCASTING: Seller → NguoiDung (tự động, an toàn)\nNguoiDung u = new Seller(\"shop\", \"shop@mail.com\", \"My Shop\");\n// u chỉ có thể dùng methods của NguoiDung!\nu.napTien(100_000);     // ✅ Có trong NguoiDung\n// u.dangBan(\"...\", 0); // ❌ Compiler không biết u thực sự là Seller\n\n// DOWNCASTING: NguoiDung → Seller (phải ép buộc, có thể lỗi)\nif (u instanceof Seller seller) {     // Pattern matching — an toàn hơn\n    seller.dangBan(\"Kiếm Rồng\", 1_200_000);  // ✅ OK\n}\n\n// Cách cũ (dễ bị ClassCastException nếu làm sai):\nSeller s = (Seller) u;   // Nếu u không thực sự là Seller → Runtime Error!\n```\n\n---\n\n## 6. `final` Với Class và Method\n\n```java\n// final class: không cho extends — không ai kế thừa được\npublic final class String { ... }  // Đây là lý do bạn không thể extends String!\n\n// final method: class con không override được method này\npublic class NguoiDung {\n    public final void inIdNguoiDung() {  // final method\n        System.out.println(\"ID: \" + id);\n    }\n    // → Seller, Admin KHÔNG thể override inIdNguoiDung\n}\n```\n\n---\n\n## 7. Ví Dụ Thực Tế — Hệ Thống Thanh Toán Đa Dạng\n\n```java\n// Lớp cha: thanh toán chung\npublic abstract class PhuongThucThanhToan {\n    protected String tenPhuongThuc;\n    protected boolean kichHoat;\n\n    public PhuongThucThanhToan(String tenPhuongThuc) {\n        this.tenPhuongThuc = tenPhuongThuc;\n        this.kichHoat = true;\n    }\n\n    // Template method — flow chung\n    public final void thanhToan(double soTien) {\n        if (!kichHoat) {\n            System.out.println(tenPhuongThuc + \" đang tắt!\");\n            return;\n        }\n        System.out.println(\"Bắt đầu thanh toán: \" + soTien + \" đ qua \" + tenPhuongThuc);\n        xuLyThanhToan(soTien);      // Mỗi loại xử lý khác nhau\n        System.out.println(\"✅ Hoàn thành!\");\n    }\n\n    protected abstract void xuLyThanhToan(double soTien);  // Sẽ học ở Bài 12!\n}\n\n// Lớp con: từng phương thức cụ thể\npublic class ThanhToanMomo extends PhuongThucThanhToan {\n    private String soDienThoai;\n\n    public ThanhToanMomo(String soDienThoai) {\n        super(\"MoMo\");\n        this.soDienThoai = soDienThoai;\n    }\n\n    @Override\n    protected void xuLyThanhToan(double soTien) {\n        System.out.println(\"→ Gửi request đến MoMo API cho SĐT: \" + soDienThoai);\n    }\n}\n\npublic class ThanhToanSepay extends PhuongThucThanhToan {\n    private String bankCode;\n\n    public ThanhToanSepay(String bankCode) {\n        super(\"Sepay - Chuyển khoản\");\n        this.bankCode = bankCode;\n    }\n\n    @Override\n    protected void xuLyThanhToan(double soTien) {\n        System.out.println(\"→ Tạo mã QR Sepay, bank: \" + bankCode);\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 10\n\n```\n✅ extends: class con kế thừa tất cả từ class cha\n✅ super(): gọi constructor cha — phải là dòng đầu tiên\n✅ super.method(): gọi method cha khi đang override\n✅ @Override: luôn dùng khi override — IDE check lỗi tên method\n✅ protected: private với ngoài, nhưng class con truy cập được\n✅ instanceof + pattern matching: kiểm tra kiểu an toàn\n✅ Upcasting tự động, Downcasting cần kiểm tra\n✅ final class/method: ngăn kế thừa/override\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nBạn để ý không — khi bạn gọi `inThongTin()` trên `Seller`, nó tự động gọi phiên bản override của Seller chứ không phải của NguoiDung. Điều này xảy ra tự nhiên mà bạn không cần làm gì thêm. Đây là **Polymorphism** — bài tiếp theo.\n\n👉 **[Bài 11: Polymorphism — Đa Hình](../bai-11-polymorphism/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 10: Kế Thừa (Inheritance)\n\n> 🎯 **Bối cảnh dự án:** Thiết kế **hierarchy cho hệ thống User** — phân loại buyer, seller, admin với quyền hạn khác nhau.\n\n---\n\n## 🔴 Bài Tập 1: User Hierarchy ⭐⭐\n\n**Bối cảnh thực tế:** Mọi hệ thống quản lý user đều có hierarchy. Spring Security xây dựng trên nguyên tắc này — `UserDetails` là \"base class\" cho mọi loại user.\n\n**Yêu cầu:** Tạo hierarchy `User → Buyer → Seller → Admin`:\n\n```java\n// Base class — thông tin chung của mọi user\npublic class User {\n    protected String id;\n    protected String username;\n    protected String email;\n    protected double walletBalance;\n    protected String createdAt;\n    protected boolean isActive;\n\n    public User(String username, String email) { ... }\n\n    public void deposit(double amount) { ... }\n    public String getDisplayName() { return username; }\n    public String getRole() { return \"USER\"; }\n    public boolean canBuy() { return false; }    // Override ở subclass\n    public boolean canSell() { return false; }\n    public boolean canAdmin() { return false; }\n}\n\n// Buyer: người mua hàng\npublic class Buyer extends User {\n    private int loyaltyPoints;\n    private String memberLevel; // \"BRONZE\", \"SILVER\", \"GOLD\", \"DIAMOND\"\n    private int totalOrders;\n\n    public Buyer(String username, String email) {\n        super(username, email);\n        // ...\n    }\n\n    @Override public boolean canBuy() { return true; }\n    @Override public String getRole() { return \"BUYER\"; }\n\n    public void earnPoints(int points) { ... }\n    public boolean redeemPoints(int points) { ... }\n    public String getMemberLevel() { ... } // Tính dựa trên totalOrders\n}\n\n// Seller: người bán\npublic class Seller extends User {\n    private String shopName;\n    private double sellerRating;\n    private int totalSales;\n    private String sellerTier; // \"bronze\", \"silver\", \"gold\", \"diamond\"\n    private double commissionRate; // % phí sàn\n\n    @Override public boolean canBuy() { return true; }  // Seller cũng mua được\n    @Override public boolean canSell() { return true; }\n    @Override public String getRole() { return \"SELLER\"; }\n\n    public void completeSale(double amount) { ... }\n    public double calculateCommission(double saleAmount) { ... }\n}\n\n// Admin: quản trị\npublic class Admin extends User {\n    private String adminLevel; // \"L1\", \"L2\", \"SUPER\"\n    private String[] permissions;\n\n    @Override public boolean canAdmin() { return true; }\n    @Override public String getRole() { return \"ADMIN\"; }\n\n    public void banUser(User target, String reason) { ... }\n    public void adjustBalance(User target, double amount, String reason) { ... }\n}\n```\n\n---\n\n## 🟡 Bài Tập 2: Product Hierarchy ⭐⭐\n\n**Bối cảnh thực tế:** Table per hierarchy (TPH) trong JPA — một table Products có `dtype` column để phân biệt loại. Đây cách Hibernate implement `@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`.\n\n**Yêu cầu:** Thiết kế `Product → WeaponProduct → ArmorProduct → SpecialProduct`:\n\n```java\npublic abstract class Product {\n    protected String id;\n    protected String name;\n    protected double basePrice;\n    // ...\n\n    // Abstract: mỗi loại tính giá theo cách riêng\n    public abstract double getFinalPrice();\n\n    // Abstract: mô tả đặc điểm riêng của từng loại\n    public abstract String getSpecifications();\n\n    // Concrete: dùng chung\n    public String getDisplayCard() {\n        return String.format(\"[%s] %s — %s\",\n                getCategory(), name, ShopUtils.formatVND(getFinalPrice()));\n    }\n}\n\npublic class WeaponProduct extends Product {\n    private int attackPower;     // Sức tấn công cơ bản\n    private int enhanceLevel;    // Cấp độ tăng cường (+0 đến +15)\n    private String weaponType;   // \"sword\", \"bow\", \"staff\"\n\n    // Giá tăng 20% cho mỗi cấp tăng cường\n    @Override\n    public double getFinalPrice() {\n        return basePrice * Math.pow(1.2, enhanceLevel);\n    }\n}\n\npublic class ArmorProduct extends Product {\n    private int defense;\n    private String material;     // \"iron\", \"mythril\", \"dragon_scale\"\n    private String[] resistances; // [\"fire\", \"ice\"]\n}\n\n// SpecialProduct: bundle nhiều item\npublic class BundleProduct extends Product {\n    private Product[] items;\n    private double bundleDiscount; // % giảm khi mua bundle\n\n    @Override\n    public double getFinalPrice() {\n        double total = 0;\n        for (Product item : items) total += item.getFinalPrice();\n        return total * (1 - bundleDiscount / 100);\n    }\n}\n```\n\n---\n\n## 🔴 Bài Tập 3: Notification System ⭐⭐⭐\n\n**Bối cảnh thực tế:** Observer pattern + Inheritance — cách Spring Event, Android BroadcastReceiver hoạt động. Mỗi loại notification có cách gửi khác nhau nhưng cùng interface.\n\n**Yêu cầu:** Tạo notification hierarchy:\n\n```java\n// Base\npublic abstract class Notification {\n    protected String recipientId;\n    protected String title;\n    protected String message;\n    protected String timestamp;\n    protected boolean isRead;\n\n    public abstract void send();\n    public abstract String getChannel(); // \"EMAIL\", \"SMS\", \"PUSH\", \"IN_APP\"\n\n    public void markAsRead() { this.isRead = true; }\n    public String getSummary() {\n        return String.format(\"[%s] %s: %s\", getChannel(), title,\n                message.length() > 50 ? message.substring(0, 50) + \"...\" : message);\n    }\n}\n\npublic class EmailNotification extends Notification {\n    private String toEmail;\n    private String htmlTemplate; // Email có thể là HTML\n\n    @Override\n    public void send() {\n        // Giả lập gửi email\n        System.out.printf(\"[EMAIL] Gửi tới: %s%n  Subject: %s%n  Body: %s%n\",\n                toEmail, title, message);\n    }\n}\n\npublic class SmsNotification extends Notification {\n    private String phoneNumber;\n    private static final int MAX_LENGTH = 160; // SMS limit\n\n    @Override\n    public void send() {\n        // Truncate nếu quá 160 ký tự\n        String sms = message.length() > MAX_LENGTH\n                ? message.substring(0, 157) + \"...\"\n                : message;\n        System.out.printf(\"[SMS] Gửi tới: %s%n  Nội dung: %s%n\", phoneNumber, sms);\n    }\n}\n```\n\n**Simulate notification center:**\n```java\n// Khi user B mua hàng của seller S, gửi 3 loại notification:\nNotification[] notifications = {\n    new EmailNotification(seller.getEmail(), \"Đơn hàng mới!\", orderDetails),\n    new SmsNotification(seller.getPhone(), \"Bạn có đơn hàng mới\"),\n    new PushNotification(seller.getDeviceToken(), \"Đơn hàng mới từ \" + buyer.getUsername())\n};\n\nfor (Notification n : notifications) {\n    n.send(); // Polymorphism!\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `Seller extends User` nghĩa là Seller IS-A User. Nhưng `Seller extends Product` sẽ là gì? Tại sao điều đó SAI về mặt thiết kế?\n- [ ] Tại sao `protected` field (như `protected String id`) lại nguy hiểm hơn `private` + getter, đặc biệt khi dự án lớn với nhiều developer?\n- [ ] Khi nào nên dùng **inheritance** vs **composition**? Áp dụng vào bài 3: `EmailNotification` có nên extend `Notification` hay nên implement `Sendable` interface?\n- [ ] `super.method()` vs override hoàn toàn — trong `Seller.getDisplayName()`, muốn thêm shop name vào nhưng vẫn giữ từ base class, làm thế nào?\n\n---\n\n👉 **Tiếp theo:** [Bài 11 – Polymorphism](../bai-11-polymorphism/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Từ khóa nào thiết lập mối quan hệ kế thừa giữa lớp con và lớp cha?",
        "options": [
          "implements",
          "extends",
          "inherits",
          "super"
        ],
        "answer": 1,
        "explanation": "Java dùng `extends` để kế thừa class. `implements` dùng để triển khai interface."
      },
      {
        "q": "Phương thức `super.methodName()` trong lớp con dùng để làm gì?",
        "options": [
          "Gọi phương thức của lớp con đang ghi đè",
          "Gọi phương thức cùng tên của lớp cha (superclass)",
          "Tạo object của lớp cha",
          "Kiểm tra kiểu kế thừa"
        ],
        "answer": 1,
        "explanation": "`super.method()` gọi phiên bản phương thức trong lớp cha, thường dùng khi lớp con muốn mở rộng (chứ không phải thay thế hoàn toàn) hành vi của lớp cha."
      },
      {
        "q": "Thuộc tính và phương thức nào của lớp cha KHÔNG được kế thừa sang lớp con?",
        "options": [
          "public members",
          "protected members",
          "private members",
          "default (package-private) members khi ở package khác"
        ],
        "answer": 2,
        "explanation": "Private members của lớp cha không được kế thừa trực tiếp. Lớp con có thể truy cập gián tiếp qua public/protected methods của lớp cha."
      },
      {
        "q": "Annotation `@Override` dùng để làm gì?",
        "options": [
          "Bắt buộc override phương thức",
          "Chỉ dẫn cho compiler biết đây là phương thức ghi đè, giúp phát hiện lỗi nếu không ghi đè đúng",
          "Làm phương thức chạy nhanh hơn",
          "Ghi đè biến cùng tên"
        ],
        "answer": 1,
        "explanation": "@Override không bắt buộc nhưng được khuyên dùng. Nếu phương thức thực ra không ghi đè được (sai tên/tham số), compiler sẽ báo lỗi."
      },
      {
        "q": "Từ khóa `final` khi áp dụng cho class có nghĩa gì?",
        "options": [
          "Class không thể tạo object",
          "Class không thể bị kế thừa",
          "Class không thể chứa phương thức static",
          "Class không thể có thuộc tính"
        ],
        "answer": 1,
        "explanation": "`final class` không thể được extends. Ví dụ: String là final class → không thể viết `class MyString extends String`."
      },
      {
        "q": "Lớp nào là lớp cha cuối cùng của tất cả class trong Java?",
        "options": [
          "Class",
          "Base",
          "Object",
          "Root"
        ],
        "answer": 2,
        "explanation": "`java.lang.Object` là lớp cha tối thượng. Mọi class trong Java đều ngầm kế thừa từ Object nếu không extends class nào khác."
      },
      {
        "q": "Tính kế thừa giúp giải quyết vấn đề gì trong lập trình?",
        "options": [
          "Tăng tốc độ chạy chương trình",
          "Tái sử dụng code, giảm trùng lặp, xây dựng phân cấp class hợp lý",
          "Giảm dung lượng file .class",
          "Tự động xử lý lỗi"
        ],
        "answer": 1,
        "explanation": "Kế thừa cho phép tái sử dụng code từ lớp cha, xây dựng IS-A relationship (Dog IS-A Animal), và dễ mở rộng mà không sửa code cũ (OCP principle)."
      },
      {
        "q": "Điều gì xảy ra khi ghi đè (override) phương thức mà thay đổi kiểu trả về?",
        "options": [
          "Luôn cho phép",
          "Cho phép nếu kiểu trả về là subtype của kiểu gốc (covariant return type)",
          "Không bao giờ cho phép",
          "Chỉ cho phép với void"
        ],
        "answer": 1,
        "explanation": "Java hỗ trợ covariant return type: có thể override và trả về subtype. Ví dụ: cha trả về `Animal`, con override trả về `Dog` (Dog extends Animal)."
      },
      {
        "q": "Đa kế thừa (Multiple Inheritance) của class không được hỗ trợ trong Java vì lý do gì?",
        "options": [
          "Vì Java chưa phát triển kịp",
          "Tránh Diamond Problem - xung đột khi hai lớp cha có phương thức cùng tên",
          "Vì giới hạn JVM",
          "Vì không cần thiết"
        ],
        "answer": 1,
        "explanation": "Diamond Problem: nếu B và C đều extends A và cùng override một method, khi D extends B và C thì D không biết dùng phiên bản nào."
      },
      {
        "q": "Constructor của lớp cha được kế thừa tự động sang lớp con không?",
        "options": [
          "Có, tự động",
          "Không, constructor không được kế thừa. Lớp con phải tự khai báo constructor hoặc gọi super()",
          "Chỉ kế thừa default constructor",
          "Có nếu là public constructor"
        ],
        "answer": 1,
        "explanation": "Constructor KHÔNG được kế thừa. Lớp con phải định nghĩa constructor riêng. Nếu không, Java tự thêm `super()` ở đầu constructor lớp con."
      },
      {
        "q": "Phương thức final không thể làm gì?",
        "options": [
          "Không thể gọi từ subclass",
          "Không thể bị ghi đè (override) bởi lớp con",
          "Không thể có tham số",
          "Không thể trả về giá trị"
        ],
        "answer": 1,
        "explanation": "`final method` không thể bị override. Điều này đảm bảo hành vi của phương thức không bị thay đổi trong các subclass."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Inheritance — Kế Thừa\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 10: Kế Thừa (Inheritance)\n\n> 🎯 **Bối cảnh dự án:** Thiết kế **hierarchy cho hệ thống User** — phân loại buyer, seller, admin với quyền hạn khác nhau.\n\n---\n\n## 🔴 Bài Tập 1: User Hierarchy ⭐⭐\n\n**Bối cảnh thực tế:** Mọi hệ thống quản lý user đều có hierarchy. Spring Security xây dựng trên nguyên tắc này — `UserDetails` là \"base class\" cho mọi loại user.\n\n**Yêu cầu:** Tạo hierarchy `User → Buyer → Seller → Admin`:\n\n```java\n// Base class — thông tin chung của mọi user\npublic class User {\n    protected String id;\n    protected String username;\n    protected String email;\n    protected double walletBalance;\n    protected String createdAt;\n    protected boolean isActive;\n\n    public User(String username, String email) { ... }\n\n    public void deposit(double amount) { ... }\n    public String getDisplayName() { return username; }\n    public String getRole() { return \"USER\"; }\n    public boolean canBuy() { return false; }    // Override ở subclass\n    public boolean c...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 11,
    "title": "Tính Đa Hình (Polymorphism)",
    "phase": "Phase 2: Hướng Đối Tượng",
    "time": "4 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 11: Polymorphism — Đa Hình\n\n> 🟡 **Phase 2 – Bài 5/6** | Thời gian: ~2.5 giờ\n\n---\n\nTôi muốn kể cho bạn một tình huống thực tế. Hãy tưởng tượng bạn đang build hệ thống thông báo (notification) cho RaizeShop. Có nhiều loại thông báo: Email, SMS, Telegram. Mỗi loại có cách gửi khác nhau.\n\nNếu không có polymorphism:\n```java\n// Kiểm tra kiểu và gọi riêng — rất tệ!\nif (kieu.equals(\"email\"))    guiEmail(thongBao);\nelse if (kieu.equals(\"sms\")) guiSMS(thongBao);\nelse if (kieu.equals(\"tele\")) guiTelegram(thongBao);\n```\n\nMỗi lần thêm loại thông báo mới, bạn phải sửa code cũ. Đây vi phạm nguyên tắc vàng: *Open/Closed — mở để mở rộng, đóng để sửa đổi*.\n\n**Polymorphism** giải quyết điều này một cách thanh lịch.\n\n---\n\n## 1. Polymorphism Là Gì?\n\n*Poly* = nhiều, *morph* = hình thái. Đa hình nghĩa là **cùng một interface, nhiều cách thực thi khác nhau**.\n\n```java\n// Tất cả đều là \"ThongBao\" nhưng hành vi khác nhau:\nThongBao email = new EmailThongBao(\"user@mail.com\");\nThongBao sms   = new SMSThongBao(\"0912345678\");\nThongBao tele  = new TelegramThongBao(\"@user\");\n\n// Cùng gọi .gui(), mỗi cái tự biết làm gì — đó là polymorphism!\nemail.gui(\"Đơn hàng của bạn đã được xác nhận!\");\nsms.gui(\"Đơn hàng của bạn đã được xác nhận!\");\ntele.gui(\"Đơn hàng của bạn đã được xác nhận!\");\n```\n\n---\n\n## 2. Runtime Polymorphism — Dynamic Dispatch\n\nĐây là thứ ma thuật thực sự xảy ra bên dưới:\n\n```java\npublic class NguoiDung {\n    public void inThongTin() {\n        System.out.println(\"Tôi là NguoiDung\");\n    }\n}\n\npublic class Seller extends NguoiDung {\n    @Override\n    public void inThongTin() {\n        System.out.println(\"Tôi là Seller\");\n    }\n}\n\npublic class Admin extends NguoiDung {\n    @Override\n    public void inThongTin() {\n        System.out.println(\"Tôi là Admin\");\n    }\n}\n```\n\n```java\n// Biến kiểu NguoiDung, nhưng chứa object Seller/Admin\nNguoiDung u1 = new NguoiDung();\nNguoiDung u2 = new Seller(\"shop\", \"shop@mail.com\", \"My Shop\");\nNguoiDung u3 = new Admin(\"admin\", \"admin@mail.com\");\n\nu1.inThongTin();   // \"Tôi là NguoiDung\"\nu2.inThongTin();   // \"Tôi là Seller\"    — Java gọi phiên bản Seller!\nu3.inThongTin();   // \"Tôi là Admin\"     — Java gọi phiên bản Admin!\n```\n\nJVM xác định method nào được gọi dựa trên **kiểu thực tế của object lúc runtime**, không phải kiểu biến khai báo. Điều này gọi là *Dynamic Method Dispatch* — xảy ra tự động, bạn không cần làm gì thêm.\n\n---\n\n## 3. Sức Mạnh Thực Sự: Mảng Đa Hình\n\n```java\n// Mảng NguoiDung chứa cả Seller lẫn Admin\nNguoiDung[] tatCaNguoiDung = {\n    new NguoiDung(\"user1\", \"u1@mail.com\"),\n    new Seller(\"shop1\", \"s1@mail.com\", \"Shop A\"),\n    new Admin(\"admin1\", \"a1@mail.com\"),\n    new Seller(\"shop2\", \"s2@mail.com\", \"Shop B\"),\n    new NguoiDung(\"user2\", \"u2@mail.com\"),\n};\n\n// Duyệt và gọi inThongTin() — mỗi object tự biết phiên bản nào của mình!\nSystem.out.println(\"=== Danh sách tất cả người dùng ===\");\nfor (NguoiDung nd : tatCaNguoiDung) {\n    nd.inThongTin();\n    System.out.println(\"---\");\n}\n\n// Đếm theo loại\nint soSeller = 0, soAdmin = 0;\nfor (NguoiDung nd : tatCaNguoiDung) {\n    if (nd instanceof Seller) soSeller++;\n    if (nd instanceof Admin) soAdmin++;\n}\nSystem.out.println(\"Seller: \" + soSeller + \", Admin: \" + soAdmin);\n```\n\nBạn có thấy không: với 5 object khác nhau, bạn chỉ viết 1 vòng `for` với 1 lần gọi `inThongTin()`. Polymorphism làm phần còn lại.\n\n---\n\n## 4. Ứng Dụng Hệ Thống Thông Báo\n\n```java\n// Abstract class (sẽ học kỹ Bài 12) — khuôn mẫu chung\npublic abstract class ThongBao {\n    protected String tieuDe;\n\n    public ThongBao(String tieuDe) {\n        this.tieuDe = tieuDe;\n    }\n\n    // Mỗi class con PHẢI implement cái này theo cách riêng\n    public abstract void gui(String nguoiNhan, String noiDung);\n\n    // Method chung — không override\n    public void inLog(String nguoiNhan) {\n        System.out.printf(\"[LOG] Gửi '%s' tới %s%n\", tieuDe, nguoiNhan);\n    }\n}\n\npublic class EmailThongBao extends ThongBao {\n    public EmailThongBao() { super(\"Email Thông Báo\"); }\n\n    @Override\n    public void gui(String nguoiNhan, String noiDung) {\n        inLog(nguoiNhan);\n        System.out.println(\"📧 Gửi email tới \" + nguoiNhan + \": \" + noiDung);\n    }\n}\n\npublic class SMSThongBao extends ThongBao {\n    public SMSThongBao() { super(\"SMS Thông Báo\"); }\n\n    @Override\n    public void gui(String nguoiNhan, String noiDung) {\n        inLog(nguoiNhan);\n        String noiDungNgan = noiDung.length() > 50\n            ? noiDung.substring(0, 50) + \"...\"\n            : noiDung;\n        System.out.println(\"📱 SMS tới \" + nguoiNhan + \": \" + noiDungNgan);\n    }\n}\n\npublic class TelegramThongBao extends ThongBao {\n    public TelegramThongBao() { super(\"Telegram Thông Báo\"); }\n\n    @Override\n    public void gui(String nguoiNhan, String noiDung) {\n        inLog(nguoiNhan);\n        System.out.println(\"✈️ Telegram tới @\" + nguoiNhan + \": \" + noiDung);\n    }\n}\n```\n\n```java\n// Dùng polymorphism — code không đổi dù thêm loại thông báo mới!\npublic class HeThongThongBao {\n\n    public static void guiThongBaoDonHang(String tenUser, String email,\n                                           String sdt, String telegram) {\n        String noiDung = \"Đơn hàng #1234 của bạn đã được xác nhận!\";\n\n        ThongBao[] loai = {\n            new EmailThongBao(),\n            new SMSThongBao(),\n            new TelegramThongBao()\n        };\n        String[] nguoiNhan = {email, sdt, telegram};\n\n        for (int i = 0; i < loai.length; i++) {\n            loai[i].gui(nguoiNhan[i], noiDung);\n        }\n    }\n\n    public static void main(String[] args) {\n        guiThongBaoDonHang(\"raize99\",\n            \"raize@gmail.com\", \"0912345678\", \"raize99\");\n    }\n}\n```\n\n---\n\n## 5. Compile-time Polymorphism — Method Overloading\n\nBài 06 bạn đã học **method overloading** — đây cũng là một dạng polymorphism. Java quyết định method nào được gọi lúc **compile time** (dựa trên tham số):\n\n```java\npublic class InThongTin {\n    public static void in(int x) { System.out.println(\"int: \" + x); }\n    public static void in(double x) { System.out.println(\"double: \" + x); }\n    public static void in(String x) { System.out.println(\"String: \" + x); }\n\n    public static void main(String[] args) {\n        in(5);      // → int: 5\n        in(3.14);   // → double: 3.14\n        in(\"Java\"); // → String: Java\n    }\n}\n```\n\n| | Compile-time (Overloading) | Runtime (Overriding) |\n|--|---|---|\n| **Xảy ra lúc** | Biên dịch | Chạy |\n| **Cơ chế** | Khác tham số, cùng tên | Cùng tham số, kế thừa |\n| **Gọi là** | Method overloading | Dynamic dispatch |\n\n---\n\n## 6. Khi Nào Dùng Polymorphism?\n\nMỗi khi bạn thấy code kiểu này:\n\n```java\n// ❌ Dấu hiệu cần refactor bằng polymorphism:\nif (type.equals(\"email\")) sendEmail(...);\nelse if (type.equals(\"sms\")) sendSMS(...);\nelse if (type.equals(\"push\")) sendPush(...);\n\n// ✅ Sau refactor:\nNotification n = factory.create(type);  // Factory tạo object đúng kiểu\nn.send(recipient, content);              // Polymorphism làm phần còn lại\n```\n\nLuôn tự hỏi: \"Nếu thêm một loại mới, tôi có phải sửa code cũ không?\" Nếu có → có thể dùng polymorphism.\n\n---\n\n## Tóm Tắt — Bài 11\n\n```\n✅ Polymorphism = cùng lời gọi method, nhiều kết quả tùy object thực tế\n✅ Runtime polymorphism: JVM tự chọn method đúng lúc chạy (dynamic dispatch)\n✅ Upcasting (Seller → NguoiDung): tự động, hẫy dùng khi cần đa hình\n✅ Mảng kiểu cha chứa nhiều kiểu con — rất powerful!\n✅ Compile-time polymorphism = method overloading (bài 06)\n✅ Dấu hiệu cần polymorphism: code có nhiều if/else kiểm tra kiểu object\n```\n\n---\n\n## ➡️ Bài Cuối Phase 2!\n\nBạn để ý `abstract class ThongBao` chưa? tôi dùng nó để định nghĩa \"khuôn mẫu\" nhưng không implement cụ thể. Đây chính là **Abstraction** — bài cuối của Phase 2 và cũng là nền tảng quan trọng nhất cho kiến trúc phần mềm.\n\n👉 **[Bài 12: Abstraction — Abstract Class & Interface](../bai-12-abstraction/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 11: Đa Hình (Polymorphism)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống **Payment Processing** và **Discount Engine** — nơi polymorphism sáng nhất trong thực tế.\n\n---\n\n## 🔴 Bài Tập 1: Payment Gateway ⭐⭐\n\n**Bối cảnh thực tế:** Mọi e-commerce đều hỗ trợ nhiều phương thức thanh toán. Mỗi gateway (MoMo, VNPay, Bank Transfer) có API khác nhau nhưng client code chỉ gọi `processPayment()` duy nhất. Đây chính là polymorphism trong thực tế.\n\n**Yêu cầu:** Tạo hierarchy Payment:\n\n```java\npublic abstract class PaymentMethod {\n    protected String transactionId;\n    protected double amount;\n    protected String status; // \"PENDING\", \"SUCCESS\", \"FAILED\"\n\n    public abstract boolean processPayment(double amount);\n    public abstract double getProcessingFee();\n    public abstract String getMethodName();\n\n    // Template method pattern: quy trình chung cho tất cả\n    public final String executePayment(double amount) {\n        System.out.printf(\"[%s] Bắt đầu thanh toán %,.0f đ...%n\", getMethodName(), amount);\n        \n        double fee = getProcessingFee();\n        double total = amount + fee;\n        System.out.printf(\"[%s] Phí xử lý: %,.0f đ | Tổng: %,.0f đ%n\", getMethodName(), fee, total);\n        \n        boolean success = processPayment(total);\n        this.status = success ? \"SUCCESS\" : \"FAILED\";\n        return this.status;\n    }\n}\n\npublic class WalletPayment extends PaymentMethod {\n    private double walletBalance;\n\n    @Override\n    public boolean processPayment(double amount) {\n        if (walletBalance < amount) return false;\n        walletBalance -= amount;\n        return true;\n    }\n\n    @Override\n    public double getProcessingFee() { return 0; } // Ví nội bộ miễn phí\n}\n\npublic class MoMoPayment extends PaymentMethod {\n    private String phoneNumber;\n\n    @Override\n    public boolean processPayment(double amount) {\n        System.out.println(\"[MoMo] Gửi OTP tới \" + phoneNumber + \"...\");\n        System.out.println(\"[MoMo] Xác nhận thành công!\");\n        return true; // Giả lập luôn thành công\n    }\n\n    @Override\n    public double getProcessingFee() { return amount * 0.01; } // 1%\n}\n\npublic class BankTransfer extends PaymentMethod {\n    private String bankCode;\n    private String accountNumber;\n\n    @Override\n    public double getProcessingFee() { return 10_000; } // Phí cố định 10k\n}\n\npublic class CryptoPayment extends PaymentMethod {\n    private String walletAddress;\n    private String coinType; // \"BTC\", \"ETH\", \"USDT\"\n\n    @Override\n    public double getProcessingFee() { return amount * 0.005; } // 0.5%\n}\n```\n\n**Test polymorphism:**\n```java\nPaymentMethod[] methods = {\n    new WalletPayment(5_000_000),\n    new MoMoPayment(\"0912345678\"),\n    new BankTransfer(\"VCB\", \"123456789\"),\n    new CryptoPayment(\"0xABC...\", \"USDT\")\n};\n\ndouble orderAmount = 1_500_000;\nfor (PaymentMethod pm : methods) {\n    String result = pm.executePayment(orderAmount);\n    System.out.printf(\"%-15s → %s%n%n\", pm.getMethodName(), result);\n}\n```\n\n---\n\n## 🟡 Bài Tập 2: Discount Strategy Engine ⭐⭐\n\n**Bối cảnh thực tế:** Shopee có hàng chục loại giảm giá (%, fixed, freeship, combo, flash sale...). Mỗi loại tính khác nhau nhưng hệ thống gọi cùng `apply()`.\n\n**Yêu cầu:** Tạo hệ thống discount linh hoạt:\n\n```java\npublic abstract class DiscountStrategy {\n    protected String name;\n    protected String code;\n\n    public abstract double apply(double originalPrice);\n    public abstract boolean isApplicable(double orderAmount, String userTier);\n    public abstract String getDescription();\n}\n\n// Giảm theo %\npublic class PercentageDiscount extends DiscountStrategy {\n    private double percent;\n    private double maxDiscount; // Cap: giảm tối đa bao nhiêu\n\n    @Override\n    public double apply(double price) {\n        double discount = price * percent / 100;\n        if (discount > maxDiscount) discount = maxDiscount;\n        return price - discount;\n    }\n}\n\n// Giảm số tiền cố định\npublic class FixedDiscount extends DiscountStrategy {\n    private double fixedAmount;\n    private double minOrderAmount; // Đơn tối thiểu\n\n    @Override\n    public boolean isApplicable(double orderAmount, String userTier) {\n        return orderAmount >= minOrderAmount;\n    }\n}\n\n// Mua X tặng Y\npublic class BuyXGetYDiscount extends DiscountStrategy {\n    private int buyQuantity;\n    private int freeQuantity;\n\n    @Override\n    public double apply(double unitPrice) {\n        int totalItems = buyQuantity + freeQuantity;\n        return unitPrice * buyQuantity; // Chỉ tính tiền X item\n    }\n}\n\n// Flash Sale: giảm mạnh nhưng có thời gian\npublic class FlashSaleDiscount extends DiscountStrategy {\n    private double salePrice;        // Giá flash sale cố định\n    private int remainingSlots;      // Số suất còn lại\n\n    @Override\n    public double apply(double price) {\n        if (remainingSlots <= 0) return price; // Hết suất → giá gốc\n        remainingSlots--;\n        return salePrice;\n    }\n}\n```\n\n**Test: Áp dụng discount tốt nhất cho đơn hàng:**\n```java\nDiscountStrategy[] availableDiscounts = { /* ... */ };\ndouble bestPrice = originalPrice;\nString bestDiscount = \"Không có\";\n\nfor (DiscountStrategy ds : availableDiscounts) {\n    if (ds.isApplicable(originalPrice, \"GOLD\")) {\n        double newPrice = ds.apply(originalPrice);\n        if (newPrice < bestPrice) {\n            bestPrice = newPrice;\n            bestDiscount = ds.getDescription();\n        }\n    }\n}\nSystem.out.printf(\"Giá tốt nhất: %,.0f đ (áp dụng: %s)%n\", bestPrice, bestDiscount);\n```\n\n---\n\n## 🔴 Bài Tập 3: Report Exporter ⭐⭐⭐\n\n**Bối cảnh thực tế:** Admin dashboard cần export báo cáo ra JSON, CSV, PDF. Mỗi format khác nhau nhưng cùng nhận data và gọi `export()`.\n\n**Yêu cầu:** Tạo `ReportExporter` system:\n\n```java\npublic abstract class ReportExporter {\n    public abstract String export(String[] headers, String[][] data);\n    public abstract String getFileExtension();\n    public abstract String getContentType();\n}\n\npublic class CsvExporter extends ReportExporter {\n    @Override\n    public String export(String[] headers, String[][] data) {\n        StringBuilder sb = new StringBuilder();\n        sb.append(String.join(\",\", headers)).append(\"\\n\");\n        for (String[] row : data) {\n            sb.append(String.join(\",\", row)).append(\"\\n\");\n        }\n        return sb.toString();\n    }\n}\n\npublic class JsonExporter extends ReportExporter {\n    @Override\n    public String export(String[] headers, String[][] data) {\n        // Build JSON array manually\n        // [...] \n    }\n}\n\npublic class HtmlTableExporter extends ReportExporter {\n    @Override\n    public String export(String[] headers, String[][] data) {\n        // Build <table> HTML\n    }\n}\n\npublic class MarkdownExporter extends ReportExporter {\n    // Build markdown table: | Header1 | Header2 |\n}\n```\n\n**Test với dữ liệu doanh thu:**\n```java\nString[] headers = {\"Sản phẩm\", \"Số lượng\", \"Doanh thu\"};\nString[][] data = {\n    {\"Kiếm Rồng\", \"45\", \"67,500,000\"},\n    {\"Giáp Vàng\", \"23\", \"73,600,000\"},\n    {\"Nhẫn Ma Lực\", \"89\", \"71,200,000\"},\n};\n\nReportExporter[] exporters = {\n    new CsvExporter(),\n    new JsonExporter(),\n    new HtmlTableExporter(),\n    new MarkdownExporter()\n};\n\nfor (ReportExporter ex : exporters) {\n    System.out.println(\"=== \" + ex.getFileExtension().toUpperCase() + \" ===\");\n    System.out.println(ex.export(headers, data));\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `instanceof` check: `if (payment instanceof MoMoPayment)` — khi nào cần dùng? Tại sao nó thường là dấu hiệu thiết kế kém?\n- [ ] Giải thích tại sao `PaymentMethod[] methods` có thể chứa cả `WalletPayment` và `MoMoPayment` — compiler kiểm tra gì? Runtime kiểm tra gì?\n- [ ] Trong bài 2: nếu có 2 voucher áp dụng ĐỒNG THỜI (stack), thứ tự áp dụng ảnh hưởng kết quả thế nào? Giảm 20% rồi trừ 100k ≠ trừ 100k rồi giảm 20%?\n- [ ] Method `executePayment` dùng `final` — tại sao? Điều gì xảy ra nếu subclass override nó?\n\n---\n\n👉 **Tiếp theo:** [Bài 12 – Abstraction](../bai-12-abstraction/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Đa hình động (Dynamic Polymorphism) hoạt động dựa trên cơ chế nào ở runtime?",
        "options": [
          "Method Overloading",
          "Method Overriding kết hợp Dynamic Binding của JVM",
          "Ép kiểu tự động (Widening casting)",
          "Sử dụng từ khóa static"
        ],
        "answer": 1,
        "explanation": "Dynamic Polymorphism: subclass override method của superclass. JVM quyết định phương thức nào được gọi dựa trên kiểu thực tế của object ở runtime."
      },
      {
        "q": "Upcasting trong Java là gì?",
        "options": [
          "Ép kiểu từ kiểu nhỏ sang kiểu lớn (như int sang long)",
          "Gán đối tượng lớp con cho biến kiểu lớp cha - luôn an toàn",
          "Ép kiểu từ kiểu lớn sang kiểu nhỏ",
          "Gán đối tượng lớp cha cho biến lớp con"
        ],
        "answer": 1,
        "explanation": "Upcasting: `Animal a = new Dog()` - gán Dog (lớp con) cho biến Animal (lớp cha). Luôn an toàn, Java tự động thực hiện."
      },
      {
        "q": "Downcasting trong Java cần điều kiện gì để an toàn?",
        "options": [
          "Không cần điều kiện",
          "Cần kiểm tra bằng `instanceof` trước khi ép kiểu",
          "Chỉ thực hiện với primitive types",
          "Chỉ thực hiện khi biên dịch"
        ],
        "answer": 1,
        "explanation": "Downcasting (từ lớp cha về lớp con) có thể ném `ClassCastException` nếu object thực tế không phải kiểu đó. Nên kiểm tra `instanceof` trước."
      },
      {
        "q": "Cho code: `Animal a = new Dog(); a.speak();` Phương thức `speak()` của class nào được gọi?",
        "options": [
          "Animal.speak()",
          "Dog.speak()",
          "Object.speak()",
          "Lỗi biên dịch"
        ],
        "answer": 1,
        "explanation": "Dù biến `a` khai báo kiểu Animal, đối tượng thực tế là Dog. JVM dùng Dynamic Binding để gọi `Dog.speak()` (nếu Dog đã override speak())."
      },
      {
        "q": "Đa hình tĩnh (Static Polymorphism) được thực hiện thông qua cơ chế gì?",
        "options": [
          "Method Overriding",
          "Method Overloading",
          "Dynamic Binding",
          "Interface"
        ],
        "answer": 1,
        "explanation": "Static Polymorphism (đa hình biên dịch) thực hiện qua Overloading: cùng tên method nhưng khác tham số, quyết định tại compile time."
      },
      {
        "q": "Tại sao Polymorphism hữu ích trong thiết kế hệ thống?",
        "options": [
          "Giảm kích thước file .class",
          "Cho phép viết code tổng quát cho lớp cha, hoạt động đúng với bất kỳ lớp con nào",
          "Tăng tốc biên dịch",
          "Loại bỏ nhu cầu testing"
        ],
        "answer": 1,
        "explanation": "Polymorphism giúp viết code linh hoạt: `List<Animal> animals` chứa Dog, Cat, Bird - và gọi `animal.speak()` sẽ hoạt động đúng cho từng loại."
      },
      {
        "q": "Pattern nào sau đây tận dụng Polymorphism mạnh nhất?",
        "options": [
          "Singleton Pattern",
          "Strategy Pattern - định nghĩa gia đình thuật toán qua interface và hoán đổi chúng tự do",
          "Builder Pattern",
          "Prototype Pattern"
        ],
        "answer": 1,
        "explanation": "Strategy Pattern định nghĩa các thuật toán qua interface chung, sử dụng polymorphism để thay đổi hành vi tại runtime."
      },
      {
        "q": "Biến tham chiếu kiểu lớp cha có thể gọi phương thức nào của lớp con?",
        "options": [
          "Tất cả phương thức của lớp con",
          "Chỉ các phương thức đã được khai báo trong lớp cha (kể cả overridden methods)",
          "Không gọi được phương thức lớp con",
          "Chỉ phương thức static"
        ],
        "answer": 1,
        "explanation": "Biến kiểu Animal chỉ 'thấy' các phương thức trong class Animal. Để gọi phương thức riêng của Dog, cần downcast về Dog."
      },
      {
        "q": "Kết quả của `(new Dog() instanceof Animal)` nếu Dog extends Animal là gì?",
        "options": [
          "false",
          "true",
          "Lỗi biên dịch",
          "null"
        ],
        "answer": 1,
        "explanation": "`instanceof` kiểm tra quan hệ IS-A. Dog IS-A Animal (do kế thừa), nên `new Dog() instanceof Animal` = true."
      },
      {
        "q": "Sự khác biệt giữa overriding và overloading?",
        "options": [
          "Không có sự khác biệt",
          "Overriding: lớp con ghi đè phương thức lớp cha (runtime). Overloading: cùng class, cùng tên, khác tham số (compile time).",
          "Overloading xảy ra giữa hai class khác nhau",
          "Overriding chỉ dùng cho static method"
        ],
        "answer": 1,
        "explanation": "Overriding = runtime polymorphism, giữa lớp cha và con. Overloading = compile-time polymorphism, trong cùng một class hoặc hierarchy."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Tính Đa Hình (Polymorphism)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 11: Đa Hình (Polymorphism)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống **Payment Processing** và **Discount Engine** — nơi polymorphism sáng nhất trong thực tế.\n\n---\n\n## 🔴 Bài Tập 1: Payment Gateway ⭐⭐\n\n**Bối cảnh thực tế:** Mọi e-commerce đều hỗ trợ nhiều phương thức thanh toán. Mỗi gateway (MoMo, VNPay, Bank Transfer) có API khác nhau nhưng client code chỉ gọi `processPayment()` duy nhất. Đây chính là polymorphism trong thực tế.\n\n**Yêu cầu:** Tạo hierarchy Payment:\n\n```java\npublic abstract class PaymentMethod {\n    protected String transactionId;\n    protected double amount;\n    protected String status; // \"PENDING\", \"SUCCESS\", \"FAILED\"\n\n    public abstract boolean processPayment(double amount);\n    public abstract double getProcessingFee();\n    public abstract String getMethodName();\n\n    // Template method pattern: quy trình chung cho tất cả\n    public final String executePayment(double amount) {\n        System.out.printf(\"[%s] Bắt đầu thanh toán %,.0f đ...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 12,
    "title": "Tính Trừu Tượng (Abstraction)",
    "phase": "Phase 2: Hướng Đối Tượng",
    "time": "4 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 12: Abstraction — Abstract Class & Interface\n\n> 🟡 **Phase 2 – Bài 6/6** | Thời gian: ~3.5 giờ\n\n---\n\nĐây là bài cuối của Phase 2 và cũng là bài tôi thấy học sinh hay bị nhầm nhất. Tôi sẽ giải thích rõ ràng từng bước.\n\nCâu hỏi mở: Khi bạn viết class `ThongBao` ở bài trước, bạn có nhận ra `ThongBao` không thể tồn tại \"một mình\" không? Thông báo không có kiểu cụ thể thì *gửi bằng gì?* Nó chỉ là khái niệm trừu tượng — một khuôn mẫu.\n\n**Abstraction** là nghệ thuật thiết kế khuôn mẫu — định nghĩa **PHẢI LÀM GÌ** mà không quan tâm **LÀM THẾ NÀO**.\n\n---\n\n## 1. Abstract Class — Khuôn Mẫu Chưa Hoàn Chỉnh\n\n```java\n// Abstract class: KHÔNG thể new trực tiếp được\npublic abstract class ThongBao {\n    protected String tieuDe;\n    protected String nguoiGui;\n\n    public ThongBao(String tieuDe, String nguoiGui) {\n        this.tieuDe = tieuDe;\n        this.nguoiGui = nguoiGui;\n    }\n\n    // Abstract method: PHẢI override ở class con — không có thân hàm!\n    public abstract void gui(String nguoiNhan, String noiDung);\n\n    // Method thường: class con thừa hưởng, có thể override hoặc không\n    public void inLog(String nguoiNhan) {\n        System.out.printf(\"[LOG] '%s' → %s%n\", tieuDe, nguoiNhan);\n    }\n\n    // Template method pattern: định nghĩa flow, bước cụ thể do con xử lý\n    public final void guiCoLog(String nguoiNhan, String noiDung) {\n        inLog(nguoiNhan);          // Bước 1: log luôn chạy\n        gui(nguoiNhan, noiDung);   // Bước 2: gửi — class con quyết định làm gì\n        System.out.println(\"✅ Đã gửi!\\n\");  // Bước 3: confirm luôn chạy\n    }\n}\n```\n\n```java\nThongBao tb = new ThongBao(\"A\", \"B\");  // ❌ Lỗi compile! Cannot instantiate abstract class\nThongBao email = new EmailThongBao();  // ✅ OK — EmailThongBao là class cụ thể\n```\n\n**Quy tắc:** Nếu class có ít nhất 1 abstract method → class đó phải là `abstract`. Class con phải implement **tất cả** abstract method — nếu không, class con đó cũng phải là `abstract`.\n\n---\n\n## 2. Interface — Hợp Đồng Thuần Túy\n\nInterface là một bước trừu tượng hơn nữa. Không có implementation gì cả — chỉ là tập hợp **các method mà class phải thực hiện**.\n\n```java\n// Interface: định nghĩa \"hợp đồng\"\npublic interface CoTheMua {\n    boolean mua(int soLuong);   // abstract ngầm định\n    double tinhGia(int soLuong);\n}\n\npublic interface CoTheGiaoHang {\n    void datGiao(String diaDiem);\n    String xemTrangThai();\n}\n\n// Class implements nhiều interface (điều abstract class không làm được!)\npublic class SanPhamVatLy implements CoTheMua, CoTheGiaoHang {\n    private String ten;\n    private double gia;\n    private int soLuong;\n\n    public SanPhamVatLy(String ten, double gia, int soLuong) {\n        this.ten = ten;\n        this.gia = gia;\n        this.soLuong = soLuong;\n    }\n\n    @Override\n    public boolean mua(int soLuongMua) {\n        if (soLuongMua > soLuong) return false;\n        soLuong -= soLuongMua;\n        System.out.printf(\"Mua thành công %d x %s%n\", soLuongMua, ten);\n        return true;\n    }\n\n    @Override\n    public double tinhGia(int soLuong) {\n        return this.gia * soLuong;\n    }\n\n    @Override\n    public void datGiao(String diaDiem) {\n        System.out.println(\"Đặt giao \" + ten + \" đến: \" + diaDiem);\n    }\n\n    @Override\n    public String xemTrangThai() {\n        return \"Đang chuẩn bị hàng\";\n    }\n}\n```\n\n---\n\n## 3. Abstract Class vs Interface — Khi Nào Dùng Cái Nào?\n\nĐây là câu hỏi tôi bị hỏi nhiều nhất. Hãy nhớ bảng này:\n\n| | Abstract Class | Interface |\n|--|---|---|\n| **Mục đích** | \"Là một loại\" (is-a) | \"Có khả năng\" (can-do) |\n| **Extends/Implements** | `extends` (kế thừa) | `implements` (cam kết) |\n| **Số lượng** | Chỉ extends 1 class | Implements nhiều interface |\n| **Constructor** | ✅ Có | ❌ Không |\n| **Field** | ✅ Mọi kiểu | Chỉ `public static final` |\n| **Method** | Abstract + concrete | Abstract + default (Java 8+) |\n\n**Ví dụ thực tế để nhớ:**\n- `ChimCanh extends DongVat` — Chim Cánh là Động Vật (is-a) → abstract class\n- `ChimCanh implements CoTheBay` — Có Khả Năng Bay (can-do) → interface\n- `HeoRung extends DongVat` — Heo Rừng là Động Vật (is-a) → abstract class\n- `HeoRung implements CoTheBoi` — Có Khả Năng Bơi (can-do) → interface\n\n---\n\n## 4. Default Method Trong Interface (Java 8+)\n\n```java\npublic interface CoTheMua {\n    boolean mua(int soLuong);\n    double tinhGia(int soLuong);\n\n    // Default method — có implementation sẵn, class con có thể dùng hoặc override\n    default String formatGia(int soLuong) {\n        return String.format(\"%,.0f đ\", tinhGia(soLuong));\n    }\n\n    // Static method trong interface\n    static CoTheMua taoMienphi() {\n        return new CoTheMua() {\n            public boolean mua(int sl) { return true; }      // Luôn thành công\n            public double tinhGia(int sl) { return 0; }       // Miễn phí\n        };\n    }\n}\n```\n\nDefault method giải quyết vấn đề: khi thêm method mới vào interface, tất cả class đang implement phải sửa code (breaking change). Default method cho phép thêm method mà không phá vỡ code cũ.\n\n---\n\n## 5. Interface Functional (Java 8+)\n\nInterface chỉ có **1 abstract method** được gọi là *functional interface*. Đây là nền tảng của Lambda (bạn sẽ học Bài 17):\n\n```java\n@FunctionalInterface\npublic interface BoLocSanPham {\n    boolean kiemTra(SanPham sp);   // Duy nhất 1 abstract method\n}\n\n// Dùng:\nBoLocSanPham locTheoDuoi500k = (sp) -> sp.getGia() < 500_000;\nBoLocSanPham locConHang = (sp) -> sp.getSoLuong() > 0;\n\n// Áp dụng:\nfor (SanPham sp : danhSachSP) {\n    if (locTheoDuoi500k.kiemTra(sp)) {\n        System.out.println(sp.getTen());\n    }\n}\n```\n\n---\n\n## 6. Ví Dụ Thực Tế — Thiết Kế Repository Pattern (Spring Boot dùng cái này!)\n\nĐây là design pattern bạn sẽ gặp trong dự án Java thực tế.\n\n```java\n// Interface định nghĩa \"hợp đồng\" — cần làm gì\npublic interface SanPhamRepository {\n    SanPham findById(int id);\n    List<SanPham> findAll();\n    void save(SanPham sp);\n    void delete(int id);\n    List<SanPham> findByGiaDuoi(double giaMax);\n}\n\n// Implement 1: lưu trong memory (dùng để test)\npublic class MemorySanPhamRepository implements SanPhamRepository {\n    private List<SanPham> db = new ArrayList<>();\n\n    @Override\n    public SanPham findById(int id) {\n        for (SanPham sp : db) {\n            if (sp.getId() == id) return sp;\n        }\n        return null;\n    }\n\n    @Override\n    public void save(SanPham sp) {\n        db.add(sp);\n    }\n\n    // ... các method khác\n}\n\n// Implement 2: lưu trong MySQL (dùng thật)\npublic class MySQLSanPhamRepository implements SanPhamRepository {\n    @Override\n    public SanPham findById(int id) {\n        // Kết nối MySQL và query thật\n        // \"SELECT * FROM san_pham WHERE id = ?\"\n        return null; // Simplified\n    }\n    // ...\n}\n\n// Service chỉ biết đến interface — không quan tâm implementation nào!\npublic class SanPhamService {\n    private SanPhamRepository repo;   // Kiểu là interface!\n\n    // Inject implementation từ constructor\n    public SanPhamService(SanPhamRepository repo) {\n        this.repo = repo;\n    }\n\n    public SanPham laySanPham(int id) {\n        return repo.findById(id);   // Polymorphism: Memory hay MySQL tùy vào inject\n    }\n}\n\n// Dùng:\nSanPhamService service = new SanPhamService(new MemorySanPhamRepository());  // Test\nSanPhamService service2 = new SanPhamService(new MySQLSanPhamRepository());  // Production\n```\n\nBạn thấy không: `SanPhamService` viết một lần, nhưng có thể chạy với bất kỳ \"database\" nào bằng cách inject implementation khác. **Đây chính xác là cách Spring Boot hoạt động!**\n\n---\n\n## 7. Bức Tranh Tổng Thể Phase 2\n\n```\n┌─────────────────────────────────────────────────────────┐\n│                  OOP 4 Trụ Cột                          │\n├────────────────┬────────────────────────────────────────┤\n│ ENCAPSULATION  │ private fields + getter/setter          │\n│ (Bài 09)       │ → Bảo vệ dữ liệu, kiểm soát access     │\n├────────────────┼────────────────────────────────────────┤\n│ INHERITANCE    │ extends: kế thừa field + method        │\n│ (Bài 10)       │ → Tái sử dụng code, phân cấp           │\n├────────────────┼────────────────────────────────────────┤\n│ POLYMORPHISM   │ override: cùng lời gọi, nhiều hành vi  │\n│ (Bài 11)       │ → Linh hoạt, dễ mở rộng                │\n├────────────────┼────────────────────────────────────────┤\n│ ABSTRACTION    │ abstract class + interface              │\n│ (Bài 12)       │ → Định nghĩa khuôn mẫu, tách biệt      │\n│                │   \"làm gì\" và \"làm thế nào\"            │\n└────────────────┴────────────────────────────────────────┘\n```\n\n---\n\n## Tóm Tắt — Bài 12\n\n```\n✅ abstract class: có cả method cụ thể và abstract, không thể new\n✅ abstract method: không có body, class con PHẢI override\n✅ interface: hợp đồng thuần túy, một class implements nhiều interface\n✅ Khi nào dùng abstract: khi có code chung (is-a relationship)\n✅ Khi nào dùng interface: khi định nghĩa khả năng (can-do)\n✅ Default method: thêm implementation vào interface mà không phá code cũ\n✅ Repository pattern: interface tách biệt logic và data access\n```\n\n---\n\n## 🎉 Chúc Mừng — Bạn Đã Hoàn Thành Phase 2!\n\nĐây là giai đoạn khó nhất về tư duy trong lộ trình Java. Nếu bạn hiểu được Bài 07-12, bạn đã có nền tảng để đọc và hiểu bất kỳ codebase Java nào.\n\nPhase 3 sẽ thực tế hơn: **Collections** (List, Map, Set), **Exception Handling**, **File I/O**, **Lambda** và **Stream API** — những thứ bạn dùng hàng ngày khi code Java.\n\n👉 **[Bài 13: Collections Framework — Danh Sách, Tập Hợp, Bản Đồ](../../phase3-intermediate/bai-13-collections/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 12: Abstraction (Interface & Abstract Class)\n\n> 🎯 **Bối cảnh dự án:** Thiết kế **contract/API** cho các module RaizeShop — cách Spring Framework, JPA Repository hoạt động.\n\n---\n\n## 🔴 Bài Tập 1: Repository Interface — Chuẩn Spring Data ⭐⭐\n\n**Bối cảnh thực tế:** Spring Data JPA hoạt động bằng cách bạn khai báo interface → Spring tự generate implementation. Hiểu interface giúp bạn hiểu tại sao `JpaRepository<Product, Long>` hoạt động \"như phép thuật\".\n\n**Yêu cầu:** Thiết kế và implement Repository pattern:\n\n```java\n// Interface — contract cho mọi loại repository\npublic interface Repository<T> {\n    T findById(String id);\n    T[] findAll();\n    void save(T entity);\n    void update(T entity);\n    void deleteById(String id);\n    int count();\n    boolean existsById(String id);\n}\n\n// Interface mở rộng cho Product\npublic interface ProductRepository extends Repository<Product> {\n    Product[] findByCategory(String category);\n    Product[] findByPriceRange(double min, double max);\n    Product[] findByNameContaining(String keyword);\n    Product findCheapest();\n    Product findMostExpensive();\n    double getAveragePrice();\n}\n\n// Implementation dùng array (giả lập database)\npublic class InMemoryProductRepository implements ProductRepository {\n    private Product[] storage = new Product[100];\n    private int size = 0;\n\n    @Override\n    public Product findById(String id) {\n        for (int i = 0; i < size; i++) {\n            if (storage[i].getId().equals(id)) return storage[i];\n        }\n        return null;\n    }\n\n    // TODO: Implement tất cả method còn lại\n}\n```\n\n**Test:**\n```java\nProductRepository repo = new InMemoryProductRepository();\nrepo.save(new Product(\"RZ-001\", \"Kiếm Rồng\", 1_500_000, \"weapon\"));\nrepo.save(new Product(\"RZ-002\", \"Giáp Vàng\", 800_000, \"armor\"));\n\nProduct[] weapons = repo.findByCategory(\"weapon\");\nSystem.out.println(\"Vũ khí: \" + weapons.length + \" sản phẩm\");\n\nProduct cheapest = repo.findCheapest();\nSystem.out.println(\"Rẻ nhất: \" + cheapest.getName());\n```\n\n---\n\n## 🟡 Bài Tập 2: Service Layer với Interface ⭐⭐\n\n**Bối cảnh thực tế:** Trong Spring Boot, Service layer luôn có interface + implementation. Tại sao? Vì có thể swap implementation (mock cho testing, cache cho production).\n\n**Yêu cầu:** Tạo `OrderService` interface và 2 implementations:\n\n```java\npublic interface OrderService {\n    Order createOrder(String buyerId, String[] productIds, int[] quantities);\n    Order getOrderById(String orderId);\n    boolean cancelOrder(String orderId, String reason);\n    Order[] getOrdersByUser(String userId);\n    double calculateTotal(String[] productIds, int[] quantities, String voucherCode);\n    String getOrderStatus(String orderId);\n}\n\n// Implementation 1: Bình thường\npublic class StandardOrderService implements OrderService {\n    private ProductRepository productRepo;\n    // Implementation đầy đủ logic\n}\n\n// Implementation 2: Có logging mọi action (Decorator pattern preview)\npublic class LoggingOrderService implements OrderService {\n    private OrderService delegate; // Wrap implementation khác\n\n    @Override\n    public Order createOrder(String buyerId, String[] productIds, int[] quantities) {\n        System.out.printf(\"[LOG] createOrder: buyer=%s, items=%d%n\", buyerId, productIds.length);\n        long start = System.currentTimeMillis();\n        Order result = delegate.createOrder(buyerId, productIds, quantities);\n        long duration = System.currentTimeMillis() - start;\n        System.out.printf(\"[LOG] createOrder completed in %dms, orderId=%s%n\", duration, result.getId());\n        return result;\n    }\n}\n```\n\n---\n\n## 🔴 Bài Tập 3: Plugin System — Interface Thực Chiến ⭐⭐⭐\n\n**Bối cảnh thực tế:** Hệ thống plugin (WordPress hooks, VS Code extensions) hoạt động bằng interface — bất kỳ ai cũng có thể implement interface đã định nghĩa và \"cắm\" vào hệ thống.\n\n**Yêu cầu:** Thiết kế plugin system cho RaizeShop:\n\n```java\n// Interface cho plugin\npublic interface ShopPlugin {\n    String getName();\n    String getVersion();\n    void onEnable();\n    void onDisable();\n}\n\n// Interface cho event hook\npublic interface OrderEventListener {\n    void onOrderCreated(Order order);\n    void onOrderPaid(Order order);\n    void onOrderCancelled(Order order, String reason);\n}\n\n// Interface cho filter hook\npublic interface PriceFilter {\n    double filterPrice(Product product, double currentPrice);\n}\n\n// Plugin ví dụ: Tự động gửi SMS khi có đơn\npublic class SmsNotifyPlugin implements ShopPlugin, OrderEventListener {\n    @Override public void onOrderCreated(Order order) {\n        System.out.println(\"[SMS] Gửi SMS cho seller: Đơn hàng mới #\" + order.getId());\n    }\n    // ...\n}\n\n// Plugin ví dụ: Flash sale tự động giảm giá\npublic class FlashSalePlugin implements ShopPlugin, PriceFilter {\n    private String[] saleProductIds;\n    private double salePercent;\n\n    @Override\n    public double filterPrice(Product product, double currentPrice) {\n        for (String id : saleProductIds) {\n            if (product.getId().equals(id)) {\n                return currentPrice * (1 - salePercent / 100);\n            }\n        }\n        return currentPrice; // Không nằm trong sale → giữ nguyên\n    }\n}\n\n// Plugin Manager: quản lý tất cả plugins\npublic class PluginManager {\n    private ShopPlugin[] plugins = new ShopPlugin[20];\n    private int pluginCount = 0;\n\n    public void registerPlugin(ShopPlugin plugin) { ... }\n    public void unregisterPlugin(String pluginName) { ... }\n\n    // Gọi tất cả OrderEventListener khi có event\n    public void fireOrderCreated(Order order) {\n        for (int i = 0; i < pluginCount; i++) {\n            if (plugins[i] instanceof OrderEventListener listener) {\n                listener.onOrderCreated(order);\n            }\n        }\n    }\n\n    // Áp dụng tất cả PriceFilter theo chain\n    public double applyPriceFilters(Product product) {\n        double price = product.getBasePrice();\n        for (int i = 0; i < pluginCount; i++) {\n            if (plugins[i] instanceof PriceFilter filter) {\n                price = filter.filterPrice(product, price);\n            }\n        }\n        return price;\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `interface` vs `abstract class` — khi nào dùng cái nào? Repository dùng interface, nhưng PaymentMethod (bài 11) dùng abstract class — tại sao?\n- [ ] Tại sao Spring luôn yêu cầu `interface OrderService` + `class OrderServiceImpl`? Trong dự án nhỏ có cần không?\n- [ ] Java 8+ cho phép `default` method trong interface — điều này có phá vỡ nguyên tắc \"interface = pure contract\" không?\n- [ ] Multiple interfaces: `class SmsPlugin implements ShopPlugin, OrderEventListener` — tại sao Java chỉ cho single class inheritance nhưng cho multiple interface implementation?\n\n---\n\n👉 **Tiếp theo:** [Bài 13 – Collections](../../phase3-intermediate/bai-13-collections/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Phát biểu nào đúng về Interface trong Java?",
        "options": [
          "Một class chỉ có thể implements một Interface.",
          "Interface không thể chứa phương thức có thân code.",
          "Interface cho phép đa kế thừa giao diện, và có default method từ Java 8.",
          "Tất cả biến trong Interface mặc định là private."
        ],
        "answer": 2,
        "explanation": "Java 8 thêm default method và static method trong interface. Một class có thể implements nhiều interface (đa kế thừa giao diện)."
      },
      {
        "q": "Abstract class khác Interface ở điểm nào cơ bản nhất?",
        "options": [
          "Abstract class nhanh hơn Interface",
          "Abstract class có thể có state (biến instance) và constructor; Interface truyền thống chỉ có constants và abstract methods",
          "Interface không thể có phương thức",
          "Abstract class không thể có phương thức abstract"
        ],
        "answer": 1,
        "explanation": "Abstract class: có thể có fields, constructor, mixed phương thức abstract và concrete. Interface: chủ yếu là contract, không có constructor, không có state (trước Java 8)."
      },
      {
        "q": "Phương thức abstract bắt buộc được ghi đè bởi:",
        "options": [
          "Bất kỳ class nào dùng nó",
          "Class con trực tiếp (nếu không phải abstract)",
          "Chỉ interface",
          "Chỉ phương thức cùng tên trong lớp cha"
        ],
        "answer": 1,
        "explanation": "Concrete class (non-abstract) extends abstract class phải implement tất cả abstract methods. Nếu không, phải khai báo là abstract."
      },
      {
        "q": "Từ khóa nào khai báo class trừu tượng trong Java?",
        "options": [
          "interface",
          "abstract",
          "virtual",
          "base"
        ],
        "answer": 1,
        "explanation": "Dùng từ khóa `abstract class ClassName {}`. Abstract class không thể tạo instance trực tiếp."
      },
      {
        "q": "Có thể khởi tạo (instantiate) abstract class trực tiếp không?",
        "options": [
          "Có, bình thường",
          "Không, phải thông qua anonymous class hoặc concrete subclass",
          "Có nhưng chỉ trong cùng package",
          "Chỉ được nếu không có abstract method"
        ],
        "answer": 1,
        "explanation": "`new AbstractClass()` gây lỗi biên dịch. Phải tạo subclass và override tất cả abstract methods, hoặc dùng anonymous class."
      },
      {
        "q": "Interface có thể có phương thức `default` từ Java 8. Điều này giải quyết vấn đề gì?",
        "options": [
          "Tăng tốc độ chạy",
          "Cho phép thêm phương thức mới vào interface mà không phá vỡ các class đã implements nó",
          "Thay thế abstract class hoàn toàn",
          "Giảm boilerplate code trong subclass"
        ],
        "answer": 1,
        "explanation": "Default methods giải quyết vấn đề backward compatibility: thêm method mới vào interface mà không buộc tất cả implementations phải cập nhật."
      },
      {
        "q": "Tất cả biến trong interface có đặc tính gì?",
        "options": [
          "private",
          "public final static (hằng số)",
          "protected",
          "Tùy thuộc khai báo"
        ],
        "answer": 1,
        "explanation": "Mặc định, tất cả biến trong interface là `public static final` - tức là hằng số (constants) có thể gọi qua tên interface."
      },
      {
        "q": "Functional Interface trong Java là gì?",
        "options": [
          "Interface chứa method thực hiện tính toán",
          "Interface có đúng một abstract method - đủ điều kiện dùng với Lambda expression",
          "Interface extends từ Runnable",
          "Interface không có method"
        ],
        "answer": 1,
        "explanation": "Functional interface có đúng 1 abstract method. Annotation `@FunctionalInterface` để compiler kiểm tra. Ví dụ: Runnable, Comparable, Function<T,R>."
      },
      {
        "q": "Khi class implements nhiều interface có cùng default method, lỗi gì xảy ra?",
        "options": [
          "Chạy bình thường, dùng phương thức của interface đầu tiên",
          "Lỗi biên dịch - class phải override phương thức đó để giải quyết xung đột",
          "JVM tự chọn ngẫu nhiên",
          "Không thể implements 2 interface có default method cùng tên"
        ],
        "answer": 1,
        "explanation": "Java yêu cầu class giải quyết xung đột bằng cách override method đó, có thể dùng `InterfaceA.super.method()` để chỉ định dùng phiên bản nào."
      },
      {
        "q": "Anonymous class trong Java là gì?",
        "options": [
          "Class không có tên, định nghĩa và khởi tạo ngay tại nơi sử dụng",
          "Class bên trong một phương thức",
          "Class không có thuộc tính",
          "Abstract class không tên"
        ],
        "answer": 0,
        "explanation": "Anonymous class không có tên, thường dùng để triển khai interface hoặc extend abstract class ngay tại điểm sử dụng, thay thế cho Lambda đơn giản."
      },
      {
        "q": "Interface có thể extend interface khác không?",
        "options": [
          "Không",
          "Có, và có thể extend nhiều interface (multiple inheritance)",
          "Có, nhưng chỉ một interface",
          "Chỉ trong cùng package"
        ],
        "answer": 1,
        "explanation": "Interface có thể extends nhiều interface khác: `interface C extends A, B {}`. Đây là một hình thức đa kế thừa an toàn trong Java."
      },
      {
        "q": "Phương thức nào của enum dùng để lấy ra một mảng chứa tất cả các hằng số của enum đó?",
        "options": [
          "values()",
          "list()",
          "getConstants()",
          "toArray()"
        ],
        "answer": 0,
        "explanation": "Phương thức values() tự động được sinh ra cho enum, trả về mảng chứa toàn bộ hằng số theo đúng thứ tự khai báo."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Tính Trừu Tượng (Abstraction)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 12: Abstraction (Interface & Abstract Class)\n\n> 🎯 **Bối cảnh dự án:** Thiết kế **contract/API** cho các module RaizeShop — cách Spring Framework, JPA Repository hoạt động.\n\n---\n\n## 🔴 Bài Tập 1: Repository Interface — Chuẩn Spring Data ⭐⭐\n\n**Bối cảnh thực tế:** Spring Data JPA hoạt động bằng cách bạn khai báo interface → Spring tự generate implementation. Hiểu interface giúp bạn hiểu tại sao `JpaRepository<Product, Long>` hoạt động \"như phép thuật\".\n\n**Yêu cầu:** Thiết kế và implement Repository pattern:\n\n```java\n// Interface — contract cho mọi loại repository\npublic interface Repository<T> {\n    T findById(String id);\n    T[] findAll();\n    void save(T entity);\n    void update(T entity);\n    void deleteById(String id);\n    int count();\n    boolean existsById(String id);\n}\n\n// Interface mở rộng cho Product\npublic interface ProductRepository extends Repository<Product> {\n    Product[] findByCategory(String category);\n    Product[] findByPriceRange(double min,...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 13,
    "title": "Collections Framework",
    "phase": "Phase 3: Java Intermediate",
    "time": "5 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 13: Collections Framework — List, Set, Map\n\n> 🟠 **Phase 3 – Bài 1/6** | Thời gian: ~4 giờ\n\n---\n\nBạn đã học mảng (array) ở Bài 05. Nhưng mảng có một vấn đề lớn: **kích thước cố định**. Tạo ra mảng 10 phần tử thì chỉ chứa được 10, dù dữ liệu thực tế có thể nhiều hơn hay ít hơn.\n\nTrong Java, **Collections Framework** là bộ công cụ xử lý tập hợp dữ liệu **linh hoạt** — danh sách có thể thêm/xóa tự do, tránh trùng lặp, tra cứu theo key... Đây là những thứ bạn dùng gần như trong mọi ứng dụng thực tế.\n\n---\n\n## 1. Bức Tranh Tổng Thể Collections\n\n```\njava.util.Collection\n├── List (danh sách có thứ tự, cho phép trùng)\n│   ├── ArrayList  ← hay dùng nhất\n│   └── LinkedList\n├── Set (tập hợp, KHÔNG trùng)\n│   ├── HashSet    ← nhanh nhất\n│   ├── LinkedHashSet  ← giữ thứ tự thêm vào\n│   └── TreeSet    ← tự sắp xếp\n└── Queue (hàng đợi FIFO)\n    └── LinkedList, PriorityQueue\n\njava.util.Map (key → value, KHÔNG trùng key)\n├── HashMap     ← hay dùng nhất\n├── LinkedHashMap  ← giữ thứ tự\n└── TreeMap     ← key tự sắp xếp\n```\n\n---\n\n## 2. `ArrayList` — Danh Sách Động\n\n```java\nimport java.util.ArrayList;\nimport java.util.List;   // Nên dùng kiểu interface!\n\n// Khai báo\nList<String> sanPham = new ArrayList<>();\n//    ↑ Interface      ↑ Implementation\n// tôi khuyên: luôn khai báo kiểu là interface (List, Set, Map)\n// Lý do: dễ đổi sang LinkedList/TreeSet sau này mà không sửa code dùng\n\n// Thêm phần tử\nsanPham.add(\"Kiếm Rồng\");\nsanPham.add(\"Giáp Vàng\");\nsanPham.add(\"Nhẫn Ma\");\n\n// Truy cập\nSystem.out.println(sanPham.get(0));      // \"Kiếm Rồng\"\nSystem.out.println(sanPham.size());       // 3\nSystem.out.println(sanPham.isEmpty());    // false\nSystem.out.println(sanPham.contains(\"Giáp Vàng\"));  // true\n\n// Thêm vào vị trí cụ thể\nsanPham.add(1, \"Hài Cát\");  // Thêm vào index 1, đẩy phần tử sau sang phải\n\n// Xóa\nsanPham.remove(\"Giáp Vàng\");   // Xóa theo giá trị\nsanPham.remove(0);              // Xóa theo index\n\n// Duyệt\nfor (String sp : sanPham) {\n    System.out.println(sp);\n}\n\n// Dùng index trong for\nfor (int i = 0; i < sanPham.size(); i++) {\n    System.out.printf(\"%d. %s%n\", i + 1, sanPham.get(i));\n}\n```\n\n### Làm Việc Với Object\n\n```java\nList<NguoiDung> users = new ArrayList<>();\nusers.add(new NguoiDung(\"raize99\", \"r@mail.com\"));\nusers.add(new NguoiDung(\"gamer\", \"g@mail.com\"));\nusers.add(new NguoiDung(\"admin\", \"a@mail.com\"));\n\n// Tìm user theo username\nNguoiDung timThay = null;\nfor (NguoiDung u : users) {\n    if (\"raize99\".equals(u.getUsername())) {\n        timThay = u;\n        break;\n    }\n}\n\n// Xóa user cụ thể (cần override equals() trong NguoiDung — sẽ học sau)\n// Hoặc xóa qua iterator:\nusers.removeIf(u -> u.getUsername().equals(\"gamer\"));  // Lambda (Bài 17!)\n```\n\n---\n\n## 3. `HashSet` — Không Trùng Lặp\n\n```java\nimport java.util.HashSet;\nimport java.util.Set;\n\nSet<String> tags = new HashSet<>();\ntags.add(\"gaming\");\ntags.add(\"action\");\ntags.add(\"pvp\");\ntags.add(\"gaming\");  // Thêm lần 2 — BỊ BỎ QUA! Set tự loại trùng\n\nSystem.out.println(tags.size());       // 3, không phải 4\nSystem.out.println(tags.contains(\"pvp\")); // true\n\n// Dùng thực tế: tìm các game KHÔNG trùng trong danh sách đơn hàng\nList<String> lichSuMua = List.of(\"Liên Minh\", \"PUBG\", \"Liên Minh\", \"Minecraft\", \"PUBG\");\nSet<String> gameUniQ = new HashSet<>(lichSuMua);  // Loại trùng\nSystem.out.println(gameUniQ);  // [Liên Minh, PUBG, Minecraft] (thứ tự không đảm bảo)\nSystem.out.println(\"Số game khác nhau: \" + gameUniQ.size());  // 3\n```\n\n> 💡 **Khi nào dùng Set thay List?** Khi bạn cần đảm bảo **không trùng** và không cần thứ tự. Ví dụ: danh sách tag, email đã đăng ký, IP address đã chặn.\n\n---\n\n## 4. `HashMap` — Dữ Liệu Dạng Key-Value\n\n```java\nimport java.util.HashMap;\nimport java.util.Map;\n\n// Map<KiểuKey, KiểuValue>\nMap<String, Integer> diemCutThhu = new HashMap<>();\n\n// Thêm/cập nhật\ndiemCutThhu.put(\"raize99\", 2500);\ndiemCutThhu.put(\"gamer_pro\", 4800);\ndiemCutThhu.put(\"newbie01\", 800);\ndiemCutThhu.put(\"raize99\", 3000);  // Cập nhật — key trùng thì ghi đè value!\n\n// Đọc\nSystem.out.println(diemCutThhu.get(\"raize99\"));         // 3000\nSystem.out.println(diemCutThhu.get(\"khong_co\"));        // null\nSystem.out.println(diemCutThhu.getOrDefault(\"khong_co\", 0));  // 0 (an toàn hơn)\n\nSystem.out.println(diemCutThhu.containsKey(\"gamer_pro\"));    // true\nSystem.out.println(diemCutThhu.containsValue(800));           // true\nSystem.out.println(diemCutThhu.size());                        // 3\n\n// Xóa\ndiemCutThhu.remove(\"newbie01\");\n\n// Duyệt — 3 cách\n// Cách 1: Qua entrySet (hay dùng nhất)\nfor (Map.Entry<String, Integer> entry : diemCutThhu.entrySet()) {\n    System.out.println(entry.getKey() + \" → \" + entry.getValue() + \" điểm\");\n}\n\n// Cách 2: Chỉ duyệt key\nfor (String key : diemCutThhu.keySet()) {\n    System.out.println(key);\n}\n\n// Cách 3: Chỉ duyệt value\nfor (int value : diemCutThhu.values()) {\n    System.out.println(value);\n}\n```\n\n### Ứng Dụng Thực Tế Của Map\n\n```java\n// Đếm số lần xuất hiện của từng game\nList<String> danhSachMua = List.of(\"PUBG\", \"Liên Minh\", \"PUBG\", \"Minecraft\", \"Liên Minh\", \"PUBG\");\n\nMap<String, Integer> soLanMua = new HashMap<>();\nfor (String game : danhSachMua) {\n    int soLan = soLanMua.getOrDefault(game, 0);\n    soLanMua.put(game, soLan + 1);\n}\n// Hoặc gọn hơn: soLanMua.merge(game, 1, Integer::sum);\n\nSystem.out.println(soLanMua);\n// {PUBG=3, Liên Minh=2, Minecraft=1}\n```\n\n---\n\n## 5. `Collections` Utility Class\n\n```java\nimport java.util.Collections;\n\nList<Integer> soList = new ArrayList<>(List.of(5, 2, 8, 1, 9, 3));\n\nCollections.sort(soList);                     // Sắp xếp tăng dần\nCollections.sort(soList, Collections.reverseOrder()); // Giảm dần\nCollections.shuffle(soList);                  // Xáo trộn ngẫu nhiên\nSystem.out.println(Collections.max(soList));  // Lớn nhất\nSystem.out.println(Collections.min(soList));  // Nhỏ nhất\nCollections.reverse(soList);                  // Đảo ngược\n\n// Tạo list/set/map không thay đổi được (immutable):\nList<String> coDinh = List.of(\"A\", \"B\", \"C\");      // Java 9+\nSet<String> coinhDinhSet = Set.of(\"X\", \"Y\", \"Z\");\nMap<String, Integer> fixedMap = Map.of(\"a\", 1, \"b\", 2);\n\ncoDinh.add(\"D\");  // ❌ UnsupportedOperationException!\n```\n\n---\n\n## 6. Chọn Đúng Collection\n\ntôi tóm tắt cho bạn nguyên tắc chọn:\n\n```\nCần DANH SÁCH có thứ tự, cho phép trùng?\n    → ArrayList (nếu thường đọc)\n    → LinkedList (nếu thường thêm/xóa ở đầu/giữa)\n\nCần TẬP HỢP không trùng?\n    → HashSet (nhanh nhất, thứ tự ngẫu nhiên)\n    → LinkedHashSet (giữ thứ tự thêm vào)\n    → TreeSet (tự sắp xếp)\n\nCần tra cứu KEY → VALUE?\n    → HashMap (nhanh nhất) ← hay dùng nhất\n    → LinkedHashMap (giữ thứ tự)\n    → TreeMap (key sắp xếp)\n```\n\n---\n\n## 7. Ví Dụ Thực Tế — Giỏ Hàng\n\n```java\nimport java.util.*;\n\npublic class GioHang {\n\n    private Map<String, Integer> items = new LinkedHashMap<>();  // key=tên, value=số lượng\n    private Map<String, Double> gia = new HashMap<>();\n\n    public void them(String ten, double giaItem, int soLuong) {\n        items.merge(ten, soLuong, Integer::sum);  // Nếu đã có thì cộng thêm\n        gia.put(ten, giaItem);\n        System.out.printf(\"✅ Thêm %d x %s vào giỏ%n\", soLuong, ten);\n    }\n\n    public void xoa(String ten) {\n        if (items.remove(ten) != null) {\n            System.out.println(\"🗑️ Đã xóa: \" + ten);\n        } else {\n            System.out.println(\"Không tìm thấy: \" + ten);\n        }\n    }\n\n    public void inGioHang() {\n        if (items.isEmpty()) { System.out.println(\"Giỏ hàng trống!\"); return; }\n\n        System.out.println(\"\\n========= GIỎ HÀNG =========\");\n        double tongTien = 0;\n        for (Map.Entry<String, Integer> entry : items.entrySet()) {\n            String ten = entry.getKey();\n            int sl = entry.getValue();\n            double g = gia.get(ten);\n            double thanhTien = g * sl;\n            tongTien += thanhTien;\n            System.out.printf(\"%-15s x%d  %,10.0f đ%n\", ten, sl, thanhTien);\n        }\n        System.out.println(\"─\".repeat(35));\n        System.out.printf(\"%-20s %,10.0f đ%n\", \"TỔNG\", tongTien);\n    }\n\n    public static void main(String[] args) {\n        GioHang gio = new GioHang();\n        gio.them(\"Kiếm Rồng\", 1_200_000, 1);\n        gio.them(\"Nhẫn Ma\", 500_000, 2);\n        gio.them(\"Kiếm Rồng\", 1_200_000, 1);  // Thêm 1 cái nữa → tổng 2\n        gio.inGioHang();\n        gio.xoa(\"Nhẫn Ma\");\n        gio.inGioHang();\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 13\n\n```\n✅ ArrayList: danh sách động, có thứ tự, cho phép trùng\n✅ HashSet: tập hợp, KHÔNG trùng, tra cứu nhanh O(1)\n✅ HashMap: key → value, key KHÔNG trùng, tra cứu nhanh O(1)\n✅ Khai báo kiểu là interface: List<T>, Set<T>, Map<K,V>\n✅ getOrDefault(): lấy giá trị an toàn hơn get() (tránh null)\n✅ List.of(), Set.of(), Map.of(): tạo collection bất biến (Java 9+)\n✅ Chọn collection dựa trên: có thứ tự không? Cho phép trùng không? Cần key-value không?\n```\n\n---\n\n## ➡️ Bài Tiếp Theo\n\nCó bao giờ bạn thắc mắc: khi code bị lỗi - ứng dụng crash hoàn toàn hay cần xử lý khéo léo hơn? Bài tiếp theo tôi dạy cách **xử lý lỗi một cách có kiểm soát** — kỹ năng cực kỳ quan trọng trong ứng dụng thực tế.\n\n👉 **[Bài 14: Exception Handling](../bai-14-exception-handling/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 13: Collections Framework\n\n> 🎯 **Bối cảnh dự án:** Thay thế mảng cứng nhắc bằng **Collections** — cách mọi dự án Java thực tế quản lý dữ liệu.\n\n---\n\n## 🔴 Bài Tập 1: Product Catalog với ArrayList ⭐⭐\n\n**Bối cảnh thực tế:** Không ai dùng `Product[]` trong dự án thực. ArrayList là collection mặc định cho danh sách có thể thay đổi kích thước.\n\n**Yêu cầu:** Tạo `ProductCatalog.java` — quản lý catalogue sản phẩm:\n\n```java\nimport java.util.*;\n\npublic class ProductCatalog {\n    private List<Product> products = new ArrayList<>();\n\n    // CRUD Operations\n    public void addProduct(Product product) { ... }\n    public boolean removeProduct(String productId) { ... }\n    public Product getById(String productId) { ... }\n\n    // Search & Filter (trả về List mới, không sửa gốc)\n    public List<Product> searchByName(String keyword) { ... }\n    public List<Product> filterByCategory(String category) { ... }\n    public List<Product> filterByPriceRange(double min, double max) { ... }\n    public List<Product> filterInStock() { ... }\n\n    // Sort (sửa trực tiếp danh sách)\n    public void sortByPriceAsc() {\n        // Implement manual sort hoặc dùng Comparator\n        products.sort((a, b) -> Double.compare(a.getPrice(), b.getPrice()));\n    }\n    public void sortByPriceDesc() { ... }\n    public void sortByRating() { ... }\n    public void sortByName() { ... }\n\n    // Statistics\n    public double getAveragePrice() { ... }\n    public Product getMostExpensive() { ... }\n    public Product getCheapest() { ... }\n    public int getTotalStock() { ... }\n    public Map<String, Integer> getCountByCategory() { ... }\n\n    // Display\n    public void displayPage(int pageNumber, int pageSize) {\n        int start = (pageNumber - 1) * pageSize;\n        int end = Math.min(start + pageSize, products.size());\n        // In ra sản phẩm từ start đến end\n    }\n}\n```\n\n**Test với 20 sản phẩm, search, filter, sort, và phân trang.**\n\n---\n\n## 🟡 Bài Tập 2: Shopping Cart với LinkedList + HashMap ⭐⭐\n\n**Bối cảnh thực tế:** Giỏ hàng cần: thêm/xóa thường xuyên (LinkedList), lookup nhanh theo ID (HashMap).\n\n**Yêu cầu:** Tạo `SmartShoppingCart.java`:\n\n```java\npublic class SmartShoppingCart {\n    // LinkedList: duy trì thứ tự thêm vào\n    private LinkedList<CartItem> items = new LinkedList<>();\n    // HashMap: lookup nhanh O(1) theo productId\n    private Map<String, CartItem> itemIndex = new HashMap<>();\n\n    public void addItem(Product product, int quantity) {\n        if (itemIndex.containsKey(product.getId())) {\n            // Đã có → tăng số lượng\n            CartItem existing = itemIndex.get(product.getId());\n            existing.setQuantity(existing.getQuantity() + quantity);\n        } else {\n            CartItem item = new CartItem(product, quantity);\n            items.add(item);\n            itemIndex.put(product.getId(), item);\n        }\n    }\n\n    public void removeItem(String productId) {\n        CartItem item = itemIndex.remove(productId);\n        if (item != null) items.remove(item);\n    }\n\n    public void updateQuantity(String productId, int newQty) { ... }\n    public double getSubtotal() { ... }\n    public int getTotalItems() { ... } // Tổng số lượng (không phải số loại)\n\n    // Hiển thị giỏ hàng đẹp\n    public void display() {\n        System.out.println(\"╔══════════════════════════════════════════════╗\");\n        System.out.println(\"║            🛒 GIỎ HÀNG CỦA BẠN              ║\");\n        System.out.println(\"╠══════════════════════════════════════════════╣\");\n        int stt = 1;\n        for (CartItem item : items) {\n            System.out.printf(\"║ %d. %-20s x%d  %,12.0f đ ║%n\",\n                    stt++, item.getProductName(), item.getQuantity(), item.getLineTotal());\n        }\n        System.out.println(\"╠══════════════════════════════════════════════╣\");\n        System.out.printf(\"║ TỔNG: %d items          %,15.0f đ ║%n\", getTotalItems(), getSubtotal());\n        System.out.println(\"╚══════════════════════════════════════════════╝\");\n    }\n}\n```\n\n---\n\n## 🟡 Bài Tập 3: Leaderboard với TreeMap ⭐⭐\n\n**Bối cảnh thực tế:** Bảng xếp hạng Top Seller — dữ liệu cần luôn **tự động sắp xếp** khi thêm/cập nhật. TreeMap giữ keys đã sắp xếp.\n\n**Yêu cầu:** Tạo `SellerLeaderboard.java`:\n\n```java\npublic class SellerLeaderboard {\n    // TreeMap: key = rating (tự sắp xếp), value = list sellers có cùng rating\n    private TreeMap<Double, List<String>> board = new TreeMap<>(Collections.reverseOrder());\n    // HashMap: lookup nhanh seller → rating hiện tại\n    private Map<String, Double> sellerRatings = new HashMap<>();\n\n    public void updateRating(String sellerName, double newRating) {\n        // Xóa khỏi vị trí cũ (nếu có)\n        // Thêm vào vị trí mới\n    }\n\n    public List<String> getTopN(int n) { ... }\n    public int getRank(String sellerName) { ... }\n    public void displayTop10() { ... }\n}\n```\n\n---\n\n## 🔴 Bài Tập 4: Order History & Analytics ⭐⭐⭐\n\n**Bối cảnh thực tế:** Dashboard báo cáo cần aggregate data — group by, count, sum — tất cả đều dùng Map pattern.\n\n**Yêu cầu:** Tạo `OrderAnalytics.java`:\n\n```java\npublic class OrderAnalytics {\n    private List<Order> orders; // Nhận từ constructor\n\n    // Doanh thu theo tháng: Map<\"2024-01\", totalRevenue>\n    public Map<String, Double> getRevenueByMonth() { ... }\n\n    // Số đơn theo trạng thái: Map<\"COMPLETED\", count>\n    public Map<String, Integer> getCountByStatus() { ... }\n\n    // Top N sản phẩm bán chạy nhất: Map<productId, totalSold>\n    public List<Map.Entry<String, Integer>> getTopSellingProducts(int n) { ... }\n\n    // Khách hàng chi tiêu nhiều nhất\n    public Map.Entry<String, Double> getTopSpender() { ... }\n\n    // In report tổng hợp\n    public void printDashboard() { ... }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `ArrayList` vs `LinkedList` — trong 95% trường hợp nên dùng cái nào? Tại sao LinkedList hiếm khi tốt hơn trong thực tế?\n- [ ] `HashMap` vs `TreeMap` vs `LinkedHashMap` — leaderboard dùng TreeMap để tự sort. Nhưng HashMap nhanh hơn. Khi nào chọn cái nào?\n- [ ] `List<Product>` vs `Product[]` — tại sao trong dự án thực KHÔNG AI dùng array? Cho 3 lý do.\n- [ ] `Collections.unmodifiableList()` — dùng khi nào? Tại sao method `searchByName()` nên trả về unmodifiable list?\n\n---\n\n👉 **Tiếp theo:** [Bài 14 – Exception Handling](../bai-14-exception-handling/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Sự khác biệt chính giữa `List` và `Set` trong Java Collections Framework?",
        "options": [
          "`List` cho phép trùng lặp và duy trì thứ tự; `Set` không cho phép trùng lặp.",
          "`List` chạy nhanh hơn `Set` trong mọi tìm kiếm.",
          "`Set` lưu Key-Value còn `List` lưu theo Index.",
          "`List` chỉ chứa String."
        ],
        "answer": 0,
        "explanation": "`List` (ArrayList, LinkedList): cho phép phần tử trùng, có thứ tự, truy cập qua index. `Set` (HashSet, TreeSet): không trùng, không đảm bảo thứ tự (trừ TreeSet)."
      },
      {
        "q": "HashMap và TreeMap khác nhau về điểm gì quan trọng?",
        "options": [
          "HashMap nhanh hơn ở mọi thao tác",
          "HashMap không đảm bảo thứ tự key; TreeMap sắp xếp key theo natural order (hoặc Comparator)",
          "TreeMap chỉ chứa String key",
          "HashMap cho phép null key; TreeMap không"
        ],
        "answer": 1,
        "explanation": "HashMap: O(1) lookup, không sắp xếp. TreeMap: O(log n) lookup, sắp xếp key tự động theo Comparable/Comparator."
      },
      {
        "q": "Phương thức nào để thêm phần tử vào ArrayList?",
        "options": [
          "insert()",
          "push()",
          "add()",
          "append()"
        ],
        "answer": 2,
        "explanation": "`list.add(element)` thêm vào cuối. `list.add(index, element)` chèn vào vị trí cụ thể."
      },
      {
        "q": "Độ phức tạp thời gian trung bình của HashMap.get(key) là gì?",
        "options": [
          "O(n)",
          "O(log n)",
          "O(1)",
          "O(n²)"
        ],
        "answer": 2,
        "explanation": "HashMap dùng hash table, lookup trung bình O(1). Trường hợp xấu nhất O(n) khi nhiều hash collision."
      },
      {
        "q": "Collections.sort() hoạt động với điều kiện gì?",
        "options": [
          "Chỉ với List<Integer>",
          "Elements phải implements Comparable, hoặc cung cấp Comparator",
          "Chỉ với ArrayList",
          "Không cần điều kiện gì"
        ],
        "answer": 1,
        "explanation": "Để sort, Java cần biết cách so sánh 2 phần tử. Cách 1: element implements Comparable (natural ordering). Cách 2: cung cấp Comparator riêng."
      },
      {
        "q": "LinkedList có ưu điểm gì so với ArrayList?",
        "options": [
          "Truy cập ngẫu nhiên (random access) nhanh hơn",
          "Chèn/Xóa ở đầu/giữa nhanh hơn - O(1) nếu đã có iterator",
          "Tốn ít bộ nhớ hơn",
          "Hỗ trợ đa luồng tốt hơn"
        ],
        "answer": 1,
        "explanation": "LinkedList: chèn/xóa O(1) khi đã có vị trí. ArrayList: chèn/xóa giữa phải dịch chuyển O(n) phần tử. ArrayList nhanh hơn với random access."
      },
      {
        "q": "Iterator trong Java Collections dùng để làm gì?",
        "options": [
          "Sắp xếp collection",
          "Duyệt qua các phần tử của collection một cách nhất quán",
          "Xóa toàn bộ collection",
          "Chuyển collection sang mảng"
        ],
        "answer": 1,
        "explanation": "Iterator cung cấp cách duyệt qua collection mà không cần biết cấu trúc bên trong. Hỗ trợ `hasNext()`, `next()`, và `remove()` trong khi duyệt."
      },
      {
        "q": "PriorityQueue trong Java hoạt động theo nguyên tắc nào?",
        "options": [
          "FIFO - First In First Out",
          "LIFO - Last In First Out",
          "Phần tử có priority cao nhất (min-heap mặc định) được lấy ra trước",
          "Ngẫu nhiên"
        ],
        "answer": 2,
        "explanation": "PriorityQueue là min-heap mặc định: phần tử nhỏ nhất (theo Comparable hoặc Comparator) được peek/poll trước. Dùng Collections.reverseOrder() cho max-heap."
      },
      {
        "q": "Sự khác biệt giữa `remove(int index)` và `remove(Object o)` trong List?",
        "options": [
          "Hoàn toàn giống nhau",
          "`remove(int)` xóa theo vị trí; `remove(Object)` xóa phần tử đầu tiên bằng value",
          "Chỉ có `remove(int)`",
          "`remove(Object)` nhanh hơn"
        ],
        "answer": 1,
        "explanation": "Overloaded: `remove(5)` xóa phần tử tại index 5. `remove(Integer.valueOf(5))` hoặc `remove((Object)5)` xóa phần tử có giá trị = 5."
      },
      {
        "q": "Khi nào nên dùng HashSet thay vì ArrayList?",
        "options": [
          "Khi cần duy trì thứ tự chèn vào",
          "Khi cần kiểm tra nhanh xem phần tử có tồn tại không (O(1) contains), và không cần trùng lặp",
          "Khi cần truy cập qua index",
          "Khi cần lưu null"
        ],
        "answer": 1,
        "explanation": "HashSet.contains() là O(1), ArrayList.contains() là O(n). Nếu hay kiểm tra membership và không cần thứ tự/index, dùng HashSet."
      },
      {
        "q": "Phương thức `Map.getOrDefault(key, defaultValue)` trả về gì?",
        "options": [
          "Luôn trả về defaultValue",
          "Giá trị của key nếu tồn tại, ngược lại trả về defaultValue",
          "null nếu key không tồn tại",
          "Ném NullPointerException nếu key không tồn tại"
        ],
        "answer": 1,
        "explanation": "getOrDefault() an toàn hơn get(): nếu key tồn tại → trả value, nếu không → trả về giá trị mặc định, không ném exception."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Collections Framework\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 13: Collections Framework\n\n> 🎯 **Bối cảnh dự án:** Thay thế mảng cứng nhắc bằng **Collections** — cách mọi dự án Java thực tế quản lý dữ liệu.\n\n---\n\n## 🔴 Bài Tập 1: Product Catalog với ArrayList ⭐⭐\n\n**Bối cảnh thực tế:** Không ai dùng `Product[]` trong dự án thực. ArrayList là collection mặc định cho danh sách có thể thay đổi kích thước.\n\n**Yêu cầu:** Tạo `ProductCatalog.java` — quản lý catalogue sản phẩm:\n\n```java\nimport java.util.*;\n\npublic class ProductCatalog {\n    private List<Product> products = new ArrayList<>();\n\n    // CRUD Operations\n    public void addProduct(Product product) { ... }\n    public boolean removeProduct(String productId) { ... }\n    public Product getById(String productId) { ... }\n\n    // Search & Filter (trả về List mới, không sửa gốc)\n    public List<Product> searchByName(String keyword) { ... }\n    public List<Product> filterByCategory(String category) { ... }\n    public List<Product> filterByPriceRange(double min, double max) { ....\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 14,
    "title": "Xử Lý Ngoại Lệ (Exceptions)",
    "phase": "Phase 3: Java Intermediate",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 14: Exception Handling — Xử Lý Lỗi\n\n> 🟠 **Phase 3 – Bài 2/6** | Thời gian: ~3 giờ\n\n---\n\nTrong đời thực, mọi thứ đều có thể xảy ra ngoài mong đợi. User nhập sai dữ liệu. Network bị ngắt. File bị xóa. Server database quá tải.\n\nMột ứng dụng tốt **không crash** khi gặp những tình huống này — nó xử lý khéo léo và thông báo lỗi rõ ràng. Đây là mục tiêu của **Exception Handling**.\n\n---\n\n## 1. Exception Là Gì?\n\n**Exception** = Sự kiện bất thường xảy ra khi runtime, phá vỡ luồng chạy bình thường.\n\n```java\nint[] arr = {1, 2, 3};\nSystem.out.println(arr[10]);   // ArrayIndexOutOfBoundsException!\n\nString s = null;\ns.length();                    // NullPointerException!\n\nint x = Integer.parseInt(\"abc\");  // NumberFormatException!\n```\n\nKhi exception xảy ra mà không được xử lý → chương trình **crash** và in stack trace đỏ vào terminal.\n\n---\n\n## 2. Cây Phân Cấp Exception\n\n```\nThrowable\n├── Error (nghiêm trọng, thường không handle được)\n│   ├── OutOfMemoryError\n│   └── StackOverflowError\n└── Exception\n    ├── Checked Exception (bắt buộc phải xử lý — compiler báo)\n    │   ├── IOException\n    │   ├── SQLException\n    │   └── FileNotFoundException\n    └── RuntimeException = Unchecked (không bắt buộc xử lý)\n        ├── NullPointerException\n        ├── ArrayIndexOutOfBoundsException\n        ├── IllegalArgumentException\n        └── NumberFormatException\n```\n\n> 💡 **Quy tắc phân biệt:** Checked exception = lỗi mà bạn biết trước có thể xảy ra (file không tồn tại, network lỗi). Unchecked = lỗi do code sai logic (truy cập null, sai index).\n\n---\n\n## 3. `try / catch / finally`\n\n```java\ntry {\n    // Code có thể gây ra exception\n    int ketQua = 10 / 0;              // ArithmeticException\n    System.out.println(ketQua);       // Dòng này KHÔNG chạy nếu exception xảy ra\n} catch (ArithmeticException e) {\n    // Xử lý exception này\n    System.out.println(\"Lỗi: \" + e.getMessage());  // \"/ by zero\"\n} finally {\n    // Luôn chạy dù có exception hay không — dùng để dọn dẹp tài nguyên\n    System.out.println(\"Khối finally luôn chạy\");\n}\n```\n\n```java\n// Bắt nhiều loại exception khác nhau\npublic static int lamPhepTinh(String s1, String s2) {\n    try {\n        int a = Integer.parseInt(s1);  // Có thể NumberFormatException\n        int b = Integer.parseInt(s2);\n        return a / b;                   // Có thể ArithmeticException\n    } catch (NumberFormatException e) {\n        System.out.println(\"Dữ liệu đầu vào không phải số: \" + e.getMessage());\n        return 0;\n    } catch (ArithmeticException e) {\n        System.out.println(\"Không thể chia cho 0!\");\n        return 0;\n    } catch (Exception e) {\n        // Catch-all cho mọi exception khác — để cuối cùng!\n        System.out.println(\"Lỗi không xác định: \" + e.getMessage());\n        return 0;\n    }\n}\n\n// Bắt nhiều exception cùng 1 catch (Java 7+):\n} catch (NumberFormatException | ArithmeticException e) {\n    System.out.println(\"Lỗi: \" + e.getMessage());\n}\n```\n\n---\n\n## 4. `throw` — Ném Exception Thủ Công\n\nĐôi khi bạn muốn tự tạo và ném exception khi điều kiện không hợp lệ:\n\n```java\npublic void setGia(double gia) {\n    if (gia < 0) {\n        throw new IllegalArgumentException(\"Giá không được âm: \" + gia);\n    }\n    if (gia > 100_000_000) {\n        throw new IllegalArgumentException(\"Giá quá lớn: \" + gia);\n    }\n    this.gia = gia;\n}\n```\n\n```java\n// Bên ngoài, caller bắt exception này:\ntry {\n    sanPham.setGia(-500);\n} catch (IllegalArgumentException e) {\n    System.out.println(\"Lỗi dữ liệu: \" + e.getMessage());\n}\n```\n\n---\n\n## 5. `throws` — Khai Báo Method Có Thể Ném\n\nVới **Checked Exception**, bạn phải xử lý HOẶC khai báo cho người gọi biết:\n\n```java\n// Cách 1: Xử lý bên trong method (try/catch)\npublic String docFile(String duongDan) {\n    try {\n        return Files.readString(Path.of(duongDan));\n    } catch (IOException e) {\n        return \"\";\n    }\n}\n\n// Cách 2: Khai báo throws — đẩy trách nhiệm cho người gọi\npublic String docFile(String duongDan) throws IOException {\n    return Files.readString(Path.of(duongDan));\n    // Người gọi phải xử lý IOException!\n}\n```\n\n---\n\n## 6. Custom Exception — Tạo Exception Riêng\n\nTrong dự án thực tế, bạn thường tạo exception riêng có tên mô tả rõ ràng:\n\n```java\n// Exception cho business logic của shop\npublic class SoDuKhongDuException extends RuntimeException {\n    private final double soDuHienTai;\n    private final double soTienCan;\n\n    public SoDuKhongDuException(double soDuHienTai, double soTienCan) {\n        super(String.format(\"Số dư không đủ! Hiện có: %,.0f đ, cần: %,.0f đ\",\n            soDuHienTai, soTienCan));\n        this.soDuHienTai = soDuHienTai;\n        this.soTienCan = soTienCan;\n    }\n\n    public double getSoDuHienTai() { return soDuHienTai; }\n    public double getSoTienCan()   { return soTienCan; }\n}\n\n// Ném nó:\npublic boolean muaVatPham(double gia) {\n    if (soDuVi < gia) {\n        throw new SoDuKhongDuException(soDuVi, gia);\n    }\n    soDuVi -= gia;\n    return true;\n}\n\n// Bắt nó:\ntry {\n    user.muaVatPham(5_000_000);\n} catch (SoDuKhongDuException e) {\n    System.out.println(e.getMessage());\n    System.out.printf(\"Cần nạp thêm: %,.0f đ%n\", e.getSoTienCan() - e.getSoDuHienTai());\n}\n```\n\n---\n\n## 7. Try-with-Resources (Java 7+)\n\nKhi làm việc với tài nguyên (file, kết nối database...) cần đóng lại sau khi dùng:\n\n```java\n// Cách cũ — dễ quên đóng:\nBufferedReader reader = null;\ntry {\n    reader = new BufferedReader(new FileReader(\"data.txt\"));\n    String line = reader.readLine();\n    // xử lý...\n} catch (IOException e) {\n    e.printStackTrace();\n} finally {\n    if (reader != null) {\n        try { reader.close(); } catch (IOException e) { /* ignore */ }\n    }\n}\n\n// Cách mới — tự động close, gọn và an toàn hơn:\ntry (BufferedReader reader = new BufferedReader(new FileReader(\"data.txt\"))) {\n    String line = reader.readLine();\n    // xử lý...\n} catch (IOException e) {\n    System.out.println(\"Không đọc được file: \" + e.getMessage());\n}\n// reader.close() tự động gọi dù có exception hay không\n```\n\n---\n\n## 8. Best Practices — tôi Hay Thấy Code Tệ Về Exception\n\n```java\n// ❌ ĐỪNG bắt exception rồi im lặng:\ntry {\n    lamGiDo();\n} catch (Exception e) {\n    // Trống rỗng — lỗi biến mất, không ai biết!\n}\n\n// ❌ ĐỪNG bắt Exception quá chung chung ở logic bình thường:\ntry {\n    int a = 1 + 1;   // Không thể lỗi, bao try làm gì?\n} catch (Exception e) { }\n\n// ❌ ĐỪNG dùng exception cho flow control thông thường:\ntry {\n    int val = map.get(key);  // Dùng map.containsKey() thay vì catch NullPointerException\n} catch (NullPointerException e) { }\n\n// ✅ Xử lý exception ở đúng tầng — không phải mọi nơi đều cần catch:\n// Tầng Repository: ném exception nếu lỗi DB\n// Tầng Service: bắt và convert thành Business exception\n// Tầng Controller/UI: bắt Business exception, trả về message cho user\n```\n\n---\n\n## 9. Ví Dụ Thực Tế — Validate Input Người Dùng\n\n```java\npublic class DangKyService {\n\n    public void dangKy(String username, String email, String password) {\n        // Validate và ném exception ngay nếu sai\n        if (username == null || username.length() < 4) {\n            throw new IllegalArgumentException(\"Username phải có ít nhất 4 ký tự\");\n        }\n        if (!email.contains(\"@\")) {\n            throw new IllegalArgumentException(\"Email không hợp lệ: \" + email);\n        }\n        if (password.length() < 8) {\n            throw new IllegalArgumentException(\"Mật khẩu phải có ít nhất 8 ký tự\");\n        }\n        // Nếu tới đây thì tất cả hợp lệ\n        System.out.println(\"Đăng ký thành công: \" + username);\n    }\n\n    public static void main(String[] args) {\n        DangKyService service = new DangKyService();\n\n        // Test nhiều case\n        String[][] testCases = {\n            {\"raize99\", \"raize@mail.com\", \"matkhau123\"},   // Hợp lệ\n            {\"ab\", \"raize@mail.com\", \"matkhau123\"},         // Username ngắn\n            {\"raize99\", \"khonghople\", \"123\"},                // Email sai + pass ngắn\n        };\n\n        for (String[] tc : testCases) {\n            try {\n                service.dangKy(tc[0], tc[1], tc[2]);\n            } catch (IllegalArgumentException e) {\n                System.out.println(\"❌ Lỗi: \" + e.getMessage());\n            }\n        }\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 14\n\n```\n✅ Exception = sự kiện bất thường, 2 loại: Checked và Unchecked\n✅ try/catch/finally: catch xử lý lỗi, finally luôn chạy\n✅ throw: ném exception thủ công khi điều kiện không hợp lệ\n✅ throws: khai báo method có thể ném Checked Exception\n✅ Custom exception: extends RuntimeException để đặt tên có ý nghĩa\n✅ try-with-resources: tự động close tài nguyên\n✅ Đừng im lặng exception — luôn log hoặc xử lý thích hợp\n```\n\n---\n\n👉 **[Bài 15: File I/O — Đọc và Ghi File](../bai-15-file-io/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 14: Exception Handling\n\n> 🎯 **Bối cảnh dự án:** Xây dựng **error handling chuyên nghiệp** — cách Spring Boot trả về lỗi 400/404/500, custom exception, và global error handler.\n\n---\n\n## 🔴 Bài Tập 1: Custom Exception Hierarchy ⭐⭐\n\n**Bối cảnh thực tế:** Spring Boot dùng `@ControllerAdvice` catch exception rồi trả JSON error response. Bạn cần custom exception để phân biệt loại lỗi.\n\n**Yêu cầu:** Thiết kế exception hierarchy cho RaizeShop:\n\n```java\n// Base exception cho toàn bộ RaizeShop\npublic class RaizeShopException extends RuntimeException {\n    private final String errorCode;\n    private final int httpStatus;\n\n    public RaizeShopException(String errorCode, String message, int httpStatus) {\n        super(message);\n        this.errorCode = errorCode;\n        this.httpStatus = httpStatus;\n    }\n}\n\n// 404 - Không tìm thấy\npublic class ResourceNotFoundException extends RaizeShopException {\n    public ResourceNotFoundException(String resourceType, String id) {\n        super(\"NOT_FOUND\", resourceType + \" với ID '\" + id + \"' không tồn tại\", 404);\n    }\n}\n\n// 400 - Input không hợp lệ\npublic class ValidationException extends RaizeShopException {\n    private final List<String> errors;\n    // Chứa nhiều lỗi validation cùng lúc\n}\n\n// 403 - Không có quyền\npublic class UnauthorizedException extends RaizeShopException { ... }\n\n// 409 - Conflict (ví dụ: mua hàng hết stock)\npublic class BusinessConflictException extends RaizeShopException { ... }\n\n// 402 - Payment failed\npublic class PaymentFailedException extends RaizeShopException {\n    private final String paymentMethod;\n    private final double amount;\n}\n```\n\n**Test:**\n```java\ntry {\n    Product p = productService.findById(\"RZ-999\");\n    // Nếu không tìm thấy → throw ResourceNotFoundException\n} catch (ResourceNotFoundException e) {\n    System.out.printf(\"[%d] %s: %s%n\", e.getHttpStatus(), e.getErrorCode(), e.getMessage());\n    // [404] NOT_FOUND: Product với ID 'RZ-999' không tồn tại\n}\n```\n\n---\n\n## 🟡 Bài Tập 2: Order Processing với Error Handling ⭐⭐\n\n**Bối cảnh thực tế:** Quy trình mua hàng có nhiều bước, mỗi bước có thể fail. Cần handle error ở đúng tầng và đảm bảo consistency.\n\n**Yêu cầu:** Tạo `OrderProcessor.java`:\n\n```java\npublic class OrderProcessor {\n\n    public Order processOrder(String buyerId, String productId, int qty, String paymentMethod) {\n        // Bước 1: Validate input\n        // → throw ValidationException nếu input sai\n\n        // Bước 2: Kiểm tra sản phẩm tồn tại\n        // → throw ResourceNotFoundException nếu không tìm thấy\n\n        // Bước 3: Kiểm tra stock đủ không\n        // → throw BusinessConflictException nếu hết hàng\n\n        // Bước 4: Kiểm tra ví đủ tiền không\n        // → throw PaymentFailedException nếu không đủ\n\n        // Bước 5: Thực hiện giao dịch\n        // → try-catch cho bất kỳ lỗi unexpected nào\n\n        // Bước 6: Gửi notification\n        // → Lỗi ở đây KHÔNG được affect đơn hàng! (catch & log only)\n\n        // FINALLY: Ghi log dù thành công hay thất bại\n    }\n}\n\n// Client code:\nOrderProcessor processor = new OrderProcessor();\ntry {\n    Order order = processor.processOrder(\"user1\", \"RZ-001\", 2, \"WALLET\");\n    System.out.println(\"✅ Đặt hàng thành công: \" + order.getId());\n} catch (ValidationException e) {\n    System.out.println(\"❌ Input không hợp lệ:\");\n    for (String err : e.getErrors()) System.out.println(\"   - \" + err);\n} catch (ResourceNotFoundException e) {\n    System.out.println(\"❌ \" + e.getMessage());\n} catch (PaymentFailedException e) {\n    System.out.printf(\"❌ Thanh toán thất bại: %s, số tiền: %,.0f đ%n\",\n            e.getPaymentMethod(), e.getAmount());\n} catch (RaizeShopException e) {\n    System.out.println(\"❌ Lỗi hệ thống: \" + e.getMessage());\n} finally {\n    System.out.println(\"[LOG] Request xử lý xong.\");\n}\n```\n\n---\n\n## 🔴 Bài Tập 3: Retry Mechanism ⭐⭐⭐\n\n**Bối cảnh thực tế:** Khi gọi external API (payment gateway, SMS), request có thể fail tạm thời. Retry pattern là cách xử lý — Spring Retry library hoạt động theo nguyên tắc này.\n\n**Yêu cầu:** Tạo `RetryableOperation.java`:\n\n```java\npublic class RetryableOperation {\n\n    public interface Operation<T> {\n        T execute() throws Exception;\n    }\n\n    /**\n     * Retry operation với exponential backoff\n     * @param maxRetries số lần retry tối đa\n     * @param initialDelayMs delay ban đầu (ms), tăng gấp đôi mỗi lần\n     * @param operation lambda chứa logic cần retry\n     */\n    public static <T> T executeWithRetry(int maxRetries, long initialDelayMs,\n                                          Operation<T> operation) {\n        Exception lastException = null;\n        long delay = initialDelayMs;\n\n        for (int attempt = 1; attempt <= maxRetries + 1; attempt++) {\n            try {\n                T result = operation.execute();\n                if (attempt > 1) {\n                    System.out.printf(\"[RETRY] Thành công ở lần thử #%d%n\", attempt);\n                }\n                return result;\n            } catch (Exception e) {\n                lastException = e;\n                if (attempt <= maxRetries) {\n                    System.out.printf(\"[RETRY] Lần %d thất bại: %s. Retry sau %dms...%n\",\n                            attempt, e.getMessage(), delay);\n                    try { Thread.sleep(delay); } catch (InterruptedException ie) { break; }\n                    delay *= 2; // Exponential backoff\n                }\n            }\n        }\n\n        throw new RuntimeException(\"Thất bại sau \" + (maxRetries + 1) + \" lần thử\", lastException);\n    }\n}\n\n// Sử dụng:\nString result = RetryableOperation.executeWithRetry(3, 1000, () -> {\n    // Giả lập API call có thể fail\n    if (Math.random() < 0.7) throw new RuntimeException(\"Connection timeout\");\n    return \"Payment SUCCESS\";\n});\n```\n\n---\n\n## 🟡 Bài Tập 4: Error Response Builder ⭐⭐\n\n**Bối cảnh thực tế:** REST API trả về error response dạng JSON chuẩn hóa. Đây là cách Spring Boot `@ExceptionHandler` build response.\n\n**Yêu cầu:** Tạo `ErrorResponse.java` và `GlobalExceptionHandler.java`:\n\n```java\npublic class ErrorResponse {\n    private int status;\n    private String error;\n    private String message;\n    private String timestamp;\n    private String path;\n    private List<String> details;\n\n    // Build JSON string thủ công\n    public String toJson() {\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"{\\n\");\n        sb.append(\"  \\\"status\\\": \").append(status).append(\",\\n\");\n        sb.append(\"  \\\"error\\\": \\\"\").append(error).append(\"\\\",\\n\");\n        sb.append(\"  \\\"message\\\": \\\"\").append(message).append(\"\\\",\\n\");\n        sb.append(\"  \\\"timestamp\\\": \\\"\").append(timestamp).append(\"\\\",\\n\");\n        sb.append(\"  \\\"path\\\": \\\"\").append(path).append(\"\\\"\");\n        if (details != null && !details.isEmpty()) {\n            sb.append(\",\\n  \\\"details\\\": [\\n\");\n            for (int i = 0; i < details.size(); i++) {\n                sb.append(\"    \\\"\").append(details.get(i)).append(\"\\\"\");\n                if (i < details.size() - 1) sb.append(\",\");\n                sb.append(\"\\n\");\n            }\n            sb.append(\"  ]\");\n        }\n        sb.append(\"\\n}\");\n        return sb.toString();\n    }\n}\n\n// Simulate: convert exception → JSON response\npublic class GlobalExceptionHandler {\n    public static ErrorResponse handle(RaizeShopException ex, String requestPath) {\n        // Map exception → ErrorResponse\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `RuntimeException` vs `checked Exception` — tại sao Spring toàn dùng RuntimeException cho business logic? Khi nào checked exception hợp lý?\n- [ ] Bước 6 trong bài 2: notification fail **KHÔNG được** cancel đơn hàng. Tại sao? Đây gọi là nguyên tắc gì trong system design?\n- [ ] `try-with-resources` — dùng khi nào? Viết ví dụ đọc file config cho quá trình thanh toán.\n- [ ] Anti-pattern `catch (Exception e) {}` (catch rồi không làm gì) — tại sao đây là bug tệ nhất? Cho ví dụ production bug thực tế.\n\n---\n\n👉 **Tiếp theo:** [Bài 15 – File I/O](../bai-15-file-io/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Checked Exception và Unchecked Exception khác nhau điểm gì?",
        "options": [
          "Checked xảy ra khi biên dịch; Unchecked khi chạy.",
          "Checked bắt buộc phải xử lý (try-catch hoặc throws) ngay khi viết code; Unchecked thì không bắt buộc.",
          "Unchecked luôn làm treo máy.",
          "Checked kế thừa từ RuntimeException."
        ],
        "answer": 1,
        "explanation": "Checked Exception: compiler bắt buộc xử lý (IOException, SQLException). Unchecked (RuntimeException): do lỗi lập trình, không bắt buộc khai báo."
      },
      {
        "q": "Khối `finally` trong try-catch-finally chạy khi nào?",
        "options": [
          "Chỉ khi có exception",
          "Chỉ khi không có exception",
          "Luôn chạy, dù có exception hay không (trừ khi JVM tắt)",
          "Chỉ khi exception được catch"
        ],
        "answer": 2,
        "explanation": "`finally` luôn thực thi sau try-catch, dù exception có xảy ra hay không. Dùng để giải phóng tài nguyên (đóng file, connection)."
      },
      {
        "q": "Lớp NullPointerException kế thừa từ lớp nào?",
        "options": [
          "Exception",
          "Error",
          "RuntimeException",
          "Throwable trực tiếp"
        ],
        "answer": 2,
        "explanation": "NullPointerException → RuntimeException → Exception → Throwable. Là Unchecked Exception do lỗi lập trình (truy cập null reference)."
      },
      {
        "q": "Mệnh đề `throws` trong khai báo phương thức dùng để làm gì?",
        "options": [
          "Ném exception ngay lập tức",
          "Khai báo rằng phương thức có thể ném ra exception, bên gọi phải xử lý",
          "Bắt exception",
          "Tạo exception mới"
        ],
        "answer": 1,
        "explanation": "`throws ExceptionType` trong khai báo phương thức thông báo cho người dùng biết phương thức có thể ném exception đó, cần xử lý khi gọi."
      },
      {
        "q": "Để tạo Custom Exception trong Java, phải làm gì?",
        "options": [
          "Implement ExceptionInterface",
          "Extends Exception (checked) hoặc RuntimeException (unchecked)",
          "Dùng annotation @Exception",
          "Không thể tạo custom exception"
        ],
        "answer": 1,
        "explanation": "Custom exception: `class InsufficientFundsException extends RuntimeException { ... }`. Mở rộng từ Exception hoặc RuntimeException."
      },
      {
        "q": "Câu lệnh `throw new IOException(\"File not found\")` làm gì?",
        "options": [
          "Khai báo phương thức có thể ném IOException",
          "Tạo và ném exception ngay lập tức, dừng luồng thực thi hiện tại",
          "Bắt IOException",
          "In thông báo lỗi"
        ],
        "answer": 1,
        "explanation": "`throw` (không phải `throws`) ném exception ngay tại điểm đó. Luồng thực thi dừng và stack unwinding bắt đầu tìm catch block phù hợp."
      },
      {
        "q": "Có thể catch nhiều exception trong một block không?",
        "options": [
          "Không",
          "Có, dùng `catch (ExA | ExB e)` từ Java 7",
          "Có, nhưng phải là cùng hierachy",
          "Chỉ được catch một exception mỗi try"
        ],
        "answer": 1,
        "explanation": "Multi-catch (Java 7+): `catch (IOException | SQLException e)` bắt nhiều exception trong một block, code gọn hơn."
      },
      {
        "q": "Error trong Java (như OutOfMemoryError) khác Exception ở điểm gì?",
        "options": [
          "Error là checked, Exception là unchecked",
          "Error chỉ xảy ra khi biên dịch",
          "Error đại diện lỗi nghiêm trọng từ JVM/system mà chương trình không thể phục hồi; không nên catch",
          "Error kế thừa từ Exception"
        ],
        "answer": 2,
        "explanation": "Error (StackOverflowError, OutOfMemoryError) là vấn đề nghiêm trọng của JVM. Không nên catch vì không phục hồi được. Cả Error và Exception đều extends Throwable."
      },
      {
        "q": "Try-with-resources (Java 7+) có ưu điểm gì?",
        "options": [
          "Code chạy nhanh hơn",
          "Tự động đóng resource sau try, không cần viết finally",
          "Ngăn chặn exception",
          "Cho phép nhiều exception trong một catch"
        ],
        "answer": 1,
        "explanation": "`try(Resource r = new Resource())` tự động gọi `r.close()` sau khi thoát khỏi try, kể cả khi có exception."
      },
      {
        "q": "getMessage() và printStackTrace() khác nhau thế nào?",
        "options": [
          "Hoàn toàn giống nhau",
          "getMessage() trả về chuỗi mô tả lỗi; printStackTrace() in toàn bộ call stack ra console",
          "printStackTrace() nhanh hơn",
          "getMessage() chỉ dùng cho custom exception"
        ],
        "answer": 1,
        "explanation": "getMessage(): trả về String thông điệp lỗi. printStackTrace(): in call stack chi tiết giúp debug, thấy được luồng gọi phương thức dẫn đến exception."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Xử Lý Ngoại Lệ (Exceptions)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 14: Exception Handling\n\n> 🎯 **Bối cảnh dự án:** Xây dựng **error handling chuyên nghiệp** — cách Spring Boot trả về lỗi 400/404/500, custom exception, và global error handler.\n\n---\n\n## 🔴 Bài Tập 1: Custom Exception Hierarchy ⭐⭐\n\n**Bối cảnh thực tế:** Spring Boot dùng `@ControllerAdvice` catch exception rồi trả JSON error response. Bạn cần custom exception để phân biệt loại lỗi.\n\n**Yêu cầu:** Thiết kế exception hierarchy cho RaizeShop:\n\n```java\n// Base exception cho toàn bộ RaizeShop\npublic class RaizeShopException extends RuntimeException {\n    private final String errorCode;\n    private final int httpStatus;\n\n    public RaizeShopException(String errorCode, String message, int httpStatus) {\n        super(message);\n        this.errorCode = errorCode;\n        this.httpStatus = httpStatus;\n    }\n}\n\n// 404 - Không tìm thấy\npublic class ResourceNotFoundException extends RaizeShopException {\n    public ResourceNotFoundException(String resourceType, String id) {\n ...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 15,
    "title": "File I/O & NIO2",
    "phase": "Phase 3: Java Intermediate",
    "time": "4 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 15: File I/O — Đọc và Ghi File\n\n> 🟠 **Phase 3 – Bài 3/6** | Thời gian: ~2.5 giờ\n\n---\n\nDữ liệu trong RAM sẽ mất khi tắt máy. **File I/O** cho phép bạn lưu dữ liệu xuống đĩa và đọc lại sau. Một kỹ năng thiết yếu: đọc file config, ghi log, xử lý file CSV, import/export dữ liệu...\n\nJava có hai cách tiếp cận: **API cũ** (`java.io`) và **NIO.2** (`java.nio.file` — Java 7+). Tôi sẽ dạy cả hai nhưng nhấn mạnh NIO.2 vì nó sạch hơn và mạnh hơn.\n\n---\n\n## 1. Path — Đường Dẫn File\n\n```java\nimport java.nio.file.Path;\nimport java.nio.file.Paths;\n\n// Tạo Path\nPath file = Path.of(\"data.txt\");                    // Relative path\nPath absPath = Path.of(\"C:/Users/Raize/data.txt\");  // Windows\nPath linuxPath = Path.of(\"/home/raize/data.txt\");   // Linux/Mac\n\n// Thao tác trên Path\nSystem.out.println(file.getFileName());   // data.txt\nSystem.out.println(file.toAbsolutePath()); // C:\\Users\\...\\data.txt\nSystem.out.println(file.getParent());     // null (không có thư mục cha)\n\nPath folder = Path.of(\"logs/2026/march/app.log\");\nSystem.out.println(folder.getParent());       // logs/2026/march\nSystem.out.println(folder.getFileName());     // app.log\nSystem.out.println(folder.getNameCount());    // 4\n```\n\n---\n\n## 2. `Files` — Đọc/Ghi Đơn Giản (NIO.2)\n\n```java\nimport java.nio.file.Files;\nimport java.nio.file.Path;\nimport java.nio.file.StandardOpenOption;\nimport java.io.IOException;\n\n// === GHI FILE ===\n\n// Ghi toàn bộ nội dung (tạo mới hoặc ghi đè)\nString noiDung = \"Xin chào Java!\\nDây là dòng 2.\";\nFiles.writeString(Path.of(\"hello.txt\"), noiDung);\n\n// Ghi với encoding cụ thể\nFiles.writeString(Path.of(\"hello.txt\"), noiDung, StandardCharsets.UTF_8);\n\n// Ghi nối thêm vào cuối file (append)\nFiles.writeString(Path.of(\"hello.txt\"), \"\\nDòng 3 được thêm vào\",\n    StandardOpenOption.APPEND);\n\n// Ghi danh sách dòng\nList<String> lines = List.of(\"Dòng 1\", \"Dòng 2\", \"Dòng 3\");\nFiles.write(Path.of(\"lines.txt\"), lines);\n\n\n// === ĐỌC FILE ===\n\n// Đọc toàn bộ thành String (file nhỏ)\nString content = Files.readString(Path.of(\"hello.txt\"));\nSystem.out.println(content);\n\n// Đọc thành List<String> — mỗi phần tử là một dòng\nList<String> danhSachDong = Files.readAllLines(Path.of(\"lines.txt\"));\nfor (String dong : danhSachDong) {\n    System.out.println(dong);\n}\n\n// Stream<String> — hiệu quả hơn với file lớn\ntry (var stream = Files.lines(Path.of(\"bigfile.txt\"))) {\n    stream.filter(line -> line.contains(\"ERROR\"))\n          .forEach(System.out::println);\n}\n```\n\n---\n\n## 3. Kiểm Tra và Thao Tác File/Folder\n\n```java\nPath path = Path.of(\"data/users.txt\");\n\n// Kiểm tra\nSystem.out.println(Files.exists(path));        // Có tồn tại không?\nSystem.out.println(Files.isFile(path));        // Là file?\nSystem.out.println(Files.isDirectory(path));   // Là folder?\nSystem.out.println(Files.isReadable(path));    // Đọc được không?\n\n// Tạo thư mục\nFiles.createDirectory(Path.of(\"logs\"));          // Tạo 1 cấp\nFiles.createDirectories(Path.of(\"logs/2026/march\")); // Tạo nhiều cấp\n\n// Sao chép, di chuyển, xóa\nFiles.copy(Path.of(\"source.txt\"), Path.of(\"dest.txt\"));\nFiles.move(Path.of(\"old.txt\"), Path.of(\"new.txt\"));\nFiles.delete(path);                    // Lỗi nếu không tồn tại\nFiles.deleteIfExists(path);            // An toàn hơn\n\n// Thông tin file\nSystem.out.println(Files.size(path) + \" bytes\");\n```\n\n---\n\n## 4. BufferedReader / BufferedWriter — API Cũ Nhưng Vẫn Dùng\n\nGặp trong nhiều codebase cũ, cần biết đọc hiểu:\n\n```java\nimport java.io.*;\n\n// Ghi file\ntry (BufferedWriter writer = new BufferedWriter(new FileWriter(\"output.txt\"))) {\n    writer.write(\"Dòng 1\");\n    writer.newLine();       // Xuống dòng\n    writer.write(\"Dòng 2\");\n}\n\n// Đọc file từng dòng\ntry (BufferedReader reader = new BufferedReader(new FileReader(\"output.txt\"))) {\n    String dong;\n    while ((dong = reader.readLine()) != null) {\n        System.out.println(dong);\n    }\n}\n```\n\n---\n\n## 5. Ví Dụ Thực Tế — Ghi và Đọc File Log\n\n```java\nimport java.nio.file.*;\nimport java.time.LocalDateTime;\nimport java.time.format.DateTimeFormatter;\nimport java.io.IOException;\n\npublic class Logger {\n\n    private static final Path LOG_FILE = Path.of(\"logs/app.log\");\n    private static final DateTimeFormatter FMT =\n        DateTimeFormatter.ofPattern(\"yyyy-MM-dd HH:mm:ss\");\n\n    public static void log(String level, String message) {\n        String entry = String.format(\"[%s] %s - %s%n\",\n            LocalDateTime.now().format(FMT), level, message);\n        try {\n            Files.createDirectories(LOG_FILE.getParent());\n            Files.writeString(LOG_FILE, entry, StandardOpenOption.CREATE, StandardOpenOption.APPEND);\n        } catch (IOException e) {\n            System.err.println(\"Không ghi được log: \" + e.getMessage());\n        }\n    }\n\n    public static void info(String msg)  { log(\"INFO \", msg); }\n    public static void warn(String msg)  { log(\"WARN \", msg); }\n    public static void error(String msg) { log(\"ERROR\", msg); }\n\n    public static void main(String[] args) throws IOException {\n        Logger.info(\"Ứng dụng khởi động\");\n        Logger.info(\"User 'raize99' đăng nhập\");\n        Logger.warn(\"Thử đăng nhập thất bại: user 'hacker'\");\n        Logger.error(\"Kết nối database thất bại\");\n\n        System.out.println(\"=== Nội dung file log ===\");\n        Files.readAllLines(LOG_FILE).forEach(System.out::println);\n    }\n}\n```\n\n---\n\n## 6. Ví Dụ Thực Tế — Đọc File CSV\n\n```java\npublic class DocCSV {\n    public static void main(String[] args) throws IOException {\n        // File data.csv:\n        // username,email,soDu\n        // raize99,r@mail.com,500000\n        // gamer,g@mail.com,1200000\n\n        List<String> lines = Files.readAllLines(Path.of(\"data.csv\"));\n\n        // Bỏ qua header (dòng đầu)\n        for (int i = 1; i < lines.size(); i++) {\n            String[] parts = lines.get(i).split(\",\");\n            if (parts.length < 3) continue;  // Bỏ qua dòng thiếu dữ liệu\n\n            String username = parts[0].trim();\n            String email = parts[1].trim();\n            double soDu = Double.parseDouble(parts[2].trim());\n\n            System.out.printf(\"%-12s %-20s %,10.0f đ%n\", username, email, soDu);\n        }\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 15\n\n```\n✅ Path.of(): tạo đường dẫn (NIO.2 — nên dùng)\n✅ Files.writeString() / Files.readString(): ghi/đọc đơn giản\n✅ Files.readAllLines(): đọc tất cả dòng thành List<String>\n✅ StandardOpenOption.APPEND: ghi nối thêm vào cuối\n✅ Files.createDirectories(): tạo cả cây thư mục\n✅ try-with-resources: tự động close tài nguyên (dùng với BufferedReader/Writer)\n✅ Tất cả File I/O đều throw IOException → phải xử lý\n```\n\n---\n\n👉 **[Bài 16: Generics](../bai-16-generics/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 15: File I/O\n\n> 🎯 **Bối cảnh dự án:** Xử lý **file trong hệ thống** — đọc config, export report, import CSV, ghi log. Đây là 4 use case file I/O phổ biến nhất trong backend.\n\n---\n\n## 🔴 Bài Tập 1: Configuration File Reader ⭐⭐\n\n**Bối cảnh thực tế:** Spring Boot đọc `application.properties`. Đây là implementation đơn giản hóa — bạn sẽ hiểu tại sao `.properties` file hoạt động.\n\n**Yêu cầu:** Tạo `ConfigReader.java` đọc file `shop.properties`:\n\n```properties\n# shop.properties\napp.name=RaizeShop\napp.version=1.0.0\napp.port=8080\ndb.host=localhost\ndb.port=3306\ndb.name=raize_db\ndb.username=admin\ndb.password=secret123\npayment.vat_rate=10.0\npayment.platform_fee=5.0\npayment.max_transaction=999999999\n```\n\n```java\npublic class ConfigReader {\n    private Map<String, String> properties = new HashMap<>();\n\n    public void load(String filePath) throws IOException {\n        // Đọc file bằng BufferedReader\n        // Bỏ qua dòng trống và comment (bắt đầu bằng #)\n        // Parse key=value\n        // Trim whitespace  \n    }\n\n    public String getString(String key) { ... }\n    public String getString(String key, String defaultValue) { ... }\n    public int getInt(String key) { ... }\n    public double getDouble(String key) { ... }\n    public boolean getBoolean(String key) { ... }\n\n    // Hot reload: đọc lại file khi có thay đổi\n    public void reload() throws IOException { ... }\n}\n```\n\n---\n\n## 🟡 Bài Tập 2: CSV Import/Export ⭐⭐\n\n**Bối cảnh thực tế:** Admin upload file CSV sản phẩm, hệ thống parse → validate → import vào \"database\". Sau đó export danh sách ra CSV để chia sẻ.\n\n**Yêu cầu:** Tạo `CsvService.java`:\n\n```java\npublic class CsvService {\n\n    // IMPORT: Đọc CSV → List<Product>\n    public List<Product> importProducts(String filePath) throws IOException {\n        List<Product> products = new ArrayList<>();\n        List<String> errors = new ArrayList<>();\n        int lineNum = 0;\n\n        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {\n            String header = br.readLine(); // Skip header\n            String line;\n            while ((line = br.readLine()) != null) {\n                lineNum++;\n                try {\n                    Product p = parseCsvLine(line);\n                    products.add(p);\n                } catch (Exception e) {\n                    errors.add(\"Dòng \" + lineNum + \": \" + e.getMessage());\n                }\n            }\n        }\n\n        // In kết quả import\n        System.out.printf(\"✅ Import thành công: %d sản phẩm%n\", products.size());\n        if (!errors.isEmpty()) {\n            System.out.printf(\"❌ Lỗi: %d dòng%n\", errors.size());\n            errors.forEach(System.out::println);\n        }\n\n        return products;\n    }\n\n    // EXPORT: List<Product> → CSV file\n    public void exportProducts(List<Product> products, String filePath) throws IOException {\n        try (PrintWriter pw = new PrintWriter(new FileWriter(filePath))) {\n            pw.println(\"id,name,price,category,stock,rating\");\n            for (Product p : products) {\n                pw.printf(\"%s,\\\"%s\\\",%.0f,%s,%d,%.1f%n\",\n                        p.getId(), p.getName(), p.getPrice(),\n                        p.getCategory(), p.getStock(), p.getRating());\n            }\n        }\n        System.out.println(\"📁 Export thành công: \" + filePath);\n    }\n}\n```\n\n---\n\n## 🟡 Bài Tập 3: Audit Log System ⭐⭐\n\n**Bối cảnh thực tế:** Mọi hệ thống tài chính PHẢI có audit log — ghi lại AI làm gì, lúc nào, với data nào. Đây là yêu cầu pháp luật ở nhiều quốc gia.\n\n**Yêu cầu:** Tạo `AuditLogger.java`:\n\n```java\npublic class AuditLogger {\n    private final String logDir;\n    private PrintWriter currentWriter;\n    private String currentDate;\n\n    public AuditLogger(String logDir) {\n        this.logDir = logDir;\n        // Tạo thư mục nếu chưa có\n    }\n\n    // Mỗi ngày ghi vào file riêng: audit-2024-04-03.log\n    public void log(String level, String userId, String action, String details) {\n        ensureLogFile(); // Kiểm tra/tạo file cho ngày hiện tại\n\n        String entry = String.format(\"[%s] %s | user=%s | action=%s | %s\",\n                getTimestamp(), level, userId, action, details);\n        currentWriter.println(entry);\n        currentWriter.flush(); // Đảm bảo ghi ngay, không buffer\n    }\n\n    // Convenience methods\n    public void logLogin(String userId, String ip) {\n        log(\"INFO\", userId, \"LOGIN\", \"ip=\" + ip);\n    }\n\n    public void logPurchase(String userId, String orderId, double amount) {\n        log(\"INFO\", userId, \"PURCHASE\",\n                String.format(\"orderId=%s amount=%.0f\", orderId, amount));\n    }\n\n    public void logError(String userId, String action, Exception e) {\n        log(\"ERROR\", userId, action, \"error=\" + e.getClass().getSimpleName() + \" msg=\" + e.getMessage());\n    }\n\n    // Đọc log theo ngày (cho admin dashboard)\n    public List<String> readLogs(String date) throws IOException { ... }\n\n    // Tìm kiếm trong log (grep-like)\n    public List<String> searchLogs(String date, String keyword) throws IOException { ... }\n\n    // Cleanup: xóa log cũ hơn N ngày\n    public int cleanupOldLogs(int keepDays) { ... }\n\n    // Đóng writer khi app shutdown\n    public void close() {\n        if (currentWriter != null) currentWriter.close();\n    }\n}\n```\n\n---\n\n## 🔴 Bài Tập 4: File-Based Cache System ⭐⭐⭐\n\n**Bối cảnh thực tế:** Redis cache quá phức tạp cho app nhỏ. File-based cache là giải pháp đơn giản — serialize data ra file, đọc lại khi cần.\n\n**Yêu cầu:** Tạo `FileCache.java`:\n\n```java\npublic class FileCache {\n    private final String cacheDir;\n\n    // Lưu data vào cache file\n    // Key: \"products_page_1\" → file: cache/products_page_1.cache\n    public void put(String key, String data, int ttlSeconds) throws IOException {\n        // File format:\n        // Dòng 1: expireAt (timestamp)\n        // Dòng 2+: data\n    }\n\n    // Đọc từ cache, trả null nếu expired hoặc không tồn tại\n    public String get(String key) throws IOException {\n        // Đọc file\n        // Kiểm tra expired\n        // Trả data hoặc null\n    }\n\n    // Xóa cache entry\n    public void invalidate(String key) { ... }\n\n    // Xóa toàn bộ cache\n    public void clear() { ... }\n\n    // Thống kê cache\n    public void printStats() {\n        // Số entry, tổng dung lượng, số entry expired\n    }\n}\n\n// Sử dụng:\nFileCache cache = new FileCache(\"./cache\");\n\n// Cache kết quả search 5 phút\nString key = \"search_kiem_rong\";\nString cached = cache.get(key);\nif (cached != null) {\n    System.out.println(\"📦 Cache HIT: \" + key);\n    // Dùng cached data\n} else {\n    System.out.println(\"🔍 Cache MISS: \" + key);\n    String result = productService.search(\"kiếm rồng\"); // \"Tốn\" performance\n    cache.put(key, result, 300); // Cache 5 phút\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `try-with-resources` vs đóng thủ công trong `finally` — viết cả hai và giải thích tại sao Java 7 thêm tính năng này.\n- [ ] `BufferedReader` vs `Scanner` vs `Files.readAllLines()` — khi nào dùng cái nào? File 1GB dùng cái nào?\n- [ ] Tại sao audit logger dùng `flush()` sau mỗi dòng? Performance impact là gì? Khi nào KHÔNG nên flush?\n- [ ] File lock: nếu 2 process cùng ghi log file, xảy ra vấn đề gì? `FileLock` trong Java giải quyết thế nào?\n\n---\n\n👉 **Tiếp theo:** [Bài 16 – Generics](../bai-16-generics/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Try-with-resources (Java 7) có ưu điểm vượt trội gì khi xử lý File I/O?",
        "options": [
          "Giúp file đọc nhanh gấp đôi.",
          "Tự động đóng (close) tài nguyên sau khi kết thúc khối try, tránh rò rỉ bộ nhớ.",
          "Ngăn FileNotFoundException.",
          "Không cần khai báo Exception."
        ],
        "answer": 1,
        "explanation": "Resource khai báo trong `try(...)` tự động được đóng khi thoát, dù có exception hay không. Resource phải implements AutoCloseable."
      },
      {
        "q": "Sự khác biệt giữa FileReader và BufferedReader là gì?",
        "options": [
          "Không có sự khác biệt",
          "FileReader đọc từng ký tự; BufferedReader đọc từng dòng, nhanh hơn nhờ buffer",
          "BufferedReader chỉ đọc binary",
          "FileReader chỉ dùng với UTF-8"
        ],
        "answer": 1,
        "explanation": "FileReader: đọc character by character (chậm). BufferedReader bao bọc FileReader, đọc dữ liệu theo block vào buffer (nhanh hơn nhiều), cung cấp readLine()."
      },
      {
        "q": "Lớp `Path` trong NIO2 (java.nio.file) dùng để làm gì?",
        "options": [
          "Kết nối đến database",
          "Biểu diễn đường dẫn file/directory trên hệ thống tệp",
          "Đọc nội dung file",
          "Tạo thread mới"
        ],
        "answer": 1,
        "explanation": "Path (NIO2, Java 7+) thay thế File class cũ, biểu diễn đường dẫn. Dùng cùng `Files` class utility để thao tác file."
      },
      {
        "q": "Files.readAllLines() và Files.lines() khác nhau thế nào?",
        "options": [
          "Hoàn toàn giống nhau",
          "readAllLines() nạp toàn bộ file vào List<String>; lines() trả về Stream lazy (đọc từng dòng khi cần)",
          "lines() chỉ đọc 100 dòng đầu",
          "readAllLines() không hỗ trợ UTF-8"
        ],
        "answer": 1,
        "explanation": "readAllLines(): nạp hết file vào RAM (file nhỏ). lines(): Stream lazy, tiết kiệm memory với file lớn vì đọc từng dòng khi stream consume."
      },
      {
        "q": "Để ghi dữ liệu vào file và nối tiếp (append) thay vì ghi đè, cần làm gì?",
        "options": [
          "Dùng FileWriter với tham số append = true",
          "Dùng FileReader",
          "Không thể append trong Java",
          "Phải đọc file cũ rồi ghi lại toàn bộ"
        ],
        "answer": 0,
        "explanation": "`new FileWriter(\"file.txt\", true)` mở file với chế độ append. Không truyền tham số boolean hoặc false sẽ ghi đè."
      },
      {
        "q": "Serialization trong Java là gì?",
        "options": [
          "Chuyển đổi dữ liệu sang XML",
          "Chuyển đổi đối tượng Java thành dạng byte để lưu trữ hoặc truyền qua mạng",
          "Đọc file nhị phân",
          "Nén file để tiết kiệm dung lượng"
        ],
        "answer": 1,
        "explanation": "Serialization: object → byte stream (lưu file, truyền mạng). Deserialization: byte stream → object. Class phải implements `Serializable`."
      },
      {
        "q": "Lớp `Files` trong java.nio.file cung cấp gì?",
        "options": [
          "Tạo socket network",
          "Static utility methods để thao tác file/directory (copy, move, delete, readAllBytes...)",
          "GUI components",
          "Database connection"
        ],
        "answer": 1,
        "explanation": "`Files` class cung cấp các static method tiện lợi: `Files.copy()`, `Files.move()`, `Files.delete()`, `Files.exists()`, `Files.readAllBytes()`..."
      },
      {
        "q": "Khi nào nên dùng FileOutputStream thay vì FileWriter?",
        "options": [
          "Khi cần đọc file",
          "Khi ghi dữ liệu binary (ảnh, âm thanh, file zip) thay vì text",
          "Khi cần append",
          "Khi cần ghi UTF-8"
        ],
        "answer": 1,
        "explanation": "FileOutputStream: ghi raw bytes (binary). FileWriter: ghi characters (text). Dùng Writer cho text, Stream cho binary."
      },
      {
        "q": "Path.of(\"C:/Users\", \"file.txt\") tạo ra đường dẫn nào?",
        "options": [
          "C:/Users",
          "file.txt",
          "C:/Users/file.txt",
          "Lỗi"
        ],
        "answer": 2,
        "explanation": "`Path.of()` (Java 11+) nối các phần đường dẫn lại. `Path.of(\"C:/Users\", \"file.txt\")` → `C:\\Users\\file.txt` (trên Windows)."
      },
      {
        "q": "Phương thức `Files.createDirectories(path)` làm gì?",
        "options": [
          "Tạo một file mới",
          "Tạo directory và tất cả directory cha chưa tồn tại",
          "Liệt kê các file trong directory",
          "Xóa directory"
        ],
        "answer": 1,
        "explanation": "`createDirectories()` tạo toàn bộ cây thư mục. Khác `createDirectory()` (chỉ tạo 1 cấp và báo lỗi nếu cha chưa tồn tại)."
      },
      {
        "q": "Lớp nào dùng để biểu diễn ngày (không chứa giờ) trong gói java.time?",
        "options": [
          "Date",
          "LocalDate",
          "LocalDateTime",
          "LocalTime"
        ],
        "answer": 1,
        "explanation": "LocalDate biểu diễn ngày tháng năm theo chuẩn ISO-8601 (yyyy-MM-dd)."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: File I/O & NIO2\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 15: File I/O\n\n> 🎯 **Bối cảnh dự án:** Xử lý **file trong hệ thống** — đọc config, export report, import CSV, ghi log. Đây là 4 use case file I/O phổ biến nhất trong backend.\n\n---\n\n## 🔴 Bài Tập 1: Configuration File Reader ⭐⭐\n\n**Bối cảnh thực tế:** Spring Boot đọc `application.properties`. Đây là implementation đơn giản hóa — bạn sẽ hiểu tại sao `.properties` file hoạt động.\n\n**Yêu cầu:** Tạo `ConfigReader.java` đọc file `shop.properties`:\n\n```properties\n# shop.properties\napp.name=RaizeShop\napp.version=1.0.0\napp.port=8080\ndb.host=localhost\ndb.port=3306\ndb.name=raize_db\ndb.username=admin\ndb.password=secret123\npayment.vat_rate=10.0\npayment.platform_fee=5.0\npayment.max_transaction=999999999\n```\n\n```java\npublic class ConfigReader {\n    private Map<String, String> properties = new HashMap<>();\n\n    public void load(String filePath) throws IOException {\n        // Đọc file bằng BufferedReader\n        // Bỏ qua dòng trống và comment (bắt đầu bằng #)\n        // Pars...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 16,
    "title": "Java Generics",
    "phase": "Phase 3: Java Intermediate",
    "time": "4 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 16: Generics — Kiểu Dữ Liệu Tổng Quát\n\n> 🟠 **Phase 3 – Bài 4/6** | Thời gian: ~2.5 giờ\n\n---\n\nBạn có bao giờ thắc mắc tại sao có thể viết `List<String>`, `List<Integer>`, `List<NguoiDung>` mà vẫn là cùng một class `ArrayList`? Đó là nhờ **Generics** — tính năng cho phép bạn viết code \"tổng quát\" cho nhiều kiểu dữ liệu.\n\n---\n\n## 1. Vấn Đề Mà Generics Giải Quyết\n\nGiả sử bạn muốn viết class Pair (cặp giá trị) để lưu 2 thứ bất kỳ:\n\n```java\n// ❌ Cách không có Generics — dùng Object:\nclass Pair {\n    Object first;\n    Object second;\n}\n\nPair p = new Pair();\np.first = \"Raize\";\np.second = 100;\n\nString ten = (String) p.first;   // Cần cast thủ công\nint diem = (int) p.second;       // Nguy hiểm — nếu cast sai → ClassCastException!\n```\n\n```java\n// ✅ Generics — type-safe, không cần cast:\nclass Pair<F, S> {\n    F first;\n    S second;\n\n    Pair(F first, S second) {\n        this.first = first;\n        this.second = second;\n    }\n}\n\nPair<String, Integer> p = new Pair<>(\"Raize\", 100);\nString ten = p.first;    // Không cần cast!\nint diem = p.second;     // Compiler đảm bảo kiểu đúng\n```\n\n---\n\n## 2. Generic Class\n\n```java\n// T = Type parameter — tên tùy bạn đặt (T, E, K, V là convention)\npublic class HopChua<T> {\n    private T giaTri;\n    private String nhan;\n\n    public HopChua(String nhan, T giaTri) {\n        this.nhan = nhan;\n        this.giaTri = giaTri;\n    }\n\n    public T layRa() { return giaTri; }\n    public void dung(T giaTri) { this.giaTri = giaTri; }\n\n    @Override\n    public String toString() {\n        return \"Hộp[\" + nhan + \"] = \" + giaTri;\n    }\n}\n\n// Dùng với nhiều kiểu:\nHopChua<String> tenHop = new HopChua<>(\"tên\", \"Kiếm Rồng\");\nHopChua<Integer> diemHop = new HopChua<>(\"điểm\", 2500);\nHopChua<NguoiDung> userHop = new HopChua<>(\"user\", new NguoiDung(\"raize99\", \"r@m.com\"));\n\nSystem.out.println(tenHop);     // Hộp[tên] = Kiếm Rồng\nString ten = tenHop.layRa();    // Không cần cast!\n```\n\n---\n\n## 3. Generic Method\n\n```java\n// Method có thể áp dụng lên nhiều kiểu\npublic static <T> T phantToken(T[] mang, int index) {\n    if (index < 0 || index >= mang.length) return null;\n    return mang[index];\n}\n\n// Hoán đổi 2 phần tử trong mảng\npublic static <T> void swap(T[] mang, int i, int j) {\n    T tam = mang[i];\n    mang[i] = mang[j];\n    mang[j] = tam;\n}\n\nString[] ten = {\"An\", \"Bình\", \"Chi\"};\nswap(ten, 0, 2);  // Đổi chỗ \"An\" và \"Chi\"\nSystem.out.println(Arrays.toString(ten));  // [Chi, Bình, An]\n\nInteger[] so = {1, 2, 3, 4, 5};\nswap(so, 1, 3);\nSystem.out.println(Arrays.toString(so));  // [1, 4, 3, 2, 5]\n```\n\n---\n\n## 4. Bounded Wildcards — Giới Hạn Kiểu\n\n```java\n// <T extends Comparable<T>>: T phải implement Comparable (có thể so sánh)\npublic static <T extends Comparable<T>> T timMax(List<T> ds) {\n    if (ds.isEmpty()) return null;\n    T max = ds.get(0);\n    for (T item : ds) {\n        if (item.compareTo(max) > 0) max = item;\n    }\n    return max;\n}\n\n// Dùng được với bất kỳ kiểu implement Comparable:\nList<Integer> soList = List.of(3, 1, 7, 2, 9);\nSystem.out.println(timMax(soList));  // 9\n\nList<String> tenList = List.of(\"Bình\", \"An\", \"Chi\");\nSystem.out.println(timMax(tenList));  // Chi (theo thứ tự alphabet)\n```\n\n### Wildcard `?` — Linh Hoạt Hơn\n\n```java\n// ? extends Number: chấp nhận List<Integer>, List<Double>, List<Long>...\npublic static double tinhTong(List<? extends Number> ds) {\n    double tong = 0;\n    for (Number n : ds) {\n        tong += n.doubleValue();\n    }\n    return tong;\n}\n\ntinhTong(List.of(1, 2, 3));        // List<Integer> — OK!\ntinhTong(List.of(1.5, 2.5, 3.5)); // List<Double> — OK!\n```\n\n---\n\n## 5. Ứng Dụng Thực Tế — ApiResponse Generic\n\nTrong dự án RaizeShop, tôi thấy pattern này rất phổ biến:\n\n```java\n// Không có Generics — phải viết nhiều class response:\nclass StringResponse { String data; boolean success; String message; }\nclass UserResponse   { NguoiDung data; boolean success; String message; }\nclass ListResponse   { List<?> data; boolean success; String message; }\n\n// Có Generics — một class xử lý tất cả:\npublic class ApiResponse<T> {\n    private T data;\n    private boolean success;\n    private String message;\n\n    private ApiResponse(T data, boolean success, String message) {\n        this.data = data;\n        this.success = success;\n        this.message = message;\n    }\n\n    // Factory methods\n    public static <T> ApiResponse<T> ok(T data) {\n        return new ApiResponse<>(data, true, \"Thành công\");\n    }\n\n    public static <T> ApiResponse<T> loi(String message) {\n        return new ApiResponse<>(null, false, message);\n    }\n\n    public T getData()      { return data; }\n    public boolean isOk()   { return success; }\n    public String getMessage() { return message; }\n\n    @Override\n    public String toString() {\n        return String.format(\"ApiResponse{success=%b, message='%s', data=%s}\",\n            success, message, data);\n    }\n}\n\n// Dùng:\nApiResponse<NguoiDung> userResp = ApiResponse.ok(new NguoiDung(\"raize99\", \"r@m.com\"));\nApiResponse<List<SanPham>> listResp = ApiResponse.ok(danhSachSP);\nApiResponse<Void> errResp = ApiResponse.loi(\"Không tìm thấy user\");\n\nSystem.out.println(userResp);\nNguoiDung user = userResp.getData();  // Type-safe, không cần cast!\n```\n\n---\n\n## Tóm Tắt — Bài 16\n\n```\n✅ Generics: viết code tổng quát cho nhiều kiểu, type-safe lúc compile\n✅ <T>: type parameter trong class/method\n✅ <T extends Interface>: bounded type — T phải là subtype\n✅ <?> wildcard: linh hoạt khi đọc, không ghi\n✅ Ứng dụng thực: generic response wrapper, pair, repository pattern\n✅ Type erasure: Generics chỉ tồn tại lúc compile, runtime không có thông tin kiểu\n```\n\n---\n\n👉 **[Bài 17: Lambda & Functional Interface](../bai-17-lambda-functional/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 16: Generics\n\n> 🎯 **Bối cảnh dự án:** Xây dựng **type-safe data structures** — cách Spring Data `JpaRepository<T, ID>`, `ResponseEntity<T>` hoạt động.\n\n---\n\n## 🔴 Bài Tập 1: Generic Repository ⭐⭐\n\n**Bối cảnh thực tế:** Spring Data JPA cho phép bạn viết `interface ProductRepo extends JpaRepository<Product, Long>`. Bây giờ bạn sẽ tự build cái tương tự.\n\n**Yêu cầu:** Tạo `GenericRepository<T>`:\n\n```java\npublic class GenericRepository<T> {\n    private List<T> storage = new ArrayList<>();\n    private final String entityName;\n\n    public GenericRepository(String entityName) {\n        this.entityName = entityName;\n    }\n\n    public void save(T entity) { storage.add(entity); }\n    public T getByIndex(int index) { return storage.get(index); }\n    public List<T> getAll() { return Collections.unmodifiableList(storage); }\n    public int count() { return storage.size(); }\n    public boolean isEmpty() { return storage.isEmpty(); }\n\n    // Tìm theo điều kiện — dùng Predicate<T>\n    public List<T> findWhere(Predicate<T> condition) {\n        List<T> result = new ArrayList<>();\n        for (T item : storage) {\n            if (condition.test(item)) result.add(item);\n        }\n        return result;\n    }\n\n    // Tìm 1 kết quả duy nhất\n    public Optional<T> findFirst(Predicate<T> condition) {\n        for (T item : storage) {\n            if (condition.test(item)) return Optional.of(item);\n        }\n        return Optional.empty();\n    }\n\n    // Xóa theo điều kiện\n    public int removeWhere(Predicate<T> condition) {\n        int removed = 0;\n        Iterator<T> it = storage.iterator();\n        while (it.hasNext()) {\n            if (condition.test(it.next())) {\n                it.remove();\n                removed++;\n            }\n        }\n        return removed;\n    }\n}\n\n// Sử dụng — một class, nhiều kiểu dữ liệu:\nGenericRepository<Product> productRepo = new GenericRepository<>(\"Product\");\nGenericRepository<User> userRepo = new GenericRepository<>(\"User\");\nGenericRepository<Order> orderRepo = new GenericRepository<>(\"Order\");\n\nproductRepo.save(new Product(\"Kiếm Rồng\", 1_500_000));\nList<Product> expensive = productRepo.findWhere(p -> p.getPrice() > 1_000_000);\n```\n\n---\n\n## 🟡 Bài Tập 2: ApiResponse<T> — Generic Response Wrapper ⭐⭐\n\n**Bối cảnh thực tế:** REST API luôn trả response theo format nhất quán. Spring dùng `ResponseEntity<T>`. Bạn sẽ build phiên bản riêng.\n\n**Yêu cầu:** Tạo `ApiResponse<T>`:\n\n```java\npublic class ApiResponse<T> {\n    private boolean success;\n    private String message;\n    private T data;\n    private int statusCode;\n    private String timestamp;\n    private Map<String, Object> meta; // Pagination info, etc.\n\n    // Private constructor — dùng static factory methods\n    private ApiResponse() {\n        this.timestamp = LocalDateTime.now().toString();\n    }\n\n    // Factory methods — type-safe và đọc code rõ ràng\n    public static <T> ApiResponse<T> success(T data) {\n        ApiResponse<T> response = new ApiResponse<>();\n        response.success = true;\n        response.statusCode = 200;\n        response.data = data;\n        response.message = \"OK\";\n        return response;\n    }\n\n    public static <T> ApiResponse<T> success(T data, String message) { ... }\n\n    public static <T> ApiResponse<T> created(T data) {\n        // statusCode = 201\n    }\n\n    public static <T> ApiResponse<T> error(int statusCode, String message) {\n        ApiResponse<T> response = new ApiResponse<>();\n        response.success = false;\n        response.statusCode = statusCode;\n        response.message = message;\n        response.data = null;\n        return response;\n    }\n\n    // Pagination support\n    public ApiResponse<T> withPagination(int page, int size, long totalElements) {\n        this.meta = new HashMap<>();\n        meta.put(\"page\", page);\n        meta.put(\"size\", size);\n        meta.put(\"totalElements\", totalElements);\n        meta.put(\"totalPages\", (int) Math.ceil((double) totalElements / size));\n        return this;\n    }\n\n    public String toJson() { ... } // Build JSON thủ công\n}\n\n// Sử dụng:\nApiResponse<Product> resp1 = ApiResponse.success(product);\nApiResponse<List<Product>> resp2 = ApiResponse.success(products)\n        .withPagination(1, 10, 47);\nApiResponse<Void> resp3 = ApiResponse.error(404, \"Product not found\");\n```\n\n---\n\n## 🔴 Bài Tập 3: Generic Pair, Triple & PageResult ⭐⭐⭐\n\n**Bối cảnh thực tế:** Method cần trả về 2-3 giá trị? Dùng `Pair<A,B>`. Pagination result chứa data + metadata? `PageResult<T>`.\n\n**Yêu cầu:** Tạo các generic utility classes:\n\n```java\n// Pair: trả về 2 giá trị liên quan\npublic class Pair<A, B> {\n    private final A first;\n    private final B second;\n\n    public Pair(A first, B second) { ... }\n\n    public static <A, B> Pair<A, B> of(A first, B second) {\n        return new Pair<>(first, second);\n    }\n}\n\n// PageResult: kết quả phân trang\npublic class PageResult<T> {\n    private final List<T> content;\n    private final int pageNumber;\n    private final int pageSize;\n    private final long totalElements;\n\n    public int getTotalPages() {\n        return (int) Math.ceil((double) totalElements / pageSize);\n    }\n    public boolean hasNext() { return pageNumber < getTotalPages(); }\n    public boolean hasPrevious() { return pageNumber > 1; }\n    public boolean isEmpty() { return content.isEmpty(); }\n}\n\n// Sử dụng thực tế:\n// Method trả về product + số lượng tồn kho\nPair<Product, Integer> result = Pair.of(product, stock);\n\n// Service trả về page kết quả\nPageResult<Product> page = productService.findAll(1, 10);\nSystem.out.printf(\"Trang %d/%d (%d sản phẩm)%n\",\n        page.getPageNumber(), page.getTotalPages(), page.getTotalElements());\n```\n\n---\n\n## 🟡 Bài Tập 4: Type-safe Event Bus ⭐⭐⭐\n\n**Bối cảnh thực tế:** Event-driven architecture — Spring `ApplicationEventPublisher` publish typed events. Handler chỉ nhận event đúng type.\n\n```java\npublic class EventBus {\n    private Map<Class<?>, List<EventHandler<?>>> handlers = new HashMap<>();\n\n    public <E> void subscribe(Class<E> eventType, EventHandler<E> handler) {\n        handlers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(handler);\n    }\n\n    @SuppressWarnings(\"unchecked\")\n    public <E> void publish(E event) {\n        List<EventHandler<?>> list = handlers.get(event.getClass());\n        if (list != null) {\n            for (EventHandler<?> handler : list) {\n                ((EventHandler<E>) handler).handle(event);\n            }\n        }\n    }\n}\n\n@FunctionalInterface\npublic interface EventHandler<E> {\n    void handle(E event);\n}\n\n// Events\nrecord OrderCreatedEvent(String orderId, String buyerId, double amount) {}\nrecord PaymentCompletedEvent(String orderId, String paymentMethod) {}\n\n// Subscribe — type-safe!\nEventBus bus = new EventBus();\nbus.subscribe(OrderCreatedEvent.class, event -> {\n    System.out.println(\"📧 Email seller: đơn hàng mới #\" + event.orderId());\n});\nbus.subscribe(PaymentCompletedEvent.class, event -> {\n    System.out.println(\"💰 Thanh toán qua \" + event.paymentMethod());\n});\n\nbus.publish(new OrderCreatedEvent(\"RZ-001\", \"user1\", 1_500_000));\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `List<Product>` vs `List<Object>` — tại sao không thể gán `List<Product>` cho `List<Object>` dù Product extends Object?\n- [ ] Wildcard `<? extends Product>` vs `<? super Product>` — PECS rule là gì? Áp dụng vào `findWhere(Predicate<? super T>)`.\n- [ ] Type erasure: tại sao `new T()` không được phép trong Java? Tại sao `if (obj instanceof List<String>)` không compile?\n- [ ] `Optional<T>` vs `null` — tại sao `findFirst()` trả về `Optional<T>` thay vì `null`? Production code nên chuẩn nào?\n\n---\n\n👉 **Tiếp theo:** [Bài 17 – Lambda & Functional](../bai-17-lambda-functional/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Wildcard `<? extends T>` trong Generics có nghĩa là gì?",
        "options": [
          "Chấp nhận kiểu T hoặc kiểu cha của T.",
          "Chấp nhận kiểu T hoặc bất kỳ subtype (lớp con) của T.",
          "Chỉ chấp nhận đúng kiểu T.",
          "Chấp nhận mọi kiểu ngoại trừ T."
        ],
        "answer": 1,
        "explanation": "`<? extends T>` (Upper Bounded Wildcard): chấp nhận T và các subtype của T. Dùng để đọc dữ liệu (Producer Extends)."
      },
      {
        "q": "Tại sao Java Generics dùng Type Erasure (xóa kiểu) ở runtime?",
        "options": [
          "Để tăng tốc chạy chương trình",
          "Để tương thích ngược với code Java cũ không dùng generics (backward compatibility)",
          "Để giảm kích thước bytecode",
          "Vì JVM không hỗ trợ generic types"
        ],
        "answer": 1,
        "explanation": "Type information bị xóa ở compile time để duy trì tương thích ngược với Java < 1.5. Ở runtime, `List<String>` và `List<Integer>` đều là `List`."
      },
      {
        "q": "Phương thức generic trong Java khai báo type parameter ở đâu?",
        "options": [
          "Sau tên phương thức",
          "Trước kiểu trả về: `<T> T methodName()`",
          "Trong body phương thức",
          "Trong parameter list"
        ],
        "answer": 1,
        "explanation": "Generic method: `public <T> T identity(T item) { return item; }`. Type parameter `<T>` khai báo trước return type."
      },
      {
        "q": "`List<?>` (Unbounded Wildcard) có thể làm gì?",
        "options": [
          "Thêm bất kỳ phần tử nào vào list",
          "Đọc phần tử dưới dạng Object, nhưng không thể thêm phần tử (trừ null)",
          "Không làm được gì",
          "Thêm Object nhưng không đọc được"
        ],
        "answer": 1,
        "explanation": "`List<?>` có thể đọc phần tử (as Object), không thể add (vì không biết kiểu cụ thể). Dùng khi method nhận bất kỳ List nào."
      },
      {
        "q": "`<? super T>` (Lower Bounded Wildcard) dùng cho mục đích gì?",
        "options": [
          "Đọc dữ liệu an toàn",
          "Ghi dữ liệu an toàn - chấp nhận T và supertype của T",
          "Chỉ dùng với Collection",
          "Kiểm tra kiểu dữ liệu"
        ],
        "answer": 1,
        "explanation": "`<? super T>`: chấp nhận T và các supertype của T. Dùng để ghi (Consumer Super). Nguyên tắc PECS: Producer Extends, Consumer Super."
      },
      {
        "q": "Bounded Type Parameter `<T extends Comparable<T>>` có nghĩa gì?",
        "options": [
          "T phải extend Comparable",
          "T phải là lớp con của Comparable, đảm bảo T có phương thức compareTo()",
          "T phải là interface",
          "T không thể là primitive"
        ],
        "answer": 1,
        "explanation": "`<T extends Comparable<T>>` ràng buộc T phải implements Comparable, đảm bảo có thể so sánh hai đối tượng T với nhau bằng compareTo()."
      },
      {
        "q": "Không thể làm gì với Java Generics do Type Erasure?",
        "options": [
          "Tạo List<String>",
          "Tạo generic class",
          "Tạo instance của type parameter: `new T()` hoặc `new T[10]`",
          "Dùng generic method"
        ],
        "answer": 2,
        "explanation": "Do type erasure, JVM không biết T là gì lúc runtime, nên không thể `new T()` hay `new T[10]`. Phải dùng Reflection hoặc truyền `Class<T>` vào."
      },
      {
        "q": "Generic class `class Pair<A, B>` khai báo đúng cách nào?",
        "options": [
          "class Pair { A first; B second; }",
          "class Pair<A, B> { A first; B second; }",
          "class<A,B> Pair { }",
          "Pair<A, B> class { }"
        ],
        "answer": 1,
        "explanation": "Type parameters khai báo sau tên class trong `<>`. `class Pair<A, B>` khai báo 2 type parameters A và B."
      },
      {
        "q": "Tại sao không thể dùng primitive type (int, double) với Generics?",
        "options": [
          "Vì Java không hỗ trợ số với generics",
          "Vì type erasure dùng Object, và primitive không phải Object. Phải dùng wrapper class (Integer, Double)",
          "Vì primitive không có phương thức",
          "Vì giới hạn của JVM"
        ],
        "answer": 1,
        "explanation": "Generics dùng Object làm kiểu cơ sở (sau type erasure). int, double... không phải Object. Dùng Integer, Double (autoboxing/unboxing tự động)."
      },
      {
        "q": "Wildcard `List<? extends Number>` có thể gán từ loại nào?",
        "options": [
          "Chỉ List<Number>",
          "List<Number>, List<Integer>, List<Double>, List<Long>...",
          "List<Object>",
          "Bất kỳ List nào"
        ],
        "answer": 1,
        "explanation": "`List<? extends Number>` chấp nhận bất kỳ List với generic type là Number hoặc subtype: Integer, Double, Long, Float, BigInteger..."
      },
      {
        "q": "Wrapper class tương ứng của kiểu dữ liệu nguyên thủy char là gì?",
        "options": [
          "Char",
          "String",
          "Character",
          "CharSequence"
        ],
        "answer": 2,
        "explanation": "Wrapper class tương ứng của char là Character."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Java Generics\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 16: Generics\n\n> 🎯 **Bối cảnh dự án:** Xây dựng **type-safe data structures** — cách Spring Data `JpaRepository<T, ID>`, `ResponseEntity<T>` hoạt động.\n\n---\n\n## 🔴 Bài Tập 1: Generic Repository ⭐⭐\n\n**Bối cảnh thực tế:** Spring Data JPA cho phép bạn viết `interface ProductRepo extends JpaRepository<Product, Long>`. Bây giờ bạn sẽ tự build cái tương tự.\n\n**Yêu cầu:** Tạo `GenericRepository<T>`:\n\n```java\npublic class GenericRepository<T> {\n    private List<T> storage = new ArrayList<>();\n    private final String entityName;\n\n    public GenericRepository(String entityName) {\n        this.entityName = entityName;\n    }\n\n    public void save(T entity) { storage.add(entity); }\n    public T getByIndex(int index) { return storage.get(index); }\n    public List<T> getAll() { return Collections.unmodifiableList(storage); }\n    public int count() { return storage.size(); }\n    public boolean isEmpty() { return storage.isEmpty(); }\n\n    // Tìm theo điều kiện — dùng Predica...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 17,
    "title": "Lambda & Functional Interface",
    "phase": "Phase 3: Java Intermediate",
    "time": "4 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 17: Lambda & Functional Interface\n\n> 🟠 **Phase 3 – Bài 5/6** | Thời gian: ~3 giờ\n\n---\n\nJava 8 (2014) là một cuộc cách mạng trong lịch sử của ngôn ngữ này. **Lambda expression** và **Functional Interface** đã thay đổi cách người ta viết Java — từ verbose, boilerplate nặng nề sang code gọn gàng, biểu đạt rõ ý hơn.\n\ntôi nhớ lần đầu thấy code Java 8, tôi không nhận ra đó là Java nữa. Bây giờ tôi không muốn quay lại Java 7 bao giờ nữa.\n\n---\n\n## 1. Trước Lambda — Code Cũ Rất Dài\n\n```java\n// Sắp xếp danh sách — Java 7 cần anonymous class:\nList<String> ten = new ArrayList<>(List.of(\"Bình\", \"An\", \"Chi\", \"Duy\"));\n\nCollections.sort(ten, new Comparator<String>() {\n    @Override\n    public int compare(String a, String b) {\n        return a.compareTo(b);   // Sắp xếp alphabet\n    }\n});\n\n// Chạy code trong thread mới — Java 7:\nnew Thread(new Runnable() {\n    @Override\n    public void run() {\n        System.out.println(\"Đang chạy trong thread mới\");\n    }\n}).start();\n```\n\n---\n\n## 2. Lambda Expression — Ngắn Gọn Hơn Rất Nhiều\n\n```java\n// Lambda = anonymous function gọn gàng\n(thamSo) -> { thân_hàm }\n\n// Các dạng lambda:\n() -> System.out.println(\"Không có tham số\")\n(x) -> x * 2                              // 1 tham số, 1 biểu thức, return ẩn\n(x, y) -> x + y                           // 2 tham số\n(x, y) -> { int z = x + y; return z; }   // Thân block nhiều dòng\n\n// Ví dụ sắp xếp với lambda:\nCollections.sort(ten, (a, b) -> a.compareTo(b));\n// Hoặc thậm chí ngắn hơn:\nten.sort(String::compareTo);  // Method reference — sẽ học sau\n\n// Thread với lambda:\nnew Thread(() -> System.out.println(\"Đang chạy trong thread mới\")).start();\n```\n\n---\n\n## 3. Functional Interface — Nền Tảng Của Lambda\n\nLambda chỉ có thể dùng ở nơi cần **Functional Interface** — interface có đúng 1 abstract method.\n\n```java\n@FunctionalInterface\npublic interface BoLoc<T> {\n    boolean kiemTra(T item);   // 1 abstract method duy nhất\n}\n\n// Dùng lambda để implement:\nBoLoc<String> duoi10Ky = s -> s.length() < 10;\nBoLoc<Integer> soLe = n -> n % 2 != 0;\n\nSystem.out.println(duoi10Ky.kiemTra(\"Hello\"));   // true\nSystem.out.println(soLe.kiemTra(7));              // true\n```\n\n---\n\n## 4. Các Functional Interface Có Sẵn Trong Java\n\nJava 8 cung cấp sẵn nhiều functional interface trong `java.util.function`:\n\n### `Predicate<T>` — Kiểm Tra Điều Kiện (T → boolean)\n\n```java\nimport java.util.function.Predicate;\n\nPredicate<String> laEmail = s -> s.contains(\"@\");\nPredicate<Integer> laAmChan = n -> n < 0 && n % 2 == 0;\nPredicate<NguoiDung> daDangNhap = u -> u.isActive();\n\nSystem.out.println(laEmail.test(\"raize@mail.com\"));  // true\n\n// Kết hợp Predicate:\nPredicate<Integer> soDuong = n -> n > 0;\nPredicate<Integer> soNho = n -> n < 100;\nPredicate<Integer> duongVaNho = soDuong.and(soNho);   // AND\n\nSystem.out.println(duongVaNho.test(50));   // true\nSystem.out.println(duongVaNho.test(150));  // false\n\nPredicate<Integer> either = soDuong.or(soNho);   // OR\nPredicate<Integer> notDuong = soDuong.negate();   // NOT\n```\n\n### `Function<T, R>` — Chuyển Đổi (T → R)\n\n```java\nimport java.util.function.Function;\n\nFunction<String, Integer> doDai = s -> s.length();\nFunction<Integer, String> intToStr = n -> \"Số: \" + n;\n\nSystem.out.println(doDai.apply(\"Hello\"));  // 5\nSystem.out.println(intToStr.apply(42));    // \"Số: 42\"\n\n// Compose functions (kết hợp):\nFunction<String, String> xuLy = doDai.andThen(intToStr);\n// andThen: áp dụng Function đầu, rồi Function sau\nSystem.out.println(xuLy.apply(\"Hello\"));  // \"Số: 5\"\n```\n\n### `Consumer<T>` — Tiêu Thụ (T → void)\n\n```java\nimport java.util.function.Consumer;\n\nConsumer<String> in = s -> System.out.println(s);\nConsumer<NguoiDung> capNhatLog = u -> Logger.info(\"User hoạt động: \" + u.getUsername());\n\nin.accept(\"Xin chào!\");  // \"Xin chào!\"\n\n// forEach dùng Consumer:\nList<String> ten = List.of(\"An\", \"Bình\", \"Chi\");\nten.forEach(t -> System.out.println(\"- \" + t));\n// Hoặc ngắn hơn:\nten.forEach(System.out::println);\n```\n\n### `Supplier<T>` — Cung Cấp (void → T)\n\n```java\nimport java.util.function.Supplier;\n\nSupplier<NguoiDung> taoUserMacDinh = () -> new NguoiDung(\"guest\", \"guest@mail.com\");\nSupplier<LocalDateTime> layGio = LocalDateTime::now;\n\nNguoiDung guest = taoUserMacDinh.get();\nSystem.out.println(layGio.get());\n```\n\n---\n\n## 5. Method Reference — Lambda Càng Ngắn Hơn\n\nKhi lambda chỉ gọi một method đã có sẵn, dùng `::` thay thế:\n\n```java\n// Lambda thường:\nten.forEach(s -> System.out.println(s));\nten.sort((a, b) -> a.compareTo(b));\n\n// Method reference — ngắn hơn, cùng ý nghĩa:\nten.forEach(System.out::println);          // instance method của System.out\nten.sort(String::compareTo);               // instance method của String\n\n// Static method reference:\nList<String> soStr = List.of(\"3\", \"1\", \"4\", \"1\", \"5\");\nsoStr.stream()\n    .map(Integer::parseInt)               // Integer.parseInt là static method\n    .forEach(System.out::println);\n\n// Constructor reference:\nSupplier<ArrayList<String>> taoList = ArrayList::new;\nArrayList<String> list = taoList.get();  // new ArrayList<>()\n```\n\n---\n\n## 6. Ứng Dụng Thực Tế — Lọc và Sắp Xếp Danh Sách\n\n```java\npublic class QuanLySanPham {\n\n    public static List<SanPham> loc(List<SanPham> ds, Predicate<SanPham> boLoc) {\n        List<SanPham> ketQua = new ArrayList<>();\n        for (SanPham sp : ds) {\n            if (boLoc.test(sp)) ketQua.add(sp);\n        }\n        return ketQua;\n    }\n\n    public static void sapXep(List<SanPham> ds, Comparator<SanPham> tieuChuan) {\n        ds.sort(tieuChuan);\n    }\n\n    public static void main(String[] args) {\n        List<SanPham> kho = List.of(\n            new SanPham(\"Kiếm Rồng\", 1_200_000, 3),\n            new SanPham(\"Giáp Vàng\", 800_000, 0),\n            new SanPham(\"Nhẫn Ma\", 500_000, 5),\n            new SanPham(\"Hài Cát\", 300_000, 2)\n        );\n\n        // Lễ sử dụng lambda như tham số!\n        List<SanPham> conHang = loc(kho, sp -> sp.getSoLuong() > 0);\n        List<SanPham> duoi1Trieu = loc(kho, sp -> sp.getGia() < 1_000_000);\n\n        // Sắp xếp theo giá tăng dần\n        List<SanPham> dsSapXep = new ArrayList<>(kho);\n        sapXep(dsSapXep, (a, b) -> Double.compare(a.getGia(), b.getGia()));\n        // Hoặc:\n        sapXep(dsSapXep, Comparator.comparingDouble(SanPham::getGia));\n        // Giảm dần:\n        sapXep(dsSapXep, Comparator.comparingDouble(SanPham::getGia).reversed());\n\n        System.out.println(\"Còn hàng: \" + conHang.size());\n        System.out.println(\"Dưới 1 triệu: \" + duoi1Trieu.size());\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 17\n\n```\n✅ Lambda = anonymous function gọn: (params) -> expression\n✅ Chỉ dùng được khi cần Functional Interface (@FunctionalInterface)\n✅ Predicate<T>: T → boolean (kiểm tra điều kiện)\n✅ Function<T,R>: T → R (chuyển đổi)\n✅ Consumer<T>: T → void (tiêu thụ/hành động)\n✅ Supplier<T>: void → T (tạo ra giá trị)\n✅ Method reference (::): ngắn hơn lambda khi gọi method có sẵn\n✅ Lambda và Functional Interface là nền tảng cho Stream API bài tiếp theo\n```\n\n---\n\n👉 **[Bài 18: Stream API](../bai-18-stream-api/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 17: Lambda & Functional Programming\n\n> 🎯 **Bối cảnh dự án:** Viết code **ngắn gọn, khai báo** — cách Spring Security configs, JPA Specifications, và mọi modern Java code được viết.\n\n---\n\n## 🔴 Bài Tập 1: Refactor Code Cũ Sang Lambda ⭐⭐\n\n**Bối cảnh thực tế:** Code review thường yêu cầu \"refactor anonymous class sang lambda\". Đây là kỹ năng bắt buộc trong team Java hiện đại.\n\n**Yêu cầu:** Refactor mỗi block code từ anonymous class → lambda → method reference:\n\n```java\n// ======== TRƯỚC (cũ, dài dòng) ========\n\n// 1. Sort products theo giá\nCollections.sort(products, new Comparator<Product>() {\n    @Override\n    public int compare(Product a, Product b) {\n        return Double.compare(a.getPrice(), b.getPrice());\n    }\n});\n\n// 2. Filter products có stock > 0\nList<Product> inStock = new ArrayList<>();\nfor (Product p : products) {\n    if (p.getStock() > 0) {\n        inStock.add(p);\n    }\n}\n\n// 3. Chạy task bất đồng bộ\nnew Thread(new Runnable() {\n    @Override\n    public void run() {\n        System.out.println(\"Sending notification...\");\n    }\n}).start();\n\n// 4. Event handler\nbutton.addActionListener(new ActionListener() {\n    @Override\n    public void actionPerformed(ActionEvent e) {\n        System.out.println(\"Button clicked!\");\n    }\n});\n\n// ======== SAU (lambda, ngắn gọn) ========\n// TODO: Refactor tất cả sang lambda và method reference\n```\n\n---\n\n## 🟡 Bài Tập 2: Xây Dựng Filter & Sort Engine ⭐⭐\n\n**Bối cảnh thực tế:** Trang danh sách sản phẩm có filter sidebar (theo giá, category, rating) và sort dropdown. Backend implement bằng Predicate chain.\n\n**Yêu cầu:** Tạo `ProductFilterEngine.java`:\n\n```java\npublic class ProductFilterEngine {\n    private List<Predicate<Product>> filters = new ArrayList<>();\n    private Comparator<Product> sorter = null;\n\n    // Fluent API — chain filters\n    public ProductFilterEngine filterByCategory(String category) {\n        filters.add(p -> p.getCategory().equals(category));\n        return this;\n    }\n\n    public ProductFilterEngine filterByPriceRange(double min, double max) {\n        filters.add(p -> p.getPrice() >= min && p.getPrice() <= max);\n        return this;\n    }\n\n    public ProductFilterEngine filterInStock() {\n        filters.add(p -> p.getStock() > 0);\n        return this;\n    }\n\n    public ProductFilterEngine filterByMinRating(double minRating) {\n        filters.add(p -> p.getRating() >= minRating);\n        return this;\n    }\n\n    public ProductFilterEngine filterByKeyword(String keyword) {\n        filters.add(p -> p.getName().toLowerCase().contains(keyword.toLowerCase()));\n        return this;\n    }\n\n    // Custom filter — accept bất kỳ Predicate nào\n    public ProductFilterEngine filter(Predicate<Product> customFilter) {\n        filters.add(customFilter);\n        return this;\n    }\n\n    // Sort options\n    public ProductFilterEngine sortBy(Comparator<Product> comparator) {\n        this.sorter = comparator;\n        return this;\n    }\n\n    public ProductFilterEngine sortByPriceAsc() {\n        return sortBy(Comparator.comparingDouble(Product::getPrice));\n    }\n\n    public ProductFilterEngine sortByPriceDesc() {\n        return sortBy(Comparator.comparingDouble(Product::getPrice).reversed());\n    }\n\n    public ProductFilterEngine sortByRating() {\n        return sortBy(Comparator.comparingDouble(Product::getRating).reversed());\n    }\n\n    // Execute — áp dụng tất cả filters + sort\n    public List<Product> execute(List<Product> products) {\n        // Gộp tất cả Predicate bằng .and()\n        Predicate<Product> combined = filters.stream()\n                .reduce(Predicate::and)\n                .orElse(p -> true); // Nếu không có filter → accept all\n\n        List<Product> result = new ArrayList<>();\n        for (Product p : products) {\n            if (combined.test(p)) result.add(p);\n        }\n        if (sorter != null) result.sort(sorter);\n        return result;\n    }\n\n    // Reset\n    public ProductFilterEngine clear() {\n        filters.clear();\n        sorter = null;\n        return this;\n    }\n}\n\n// Sử dụng — đọc như câu văn tiếng Anh:\nList<Product> result = new ProductFilterEngine()\n        .filterByCategory(\"weapon\")\n        .filterByPriceRange(500_000, 3_000_000)\n        .filterInStock()\n        .filterByMinRating(4.0)\n        .sortByPriceAsc()\n        .execute(allProducts);\n```\n\n---\n\n## 🟡 Bài Tập 3: Functional Validation Framework ⭐⭐\n\n**Bối cảnh thực tế:** Bean Validation (`@NotNull`, `@Size`, `@Email`) compile thành chain of validators. Đây là implementation functional.\n\n**Yêu cầu:** Tạo `Validator<T>` composable:\n\n```java\n@FunctionalInterface\npublic interface ValidationRule<T> {\n    String validate(T value); // null = valid, String = error message\n}\n\npublic class Validator<T> {\n    private List<ValidationRule<T>> rules = new ArrayList<>();\n\n    public Validator<T> addRule(ValidationRule<T> rule) {\n        rules.add(rule);\n        return this;\n    }\n\n    // Convenience methods\n    public Validator<T> notNull(String fieldName) {\n        return addRule(v -> v == null ? fieldName + \" không được null\" : null);\n    }\n\n    public List<String> validate(T value) {\n        List<String> errors = new ArrayList<>();\n        for (ValidationRule<T> rule : rules) {\n            String error = rule.validate(value);\n            if (error != null) errors.add(error);\n        }\n        return errors; // Empty = valid\n    }\n\n    public boolean isValid(T value) {\n        return validate(value).isEmpty();\n    }\n}\n\n// String validator\nValidator<String> emailValidator = new Validator<String>()\n        .notNull(\"Email\")\n        .addRule(s -> s.isBlank() ? \"Email không được trống\" : null)\n        .addRule(s -> !s.contains(\"@\") ? \"Email phải chứa @\" : null)\n        .addRule(s -> s.length() > 100 ? \"Email quá dài\" : null);\n\n// Product validator\nValidator<Product> productValidator = new Validator<Product>()\n        .notNull(\"Product\")\n        .addRule(p -> p.getName() == null || p.getName().isBlank() ? \"Tên sản phẩm bắt buộc\" : null)\n        .addRule(p -> p.getPrice() <= 0 ? \"Giá phải > 0\" : null)\n        .addRule(p -> p.getStock() < 0 ? \"Stock không được âm\" : null);\n\nList<String> errors = productValidator.validate(product);\nif (!errors.isEmpty()) {\n    errors.forEach(e -> System.out.println(\"❌ \" + e));\n}\n```\n\n---\n\n## 🔴 Bài Tập 4: Function Composition — Data Pipeline ⭐⭐⭐\n\n**Bối cảnh thực tế:** ETL (Extract-Transform-Load) pipeline dùng function composition. Mỗi bước transform data rồi truyền cho bước tiếp.\n\n```java\npublic class DataPipeline<T> {\n    private List<Function<T, T>> steps = new ArrayList<>();\n\n    public DataPipeline<T> then(Function<T, T> step) {\n        steps.add(step);\n        return this;\n    }\n\n    public T process(T input) {\n        T result = input;\n        for (Function<T, T> step : steps) {\n            result = step.apply(result);\n        }\n        return result;\n    }\n}\n\n// Pipeline xử lý giá sản phẩm\nFunction<Double, Double> addVat = price -> price * 1.1;\nFunction<Double, Double> addShipping = price -> price + 30_000;\nFunction<Double, Double> applyVoucher = price -> price * 0.85; // Giảm 15%\nFunction<Double, Double> roundPrice = price -> Math.ceil(price / 1000) * 1000;\n\n// Compose\nFunction<Double, Double> finalPriceCalc = addVat\n        .andThen(addShipping)\n        .andThen(applyVoucher)\n        .andThen(roundPrice);\n\ndouble finalPrice = finalPriceCalc.apply(1_000_000.0);\nSystem.out.printf(\"Giá cuối: %,.0f đ%n\", finalPrice);\n\n// Pipeline xử lý tên sản phẩm\nFunction<String, String> trimName = String::trim;\nFunction<String, String> capitalize = s -> s.substring(0, 1).toUpperCase() + s.substring(1);\nFunction<String, String> removeSpecialChars = s -> s.replaceAll(\"[<>\\\"']\", \"\");\nFunction<String, String> truncate = s -> s.length() > 50 ? s.substring(0, 50) + \"...\" : s;\n\nFunction<String, String> cleanName = trimName\n        .andThen(removeSpecialChars)\n        .andThen(capitalize)\n        .andThen(truncate);\n\nSystem.out.println(cleanName.apply(\"  <script>kiếm rồng huyền thoại</script>  \"));\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `Predicate`, `Function`, `Consumer`, `Supplier` — cho ví dụ thực tế của MỖI loại trong RaizeShop.\n- [ ] Lambda capture: `int count = 0; list.forEach(x -> count++);` tại sao lỗi compile? Cách fix?\n- [ ] Method reference `Product::getPrice` vs lambda `p -> p.getPrice()` — khi nào KHÔNG dùng method reference được?\n- [ ] Effectively final: tại sao lambda chỉ capture được biến `final` hoặc effectively final? Giải thích bằng thread safety.\n\n---\n\n👉 **Tiếp theo:** [Bài 18 – Stream API](../bai-18-stream-api/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Functional Interface đủ điều kiện dùng Lambda là gì?",
        "options": [
          "Interface chứa đúng một phương thức abstract (không kể default/static).",
          "Interface không chứa phương thức.",
          "Interface được đánh dấu @FunctionalInterface và chứa tối đa 3 abstract method.",
          "Interface có tất cả phương thức là default."
        ],
        "answer": 0,
        "explanation": "Functional Interface: đúng 1 abstract method. @FunctionalInterface là annotation tùy chọn để compiler kiểm tra."
      },
      {
        "q": "Lambda expression `(x) -> x * 2` biểu diễn điều gì?",
        "options": [
          "Khai báo biến x",
          "Một hàm ẩn danh nhận tham số x và trả về x * 2",
          "Vòng lặp nhân đôi",
          "Khai báo một interface"
        ],
        "answer": 1,
        "explanation": "Lambda `(params) -> body` là anonymous function. `(x) -> x * 2` nhận x và trả về x*2, không cần khai báo kiểu tường minh."
      },
      {
        "q": "Function<T, R> trong java.util.function biểu diễn gì?",
        "options": [
          "Hàm không có tham số và không trả về",
          "Hàm nhận đầu vào kiểu T và trả về kiểu R",
          "Hàm nhận 2 tham số",
          "Hàm trả về boolean"
        ],
        "answer": 1,
        "explanation": "`Function<T, R>` có method `apply(T t) -> R`. Dùng để transform/map dữ liệu từ kiểu T sang R."
      },
      {
        "q": "Predicate<T> trong java.util.function biểu diễn gì?",
        "options": [
          "Hàm trả về T",
          "Hàm kiểm tra điều kiện, nhận T và trả về boolean",
          "Hàm không có tham số",
          "Hàm tạo đối tượng T"
        ],
        "answer": 1,
        "explanation": "`Predicate<T>` có method `test(T t) -> boolean`. Dùng trong filter(), removeIf()... để kiểm tra điều kiện."
      },
      {
        "q": "Consumer<T> trong java.util.function biểu diễn gì?",
        "options": [
          "Hàm tạo T từ không có gì",
          "Hàm nhận T và không trả về gì (void)",
          "Hàm trả về T",
          "Hàm nhận 2 tham số"
        ],
        "answer": 1,
        "explanation": "`Consumer<T>` có method `accept(T t) -> void`. Dùng trong forEach() để thực hiện side effect."
      },
      {
        "q": "Supplier<T> trong java.util.function biểu diễn gì?",
        "options": [
          "Hàm nhận T và trả về void",
          "Hàm không có tham số nhưng trả về T",
          "Hàm biến đổi T thành R",
          "Hàm kiểm tra điều kiện"
        ],
        "answer": 1,
        "explanation": "`Supplier<T>` có method `get() -> T`. Không nhận tham số, cung cấp (supply) giá trị. Dùng cho lazy evaluation."
      },
      {
        "q": "Method reference `String::toUpperCase` tương đương Lambda nào?",
        "options": [
          "() -> String.toUpperCase()",
          "s -> s.toUpperCase()",
          "String -> toUpperCase",
          "s -> String.toUpperCase(s)"
        ],
        "answer": 1,
        "explanation": "`String::toUpperCase` là instance method reference tương đương `s -> s.toUpperCase()`. Java tự động ánh xạ."
      },
      {
        "q": "Cú pháp Lambda có block body `(x) -> { ... return ...; }` cần điều gì?",
        "options": [
          "Không cần return",
          "Bắt buộc có lệnh return nếu phương thức trả về giá trị",
          "Không thể có nhiều câu lệnh trong lambda",
          "Phải dùng yield thay vì return"
        ],
        "answer": 1,
        "explanation": "Lambda với block body `{}` hoạt động như phương thức bình thường, cần `return` nếu có kiểu trả về."
      },
      {
        "q": "BiFunction<T, U, R> trong java.util.function nhận bao nhiêu tham số?",
        "options": [
          "1 tham số",
          "2 tham số (T và U), trả về R",
          "3 tham số",
          "Không có tham số"
        ],
        "answer": 1,
        "explanation": "`BiFunction<T, U, R>` có method `apply(T t, U u) -> R`. Xử lý 2 đầu vào và trả về 1 kết quả."
      },
      {
        "q": "Lambda expression có thể bắt (capture) biến nào từ scope bên ngoài?",
        "options": [
          "Mọi biến",
          "Chỉ biến local là effectively final (không bị thay đổi sau khi khai báo)",
          "Chỉ biến static",
          "Không thể bắt biến nào"
        ],
        "answer": 1,
        "explanation": "Lambda capture biến local là effectively final (không bị reassign dù không khai báo final). Biến instance và static thì có thể capture và sửa."
      },
      {
        "q": "Compose method trong Function<T,R> dùng để làm gì?",
        "options": [
          "Tạo Function mới",
          "Kết hợp hai Function: f.compose(g) = f(g(x)) - áp dụng g trước, rồi f",
          "So sánh hai Function",
          "Kiểm tra kiểu tham số"
        ],
        "answer": 1,
        "explanation": "`f.andThen(g)` = g(f(x)). `f.compose(g)` = f(g(x)). Dùng để chain nhiều transform lại."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Lambda & Functional Interface\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 17: Lambda & Functional Programming\n\n> 🎯 **Bối cảnh dự án:** Viết code **ngắn gọn, khai báo** — cách Spring Security configs, JPA Specifications, và mọi modern Java code được viết.\n\n---\n\n## 🔴 Bài Tập 1: Refactor Code Cũ Sang Lambda ⭐⭐\n\n**Bối cảnh thực tế:** Code review thường yêu cầu \"refactor anonymous class sang lambda\". Đây là kỹ năng bắt buộc trong team Java hiện đại.\n\n**Yêu cầu:** Refactor mỗi block code từ anonymous class → lambda → method reference:\n\n```java\n// ======== TRƯỚC (cũ, dài dòng) ========\n\n// 1. Sort products theo giá\nCollections.sort(products, new Comparator<Product>() {\n    @Override\n    public int compare(Product a, Product b) {\n        return Double.compare(a.getPrice(), b.getPrice());\n    }\n});\n\n// 2. Filter products có stock > 0\nList<Product> inStock = new ArrayList<>();\nfor (Product p : products) {\n    if (p.getStock() > 0) {\n        inStock.add(p);\n    }\n}\n\n// 3. Chạy task bất đồng bộ\nnew Thread(new Runnable() {\n    @Override\n    p...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 18,
    "title": "Stream API & Optional",
    "phase": "Phase 3: Java Intermediate",
    "time": "5 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 18: Stream API\n\n> 🟠 **Phase 3 – Bài 6/6** | Thời gian: ~4 giờ\n\n---\n\nNếu Lambda là cách viết hàm gọn gàng, thì **Stream API** là cách xử lý tập hợp dữ liệu một cách thanh lịch đến mức tôi có thể nói: \"Đây là tính năng thay đổi cách tôi viết Java nhất.\"\n\nTrước Stream API, xử lý danh sách phải dùng vòng lặp, biến tạm, logic rải rác khắp nơi. Với Stream, bạn có thể diễn đạt **MUỐN LÀM GÌ** thay vì **LÀM THẾ NÀO**.\n\n---\n\n## 1. Stream Là Gì?\n\nStream là **luồng dữ liệu** — bạn tạo một pipeline (đường ống) các phép biến đổi, rồi kết thúc bằng một thao tác thu thập kết quả.\n\n```\nNguồn dữ liệu → [filter] → [map] → [sort] → Kết quả\n```\n\n```java\nList<String> sanPham = List.of(\"Kiếm Rồng\", \"Giáp Vàng\", \"Nhẫn Ma Lực\",\n                                 \"Kiếm Ánh Sáng\", \"Hài Cát\", \"Mũ Thần\");\n\n// Không có Stream — dài và phức tạp:\nList<String> ketQua = new ArrayList<>();\nfor (String sp : sanPham) {\n    if (sp.contains(\"Kiếm\")) {           // Lọc\n        String upper = sp.toUpperCase();  // Biến đổi\n        ketQua.add(upper);\n    }\n}\nCollections.sort(ketQua);\n\n// Với Stream — đọc như tiếng Anh:\nList<String> ketQua2 = sanPham.stream()\n    .filter(sp -> sp.contains(\"Kiếm\"))      // Lọc\n    .map(String::toUpperCase)               // Biến đổi\n    .sorted()                               // Sắp xếp\n    .collect(Collectors.toList());          // Thu thập\n```\n\n---\n\n## 2. Tạo Stream\n\n```java\n// Từ Collection:\nList<Integer> soList = List.of(1, 2, 3, 4, 5);\nStream<Integer> stream1 = soList.stream();\n\n// Từ mảng:\nint[] arr = {1, 2, 3, 4, 5};\nIntStream stream2 = Arrays.stream(arr);\n\n// Tạo trực tiếp:\nStream<String> stream3 = Stream.of(\"A\", \"B\", \"C\");\n\n// Stream vô hạn — dùng với limit():\nStream<Integer> vonhan = Stream.iterate(0, n -> n + 2).limit(10); // 0,2,4,...,18\nStream<Double> random = Stream.generate(Math::random).limit(5);\n```\n\n---\n\n## 3. Intermediate Operations — Biến Đổi Trung Gian\n\nTrả về Stream mới, có thể chain tiếp. Thực tế **lười** — chỉ chạy khi có terminal operation.\n\n### `filter()` — Lọc\n\n```java\nList<SanPham> dsSP = getDS(); // List sản phẩm\n\n// Lọc sản phẩm giá dưới 500k và còn hàng\ndsSP.stream()\n    .filter(sp -> sp.getGia() < 500_000)\n    .filter(sp -> sp.getSoLuong() > 0)\n    .forEach(sp -> System.out.println(sp.getTen()));\n```\n\n### `map()` — Biến Đổi Từng Phần Tử\n\n```java\n// Chuyển List<SanPham> → List<String> (chỉ lấy tên)\nList<String> tenList = dsSP.stream()\n    .map(SanPham::getTen)            // Lấy tên của từng sản phẩm\n    .collect(Collectors.toList());\n\n// Biến đổi chuỗi\nList<String> tenVietHoa = tenList.stream()\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());\n\n// map sang kiểu khác\nList<Integer> doTai = dsSP.stream()\n    .map(SanPham::getSoLuong)       // SanPham → Integer\n    .collect(Collectors.toList());\n```\n\n### `sorted()` — Sắp Xếp\n\n```java\n// Sắp xếp tên theo alphabet\ndsSP.stream()\n    .sorted(Comparator.comparing(SanPham::getTen))\n    .forEach(sp -> System.out.println(sp.getTen()));\n\n// Sắp xếp giá giảm dần\ndsSP.stream()\n    .sorted(Comparator.comparingDouble(SanPham::getGia).reversed())\n    .forEach(sp -> System.out.printf(\"%s: %,.0f đ%n\", sp.getTen(), sp.getGia()));\n```\n\n### `distinct()`, `limit()`, `skip()`\n\n```java\nList<Integer> so = List.of(1, 2, 2, 3, 3, 3, 4, 5);\n\nso.stream().distinct().forEach(System.out::print);    // 1 2 3 4 5\nso.stream().limit(3).forEach(System.out::print);      // 1 2 2\nso.stream().skip(4).forEach(System.out::print);       // 3 3 4 5\n\n// Phân trang — bỏ qua N phần tử, lấy M phần tử tiếp theo:\nint trang = 2, kichThuoc = 3;\ndsSP.stream()\n    .skip((long)(trang - 1) * kichThuoc)  // Bỏ qua (trang-1) * kichThuoc phần tử\n    .limit(kichThuoc)                      // Lấy kichThuoc phần tử\n    .forEach(sp -> System.out.println(sp.getTen()));\n```\n\n---\n\n## 4. Terminal Operations — Kết Thúc Pipeline\n\n### `collect()` — Thu Thập Kết Quả\n\n```java\nimport java.util.stream.Collectors;\n\n// Thành List\nList<SanPham> dsLoc = dsSP.stream()\n    .filter(sp -> sp.getGia() > 1_000_000)\n    .collect(Collectors.toList());\n\n// Thành Set (loại trùng)\nSet<String> danhMuc = dsSP.stream()\n    .map(SanPham::getDanhMuc)\n    .collect(Collectors.toSet());\n\n// Thành Map (id → sản phẩm)\nMap<Integer, SanPham> mapSP = dsSP.stream()\n    .collect(Collectors.toMap(SanPham::getId, sp -> sp));\n\n// Nhóm theo danh mục\nMap<String, List<SanPham>> nhomTheoDanhMuc = dsSP.stream()\n    .collect(Collectors.groupingBy(SanPham::getDanhMuc));\n// {\"Vũ khí\": [Kiếm Rồng, Kiếm ÁS], \"Phòng thủ\": [Giáp Vàng], ...}\n\n// Join chuỗi\nString tenGhep = dsSP.stream()\n    .map(SanPham::getTen)\n    .collect(Collectors.joining(\", \"));  // \"Kiếm Rồng, Giáp Vàng, Nhẫn Ma\"\n```\n\n### `count()`, `findFirst()`, `anyMatch()`, `allMatch()`\n\n```java\n// Đếm\nlong soSPConHang = dsSP.stream()\n    .filter(sp -> sp.getSoLuong() > 0)\n    .count();\n\n// Tìm phần tử đầu tiên khớp\nOptional<SanPham> spTimThay = dsSP.stream()\n    .filter(sp -> sp.getTen().contains(\"Kiếm\"))\n    .findFirst();\n\nif (spTimThay.isPresent()) {\n    System.out.println(\"Tìm thấy: \" + spTimThay.get().getTen());\n}\n\n// Kiểm tra điều kiện\nboolean coSPHetHang = dsSP.stream().anyMatch(sp -> sp.getSoLuong() == 0);\nboolean tatCaConHang = dsSP.stream().allMatch(sp -> sp.getSoLuong() > 0);\nboolean khongCoSpAm = dsSP.stream().noneMatch(sp -> sp.getGia() < 0);\n```\n\n### `reduce()` — Tổng Hợp\n\n```java\n// Tính tổng số lượng tất cả sản phẩm\nint tongSoLuong = dsSP.stream()\n    .mapToInt(SanPham::getSoLuong)  // IntStream\n    .sum();\n\n// Tính tổng giá trị kho (gia × soLuong)\ndouble tongGiaTri = dsSP.stream()\n    .mapToDouble(sp -> sp.getGia() * sp.getSoLuong())\n    .sum();\n\n// reduce thủ công:\nOptional<Integer> tongCong = List.of(1, 2, 3, 4, 5).stream()\n    .reduce((a, b) -> a + b);  // 15\n```\n\n---\n\n## 5. Optional — Tránh NullPointerException\n\nKhi một phép tính có thể trả về null, dùng `Optional`:\n\n```java\nOptional<SanPham> timSP = dsSP.stream()\n    .filter(sp -> sp.getId() == 99)\n    .findFirst();\n\n// Kiểm tra và lấy giá trị an toàn:\ntimSP.ifPresent(sp -> System.out.println(sp.getTen()));\n\nString ten = timSP.map(SanPham::getTen).orElse(\"Không tìm thấy\");\n\nSanPham sp = timSP.orElseThrow(() ->\n    new RuntimeException(\"Sản phẩm #99 không tồn tại!\"));\n```\n\n---\n\n## 6. Ví Dụ Tổng Hợp — Báo Cáo Kho Hàng\n\n```java\npublic class BaoCaoKho {\n\n    public static void main(String[] args) {\n        List<SanPham> kho = List.of(\n            new SanPham(1, \"Kiếm Rồng\",     \"Vũ khí\",   1_200_000, 3),\n            new SanPham(2, \"Giáp Vàng\",     \"Phòng thủ\", 800_000,  0),\n            new SanPham(3, \"Nhẫn Ma Lực\",   \"Trang sức\", 500_000,  5),\n            new SanPham(4, \"Kiếm Ánh Sáng\", \"Vũ khí\",   1_500_000, 1),\n            new SanPham(5, \"Hài Tốc Độ\",   \"Phòng thủ\", 300_000,  4),\n            new SanPham(6, \"Mũ Thần\",       \"Phòng thủ\", 400_000,  2)\n        );\n\n        // 1. Tổng giá trị kho (chỉ hàng còn)\n        double tongGiaTri = kho.stream()\n            .filter(sp -> sp.getSoLuong() > 0)\n            .mapToDouble(sp -> sp.getGia() * sp.getSoLuong())\n            .sum();\n\n        // 2. Sản phẩm đắt nhất\n        Optional<SanPham> datNhat = kho.stream()\n            .max(Comparator.comparingDouble(SanPham::getGia));\n\n        // 3. Nhóm theo danh mục — đếm số lượng mỗi danh mục\n        Map<String, Long> theoDanhMuc = kho.stream()\n            .collect(Collectors.groupingBy(SanPham::getDanhMuc, Collectors.counting()));\n\n        // 4. Danh sách tên sản phẩm hết hàng\n        String hetHang = kho.stream()\n            .filter(sp -> sp.getSoLuong() == 0)\n            .map(SanPham::getTen)\n            .collect(Collectors.joining(\", \"));\n\n        // 5. Top 3 đắt nhất còn hàng\n        System.out.println(\"=== TOP 3 ĐẮT NHẤT CÒN HÀNG ===\");\n        kho.stream()\n            .filter(sp -> sp.getSoLuong() > 0)\n            .sorted(Comparator.comparingDouble(SanPham::getGia).reversed())\n            .limit(3)\n            .forEach(sp -> System.out.printf(\"  %s: %,.0f đ (còn %d)%n\",\n                sp.getTen(), sp.getGia(), sp.getSoLuong()));\n\n        System.out.printf(\"%nTổng giá trị kho: %,.0f đ%n\", tongGiaTri);\n        datNhat.ifPresent(sp ->\n            System.out.printf(\"Đắt nhất: %s (%,.0f đ)%n\", sp.getTen(), sp.getGia()));\n        System.out.println(\"Theo danh mục: \" + theoDanhMuc);\n        System.out.println(\"Hết hàng: \" + hetHang);\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 18\n\n```\n✅ Stream: pipeline xử lý dữ liệu — đọc như mô tả \"muốn làm gì\"\n✅ Intermediate: filter(), map(), sorted(), distinct(), limit(), skip()\n✅ Terminal: collect(), count(), findFirst(), anyMatch(), reduce()\n✅ Collectors: toList(), toSet(), toMap(), groupingBy(), joining()\n✅ Optional: tránh NullPointerException khi có thể trả về null\n✅ Stream lười (lazy): chỉ thực sự chạy khi gặp terminal operation\n✅ Stream không làm thay đổi nguồn — luôn tạo dữ liệu mới\n```\n\n---\n\n## 🎉 Phase 3 Hoàn Thành!\n\nBạn vừa học 6 kỹ năng cốt lõi của Java trung cấp. Từ đây, bạn có thể đọc và hiểu hầu hết code Java trong các dự án thực tế.\n\nPhase 4 sẽ đưa bạn vào **vùng đất của các kỹ sư senior**: Threading, Design Patterns, JVM internals, Testing...\n\n👉 **[Bài 19: Multithreading & Concurrency](../../phase4-advanced/bai-19-multithreading/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 18: Stream API\n\n> 🎯 **Bối cảnh dự án:** Xử lý **dữ liệu hàng loạt** theo style khai báo — cách viết query logic trong Service layer modern Java.\n\n---\n\n## 🔴 Bài Tập 1: Product Service với Stream API ⭐⭐\n\n**Bối cảnh thực tế:** Mọi method trong Service layer của Spring Boot project hiện đại đều dùng Stream API. Đây là bài tập convert từ for-loop sang Stream.\n\n**Yêu cầu:** Implement `ProductService.java` HOÀN TOÀN bằng Stream API (không dùng for/while):\n\n```java\npublic class ProductService {\n    private List<Product> products;\n\n    // Tất cả method dưới đây PHẢI dùng Stream API\n\n    // Tìm kiếm theo keyword (trong tên hoặc mô tả)\n    public List<Product> search(String keyword) {\n        return products.stream()\n                .filter(p -> p.getName().toLowerCase().contains(keyword.toLowerCase())\n                          || p.getDescription().toLowerCase().contains(keyword.toLowerCase()))\n                .sorted(Comparator.comparingDouble(Product::getRating).reversed())\n                .collect(Collectors.toList());\n    }\n\n    // Top N sản phẩm bán chạy nhất\n    public List<Product> getTopSelling(int n) {\n        return products.stream()\n                .sorted(Comparator.comparingInt(Product::getSoldCount).reversed())\n                .limit(n)\n                .collect(Collectors.toList());\n    }\n\n    // Tổng giá trị tồn kho\n    public double getTotalInventoryValue() {\n        return products.stream()\n                .mapToDouble(p -> p.getPrice() * p.getStock())\n                .sum();\n    }\n\n    // Giá trung bình theo category\n    public Map<String, Double> getAveragePriceByCategory() {\n        return products.stream()\n                .collect(Collectors.groupingBy(\n                        Product::getCategory,\n                        Collectors.averagingDouble(Product::getPrice)));\n    }\n\n    // Đếm sản phẩm theo trạng thái stock\n    public Map<String, Long> getStockStatusSummary() {\n        return products.stream()\n                .collect(Collectors.groupingBy(\n                        p -> {\n                            if (p.getStock() == 0) return \"HẾT HÀNG\";\n                            if (p.getStock() <= 5) return \"SẮP HẾT\";\n                            return \"CÒN HÀNG\";\n                        },\n                        Collectors.counting()));\n    }\n\n    // Phân trang\n    public List<Product> getPage(int page, int size) {\n        return products.stream()\n                .skip((long)(page - 1) * size)\n                .limit(size)\n                .collect(Collectors.toList());\n    }\n\n    // Sản phẩm có giá ngoại lệ (> 2 std deviation từ giá TB)\n    public List<Product> findPriceOutliers() { ... }\n\n    // Dashboard summary string\n    public String generateSummary() {\n        // Dùng Collectors.joining() để tạo summary report\n    }\n}\n```\n\n---\n\n## 🟡 Bài Tập 2: Order Analytics Dashboard ⭐⭐\n\n**Bối cảnh thực tế:** Admin dashboard hiển thị KPIs — doanh thu, conversion rate, top customers. Tất cả tính bằng Stream aggregate operations.\n\n**Yêu cầu:** Tạo `OrderDashboard.java`:\n\n```java\npublic class OrderDashboard {\n    private List<Order> orders;\n\n    // Doanh thu theo tháng (dùng groupingBy + summingDouble)\n    public Map<String, Double> revenueByMonth() {\n        return orders.stream()\n                .collect(Collectors.groupingBy(\n                        o -> o.getCreatedAt().substring(0, 7), // \"2024-04\"\n                        Collectors.summingDouble(Order::getTotalAmount)));\n    }\n\n    // Tỉ lệ đơn hàng theo status\n    public Map<String, String> statusDistribution() {\n        long total = orders.size();\n        return orders.stream()\n                .collect(Collectors.groupingBy(\n                        Order::getStatus, Collectors.counting()))\n                .entrySet().stream()\n                .collect(Collectors.toMap(\n                        Map.Entry::getKey,\n                        e -> String.format(\"%.1f%% (%d)\", \n                                (double) e.getValue() / total * 100, e.getValue())));\n    }\n\n    // Top 5 khách hàng chi tiêu nhiều nhất\n    public List<Map.Entry<String, Double>> topSpenders(int n) { ... }\n\n    // Giờ cao điểm (giờ nào có nhiều đơn nhất)\n    public Map.Entry<Integer, Long> peakHour() { ... }\n\n    // Đơn hàng trung bình theo ngày trong tuần\n    public Map<String, Double> avgOrdersByDayOfWeek() { ... }\n\n    // Print dashboard đẹp\n    public void printDashboard() {\n        System.out.println(\"╔══════════════════════════════════════╗\");\n        System.out.println(\"║        📊 RAIZESHOP DASHBOARD        ║\");\n        System.out.println(\"╠══════════════════════════════════════╣\");\n        // ... dùng kết quả các method trên\n    }\n}\n```\n\n---\n\n## 🔴 Bài Tập 3: Recommendation Engine ⭐⭐⭐\n\n**Bối cảnh thực tế:** \"Sản phẩm liên quan\", \"Khách hàng cũng mua\" — tính năng recommendation cơ bản dựa trên co-occurrence trong đơn hàng.\n\n**Yêu cầu:** Tạo `RecommendationEngine.java`:\n\n```java\npublic class RecommendationEngine {\n    private List<Order> orderHistory;\n    private List<Product> allProducts;\n\n    // \"Sản phẩm thường mua cùng\" — collaborative filtering đơn giản\n    public List<Product> getFrequentlyBoughtTogether(String productId, int maxResults) {\n        // 1. Tìm tất cả đơn hàng chứa productId\n        // 2. Gom tất cả sản phẩm KHÁC trong các đơn hàng đó\n        // 3. Đếm frequency mỗi sản phẩm\n        // 4. Sort theo frequency giảm dần\n        // 5. Trả về top N\n\n        return orderHistory.stream()\n                .filter(o -> o.getProductIds().contains(productId))\n                .flatMap(o -> o.getProductIds().stream())\n                .filter(id -> !id.equals(productId))\n                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))\n                .entrySet().stream()\n                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())\n                .limit(maxResults)\n                .map(e -> findProductById(e.getKey()))\n                .filter(Optional::isPresent)\n                .map(Optional::get)\n                .collect(Collectors.toList());\n    }\n\n    // \"Sản phẩm phổ biến trong danh mục này\"\n    public List<Product> getPopularInCategory(String category, int maxResults) {\n        // Filter by category → sort by soldCount → limit\n    }\n\n    // \"Gợi ý cho bạn\" dựa trên lịch sử mua\n    public List<Product> getPersonalRecommendations(String userId, int maxResults) {\n        // 1. Tìm categories user hay mua\n        // 2. Tìm sản phẩm trong các categories đó\n        // 3. Loại bỏ sản phẩm user đã mua\n        // 4. Sort theo rating\n    }\n\n    // Trending: sản phẩm có tốc độ bán tăng nhanh nhất 7 ngày qua\n    public List<Product> getTrending(int maxResults) { ... }\n}\n```\n\n---\n\n## 🟡 Bài Tập 4: Stream Parallel Processing ⭐⭐\n\n**Bối cảnh thực tế:** Batch processing 100,000+ records — parallel stream tận dụng multi-core CPU.\n\n```java\n// Giả lập 100,000 đơn hàng\nList<Order> bigData = generateOrders(100_000);\n\n// Sequential vs Parallel — đo thời gian\nlong start = System.nanoTime();\n\n// Sequential\ndouble totalRevenue = bigData.stream()\n        .filter(o -> \"COMPLETED\".equals(o.getStatus()))\n        .mapToDouble(Order::getTotalAmount)\n        .sum();\n\nlong seqTime = System.nanoTime() - start;\n\n// Parallel\nstart = System.nanoTime();\ndouble totalRevenueParallel = bigData.parallelStream()\n        .filter(o -> \"COMPLETED\".equals(o.getStatus()))\n        .mapToDouble(Order::getTotalAmount)\n        .sum();\n\nlong parTime = System.nanoTime() - start;\n\nSystem.out.printf(\"Sequential: %,d ns%n\", seqTime);\nSystem.out.printf(\"Parallel  : %,d ns%n\", parTime);\nSystem.out.printf(\"Speedup   : %.2fx%n\", (double) seqTime / parTime);\n\n// ⚠️ Thử thách: Khi nào parallel CHẬM HƠN sequential? Test và giải thích\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `stream()` vs `parallelStream()` — khi nào parallel CHẬM hơn? (Hint: overhead, data size, operation type)\n- [ ] `collect(Collectors.toList())` vs `toList()` (Java 16+) — khác nhau thế nào? List nào mutable?\n- [ ] `flatMap` vs `map` — giải thích sự khác nhau bằng ví dụ: \"lấy tất cả productIds từ list đơn hàng\".\n- [ ] Tại sao KHÔNG nên dùng Stream cho đọc file lớn theo từng dòng trong production? (Gợi ý: memory, backpressure)\n\n---\n\n👉 **Tiếp theo:** [Bài 19 – Multithreading](../../phase4-advanced/bai-19-multithreading/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Trong Stream API, thao tác nào là Intermediate Operation trả về Stream mới?",
        "options": [
          "forEach",
          "collect",
          "filter",
          "reduce"
        ],
        "answer": 2,
        "explanation": "`filter`, `map`, `sorted`, `limit`, `distinct` là intermediate operations (trả về Stream). `forEach`, `collect`, `count`, `reduce` là terminal operations."
      },
      {
        "q": "Terminal Operation trong Stream làm gì?",
        "options": [
          "Trả về Stream mới",
          "Kết thúc Stream pipeline và tạo ra kết quả (List, int, boolean...)",
          "Tạo Stream ban đầu",
          "Sắp xếp dữ liệu"
        ],
        "answer": 1,
        "explanation": "Terminal operation kích hoạt toàn bộ pipeline và tạo kết quả cụ thể. Sau đó Stream không dùng được nữa."
      },
      {
        "q": "Stream trong Java có đặc tính gì đặc biệt?",
        "options": [
          "Lưu trữ dữ liệu như Collection",
          "Lazy evaluation: intermediate operations chỉ chạy khi có terminal operation",
          "Có thể reuse sau khi terminal",
          "Chỉ xử lý số nguyên"
        ],
        "answer": 1,
        "explanation": "Stream lazy: intermediate operations không thực sự chạy ngay. Chỉ khi có terminal operation mới kích hoạt pipeline. Tối ưu hóa hiệu suất."
      },
      {
        "q": "Stream.filter(predicate) làm gì?",
        "options": [
          "Sửa đổi phần tử",
          "Giữ lại các phần tử thỏa mãn điều kiện predicate",
          "Xóa tất cả phần tử",
          "Sắp xếp stream"
        ],
        "answer": 1,
        "explanation": "`filter()` tạo Stream mới chỉ chứa các phần tử mà predicate trả về true."
      },
      {
        "q": "Stream.map(function) làm gì?",
        "options": [
          "Lọc phần tử",
          "Biến đổi mỗi phần tử từ kiểu này sang kiểu khác",
          "Kết hợp hai stream",
          "Đếm số phần tử"
        ],
        "answer": 1,
        "explanation": "`map(f)` áp dụng function f lên mỗi phần tử, tạo Stream kết quả mới với kiểu có thể khác kiểu gốc."
      },
      {
        "q": "Collectors.toList() trong Stream.collect() dùng để làm gì?",
        "options": [
          "Đếm phần tử",
          "Thu gom các phần tử Stream thành một List",
          "Sắp xếp Stream",
          "Lọc Stream"
        ],
        "answer": 1,
        "explanation": "`stream.collect(Collectors.toList())` là cách phổ biến để chuyển Stream về List. Java 16+ có `stream.toList()`."
      },
      {
        "q": "Optional<T> trong Java dùng để giải quyết vấn đề gì?",
        "options": [
          "Tăng tốc xử lý",
          "Đại diện cho giá trị có thể có hoặc không, tránh NullPointerException",
          "Lưu trữ collection",
          "Tạo lazy evaluation"
        ],
        "answer": 1,
        "explanation": "Optional là container có thể empty hoặc chứa giá trị, buộc developer phải xử lý trường hợp null một cách tường minh."
      },
      {
        "q": "Stream.reduce(identity, accumulator) làm gì?",
        "options": [
          "Lọc phần tử",
          "Kết hợp tất cả phần tử thành một giá trị duy nhất",
          "Nhân đôi stream",
          "Sắp xếp stream"
        ],
        "answer": 1,
        "explanation": "`reduce()` fold stream thành một giá trị: tổng, tích, max, min... Identity là giá trị ban đầu."
      },
      {
        "q": "Stream.flatMap() dùng khi nào?",
        "options": [
          "Khi cần lọc Stream",
          "Khi mỗi phần tử ánh xạ sang Stream và cần làm phẳng (flatten) kết quả thành một Stream",
          "Khi cần map về String",
          "Khi cần sort"
        ],
        "answer": 1,
        "explanation": "`flatMap()` áp dụng function trả về Stream rồi flatten: `List<List<T>>` → `Stream<T>`. Hữu ích khi map tạo collection."
      },
      {
        "q": "Phương thức Optional.orElse(defaultValue) làm gì?",
        "options": [
          "Ném exception nếu empty",
          "Trả về giá trị nếu có, hoặc defaultValue nếu empty",
          "Luôn trả về defaultValue",
          "Kiểm tra empty"
        ],
        "answer": 1,
        "explanation": "`orElse(T)`: trả về value nếu present, ngược lại trả về default. Khác `orElseGet(Supplier)` là lazy evaluation."
      },
      {
        "q": "Parallel Stream trong Java dùng để làm gì?",
        "options": [
          "Stream tuần tự trên một luồng",
          "Xử lý song song trên nhiều CPU core để tăng tốc với dữ liệu lớn",
          "Stream chỉ xử lý số",
          "Stream không có terminal operation"
        ],
        "answer": 1,
        "explanation": "`parallelStream()` hoặc `stream().parallel()` xử lý song song dùng Fork/Join Framework. Tăng tốc với dữ liệu lớn nhưng cần cẩn thận với thread-safety."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Stream API & Optional\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 18: Stream API\n\n> 🎯 **Bối cảnh dự án:** Xử lý **dữ liệu hàng loạt** theo style khai báo — cách viết query logic trong Service layer modern Java.\n\n---\n\n## 🔴 Bài Tập 1: Product Service với Stream API ⭐⭐\n\n**Bối cảnh thực tế:** Mọi method trong Service layer của Spring Boot project hiện đại đều dùng Stream API. Đây là bài tập convert từ for-loop sang Stream.\n\n**Yêu cầu:** Implement `ProductService.java` HOÀN TOÀN bằng Stream API (không dùng for/while):\n\n```java\npublic class ProductService {\n    private List<Product> products;\n\n    // Tất cả method dưới đây PHẢI dùng Stream API\n\n    // Tìm kiếm theo keyword (trong tên hoặc mô tả)\n    public List<Product> search(String keyword) {\n        return products.stream()\n                .filter(p -> p.getName().toLowerCase().contains(keyword.toLowerCase())\n                          || p.getDescription().toLowerCase().contains(keyword.toLowerCase()))\n                .sorted(Comparator.comparingDouble(Product::getRating).re...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 19,
    "title": "Đa Luồng (Multithreading)",
    "phase": "Phase 4: Java Advanced",
    "time": "5 giờ",
    "difficulty": "Rất Khó",
    "theory": "﻿# Bài 19: Multithreading & Concurrency\n\n> 🔴 **Phase 4 – Bài 1/5** | Thời gian: ~5 giờ\n\n---\n\nĐây là chủ đề tôi phải thành thật: **Concurrency là phần khó nhất của Java**. Bug từ lỗi threading có thể chỉ xuất hiện 1 lần trong 10,000 lần chạy, cực kỳ khó reproduce và debug.\n\nNhưng đây cũng là kiến thức phân biệt junior và mid-level developer. Một ứng dụng server thực tế phải xử lý hàng nghìn request đồng thời — nếu bạn không hiểu threading, bạn không thể build được hệ thống đó.\n\n---\n\n## 1. Thread Là Gì?\n\nMặc định, chương trình Java chạy trên **1 thread** (main thread). Mọi lệnh chạy tuần tự, từng cái một.\n\n**Thread** = luồng thực thi riêng. Nhiều thread = nhiều công việc chạy **song song** (hoặc xen kẽ nhau trên CPU đơn).\n\n```\nKhông có thread:          Có 2 thread:\n────────────────          ──────────────────────────\ntask1 → task2 → task3    Thread 1: task1 ----→ task3\n                          Thread 2:     task2 ------→\n                          Thời gian ngắn hơn!\n```\n\n---\n\n## 2. Tạo Thread\n\n### Cách 1: Extends `Thread`\n\n```java\nclass TaiFileThread extends Thread {\n    private String tenFile;\n\n    TaiFileThread(String tenFile) {\n        this.tenFile = tenFile;\n    }\n\n    @Override\n    public void run() {  // Code thread chạy ở đây\n        System.out.println(\"Đang tải: \" + tenFile + \" [Thread: \" + getName() + \"]\");\n        try {\n            Thread.sleep(2000);  // Giả lập tải 2 giây\n        } catch (InterruptedException e) {\n            System.out.println(\"Thread bị ngắt!\");\n        }\n        System.out.println(\"Tải xong: \" + tenFile);\n    }\n}\n\n// Dùng:\nTaiFileThread t1 = new TaiFileThread(\"video.mp4\");\nTaiFileThread t2 = new TaiFileThread(\"image.jpg\");\n\nt1.start();  // start() — KHÔNG gọi run()! start() tạo thread mới rồi gọi run()\nt2.start();  // Chạy song song với t1\n\n// t1.run();  // ❌ Gọi trực tiếp run() sẽ chạy trong thread hiện tại — không song song!\n```\n\n### Cách 2: Implements `Runnable` (Hay Dùng Hơn)\n\n```java\n// Cách hay hơn — không chiếm mất inheritance\nRunnable nhiemVu = () -> {\n    System.out.println(\"Đang chạy trong: \" + Thread.currentThread().getName());\n};\n\nThread t = new Thread(nhiemVu);\nt.start();\n\n// Gọn hơn với lambda:\nnew Thread(() -> System.out.println(\"Thread nhanh!\")).start();\n```\n\n---\n\n## 3. Thread Lifecycle — Vòng Đời Thread\n\n```\nNEW → start() → RUNNABLE → (scheduler chọn) → RUNNING\n                              ↓\n                    Blocked/Waiting/Timed_Waiting\n                              ↓\n                           TERMINATED\n```\n\n```java\nThread t = new Thread(() -> {\n    try {\n        Thread.sleep(1000);  // Chuyển sang TIMED_WAITING trong 1 giây\n    } catch (InterruptedException e) {\n        Thread.currentThread().interrupt();\n    }\n});\n\nSystem.out.println(t.getState());  // NEW\nt.start();\nSystem.out.println(t.getState());  // RUNNABLE hoặc TIMED_WAITING\nt.join();                          // Đợi thread t kết thúc\nSystem.out.println(t.getState());  // TERMINATED\n```\n\n---\n\n## 4. Race Condition — Vấn Đề Khi Nhiều Thread Chia Sẻ Dữ Liệu\n\nĐây là nơi mọi thứ trở nên nguy hiểm:\n\n```java\n// ❌ BUG! Không thread-safe:\npublic class TaiKhoan {\n    private double soDu = 1_000_000;\n\n    public void rut(double soTien) {\n        if (soDu >= soTien) {\n            // ⚠️ Thread có thể bị ngắt ở đây! Thread khác cũng đang đọc soDu\n            soDu -= soTien;\n        }\n    }\n}\n\nTaiKhoan tk = new TaiKhoan();\n// 2 thread cùng rút 800k lúc soDu = 1 triệu:\n// Thread 1: đọc soDu = 1tr, đủ điều kiện\n// Thread 2: đọc soDu = 1tr, đủ điều kiện (chưa kịp cập nhật!)\n// Thread 1: soDu = 1tr - 800k = 200k\n// Thread 2: soDu = 1tr - 800k = 200k  ← Sai! Phải là -600k\n// Kết quả: soDu = 200k (đã \"rút\" tổng 1.6 triệu từ 1 triệu!)\n```\n\n---\n\n## 5. `synchronized` — Khóa Mutex\n\n```java\n// ✅ Thread-safe với synchronized:\npublic class TaiKhoan {\n    private double soDu = 1_000_000;\n\n    public synchronized void rut(double soTien) {  // Chỉ 1 thread vào cùng lúc\n        if (soDu >= soTien) {\n            soDu -= soTien;\n            System.out.printf(\"Rút %,.0f đ. Còn: %,.0f đ%n\", soTien, soDu);\n        } else {\n            System.out.println(\"Không đủ tiền!\");\n        }\n    }\n\n    public synchronized double getSoDu() { return soDu; }\n}\n```\n\n```java\n// synchronized block — khóa cụ thể hơn (hiệu suất tốt hơn):\npublic void xuLy() {\n    // Code không cần lock — chạy song song OK\n    System.out.println(\"Chuẩn bị dữ liệu...\");\n\n    synchronized(this) {\n        // Chỉ khóa phần cần thiết\n        soDu -= 100_000;\n    }\n\n    // Code sau lock — tiếp tục song song\n}\n```\n\n---\n\n## 6. `ExecutorService` — Quản Lý Thread Pool\n\nTạo và hủy thread nhiều lần rất tốn kém. **Thread pool** tạo sẵn một tập thread, tái sử dụng chúng.\n\n```java\nimport java.util.concurrent.*;\n\n// Thread pool cố định 4 thread\nExecutorService pool = Executors.newFixedThreadPool(4);\n\n// Submit nhiều task — pool quản lý thứ tự\nfor (int i = 1; i <= 10; i++) {\n    int taskId = i;\n    pool.submit(() -> {\n        System.out.printf(\"Task %d đang chạy trong %s%n\",\n            taskId, Thread.currentThread().getName());\n        Thread.sleep(500);\n        return taskId * 2;  // Runnable vs Callable — Callable có return value\n    });\n}\n\npool.shutdown();           // Không nhận task mới, đợi task hiện tại hoàn thành\npool.awaitTermination(30, TimeUnit.SECONDS);  // Đợi tối đa 30s\n```\n\n### `Future` — Kết Quả Bất Đồng Bộ\n\n```java\nExecutorService pool = Executors.newFixedThreadPool(2);\n\nCallable<Double> tinhToanNang = () -> {\n    Thread.sleep(2000);  // Giả lập tính toán nặng\n    return 3.14159 * 100 * 100;\n};\n\nFuture<Double> future = pool.submit(tinhToanNang);\n\n// Làm việc khác trong lúc đang tính...\nSystem.out.println(\"Đang làm việc khác...\");\n\n// Lấy kết quả — block nếu chưa xong\nDouble ketQua = future.get();  // Sẽ chờ đến khi có kết quả\nSystem.out.println(\"Kết quả: \" + ketQua);\n\npool.shutdown();\n```\n\n---\n\n## 7. `AtomicInteger` — Thread-Safe Không Cần `synchronized`\n\n```java\nimport java.util.concurrent.atomic.AtomicInteger;\n\n// ❌ int thường không an toàn khi nhiều thread đọc/ghi:\nint demLuot = 0;  // Race condition!\n\n// ✅ AtomicInteger — thread-safe, hiệu suất tốt hơn synchronized:\nAtomicInteger demLuot = new AtomicInteger(0);\n\n// Các thread dùng:\ndemLuot.incrementAndGet();   // Tương đương ++demLuot, an toàn\ndemLuot.addAndGet(5);        // Cộng 5, trả về giá trị mới\ndemLuot.get();               // Đọc giá trị hiện tại\n```\n\n---\n\n## 8. Volatile — Visibility Across Threads\n\n```java\n// volatile đảm bảo mọi thread đọc giá trị MỚI NHẤT từ RAM (không cache)\nprivate volatile boolean dangChay = true;\n\n// Thread 1: chạy vòng lặp\nwhile (dangChay) {\n    // làm việc...\n}\n\n// Thread 2: dừng thread 1\ndangChay = false;  // Nếu không có volatile, Thread 1 có thể không thấy sự thay đổi!\n```\n\n---\n\n## 9. Best Practices\n\n```\n✅ Minimize shared state: chia sẻ càng ít dữ liệu giữa thread càng tốt\n✅ Prefer immutable objects: thread-safe tự nhiên\n✅ Dùng thread pool (ExecutorService) thay vì tạo Thread thủ công\n✅ Dùng AtomicXxx cho biến counter đơn giản — nhanh hơn synchronized\n✅ Dùng synchronized chỉ khi cần — lock quá nhiều giảm hiệu năng\n✅ join() để đợi thread con kết thúc trước khi xử lý kết quả\n✅ Luôn shutdown() ExecutorService — tránh memory leak\n```\n\n---\n\n## Tóm Tắt — Bài 19\n\n```\n✅ Thread: luồng thực thi riêng — dùng Runnable + lambda (cách phổ biến nhất)\n✅ start() tạo thread mới, run() chạy trên thread hiện tại\n✅ Race condition: nhiều thread cùng truy cập dữ liệu chia sẻ → bug khó nhận\n✅ synchronized: chỉ 1 thread vào method/block cùng lúc\n✅ ExecutorService/thread pool: quản lý thread hiệu quả\n✅ Future<T>: lấy kết quả từ task bất đồng bộ\n✅ AtomicInteger, volatile: đồng bộ nhẹ hơn synchronized\n```\n\n---\n\n👉 **[Bài 20: Design Patterns — Mẫu Thiết Kế](../bai-20-design-patterns/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 19: Multithreading\n\n> 🎯 **Bối cảnh dự án:** Xử lý **concurrent operations** — nhiều user cùng mua hàng, background tasks, async notification.\n\n---\n\n## 🔴 Bài Tập 1: Concurrent Inventory ⭐⭐\n\n**Bối cảnh thực tế:** Flash sale: 1000 người cùng ấn \"Mua\" 1 sản phẩm chỉ có 10 cái. Nếu không xử lý concurrency → overselling (bán vượt số lượng).\n\n**Yêu cầu:** Tạo `ConcurrentInventory.java`:\n\n```java\npublic class ConcurrentInventory {\n    private Map<String, Integer> stock = new ConcurrentHashMap<>();\n    private final Object lock = new Object();\n\n    public void setStock(String productId, int quantity) {\n        stock.put(productId, quantity);\n    }\n\n    // ❌ BUG VERSION: Race condition!\n    public boolean purchaseBuggy(String productId, int qty) {\n        int current = stock.getOrDefault(productId, 0);\n        if (current >= qty) {\n            // ⚠️ Giữa check và update, thread khác có thể đã thay đổi!\n            stock.put(productId, current - qty);\n            return true;\n        }\n        return false;\n    }\n\n    // ✅ FIX VERSION 1: synchronized\n    public synchronized boolean purchaseSafe(String productId, int qty) { ... }\n\n    // ✅ FIX VERSION 2: AtomicInteger (lock-free, hiệu năng cao hơn)\n    private Map<String, AtomicInteger> atomicStock = new ConcurrentHashMap<>();\n    public boolean purchaseAtomic(String productId, int qty) {\n        AtomicInteger current = atomicStock.get(productId);\n        // Dùng compareAndSet loop\n    }\n}\n\n// TEST: 100 thread cùng mua 1 sản phẩm (stock = 10)\n// Kỳ vọng: chỉ 10 thread mua được, 90 thread bị từ chối\n// Chạy test 3 phiên bản và so sánh kết quả\n```\n\n**Test code:**\n```java\nConcurrentInventory inv = new ConcurrentInventory();\ninv.setStock(\"RZ-001\", 10);\n\nExecutorService executor = Executors.newFixedThreadPool(100);\nAtomicInteger successCount = new AtomicInteger(0);\n\nfor (int i = 0; i < 100; i++) {\n    executor.submit(() -> {\n        if (inv.purchaseSafe(\"RZ-001\", 1)) {\n            successCount.incrementAndGet();\n        }\n    });\n}\n\nexecutor.shutdown();\nexecutor.awaitTermination(10, TimeUnit.SECONDS);\n\nSystem.out.println(\"Mua thành công: \" + successCount.get()); // Phải = 10\nSystem.out.println(\"Stock còn lại: \" + inv.getStock(\"RZ-001\")); // Phải = 0\n```\n\n---\n\n## 🟡 Bài Tập 2: Async Notification Service ⭐⭐\n\n**Bối cảnh thực tế:** Khi đơn hàng tạo xong, gửi email + SMS + push notification ĐỒNG THỜI (không chờ nhau). Spring dùng `@Async` — đây là cách nó hoạt động bên dưới.\n\n**Yêu cầu:** Tạo `AsyncNotificationService.java`:\n\n```java\npublic class AsyncNotificationService {\n    private final ExecutorService executor = Executors.newFixedThreadPool(5);\n\n    public void notifyOrderCreated(Order order) {\n        // Gửi 3 notification song song\n        CompletableFuture<Void> emailFuture = CompletableFuture.runAsync(() -> {\n            sendEmail(order);\n        }, executor);\n\n        CompletableFuture<Void> smsFuture = CompletableFuture.runAsync(() -> {\n            sendSms(order);\n        }, executor);\n\n        CompletableFuture<Void> pushFuture = CompletableFuture.runAsync(() -> {\n            sendPushNotification(order);\n        }, executor);\n\n        // Chờ TẤT CẢ xong (hoặc timeout 5s)\n        CompletableFuture.allOf(emailFuture, smsFuture, pushFuture)\n                .orTimeout(5, TimeUnit.SECONDS)\n                .whenComplete((result, ex) -> {\n                    if (ex != null) {\n                        System.out.println(\"⚠️ Một số notification thất bại: \" + ex.getMessage());\n                    } else {\n                        System.out.println(\"✅ Tất cả notification đã gửi thành công\");\n                    }\n                });\n    }\n\n    // Giả lập delay\n    private void sendEmail(Order order) {\n        sleep(2000); // Email mất 2s\n        System.out.println(\"[EMAIL] Đã gửi cho \" + order.getBuyerEmail());\n    }\n\n    private void sendSms(Order order) {\n        sleep(1000); // SMS mất 1s\n        if (Math.random() < 0.3) throw new RuntimeException(\"SMS provider timeout\");\n        System.out.println(\"[SMS] Đã gửi cho \" + order.getBuyerPhone());\n    }\n\n    private void sendPushNotification(Order order) {\n        sleep(500); // Push nhanh nhất\n        System.out.println(\"[PUSH] Đã gửi cho device \" + order.getBuyerDeviceId());\n    }\n\n    public void shutdown() {\n        executor.shutdown();\n    }\n}\n```\n\n---\n\n## 🔴 Bài Tập 3: Background Job Scheduler ⭐⭐⭐\n\n**Bối cảnh thực tế:** Cron jobs — Spring `@Scheduled`. Hệ thống cần chạy các task định kỳ: cập nhật ranking, cleanup expired carts, generate reports.\n\n**Yêu cầu:** Tạo `JobScheduler.java`:\n\n```java\npublic class JobScheduler {\n    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(3);\n    private final Map<String, ScheduledFuture<?>> activeJobs = new ConcurrentHashMap<>();\n\n    // Đăng ký job chạy định kỳ\n    public void scheduleJob(String jobName, Runnable task, \n                            long initialDelay, long period, TimeUnit unit) {\n        ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(() -> {\n            try {\n                System.out.printf(\"[JOB] %s bắt đầu lúc %s%n\", jobName, LocalDateTime.now());\n                long start = System.currentTimeMillis();\n                task.run();\n                long duration = System.currentTimeMillis() - start;\n                System.out.printf(\"[JOB] %s hoàn thành trong %dms%n\", jobName, duration);\n            } catch (Exception e) {\n                System.out.printf(\"[JOB ERROR] %s thất bại: %s%n\", jobName, e.getMessage());\n            }\n        }, initialDelay, period, unit);\n\n        activeJobs.put(jobName, future);\n    }\n\n    // Hủy job\n    public void cancelJob(String jobName) { ... }\n\n    // Liệt kê jobs đang chạy\n    public void listActiveJobs() { ... }\n\n    public void shutdown() { ... }\n}\n\n// Đăng ký các jobs cho RaizeShop:\nJobScheduler scheduler = new JobScheduler();\n\n// 1. Cập nhật seller ranking mỗi giờ\nscheduler.scheduleJob(\"UpdateSellerRanking\", () -> {\n    // Tính ranking mới\n}, 0, 1, TimeUnit.HOURS);\n\n// 2. Xóa giỏ hàng bỏ quên mỗi 30 phút\nscheduler.scheduleJob(\"CleanupExpiredCarts\", () -> {\n    // Xóa cart > 24 giờ\n}, 0, 30, TimeUnit.MINUTES);\n\n// 3. Generate daily report mỗi ngày\nscheduler.scheduleJob(\"DailyReport\", () -> {\n    // Tạo report\n}, 0, 24, TimeUnit.HOURS);\n```\n\n---\n\n## 🟡 Bài Tập 4: Producer-Consumer — Order Queue ⭐⭐⭐\n\n**Bối cảnh thực tế:** Message Queue pattern (RabbitMQ, Kafka). Orders từ frontend → queue → backend xử lý tuần tự.\n\n```java\npublic class OrderQueue {\n    private final BlockingQueue<Order> queue = new LinkedBlockingQueue<>(100); // Max 100 pending\n\n    // Producer: Frontend submit orders\n    public void submitOrder(Order order) throws InterruptedException {\n        System.out.println(\"[SUBMIT] Đơn hàng \" + order.getId() + \" đang chờ xử lý...\");\n        queue.put(order); // Block nếu queue đầy\n    }\n\n    // Consumer: Backend process orders\n    public void startWorker(String workerId) {\n        new Thread(() -> {\n            while (!Thread.currentThread().isInterrupted()) {\n                try {\n                    Order order = queue.take(); // Block cho đến khi có đơn\n                    System.out.printf(\"[%s] Xử lý đơn %s...%n\", workerId, order.getId());\n                    processOrder(order);\n                    System.out.printf(\"[%s] ✅ Hoàn thành đơn %s%n\", workerId, order.getId());\n                } catch (InterruptedException e) {\n                    Thread.currentThread().interrupt();\n                }\n            }\n        }, workerId).start();\n    }\n}\n\n// Chạy 3 workers + 10 producers\nOrderQueue oq = new OrderQueue();\noq.startWorker(\"Worker-1\");\noq.startWorker(\"Worker-2\");\noq.startWorker(\"Worker-3\");\n\n// Giả lập 20 đơn hàng từ nhiều users\nfor (int i = 0; i < 20; i++) {\n    oq.submitOrder(new Order(\"ORD-\" + i));\n    Thread.sleep(100);\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `synchronized` vs `ReentrantLock` vs `AtomicInteger` — performance ranking? Khi nào dùng cái nào?\n- [ ] Thread pool size: CPU-bound task dùng `cores` threads, I/O-bound dùng `cores * 2` — tại sao?\n- [ ] Deadlock: viết ví dụ 2 thread lock lẫn nhau và cách detect/prevent.\n- [ ] `volatile` keyword — khác gì `synchronized`? Dùng khi nào? (Hint: visibility vs atomicity)\n\n---\n\n👉 **Tiếp theo:** [Bài 20 – Design Patterns](../bai-20-design-patterns/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Từ khóa `synchronized` trong đa luồng giải quyết vấn đề gì?",
        "options": [
          "Làm luồng chạy nhanh hơn.",
          "Ngăn Race Condition bằng cách chỉ cho một luồng vào Critical Section tại một thời điểm.",
          "Buộc luồng dừng hoạt động.",
          "Tự động chia sẻ RAM cho luồng khác."
        ],
        "answer": 1,
        "explanation": "`synchronized` thiết lập Monitor lock. Chỉ một luồng chiếm lock tại một thời điểm, các luồng khác phải đợi."
      },
      {
        "q": "Cách tạo Thread trong Java bằng cách extend Thread có điểm hạn chế gì?",
        "options": [
          "Không thể override run()",
          "Class đó không thể extend class khác (Java không có đa kế thừa)",
          "Thread không chạy được",
          "Phải gọi start() nhiều lần"
        ],
        "answer": 1,
        "explanation": "Extend Thread → class mất slot kế thừa duy nhất. Thường khuyên implements Runnable để linh hoạt hơn."
      },
      {
        "q": "Sự khác biệt giữa `start()` và `run()` của Thread?",
        "options": [
          "Giống nhau hoàn toàn",
          "start() tạo thread mới và gọi run() trong thread đó; gọi run() trực tiếp chỉ chạy trong thread hiện tại",
          "run() nhanh hơn start()",
          "start() chạy background, run() chạy foreground"
        ],
        "answer": 1,
        "explanation": "`start()` yêu cầu JVM tạo OS thread mới rồi gọi run() trong thread đó. Gọi `run()` trực tiếp là gọi phương thức bình thường, không tạo thread mới."
      },
      {
        "q": "volatile keyword trong Java làm gì?",
        "options": [
          "Tăng tốc biến",
          "Đảm bảo thay đổi biến từ một luồng được nhìn thấy ngay bởi các luồng khác (memory visibility)",
          "Ngăn luồng khác đọc biến",
          "Xóa biến sau khi dùng"
        ],
        "answer": 1,
        "explanation": "`volatile` đảm bảo biến được đọc/ghi từ main memory, không từ CPU cache. Tránh visibility issue nhưng không đảm bảo atomic."
      },
      {
        "q": "Deadlock trong Java là gì?",
        "options": [
          "Một luồng chạy quá lâu",
          "Hai hay nhiều luồng chờ nhau giải phóng lock, dẫn đến tất cả bị block vĩnh viễn",
          "Bộ nhớ bị đầy",
          "Thread chạy trước main()"
        ],
        "answer": 1,
        "explanation": "Deadlock: Thread A giữ lock 1, chờ lock 2; Thread B giữ lock 2, chờ lock 1. Cả hai chờ mãi mãi."
      },
      {
        "q": "ExecutorService trong java.util.concurrent dùng để làm gì?",
        "options": [
          "Tạo GUI",
          "Quản lý pool của thread, submit task và xử lý kết quả một cách có kiểm soát",
          "Đọc file",
          "Kết nối database"
        ],
        "answer": 1,
        "explanation": "ExecutorService quản lý thread pool: tái sử dụng thread, giới hạn số thread, xử lý kết quả qua Future."
      },
      {
        "q": "Callable<T> khác Runnable ở điểm gì?",
        "options": [
          "Callable nhanh hơn",
          "Callable có thể trả về kết quả (Future<T>) và ném checked exception; Runnable không",
          "Runnable không tạo thread",
          "Callable chỉ chạy một lần"
        ],
        "answer": 1,
        "explanation": "Runnable: `run()` void, không ném checked exception. Callable: `call()` trả về T và có thể ném Exception. Dùng với ExecutorService.submit()."
      },
      {
        "q": "Phương thức `Thread.sleep(milliseconds)` làm gì?",
        "options": [
          "Kết thúc thread",
          "Tạm dừng thread hiện tại trong khoảng thời gian chỉ định (không giải phóng lock)",
          "Tạm dừng tất cả thread",
          "Tạo thread mới sau đó ngủ"
        ],
        "answer": 1,
        "explanation": "`sleep()` tạm dừng thread hiện tại, không giải phóng lock đang giữ. Khác với `wait()` - giải phóng lock và chờ notify."
      },
      {
        "q": "AtomicInteger trong java.util.concurrent.atomic dùng để làm gì?",
        "options": [
          "Tạo số nguyên bất biến",
          "Cung cấp thao tác atomic (thread-safe) trên int mà không cần synchronized",
          "Làm số nguyên lớn hơn Integer.MAX_VALUE",
          "Lưu số nguyên trong database"
        ],
        "answer": 1,
        "explanation": "AtomicInteger cung cấp incrementAndGet(), compareAndSet()... là atomic operations không cần synchronized, hiệu suất cao hơn."
      },
      {
        "q": "Race Condition trong lập trình đa luồng xảy ra khi nào?",
        "options": [
          "Khi thread chạy quá nhanh",
          "Khi nhiều thread đồng thời đọc và ghi shared data mà không có đồng bộ hóa, dẫn đến kết quả không xác định",
          "Khi CPU quá tải",
          "Khi dùng quá nhiều thread"
        ],
        "answer": 1,
        "explanation": "Race Condition: kết quả phụ thuộc vào thứ tự thực thi thread - không xác định được. Cần synchronized/Lock/Atomic để tránh."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Đa Luồng (Multithreading)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 19: Multithreading\n\n> 🎯 **Bối cảnh dự án:** Xử lý **concurrent operations** — nhiều user cùng mua hàng, background tasks, async notification.\n\n---\n\n## 🔴 Bài Tập 1: Concurrent Inventory ⭐⭐\n\n**Bối cảnh thực tế:** Flash sale: 1000 người cùng ấn \"Mua\" 1 sản phẩm chỉ có 10 cái. Nếu không xử lý concurrency → overselling (bán vượt số lượng).\n\n**Yêu cầu:** Tạo `ConcurrentInventory.java`:\n\n```java\npublic class ConcurrentInventory {\n    private Map<String, Integer> stock = new ConcurrentHashMap<>();\n    private final Object lock = new Object();\n\n    public void setStock(String productId, int quantity) {\n        stock.put(productId, quantity);\n    }\n\n    // ❌ BUG VERSION: Race condition!\n    public boolean purchaseBuggy(String productId, int qty) {\n        int current = stock.getOrDefault(productId, 0);\n        if (current >= qty) {\n            // ⚠️ Giữa check và update, thread khác có thể đã thay đổi!\n            stock.put(productId, current - qty);\n            retu...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 20,
    "title": "Design Patterns trong Java",
    "phase": "Phase 4: Java Advanced",
    "time": "6 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 20: Design Patterns — Mẫu Thiết Kế\n\n> 🔴 **Phase 4 – Bài 2/5** | Thời gian: ~5 giờ\n\n---\n\nHãy tưởng tượng bạn gặp một vấn đề trong lập trình. Bạn nghĩ ra giải pháp, sau đó nhận ra người khác đã gặp vấn đề y hệt và đã có giải pháp tốt hơn, được kiểm chứng qua hàng thập kỷ. **Design Pattern** chính là những giải pháp đã được đặt tên và tài liệu hóa đó.\n\n23 patterns trong cuốn \"Gang of Four\" (GoF) là nền tảng. Tôi sẽ dạy bạn những cái **hay gặp nhất trong code thực tế**, không phải học thuộc tất cả 23 cái.\n\n---\n\n## 1. Tại Sao Cần Design Patterns?\n\n```\nKhông có pattern:                 Có pattern:\n- Mỗi lần gặp vấn đề tương tự   - Nhận ra ngay \"Đây là vấn đề Singleton\"\n  lại phải nghĩ lại từ đầu       - Áp dụng solution đã được kiểm chứng\n- Khó giải thích cho đồng nghiệp - Đồng nghiệp đọc code nhận ra ngay cấu trúc\n- Dễ mắc lỗi thiết kế             - Tránh được những cạm bẫy đã biết\n```\n\n---\n\n## 2. Singleton Pattern — Chỉ Một Instance Duy Nhất\n\n**Khi nào dùng:** Khi bạn cần đảm bảo **chỉ có 1 object** của một class trong toàn bộ ứng dụng. Ví dụ: connection pool, logger, config manager.\n\n```java\npublic class ConfigManager {\n    // Volatile đảm bảo thread-safe\n    private static volatile ConfigManager instance;\n\n    private String dbUrl;\n    private String dbUser;\n\n    // Constructor private — ngăn new từ bên ngoài\n    private ConfigManager() {\n        dbUrl = \"jdbc:mysql://localhost:3306/raizeshop\";\n        dbUser = \"root\";\n        System.out.println(\"ConfigManager khởi tạo (1 lần duy nhất)\");\n    }\n\n    // Thread-safe lazy initialization (double-checked locking)\n    public static ConfigManager getInstance() {\n        if (instance == null) {\n            synchronized (ConfigManager.class) {\n                if (instance == null) {\n                    instance = new ConfigManager();\n                }\n            }\n        }\n        return instance;\n    }\n\n    public String getDbUrl()  { return dbUrl; }\n    public String getDbUser() { return dbUser; }\n}\n\n// Dùng:\nConfigManager cfg1 = ConfigManager.getInstance();\nConfigManager cfg2 = ConfigManager.getInstance();\nSystem.out.println(cfg1 == cfg2);  // true — cùng object!\nSystem.out.println(cfg1.getDbUrl());\n```\n\n### Enum Singleton — Đơn Giản Và An Toàn Hơn\n\n```java\npublic enum AppConfig {\n    INSTANCE;   // Enum đảm bảo chỉ có 1 instance — kể cả khi serialize/thread\n\n    private final String dbUrl = \"jdbc:mysql://localhost/raizeshop\";\n    public String getDbUrl() { return dbUrl; }\n}\n\n// Dùng:\nAppConfig.INSTANCE.getDbUrl();\n```\n\n---\n\n## 3. Factory Method Pattern — Tạo Object Linh Hoạt\n\n**Khi nào dùng:** Khi muốn tạo object mà không muốn hard-code tên class cụ thể. Caller chỉ biết interface, factory lo phần còn lại.\n\n```java\npublic interface ThongBao {\n    void gui(String nguoiNhan, String noiDung);\n}\n\nclass EmailThongBao implements ThongBao {\n    public void gui(String nguoiNhan, String noiDung) {\n        System.out.println(\"📧 Email → \" + nguoiNhan + \": \" + noiDung);\n    }\n}\n\nclass SMSThongBao implements ThongBao {\n    public void gui(String nguoiNhan, String noiDung) {\n        System.out.println(\"📱 SMS → \" + nguoiNhan + \": \" + noiDung);\n    }\n}\n\nclass TelegramThongBao implements ThongBao {\n    public void gui(String nguoiNhan, String noiDung) {\n        System.out.println(\"✈️ Telegram → \" + nguoiNhan + \": \" + noiDung);\n    }\n}\n\n// Factory — trả về đúng loại ThongBao theo tên\npublic class ThongBaoFactory {\n    public static ThongBao create(String loai) {\n        return switch (loai.toUpperCase()) {\n            case \"EMAIL\"    -> new EmailThongBao();\n            case \"SMS\"      -> new SMSThongBao();\n            case \"TELEGRAM\" -> new TelegramThongBao();\n            default -> throw new IllegalArgumentException(\"Loại thông báo không hỗ trợ: \" + loai);\n        };\n    }\n}\n\n// Caller không cần biết class cụ thể:\nString loai = \"email\";  // Có thể đến từ config/database\nThongBao tb = ThongBaoFactory.create(loai);\ntb.gui(\"user@mail.com\", \"Đơn hàng của bạn đã xác nhận!\");\n```\n\n---\n\n## 4. Builder Pattern — Tạo Object Phức Tạp Từng Bước\n\n**Khi nào dùng:** Khi object có **nhiều field optional**, tránh constructor với 10+ tham số.\n\n```java\n// Không có Builder — constructor ngày càng dài:\npublic DonHang(String nguoiMua, String diaChi, List<SanPham> items,\n               String phuongThucThanhToan, String phuongThucGiaoHang,\n               String ghiChu, Double maGiamGia, LocalDateTime thoiGianYeuCau) { ... }\n// Bạn có nhớ nổi thứ tự tham số không?\n\n// Builder pattern:\npublic class DonHang {\n    private final String nguoiMua;\n    private final String diaChi;\n    private final List<SanPham> items;\n    private final String phuongThucThanhToan;\n    private final String ghiChu;\n    private final Double maGiamGia;\n\n    private DonHang(Builder builder) {\n        this.nguoiMua = builder.nguoiMua;\n        this.diaChi = builder.diaChi;\n        this.items = builder.items;\n        this.phuongThucThanhToan = builder.phuongThucThanhToan;\n        this.ghiChu = builder.ghiChu;\n        this.maGiamGia = builder.maGiamGia;\n    }\n\n    public static class Builder {\n        // Required\n        private final String nguoiMua;\n        private final String diaChi;\n        // Optional\n        private List<SanPham> items = new ArrayList<>();\n        private String phuongThucThanhToan = \"COD\";\n        private String ghiChu = \"\";\n        private Double maGiamGia = null;\n\n        public Builder(String nguoiMua, String diaChi) {\n            this.nguoiMua = nguoiMua;\n            this.diaChi = diaChi;\n        }\n\n        public Builder items(List<SanPham> items) { this.items = items; return this; }\n        public Builder thanhToanQua(String pp) { this.phuongThucThanhToan = pp; return this; }\n        public Builder ghiChu(String gc) { this.ghiChu = gc; return this; }\n        public Builder giamGia(Double ma) { this.maGiamGia = ma; return this; }\n\n        public DonHang build() {\n            if (items.isEmpty()) throw new IllegalStateException(\"Đơn hàng phải có sản phẩm!\");\n            return new DonHang(this);\n        }\n    }\n}\n\n// Dùng — rõ ràng, đọc như tiếng Anh:\nDonHang don = new DonHang.Builder(\"Raize99\", \"123 Đường ABC, Hà Nội\")\n    .items(gioHang.getItems())\n    .thanhToanQua(\"MOMO\")\n    .ghiChu(\"Giao buổi chiều\")\n    .giamGia(0.15)  // Giảm 15%\n    .build();\n```\n\n---\n\n## 5. Observer Pattern — Đăng Ký Nhận Thông Báo\n\n**Khi nào dùng:** Khi một object thay đổi trạng thái cần tự động thông báo đến nhiều observer. Đây là nền tảng của event system, Spring Application Events.\n\n```java\n// Observer interface\npublic interface DonHangObserver {\n    void onDonHangThayDoi(String maDon, String trangThaiMoi);\n}\n\n// Subject\npublic class DonHang {\n    private String maDon;\n    private String trangThai;\n    private List<DonHangObserver> observers = new ArrayList<>();\n\n    public void themObserver(DonHangObserver o)  { observers.add(o); }\n    public void xoaObserver(DonHangObserver o)   { observers.remove(o); }\n\n    public void capNhatTrangThai(String trangThaiMoi) {\n        this.trangThai = trangThaiMoi;\n        // Thông báo tất cả observers\n        for (DonHangObserver o : observers) {\n            o.onDonHangThayDoi(maDon, trangThaiMoi);\n        }\n    }\n}\n\n// Các concrete observer\nclass EmailNotifier implements DonHangObserver {\n    public void onDonHangThayDoi(String maDon, String trangThai) {\n        System.out.println(\"📧 Email: Đơn \" + maDon + \" → \" + trangThai);\n    }\n}\n\nclass LogService implements DonHangObserver {\n    public void onDonHangThayDoi(String maDon, String trangThai) {\n        System.out.println(\"[LOG] \" + maDon + \": \" + trangThai);\n    }\n}\n\n// Dùng:\nDonHang don = new DonHang(\"DH001\");\ndon.themObserver(new EmailNotifier());\ndon.themObserver(new LogService());\n\ndon.capNhatTrangThai(\"CONFIRMED\");   // Tự động gửi email + ghi log\ndon.capNhatTrangThai(\"SHIPPED\");     // Lại tự động thông báo\n```\n\n---\n\n## 6. Strategy Pattern — Đổi Thuật Toán Linh Hoạt\n\n**Khi nào dùng:** Khi có nhiều thuật toán/chiến lược cho cùng một task, muốn đổi linh hoạt.\n\n```java\n// Strategy interface\n@FunctionalInterface\npublic interface ChienLuocGiam {\n    double tinh(double giaGoc);\n}\n\n// Các chiến lược\nChienLuocGiam khongGiam   = gia -> gia;\nChienLuocGiam giam10Phan  = gia -> gia * 0.9;\nChienLuocGiam giam30Phan  = gia -> gia * 0.7;\nChienLuocGiam giamCoDiv   = gia -> gia > 1_000_000 ? gia - 200_000 : gia;\n\n// Context sử dụng strategy\npublic class GioHang {\n    private ChienLuocGiam chienLuoc = gia -> gia;  // Mặc định không giảm\n\n    public void apDungMaGiam(String maGiam) {\n        this.chienLuoc = switch (maGiam.toUpperCase()) {\n            case \"RAIZE10\"  -> gia -> gia * 0.9;\n            case \"RAIZE30\"  -> gia -> gia * 0.7;\n            case \"VIP200K\"  -> gia -> Math.max(gia - 200_000, 0);\n            default -> gia -> gia;  // Mã không hợp lệ → không giảm\n        };\n    }\n\n    public double tinhTong(double tongGoc) {\n        return chienLuoc.tinh(tongGoc);\n    }\n}\n\n// Dùng:\nGioHang gio = new GioHang();\nSystem.out.printf(\"Giá gốc: %,.0f đ%n\", gio.tinhTong(2_000_000));  // 2,000,000\n\ngio.apDungMaGiam(\"RAIZE30\");\nSystem.out.printf(\"Sau giảm 30%%: %,.0f đ%n\", gio.tinhTong(2_000_000));  // 1,400,000\n```\n\n---\n\n## 7. Tổng Hợp Patterns Hay Dùng\n\n| Pattern | Nhóm | Dùng Khi |\n|---------|-------|----------|\n| **Singleton** | Creational | Cần 1 instance duy nhất |\n| **Factory Method** | Creational | Tạo object linh hoạt, caller không biết class cụ thể |\n| **Builder** | Creational | Object nhiều field optional |\n| **Observer** | Behavioral | Một thay đổi → nhiều bên cần biết |\n| **Strategy** | Behavioral | Nhiều thuật toán, đổi linh hoạt |\n| **Template Method** | Behavioral | Định nghĩa flow, detail do subclass xử lý |\n| **Decorator** | Structural | Thêm tính năng mà không sửa class gốc |\n| **Repository** | Architectural | Tách biệt logic và data access layer |\n\n---\n\n## Tóm Tắt — Bài 20\n\n```\n✅ Design Pattern = giải pháp đã được kiểm chứng cho vấn đề phổ biến\n✅ Singleton: 1 instance, lazy init thread-safe (hoặc dùng Enum)\n✅ Factory: tạo object qua factory, caller không biết class cụ thể\n✅ Builder: tạo object phức tạp fluent-style, tránh constructor nhiều tham số\n✅ Observer: subject tự thông báo đến nhiều listeners khi thay đổi\n✅ Strategy: swappable algorithms — dùng Functional Interface cho ngắn gọn\n✅ QUAN TRỌNG: Đừng over-engineer — chỉ dùng pattern khi thực sự cần!\n```\n\n---\n\n👉 **[Bài 21: Reflection & Annotations](../bai-21-reflection-annotations/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 20: Design Patterns\n\n> 🎯 **Bối cảnh dự án:** Áp dụng **design patterns thực tế** — cách Spring Framework, Hibernate, và các thư viện Java lớn thiết kế nội bộ.\n\n---\n\n## 🔴 Bài Tập 1: Strategy + Factory — Payment System ⭐⭐\n\n**Bối cảnh thực tế:** Spring sử dụng Strategy pattern khắp nơi. PaymentService chọn strategy dựa trên input mà không cần `if-else`.\n\n**Yêu cầu:** Implement **Strategy + Factory** hoàn chỉnh:\n\n```java\n// Strategy interface\npublic interface PaymentStrategy {\n    PaymentResult process(double amount);\n    String getName();\n    double getFee(double amount);\n    boolean supports(String methodCode);\n}\n\n// Implementations\npublic class WalletStrategy implements PaymentStrategy { ... }\npublic class MoMoStrategy implements PaymentStrategy { ... }\npublic class BankTransferStrategy implements PaymentStrategy { ... }\npublic class CryptoStrategy implements PaymentStrategy { ... }\n\n// Factory — tự tìm strategy phù hợp\npublic class PaymentStrategyFactory {\n    private final List<PaymentStrategy> strategies;\n\n    public PaymentStrategyFactory() {\n        strategies = List.of(\n            new WalletStrategy(),\n            new MoMoStrategy(),\n            new BankTransferStrategy(),\n            new CryptoStrategy()\n        );\n    }\n\n    public PaymentStrategy getStrategy(String methodCode) {\n        return strategies.stream()\n                .filter(s -> s.supports(methodCode))\n                .findFirst()\n                .orElseThrow(() -> new IllegalArgumentException(\n                    \"Phương thức thanh toán không được hỗ trợ: \" + methodCode));\n    }\n}\n\n// Service — sạch sẽ, không if-else\npublic class PaymentService {\n    private final PaymentStrategyFactory factory = new PaymentStrategyFactory();\n\n    public PaymentResult pay(String method, double amount) {\n        PaymentStrategy strategy = factory.getStrategy(method);\n        double fee = strategy.getFee(amount);\n        System.out.printf(\"Thanh toán %,.0f đ qua %s (phí: %,.0f đ)%n\",\n                amount, strategy.getName(), fee);\n        return strategy.process(amount + fee);\n    }\n}\n```\n\n---\n\n## 🟡 Bài Tập 2: Observer — Event System ⭐⭐\n\n**Bối cảnh thực tế:** Spring ApplicationEvent, JavaScript addEventListener, Android BroadcastReceiver — tất cả là Observer pattern.\n\n**Yêu cầu:** Tạo `EventSystem.java`:\n\n```java\n// Event types\npublic class OrderEvent {\n    private final String type; // \"CREATED\", \"PAID\", \"SHIPPED\", \"DELIVERED\", \"CANCELLED\"\n    private final Order order;\n    private final String timestamp;\n    // ...\n}\n\n// Observer interface\n@FunctionalInterface\npublic interface OrderObserver {\n    void onEvent(OrderEvent event);\n}\n\n// Subject\npublic class OrderEventPublisher {\n    private final Map<String, List<OrderObserver>> listeners = new HashMap<>();\n\n    public void subscribe(String eventType, OrderObserver observer) {\n        listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(observer);\n    }\n\n    public void unsubscribe(String eventType, OrderObserver observer) {\n        List<OrderObserver> list = listeners.get(eventType);\n        if (list != null) list.remove(observer);\n    }\n\n    public void publish(OrderEvent event) {\n        List<OrderObserver> list = listeners.getOrDefault(event.getType(), List.of());\n        for (OrderObserver obs : list) {\n            try { obs.onEvent(event); } \n            catch (Exception e) { System.out.println(\"Observer error: \" + e.getMessage()); }\n        }\n    }\n}\n\n// Concrete observers\n// 1. EmailNotifier: gửi email khi PAID\n// 2. InventoryUpdater: giảm stock khi PAID\n// 3. AnalyticsTracker: ghi log mọi event\n// 4. SellerNotifier: báo seller khi CREATED\n// 5. RefundProcessor: hoàn tiền khi CANCELLED\n\nOrderEventPublisher publisher = new OrderEventPublisher();\npublisher.subscribe(\"PAID\", event -> sendEmail(event.getOrder()));\npublisher.subscribe(\"PAID\", event -> updateInventory(event.getOrder()));\npublisher.subscribe(\"CREATED\", event -> notifySeller(event.getOrder()));\npublisher.subscribe(\"CANCELLED\", event -> processRefund(event.getOrder()));\n\n// Khi order được thanh toán → tự động trigger tất cả listeners\npublisher.publish(new OrderEvent(\"PAID\", order));\n```\n\n---\n\n## 🟡 Bài Tập 3: Builder + Decorator — Order Builder ⭐⭐⭐\n\n**Bối cảnh thực tế:** Lombok `@Builder`, OkHttp Request.Builder, và Spring Security config đều dùng Builder. Decorator dùng cho middleware chain (filter/interceptor).\n\n**Yêu cầu:** Implement cả hai pattern:\n\n```java\n// ======= BUILDER: Tạo Order phức tạp =======\npublic class OrderBuilder {\n    private String buyerId;\n    private List<OrderItem> items = new ArrayList<>();\n    private String shippingAddress;\n    private String paymentMethod;\n    private String voucherCode;\n    private String note;\n    private boolean isGift;\n    private String giftMessage;\n\n    public OrderBuilder buyer(String buyerId) { this.buyerId = buyerId; return this; }\n    public OrderBuilder addItem(String productId, int qty) { ... return this; }\n    public OrderBuilder shippingTo(String address) { ... return this; }\n    public OrderBuilder payWith(String method) { ... return this; }\n    public OrderBuilder applyVoucher(String code) { ... return this; }\n    public OrderBuilder withNote(String note) { ... return this; }\n    public OrderBuilder asGift(String message) { ... return this; }\n\n    public Order build() {\n        // Validate bắt buộc: buyerId, ít nhất 1 item, address, payment\n        if (buyerId == null) throw new IllegalStateException(\"Buyer is required\");\n        if (items.isEmpty()) throw new IllegalStateException(\"At least 1 item required\");\n        // ...\n        return new Order(this);\n    }\n}\n\n// ======= DECORATOR: Price modifiers chain =======\npublic interface PriceCalculator {\n    double calculate(Order order);\n}\n\npublic class BasePriceCalculator implements PriceCalculator {\n    @Override\n    public double calculate(Order order) {\n        return order.getItems().stream()\n                .mapToDouble(i -> i.getPrice() * i.getQuantity())\n                .sum();\n    }\n}\n\n// Decorators\npublic class VatDecorator implements PriceCalculator {\n    private final PriceCalculator wrapped;\n    public VatDecorator(PriceCalculator wrapped) { this.wrapped = wrapped; }\n\n    @Override\n    public double calculate(Order order) {\n        return wrapped.calculate(order) * 1.10; // +10% VAT\n    }\n}\n\npublic class ShippingDecorator implements PriceCalculator { ... }\npublic class VoucherDecorator implements PriceCalculator { ... }\npublic class LoyaltyDiscountDecorator implements PriceCalculator { ... }\n\n// Chain decorators:\nPriceCalculator calculator = new LoyaltyDiscountDecorator(\n    new VoucherDecorator(\n        new ShippingDecorator(\n            new VatDecorator(\n                new BasePriceCalculator()\n            )\n        ), \"SALE20\"\n    ), \"GOLD\"\n);\n\ndouble finalPrice = calculator.calculate(order);\n```\n\n---\n\n## 🔴 Bài Tập 4: State Machine — Order Lifecycle ⭐⭐⭐\n\n**Bối cảnh thực tế:** Đơn hàng có lifecycle: CREATED → PAID → PROCESSING → SHIPPED → DELIVERED. Mỗi state chỉ cho phép chuyển sang một số state nhất định.\n\n```java\npublic interface OrderState {\n    String getName();\n    boolean canTransitionTo(String targetState);\n    void onEnter(Order order);\n    void onExit(Order order);\n}\n\npublic class CreatedState implements OrderState {\n    @Override public String getName() { return \"CREATED\"; }\n    @Override public boolean canTransitionTo(String target) {\n        return Set.of(\"PAID\", \"CANCELLED\").contains(target);\n    }\n    @Override public void onEnter(Order order) {\n        System.out.println(\"[STATE] Đơn hàng \" + order.getId() + \" đã được tạo\");\n    }\n}\n\n// Implement: PaidState, ProcessingState, ShippedState, DeliveredState, CancelledState\n\npublic class OrderStateMachine {\n    private final Map<String, OrderState> states = new HashMap<>();\n    private OrderState currentState;\n\n    public void transition(Order order, String targetState) {\n        if (!currentState.canTransitionTo(targetState)) {\n            throw new IllegalStateException(\n                \"Không thể chuyển từ \" + currentState.getName() + \" → \" + targetState);\n        }\n        currentState.onExit(order);\n        currentState = states.get(targetState);\n        currentState.onEnter(order);\n        order.setStatus(targetState);\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] Spring dùng pattern nào nhiều nhất? (Hint: Factory, Proxy, Template Method, Strategy — cho ví dụ cho mỗi cái)\n- [ ] Singleton vs Dependency Injection — Spring chọn DI thay vì Singleton. Tại sao?\n- [ ] Anti-pattern: \"God Object\" — khi nào class quá lớn cần refactor? RaizeShop có class nào đang là God Object?\n- [ ] Pattern nào giải quyết vấn đề \"thêm payment method mới mà không sửa code cũ\"? Giải thích Open/Closed Principle.\n\n---\n\n👉 **Tiếp theo:** [Bài 21 – Reflection & Annotations](../bai-21-reflection-annotations/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Design Pattern nào đảm bảo một class chỉ có duy nhất một object?",
        "options": [
          "Factory Method",
          "Builder",
          "Singleton",
          "Observer"
        ],
        "answer": 2,
        "explanation": "Singleton: private constructor + static instance + static getInstance(). Đảm bảo toàn ứng dụng chỉ có một instance duy nhất."
      },
      {
        "q": "Factory Method Pattern giải quyết vấn đề gì?",
        "options": [
          "Tạo object mà không expose logic tạo",
          "Giảm số lượng class",
          "Tăng tốc tạo object",
          "Kết hợp nhiều object"
        ],
        "answer": 0,
        "explanation": "Factory Method: định nghĩa interface tạo object nhưng để subclass quyết định class nào được tạo. Loại bỏ tight coupling với concrete class."
      },
      {
        "q": "Observer Pattern dùng để làm gì?",
        "options": [
          "Tạo đối tượng phức tạp",
          "Thiết lập mối quan hệ one-to-many: khi object thay đổi, tất cả dependents được thông báo tự động",
          "Cache dữ liệu",
          "Mã hóa dữ liệu"
        ],
        "answer": 1,
        "explanation": "Observer: Subject duy trì danh sách Observer. Khi state thay đổi, notify tất cả. Ví dụ: event listeners, MVC."
      },
      {
        "q": "Builder Pattern hữu ích khi nào?",
        "options": [
          "Khi class có ít thuộc tính",
          "Khi tạo đối tượng phức tạp có nhiều tham số tùy chọn, tránh telescoping constructors",
          "Khi cần tạo nhiều instance",
          "Khi class có nhiều subclass"
        ],
        "answer": 1,
        "explanation": "Builder tách quá trình xây dựng khỏi biểu diễn. Giải quyết problem nhiều optional params, code readable hơn."
      },
      {
        "q": "Strategy Pattern dùng để làm gì?",
        "options": [
          "Tạo chỉ một object",
          "Định nghĩa gia đình thuật toán, đóng gói từng thuật toán, cho phép hoán đổi tại runtime",
          "Quan sát thay đổi state",
          "Tạo object phức tạp"
        ],
        "answer": 1,
        "explanation": "Strategy: định nghĩa interface thuật toán, các class implement cụ thể. Client chọn strategy tại runtime."
      },
      {
        "q": "Decorator Pattern làm gì?",
        "options": [
          "Giảm số lượng class",
          "Thêm trách nhiệm động vào object mà không thay đổi class gốc, thay thế subclassing",
          "Tạo copy của object",
          "Quản lý lifecycle"
        ],
        "answer": 1,
        "explanation": "Decorator bọc object trong wrapper, thêm behavior. Linh hoạt hơn inheritance: kết hợp nhiều decorator."
      },
      {
        "q": "Các Design Pattern được chia thành mấy nhóm chính?",
        "options": [
          "2 nhóm",
          "3 nhóm: Creational, Structural, Behavioral",
          "4 nhóm",
          "5 nhóm"
        ],
        "answer": 1,
        "explanation": "GoF (Gang of Four): 23 patterns chia 3 nhóm. Creational (tạo object), Structural (tổ chức class/object), Behavioral (giao tiếp giữa object)."
      },
      {
        "q": "Adapter Pattern dùng để làm gì?",
        "options": [
          "Giảm số object",
          "Làm cho interface không tương thích có thể làm việc cùng nhau",
          "Tăng hiệu suất",
          "Cache kết quả"
        ],
        "answer": 1,
        "explanation": "Adapter (Wrapper): chuyển đổi interface của class sang interface khác. Giúp các class không tương thích cộng tác được."
      },
      {
        "q": "Template Method Pattern hoạt động như thế nào?",
        "options": [
          "Tạo template đối tượng",
          "Định nghĩa skeleton của algorithm trong lớp cha, để lớp con điền vào các bước cụ thể",
          "Copy object từ template",
          "Tạo nhiều instance từ template"
        ],
        "answer": 1,
        "explanation": "Template Method: abstract class định nghĩa bộ khung (template) của thuật toán. Subclass implement các bước abstract cụ thể."
      },
      {
        "q": "Proxy Pattern dùng để làm gì?",
        "options": [
          "Nhân bản object",
          "Cung cấp đại diện (surrogate) cho object khác để kiểm soát truy cập",
          "Tạo nhiều instance",
          "Kết hợp interface"
        ],
        "answer": 1,
        "explanation": "Proxy: đối tượng đại diện kiểm soát truy cập vào real object. Dùng cho: lazy init, access control, logging, caching."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Design Patterns trong Java\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 20: Design Patterns\n\n> 🎯 **Bối cảnh dự án:** Áp dụng **design patterns thực tế** — cách Spring Framework, Hibernate, và các thư viện Java lớn thiết kế nội bộ.\n\n---\n\n## 🔴 Bài Tập 1: Strategy + Factory — Payment System ⭐⭐\n\n**Bối cảnh thực tế:** Spring sử dụng Strategy pattern khắp nơi. PaymentService chọn strategy dựa trên input mà không cần `if-else`.\n\n**Yêu cầu:** Implement **Strategy + Factory** hoàn chỉnh:\n\n```java\n// Strategy interface\npublic interface PaymentStrategy {\n    PaymentResult process(double amount);\n    String getName();\n    double getFee(double amount);\n    boolean supports(String methodCode);\n}\n\n// Implementations\npublic class WalletStrategy implements PaymentStrategy { ... }\npublic class MoMoStrategy implements PaymentStrategy { ... }\npublic class BankTransferStrategy implements PaymentStrategy { ... }\npublic class CryptoStrategy implements PaymentStrategy { ... }\n\n// Factory — tự tìm strategy phù hợp\npublic class PaymentStrategyFactory {\n...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 21,
    "title": "Reflection & Annotations",
    "phase": "Phase 4: Java Advanced",
    "time": "4 giờ",
    "difficulty": "Rất Khó",
    "theory": "﻿# Bài 21: Reflection & Annotations\n\n> 🔴 **Phase 4 – Bài 3/5** | Thời gian: ~3 giờ\n\n---\n\nBạn có bao giờ thắc mắc **Spring Boot hoạt động thế nào?** Tại sao chỉ cần gắn `@Controller`, `@Autowired`, `@GetMapping` là mọi thứ tự hoạt động? Đây là điều kỳ diệu bạn sắp học — **Reflection và Annotations**.\n\n---\n\n## 1. Annotation — Gắn Nhãn Vào Code\n\nAnnotation là **siêu dữ liệu (metadata)** gắn vào class, method, field. Bản thân annotation không làm gì — nhưng framework đọc chúng và thực hiện hành động.\n\n```java\n// Annotation có sẵn trong Java:\n@Override          // Compiler kiểm tra — đây có thực sự override không?\n@Deprecated        // Đánh dấu method cũ, không nên dùng nữa\n@SuppressWarnings  // Tắt cảnh báo compiler cụ thể\n@FunctionalInterface // Kiểm tra interface có đúng 1 abstract method\n\n// Annotation của frameworks:\n@SpringBootApplication  // Spring Boot app\n@RestController         // HTTP REST controller\n@Autowired              // Dependency injection\n@Entity                 // JPA entity (map vào DB table)\n@NotNull                // Validation\n```\n\n---\n\n## 2. Tạo Custom Annotation\n\n```java\nimport java.lang.annotation.*;\n\n// @interface = khai báo annotation\n@Retention(RetentionPolicy.RUNTIME)  // Giữ lại đến runtime (quan trọng!)\n@Target(ElementType.METHOD)           // Chỉ dùng trên method\npublic @interface KiemTraPhanQuyen {\n    String[] roles() default {\"USER\"};  // Tham số của annotation\n    String message() default \"Không có quyền truy cập!\";\n}\n\n// Annotation khác cho field:\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface BatBuoc {\n    String thuongBao() default \"Trường này bắt buộc!\";\n    int doTaiMin() default 1;\n    int doTaiMax() default 255;\n}\n\n// Dùng:\npublic class UserController {\n    @KiemTraPhanQuyen(roles = {\"ADMIN\"}, message = \"Chỉ Admin mới xóa được!\")\n    public void xoaNguoiDung(int id) { /* ... */ }\n\n    @KiemTraPhanQuyen(roles = {\"USER\", \"ADMIN\"})\n    public void xemHoSo() { /* ... */ }\n}\n\npublic class NguoiDung {\n    @BatBuoc(doTaiMin = 4, doTaiMax = 20)\n    private String username;\n\n    @BatBuoc(thuongBao = \"Email không được để trống\")\n    private String email;\n}\n```\n\n---\n\n## 3. Reflection — Kiểm Tra Class Lúc Runtime\n\n**Reflection** = Khả năng kiểm tra và thao tác vào cấu trúc class **khi đang chạy** (runtime), không phải compile time.\n\n```java\nimport java.lang.reflect.*;\n\n// Lấy Class object\nClass<?> cls = NguoiDung.class;\n// Hoặc:\nNguoiDung u = new NguoiDung(\"test\", \"test@mail.com\");\nClass<?> cls2 = u.getClass();\n// Hoặc từ tên string:\nClass<?> cls3 = Class.forName(\"com.example.NguoiDung\");\n\n// Khám phá thông tin class\nSystem.out.println(cls.getName());        // \"com.example.NguoiDung\"\nSystem.out.println(cls.getSimpleName()); // \"NguoiDung\"\nSystem.out.println(cls.getSuperclass().getSimpleName()); // \"Object\"\n\n// Lấy tất cả methods\nfor (Method m : cls.getDeclaredMethods()) {\n    System.out.printf(\"Method: %s(%s) → %s%n\",\n        m.getName(),\n        Arrays.stream(m.getParameterTypes())\n              .map(Class::getSimpleName)\n              .collect(Collectors.joining(\", \")),\n        m.getReturnType().getSimpleName());\n}\n\n// Lấy tất cả fields\nfor (Field f : cls.getDeclaredFields()) {\n    System.out.printf(\"Field: %s %s%n\", f.getType().getSimpleName(), f.getName());\n}\n```\n\n---\n\n## 4. Gọi Method Qua Reflection\n\n```java\nNguoiDung user = new NguoiDung(\"raize99\", \"r@mail.com\");\n\n// Lấy method theo tên\nMethod getUsername = user.getClass().getMethod(\"getUsername\");\n\n// Gọi method\nString username = (String) getUsername.invoke(user);  // Gọi user.getUsername()\nSystem.out.println(username);  // \"raize99\"\n\n// Gọi private method (phải setAccessible)\nMethod privateMethod = user.getClass().getDeclaredMethod(\"validateUsername\", String.class);\nprivateMethod.setAccessible(true);  // Phá vỡ encapsulation — cẩn thận!\nprivateMethod.invoke(user, \"newUser\");\n```\n\n---\n\n## 5. Kết Hợp Reflection + Annotation — Cách Framework Hoạt Động\n\nĐây là phần thú vị nhất. Tôi sẽ cho bạn thấy cách xây dựng một mini validator như Bean Validation:\n\n```java\nimport java.lang.reflect.*;\n\npublic class Validator {\n\n    public static List<String> validate(Object obj) {\n        List<String> errors = new ArrayList<>();\n        Class<?> cls = obj.getClass();\n\n        // Duyệt qua tất cả fields\n        for (Field field : cls.getDeclaredFields()) {\n            field.setAccessible(true);  // Cho phép đọc private field\n\n            // Kiểm tra xem field có annotation @BatBuoc không\n            if (field.isAnnotationPresent(BatBuoc.class)) {\n                BatBuoc anno = field.getAnnotation(BatBuoc.class);\n\n                try {\n                    Object value = field.get(obj);\n\n                    // Kiểm tra null hoặc blank\n                    if (value == null || value.toString().isBlank()) {\n                        errors.add(field.getName() + \": \" + anno.thuongBao());\n                        continue;\n                    }\n\n                    // Kiểm tra độ dài\n                    String str = value.toString();\n                    if (str.length() < anno.doTaiMin()) {\n                        errors.add(field.getName() + \": Phải có ít nhất \" + anno.doTaiMin() + \" ký tự\");\n                    }\n                    if (str.length() > anno.doTaiMax()) {\n                        errors.add(field.getName() + \": Không được quá \" + anno.doTaiMax() + \" ký tự\");\n                    }\n\n                } catch (IllegalAccessException e) {\n                    errors.add(\"Không thể đọc field: \" + field.getName());\n                }\n            }\n        }\n\n        return errors;\n    }\n}\n\n// Demo:\npublic class Demo {\n    public static void main(String[] args) {\n        NguoiDung invalidUser = new NguoiDung(\"ab\", \"\");  // username ngắn, email trống\n\n        List<String> errors = Validator.validate(invalidUser);\n        if (errors.isEmpty()) {\n            System.out.println(\"✅ Dữ liệu hợp lệ!\");\n        } else {\n            System.out.println(\"❌ Lỗi validation:\");\n            errors.forEach(e -> System.out.println(\"  - \" + e));\n        }\n    }\n}\n```\n\nĐây chính xác là cách **Hibernate Validator, Spring Validation** hoạt động bên dưới!\n\n---\n\n## 6. Lưu Ý Về Reflection\n\n```\n✅ Dùng để: build framework, serialization, dependency injection, validation\n⚠️ KHÔNG lạm dụng: Reflection chậm hơn gọi trực tiếp ~10-100 lần\n⚠️ Phá vỡ type safety: compiler không kiểm tra được\n⚠️ setAccessible(true): phá vỡ encapsulation — code bình thường không nên dùng\n⚠️ Từ Java 9: module system giới hạn reflection — cần cấu hình module-info\n```\n\n---\n\n## Tóm Tắt — Bài 21\n\n```\n✅ Annotation = metadata gắn vào code, bản thân không làm gì\n✅ @Retention(RUNTIME): cần để reflection đọc được lúc runtime\n✅ @Target: xác định annotation dùng được ở đâu (class, method, field...)\n✅ Reflection: đọc cấu trúc class và gọi method/field lúc runtime\n✅ Class.getMethod() / getDeclaredMethod(): lấy method (getDeclared = kể cả private)\n✅ method.invoke(obj, args): gọi method qua reflection\n✅ annotation + reflection = nền tảng của Spring, Hibernate, JUnit\n```\n\n---\n\n👉 **[Bài 22: JVM Internals — Bộ Nhớ và Garbage Collection](../bai-22-jvm-internals/README.md)**\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 21: Reflection & Annotations\n\n> 🎯 **Bối cảnh dự án:** Hiểu **cách Spring Boot hoạt động** bên dưới — `@Autowired`, `@Entity`, `@GetMapping` đều dùng reflection + annotations.\n\n---\n\n## 🔴 Bài Tập 1: Custom Annotations — Validation Framework ⭐⭐\n\n**Bối cảnh thực tế:** Bean Validation (`@NotNull`, `@Size`, `@Email`) hoạt động bằng cách tạo custom annotation → reflection đọc annotation → chạy logic validation.\n\n**Yêu cầu:** Tạo mini validation framework:\n\n```java\n// Custom annotations\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface NotEmpty {\n    String message() default \"Không được để trống\";\n}\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface Range {\n    double min();\n    double max();\n    String message() default \"Giá trị ngoài phạm vi cho phép\";\n}\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface MaxLength {\n    int value();\n    String message() default \"Vượt quá độ dài cho phép\";\n}\n\n// Sử dụng trên Product class\npublic class Product {\n    @NotEmpty(message = \"Tên sản phẩm bắt buộc\")\n    @MaxLength(value = 100, message = \"Tên tối đa 100 ký tự\")\n    private String name;\n\n    @Range(min = 1000, max = 999_999_999, message = \"Giá phải từ 1,000 đến 999,999,999\")\n    private double price;\n\n    @Range(min = 0, max = 9999)\n    private int stock;\n}\n\n// Validation Engine dùng reflection\npublic class ValidationEngine {\n    public static List<String> validate(Object obj) {\n        List<String> errors = new ArrayList<>();\n        Class<?> clazz = obj.getClass();\n\n        for (Field field : clazz.getDeclaredFields()) {\n            field.setAccessible(true);\n            try {\n                Object value = field.get(obj);\n\n                // Check @NotEmpty\n                if (field.isAnnotationPresent(NotEmpty.class)) {\n                    NotEmpty ann = field.getAnnotation(NotEmpty.class);\n                    if (value == null || (value instanceof String s && s.isBlank())) {\n                        errors.add(field.getName() + \": \" + ann.message());\n                    }\n                }\n\n                // Check @Range\n                if (field.isAnnotationPresent(Range.class)) {\n                    Range ann = field.getAnnotation(Range.class);\n                    if (value instanceof Number num) {\n                        double val = num.doubleValue();\n                        if (val < ann.min() || val > ann.max()) {\n                            errors.add(field.getName() + \": \" + ann.message()\n                                    + \" [\" + ann.min() + \" - \" + ann.max() + \"]\");\n                        }\n                    }\n                }\n\n                // Check @MaxLength\n                // TODO: Implement\n            } catch (IllegalAccessException e) {\n                errors.add(\"Cannot access field: \" + field.getName());\n            }\n        }\n        return errors;\n    }\n}\n\n// Test\nProduct p = new Product(\"\", -5000, -1);\nList<String> errors = ValidationEngine.validate(p);\n// name: Tên sản phẩm bắt buộc\n// price: Giá phải từ 1,000 đến 999,999,999 [1000.0 - 9.99999999E8]\n// stock: Giá trị ngoài phạm vi cho phép [0.0 - 9999.0]\n```\n\n---\n\n## 🟡 Bài Tập 2: Mini Object Mapper (JSON Serializer) ⭐⭐\n\n**Bối cảnh thực tế:** Jackson `@JsonProperty`, Gson — tất cả dùng reflection để convert Object ↔ JSON. Bạn sẽ build phiên bản mini.\n\n**Yêu cầu:** Tạo `JsonMapper.java`:\n\n```java\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface JsonField {\n    String name() default \"\";     // Tên field trong JSON (default = field name)\n    boolean ignore() default false; // Bỏ qua field này khi serialize\n}\n\npublic class Product {\n    @JsonField(name = \"product_id\")\n    private String id;\n\n    @JsonField\n    private String name;\n\n    @JsonField(name = \"unit_price\")\n    private double price;\n\n    @JsonField(ignore = true)\n    private String internalNote; // Không xuất ra JSON!\n\n    private int stock; // Không có @JsonField → vẫn include (default behavior)\n}\n\npublic class JsonMapper {\n    // Object → JSON string\n    public static String toJson(Object obj) {\n        StringBuilder sb = new StringBuilder(\"{\\n\");\n        // Dùng reflection đọc fields + annotations\n        // ...\n        return sb.toString();\n    }\n\n    // JSON string → Object (basic parser)\n    public static <T> T fromJson(String json, Class<T> clazz) {\n        T instance = clazz.getDeclaredConstructor().newInstance();\n        // Parse JSON → set fields via reflection\n        return instance;\n    }\n}\n\n// Test\nProduct p = new Product(\"RZ-001\", \"Kiếm Rồng\", 1_500_000, \"secret note\", 5);\nString json = JsonMapper.toJson(p);\nSystem.out.println(json);\n// {\n//   \"product_id\": \"RZ-001\",\n//   \"name\": \"Kiếm Rồng\",\n//   \"unit_price\": 1500000.0,\n//   \"stock\": 5\n// }\n// Không có internalNote!\n```\n\n---\n\n## 🔴 Bài Tập 3: Mini Dependency Injection Container ⭐⭐⭐\n\n**Bối cảnh thực tế:** Đây là cách Spring IoC Container hoạt động bên dưới! `@Autowired` = inject dependency qua reflection.\n\n**Yêu cầu:** Tạo `DiContainer.java`:\n\n```java\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.TYPE)\npublic @interface Component {\n    String name() default \"\";\n}\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface Inject {} // Như @Autowired\n\n@Component\npublic class ProductRepository {\n    public Product findById(String id) { ... }\n}\n\n@Component\npublic class ProductService {\n    @Inject\n    private ProductRepository repository; // Tự động inject!\n\n    public Product getProduct(String id) {\n        return repository.findById(id);\n    }\n}\n\n// Container\npublic class DiContainer {\n    private Map<Class<?>, Object> beans = new HashMap<>();\n\n    // Scan và đăng ký tất cả @Component classes\n    public void register(Class<?>... classes) {\n        for (Class<?> clazz : classes) {\n            if (clazz.isAnnotationPresent(Component.class)) {\n                Object instance = clazz.getDeclaredConstructor().newInstance();\n                beans.put(clazz, instance);\n            }\n        }\n    }\n\n    // Inject dependencies\n    public void injectAll() {\n        for (Object bean : beans.values()) {\n            for (Field field : bean.getClass().getDeclaredFields()) {\n                if (field.isAnnotationPresent(Inject.class)) {\n                    Object dependency = beans.get(field.getType());\n                    if (dependency != null) {\n                        field.setAccessible(true);\n                        field.set(bean, dependency);\n                    }\n                }\n            }\n        }\n    }\n\n    @SuppressWarnings(\"unchecked\")\n    public <T> T getBean(Class<T> clazz) {\n        return (T) beans.get(clazz);\n    }\n}\n\n// Sử dụng — giống Spring context!\nDiContainer container = new DiContainer();\ncontainer.register(ProductRepository.class, ProductService.class);\ncontainer.injectAll();\n\nProductService service = container.getBean(ProductService.class);\nProduct p = service.getProduct(\"RZ-001\"); // ProductRepository được inject tự động!\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] `@Retention(RUNTIME)` vs `@Retention(SOURCE)` vs `@Retention(CLASS)` — Lombok dùng loại nào? Spring dùng loại nào? Tại sao khác nhau?\n- [ ] Reflection performance: gọi method qua reflection chậm hơn bao nhiêu lần so với gọi trực tiếp? Tại sao Spring cache reflection metadata?\n- [ ] Security: `field.setAccessible(true)` phá vỡ encapsulation. Trong production, điều này có nên dùng không?\n- [ ] Bài 3 (DI Container): circular dependency xảy ra khi nào? A inject B, B inject A → Spring xử lý thế nào?\n\n---\n\n👉 **Tiếp theo:** [Bài 22 – JVM Internals](../bai-22-jvm-internals/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Java Reflection API cho phép làm gì ở runtime?",
        "options": [
          "Biên dịch lại mã nguồn đang chạy.",
          "Kiểm tra cấu trúc class, truy cập/chỉnh sửa field và gọi method động, kể cả private.",
          "Chỉ đọc Annotation.",
          "Tăng tốc chương trình bằng cách bypass JVM."
        ],
        "answer": 1,
        "explanation": "Reflection: inspect class structure, invoke methods, access fields tại runtime. Dùng Class.forName(), getDeclaredMethods()..."
      },
      {
        "q": "Annotation `@Retention(RetentionPolicy.RUNTIME)` có nghĩa gì?",
        "options": [
          "Annotation chỉ tồn tại trong source code",
          "Annotation tồn tại đến runtime và có thể đọc qua Reflection",
          "Annotation bị xóa sau compile",
          "Annotation chỉ cho compiler"
        ],
        "answer": 1,
        "explanation": "RetentionPolicy.RUNTIME: annotation được lưu trong bytecode và có thể đọc bằng Reflection khi chạy. SOURCE và CLASS thì không."
      },
      {
        "q": "Để lấy Class object của String tại runtime, dùng cách nào?",
        "options": [
          "String.getClass()",
          "String.class hoặc Class.forName(\"java.lang.String\")",
          "new Class(String)",
          "ClassLoader.load(String)"
        ],
        "answer": 1,
        "explanation": "Cách 1: `String.class` (biết kiểu tại compile time). Cách 2: `Class.forName(\"java.lang.String\")` (biết tên class là String lúc runtime)."
      },
      {
        "q": "setAccessible(true) trong Reflection dùng để làm gì?",
        "options": [
          "Tăng quyền truy cập Java application",
          "Bỏ qua kiểm tra access modifier, cho phép truy cập field/method private",
          "Tạo object không cần constructor",
          "Gọi native methods"
        ],
        "answer": 1,
        "explanation": "`field.setAccessible(true)` bỏ qua `private` modifier, cho phép đọc/ghi. Dùng trong framework, testing."
      },
      {
        "q": "Custom Annotation trong Java tạo bằng cú pháp nào?",
        "options": [
          "class @MyAnnotation {}",
          "@interface MyAnnotation {}",
          "annotation MyAnnotation {}",
          "@Annotation class MyAnnotation {}"
        ],
        "answer": 1,
        "explanation": "Custom annotation dùng `@interface`: `public @interface MyAnnotation { String value(); }`. Các element là methods."
      },
      {
        "q": "@Target annotation trong Java dùng để làm gì?",
        "options": [
          "Chỉ định ai có thể dùng annotation này",
          "Chỉ định annotation có thể áp dụng ở đâu (class, method, field, parameter...)",
          "Xác định thời gian sống của annotation",
          "Đặt tên cho annotation"
        ],
        "answer": 1,
        "explanation": "`@Target(ElementType.METHOD)` chỉ annotation có thể dùng trên method. `ElementType.TYPE` cho class, `FIELD` cho field..."
      },
      {
        "q": "getDeclaredMethods() khác getMethods() như thế nào?",
        "options": [
          "Hoàn toàn giống nhau",
          "getDeclaredMethods(): tất cả method của class (kể cả private), không kể inherited. getMethods(): chỉ public methods kể cả inherited.",
          "getMethods(): nhanh hơn",
          "getDeclaredMethods(): chỉ public methods"
        ],
        "answer": 1,
        "explanation": "getDeclaredMethods(): tất cả methods của class (public/protected/private/package), không bao gồm inherited. getMethods(): public methods kể cả từ superclass."
      },
      {
        "q": "Reflection có nhược điểm gì?",
        "options": [
          "Không có nhược điểm",
          "Chậm hơn direct invocation, bypass type-safety, có thể vi phạm encapsulation và security",
          "Chỉ dùng được với primitive",
          "Không dùng được với Collections"
        ],
        "answer": 1,
        "explanation": "Reflection chậm hơn, bypass compile-time checks, khó đọc code, có thể vi phạm encapsulation. Chỉ dùng khi thực sự cần (frameworks, tools)."
      },
      {
        "q": "Framework nào trong Java sử dụng Reflection nhiều nhất?",
        "options": [
          "Java Collections",
          "Spring (DI/IoC), Hibernate (ORM), JUnit (test runner)",
          "Java Streams",
          "JavaFX"
        ],
        "answer": 1,
        "explanation": "Spring dùng Reflection để inject dependencies, scan annotations. Hibernate map entity class sang table. JUnit tìm và chạy @Test methods."
      },
      {
        "q": "Annotation `@Deprecated` thông báo điều gì?",
        "options": [
          "Phương thức bị xóa khỏi Java",
          "API đó lỗi thời, không nên dùng, có thể bị xóa trong tương lai",
          "Phương thức có bug",
          "Phương thức private"
        ],
        "answer": 1,
        "explanation": "`@Deprecated` đánh dấu API lỗi thời. Compiler sẽ warning khi dùng. Nên dùng replacement mới hơn."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Reflection & Annotations\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 21: Reflection & Annotations\n\n> 🎯 **Bối cảnh dự án:** Hiểu **cách Spring Boot hoạt động** bên dưới — `@Autowired`, `@Entity`, `@GetMapping` đều dùng reflection + annotations.\n\n---\n\n## 🔴 Bài Tập 1: Custom Annotations — Validation Framework ⭐⭐\n\n**Bối cảnh thực tế:** Bean Validation (`@NotNull`, `@Size`, `@Email`) hoạt động bằng cách tạo custom annotation → reflection đọc annotation → chạy logic validation.\n\n**Yêu cầu:** Tạo mini validation framework:\n\n```java\n// Custom annotations\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface NotEmpty {\n    String message() default \"Không được để trống\";\n}\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface Range {\n    double min();\n    double max();\n    String message() default \"Giá trị ngoài phạm vi cho phép\";\n}\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.FIELD)\npublic @interface MaxLength {\n    int value();\n    String message() default \"Vượt quá ...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 22,
    "title": "JVM Internals — Bộ Nhớ và Garbage Collection",
    "phase": "Phase 4: Java Advanced",
    "time": "5 giờ",
    "difficulty": "Rất Khó",
    "theory": "# Bài 22: JVM Internals — Bộ Nhớ và Garbage Collection\n\n> 🔴 **Phase 4 – Bài 4/5** | Thời gian: ~3 giờ\n\n---\n\nBạn đã code Java từ đầu nhưng luôn có \"thứ gì đó\" hoạt động bên dưới mà bạn không thấy. JVM — Java Virtual Machine — là trái tim của Java. Hiểu JVM giúp bạn viết code hiệu quả hơn, debug memory leak, tránh OutOfMemoryError, và giải thích được tại sao ứng dụng chậm.\n\n---\n\n## 1. Kiến Trúc JVM\n\n```\n┌─────────────────────────────────────────────────────────┐\n│                        JVM                              │\n│                                                         │\n│  ClassLoader → Bytecode (.class) vào JVM               │\n│                                                         │\n│  Runtime Data Areas:                                    │\n│  ┌─────────┐  ┌──────┐  ┌────────┐  ┌───────────────┐  │\n│  │  Heap   │  │Stack │  │Metasp.│  │Program Counter│  │\n│  │(Objects)│  │(Vars)│  │(Class)│  │   Register    │  │\n│  └─────────┘  └──────┘  └────────┘  └───────────────┘  │\n│                                                         │\n│  Execution Engine: JIT Compiler (bytecode → machine)    │\n└─────────────────────────────────────────────────────────┘\n```\n\n---\n\n## 2. Stack vs Heap — Phân Vùng Nhớ Quan Trọng Nhất\n\nĐây là thứ giúp bạn hiểu tại sao object hoạt động như vậy (đã học sơ bài 07).\n\n### Stack — Bộ Nhớ Cục Bộ Của Method\n\n```java\npublic void tinhToan() {\n    int a = 5;           // a sống trên Stack\n    double b = 3.14;     // b sống trên Stack\n    NguoiDung u = ...;   // u (địa chỉ) sống trên Stack, object thật chỗ khác\n}\n// Khi method return → tất cả biến local bị giải phóng khỏi Stack ngay lập tức\n```\n\n**Đặc điểm Stack:**\n- Tốc độ cực nhanh (LIFO structure)\n- Kích thước nhỏ (~512KB đến 1MB mặc định)\n- Tự giải phóng khi method return\n- **StackOverflowError** = Stack đầy (thường do đệ quy vô tận)\n\n### Heap — Nơi Sống Của Object\n\n```java\nNguoiDung u = new NguoiDung(\"raize99\", \"r@m.com\");\n// u (reference) trên Stack, NguoiDung object thật trên Heap\n```\n\n**Đặc điểm Heap:**\n- Lớn hơn nhiều (mặc định 256MB đến vài GB)\n- Object sống trên Heap cho đến khi không còn reference nào trỏ vào\n- Khi hết Heap → **OutOfMemoryError: Java heap space**\n- Garbage Collector (GC) quản lý việc giải phóng\n\n---\n\n## 3. Garbage Collection — Dọn Rác Tự Động\n\nJava tự động giải phóng object không còn được dùng. **Bạn không cần (và không thể) free memory thủ công** như C/C++.\n\n```java\nNguoiDung u1 = new NguoiDung(\"An\", \"an@mail.com\");\nNguoiDung u2 = u1;   // u2 cũng trỏ vào cùng object\n\nu1 = null;         // u1 không còn trỏ vào object nữa\n// u2 vẫn trỏ → GC KHÔNG xóa object\n\nu2 = null;         // Bây giờ không còn reference nào → GC có thể xóa\n// GC sẽ xóa object lúc nào đó trong tương lai\n```\n\n**Các loại GC trong Java:**\n\n| GC | Đặc điểm | Dùng khi |\n|----|---------|---------|\n| Serial GC | Đơn giản, stop-the-world | App nhỏ, single thread |\n| G1 GC (default) | Cân bằng throughput/latency | Hầu hết cases |\n| ZGC | Pause < 1ms | Low latency (Java 15+) |\n| Shenandoah | Tương tự ZGC | Low latency |\n\n---\n\n## 4. Heap Generations — Cách GC Hoạt Động\n\n```\nHeap:\n┌──────────────────────────────────────────────────────┐\n│ Young Generation                │ Old Generation      │\n│ ┌─────────────┐ ┌────┐ ┌────┐  │                     │\n│ │    Eden     │ │ S0 │ │ S1 │  │  Long-lived objects  │\n│ │ (new alloc) │ │    │ │    │  │                     │\n│ └─────────────┘ └────┘ └────┘  │                     │\n│                                │                     │\n│   Minor GC (nhanh, thường)     │  Major GC (chậm)    │\n└──────────────────────────────────────────────────────┘\n```\n\n1. **Eden Space**: Object mới được tạo ở đây\n2. **Survivor Spaces (S0, S1)**: Object sống sót qua Minor GC được chuyển đến đây\n3. **Old Generation (Tenured)**: Object sống sót nhiều lần GC được \"promote\" vào đây\n4. **Minor GC**: Dọn Young generation — nhanh, ít ảnh hưởng\n5. **Major/Full GC**: Dọn Old generation — chậm, stop-the-world\n\n> 💡 **Bí quyết tối ưu:** Hầu hết object có lifetime ngắn (local variables, temp data). Đây là \"generational hypothesis\" — lý do tại sao phân vùng theo generation hiệu quả hơn GC đơn giản.\n\n---\n\n## 5. Metaspace — Lưu Thông Tin Class\n\n```java\n// Metaspace (Java 8+, thay thế PermGen) lưu:\n// - Class metadata (tên method, tên field...)\n// - Static variables\n// - Class literals\n\n// OutOfMemoryError: Metaspace xảy ra khi:\n// - Load quá nhiều class (dynamic class generation)\n// - Memory leak trong ClassLoader\n```\n\n---\n\n## 6. JIT Compiler — Tại Sao Java Nhanh Hơn Người Nghĩ\n\n```\nBytecode (.class)  →  Interpreter  →  JIT Compiler  →  Native Machine Code\n     (chậm)              (lần đầu)      (hot method)         (rất nhanh)\n```\n\nJIT (Just-In-Time) phát hiện **hot methods** (method gọi nhiều lần) và compile thành native machine code. Vì vậy Java app thường **chậm lúc khởi động, nhanh dần sau đó** — gọi là \"warm-up\".\n\n---\n\n## 7. Cấu Hình JVM Flags — Tinh Chỉnh Hiệu Năng\n\n```bash\n# Đặt heap size\njava -Xms512m -Xmx2g MyApp     # Min 512MB, Max 2GB heap\n\n# Bật GC logging (để phân tích)\njava -Xlog:gc:logs/gc.log MyApp\n\n# Chọn GC\njava -XX:+UseG1GC MyApp        # G1 GC (default Java 9+)\njava -XX:+UseZGC MyApp         # ZGC (Java 15+)\n\n# Profile mode\njava -XX:+PrintGCDetails MyApp\n```\n\n---\n\n## 8. Phát Hiện Memory Leak\n\nMemory leak trong Java = object không dùng nữa nhưng vẫn còn reference → GC không xóa được.\n\n```java\n// Ví dụ memory leak phổ biến:\npublic class CacheNguyHiem {\n    private static final Map<String, Object> cache = new HashMap<>();\n    // Map static luôn giữ reference → object trong cache không bao giờ bị GC\n    // Nếu thêm mãi mà không xóa → OutOfMemoryError!\n\n    // ✅ Dùng WeakHashMap — tự động xóa khi không còn reference khác:\n    private static final Map<String, Object> cachAnToan = new WeakHashMap<>();\n}\n```\n\n**Công cụ phân tích:**\n- **jvisualvm**: GUI tool xem heap, thread, CPU (có sẵn trong JDK)\n- **jmap**: dump heap snapshot\n- **jstack**: dump thread stack\n- **IntelliJ Profiler / JProfiler**: công cụ chuyên nghiệp\n\n---\n\n## Tóm Tắt — Bài 22\n\n```\n✅ Stack: biến local, tham số method — nhanh, tự giải phóng khi method return\n✅ Heap: object — lớn, được GC quản lý\n✅ StackOverflowError: Stack đầy (đệ quy vô tận)\n✅ OutOfMemoryError: Heap đầy (memory leak hoặc dữ liệu quá lớn)\n✅ GC tự động giải phóng object không còn reference\n✅ Young Gen (minor GC nhanh) → Old Gen (major GC chậm)\n✅ JIT: compile hot method → native code → Java nhanh dần khi warm up\n✅ Memory leak: object vẫn còn reference nhưng không dùng nữa\n```\n\n---\n\n👉 **[Bài 23: Testing với JUnit 5 & Mockito](../bai-23-testing/README.md)**\n",
    "exercisesMarkdown": "# Bài Tập — Bài 22: JVM Internals\n\n> 🔴 **Phase 4 – Bài 4/5** | Ôn tập: Stack, Heap, GC, JIT\n\n---\n\n## Bài 1: Phân Tích Stack vs Heap ⭐\n\nĐọc đoạn code sau và trả lời câu hỏi:\n\n```java\npublic class BaiTap1 {\n\n    static int dem = 0;      // (A)\n\n    public static void xuLy() {\n        int local = 10;      // (B)\n        String ten = \"Raize\"; // (C)\n        NguoiDung u = new NguoiDung(\"raize99\"); // (D)\n        dem++;               // (E)\n    }\n\n    public static void main(String[] args) {\n        xuLy();\n        // Sau khi xuLy() return, điều gì xảy ra với (B), (C), (D)?\n    }\n}\n```\n\n**Câu hỏi:**\n1. Biến nào sống trên **Stack**? Biến nào sống trên **Heap**?\n2. Sau khi `xuLy()` return, biến nào bị giải phóng ngay lập tức?\n3. Object `NguoiDung` tại `(D)` sẽ bị GC xóa khi nào?\n4. Biến `dem` tại `(A)` sống trên vùng nhớ nào?\n\n**Viết giải thích** (không cần code, chỉ cần giải thích bằng text/comment).\n\n---\n\n## Bài 2: StackOverflowError vs OutOfMemoryError ⭐\n\n**Yêu cầu:** Viết code tái hiện 2 lỗi sau (chỉ để hiểu, không phải để dùng trong production!):\n\n### Part A — StackOverflowError\n\n```java\npublic class StackTest {\n    // TODO: Viết method đệ quy vô tận để gây StackOverflowError\n    // Bắt exception và in ra message\n    public static void main(String[] args) {\n        try {\n            // Gọi method đệ quy vô tận\n        } catch (StackOverflowError e) {\n            System.out.println(\"StackOverflowError! Stack đã đầy.\");\n            System.out.println(\"Nguyên nhân: đệ quy không có điều kiện dừng.\");\n        }\n    }\n}\n```\n\n### Part B — OutOfMemoryError\n\n```java\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class HeapTest {\n    // TODO: Thêm object vào list không giới hạn để gây OutOfMemoryError\n    // Bắt exception, in message giải thích\n    public static void main(String[] args) {\n        try {\n            // Thêm object liên tục vào list\n        } catch (OutOfMemoryError e) {\n            System.out.println(\"OutOfMemoryError! Heap đã đầy.\");\n            System.out.println(\"Nguyên nhân: thêm quá nhiều object, GC không kịp dọn.\");\n        }\n    }\n}\n```\n\n---\n\n## Bài 3: Memory Leak — Phát Hiện và Sửa ⭐⭐\n\nĐoạn code sau có **memory leak tiềm ẩn**. Hãy xác định vấn đề và sửa:\n\n```java\nimport java.util.HashMap;\nimport java.util.Map;\n\npublic class SessionManager {\n    // ❌ Possible memory leak!\n    private static final Map<String, byte[]> sessionCache = new HashMap<>();\n\n    public static void taoSession(String sessionId) {\n        // Giả lập session data 1MB\n        byte[] data = new byte[1024 * 1024];\n        sessionCache.put(sessionId, data);\n    }\n\n    public static void xoaSession(String sessionId) {\n        sessionCache.remove(sessionId);\n    }\n\n    // Giả lập: hàng ngàn session được tạo nhưng không bao giờ gọi xoaSession\n    public static void main(String[] args) {\n        for (int i = 0; i < 1000; i++) {\n            taoSession(\"session-\" + i);\n            // Quên gọi xoaSession!\n        }\n        System.out.println(\"Sessions trong cache: \" + sessionCache.size());\n    }\n}\n```\n\n**Yêu cầu:**\n1. Giải thích tại sao đây là memory leak\n2. Sửa bằng cách dùng `WeakHashMap`\n3. Thêm một phương án nữa: giới hạn kích thước cache (xóa entry cũ nhất khi cache đầy)\n\n---\n\n## Bài 4: Garbage Collection Lifecycle ⭐⭐\n\n```java\npublic class GCDemo {\n\n    private String name;\n\n    public GCDemo(String name) {\n        this.name = name;\n        System.out.println(\"Tạo: \" + name);\n    }\n\n    @Override\n    protected void finalize() throws Throwable {\n        // finalize() được gọi khi GC chuẩn bị xóa object\n        // (Deprecated trong Java 9+, chỉ dùng để demo)\n        System.out.println(\"GC xóa: \" + name);\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        GCDemo obj1 = new GCDemo(\"Alpha\");\n        GCDemo obj2 = new GCDemo(\"Beta\");\n        GCDemo obj3 = new GCDemo(\"Gamma\");\n\n        obj1 = null;  // (1) Alpha không còn reference\n        obj2 = obj3;  // (2) Beta không còn reference, Gamma có 2 reference\n\n        // TODO: Gọi System.gc() để gợi ý JVM chạy GC\n        // TODO: Thread.sleep(1000) để chờ GC chạy\n        // TODO: In ra: obj2 và obj3 trỏ vào cùng object không?\n        //       (Kiểm tra bằng ==)\n\n        System.out.println(\"obj2 == obj3? \" + /* TODO */false);\n    }\n}\n```\n\n**Câu hỏi sau khi chạy:**\n- Object nào bị GC xóa? Tại sao?\n- `obj2 == obj3` là `true` hay `false`? Giải thích.\n\n---\n\n## Bài 5: Tối Ưu Tạo Object ⭐⭐\n\nSo sánh 2 cách viết và giải thích hiệu năng:\n\n```java\npublic class StringBenchmark {\n\n    // Cách 1: Tạo String mới trong vòng lặp\n    public static String cach1(int n) {\n        String result = \"\";\n        for (int i = 0; i < n; i++) {\n            result += \"item\" + i + \", \";  // ❌ Tạo rất nhiều String object trên Heap!\n        }\n        return result;\n    }\n\n    // Cách 2: Dùng StringBuilder\n    public static String cach2(int n) {\n        // TODO: Viết lại dùng StringBuilder\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        int n = 10_000;\n\n        long start1 = System.currentTimeMillis();\n        cach1(n);\n        long time1 = System.currentTimeMillis() - start1;\n\n        long start2 = System.currentTimeMillis();\n        cach2(n);\n        long time2 = System.currentTimeMillis() - start2;\n\n        System.out.printf(\"Cách 1 (String +): %d ms%n\", time1);\n        System.out.printf(\"Cách 2 (StringBuilder): %d ms%n\", time2);\n        System.out.printf(\"Cách 2 nhanh hơn %.1f lần%n\", (double) time1 / time2);\n    }\n}\n```\n\n**Giải thích:** Tại sao `String +` trong vòng lặp tạo nhiều object trên Heap? `StringBuilder` giải quyết vấn đề này như thế nào?\n\n---\n\n## Bài 6 (Nâng Cao): JVM Flags Thực Hành ⭐⭐⭐\n\n**Yêu cầu:** Chạy chương trình sau với các JVM flags khác nhau và so sánh kết quả:\n\n```java\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class GCMonitor {\n    public static void main(String[] args) throws InterruptedException {\n        List<byte[]> list = new ArrayList<>();\n\n        for (int round = 1; round <= 10; round++) {\n            // Thêm 50MB\n            for (int i = 0; i < 50; i++) {\n                list.add(new byte[1024 * 1024]);  // 1MB mỗi lần\n            }\n            System.out.printf(\"Round %d: Đã thêm %d MB%n\", round, round * 50);\n\n            // Xóa một nửa để GC có cơ hội\n            if (round % 2 == 0) {\n                list.subList(0, list.size() / 2).clear();\n                System.out.println(\"→ Đã xóa một nửa, gọi GC...\");\n                System.gc();\n            }\n\n            Thread.sleep(200);\n        }\n    }\n}\n```\n\n**Thử các lệnh:**\n```bash\n# Lệnh 1: Heap nhỏ, xem GC hoạt động thường xuyên\njava -Xms64m -Xmx256m -Xlog:gc GCMonitor\n\n# Lệnh 2: Heap lớn\njava -Xms512m -Xmx1g GCMonitor\n\n# Lệnh 3: Dùng ZGC (Java 15+)\njava -XX:+UseZGC -Xlog:gc GCMonitor\n```\n\n**Ghi lại:**\n- Số lần GC xảy ra ở mỗi lệnh\n- Thời gian pause (nếu có trong log)\n- Tại sao heap nhỏ hơn lại trigger GC nhiều hơn?\n\n---\n\n## Tóm Tắt Kiến Thức Cần Nhớ\n\n```\n✅ Stack: biến local + tham số method — tự giải phóng khi method return\n✅ Heap: tất cả object — GC quản lý\n✅ Metaspace: class metadata, static variables\n✅ StackOverflowError: đệ quy vô tận → Stack đầy\n✅ OutOfMemoryError: object quá nhiều hoặc hết Heap\n✅ Memory leak: object không dùng nhưng vẫn còn reference (GC không xóa được)\n✅ WeakHashMap: tự động xóa entry khi key không còn reference ngoài\n✅ StringBuilder > String + trong vòng lặp (ít tạo object Heap hơn)\n✅ JVM flags: -Xms, -Xmx set heap; -Xlog:gc bật GC log\n```\n\n---\n\n👉 **[Bài 23: Testing với JUnit 5 & Mockito](../bai-23-testing/EXERCISES.md)**\n",
    "quizzes": [
      {
        "q": "Vùng nhớ nào của JVM lưu biến cục bộ và khung ngăn xếp phương thức?",
        "options": [
          "Heap Area",
          "Method Area",
          "Stack Area (JVM Stacks)",
          "PC Register"
        ],
        "answer": 2,
        "explanation": "JVM Stack: mỗi thread có Stack riêng. Mỗi lần gọi method tạo Stack Frame chứa local variables, operand stack, frame data."
      },
      {
        "q": "Garbage Collector trong Java hoạt động như thế nào?",
        "options": [
          "Lập trình viên phải gọi delete() khi dùng xong",
          "JVM tự động phát hiện và thu hồi bộ nhớ của object không còn được tham chiếu",
          "Xóa tất cả object sau khi chương trình kết thúc",
          "Chỉ hoạt động khi gọi System.gc()"
        ],
        "answer": 1,
        "explanation": "GC tự động phát hiện unreachable objects (không còn reference nào trỏ vào) và thu hồi bộ nhớ. Giải phóng lập trình viên khỏi quản lý bộ nhớ thủ công."
      },
      {
        "q": "JIT (Just-In-Time) Compiler trong JVM làm gì?",
        "options": [
          "Biên dịch .java sang .class",
          "Biên dịch bytecode sang mã máy native tại runtime để tăng tốc độ thực thi",
          "Kiểm tra lỗi cú pháp",
          "Nén bytecode"
        ],
        "answer": 1,
        "explanation": "JIT profiling code và biên dịch hot spots (đoạn code chạy nhiều) thành native code, lưu cache. Lần sau chạy trực tiếp mã máy, nhanh hơn nhiều."
      },
      {
        "q": "StackOverflowError xảy ra khi nào?",
        "options": [
          "Bộ nhớ Heap hết",
          "Stack tràn do đệ quy quá sâu hoặc vô hạn",
          "Nhiều thread cùng chạy",
          "Class không tìm thấy"
        ],
        "answer": 1,
        "explanation": "Mỗi method call tạo Stack Frame. Đệ quy vô hạn hay quá sâu sẽ đẩy quá nhiều Frame vào Stack cho đến khi Stack overflow."
      },
      {
        "q": "Method Area (Metaspace) trong JVM lưu trữ gì?",
        "options": [
          "Instance variables của object",
          "Local variables của method",
          "Class metadata, static variables, bytecode của methods",
          "PC Register value"
        ],
        "answer": 2,
        "explanation": "Method Area (Java 8+: Metaspace): chứa class structure (fields, methods, code), static variables, constant pool. Chia sẻ giữa tất cả threads."
      },
      {
        "q": "Heap trong JVM được chia thành các vùng nào (trong GC thế hệ)?",
        "options": [
          "Eden, Survivor, Tenured (Old Gen)",
          "New, Old, Permanent",
          "Young, Middle, Ancient",
          "Small, Medium, Large"
        ],
        "answer": 0,
        "explanation": "Heap: Young Generation (Eden + Survivor S0, S1) cho object mới; Old Generation (Tenured) cho object sống lâu. GC chạy thường xuyên ở Young."
      },
      {
        "q": "OutOfMemoryError: Java Heap Space xảy ra khi nào?",
        "options": [
          "Stack quá đầy",
          "JVM không thể cấp phát thêm bộ nhớ Heap cho object mới",
          "Quá nhiều threads",
          "Class không load được"
        ],
        "answer": 1,
        "explanation": "Khi Heap đầy và GC không thu hồi được đủ bộ nhớ, JVM ném OutOfMemoryError. Cần tăng -Xmx hoặc fix memory leak."
      },
      {
        "q": "Profiling JVM dùng để làm gì?",
        "options": [
          "Biên dịch code nhanh hơn",
          "Phân tích hiệu suất: CPU usage, memory usage, thread activity, để tìm bottleneck",
          "Chạy unit test",
          "Deploy ứng dụng"
        ],
        "answer": 1,
        "explanation": "JVM profiling tools (JProfiler, VisualVM, Java Mission Control) giúp xác định: memory leak, hot methods, thread deadlock..."
      },
      {
        "q": "ClassLoader trong JVM có nhiệm vụ gì?",
        "options": [
          "Biên dịch class",
          "Tải file .class vào JVM và tạo Class object trong Method Area",
          "Chạy GC",
          "Quản lý threads"
        ],
        "answer": 1,
        "explanation": "ClassLoader tải file .class từ classpath, verify bytecode, prepare (cấp phát static), và link. Bootstrap > Extension > Application ClassLoader."
      },
      {
        "q": "Minor GC và Major GC (Full GC) khác nhau thế nào?",
        "options": [
          "Minor GC nhanh hơn và không dừng ứng dụng",
          "Minor GC: dọn Young Generation (nhanh, Stop-the-World ngắn). Major GC: dọn cả Old Gen (chậm hơn, Stop-the-World dài hơn).",
          "Major GC chỉ chạy khi gọi System.gc()",
          "Minor GC xóa cả Heap"
        ],
        "answer": 1,
        "explanation": "Minor GC: frequent, fast, chỉ Young Gen. Major/Full GC: ít thường xuyên hơn, chậm hơn, ảnh hưởng performance nhiều hơn."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: JVM Internals — Bộ Nhớ và Garbage Collection\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# Bài Tập — Bài 22: JVM Internals\n\n> 🔴 **Phase 4 – Bài 4/5** | Ôn tập: Stack, Heap, GC, JIT\n\n---\n\n## Bài 1: Phân Tích Stack vs Heap ⭐\n\nĐọc đoạn code sau và trả lời câu hỏi:\n\n```java\npublic class BaiTap1 {\n\n    static int dem = 0;      // (A)\n\n    public static void xuLy() {\n        int local = 10;      // (B)\n        String ten = \"Raize\"; // (C)\n        NguoiDung u = new NguoiDung(\"raize99\"); // (D)\n        dem++;               // (E)\n    }\n\n    public static void main(String[] args) {\n        xuLy();\n        // Sau khi xuLy() return, điều gì xảy ra với (B), (C), (D)?\n    }\n}\n```\n\n**Câu hỏi:**\n1. Biến nào sống trên **Stack**? Biến nào sống trên **Heap**?\n2. Sau khi `xuLy()` return, biến nào bị giải phóng ngay lập tức?\n3. Object `NguoiDung` tại `(D)` sẽ bị GC xóa khi nào?\n4. Biến `dem` tại `(A)` sống trên vùng nhớ nào?\n\n**Viết giải thích** (không cần code, chỉ cần giải thích bằng text/comment).\n\n---\n\n## Bài 2: StackOverflowError vs OutOfMemoryError ⭐\n\n**Yêu cầu:** Viết code tái hiện 2 ...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 23,
    "title": "Unit Testing với JUnit 5 & Mockito",
    "phase": "Phase 4: Java Advanced",
    "time": "4 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 23: Testing với JUnit 5 & Mockito\n\n> 🔴 **Phase 4 – Bài 5/5** | Thời gian: ~4 giờ\n\n---\n\nTôi nói thật: khi tôi mới học lập trình, tôi nghĩ testing là \"làm cho xong\" — viết vài test cho có rồi thôi. Nhưng sau nhiều năm làm dự án thực tế, tôi nhận ra: **code không có test = code bạn không dám refactor, không dám deploy tự tin**.\n\nBài này Tôi sẽ dạy bạn cách viết test **thực sự hữu ích**, không phải test cho có.\n\n---\n\n## 1. Tại Sao Cần Testing?\n\n```\nKhông có test:                               Có test:\n- Sửa bug A → tạo ra bug B (regression)    - Regression được phát hiện ngay\n- Deploy xong mệt lắm, sợ mọi thứ vỡ     - Deploy tự tin\n- Refactor = rủi ro cao                    - Refactor thoải mái\n- Bug production = debug trong tối         - Bug = test case cụ thể reproduce\n```\n\n---\n\n## 2. Cài Đặt (Maven)\n\n```xml\n<!-- pom.xml -->\n<dependency>\n    <groupId>org.junit.jupiter</groupId>\n    <artifactId>junit-jupiter</artifactId>\n    <version>5.10.0</version>\n    <scope>test</scope>\n</dependency>\n<dependency>\n    <groupId>org.mockito</groupId>\n    <artifactId>mockito-core</artifactId>\n    <version>5.6.0</version>\n    <scope>test</scope>\n</dependency>\n```\n\n---\n\n## 3. JUnit 5 — Unit Test Cơ Bản\n\n```java\nimport org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass TaiKhoanTest {\n\n    private TaiKhoan tk;\n\n    @BeforeEach  // Chạy trước MỖI test method\n    void setup() {\n        tk = new TaiKhoan(\"TK001\", \"Raize\", 1_000_000);\n    }\n\n    @AfterEach   // Chạy sau mỗi test (nếu cần cleanup)\n    void tearDown() { }\n\n    @BeforeAll   // Chạy 1 lần trước tất cả test (static!)\n    static void setupOnce() { System.out.println(\"Bắt đầu test suite\"); }\n\n    @Test\n    void napTien_hopLe_tangSoDu() {\n        // Arrange — Chuẩn bị dữ liệu (đã xong trong @BeforeEach)\n\n        // Act — Thực hiện hành động cần test\n        tk.napTien(500_000);\n\n        // Assert — Kiểm tra kết quả\n        assertEquals(1_500_000, tk.getSoDu(), \"Số dư sau nạp phải là 1,500,000\");\n    }\n\n    @Test\n    void napTien_soTienAm_nemException() {\n        // Test xem exception có được ném không\n        IllegalArgumentException ex = assertThrows(\n            IllegalArgumentException.class,\n            () -> tk.napTien(-1000)\n        );\n        assertTrue(ex.getMessage().contains(\"phải > 0\"));\n    }\n\n    @Test\n    void rutTien_dusoDu_giamSoDu() {\n        tk.rutTien(300_000);\n        assertEquals(700_000, tk.getSoDu());\n    }\n\n    @Test\n    void rutTien_khongDuSoDu_nemException() {\n        assertThrows(SoDuKhongDuException.class, () -> tk.rutTien(2_000_000));\n    }\n\n    @Test\n    void getSoDu_taiKhoanMoi_bangSoBanDau() {\n        assertEquals(1_000_000, tk.getSoDu());\n    }\n}\n```\n\n---\n\n## 4. Các Assertion Thường Dùng\n\n```java\n// Kiểm tra giá trị\nassertEquals(expected, actual);\nassertEquals(3.14, result, 0.001);   // double với delta\nassertNotEquals(expected, actual);\n\n// Kiểm tra null/boolean\nassertNull(obj);\nassertNotNull(obj);\nassertTrue(condition);\nassertFalse(condition);\n\n// Kiểm tra collection\nassertArrayEquals(new int[]{1,2,3}, arr);\n// Với AssertJ (thư viện khác, phổ biến hơn):\n// assertThat(list).hasSize(3).contains(\"A\").doesNotContain(\"Z\");\n\n// Fail thủ công\nfail(\"Phần này không nên chạy đến\");\n\n// Nhiều assertion, và tất cả đều chạy (dù có fail):\nassertAll(\"Kiểm tra NguoiDung\",\n    () -> assertEquals(\"raize99\", user.getUsername()),\n    () -> assertEquals(\"r@mail.com\", user.getEmail()),\n    () -> assertTrue(user.isActive())\n);\n```\n\n---\n\n## 5. Parameterized Test — Test Nhiều Bộ Dữ Liệu\n\n```java\n@ParameterizedTest\n@CsvSource({\n    \"raize99,     true\",   // username hợp lệ\n    \"ab,          false\",  // quá ngắn\n    \"a_very_long_username_more_than_20_chars, false\",  // quá dài\n    \"valid_name,  true\",\n    \",            false\",  // null/blank\n})\nvoid kiemTraUsername(String username, boolean expected) {\n    assertEquals(expected, Validator.hopLeUsername(username));\n}\n\n@ParameterizedTest\n@ValueSource(ints = {-1, -100, 0})\nvoid napTienSoAmNemException(int soTien) {\n    assertThrows(IllegalArgumentException.class, () -> tk.napTien(soTien));\n}\n```\n\n---\n\n## 6. Mockito — Giả Lập Dependency\n\nKhi test một class phụ thuộc vào class khác (DB, email service...), bạn không muốn gọi thật. **Mock** = giả lập dependency.\n\n```java\nimport org.mockito.Mock;\nimport org.mockito.Mockito;\nimport org.mockito.junit.jupiter.MockitoExtension;\n\n@ExtendWith(MockitoExtension.class)\nclass DangKyServiceTest {\n\n    @Mock\n    private NguoiDungRepository userRepo;  // Mock — không gọi DB thật\n\n    @Mock\n    private EmailService emailService;     // Mock — không gửi email thật\n\n    @InjectMocks\n    private DangKyService dangKyService;   // Class cần test — inject mock vào\n\n    @Test\n    void dangKy_usernameHopLe_taoUserThanhCong() {\n        // Arrange: setup mock behavior\n        when(userRepo.existsByUsername(\"raize99\")).thenReturn(false);  // Username chưa tồn tại\n        when(userRepo.save(any(NguoiDung.class))).thenAnswer(inv -> inv.getArgument(0));\n\n        // Act\n        NguoiDung result = dangKyService.dangKy(\"raize99\", \"r@mail.com\", \"password123\");\n\n        // Assert\n        assertNotNull(result);\n        assertEquals(\"raize99\", result.getUsername());\n\n        // Verify: email service được gọi đúng 1 lần\n        verify(emailService, times(1)).guiEmailXacNhan(eq(\"r@mail.com\"), anyString());\n        // Verify: save được gọi đúng 1 lần\n        verify(userRepo, times(1)).save(any(NguoiDung.class));\n    }\n\n    @Test\n    void dangKy_usernameToTon_nemException() {\n        when(userRepo.existsByUsername(\"raize99\")).thenReturn(true);  // Đã tồn tại\n\n        assertThrows(UsernameConTonTaiException.class,\n            () -> dangKyService.dangKy(\"raize99\", \"r@mail.com\", \"pass\"));\n\n        // Verify email KHÔNG được gửi\n        verify(emailService, never()).guiEmailXacNhan(anyString(), anyString());\n    }\n}\n```\n\n---\n\n## 7. Test Coverage — Bao Nhiêu Là Đủ?\n\n```\nKhông phải 100% coverage = tốt!\n\ntôi khuyên:\n- Core business logic: 80-90%+ coverage\n- Utility classes: 70-80%\n- Controller/API: Test integration, không cần unit test chi tiết\n- Không cần test: getter/setter đơn giản, toString()\n\nCông cụ đo coverage:\n- IntelliJ: Run with Coverage (built-in)\n- JaCoCo: plugin Maven/Gradle, báo cáo HTML\n```\n\n---\n\n## 8. Nguyên Tắc Viết Test Tốt (F.I.R.S.T)\n\n```\nFast:        Test chạy nhanh (dưới 100ms mỗi test)\nIndependent: Test không phụ thuộc vào nhau (thứ tự chạy không quan trọng)\nRepeatable:  Cùng input → cùng output (không random, không network)\nSelf-validating: Test pass/fail rõ ràng — không cần nhìn output thủ công\nTimely:      Viết test cùng lúc hoặc trước code (TDD)\n```\n\n---\n\n## Tóm Tắt — Bài 23\n\n```\n✅ @Test: đánh dấu method là test case\n✅ @BeforeEach/@AfterEach: setup/teardown trước/sau mỗi test\n✅ assertEquals, assertThrows, assertNotNull...: kiểm tra kết quả\n✅ @ParameterizedTest + @CsvSource: test nhiều bộ dữ liệu gọn gàng\n✅ Mockito @Mock: giả lập dependency (không gọi DB/email thật)\n✅ when().thenReturn(): định nghĩa hành vi mock\n✅ verify(): kiểm tra method được gọi đúng số lần\n✅ Test tốt: Fast, Independent, Repeatable, Self-validating\n```\n\n---\n\n## 🎉 Phase 4 Hoàn Thành!\n\nBạn đã học những thứ mà nhiều developer Java kinh nghiệm 2-3 năm chưa chắc đã nắm vững. Đây là nền tảng để bạn bước vào Phase 5 — **Modern Java và Ecosystem**.\n\n👉 **[Bài 24: Modern Java — Records, Sealed Classes, Pattern Matching](../../phase5-modern-ecosystem/bai-24-modern-java/README.md)**\n",
    "exercisesMarkdown": "# Bài Tập — Bài 23: Testing với JUnit 5 & Mockito\n\n> 🔴 **Phase 4 – Bài 5/5** | Ôn tập: JUnit 5, Parameterized Test, Mockito\n\n---\n\n## Setup Maven\n\nThêm vào `pom.xml` trước khi làm bài:\n\n```xml\n<dependency>\n    <groupId>org.junit.jupiter</groupId>\n    <artifactId>junit-jupiter</artifactId>\n    <version>5.10.0</version>\n    <scope>test</scope>\n</dependency>\n<dependency>\n    <groupId>org.mockito</groupId>\n    <artifactId>mockito-core</artifactId>\n    <version>5.6.0</version>\n    <scope>test</scope>\n</dependency>\n<dependency>\n    <groupId>org.mockito</groupId>\n    <artifactId>mockito-junit-jupiter</artifactId>\n    <version>5.6.0</version>\n    <scope>test</scope>\n</dependency>\n```\n\n---\n\n## Bài 1: Unit Test Cơ Bản cho TaiKhoan ⭐\n\nCho class sau:\n\n```java\n// src/main/java/TaiKhoan.java\npublic class TaiKhoan {\n    private final String maTK;\n    private final String chuTK;\n    private double soDu;\n\n    public TaiKhoan(String maTK, String chuTK, double soDuBanDau) {\n        if (soDuBanDau < 0) throw new IllegalArgumentException(\"Số dư ban đầu không được âm\");\n        this.maTK = maTK;\n        this.chuTK = chuTK;\n        this.soDu = soDuBanDau;\n    }\n\n    public void napTien(double soTien) {\n        if (soTien <= 0) throw new IllegalArgumentException(\"Số tiền nạp phải > 0\");\n        this.soDu += soTien;\n    }\n\n    public void rutTien(double soTien) {\n        if (soTien <= 0) throw new IllegalArgumentException(\"Số tiền rút phải > 0\");\n        if (soTien > soDu) throw new IllegalStateException(\"Số dư không đủ\");\n        this.soDu -= soTien;\n    }\n\n    public double getSoDu()  { return soDu; }\n    public String getMaTK()  { return maTK; }\n    public String getChuTK() { return chuTK; }\n}\n```\n\n**Yêu cầu:** Viết class `TaiKhoanTest` với đầy đủ các test case:\n\n```java\n// src/test/java/TaiKhoanTest.java\nimport org.junit.jupiter.api.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass TaiKhoanTest {\n\n    private TaiKhoan tk;\n\n    @BeforeEach\n    void setup() {\n        tk = new TaiKhoan(\"TK001\", \"Raize\", 1_000_000);\n    }\n\n    // TODO: Test 1 — napTien hợp lệ → số dư tăng đúng\n    @Test\n    void napTien_hopLe_tangSoDu() {\n        // Act\n        tk.napTien(500_000);\n        // Assert\n        assertEquals(/* expected */, tk.getSoDu());\n    }\n\n    // TODO: Test 2 — napTien số âm → ném IllegalArgumentException với message chứa \"> 0\"\n\n    // TODO: Test 3 — napTien = 0 → ném IllegalArgumentException\n\n    // TODO: Test 4 — rutTien hợp lệ → số dư giảm đúng\n\n    // TODO: Test 5 — rutTien vượt số dư → ném IllegalStateException\n\n    // TODO: Test 6 — tạo TaiKhoan với soDuBanDau âm → ném IllegalArgumentException\n\n    // TODO: Test 7 — kiểm tra getMaTK và getChuTK trả về đúng\n\n    // TODO: Test 8 — nạp rồi rút rồi kiểm tra số dư cuối cùng\n    @Test\n    void napRoiRut_soduCuoiDung() {\n        tk.napTien(200_000);\n        tk.rutTien(300_000);\n        assertEquals(/* expected */ 0, tk.getSoDu());\n    }\n}\n```\n\n---\n\n## Bài 2: Parameterized Test ⭐⭐\n\nCho class validator sau:\n\n```java\n// src/main/java/Validator.java\npublic class Validator {\n\n    // Username: 3-20 ký tự, chỉ a-z, 0-9, gạch dưới\n    public static boolean hopLeUsername(String username) {\n        if (username == null || username.isBlank()) return false;\n        if (username.length() < 3 || username.length() > 20) return false;\n        return username.matches(\"[a-z0-9_]+\");\n    }\n\n    // Email cơ bản\n    public static boolean hopLeEmail(String email) {\n        if (email == null) return false;\n        return email.matches(\"^[a-zA-Z0-9._%+\\\\-]+@[a-zA-Z0-9.\\\\-]+\\\\.[a-zA-Z]{2,}$\");\n    }\n\n    // Mật khẩu: ít nhất 8 ký tự, có chữ hoa, chữ thường, số\n    public static boolean hopLeMatKhau(String matKhau) {\n        if (matKhau == null || matKhau.length() < 8) return false;\n        boolean coHoa   = matKhau.chars().anyMatch(Character::isUpperCase);\n        boolean coThuong = matKhau.chars().anyMatch(Character::isLowerCase);\n        boolean coSo    = matKhau.chars().anyMatch(Character::isDigit);\n        return coHoa && coThuong && coSo;\n    }\n}\n```\n\n**Yêu cầu:** Viết `ValidatorTest` với Parameterized Tests:\n\n```java\n// src/test/java/ValidatorTest.java\nimport org.junit.jupiter.params.*;\nimport org.junit.jupiter.params.provider.*;\nimport static org.junit.jupiter.api.Assertions.*;\n\nclass ValidatorTest {\n\n    // TODO: Test username với @CsvSource ít nhất 8 bộ dữ liệu:\n    // - \"raize99, true\"       — hợp lệ\n    // - \"ab, false\"           — quá ngắn (< 3)\n    // - \"a, false\"            — quá ngắn\n    // - \"012345678901234567890, false\" — quá dài (> 20)\n    // - \"Raize99, false\"      — có chữ hoa\n    // - \"raize-99, false\"     — có ký tự không hợp lệ (dấu gạch ngang)\n    // - \", false\"             — blank\n    // - \"valid_name, true\"    — hợp lệ với gạch dưới\n    @ParameterizedTest\n    @CsvSource({\n        // TODO: Điền vào đây\n    })\n    void kiemTraUsername(String username, boolean expected) {\n        assertEquals(expected, Validator.hopLeUsername(username));\n    }\n\n    // TODO: Test email với @CsvSource ít nhất 5 bộ dữ liệu\n\n    // TODO: Test mật khẩu với @CsvSource ít nhất 6 bộ dữ liệu:\n    // - \"Password1, true\"\n    // - \"password1, false\"  — không có chữ hoa\n    // - \"PASSWORD1, false\"  — không có chữ thường\n    // - \"Password, false\"   — không có số\n    // - \"Pw1, false\"        — quá ngắn\n    // - \"Super$ecret9, true\"\n\n    // TODO: Test các số âm với @ValueSource(ints = {-1, -100, 0})\n    // gọi napTien trên TaiKhoan và expect IllegalArgumentException\n}\n```\n\n---\n\n## Bài 3: Test Exception và assertAll ⭐⭐\n\n```java\n// src/main/java/DangKyService.java (class đơn giản, không dùng Spring)\npublic class DangKyService {\n    private final List<String> danhSachUsername = new ArrayList<>();\n\n    public NguoiDung dangKy(String username, String email, String matKhau) {\n        // Validate\n        if (!Validator.hopLeUsername(username))\n            throw new IllegalArgumentException(\"Username không hợp lệ: \" + username);\n        if (!Validator.hopLeEmail(email))\n            throw new IllegalArgumentException(\"Email không hợp lệ: \" + email);\n        if (!Validator.hopLeMatKhau(matKhau))\n            throw new IllegalArgumentException(\"Mật khẩu yếu: cần ít nhất 8 ký tự, hoa, thường, số\");\n\n        // Check trùng\n        if (danhSachUsername.contains(username))\n            throw new IllegalStateException(\"Username '\" + username + \"' đã tồn tại\");\n\n        // Tạo user\n        danhSachUsername.add(username);\n        return new NguoiDung(username, email);\n    }\n}\n```\n\n**Yêu cầu:** Viết `DangKyServiceTest`:\n\n```java\nclass DangKyServiceTest {\n\n    private DangKyService service;\n\n    @BeforeEach\n    void setup() {\n        service = new DangKyService();\n    }\n\n    // TODO: Test 1 — đăng ký thành công → kiểm tra username và email bằng assertAll\n    @Test\n    void dangKy_thanhCong_userDuocTao() {\n        NguoiDung u = service.dangKy(\"raize99\", \"r@mail.com\", \"Raize@123\");\n\n        assertAll(\"Kiểm tra NguoiDung vừa tạo\",\n            // TODO: Thêm ít nhất 2 assertion\n        );\n    }\n\n    // TODO: Test 2 — username trùng → IllegalStateException với message chứa username\n\n    // TODO: Test 3 — username không hợp lệ → IllegalArgumentException\n\n    // TODO: Test 4 — email không hợp lệ → IllegalArgumentException\n\n    // TODO: Test 5 — mật khẩu yếu → IllegalArgumentException với message chứa \"8 ký tự\"\n\n    // TODO: Test 6 — đăng ký 2 user khác nhau → cả 2 thành công (không ảnh hưởng nhau)\n}\n```\n\n---\n\n## Bài 4: Mockito — Mock Dependency ⭐⭐⭐\n\nCho interface và class sau:\n\n```java\n// Interface\npublic interface NguoiDungRepository {\n    boolean existsByUsername(String username);\n    NguoiDung save(NguoiDung u);\n    Optional<NguoiDung> findByUsername(String username);\n}\n\npublic interface EmailService {\n    void guiEmailChaoMung(String email, String username);\n}\n\n// Class cần test\npublic class DangKyServiceV2 {\n    private final NguoiDungRepository userRepo;\n    private final EmailService emailService;\n\n    public DangKyServiceV2(NguoiDungRepository userRepo, EmailService emailService) {\n        this.userRepo = userRepo;\n        this.emailService = emailService;\n    }\n\n    public NguoiDung dangKy(String username, String email, String matKhau) {\n        if (userRepo.existsByUsername(username))\n            throw new IllegalStateException(\"Username đã tồn tại\");\n\n        NguoiDung u = new NguoiDung(username, email);\n        NguoiDung saved = userRepo.save(u);\n\n        emailService.guiEmailChaoMung(email, username);\n\n        return saved;\n    }\n}\n```\n\n**Yêu cầu:** Viết `DangKyServiceV2Test` dùng Mockito:\n\n```java\nimport org.junit.jupiter.api.extension.ExtendWith;\nimport org.mockito.*;\nimport org.mockito.junit.jupiter.MockitoExtension;\nimport static org.mockito.Mockito.*;\n\n@ExtendWith(MockitoExtension.class)\nclass DangKyServiceV2Test {\n\n    @Mock\n    private NguoiDungRepository userRepo;\n\n    @Mock\n    private EmailService emailService;\n\n    @InjectMocks\n    private DangKyServiceV2 service;\n\n    // TODO: Test 1 — đăng ký thành công\n    // - when(userRepo.existsByUsername(\"raize99\")).thenReturn(false)\n    // - when(userRepo.save(any())).thenAnswer(inv -> inv.getArgument(0))\n    // - Verify: emailService.guiEmailChaoMung() được gọi đúng 1 lần\n    // - Verify: userRepo.save() được gọi đúng 1 lần\n\n    // TODO: Test 2 — username đã tồn tại → IllegalStateException\n    // - when(userRepo.existsByUsername(\"raize99\")).thenReturn(true)\n    // - Verify: userRepo.save() KHÔNG được gọi (verify với times(0) hoặc never())\n    // - Verify: emailService KHÔNG được gọi\n\n    // TODO: Test 3 — userRepo.save() ném exception → exception được propagate ra ngoài\n    // - when(userRepo.save(any())).thenThrow(new RuntimeException(\"DB lỗi\"))\n    // - Kiểm tra RuntimeException được ném ra\n\n    // TODO: Test 4 — verify đúng argument truyền vào emailService\n    // - Dùng verify(emailService).guiEmailChaoMung(eq(\"r@mail.com\"), eq(\"raize99\"))\n}\n```\n\n---\n\n## Bài 5 (Nâng Cao): Test Coverage và Nguyên Tắc F.I.R.S.T ⭐⭐⭐\n\n**Yêu cầu:** Viết test suite hoàn chỉnh cho class `MayTinhTienLai` sau, đảm bảo **coverage > 90%**:\n\n```java\npublic class MayTinhTienLai {\n\n    /**\n     * Tính lãi kép\n     * @param vonGoc  số tiền ban đầu (VND)\n     * @param laiSuat lãi suất hàng năm (ví dụ: 0.08 = 8%)\n     * @param soNam   số năm gửi\n     * @return tổng tiền sau soNam năm\n     */\n    public double laiKep(double vonGoc, double laiSuat, int soNam) {\n        if (vonGoc <= 0) throw new IllegalArgumentException(\"Vốn gốc phải > 0\");\n        if (laiSuat < 0 || laiSuat > 1) throw new IllegalArgumentException(\"Lãi suất phải trong [0, 1]\");\n        if (soNam <= 0) throw new IllegalArgumentException(\"Số năm phải > 0\");\n        return vonGoc * Math.pow(1 + laiSuat, soNam);\n    }\n\n    /**\n     * Tính số tháng để đạt mục tiêu tiết kiệm\n     * @param vonBanDau  tiền ban đầu\n     * @param goiHangThang số tiền gửi thêm mỗi tháng\n     * @param laiSuatThang lãi suất mỗi tháng\n     * @param mucTieu   số tiền muốn đạt\n     * @return số tháng cần thiết, hoặc -1 nếu không thể đạt (mục tiêu <= vốn ban đầu)\n     */\n    public int soThangDatMucTieu(double vonBanDau, double goiHangThang,\n                                  double laiSuatThang, double mucTieu) {\n        if (mucTieu <= vonBanDau) return 0;\n        if (goiHangThang <= 0 && laiSuatThang <= 0) return -1;\n\n        double soDu = vonBanDau;\n        int thang = 0;\n        while (soDu < mucTieu && thang < 1200) {  // max 100 năm\n            soDu = soDu * (1 + laiSuatThang) + goiHangThang;\n            thang++;\n        }\n        return soDu >= mucTieu ? thang : -1;\n    }\n}\n```\n\n**Checklist test cần viết (ít nhất 12 test cases):**\n- [ ] `laiKep` kết quả đúng (dùng `assertEquals` với delta cho double)\n- [ ] `laiKep` vonGoc = 0 → exception\n- [ ] `laiKep` vonGoc âm → exception\n- [ ] `laiKep` laiSuat âm → exception\n- [ ] `laiKep` laiSuat > 1 → exception\n- [ ] `laiKep` soNam = 0 → exception\n- [ ] `laiKep` laiSuat = 0 → kết quả bằng vonGoc\n- [ ] `soThangDatMucTieu` mucTieu <= vonBanDau → trả về 0\n- [ ] `soThangDatMucTieu` không thể đạt → trả về -1\n- [ ] `soThangDatMucTieu` kết quả hợp lý (số tháng > 0)\n- [ ] `@ParameterizedTest`: nhiều bộ dữ liệu cho `laiKep`\n- [ ] Test với số tiền lớn (tránh precision issue)\n\n---\n\n## Tóm Tắt Kiến Thức Cần Nhớ\n\n```\n✅ @Test: đánh dấu test case\n✅ @BeforeEach: setup trước mỗi test (tạo object mới → test độc lập)\n✅ assertEquals, assertThrows, assertAll, assertNotNull...\n✅ @ParameterizedTest + @CsvSource/@ValueSource: test nhiều bộ dữ liệu\n✅ Mockito @Mock: giả lập dependency, không gọi thật\n✅ when().thenReturn() / when().thenThrow(): định nghĩa hành vi mock\n✅ verify(): kiểm tra method được gọi đúng số lần, đúng argument\n✅ @InjectMocks: inject mock vào class cần test\n✅ Test tốt: Fast, Independent, Repeatable, Self-validating, Timely (F.I.R.S.T)\n```\n\n---\n\n## 🎉 Phase 4 Hoàn Thành!\n\n👉 **[Bài 24: Modern Java — Records, Sealed Classes, Pattern Matching](../../phase5-modern-ecosystem/bai-24-modern-java/EXERCISES.md)**\n",
    "quizzes": [
      {
        "q": "Khi viết unit test, Mock dùng để làm gì?",
        "options": [
          "Tăng hiệu suất test.",
          "Tạo đối tượng giả lập cô lập class cần test khỏi phụ thuộc bên ngoài (DB, API).",
          "Thay thế hoàn toàn code thật.",
          "Tự động tìm lỗi cú pháp."
        ],
        "answer": 1,
        "explanation": "Mock giả lập behavior của dependencies. Thay vì gọi DB thật, mock trả về data giả định để test logic cốt lõi."
      },
      {
        "q": "Annotation @Test trong JUnit 5 dùng để làm gì?",
        "options": [
          "Đánh dấu class là test class",
          "Đánh dấu phương thức là một test case để JUnit tự động chạy",
          "Bỏ qua test",
          "Chạy test nhiều lần"
        ],
        "answer": 1,
        "explanation": "@Test đánh dấu phương thức là test case. JUnit test runner tự tìm và chạy tất cả methods có @Test."
      },
      {
        "q": "Assertions.assertEquals(expected, actual) trong JUnit làm gì?",
        "options": [
          "In ra giá trị",
          "Kiểm tra expected == actual, nếu không bằng thì test fail",
          "So sánh reference",
          "Kiểm tra actual != null"
        ],
        "answer": 1,
        "explanation": "assertEquals kiểm tra bằng nhau (dùng equals()). Nếu không khớp, test fail với thông báo chứa expected và actual values."
      },
      {
        "q": "@BeforeEach trong JUnit 5 chạy khi nào?",
        "options": [
          "Chỉ một lần trước tất cả test",
          "Trước mỗi phương thức @Test",
          "Sau mỗi test",
          "Khi có exception"
        ],
        "answer": 1,
        "explanation": "@BeforeEach chạy trước MỖI test method, dùng để setup test data/state mới. @BeforeAll chạy một lần trước tất cả."
      },
      {
        "q": "Mockito.when(mock.method()).thenReturn(value) làm gì?",
        "options": [
          "Gọi thật method đó",
          "Định nghĩa behavior của mock: khi method được gọi thì trả về value",
          "Kiểm tra method được gọi",
          "Xóa mock"
        ],
        "answer": 1,
        "explanation": "Stubbing: cấu hình mock để khi `method()` được gọi, trả về `value`. Không thực sự chạy code thật."
      },
      {
        "q": "Phương thức test tốt cần có những gì? (3A Pattern)",
        "options": [
          "Architecture, Algorithm, Assertion",
          "Arrange, Act, Assert",
          "Analyze, Apply, Audit",
          "Assign, Allocate, Assert"
        ],
        "answer": 1,
        "explanation": "3A Pattern: Arrange (setup test data), Act (gọi method cần test), Assert (kiểm tra kết quả). Code test rõ ràng, dễ đọc."
      },
      {
        "q": "Test coverage 100% có đảm bảo không có bug không?",
        "options": [
          "Có, 100% coverage là hoàn hảo",
          "Không, coverage chỉ đo dòng code được chạy, không đảm bảo test đúng logic",
          "Có, nếu dùng JUnit 5",
          "Có nếu kết hợp với Integration test"
        ],
        "answer": 1,
        "explanation": "High coverage không đủ nếu test không assert đúng. Quan trọng là test behavior đúng, không chỉ chạy qua code."
      },
      {
        "q": "Integration Test khác Unit Test như thế nào?",
        "options": [
          "Integration Test nhanh hơn",
          "Integration Test kiểm tra nhiều component phối hợp cùng nhau, không isolate như Unit Test",
          "Unit Test kiểm tra nhiều class",
          "Không có sự khác biệt"
        ],
        "answer": 1,
        "explanation": "Unit Test: test class đơn lẻ, isolate (mock dependencies). Integration Test: test sự tương tác giữa nhiều component thật."
      },
      {
        "q": "Annotation @Mock trong Mockito dùng cùng với gì?",
        "options": [
          "@RunWith(JUnitRunner.class)",
          "@ExtendWith(MockitoExtension.class) trong JUnit 5",
          "@Before",
          "@Test"
        ],
        "answer": 1,
        "explanation": "@Mock tạo mock object tự động. Cần @ExtendWith(MockitoExtension.class) hoặc gọi MockitoAnnotations.openMocks(this) để khởi tạo."
      },
      {
        "q": "verify() trong Mockito dùng để làm gì?",
        "options": [
          "Verify kết quả trả về",
          "Kiểm tra xem mock method có được gọi hay không, và bao nhiêu lần",
          "Verify kết nối database",
          "Kiểm tra null"
        ],
        "answer": 1,
        "explanation": "`verify(mock).method()` kiểm tra method đã được gọi đúng 1 lần. `verify(mock, times(2)).method()` kiểm tra gọi 2 lần."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Unit Testing với JUnit 5 & Mockito\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# Bài Tập — Bài 23: Testing với JUnit 5 & Mockito\n\n> 🔴 **Phase 4 – Bài 5/5** | Ôn tập: JUnit 5, Parameterized Test, Mockito\n\n---\n\n## Setup Maven\n\nThêm vào `pom.xml` trước khi làm bài:\n\n```xml\n<dependency>\n    <groupId>org.junit.jupiter</groupId>\n    <artifactId>junit-jupiter</artifactId>\n    <version>5.10.0</version>\n    <scope>test</scope>\n</dependency>\n<dependency>\n    <groupId>org.mockito</groupId>\n    <artifactId>mockito-core</artifactId>\n    <version>5.6.0</version>\n    <scope>test</scope>\n</dependency>\n<dependency>\n    <groupId>org.mockito</groupId>\n    <artifactId>mockito-junit-jupiter</artifactId>\n    <version>5.6.0</version>\n    <scope>test</scope>\n</dependency>\n```\n\n---\n\n## Bài 1: Unit Test Cơ Bản cho TaiKhoan ⭐\n\nCho class sau:\n\n```java\n// src/main/java/TaiKhoan.java\npublic class TaiKhoan {\n    private final String maTK;\n    private final String chuTK;\n    private double soDu;\n\n    public TaiKhoan(String maTK, String chuTK, double soDuBanDau) {\n        if (soDuBanDau < 0) th...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 24,
    "title": "📦 Build Tools — Maven & Gradle",
    "phase": "Phase 4: Java Advanced",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "# 📦 Bài 24: Build Tools — Maven & Gradle\n\n> 🔴 **Phase 4 – Bài 6/6** | Kiến thức cần có: Java cơ bản, biết chạy lệnh terminal\n\n---\n\n## 🎯 Mục Tiêu Bài Học\n\nSau bài này bạn có thể:\n- ✅ Tạo và cấu hình dự án Maven từ đầu\n- ✅ Quản lý dependencies với `pom.xml` đúng cách\n- ✅ Hiểu lifecycle phases: `clean → compile → test → package → install → deploy`\n- ✅ Dùng Maven profiles cho nhiều môi trường (dev/prod)\n- ✅ Đọc và viết `build.gradle` cơ bản\n- ✅ Tạo Fat JAR để deploy\n\n---\n\n## 🤔 Tại Sao Phải Học Build Tools?\n\n```\n❌ Không có build tool:\n    - Copy JAR thủ công vào project\n    - Conflict version giữa các thư viện\n    - Không biết project cần thư viện gì\n    - Build tay trên từng máy → \"works on my machine\"\n\n✅ Với Maven/Gradle:\n    - 1 file config → tất cả developer dùng cùng dependencies\n    - Tự động download từ Maven Central\n    - Tích hợp với CI/CD (GitHub Actions, Jenkins)\n    - Reproducible builds — build ở đâu cũng ra kết quả giống nhau\n```\n\n---\n\n## 🏗️ Maven — Convention Over Configuration\n\n### Cấu Trúc Project Chuẩn\n\n```\nmy-project/\n├── pom.xml                    ← Trái tim của Maven project\n└── src/\n    ├── main/\n    │   ├── java/              ← Source code\n    │   └── resources/         ← Config files, templates\n    └── test/\n        ├── java/              ← Unit tests\n        └── resources/         ← Test configs\n```\n\n### Maven Lifecycle\n\n```\nvalidate → compile → test → package → verify → install → deploy\n```\n\n| Phase | Làm gì |\n|-------|--------|\n| `compile` | Biên dịch `.java` → `.class` |\n| `test` | Chạy unit tests |\n| `package` | Đóng gói thành JAR/WAR |\n| `install` | Copy JAR vào `~/.m2` local repo |\n| `deploy` | Upload lên remote repository |\n\n> ⚠️ Mỗi phase thực thi TẤT CẢ phases trước nó. `mvn package` = compile + test + package.\n\n### Dependency Scopes\n\n```xml\n<!-- compile (default): cần lúc compile VÀ runtime -->\n<scope>compile</scope>\n\n<!-- test: chỉ cần khi chạy test, không vào JAR cuối -->\n<scope>test</scope>\n\n<!-- provided: container đã cung cấp (Tomcat có servlet-api) -->\n<scope>provided</scope>\n\n<!-- runtime: không cần compile, nhưng cần lúc chạy (JDBC driver) -->\n<scope>runtime</scope>\n```\n\n---\n\n## ⚡ Gradle — Flexibility & Speed\n\n### So Với Maven\n\n```kotlin\n// build.gradle.kts (Kotlin DSL) — ngắn gọn hơn XML rất nhiều\nplugins {\n    kotlin(\"jvm\") version \"1.9.22\"\n    application\n}\n\ndependencies {\n    implementation(\"com.google.code.gson:gson:2.10.1\")\n    testImplementation(\"org.junit.jupiter:junit-jupiter:5.10.1\")\n}\n```\n\n### Gradle Daemon & Incremental Build\n\n```\nMaven: Mỗi lần build = khởi động JVM mới → chậm\nGradle: Daemon chạy nền + chỉ rebuild cái đã thay đổi → nhanh hơn nhiều\n```\n\n---\n\n## 🔑 Các Lệnh Quan Trọng\n\n### Maven\n```bash\nmvn archetype:generate   # Tạo project mới từ template\nmvn compile              # Biên dịch\nmvn test                 # Chạy tests\nmvn package              # Build JAR\nmvn clean                # Xóa thư mục target/\nmvn clean install        # Build sạch và install\nmvn dependency:tree      # Xem dependency tree\nmvn help:effective-pom   # Xem pom.xml đã merge đầy đủ\n```\n\n### Gradle\n```bash\n./gradlew init           # Tạo project mới\n./gradlew build          # Build\n./gradlew test           # Chạy tests\n./gradlew clean build    # Build sạch\n./gradlew dependencies   # Xem dependency tree\n./gradlew tasks          # Xem tất cả tasks có thể chạy\n```\n\n---\n\n## 📚 Resources\n\n- [Maven in 5 Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)\n- [Gradle Getting Started](https://docs.gradle.org/current/userguide/getting_started_eng.html)\n- [MVN Repository](https://mvnrepository.com/) — tìm dependency coordinates\n\n---\n\n👉 **Bài Tập:** [EXERCISES.md](./EXERCISES.md)\n👉 **Tiếp theo:** [Phase 5 – Modern Java Ecosystem](../../phase5-modern-ecosystem/bai-24-modern-java/EXERCISES.md)\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 24: Build Tools (Maven & Gradle)\n\n> 🎯 **Bối cảnh dự án:** Mọi dự án Java production đều dùng Maven hoặc Gradle. Hiểu build tools = hiểu cách dependency management, test automation, và CI/CD hoạt động.\n\n---\n\n## 🔴 Bài Tập 1: Khởi Tạo Maven Project RaizeShop ⭐\n\n**Bối cảnh thực tế:** Mọi Spring Boot project đều bắt đầu bằng `pom.xml`. Biết cấu trúc Maven = biết cách đọc và debug dependency conflict trong dự án thực.\n\n**Yêu cầu:** Tạo Maven project `raizeshop-core` với cấu trúc chuẩn:\n\n```\nraizeshop-core/\n├── pom.xml\n└── src/\n    ├── main/\n    │   └── java/\n    │       └── com/raize/shop/\n    │           ├── model/\n    │           │   └── Product.java\n    │           ├── service/\n    │           │   └── ProductService.java\n    │           └── Main.java\n    └── test/\n        └── java/\n            └── com/raize/shop/\n                └── service/\n                    └── ProductServiceTest.java\n```\n\n**Nội dung `pom.xml` cần có:**\n\n```xml\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<project xmlns=\"http://maven.apache.org/POM/4.0.0\"\n         xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n    <modelVersion>4.0.0</modelVersion>\n\n    <!-- TODO: Điền thông tin project -->\n    <groupId>com.raize</groupId>\n    <artifactId>raizeshop-core</artifactId>\n    <version>1.0.0-SNAPSHOT</version>\n    <packaging>jar</packaging>\n\n    <properties>\n        <java.version>21</java.version>\n        <maven.compiler.source>${java.version}</maven.compiler.source>\n        <maven.compiler.target>${java.version}</maven.compiler.target>\n        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n    </properties>\n\n    <dependencies>\n        <!-- JUnit 5 để test -->\n        <dependency>\n            <groupId>org.junit.jupiter</groupId>\n            <artifactId>junit-jupiter</artifactId>\n            <version>5.10.1</version>\n            <scope>test</scope>\n        </dependency>\n    </dependencies>\n\n    <build>\n        <plugins>\n            <plugin>\n                <groupId>org.apache.maven.plugins</groupId>\n                <artifactId>maven-surefire-plugin</artifactId>\n                <version>3.2.5</version>\n            </plugin>\n        </plugins>\n    </build>\n</project>\n```\n\n**Chạy các lệnh Maven cơ bản và ghi lại output:**\n```bash\nmvn compile              # Biên dịch source code\nmvn test                 # Chạy unit tests\nmvn package              # Đóng gói thành JAR\nmvn clean install        # Clean build + install vào local repo\nmvn dependency:tree      # Xem cây phụ thuộc\n```\n\n**Câu hỏi:** `.m2` là gì? Tìm thư mục `.m2` trên máy bạn và giải thích mục đích.\n\n---\n\n## 🟡 Bài Tập 2: Dependency Management — Thêm Thư Viện Thực Tế ⭐⭐\n\n**Bối cảnh thực tế:** Trong dự án thực, bạn cần quản lý hàng chục dependencies. Biết cách đọc scope, resolve conflict là kỹ năng thiết yếu.\n\n**Yêu cầu:** Thêm các dependency sau vào `pom.xml` và giải thích scope phù hợp:\n\n```xml\n<dependencies>\n    <!-- 1. Gson — parse JSON (dùng ở runtime) -->\n    <dependency>\n        <groupId>com.google.code.gson</groupId>\n        <artifactId>gson</artifactId>\n        <version>2.10.1</version>\n        <!-- TODO: scope là gì? -->\n    </dependency>\n\n    <!-- 2. Lombok — generate boilerplate code (chỉ cần lúc compile) -->\n    <dependency>\n        <groupId>org.projectlombok</groupId>\n        <artifactId>lombok</artifactId>\n        <version>1.18.30</version>\n        <!-- TODO: scope là gì? -->\n    </dependency>\n\n    <!-- 3. SLF4J API — logging interface -->\n    <dependency>\n        <groupId>org.slf4j</groupId>\n        <artifactId>slf4j-api</artifactId>\n        <version>2.0.9</version>\n    </dependency>\n\n    <!-- 4. Logback — SLF4J implementation (chỉ cần lúc chạy) -->\n    <dependency>\n        <groupId>ch.qos.logback</groupId>\n        <artifactId>logback-classic</artifactId>\n        <version>1.4.14</version>\n        <!-- TODO: scope là gì? -->\n    </dependency>\n\n    <!-- 5. Mockito — chỉ dùng trong test -->\n    <dependency>\n        <groupId>org.mockito</groupId>\n        <artifactId>mockito-core</artifactId>\n        <version>5.8.0</version>\n        <!-- TODO: scope là gì? -->\n    </dependency>\n</dependencies>\n```\n\n**Viết code demo sử dụng Gson:**\n```java\n// Tạo ProductDto.java và serialize/deserialize với Gson\nimport com.google.gson.Gson;\nimport com.google.gson.GsonBuilder;\n\npublic class GsonDemo {\n    record ProductDto(String id, String name, double price, int stock) {}\n\n    public static void main(String[] args) {\n        Gson gson = new GsonBuilder().setPrettyPrinting().create();\n\n        // Object → JSON\n        ProductDto product = new ProductDto(\"RZ-001\", \"Kiếm Rồng +10\", 1_500_000, 5);\n        String json = gson.toJson(product);\n        System.out.println(\"=== JSON OUTPUT ===\");\n        System.out.println(json);\n\n        // JSON → Object\n        String inputJson = \"{\\\"id\\\":\\\"RZ-002\\\",\\\"name\\\":\\\"Giáp Rồng\\\",\\\"price\\\":800000,\\\"stock\\\":3}\";\n        ProductDto fromJson = gson.fromJson(inputJson, ProductDto.class);\n        System.out.println(\"\\n=== PARSED OBJECT ===\");\n        System.out.println(fromJson);\n    }\n}\n```\n\n**Mở rộng:** Chạy `mvn dependency:tree` và giải thích tại sao có các dependency \"transitive\" xuất hiện.\n\n---\n\n## 🟡 Bài Tập 3: Maven Profiles — Build Cho Nhiều Môi Trường ⭐⭐\n\n**Bối cảnh thực tế:** Ứng dụng production có nhiều môi trường: dev, staging, production. Maven profiles cho phép build khác nhau cho từng môi trường.\n\n**Yêu cầu:** Thêm profiles vào `pom.xml`:\n\n```xml\n<profiles>\n    <!-- Profile: Development -->\n    <profile>\n        <id>dev</id>\n        <activation>\n            <activeByDefault>true</activeByDefault>\n        </activation>\n        <properties>\n            <app.env>development</app.env>\n            <db.url>jdbc:h2:mem:testdb</db.url>\n            <log.level>DEBUG</log.level>\n        </properties>\n    </profile>\n\n    <!-- Profile: Production -->\n    <profile>\n        <id>prod</id>\n        <properties>\n            <app.env>production</app.env>\n            <db.url>jdbc:mysql://prod-server:3306/raizeshop</db.url>\n            <log.level>WARN</log.level>\n        </properties>\n        <build>\n            <plugins>\n                <!-- Nén và optimize JAR cho production -->\n                <plugin>\n                    <groupId>org.apache.maven.plugins</groupId>\n                    <artifactId>maven-jar-plugin</artifactId>\n                    <configuration>\n                        <archive>\n                            <manifest>\n                                <mainClass>com.raize.shop.Main</mainClass>\n                            </manifest>\n                        </archive>\n                    </configuration>\n                </plugin>\n            </plugins>\n        </build>\n    </profile>\n</profiles>\n```\n\n**Tạo file `src/main/resources/application.properties` có filter:**\n```properties\napp.env=${app.env}\ndb.url=${db.url}\nlog.level=${log.level}\napp.name=RaizeShop\napp.version=${project.version}\n```\n\n**Chạy và so sánh:**\n```bash\nmvn package -P dev    # Build với profile dev\nmvn package -P prod   # Build với profile prod\n```\n\n**Kiểm tra:** Mở JAR bằng `jar tf target/raizeshop-core-1.0.0-SNAPSHOT.jar` và tìm `application.properties`. Nội dung có khác nhau giữa 2 profile không?\n\n---\n\n## 🔴 Bài Tập 4: Chuyển Sang Gradle — So Sánh Thực Tế ⭐⭐⭐\n\n**Bối cảnh thực tế:** Nhiều dự án dùng Gradle (đặc biệt Android). Spring Initializr cho phép chọn Maven hoặc Gradle. Biết cả hai = linh hoạt hơn.\n\n**Yêu cầu:** Tạo project Gradle tương đương:\n\n```gradle\n// build.gradle (Groovy DSL)\nplugins {\n    id 'java'\n    id 'application'\n}\n\ngroup = 'com.raize'\nversion = '1.0.0'\n\njava {\n    sourceCompatibility = JavaVersion.VERSION_21\n    targetCompatibility = JavaVersion.VERSION_21\n}\n\nrepositories {\n    mavenCentral()\n}\n\ndependencies {\n    // Compile + runtime\n    implementation 'com.google.code.gson:gson:2.10.1'\n    implementation 'org.slf4j:slf4j-api:2.0.9'\n    runtimeOnly 'ch.qos.logback:logback-classic:1.4.14'\n\n    // Chỉ compile\n    compileOnly 'org.projectlombok:lombok:1.18.30'\n    annotationProcessor 'org.projectlombok:lombok:1.18.30'\n\n    // Test\n    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'\n    testImplementation 'org.mockito:mockito-core:5.8.0'\n    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'\n}\n\napplication {\n    mainClass = 'com.raize.shop.Main'\n}\n\ntest {\n    useJUnitPlatform()\n    maxParallelForks = Runtime.runtime.availableProcessors()\n}\n\n// Custom task\ntasks.register('generateVersion') {\n    doLast {\n        println \"Building RaizeShop v${version} with Java ${System.getProperty('java.version')}\"\n    }\n}\n```\n\n**Lệnh Gradle tương đương Maven:**\n```bash\n./gradlew compileJava     # = mvn compile\n./gradlew test            # = mvn test\n./gradlew build           # = mvn package\n./gradlew clean build     # = mvn clean install\n./gradlew dependencies    # = mvn dependency:tree\n./gradlew generateVersion # Custom task\n```\n\n**So sánh bảng:**\n\n| Tiêu chí | Maven | Gradle |\n|----------|-------|--------|\n| Cú pháp config | XML (pom.xml) | Groovy/Kotlin DSL |\n| Tốc độ build | Chậm hơn | Nhanh hơn (incremental) |\n| Learning curve | Dễ hơn | Khó hơn |\n| Linh hoạt | Convention over config | Rất linh hoạt |\n| Spring Boot | ✅ Hỗ trợ tốt | ✅ Hỗ trợ tốt |\n| Android | ❌ Không dùng | ✅ Bắt buộc |\n\n**Câu hỏi:** Khi nào bạn chọn Gradle thay vì Maven? Kể 3 trường hợp thực tế.\n\n---\n\n## 🔴 Bài Tập 5: Fat JAR — Deployment Artifact ⭐⭐\n\n**Bối cảnh thực tế:** Khi deploy lên server, bạn cần đóng gói tất cả dependencies vào 1 file JAR duy nhất (Uber JAR / Fat JAR). Đây là cách Spring Boot hoạt động.\n\n**Yêu cầu:** Cấu hình Maven Assembly Plugin để tạo Fat JAR:\n\n```xml\n<plugin>\n    <groupId>org.apache.maven.plugins</groupId>\n    <artifactId>maven-assembly-plugin</artifactId>\n    <version>3.6.0</version>\n    <configuration>\n        <descriptorRefs>\n            <descriptorRef>jar-with-dependencies</descriptorRef>\n        </descriptorRefs>\n        <archive>\n            <manifest>\n                <mainClass>com.raize.shop.Main</mainClass>\n            </manifest>\n        </archive>\n    </configuration>\n    <executions>\n        <execution>\n            <id>make-assembly</id>\n            <phase>package</phase>\n            <goals>\n                <goal>single</goal>\n            </goals>\n        </execution>\n    </executions>\n</plugin>\n```\n\n**Sau khi build:**\n```bash\nmvn clean package\n\n# Chạy thin JAR (sẽ lỗi nếu thiếu dependency)\njava -jar target/raizeshop-core-1.0.0-SNAPSHOT.jar\n\n# Chạy Fat JAR (luôn chạy được)\njava -jar target/raizeshop-core-1.0.0-SNAPSHOT-jar-with-dependencies.jar\n```\n\n**So sánh kích thước** 2 file JAR và giải thích sự khác biệt.\n\n**Mở rộng:** Tạo script deploy giả lập:\n```bash\n#!/bin/bash\n# deploy.sh\necho \"🔨 Building RaizeShop...\"\nmvn clean package -P prod -q\n\necho \"🚀 Deploying to server...\"\njava -jar target/*-jar-with-dependencies.jar &\n\necho \"✅ RaizeShop đang chạy! PID: $!\"\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra Thực Tế\n\n- [ ] **SNAPSHOT vs RELEASE version** — `1.0.0-SNAPSHOT` khác `1.0.0` thế nào? Khi nào dùng cái nào trong CI/CD?\n- [ ] **Dependency scope** — `compile` vs `provided` vs `runtime` vs `test`. Tomcat container đã có `javax.servlet`, vậy trong pom.xml nên dùng scope gì?\n- [ ] **Dependency conflict** — Project A dùng Gson 2.8, Project B (dependency của A) dùng Gson 2.10. Maven sẽ chọn version nào? Rule \"nearest wins\" là gì?\n- [ ] **Local vs Remote repository** — Nếu bạn muốn dùng một thư viện nội bộ của công ty (không có trên Maven Central), cần làm gì?\n\n---\n\n👉 **Tiếp theo:** [Phase 5 – Modern Java Ecosystem](../../phase5-modern-ecosystem/bai-24-modern-java/EXERCISES.md)\n",
    "quizzes": [
      {
        "q": "Trong `pom.xml` Maven, thẻ `<dependency>` dùng để làm gì?",
        "options": [
          "Khai báo phiên bản Java.",
          "Khai báo thư viện bên ngoài, Maven tự tải về từ Maven Central.",
          "Cấu hình tên tác giả.",
          "Chạy ứng dụng tự động."
        ],
        "answer": 1,
        "explanation": "Maven quản lý dependency qua pom.xml. Khai báo groupId, artifactId, version - Maven tải thư viện và transitive deps."
      },
      {
        "q": "Lệnh `mvn clean install` làm những gì?",
        "options": [
          "Chỉ xóa target folder",
          "Xóa target, biên dịch, test, đóng gói (JAR/WAR), cài vào local Maven repository",
          "Chạy ứng dụng",
          "Tạo dự án mới"
        ],
        "answer": 1,
        "explanation": "Maven lifecycle: clean (xóa target) + install (compile → test → package → install vào ~/.m2/repository)."
      },
      {
        "q": "Gradle dùng ngôn ngữ nào để viết build script?",
        "options": [
          "XML (pom.xml)",
          "Groovy hoặc Kotlin DSL (build.gradle / build.gradle.kts)",
          "YAML",
          "JSON"
        ],
        "answer": 1,
        "explanation": "Gradle dùng Groovy DSL (build.gradle) hoặc Kotlin DSL (build.gradle.kts), linh hoạt và expressive hơn XML của Maven."
      },
      {
        "q": "Maven Repository là gì?",
        "options": [
          "Database lưu code Java",
          "Nơi lưu trữ các thư viện (JAR files). Local (~/.m2), Central (maven.org), Remote (công ty)",
          "Server chạy Maven",
          "Hệ thống version control"
        ],
        "answer": 1,
        "explanation": "Maven tìm dependency theo thứ tự: Local repo → Remote repos → Maven Central. Download về local cache lần đầu."
      },
      {
        "q": "Scope `<scope>test</scope>` trong Maven dependency có nghĩa gì?",
        "options": [
          "Thư viện chỉ dùng trong môi trường production",
          "Thư viện chỉ có trong classpath khi compile test và chạy test, không include vào artifact final",
          "Thư viện không được tải",
          "Thư viện phải tải từ custom repo"
        ],
        "answer": 1,
        "explanation": "Scope test: dependency chỉ dùng cho test (như JUnit, Mockito), không được package vào JAR/WAR cuối cùng."
      },
      {
        "q": "Maven Wrapper (mvnw) dùng để làm gì?",
        "options": [
          "Chạy Maven trên Windows",
          "Đảm bảo project dùng đúng phiên bản Maven mà không cần cài Maven toàn cục",
          "Tăng tốc Maven build",
          "Tự động update Maven"
        ],
        "answer": 1,
        "explanation": "mvnw (Maven Wrapper) tự động download đúng phiên bản Maven được chỉ định trong project. Đảm bảo consistency giữa các developer."
      },
      {
        "q": "Gradle vs Maven: Gradle có ưu điểm gì?",
        "options": [
          "XML dễ đọc hơn",
          "Build nhanh hơn (incremental build, build cache, parallel execution), flexible hơn",
          "Cộng đồng lớn hơn",
          "Không cần cấu hình"
        ],
        "answer": 1,
        "explanation": "Gradle nhanh hơn nhờ incremental builds (chỉ build phần thay đổi) và build cache. Groovy/Kotlin DSL cũng expressive hơn XML."
      },
      {
        "q": "Artifact trong Maven là gì?",
        "options": [
          "Lỗi biên dịch",
          "Output của Maven build (thường là .jar hoặc .war)",
          "Config file",
          "Test report"
        ],
        "answer": 1,
        "explanation": "Artifact: kết quả build. Được định danh bởi groupId:artifactId:version. Có thể là JAR (library), WAR (web app), POM..."
      },
      {
        "q": "Multi-module project trong Maven dùng để làm gì?",
        "options": [
          "Tạo nhiều phiên bản cùng lúc",
          "Tổ chức dự án lớn thành nhiều module độc lập có thể build riêng hoặc cùng nhau",
          "Chạy nhiều JVM",
          "Test trên nhiều môi trường"
        ],
        "answer": 1,
        "explanation": "Multi-module: parent pom quản lý nhiều module con (core, api, web...). Chia sẻ dependency management, build tất cả từ root."
      },
      {
        "q": "Transitive dependency trong Maven là gì?",
        "options": [
          "Dependency tùy chọn",
          "Dependency mà dependency của bạn phụ thuộc vào - Maven tự động resolve và tải",
          "Dependency chỉ dùng trong test",
          "Dependency mã nguồn mở"
        ],
        "answer": 1,
        "explanation": "Nếu A phụ thuộc B và B phụ thuộc C, thì A có transitive dependency vào C. Maven tự động tải C mà không cần khai báo."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: 📦 Build Tools — Maven & Gradle\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 24: Build Tools (Maven & Gradle)\n\n> 🎯 **Bối cảnh dự án:** Mọi dự án Java production đều dùng Maven hoặc Gradle. Hiểu build tools = hiểu cách dependency management, test automation, và CI/CD hoạt động.\n\n---\n\n## 🔴 Bài Tập 1: Khởi Tạo Maven Project RaizeShop ⭐\n\n**Bối cảnh thực tế:** Mọi Spring Boot project đều bắt đầu bằng `pom.xml`. Biết cấu trúc Maven = biết cách đọc và debug dependency conflict trong dự án thực.\n\n**Yêu cầu:** Tạo Maven project `raizeshop-core` với cấu trúc chuẩn:\n\n```\nraizeshop-core/\n├── pom.xml\n└── src/\n    ├── main/\n    │   └── java/\n    │       └── com/raize/shop/\n    │           ├── model/\n    │           │   └── Product.java\n    │           ├── service/\n    │           │   └── ProductService.java\n    │           └── Main.java\n    └── test/\n        └── java/\n            └── com/raize/shop/\n                └── service/\n                    └── ProductServiceTest.java\n```\n\n**Nội dung `pom.xml` cần có:**\n\n```xml\n<?xml version=\"1.0\" encoding...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 25,
    "title": "Modern Java (Records, Sealed, Switch)",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "4 giờ",
    "difficulty": "Trung bình",
    "theory": "﻿# Bài 24: Modern Java — Records, Sealed Classes, Pattern Matching\n\n> 🟣 **Phase 5 – Bài 1/3** | Thời gian: ~3 giờ\n\n---\n\nJava đang phát triển nhanh hơn bao giờ hết. Từ Java 14 đến Java 21, rất nhiều tính năng mới được thêm vào để code Java ngắn hơn, an toàn hơn và expressive hơn. Bài này Tôi sẽ giới thiệu những thứ thực sự hữu ích và bạn sẽ gặp trong codebase hiện đại.\n\n---\n\n## 1. Records — Immutable Data Classes (Java 16)\n\nTrước đây, muốn tạo một class chứa dữ liệu (data carrier) cần rất nhiều boilerplate:\n\n```java\n// Cách cũ — dài dòng:\npublic class DiemSo {\n    private final String monHoc;\n    private final double diem;\n\n    public DiemSo(String monHoc, double diem) {\n        this.monHoc = monHoc;\n        this.diem = diem;\n    }\n\n    public String getMonHoc() { return monHoc; }\n    public double getDiem()   { return diem; }\n\n    @Override public boolean equals(Object o) { ... }   // 10 dòng\n    @Override public int hashCode() { ... }              // 5 dòng\n    @Override public String toString() { ... }           // 5 dòng\n}\n\n// Cách mới với Record — 1 dòng, đầy đủ tính năng:\npublic record DiemSo(String monHoc, double diem) {}\n```\n\n**Record tự động có:**\n- Constructor với tất cả fields\n- Getter (`monHoc()`, `diem()` — không có get prefix!)\n- `equals()`, `hashCode()`, `toString()` dựa trên fields\n- Immutable (tất cả fields là `final`)\n\n```java\nDiemSo d = new DiemSo(\"Toán\", 9.5);\nSystem.out.println(d.monHoc());  // \"Toán\" (không phải getMonHoc()!)\nSystem.out.println(d.diem());    // 9.5\nSystem.out.println(d);           // DiemSo[monHoc=Toán, diem=9.5]\n\n// Có thể thêm custom method:\npublic record SanPham(String ten, double gia, int soLuong) {\n    // Compact constructor — validate\n    public SanPham {\n        if (gia < 0) throw new IllegalArgumentException(\"Giá không được âm\");\n        if (soLuong < 0) throw new IllegalArgumentException(\"Số lượng không được âm\");\n    }\n\n    // Custom method\n    public double tongGiaTri() { return gia * soLuong; }\n    public boolean conHang()   { return soLuong > 0; }\n}\n\n// Perfect cho Data Transfer Object (DTO), API response:\npublic record ApiResponse<T>(boolean success, String message, T data) {}\n\nApiResponse<String> resp = new ApiResponse<>(true, \"OK\", \"Dữ liệu\");\nSystem.out.println(resp.success());  // true\n```\n\n---\n\n## 2. Sealed Classes — Kiểm Soát Hierarchy (Java 17)\n\n**Vấn đề:** Interface/abstract class mở, bất kỳ ai ở đâu cũng có thể implement/extend → khó biết tất cả subtype là gì.\n\n```java\n// Sealed class: chỉ những class được liệt kê mới được extends\npublic sealed class HinhHoc\n    permits HinhTron, HinhChuNhat, HinhTamGiac {\n\n    public abstract double dienTich();\n}\n\n// Các permitted class phải là final, sealed, hoặc non-sealed\npublic final class HinhTron extends HinhHoc {\n    private final double banKinh;\n    public HinhTron(double banKinh) { this.banKinh = banKinh; }\n\n    @Override\n    public double dienTich() { return Math.PI * banKinh * banKinh; }\n}\n\npublic final class HinhChuNhat extends HinhHoc {\n    private final double dai, rong;\n    public HinhChuNhat(double dai, double rong) { this.dai = dai; this.rong = rong; }\n\n    @Override\n    public double dienTich() { return dai * rong; }\n}\n\n// Lợi ích: pattern matching exhaustive (Java biết tất cả subtypes)\npublic String moTa(HinhHoc h) {\n    return switch (h) {\n        case HinhTron c   -> \"Hình tròn R=\" + c.banKinh();\n        case HinhChuNhat r -> \"HCN \" + r.dai() + \"x\" + r.rong();\n        case HinhTamGiac t -> \"Tam giác\";\n        // Không cần default vì Java biết đây là tất cả!\n    };\n}\n```\n\n---\n\n## 3. Pattern Matching `instanceof` (Java 16)\n\n```java\n// Cách cũ — verbose:\nif (obj instanceof NguoiDung) {\n    NguoiDung u = (NguoiDung) obj;  // Cast thủ công\n    System.out.println(u.getUsername());\n}\n\n// Pattern matching — gọn hơn:\nif (obj instanceof NguoiDung u) {  // Check và bind trong 1 bước\n    System.out.println(u.getUsername());\n}\n\n// Trong switch (Java 21):\nObject obj = getValue();\nString ket = switch (obj) {\n    case Integer i   -> \"Số nguyên: \" + i;\n    case String s    -> \"Chuỗi: \" + s.toUpperCase();\n    case NguoiDung u -> \"User: \" + u.getUsername();\n    case null        -> \"null\";\n    default          -> \"Khác: \" + obj;\n};\n```\n\n---\n\n## 4. Text Blocks (Java 15)\n\n```java\n// Cũ — khó đọc, phải escape:\nString sql = \"SELECT u.username, u.email\\n\" +\n             \"FROM nguoi_dung u\\n\" +\n             \"WHERE u.active = true\\n\" +\n             \"ORDER BY u.created_at DESC\";\n\n// Text block — sạch, dễ đọc:\nString sql = \"\"\"\n        SELECT u.username, u.email\n        FROM nguoi_dung u\n        WHERE u.active = true\n        ORDER BY u.created_at DESC\n        \"\"\";\n\n// JSON template:\nString json = \"\"\"\n        {\n          \"username\": \"%s\",\n          \"email\": \"%s\",\n          \"role\": \"%s\"\n        }\n        \"\"\".formatted(username, email, role);\n```\n\n---\n\n## 5. Switch Expressions (Java 14) — Nhắc Lại\n\n```java\n// Đã học ở Bài 03, nhưng Power-up thêm với pattern matching:\nint so = 5;\nString loai = switch (so) {\n    case 1, 2, 3 -> \"Nhỏ\";\n    case 4, 5, 6 -> \"Vừa\";\n    case 7, 8, 9 -> \"Lớn\";\n    default      -> \"Khác\";\n};\n\n// Với yield (nếu cần nhiều câu lệnh):\nString ket = switch (so) {\n    case 1, 2, 3 -> {\n        System.out.println(\"Xử lý số nhỏ...\");\n        yield \"Nhỏ\";  // yield thay cho return trong switch expression\n    }\n    default -> \"Khác\";\n};\n```\n\n---\n\n## 6. String Methods Mới\n\n```java\n// Java 11+\n\"  hello  \".strip();           // \"hello\" (Unicode-aware trim)\n\"  \".isBlank();                // true\n\"a\\nb\\nc\".lines().count();    // 3 (Stream<String>)\n\"abc\".repeat(3);               // \"abcabcabc\"\n\n// Java 12+\nString result = \"\"\"\n        hello\n        world\n        \"\"\".indent(4);  // Thêm 4 spaces indent mỗi dòng\n\n// Java 15+: String.formatted() (như String.format nhưng gọi trên instance)\nString msg = \"Xin chào %s, bạn có %d thông báo\".formatted(\"Raize\", 5);\n```\n\n---\n\n## 7. Local Variable Type Inference `var` (Java 10)\n\n```java\n// var: Java tự suy kiểu, chỉ dùng được cho local variable\nvar tenList = new ArrayList<String>();  // ArrayList<String>\nvar userMap = new HashMap<String, NguoiDung>();  // HashMap<String, NguoiDung>\n\n// Tốt khi kiểu rõ ràng từ ngữ cảnh:\nvar users = userRepository.findAll();  // Rõ là List<NguoiDung>\n\n// Không dùng được khi kiểu không rõ:\nvar x = null;  // ❌ Lỗi!\nvar list;      // ❌ Lỗi — phải khởi tạo ngay\n```\n\n---\n\n## 8. Virtual Threads (Java 21 — Project Loom)\n\n```java\n// Virtual thread = lightweight thread, hàng triệu cái mà không tốn RAM nhiều\n// Perfect cho I/O-bound tasks (DB queries, API calls, file ops)\n\n// Tạo virtual thread:\nThread.ofVirtual().start(() -> {\n    System.out.println(\"Virtual thread: \" + Thread.currentThread().isVirtual()); // true\n});\n\n// Executor với virtual thread:\ntry (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    for (int i = 0; i < 100_000; i++) {\n        executor.submit(() -> {\n            Thread.sleep(Duration.ofMillis(100));  // I/O wait\n            return \"done\";\n        });\n    }\n}\n// 100,000 virtual threads chạy thoải mái — thử với platform thread = OutOfMemoryError!\n```\n\n---\n\n## Tóm Tắt — Bài 24\n\n```\n✅ Record: immutable data class 1 dòng, tự có constructor/getter/equals/toString\n✅ Sealed class: kiểm soát hierarchy — chỉ permitted class được extends\n✅ Pattern matching instanceof: check + cast + bind trong 1 bước\n✅ Text block (\"\"\"): chuỗi nhiều dòng dễ đọc, ít escape\n✅ Switch expression với pattern (Java 21): match theo kiểu object\n✅ Virtual Threads: hàng triệu thread nhẹ cho I/O tasks\n✅ Java ra release mới mỗi 6 tháng (LTS mỗi 2 năm: 11, 17, 21, 25...)\n```\n\n---\n\n👉 **[Bài 25: Database với JDBC & JPA](../bai-25-database-jdbc-jpa/README.md)**\n",
    "exercisesMarkdown": "# Bài Tập — Bài 24: Modern Java\n\n> 🟣 **Phase 5 – Bài 1/3** | Ôn tập: Records, Sealed Classes, Pattern Matching, Text Blocks\n\n---\n\n## Bài 1: Records — Data Classes Gọn Gàng ⭐\n\n### Part A — Chuyển Đổi Class Cũ Sang Record\n\nChuyển các class dưới đây sang `record`:\n\n```java\n// Class cũ 1 — chuyển sang record\npublic class ToaDo {\n    private final double x;\n    private final double y;\n\n    public ToaDo(double x, double y) { this.x = x; this.y = y; }\n    public double getX() { return x; }\n    public double getY() { return y; }\n    // equals, hashCode, toString...\n}\n\n// Class cũ 2 — chuyển sang record\npublic class SanPhamDTO {\n    private final int id;\n    private final String ten;\n    private final double gia;\n\n    // Constructor, getters, equals, hashCode, toString...\n}\n```\n\n**Yêu cầu:**\n1. Viết 2 record tương đương\n2. Thêm method `khoangCach(ToaDo khac)` vào record `ToaDo` (tính khoảng cách Euclidean)\n3. Thêm compact constructor vào `SanPhamDTO` để validate: gia > 0\n\n### Part B — Generic Record cho API Response\n\n```java\n// TODO: Tạo generic record ApiResponse<T> với 3 fields:\n// - boolean success\n// - String message\n// - T data\n\n// Sử dụng:\n// ApiResponse<String> ok = new ApiResponse<>(true, \"Thành công\", \"Dữ liệu\");\n// ApiResponse<List<SanPhamDTO>> list = new ApiResponse<>(true, \"OK\", danhSach);\n// ApiResponse<Void> loi = new ApiResponse<>(false, \"Không tìm thấy\", null);\n\n// TODO: Viết main() để test cả 3 case trên\n```\n\n---\n\n## Bài 2: Sealed Classes — Hệ Thống Hình Học ⭐⭐\n\n**Yêu cầu:** Xây dựng hệ thống tính diện tích và chu vi cho nhiều hình:\n\n```java\n// TODO: Tạo sealed class HinhHoc với 4 permitted subtypes:\n// - HinhTron(double banKinh)\n// - HinhChuNhat(double dai, double rong)\n// - HinhVuong(double canh)\n// - HinhTamGiac(double a, double b, double c)  // 3 cạnh\n\n// HinhHoc cần có 2 abstract method: dienTich() và chuVi()\n\n// Gợi ý HinhTamGiac dùng công thức Heron:\n// s = (a+b+c)/2\n// dienTich = Math.sqrt(s*(s-a)*(s-b)*(s-c))\n\n// TODO: Viết method moTa(HinhHoc h) dùng switch expression (pattern matching)\n// In ra: tên hình + kích thước + diện tích + chu vi\n// KHÔNG dùng default case (vì sealed class — Java biết tất cả subtypes)\n\npublic class HinhHocApp {\n    public static String moTa(HinhHoc h) {\n        return switch (h) {\n            case HinhTron t     -> \"Hình tròn R=%.2f | S=%.2f | C=%.2f\"\n                                    .formatted(t.banKinh(), t.dienTich(), t.chuVi());\n            // TODO: case cho các hình còn lại\n        };\n    }\n\n    public static void main(String[] args) {\n        List<HinhHoc> cacHinh = List.of(\n            new HinhTron(5),\n            new HinhChuNhat(4, 6),\n            new HinhVuong(3),\n            new HinhTamGiac(3, 4, 5)  // Tam giác vuông\n        );\n\n        cacHinh.forEach(h -> System.out.println(moTa(h)));\n\n        // TODO: Dùng Stream để tính tổng diện tích tất cả hình\n        double tongDienTich = cacHinh.stream()\n            // ...\n            .sum();\n        System.out.printf(\"Tổng diện tích: %.2f%n\", tongDienTich);\n    }\n}\n```\n\n---\n\n## Bài 3: Pattern Matching instanceof ⭐\n\n```java\nimport java.util.List;\n\npublic class PhanLoai {\n\n    // TODO: Viết method phanLoaiObject(Object obj) dùng pattern matching instanceof\n    // - Integer i  → \"Số nguyên: [value], chẵn/lẻ\"\n    // - Double d   → \"Số thực: [value], làm tròn = [round]\"\n    // - String s   → \"Chuỗi [length] ký tự: [toUpperCase]\"\n    // - List<?> l  → \"Danh sách [size] phần tử\"\n    // - null       → \"null\"\n    // - còn lại    → \"Không xác định: [className]\"\n    public static String phanLoai(Object obj) {\n        // TODO: Dùng if-else với pattern matching instanceof\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        List<Object> danhSach = List.of(\n            42, 3.14, \"Hello, Java!\", List.of(1, 2, 3), true, 'A'\n        );\n\n        danhSach.forEach(obj -> System.out.println(phanLoai(obj)));\n        System.out.println(phanLoai(null));\n    }\n}\n```\n\n**Bonus:** Viết lại `phanLoai` dùng **switch expression với pattern** (Java 21).\n\n---\n\n## Bài 4: Text Blocks — Template Builder ⭐\n\n**Yêu cầu:** Dùng text block để tạo các template:\n\n```java\npublic class TemplateBuilder {\n\n    // TODO: Method taoEmailHtml(String ten, String cauLacBo, String ngayBatDau)\n    // Trả về HTML email chào mừng thành viên mới\n    // Dùng text block + .formatted()\n    public static String taoEmailHtml(String ten, String cauLacBo, String ngayBatDau) {\n        return \"\"\"\n               <!DOCTYPE html>\n               <html>\n               <body>\n                   <h1>Chào mừng %s!</h1>\n                   <!-- TODO: Hoàn thiện template -->\n               </body>\n               </html>\n               \"\"\".formatted(/* TODO */);\n    }\n\n    // TODO: Method taoSQLQuery(String tenBang, String dieuKien, int limit)\n    // Trả về SQL query động\n    public static String taoSQLQuery(String tenBang, String dieuKien, int limit) {\n        return \"\"\"\n               SELECT *\n               FROM %s\n               WHERE %s\n               LIMIT %d\n               \"\"\".formatted(/* TODO */);\n    }\n\n    // TODO: Method taoJsonNguoiDung(String username, String email, String role)\n    // Trả về JSON string\n    public static String taoJsonNguoiDung(String username, String email, String role) {\n        // TODO\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        System.out.println(taoEmailHtml(\"Raize\", \"Java Learners\", \"2025-01-01\"));\n        System.out.println(\"---\");\n        System.out.println(taoSQLQuery(\"nguoi_dung\", \"active = true\", 10));\n        System.out.println(\"---\");\n        System.out.println(taoJsonNguoiDung(\"raize99\", \"r@mail.com\", \"ADMIN\"));\n    }\n}\n```\n\n---\n\n## Bài 5: var — Type Inference ⭐\n\n**Yêu cầu:** Refactor đoạn code sau — thay kiểu tường minh bằng `var` ở những chỗ **phù hợp**:\n\n```java\nimport java.util.*;\nimport java.util.stream.*;\n\npublic class VarDemo {\n    public static void main(String[] args) {\n        // TODO: Thay bằng var ở những chỗ kiểu rõ ràng từ ngữ cảnh\n        ArrayList<String> tenList = new ArrayList<String>();\n        tenList.add(\"Alice\");\n        tenList.add(\"Bob\");\n        tenList.add(\"Charlie\");\n\n        HashMap<String, Integer> diemMap = new HashMap<String, Integer>();\n        diemMap.put(\"Alice\", 95);\n        diemMap.put(\"Bob\", 87);\n        diemMap.put(\"Charlie\", 92);\n\n        // Giữ nguyên kiểu tường minh ở những chỗ KHÔNG nên dùng var\n        // (Nơi kiểu không rõ từ ngữ cảnh)\n        List<String> result = tenList.stream()\n            .filter(s -> diemMap.getOrDefault(s, 0) >= 90)\n            .sorted()\n            .collect(Collectors.toList());\n\n        System.out.println(\"Học sinh giỏi: \" + result);\n    }\n}\n```\n\n**Câu hỏi:**\n1. Dòng nào **nên** dùng `var`? Dòng nào **không nên**?\n2. Tại sao `var result = tenList.stream()...collect(Collectors.toList())` có thể gây hiểu nhầm?\n\n---\n\n## Bài 6 (Nâng Cao): Kết Hợp Tất Cả ⭐⭐⭐\n\n**Mô phỏng hệ thống thanh toán** dùng toàn bộ tính năng Modern Java:\n\n```java\n// TODO: Tạo sealed interface PhuongThucThanhToan với 3 permits:\n// - TheNganHang(String soThe, String nganHang, double hanMuc)\n// - ViDienTu(String soDienThoai, double soDu)\n// - TienMat()\n\n// TODO: Tạo record HoaDon(String maHD, double soTien, PhuongThucThanhToan phuongThuc)\n// Compact constructor: soTien > 0, maHD không blank\n\n// TODO: Viết method xacNhanThanhToan(HoaDon hd) dùng switch expression:\n// - TheNganHang: kiểm tra soTien <= hanMuc, in thông tin the\n// - ViDienTu: kiểm tra soTien <= soDu, in thông tin vi\n// - TienMat: luôn thành công, nhắc trả tiền thừa\n// Trả về ApiResponse<String> (bài 1B)\n\npublic class ThanhToanApp {\n    public static ApiResponse<String> xacNhan(HoaDon hd) {\n        return switch (hd.phuongThuc()) {\n            // TODO\n        };\n    }\n\n    public static void main(String[] args) {\n        var hoaDon1 = new HoaDon(\"HD001\", 500_000,\n            new TheNganHang(\"1234-5678\", \"Vietcombank\", 2_000_000));\n        var hoaDon2 = new HoaDon(\"HD002\", 1_500_000,\n            new ViDienTu(\"0901234567\", 1_000_000));  // Không đủ tiền!\n        var hoaDon3 = new HoaDon(\"HD003\", 100_000, new TienMat());\n\n        List.of(hoaDon1, hoaDon2, hoaDon3).forEach(hd -> {\n            var ket = xacNhan(hd);\n            System.out.printf(\"[%s] %s: %s%n\",\n                ket.success() ? \"✅\" : \"❌\", hd.maHD(), ket.message());\n        });\n    }\n}\n```\n\n---\n\n## Tóm Tắt Kiến Thức Cần Nhớ\n\n```\n✅ record: 1 dòng thay thế class data với constructor/getter/equals/toString\n✅ Compact constructor trong record: validate data khi khởi tạo\n✅ sealed class/interface: kiểm soát subtype — chỉ permitted class được extend/implement\n✅ Pattern matching instanceof: if (obj instanceof Type t) — check + bind 1 bước\n✅ Switch expression với pattern (Java 21): switch(obj) { case Type t -> ... }\n✅ Text block (\"\"\"): chuỗi nhiều dòng, dùng .formatted() để truyền tham số\n✅ var: type inference cho local variable — dùng khi kiểu rõ ràng từ ngữ cảnh\n✅ Virtual threads (Java 21): nhẹ, hàng triệu thread cho I/O tasks\n```\n\n---\n\n👉 **[Bài 25: Database với JDBC & JPA](../bai-25-database-jdbc-jpa/EXERCISES.md)**\n",
    "quizzes": [
      {
        "q": "Từ khóa `record` (Java 16) có mục đích chính là gì?",
        "options": [
          "Ghi lại lịch sử chạy (Logging).",
          "Tạo nhanh immutable class DTO, giảm boilerplate (getter, toString, equals, hashCode).",
          "Lưu dữ liệu thẳng vào SQL.",
          "Cấu hình server."
        ],
        "answer": 1,
        "explanation": "`record` tự động tạo: fields private final, constructor, accessors (không get prefix), toString(), equals(), hashCode()."
      },
      {
        "q": "Sealed class (Java 17) dùng để làm gì?",
        "options": [
          "Class không thể extend",
          "Giới hạn tập class được phép kế thừa, tăng type safety",
          "Class chỉ có static method",
          "Abstract class không có abstract method"
        ],
        "answer": 1,
        "explanation": "`sealed class Shape permits Circle, Rectangle, Triangle` chỉ cho phép 3 class cụ thể kế thừa, giúp exhaustive pattern matching."
      },
      {
        "q": "Switch Expression với Pattern Matching (Java 21) làm gì mới?",
        "options": [
          "Switch trả về void",
          "Cho phép match theo kiểu dữ liệu của object trong case",
          "Switch với regex",
          "Switch không cần default"
        ],
        "answer": 1,
        "explanation": "`case Integer i -> ...` match và extract cùng lúc. Kết hợp với sealed class cho exhaustive switch mạnh mẽ."
      },
      {
        "q": "Text Block (Java 15) là gì?",
        "options": [
          "Class chứa nhiều String",
          "Multi-line string literal dùng `\"\"\"` để viết JSON, HTML, SQL mà không cần escape",
          "StringBuilder nâng cấp",
          "Template engine"
        ],
        "answer": 1,
        "explanation": "Text Block: `\"\"\"...\"\"\"` giúp viết multi-line string dễ đọc, tự xử lý indent, không cần \\n và \\\"."
      },
      {
        "q": "var keyword (Java 10) dùng để làm gì?",
        "options": [
          "Khai báo biến dynamic typing như JavaScript",
          "Type inference cho local variable: compiler tự suy ra kiểu từ giá trị khởi tạo",
          "Khai báo biến global",
          "Tạo anonymous class"
        ],
        "answer": 1,
        "explanation": "`var list = new ArrayList<String>();` compiler suy ra kiểu là ArrayList<String>. Chỉ dùng cho local variable, không mất type safety."
      },
      {
        "q": "instanceof Pattern Matching (Java 16) cải thiện gì?",
        "options": [
          "instanceof nhanh hơn",
          "Kết hợp kiểm tra kiểu và cast trong một câu lệnh: `if (obj instanceof String s) {...}`",
          "instanceof trả về String",
          "instanceof không cần cast"
        ],
        "answer": 1,
        "explanation": "Thay vì `if (obj instanceof String) { String s = (String) obj; }`, dùng `if (obj instanceof String s)` ngắn gọn và an toàn hơn."
      },
      {
        "q": "Record có thể có phương thức không?",
        "options": [
          "Không, record chỉ chứa data",
          "Có, record có thể có instance methods, static methods, và compact constructors",
          "Chỉ có static methods",
          "Chỉ có phương thức toString()"
        ],
        "answer": 1,
        "explanation": "Record có thể có methods. Compact constructor cho phép validate data: `record Point(int x, int y) { Point { if(x < 0) throw ...; } }`"
      },
      {
        "q": "Switch expression (Java 14+) có bắt buộc phải xử lý tất cả case không?",
        "options": [
          "Không, có thể bỏ qua",
          "Có khi dùng với sealed class/enum - compiler kiểm tra exhaustiveness",
          "Chỉ bắt buộc với int",
          "Không bao giờ bắt buộc"
        ],
        "answer": 1,
        "explanation": "Khi switch expression với enum hoặc sealed class, compiler bắt buộc cover tất cả case. Đảm bảo không bỏ sót trường hợp."
      },
      {
        "q": "Stream.toList() (Java 16) khác Collectors.toList() thế nào?",
        "options": [
          "Hoàn toàn giống nhau",
          "toList() trả về unmodifiable List, ngắn gọn hơn",
          "toList() chỉ cho ArrayList",
          "Collectors.toList() nhanh hơn"
        ],
        "answer": 1,
        "explanation": "`stream.toList()` (Java 16+): ngắn gọn hơn, trả về unmodifiable list. `Collectors.toList()`: trả về mutable ArrayList."
      },
      {
        "q": "Optional.isEmpty() (Java 11) là gì?",
        "options": [
          "Phương thức mới tương đương !isPresent()",
          "Kiểm tra Optional null",
          "Xóa giá trị Optional",
          "So sánh hai Optional"
        ],
        "answer": 0,
        "explanation": "`isEmpty()` = `!isPresent()`. Java 11 thêm cho code đọc tự nhiên hơn: `if (opt.isEmpty())` thay vì `if (!opt.isPresent())`."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Modern Java (Records, Sealed, Switch)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# Bài Tập — Bài 24: Modern Java\n\n> 🟣 **Phase 5 – Bài 1/3** | Ôn tập: Records, Sealed Classes, Pattern Matching, Text Blocks\n\n---\n\n## Bài 1: Records — Data Classes Gọn Gàng ⭐\n\n### Part A — Chuyển Đổi Class Cũ Sang Record\n\nChuyển các class dưới đây sang `record`:\n\n```java\n// Class cũ 1 — chuyển sang record\npublic class ToaDo {\n    private final double x;\n    private final double y;\n\n    public ToaDo(double x, double y) { this.x = x; this.y = y; }\n    public double getX() { return x; }\n    public double getY() { return y; }\n    // equals, hashCode, toString...\n}\n\n// Class cũ 2 — chuyển sang record\npublic class SanPhamDTO {\n    private final int id;\n    private final String ten;\n    private final double gia;\n\n    // Constructor, getters, equals, hashCode, toString...\n}\n```\n\n**Yêu cầu:**\n1. Viết 2 record tương đương\n2. Thêm method `khoangCach(ToaDo khac)` vào record `ToaDo` (tính khoảng cách Euclidean)\n3. Thêm compact constructor vào `SanPhamDTO` để validate: gia > 0\n\n### Part B — Generic ...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 26,
    "title": "Database: JDBC, Hibernate & JPA",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "5 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 25: Database với JDBC & JPA\n\n> 🟣 **Phase 5 – Bài 2/3** | Thời gian: ~5 giờ\n\n---\n\nMọi ứng dụng thực tế đều cần lưu dữ liệu xuống database. Bài này Tôi sẽ dạy bạn **2 tầng công nghệ**:\n- **JDBC** — API cấp thấp, giao tiếp trực tiếp với DB bằng SQL\n- **JPA/Hibernate** — ORM (Object-Relational Mapping), map object Java ↔ bảng DB\n\nHiểu JDBC trước để biết JPA làm gì bên dưới. Sau đó dùng JPA vì nó tiết kiệm code hơn rất nhiều.\n\n---\n\n## 1. JDBC — Giao Tiếp Thẳng Với Database\n\n### Setup (Maven)\n\n```xml\n<dependency>\n    <groupId>mysql</groupId>\n    <artifactId>mysql-connector-java</artifactId>\n    <version>8.0.33</version>\n</dependency>\n```\n\n### Kết Nối Database\n\n```java\nimport java.sql.*;\n\npublic class DatabaseConnection {\n    private static final String URL  = \"jdbc:mysql://localhost:3306/raizeshop\";\n    private static final String USER = \"root\";\n    private static final String PASS = \"password\";\n\n    public static Connection getConnection() throws SQLException {\n        return DriverManager.getConnection(URL, USER, PASS);\n    }\n}\n```\n\n### CRUD Với JDBC\n\n```java\npublic class NguoiDungDAO {\n\n    // CREATE\n    public void them(NguoiDung u) throws SQLException {\n        String sql = \"INSERT INTO nguoi_dung (username, email, so_du) VALUES (?, ?, ?)\";\n\n        try (Connection conn = DatabaseConnection.getConnection();\n             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {\n\n            ps.setString(1, u.getUsername());\n            ps.setString(2, u.getEmail());\n            ps.setDouble(3, u.getSoDuVi());\n            ps.executeUpdate();\n\n            // Lấy ID tự tăng vừa được tạo\n            try (ResultSet rs = ps.getGeneratedKeys()) {\n                if (rs.next()) {\n                    u.setId(rs.getInt(1));\n                }\n            }\n        }\n    }\n\n    // READ\n    public Optional<NguoiDung> timTheoUsername(String username) throws SQLException {\n        String sql = \"SELECT * FROM nguoi_dung WHERE username = ?\";\n\n        try (Connection conn = DatabaseConnection.getConnection();\n             PreparedStatement ps = conn.prepareStatement(sql)) {\n\n            ps.setString(1, username);\n            try (ResultSet rs = ps.executeQuery()) {\n                if (rs.next()) {\n                    NguoiDung u = new NguoiDung(\n                        rs.getString(\"username\"),\n                        rs.getString(\"email\")\n                    );\n                    u.setId(rs.getInt(\"id\"));\n                    u.setSoDuVi(rs.getDouble(\"so_du\"));\n                    return Optional.of(u);\n                }\n            }\n        }\n        return Optional.empty();\n    }\n\n    // UPDATE\n    public void capNhatSoDu(int id, double soDuMoi) throws SQLException {\n        String sql = \"UPDATE nguoi_dung SET so_du = ? WHERE id = ?\";\n\n        try (Connection conn = DatabaseConnection.getConnection();\n             PreparedStatement ps = conn.prepareStatement(sql)) {\n\n            ps.setDouble(1, soDuMoi);\n            ps.setInt(2, id);\n            int soHangAnh = ps.executeUpdate();\n            if (soHangAnh == 0) throw new RuntimeException(\"User #\" + id + \" không tồn tại\");\n        }\n    }\n\n    // DELETE\n    public boolean xoa(int id) throws SQLException {\n        try (Connection conn = DatabaseConnection.getConnection();\n             PreparedStatement ps = conn.prepareStatement(\"DELETE FROM nguoi_dung WHERE id = ?\")) {\n            ps.setInt(1, id);\n            return ps.executeUpdate() > 0;\n        }\n    }\n}\n```\n\n> ⚠️ **Quan trọng:** Luôn dùng `PreparedStatement`, KHÔNG BAO GIỜ nối string SQL thủ công — đó là cách hacker SQL Injection tấn công!\n> ```java\n> // ❌ SQL Injection vulnerability!\n> String sql = \"SELECT * FROM users WHERE username = '\" + username + \"'\";\n> // Nếu username = \"'; DROP TABLE users; --\" → XÓA TOÀN BỘ DỮ LIỆU!\n>\n> // ✅ Dùng PreparedStatement với ?\n> String sql = \"SELECT * FROM users WHERE username = ?\";\n> ps.setString(1, username);  // Tự động escape ký tự nguy hiểm\n> ```\n\n---\n\n## 2. JPA & Hibernate — ORM Layer\n\n**ORM** = Object-Relational Mapping — tự động chuyển đổi giữa Java object và database table.\n\n```\nJava Object        ←→        Database Table\nNguoiDung               nguoi_dung\n  - id                    - id (PK, AUTO_INCREMENT)\n  - username              - username (VARCHAR)\n  - email                 - email (VARCHAR)\n  - soDuVi                - so_du (DECIMAL)\n```\n\n### Setup (Maven)\n\n```xml\n<dependency>\n    <groupId>org.hibernate.orm</groupId>\n    <artifactId>hibernate-core</artifactId>\n    <version>6.4.0.Final</version>\n</dependency>\n```\n\n### Entity Class — Ánh Xạ Java ↔ Table\n\n```java\nimport jakarta.persistence.*;\n\n@Entity                           // Đánh dấu là JPA entity\n@Table(name = \"nguoi_dung\")       // Tên bảng trong DB (nếu khác tên class)\npublic class NguoiDung {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment\n    private Integer id;\n\n    @Column(name = \"username\", nullable = false, unique = true, length = 20)\n    private String username;\n\n    @Column(nullable = false)\n    private String email;\n\n    @Column(name = \"so_du\", precision = 15, scale = 2)\n    private double soDuVi = 0;\n\n    @Column(name = \"created_at\", updatable = false)\n    private LocalDateTime createdAt = LocalDateTime.now();\n\n    // Relationship: 1 NguoiDung có nhiều DonHang\n    @OneToMany(mappedBy = \"nguoiMua\", cascade = CascadeType.ALL, fetch = FetchType.LAZY)\n    private List<DonHang> donHangs = new ArrayList<>();\n\n    // Constructor, getter, setter...\n}\n```\n\n### Repository Pattern Với JPA\n\n```java\nimport jakarta.persistence.*;\nimport java.util.Optional;\n\npublic class NguoiDungRepository {\n    private final EntityManagerFactory emf;\n\n    public NguoiDungRepository() {\n        emf = Persistence.createEntityManagerFactory(\"raizeshop\");\n    }\n\n    public NguoiDung save(NguoiDung u) {\n        EntityManager em = emf.createEntityManager();\n        try {\n            em.getTransaction().begin();\n            if (u.getId() == null) {\n                em.persist(u);     // INSERT\n            } else {\n                u = em.merge(u);   // UPDATE\n            }\n            em.getTransaction().commit();\n            return u;\n        } catch (Exception e) {\n            em.getTransaction().rollback();\n            throw e;\n        } finally {\n            em.close();\n        }\n    }\n\n    public Optional<NguoiDung> findById(int id) {\n        EntityManager em = emf.createEntityManager();\n        try {\n            NguoiDung u = em.find(NguoiDung.class, id);\n            return Optional.ofNullable(u);\n        } finally {\n            em.close();\n        }\n    }\n\n    // JPQL Query — SQL nhưng viết theo tên class Java, không phải tên bảng\n    public List<NguoiDung> findByRole(String role) {\n        EntityManager em = emf.createEntityManager();\n        try {\n            return em.createQuery(\n                \"SELECT u FROM NguoiDung u WHERE u.role = :role ORDER BY u.username\",\n                NguoiDung.class)\n                .setParameter(\"role\", role)\n                .getResultList();\n        } finally {\n            em.close();\n        }\n    }\n}\n```\n\n---\n\n## 3. Spring Data JPA — Cách Làm Trong Dự Án Thực\n\nTrong Spring Boot, bạn không cần viết Repository thủ công. Spring Data JPA tự generate:\n\n```java\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.data.jpa.repository.Query;\n\n// Interface thôi — Spring tự implement!\npublic interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {\n    // Spring tự generate: findAll(), findById(), save(), delete()...\n\n    // Đặt tên method đặc biệt → Spring tự generate SQL:\n    Optional<NguoiDung> findByUsername(String username);\n    List<NguoiDung> findByRoleOrderByUsernameAsc(String role);\n    boolean existsByEmail(String email);\n    long countByRole(String role);\n\n    // Custom JPQL query:\n    @Query(\"SELECT u FROM NguoiDung u WHERE u.soDuVi >= :min ORDER BY u.soDuVi DESC\")\n    List<NguoiDung> timNguoiDungGiau(@Param(\"min\") double minSoDu);\n}\n```\n\n---\n\n## 4. Transaction — Đảm Bảo Tính Toàn Vẹn\n\n```java\n// @Transactional: nếu method throw exception → rollback tất cả thay đổi\n@Service\npublic class MuaHangService {\n\n    @Transactional\n    public DonHang muaHang(int userId, int sanPhamId, int soLuong) {\n        NguoiDung user = userRepo.findById(userId).orElseThrow();\n        SanPham sp = spRepo.findById(sanPhamId).orElseThrow();\n\n        double tongTien = sp.getGia() * soLuong;\n\n        // Bước 1: Trừ tiền user\n        if (user.getSoDuVi() < tongTien) throw new SoDuKhongDuException();\n        user.setSoDuVi(user.getSoDuVi() - tongTien);\n\n        // Bước 2: Trừ kho\n        if (sp.getSoLuong() < soLuong) throw new KhoKhongDuException();\n        sp.setSoLuong(sp.getSoLuong() - soLuong);\n\n        // Bước 3: Tạo đơn hàng\n        DonHang don = new DonHang(user, sp, soLuong, tongTien);\n\n        // Nếu BẤT KỲ bước nào throw → Transaction rollback → không bước nào được lưu!\n        userRepo.save(user);\n        spRepo.save(sp);\n        return donHangRepo.save(don);\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 25\n\n```\n✅ JDBC: kết nối DB thấp cấp — Connection, PreparedStatement, ResultSet\n✅ PreparedStatement: LUÔN dùng thay vì nối string (tránh SQL Injection!)\n✅ JPA @Entity: ánh xạ class Java ↔ bảng DB\n✅ EntityManager: giao tiếp với DB qua JPA (persist, find, merge, remove)\n✅ JPQL: SQL viết theo tên entity Java, không phải tên bảng\n✅ Spring Data JPA: interface thôi, Spring tự implement (findBy..., existsBy...)\n✅ @Transactional: đảm bảo tất cả hoặc không gì được lưu\n```\n\n---\n\n👉 **[Bài 26: Spring Boot — Bước Vào Framework](../bai-26-spring-boot/README.md)**\n",
    "exercisesMarkdown": "# Bài Tập — Bài 25: Database với JDBC & JPA\n\n> 🟣 **Phase 5 – Bài 2/3** | Ôn tập: JDBC, PreparedStatement, JPA Entity, JPQL\n\n---\n\n## Chuẩn Bị\n\nTạo database MySQL cho các bài tập:\n\n```sql\nCREATE DATABASE raize_hoc;\nUSE raize_hoc;\n\nCREATE TABLE san_pham (\n    id          INT AUTO_INCREMENT PRIMARY KEY,\n    ten         VARCHAR(100) NOT NULL,\n    gia         DECIMAL(15, 2) NOT NULL,\n    so_luong    INT DEFAULT 0,\n    danh_muc    VARCHAR(50),\n    ngay_tao    DATETIME DEFAULT NOW()\n);\n\nCREATE TABLE nguoi_dung (\n    id          INT AUTO_INCREMENT PRIMARY KEY,\n    username    VARCHAR(20) UNIQUE NOT NULL,\n    email       VARCHAR(100) NOT NULL,\n    so_du       DECIMAL(15, 2) DEFAULT 0,\n    role        VARCHAR(20) DEFAULT 'USER'\n);\n\n-- Dữ liệu mẫu\nINSERT INTO san_pham (ten, gia, so_luong, danh_muc) VALUES\n    ('Kiếm Thần', 150000, 50, 'vu-khi'),\n    ('Giáp Rồng', 280000, 20, 'giap'),\n    ('Thuốc Hồi Máu', 5000, 500, 'do-dung'),\n    ('Cung Thần', 200000, 30, 'vu-khi'),\n    ('Khiên Bạc', 95000, 40, 'giap');\n\nINSERT INTO nguoi_dung (username, email, so_du, role) VALUES\n    ('raize99', 'raize@mail.com', 1000000, 'ADMIN'),\n    ('player1', 'p1@mail.com', 500000, 'USER'),\n    ('player2', 'p2@mail.com', 250000, 'USER');\n```\n\n---\n\n## Bài 1: JDBC — CRUD Cơ Bản ⭐\n\n### Part A — Kết Nối và Read\n\n```java\nimport java.sql.*;\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class SanPhamDAO {\n    private static final String URL  = \"jdbc:mysql://localhost:3306/raize_hoc\";\n    private static final String USER = \"root\";\n    private static final String PASS = \"your_password\";\n\n    public static Connection getConnection() throws SQLException {\n        return DriverManager.getConnection(URL, USER, PASS);\n    }\n\n    // TODO 1: Lấy tất cả sản phẩm, sắp xếp theo giá tăng dần\n    public List<SanPham> layTatCa() throws SQLException {\n        String sql = \"SELECT * FROM san_pham ORDER BY gia ASC\";\n        List<SanPham> danhSach = new ArrayList<>();\n\n        try (Connection conn = getConnection();\n             PreparedStatement ps = conn.prepareStatement(sql);\n             ResultSet rs = ps.executeQuery()) {\n\n            while (rs.next()) {\n                // TODO: Map ResultSet → SanPham object\n                danhSach.add(/* TODO */);\n            }\n        }\n        return danhSach;\n    }\n\n    // TODO 2: Tìm sản phẩm theo danh mục\n    public List<SanPham> timTheoDanhMuc(String danhMuc) throws SQLException {\n        // TODO: Dùng PreparedStatement với tham số ?\n        return new ArrayList<>();\n    }\n\n    // TODO 3: Thêm sản phẩm mới, trả về ID được tạo\n    public int them(SanPham sp) throws SQLException {\n        String sql = \"INSERT INTO san_pham (ten, gia, so_luong, danh_muc) VALUES (?, ?, ?, ?)\";\n        // TODO: Dùng Statement.RETURN_GENERATED_KEYS\n        return -1;\n    }\n\n    // TODO 4: Cập nhật số lượng\n    public boolean capNhatSoLuong(int id, int soLuongMoi) throws SQLException {\n        // TODO\n        return false;\n    }\n\n    // TODO 5: Xóa sản phẩm theo ID\n    public boolean xoa(int id) throws SQLException {\n        // TODO\n        return false;\n    }\n}\n```\n\n### Part B — Main Test\n\n```java\npublic class TestJDBC {\n    public static void main(String[] args) throws SQLException {\n        SanPhamDAO dao = new SanPhamDAO();\n\n        // Test READ\n        System.out.println(\"=== Tất cả sản phẩm ===\");\n        dao.layTatCa().forEach(System.out::println);\n\n        // Test INSERT\n        SanPham moi = new SanPham(0, \"Phi Tiêu Vàng\", 3000, 200, \"vu-khi\");\n        int newId = dao.them(moi);\n        System.out.println(\"\\nThêm thành công, ID = \" + newId);\n\n        // Test UPDATE\n        dao.capNhatSoLuong(newId, 150);\n        System.out.println(\"Cập nhật số lượng thành công\");\n\n        // Test DELETE\n        dao.xoa(newId);\n        System.out.println(\"Xóa thành công\");\n\n        // Test tìm theo danh mục\n        System.out.println(\"\\n=== Vũ khí ===\");\n        dao.timTheoDanhMuc(\"vu-khi\").forEach(System.out::println);\n    }\n}\n```\n\n---\n\n## Bài 2: SQL Injection — Nhận Biết và Phòng Chống ⭐⭐\n\n**Yêu cầu:** Phân tích 2 version sau và giải thích rủi ro:\n\n```java\npublic class BaoMatDAO {\n\n    // ❌ VERSION 1: Nguy hiểm — SQL Injection\n    public boolean dangNhapKhongAnToan(String username, String matKhau) throws SQLException {\n        // Nối string trực tiếp — NGUY HIỂM!\n        String sql = \"SELECT * FROM nguoi_dung WHERE username = '\" + username\n                   + \"' AND mat_khau = '\" + matKhau + \"'\";\n        try (Connection conn = SanPhamDAO.getConnection();\n             Statement stmt = conn.createStatement();\n             ResultSet rs = stmt.executeQuery(sql)) {\n            return rs.next();\n        }\n    }\n\n    // ✅ VERSION 2: An toàn — PreparedStatement\n    public boolean dangNhapAnToan(String username, String matKhau) throws SQLException {\n        // TODO: Viết lại dùng PreparedStatement\n        return false;\n    }\n\n    public static void main(String[] args) throws SQLException {\n        BaoMatDAO dao = new BaoMatDAO();\n\n        // Tấn công SQL Injection:\n        String username = \"' OR '1'='1\";\n        String matKhau  = \"' OR '1'='1\";\n\n        // TODO: Giải thích tại sao version 1 trả về true (đăng nhập được mà không cần mật khẩu đúng)\n        // TODO: Giải thích tại sao version 2 luôn trả về false với input trên\n        System.out.println(\"Version 1 (nguy hiểm): \" + dao.dangNhapKhongAnToan(username, matKhau));\n        System.out.println(\"Version 2 (an toàn): \" + dao.dangNhapAnToan(username, matKhau));\n    }\n}\n```\n\n---\n\n## Bài 3: JPA Entity — Ánh Xạ Database ⭐⭐\n\n**Yêu cầu:** Tạo JPA Entity cho bảng `san_pham` và `nguoi_dung`:\n\n```java\n// TODO: Tạo SanPhamEntity với đầy đủ JPA annotations:\n// @Entity, @Table(name = \"san_pham\")\n// @Id, @GeneratedValue(strategy = GenerationType.IDENTITY)\n// @Column cho từng field với thuộc tính phù hợp:\n//   - ten: nullable = false, length = 100\n//   - gia: precision = 15, scale = 2\n//   - soLuong: default = 0\n//   - danhMuc: nullable = true\n//   - ngayTao: column = \"ngay_tao\", updatable = false\n\nimport jakarta.persistence.*;\nimport java.time.LocalDateTime;\n\n@Entity\n@Table(name = \"san_pham\")\npublic class SanPhamEntity {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Integer id;\n\n    // TODO: Thêm đầy đủ annotations cho các fields sau:\n    private String ten;\n    private double gia;\n    private int soLuong;\n    private String danhMuc;\n    private LocalDateTime ngayTao;\n\n    // TODO: Thêm relationship: @ManyToOne NguoiDungEntity (người tạo sản phẩm)\n    // FetchType.LAZY, nullable = true\n\n    // TODO: Constructor, getters, setters\n}\n```\n\n```java\n// TODO: Tạo NguoiDungEntity tương tự\n// Thêm @OneToMany relationship với SanPhamEntity (mappedBy = \"nguoiTao\")\n```\n\n---\n\n## Bài 4: JPQL — Truy Vấn Nâng Cao ⭐⭐\n\nViết các JPQL query tương đương với SQL sau:\n\n```java\npublic class SanPhamRepository {\n    private EntityManagerFactory emf;\n\n    public SanPhamRepository() {\n        emf = Persistence.createEntityManagerFactory(\"raize_hoc\");\n    }\n\n    // SQL: SELECT * FROM san_pham WHERE gia BETWEEN minGia AND maxGia ORDER BY gia\n    // TODO: Viết bằng JPQL (dùng tên entity Java, không phải tên bảng SQL)\n    public List<SanPhamEntity> timTheoKhoangGia(double minGia, double maxGia) {\n        EntityManager em = emf.createEntityManager();\n        try {\n            return em.createQuery(\n                \"/* TODO: JPQL query */\",\n                SanPhamEntity.class)\n                .setParameter(\"min\", minGia)\n                .setParameter(\"max\", maxGia)\n                .getResultList();\n        } finally {\n            em.close();\n        }\n    }\n\n    // SQL: SELECT danh_muc, COUNT(*), AVG(gia) FROM san_pham GROUP BY danh_muc\n    // TODO: JPQL với aggregate functions và GROUP BY\n    public List<Object[]> thongKeoTheoDanhMuc() {\n        EntityManager em = emf.createEntityManager();\n        try {\n            return em.createQuery(\n                \"/* TODO */\"\n            ).getResultList();\n        } finally {\n            em.close();\n        }\n    }\n\n    // SQL: SELECT * FROM san_pham WHERE so_luong < 10 ORDER BY so_luong ASC\n    // TODO: Sản phẩm gần hết hàng\n    public List<SanPhamEntity> ganHetHang(int nguongCanhBao) {\n        // TODO\n        return new ArrayList<>();\n    }\n\n    // TODO: Transaction — Mua hàng (trừ số lượng SP + trừ tiền NguoiDung)\n    public void muaHang(int userId, int spId, int soLuongMua) {\n        EntityManager em = emf.createEntityManager();\n        try {\n            em.getTransaction().begin();\n\n            // 1. Tìm sản phẩm\n            SanPhamEntity sp = em.find(SanPhamEntity.class, spId);\n            if (sp == null) throw new RuntimeException(\"Sản phẩm không tồn tại\");\n            if (sp.getSoLuong() < soLuongMua) throw new RuntimeException(\"Không đủ hàng\");\n\n            // 2. Tìm người dùng\n            NguoiDungEntity u = em.find(NguoiDungEntity.class, userId);\n            double tongTien = sp.getGia() * soLuongMua;\n            if (u.getSoDu() < tongTien) throw new RuntimeException(\"Không đủ tiền\");\n\n            // TODO: Trừ số lượng SP, trừ tiền user, save cả 2\n            // (Nếu có lỗi → transaction tự rollback)\n\n            em.getTransaction().commit();\n        } catch (Exception e) {\n            em.getTransaction().rollback();\n            throw e;\n        } finally {\n            em.close();\n        }\n    }\n}\n```\n\n---\n\n## Bài 5 (Nâng Cao): So Sánh JDBC vs JPA ⭐⭐⭐\n\nViết cùng 1 chức năng bằng cả 2 cách, sau đó so sánh:\n\n**Chức năng:** Tìm top 3 sản phẩm đắt nhất trong từng danh mục.\n\n```java\n// CÁCH 1: JDBC\npublic class TopSanPhamJDBC {\n    public Map<String, List<SanPham>> topTheoLoai(int top) throws SQLException {\n        // SQL:\n        // SELECT s1.* FROM san_pham s1\n        // WHERE (SELECT COUNT(*) FROM san_pham s2\n        //        WHERE s2.danh_muc = s1.danh_muc AND s2.gia > s1.gia) < 3\n        // ORDER BY danh_muc, gia DESC\n        String sql = \"\"\"\n            SELECT s1.* FROM san_pham s1\n            WHERE (SELECT COUNT(*) FROM san_pham s2\n                   WHERE s2.danh_muc = s1.danh_muc \n                   AND s2.gia > s1.gia) < ?\n            ORDER BY s1.danh_muc, s1.gia DESC\n            \"\"\";\n        // TODO: Implement\n        return new HashMap<>();\n    }\n}\n\n// CÁCH 2: JPQL\npublic class TopSanPhamJPA {\n    public Map<String, List<SanPhamEntity>> topTheoLoai(int top) {\n        // TODO: JPQL tương đương\n        return new HashMap<>();\n    }\n}\n\n// So sánh:\npublic class SoSanh {\n    public static void main(String[] args) throws SQLException {\n        // TODO: Chạy cả 2 cách, in kết quả\n        // So sánh: code lượng dòng, khả năng đọc, hiệu suất\n    }\n}\n```\n\n**Viết báo cáo so sánh (comment trong code):**\n- JDBC: ưu điểm, nhược điểm\n- JPA: ưu điểm, nhược điểm\n- Khi nào nên dùng JDBC, khi nào nên dùng JPA?\n\n---\n\n## Tóm Tắt Kiến Thức Cần Nhớ\n\n```\n✅ JDBC: Connection → PreparedStatement → ResultSet (luôn try-with-resources)\n✅ PreparedStatement: dùng ? thay vì nối string — chống SQL Injection\n✅ Statement.RETURN_GENERATED_KEYS: lấy ID auto-increment vừa INSERT\n✅ JPA @Entity + @Table: ánh xạ class ↔ bảng\n✅ @Id + @GeneratedValue: khóa chính tự tăng\n✅ @Column: cấu hình cột (nullable, length, name...)\n✅ @OneToMany / @ManyToOne: quan hệ giữa các entity\n✅ EntityManager.persist() = INSERT, merge() = UPDATE, remove() = DELETE\n✅ JPQL: viết theo tên Java class+field, không phải tên bảng SQL\n✅ Transaction: begin() → commit() hoặc rollback() nếu có lỗi (tất cả hoặc không gì)\n```\n\n---\n\n👉 **[Bài 26: Spring Boot — Bước Vào Framework](../bai-26-spring-boot/EXERCISES.md)**\n",
    "quizzes": [
      {
        "q": "ORM trong Hibernate/JPA giải quyết vấn đề gì?",
        "options": [
          "Tự động tối ưu hóa RAM.",
          "Ánh xạ bảng DB thành Entity class Java và ngược lại, thao tác dữ liệu bằng OOP thay vì SQL thủ công.",
          "Tự động mã hóa mật khẩu.",
          "Đọc file Excel."
        ],
        "answer": 1,
        "explanation": "ORM (Object-Relational Mapping) cầu nối OOP và SQL: tự động tạo/thực thi SQL từ thao tác trên object."
      },
      {
        "q": "JDBC là gì?",
        "options": [
          "Java Database Compiler",
          "Java Database Connectivity - API chuẩn của Java để kết nối và thao tác database",
          "JSON Database Connection",
          "Java Data Buffer Cache"
        ],
        "answer": 1,
        "explanation": "JDBC là API chuẩn cho phép Java kết nối tới bất kỳ RDBMS nào qua Driver tương ứng (MySQL Driver, PostgreSQL Driver...)."
      },
      {
        "q": "Annotation @Entity trong JPA dùng để làm gì?",
        "options": [
          "Đánh dấu class là abstract",
          "Đánh dấu class là JPA entity - ánh xạ sang một bảng trong database",
          "Tạo database tự động",
          "Định nghĩa query"
        ],
        "answer": 1,
        "explanation": "@Entity đánh dấu class được quản lý bởi JPA, ánh xạ sang table (tên mặc định = tên class)."
      },
      {
        "q": "@Id trong JPA annotation làm gì?",
        "options": [
          "Tăng tốc query",
          "Đánh dấu field là Primary Key của entity/table",
          "Đặt unique constraint",
          "Tạo index"
        ],
        "answer": 1,
        "explanation": "@Id đánh dấu field là primary key. Thường dùng cùng @GeneratedValue để PK tự động tăng."
      },
      {
        "q": "EntityManager trong JPA dùng để làm gì?",
        "options": [
          "Quản lý server",
          "Interface chính để thực hiện CRUD operations: persist, find, remove, merge",
          "Quản lý transaction",
          "Tạo query"
        ],
        "answer": 1,
        "explanation": "EntityManager là interface trung tâm của JPA: persist() lưu, find() tìm, remove() xóa, merge() cập nhật entity."
      },
      {
        "q": "Vấn đề N+1 queries trong Hibernate là gì?",
        "options": [
          "Chạy query 1 lần nhưng lấy N kết quả",
          "Chạy 1 query lấy N entities, sau đó N query nữa để load mỗi association → hiệu suất kém",
          "Giới hạn N rows trong kết quả",
          "Lỗi kết nối database"
        ],
        "answer": 1,
        "explanation": "N+1: load 10 Order, mỗi Order lazy-load Customer → 1+10=11 queries. Fix bằng JOIN FETCH hoặc @BatchSize."
      },
      {
        "q": "HQL (Hibernate Query Language) khác SQL ở điểm gì?",
        "options": [
          "HQL dùng cú pháp khác hoàn toàn",
          "HQL dùng tên Java class/field thay vì tên table/column SQL, database-independent",
          "HQL chỉ cho SELECT",
          "HQL chạy trực tiếp trên DB"
        ],
        "answer": 1,
        "explanation": "HQL: `from Order o where o.customer.name = :name` dùng entity và property Java. Hibernate dịch sang SQL phù hợp với DB đang dùng."
      },
      {
        "q": "Transaction trong database có đặc tính gì (ACID)?",
        "options": [
          "Available, Consistent, Isolated, Durable",
          "Atomic, Consistent, Isolated, Durable",
          "Automated, Controlled, Integrated, Direct",
          "Available, Cached, Isolated, Defined"
        ],
        "answer": 1,
        "explanation": "ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (không ảnh hưởng nhau), Durability (bền vững sau commit)."
      },
      {
        "q": "Spring Data JPA Repository cung cấp gì?",
        "options": [
          "Chỉ cung cấp kết nối DB",
          "Auto-implement CRUD methods (findById, save, delete...) và query từ method name",
          "Tạo table tự động",
          "Quản lý connection pool"
        ],
        "answer": 1,
        "explanation": "Extends JpaRepository<Entity, ID> → Spring auto-generates implementations. `findByName()` tự tạo query từ tên method."
      },
      {
        "q": "Lazy Loading trong Hibernate là gì?",
        "options": [
          "Load entity chậm",
          "Association chỉ được load từ DB khi thực sự cần truy cập (lazy - theo yêu cầu)",
          "Caching trong RAM",
          "Load toàn bộ DB vào memory"
        ],
        "answer": 1,
        "explanation": "Lazy: `@OneToMany(fetch = LAZY)` → collection không load khi load entity cha. Chỉ query khi code truy cập collection. Giảm query không cần thiết."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Database: JDBC, Hibernate & JPA\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# Bài Tập — Bài 25: Database với JDBC & JPA\n\n> 🟣 **Phase 5 – Bài 2/3** | Ôn tập: JDBC, PreparedStatement, JPA Entity, JPQL\n\n---\n\n## Chuẩn Bị\n\nTạo database MySQL cho các bài tập:\n\n```sql\nCREATE DATABASE raize_hoc;\nUSE raize_hoc;\n\nCREATE TABLE san_pham (\n    id          INT AUTO_INCREMENT PRIMARY KEY,\n    ten         VARCHAR(100) NOT NULL,\n    gia         DECIMAL(15, 2) NOT NULL,\n    so_luong    INT DEFAULT 0,\n    danh_muc    VARCHAR(50),\n    ngay_tao    DATETIME DEFAULT NOW()\n);\n\nCREATE TABLE nguoi_dung (\n    id          INT AUTO_INCREMENT PRIMARY KEY,\n    username    VARCHAR(20) UNIQUE NOT NULL,\n    email       VARCHAR(100) NOT NULL,\n    so_du       DECIMAL(15, 2) DEFAULT 0,\n    role        VARCHAR(20) DEFAULT 'USER'\n);\n\n-- Dữ liệu mẫu\nINSERT INTO san_pham (ten, gia, so_luong, danh_muc) VALUES\n    ('Kiếm Thần', 150000, 50, 'vu-khi'),\n    ('Giáp Rồng', 280000, 20, 'giap'),\n    ('Thuốc Hồi Máu', 5000, 500, 'do-dung'),\n    ('Cung Thần', 200000, 30, 'vu-khi'),\n    ('Khiên Bạc', 95000, 40,...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 27,
    "title": "Cách 1: spring initializr (https://start.spring.io)",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "8 giờ",
    "difficulty": "Khó",
    "theory": "﻿# Bài 26: Spring Boot — Bước Vào Framework\n\n> 🟣 **Phase 5 – Bài 3/3** | Thời gian: ~8 giờ (Bài học lớn nhất!)\n\n---\n\nĐây là bài cuối của lộ trình. Nhưng Tôi muốn nói rõ trước: **Spring Boot không phải điểm kết thúc — đây là điểm bắt đầu của một hành trình mới**. Tuy nhiên, sau 25 bài học, bạn đã có đủ nền tảng để học Spring Boot một cách thực sự hiểu sâu, không chỉ copy-paste.\n\nDự án RaizeShop mà bạn đang tham khảo — chính là Spring Boot!\n\n---\n\n## 1. Spring Boot Là Gì?\n\n**Spring Framework** = Bộ công cụ khổng lồ cho Java enterprise development (IoC Container, DI, AOP, MVC, Security, Data...).\n\n**Spring Boot** = Spring + auto-configuration. Giúp bạn khởi tạo Spring app mà không cần cấu hình 100 trang XML như thời Spring 2.x.\n\n```\nKhông có Spring Boot:\n  - Cấu hình XML phức tạp\n  - Phải deploy lên Tomcat riêng\n  - Tích hợp thư viện thủ công\n\nVới Spring Boot:\n  - Application.java + @SpringBootApplication → Chạy!\n  - Embedded server (Tomcat built-in)\n  - Auto-configuration dựa trên thư viện trong classpath\n```\n\n---\n\n## 2. Khởi Tạo Dự Án\n\n```bash\n# Cách 1: spring initializr (https://start.spring.io)\n# Cách 2: IntelliJ → New Project → Spring Initializr\n# Cách 3: Spring Boot CLI\n```\n\n**Chọn dependencies:**\n- Spring Web (REST API)\n- Spring Data JPA\n- MySQL Driver\n- Spring Security\n- Lombok (giảm boilerplate)\n- Spring Boot DevTools (hot reload)\n\n**Cấu trúc project sau tạo:**\n```\nsrc/\n└── main/\n    ├── java/com/example/raizeshop/\n    │   ├── RaizeshopApplication.java  ← Entry point\n    │   ├── controller/\n    │   ├── service/\n    │   ├── repository/\n    │   ├── entity/\n    │   ├── dto/\n    │   └── config/\n    └── resources/\n        └── application.properties    ← Cấu hình\n```\n\n---\n\n## 3. application.properties — Cấu Hình Ứng Dụng\n\n```properties\n# Database\nspring.datasource.url=jdbc:mysql://localhost:3306/raizeshop\nspring.datasource.username=root\nspring.datasource.password=password\nspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver\n\n# JPA\nspring.jpa.hibernate.ddl-auto=update       # create/update/validate/none\nspring.jpa.show-sql=true                   # In SQL ra console\nspring.jpa.properties.hibernate.format_sql=true\n\n# Server\nserver.port=8080\nserver.servlet.context-path=/api           # Prefix /api cho tất cả endpoint\n\n# Logging\nlogging.level.com.example=DEBUG\n```\n\n---\n\n## 4. IoC & Dependency Injection — Trái Tim Spring\n\n**IoC (Inversion of Control):** Thay vì bạn `new` object, Spring quản lý vòng đời của chúng.\n\n**Dependency Injection:** Spring \"inject\" dependency vào class thay vì class tự tạo.\n\n```java\n// ❌ Không có DI — tight coupling:\npublic class DonHangService {\n    private DonHangRepository repo = new DonHangRepository();  // Hard-coded!\n    private EmailService email = new EmailService();           // Khó test!\n}\n\n// ✅ Với Spring DI — loose coupling:\n@Service\npublic class DonHangService {\n    private final DonHangRepository repo;\n    private final EmailService email;\n\n    // Constructor injection — cách khuyên dùng\n    public DonHangService(DonHangRepository repo, EmailService email) {\n        this.repo = repo;\n        this.email = email;\n    }\n    // Spring tự inject khi khởi động ứng dụng!\n}\n```\n\n---\n\n## 5. Annotations Quan Trọng\n\n```java\n// Stereotype annotations — Spring tự detect và quản lý:\n@Component      // Bean thông thường\n@Service        // Business logic layer — kế thừa @Component\n@Repository     // Data access layer — kế thừa @Component\n@Controller     // Web layer (trả về View) — kế thừa @Component\n@RestController // Web layer REST API (= @Controller + @ResponseBody)\n\n// Cấu hình:\n@Configuration  // Class chứa bean definitions\n@Bean           // Method trả về bean instance\n\n// Dependency Injection:\n@Autowired      // Inject dependency (field/setter injection)\n// Constructor injection — không cần @Autowired nếu chỉ có 1 constructor\n@Qualifier(\"redisCache\")  // Chọn bean cụ thể khi có nhiều cùng type\n\n// Scope:\n@Scope(\"prototype\")      // Tạo bean mới mỗi lần inject (default: singleton)\n```\n\n---\n\n## 6. REST Controller — Xây Dựng API\n\n```java\n@RestController\n@RequestMapping(\"/api/v1/san-pham\")  // Base URL\npublic class SanPhamController {\n\n    private final SanPhamService sanPhamService;\n\n    public SanPhamController(SanPhamService sanPhamService) {\n        this.sanPhamService = sanPhamService;\n    }\n\n    // GET /api/v1/san-pham — Lấy tất cả\n    @GetMapping\n    public ResponseEntity<List<SanPhamDTO>> getAll() {\n        return ResponseEntity.ok(sanPhamService.layTatCa());\n    }\n\n    // GET /api/v1/san-pham/1 — Lấy theo ID\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<SanPhamDTO> getById(@PathVariable int id) {\n        return sanPhamService.timTheoId(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n\n    // POST /api/v1/san-pham — Tạo mới\n    @PostMapping\n    public ResponseEntity<SanPhamDTO> create(@RequestBody @Valid TaoSanPhamRequest req) {\n        SanPhamDTO created = sanPhamService.taoBan(req);\n        URI location = URI.create(\"/api/v1/san-pham/\" + created.getId());\n        return ResponseEntity.created(location).body(created);\n    }\n\n    // PUT /api/v1/san-pham/1 — Cập nhật\n    @PutMapping(\"/{id}\")\n    public ResponseEntity<SanPhamDTO> update(\n            @PathVariable int id,\n            @RequestBody @Valid CapNhatSanPhamRequest req) {\n        return ResponseEntity.ok(sanPhamService.capNhat(id, req));\n    }\n\n    // DELETE /api/v1/san-pham/1 — Xóa\n    @DeleteMapping(\"/{id}\")\n    public ResponseEntity<Void> delete(@PathVariable int id) {\n        sanPhamService.xoa(id);\n        return ResponseEntity.noContent().build();\n    }\n\n    // GET /api/v1/san-pham?danh-muc=weapon&min-gia=100000&page=1&size=10\n    @GetMapping(\"/search\")\n    public ResponseEntity<Page<SanPhamDTO>> search(\n            @RequestParam(required = false) String danhMuc,\n            @RequestParam(defaultValue = \"0\") double minGia,\n            @RequestParam(defaultValue = \"0\") int page,\n            @RequestParam(defaultValue = \"10\") int size) {\n        return ResponseEntity.ok(sanPhamService.timKiem(danhMuc, minGia, page, size));\n    }\n}\n```\n\n---\n\n## 7. Service Layer — Business Logic\n\n```java\n@Service\n@Transactional\npublic class SanPhamService {\n\n    private final SanPhamRepository sanPhamRepo;\n\n    public SanPhamService(SanPhamRepository sanPhamRepo) {\n        this.sanPhamRepo = sanPhamRepo;\n    }\n\n    @Transactional(readOnly = true)   // Tối ưu cho read operations\n    public List<SanPhamDTO> layTatCa() {\n        return sanPhamRepo.findAll().stream()\n            .map(this::toDTO)         // Entity → DTO\n            .collect(Collectors.toList());\n    }\n\n    @Transactional(readOnly = true)\n    public Optional<SanPhamDTO> timTheoId(int id) {\n        return sanPhamRepo.findById(id).map(this::toDTO);\n    }\n\n    public SanPhamDTO taoBan(TaoSanPhamRequest req) {\n        // Validate business rules\n        if (sanPhamRepo.existsByTen(req.getTen())) {\n            throw new TrungTenException(\"Sản phẩm '\" + req.getTen() + \"' đã tồn tại\");\n        }\n\n        SanPham sp = new SanPham();\n        sp.setTen(req.getTen());\n        sp.setGia(req.getGia());\n        sp.setSoLuong(req.getSoLuong());\n        sp.setDanhMuc(req.getDanhMuc());\n\n        return toDTO(sanPhamRepo.save(sp));\n    }\n\n    private SanPhamDTO toDTO(SanPham sp) {\n        return new SanPhamDTO(sp.getId(), sp.getTen(), sp.getGia(), sp.getSoLuong());\n    }\n}\n```\n\n---\n\n## 8. DTO — Không Expose Entity Trực Tiếp\n\n```java\n// ❌ Không expose Entity trực tiếp:\n// Entity có thể chứa password, các field nội bộ\n\n// ✅ Dùng DTO (Data Transfer Object) — chọn field muốn expose:\npublic record SanPhamDTO(\n    int id,\n    String ten,\n    double gia,\n    int soLuong\n) {\n    // Record = DTO hoàn hảo — immutable, gọn\n}\n\npublic record TaoSanPhamRequest(\n    @NotBlank String ten,\n    @Min(0) double gia,\n    @Min(0) int soLuong,\n    String danhMuc\n) {}\n```\n\n---\n\n## 9. Exception Handling Global\n\n```java\n@RestControllerAdvice  // Bắt exception từ tất cả Controller\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(TrungTenException.class)\n    public ResponseEntity<ErrorResponse> handleTrungTen(TrungTenException e) {\n        return ResponseEntity\n            .status(HttpStatus.CONFLICT)  // 409\n            .body(new ErrorResponse(\"DUPLICATE\", e.getMessage()));\n    }\n\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException e) {\n        return ResponseEntity\n            .status(HttpStatus.NOT_FOUND)  // 404\n            .body(new ErrorResponse(\"NOT_FOUND\", e.getMessage()));\n    }\n\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {\n        String errors = e.getBindingResult().getFieldErrors().stream()\n            .map(fe -> fe.getField() + \": \" + fe.getDefaultMessage())\n            .collect(Collectors.joining(\", \"));\n        return ResponseEntity\n            .status(HttpStatus.BAD_REQUEST)  // 400\n            .body(new ErrorResponse(\"VALIDATION_ERROR\", errors));\n    }\n\n    @ExceptionHandler(Exception.class)\n    public ResponseEntity<ErrorResponse> handleAll(Exception e) {\n        return ResponseEntity\n            .status(HttpStatus.INTERNAL_SERVER_ERROR)  // 500\n            .body(new ErrorResponse(\"SERVER_ERROR\", \"Lỗi server, vui lòng thử lại\"));\n    }\n\n    public record ErrorResponse(String code, String message) {}\n}\n```\n\n---\n\n## 10. Spring Security — Xác Thực & Phân Quyền\n\n```java\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(csrf -> csrf.disable())  // API thường disable CSRF\n            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/v1/auth/**\").permitAll()   // Login/register: public\n                .requestMatchers(HttpMethod.GET, \"/api/v1/san-pham/**\").permitAll() // Đọc SP: public\n                .requestMatchers(\"/api/v1/admin/**\").hasRole(\"ADMIN\")\n                .anyRequest().authenticated()                      // Còn lại: phải login\n            )\n            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // JWT\n            .build();\n    }\n\n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder();  // Hash password trước khi lưu DB\n    }\n}\n```\n\n---\n\n## 11. Con Đường Tiếp Theo\n\nBạn đã học xong lộ trình cơ bản đến Spring Boot. Nhưng hành trình vẫn còn tiếp:\n\n```\nTiếp theo nên học:\n┌──────────────────────────────────────────────────────┐\n│ 📦 Docker & Docker Compose                           │\n│    → Container hóa ứng dụng, deploy dễ dàng hơn     │\n├──────────────────────────────────────────────────────┤\n│ 🔴 Redis                                             │\n│    → Cache, session, rate limiting                   │\n├──────────────────────────────────────────────────────┤\n│ 📊 Monitoring: Actuator, Prometheus, Grafana         │\n│    → Theo dõi ứng dụng production                   │\n├──────────────────────────────────────────────────────┤\n│ 🚀 CI/CD: GitHub Actions, Jenkins                    │\n│    → Tự động test và deploy                          │\n├──────────────────────────────────────────────────────┤\n│ ☁️ Cloud: AWS/GCP/Azure cơ bản                      │\n│    → Deploy lên cloud                                │\n└──────────────────────────────────────────────────────┘\n```\n\n---\n\n## Tóm Tắt — Bài 26\n\n```\n✅ Spring Boot = Spring + autoconfiguration + embedded server\n✅ IoC: Spring quản lý bean lifecycle, không phải bạn\n✅ DI: Spring inject dependency (ưu tiên constructor injection)\n✅ @RestController + @GetMapping/PostMapping/...: xây dựng REST API\n✅ Service layer: business logic, @Transactional\n✅ Repository (Spring Data JPA): data access, Spring tự implement\n✅ DTO: không expose Entity trực tiếp ra ngoài\n✅ @RestControllerAdvice: xử lý exception tập trung\n✅ Spring Security: auth/authz với JWT\n```\n\n---\n\n## 🎓 CHÚC MỪNG — BẠN ĐÃ HOÀN THÀNH LỘ TRÌNH!\n\nBạn đã đi từng bước từ dòng `Hello World` đầu tiên đến Spring Boot REST API hoàn chỉnh. Đó là một hành trình rất dài và bạn đã kiên trì đi đến cuối.\n\n```\nPhase 1 ✅  Java Fundamentals    — Biến, vòng lặp, method, array...\nPhase 2 ✅  OOP                  — Class, Inheritance, Polymorphism...\nPhase 3 ✅  Java Intermediate    — Collections, Lambda, Stream API...\nPhase 4 ✅  Advanced Java        — Threading, Design Patterns, JVM...\nPhase 5 ✅  Modern Ecosystem     — Modern Java, JPA, Spring Boot...\n```\n\n**Lời nhắn của tôi:**\n> Code đẹp không phải code thông minh — code đẹp là code dễ đọc, dễ test, dễ thay đổi. Hãy luôn đặt câu hỏi \"Tại sao?\" và \"Có cách nào tốt hơn không?\" khi viết code.\n>\n> Chúc bạn trở thành Java developer xuất sắc!\n",
    "exercisesMarkdown": "# Bài Tập — Bài 26: Spring Boot\n\n> 🟣 **Phase 5 – Bài 3/3** | Ôn tập: IoC/DI, REST Controller, Service, Repository, Exception Handling\n\n---\n\n## Chuẩn Bị Dự Án\n\nTạo Spring Boot project tại [start.spring.io](https://start.spring.io) với:\n- **Group:** `com.raize`\n- **Artifact:** `raize-shop-mini`\n- **Dependencies:** Spring Web, Spring Data JPA, MySQL Driver, Lombok, Spring Validation\n\n---\n\n## Bài 1: Dependency Injection — Hiểu Cốt Lõi Spring ⭐\n\n### Part A — Phân Tích Code\n\nĐọc 2 version và giải thích sự khác biệt:\n\n```java\n// Version 1: Không có DI — tight coupling\npublic class DonHangServiceV1 {\n    private DonHangRepository repo = new DonHangRepository();  // Hard-coded!\n    private EmailService email = new EmailServiceImpl();       // Khó test, khó thay thế\n\n    public void datHang(DonHang don) {\n        repo.save(don);\n        email.gui(don.getEmail(), \"Xác nhận đơn hàng\");\n    }\n}\n\n// Version 2: Spring DI — loose coupling\n@Service\npublic class DonHangServiceV2 {\n    private final DonHangRepository repo;\n    private final EmailService email;\n\n    // Constructor injection\n    public DonHangServiceV2(DonHangRepository repo, EmailService email) {\n        this.repo = repo;\n        this.email = email;\n    }\n\n    public void datHang(DonHang don) {\n        repo.save(don);\n        email.gui(don.getEmail(), \"Xác nhận đơn hàng\");\n    }\n}\n```\n\n**Câu hỏi (trả lời bằng comment):**\n1. Tại sao `DonHangServiceV1` khó viết unit test?\n2. Trong `DonHangServiceV2`, ai tạo object `DonHangRepository` và `EmailService`?\n3. Nếu muốn đổi `EmailServiceImpl` thành `SmsServiceImpl`, V1 và V2 cần sửa ở đâu?\n4. Tại sao nên dùng **constructor injection** thay vì `@Autowired` trên field?\n\n### Part B — Tạo Bean Thực Tế\n\n```java\n// TODO: Tạo interface và 2 implementation, Spring chọn đúng bean theo profile\n\npublic interface ThongBaoService {\n    void gui(String nguoiNhan, String noiDung);\n}\n\n// @Component cho môi trường production\n// @Profile(\"prod\")\npublic class EmailThongBaoService implements ThongBaoService {\n    @Override\n    public void gui(String nguoiNhan, String noiDung) {\n        System.out.println(\"📧 Gửi email đến \" + nguoiNhan + \": \" + noiDung);\n    }\n}\n\n// @Component cho môi trường development\n// @Profile(\"dev\")\npublic class ConsoleThongBaoService implements ThongBaoService {\n    @Override\n    public void gui(String nguoiNhan, String noiDung) {\n        System.out.println(\"[CONSOLE] Thông báo → \" + nguoiNhan + \": \" + noiDung);\n    }\n}\n\n// TODO: Inject ThongBaoService vào một Service khác, test với cả 2 profile\n```\n\n---\n\n## Bài 2: REST API — CRUD Sản Phẩm ⭐⭐\n\nXây dựng REST API đầy đủ cho sản phẩm. **Cấu trúc bắt buộc:**\n\n```\nsrc/main/java/com/raize/raizeshopmini/\n├── entity/SanPham.java\n├── dto/\n│   ├── SanPhamDTO.java          (record)\n│   ├── TaoSanPhamRequest.java   (record với validation)\n│   └── CapNhatRequest.java      (record)\n├── repository/SanPhamRepository.java\n├── service/SanPhamService.java\n├── controller/SanPhamController.java\n└── exception/\n    ├── SanPhamKhongTonTaiException.java\n    └── GlobalExceptionHandler.java\n```\n\n### Entity\n\n```java\n@Entity\n@Table(name = \"san_pham\")\npublic class SanPham {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Integer id;\n\n    @Column(nullable = false, length = 100)\n    private String ten;\n\n    @Column(nullable = false)\n    private double gia;\n\n    @Column(name = \"so_luong\")\n    private int soLuong = 0;\n\n    @Column(length = 50)\n    private String danhMuc;\n\n    // TODO: Thêm getters, setters (hoặc dùng @Data từ Lombok)\n}\n```\n\n### DTO (dùng Record)\n\n```java\n// TODO: Tạo SanPhamDTO record với: id, ten, gia, soLuong, danhMuc\n\n// TODO: TaoSanPhamRequest record với validation:\n// - ten: @NotBlank, không quá 100 ký tự\n// - gia: @Min(0)\n// - soLuong: @Min(0)\n// - danhMuc: không bắt buộc\n\n// TODO: CapNhatRequest record (tương tự TaoSanPhamRequest)\n```\n\n### Repository\n\n```java\npublic interface SanPhamRepository extends JpaRepository<SanPham, Integer> {\n    // TODO: Thêm các method:\n    // 1. Tìm theo danh mục (trả về List)\n    // 2. Kiểm tra tên đã tồn tại chưa (existsBy...)\n    // 3. Tìm theo khoảng giá (Between)\n    // 4. Custom JPQL: tìm sản phẩm gần hết hàng (soLuong < nguong)\n}\n```\n\n### Service\n\n```java\n@Service\npublic class SanPhamService {\n    private final SanPhamRepository sanPhamRepo;\n\n    public SanPhamService(SanPhamRepository sanPhamRepo) {\n        this.sanPhamRepo = sanPhamRepo;\n    }\n\n    // TODO: Implement các method:\n    // 1. layTatCa() → List<SanPhamDTO>\n    // 2. timTheoId(int id) → SanPhamDTO (throw SanPhamKhongTonTaiException nếu không tìm thấy)\n    // 3. timTheoDanhMuc(String danhMuc) → List<SanPhamDTO>\n    // 4. tao(TaoSanPhamRequest req) → SanPhamDTO (validate tên không trùng)\n    // 5. capNhat(int id, CapNhatRequest req) → SanPhamDTO\n    // 6. xoa(int id) → void\n\n    // Helper: Entity → DTO\n    private SanPhamDTO toDTO(SanPham sp) {\n        // TODO\n        return null;\n    }\n}\n```\n\n### Controller\n\n```java\n@RestController\n@RequestMapping(\"/api/v1/san-pham\")\npublic class SanPhamController {\n    private final SanPhamService sanPhamService;\n\n    public SanPhamController(SanPhamService sanPhamService) {\n        this.sanPhamService = sanPhamService;\n    }\n\n    // TODO: Implement 6 endpoints:\n    // GET    /api/v1/san-pham                    → 200 + List<SanPhamDTO>\n    // GET    /api/v1/san-pham/{id}               → 200 + SanPhamDTO | 404\n    // GET    /api/v1/san-pham?danhMuc=vu-khi     → 200 + List<SanPhamDTO>\n    // POST   /api/v1/san-pham                    → 201 (Created) + SanPhamDTO\n    // PUT    /api/v1/san-pham/{id}               → 200 + SanPhamDTO\n    // DELETE /api/v1/san-pham/{id}               → 204 (No Content)\n}\n```\n\n---\n\n## Bài 3: Exception Handling Global ⭐⭐\n\n```java\n// Custom Exception\npublic class SanPhamKhongTonTaiException extends RuntimeException {\n    public SanPhamKhongTonTaiException(int id) {\n        super(\"Sản phẩm #\" + id + \" không tồn tại\");\n    }\n}\n\n// TODO: Tạo GlobalExceptionHandler với @RestControllerAdvice\n// Xử lý các exception:\n// 1. SanPhamKhongTonTaiException → 404 NOT FOUND\n// 2. MethodArgumentNotValidException → 400 BAD REQUEST (validation errors)\n// 3. IllegalStateException → 409 CONFLICT (tên trùng)\n// 4. Exception → 500 INTERNAL SERVER ERROR\n\n// Error response record:\npublic record ErrorResponse(\n    int status,\n    String error,\n    String message,\n    String timestamp\n) {}\n\n@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(SanPhamKhongTonTaiException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(SanPhamKhongTonTaiException e) {\n        // TODO\n        return null;\n    }\n\n    // TODO: Thêm các handler khác\n}\n```\n\n**Test bằng curl hoặc Postman:**\n```bash\n# Test 404\ncurl -X GET http://localhost:8080/api/v1/san-pham/9999\n\n# Test validation 400\ncurl -X POST http://localhost:8080/api/v1/san-pham \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"ten\": \"\", \"gia\": -100}'\n\n# Test 409 (tên trùng)\ncurl -X POST http://localhost:8080/api/v1/san-pham \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"ten\": \"Kiếm Thần\", \"gia\": 200000, \"soLuong\": 10}'\n```\n\n---\n\n## Bài 4: Nhiều Entity và Relationship ⭐⭐⭐\n\nThêm entity `DonHang` với relationship đến `SanPham` và `NguoiDung`:\n\n```java\n// TODO: Tạo DonHang entity\n@Entity\n@Table(name = \"don_hang\")\npublic class DonHang {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Integer id;\n\n    // @ManyToOne → NguoiDung (người mua)\n    // @ManyToOne → SanPham\n    // soLuong\n    // tongTien\n    // trangThai: \"DANG_XU_LY\" | \"HOAN_TAT\" | \"HUY\"\n    // ngayDatHang\n}\n\n// TODO: Tạo DonHangService với method datHang(int userId, int spId, int soLuong):\n// 1. Kiểm tra user tồn tại\n// 2. Kiểm tra SP tồn tại và đủ số lượng\n// 3. Kiểm tra user đủ tiền\n// 4. Trừ số lượng SP, trừ tiền user\n// 5. Tạo DonHang\n// Tất cả trong @Transactional — rollback nếu lỗi ở bất kỳ bước nào\n\n// TODO: Thêm endpoint:\n// POST /api/v1/don-hang { \"userId\": 1, \"spId\": 2, \"soLuong\": 3 }\n// GET  /api/v1/don-hang/user/{userId}\n```\n\n---\n\n## Bài 5 (Nâng Cao): Tích Hợp Đầy Đủ ⭐⭐⭐\n\nViết tính năng **Tìm kiếm + Phân trang**:\n\n```java\n// TODO: Endpoint:\n// GET /api/v1/san-pham/search?ten=kiem&minGia=100000&maxGia=500000&danhMuc=vu-khi&page=0&size=10&sort=gia,asc\n\n@GetMapping(\"/search\")\npublic ResponseEntity<Page<SanPhamDTO>> search(\n    @RequestParam(required = false) String ten,\n    @RequestParam(required = false) Double minGia,\n    @RequestParam(required = false) Double maxGia,\n    @RequestParam(required = false) String danhMuc,\n    @RequestParam(defaultValue = \"0\") int page,\n    @RequestParam(defaultValue = \"10\") int size,\n    @RequestParam(defaultValue = \"id,asc\") String sort\n) {\n    // TODO: Implement logic tìm kiếm linh hoạt\n    // Gợi ý: dùng Specification hoặc JPQL động\n    return null;\n}\n```\n\n**Gợi ý implementation:**\n```java\n// Trong Repository:\n@Query(\"SELECT s FROM SanPham s WHERE \" +\n       \"(:ten IS NULL OR LOWER(s.ten) LIKE LOWER(CONCAT('%', :ten, '%'))) AND \" +\n       \"(:minGia IS NULL OR s.gia >= :minGia) AND \" +\n       \"(:maxGia IS NULL OR s.gia <= :maxGia) AND \" +\n       \"(:danhMuc IS NULL OR s.danhMuc = :danhMuc)\")\nPage<SanPham> timKiem(@Param(\"ten\") String ten,\n                       @Param(\"minGia\") Double minGia,\n                       @Param(\"maxGia\") Double maxGia,\n                       @Param(\"danhMuc\") String danhMuc,\n                       Pageable pageable);\n```\n\n---\n\n## Kiểm Tra Cuối — Self-Review\n\nSau khi hoàn thành, hãy tự kiểm tra:\n\n```\n□ IoC/DI: các class đều dùng constructor injection, không dùng new trực tiếp\n□ Layered Architecture: Controller chỉ điều phối, logic ở Service, data ở Repository\n□ DTO: không expose Entity trực tiếp ra API response\n□ Validation: @Valid + @NotBlank/@Min/... trên Request DTO\n□ Exception Handling: GlobalExceptionHandler tập trung xử lý exception\n□ HTTP Status Code: 200 OK, 201 Created, 204 No Content, 400, 404, 409, 500\n□ @Transactional: đặt ở Service layer, readOnly = true cho read operations\n□ Không có business logic trong Controller\n□ Không có SQL thủ công trong Service (để Repository xử lý)\n```\n\n---\n\n## Tóm Tắt Kiến Thức Cần Nhớ\n\n```\n✅ IoC: Spring quản lý bean lifecycle — bạn không new object thủ công\n✅ DI: Constructor injection — dễ test, rõ ràng dependency\n✅ @RestController + @RequestMapping: xây dựng REST API\n✅ @GetMapping, @PostMapping, @PutMapping, @DeleteMapping: HTTP methods\n✅ @PathVariable: lấy biến từ URL (/san-pham/{id})\n✅ @RequestParam: lấy query param (?danhMuc=vu-khi)\n✅ @RequestBody + @Valid: nhận và validate JSON body\n✅ ResponseEntity: kiểm soát status code + body response\n✅ @Service + @Transactional: business logic layer\n✅ JpaRepository: CRUD miễn phí + findBy... tự generate\n✅ @RestControllerAdvice: xử lý exception tập trung\n✅ DTO (record): tách biệt API contract với database entity\n```\n\n---\n\n## 🎓 CHÚC MỪNG — ĐÃ HOÀN THÀNH TOÀN BỘ LỘ TRÌNH!\n\n```\nPhase 1 ✅  Java Fundamentals    — Biến, vòng lặp, method, array\nPhase 2 ✅  OOP                  — Class, Inheritance, Polymorphism\nPhase 3 ✅  Java Intermediate    — Collections, Lambda, Stream API\nPhase 4 ✅  Advanced Java        — Threading, Design Patterns, JVM, Testing\nPhase 5 ✅  Modern Ecosystem     — Modern Java, JPA, Spring Boot\n```\n\n**Bước tiếp theo:**\n- 📦 Docker & Docker Compose\n- 🔐 JWT Authentication đầy đủ\n- 🚀 CI/CD với GitHub Actions\n- ☁️ Deploy lên Cloud (AWS/GCP)\n",
    "quizzes": [
      {
        "q": "Dependency Injection (DI) trong Spring giúp ích gì?",
        "options": [
          "Tự động tải thư viện Maven.",
          "Giảm tight coupling, Spring IoC tự khởi tạo và inject dependencies vào class cần dùng.",
          "Tự động viết JUnit test.",
          "Tối ưu hóa biên dịch IntelliJ."
        ],
        "answer": 1,
        "explanation": "DI: Spring quản lý object lifecycle và inject dependencies qua Constructor, Setter, hoặc @Autowired."
      },
      {
        "q": "@SpringBootApplication annotation bao gồm những gì?",
        "options": [
          "Chỉ @EnableAutoConfiguration",
          "@Configuration + @EnableAutoConfiguration + @ComponentScan",
          "@RestController + @Service + @Repository",
          "@Bean + @Autowired"
        ],
        "answer": 1,
        "explanation": "@SpringBootApplication = @Configuration + @EnableAutoConfiguration (auto-configure) + @ComponentScan (scan beans)."
      },
      {
        "q": "@RestController vs @Controller khác nhau thế nào?",
        "options": [
          "Hoàn toàn giống nhau",
          "@RestController = @Controller + @ResponseBody (tự serialize response sang JSON)",
          "@RestController dùng cho frontend",
          "@Controller không có method"
        ],
        "answer": 1,
        "explanation": "@RestController tự động apply @ResponseBody cho mọi method, trả về JSON/XML trực tiếp. @Controller dùng khi trả về view (Thymeleaf)."
      },
      {
        "q": "@GetMapping, @PostMapping trong Spring MVC dùng để làm gì?",
        "options": [
          "Inject dependency",
          "Map HTTP GET/POST request đến method handler tương ứng",
          "Tạo bean",
          "Kết nối database"
        ],
        "answer": 1,
        "explanation": "@GetMapping(\"/users\") map HTTP GET /users đến method. @PostMapping map POST request. Shorthand cho @RequestMapping(method=GET/POST)."
      },
      {
        "q": "Spring Boot Auto-configuration làm gì?",
        "options": [
          "Tự viết code business logic",
          "Tự động cấu hình Spring beans dựa trên classpath dependencies (DataSource nếu có DB driver...)",
          "Deploy tự động lên cloud",
          "Tạo database schema"
        ],
        "answer": 1,
        "explanation": "Auto-config: nếu H2 trong classpath → cấu hình in-memory DB. Nếu Spring Security → bảo vệ endpoints. Giảm boilerplate config."
      },
      {
        "q": "application.properties (hoặc application.yml) trong Spring Boot dùng để làm gì?",
        "options": [
          "Chứa business logic",
          "Cấu hình ứng dụng: server port, DB connection, logging level...",
          "Lưu dữ liệu người dùng",
          "Khai báo dependencies"
        ],
        "answer": 1,
        "explanation": "application.properties: externalized config. `server.port=8080`, `spring.datasource.url=jdbc:postgresql://...`"
      },
      {
        "q": "@Service, @Repository, @Component trong Spring là gì?",
        "options": [
          "Annotation để tạo endpoint API",
          "Stereotype annotations đánh dấu class là Spring bean được quản lý bởi IoC Container",
          "Annotation cho JPA entity",
          "Annotation cho unit test"
        ],
        "answer": 1,
        "explanation": "Stereotypes: @Component (generic), @Service (business logic), @Repository (data access). Spring scan và tạo bean tự động."
      },
      {
        "q": "Spring Boot Starter là gì?",
        "options": [
          "Starter project template",
          "Dependency descriptor tập hợp dependencies liên quan (spring-boot-starter-web = Spring MVC + Tomcat + Jackson)",
          "Lệnh để start ứng dụng",
          "Template HTML"
        ],
        "answer": 1,
        "explanation": "Starters: one-stop-shop. spring-boot-starter-web bao gồm mọi thứ để build REST API. Không cần khai báo từng dep."
      },
      {
        "q": "Embedded server trong Spring Boot mặc định là gì?",
        "options": [
          "JBoss",
          "Tomcat (tích hợp sẵn trong spring-boot-starter-web)",
          "Nginx",
          "Apache"
        ],
        "answer": 1,
        "explanation": "Spring Boot nhúng Tomcat vào JAR. Chạy ứng dụng bằng `java -jar app.jar` mà không cần cài Tomcat riêng."
      },
      {
        "q": "spring-boot-starter-data-jpa thường dùng kèm với gì?",
        "options": [
          "spring-boot-starter-security",
          "spring-boot-starter-web",
          "Một JDBC driver (MySQL, PostgreSQL...) và cấu hình datasource trong application.properties",
          "spring-boot-starter-test"
        ],
        "answer": 2,
        "explanation": "JPA cần: spring-boot-starter-data-jpa (Hibernate + Spring Data) + JDBC driver (mysql-connector-java) + DB config trong properties."
      },
      {
        "q": "Cách expose REST API endpoint trả về List<User> tại /api/users trong Spring Boot?",
        "options": [
          "@GetMapping(\"/api/users\") trong @Controller",
          "@GetMapping(\"/api/users\") trong @RestController trả về List<User>",
          "@RequestMapping trong @Service",
          "@Repository method tên /api/users"
        ],
        "answer": 1,
        "explanation": "`@RestController` + `@GetMapping(\"/api/users\") public List<User> getUsers() { ... }`. Spring tự serialize thành JSON array."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Cách 1: spring initializr (https://start.spring.io)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# Bài Tập — Bài 26: Spring Boot\n\n> 🟣 **Phase 5 – Bài 3/3** | Ôn tập: IoC/DI, REST Controller, Service, Repository, Exception Handling\n\n---\n\n## Chuẩn Bị Dự Án\n\nTạo Spring Boot project tại [start.spring.io](https://start.spring.io) với:\n- **Group:** `com.raize`\n- **Artifact:** `raize-shop-mini`\n- **Dependencies:** Spring Web, Spring Data JPA, MySQL Driver, Lombok, Spring Validation\n\n---\n\n## Bài 1: Dependency Injection — Hiểu Cốt Lõi Spring ⭐\n\n### Part A — Phân Tích Code\n\nĐọc 2 version và giải thích sự khác biệt:\n\n```java\n// Version 1: Không có DI — tight coupling\npublic class DonHangServiceV1 {\n    private DonHangRepository repo = new DonHangRepository();  // Hard-coded!\n    private EmailService email = new EmailServiceImpl();       // Khó test, khó thay thế\n\n    public void datHang(DonHang don) {\n        repo.save(don);\n        email.gui(don.getEmail(), \"Xác nhận đơn hàng\");\n    }\n}\n\n// Version 2: Spring DI — loose coupling\n@Service\npublic class DonHangServiceV2 {\n    private final Don...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 28,
    "title": "Spring Web MVC & REST APIs",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "4 giờ",
    "difficulty": "Trung bình",
    "theory": "# Bài 28: Spring Web MVC & REST APIs\n\n> 🟢 **Phase 5 – Bài 28/32** | Thời gian: ~4 giờ\n\n---\n\nTrong các ứng dụng thực tế như RaizeShop, client (Web Browser, React, hoặc Mobile App) cần giao tiếp với server để lấy dữ liệu sản phẩm, đăng ký tài khoản,... Kiến trúc giao tiếp phổ biến nhất hiện nay là **REST API** được xây dựng trên nền tảng **Spring Web MVC**.\n\nBài học này giúp bạn nắm vững cách thiết kế và triển khai REST API chuẩn công nghiệp với Spring Boot.\n\n---\n\n## 1. REST API là gì?\n**REST (Representational State Transfer)** là một kiểu kiến trúc phần mềm định nghĩa các ràng buộc cho việc giao tiếp qua giao thức HTTP.\n*   **Resource (Tài nguyên)**: Mọi dữ liệu (sản phẩm, hóa đơn, người dùng) đều được xem là một tài nguyên và được định danh bằng một **URI** (Unique Resource Identifier). Ví dụ: `/api/v1/products`.\n*   **HTTP Methods**: Sử dụng các phương thức chuẩn của HTTP để thực hiện hành động:\n    *   `GET`: Lấy thông tin tài nguyên.\n    *   `POST`: Tạo mới tài nguyên.\n    *   `PUT`: Cập nhật toàn bộ tài nguyên.\n    *   `DELETE`: Xóa tài nguyên.\n\n---\n\n## 2. Các Annotation Cốt Lõi Trong Spring Web\nSpring Boot cung cấp các annotation tiện lợi để biến một class thông thường thành một REST Endpoint xử lý request:\n\n*   `@RestController`: Đánh dấu class là một controller phục vụ API REST. Nó là sự kết hợp của `@Controller` và `@ResponseBody`, tự động chuyển đổi kiểu trả về (ví dụ List, Object) thành chuỗi JSON.\n*   `@RequestMapping`: Định nghĩa tiền tố URI dùng chung cho cả class. Ví dụ: `@RequestMapping(\"/api/v1/products\")`.\n*   `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: Ánh xạ các HTTP method tương ứng vào các phương thức xử lý cụ thể.\n*   `@PathVariable`: Trích xuất biến động trực tiếp từ URL path (ví dụ: `/products/{id}` -> `@PathVariable Long id`).\n*   `@RequestParam`: Lấy các tham số query dạng key-value sau dấu hỏi chấm (ví dụ: `/products?category=weapon` -> `@RequestParam String category`).\n*   `@RequestBody`: Chuyển đổi dữ liệu JSON từ thân (body) của HTTP Request sang đối tượng Java DTO tương ứng.\n\n---\n\n## 3. Ví dụ một Controller Spring Boot Chuẩn\nDưới đây là mô phỏng cấu trúc của `ProductController` trong thực tế:\n\n```java\nimport org.springframework.web.bind.annotation.*;\nimport org.springframework.http.ResponseEntity;\nimport java.util.List;\n\n@RestController\n@RequestMapping(\"/api/v1/products\")\npublic class ProductController {\n\n    // 1. GET: Lấy danh sách sản phẩm (có lọc theo category)\n    @GetMapping\n    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required = false) String category) {\n        // Xử lý lấy dữ liệu...\n        return ResponseEntity.ok(products);\n    }\n\n    // 2. GET: Lấy chi tiết sản phẩm theo ID\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Product> getProductById(@PathVariable Long id) {\n        // Tìm sản phẩm...\n        if (product == null) {\n            return ResponseEntity.notFound().build(); // HTTP 404\n        }\n        return ResponseEntity.ok(product); // HTTP 200\n    }\n\n    // 3. POST: Đăng bán sản phẩm mới\n    @PostMapping\n    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {\n        // Lưu sản phẩm...\n        return ResponseEntity.status(201).body(savedProduct); // HTTP 210 Created\n    }\n}\n```\n\n---\n\n## 4. ResponseEntity - Quản lý HTTP Response\nTrong ứng dụng thực tế, ta không nên trả về đối tượng Java thô trực tiếp. Thay vào đó, hãy sử dụng `ResponseEntity` để kiểm soát toàn diện HTTP Response bao gồm:\n*   **HTTP Status Code**: `200 OK` (thành công), `201 Created` (tạo mới thành công), `400 Bad Request` (dữ liệu lỗi), `404 Not Found` (không tìm thấy), `500 Internal Error` (lỗi server).\n*   **Headers**: Các siêu dữ liệu đi kèm.\n*   **Body**: Nội dung phản hồi (thường là JSON).\n\n---\n\n## Tóm Tắt — Bài 28\n```\n✅ @RestController = @Controller + @ResponseBody (tự serialize kết quả ra JSON).\n✅ URI nên dùng danh từ số nhiều đại diện cho tài nguyên (ví dụ: /api/v1/users).\n✅ HTTP Methods xác định hành động: GET (đọc), POST (tạo), PUT (sửa), DELETE (xóa).\n✅ Dùng PathVariable cho biến URL, RequestParam cho query param, RequestBody cho JSON body.\n✅ Dùng ResponseEntity để trả về đúng cấu trúc HTTP Status và Body.\n```\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 28: Spring Web MVC & REST APIs\n\n> 🎯 **Bối cảnh dự án:** Xây dựng cổng định tuyến (Routing Handler) mô phỏng Controller xử lý các REST API request cho RaizeShop.\n\n---\n\n## 🔴 Bài Tập 1: Bộ Định Tuyến Controller Simulator ⭐\n\n**Bối cảnh thực tế:** Trong Spring Boot, `@RestController` và các `@Mapping` điều hướng request đến method xử lý. Tại bài này, hãy viết logic Java mô phỏng cơ chế router đó.\n\n**Yêu cầu:** Viết phương thức `handleRequest(String method, String path, String body)` phân tích yêu cầu HTTP và trả về phản hồi tương ứng:\n- Nếu `method` là `GET` và `path` là `/api/v1/products` -> Trả về JSON: `{\"status\": 200, \"data\": \"Danh sách 100 sản phẩm\"}`.\n- Nếu `method` là `POST` và `path` là `/api/v1/products` -> Trích xuất dữ liệu từ `body` và trả về JSON: `{\"status\": 201, \"message\": \"Đã tạo sản phẩm: \" + [tên sản phẩm lấy từ body]}` (Giả sử body có dạng thô là tên sản phẩm, ví dụ: `\"Kiếm Rồng\"`).\n- Các trường hợp khác -> Trả về JSON: `{\"status\": 404, \"error\": \"Không tìm thấy đường dẫn\"}`.\n\n**Mẫu mã nguồn khởi đầu:**\n```java\npublic class ProductControllerSim {\n    public static void main(String[] args) {\n        System.out.println(handleRequest(\"GET\", \"/api/v1/products\", \"\"));\n        System.out.println(handleRequest(\"POST\", \"/api/v1/products\", \"Nhẫn Ma Thuật +5\"));\n        System.out.println(handleRequest(\"GET\", \"/api/v1/unknown\", \"\"));\n    }\n\n    public static String handleRequest(String method, String path, String body) {\n        // TODO: Viết logic định tuyến tại đây và trả về chuỗi JSON chính xác\n        if (\"GET\".equals(method) && \"/api/v1/products\".equals(path)) {\n            return \"{\\\"status\\\": 200, \\\"data\\\": \\\"Danh sách 100 sản phẩm\\\"}\";\n        } else if (\"POST\".equals(method) && \"/api/v1/products\".equals(path)) {\n            return \"{\\\"status\\\": 201, \\\"message\\\": \\\"Đã tạo sản phẩm: \" + body + \"\\\"}\";\n        } else {\n            return \"{\\\"status\\\": 404, \\\"error\\\": \\\"Không tìm thấy đường dẫn\\\"}\";\n        }\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra\n- [ ] Sự khác biệt lớn nhất giữa `@Controller` và `@RestController` là gì?\n- [ ] Tại sao trong lập trình REST API, chúng ta nên sử dụng danh từ số nhiều (như `/products`) thay vì động từ hành động (như `/getProducts`)?\n- [ ] Khi nào nên dùng `@RequestParam` thay cho `@PathVariable`?\n",
    "quizzes": [
      {
        "q": "Annotation nào dùng để đánh dấu một lớp là REST API controller trong Spring Boot?",
        "options": [
          "@Controller",
          "@RestController",
          "@Service",
          "@Repository"
        ],
        "answer": 1,
        "explanation": "@RestController là sự kết hợp của @Controller và @ResponseBody, tự động chuyển dữ liệu trả về sang JSON."
      },
      {
        "q": "Phương thức HTTP nào được khuyến nghị để lấy thông tin chi tiết của một tài nguyên?",
        "options": [
          "POST",
          "PUT",
          "GET",
          "DELETE"
        ],
        "answer": 2,
        "explanation": "HTTP GET được dùng để truy vấn/lấy thông tin tài nguyên từ server mà không làm thay đổi trạng thái của nó."
      },
      {
        "q": "Để lấy giá trị động từ URL dạng /api/v1/products/{id}, ta sử dụng annotation nào?",
        "options": [
          "@RequestParam",
          "@PathVariable",
          "@RequestBody",
          "@ModelAttribute"
        ],
        "answer": 1,
        "explanation": "@PathVariable giúp ánh xạ tham số động trên URL path vào biến Java trong phương thức xử lý."
      },
      {
        "q": "Lớp nào trong Spring MVC đại diện cho cả nội dung phản hồi, tiêu đề (headers) và mã trạng thái HTTP?",
        "options": [
          "HttpEntity",
          "ResponseEntity",
          "ResponseBody",
          "ModelAndView"
        ],
        "answer": 1,
        "explanation": "ResponseEntity<T> cho phép kiểm soát hoàn toàn HTTP Response trả về cho client bao gồm headers, body và status code."
      }
    ],
    "practice": {
      "fileName": "ProductControllerSim.java",
      "instructions": "### Yêu cầu:\nViết phương thức `handleRequest(String method, String path, String body)` trong lớp `ProductControllerSim` để mô phỏng một Controller REST API:\n- Nếu `method` là `\"GET\"` và `path` là `\"/api/v1/products\"` -> Trả về JSON: `{\"status\": 200, \"data\": \"Danh sách 100 sản phẩm\"}`.\n- Nếu `method` là `\"POST\"` và `path` là `\"/api/v1/products\"` -> Trích xuất dữ liệu từ `body` và trả về JSON: `{\"status\": 201, \"message\": \"Đã tạo sản phẩm: \" + [tên sản phẩm]}` (Ví dụ body là `\"Nhẫn Ma Thuật +5\"`).\n- Các trường hợp khác -> Trả về JSON: `{\"status\": 404, \"error\": \"Không tìm thấy đường dẫn\"}`.",
      "starterCode": "public class ProductControllerSim {\n    public static void main(String[] args) {\n        System.out.println(handleRequest(\"GET\", \"/api/v1/products\", \"\"));\n        System.out.println(handleRequest(\"POST\", \"/api/v1/products\", \"Nhẫn Ma Thuật +5\"));\n        System.out.println(handleRequest(\"GET\", \"/api/v1/unknown\", \"\"));\n    }\n\n    public static String handleRequest(String method, String path, String body) {\n        // TODO: Viết logic định tuyến tại đây và trả về chuỗi JSON chính xác\n        return \"\";\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"handleRequest\")) {\r\n        return { pass: false, msg: \"Lỗi: Không tìm thấy phương thức handleRequest!\" };\r\n      }\r\n      if (!output.includes(\"Danh sách 100 sản phẩm\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa xử lý đúng yêu cầu GET /api/v1/products!\" };\r\n      }\r\n      if (!output.includes(\"Đã tạo sản phẩm: Nhẫn Ma Thuật +5\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa xử lý đúng yêu cầu POST /api/v1/products hoặc trích xuất body!\" };\r\n      }\r\n      if (!output.includes(\"Không tìm thấy đường dẫn\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa xử lý đúng trường hợp 404 không tìm thấy đường dẫn!\" };\r\n      }\r\n      return { pass: true, msg: \"Tuyệt vời! Phương thức Controller mô phỏng của em đã xử lý chính xác tất cả các HTTP methods và endpoints!\" };\r\n    }"
    }
  },
  {
    "id": 29,
    "title": "Spring Data JPA & Hibernate",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "4 giờ",
    "difficulty": "Trung bình",
    "theory": "# Bài 29: Spring Data JPA & Hibernate\n\n> 🟢 **Phase 5 – Bài 29/32** | Thời gian: ~4 giờ\n\n---\n\nTrong các ứng dụng Java truyền thống, việc kết nối cơ sở dữ liệu đòi hỏi viết rất nhiều mã nguồn lặp đi lặp lại (JDBC boilerplate code). **Spring Data JPA** kết hợp với **Hibernate** ra đời nhằm giải quyết triệt để vấn đề này bằng cách tự động hóa ánh xạ dữ liệu và cung cấp các phương thức tương tác tiện lợi.\n\n---\n\n## 1. ORM và Hibernate là gì?\n*   **ORM (Object-Relational Mapping)**: Là kỹ thuật lập trình ánh xạ trực tiếp các bảng dữ liệu quan hệ (RDBMS) sang các lớp đối tượng Java (OOP).\n*   **JPA (Java Persistence API)**: Là bộ đặc tả tiêu chuẩn (Specification/Interface) của Java định nghĩa cách quản lý dữ liệu ORM.\n*   **Hibernate**: Là một Framework triển khai cụ thể (Implementation) phổ biến nhất của JPA. Nó thực sự đảm nhận việc chuyển hóa code Java thành các câu lệnh SQL phù hợp với hệ quản trị CSDL đích (MySQL, Oracle, PostgreSQL...).\n\n---\n\n## 2. Các Annotation Định Nghĩa Entity (Thực thể)\nĐể ánh xạ một lớp Java thành một bảng trong CSDL, ta dùng các JPA annotation sau:\n\n*   `@Entity`: Đánh dấu class là một thực thể CSDL (bắt buộc phải có constructor không tham số).\n*   `@Table`: Chỉ định tên bảng trong CSDL. Ví dụ: `@Table(name = \"products\")`.\n*   `@Id`: Đánh dấu trường làm Khóa chính (Primary Key).\n*   `@GeneratedValue`: Cấu hình chiến lược tự động sinh khóa chính. Ví dụ: `@GeneratedValue(strategy = GenerationType.IDENTITY)`.\n*   `@Column`: Cấu hình chi tiết cho cột dữ liệu (tên cột, độ dài, nullable, unique...).\n\nVí dụ định nghĩa Entity `Product`:\n```java\nimport jakarta.persistence.*;\n\n@Entity\n@Table(name = \"products\")\npublic class Product {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(name = \"product_name\", nullable = false, length = 100)\n    private String name;\n\n    private Double price; // Nếu không có @Column, tên cột mặc định trùng tên biến\n\n    // Constructors, Getters & Setters\n}\n```\n\n---\n\n## 3. JpaRepository - Tự Động Hóa Truy Vấn\nSpring Data JPA cung cấp interface `JpaRepository` chứa đầy đủ các chức năng CRUD cơ bản. Lập trình viên chỉ cần khai báo interface kế thừa từ nó mà không cần viết bất kỳ dòng triển khai nào:\n\n```java\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport java.util.List;\n\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    // 1. Tự động sinh query tìm theo tên chính xác\n    List<Product> findByName(String name);\n\n    // 2. Tìm các sản phẩm có giá lớn hơn một mốc\n    List<Product> findByPriceGreaterThan(Double minPrice);\n}\n```\n\n### Cách thức hoạt động:\nKhi khởi chạy ứng dụng, Spring Boot sẽ quét qua interface `ProductRepository`, tự động biên dịch cấu trúc tên phương thức (ví dụ: `findByPriceGreaterThan`) thành câu lệnh SQL tương đương:\n`SELECT * FROM products WHERE price > ?` và tạo đối tượng Bean tiêm vào các service.\n\n---\n\n## Tóm Tắt — Bài 29\n```\n✅ ORM là cầu nối chuyển đổi giữa lập trình hướng đối tượng (Java) và cơ sở dữ liệu quan hệ (SQL).\n✅ JPA là tiêu chuẩn (interface), Hibernate là bộ cài đặt thực tế (class triển khai).\n✅ Dùng @Entity, @Table, @Id, @Column để ánh xạ lớp Java thành bảng trong CSDL.\n✅ Extends JpaRepository giúp tự động hóa 100% các câu lệnh CRUD cơ bản mà không cần viết code triển khai.\n✅ Query Creation giúp tạo các câu lệnh SQL tự động dựa trên quy ước đặt tên phương thức.\n```\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 29: Spring Data JPA & Hibernate\n\n> 🎯 **Bối cảnh dự án:** Thiết lập mô hình hóa lớp dữ liệu Entity đại diện cho tài khoản người dùng (`UserEntity`) của RaizeShop trong hệ thống JPA.\n\n---\n\n## 🔴 Bài Tập 1: Mô Phỏng Khai Báo Class Entity & Validate ⭐\n\n**Bối cảnh thực tế:** Khi viết Entity, lập trình viên cần thiết lập chính xác các trường dữ liệu và ràng buộc. Trong bài tập này, hãy tạo một class mô phỏng cấu trúc của Entity `UserEntity`.\n\n**Yêu cầu:** Viết class `UserEntity` gồm:\n- Các trường private: `id` (Long), `username` (String), `balance` (Double).\n- Có constructor đầy đủ tham số và không tham số.\n- Viết phương thức `validate()` kiểm tra:\n  - Nếu `username` bị null hoặc có độ dài nhỏ hơn 3 ký tự -> Ném ra ngoại lệ `IllegalArgumentException` với thông báo `\"Username không hợp lệ!\"`.\n  - Nếu `balance` nhỏ hơn 0 -> Ném ra ngoại lệ `IllegalArgumentException` với thông báo `\"Số dư tài khoản không được âm!\"`.\n\n**Mẫu mã nguồn khởi đầu:**\n```java\npublic class UserEntity {\n    private Long id;\n    private String username;\n    private Double balance;\n\n    public UserEntity() {}\n\n    public UserEntity(Long id, String username, Double balance) {\n        this.id = id;\n        this.username = username;\n        this.balance = balance;\n    }\n\n    public void validate() {\n        // TODO: Viết code kiểm tra ràng buộc tại đây\n        if (username == null || username.length() < 3) {\n            throw new IllegalArgumentException(\"Username không hợp lệ!\");\n        }\n        if (balance == null || balance < 0) {\n            throw new IllegalArgumentException(\"Số dư tài khoản không được âm!\");\n        }\n    }\n\n    public static void main(String[] args) {\n        try {\n            UserEntity user = new UserEntity(1L, \"rz\", 100.0);\n            user.validate();\n        } catch (Exception e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra\n- [ ] JPA và Hibernate khác nhau thế nào? Hãy lấy ví dụ so sánh thực tế.\n- [ ] Tại sao mọi JPA Entity bắt buộc phải có một Constructor không tham số (No-Arg Constructor)?\n- [ ] Điều gì xảy ra khi bạn đặt tên phương thức trong Repository là `findByEmailAndStatus(String email, String status)`?\n",
    "quizzes": [
      {
        "q": "JPA (Java Persistence API) đóng vai trò gì trong thế giới Java?",
        "options": [
          "Là một CSDL quan hệ.",
          "Là một đặc tả tiêu chuẩn (Specification/Interface) định nghĩa cách thức ORM hoạt động.",
          "Là một thư viện kết nối mạng.",
          "Là một web server."
        ],
        "answer": 1,
        "explanation": "JPA chỉ là một chuẩn đặc tả (bộ interface). Hibernate là framework triển khai thực tế (implementation) phổ biến nhất của JPA."
      },
      {
        "q": "Annotation nào dùng để đánh dấu một class Java là một thực thể được ánh xạ vào bảng CSDL?",
        "options": [
          "@Table",
          "@Entity",
          "@Id",
          "@Column"
        ],
        "answer": 1,
        "explanation": "@Entity là annotation bắt buộc của JPA để đánh dấu class ánh xạ trực tiếp xuống cơ sở dữ liệu."
      },
      {
        "q": "Để tạo một Repository tự động hóa các câu lệnh CRUD với Spring Data JPA, interface của bạn cần extends từ interface nào?",
        "options": [
          "CrudRepository",
          "JpaRepository",
          "PagingAndSortingRepository",
          "Cả A và B đều đúng"
        ],
        "answer": 3,
        "explanation": "Spring Data JPA cung cấp JpaRepository (kế thừa từ PagingAndSortingRepository và CrudRepository) chứa đầy đủ các tính năng CRUD nâng cao."
      },
      {
        "q": "Spring Data JPA tự động sinh query SQL như thế nào từ tên phương thức `findByPriceGreaterThan(Double price)`?",
        "options": [
          "Nó không tự sinh mà bắt buộc viết SQL.",
          "Nó phân tích cú pháp tên phương thức và dịch sang câu lệnh SQL SELECT ... WHERE price > ? tương ứng.",
          "Nó sử dụng Hibernate Cache.",
          "Nó biên dịch sang mã máy."
        ],
        "answer": 1,
        "explanation": "Spring Data JPA hỗ trợ Query Creation, tự phân tích tên phương thức theo quy ước chuẩn và dịch sang SQL tự động."
      }
    ],
    "practice": {
      "fileName": "UserEntity.java",
      "instructions": "### Yêu cầu:\nHoàn thiện lớp `UserEntity` mô phỏng một JPA Entity có kiểm tra ràng buộc dữ liệu:\n- Khai báo các trường private: `id` (Long), `username` (String), `balance` (Double).\n- Tạo constructor không tham số và constructor đầy đủ tham số.\n- Hoàn thành phương thức `validate()`:\n  - Nếu `username` bị null hoặc có độ dài nhỏ hơn 3 ký tự -> Ném ra ngoại lệ `IllegalArgumentException` với thông báo `\"Username không hợp lệ!\"`.\n  - Nếu `balance` nhỏ hơn 0 -> Ném ra ngoại lệ `IllegalArgumentException` với thông báo `\"Số dư tài khoản không được âm!\"`.",
      "starterCode": "public class UserEntity {\n    private Long id;\n    private String username;\n    private Double balance;\n\n    public UserEntity() {}\n\n    public UserEntity(Long id, String username, Double balance) {\n        this.id = id;\n        this.username = username;\n        this.balance = balance;\n    }\n\n    public void validate() {\n        // TODO: Viết code kiểm tra ràng buộc tại đây\n    }\n\n    public static void main(String[] args) {\n        try {\n            UserEntity user1 = new UserEntity(1L, \"rz\", 100.0);\n            user1.validate();\n            System.out.println(\"User 1 OK\");\n        } catch (Exception e) {\n            System.out.println(\"User 1: \" + e.getMessage());\n        }\n\n        try {\n            UserEntity user2 = new UserEntity(2L, \"raize\", -50.0);\n            user2.validate();\n            System.out.println(\"User 2 OK\");\n        } catch (Exception e) {\n            System.out.println(\"User 2: \" + e.getMessage());\n        }\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"IllegalArgumentException\")) {\r\n        return { pass: false, msg: \"Lỗi: Bạn cần ném ra IllegalArgumentException khi dữ liệu không hợp lệ!\" };\r\n      }\r\n      if (!output.includes(\"User 1: Username không hợp lệ!\")) {\r\n        if (output.includes(\"User 1 OK\")) {\r\n          return { pass: false, msg: \"Lỗi: Username 'rz' ngắn hơn 3 ký tự nhưng phương thức validate() không ném lỗi!\" };\r\n        }\r\n        return { pass: false, msg: \"Lỗi: Output chưa hiển thị đúng thông báo lỗi cho User 1!\" };\r\n      }\r\n      if (!output.includes(\"User 2: Số dư tài khoản không được âm!\")) {\r\n        if (output.includes(\"User 2 OK\")) {\r\n          return { pass: false, msg: \"Lỗi: Số dư -50.0 là số âm nhưng phương thức validate() không ném lỗi!\" };\r\n        }\r\n        return { pass: false, msg: \"Lỗi: Output chưa hiển thị đúng thông báo lỗi cho User 2!\" };\r\n      }\r\n      return { pass: true, msg: \"Xuất sắc! Entity validate của em đã bắt chính xác các lỗi nghiệp vụ và ném ngoại lệ đúng quy chuẩn JPA!\" };\r\n    }"
    }
  },
  {
    "id": 30,
    "title": "Spring Security & JWT",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "5 giờ",
    "difficulty": "Khó",
    "theory": "# Bài 30: Spring Security & JWT\n\n> 🟢 **Phase 5 – Bài 30/32** | Thời gian: ~5 giờ\n\n---\n\nTrong các ứng dụng Web như RaizeShop, việc bảo vệ hệ thống khỏi các truy cập trái phép là nhiệm vụ tối quan trọng. **Spring Security** cung cấp giải pháp bảo mật toàn diện, kết hợp cùng **JWT (JSON Web Token)** để triển khai cơ chế xác thực không trạng thái (Stateless Authentication) hiện đại.\n\n---\n\n## 1. Authentication và Authorization là gì?\nĐây là hai khái niệm nền tảng thường bị nhầm lẫn trong bảo mật thông tin:\n\n```\n┌──────────────────────────────────────┐\n│  Authentication (Xác thực)          │  ← Bạn là ai? (Đăng nhập bằng User/Pass)\n└──────────────────┬───────────────────┘\n                   │  (Sau khi xác thực thành công)\n                   ▼\n┌──────────────────────────────────────┐\n│  Authorization (Phân quyền)          │  ← Bạn được phép làm gì? (Role: ADMIN, USER)\n└──────────────────────────────────────┘\n```\n\n*   **Authentication (Xác thực)**: Quá trình xác minh danh tính người dùng (ví dụ: đối khớp Username/Password hoặc Token).\n*   **Authorization (Phân quyền)**: Quá trình kiểm tra xem danh tính đã xác thực có quyền truy cập vào tài nguyên cụ thể hay không (ví dụ: chỉ có quyền `ADMIN` mới được xóa sản phẩm).\n\n---\n\n## 2. Stateless Authentication với JWT\nTrong kiến trúc REST API hiện đại, máy chủ thường không lưu trữ Session của người dùng trong bộ nhớ (Stateless) nhằm tối ưu hóa hiệu năng và khả năng mở rộng. Thay vào đó, ta sử dụng **JWT (JSON Web Token)**.\n\n### Quy trình xác thực JWT:\n1.  **Client** gửi request đăng nhập (Username/Password) tới Server.\n2.  **Server** xác thực tài khoản. Nếu đúng, server tạo ra một chuỗi mã hóa ký số gọi là **JWT Token** và trả về cho Client.\n3.  **Client** lưu trữ token này (trong LocalStorage hoặc Cookie).\n4.  Ở mỗi request tiếp theo, Client gửi token này trong tiêu đề HTTP Header:\n    `Authorization: Bearer <token>`\n5.  **Server** (thông qua Spring Security Filters) trích xuất token, giải mã kiểm tra tính hợp lệ của chữ ký (signature) mà không cần truy vấn lại CSDL. Nếu hợp lệ, cho phép request đi tiếp.\n\n---\n\n## 3. Cấu trúc của một JSON Web Token (JWT)\nMột chuỗi JWT gồm 3 phần được phân tách bằng dấu chấm `.`:\n`xxxxx.yyyyy.zzzzz`\n\n*   **Header (Phần đầu - xxxxx)**: Chứa kiểu token (JWT) và thuật toán băm chữ ký (ví dụ: HS256).\n*   **Payload (Phần thân - yyyyy)**: Chứa thông tin khai báo (Claims) về người dùng (ví dụ: `userId`, `username`, `roles`, thời gian hết hạn `exp`).\n*   **Signature (Chữ ký - zzzzz)**: Được tạo bằng cách lấy phần Header và Payload mã hóa kết hợp với một chuỗi khóa bí mật (Secret Key) trên server. Giúp ngăn chặn việc Client tự ý chỉnh sửa nội dung token.\n\n---\n\n## 4. Tích hợp Spring Security\nSpring Security hoạt động thông qua một chuỗi các bộ lọc (**Filter Chain**). Mỗi request gửi đến ứng dụng đều phải đi qua các filter này để kiểm tra xem có chứa token hợp lệ trong Header hay không:\n\n```java\n// Cấu hình bảo mật cơ bản trong Spring Security\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http\n            .csrf(csrf -> csrf.disable()) // Tắt CSRF vì ứng dụng dùng Stateless API\n            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/api/auth/**\").permitAll() // Cho phép công khai các route đăng nhập/đăng ký\n                .requestMatchers(\"/api/admin/**\").hasRole(\"ADMIN\") // Chỉ Admin truy cập\n                .anyRequest().authenticated() // Các endpoint khác bắt buộc phải đăng nhập\n            );\n        return http.build();\n    }\n}\n```\n\n---\n\n## Tóm Tắt — Bài 30\n```\n✅ Authentication xác định danh tính (Bạn là ai). Authorization quyết định quyền hạn (Bạn làm được gì).\n✅ JWT hỗ trợ cơ chế Stateless Auth, giúp Server không cần lưu Session trong bộ nhớ.\n✅ JWT gồm 3 phần: Header (Metadata), Payload (Claims/Data), Signature (Chống giả mạo).\n✅ Token được gửi trong HTTP Header dưới định dạng: Authorization: Bearer <JWT_Token>.\n✅ Spring Security quản lý luồng bảo mật thông qua một chuỗi các Filter (Filter Chain).\n```\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 30: Spring Security & JWT\n\n> 🎯 **Bối cảnh dự án:** Xây dựng bộ lọc xác thực (Authentication Filter) trích xuất và kiểm tra định dạng Token gửi lên trong Header của ứng dụng RaizeShop.\n\n---\n\n## 🔴 Bài Tập 1: Trích Xuất và Xác Thực Định Dạng Token ⭐\n\n**Bối cảnh thực tế:** Trong Spring Security Filter, bước đầu tiên khi xử lý request là kiểm tra xem tiêu đề `Authorization` có chứa token dạng `Bearer <token>` hợp lệ hay không.\n\n**Yêu cầu:** Viết phương thức `extractToken(String authHeaderValue)` thực hiện:\n- Kiểm tra xem `authHeaderValue` có hợp lệ (không null, không rỗng, bắt đầu bằng `\"Bearer \"` và phần token phía sau không được trống hay không).\n- Nếu hợp lệ: Trích xuất và trả về chuỗi token thực sự phía sau chữ `\"Bearer \"`.\n- Nếu không hợp lệ: Ném ra ngoại lệ `SecurityException` với thông báo `\"Định dạng tiêu đề xác thực không hợp lệ!\"`.\n\n**Mẫu mã nguồn khởi đầu:**\n```java\npublic class JwtHeaderValidator {\n    public static void main(String[] args) {\n        try {\n            String header = \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\";\n            String token = extractToken(header);\n            System.out.println(\"Token trích xuất thành công: \" + token);\n            \n            // Chạy thử trường hợp lỗi\n            extractToken(\"Basic YWRtaW46MTIzNDU2\");\n        } catch (Exception e) {\n            System.out.println(\"Lỗi: \" + e.getMessage());\n        }\n    }\n\n    public static String extractToken(String authHeaderValue) {\n        // TODO: Viết code trích xuất token tại đây\n        if (authHeaderValue == null || !authHeaderValue.startsWith(\"Bearer \")) {\n            throw new SecurityException(\"Định dạng tiêu đề xác thực không hợp lệ!\");\n        }\n        String token = authHeaderValue.substring(7).trim();\n        if (token.isEmpty()) {\n            throw new SecurityException(\"Định dạng tiêu đề xác thực không hợp lệ!\");\n        }\n        return token;\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra\n- [ ] Tại sao sử dụng kiến trúc Stateless REST API lại không khuyên dùng Stateful Session truyền thống?\n- [ ] Phần chữ ký (Signature) trong JWT Token được tạo ra nhằm ngăn chặn rủi ro an ninh nào?\n- [ ] Spring Security Filter Chain hoạt động theo cơ chế nào? Request sẽ đi qua filter trước hay đi vào controller trước?\n",
    "quizzes": [
      {
        "q": "Sự khác biệt cơ bản giữa Authentication và Authorization là gì?",
        "options": [
          "Authentication là phân quyền, Authorization là xác thực.",
          "Authentication xác minh danh tính (Bạn là ai?), Authorization xác định quyền hạn (Bạn được làm gì?).",
          "Chúng hoàn toàn giống nhau.",
          "Authentication chạy ở client, Authorization chạy ở server."
        ],
        "answer": 1,
        "explanation": "Authentication (Xác thực) kiểm tra tên đăng nhập/mật khẩu. Authorization (Phân quyền) kiểm tra Role/Quyền hạn của user."
      },
      {
        "q": "Trong cơ chế Stateless Authentication, máy chủ quản lý trạng thái đăng nhập của người dùng như thế nào?",
        "options": [
          "Lưu session trong RAM server.",
          "Không lưu trạng thái session, client gửi kèm JWT Token hợp lệ trong mỗi request để server xác thực.",
          "Lưu cookie ở trình duyệt client.",
          "Sử dụng HttpSession mặc định."
        ],
        "answer": 1,
        "explanation": "Stateless Auth không lưu session trên server. Client tự lưu trữ JWT Token và gửi kèm trong HTTP Header của mỗi request."
      },
      {
        "q": "JWT Token gồm có bao nhiêu phần chính được ngăn cách bởi dấu chấm?",
        "options": [
          "2 phần",
          "3 phần (Header, Payload, Signature)",
          "4 phần",
          "1 phần duy nhất"
        ],
        "answer": 1,
        "explanation": "JWT có 3 phần: Header (metadata), Payload (dữ liệu/claims) và Signature (chữ ký số dùng để kiểm tra tính toàn vẹn)."
      },
      {
        "q": "Lớp PasswordEncoder của Spring Security mặc định sử dụng thuật toán băm nào?",
        "options": [
          "MD5",
          "SHA-256",
          "BCrypt",
          "AES"
        ],
        "answer": 2,
        "explanation": "BCrypt là thuật toán băm mật khẩu một chiều mạnh mẽ, có cơ chế muối (salt) ngẫu nhiên chống tấn công Rainbow Table."
      }
    ],
    "practice": {
      "fileName": "JwtHeaderValidator.java",
      "instructions": "### Yêu cầu:\nHoàn thiện phương thức `extractToken(String authHeaderValue)` trong lớp `JwtHeaderValidator` để giả lập quá trình phân tích JWT token từ HTTP Authorization Header:\n- Kiểm tra xem `authHeaderValue` có hợp lệ (không null, không rỗng, bắt đầu bằng `\"Bearer \"` và phần token phía sau không được trống hay không).\n- Nếu hợp lệ: Trích xuất và trả về chuỗi token thực sự phía sau chữ `\"Bearer \"`.\n- Nếu không hợp lệ: Ném ra ngoại lệ `SecurityException` với thông báo `\"Định dạng tiêu đề xác thực không hợp lệ!\"`.",
      "starterCode": "public class JwtHeaderValidator {\n    public static void main(String[] args) {\n        try {\n            String header = \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\";\n            String token = extractToken(header);\n            System.out.println(\"Token: \" + token);\n            \n            extractToken(\"Basic YWRtaW46MTIzNDU2\");\n        } catch (Exception e) {\n            System.out.println(\"Lỗi: \" + e.getMessage());\n        }\n    }\n\n    public static String extractToken(String authHeaderValue) {\n        // TODO: Viết code trích xuất token tại đây\n        return \"\";\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"SecurityException\")) {\r\n        return { pass: false, msg: \"Lỗi: Bạn cần ném ra SecurityException khi header không hợp lệ!\" };\r\n      }\r\n      if (!output.includes(\"Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\")) {\r\n        return { pass: false, msg: \"Lỗi: Không trích xuất được token hợp lệ từ chuỗi Bearer!\" };\r\n      }\r\n      if (!output.includes(\"Lỗi: Định dạng tiêu đề xác thực không hợp lệ!\")) {\r\n        return { pass: false, msg: \"Lỗi: Không chặn được header không bắt đầu bằng Bearer!\" };\r\n      }\r\n      return { pass: true, msg: \"Chúc mừng! Lớp xử lý bảo mật của em hoạt động cực kỳ chính xác và an toàn!\" };\r\n    }"
    }
  },
  {
    "id": 31,
    "title": "Microservices & Spring Cloud",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "6 giờ",
    "difficulty": "Khó",
    "theory": "# Bài 31: Microservices & Spring Cloud\n\n> 🟢 **Phase 5 – Bài 31/32** | Thời gian: ~6 giờ\n\n---\n\nKhi một hệ thống như RaizeShop phát triển lớn mạnh với lượng truy cập khổng lồ, việc duy trì một mã nguồn duy nhất (**Monolithic Architecture**) sẽ bộc lộ nhiều hạn chế về khả năng mở rộng và bảo trì. **Microservices (Kiến trúc vi dịch vụ)** ra đời giúp chia nhỏ hệ thống thành các dịch vụ độc lập kết nối với nhau thông qua hệ sinh thái **Spring Cloud**.\n\n---\n\n## 1. Monolithic vs Microservices\nHãy hình dung sự khác biệt giữa hai lối kiến trúc hệ thống phổ biến:\n\n```\n    MONOLITHIC (Khối duy nhất)              MICROSERVICES (Vi dịch vụ)\n    ┌─────────────────────────┐            ┌──────────────┐   ┌──────────────┐\n    │  UI + Business + DB     │            │ USER SERVICE │   │ ITEM SERVICE │\n    │  (Chạy chung 1 server)  │            └──────┬───────┘   └──────┬───────┘\n    └─────────────────────────┘                   │                  │\n                                           ┌──────▼──────────────────▼──────┐\n                                           │          API GATEWAY           │\n                                           └────────────────────────────────┘\n```\n\n*   **Monolithic (Kiến trúc nguyên khối)**: Toàn bộ chức năng (quản lý user, sản phẩm, thanh toán) chạy chung trong một ứng dụng duy nhất, sử dụng chung một cơ sở dữ liệu.\n    *   *Ưu điểm*: Dễ phát triển ở giai đoạn đầu, dễ deploy.\n    *   *Nhược điểm*: Khó mở rộng riêng lẻ, một module lỗi có thể làm sập toàn bộ hệ thống, thời gian build lâu.\n*   **Microservices (Kiến trúc vi dịch vụ)**: Chia nhỏ ứng dụng thành các dịch vụ nhỏ (ví dụ: `UserService`, `ProductService`, `OrderService`), hoạt động độc lập, tự quản lý CSDL riêng và giao tiếp với nhau qua HTTP (REST API) hoặc Message Queue.\n    *   *Ưu điểm*: Phát triển độc lập, dễ dàng scale-up dịch vụ có tải cao, tăng khả năng chịu lỗi.\n    *   *Nhược điểm*: Hệ thống phân tán phức tạp, khó quản lý giao dịch CSDL (distributed transactions).\n\n---\n\n## 2. Các Thành Phần Cốt Lõi Trong Spring Cloud\nSpring Cloud cung cấp các công cụ thiết lập hạ tầng chịu lỗi và điều phối Microservices:\n\n### 1. Service Discovery (Eureka Server)\nTrong hệ thống Microservices, các server/container có thể khởi động hoặc tắt đi liên tục dẫn đến IP thay đổi.\n*   **Eureka Server** đóng vai trò như một **danh bạ điện thoại**.\n*   Mỗi dịch vụ khi khởi động sẽ tự đăng ký tên và địa chỉ của nó với Eureka (gọi là Service Registration).\n*   Khi `OrderService` cần gọi `UserService`, nó chỉ cần hỏi Eureka địa chỉ của `UserService` mà không cần cấu hình cứng IP (Service Discovery).\n\n### 2. API Gateway (Spring Cloud Gateway)\nĐóng vai trò là **cửa ngõ duy nhất** đón nhận mọi request từ Client:\n*   Định tuyến request đến đúng microservice đích ở phía sau.\n*   Thực hiện kiểm tra bảo mật, xác thực tập trung (Token check) tại cổng vào trước khi cho phép đi tiếp vào các service nội bộ.\n*   Hỗ trợ cân bằng tải (Load Balancing) giữa các instance của một service.\n\n### 3. Declarative HTTP Client (OpenFeign)\nGiúp việc gọi REST API giữa các service dễ dàng như gọi một phương thức Java cục bộ:\n```java\n// Khai báo Feign Client để gọi UserService\n@FeignClient(name = \"USER-SERVICE\")\npublic interface UserClient {\n    @GetMapping(\"/api/v1/users/{id}\")\n    UserDTO getUserById(@PathVariable(\"id\") Long id);\n}\n```\n\n---\n\n## Tóm Tắt — Bài 31\n```\n✅ Monolithic chạy chung một khối, Microservices chia nhỏ thành các dịch vụ chạy độc lập.\n✅ Microservices giúp mở rộng linh hoạt nhưng làm tăng độ phức tạp trong cấu hình và quản trị hệ thống.\n✅ Eureka Server hoạt động như danh bạ giúp các dịch vụ tự động đăng ký và tìm thấy địa chỉ của nhau.\n✅ API Gateway là cổng vào duy nhất, chịu trách nhiệm xác thực tập trung và định tuyến request.\n✅ OpenFeign giúp gọi API giữa các microservices một cách tường minh và ngắn gọn.\n```\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 31: Microservices & Spring Cloud\n\n> 🎯 **Bối cảnh dự án:** Xây dựng module định tuyến định danh dịch vụ mô phỏng API Gateway cho hệ thống Microservices của RaizeShop.\n\n---\n\n## 🔴 Bài Tập 1: Phân Tích Đường Dẫn Định Tuyến API Gateway Simulator ⭐\n\n**Bối cảnh thực tế:** API Gateway nhận toàn bộ request từ client, phân tích URI path để xác định xem cần chuyển tiếp (route) request này tới microservice nào chạy ở phía sau backend.\n\n**Yêu cầu:** Viết phương thức `routeRequest(String path)` phân tích đường dẫn URL và trả về tên Service tương ứng:\n- Nếu path bắt đầu bằng `/api/v1/users` -> Trả về: `\"USER-SERVICE\"`.\n- Nếu path bắt đầu bằng `/api/v1/products` hoặc `/api/v1/items` -> Trả về: `\"PRODUCT-SERVICE\"`.\n- Nếu path bắt đầu bằng `/api/v1/orders` -> Trả về: `\"ORDER-SERVICE\"`.\n- Các trường hợp khác -> Trả về: `\"UNKNOWN-SERVICE\"`.\n\n**Mẫu mã nguồn khởi đầu:**\n```java\npublic class GatewayRouterSim {\n    public static void main(String[] args) {\n        System.out.println(routeRequest(\"/api/v1/users/profile\")); // Output: USER-SERVICE\n        System.out.println(routeRequest(\"/api/v1/products/1001\")); // Output: PRODUCT-SERVICE\n        System.out.println(routeRequest(\"/api/v1/orders/checkout\")); // Output: ORDER-SERVICE\n        System.out.println(routeRequest(\"/api/v1/unknown\")); // Output: UNKNOWN-SERVICE\n    }\n\n    public static String routeRequest(String path) {\n        // TODO: Viết logic phân tích path và trả về tên Service chính xác tại đây\n        if (path == null) {\n            return \"UNKNOWN-SERVICE\";\n        }\n        if (path.startsWith(\"/api/v1/users\")) {\n            return \"USER-SERVICE\";\n        } else if (path.startsWith(\"/api/v1/products\") || path.startsWith(\"/api/v1/items\")) {\n            return \"PRODUCT-SERVICE\";\n        } else if (path.startsWith(\"/api/v1/orders\")) {\n            return \"ORDER-SERVICE\";\n        } else {\n            return \"UNKNOWN-SERVICE\";\n        }\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra\n- [ ] So sánh kiến trúc Monolith và Microservices. Tại sao các startup thường bắt đầu bằng Monolith?\n- [ ] Eureka Server giúp giải quyết vấn đề gì trong hạ tầng Microservices khi các dịch vụ liên tục thay đổi IP/Port?\n- [ ] API Gateway đóng vai trò gì? Tại sao không cho Client gọi trực tiếp tới từng Microservice ở phía sau?\n",
    "quizzes": [
      {
        "q": "Khuyết điểm lớn nhất của kiến trúc Monolithic khi hệ thống phát triển cực lớn là gì?",
        "options": [
          "Dễ phát triển ở giai đoạn đầu.",
          "Khó mở rộng độc lập từng phần tải cao, một module lỗi có thể làm sập toàn bộ hệ thống.",
          "Quá nhẹ và chạy nhanh.",
          "Không thể lưu trữ CSDL quan hệ."
        ],
        "answer": 1,
        "explanation": "Monolith chạy chung một tiến trình, nên nếu một phần bị quá tải hoặc lỗi (ví dụ rò rỉ bộ nhớ), nó sẽ kéo sập toàn bộ hệ thống."
      },
      {
        "q": "Thành phần Eureka Server trong Spring Cloud Microservices đóng vai trò gì?",
        "options": [
          "Làm API Gateway.",
          "Làm Service Registry - danh bạ lưu trữ IP/Port động của các microservice.",
          "Làm Config Server.",
          "Lưu trữ database tập trung."
        ],
        "answer": 1,
        "explanation": "Eureka Server là Service Registry giúp các microservices đăng ký thông tin IP/Port động và tìm thấy nhau tự động."
      },
      {
        "q": "API Gateway trong Microservices đóng vai trò gì?",
        "options": [
          "Là cổng vào duy nhất, chịu trách nhiệm định tuyến, xác thực tập trung và cân bằng tải.",
          "Là máy chủ lưu trữ file ảnh.",
          "Là hệ thống message queue.",
          "Là trình duyệt client."
        ],
        "answer": 0,
        "explanation": "API Gateway hoạt động như cửa ngõ đón nhận mọi request từ client, lọc xác thực và chuyển tiếp đến đúng microservice đích ở mạng nội bộ."
      }
    ],
    "practice": {
      "fileName": "GatewayRouterSim.java",
      "instructions": "### Yêu cầu:\nViết phương thức `routeRequest(String path)` trong lớp `GatewayRouterSim` để mô phỏng một API Gateway định tuyến đến các microservices:\n- Nếu path bắt đầu bằng `\"/api/v1/users\"` -> Trả về: `\"USER-SERVICE\"`.\n- Nếu path bắt đầu bằng `\"/api/v1/products\"` hoặc `\"/api/v1/items\"` -> Trả về: `\"PRODUCT-SERVICE\"`.\n- Nếu path bắt đầu bằng `\"/api/v1/orders\"` -> Trả về: `\"ORDER-SERVICE\"`.\n- Các trường hợp khác -> Trả về: `\"UNKNOWN-SERVICE\"`.",
      "starterCode": "public class GatewayRouterSim {\n    public static void main(String[] args) {\n        System.out.println(routeRequest(\"/api/v1/users/profile\"));\n        System.out.println(routeRequest(\"/api/v1/products/1001\"));\n        System.out.println(routeRequest(\"/api/v1/orders/checkout\"));\n        System.out.println(routeRequest(\"/api/v1/unknown\"));\n    }\n\n    public static String routeRequest(String path) {\n        // TODO: Viết logic phân tích path và trả về tên Service chính xác tại đây\n        return \"\";\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"routeRequest\")) {\r\n        return { pass: false, msg: \"Lỗi: Không tìm thấy phương thức routeRequest!\" };\r\n      }\r\n      if (!output.includes(\"USER-SERVICE\") || !output.includes(\"PRODUCT-SERVICE\") || !output.includes(\"ORDER-SERVICE\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa định tuyến đúng đến các microservices!\" };\r\n      }\r\n      if (!output.includes(\"UNKNOWN-SERVICE\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa xử lý đúng trường hợp path không xác định!\" };\r\n      }\r\n      return { pass: true, msg: \"Rất xuất sắc! Gateway router của em đã phân luồng giao thông mạng hoàn toàn chuẩn xác!\" };\r\n    }"
    }
  },
  {
    "id": 32,
    "title": "Docker & DevOps cho Java",
    "phase": "Phase 5: Ecosystem & Modern",
    "time": "4 giờ",
    "difficulty": "Trung bình",
    "theory": "# Bài 32: Docker & DevOps cho Java\n\n> 🟢 **Phase 5 – Bài 32/32** | Thời gian: ~4 giờ\n\n---\n\nTrong môi trường phát triển phần mềm hiện đại, việc ứng dụng hoạt động tốt trên máy tính của lập trình viên nhưng gặp lỗi khi deploy lên server sản xuất (production) là vấn đề thường thấy. **Docker** giúp đóng gói toàn bộ ứng dụng và môi trường chạy vào một khối thống nhất, làm tiền đề thiết lập luồng tự động hóa **DevOps** (CI/CD).\n\n---\n\n## 1. Ảo Hóa Container và Docker\n*   **Docker** là một nền tảng mã nguồn mở cho phép đóng gói ứng dụng cùng toàn bộ các thư viện và cấu hình đi kèm thành một **Container** độc lập.\n*   **Khác biệt với Máy ảo (Virtual Machine)**:\n    *   *Virtual Machine (VM)*: Cần cài đặt một Hệ điều hành khách (Guest OS) hoàn chỉnh trên mỗi máy ảo -> Nặng, khởi động chậm, tốn tài nguyên.\n    *   *Docker Container*: Sử dụng chung Nhân hệ điều hành (Kernel) với máy chủ vật lý, chỉ cô lập các tài nguyên phần mềm -> Nhẹ, khởi động trong vài mili-giây, tốn rất ít tài nguyên.\n\n```\n    VIRTUAL MACHINE (VM)                      DOCKER CONTAINER\n ┌─────────────────────────┐             ┌─────────────────────────┐\n │ App A  │ App B  │ App C  │             │ App A  │ App B  │ App C  │  ← Container nhẹ\n ├────────┼────────┼────────┤             ├────────┼────────┼────────┤\n │ Guest  │ Guest  │ Guest  │             │  Bins/Thư viện chia sẻ   │\n │ OS A   │ OS B   │ OS C   │             ├─────────────────────────┤\n ├────────┴────────┴────────┤             │      Docker Engine      │  ← Chia sẻ Kernel\n │       Hypervisor        │             ├─────────────────────────┤\n ├─────────────────────────┤             │         Host OS         │\n │     Hạ tầng vật lý      │             ├─────────────────────────┤\n └─────────────────────────┘             │     Hạ tầng vật lý      │\n                                         └─────────────────────────┘\n```\n\n---\n\n## 2. Dockerfile Cho Ứng Dụng Spring Boot\n**Dockerfile** là một tệp văn bản chứa các chỉ thị từng bước để Docker xây dựng một Container Image.\nDưới đây là một ví dụ Dockerfile chuẩn hóa cho ứng dụng Spring Boot đã build ra file JAR:\n\n```dockerfile\n# Bước 1: Chọn Base Image chứa sẵn JRE (Java 21) nhẹ\nFROM eclipse-temurin:21-jre-alpine\n\n# Bước 2: Thiết lập thư mục làm việc bên trong container\nWORKDIR /app\n\n# Bước 3: Sao chép file JAR đã build từ máy ngoài vào container\nCOPY target/raizeshop-1.0.0.jar app.jar\n\n# Bước 4: Mở cổng cổng mạng 8080 để bên ngoài kết nối\nEXPOSE 8080\n\n# Bước 5: Lệnh mặc định khởi động ứng dụng Java bên trong container\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]\n```\n\n---\n\n## 3. Docker Compose - Phối Hợp Nhiều Container\nThực tế, RaizeShop cần cả Web App (Spring Boot) và Database (MySQL).\n**Docker Compose** cho phép định nghĩa và chạy nhiều container cùng lúc bằng một file cấu hình duy nhất `docker-compose.yml`:\n\n```yaml\nversion: '3.8'\nservices:\n  # 1. Container Cơ sở dữ liệu\n  db:\n    image: mysql:8.0\n    environment:\n      MYSQL_ROOT_PASSWORD: root\n      MYSQL_DATABASE: raize_study\n    ports:\n      - \"3306:3306\"\n\n  # 2. Container Ứng dụng Spring Boot\n  app:\n    build: .\n    ports:\n      - \"8080:8080\"\n    depends_on:\n      - db # Khởi động database trước, app sau\n```\n\n---\n\n## 4. DevOps và Quy Trình CI/CD\n*   **CI (Continuous Integration - Tích hợp liên tục)**: Mỗi khi developer đẩy code lên GitHub, một hệ thống tự động (như GitHub Actions hoặc Jenkins) sẽ kích hoạt biên dịch ứng dụng, chạy toàn bộ Unit Tests để phát hiện lỗi sớm.\n*   **CD (Continuous Delivery/Deployment - Triển khai liên tục)**: Khi code vượt qua tất cả các bài kiểm tra, hệ thống tự động build Docker Image, đẩy lên kho lưu trữ (Docker Hub) và deploy trực tiếp lên máy chủ mà không cần con người thao tác thủ công.\n\n---\n\n## Tóm Tắt — Bài 32\n```\n✅ Docker đóng gói ứng dụng và môi trường chạy vào một Container duy nhất.\n✅ Container nhẹ hơn VM rất nhiều vì sử dụng chung Nhân hệ điều hành (Kernel) của máy chủ.\n✅ Dockerfile định nghĩa các bước đóng gói (FROM, WORKDIR, COPY, EXPOSE, ENTRYPOINT).\n✅ Docker Compose quản lý và điều phối các ứng dụng gồm nhiều container (App + CSDL).\n✅ CI/CD tự động hóa kiểm thử, đóng gói và deploy, tăng tốc độ phát hành sản phẩm.\n```\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 32: Docker & DevOps cho Java\n\n> 🎯 **Bối cảnh dự án:** Xây dựng module kiểm tra cấu hình biến môi trường (Environment Variables) trước khi khởi chạy ứng dụng RaizeShop trong Container Docker.\n\n---\n\n## 🔴 Bài Tập 1: Trình Xác Thực Cấu Hình Khởi Động Container Simulator ⭐\n\n**Bối cảnh thực tế:** Trong Docker/DevOps, cấu hình ứng dụng được truyền qua biến môi trường. Trước khi kết nối CSDL, ứng dụng cần validate xem các biến môi trường cấu hình bắt buộc đã được định nghĩa đúng hay chưa.\n\n**Yêu cầu:** Viết phương thức `validateEnv(String dbHost, String dbPassword)` thực hiện:\n- Kiểm tra xem `dbHost` có bị null hoặc rỗng hay không. Nếu có, trả về: `\"LỖI: Thiếu biến môi trường DB_HOST!\"`.\n- Kiểm tra xem `dbPassword` có bị null hoặc rỗng hay không. Nếu có, trả về: `\"LỖI: Thiếu biến môi trường DB_PASSWORD!\"`.\n- Nếu đầy đủ: Trả về `\"OK: Môi trường cấu hình hợp lệ!\"`.\n\n**Mẫu mã nguồn khởi đầu:**\n```java\npublic class EnvValidator {\n    public static void main(String[] args) {\n        System.out.println(validateEnv(\"localhost\", \"123456\")); // Output: OK: Môi trường cấu hình hợp lệ!\n        System.out.println(validateEnv(null, \"123456\")); // Output: LỖI: Thiếu biến môi trường DB_HOST!\n        System.out.println(validateEnv(\"localhost\", \"\")); // Output: LỖI: Thiếu biến môi trường DB_PASSWORD!\n    }\n\n    public static String validateEnv(String dbHost, String dbPassword) {\n        // TODO: Viết code kiểm tra và trả về thông báo tương ứng tại đây\n        if (dbHost == null || dbHost.trim().isEmpty()) {\n            return \"LỖI: Thiếu biến môi trường DB_HOST!\";\n        }\n        if (dbPassword == null || dbPassword.trim().isEmpty()) {\n            return \"LỖI: Thiếu biến môi trường DB_PASSWORD!\";\n        }\n        return \"OK: Môi trường cấu hình hợp lệ!\";\n    }\n}\n```\n\n---\n\n## ✅ Câu Hỏi Kiểm Tra\n- [ ] So sánh sự khác biệt cơ bản giữa Docker Container và máy ảo (Virtual Machine).\n- [ ] Hãy kể tên 3 chỉ thị (instruction) thông dụng nhất trong Dockerfile và giải thích vai trò của chúng.\n- [ ] Vai trò của CI (Tích hợp liên tục) là gì trong phát triển phần mềm Agile/DevOps?\n",
    "quizzes": [
      {
        "q": "Điểm khác biệt giúp Docker Container nhẹ và chạy nhanh hơn máy ảo (Virtual Machine) truyền thống là gì?",
        "options": [
          "Container sử dụng hệ điều hành khách đầy đủ.",
          "Container chia sẻ chung Nhân hệ điều hành (Kernel) của máy chủ vật lý, chỉ cô lập tài nguyên phần mềm.",
          "Container chạy trực tiếp trên CPU Intel.",
          "Container không cần RAM."
        ],
        "answer": 1,
        "explanation": "Container không cần cài đặt một hệ điều hành khách (Guest OS) riêng biệt như VM, mà chia sẻ chung Kernel máy chủ nên cực kỳ nhẹ và nhanh."
      },
      {
        "q": "Chỉ thị nào trong Dockerfile dùng để thiết lập lệnh chạy mặc định khi container khởi động?",
        "options": [
          "RUN",
          "COPY",
          "ENTRYPOINT hoặc CMD",
          "ENV"
        ],
        "answer": 2,
        "explanation": "ENTRYPOINT hoặc CMD định nghĩa lệnh mặc định được chạy khi container start. RUN dùng để chạy lệnh build khi tạo image."
      },
      {
        "q": "Tệp docker-compose.yml dùng để làm gì?",
        "options": [
          "Định nghĩa cấu hình một Dockerfile.",
          "Định nghĩa và chạy đồng thời nhiều container liên kết với nhau (ví dụ App + MySQL CSDL).",
          "Biên dịch code Java.",
          "Cài đặt Docker Desktop."
        ],
        "answer": 1,
        "explanation": "Docker Compose dùng cấu hình YAML để quản lý đa container, thiết lập mối quan hệ phụ thuộc và mạng chia sẻ giữa chúng dễ dàng."
      }
    ],
    "practice": {
      "fileName": "EnvValidator.java",
      "instructions": "### Yêu cầu:\nViết phương thức `validateEnv(String dbHost, String dbPassword)` trong lớp `EnvValidator` để mô phỏng việc kiểm tra tính đầy đủ của các biến cấu hình trước khi ứng dụng khởi chạy trong Container Docker:\n- Kiểm tra xem `dbHost` có bị null hoặc rỗng (chỉ chứa khoảng trắng) hay không. Nếu có, trả về: `\"LỖI: Thiếu biến môi trường DB_HOST!\"`.\n- Kiểm tra xem `dbPassword` có bị null hoặc rỗng (chỉ chứa khoảng trắng) hay không. Nếu có, trả về: `\"LỖI: Thiếu biến môi trường DB_PASSWORD!\"`.\n- Nếu đầy đủ: Trả về `\"OK: Môi trường cấu hình hợp lệ!\"`.",
      "starterCode": "public class EnvValidator {\n    public static void main(String[] args) {\n        System.out.println(validateEnv(\"localhost\", \"123456\"));\n        System.out.println(validateEnv(null, \"123456\"));\n        System.out.println(validateEnv(\"localhost\", \"\"));\n    }\n\n    public static String validateEnv(String dbHost, String dbPassword) {\n        // TODO: Viết code kiểm tra và trả về thông báo tương ứng tại đây\n        return \"\";\n    }\n}",
      "validateStr": "(code, output) => {\r\n      if (!code.includes(\"validateEnv\")) {\r\n        return { pass: false, msg: \"Lỗi: Không tìm thấy phương thức validateEnv!\" };\r\n      }\r\n      if (!output.includes(\"OK: Môi trường cấu hình hợp lệ!\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa xử lý đúng trường hợp cấu hình hợp lệ!\" };\r\n      }\r\n      if (!output.includes(\"LỖI: Thiếu biến môi trường DB_HOST!\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa bắt được trường hợp thiếu DB_HOST!\" };\r\n      }\r\n      if (!output.includes(\"LỖI: Thiếu biến môi trường DB_PASSWORD!\")) {\r\n        return { pass: false, msg: \"Lỗi: Chưa bắt được trường hợp thiếu DB_PASSWORD!\" };\r\n      }\r\n      return { pass: true, msg: \"Hoàn hảo! Docker container của em giờ đây đã được bảo vệ bởi bộ kiểm tra môi trường đáng tin cậy!\" };\r\n    }"
    }
  },
  {
    "id": 33,
    "title": "MySQL Cơ Bản & SELECT",
    "phase": "Phase 6: SQL Database",
    "time": "2 giờ",
    "difficulty": "Dễ",
    "theory": "# Bài 28: MySQL Cơ Bản & SELECT\n\n> 🔵 **Phase 6: SQL Database – Bài 1/6** | Thời gian: ~2 giờ\n\n---\n\nChào em! Chào mừng em đến với khóa học SQL Database. Sau khi đã nắm vững Java ở các phần trước, việc học SQL là mảnh ghép cực kỳ quan trọng tiếp theo. Hầu hết các ứng dụng Java Enterprise (như dự án **RaizeShop** sử dụng Spring Boot) đều cần lưu trữ dữ liệu lâu dài vào một hệ quản trị cơ sở dữ liệu quan hệ (RDBMS), và **MySQL** là lựa chọn phổ biến nhất thế giới.\n\nTrong bài học đầu tiên này, chúng ta sẽ làm quen với cơ sở dữ liệu quan hệ và học cách lấy dữ liệu ra bằng lệnh `SELECT`.\n\n---\n\n## 1. Cơ Sở Dữ Liệu Quan Hệ (RDBMS) & MySQL là gì?\n\nHãy tưởng tượng, thay vì lưu thông tin sản phẩm và hóa đơn vào các file text hay Excel rời rạc (rất dễ bị lỗi đồng bộ, mất mát dữ liệu và cực kỳ chậm khi dữ liệu lớn), chúng ta lưu chúng vào các **Bảng (Tables)** có mối liên kết chặt chẽ với nhau. Đó là **Cơ sở dữ liệu quan hệ**.\n\nMỗi bảng gồm:\n- **Cột (Columns / Fields)**: Định nghĩa kiểu dữ liệu (ví dụ: cột `name` lưu chuỗi chữ, cột `price` lưu số thực).\n- **Dòng (Rows / Records)**: Chứa dữ liệu của từng đối tượng cụ thể (ví dụ: thông tin của sản phẩm \"Kiếm Rồng\").\n\n**MySQL** là một RDBMS mã nguồn mở, hoạt động theo mô hình Client-Server. Ứng dụng Java của em sẽ đóng vai trò là Client, gửi các câu lệnh truy vấn đến MySQL Server bằng ngôn ngữ **SQL (Structured Query Language)** để đọc/ghi dữ liệu.\n\n---\n\n## 2. Truy Vấn SELECT Cơ Bản\n\nĐể lấy dữ liệu từ một bảng, câu lệnh đầu tiên và quan trọng nhất em cần học là `SELECT`.\n\n### Lấy toàn bộ cột và dòng từ bảng\nCú pháp kinh điển để lấy mọi thông tin từ bảng `products`:\n```sql\nSELECT * FROM products;\n```\n> ⚠️ **Cảnh báo tối ưu (Query Optimization):** Dấu hoa thị `*` đại diện cho việc lấy **tất cả các cột**. Trong môi trường sản xuất (production), **TUYỆT ĐỐI TRÁNH** sử dụng `SELECT *` trừ khi thực sự cần thiết. Nó làm tốn tài nguyên mạng và băng thông của server, đồng thời làm giảm hiệu năng truy vấn.\n\n### Lấy các cột cụ thể\nHãy chỉ lấy ra những cột thực sự cần thiết, ví dụ: tên sản phẩm (`name`) và giá tiền (`price`):\n```sql\nSELECT name, price FROM products;\n```\n> 💡 **Mẹo Mentor:** Việc chỉ định rõ tên cột giúp MySQL Server đọc dữ liệu từ ổ đĩa nhanh hơn và tối ưu hóa bộ nhớ đệm (buffer pool).\n\n---\n\n## 3. Bí Danh Của Cột (Alias với AS)\n\nNhiều khi tên cột trong database khá ngắn hoặc khó hiểu (ví dụ: `category_id`), em có thể đổi tên hiển thị ở kết quả trả về bằng từ khóa `AS`:\n```sql\nSELECT name AS ten_san_pham, price AS gia_ban FROM products;\n```\nTừ khóa `AS` giúp dữ liệu trả về cho backend Java có các key rõ ràng, khớp với các trường trong class DTO (Data Transfer Object) của em.\n\n---\n\n## 4. Loại Bỏ Trùng Lặp Với DISTINCT\n\nKhi em muốn lấy danh sách các giá trị duy nhất trong một cột, hãy dùng `DISTINCT`.\nVí dụ, để biết cửa hàng game items đang có những mã danh mục (`category_id`) nào được gán cho sản phẩm:\n```sql\nSELECT DISTINCT category_id FROM products;\n```\nNếu cột `category_id` có nhiều dòng trùng nhau, MySQL sẽ chỉ trả về mỗi ID danh mục một lần duy nhất.\n\n---\n\n## 5. Giới Hạn Dòng Trả Về Với LIMIT trong MySQL\n\nTrong MySQL, khi bảng có hàng triệu dòng, em không thể load hết lên cùng lúc. Để giới hạn số lượng dòng trả về (phục vụ tính năng phân trang), MySQL cung cấp từ khóa `LIMIT`:\n```sql\n-- Chỉ lấy 3 dòng đầu tiên từ bảng products\nSELECT name, price FROM products LIMIT 3;\n```\nNếu muốn bỏ qua một số dòng đầu tiên, em dùng thêm `OFFSET`:\n```sql\n-- Bỏ qua 2 dòng đầu tiên, và lấy 3 dòng tiếp theo\nSELECT name, price FROM products LIMIT 3 OFFSET 2;\n```\nHoặc viết rút gọn theo cú pháp MySQL:\n```sql\nSELECT name, price FROM products LIMIT 2, 3; -- (Bỏ qua 2, lấy 3)\n```\n\n---\n\n## Tóm Tắt Bài Học\n\n```\n✅ SQL là ngôn ngữ dùng để tương tác với Cơ sở dữ liệu quan hệ (RDBMS).\n✅ Dùng SELECT col1, col2 FROM table_name để truy vấn các cột cụ thể.\n✅ Tránh dùng SELECT * trong production để tối ưu hóa hiệu năng.\n✅ Dùng AS để đặt bí danh hiển thị cho cột.\n✅ Dùng DISTINCT để lấy các giá trị không trùng lặp.\n✅ Dùng LIMIT và OFFSET để giới hạn dữ liệu trả về (phân trang).\n```\n\n---\n\n👉 **Bài Tiếp Theo:** [Bài 29: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích](../bai-29-where-filtering/README.md)\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 28: MySQL Cơ Bản & SELECT\n\n> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống báo cáo sản phẩm và khách hàng cho dự án cửa hàng game items **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Danh Sách Toàn Bộ Sản Phẩm ⭐\n**Yêu cầu:** Viết câu lệnh SQL hiển thị toàn bộ cột và dòng từ bảng `products`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Lấy Tên Và Giá Sản Phẩm ⭐\n**Yêu cầu:** Chỉ truy vấn hai cột tên sản phẩm (`name`) và giá tiền (`price`) của toàn bộ sản phẩm trong bảng `products`.\n\n---\n\n## 🟡 Bài Tập 3: Đặt Biệt Danh Cho Cột Dữ Liệu ⭐⭐\n**Yêu cầu:** Truy vấn cột `name` với biệt danh hiển thị là `ten_san_pham`, và cột `price` hiển thị là `gia_ban` từ bảng `products`.\n\n---\n\n## 🟡 Bài Tập 4: Tìm Các Danh Mục Sản Phẩm Đang Có ⭐⭐\n**Yêu cầu:** Tìm danh sách các `category_id` duy nhất (không trùng lặp) đang được bán trong bảng `products`.\n\n---\n\n## 🔴 Bài Tập 5: Lấy Top 3 Người Dùng Đăng Ký Đầu Tiên ⭐\n**Yêu cầu:** Truy vấn cột `username` và `email` từ bảng `users` nhưng giới hạn chỉ lấy đúng 3 người đầu tiên (dựa trên thứ tự mặc định trong bảng).\n",
    "quizzes": [
      {
        "q": "Mệnh đề nào dùng để chỉ định các cột muốn lấy dữ liệu trong SQL?",
        "options": [
          "FROM",
          "WHERE",
          "SELECT",
          "DISPLAY"
        ],
        "answer": 2,
        "explanation": "Mệnh đề `SELECT` chỉ định các cột/trường thông tin muốn hiển thị trong tập kết quả."
      },
      {
        "q": "Để tránh lãng phí tài nguyên mạng và bộ nhớ đệm trong production, thói quen nào nên tránh?",
        "options": [
          "Chỉ định rõ tên cột cần lấy",
          "Sử dụng SELECT * để lấy toàn bộ các cột",
          "Sử dụng LIMIT để giới hạn số dòng",
          "Sử dụng bí danh AS cho các cột"
        ],
        "answer": 1,
        "explanation": "Sử dụng `SELECT *` bắt buộc MySQL quét và gửi toàn bộ các cột, gây hao phí I/O ổ đĩa, bộ nhớ đệm Buffer Pool và băng thông mạng."
      },
      {
        "q": "Từ khóa nào trong MySQL dùng để đặt tên hiển thị thay thế (bí danh) cho cột?",
        "options": [
          "LIKE",
          "IN",
          "AS",
          "SET"
        ],
        "answer": 2,
        "explanation": "Từ khóa `AS` dùng để gán biệt danh (Alias) cho cột hoặc bảng trong SQL."
      },
      {
        "q": "Mệnh đề nào trong MySQL dùng để loại bỏ các kết quả trùng lặp trong danh sách cột hiển thị?",
        "options": [
          "UNIQUE",
          "DISTINCT",
          "GROUP BY",
          "FILTER"
        ],
        "answer": 1,
        "explanation": "`DISTINCT` đứng ngay sau SELECT giúp loại bỏ mọi dòng dữ liệu trùng lặp trong tập kết quả hiển thị."
      },
      {
        "q": "Lệnh `LIMIT 5, 10` trong MySQL hoạt động thế nào?",
        "options": [
          "Lấy 5 dòng đầu tiên và lọc 10 dòng sau",
          "Bỏ qua 5 dòng đầu tiên, và lấy 10 dòng tiếp theo",
          "Lấy từ dòng số 5 đến dòng số 10",
          "Chỉ lấy các dòng chia hết cho 5 hoặc 10"
        ],
        "answer": 1,
        "explanation": "Cú pháp `LIMIT offset, row_count` của MySQL bỏ qua `offset` dòng đầu tiên và lấy ra tối đa `row_count` dòng tiếp theo."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: MySQL Cơ Bản & SELECT\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 28: MySQL Cơ Bản & SELECT\n\n> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống báo cáo sản phẩm và khách hàng cho dự án cửa hàng game items **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Danh Sách Toàn Bộ Sản Phẩm ⭐\n**Yêu cầu:** Viết câu lệnh SQL hiển thị toàn bộ cột và dòng từ bảng `products`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Lấy Tên Và Giá Sản Phẩm ⭐\n**Yêu cầu:** Chỉ truy vấn hai cột tên sản phẩm (`name`) và giá tiền (`price`) của toàn bộ sản phẩm trong bảng `products`.\n\n---\n\n## 🟡 Bài Tập 3: Đặt Biệt Danh Cho Cột Dữ Liệu ⭐⭐\n**Yêu cầu:** Truy vấn cột `name` với biệt danh hiển thị là `ten_san_pham`, và cột `price` hiển thị là `gia_ban` từ bảng `products`.\n\n---\n\n## 🟡 Bài Tập 4: Tìm Các Danh Mục Sản Phẩm Đang Có ⭐⭐\n**Yêu cầu:** Tìm danh sách các `category_id` duy nhất (không trùng lặp) đang được bán trong bảng `products`.\n\n---\n\n## 🔴 Bài Tập 5: Lấy Top 3 Người Dùng Đăng Ký Đầu Tiên ⭐\n**Yêu cầu:** Truy vấn cột `username` và `email` từ bảng `users` nhưng giới hạn...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 34,
    "title": "Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích",
    "phase": "Phase 6: SQL Database",
    "time": "2 giờ",
    "difficulty": "Dễ",
    "theory": "# Bài 29: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích\n\n> 🔵 **Phase 6: SQL Database – Bài 2/6** | Thời gian: ~2 giờ\n\n---\n\nChào em! Trong bài học trước, chúng ta đã lấy được dữ liệu từ bảng ra. Nhưng thực tế, em hiếm khi lấy toàn bộ các dòng. Ví dụ: Khách hàng chỉ muốn tìm sản phẩm dưới 500,000đ, hoặc kiểm tra xem tài khoản đã xác thực chưa. \n\nĐể làm được việc đó, chúng ta sẽ dùng mệnh đề **`WHERE`** để lọc dữ liệu, và kết hợp các **Hàm Tiện Ích (Utility Functions)** có sẵn của MySQL để xử lý chuỗi và số.\n\n---\n\n## 1. Mệnh Đề WHERE & Các Toán Tử So Sánh\n\nMệnh đề `WHERE` được đặt ngay sau tên bảng trong câu lệnh `SELECT`, giúp lọc ra các dòng thỏa mãn điều kiện chỉ định.\n\n```sql\nSELECT name, price FROM products WHERE price > 1000000;\n```\n\nCác toán tử so sánh cơ bản trong MySQL:\n- `=` : So sánh bằng.\n- `<>` hoặc `!=` : So sánh khác.\n- `>`, `<`, `>=`, `<=` : Lớn hơn, nhỏ hơn, lớn hơn hoặc bằng, nhỏ hơn hoặc bằng.\n\n---\n\n## 2. Kết Hợp Nhiều Điều Kiện Với Toán Tử Logic\n\nEm có thể kết hợp nhiều bộ lọc bằng các toán tử logic:\n- **`AND`**: Trả về dòng thỏa mãn **tất cả** các điều kiện.\n- **`OR`**: Trả về dòng thỏa mãn **ít nhất một** trong các điều kiện.\n- **`NOT`**: Phủ định điều kiện đứng sau nó.\n\n```sql\n-- Lấy sản phẩm thuộc danh mục ID = 1 và có giá từ 1 triệu trở lên\nSELECT * FROM products WHERE category_id = 1 AND price >= 1000000;\n```\n\n---\n\n## 3. Các Phép Lọc Đặc Biệt: BETWEEN, IN, LIKE\n\n### Toán tử BETWEEN\nThay vì viết `price >= 500000 AND price <= 1500000`, em viết gọn hơn:\n```sql\nSELECT * FROM products WHERE price BETWEEN 500000 AND 1500000;\n```\n\n### Toán tử IN\nLọc các dòng có giá trị thuộc một danh sách cho trước:\n```sql\nSELECT * FROM products WHERE category_id IN (1, 2, 4);\n```\n\n### Toán tử LIKE (Tìm kiếm chuỗi gần đúng)\nDùng để tìm kiếm mẫu chuỗi bằng các ký tự đại diện (wildcards):\n- `%` : Đại diện cho bất kỳ chuỗi ký tự nào (bao gồm cả chuỗi rỗng).\n- `_` : Đại diện cho đúng 1 ký tự duy nhất.\n\n```sql\n-- Tìm sản phẩm có tên bắt đầu bằng từ \"Kiếm\"\nSELECT * FROM products WHERE name LIKE 'Kiếm%';\n\n-- Tìm sản phẩm có từ \"Rồng\" ở bất kỳ vị trí nào\nSELECT * FROM products WHERE name LIKE '%Rồng%';\n```\n\n---\n\n## 4. Xử Lý Giá Trị NULL Trong MySQL\n\nTrong SQL, `NULL` đại diện cho dữ liệu bị thiếu hoặc chưa xác định. Nó **không phải là số 0** hay **chuỗi rỗng `\"\"`**.\n\n### Lọc giá trị NULL\n- Để tìm dòng bị trống: dùng `IS NULL` (không dùng `= NULL`).\n- Để tìm dòng có giá trị: dùng `IS NOT NULL`.\n\n```sql\nSELECT * FROM products WHERE category_id IS NULL;\n```\n\n### Hàm xử lý NULL trong MySQL: IFNULL và COALESCE\nTrong MySQL, để hiển thị một giá trị mặc định thay thế cho giá trị NULL ở kết quả:\n- **`IFNULL(col, default_val)`**: Trả về `default_val` nếu cột `col` bị NULL.\n- **`COALESCE(val1, val2, ...)`**: Trả về giá trị phi-NULL đầu tiên trong danh sách tham số.\n\n```sql\n-- Nếu sản phẩm chưa được gán danh mục, hiển thị 'Chưa phân loại'\nSELECT name, IFNULL(category_id, 'Chưa phân loại') FROM products;\n```\n\n---\n\n## 5. Các Hàm Tiện Ích Tiêu Biểu Trong MySQL\n\nĐể viết ứng dụng chuyên nghiệp, em cần làm chủ các hàm tích hợp sẵn của MySQL để định dạng dữ liệu trực tiếp từ DB.\n\n### Hàm Xử Lý Chuỗi (String Functions)\n- **`CONCAT(str1, str2, ...)`**: Nối các chuỗi lại với nhau.\n- **`LOWER(str)` / `UPPER(str)`**: Chuyển chữ thường / chữ hoa.\n- **`LENGTH(str)`**: Độ dài chuỗi (tính theo byte).\n\n```sql\n-- Hiển thị tên người dùng kèm email ở dạng: \"raize (raize@raize.vn)\"\nSELECT CONCAT(username, ' (', email, ')') AS user_info FROM users;\n```\n\n### Hàm Toán Học (Math Functions)\n- **`ROUND(number, decimals)`**: Làm tròn số đến số chữ số thập phân chỉ định.\n- **`ABS(number)`**: Lấy giá trị tuyệt đối.\n- **`CEIL(number)` / `FLOOR(number)`**: Làm tròn lên / làm tròn xuống số nguyên gần nhất.\n\n---\n\n## Tóm Tắt Bài Học\n\n```\n✅ Dùng WHERE [điều kiện] để lọc dữ liệu.\n✅ Dùng AND, OR, NOT để kết hợp logic nhiều điều kiện.\n✅ BETWEEN lọc giá trị trong khoảng; IN lọc giá trị trong tập hợp.\n✅ LIKE dùng kèm % hoặc _ để tìm kiếm chuỗi gần đúng.\n✅ Không so sánh bằng = NULL, phải dùng IS NULL hoặc IS NOT NULL.\n✅ Hàm IFNULL và COALESCE dùng để xử lý hiển thị giá trị mặc định cho NULL.\n✅ MySQL cung cấp hàm CONCAT, ROUND, LOWER, UPPER để định dạng dữ liệu trực quan.\n```\n\n---\n\n👉 **Bài Tiếp Theo:** [Bài 30: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)](../bai-30-order-limit-group/README.md)\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 29: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích\n\n> 🎯 **Bối cảnh dự án:** Thực hiện các chức năng tìm kiếm sản phẩm nâng cao và xử lý thông tin người dùng cho dự án **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Tìm Kiếm Game Item Giá Trị Cao ⭐\n**Yêu cầu:** Tìm tất cả sản phẩm trong bảng `products` có giá (`price`) lớn hơn hoặc bằng `1,000,000`đ. Hiển thị cột `name` và `price`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Lọc Sản Phẩm Theo Khoảng Giá ⭐\n**Yêu cầu:** Tìm tất cả các sản phẩm có giá nằm trong khoảng từ `500,000`đ đến `1,500,000`đ (sử dụng toán tử `BETWEEN`).\n\n---\n\n## 🟡 Bài Tập 3: Tìm Kiếm Theo Từ Khóa Tên Sản Phẩm ⭐⭐\n**Yêu cầu:** Lọc ra toàn bộ các sản phẩm có chứa từ `\"Siêu\"` hoặc `\"Cấp\"` ở bất kỳ vị trí nào trong tên sản phẩm (`name`).\n\n---\n\n## 🟡 Bài Tập 4: Chuẩn Hóa Chuỗi Email Người Dùng ⭐⭐\n**Yêu cầu:** Truy vấn cột `username` và cột `email` của toàn bộ người dùng, nhưng cột `email` cần được chuyển thành chữ in hoa (`UPPER`) và đặt bí danh hiển thị là `EMAIL_HOA`.\n\n---\n\n## 🔴 Bài Tập 5: Định Dạng Tên Và Số Dư Tài Khoản ⭐\n**Yêu cầu:** Hiển thị tên người dùng và số tiền trong ví của người dùng bằng cách dùng hàm `CONCAT` để hiển thị cột dạng: `\"Tài khoản: [username] - Số dư: [balance]đ\"`. Đặt bí danh cho cột hiển thị này là `thong_tin_vi`.\n- Lưu ý: Chỉ hiển thị những người dùng có số dư (`balance`) lớn hơn 0.\n",
    "quizzes": [
      {
        "q": "Mệnh đề nào trong SQL dùng để lọc các dòng dữ liệu thỏa mãn một điều kiện cụ thể?",
        "options": [
          "HAVING",
          "GROUP BY",
          "WHERE",
          "SELECT"
        ],
        "answer": 2,
        "explanation": "Mệnh đề `WHERE` dùng để lọc các dòng dữ liệu đơn lẻ từ bảng nguồn trước khi xử lý gom nhóm hoặc chọn cột."
      },
      {
        "q": "Ký tự đại diện `%` trong toán tử `LIKE` có ý nghĩa gì?",
        "options": [
          "Đại diện cho đúng 1 ký tự bất kỳ",
          "Đại diện cho một chữ số",
          "Đại diện cho một chuỗi ký tự bất kỳ (gồm cả chuỗi rỗng)",
          "Phép chia lấy phần dư"
        ],
        "answer": 2,
        "explanation": "Trong mệnh đề `LIKE`, `%` là wildcard đại diện cho 0, 1 hoặc nhiều ký tự bất kỳ. Ký tự `_` đại diện cho đúng 1 ký tự."
      },
      {
        "q": "Giá trị NULL trong cơ sở dữ liệu thể hiện điều gì?",
        "options": [
          "Số 0",
          "Chuỗi rỗng ''",
          "Giá trị bị thiếu hoặc chưa xác định",
          "Giá trị boolean false"
        ],
        "answer": 2,
        "explanation": "`NULL` đại diện cho một trạng thái dữ liệu trống, chưa biết hoặc chưa được gán giá trị. Nó hoàn toàn khác số 0 hay chuỗi rỗng."
      },
      {
        "q": "Phép so sánh nào đúng để kiểm tra xem một cột có bị NULL hay không?",
        "options": [
          "col = NULL",
          "col != NULL",
          "col IS NULL",
          "col IS NOT NULL (chỉ dùng cho khác NULL)"
        ],
        "answer": 2,
        "explanation": "Không được dùng các toán tử so sánh thông thường (`=`, `!=`) với NULL. Phải dùng toán tử `IS NULL` hoặc `IS NOT NULL`."
      },
      {
        "q": "Hàm nào của MySQL dùng để trả về giá trị thay thế mặc định nếu cột đầu vào bị NULL?",
        "options": [
          "COALESCE",
          "IFNULL",
          "NVL",
          "Cả A và B đều đúng"
        ],
        "answer": 3,
        "explanation": "MySQL cung cấp cả `IFNULL(val, default)` và `COALESCE(val1, val2, ...)` để xử lý thay thế giá trị mặc định khi dữ liệu bị NULL."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 29: Lọc Dữ Liệu Với WHERE & Hàm Tiện Ích\n\n> 🎯 **Bối cảnh dự án:** Thực hiện các chức năng tìm kiếm sản phẩm nâng cao và xử lý thông tin người dùng cho dự án **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Tìm Kiếm Game Item Giá Trị Cao ⭐\n**Yêu cầu:** Tìm tất cả sản phẩm trong bảng `products` có giá (`price`) lớn hơn hoặc bằng `1,000,000`đ. Hiển thị cột `name` và `price`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Lọc Sản Phẩm Theo Khoảng Giá ⭐\n**Yêu cầu:** Tìm tất cả các sản phẩm có giá nằm trong khoảng từ `500,000`đ đến `1,500,000`đ (sử dụng toán tử `BETWEEN`).\n\n---\n\n## 🟡 Bài Tập 3: Tìm Kiếm Theo Từ Khóa Tên Sản Phẩm ⭐⭐\n**Yêu cầu:** Lọc ra toàn bộ các sản phẩm có chứa từ `\"Siêu\"` hoặc `\"Cấp\"` ở bất kỳ vị trí nào trong tên sản phẩm (`name`).\n\n---\n\n## 🟡 Bài Tập 4: Chuẩn Hóa Chuỗi Email Người Dùng ⭐⭐\n**Yêu cầu:** Truy vấn cột `username` và cột `email` của toàn bộ người dùng, nhưng cột `email` cần được chuyển thành chữ in hoa (`UPPER`) và đặt bí danh hiển thị là ...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 35,
    "title": "Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)",
    "phase": "Phase 6: SQL Database",
    "time": "2.5 giờ",
    "difficulty": "Trung bình",
    "theory": "# Bài 30: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)\n\n> 🔵 **Phase 6: SQL Database – Bài 3/6** | Thời gian: ~2.5 giờ\n\n---\n\nChào em! Trong phân tích dữ liệu và lập trình backend, chúng ta thường cần thống kê dữ liệu. Ví dụ: Tính tổng doanh thu của shop, tìm giá sản phẩm đắt nhất, hay đếm xem mỗi danh mục có bao nhiêu mặt hàng.\n\nBài học này sẽ trang bị cho em các công cụ mạnh mẽ nhất trong SQL để sắp xếp dữ liệu và thực hiện các thống kê gom nhóm phức tạp.\n\n---\n\n## 1. Sắp Xếp Dữ Liệu Với ORDER BY\n\nĐể sắp xếp các dòng kết quả theo thứ tự tăng dần hoặc giảm dần của một hoặc nhiều cột, em dùng mệnh đề `ORDER BY`:\n- **`ASC`**: Tăng dần (mặc định nếu không viết gì).\n- **`DESC`**: Giảm dần.\n\n```sql\n-- Lấy danh sách sản phẩm, sắp xếp theo giá giảm dần (từ đắt nhất đến rẻ nhất)\nSELECT name, price FROM products ORDER BY price DESC;\n```\n\nEm cũng có thể sắp xếp theo nhiều cột. Ví dụ, sắp xếp theo mã danh mục tăng dần, nếu trùng danh mục thì sắp xếp theo giá giảm dần:\n```sql\nSELECT category_id, name, price FROM products ORDER BY category_id ASC, price DESC;\n```\n\n---\n\n## 2. Các Hàm Gộp Dữ Liệu (Aggregate Functions)\n\nHàm gộp là các hàm tính toán trên một tập hợp các giá trị và trả về một giá trị duy nhất đại diện.\n- **`COUNT(col)`**: Đếm số dòng (phi-NULL). `COUNT(*)` đếm tổng số dòng bao gồm cả NULL.\n- **`SUM(col)`**: Tính tổng các giá trị số trong cột.\n- **`AVG(col)`**: Tính giá trị trung bình cộng.\n- **`MIN(col)`** / **`MAX(col)`**: Tìm giá trị nhỏ nhất / lớn nhất.\n\n```sql\n-- Tính tổng doanh thu và trung bình giá của tất cả sản phẩm\nSELECT SUM(price) AS tong_gia_tri, AVG(price) AS gia_trung_binh FROM products;\n```\n\n---\n\n## 3. Gom Nhóm Dữ Liệu Với GROUP BY\n\nMệnh đề `GROUP BY` dùng để gom các dòng có cùng giá trị trong các cột chỉ định vào các nhóm riêng biệt. Các hàm gộp khi đi kèm `GROUP BY` sẽ tính toán kết quả trên **từng nhóm** thay vì toàn bộ bảng.\n\nVí dụ, tính tổng số lượng tồn kho và giá trung bình cho từng danh mục sản phẩm:\n```sql\nSELECT category_id, SUM(stock) AS tong_ton_kho, AVG(price) AS gia_trung_binh \nFROM products \nGROUP BY category_id;\n```\n\n> [!IMPORTANT]\n> **Quy tắc bắt buộc khi dùng GROUP BY:** \n> Bất kỳ cột nào xuất hiện trong phần `SELECT` mà **không** nằm trong hàm gộp (như SUM, AVG, COUNT...) thì **bắt buộc** phải được khai báo trong phần `GROUP BY`. Nếu không, MySQL sẽ báo lỗi cú pháp hoặc trả về kết quả không chính xác.\n\n---\n\n## 4. Lọc Nhóm Dữ Liệu Với HAVING\n\nKhi muốn lọc dữ liệu của các nhóm sau khi đã gom nhóm và tính toán hàm gộp, em không thể dùng `WHERE` (vì `WHERE` chỉ lọc các dòng đơn lẻ trước khi gom nhóm). Thay vào đó, em phải dùng **`HAVING`**.\n\n```sql\n-- Tìm các danh mục có tổng số lượng tồn kho lớn hơn 10 cái\nSELECT category_id, SUM(stock) AS tong_ton_kho \nFROM products \nGROUP BY category_id \nHAVING SUM(stock) > 10;\n```\n\n### So sánh WHERE và HAVING (Cực kỳ quan trọng!)\n| Đặc điểm | WHERE | HAVING |\n|---|---|---|\n| **Thời điểm chạy** | Chạy **trước** khi gom nhóm (`GROUP BY`). | Chạy **sau** khi gom nhóm và tính hàm gộp. |\n| **Đối tượng lọc** | Lọc từng dòng đơn lẻ của bảng. | Lọc các nhóm (thỏa mãn điều kiện gộp). |\n| **Sử dụng hàm gộp** | **KHÔNG** được sử dụng hàm gộp (Ví dụ: `WHERE SUM(price) > 100` là sai). | **ĐƯỢC** phép sử dụng hàm gộp. |\n\n---\n\n## 5. Thứ Tự Thực Thi Câu Lệnh Trong MySQL (Query Execution Order)\n\nĐể tối ưu hóa query tốt và tránh các lỗi logic ngớ ngẩn, em cần thuộc lòng thứ tự thực thi một câu lệnh SQL của MySQL Engine dưới đây.\n\nMặc dù em viết câu lệnh theo thứ tự:\n`SELECT` ➔ `FROM` ➔ `WHERE` ➔ `GROUP BY` ➔ `HAVING` ➔ `ORDER BY` ➔ `LIMIT`\n\nNhưng MySQL Engine thực tế sẽ chạy theo thứ tự sau:\n\n```\n1. FROM & JOINs      : Xác định các bảng nguồn cần đọc dữ liệu.\n2. WHERE            : Lọc bỏ các dòng đơn lẻ không thỏa mãn điều kiện.\n3. GROUP BY         : Chia các dòng còn lại thành các nhóm.\n4. HAVING           : Lọc bỏ các nhóm không thỏa mãn điều kiện gộp.\n5. SELECT           : Chọn ra các cột cần hiển thị và tính toán biểu thức.\n6. DISTINCT         : Loại bỏ các dòng kết quả trùng lặp.\n7. ORDER BY         : Sắp xếp các dòng kết quả cuối cùng.\n8. LIMIT & OFFSET   : Giới hạn số dòng trả về hiển thị.\n```\n\n> [!TIP]\n> **Giải thích lỗi đặt Alias trong WHERE:**\n> Tại sao em viết `SELECT price AS gia_ban FROM products WHERE gia_ban > 100` lại báo lỗi `Unknown column 'gia_ban'`?\n> Nhìn vào thứ tự thực thi: `WHERE` chạy ở bước 2, lúc này bước 5 (`SELECT` - nơi định nghĩa alias `gia_ban`) **chưa hề được chạy**! Do đó MySQL không biết `gia_ban` là gì. Ngược lại, `ORDER BY` ở bước 7 chạy sau `SELECT` nên em hoàn toàn có thể sắp xếp theo alias: `ORDER BY gia_ban DESC`.\n\n---\n\n## Tóm Tắt Bài Học\n\n```\n✅ ORDER BY [col] ASC/DESC dùng để sắp xếp kết quả hiển thị.\n✅ Các hàm gộp COUNT, SUM, AVG, MIN, MAX dùng để tính toán thống kê.\n✅ GROUP BY chia bảng thành các nhóm để tính hàm gộp trên từng nhóm.\n✅ HAVING dùng để lọc các nhóm sau khi gộp (hỗ trợ hàm gộp).\n✅ WHERE lọc dòng trước khi GROUP BY, HAVING lọc nhóm sau khi GROUP BY.\n✅ Thứ tự thực thi logic: FROM ➔ WHERE ➔ GROUP BY ➔ HAVING ➔ SELECT ➔ ORDER BY ➔ LIMIT.\n```\n\n---\n\n👉 **Bài Tiếp Theo:** [Bài 31: Liên Kết Bảng (JOINs)](../bai-31-joins/README.md)\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 30: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng các báo cáo thống kê kho hàng, ví tiền và giao dịch mua bán game items của **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Danh Sách Sản Phẩm Rẻ Nhất ⭐\n**Yêu cầu:** Viết câu lệnh truy vấn lấy ra tên sản phẩm (`name`) và giá (`price`) từ bảng `products`, sắp xếp theo thứ tự giá tăng dần (`ASC`), giới hạn chỉ lấy 3 sản phẩm rẻ nhất.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Thống Kê Số Lượng Sản Phẩm ⭐\n**Yêu cầu:** Đếm tổng số lượng sản phẩm đang có trong bảng `products`. Đặt tên cột kết quả là `tong_so_luong`.\n\n---\n\n## 🟡 Bài Tập 3: Thống Kê Hàng Tồn Kho Theo Danh Mục ⭐⭐\n**Yêu cầu:** Gom nhóm các sản phẩm theo `category_id`, tính tổng số lượng tồn kho (`stock`) và trung bình điểm đánh giá (`rating`) của các sản phẩm trong từng danh mục đó.\n- Cột tổng tồn kho hiển thị đặt tên là: `tong_ton`.\n- Cột trung bình đánh giá hiển thị đặt tên là: `tb_danh_gia`.\n\n---\n\n## 🟡 Bài Tập 4: Lọc Các Danh Mục Nhiều Hàng Tồn ⭐⭐\n**Yêu cầu:** Viết truy vấn lấy ra các `category_id` có tổng số lượng tồn kho (`stock`) lớn hơn `15` sản phẩm.\n- Sử dụng mệnh đề `GROUP BY` kết hợp với `HAVING`.\n\n---\n\n## 🔴 Bài Tập 5: Thống Kê Ví Tiền Người Dùng Lớn Nhất ⭐\n**Yêu cầu:** Tìm số dư lớn nhất (`max_balance`) và trung bình số dư (`avg_balance`) của tất cả người dùng trong bảng `users` có email kết thúc bằng đuôi `\"@gmail.com\"`.\n- Làm tròn cột trung bình số dư về 1 chữ số thập phân (`ROUND`).\n",
    "quizzes": [
      {
        "q": "Để sắp xếp kết quả truy vấn theo giá giảm dần, sử dụng mệnh đề nào?",
        "options": [
          "ORDER BY price ASC",
          "SORT BY price DESC",
          "ORDER BY price DESC",
          "GROUP BY price DESC"
        ],
        "answer": 2,
        "explanation": "Dùng `ORDER BY` kèm từ khóa `DESC` để sắp xếp dữ liệu theo thứ tự giảm dần."
      },
      {
        "q": "Hàm gộp nào dùng để tính giá trị trung bình cộng của một cột kiểu số?",
        "options": [
          "COUNT",
          "SUM",
          "AVG",
          "MEAN"
        ],
        "answer": 2,
        "explanation": "`AVG()` (Average) là hàm gộp tính trung bình cộng các giá trị kiểu số trong cột."
      },
      {
        "q": "Sự khác biệt quan trọng nhất giữa WHERE và HAVING là gì?",
        "options": [
          "WHERE chạy chậm hơn HAVING",
          "WHERE lọc các dòng đơn lẻ trước khi gom nhóm, HAVING lọc các nhóm sau khi gom nhóm",
          "WHERE chỉ cho số, HAVING dùng cho chuỗi",
          "HAVING bắt buộc dùng kèm SELECT"
        ],
        "answer": 1,
        "explanation": "`WHERE` lọc dữ liệu ở mức dòng thô từ bảng nguồn; `HAVING` lọc ở mức nhóm đã tính toán hàm gộp sau khi `GROUP BY` hoàn thành."
      },
      {
        "q": "Thứ tự thực thi logic nào sau đây là chính xác đối với MySQL Engine?",
        "options": [
          "SELECT -> FROM -> WHERE -> ORDER BY",
          "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT",
          "FROM -> SELECT -> WHERE -> HAVING",
          "WHERE -> FROM -> GROUP BY -> SELECT"
        ],
        "answer": 1,
        "explanation": "MySQL Engine luôn chạy theo thứ tự: xác định bảng nguồn (`FROM/JOIN`), lọc dòng (`WHERE`), gom nhóm (`GROUP BY`), lọc nhóm (`HAVING`), chọn cột hiển thị (`SELECT/DISTINCT`), sắp xếp (`ORDER BY`), giới hạn dòng (`LIMIT`)."
      },
      {
        "q": "Hàm `COUNT(*)` trong MySQL thực hiện điều gì?",
        "options": [
          "Chỉ đếm các dòng chứa giá trị phi-NULL",
          "Đếm tổng số dòng trong bảng (bao gồm cả dòng chứa giá trị NULL)",
          "Đếm các dòng không trùng lặp",
          "Tính tổng các số nguyên"
        ],
        "answer": 1,
        "explanation": "`COUNT(*)` đếm tất cả các dòng dữ liệu khớp điều kiện trong bảng bất kể dòng đó có chứa cột bị NULL hay không."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 30: Sắp Xếp & Gom Nhóm (ORDER BY, GROUP BY, HAVING)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng các báo cáo thống kê kho hàng, ví tiền và giao dịch mua bán game items của **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Danh Sách Sản Phẩm Rẻ Nhất ⭐\n**Yêu cầu:** Viết câu lệnh truy vấn lấy ra tên sản phẩm (`name`) và giá (`price`) từ bảng `products`, sắp xếp theo thứ tự giá tăng dần (`ASC`), giới hạn chỉ lấy 3 sản phẩm rẻ nhất.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Thống Kê Số Lượng Sản Phẩm ⭐\n**Yêu cầu:** Đếm tổng số lượng sản phẩm đang có trong bảng `products`. Đặt tên cột kết quả là `tong_so_luong`.\n\n---\n\n## 🟡 Bài Tập 3: Thống Kê Hàng Tồn Kho Theo Danh Mục ⭐⭐\n**Yêu cầu:** Gom nhóm các sản phẩm theo `category_id`, tính tổng số lượng tồn kho (`stock`) và trung bình điểm đánh giá (`rating`) của các sản phẩm trong từng danh mục đó.\n- Cột tổng tồn kho hiển thị đặt tên là: `tong_ton`.\n- Cột trung bình đánh giá hiển thị đặt tên là: `tb_danh_gia`.\n\n---\n\n## 🟡 Bài Tập 4: Lọc...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 36,
    "title": "Liên Kết Bảng (JOINs)",
    "phase": "Phase 6: SQL Database",
    "time": "3 giờ",
    "difficulty": "Trung bình",
    "theory": "# Bài 31: Liên Kết Bảng (JOINs)\n\n> 🔵 **Phase 6: SQL Database – Bài 4/6** | Thời gian: ~3 giờ\n\n---\n\nChào em! Trong các hệ thống thực tế như **RaizeShop**, dữ liệu được phân tách ra nhiều bảng để tránh trùng lặp dữ liệu (chuẩn hóa dữ liệu - Normalization). Ví dụ: Bảng `products` lưu thông tin sản phẩm, bảng `categories` lưu thông tin danh mục, và bảng `orders` lưu lịch sử mua hàng.\n\nKhi cần hiển thị thông tin đầy đủ cho người dùng (ví dụ: tên sản phẩm kèm theo tên danh mục của nó), chúng ta cần kết hợp dữ liệu từ các bảng này dựa trên mối liên kết giữa chúng. Đó chính là kỹ thuật **`JOIN`**.\n\n---\n\n## 1. Khóa Chính (Primary Key) & Khóa Ngoại (Foreign Key)\n\nTrước khi thực hiện `JOIN`, em cần hiểu rõ cách các bảng liên kết với nhau:\n- **Khóa chính (Primary Key - PK)**: Cột chứa giá trị duy nhất định danh cho mỗi dòng trong bảng (ví dụ: cột `id` trong bảng `categories`). Không được phép trùng lặp và không được NULL.\n- **Khóa ngoại (Foreign Key - FK)**: Cột trong một bảng trỏ đến Khóa chính của bảng khác (ví dụ: cột `category_id` trong bảng `products` trỏ đến cột `id` của bảng `categories`).\n\n---\n\n## 2. Liên Kết INNER JOIN (Lấy Phần Giao)\n\n`INNER JOIN` là loại liên kết phổ biến nhất. Nó chỉ trả về các dòng khi điều kiện liên kết được thỏa mãn ở **cả hai** bảng. Nếu một dòng ở bảng này không tìm thấy dòng khớp ở bảng kia, dòng đó sẽ bị loại bỏ khỏi kết quả.\n\n```sql\n-- Lấy tên sản phẩm kèm theo tên danh mục tương ứng\nSELECT p.name AS ten_san_pham, c.name AS ten_danh_muc\nFROM products p\nINNER JOIN categories c ON p.category_id = c.id;\n```\n> 💡 **Mẹo Mentor:** Hãy dùng ký tự viết tắt đại diện cho bảng (như `products p` và `categories c`) làm alias cho bảng. Nó giúp câu lệnh ngắn gọn hơn rất nhiều.\n\n---\n\n## 3. Liên Kết LEFT JOIN & RIGHT JOIN (Lấy Lệch Bảng)\n\nĐôi khi, em muốn hiển thị tất cả các dòng của một bảng bất kể nó có dữ liệu liên kết ở bảng kia hay không.\n\n### LEFT JOIN (hoặc LEFT OUTER JOIN)\nTrả về **tất cả** các dòng từ bảng bên trái (`FROM`), và các dòng khớp từ bảng bên phải (`JOIN`). Nếu không có dòng khớp ở bảng bên phải, các cột của bảng bên phải sẽ hiển thị giá trị `NULL`.\n\n```sql\n-- Hiển thị tất cả danh mục sản phẩm, kể cả những danh mục chưa có sản phẩm nào\nSELECT c.name AS ten_danh_muc, p.name AS ten_san_pham\nFROM categories c\nLEFT JOIN products p ON p.category_id = c.id;\n```\n\n### RIGHT JOIN (hoặc RIGHT OUTER JOIN)\nNgược lại với `LEFT JOIN`. Trả về tất cả các dòng từ bảng bên phải, và các dòng khớp từ bảng bên trái. (Thực tế ít dùng vì ta có thể đổi vị trí hai bảng và dùng LEFT JOIN cho dễ đọc).\n\n---\n\n## 4. FULL OUTER JOIN trong MySQL\n\n`FULL OUTER JOIN` trả về tất cả các dòng khi có sự khớp ở một trong hai bảng trái hoặc phải. \n> ⚠️ **Chú ý đặc thù MySQL:** **MySQL không hỗ trợ từ khóa FULL JOIN trực tiếp.** \nĐể thực hiện FULL OUTER JOIN trong MySQL, chúng ta phải kết hợp kết quả của `LEFT JOIN` và `RIGHT JOIN` bằng từ khóa **`UNION`**:\n\n```sql\n-- Mô phỏng FULL OUTER JOIN trong MySQL\nSELECT c.name AS ten_danh_muc, p.name AS ten_san_pham\nFROM categories c\nLEFT JOIN products p ON p.category_id = c.id\nUNION\nSELECT c.name AS ten_danh_muc, p.name AS ten_san_pham\nFROM categories c\nRIGHT JOIN products p ON p.category_id = c.id;\n```\n\n---\n\n## 5. Liên Kết Nhiều Bảng (Multiple JOINS)\n\nTrong một câu lệnh SQL, em có thể liên kết 3 bảng, 4 bảng hoặc nhiều hơn nữa. Câu lệnh sẽ chạy tuần tự từ trái qua phải.\n\nVí dụ thực tế của **RaizeShop**: Truy vấn xem khách hàng nào đã mua sản phẩm gì, số lượng bao nhiêu (liên kết 3 bảng: `orders`, `users`, `products`):\n\n```sql\nSELECT u.username AS nguoi_mua, p.name AS ten_vat_pham, o.quantity AS so_luong, o.order_date\nFROM orders o\nINNER JOIN users u ON o.user_id = u.id\nINNER JOIN products p ON o.product_id = p.id;\n```\n\n---\n\n## Tóm Tắt Bài Học\n\n```\n✅ Khóa chính (PK) định danh duy nhất một dòng; Khóa ngoại (FK) liên kết các bảng.\n✅ INNER JOIN trả về dòng khớp dữ liệu ở cả 2 bảng.\n✅ LEFT JOIN trả về mọi dòng ở bảng bên trái, điền NULL nếu bảng phải không khớp.\n✅ MySQL không hỗ trợ FULL JOIN, phải dùng LEFT JOIN UNION RIGHT JOIN.\n✅ Có thể JOIN nhiều bảng liên tục để tạo ra các báo cáo dữ liệu phức tạp.\n```\n\n---\n\n👉 **Bài Tiếp Theo:** [Bài 32: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)](../bai-32-optimization/README.md)\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 31: Liên Kết Bảng (JOINs)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống báo cáo đơn hàng và liên kết thông tin đa chiều cho dự án **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Tra Cứu Tên Danh Mục Của Sản Phẩm ⭐\n**Yêu cầu:** Viết câu lệnh SQL hiển thị tên sản phẩm (`name` từ bảng `products`, đổi alias thành `ten_san_pham`) và tên danh mục (`name` từ bảng `categories`, đổi alias thành `ten_danh_muc`) bằng cách liên kết hai bảng này bằng `INNER JOIN`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Liệt Kê Toàn Bộ Danh Mục Kèm Sản Phẩm ⭐\n**Yêu cầu:** Liệt kê toàn bộ các danh mục sản phẩm từ bảng `categories` (kể cả những danh mục chưa có sản phẩm nào) kèm theo tên các sản phẩm thuộc danh mục đó. Sử dụng `LEFT JOIN`.\n- Hiển thị cột: `ten_danh_muc` (tên danh mục) và `ten_san_pham` (tên sản phẩm).\n\n---\n\n## 🟡 Bài Tập 3: Chi Tiết Đơn Hàng Mua Sắm ⭐⭐\n**Yêu cầu:** Viết truy vấn lấy ra danh sách các đơn hàng trong bảng `orders` kèm tên người mua (`username` từ bảng `users`) và tên sản phẩm được mua (`name` từ bảng `products`).\n- Hiển thị cột: `order_id` (ID của order), `username`, và `product_name`.\n- Sử dụng `INNER JOIN`.\n\n---\n\n## 🟡 Bài Tập 4: Tính Tổng Tiền Khách Hàng Đã Mua ⭐⭐\n**Yêu cầu:** Thống kê tổng số tiền mỗi người dùng đã chi tiêu để mua hàng.\n- Gom nhóm theo `username` từ bảng `users`.\n- Tính tổng tiền dựa trên công thức: `SUM(o.quantity * p.price)`. Đặt alias là `tong_chi_tieu`.\n- Hiển thị cột: `username` và `tong_chi_tieu`.\n- Chỉ hiển thị những khách hàng đã thực hiện ít nhất 1 đơn hàng (dùng `INNER JOIN`).\n\n---\n\n## 🔴 Bài Tập 5: Thống Kê Số Lượng Bán Theo Danh Mục ⭐\n**Yêu cầu:** Tính tổng số lượng (`quantity`) sản phẩm đã bán ra cho từng danh mục sản phẩm.\n- Hiển thị cột: `category_name` (tên danh mục) và `so_luong_ban` (tổng số lượng sản phẩm bán ra của danh mục đó).\n- Sử dụng `INNER JOIN` liên kết 3 bảng: `categories`, `products`, và `orders`.\n- Gom nhóm theo tên danh mục sản phẩm.\n",
    "quizzes": [
      {
        "q": "Khóa ngoại (Foreign Key) dùng để làm gì trong RDBMS?",
        "options": [
          "Đảm bảo giá trị cột là duy nhất và không NULL",
          "Tạo liên kết logic giữa hai bảng bằng cách trỏ tới khóa chính của bảng khác",
          "Tăng tốc độ truy vấn SELECT",
          "Mã hóa mật khẩu người dùng"
        ],
        "answer": 1,
        "explanation": "Khóa ngoại tạo ràng buộc toàn vẹn tham chiếu, liên kết một cột trong bảng này tới khóa chính của bảng khác."
      },
      {
        "q": "Liên kết INNER JOIN trả về kết quả nào?",
        "options": [
          "Tất cả các dòng của cả hai bảng",
          "Chỉ các dòng thỏa mãn điều kiện khớp ở cả hai bảng liên kết",
          "Mọi dòng bảng trái và điền NULL bảng phải",
          "Mọi dòng bảng phải và điền NULL bảng trái"
        ],
        "answer": 1,
        "explanation": "`INNER JOIN` (hoặc JOIN) thực hiện phép giao, chỉ giữ lại các bản ghi có giá trị liên kết khớp ở cả hai bảng."
      },
      {
        "q": "Trong MySQL, để thực hiện tương đương FULL OUTER JOIN chúng ta phải làm thế nào?",
        "options": [
          "Sử dụng từ khóa FULL JOIN trực tiếp",
          "Sử dụng INNER JOIN với điều kiện đặc biệt",
          "Kết hợp kết quả của LEFT JOIN và RIGHT JOIN thông qua từ khóa UNION",
          "Sử dụng CROSS JOIN"
        ],
        "answer": 2,
        "explanation": "MySQL không hỗ trợ FULL JOIN. Ta phải chạy một câu lệnh LEFT JOIN, một câu lệnh RIGHT JOIN và ghép chúng lại bằng `UNION` để loại bỏ trùng lặp."
      },
      {
        "q": "LEFT JOIN trả về kết quả thế nào nếu một dòng của bảng bên trái không có dòng khớp ở bảng bên phải?",
        "options": [
          "Dòng đó bị loại bỏ khỏi kết quả",
          "Trả về dòng đó và điền NULL cho tất cả các cột của bảng bên phải",
          "Báo lỗi truy vấn",
          "Chương trình dừng chạy"
        ],
        "answer": 1,
        "explanation": "`LEFT JOIN` đảm bảo giữ lại toàn bộ các dòng của bảng bên trái. Nếu bảng phải không khớp, các cột bảng phải sẽ hiển thị NULL."
      },
      {
        "q": "Có thể liên kết bao nhiêu bảng cùng lúc bằng toán tử JOIN trong một câu lệnh SELECT?",
        "options": [
          "Tối đa 2 bảng",
          "Tối đa 3 bảng",
          "Không giới hạn số lượng bảng (phụ thuộc vào bộ nhớ của máy chủ)",
          "Tối đa 10 bảng"
        ],
        "answer": 2,
        "explanation": "Không có giới hạn cứng về số lượng bảng có thể JOIN trong một truy vấn, chỉ phụ thuộc vào tài nguyên hệ thống và tối ưu hóa tối đa của MySQL."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Liên Kết Bảng (JOINs)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 31: Liên Kết Bảng (JOINs)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống báo cáo đơn hàng và liên kết thông tin đa chiều cho dự án **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Tra Cứu Tên Danh Mục Của Sản Phẩm ⭐\n**Yêu cầu:** Viết câu lệnh SQL hiển thị tên sản phẩm (`name` từ bảng `products`, đổi alias thành `ten_san_pham`) và tên danh mục (`name` từ bảng `categories`, đổi alias thành `ten_danh_muc`) bằng cách liên kết hai bảng này bằng `INNER JOIN`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Liệt Kê Toàn Bộ Danh Mục Kèm Sản Phẩm ⭐\n**Yêu cầu:** Liệt kê toàn bộ các danh mục sản phẩm từ bảng `categories` (kể cả những danh mục chưa có sản phẩm nào) kèm theo tên các sản phẩm thuộc danh mục đó. Sử dụng `LEFT JOIN`.\n- Hiển thị cột: `ten_danh_muc` (tên danh mục) và `ten_san_pham` (tên sản phẩm).\n\n---\n\n## 🟡 Bài Tập 3: Chi Tiết Đơn Hàng Mua Sắm ⭐⭐\n**Yêu cầu:** Viết truy vấn lấy ra danh sách các đơn hàng trong bảng `orders` kèm tên người mua (`username` từ bảng `users`) và...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 37,
    "title": "MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)",
    "phase": "Phase 6: SQL Database",
    "time": "3.5 giờ",
    "difficulty": "Khó",
    "theory": "# Bài 32: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)\n\n> 🔵 **Phase 6: SQL Database – Bài 5/6** | Thời gian: ~3.5 giờ\n\n---\n\nChào em! Trong phát triển phần mềm thực tế, viết một câu lệnh SQL chạy đúng mới chỉ là điều kiện cần. Điều kiện đủ là câu lệnh đó phải **chạy nhanh**. Khi dữ liệu của ứng dụng **RaizeShop** lên tới hàng triệu sản phẩm và hàng triệu lượt mua hàng, một câu truy vấn tệ có thể làm nghẽn toàn bộ cơ sở dữ liệu, gây sập hệ thống (database bottleneck).\n\nBài học này sẽ hướng dẫn em cách sử dụng **Chỉ mục (Index)** và cách dùng lệnh **`EXPLAIN`** của MySQL để kiểm tra và tối ưu hiệu năng câu lệnh SQL lên gấp hàng trăm lần.\n\n---\n\n## 1. Chỉ Mục (Index) Trong MySQL là gì?\n\nHãy tưởng tượng một cuốn sách dày 1000 trang. Nếu em muốn tìm chương nói về \"Spring Boot\", cách ngây thơ nhất là lật từng trang một từ đầu đến cuối (trong SQL gọi là **Full Table Scan - Đọc toàn bộ bảng**). Cách này cực kỳ chậm.\nThay vào đó, em lật ra phần **Mục lục (Index)** ở cuối sách, tìm từ khóa \"Spring Boot\", xem nó nằm ở trang 724, và lật thẳng tới trang đó.\n\nTrong MySQL, **Index** là một cấu trúc dữ liệu đặc biệt (thường sử dụng mô hình **B-Tree** dưới nền tảng bộ máy InnoDB) lưu trữ giá trị của một hoặc nhiều cột để giúp tìm kiếm dòng dữ liệu tương ứng một cách nhanh chóng.\n\n### Cú pháp tạo Index trong MySQL:\n```sql\nCREATE INDEX idx_products_price ON products(price);\n```\n\n---\n\n## 2. Phân Loại Chỉ Mục Trong MySQL\n\nMySQL hỗ trợ các loại chỉ mục phổ biến sau:\n\n- **Clustered Index (Chỉ mục cụm)**: Mặc định chính là **Khóa chính (Primary Key)** của bảng. Dữ liệu thực tế của các dòng được sắp xếp vật lý trên ổ đĩa dựa theo khóa này. Mỗi bảng chỉ có duy nhất 1 Clustered Index.\n- **Secondary Index (Chỉ mục phụ)**: Được tạo ra trên các cột thường xuyên dùng để tìm kiếm (như `email`, `username`, `price`). Nó lưu giá trị cột đó và con trỏ trỏ về khóa chính tương ứng.\n- **Composite Index (Chỉ mục tổ hợp)**: Chỉ mục được tạo ra trên **nhiều cột cùng lúc**.\n  ```sql\n  CREATE INDEX idx_products_cat_price ON products(category_id, price);\n  ```\n  > [!IMPORTANT]\n  > **Quy tắc Prefix ngoài cùng bên trái (Leftmost Prefix Rule):**\n  > Composite Index trên `(category_id, price)` chỉ hỗ trợ tìm kiếm khi điều kiện lọc chứa `category_id` hoặc cả hai cột. Nếu em chỉ lọc theo `price` (không có `category_id`), MySQL sẽ không thể sử dụng index này.\n\n---\n\n## 3. Xem Kế Hoạch Thực Thi Với EXPLAIN trong MySQL\n\nĐể biết MySQL Engine sẽ chạy câu lệnh SQL của em như thế nào (có dùng index không, quét bao nhiêu dòng...), em chỉ cần thêm từ khóa **`EXPLAIN`** vào trước câu lệnh truy vấn.\n\n```sql\nEXPLAIN SELECT * FROM products WHERE price = 500000;\n```\n\nKhi chạy, MySQL sẽ trả về một bảng thông tin kế hoạch thực thi. Hãy đặc biệt chú ý đến 3 cột sau để tối ưu:\n\n1. **`type` (Kiểu quét dữ liệu)**: Đây là cột quan trọng nhất. Thứ tự hiệu năng từ tốt nhất đến tệ nhất:\n   - `const` / `system`: Quét bằng khóa chính hoặc unique index (chỉ đọc 1 dòng, cực nhanh).\n   - `eq_ref` / `ref`: Sử dụng index thông thường để so sánh (rất tốt).\n   - `range`: Quét trong một khoảng giá trị có sử dụng index (ví dụ: `price BETWEEN 100 AND 500`).\n   - `index`: Đọc toàn bộ chỉ mục (tốt hơn ALL nhưng vẫn chậm).\n   - **`ALL`**: Quét toàn bộ bảng (Full Table Scan - Tệ nhất, cần tối ưu nếu bảng lớn!).\n2. **`key`**: Tên chỉ mục thực tế mà MySQL quyết định sử dụng. Nếu cột này bị `NULL`, nghĩa là MySQL đang không dùng bất kỳ index nào cho câu truy vấn của em.\n3. **`rows`**: Số lượng dòng dự kiến mà MySQL cần đọc để tìm ra kết quả. Số dòng càng nhỏ, câu lệnh chạy càng nhanh.\n\n---\n\n## 4. 6 Quy Tắc Vàng Tối Ưu Hóa Truy Vấn (Query Optimization Rules)\n\nKhi viết code SQL hoặc viết các câu lệnh trong file XML Mapper của MyBatis / Repository JPA trong Spring Boot, em hãy tuân thủ các quy tắc sau:\n\n### Quy tắc 1: Tuyệt đối tránh SELECT *\nChỉ lấy các cột thực sự hiển thị. Việc lấy thừa cột làm tốn bộ nhớ đệm Buffer Pool của MySQL và tăng tải băng thông mạng.\n\n### Quy tắc 2: Không thực hiện phép tính/hàm trên cột có chỉ mục\nNếu cột `created_date` đã có index, viết như sau sẽ **vô hiệu hóa index**:\n```sql\n-- ❌ Tệ: MySQL phải tính toán hàm YEAR cho từng dòng trong bảng, không dùng được index!\nSELECT * FROM orders WHERE YEAR(created_date) = 2026;\n\n-- ✅ Tốt: MySQL so sánh trực tiếp khoảng giá trị và sử dụng index nhanh chóng\nSELECT * FROM orders WHERE created_date BETWEEN '2026-01-01' AND '2026-12-31';\n```\n\n### Quy tắc 3: Tránh tìm kiếm ký tự đại diện ở đầu chuỗi (Leading Wildcard)\n```sql\n-- ❌ Tệ: Không dùng được index (quét toàn bộ bảng)\nSELECT * FROM products WHERE name LIKE '%Kiếm%';\n\n-- ✅ Tốt: Sử dụng được index (quét theo khoảng index)\nSELECT * FROM products WHERE name LIKE 'Kiếm%';\n```\n\n### Quy tắc 4: Chỉ mục hóa các cột dùng trong JOIN và WHERE\nMọi khóa ngoại (Foreign Key) và các trường lọc thường xuyên (`status`, `email`, `created_at`) nên được tạo chỉ mục để cải thiện tốc độ JOIN.\n\n### Quy tắc 5: Tránh sử dụng OR quá nhiều\nToán tử `OR` thường làm MySQL từ chối sử dụng index và chuyển sang quét toàn bộ bảng. Nên cân nhắc tách thành 2 câu lệnh và kết hợp bằng `UNION` hoặc dùng `IN`.\n\n### Quy tắc 6: Sử dụng LIMIT khi chỉ muốn kiểm tra sự tồn tại\nNếu em chỉ muốn kiểm tra xem có đơn hàng nào không, hãy thêm `LIMIT 1`. MySQL sẽ dừng quét ngay khi tìm thấy dòng đầu tiên thay vì quét hết bảng.\n\n---\n\n## 5. Kiến Thức Chuyên Sâu Cần Biết Khi Thiết Kế MySQL\n\n### 5.1 Chọn Kiểu Dữ Liệu: DECIMAL vs FLOAT/DOUBLE\nTrong các hệ thống thanh toán và e-commerce như **RaizeShop**, việc lưu trữ giá tiền sản phẩm hoặc số dư tài khoản bằng kiểu `FLOAT` hoặc `DOUBLE` là một lỗi thiết kế sơ đẳng nhưng nguy hiểm. \n* Kiểu `FLOAT` và `DOUBLE` lưu số thực dưới dạng **dấu phẩy động (floating-point)** theo chuẩn IEEE 754. Hệ nhị phân không thể biểu diễn chính xác tuyệt đối một số số thập phân hệ thập phân (ví dụ `0.1 + 0.2` sẽ bằng `0.30000000000000004`). Sau hàng triệu giao dịch, sai số làm tròn này sẽ gây lệch sổ sách tài chính.\n* Kiểu **`DECIMAL(p, s)`** (hoặc `NUMERIC`) lưu số thập phân dưới dạng chuỗi nhị phân chính xác tuyệt đối (**fixed-point**). Trong đó `p` là tổng số chữ số (precision), và `s` là số chữ số sau dấu phẩy (scale).\n  * Ví dụ: `price DECIMAL(12, 2)` hỗ trợ lưu giá trị tối đa `9,999,999,999.99` mà không bị bất kỳ sai số làm tròn nào.\n\n### 5.2 Độ Đa Dạng Chỉ Mục (Index Cardinality)\nKhông phải cứ tạo Index cho cột nào là MySQL sẽ dùng Index đó. **Cardinality** là số lượng giá trị duy nhất (độ đa dạng) của một cột.\n* **Cột có Cardinality Cao**: Cột chứa giá trị ít trùng lặp (ví dụ `email`, `username`, `phone_number`). Tạo index trên đây cực kỳ hiệu quả vì MySQL lọc được ngay dòng cần tìm.\n* **Cột có Cardinality Thấp**: Cột chứa giá trị trùng lặp rất nhiều (ví dụ `gender` chỉ có Nam/Nữ, `status` chỉ có Đang hoạt động/Bị khóa). Lọc theo các cột này thường trả về 30% đến 50% số dòng của bảng.\n  * MySQL Optimizer tính toán rằng việc đọc chỉ mục phụ rồi quay lại đọc dữ liệu ở Clustered Index (Bookmark Lookup) tốn tài nguyên hơn là đọc thẳng từ đầu đến cuối bảng. Do đó, **MySQL sẽ bỏ qua Index** và chạy **Full Table Scan (ALL)**. Hãy tránh tạo chỉ mục đơn lẻ cho các cột có độ đa dạng thấp!\n\n---\n\n## Tóm Tắt Bài Học\n\n```\n✅ Index hoạt động như mục lục cuốn sách, giúp tăng tốc độ tìm kiếm dòng.\n✅ Bảng chỉ có duy nhất 1 Clustered Index (Primary Key); có thể tạo nhiều Secondary Index.\n✅ Dùng EXPLAIN trước câu lệnh SELECT để xem MySQL có dùng index (cột key) và kiểu quét (cột type).\n✅ Tránh quét toàn bộ bảng (type = ALL) bằng cách tạo index trên cột lọc WHERE và cột liên kết JOIN.\n✅ Tránh viết các hàm biến đổi (YEAR, LOWER, CONCAT) lên cột có index trong mệnh đề WHERE.\n✅ Sử dụng kiểu DECIMAL cho giá tiền/tài chính để tránh sai số dấu phẩy động của FLOAT/DOUBLE.\n✅ Không tạo chỉ mục phụ cho các cột có độ đa dạng giá trị thấp (Cardinality thấp) như giới tính, trạng thái.\n```\n\n---\n\n👉 **Bài Tiếp Theo:** [Bài 33: Truy Vấn Con (Subqueries) & Thay Đổi Dữ Liệu](../bai-33-subquery-write/README.md)\n\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 32: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)\n\n> 🎯 **Bối cảnh dự án:** Tối ưu hóa các câu truy vấn chậm và thiết lập chỉ mục để nâng cấp tốc độ tải trang cho ứng dụng **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Phân Tích Kế Hoạch Truy Vấn Bằng EXPLAIN ⭐\n**Yêu cầu:** Viết câu lệnh `EXPLAIN` cho câu truy vấn lấy toàn bộ cột của sản phẩm có giá chính xác bằng `1,500,000`đ.\n- Phân tích xem hệ thống có sử dụng chỉ mục (`key`) nào không và kiểu quét (`type`) là gì.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Thiết Lập Chỉ Mục Cho Giá Sản Phẩm ⭐\n**Yêu cầu:** Tạo một chỉ mục (index) có tên là `idx_products_price` trên cột `price` của bảng `products` để tăng tốc độ lọc tìm kiếm sản phẩm theo giá.\n\n---\n\n## 🟡 Bài Tập 3: Tối Ưu Tìm Kiếm Không Sử Dụng Hàm ⭐⭐\n**Yêu cầu:** Cho câu lệnh truy vấn bị chậm sau (vô hiệu hóa chỉ mục):\n```sql\nSELECT * FROM orders WHERE SUBSTR(order_date, 1, 10) = '2026-06-15';\n```\nHãy viết lại câu truy vấn trên một cách tối ưu nhất (sử dụng so sánh khoảng giá trị trực tiếp hoặc toán tử `LIKE` bắt đầu để tận dụng chỉ mục trên cột `order_date`).\n\n---\n\n## 🟡 Bài Tập 4: Tạo Chỉ Mục Tổ Hợp (Composite Index) ⭐⭐\n**Yêu cầu:** Tạo một Composite Index tên là `idx_prod_cat_price` bao gồm hai cột: `category_id` và `price` trên bảng `products`.\n- Viết câu truy vấn SELECT tận dụng tối đa chỉ mục tổ hợp này để lọc sản phẩm thuộc `category_id = 1` và có giá lớn hơn `500,000`đ.\n\n---\n\n## 🔴 Bài Tập 5: Tối Ưu Sử Dụng EXISTS Thay Cho IN ⭐\n**Yêu cầu:** Cho câu truy vấn lấy thông tin người dùng đã từng mua hàng sử dụng toán tử `IN` (hiệu năng trung bình):\n```sql\nSELECT * FROM users WHERE id IN (SELECT DISTINCT user_id FROM orders);\n```\nHãy viết lại câu lệnh trên sử dụng toán tử liên kết liên quan `EXISTS` để tối ưu hóa quá trình duyệt tìm kiếm trong MySQL.\n- Sử dụng cú pháp `WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id)`.\n",
    "quizzes": [
      {
        "q": "Chỉ mục (Index) trong MySQL hoạt động dựa trên cấu trúc dữ liệu nào mặc định trong bộ máy InnoDB?",
        "options": [
          "Hash Table",
          "B-Tree",
          "Binary Search Tree",
          "Linked List"
        ],
        "answer": 1,
        "explanation": "Bộ máy InnoDB mặc định sử dụng chỉ mục dạng **B-Tree** (chính xác hơn là B+Tree) để lưu trữ giá trị, tối ưu hóa các phép tìm kiếm chính xác và theo khoảng."
      },
      {
        "q": "Một bảng trong MySQL có thể chứa tối đa bao nhiêu Clustered Index (chỉ mục cụm)?",
        "options": [
          "Không giới hạn",
          "Tối đa 2 chỉ mục",
          "Duy nhất 1 chỉ mục (thường là Khóa chính)",
          "Tối đa 5 chỉ mục"
        ],
        "answer": 2,
        "explanation": "Clustered Index sắp xếp vật lý dữ liệu trên ổ đĩa nên mỗi bảng chỉ có duy nhất 1 Clustered Index (Primary Key)."
      },
      {
        "q": "Khi sử dụng EXPLAIN, giá trị nào ở cột 'type' cảnh báo hiệu năng kém nhất cần được tối ưu?",
        "options": [
          "ref",
          "range",
          "index",
          "ALL"
        ],
        "answer": 3,
        "explanation": "`type = ALL` nghĩa là Full Table Scan (quét toàn bộ bảng từ đầu đến cuối), rất chậm khi bảng có lượng dữ liệu lớn."
      },
      {
        "q": "Tại sao không nên sử dụng hàm tính toán (ví dụ: YEAR(col)) trên cột có Index ở mệnh đề WHERE?",
        "options": [
          "Nó làm lỗi cú pháp SQL",
          "Nó vô hiệu hóa chỉ mục và ép MySQL phải thực hiện quét toàn bộ bảng (Full Table Scan)",
          "Nó làm tăng kích thước ổ đĩa của database",
          "MySQL tự động làm tròn số"
        ],
        "answer": 1,
        "explanation": "Khi bọc hàm quanh cột index, MySQL phải chạy hàm đó trên từng dòng để so sánh, làm mất tác dụng tìm kiếm nhanh của B-Tree index."
      },
      {
        "q": "Quy tắc 'Leftmost Prefix' của Composite Index trên (col1, col2) có ý nghĩa gì?",
        "options": [
          "Chỉ mục chỉ hoạt động nếu ta lọc theo cột col2",
          "Chỉ mục chỉ hoạt động nếu ta lọc theo col1 hoặc cả col1 và col2",
          "Chỉ mục luôn hoạt động trong mọi trường hợp",
          "Cột col1 phải nằm bên trái cột col2 trong bảng"
        ],
        "answer": 1,
        "explanation": "Composite Index yêu cầu điều kiện lọc phải đi từ trái qua phải của khai báo chỉ mục. Lọc theo col2 mà không lọc theo col1 sẽ không kích hoạt được index."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 32: MySQL Advanced: Chỉ Mục (Index) & Tối Ưu Truy Vấn (Query Optimization)\n\n> 🎯 **Bối cảnh dự án:** Tối ưu hóa các câu truy vấn chậm và thiết lập chỉ mục để nâng cấp tốc độ tải trang cho ứng dụng **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Phân Tích Kế Hoạch Truy Vấn Bằng EXPLAIN ⭐\n**Yêu cầu:** Viết câu lệnh `EXPLAIN` cho câu truy vấn lấy toàn bộ cột của sản phẩm có giá chính xác bằng `1,500,000`đ.\n- Phân tích xem hệ thống có sử dụng chỉ mục (`key`) nào không và kiểu quét (`type`) là gì.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Thiết Lập Chỉ Mục Cho Giá Sản Phẩm ⭐\n**Yêu cầu:** Tạo một chỉ mục (index) có tên là `idx_products_price` trên cột `price` của bảng `products` để tăng tốc độ lọc tìm kiếm sản phẩm theo giá.\n\n---\n\n## 🟡 Bài Tập 3: Tối Ưu Tìm Kiếm Không Sử Dụng Hàm ⭐⭐\n**Yêu cầu:** Cho câu lệnh truy vấn bị chậm sau (vô hiệu hóa chỉ mục):\n```sql\nSELECT * FROM orders WHERE SUBSTR(order_date, 1, 10) = '2026-06-15';\n```\nHãy viết lại câu truy vấn trên một cá...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  },
  {
    "id": 38,
    "title": "Truy Vấn Con & Ghi Dữ Liệu (INSERT, UPDATE, DELETE & Subqueries)",
    "phase": "Phase 6: SQL Database",
    "time": "3 giờ",
    "difficulty": "Khó",
    "theory": "# Bài 33: Truy Vấn Con & Ghi Dữ Liệu (INSERT, UPDATE, DELETE & Subqueries)\n\n> 🔵 **Phase 6: SQL Database – Bài 6/6** | Thời gian: ~3 giờ\n\n---\n\nChào em! Trong các bài học trước, chúng ta chỉ tập trung vào việc đọc dữ liệu ra (DQL - Data Query Language). Tuy nhiên, một ứng dụng e-commerce như **RaizeShop** cần phải tạo mới tài khoản người dùng, cập nhật số lượng tồn kho sản phẩm sau khi bán, hoặc hủy đơn hàng lỗi.\n\nBài học cuối cùng này sẽ hướng dẫn em cách viết các câu lệnh ghi/sửa dữ liệu và cách sử dụng **Truy vấn con (Subquery)** cũng như hiểu được tầm quan trọng của **Giao dịch (Transaction)** trong an toàn dữ liệu.\n\n---\n\n## 1. Truy Vấn Con (Subqueries)\n\n**Subquery** là một câu lệnh `SELECT` lồng bên trong một câu lệnh SQL khác (có thể nằm trong `SELECT`, `FROM`, `WHERE` hoặc `HAVING`).\n\n### Subquery trả về giá trị đơn lẻ (Scalar Subquery)\nTìm các sản phẩm có giá lớn hơn giá trung bình của toàn bộ cửa hàng:\n```sql\nSELECT name, price \nFROM products \nWHERE price > (SELECT AVG(price) FROM products);\n```\n\n### Subquery với toán tử IN / EXISTS\nTìm tất cả khách hàng đã từng thực hiện ít nhất một đơn hàng:\n```sql\n-- Dùng IN\nSELECT * FROM users WHERE id IN (SELECT user_id FROM orders);\n\n-- Dùng EXISTS (Thường có hiệu năng tốt hơn vì dừng quét ngay khi tìm thấy dòng khớp)\nSELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);\n```\n\n---\n\n## 2. Thêm Dữ Liệu Mới Với INSERT INTO\n\nĐể thêm các dòng dữ liệu mới vào một bảng, em sử dụng lệnh `INSERT INTO`.\n\n### Thêm một dòng đầy đủ các cột:\n```sql\nINSERT INTO categories (id, name) VALUES (5, 'Thời trang game');\n```\n\n### Thêm nhiều dòng cùng lúc để tối ưu hiệu năng:\n```sql\nINSERT INTO categories (id, name) VALUES \n(6, 'Gói tài nguyên'),\n(7, 'Thẻ giảm giá');\n```\n> [!TIP]\n> **Tối ưu ghi dữ liệu (Batch Insert):**\n> Gộp nhiều dòng vào một câu lệnh `INSERT` duy nhất giúp giảm thiểu số lượng gói tin truyền tải trên mạng và giảm số lần commit vật lý trên ổ cứng của database server, giúp tốc độ ghi nhanh hơn gấp hàng chục lần so với viết nhiều câu lệnh INSERT đơn lẻ.\n\n---\n\n## 3. Cập Nhật Dữ Liệu Với UPDATE\n\nMệnh đề `UPDATE` dùng để thay đổi các giá trị hiện có trong bảng.\n\n```sql\nUPDATE products \nSET price = 1350000.0, stock = 10 \nWHERE id = 1;\n```\n\n> [!CAUTION]\n> **CẢNH BÁO NGUY HIỂM:** Luôn luôn sử dụng mệnh đề `WHERE` khi chạy lệnh `UPDATE`. Nếu em quên `WHERE`, toàn bộ các dòng trong bảng sẽ bị ghi đè giá trị mới!\n\n---\n\n## 4. Xóa Dữ Liệu Với DELETE\n\nMệnh đề `DELETE` dùng để xóa các dòng hiện có ra khỏi bảng.\n\n```sql\nDELETE FROM products WHERE id = 8;\n```\n\n> [!CAUTION]\n> **CẢNH BÁO NGUY HIỂM:** Giống như `UPDATE`, luôn luôn phải có mệnh đề `WHERE` khi thực hiện `DELETE` để tránh việc vô tình xóa sạch toàn bộ dữ liệu trong bảng của dự án.\n> Nếu muốn xóa sạch bảng nhanh chóng không cần phục hồi (không ghi log rollback), ta dùng lệnh `TRUNCATE TABLE table_name;` (nhanh hơn nhiều so với `DELETE FROM` không có WHERE).\n\n---\n\n## 5. Giao Dịch Trong Cơ Sở Dữ Liệu (Transactions: COMMIT & ROLLBACK)\n\nHãy tưởng tượng bối cảnh chuyển tiền tại **RaizeShop**:\n1. Trừ 100,000đ trong ví người dùng A (`UPDATE users SET balance = balance - 100000 WHERE id = 1;`).\n2. Cộng 100,000đ vào ví người bán B (`UPDATE users SET balance = balance + 100000 WHERE id = 2;`).\n\nĐiều gì xảy ra nếu bước 1 thành công, nhưng trước khi chạy bước 2 thì server bị mất điện đột ngột? Tiền của người dùng A bị mất vô lý còn người B thì không nhận được gì!\n\nĐể giải quyết vấn đề này, cơ sở dữ liệu quan hệ cung cấp tính năng **Transaction (Giao dịch)** tuân thủ nguyên tắc ACID, đảm bảo rằng cả hai lệnh trên phải **cùng thành công** hoặc **cùng thất bại (không có trạng thái dở dang)**.\n\n- **`START TRANSACTION`** (hoặc `BEGIN TRANSACTION`): Bắt đầu một giao dịch cô lập. Các thay đổi tạm thời chỉ lưu trong bộ nhớ đệm của transaction đó, người dùng khác chưa nhìn thấy.\n- **`COMMIT`**: Xác nhận hoàn thành giao dịch. Tất cả các lệnh ghi dữ liệu trong transaction sẽ được ghi vĩnh viễn vào ổ đĩa.\n- **`ROLLBACK`**: Hủy bỏ giao dịch. Khôi phục lại trạng thái dữ liệu nguyên vẹn như trước khi bắt đầu transaction, loại bỏ hoàn toàn các thay đổi tạm thời nếu có bất kỳ lỗi nào xảy ra ở các bước trung gian.\n\n---\n\n---\n\n## 6. Kiến Thức Nâng Cao: Thiết Kế Hệ Thống Trong MySQL\n\n### 6.1 So Sánh Storage Engine: InnoDB vs MyISAM\nMySQL hỗ trợ nhiều bộ máy lưu trữ (Storage Engine) khác nhau cho từng bảng. Hai bộ máy phổ biến nhất là **InnoDB** (mặc định từ MySQL 5.5) và **MyISAM**:\n\n| Đặc tính | InnoDB | MyISAM |\n| :--- | :--- | :--- |\n| **Transaction (Giao dịch)** | **Có** (Hỗ trợ ACID, COMMIT/ROLLBACK) | **Không** (Ghi trực tiếp, không thể khôi phục) |\n| **Foreign Key (Khóa ngoại)** | **Có** (Đảm bảo ràng buộc toàn vẹn dữ liệu) | **Không** (Bỏ qua kiểm tra khóa ngoại) |\n| **Cơ chế khóa (Locking)** | **Khóa cấp dòng (Row-level lock)** - Tối ưu ghi đồng thời cao | **Khóa cấp bảng (Table-level lock)** - Gây nghẽn khi ghi nhiều |\n| **Khôi phục lỗi (Crash Recovery)**| Tự động phục hồi qua Redo Log | Dễ bị hỏng chỉ mục/dữ liệu khi sập nguồn |\n\n> [!IMPORTANT]\n> Hầu hết ứng dụng Java thực tế đều sử dụng **InnoDB** để bảo vệ dữ liệu giao dịch và hỗ trợ đa luồng ghi tốt hơn.\n\n### 6.2 Các Cấp Độ Cô Lập Giao Dịch (Transaction Isolation Levels)\nKhi nhiều giao dịch chạy đồng thời (concurrency), các xung đột dữ liệu có thể xảy ra. SQL định nghĩa 4 cấp độ cô lập nhằm cân bằng giữa **tính an toàn dữ liệu** và **hiệu năng hệ thống**:\n\n1. **READ UNCOMMITTED (Đọc dữ liệu chưa commit)**:\n   * Cho phép đọc dữ liệu đang thay đổi tạm thời của transaction khác dù chưa commit.\n   * Gây ra lỗi **Dirty Read (Đọc bẩn)**: Đọc phải dữ liệu ảo mà sau đó bị rollback.\n2. **READ COMMITTED (Đọc dữ liệu đã commit)**:\n   * Chỉ đọc các dữ liệu đã được commit vĩnh viễn. Tránh được lỗi Dirty Read.\n   * Gây ra lỗi **Non-repeatable Read (Đọc không lặp lại)**: Trong cùng một transaction, đọc dòng dữ liệu lần 1 ra giá trị A, lần 2 ra giá trị B vì transaction khác vừa UPDATE và COMMIT dòng đó ở giữa hai lần đọc.\n3. **REPEATABLE READ (Đọc lặp lại được - Mặc định của MySQL InnoDB)**:\n   * Đảm bảo mọi lần đọc một dòng dữ liệu trong cùng một transaction đều ra kết quả giống hệt nhau. Tránh được Non-repeatable Read.\n   * Có thể gây ra lỗi **Phantom Read (Đọc bóng ma)**: Khi chạy lệnh lọc tập hợp dòng (ví dụ đếm số lượng), lần 1 đếm ra 10 dòng, lần 2 đếm ra 11 dòng vì transaction khác vừa INSERT và COMMIT một dòng mới thỏa mãn điều kiện lọc.\n4. **SERIALIZABLE (Tuần tự hóa)**:\n   * Cấp độ an toàn tuyệt đối cao nhất. Khóa toàn bộ các dòng được truy vấn, ép các transaction khác phải xếp hàng chờ đợi chạy tuần tự.\n   * Tránh được toàn bộ các lỗi trên, nhưng làm giảm hiệu năng hệ thống nghiêm trọng (dễ gây Deadlock).\n\n---\n\n## Tóm Tắt Bài Học\n\n```\n✅ Subquery là câu truy vấn SELECT lồng trong một câu lệnh SQL khác.\n✅ Lệnh INSERT INTO dùng để tạo mới bản ghi (dòng dữ liệu) vào bảng.\n✅ Lệnh UPDATE thay đổi dữ liệu hiện có; Lệnh DELETE xóa bớt bản ghi khỏi bảng.\n✅ Luôn dùng WHERE khi UPDATE hoặc DELETE để tránh hủy hoại toàn bộ bảng dữ liệu.\n✅ Transaction gom nhóm nhiều lệnh ghi dữ liệu nhằm đảm bảo tính toàn vẹn (tất cả hoặc không gì cả).\n✅ COMMIT để lưu vĩnh viễn thay đổi; ROLLBACK để khôi phục lại trạng thái cũ khi gặp lỗi.\n✅ InnoDB là Storage Engine mặc định của MySQL hỗ trợ Khóa ngoại và Giao dịch ACID.\n✅ Có 4 cấp độ cô lập Transaction: Read Uncommitted, Read Committed, Repeatable Read (mặc định), và Serializable.\n```\n\n---\n\nChúc mừng em đã hoàn thành khóa học SQL Database của RaizeStudy! Giờ đây em đã có đủ kiến thức nền tảng vững chắc để xây dựng các ứng dụng Java kết nối cơ sở dữ liệu thực tế bằng Spring Boot và MySQL.\n\n",
    "exercisesMarkdown": "# 📝 Bài Tập Thực Tế – Bài 33: Truy Vấn Con & Ghi Dữ Liệu (INSERT, UPDATE, DELETE & Subqueries)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng các chức năng ghi nhận giao dịch, cập nhật số dư ví và cấu trúc lại dữ liệu cho ứng dụng **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Tìm Sản Phẩm Giá Trên Trung Bình ⭐\n**Yêu cầu:** Viết câu truy vấn SELECT lấy ra tên sản phẩm (`name`) và giá (`price`) của các sản phẩm có giá cao hơn mức giá trung bình (`AVG`) của tất cả sản phẩm trong bảng `products`.\n- Sử dụng truy vấn con (subquery) trong mệnh đề `WHERE`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Thêm Sản Phẩm Mới ⭐\n**Yêu cầu:** Viết câu lệnh `INSERT INTO` để thêm một sản phẩm mới vào bảng `products`:\n- Tên sản phẩm: `\"Kiếm Ánh Sáng v2\"`\n- Giá: `1800000.0`\n- Tồn kho: `10`\n- ID danh mục: `1`\n- Đánh giá: `5.0`\n\n---\n\n## 🟡 Bài Tập 3: Cập Nhật Số Dư Tài Khoản Khách Hàng ⭐⭐\n**Yêu cầu:** Sau khi khách hàng nạp thẻ thành công, hãy viết câu lệnh `UPDATE` để cộng thêm `500,000`đ vào số dư (`balance`) của người dùng có tên đăng nhập (`username`) là `\"gameraise\"`.\n\n---\n\n## 🟡 Bài Tập 4: Xóa Tài Khoản Chưa Từng Mua Hàng ⭐⭐\n**Yêu cầu:** Viết câu lệnh `DELETE` để xóa toàn bộ những người dùng ra khỏi bảng `users` mà **chưa từng thực hiện bất kỳ đơn hàng nào** trong bảng `orders`.\n- Sử dụng mệnh đề `NOT IN` kết hợp với truy vấn con lấy toàn bộ danh sách `user_id` từ bảng `orders`.\n\n---\n\n## 🔴 Bài Tập 5: Thống Kê Người Dùng Có Số Dư Lớn Nhất ⭐\n**Yêu cầu:** Sử dụng truy vấn con để lấy ra `username` và `balance` của người dùng đang sở hữu số dư ví cao nhất trong bảng `users`.\n- Gợi ý: `WHERE balance = (SELECT MAX(balance) FROM users)`.\n",
    "quizzes": [
      {
        "q": "Lệnh nào trong SQL dùng để thêm mới dòng dữ liệu vào bảng?",
        "options": [
          "INSERT INTO",
          "ADD RECORD",
          "UPDATE",
          "CREATE ROW"
        ],
        "answer": 0,
        "explanation": "`INSERT INTO table_name (cols) VALUES (vals)` dùng để chèn bản ghi mới."
      },
      {
        "q": "Điều gì nguy hiểm nhất khi chạy lệnh UPDATE hoặc DELETE?",
        "options": [
          "Lệnh chạy chậm",
          "Không chỉ định mệnh đề WHERE khiến toàn bộ bảng bị ghi đè hoặc xóa sạch dữ liệu",
          "Lỗi tràn bộ nhớ cache",
          "Làm thay đổi cấu trúc bảng"
        ],
        "answer": 1,
        "explanation": "Nếu không có `WHERE`, lệnh `UPDATE/DELETE` sẽ áp dụng lên tất cả các dòng của bảng, hủy hoại dữ liệu hệ thống."
      },
      {
        "q": "Để tối ưu hiệu năng ghi khi cần chèn 1000 dòng dữ liệu mới, cách nào tốt nhất?",
        "options": [
          "Chạy vòng lặp 1000 câu lệnh INSERT đơn lẻ trong Java",
          "Sử dụng Bulk Insert (1 câu lệnh INSERT chứa nhiều bộ VALUES phân cách bằng dấu phẩy)",
          "Chạy lệnh INSERT và khởi động lại database",
          "Không có cách nào khác nhau"
        ],
        "answer": 1,
        "explanation": "Bulk Insert giảm thiểu số gói tin truyền tải trên mạng và giảm thiểu số lần commit I/O vật lý xuống ổ đĩa, nhanh hơn gấp hàng chục lần."
      },
      {
        "q": "Tính năng Transaction trong database đảm bảo an toàn dữ liệu theo nguyên tắc nào?",
        "options": [
          "Nguyên tắc REST",
          "Nguyên tắc ACID (Atomicity, Consistency, Isolation, Durability)",
          "Nguyên tắc SOLID",
          "Nguyên tắc DRY"
        ],
        "answer": 1,
        "explanation": "Transactions đảm bảo an toàn dữ liệu theo các thuộc tính ACID: Nguyên tố, Nhất quán, Cô lập, Bền vững."
      },
      {
        "q": "Trong một Transaction, lệnh ROLLBACK thực hiện điều gì?",
        "options": [
          "Xác nhận lưu vĩnh viễn các thay đổi dữ liệu",
          "Hủy bỏ tất cả các thay đổi tạm thời trong transaction hiện tại, khôi phục dữ liệu về trạng thái ban đầu",
          "Khởi động lại database server",
          "Sao lưu dữ liệu ra file SQL"
        ],
        "answer": 1,
        "explanation": "`ROLLBACK` hủy bỏ tất cả thay đổi tạm thời chưa commit, đưa cơ sở dữ liệu về trạng thái an toàn trước khi transaction bắt đầu."
      }
    ],
    "practice": {
      "fileName": "Main.java",
      "instructions": "### Thực Hành Bài: Truy Vấn Con & Ghi Dữ Liệu (INSERT, UPDATE, DELETE & Subqueries)\nĐọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.\nViết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.\n\n# 📝 Bài Tập Thực Tế – Bài 33: Truy Vấn Con & Ghi Dữ Liệu (INSERT, UPDATE, DELETE & Subqueries)\n\n> 🎯 **Bối cảnh dự án:** Xây dựng các chức năng ghi nhận giao dịch, cập nhật số dư ví và cấu trúc lại dữ liệu cho ứng dụng **RaizeShop**.\n\n---\n\n## 🔴 Bài Tập 1: Tìm Sản Phẩm Giá Trên Trung Bình ⭐\n**Yêu cầu:** Viết câu truy vấn SELECT lấy ra tên sản phẩm (`name`) và giá (`price`) của các sản phẩm có giá cao hơn mức giá trung bình (`AVG`) của tất cả sản phẩm trong bảng `products`.\n- Sử dụng truy vấn con (subquery) trong mệnh đề `WHERE`.\n**File lưu:** `query.sql`\n\n---\n\n## 🔴 Bài Tập 2: Thêm Sản Phẩm Mới ⭐\n**Yêu cầu:** Viết câu lệnh `INSERT INTO` để thêm một sản phẩm mới vào bảng `products`:\n- Tên sản phẩm: `\"Kiếm Ánh Sáng v2\"`\n- Giá: `1800000.0`\n- Tồn kho: `10`\n- ID danh mục: `1`\n- Đánh giá: `5.0`\n\n---\n\n## 🟡 Bài Tập 3: Cập Nhật Số Dư Tài Khoản Khách Hàng ⭐⭐\n**Yêu cầu:** Sau khi khách hàng nạp thẻ thành công, hãy viết câu lệnh `UPDATE` để cộng thêm `500,000`đ vào số dư (`balance`) của người dù...\n",
      "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Viết code của em ở đây\n        System.out.println(\"Xin chào Java!\");\n    }\n}",
      "validateStr": "(code, output) => {\r\n      return { pass: true, msg: \"Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!\" };\r\n    }"
    }
  }
];

if (typeof module !== 'undefined') {
  module.exports = lessonsData;
}
