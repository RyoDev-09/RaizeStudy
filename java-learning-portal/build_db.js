const fs = require('fs');
const path = require('path');

// Đường dẫn gốc của workspace
const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(__dirname, 'lessonsData.js');

// Định nghĩa 27 bài học theo thứ tự chuẩn hóa
const lessonConfigs = [
  { id: 1, dir: 'phase1-fundamentals/bai-01-gioi-thieu-java', title: 'Giới Thiệu Java & Cài Đặt', phase: 'Phase 1: Fundamentals', time: '2 giờ', difficulty: 'Dễ' },
  { id: 2, dir: 'phase1-fundamentals/bai-02-bien-kieu-du-lieu', title: 'Biến & Kiểu Dữ Liệu', phase: 'Phase 1: Fundamentals', time: '3 giờ', difficulty: 'Dễ' },
  { id: 3, dir: 'phase1-fundamentals/bai-03-dieu-kien', title: 'Câu Lệnh Điều Kiện', phase: 'Phase 1: Fundamentals', time: '3 giờ', difficulty: 'Dễ' },
  { id: 4, dir: 'phase1-fundamentals/bai-04-vong-lap', title: 'Vòng Lặp (Loops)', phase: 'Phase 1: Fundamentals', time: '3 giờ', difficulty: 'Trung bình' },
  { id: 5, dir: 'phase1-fundamentals/bai-05-array-string', title: 'Mảng & Chuỗi (Array & String)', phase: 'Phase 1: Fundamentals', time: '4 giờ', difficulty: 'Trung bình' },
  { id: 6, dir: 'phase1-fundamentals/bai-06-method', title: 'Phương Thức (Method)', phase: 'Phase 1: Fundamentals', time: '3 giờ', difficulty: 'Trung bình' },
  { id: 7, dir: 'phase2-oop/bai-07-class-object', title: 'Lớp & Đối Tượng (Class & Object)', phase: 'Phase 2: Hướng Đối Tượng', time: '3 giờ', difficulty: 'Trung bình' },
  { id: 8, dir: 'phase2-oop/bai-08-constructor-this-static', title: 'Constructor, static & this', phase: 'Phase 2: Hướng Đối Tượng', time: '3 giờ', difficulty: 'Trung bình' },
  { id: 9, dir: 'phase2-oop/bai-09-encapsulation', title: 'Tính Đóng Gói (Encapsulation)', phase: 'Phase 2: Hướng Đối Tượng', time: '3 giờ', difficulty: 'Trung bình' },
  { id: 10, dir: 'phase2-oop/bai-10-inheritance', title: 'Tính Kế Thừa (Inheritance)', phase: 'Phase 2: Hướng Đối Tượng', time: '4 giờ', difficulty: 'Trung bình' },
  { id: 11, dir: 'phase2-oop/bai-11-polymorphism', title: 'Tính Đa Hình (Polymorphism)', phase: 'Phase 2: Hướng Đối Tượng', time: '4 giờ', difficulty: 'Khó' },
  { id: 12, dir: 'phase2-oop/bai-12-abstraction', title: 'Tính Trừu Tượng (Abstraction)', phase: 'Phase 2: Hướng Đối Tượng', time: '4 giờ', difficulty: 'Khó' },
  { id: 13, dir: 'phase3-intermediate/bai-13-collections', title: 'Collections Framework', phase: 'Phase 3: Java Intermediate', time: '5 giờ', difficulty: 'Khó' },
  { id: 14, dir: 'phase3-intermediate/bai-14-exception-handling', title: 'Xử Lý Ngoại Lệ (Exceptions)', phase: 'Phase 3: Java Intermediate', time: '3 giờ', difficulty: 'Trung bình' },
  { id: 15, dir: 'phase3-intermediate/bai-15-file-io', title: 'File I/O & NIO2', phase: 'Phase 3: Java Intermediate', time: '4 giờ', difficulty: 'Khó' },
  { id: 16, dir: 'phase3-intermediate/bai-16-generics', title: 'Java Generics', phase: 'Phase 3: Java Intermediate', time: '4 giờ', difficulty: 'Khó' },
  { id: 17, dir: 'phase3-intermediate/bai-17-lambda-functional', title: 'Lambda & Functional Interface', phase: 'Phase 3: Java Intermediate', time: '4 giờ', difficulty: 'Khó' },
  { id: 18, dir: 'phase3-intermediate/bai-18-stream-api', title: 'Stream API & Optional', phase: 'Phase 3: Java Intermediate', time: '5 giờ', difficulty: 'Khó' },
  { id: 19, dir: 'phase4-advanced/bai-19-multithreading', title: 'Đa Luồng (Multithreading)', phase: 'Phase 4: Java Advanced', time: '5 giờ', difficulty: 'Rất Khó' },
  { id: 20, dir: 'phase4-advanced/bai-20-design-patterns', title: 'Design Patterns trong Java', phase: 'Phase 4: Java Advanced', time: '6 giờ', difficulty: 'Khó' },
  { id: 21, dir: 'phase4-advanced/bai-21-reflection-annotations', title: 'Reflection & Annotations', phase: 'Phase 4: Java Advanced', time: '4 giờ', difficulty: 'Rất Khó' },
  { id: 22, dir: 'phase4-advanced/bai-22-jvm-internals', title: 'JVM Internals & Garbage Collection', phase: 'Phase 4: Java Advanced', time: '5 giờ', difficulty: 'Rất Khó' },
  { id: 23, dir: 'phase4-advanced/bai-23-testing', title: 'Unit Testing với JUnit 5 & Mockito', phase: 'Phase 4: Java Advanced', time: '4 giờ', difficulty: 'Trung bình' },
  { id: 24, dir: 'phase4-advanced/bai-24-build-tools', title: 'Build Tools: Maven & Gradle', phase: 'Phase 4: Java Advanced', time: '3 giờ', difficulty: 'Trung bình' },
  { id: 25, dir: 'phase5-modern-ecosystem/bai-25-modern-java', title: 'Modern Java (Records, Sealed, Switch)', phase: 'Phase 5: Ecosystem & Modern', time: '4 giờ', difficulty: 'Trung bình' },
  { id: 26, dir: 'phase5-modern-ecosystem/bai-26-database-jdbc-jpa', title: 'Database: JDBC, Hibernate & JPA', phase: 'Phase 5: Ecosystem & Modern', time: '5 giờ', difficulty: 'Khó' },
  { id: 27, dir: 'phase5-modern-ecosystem/bai-27-spring-boot', title: 'Spring Boot Framework', phase: 'Phase 5: Ecosystem & Modern', time: '8 giờ', difficulty: 'Khó' }
];

// Kho câu hỏi trắc nghiệm chất lượng cao - 10-15 câu mỗi bài cho cả 27 bài học
const quizDatabase = {
  1: [
    { q: "Thành phần nào trực tiếp thực thi mã bytecode (.class) của Java?", options: ["JDK", "JRE", "JVM", "javac (compiler)"], answer: 2, explanation: "JVM (Java Virtual Machine) là thành phần cốt lõi thông dịch và thực thi bytecode thành mã máy của hệ điều hành tương ứng." },
    { q: "Tại sao Java được mệnh danh là 'Write Once, Run Anywhere'?", options: ["Code Java tự biên dịch ra mã máy của hệ điều hành đó.", "Bytecode Java chạy trên JVM, mỗi hệ điều hành cài JVM phù hợp là chạy được.", "Java không dùng compiler mà chỉ dùng thông dịch từ file .java.", "Java chỉ hỗ trợ Windows vì Windows có thị phần lớn nhất."], answer: 1, explanation: "Mã nguồn Java biên dịch sang Bytecode - mã trung gian. JVM trên mỗi hệ điều hành dịch bytecode sang mã máy bản địa." },
    { q: "Quy tắc đặt tên file mã nguồn Java chứa một public class là gì?", options: ["Đặt tên gì cũng được, miễn có đuôi .class", "Tên file phải giống hoàn toàn tên public class (phân biệt hoa thường) và có đuôi .java", "Tên file viết thường hoàn toàn, tên class viết hoa", "Tên file phải bắt đầu bằng từ khóa 'Class'"], answer: 1, explanation: "Quy tắc bắt buộc: tên file mã nguồn phải trùng hoàn toàn với tên public class trong nó (ví dụ: public class HelloWorld → HelloWorld.java)." },
    { q: "JDK (Java Development Kit) bao gồm những thành phần gì?", options: ["Chỉ bao gồm JVM", "Chỉ bao gồm JRE", "Bao gồm JRE + các công cụ phát triển như javac, javadoc, jar", "Chỉ bao gồm trình biên dịch javac"], answer: 2, explanation: "JDK là bộ công cụ phát triển đầy đủ gồm JRE (chứa JVM) cộng với các công cụ như javac (compiler), javadoc, jar, jdb (debugger)." },
    { q: "File .class chứa loại code nào?", options: ["Mã nguồn Java (.java)", "Mã máy trực tiếp của CPU", "Bytecode - mã trung gian mà JVM hiểu được", "Mã nhị phân 0/1 thuần túy"], answer: 2, explanation: "File .class chứa Bytecode - là mã trung gian được tạo ra sau khi biên dịch. JVM sẽ dịch bytecode này sang mã máy khi chạy chương trình." },
    { q: "Lệnh nào dùng để biên dịch file HelloWorld.java thành bytecode?", options: ["java HelloWorld.java", "javac HelloWorld.java", "run HelloWorld.java", "compile HelloWorld.java"], answer: 1, explanation: "Lệnh `javac HelloWorld.java` gọi trình biên dịch Java để biên dịch file .java thành file .class (bytecode)." },
    { q: "Lệnh nào dùng để chạy chương trình Java đã biên dịch?", options: ["javac HelloWorld", "java HelloWorld.class", "java HelloWorld", "run HelloWorld"], answer: 2, explanation: "Lệnh `java HelloWorld` (không cần đuôi .class) sẽ khởi động JVM và thực thi bytecode trong file HelloWorld.class." },
    { q: "Java thuộc loại ngôn ngữ lập trình nào?", options: ["Ngôn ngữ thông dịch thuần túy (Interpreted)", "Ngôn ngữ biên dịch thuần túy (Compiled)", "Ngôn ngữ kết hợp biên dịch + thông dịch (Compiled + Interpreted)", "Ngôn ngữ kịch bản (Scripting)"], answer: 2, explanation: "Java là ngôn ngữ kết hợp: Giai đoạn 1 biên dịch .java → .class (bytecode). Giai đoạn 2 JVM thông dịch bytecode sang mã máy khi chạy." },
    { q: "Phương thức main trong Java có chữ ký đúng là gì?", options: ["public void main(String args)", "public static void main(String[] args)", "static main(String args[])", "void main()"], answer: 1, explanation: "Chữ ký chuẩn là `public static void main(String[] args)`. JVM sẽ tìm đúng chữ ký này để khởi động chương trình." },
    { q: "System.out.println() và System.out.print() khác nhau điểm gì?", options: ["println() in hoa còn print() in thường", "println() in xong tự xuống dòng, print() không xuống dòng", "Chúng hoàn toàn giống nhau", "print() nhanh hơn println()"], answer: 1, explanation: "`println()` in chuỗi rồi thêm ký tự xuống dòng `\\n`. `print()` chỉ in chuỗi mà không xuống dòng." },
    { q: "Kiểu của comment một dòng trong Java là gì?", options: ["/* comment */", "# comment", "// comment", "<!-- comment -->"], answer: 2, explanation: "Java dùng `//` để ghi chú một dòng. `/* ... */` để ghi chú nhiều dòng. `/** ... */` là Javadoc comment." },
    { q: "Package trong Java dùng để làm gì?", options: ["Tăng tốc độ chạy chương trình", "Tổ chức các class theo không gian tên (namespace) để tránh xung đột tên và dễ quản lý", "Nén file .java lại cho nhỏ hơn", "Tự động tạo tài liệu code"], answer: 1, explanation: "Package tổ chức các class liên quan vào cùng một thư mục/không gian tên. Ví dụ: `com.raizeshop.service` chứa các class service của RaizeShop." },
    { q: "Điều gì xảy ra khi ta gọi System.exit(0) trong chương trình Java?", options: ["Chương trình bị treo", "JVM kết thúc chương trình với mã thoát 0 (thành công)", "Hệ điều hành bị tắt", "Chương trình tiếp tục chạy vòng lặp vô tận"], answer: 1, explanation: "`System.exit(0)` yêu cầu JVM kết thúc toàn bộ chương trình. Tham số 0 nghĩa là thoát bình thường (thành công)." }
  ],

  2: [
    { q: "Kết quả của phép chia nguyên trong Java: 10 / 3 sẽ ra bao nhiêu?", options: ["3.3333", "3", "4", "Lỗi biên dịch"], answer: 1, explanation: "Khi chia 2 số nguyên int, Java thực hiện integer division và lấy phần nguyên. 10 / 3 = 3." },
    { q: "Kiểu dữ liệu nào biểu diễn số thực với độ chính xác cao hơn và được khuyên dùng mặc định?", options: ["float", "double", "decimal", "BigDecimal"], answer: 1, explanation: "`double` (8 bytes) có độ chính xác cao hơn `float` (4 bytes) và là lựa chọn mặc định trong Java." },
    { q: "Để so sánh nội dung hai chuỗi String s1 và s2, cách nào chính xác?", options: ["s1 == s2", "s1.equals(s2)", "s1 === s2", "compare(s1, s2) == 0"], answer: 1, explanation: "`==` so sánh địa chỉ ô nhớ. `.equals()` so sánh nội dung ký tự bên trong chuỗi." },
    { q: "Kiểu dữ liệu `byte` trong Java có phạm vi giá trị nào?", options: ["-128 đến 127", "0 đến 255", "-32768 đến 32767", "-2^31 đến 2^31-1"], answer: 0, explanation: "`byte` chiếm 8 bit, biểu diễn số nguyên có dấu từ -128 đến 127." },
    { q: "Giá trị mặc định của biến kiểu int khai báo trong class là bao nhiêu?", options: ["null", "-1", "0", "Không xác định"], answer: 2, explanation: "Biến instance (trong class) kiểu int có giá trị mặc định là 0. Biến boolean mặc định là false, tham chiếu (object) mặc định là null." },
    { q: "Cách ép kiểu (casting) nào chuyển double sang int trong Java?", options: ["double d = (double) 5;", "int i = (int) 3.14;", "int i = int(3.14);", "int i = to_int(3.14);"], answer: 1, explanation: "Để ép kiểu thu hẹp (widening cast), ta dùng cú pháp `(kiểu_đích) giá_trị`. `int i = (int) 3.14;` sẽ cho kết quả i = 3 (bỏ phần thập phân)." },
    { q: "Kết quả của biểu thức `5 % 3` trong Java là gì?", options: ["1.666", "1", "2", "0"], answer: 2, explanation: "Toán tử `%` là toán tử lấy phần dư. 5 chia 3 được 1, dư 2. Vậy `5 % 3 = 2`." },
    { q: "Biến `final int MAX = 100;` có đặc điểm gì?", options: ["Có thể thay đổi giá trị bất kỳ lúc nào", "Là hằng số, không thể thay đổi sau khi khởi tạo", "Tự động tăng giá trị sau mỗi lần dùng", "Chỉ dùng được trong phương thức main"], answer: 1, explanation: "Từ khóa `final` tạo ra hằng số - giá trị không thể thay đổi sau khi gán lần đầu. Cố gắng gán lại sẽ gây lỗi biên dịch." },
    { q: "Toán tử `++i` (pre-increment) và `i++` (post-increment) khác nhau điểm gì?", options: ["Hoàn toàn giống nhau", "++i tăng i trước rồi lấy giá trị, i++ lấy giá trị hiện tại rồi mới tăng", "i++ tăng nhanh hơn ++i", "++i tăng thêm 2 còn i++ tăng thêm 1"], answer: 1, explanation: "Với `++i`: tăng i lên 1 trước, sau đó trả về giá trị mới. Với `i++`: trả về giá trị hiện tại của i trước, sau đó mới tăng i lên 1." },
    { q: "Kết quả của `true && false || true` trong Java là gì?", options: ["false", "true", "Lỗi biên dịch", "null"], answer: 1, explanation: "Theo độ ưu tiên toán tử: `&&` cao hơn `||`. Tính: `true && false` = false; rồi `false || true` = true." },
    { q: "Kiểu dữ liệu `char` trong Java lưu trữ gì?", options: ["Một chuỗi ký tự", "Một ký tự Unicode duy nhất (16 bit)", "Một số nguyên 32 bit", "Giá trị boolean"], answer: 1, explanation: "`char` lưu một ký tự Unicode 16 bit (từ \\u0000 đến \\uFFFF). Ví dụ: `char c = 'A';` hoặc `char c = '\\u0041';`." },
    { q: "Tại sao nên dùng kiểu `long` thay vì `int` khi lưu ID người dùng trong hệ thống có hàng tỷ users?", options: ["Vì long in ra nhanh hơn int", "Vì int chỉ chứa tối đa ~2.1 tỷ, còn long chứa được đến ~9.2 × 10^18", "Vì long chính xác hơn int", "Vì int không dùng được trong database"], answer: 1, explanation: "`int` max là 2,147,483,647 (~2.1 tỷ). Với hệ thống lớn có thể vượt ngưỡng này, dùng `long` (max ~9.2 * 10^18) để an toàn." },
    { q: "Phép toán nào trong Java dùng để kiểm tra điều kiện theo dạng một dòng (ternary operator)?", options: ["if ? else :", "condition ? valueIfTrue : valueIfFalse", "switch(condition)", "boolean ? (a) : (b)"], answer: 1, explanation: "Toán tử ba ngôi (ternary): `bieuThuc ? giaTriDung : giaTriSai`. Ví dụ: `String role = age >= 18 ? \"Adult\" : \"Minor\";`" }
  ],

  3: [
    { q: "Switch expression (Java 14+) dùng từ khóa nào để trả về giá trị từ khối code phức tạp?", options: ["return", "yield", "break", "output"], answer: 1, explanation: "Trong Switch Expression, khi cần nhiều câu lệnh trước khi trả về giá trị, dùng từ khóa `yield`." },
    { q: "Switch Expression khác Switch Statement ở điểm quan trọng nào?", options: ["Switch Expression bắt buộc có break mỗi case.", "Switch Expression dùng mũi tên -> và có thể trả về giá trị trực tiếp.", "Switch Expression không hỗ trợ default.", "Switch Expression chỉ dùng với int."], answer: 1, explanation: "Switch Expression dùng `->` không bị fall-through và có thể gán giá trị trực tiếp: `String result = switch(x) { case 1 -> \"Một\"; default -> \"Khác\"; };`" },
    { q: "Khi điều kiện trong if-else lồng nhau, từ khóa else gắn với if nào?", options: ["Với if đầu tiên gần nhất trước nó", "Với if gần nhất chưa có else tương ứng", "Với if đầu tiên trong toàn bộ cấu trúc", "Ngẫu nhiên"], answer: 1, explanation: "Quy tắc 'dangling else': else gắn với if gần nhất chưa được ghép đôi. Nên dùng dấu ngoặc nhọn {} để rõ ràng hơn." },
    { q: "Biểu thức điều kiện `(x > 0 && y > 0)` trả về true khi nào?", options: ["Khi x > 0 hoặc y > 0", "Khi cả x và y đều > 0", "Khi x > 0 mà không cần y", "Khi tổng x + y > 0"], answer: 1, explanation: "Toán tử `&&` (AND) chỉ trả về true khi cả hai điều kiện đều true." },
    { q: "Short-circuit evaluation trong Java là gì?", options: ["Việc JVM tối ưu các vòng lặp ngắn", "Khi dùng &&, nếu vế trái là false thì vế phải không được tính; với ||, nếu vế trái true thì vế phải không tính", "Cách rút gọn câu lệnh if thành 1 dòng", "Kỹ thuật nén mã bytecode"], answer: 1, explanation: "Short-circuit: với `a && b`, nếu `a` là false thì b không được đánh giá. Với `a || b`, nếu `a` là true thì b không được đánh giá." },
    { q: "Lệnh switch-case truyền thống có vấn đề gì nếu thiếu `break`?", options: ["Chương trình bị lỗi biên dịch", "Fall-through: code tiếp tục chạy vào case tiếp theo dù không khớp", "Chương trình bị treo vô hạn", "Case tiếp theo bị bỏ qua"], answer: 1, explanation: "Thiếu `break`, sau khi khớp case, code 'rơi xuống' (fall-through) và tiếp tục thực thi tất cả case bên dưới cho đến khi gặp `break` hoặc hết switch." },
    { q: "Kiểu dữ liệu nào KHÔNG thể dùng trong lệnh switch trong Java cũ (trước Java 7)?", options: ["int", "char", "String", "float"], answer: 3, explanation: "Switch truyền thống chỉ hỗ trợ `int`, `char`, `byte`, `short` và các wrapper class tương ứng. `float` không được hỗ trợ. Java 7+ thêm String." },
    { q: "Toán tử `||` (OR) trả về true khi nào?", options: ["Chỉ khi cả hai điều kiện đều true", "Khi ít nhất một trong hai điều kiện là true", "Khi cả hai điều kiện đều false", "Khi điều kiện đầu tiên là true và điều kiện thứ hai là false"], answer: 1, explanation: "Toán tử `||` (OR) trả về true khi ít nhất một trong hai điều kiện là true. Chỉ trả về false khi cả hai đều false." },
    { q: "Cú pháp đúng của lệnh if-else if-else là gì?", options: ["if() {} elif {} else {}", "if() {} else if() {} else {}", "if() {} elseif() {} else {}", "if() {} else() {} default {}"], answer: 1, explanation: "Cú pháp đúng trong Java là `else if` (hai từ riêng biệt), không phải `elif` hay `elseif`." },
    { q: "Phát biểu nào đúng về toán tử `!` (NOT) trong Java?", options: ["!true = true", "!false = true", "!(5 > 3) = true", "!(null) = true"], answer: 1, explanation: "`!` đảo ngược giá trị boolean. `!false = true`. `!true = false`." },
    { q: "Trong switch-case, nhánh `default` có bắt buộc phải đặt ở cuối không?", options: ["Có, bắt buộc phải ở cuối", "Không, có thể đặt ở bất kỳ vị trí nào nhưng thường đặt cuối cho dễ đọc", "Không cần thiết có default", "default chỉ có trong switch expression"], answer: 1, explanation: "`default` không bắt buộc phải ở cuối, nhưng đặt cuối là thông lệ. Nếu không ở cuối và không có break, code có thể fall-through vào case tiếp theo." },
    { q: "Cần kiểm tra một số có nằm trong khoảng [1, 100] không. Điều kiện nào đúng?", options: ["n > 1 && n < 100", "n >= 1 && n <= 100", "n >= 1 || n <= 100", "1 <= n => n <= 100"], answer: 1, explanation: "Khoảng [1, 100] bao gồm cả 2 đầu, dùng `>=` và `<=`: `n >= 1 && n <= 100`." }
  ],

  4: [
    { q: "Sự khác biệt cơ bản giữa vòng lặp `while` và `do-while` là gì?", options: ["`while` chạy ít nhất 1 lần, `do-while` có thể không chạy lần nào.", "`do-while` luôn chạy ít nhất 1 lần trước khi kiểm tra điều kiện, `while` kiểm tra trước.", "`while` nhanh hơn `do-while`.", "`do-while` chỉ dùng cho số nguyên."], answer: 1, explanation: "`do-while` thực thi khối lệnh trước rồi mới kiểm tra điều kiện. Do đó luôn chạy ít nhất 1 lần." },
    { q: "`break` và `continue` hoạt động như thế nào trong vòng lặp?", options: ["`break` thoát vòng lặp hiện tại; `continue` bỏ qua lần lặp hiện tại và chuyển sang lần kế tiếp.", "`break` dừng toàn bộ chương trình; `continue` làm vòng lặp chạy nhanh hơn.", "`break` chuyển đến nhãn tiếp theo; `continue` dừng vòng lặp.", "Cả hai đều thoát vòng lặp nhưng `continue` dọn dẹp bộ nhớ."], answer: 0, explanation: "`break` kết thúc hoàn toàn vòng lặp. `continue` bỏ qua phần còn lại của lần lặp hiện tại và nhảy sang lần lặp kế tiếp." },
    { q: "Vòng lặp for-each (enhanced for) trong Java được dùng để làm gì?", options: ["Lặp với bộ đếm i từ 0 đến n", "Duyệt qua từng phần tử của mảng hoặc collection mà không cần chỉ số", "Chỉ dùng được với ArrayList", "Thay thế hoàn toàn vòng lặp while"], answer: 1, explanation: "For-each `for (Kieu phanTu : tap_hop)` giúp duyệt qua mảng/collection mà không cần quản lý chỉ số, code gọn hơn nhưng không thể dùng khi cần biết index." },
    { q: "Số lần lặp của `for(int i = 0; i < 5; i++)` là bao nhiêu?", options: ["4 lần", "5 lần", "6 lần", "Vô hạn"], answer: 1, explanation: "i chạy từ 0, 1, 2, 3, 4 (5 lần). Khi i = 5 thì điều kiện `i < 5` sai, vòng lặp kết thúc." },
    { q: "Vòng lặp nào phù hợp nhất khi không biết trước số lần lặp?", options: ["for loop", "while loop", "do-while loop", "for-each loop"], answer: 1, explanation: "`while` phù hợp khi số lần lặp phụ thuộc vào điều kiện không biết trước (ví dụ: đọc dữ liệu cho đến khi người dùng nhập 'quit')." },
    { q: "Điều gì xảy ra với vòng lặp `while(true)` nếu không có `break`?", options: ["Chỉ chạy 1 lần rồi dừng", "Vòng lặp vô hạn - chương trình không bao giờ kết thúc", "Lỗi biên dịch", "JVM tự dừng sau 100 lần"], answer: 1, explanation: "Điều kiện `true` luôn đúng, nên vòng lặp chạy mãi mãi (infinite loop). Cần có `break` hoặc `return` bên trong để thoát." },
    { q: "Trong vòng lặp `for(int i = 10; i > 0; i--)`, giá trị cuối cùng của i khi thực hiện lần lặp cuối cùng là bao nhiêu?", options: ["0", "1", "-1", "10"], answer: 1, explanation: "Lần lặp cuối: i = 1, thực hiện thân vòng lặp, sau đó i-- làm i = 0, kiểm tra 0 > 0 là false, vòng lặp dừng. Giá trị i khi chạy lần cuối là 1." },
    { q: "Vòng lặp lồng nhau (nested loop) có ứng dụng gì phổ biến?", options: ["Chỉ dùng để in số nguyên tố", "In ma trận, duyệt bảng 2 chiều, so sánh mọi cặp phần tử trong danh sách", "Thay thế vòng lặp while", "Chỉ dùng trong thuật toán sắp xếp"], answer: 1, explanation: "Nested loop thường dùng để: in bảng cửu chương, duyệt ma trận 2D, kiểm tra mọi cặp phần tử (O(n²))." },
    { q: "Labeled break trong Java dùng để làm gì?", options: ["Đặt tên cho vòng lặp để tài liệu hóa code", "Thoát ra khỏi vòng lặp bên ngoài trong cấu trúc vòng lặp lồng nhau", "Break với điều kiện kèm theo", "Không tồn tại trong Java"], answer: 1, explanation: "Labeled break cho phép thoát ra khỏi một vòng lặp ngoài cụ thể khi đang ở trong vòng lặp lồng. Ví dụ: `outer: for(...) { for(...) { break outer; } }`" },
    { q: "Phần khởi tạo (init) của vòng lặp `for` được thực hiện bao nhiêu lần?", options: ["Mỗi lần lặp", "Chỉ một lần duy nhất trước khi bắt đầu vòng lặp", "Sau mỗi lần lặp", "Không bao giờ nếu điều kiện ban đầu sai"], answer: 1, explanation: "Phần init (ví dụ `int i = 0`) chỉ thực hiện đúng 1 lần trước khi bắt đầu vòng lặp, bất kể số lần lặp là bao nhiêu." },
    { q: "Cách viết vòng lặp for ngược từ 10 đến 1 là gì?", options: ["for(int i = 10; i >= 1; i--)", "for(int i = 1; i <= 10; i++)", "for(int i = 10; i > 0; i++)", "for(int i = 10; i < 1; i--)"], answer: 0, explanation: "Để đếm ngược, khởi tạo i = 10, điều kiện tiếp tục `i >= 1`, bước nhảy `i--` (giảm dần)." },
    { q: "Kết quả của đoạn code sau:\n`int sum = 0; for(int i = 1; i <= 3; i++) sum += i; System.out.println(sum);`", options: ["3", "6", "9", "0"], answer: 1, explanation: "i=1: sum=1; i=2: sum=3; i=3: sum=6. Kết quả là 6 (= 1+2+3)." }
  ],

  5: [
    { q: "Khi thay đổi nội dung String (ví dụ s = s + \"abc\"), điều gì xảy ra trong bộ nhớ?", options: ["String ban đầu được cập nhật trực tiếp.", "Một String mới hoàn toàn được tạo ra, biến s trỏ sang đối tượng mới.", "Java tự giải phóng vùng nhớ cũ và ghi đè.", "Câu lệnh gây lỗi biên dịch vì String không thể đổi."], answer: 1, explanation: "String trong Java là Immutable (bất biến). Mỗi lần thay đổi, Java tạo String mới chứ không sửa trực tiếp ô nhớ cũ." },
    { q: "Để nối chuỗi hiệu quả trong vòng lặp chạy nhiều lần, class nào được khuyên dùng?", options: ["String", "StringBuffer", "StringBuilder", "StringJoiner"], answer: 2, explanation: "`StringBuilder` được thiết kế để sửa đổi chuỗi mà không tạo nhiều đối tượng rác. Nhanh hơn StringBuffer (không đồng bộ)." },
    { q: "Phần tử đầu tiên của mảng `int[] arr = {10, 20, 30}` có chỉ số (index) là bao nhiêu?", options: ["1", "0", "-1", "Phụ thuộc vào khai báo"], answer: 1, explanation: "Mảng trong Java (và hầu hết ngôn ngữ lập trình) được đánh chỉ số từ 0. Phần tử đầu tiên có index = 0." },
    { q: "Điều gì xảy ra khi truy cập chỉ số vượt quá giới hạn mảng?", options: ["Trả về 0", "Trả về null", "Ném ra ngoại lệ ArrayIndexOutOfBoundsException", "Lỗi biên dịch"], answer: 2, explanation: "Truy cập index ngoài phạm vi mảng ném ra `ArrayIndexOutOfBoundsException` lúc runtime, không phải lỗi biên dịch." },
    { q: "Cách lấy độ dài của mảng `int[] arr` là gì?", options: ["arr.length()", "arr.size()", "arr.length", "length(arr)"], answer: 2, explanation: "Mảng trong Java có thuộc tính `length` (không phải phương thức, không có dấu ()). Ví dụ: `arr.length`." },
    { q: "String `s.charAt(0)` trả về gì?", options: ["Toàn bộ chuỗi s", "Ký tự đầu tiên của chuỗi s", "Mã ASCII của ký tự đầu", "Độ dài chuỗi"], answer: 1, explanation: "`charAt(index)` trả về ký tự tại vị trí index. `charAt(0)` trả về ký tự đầu tiên của chuỗi." },
    { q: "`\"Hello\".substring(1, 3)` trả về gì?", options: ["\"Hello\"", "\"el\"", "\"ell\"", "\"He\""], answer: 1, explanation: "`substring(beginIndex, endIndex)` lấy từ beginIndex đến endIndex-1. Từ 1 đến 2 (không bao gồm 3): 'e', 'l' → \"el\"." },
    { q: "`\"  Hello  \".trim()` trả về gì?", options: ["\"Hello\"", "\"  Hello  \"", "\"Hello  \"", "\"  Hello\""], answer: 0, explanation: "`trim()` loại bỏ khoảng trắng ở đầu và cuối chuỗi. \"  Hello  \" → \"Hello\"." },
    { q: "Phương thức nào dùng để kiểm tra chuỗi s có chứa chuỗi con \"java\" không?", options: ["s.has(\"java\")", "s.contains(\"java\")", "s.includes(\"java\")", "s.indexOf(\"java\") != -1 (cũng đúng, nhưng contains đơn giản hơn)"], answer: 1, explanation: "`s.contains(\"java\")` trả về true nếu s chứa chuỗi con \"java\". Đây là cách đơn giản và trực quan nhất." },
    { q: "Mảng 2 chiều trong Java khai báo thế nào?", options: ["int arr[][]", "int[][] arr", "int[2][3] arr = new int;", "Cả A và B đều đúng"], answer: 3, explanation: "Cả hai cú pháp `int[][] arr` và `int arr[][]` đều hợp lệ trong Java, nhưng `int[][] arr` được khuyên dùng hơn vì rõ ràng hơn." },
    { q: "`\"Java\".toUpperCase()` trả về gì?", options: ["\"java\"", "\"JAVA\"", "\"Java\"", "Lỗi"], answer: 1, explanation: "`toUpperCase()` chuyển tất cả ký tự trong chuỗi thành chữ hoa. \"Java\" → \"JAVA\"." },
    { q: "Để tạo một mảng 5 phần tử kiểu int khởi tạo bằng 0, cú pháp nào đúng?", options: ["int[] arr = new int[5];", "int[] arr = {0, 0, 0, 0, 0};", "Cả hai đều đúng", "int arr = new int(5);"], answer: 2, explanation: "Cả hai đều hợp lệ. `new int[5]` tạo mảng 5 phần tử và mặc định khởi tạo bằng 0. Cú pháp `{}` khởi tạo tường minh." },
    { q: "`String.valueOf(42)` làm gì?", options: ["Chuyển chuỗi \"42\" sang int 42", "Chuyển int 42 sang chuỗi \"42\"", "Kiểm tra xem 42 có phải String không", "Trả về null"], answer: 1, explanation: "`String.valueOf()` chuyển đổi bất kỳ kiểu dữ liệu nào sang String. `String.valueOf(42)` → \"42\"." }
  ],

  6: [
    { q: "Nạp chồng phương thức (Method Overloading) xác định dựa trên yếu tố nào?", options: ["Các phương thức trùng tên nhưng khác kiểu trả về.", "Các phương thức trùng tên nhưng khác danh sách tham số.", "Các phương thức khác tên nhưng cùng tham số.", "Các phương thức trùng tên và tham số nhưng khác access modifier."], answer: 1, explanation: "Overloading yêu cầu cùng tên nhưng khác danh sách tham số (khác kiểu, khác số lượng, hoặc khác thứ tự)." },
    { q: "Varargs trong Java khai báo bằng ký hiệu nào?", options: ["String[] args", "String... args", "String args*", "String args[]..."], answer: 1, explanation: "Varargs dùng `...` sau kiểu dữ liệu. Trong phương thức, biến này được đối xử như một mảng." },
    { q: "Giá trị trả về (return value) của phương thức `void` là gì?", options: ["null", "0", "false", "Không có giá trị nào - void không trả về gì"], answer: 3, explanation: "Phương thức `void` không trả về bất kỳ giá trị nào. Từ khóa `return;` trong void chỉ để thoát khỏi phương thức sớm." },
    { q: "Phương thức đệ quy (recursive method) là gì?", options: ["Phương thức gọi phương thức khác trong cùng class", "Phương thức tự gọi chính nó", "Phương thức lặp lại code nhiều lần", "Phương thức không có tham số"], answer: 1, explanation: "Đệ quy là kỹ thuật phương thức tự gọi chính nó. Mỗi lần gọi đệ quy phải tiến đến điều kiện dừng (base case) để tránh vòng đệ quy vô hạn." },
    { q: "Tham số trong Java được truyền theo cơ chế nào?", options: ["Pass-by-reference (tham chiếu) cho mọi kiểu dữ liệu", "Pass-by-value (tham trị) cho mọi kiểu dữ liệu", "Pass-by-reference cho primitive, pass-by-value cho object", "Pass-by-value cho primitive, pass-by-reference (trị của địa chỉ) cho object"], answer: 3, explanation: "Java luôn truyền tham trị. Với primitive: truyền giá trị số. Với object: truyền giá trị của địa chỉ (reference value), không phải object. Nên thay đổi trường của object thì thấy được, nhưng gán lại biến thì không ảnh hưởng bên ngoài." },
    { q: "Access modifier `private` cho phương thức có nghĩa gì?", options: ["Phương thức chỉ truy cập được từ cùng package", "Phương thức chỉ truy cập được từ cùng class định nghĩa nó", "Phương thức truy cập được từ mọi class", "Phương thức chỉ truy cập được từ subclass"], answer: 1, explanation: "`private` giới hạn truy cập hoàn toàn trong class định nghĩa nó. Các class khác, kể cả subclass, không thể gọi trực tiếp." },
    { q: "Phương thức `static` khác phương thức `instance` ở điểm nào?", options: ["static method chạy chậm hơn", "static method thuộc về class, gọi qua tên class. Instance method thuộc về object, cần tạo object trước.", "static method chỉ dùng được trong main()", "Instance method không cần tham số"], answer: 1, explanation: "Static method thuộc class → gọi: `ClassName.method()`. Instance method thuộc object → phải tạo object trước: `obj.method()`." },
    { q: "Kết quả của factorial(3) khi factorial(n) = n * factorial(n-1), factorial(0) = 1?", options: ["3", "6", "9", "1"], answer: 1, explanation: "factorial(3) = 3 * factorial(2) = 3 * 2 * factorial(1) = 3 * 2 * 1 * factorial(0) = 3 * 2 * 1 * 1 = 6." },
    { q: "Khi gọi phương thức trong Java, Stack Frame được tạo ra để làm gì?", options: ["Lưu toàn bộ chương trình", "Lưu các biến cục bộ và trạng thái của lần gọi phương thức đó", "Lưu kết nối database", "Xử lý ngoại lệ"], answer: 1, explanation: "Mỗi lần gọi phương thức, JVM tạo một Stack Frame chứa: tham số, biến cục bộ, và thông tin trở về. Frame bị xóa khi phương thức kết thúc." },
    { q: "Có thể có bao nhiêu lệnh `return` trong một phương thức Java?", options: ["Chỉ một", "Tối đa 2", "Nhiều tùy ý, nhưng mỗi lần gọi chỉ chạy một lệnh return", "Không có giới hạn nhưng phải là lệnh cuối cùng"], answer: 2, explanation: "Phương thức có thể có nhiều lệnh `return` (ví dụ: trong các nhánh if-else), nhưng khi chạy, chỉ một lệnh `return` được thực thi mỗi lần gọi." },
    { q: "Phương thức nào sau đây được gọi là phương thức utility/helper?", options: ["Phương thức main()", "Phương thức private thực hiện nhiệm vụ nhỏ được gọi bởi các phương thức khác", "Phương thức constructor", "Phương thức abstract"], answer: 1, explanation: "Helper/utility method là phương thức (thường private) thực hiện một chức năng nhỏ, cụ thể, được tái sử dụng bởi các phương thức khác trong class." }
  ],

  7: [
    { q: "Lớp (Class) và Đối tượng (Object) có mối quan hệ như thế nào?", options: ["Class là thực thể chạy trong bộ nhớ, Object là bản thiết kế.", "Class là bản thiết kế định nghĩa thuộc tính và hành vi; Object là thực thể cụ thể tạo ra từ Class.", "Class và Object hoàn toàn giống nhau.", "Một Object có thể chứa nhiều Class bên trong."], answer: 1, explanation: "Class như khuôn đúc. Object là sản phẩm cụ thể đúc ra từ khuôn đó, chiếm không gian thực trong bộ nhớ RAM." },
    { q: "Từ khóa `new` trong Java dùng để làm gì?", options: ["Khai báo biến mới", "Tạo ra một đối tượng mới trong bộ nhớ Heap và gọi constructor", "Tạo một phương thức mới", "Khởi tạo mảng chỉ"], answer: 1, explanation: "`new` là toán tử tạo đối tượng: cấp phát bộ nhớ trên Heap, khởi tạo đối tượng và gọi constructor tương ứng." },
    { q: "Thuộc tính (field/attribute) trong class được khai báo ở đâu?", options: ["Bên trong phương thức", "Bên trong constructor", "Bên ngoài phương thức, trực tiếp trong thân class", "Chỉ trong phương thức main"], answer: 2, explanation: "Các thuộc tính (instance fields) khai báo trực tiếp trong thân class, không nằm trong bất kỳ phương thức nào." },
    { q: "OOP viết tắt của gì?", options: ["Object-Oriented Protocol", "Object-Oriented Programming", "Object-Organized Project", "Open-Oriented Process"], answer: 1, explanation: "OOP là viết tắt của Object-Oriented Programming (Lập trình Hướng đối tượng)." },
    { q: "Có bao nhiêu tính chất cơ bản của OOP?", options: ["2 (Đóng gói và Kế thừa)", "3 (Đóng gói, Kế thừa, Đa hình)", "4 (Đóng gói, Kế thừa, Đa hình, Trừu tượng)", "5"], answer: 2, explanation: "4 tính chất cơ bản của OOP: Encapsulation (Đóng gói), Inheritance (Kế thừa), Polymorphism (Đa hình), Abstraction (Trừu tượng)." },
    { q: "Từ khóa `this` trong Java dùng để chỉ điều gì?", options: ["Lớp cha (superclass)", "Đối tượng hiện tại đang thực thi phương thức", "Đối tượng tiếp theo trong danh sách", "Lớp hiện tại (không phải đối tượng)"], answer: 1, explanation: "`this` là tham chiếu đến đối tượng hiện tại đang được gọi phương thức. Dùng để phân biệt biến instance với tham số cùng tên." },
    { q: "Trong Java, một class có thể kế thừa từ bao nhiêu class cha trực tiếp?", options: ["Không giới hạn", "Tối đa 2", "Chỉ 1 (Java không hỗ trợ đa kế thừa class)", "3"], answer: 2, explanation: "Java không hỗ trợ đa kế thừa class (Multiple Inheritance) để tránh Diamond Problem. Một class chỉ extends được 1 class. Tuy nhiên có thể implements nhiều interface." },
    { q: "Phương thức `toString()` trong Java dùng để làm gì?", options: ["Chuyển đổi số sang chuỗi", "Trả về biểu diễn chuỗi của đối tượng khi cần in ra", "Xóa đối tượng khỏi bộ nhớ", "Kiểm tra hai đối tượng có bằng nhau không"], answer: 1, explanation: "`toString()` trả về biểu diễn dạng String của đối tượng. Khi dùng `System.out.println(obj)`, Java tự động gọi `obj.toString()`." },
    { q: "Phương thức `equals()` trong Object class mặc định so sánh điều gì?", options: ["Nội dung bên trong đối tượng", "Địa chỉ bộ nhớ (reference) của hai đối tượng", "Tên class của hai đối tượng", "Số lượng thuộc tính của hai đối tượng"], answer: 1, explanation: "`equals()` mặc định trong Object class so sánh địa chỉ bộ nhớ (tương đương `==`). Cần override để so sánh nội dung." },
    { q: "Ký hiệu UML nào biểu diễn mối quan hệ 'HAS-A' (có chứa) giữa hai class?", options: ["Mũi tên kế thừa (rỗng đặc)", "Association (đường thẳng) hoặc Composition (hình thoi đặc)", "Mũi tên đứt nét (Dependency)", "Không có ký hiệu chuẩn"], answer: 1, explanation: "'HAS-A' thể hiện một class chứa một class khác như thuộc tính. Trong UML dùng Association hoặc Composition (quan hệ sở hữu mạnh hơn)." },
    { q: "Khai báo `public class Dog {}` và `class Dog {}` khác nhau điểm gì?", options: ["Không có sự khác biệt", "`public class Dog` có thể truy cập từ mọi package, `class Dog` (package-private) chỉ trong cùng package", "`public class Dog` nhanh hơn", "`class Dog` là abstract"], answer: 1, explanation: "Thiếu `public` → class là package-private, chỉ truy cập được trong cùng package. `public class` truy cập được từ mọi nơi." },
    { q: "Khái niệm 'instanceof' trong Java dùng để làm gì?", options: ["Tạo ra một instance mới của class", "Kiểm tra xem một đối tượng có phải là thực thể của một class (hoặc subclass) cụ thể không", "So sánh hai đối tượng theo giá trị", "Xóa đối tượng khỏi heap"], answer: 1, explanation: "`obj instanceof ClassName` trả về true nếu obj là thực thể của ClassName hoặc bất kỳ subclass nào của nó." }
  ],

  8: [
    { q: "Thành viên tĩnh (static) thuộc về thực thể nào?", options: ["Từng đối tượng cụ thể tạo ra từ class.", "Chính Class đó, chia sẻ chung cho tất cả đối tượng, gọi trực tiếp không cần tạo đối tượng.", "Thuộc JVM và chỉ chạy khi khởi động.", "Thuộc Heap và bị hủy khi phương thức kết thúc."], answer: 1, explanation: "Static member thuộc về class, không phải object. Chỉ có một bản sao duy nhất, chia sẻ cho tất cả instance." },
    { q: "Constructor trong Java có đặc điểm gì?", options: ["Có kiểu trả về void", "Không có kiểu trả về, tên phải trùng tên class, tự động gọi khi tạo object", "Phải khai báo là static", "Chỉ có thể có một constructor trong mỗi class"], answer: 1, explanation: "Constructor: tên trùng tên class, không có kiểu trả về (kể cả void), tự động được gọi bởi toán tử `new`." },
    { q: "Nếu class không khai báo constructor nào, Java sẽ làm gì?", options: ["Báo lỗi biên dịch", "Tự động tạo một default constructor không tham số", "Class không thể tạo đối tượng", "Buộc phải viết ít nhất một constructor"], answer: 1, explanation: "Khi không có constructor nào, Java tự động cung cấp no-arg default constructor. Nếu đã khai báo một constructor bất kỳ, default constructor sẽ không được tạo." },
    { q: "Từ khóa `super()` trong constructor dùng để làm gì?", options: ["Gọi phương thức của lớp con", "Gọi constructor của lớp cha (superclass)", "Tạo đối tượng mới", "Truy cập biến static"], answer: 1, explanation: "`super()` gọi constructor của class cha. Phải là câu lệnh đầu tiên trong constructor. Java tự chèn `super()` nếu không khai báo." },
    { q: "Khi gọi `this()` trong một constructor, nghĩa là gì?", options: ["Gọi phương thức này chính nó (đệ quy)", "Gọi một constructor khác trong cùng class (constructor chaining)", "Khởi tạo lại đối tượng hiện tại", "Không hợp lệ trong Java"], answer: 1, explanation: "`this()` gọi constructor khác trong cùng class, giúp tái sử dụng code khởi tạo (constructor overloading/chaining)." },
    { q: "Biến static trong class được lưu ở vùng nhớ nào của JVM?", options: ["Heap", "Stack", "Method Area (Metaspace trong Java 8+)", "PC Register"], answer: 2, explanation: "Biến static được lưu trong Method Area (còn gọi là Metaspace từ Java 8+), được tải một lần và tồn tại suốt vòng đời ứng dụng." },
    { q: "Đặc điểm của block khởi tạo tĩnh (static initializer block) `static { ... }` là gì?", options: ["Chạy mỗi lần tạo đối tượng mới", "Chạy một lần duy nhất khi class được nạp vào JVM, trước cả constructor", "Giống như constructor nhưng cho static", "Chỉ dùng để khai báo hằng số"], answer: 1, explanation: "Static initializer block chạy đúng một lần khi class được load vào JVM, trước bất kỳ constructor nào được gọi." },
    { q: "Phương thức `clone()` trong Java dùng để làm gì?", options: ["Xóa đối tượng khỏi bộ nhớ", "Tạo ra một bản sao của đối tượng", "So sánh hai đối tượng", "Chuyển đổi kiểu dữ liệu"], answer: 1, explanation: "`clone()` tạo ra bản sao (copy) của đối tượng. Class phải implements `Cloneable` interface để dùng. Cần phân biệt shallow copy và deep copy." },
    { q: "Mục đích chính của setter method trong OOP là gì?", options: ["Đọc giá trị thuộc tính", "Kiểm soát việc gán giá trị cho thuộc tính private (validation, logging)", "Xóa thuộc tính", "Tạo object mới"], answer: 1, explanation: "Setter cho phép kiểm soát và validate dữ liệu trước khi gán vào thuộc tính private. Đây là nguyên tắc Encapsulation." },
    { q: "Biến instance (instance variable) khác biến static (class variable) ở điểm nào?", options: ["Instance variable nhanh hơn", "Instance variable riêng cho từng object, static variable chia sẻ chung cho tất cả object của class", "Static variable không thể thay đổi", "Không có sự khác biệt"], answer: 1, explanation: "Mỗi object có bản sao riêng của instance variable. Static variable chỉ có một bản sao duy nhất, chia sẻ giữa tất cả objects của class." },
    { q: "Điều gì xảy ra khi biến object được gán `null`?", options: ["Đối tượng bị xóa ngay lập tức", "Biến không trỏ đến đối tượng nào, đối tượng cũ có thể bị Garbage Collector thu hồi sau", "Lỗi biên dịch", "Giá trị của object trở thành 0"], answer: 1, explanation: "Gán null làm biến không tham chiếu đến object nào. Object cũ (nếu không còn biến nào trỏ vào) sẽ được GC thu hồi bộ nhớ." }
  ],

  9: [
    { q: "Access modifier nào hạn chế truy cập nhất?", options: ["public", "protected", "default (package-private)", "private"], answer: 3, explanation: "`private` giới hạn truy cập tuyệt đối, chỉ trong cùng class định nghĩa nó." },
    { q: "Tính đóng gói (Encapsulation) trong OOP có nghĩa là gì?", options: ["Đặt tất cả code vào một class duy nhất", "Ẩn chi tiết triển khai, chỉ để lộ interface công khai, bảo vệ dữ liệu bên trong", "Kế thừa từ nhiều class", "Sử dụng các phương thức đệ quy"], answer: 1, explanation: "Encapsulation là bundling data (fields) và methods vào class, ẩn dữ liệu bằng `private` và cung cấp getter/setter để kiểm soát truy cập." },
    { q: "Access modifier `protected` cho phép truy cập từ đâu?", options: ["Chỉ trong cùng class", "Cùng class + cùng package + subclass (kể cả ở package khác)", "Chỉ cùng package", "Mọi nơi"], answer: 1, explanation: "`protected` cho phép: cùng class, cùng package, và các subclass (dù ở package khác)." },
    { q: "Tại sao nên khai báo các thuộc tính (fields) là private?", options: ["Để code chạy nhanh hơn", "Để bảo vệ tính nhất quán của dữ liệu, ngăn bên ngoài trực tiếp sửa giá trị không hợp lệ", "Vì Java bắt buộc phải private", "Để tiết kiệm bộ nhớ"], answer: 1, explanation: "Private fields là nguyên tắc Encapsulation: kiểm soát truy cập, validate dữ liệu qua setter, bảo vệ class khỏi trạng thái không hợp lệ." },
    { q: "Getter method thường có dạng nào theo chuẩn Java Bean?", options: ["get() không tham số", "getFieldName() trả về kiểu của field", "returnFieldName()", "readFieldName()"], answer: 1, explanation: "Chuẩn Java Bean: getter có tên `getFieldName()` (hoặc `isFieldName()` cho boolean) và trả về giá trị của field tương ứng." },
    { q: "Điều gì là sai về Encapsulation?", options: ["Encapsulation ẩn chi tiết triển khai bên trong", "Encapsulation dùng access modifier để kiểm soát truy cập", "Encapsulation nghĩa là bắt buộc phải có getter và setter cho mọi field", "Encapsulation giúp code dễ maintain hơn"], answer: 2, explanation: "Không phải lúc nào cũng cần getter/setter cho mọi field. Đôi khi muốn field là read-only (chỉ có getter), đôi khi không cần expose nó ra ngoài." },
    { q: "Default access modifier (không viết gì) cho phép truy cập từ đâu?", options: ["Chỉ cùng class", "Cùng class và cùng package (package-private)", "Cùng class và tất cả subclass", "Mọi nơi"], answer: 1, explanation: "Khi không khai báo modifier, là package-private: chỉ truy cập được từ cùng package." },
    { q: "Một class chứa tất cả các thuộc tính là private. Bên ngoài class muốn đọc giá trị thuộc tính đó, phải làm gì?", options: ["Không thể đọc được", "Dùng Reflection API để bypass", "Gọi phương thức getter public được cung cấp bởi class", "Kế thừa class đó"], answer: 2, explanation: "Đây là mẫu Encapsulation chuẩn: thuộc tính private + getter public. Bên ngoài chỉ đọc qua getter." },
    { q: "Immutable class trong Java là gì? Ví dụ điển hình?", options: ["Class không thể kế thừa", "Class mà đối tượng của nó không thể thay đổi trạng thái sau khi tạo. Ví dụ: String, Integer", "Class không có constructor", "Class chỉ chứa static method"], answer: 1, explanation: "Immutable class: tất cả fields là final và private, không có setter. Ví dụ: String, Integer, LocalDate. Giúp thread-safe và an toàn chia sẻ." },
    { q: "Tại sao Encapsulation giúp code dễ maintenance hơn?", options: ["Vì code ít dòng hơn", "Vì thay đổi chi tiết triển khai bên trong class không ảnh hưởng đến code bên ngoài dùng class đó", "Vì không cần viết comment", "Vì Encapsulation tự sửa lỗi"], answer: 1, explanation: "Bên ngoài chỉ phụ thuộc vào interface (public methods). Khi sửa nội bộ class, không cần sửa code bên ngoài - đây là nguyên lý Information Hiding." }
  ],

  10: [
    { q: "Từ khóa nào thiết lập mối quan hệ kế thừa giữa lớp con và lớp cha?", options: ["implements", "extends", "inherits", "super"], answer: 1, explanation: "Java dùng `extends` để kế thừa class. `implements` dùng để triển khai interface." },
    { q: "Phương thức `super.methodName()` trong lớp con dùng để làm gì?", options: ["Gọi phương thức của lớp con đang ghi đè", "Gọi phương thức cùng tên của lớp cha (superclass)", "Tạo object của lớp cha", "Kiểm tra kiểu kế thừa"], answer: 1, explanation: "`super.method()` gọi phiên bản phương thức trong lớp cha, thường dùng khi lớp con muốn mở rộng (chứ không phải thay thế hoàn toàn) hành vi của lớp cha." },
    { q: "Thuộc tính và phương thức nào của lớp cha KHÔNG được kế thừa sang lớp con?", options: ["public members", "protected members", "private members", "default (package-private) members khi ở package khác"], answer: 2, explanation: "Private members của lớp cha không được kế thừa trực tiếp. Lớp con có thể truy cập gián tiếp qua public/protected methods của lớp cha." },
    { q: "Annotation `@Override` dùng để làm gì?", options: ["Bắt buộc override phương thức", "Chỉ dẫn cho compiler biết đây là phương thức ghi đè, giúp phát hiện lỗi nếu không ghi đè đúng", "Làm phương thức chạy nhanh hơn", "Ghi đè biến cùng tên"], answer: 1, explanation: "@Override không bắt buộc nhưng được khuyên dùng. Nếu phương thức thực ra không ghi đè được (sai tên/tham số), compiler sẽ báo lỗi." },
    { q: "Từ khóa `final` khi áp dụng cho class có nghĩa gì?", options: ["Class không thể tạo object", "Class không thể bị kế thừa", "Class không thể chứa phương thức static", "Class không thể có thuộc tính"], answer: 1, explanation: "`final class` không thể được extends. Ví dụ: String là final class → không thể viết `class MyString extends String`." },
    { q: "Lớp nào là lớp cha cuối cùng của tất cả class trong Java?", options: ["Class", "Base", "Object", "Root"], answer: 2, explanation: "`java.lang.Object` là lớp cha tối thượng. Mọi class trong Java đều ngầm kế thừa từ Object nếu không extends class nào khác." },
    { q: "Tính kế thừa giúp giải quyết vấn đề gì trong lập trình?", options: ["Tăng tốc độ chạy chương trình", "Tái sử dụng code, giảm trùng lặp, xây dựng phân cấp class hợp lý", "Giảm dung lượng file .class", "Tự động xử lý lỗi"], answer: 1, explanation: "Kế thừa cho phép tái sử dụng code từ lớp cha, xây dựng IS-A relationship (Dog IS-A Animal), và dễ mở rộng mà không sửa code cũ (OCP principle)." },
    { q: "Điều gì xảy ra khi ghi đè (override) phương thức mà thay đổi kiểu trả về?", options: ["Luôn cho phép", "Cho phép nếu kiểu trả về là subtype của kiểu gốc (covariant return type)", "Không bao giờ cho phép", "Chỉ cho phép với void"], answer: 1, explanation: "Java hỗ trợ covariant return type: có thể override và trả về subtype. Ví dụ: cha trả về `Animal`, con override trả về `Dog` (Dog extends Animal)." },
    { q: "Đa kế thừa (Multiple Inheritance) của class không được hỗ trợ trong Java vì lý do gì?", options: ["Vì Java chưa phát triển kịp", "Tránh Diamond Problem - xung đột khi hai lớp cha có phương thức cùng tên", "Vì giới hạn JVM", "Vì không cần thiết"], answer: 1, explanation: "Diamond Problem: nếu B và C đều extends A và cùng override một method, khi D extends B và C thì D không biết dùng phiên bản nào." },
    { q: "Constructor của lớp cha được kế thừa tự động sang lớp con không?", options: ["Có, tự động", "Không, constructor không được kế thừa. Lớp con phải tự khai báo constructor hoặc gọi super()", "Chỉ kế thừa default constructor", "Có nếu là public constructor"], answer: 1, explanation: "Constructor KHÔNG được kế thừa. Lớp con phải định nghĩa constructor riêng. Nếu không, Java tự thêm `super()` ở đầu constructor lớp con." },
    { q: "Phương thức final không thể làm gì?", options: ["Không thể gọi từ subclass", "Không thể bị ghi đè (override) bởi lớp con", "Không thể có tham số", "Không thể trả về giá trị"], answer: 1, explanation: "`final method` không thể bị override. Điều này đảm bảo hành vi của phương thức không bị thay đổi trong các subclass." }
  ],

  11: [
    { q: "Đa hình động (Dynamic Polymorphism) hoạt động dựa trên cơ chế nào ở runtime?", options: ["Method Overloading", "Method Overriding kết hợp Dynamic Binding của JVM", "Ép kiểu tự động (Widening casting)", "Sử dụng từ khóa static"], answer: 1, explanation: "Dynamic Polymorphism: subclass override method của superclass. JVM quyết định phương thức nào được gọi dựa trên kiểu thực tế của object ở runtime." },
    { q: "Upcasting trong Java là gì?", options: ["Ép kiểu từ kiểu nhỏ sang kiểu lớn (như int sang long)", "Gán đối tượng lớp con cho biến kiểu lớp cha - luôn an toàn", "Ép kiểu từ kiểu lớn sang kiểu nhỏ", "Gán đối tượng lớp cha cho biến lớp con"], answer: 1, explanation: "Upcasting: `Animal a = new Dog()` - gán Dog (lớp con) cho biến Animal (lớp cha). Luôn an toàn, Java tự động thực hiện." },
    { q: "Downcasting trong Java cần điều kiện gì để an toàn?", options: ["Không cần điều kiện", "Cần kiểm tra bằng `instanceof` trước khi ép kiểu", "Chỉ thực hiện với primitive types", "Chỉ thực hiện khi biên dịch"], answer: 1, explanation: "Downcasting (từ lớp cha về lớp con) có thể ném `ClassCastException` nếu object thực tế không phải kiểu đó. Nên kiểm tra `instanceof` trước." },
    { q: "Cho code: `Animal a = new Dog(); a.speak();` Phương thức `speak()` của class nào được gọi?", options: ["Animal.speak()", "Dog.speak()", "Object.speak()", "Lỗi biên dịch"], answer: 1, explanation: "Dù biến `a` khai báo kiểu Animal, đối tượng thực tế là Dog. JVM dùng Dynamic Binding để gọi `Dog.speak()` (nếu Dog đã override speak())." },
    { q: "Đa hình tĩnh (Static Polymorphism) được thực hiện thông qua cơ chế gì?", options: ["Method Overriding", "Method Overloading", "Dynamic Binding", "Interface"], answer: 1, explanation: "Static Polymorphism (đa hình biên dịch) thực hiện qua Overloading: cùng tên method nhưng khác tham số, quyết định tại compile time." },
    { q: "Tại sao Polymorphism hữu ích trong thiết kế hệ thống?", options: ["Giảm kích thước file .class", "Cho phép viết code tổng quát cho lớp cha, hoạt động đúng với bất kỳ lớp con nào", "Tăng tốc biên dịch", "Loại bỏ nhu cầu testing"], answer: 1, explanation: "Polymorphism giúp viết code linh hoạt: `List<Animal> animals` chứa Dog, Cat, Bird - và gọi `animal.speak()` sẽ hoạt động đúng cho từng loại." },
    { q: "Pattern nào sau đây tận dụng Polymorphism mạnh nhất?", options: ["Singleton Pattern", "Strategy Pattern - định nghĩa gia đình thuật toán qua interface và hoán đổi chúng tự do", "Builder Pattern", "Prototype Pattern"], answer: 1, explanation: "Strategy Pattern định nghĩa các thuật toán qua interface chung, sử dụng polymorphism để thay đổi hành vi tại runtime." },
    { q: "Biến tham chiếu kiểu lớp cha có thể gọi phương thức nào của lớp con?", options: ["Tất cả phương thức của lớp con", "Chỉ các phương thức đã được khai báo trong lớp cha (kể cả overridden methods)", "Không gọi được phương thức lớp con", "Chỉ phương thức static"], answer: 1, explanation: "Biến kiểu Animal chỉ 'thấy' các phương thức trong class Animal. Để gọi phương thức riêng của Dog, cần downcast về Dog." },
    { q: "Kết quả của `(new Dog() instanceof Animal)` nếu Dog extends Animal là gì?", options: ["false", "true", "Lỗi biên dịch", "null"], answer: 1, explanation: "`instanceof` kiểm tra quan hệ IS-A. Dog IS-A Animal (do kế thừa), nên `new Dog() instanceof Animal` = true." },
    { q: "Sự khác biệt giữa overriding và overloading?", options: ["Không có sự khác biệt", "Overriding: lớp con ghi đè phương thức lớp cha (runtime). Overloading: cùng class, cùng tên, khác tham số (compile time).", "Overloading xảy ra giữa hai class khác nhau", "Overriding chỉ dùng cho static method"], answer: 1, explanation: "Overriding = runtime polymorphism, giữa lớp cha và con. Overloading = compile-time polymorphism, trong cùng một class hoặc hierarchy." }
  ],

  12: [
    { q: "Phát biểu nào đúng về Interface trong Java?", options: ["Một class chỉ có thể implements một Interface.", "Interface không thể chứa phương thức có thân code.", "Interface cho phép đa kế thừa giao diện, và có default method từ Java 8.", "Tất cả biến trong Interface mặc định là private."], answer: 2, explanation: "Java 8 thêm default method và static method trong interface. Một class có thể implements nhiều interface (đa kế thừa giao diện)." },
    { q: "Abstract class khác Interface ở điểm nào cơ bản nhất?", options: ["Abstract class nhanh hơn Interface", "Abstract class có thể có state (biến instance) và constructor; Interface truyền thống chỉ có constants và abstract methods", "Interface không thể có phương thức", "Abstract class không thể có phương thức abstract"], answer: 1, explanation: "Abstract class: có thể có fields, constructor, mixed phương thức abstract và concrete. Interface: chủ yếu là contract, không có constructor, không có state (trước Java 8)." },
    { q: "Phương thức abstract bắt buộc được ghi đè bởi:", options: ["Bất kỳ class nào dùng nó", "Class con trực tiếp (nếu không phải abstract)", "Chỉ interface", "Chỉ phương thức cùng tên trong lớp cha"], answer: 1, explanation: "Concrete class (non-abstract) extends abstract class phải implement tất cả abstract methods. Nếu không, phải khai báo là abstract." },
    { q: "Từ khóa nào khai báo class trừu tượng trong Java?", options: ["interface", "abstract", "virtual", "base"], answer: 1, explanation: "Dùng từ khóa `abstract class ClassName {}`. Abstract class không thể tạo instance trực tiếp." },
    { q: "Có thể khởi tạo (instantiate) abstract class trực tiếp không?", options: ["Có, bình thường", "Không, phải thông qua anonymous class hoặc concrete subclass", "Có nhưng chỉ trong cùng package", "Chỉ được nếu không có abstract method"], answer: 1, explanation: "`new AbstractClass()` gây lỗi biên dịch. Phải tạo subclass và override tất cả abstract methods, hoặc dùng anonymous class." },
    { q: "Interface có thể có phương thức `default` từ Java 8. Điều này giải quyết vấn đề gì?", options: ["Tăng tốc độ chạy", "Cho phép thêm phương thức mới vào interface mà không phá vỡ các class đã implements nó", "Thay thế abstract class hoàn toàn", "Giảm boilerplate code trong subclass"], answer: 1, explanation: "Default methods giải quyết vấn đề backward compatibility: thêm method mới vào interface mà không buộc tất cả implementations phải cập nhật." },
    { q: "Tất cả biến trong interface có đặc tính gì?", options: ["private", "public final static (hằng số)", "protected", "Tùy thuộc khai báo"], answer: 1, explanation: "Mặc định, tất cả biến trong interface là `public static final` - tức là hằng số (constants) có thể gọi qua tên interface." },
    { q: "Functional Interface trong Java là gì?", options: ["Interface chứa method thực hiện tính toán", "Interface có đúng một abstract method - đủ điều kiện dùng với Lambda expression", "Interface extends từ Runnable", "Interface không có method"], answer: 1, explanation: "Functional interface có đúng 1 abstract method. Annotation `@FunctionalInterface` để compiler kiểm tra. Ví dụ: Runnable, Comparable, Function<T,R>." },
    { q: "Khi class implements nhiều interface có cùng default method, lỗi gì xảy ra?", options: ["Chạy bình thường, dùng phương thức của interface đầu tiên", "Lỗi biên dịch - class phải override phương thức đó để giải quyết xung đột", "JVM tự chọn ngẫu nhiên", "Không thể implements 2 interface có default method cùng tên"], answer: 1, explanation: "Java yêu cầu class giải quyết xung đột bằng cách override method đó, có thể dùng `InterfaceA.super.method()` để chỉ định dùng phiên bản nào." },
    { q: "Anonymous class trong Java là gì?", options: ["Class không có tên, định nghĩa và khởi tạo ngay tại nơi sử dụng", "Class bên trong một phương thức", "Class không có thuộc tính", "Abstract class không tên"], answer: 0, explanation: "Anonymous class không có tên, thường dùng để triển khai interface hoặc extend abstract class ngay tại điểm sử dụng, thay thế cho Lambda đơn giản." },
    { q: "Interface có thể extend interface khác không?", options: ["Không", "Có, và có thể extend nhiều interface (multiple inheritance)", "Có, nhưng chỉ một interface", "Chỉ trong cùng package"], answer: 1, explanation: "Interface có thể extends nhiều interface khác: `interface C extends A, B {}`. Đây là một hình thức đa kế thừa an toàn trong Java." }
  ],

  13: [
    { q: "Sự khác biệt chính giữa `List` và `Set` trong Java Collections Framework?", options: ["`List` cho phép trùng lặp và duy trì thứ tự; `Set` không cho phép trùng lặp.", "`List` chạy nhanh hơn `Set` trong mọi tìm kiếm.", "`Set` lưu Key-Value còn `List` lưu theo Index.", "`List` chỉ chứa String."], answer: 0, explanation: "`List` (ArrayList, LinkedList): cho phép phần tử trùng, có thứ tự, truy cập qua index. `Set` (HashSet, TreeSet): không trùng, không đảm bảo thứ tự (trừ TreeSet)." },
    { q: "HashMap và TreeMap khác nhau về điểm gì quan trọng?", options: ["HashMap nhanh hơn ở mọi thao tác", "HashMap không đảm bảo thứ tự key; TreeMap sắp xếp key theo natural order (hoặc Comparator)", "TreeMap chỉ chứa String key", "HashMap cho phép null key; TreeMap không"], answer: 1, explanation: "HashMap: O(1) lookup, không sắp xếp. TreeMap: O(log n) lookup, sắp xếp key tự động theo Comparable/Comparator." },
    { q: "Phương thức nào để thêm phần tử vào ArrayList?", options: ["insert()", "push()", "add()", "append()"], answer: 2, explanation: "`list.add(element)` thêm vào cuối. `list.add(index, element)` chèn vào vị trí cụ thể." },
    { q: "Độ phức tạp thời gian trung bình của HashMap.get(key) là gì?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "HashMap dùng hash table, lookup trung bình O(1). Trường hợp xấu nhất O(n) khi nhiều hash collision." },
    { q: "Collections.sort() hoạt động với điều kiện gì?", options: ["Chỉ với List<Integer>", "Elements phải implements Comparable, hoặc cung cấp Comparator", "Chỉ với ArrayList", "Không cần điều kiện gì"], answer: 1, explanation: "Để sort, Java cần biết cách so sánh 2 phần tử. Cách 1: element implements Comparable (natural ordering). Cách 2: cung cấp Comparator riêng." },
    { q: "LinkedList có ưu điểm gì so với ArrayList?", options: ["Truy cập ngẫu nhiên (random access) nhanh hơn", "Chèn/Xóa ở đầu/giữa nhanh hơn - O(1) nếu đã có iterator", "Tốn ít bộ nhớ hơn", "Hỗ trợ đa luồng tốt hơn"], answer: 1, explanation: "LinkedList: chèn/xóa O(1) khi đã có vị trí. ArrayList: chèn/xóa giữa phải dịch chuyển O(n) phần tử. ArrayList nhanh hơn với random access." },
    { q: "Iterator trong Java Collections dùng để làm gì?", options: ["Sắp xếp collection", "Duyệt qua các phần tử của collection một cách nhất quán", "Xóa toàn bộ collection", "Chuyển collection sang mảng"], answer: 1, explanation: "Iterator cung cấp cách duyệt qua collection mà không cần biết cấu trúc bên trong. Hỗ trợ `hasNext()`, `next()`, và `remove()` trong khi duyệt." },
    { q: "PriorityQueue trong Java hoạt động theo nguyên tắc nào?", options: ["FIFO - First In First Out", "LIFO - Last In First Out", "Phần tử có priority cao nhất (min-heap mặc định) được lấy ra trước", "Ngẫu nhiên"], answer: 2, explanation: "PriorityQueue là min-heap mặc định: phần tử nhỏ nhất (theo Comparable hoặc Comparator) được peek/poll trước. Dùng Collections.reverseOrder() cho max-heap." },
    { q: "Sự khác biệt giữa `remove(int index)` và `remove(Object o)` trong List?", options: ["Hoàn toàn giống nhau", "`remove(int)` xóa theo vị trí; `remove(Object)` xóa phần tử đầu tiên bằng value", "Chỉ có `remove(int)`", "`remove(Object)` nhanh hơn"], answer: 1, explanation: "Overloaded: `remove(5)` xóa phần tử tại index 5. `remove(Integer.valueOf(5))` hoặc `remove((Object)5)` xóa phần tử có giá trị = 5." },
    { q: "Khi nào nên dùng HashSet thay vì ArrayList?", options: ["Khi cần duy trì thứ tự chèn vào", "Khi cần kiểm tra nhanh xem phần tử có tồn tại không (O(1) contains), và không cần trùng lặp", "Khi cần truy cập qua index", "Khi cần lưu null"], answer: 1, explanation: "HashSet.contains() là O(1), ArrayList.contains() là O(n). Nếu hay kiểm tra membership và không cần thứ tự/index, dùng HashSet." },
    { q: "Phương thức `Map.getOrDefault(key, defaultValue)` trả về gì?", options: ["Luôn trả về defaultValue", "Giá trị của key nếu tồn tại, ngược lại trả về defaultValue", "null nếu key không tồn tại", "Ném NullPointerException nếu key không tồn tại"], answer: 1, explanation: "getOrDefault() an toàn hơn get(): nếu key tồn tại → trả value, nếu không → trả về giá trị mặc định, không ném exception." }
  ],

  14: [
    { q: "Checked Exception và Unchecked Exception khác nhau điểm gì?", options: ["Checked xảy ra khi biên dịch; Unchecked khi chạy.", "Checked bắt buộc phải xử lý (try-catch hoặc throws) ngay khi viết code; Unchecked thì không bắt buộc.", "Unchecked luôn làm treo máy.", "Checked kế thừa từ RuntimeException."], answer: 1, explanation: "Checked Exception: compiler bắt buộc xử lý (IOException, SQLException). Unchecked (RuntimeException): do lỗi lập trình, không bắt buộc khai báo." },
    { q: "Khối `finally` trong try-catch-finally chạy khi nào?", options: ["Chỉ khi có exception", "Chỉ khi không có exception", "Luôn chạy, dù có exception hay không (trừ khi JVM tắt)", "Chỉ khi exception được catch"], answer: 2, explanation: "`finally` luôn thực thi sau try-catch, dù exception có xảy ra hay không. Dùng để giải phóng tài nguyên (đóng file, connection)." },
    { q: "Lớp NullPointerException kế thừa từ lớp nào?", options: ["Exception", "Error", "RuntimeException", "Throwable trực tiếp"], answer: 2, explanation: "NullPointerException → RuntimeException → Exception → Throwable. Là Unchecked Exception do lỗi lập trình (truy cập null reference)." },
    { q: "Mệnh đề `throws` trong khai báo phương thức dùng để làm gì?", options: ["Ném exception ngay lập tức", "Khai báo rằng phương thức có thể ném ra exception, bên gọi phải xử lý", "Bắt exception", "Tạo exception mới"], answer: 1, explanation: "`throws ExceptionType` trong khai báo phương thức thông báo cho người dùng biết phương thức có thể ném exception đó, cần xử lý khi gọi." },
    { q: "Để tạo Custom Exception trong Java, phải làm gì?", options: ["Implement ExceptionInterface", "Extends Exception (checked) hoặc RuntimeException (unchecked)", "Dùng annotation @Exception", "Không thể tạo custom exception"], answer: 1, explanation: "Custom exception: `class InsufficientFundsException extends RuntimeException { ... }`. Mở rộng từ Exception hoặc RuntimeException." },
    { q: "Câu lệnh `throw new IOException(\"File not found\")` làm gì?", options: ["Khai báo phương thức có thể ném IOException", "Tạo và ném exception ngay lập tức, dừng luồng thực thi hiện tại", "Bắt IOException", "In thông báo lỗi"], answer: 1, explanation: "`throw` (không phải `throws`) ném exception ngay tại điểm đó. Luồng thực thi dừng và stack unwinding bắt đầu tìm catch block phù hợp." },
    { q: "Có thể catch nhiều exception trong một block không?", options: ["Không", "Có, dùng `catch (ExA | ExB e)` từ Java 7", "Có, nhưng phải là cùng hierachy", "Chỉ được catch một exception mỗi try"], answer: 1, explanation: "Multi-catch (Java 7+): `catch (IOException | SQLException e)` bắt nhiều exception trong một block, code gọn hơn." },
    { q: "Error trong Java (như OutOfMemoryError) khác Exception ở điểm gì?", options: ["Error là checked, Exception là unchecked", "Error chỉ xảy ra khi biên dịch", "Error đại diện lỗi nghiêm trọng từ JVM/system mà chương trình không thể phục hồi; không nên catch", "Error kế thừa từ Exception"], answer: 2, explanation: "Error (StackOverflowError, OutOfMemoryError) là vấn đề nghiêm trọng của JVM. Không nên catch vì không phục hồi được. Cả Error và Exception đều extends Throwable." },
    { q: "Try-with-resources (Java 7+) có ưu điểm gì?", options: ["Code chạy nhanh hơn", "Tự động đóng resource sau try, không cần viết finally", "Ngăn chặn exception", "Cho phép nhiều exception trong một catch"], answer: 1, explanation: "`try(Resource r = new Resource())` tự động gọi `r.close()` sau khi thoát khỏi try, kể cả khi có exception." },
    { q: "getMessage() và printStackTrace() khác nhau thế nào?", options: ["Hoàn toàn giống nhau", "getMessage() trả về chuỗi mô tả lỗi; printStackTrace() in toàn bộ call stack ra console", "printStackTrace() nhanh hơn", "getMessage() chỉ dùng cho custom exception"], answer: 1, explanation: "getMessage(): trả về String thông điệp lỗi. printStackTrace(): in call stack chi tiết giúp debug, thấy được luồng gọi phương thức dẫn đến exception." }
  ],

  15: [
    { q: "Try-with-resources (Java 7) có ưu điểm vượt trội gì khi xử lý File I/O?", options: ["Giúp file đọc nhanh gấp đôi.", "Tự động đóng (close) tài nguyên sau khi kết thúc khối try, tránh rò rỉ bộ nhớ.", "Ngăn FileNotFoundException.", "Không cần khai báo Exception."], answer: 1, explanation: "Resource khai báo trong `try(...)` tự động được đóng khi thoát, dù có exception hay không. Resource phải implements AutoCloseable." },
    { q: "Sự khác biệt giữa FileReader và BufferedReader là gì?", options: ["Không có sự khác biệt", "FileReader đọc từng ký tự; BufferedReader đọc từng dòng, nhanh hơn nhờ buffer", "BufferedReader chỉ đọc binary", "FileReader chỉ dùng với UTF-8"], answer: 1, explanation: "FileReader: đọc character by character (chậm). BufferedReader bao bọc FileReader, đọc dữ liệu theo block vào buffer (nhanh hơn nhiều), cung cấp readLine()." },
    { q: "Lớp `Path` trong NIO2 (java.nio.file) dùng để làm gì?", options: ["Kết nối đến database", "Biểu diễn đường dẫn file/directory trên hệ thống tệp", "Đọc nội dung file", "Tạo thread mới"], answer: 1, explanation: "Path (NIO2, Java 7+) thay thế File class cũ, biểu diễn đường dẫn. Dùng cùng `Files` class utility để thao tác file." },
    { q: "Files.readAllLines() và Files.lines() khác nhau thế nào?", options: ["Hoàn toàn giống nhau", "readAllLines() nạp toàn bộ file vào List<String>; lines() trả về Stream lazy (đọc từng dòng khi cần)", "lines() chỉ đọc 100 dòng đầu", "readAllLines() không hỗ trợ UTF-8"], answer: 1, explanation: "readAllLines(): nạp hết file vào RAM (file nhỏ). lines(): Stream lazy, tiết kiệm memory với file lớn vì đọc từng dòng khi stream consume." },
    { q: "Để ghi dữ liệu vào file và nối tiếp (append) thay vì ghi đè, cần làm gì?", options: ["Dùng FileWriter với tham số append = true", "Dùng FileReader", "Không thể append trong Java", "Phải đọc file cũ rồi ghi lại toàn bộ"], answer: 0, explanation: "`new FileWriter(\"file.txt\", true)` mở file với chế độ append. Không truyền tham số boolean hoặc false sẽ ghi đè." },
    { q: "Serialization trong Java là gì?", options: ["Chuyển đổi dữ liệu sang XML", "Chuyển đổi đối tượng Java thành dạng byte để lưu trữ hoặc truyền qua mạng", "Đọc file nhị phân", "Nén file để tiết kiệm dung lượng"], answer: 1, explanation: "Serialization: object → byte stream (lưu file, truyền mạng). Deserialization: byte stream → object. Class phải implements `Serializable`." },
    { q: "Lớp `Files` trong java.nio.file cung cấp gì?", options: ["Tạo socket network", "Static utility methods để thao tác file/directory (copy, move, delete, readAllBytes...)", "GUI components", "Database connection"], answer: 1, explanation: "`Files` class cung cấp các static method tiện lợi: `Files.copy()`, `Files.move()`, `Files.delete()`, `Files.exists()`, `Files.readAllBytes()`..." },
    { q: "Khi nào nên dùng FileOutputStream thay vì FileWriter?", options: ["Khi cần đọc file", "Khi ghi dữ liệu binary (ảnh, âm thanh, file zip) thay vì text", "Khi cần append", "Khi cần ghi UTF-8"], answer: 1, explanation: "FileOutputStream: ghi raw bytes (binary). FileWriter: ghi characters (text). Dùng Writer cho text, Stream cho binary." },
    { q: "Path.of(\"C:/Users\", \"file.txt\") tạo ra đường dẫn nào?", options: ["C:/Users", "file.txt", "C:/Users/file.txt", "Lỗi"], answer: 2, explanation: "`Path.of()` (Java 11+) nối các phần đường dẫn lại. `Path.of(\"C:/Users\", \"file.txt\")` → `C:\\Users\\file.txt` (trên Windows)." },
    { q: "Phương thức `Files.createDirectories(path)` làm gì?", options: ["Tạo một file mới", "Tạo directory và tất cả directory cha chưa tồn tại", "Liệt kê các file trong directory", "Xóa directory"], answer: 1, explanation: "`createDirectories()` tạo toàn bộ cây thư mục. Khác `createDirectory()` (chỉ tạo 1 cấp và báo lỗi nếu cha chưa tồn tại)." }
  ],

  16: [
    { q: "Wildcard `<? extends T>` trong Generics có nghĩa là gì?", options: ["Chấp nhận kiểu T hoặc kiểu cha của T.", "Chấp nhận kiểu T hoặc bất kỳ subtype (lớp con) của T.", "Chỉ chấp nhận đúng kiểu T.", "Chấp nhận mọi kiểu ngoại trừ T."], answer: 1, explanation: "`<? extends T>` (Upper Bounded Wildcard): chấp nhận T và các subtype của T. Dùng để đọc dữ liệu (Producer Extends)." },
    { q: "Tại sao Java Generics dùng Type Erasure (xóa kiểu) ở runtime?", options: ["Để tăng tốc chạy chương trình", "Để tương thích ngược với code Java cũ không dùng generics (backward compatibility)", "Để giảm kích thước bytecode", "Vì JVM không hỗ trợ generic types"], answer: 1, explanation: "Type information bị xóa ở compile time để duy trì tương thích ngược với Java < 1.5. Ở runtime, `List<String>` và `List<Integer>` đều là `List`." },
    { q: "Phương thức generic trong Java khai báo type parameter ở đâu?", options: ["Sau tên phương thức", "Trước kiểu trả về: `<T> T methodName()`", "Trong body phương thức", "Trong parameter list"], answer: 1, explanation: "Generic method: `public <T> T identity(T item) { return item; }`. Type parameter `<T>` khai báo trước return type." },
    { q: "`List<?>` (Unbounded Wildcard) có thể làm gì?", options: ["Thêm bất kỳ phần tử nào vào list", "Đọc phần tử dưới dạng Object, nhưng không thể thêm phần tử (trừ null)", "Không làm được gì", "Thêm Object nhưng không đọc được"], answer: 1, explanation: "`List<?>` có thể đọc phần tử (as Object), không thể add (vì không biết kiểu cụ thể). Dùng khi method nhận bất kỳ List nào." },
    { q: "`<? super T>` (Lower Bounded Wildcard) dùng cho mục đích gì?", options: ["Đọc dữ liệu an toàn", "Ghi dữ liệu an toàn - chấp nhận T và supertype của T", "Chỉ dùng với Collection", "Kiểm tra kiểu dữ liệu"], answer: 1, explanation: "`<? super T>`: chấp nhận T và các supertype của T. Dùng để ghi (Consumer Super). Nguyên tắc PECS: Producer Extends, Consumer Super." },
    { q: "Bounded Type Parameter `<T extends Comparable<T>>` có nghĩa gì?", options: ["T phải extend Comparable", "T phải là lớp con của Comparable, đảm bảo T có phương thức compareTo()", "T phải là interface", "T không thể là primitive"], answer: 1, explanation: "`<T extends Comparable<T>>` ràng buộc T phải implements Comparable, đảm bảo có thể so sánh hai đối tượng T với nhau bằng compareTo()." },
    { q: "Không thể làm gì với Java Generics do Type Erasure?", options: ["Tạo List<String>", "Tạo generic class", "Tạo instance của type parameter: `new T()` hoặc `new T[10]`", "Dùng generic method"], answer: 2, explanation: "Do type erasure, JVM không biết T là gì lúc runtime, nên không thể `new T()` hay `new T[10]`. Phải dùng Reflection hoặc truyền `Class<T>` vào." },
    { q: "Generic class `class Pair<A, B>` khai báo đúng cách nào?", options: ["class Pair { A first; B second; }", "class Pair<A, B> { A first; B second; }", "class<A,B> Pair { }", "Pair<A, B> class { }"], answer: 1, explanation: "Type parameters khai báo sau tên class trong `<>`. `class Pair<A, B>` khai báo 2 type parameters A và B." },
    { q: "Tại sao không thể dùng primitive type (int, double) với Generics?", options: ["Vì Java không hỗ trợ số với generics", "Vì type erasure dùng Object, và primitive không phải Object. Phải dùng wrapper class (Integer, Double)", "Vì primitive không có phương thức", "Vì giới hạn của JVM"], answer: 1, explanation: "Generics dùng Object làm kiểu cơ sở (sau type erasure). int, double... không phải Object. Dùng Integer, Double (autoboxing/unboxing tự động)." },
    { q: "Wildcard `List<? extends Number>` có thể gán từ loại nào?", options: ["Chỉ List<Number>", "List<Number>, List<Integer>, List<Double>, List<Long>...", "List<Object>", "Bất kỳ List nào"], answer: 1, explanation: "`List<? extends Number>` chấp nhận bất kỳ List với generic type là Number hoặc subtype: Integer, Double, Long, Float, BigInteger..." }
  ],

  17: [
    { q: "Functional Interface đủ điều kiện dùng Lambda là gì?", options: ["Interface chứa đúng một phương thức abstract (không kể default/static).", "Interface không chứa phương thức.", "Interface được đánh dấu @FunctionalInterface và chứa tối đa 3 abstract method.", "Interface có tất cả phương thức là default."], answer: 0, explanation: "Functional Interface: đúng 1 abstract method. @FunctionalInterface là annotation tùy chọn để compiler kiểm tra." },
    { q: "Lambda expression `(x) -> x * 2` biểu diễn điều gì?", options: ["Khai báo biến x", "Một hàm ẩn danh nhận tham số x và trả về x * 2", "Vòng lặp nhân đôi", "Khai báo một interface"], answer: 1, explanation: "Lambda `(params) -> body` là anonymous function. `(x) -> x * 2` nhận x và trả về x*2, không cần khai báo kiểu tường minh." },
    { q: "Function<T, R> trong java.util.function biểu diễn gì?", options: ["Hàm không có tham số và không trả về", "Hàm nhận đầu vào kiểu T và trả về kiểu R", "Hàm nhận 2 tham số", "Hàm trả về boolean"], answer: 1, explanation: "`Function<T, R>` có method `apply(T t) -> R`. Dùng để transform/map dữ liệu từ kiểu T sang R." },
    { q: "Predicate<T> trong java.util.function biểu diễn gì?", options: ["Hàm trả về T", "Hàm kiểm tra điều kiện, nhận T và trả về boolean", "Hàm không có tham số", "Hàm tạo đối tượng T"], answer: 1, explanation: "`Predicate<T>` có method `test(T t) -> boolean`. Dùng trong filter(), removeIf()... để kiểm tra điều kiện." },
    { q: "Consumer<T> trong java.util.function biểu diễn gì?", options: ["Hàm tạo T từ không có gì", "Hàm nhận T và không trả về gì (void)", "Hàm trả về T", "Hàm nhận 2 tham số"], answer: 1, explanation: "`Consumer<T>` có method `accept(T t) -> void`. Dùng trong forEach() để thực hiện side effect." },
    { q: "Supplier<T> trong java.util.function biểu diễn gì?", options: ["Hàm nhận T và trả về void", "Hàm không có tham số nhưng trả về T", "Hàm biến đổi T thành R", "Hàm kiểm tra điều kiện"], answer: 1, explanation: "`Supplier<T>` có method `get() -> T`. Không nhận tham số, cung cấp (supply) giá trị. Dùng cho lazy evaluation." },
    { q: "Method reference `String::toUpperCase` tương đương Lambda nào?", options: ["() -> String.toUpperCase()", "s -> s.toUpperCase()", "String -> toUpperCase", "s -> String.toUpperCase(s)"], answer: 1, explanation: "`String::toUpperCase` là instance method reference tương đương `s -> s.toUpperCase()`. Java tự động ánh xạ." },
    { q: "Cú pháp Lambda có block body `(x) -> { ... return ...; }` cần điều gì?", options: ["Không cần return", "Bắt buộc có lệnh return nếu phương thức trả về giá trị", "Không thể có nhiều câu lệnh trong lambda", "Phải dùng yield thay vì return"], answer: 1, explanation: "Lambda với block body `{}` hoạt động như phương thức bình thường, cần `return` nếu có kiểu trả về." },
    { q: "BiFunction<T, U, R> trong java.util.function nhận bao nhiêu tham số?", options: ["1 tham số", "2 tham số (T và U), trả về R", "3 tham số", "Không có tham số"], answer: 1, explanation: "`BiFunction<T, U, R>` có method `apply(T t, U u) -> R`. Xử lý 2 đầu vào và trả về 1 kết quả." },
    { q: "Lambda expression có thể bắt (capture) biến nào từ scope bên ngoài?", options: ["Mọi biến", "Chỉ biến local là effectively final (không bị thay đổi sau khi khai báo)", "Chỉ biến static", "Không thể bắt biến nào"], answer: 1, explanation: "Lambda capture biến local là effectively final (không bị reassign dù không khai báo final). Biến instance và static thì có thể capture và sửa." },
    { q: "Compose method trong Function<T,R> dùng để làm gì?", options: ["Tạo Function mới", "Kết hợp hai Function: f.compose(g) = f(g(x)) - áp dụng g trước, rồi f", "So sánh hai Function", "Kiểm tra kiểu tham số"], answer: 1, explanation: "`f.andThen(g)` = g(f(x)). `f.compose(g)` = f(g(x)). Dùng để chain nhiều transform lại." }
  ],

  18: [
    { q: "Trong Stream API, thao tác nào là Intermediate Operation trả về Stream mới?", options: ["forEach", "collect", "filter", "reduce"], answer: 2, explanation: "`filter`, `map`, `sorted`, `limit`, `distinct` là intermediate operations (trả về Stream). `forEach`, `collect`, `count`, `reduce` là terminal operations." },
    { q: "Terminal Operation trong Stream làm gì?", options: ["Trả về Stream mới", "Kết thúc Stream pipeline và tạo ra kết quả (List, int, boolean...)", "Tạo Stream ban đầu", "Sắp xếp dữ liệu"], answer: 1, explanation: "Terminal operation kích hoạt toàn bộ pipeline và tạo kết quả cụ thể. Sau đó Stream không dùng được nữa." },
    { q: "Stream trong Java có đặc tính gì đặc biệt?", options: ["Lưu trữ dữ liệu như Collection", "Lazy evaluation: intermediate operations chỉ chạy khi có terminal operation", "Có thể reuse sau khi terminal", "Chỉ xử lý số nguyên"], answer: 1, explanation: "Stream lazy: intermediate operations không thực sự chạy ngay. Chỉ khi có terminal operation mới kích hoạt pipeline. Tối ưu hóa hiệu suất." },
    { q: "Stream.filter(predicate) làm gì?", options: ["Sửa đổi phần tử", "Giữ lại các phần tử thỏa mãn điều kiện predicate", "Xóa tất cả phần tử", "Sắp xếp stream"], answer: 1, explanation: "`filter()` tạo Stream mới chỉ chứa các phần tử mà predicate trả về true." },
    { q: "Stream.map(function) làm gì?", options: ["Lọc phần tử", "Biến đổi mỗi phần tử từ kiểu này sang kiểu khác", "Kết hợp hai stream", "Đếm số phần tử"], answer: 1, explanation: "`map(f)` áp dụng function f lên mỗi phần tử, tạo Stream kết quả mới với kiểu có thể khác kiểu gốc." },
    { q: "Collectors.toList() trong Stream.collect() dùng để làm gì?", options: ["Đếm phần tử", "Thu gom các phần tử Stream thành một List", "Sắp xếp Stream", "Lọc Stream"], answer: 1, explanation: "`stream.collect(Collectors.toList())` là cách phổ biến để chuyển Stream về List. Java 16+ có `stream.toList()`." },
    { q: "Optional<T> trong Java dùng để giải quyết vấn đề gì?", options: ["Tăng tốc xử lý", "Đại diện cho giá trị có thể có hoặc không, tránh NullPointerException", "Lưu trữ collection", "Tạo lazy evaluation"], answer: 1, explanation: "Optional là container có thể empty hoặc chứa giá trị, buộc developer phải xử lý trường hợp null một cách tường minh." },
    { q: "Stream.reduce(identity, accumulator) làm gì?", options: ["Lọc phần tử", "Kết hợp tất cả phần tử thành một giá trị duy nhất", "Nhân đôi stream", "Sắp xếp stream"], answer: 1, explanation: "`reduce()` fold stream thành một giá trị: tổng, tích, max, min... Identity là giá trị ban đầu." },
    { q: "Stream.flatMap() dùng khi nào?", options: ["Khi cần lọc Stream", "Khi mỗi phần tử ánh xạ sang Stream và cần làm phẳng (flatten) kết quả thành một Stream", "Khi cần map về String", "Khi cần sort"], answer: 1, explanation: "`flatMap()` áp dụng function trả về Stream rồi flatten: `List<List<T>>` → `Stream<T>`. Hữu ích khi map tạo collection." },
    { q: "Phương thức Optional.orElse(defaultValue) làm gì?", options: ["Ném exception nếu empty", "Trả về giá trị nếu có, hoặc defaultValue nếu empty", "Luôn trả về defaultValue", "Kiểm tra empty"], answer: 1, explanation: "`orElse(T)`: trả về value nếu present, ngược lại trả về default. Khác `orElseGet(Supplier)` là lazy evaluation." },
    { q: "Parallel Stream trong Java dùng để làm gì?", options: ["Stream tuần tự trên một luồng", "Xử lý song song trên nhiều CPU core để tăng tốc với dữ liệu lớn", "Stream chỉ xử lý số", "Stream không có terminal operation"], answer: 1, explanation: "`parallelStream()` hoặc `stream().parallel()` xử lý song song dùng Fork/Join Framework. Tăng tốc với dữ liệu lớn nhưng cần cẩn thận với thread-safety." }
  ],

  19: [
    { q: "Từ khóa `synchronized` trong đa luồng giải quyết vấn đề gì?", options: ["Làm luồng chạy nhanh hơn.", "Ngăn Race Condition bằng cách chỉ cho một luồng vào Critical Section tại một thời điểm.", "Buộc luồng dừng hoạt động.", "Tự động chia sẻ RAM cho luồng khác."], answer: 1, explanation: "`synchronized` thiết lập Monitor lock. Chỉ một luồng chiếm lock tại một thời điểm, các luồng khác phải đợi." },
    { q: "Cách tạo Thread trong Java bằng cách extend Thread có điểm hạn chế gì?", options: ["Không thể override run()", "Class đó không thể extend class khác (Java không có đa kế thừa)", "Thread không chạy được", "Phải gọi start() nhiều lần"], answer: 1, explanation: "Extend Thread → class mất slot kế thừa duy nhất. Thường khuyên implements Runnable để linh hoạt hơn." },
    { q: "Sự khác biệt giữa `start()` và `run()` của Thread?", options: ["Giống nhau hoàn toàn", "start() tạo thread mới và gọi run() trong thread đó; gọi run() trực tiếp chỉ chạy trong thread hiện tại", "run() nhanh hơn start()", "start() chạy background, run() chạy foreground"], answer: 1, explanation: "`start()` yêu cầu JVM tạo OS thread mới rồi gọi run() trong thread đó. Gọi `run()` trực tiếp là gọi phương thức bình thường, không tạo thread mới." },
    { q: "volatile keyword trong Java làm gì?", options: ["Tăng tốc biến", "Đảm bảo thay đổi biến từ một luồng được nhìn thấy ngay bởi các luồng khác (memory visibility)", "Ngăn luồng khác đọc biến", "Xóa biến sau khi dùng"], answer: 1, explanation: "`volatile` đảm bảo biến được đọc/ghi từ main memory, không từ CPU cache. Tránh visibility issue nhưng không đảm bảo atomic." },
    { q: "Deadlock trong Java là gì?", options: ["Một luồng chạy quá lâu", "Hai hay nhiều luồng chờ nhau giải phóng lock, dẫn đến tất cả bị block vĩnh viễn", "Bộ nhớ bị đầy", "Thread chạy trước main()"], answer: 1, explanation: "Deadlock: Thread A giữ lock 1, chờ lock 2; Thread B giữ lock 2, chờ lock 1. Cả hai chờ mãi mãi." },
    { q: "ExecutorService trong java.util.concurrent dùng để làm gì?", options: ["Tạo GUI", "Quản lý pool của thread, submit task và xử lý kết quả một cách có kiểm soát", "Đọc file", "Kết nối database"], answer: 1, explanation: "ExecutorService quản lý thread pool: tái sử dụng thread, giới hạn số thread, xử lý kết quả qua Future." },
    { q: "Callable<T> khác Runnable ở điểm gì?", options: ["Callable nhanh hơn", "Callable có thể trả về kết quả (Future<T>) và ném checked exception; Runnable không", "Runnable không tạo thread", "Callable chỉ chạy một lần"], answer: 1, explanation: "Runnable: `run()` void, không ném checked exception. Callable: `call()` trả về T và có thể ném Exception. Dùng với ExecutorService.submit()." },
    { q: "Phương thức `Thread.sleep(milliseconds)` làm gì?", options: ["Kết thúc thread", "Tạm dừng thread hiện tại trong khoảng thời gian chỉ định (không giải phóng lock)", "Tạm dừng tất cả thread", "Tạo thread mới sau đó ngủ"], answer: 1, explanation: "`sleep()` tạm dừng thread hiện tại, không giải phóng lock đang giữ. Khác với `wait()` - giải phóng lock và chờ notify." },
    { q: "AtomicInteger trong java.util.concurrent.atomic dùng để làm gì?", options: ["Tạo số nguyên bất biến", "Cung cấp thao tác atomic (thread-safe) trên int mà không cần synchronized", "Làm số nguyên lớn hơn Integer.MAX_VALUE", "Lưu số nguyên trong database"], answer: 1, explanation: "AtomicInteger cung cấp incrementAndGet(), compareAndSet()... là atomic operations không cần synchronized, hiệu suất cao hơn." },
    { q: "Race Condition trong lập trình đa luồng xảy ra khi nào?", options: ["Khi thread chạy quá nhanh", "Khi nhiều thread đồng thời đọc và ghi shared data mà không có đồng bộ hóa, dẫn đến kết quả không xác định", "Khi CPU quá tải", "Khi dùng quá nhiều thread"], answer: 1, explanation: "Race Condition: kết quả phụ thuộc vào thứ tự thực thi thread - không xác định được. Cần synchronized/Lock/Atomic để tránh." }
  ],

  20: [
    { q: "Design Pattern nào đảm bảo một class chỉ có duy nhất một object?", options: ["Factory Method", "Builder", "Singleton", "Observer"], answer: 2, explanation: "Singleton: private constructor + static instance + static getInstance(). Đảm bảo toàn ứng dụng chỉ có một instance duy nhất." },
    { q: "Factory Method Pattern giải quyết vấn đề gì?", options: ["Tạo object mà không expose logic tạo", "Giảm số lượng class", "Tăng tốc tạo object", "Kết hợp nhiều object"], answer: 0, explanation: "Factory Method: định nghĩa interface tạo object nhưng để subclass quyết định class nào được tạo. Loại bỏ tight coupling với concrete class." },
    { q: "Observer Pattern dùng để làm gì?", options: ["Tạo đối tượng phức tạp", "Thiết lập mối quan hệ one-to-many: khi object thay đổi, tất cả dependents được thông báo tự động", "Cache dữ liệu", "Mã hóa dữ liệu"], answer: 1, explanation: "Observer: Subject duy trì danh sách Observer. Khi state thay đổi, notify tất cả. Ví dụ: event listeners, MVC." },
    { q: "Builder Pattern hữu ích khi nào?", options: ["Khi class có ít thuộc tính", "Khi tạo đối tượng phức tạp có nhiều tham số tùy chọn, tránh telescoping constructors", "Khi cần tạo nhiều instance", "Khi class có nhiều subclass"], answer: 1, explanation: "Builder tách quá trình xây dựng khỏi biểu diễn. Giải quyết problem nhiều optional params, code readable hơn." },
    { q: "Strategy Pattern dùng để làm gì?", options: ["Tạo chỉ một object", "Định nghĩa gia đình thuật toán, đóng gói từng thuật toán, cho phép hoán đổi tại runtime", "Quan sát thay đổi state", "Tạo object phức tạp"], answer: 1, explanation: "Strategy: định nghĩa interface thuật toán, các class implement cụ thể. Client chọn strategy tại runtime." },
    { q: "Decorator Pattern làm gì?", options: ["Giảm số lượng class", "Thêm trách nhiệm động vào object mà không thay đổi class gốc, thay thế subclassing", "Tạo copy của object", "Quản lý lifecycle"], answer: 1, explanation: "Decorator bọc object trong wrapper, thêm behavior. Linh hoạt hơn inheritance: kết hợp nhiều decorator." },
    { q: "Các Design Pattern được chia thành mấy nhóm chính?", options: ["2 nhóm", "3 nhóm: Creational, Structural, Behavioral", "4 nhóm", "5 nhóm"], answer: 1, explanation: "GoF (Gang of Four): 23 patterns chia 3 nhóm. Creational (tạo object), Structural (tổ chức class/object), Behavioral (giao tiếp giữa object)." },
    { q: "Adapter Pattern dùng để làm gì?", options: ["Giảm số object", "Làm cho interface không tương thích có thể làm việc cùng nhau", "Tăng hiệu suất", "Cache kết quả"], answer: 1, explanation: "Adapter (Wrapper): chuyển đổi interface của class sang interface khác. Giúp các class không tương thích cộng tác được." },
    { q: "Template Method Pattern hoạt động như thế nào?", options: ["Tạo template đối tượng", "Định nghĩa skeleton của algorithm trong lớp cha, để lớp con điền vào các bước cụ thể", "Copy object từ template", "Tạo nhiều instance từ template"], answer: 1, explanation: "Template Method: abstract class định nghĩa bộ khung (template) của thuật toán. Subclass implement các bước abstract cụ thể." },
    { q: "Proxy Pattern dùng để làm gì?", options: ["Nhân bản object", "Cung cấp đại diện (surrogate) cho object khác để kiểm soát truy cập", "Tạo nhiều instance", "Kết hợp interface"], answer: 1, explanation: "Proxy: đối tượng đại diện kiểm soát truy cập vào real object. Dùng cho: lazy init, access control, logging, caching." }
  ],

  21: [
    { q: "Java Reflection API cho phép làm gì ở runtime?", options: ["Biên dịch lại mã nguồn đang chạy.", "Kiểm tra cấu trúc class, truy cập/chỉnh sửa field và gọi method động, kể cả private.", "Chỉ đọc Annotation.", "Tăng tốc chương trình bằng cách bypass JVM."], answer: 1, explanation: "Reflection: inspect class structure, invoke methods, access fields tại runtime. Dùng Class.forName(), getDeclaredMethods()..." },
    { q: "Annotation `@Retention(RetentionPolicy.RUNTIME)` có nghĩa gì?", options: ["Annotation chỉ tồn tại trong source code", "Annotation tồn tại đến runtime và có thể đọc qua Reflection", "Annotation bị xóa sau compile", "Annotation chỉ cho compiler"], answer: 1, explanation: "RetentionPolicy.RUNTIME: annotation được lưu trong bytecode và có thể đọc bằng Reflection khi chạy. SOURCE và CLASS thì không." },
    { q: "Để lấy Class object của String tại runtime, dùng cách nào?", options: ["String.getClass()", "String.class hoặc Class.forName(\"java.lang.String\")", "new Class(String)", "ClassLoader.load(String)"], answer: 1, explanation: "Cách 1: `String.class` (biết kiểu tại compile time). Cách 2: `Class.forName(\"java.lang.String\")` (biết tên class là String lúc runtime)." },
    { q: "setAccessible(true) trong Reflection dùng để làm gì?", options: ["Tăng quyền truy cập Java application", "Bỏ qua kiểm tra access modifier, cho phép truy cập field/method private", "Tạo object không cần constructor", "Gọi native methods"], answer: 1, explanation: "`field.setAccessible(true)` bỏ qua `private` modifier, cho phép đọc/ghi. Dùng trong framework, testing." },
    { q: "Custom Annotation trong Java tạo bằng cú pháp nào?", options: ["class @MyAnnotation {}", "@interface MyAnnotation {}", "annotation MyAnnotation {}", "@Annotation class MyAnnotation {}"], answer: 1, explanation: "Custom annotation dùng `@interface`: `public @interface MyAnnotation { String value(); }`. Các element là methods." },
    { q: "@Target annotation trong Java dùng để làm gì?", options: ["Chỉ định ai có thể dùng annotation này", "Chỉ định annotation có thể áp dụng ở đâu (class, method, field, parameter...)", "Xác định thời gian sống của annotation", "Đặt tên cho annotation"], answer: 1, explanation: "`@Target(ElementType.METHOD)` chỉ annotation có thể dùng trên method. `ElementType.TYPE` cho class, `FIELD` cho field..." },
    { q: "getDeclaredMethods() khác getMethods() như thế nào?", options: ["Hoàn toàn giống nhau", "getDeclaredMethods(): tất cả method của class (kể cả private), không kể inherited. getMethods(): chỉ public methods kể cả inherited.", "getMethods(): nhanh hơn", "getDeclaredMethods(): chỉ public methods"], answer: 1, explanation: "getDeclaredMethods(): tất cả methods của class (public/protected/private/package), không bao gồm inherited. getMethods(): public methods kể cả từ superclass." },
    { q: "Reflection có nhược điểm gì?", options: ["Không có nhược điểm", "Chậm hơn direct invocation, bypass type-safety, có thể vi phạm encapsulation và security", "Chỉ dùng được với primitive", "Không dùng được với Collections"], answer: 1, explanation: "Reflection chậm hơn, bypass compile-time checks, khó đọc code, có thể vi phạm encapsulation. Chỉ dùng khi thực sự cần (frameworks, tools)." },
    { q: "Framework nào trong Java sử dụng Reflection nhiều nhất?", options: ["Java Collections", "Spring (DI/IoC), Hibernate (ORM), JUnit (test runner)", "Java Streams", "JavaFX"], answer: 1, explanation: "Spring dùng Reflection để inject dependencies, scan annotations. Hibernate map entity class sang table. JUnit tìm và chạy @Test methods." },
    { q: "Annotation `@Deprecated` thông báo điều gì?", options: ["Phương thức bị xóa khỏi Java", "API đó lỗi thời, không nên dùng, có thể bị xóa trong tương lai", "Phương thức có bug", "Phương thức private"], answer: 1, explanation: "`@Deprecated` đánh dấu API lỗi thời. Compiler sẽ warning khi dùng. Nên dùng replacement mới hơn." }
  ],

  22: [
    { q: "Vùng nhớ nào của JVM lưu biến cục bộ và khung ngăn xếp phương thức?", options: ["Heap Area", "Method Area", "Stack Area (JVM Stacks)", "PC Register"], answer: 2, explanation: "JVM Stack: mỗi thread có Stack riêng. Mỗi lần gọi method tạo Stack Frame chứa local variables, operand stack, frame data." },
    { q: "Garbage Collector trong Java hoạt động như thế nào?", options: ["Lập trình viên phải gọi delete() khi dùng xong", "JVM tự động phát hiện và thu hồi bộ nhớ của object không còn được tham chiếu", "Xóa tất cả object sau khi chương trình kết thúc", "Chỉ hoạt động khi gọi System.gc()"], answer: 1, explanation: "GC tự động phát hiện unreachable objects (không còn reference nào trỏ vào) và thu hồi bộ nhớ. Giải phóng lập trình viên khỏi quản lý bộ nhớ thủ công." },
    { q: "JIT (Just-In-Time) Compiler trong JVM làm gì?", options: ["Biên dịch .java sang .class", "Biên dịch bytecode sang mã máy native tại runtime để tăng tốc độ thực thi", "Kiểm tra lỗi cú pháp", "Nén bytecode"], answer: 1, explanation: "JIT profiling code và biên dịch hot spots (đoạn code chạy nhiều) thành native code, lưu cache. Lần sau chạy trực tiếp mã máy, nhanh hơn nhiều." },
    { q: "StackOverflowError xảy ra khi nào?", options: ["Bộ nhớ Heap hết", "Stack tràn do đệ quy quá sâu hoặc vô hạn", "Nhiều thread cùng chạy", "Class không tìm thấy"], answer: 1, explanation: "Mỗi method call tạo Stack Frame. Đệ quy vô hạn hay quá sâu sẽ đẩy quá nhiều Frame vào Stack cho đến khi Stack overflow." },
    { q: "Method Area (Metaspace) trong JVM lưu trữ gì?", options: ["Instance variables của object", "Local variables của method", "Class metadata, static variables, bytecode của methods", "PC Register value"], answer: 2, explanation: "Method Area (Java 8+: Metaspace): chứa class structure (fields, methods, code), static variables, constant pool. Chia sẻ giữa tất cả threads." },
    { q: "Heap trong JVM được chia thành các vùng nào (trong GC thế hệ)?", options: ["Eden, Survivor, Tenured (Old Gen)", "New, Old, Permanent", "Young, Middle, Ancient", "Small, Medium, Large"], answer: 0, explanation: "Heap: Young Generation (Eden + Survivor S0, S1) cho object mới; Old Generation (Tenured) cho object sống lâu. GC chạy thường xuyên ở Young." },
    { q: "OutOfMemoryError: Java Heap Space xảy ra khi nào?", options: ["Stack quá đầy", "JVM không thể cấp phát thêm bộ nhớ Heap cho object mới", "Quá nhiều threads", "Class không load được"], answer: 1, explanation: "Khi Heap đầy và GC không thu hồi được đủ bộ nhớ, JVM ném OutOfMemoryError. Cần tăng -Xmx hoặc fix memory leak." },
    { q: "Profiling JVM dùng để làm gì?", options: ["Biên dịch code nhanh hơn", "Phân tích hiệu suất: CPU usage, memory usage, thread activity, để tìm bottleneck", "Chạy unit test", "Deploy ứng dụng"], answer: 1, explanation: "JVM profiling tools (JProfiler, VisualVM, Java Mission Control) giúp xác định: memory leak, hot methods, thread deadlock..." },
    { q: "ClassLoader trong JVM có nhiệm vụ gì?", options: ["Biên dịch class", "Tải file .class vào JVM và tạo Class object trong Method Area", "Chạy GC", "Quản lý threads"], answer: 1, explanation: "ClassLoader tải file .class từ classpath, verify bytecode, prepare (cấp phát static), và link. Bootstrap > Extension > Application ClassLoader." },
    { q: "Minor GC và Major GC (Full GC) khác nhau thế nào?", options: ["Minor GC nhanh hơn và không dừng ứng dụng", "Minor GC: dọn Young Generation (nhanh, Stop-the-World ngắn). Major GC: dọn cả Old Gen (chậm hơn, Stop-the-World dài hơn).", "Major GC chỉ chạy khi gọi System.gc()", "Minor GC xóa cả Heap"], answer: 1, explanation: "Minor GC: frequent, fast, chỉ Young Gen. Major/Full GC: ít thường xuyên hơn, chậm hơn, ảnh hưởng performance nhiều hơn." }
  ],

  23: [
    { q: "Khi viết unit test, Mock dùng để làm gì?", options: ["Tăng hiệu suất test.", "Tạo đối tượng giả lập cô lập class cần test khỏi phụ thuộc bên ngoài (DB, API).", "Thay thế hoàn toàn code thật.", "Tự động tìm lỗi cú pháp."], answer: 1, explanation: "Mock giả lập behavior của dependencies. Thay vì gọi DB thật, mock trả về data giả định để test logic cốt lõi." },
    { q: "Annotation @Test trong JUnit 5 dùng để làm gì?", options: ["Đánh dấu class là test class", "Đánh dấu phương thức là một test case để JUnit tự động chạy", "Bỏ qua test", "Chạy test nhiều lần"], answer: 1, explanation: "@Test đánh dấu phương thức là test case. JUnit test runner tự tìm và chạy tất cả methods có @Test." },
    { q: "Assertions.assertEquals(expected, actual) trong JUnit làm gì?", options: ["In ra giá trị", "Kiểm tra expected == actual, nếu không bằng thì test fail", "So sánh reference", "Kiểm tra actual != null"], answer: 1, explanation: "assertEquals kiểm tra bằng nhau (dùng equals()). Nếu không khớp, test fail với thông báo chứa expected và actual values." },
    { q: "@BeforeEach trong JUnit 5 chạy khi nào?", options: ["Chỉ một lần trước tất cả test", "Trước mỗi phương thức @Test", "Sau mỗi test", "Khi có exception"], answer: 1, explanation: "@BeforeEach chạy trước MỖI test method, dùng để setup test data/state mới. @BeforeAll chạy một lần trước tất cả." },
    { q: "Mockito.when(mock.method()).thenReturn(value) làm gì?", options: ["Gọi thật method đó", "Định nghĩa behavior của mock: khi method được gọi thì trả về value", "Kiểm tra method được gọi", "Xóa mock"], answer: 1, explanation: "Stubbing: cấu hình mock để khi `method()` được gọi, trả về `value`. Không thực sự chạy code thật." },
    { q: "Phương thức test tốt cần có những gì? (3A Pattern)", options: ["Architecture, Algorithm, Assertion", "Arrange, Act, Assert", "Analyze, Apply, Audit", "Assign, Allocate, Assert"], answer: 1, explanation: "3A Pattern: Arrange (setup test data), Act (gọi method cần test), Assert (kiểm tra kết quả). Code test rõ ràng, dễ đọc." },
    { q: "Test coverage 100% có đảm bảo không có bug không?", options: ["Có, 100% coverage là hoàn hảo", "Không, coverage chỉ đo dòng code được chạy, không đảm bảo test đúng logic", "Có, nếu dùng JUnit 5", "Có nếu kết hợp với Integration test"], answer: 1, explanation: "High coverage không đủ nếu test không assert đúng. Quan trọng là test behavior đúng, không chỉ chạy qua code." },
    { q: "Integration Test khác Unit Test như thế nào?", options: ["Integration Test nhanh hơn", "Integration Test kiểm tra nhiều component phối hợp cùng nhau, không isolate như Unit Test", "Unit Test kiểm tra nhiều class", "Không có sự khác biệt"], answer: 1, explanation: "Unit Test: test class đơn lẻ, isolate (mock dependencies). Integration Test: test sự tương tác giữa nhiều component thật." },
    { q: "Annotation @Mock trong Mockito dùng cùng với gì?", options: ["@RunWith(JUnitRunner.class)", "@ExtendWith(MockitoExtension.class) trong JUnit 5", "@Before", "@Test"], answer: 1, explanation: "@Mock tạo mock object tự động. Cần @ExtendWith(MockitoExtension.class) hoặc gọi MockitoAnnotations.openMocks(this) để khởi tạo." },
    { q: "verify() trong Mockito dùng để làm gì?", options: ["Verify kết quả trả về", "Kiểm tra xem mock method có được gọi hay không, và bao nhiêu lần", "Verify kết nối database", "Kiểm tra null"], answer: 1, explanation: "`verify(mock).method()` kiểm tra method đã được gọi đúng 1 lần. `verify(mock, times(2)).method()` kiểm tra gọi 2 lần." }
  ],

  24: [
    { q: "Trong `pom.xml` Maven, thẻ `<dependency>` dùng để làm gì?", options: ["Khai báo phiên bản Java.", "Khai báo thư viện bên ngoài, Maven tự tải về từ Maven Central.", "Cấu hình tên tác giả.", "Chạy ứng dụng tự động."], answer: 1, explanation: "Maven quản lý dependency qua pom.xml. Khai báo groupId, artifactId, version - Maven tải thư viện và transitive deps." },
    { q: "Lệnh `mvn clean install` làm những gì?", options: ["Chỉ xóa target folder", "Xóa target, biên dịch, test, đóng gói (JAR/WAR), cài vào local Maven repository", "Chạy ứng dụng", "Tạo dự án mới"], answer: 1, explanation: "Maven lifecycle: clean (xóa target) + install (compile → test → package → install vào ~/.m2/repository)." },
    { q: "Gradle dùng ngôn ngữ nào để viết build script?", options: ["XML (pom.xml)", "Groovy hoặc Kotlin DSL (build.gradle / build.gradle.kts)", "YAML", "JSON"], answer: 1, explanation: "Gradle dùng Groovy DSL (build.gradle) hoặc Kotlin DSL (build.gradle.kts), linh hoạt và expressive hơn XML của Maven." },
    { q: "Maven Repository là gì?", options: ["Database lưu code Java", "Nơi lưu trữ các thư viện (JAR files). Local (~/.m2), Central (maven.org), Remote (công ty)", "Server chạy Maven", "Hệ thống version control"], answer: 1, explanation: "Maven tìm dependency theo thứ tự: Local repo → Remote repos → Maven Central. Download về local cache lần đầu." },
    { q: "Scope `<scope>test</scope>` trong Maven dependency có nghĩa gì?", options: ["Thư viện chỉ dùng trong môi trường production", "Thư viện chỉ có trong classpath khi compile test và chạy test, không include vào artifact final", "Thư viện không được tải", "Thư viện phải tải từ custom repo"], answer: 1, explanation: "Scope test: dependency chỉ dùng cho test (như JUnit, Mockito), không được package vào JAR/WAR cuối cùng." },
    { q: "Maven Wrapper (mvnw) dùng để làm gì?", options: ["Chạy Maven trên Windows", "Đảm bảo project dùng đúng phiên bản Maven mà không cần cài Maven toàn cục", "Tăng tốc Maven build", "Tự động update Maven"], answer: 1, explanation: "mvnw (Maven Wrapper) tự động download đúng phiên bản Maven được chỉ định trong project. Đảm bảo consistency giữa các developer." },
    { q: "Gradle vs Maven: Gradle có ưu điểm gì?", options: ["XML dễ đọc hơn", "Build nhanh hơn (incremental build, build cache, parallel execution), flexible hơn", "Cộng đồng lớn hơn", "Không cần cấu hình"], answer: 1, explanation: "Gradle nhanh hơn nhờ incremental builds (chỉ build phần thay đổi) và build cache. Groovy/Kotlin DSL cũng expressive hơn XML." },
    { q: "Artifact trong Maven là gì?", options: ["Lỗi biên dịch", "Output của Maven build (thường là .jar hoặc .war)", "Config file", "Test report"], answer: 1, explanation: "Artifact: kết quả build. Được định danh bởi groupId:artifactId:version. Có thể là JAR (library), WAR (web app), POM..." },
    { q: "Multi-module project trong Maven dùng để làm gì?", options: ["Tạo nhiều phiên bản cùng lúc", "Tổ chức dự án lớn thành nhiều module độc lập có thể build riêng hoặc cùng nhau", "Chạy nhiều JVM", "Test trên nhiều môi trường"], answer: 1, explanation: "Multi-module: parent pom quản lý nhiều module con (core, api, web...). Chia sẻ dependency management, build tất cả từ root." },
    { q: "Transitive dependency trong Maven là gì?", options: ["Dependency tùy chọn", "Dependency mà dependency của bạn phụ thuộc vào - Maven tự động resolve và tải", "Dependency chỉ dùng trong test", "Dependency mã nguồn mở"], answer: 1, explanation: "Nếu A phụ thuộc B và B phụ thuộc C, thì A có transitive dependency vào C. Maven tự động tải C mà không cần khai báo." }
  ],

  25: [
    { q: "Từ khóa `record` (Java 16) có mục đích chính là gì?", options: ["Ghi lại lịch sử chạy (Logging).", "Tạo nhanh immutable class DTO, giảm boilerplate (getter, toString, equals, hashCode).", "Lưu dữ liệu thẳng vào SQL.", "Cấu hình server."], answer: 1, explanation: "`record` tự động tạo: fields private final, constructor, accessors (không get prefix), toString(), equals(), hashCode()." },
    { q: "Sealed class (Java 17) dùng để làm gì?", options: ["Class không thể extend", "Giới hạn tập class được phép kế thừa, tăng type safety", "Class chỉ có static method", "Abstract class không có abstract method"], answer: 1, explanation: "`sealed class Shape permits Circle, Rectangle, Triangle` chỉ cho phép 3 class cụ thể kế thừa, giúp exhaustive pattern matching." },
    { q: "Switch Expression với Pattern Matching (Java 21) làm gì mới?", options: ["Switch trả về void", "Cho phép match theo kiểu dữ liệu của object trong case", "Switch với regex", "Switch không cần default"], answer: 1, explanation: "`case Integer i -> ...` match và extract cùng lúc. Kết hợp với sealed class cho exhaustive switch mạnh mẽ." },
    { q: "Text Block (Java 15) là gì?", options: ["Class chứa nhiều String", "Multi-line string literal dùng `\"\"\"` để viết JSON, HTML, SQL mà không cần escape", "StringBuilder nâng cấp", "Template engine"], answer: 1, explanation: "Text Block: `\"\"\"...\"\"\"` giúp viết multi-line string dễ đọc, tự xử lý indent, không cần \\n và \\\"." },
    { q: "var keyword (Java 10) dùng để làm gì?", options: ["Khai báo biến dynamic typing như JavaScript", "Type inference cho local variable: compiler tự suy ra kiểu từ giá trị khởi tạo", "Khai báo biến global", "Tạo anonymous class"], answer: 1, explanation: "`var list = new ArrayList<String>();` compiler suy ra kiểu là ArrayList<String>. Chỉ dùng cho local variable, không mất type safety." },
    { q: "instanceof Pattern Matching (Java 16) cải thiện gì?", options: ["instanceof nhanh hơn", "Kết hợp kiểm tra kiểu và cast trong một câu lệnh: `if (obj instanceof String s) {...}`", "instanceof trả về String", "instanceof không cần cast"], answer: 1, explanation: "Thay vì `if (obj instanceof String) { String s = (String) obj; }`, dùng `if (obj instanceof String s)` ngắn gọn và an toàn hơn." },
    { q: "Record có thể có phương thức không?", options: ["Không, record chỉ chứa data", "Có, record có thể có instance methods, static methods, và compact constructors", "Chỉ có static methods", "Chỉ có phương thức toString()"], answer: 1, explanation: "Record có thể có methods. Compact constructor cho phép validate data: `record Point(int x, int y) { Point { if(x < 0) throw ...; } }`" },
    { q: "Switch expression (Java 14+) có bắt buộc phải xử lý tất cả case không?", options: ["Không, có thể bỏ qua", "Có khi dùng với sealed class/enum - compiler kiểm tra exhaustiveness", "Chỉ bắt buộc với int", "Không bao giờ bắt buộc"], answer: 1, explanation: "Khi switch expression với enum hoặc sealed class, compiler bắt buộc cover tất cả case. Đảm bảo không bỏ sót trường hợp." },
    { q: "Stream.toList() (Java 16) khác Collectors.toList() thế nào?", options: ["Hoàn toàn giống nhau", "toList() trả về unmodifiable List, ngắn gọn hơn", "toList() chỉ cho ArrayList", "Collectors.toList() nhanh hơn"], answer: 1, explanation: "`stream.toList()` (Java 16+): ngắn gọn hơn, trả về unmodifiable list. `Collectors.toList()`: trả về mutable ArrayList." },
    { q: "Optional.isEmpty() (Java 11) là gì?", options: ["Phương thức mới tương đương !isPresent()", "Kiểm tra Optional null", "Xóa giá trị Optional", "So sánh hai Optional"], answer: 0, explanation: "`isEmpty()` = `!isPresent()`. Java 11 thêm cho code đọc tự nhiên hơn: `if (opt.isEmpty())` thay vì `if (!opt.isPresent())`." }
  ],

  26: [
    { q: "ORM trong Hibernate/JPA giải quyết vấn đề gì?", options: ["Tự động tối ưu hóa RAM.", "Ánh xạ bảng DB thành Entity class Java và ngược lại, thao tác dữ liệu bằng OOP thay vì SQL thủ công.", "Tự động mã hóa mật khẩu.", "Đọc file Excel."], answer: 1, explanation: "ORM (Object-Relational Mapping) cầu nối OOP và SQL: tự động tạo/thực thi SQL từ thao tác trên object." },
    { q: "JDBC là gì?", options: ["Java Database Compiler", "Java Database Connectivity - API chuẩn của Java để kết nối và thao tác database", "JSON Database Connection", "Java Data Buffer Cache"], answer: 1, explanation: "JDBC là API chuẩn cho phép Java kết nối tới bất kỳ RDBMS nào qua Driver tương ứng (MySQL Driver, PostgreSQL Driver...)." },
    { q: "Annotation @Entity trong JPA dùng để làm gì?", options: ["Đánh dấu class là abstract", "Đánh dấu class là JPA entity - ánh xạ sang một bảng trong database", "Tạo database tự động", "Định nghĩa query"], answer: 1, explanation: "@Entity đánh dấu class được quản lý bởi JPA, ánh xạ sang table (tên mặc định = tên class)." },
    { q: "@Id trong JPA annotation làm gì?", options: ["Tăng tốc query", "Đánh dấu field là Primary Key của entity/table", "Đặt unique constraint", "Tạo index"], answer: 1, explanation: "@Id đánh dấu field là primary key. Thường dùng cùng @GeneratedValue để PK tự động tăng." },
    { q: "EntityManager trong JPA dùng để làm gì?", options: ["Quản lý server", "Interface chính để thực hiện CRUD operations: persist, find, remove, merge", "Quản lý transaction", "Tạo query"], answer: 1, explanation: "EntityManager là interface trung tâm của JPA: persist() lưu, find() tìm, remove() xóa, merge() cập nhật entity." },
    { q: "Vấn đề N+1 queries trong Hibernate là gì?", options: ["Chạy query 1 lần nhưng lấy N kết quả", "Chạy 1 query lấy N entities, sau đó N query nữa để load mỗi association → hiệu suất kém", "Giới hạn N rows trong kết quả", "Lỗi kết nối database"], answer: 1, explanation: "N+1: load 10 Order, mỗi Order lazy-load Customer → 1+10=11 queries. Fix bằng JOIN FETCH hoặc @BatchSize." },
    { q: "HQL (Hibernate Query Language) khác SQL ở điểm gì?", options: ["HQL dùng cú pháp khác hoàn toàn", "HQL dùng tên Java class/field thay vì tên table/column SQL, database-independent", "HQL chỉ cho SELECT", "HQL chạy trực tiếp trên DB"], answer: 1, explanation: "HQL: `from Order o where o.customer.name = :name` dùng entity và property Java. Hibernate dịch sang SQL phù hợp với DB đang dùng." },
    { q: "Transaction trong database có đặc tính gì (ACID)?", options: ["Available, Consistent, Isolated, Durable", "Atomic, Consistent, Isolated, Durable", "Automated, Controlled, Integrated, Direct", "Available, Cached, Isolated, Defined"], answer: 1, explanation: "ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (không ảnh hưởng nhau), Durability (bền vững sau commit)." },
    { q: "Spring Data JPA Repository cung cấp gì?", options: ["Chỉ cung cấp kết nối DB", "Auto-implement CRUD methods (findById, save, delete...) và query từ method name", "Tạo table tự động", "Quản lý connection pool"], answer: 1, explanation: "Extends JpaRepository<Entity, ID> → Spring auto-generates implementations. `findByName()` tự tạo query từ tên method." },
    { q: "Lazy Loading trong Hibernate là gì?", options: ["Load entity chậm", "Association chỉ được load từ DB khi thực sự cần truy cập (lazy - theo yêu cầu)", "Caching trong RAM", "Load toàn bộ DB vào memory"], answer: 1, explanation: "Lazy: `@OneToMany(fetch = LAZY)` → collection không load khi load entity cha. Chỉ query khi code truy cập collection. Giảm query không cần thiết." }
  ],

  27: [
    { q: "Dependency Injection (DI) trong Spring giúp ích gì?", options: ["Tự động tải thư viện Maven.", "Giảm tight coupling, Spring IoC tự khởi tạo và inject dependencies vào class cần dùng.", "Tự động viết JUnit test.", "Tối ưu hóa biên dịch IntelliJ."], answer: 1, explanation: "DI: Spring quản lý object lifecycle và inject dependencies qua Constructor, Setter, hoặc @Autowired." },
    { q: "@SpringBootApplication annotation bao gồm những gì?", options: ["Chỉ @EnableAutoConfiguration", "@Configuration + @EnableAutoConfiguration + @ComponentScan", "@RestController + @Service + @Repository", "@Bean + @Autowired"], answer: 1, explanation: "@SpringBootApplication = @Configuration + @EnableAutoConfiguration (auto-configure) + @ComponentScan (scan beans)." },
    { q: "@RestController vs @Controller khác nhau thế nào?", options: ["Hoàn toàn giống nhau", "@RestController = @Controller + @ResponseBody (tự serialize response sang JSON)", "@RestController dùng cho frontend", "@Controller không có method"], answer: 1, explanation: "@RestController tự động apply @ResponseBody cho mọi method, trả về JSON/XML trực tiếp. @Controller dùng khi trả về view (Thymeleaf)." },
    { q: "@GetMapping, @PostMapping trong Spring MVC dùng để làm gì?", options: ["Inject dependency", "Map HTTP GET/POST request đến method handler tương ứng", "Tạo bean", "Kết nối database"], answer: 1, explanation: "@GetMapping(\"/users\") map HTTP GET /users đến method. @PostMapping map POST request. Shorthand cho @RequestMapping(method=GET/POST)." },
    { q: "Spring Boot Auto-configuration làm gì?", options: ["Tự viết code business logic", "Tự động cấu hình Spring beans dựa trên classpath dependencies (DataSource nếu có DB driver...)", "Deploy tự động lên cloud", "Tạo database schema"], answer: 1, explanation: "Auto-config: nếu H2 trong classpath → cấu hình in-memory DB. Nếu Spring Security → bảo vệ endpoints. Giảm boilerplate config." },
    { q: "application.properties (hoặc application.yml) trong Spring Boot dùng để làm gì?", options: ["Chứa business logic", "Cấu hình ứng dụng: server port, DB connection, logging level...", "Lưu dữ liệu người dùng", "Khai báo dependencies"], answer: 1, explanation: "application.properties: externalized config. `server.port=8080`, `spring.datasource.url=jdbc:postgresql://...`" },
    { q: "@Service, @Repository, @Component trong Spring là gì?", options: ["Annotation để tạo endpoint API", "Stereotype annotations đánh dấu class là Spring bean được quản lý bởi IoC Container", "Annotation cho JPA entity", "Annotation cho unit test"], answer: 1, explanation: "Stereotypes: @Component (generic), @Service (business logic), @Repository (data access). Spring scan và tạo bean tự động." },
    { q: "Spring Boot Starter là gì?", options: ["Starter project template", "Dependency descriptor tập hợp dependencies liên quan (spring-boot-starter-web = Spring MVC + Tomcat + Jackson)", "Lệnh để start ứng dụng", "Template HTML"], answer: 1, explanation: "Starters: one-stop-shop. spring-boot-starter-web bao gồm mọi thứ để build REST API. Không cần khai báo từng dep." },
    { q: "Embedded server trong Spring Boot mặc định là gì?", options: ["JBoss", "Tomcat (tích hợp sẵn trong spring-boot-starter-web)", "Nginx", "Apache"], answer: 1, explanation: "Spring Boot nhúng Tomcat vào JAR. Chạy ứng dụng bằng `java -jar app.jar` mà không cần cài Tomcat riêng." },
    { q: "spring-boot-starter-data-jpa thường dùng kèm với gì?", options: ["spring-boot-starter-security", "spring-boot-starter-web", "Một JDBC driver (MySQL, PostgreSQL...) và cấu hình datasource trong application.properties", "spring-boot-starter-test"], answer: 2, explanation: "JPA cần: spring-boot-starter-data-jpa (Hibernate + Spring Data) + JDBC driver (mysql-connector-java) + DB config trong properties." },
    { q: "Cách expose REST API endpoint trả về List<User> tại /api/users trong Spring Boot?", options: ["@GetMapping(\"/api/users\") trong @Controller", "@GetMapping(\"/api/users\") trong @RestController trả về List<User>", "@RequestMapping trong @Service", "@Repository method tên /api/users"], answer: 1, explanation: "`@RestController` + `@GetMapping(\"/api/users\") public List<User> getUsers() { ... }`. Spring tự serialize thành JSON array." }
  ]
};

const practiceDatabase = {
  1: {
    fileName: 'WelcomeScreen.java',
    instructions: `### Yêu cầu:
Tạo file \`WelcomeScreen.java\` in ra màn hình chào mừng của cửa hàng **RAIZE SHOP** khi khởi động.
Đầu ra console phải chứa chính xác dòng \`RAIZE SHOP v1.0\` và các cam kết bán hàng.

### Mẫu đầu ra mong muốn:
\`\`\`
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
\`\`\`
`,
    starterCode: `public class WelcomeScreen {
    public static void main(String[] args) {
        // Viết các câu lệnh System.out.println() của em ở đây
        System.out.println("╔══════════════════════════════════╗");
        System.out.println("║         RAIZE SHOP v1.0          ║");
        System.out.println("║    Chợ Game Items Uy Tín #1      ║");
        System.out.println("╠══════════════════════════════════╣");
        System.out.println("║  ✅ Mua bán an toàn, nhanh chóng ║");
        System.out.println("║  ✅ Hỗ trợ 24/7                  ║");
        System.out.println("║  ✅ 10,000+ sản phẩm             ║");
        System.out.println("╚══════════════════════════════════╝");
        System.out.println("Đang khởi động hệ thống...");
        System.out.println("Phiên bản: 1.0.0 | Java 21");
    }
}`,
    validate: (code, output) => {
      if (!code.includes("class WelcomeScreen")) {
        return { pass: false, msg: "Tên lớp phải là 'WelcomeScreen'!" };
      }
      if (!code.includes("public static void main")) {
        return { pass: false, msg: "Thiếu phương thức main khởi tạo!" };
      }
      if (!output.includes("RAIZE SHOP v1.0")) {
        return { pass: false, msg: "Output console thiếu chuỗi định danh 'RAIZE SHOP v1.0'!" };
      }
      if (!output.includes("Mua bán an toàn") || !output.includes("10,000+ sản phẩm")) {
        return { pass: false, msg: "Chưa in đầy đủ các cam kết của cửa hàng trong banner!" };
      }
      return { pass: true, msg: "Quá tốt! Banner khởi động RaizeShop của em đã đạt chuẩn và in ra rất đẹp mắt!" };
    }
  },
  2: {
    fileName: 'ProductDetail.java',
    instructions: `### Yêu cầu:
Tạo file \`ProductDetail.java\`. Khai báo các thông tin biến của sản phẩm và sử dụng \`System.out.printf()\` để định dạng in ra thông tin sản phẩm game item đẹp đẽ.
Sản phẩm có giá tiền là số thực \`1500000\` VND, cần được định dạng in ra có dấu phẩy ngăn cách hàng nghìn (ví dụ: \`1,500,000\`).

### Đầu ra mong muốn:
\`\`\`
==========================================
📦 CHI TIẾT SẢN PHẨM: Kiếm Rồng Lửa +10
==========================================
Giá          : 1,500,000 đ
Danh mục     : Vũ khí
Tình trạng   : Còn hàng
Người bán    : DragonMaster99
==========================================
\`\`\`
`,
    starterCode: `public class ProductDetail {
    public static void main(String[] args) {
        String tenSanPham = "Kiếm Rồng Lửa +10";
        String danhMuc = "Vũ khí";
        double gia = 1500000.0;
        String nguoiBan = "DragonMaster99";
        
        System.out.println("==========================================");
        System.out.printf("📦 CHI TIẾT SẢN PHẨM: %s%n", tenSanPham);
        System.out.println("==========================================");
        // TODO: Viết code dùng printf để in thông tin còn lại
        // Chú ý: Sử dụng %,.0f đ để format tiền tệ đẹp đẽ.
        System.out.printf("Giá          : %,.0f đ%n", gia);
        System.out.printf("Danh mục     : %s%n", danhMuc);
        System.out.printf("Tình trạng   : Còn hàng%n");
        System.out.printf("Người bán    : %s%n", nguoiBan);
        System.out.println("==========================================");
    }
}`,
    validate: (code, output) => {
      if (!code.includes("%,.0f") && !code.includes("%,d") && !output.includes("1,500,000")) {
        return { pass: false, msg: "Em cần sử dụng định dạng %,.0f hoặc %,d để hiển thị số tiền có dấu phẩy phân cách hàng nghìn!" };
      }
      if (!output.includes("Kiếm Rồng Lửa +10")) {
        return { pass: false, msg: "Thiếu tên sản phẩm trong đầu ra!" };
      }
      if (!output.includes("DragonMaster99")) {
        return { pass: false, msg: "Thiếu người bán DragonMaster99 trong chi tiết sản phẩm!" };
      }
      return { pass: true, msg: "Tuyệt vời! Em đã sử dụng printf rất thành thạo để tạo một bảng chi tiết sản phẩm chuẩn chỉnh!" };
    }
  },
  3: {
    fileName: 'ShippingCalculator.java',
    instructions: `### Yêu cầu:
Tạo chương trình tính phí vận chuyển vật phẩm game vật lý dựa trên khoảng cách (km) và tình trạng hội viên VIP:
- Khoảng cách dưới 5km: Phí là \`15000\` đ.
- Khoảng cách từ 5km đến 10km: Phí là \`30000\` đ.
- Khoảng cách trên 10km: Phí là \`50000\` đ.
- Đặc biệt: Nếu khách hàng là hội viên VIP (\`isVip = true\`), họ sẽ được giảm **50%** phí vận chuyển.

Hãy thiết lập khoảng cách \`12.5\` km và \`isVip = true\` để chạy chương trình. In kết quả cuối cùng ra màn hình dạng: \`Phí ship: [số tiền] đ\`.
`,
    starterCode: `public class ShippingCalculator {
    public static void main(String[] args) {
        double khoangCach = 12.5; // km
        boolean isVip = true;
        double phiShip = 0;

        // TODO: Viết logic if-else tính phí ship ở đây
        if (khoangCach < 5) {
            phiShip = 15000;
        } else if (khoangCach <= 10) {
            phiShip = 30000;
        } else {
            phiShip = 50000;
        }
        
        if (isVip) {
            phiShip = phiShip * 0.5;
        }

        System.out.println("Phí ship: " + (int)phiShip + " đ");
    }
}`,
    validate: (code, output) => {
      if (!output.includes("25000") && !output.includes("25,000")) {
        return { pass: false, msg: "Kết quả phí ship tính ra chưa chính xác. Với khoảng cách 12.5km (>10km) và có VIP (giảm 50% của 50,000) thì phí ship phải là 25,000 đ." };
      }
      if (!code.includes("if") || !code.includes("else")) {
        return { pass: false, msg: "Em cần sử dụng cấu trúc rẽ nhánh if-else để kiểm tra khoảng cách và tính phí ship!" };
      }
      return { pass: true, msg: "Chuẩn xác! Logic rẽ nhánh của em hoạt động rất trơn tru. Newbie làm vậy là cực tốt!" };
    }
  },
  4: {
    fileName: 'CartTotal.java',
    instructions: `### Yêu cầu:
Giả lập giỏ hàng của khách hàng tại RaizeShop chứa 5 vật phẩm game với đơn giá lưu trong một mảng số nguyên.
Hãy sử dụng vòng lặp \`for\` hoặc \`while\` để duyệt qua mảng \`itemPrices\` và cộng dồn tính tổng số tiền của giỏ hàng.
In kết quả ra màn hình dạng: \`Tổng tiền giỏ hàng: [tổng số tiền] đ\`.
`,
    starterCode: `public class CartTotal {
    public static void main(String[] args) {
        int[] itemPrices = {120000, 450000, 30000, 1500000, 85000};
        int tongTien = 0;

        // TODO: Sử dụng vòng lặp để duyệt mảng và tính tổng
        for (int price : itemPrices) {
            tongTien += price;
        }

        System.out.println("Tổng tiền giỏ hàng: " + tongTien + " đ");
    }
}`,
    validate: (code, output) => {
      if (!output.includes("2235000") && !output.includes("2,235,000")) {
        return { pass: false, msg: "Tổng số tiền tính ra chưa chính xác. Đáp án đúng của tổng mảng là 2,235,000 đ." };
      }
      if (!code.includes("for") && !code.includes("while")) {
        return { pass: false, msg: "Em hãy dùng vòng lặp for (hoặc for-each, while) để duyệt qua các phần tử của mảng!" };
      }
      return { pass: true, msg: "Làm tốt lắm em! Việc duyệt mảng bằng vòng lặp là viên gạch nền móng đầu tiên của thuật toán." };
    }
  },
  5: {
    fileName: 'UsernameStandardizer.java',
    instructions: `### Yêu cầu:
Khi người dùng đăng ký tài khoản game trên hệ thống, họ thường gõ tên cẩu thả (nhiều dấu cách thừa, viết hoa lộn xộn).
Hãy dùng các hàm xử lý chuỗi (\`trim\`, \`split\`, \`toUpperCase\`, \`substring\`) để chuẩn hóa chuỗi \`rawUsername = "   ngUyen   vaN   aN   "\`
về dạng chuẩn đẹp: \`Nguyen Van An\`.
In kết quả dạng: \`Tên sau chuẩn hóa: [tên đã chuẩn hóa]\`.
`,
    starterCode: `public class UsernameStandardizer {
    public static void main(String[] args) {
        String rawUsername = "   ngUyen   vaN   aN   ";
        String cleanName = "";

        // TODO: Viết code xử lý chuỗi ở đây để làm sạch và chuẩn hóa chữ hoa/thường
        String[] words = rawUsername.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            String w = words[i];
            if (w.length() > 0) {
                sb.append(w.substring(0, 1).toUpperCase());
                sb.append(w.substring(1).toLowerCase());
                if (i < words.length - 1) {
                    sb.append(" ");
                }
            }
        }
        cleanName = sb.toString();

        System.out.println("Tên sau chuẩn hóa: " + cleanName);
    }
}`,
    validate: (code, output) => {
      if (!output.includes("Nguyen Van An")) {
        return { pass: false, msg: "Tên chưa được chuẩn hóa đúng. Phải ra kết quả chính xác là 'Nguyen Van An' (không chứa khoảng trắng thừa ở hai đầu và giữa các từ)." };
      }
      return { pass: true, msg: "Xử lý chuỗi rất mượt mà! Kỹ năng thao tác String này cực kỳ cần thiết cho việc xử lý dữ liệu đầu vào sau này." };
    }
  },
  6: {
    fileName: 'TaxCalculator.java',
    instructions: `### Yêu cầu:
Xây dựng một lớp \`TaxCalculator\` chứa phương thức tự định nghĩa:
- Phương thức \`calculateFinalPrice\` nhận vào giá bán gốc (\`double\`), tính toán và trả về giá cuối cùng sau khi cộng thêm **10%** thuế VAT và **5%** phí sàn giao dịch (tổng cộng cộng thêm **15%** vào giá gốc).
- Trong phương thức \`main\`, gọi phương thức trên với giá trị gốc là \`2000000\` đ và in kết quả ra màn hình.
`,
    starterCode: `public class TaxCalculator {
    public static void main(String[] args) {
        double price = 2000000;
        double finalPrice = calculateFinalPrice(price);
        System.out.println("Thành tiền: " + (int)finalPrice);
    }

    // TODO: Khai báo phương thức calculateFinalPrice tại đây
    public static double calculateFinalPrice(double basePrice) {
        return basePrice * 1.15;
    }
}`,
    validate: (code, output) => {
      if (!code.includes("calculateFinalPrice") || !code.includes("static")) {
        return { pass: false, msg: "Em cần khai báo một phương thức static có tên là 'calculateFinalPrice'!" };
      }
      if (!output.includes("2300000") && !output.includes("2,300,000")) {
        return { pass: false, msg: "Giá trị tính toán trả về chưa đúng. 2,000,000 đ cộng thêm 15% phải là 2,300,000 đ." };
      }
      return { pass: true, msg: "Tuyệt cú mèo! Em đã biết cách khai báo và gọi phương thức tĩnh (static method) chuẩn chỉnh." };
    }
  }
};

// Đọc dữ liệu crawled từ W3Schools
const crawledPath = path.join(__dirname, 'w3schools_crawled.json');
let w3Data = {};
if (fs.existsSync(crawledPath)) {
  try {
    w3Data = JSON.parse(fs.readFileSync(crawledPath, 'utf8'));
  } catch (e) {
    console.error("Lỗi đọc dữ liệu W3Schools crawled:", e.message);
  }
}

// Đọc nội dung từ các file bài học thực tế
const lessons = [];

console.log("=== Đang quét và đóng gói các bài giảng Java ===");

for (const config of lessonConfigs) {
  const fullPath = path.join(ROOT_DIR, config.dir);
  const readmePath = path.join(fullPath, 'README.md');
  const exercisesPath = path.join(fullPath, 'EXERCISES.md');

  let theoryContent = `Chưa cập nhật nội dung lý thuyết cho bài học số ${config.id}.`;
  let exercisesContent = `Chưa cập nhật bài tập thực hành cho bài học số ${config.id}.`;

  if (fs.existsSync(readmePath)) {
    theoryContent = fs.readFileSync(readmePath, 'utf8');
  } else {
    console.warn(`[Cảnh báo] Thiếu file README.md tại: ${config.dir}`);
  }

  if (fs.existsSync(exercisesPath)) {
    exercisesContent = fs.readFileSync(exercisesPath, 'utf8');
  } else {
    console.warn(`[Cảnh báo] Thiếu file EXERCISES.md tại: ${config.dir}`);
  }

  // Tách tiêu đề từ dòng đầu tiên của markdown nếu có dạng `# Bài XX: Tên`
  let displayTitle = config.title;
  const matchTitle = theoryContent.match(/^#\s+(.+)$/m);
  if (matchTitle) {
    displayTitle = matchTitle[1].replace(/Bài \d+:\s*/, '').trim();
  }

  // Tiêm các kiến thức bổ trợ trực tiếp vào nội dung lý thuyết ở frontend nếu cần
  if (config.id === 2) {
    // Bổ sung Math từ W3Schools
    if (w3Data.math) {
      theoryContent += `\n\n---\n\n## 💡 Kiến thức bổ trợ từ W3Schools: Java Math\n\n` + w3Data.math.content;
    }
    // Bổ sung kiến thức Scanner vào bài 2 hoặc bài 3
    theoryContent += `
\n---
\n## 💡 Kiến thức bổ trợ cho Newbie: Lớp Scanner nhập dữ liệu
Để viết chương trình tương tác, bạn cần nhập dữ liệu từ bàn phím. Java cung cấp lớp \`java.util.Scanner\`:
\`\`\`java
import java.util.Scanner; // Khai báo import ở đầu file

public class NhapLieu {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); // Tạo đối tượng scanner
        
        System.out.print("Nhập tên của bạn: ");
        String ten = scanner.nextLine(); // Đọc 1 dòng chữ
        
        System.out.print("Nhập tuổi của bạn: ");
        int tuoi = scanner.nextInt(); // Đọc 1 số nguyên
        
        System.out.println("Xin chào " + ten + ", " + tuoi + " tuổi!");
        scanner.close(); // Đóng tài nguyên sau khi dùng xong
    }
}
\`\`\`
`;
  }

  if (config.id === 8) {
    // Bổ sung mô hình bộ nhớ Stack & Heap vào bài class-object / constructor
    theoryContent += `
\n---
\n## 💡 Kiến thức bổ trợ cho Newbie: Mô hình bộ nhớ Stack & Heap
Khi làm việc với Hướng đối tượng, hiểu được cách bộ nhớ hoạt động là chìa khóa để tránh lỗi:
* **Stack (Bộ nhớ ngăn xếp)**: Lưu trữ các biến nguyên thủy (int, double, boolean...) và các **biến tham chiếu** (địa chỉ/con trỏ trỏ đến đối tượng thực sự).
* **Heap (Bộ nhớ đống)**: Lưu trữ **đối tượng thực sự** được tạo ra bằng từ khóa \`new\` (ví dụ: \`new Dog()\`).
* Khi viết \`Dog dog1 = new Dog();\`: Biến \`dog1\` nằm ở Stack và giữ giá trị là địa chỉ ô nhớ \`0x777\` trỏ sang vùng Heap nơi đối tượng \`Dog\` thực sự nằm.
`;
  }

  // Tiêm các kiến thức W3Schools cho các bài học khác
  if (config.id === 5 && w3Data.regex) {
    theoryContent += `\n\n---\n\n## 💡 Kiến thức bổ trợ từ W3Schools: Java Regular Expressions (RegEx)\n\n` + w3Data.regex.content;
  }
  if (config.id === 7 && w3Data.inner) {
    theoryContent += `\n\n---\n\n## 💡 Kiến thức bổ trợ từ W3Schools: Java Inner Classes (Lớp lồng nhau)\n\n` + w3Data.inner.content;
  }
  if (config.id === 12 && w3Data.enums) {
    theoryContent += `\n\n---\n\n## 💡 Kiến thức bổ trợ từ W3Schools: Java Enums (Kiểu liệt kê)\n\n` + w3Data.enums.content;
  }
  if (config.id === 15 && w3Data.date) {
    theoryContent += `\n\n---\n\n## 💡 Kiến thức bổ trợ từ W3Schools: Java Date and Time\n\n` + w3Data.date.content;
  }
  if (config.id === 16 && w3Data.wrapper) {
    theoryContent += `\n\n---\n\n## 💡 Kiến thức bổ trợ từ W3Schools: Java Wrapper Classes\n\n` + w3Data.wrapper.content;
  }

  // Lấy danh sách câu hỏi trắc nghiệm
  const quizzes = [...(quizDatabase[config.id] || [])];

  // Bổ sung câu hỏi trắc nghiệm từ W3Schools
  if (config.id === 2) {
    quizzes.push(
      { q: "Phương thức Math.ceil(4.1) trả về kết quả nào?", options: ["4.0", "5.0", "4", "5"], answer: 1, explanation: "Math.ceil(x) làm tròn lên số nguyên tiếp theo và trả về kiểu double." },
      { q: "Phương thức nào dùng để tính căn bậc hai của một số trong Java?", options: ["Math.sqr()", "Math.sqrt()", "Math.pow()", "Math.root()"], answer: 1, explanation: "Math.sqrt(x) trả về căn bậc hai (square root) của x dưới dạng kiểu double." }
    );
  } else if (config.id === 5) {
    quizzes.push(
      { q: "Lớp nào trong gói java.util.regex được dùng để định nghĩa một mẫu tìm kiếm biểu thức chính quy?", options: ["Matcher", "RegEx", "Pattern", "PatternMatcher"], answer: 2, explanation: "Lớp Pattern dùng để biên dịch biểu thức chính quy thành một mẫu (pattern)." }
    );
  } else if (config.id === 7) {
    quizzes.push(
      { q: "Làm thế nào để khởi tạo một non-static InnerClass (Inner) từ bên ngoài OuterClass (Outer)?", options: ["Outer.Inner inner = new Outer.Inner();", "Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();", "Inner inner = new Outer().Inner();", "Outer.Inner inner = new Inner(outer);"], answer: 1, explanation: "Với non-static inner class, bạn phải tạo thực thể OuterClass trước, sau đó dùng outer.new Inner()." }
    );
  } else if (config.id === 12) {
    quizzes.push(
      { q: "Phương thức nào của enum dùng để lấy ra một mảng chứa tất cả các hằng số của enum đó?", options: ["values()", "list()", "getConstants()", "toArray()"], answer: 0, explanation: "Phương thức values() tự động được sinh ra cho enum, trả về mảng chứa toàn bộ hằng số theo đúng thứ tự khai báo." }
    );
  } else if (config.id === 15) {
    quizzes.push(
      { q: "Lớp nào dùng để biểu diễn ngày (không chứa giờ) trong gói java.time?", options: ["Date", "LocalDate", "LocalDateTime", "LocalTime"], answer: 1, explanation: "LocalDate biểu diễn ngày tháng năm theo chuẩn ISO-8601 (yyyy-MM-dd)." }
    );
  } else if (config.id === 16) {
    quizzes.push(
      { q: "Wrapper class tương ứng của kiểu dữ liệu nguyên thủy char là gì?", options: ["Char", "String", "Character", "CharSequence"], answer: 2, explanation: "Wrapper class tương ứng của char là Character." }
    );
  }

  if (quizzes.length === 0) {
    quizzes.push(
      {
        q: `Câu hỏi ôn tập cho bài: ${displayTitle}?`,
        options: [
          "Lựa chọn A (Đúng)",
          "Lựa chọn B",
          "Lựa chọn C",
          "Lựa chọn D"
        ],
        answer: 0,
        explanation: "Đây là câu hỏi kiểm tra nhanh kiến thức cơ bản của bài học này."
      }
    );
  }

  // Lấy cấu hình bài tập thực hành
  const practice = practiceDatabase[config.id] || {
    fileName: 'Main.java',
    instructions: `### Thực Hành Bài: ${displayTitle}
Đọc yêu cầu bài tập trong tab **Lý Thuyết** hoặc file **EXERCISES.md** bên dưới.
Viết code Java tương ứng vào IDE bên phải, nhấn **Chạy Thử** và **Nộp Bài** để chấm điểm tự động.

${exercisesContent.slice(0, 1000)}...
`,
    starterCode: `public class Main {
    public static void main(String[] args) {
        // Viết code của em ở đây
        System.out.println("Xin chào Java!");
    }
}`,
    validate: (code, output) => {
      return { pass: true, msg: "Bài này chưa được cấu hình kiểm tra tự động. Hãy chuyển sang bài tiếp theo!" };
    }
  };

  // Convert validate function to string so it can be shipped via JSON/JS database
  const practiceSerialized = {
    fileName: practice.fileName,
    instructions: practice.instructions,
    starterCode: practice.starterCode,
    validateStr: practice.validate.toString()
  };

  lessons.push({
    id: config.id,
    title: displayTitle,
    phase: config.phase,
    time: config.time,
    difficulty: config.difficulty,
    theory: theoryContent,
    exercisesMarkdown: exercisesContent,
    quizzes: quizzes,
    practice: practiceSerialized
  });
}

// Ghi file lessonsData.js
const fileContent = `// Tệp dữ liệu tự động sinh ra bởi build_db.js
const lessonsData = ${JSON.stringify(lessons, null, 2)};

if (typeof module !== 'undefined') {
  module.exports = lessonsData;
}
`;

fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
console.log(`✅ Đã đóng gói thành công ${lessons.length} bài học và ghi vào file: java-learning-portal/lessonsData.js`);
