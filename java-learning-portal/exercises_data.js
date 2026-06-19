// Dữ liệu 135 bài tập thực hành tương tác (27 bài học x 5 bài tập)
// Mỗi bài tập gồm: tiêu đề, yêu cầu đề bài, tên file, code ban đầu, và các tiêu chí kiểm tra tự động.

const exercises = [];

// Helper để nhanh chóng định nghĩa bài tập
function addEx(lessonId, title, fileName, instructions, starterCode, spec) {
    exercises.push({
        lessonId,
        title,
        fileName,
        instructions,
        starterCode,
        requiredKeywords: spec.required || [],
        expectedOutputs: spec.expected || [],
        customValidate: spec.customValidate || null
    });
}

// ==========================================
// PHASE 1: FUNDAMENTALS (Bài 1 - 6)
// ==========================================

// --- BÀI 1: GIỚI THIỆU JAVA ---
addEx(1, "Trang Chào Mừng Ứng Dụng", "WelcomeScreen.java", 
`### Yêu cầu:
Viết chương trình hiển thị màn hình chào mừng của ứng dụng **RaizeShop v1.0**.
Chương trình cần in ra chính xác dòng chữ: \`=== WELCOME TO RAIZESHOP ===\``,
`public class WelcomeScreen {
    public static void main(String[] args) {
        // Viết lệnh in màn hình chào mừng ở đây
        // TODO: Sử dụng System.out.println() để in ra "=== WELCOME TO RAIZESHOP ==="
    }
}`, { expected: ["=== WELCOME TO RAIZESHOP ==="] });

addEx(1, "Thông Tin Sản Phẩm", "ProductInfo.java",
`### Yêu cầu:
Sử dụng \`System.out.println()\` để hiển thị tên sản phẩm: \`Kiếm Dragon +10\` và giá tiền: \`1500000 đ\`.`,
`public class ProductInfo {
    public static void main(String[] args) {
        // TODO: In ra tên sản phẩm "Sản phẩm: Kiếm Dragon +10" và giá "Giá: 1500000 đ" sử dụng System.out.println()
    }
}`, { expected: ["Kiếm Dragon +10", "1500000 đ"] });

addEx(1, "In Logo CLI", "CliLogo.java",
`### Yêu cầu:
In logo thương hiệu Raize dạng chữ viết tắt đơn giản: \`[RAIZE]\` ra màn hình console.`,
`public class CliLogo {
    public static void main(String[] args) {
        // TODO: In ra logo "[RAIZE]"
    }
}`, { expected: ["[RAIZE]"] });

addEx(1, "Thông Báo Khởi Động", "SystemStatus.java",
`### Yêu cầu:
In ra thông báo trạng thái của server: \`Server status: READY\`.`,
`public class SystemStatus {
    public static void main(String[] args) {
        // TODO: In ra trạng thái "Server status: READY"
    }
}`, { expected: ["Server status: READY"] });

addEx(1, "In Ghi Chú Bản Quyền", "Copyright.java",
`### Yêu cầu:
In ra thông tin bản quyền: \`Copyright (C) 2026 RaizeStudy\`.`,
`public class Copyright {
    public static void main(String[] args) {
        // TODO: In ra thông tin bản quyền "Copyright (C) 2026 RaizeStudy"
    }
}`, { expected: ["Copyright (C) 2026 RaizeStudy"] });

// --- BÀI 2: BIẾN & KIỂU DỮ LIỆU ---
addEx(2, "Tính Diện Tích Hình Tròn", "CircleArea.java",
`### Yêu cầu:
Khai báo biến bán kính \`double r = 5.0;\` và hằng số \`double PI = 3.14159;\`.
Tính diện tích và in ra theo định dạng: \`Diện tích: [kết quả]\`. (Kết quả mong muốn: \`Diện tích: 78.53975\`)`,
`public class CircleArea {
    public static void main(String[] args) {
        double r = 5.0;
        // TODO: Khai báo hằng số PI với giá trị 3.14159
        
        // TODO: Tính diện tích (area = PI * r * r) và in ra theo mẫu "Diện tích: [area]"
    }
}`, { expected: ["Diện tích: 78.53975"] });

addEx(2, "Đổi Nhiệt Độ Celsius sang Fahrenheit", "TempConverter.java",
`### Yêu cầu:
Khai báo biến nhiệt độ Celsius \`double c = 35.0;\`. 
Tính nhiệt độ Fahrenheit theo công thức: \`F = C * 1.8 + 32\`. 
In ra kết quả dạng: \`Nhiệt độ F: [kết quả]\`.`,
`public class TempConverter {
    public static void main(String[] args) {
        double c = 35.0;
        // TODO: Tính nhiệt độ f (F = C * 1.8 + 32) và in ra dạng "Nhiệt độ F: [f]"
    }
}`, { expected: ["Nhiệt độ F: 95.0"] });

addEx(2, "Tính Chỉ Số BMI", "BmiCalculator.java",
`### Yêu cầu:
Khai báo cân nặng \`weight = 70.0\` (kg) và chiều cao \`height = 1.75\` (m) dạng số thực.
Tính chỉ số BMI = \`weight / (height * height)\` và in ra kết quả dạng: \`BMI: [kết quả]\`.`,
`public class BmiCalculator {
    public static void main(String[] args) {
        double weight = 70.0;
        double height = 1.75;
        // TODO: Tính bmi = weight / (height * height) và in ra dạng "BMI: [bmi]"
    }
}`, { expected: ["BMI: 22.857"] });

addEx(2, "Kiểm Tra Tràn Số", "ByteOverflow.java",
`### Yêu cầu:
Khai báo biến kiểu byte \`byte b = 127;\`. Tăng giá trị của b thêm 1 đơn vị bằng cách ép kiểu và in ra kết quả. 
Kết quả mong muốn là \`-128\` do hiện tượng tràn số trong kiểu byte.`,
`public class ByteOverflow {
    public static void main(String[] args) {
        byte b = 127;
        // TODO: Tăng b thêm 1 đơn vị bằng cách cộng và ép kiểu b về byte
        System.out.println("Kết quả: " + b);
    }
}`, { expected: ["Kết quả: -128"] });

addEx(2, "Tính Giá Trị Trung Bình", "AverageScore.java",
`### Yêu cầu:
Khai báo 3 biến điểm số học tập kiểu double đại diện cho Toán, Lý, Hóa lần lượt là \`8.5\`, \`9.0\`, \`7.5\`.
Tính điểm trung bình cộng của 3 môn và in ra dạng: \`Điểm trung bình: [kết quả]\`.`,
`public class AverageScore {
    public static void main(String[] args) {
        double toan = 8.5;
        double ly = 9.0;
        double hoa = 7.5;
        // TODO: Tính điểm trung bình cộng của 3 môn (dtb) và in ra dạng "Điểm trung bình: [dtb]"
    }
}`, { expected: ["Điểm trung bình: 8.333"] });

// --- BÀI 3: CÂU LỆNH ĐIỀU KIỆN ---
addEx(3, "Tính Phí Ship Hàng", "ShippingCalculator.java",
`### Yêu cầu:
Tính phí vận chuyển dựa trên khoảng cách \`double khoangCach = 12.5;\` và hội viên VIP \`boolean isVip = true;\`:
- Khoảng cách < 5km: 15000 đ.
- Khoảng cách từ 5km đến 10km: 30000 đ.
- Khoảng cách > 10km: 50000 đ.
- Nếu là VIP (\`isVip = true\`), giảm **50%** phí ship.
In ra dạng: \`Phí ship: [số tiền] đ\`.`,
`public class ShippingCalculator {
    public static void main(String[] args) {
        double khoangCach = 12.5;
        boolean isVip = true;
        // TODO: Tính phí ship dựa trên khoảng cách (khoangCach = 12.5):
        // > 10km phí là 50000. Nếu là VIP (isVip = true) giảm 50%.
        // In ra màn hình kết quả dạng "Phí ship: [phí] đ"
    }
}`, { expected: ["Phí ship: 25000 đ"], required: ["if"] });

addEx(3, "Đánh Giá Điểm Số", "GradeEvaluator.java",
`### Yêu cầu:
Dựa trên điểm số \`double score = 8.2;\`, in ra xếp loại tương ứng:
- score >= 9.0: \`Xuất sắc\`
- score >= 8.0: \`Giỏi\`
- score >= 6.5: \`Khá\`
- score >= 5.0: \`Trung bình\`
- Ngược lại: \`Yếu\`
In ra màn hình dạng: \`Xếp loại: [kết quả]\`.`,
`public class GradeEvaluator {
    public static void main(String[] args) {
        double score = 8.2;
        String xepLoai = "";
        // TODO: Viết cấu trúc điều kiện if-else if-else để gán xepLoai dựa trên score:
        // >= 9.0: "Xuất sắc", >= 8.0: "Giỏi", >= 6.5: "Khá", >= 5.0: "Trung bình", ngược lại: "Yếu"
        System.out.println("Xếp loại: " + xepLoai);
    }
}`, { expected: ["Xếp loại: Giỏi"], required: ["if", "else"] });

addEx(3, "Kiểm Tra Năm Nhuận", "LeapYear.java",
`### Yêu cầu:
Viết chương trình kiểm tra xem năm \`int year = 2024;\` có phải năm nhuận hay không.
Quy tắc: Năm nhuận chia hết cho 4, đồng thời nếu chia hết cho 100 thì cũng phải chia hết cho 400.
In ra màn hình: \`2024 là năm nhuận\` hoặc \`2024 không phải năm nhuận\`.`,
`public class LeapYear {
    public static void main(String[] args) {
        int year = 2024;
        // TODO: Viết biểu thức kiểm tra năm nhuận và gán cho isLeap (chia hết cho 4 và không chia hết cho 100, hoặc chia hết cho 400)
        boolean isLeap = false;
        if (isLeap) {
            System.out.println(year + " là năm nhuận");
        } else {
            System.out.println(year + " không phải năm nhuận");
        }
    }
}`, { expected: ["2024 là năm nhuận"] });

addEx(3, "Kiểm Tra Số Âm Dương", "NumberCheck.java",
`### Yêu cầu:
Kiểm tra số nguyên \`int num = -15;\`. 
In ra \`Số dương\` nếu num > 0, \`Số âm\` nếu num < 0, và \`Số không\` nếu num == 0.`,
`public class NumberCheck {
    public static void main(String[] args) {
        int num = -15;
        // TODO: Kiểm tra num và in ra "Số dương" (nếu > 0), "Số âm" (nếu < 0), "Số không" (nếu == 0)
    }
}`, { expected: ["Số âm"] });

addEx(3, "Phân Loại Người Dùng", "AgeClassifier.java",
`### Yêu cầu:
Dựa trên tuổi \`int age = 17;\`. Phân loại người dùng:
- age < 12: \`Trẻ em\`
- age < 18: \`Thiếu niên\`
- Ngược lại: \`Người lớn\`
In ra kết quả dạng: \`Phân loại: [kết quả]\`.`,
`public class AgeClassifier {
    public static void main(String[] args) {
        int age = 17;
        String type = "";
        // TODO: Phân loại tuổi: < 12 là "Trẻ em", < 18 là "Thiếu niên", còn lại là "Người lớn"
        System.out.println("Phân loại: " + type);
    }
}`, { expected: ["Phân loại: Thiếu niên"] });


// --- BÀI 4: VÒNG LẶP (LOOPS) ---
addEx(4, "Tính Tổng Giỏ Hàng", "CartTotal.java",
`### Yêu cầu:
Cho một mảng giá vật phẩm game \`int[] itemPrices = {120000, 450000, 30000, 1500000, 85000};\`.
Sử dụng vòng lặp để duyệt mảng và cộng dồn tính tổng số tiền của giỏ hàng.
In kết quả dạng: \`Tổng tiền giỏ hàng: [tổng số tiền] đ\`.`,
`public class CartTotal {
    public static void main(String[] args) {
        int[] itemPrices = {120000, 450000, 30000, 1500000, 85000};
        int tongTien = 0;
        // TODO: Sử dụng vòng lặp duyệt mảng itemPrices để tính tổng số tiền (tongTien)
        System.out.println("Tổng tiền giỏ hàng: " + tongTien + " đ");
    }
}`, { expected: ["Tổng tiền giỏ hàng: 2235000 đ"], required: ["for"] });

addEx(4, "Kiểm Tra Số Nguyên Tố", "PrimeCheck.java",
`### Yêu cầu:
Kiểm tra số nguyên \`int n = 29;\` có phải số nguyên tố hay không.
Số nguyên tố là số > 1 và chỉ chia hết cho 1 và chính nó.
In ra kết quả: \`29 là số nguyên tố\` hoặc \`29 không phải số nguyên tố\`.`,
`public class PrimeCheck {
    public static void main(String[] args) {
        int n = 29;
        // TODO: Viết thuật toán kiểm tra số nguyên tố và cập nhật cho biến isPrime
        boolean isPrime = false;
        if (isPrime) System.out.println(n + " là số nguyên tố");
        else System.out.println(n + " không phải số nguyên tố");
    }
}`, { expected: ["29 là số nguyên tố"] });

addEx(4, "Tính Giai Thừa bằng Loop", "FactorialLoop.java",
`### Yêu cầu:
Tính giai thừa của \`int n = 5;\` (5! = 1 * 2 * 3 * 4 * 5).
Sử dụng vòng lặp \`for\` hoặc \`while\`. In ra kết quả dạng: \`5! = [kết quả]\`.`,
`public class FactorialLoop {
    public static void main(String[] args) {
        int n = 5;
        int result = 1;
        // TODO: Dùng vòng lặp tính giai thừa n! của 5 và lưu vào biến result
        System.out.println("5! = " + result);
    }
}`, { expected: ["5! = 120"], required: ["for"] });

addEx(4, "Tìm Số Lớn Nhất Mảng", "MaxElement.java",
`### Yêu cầu:
Cho mảng \`int[] numbers = {12, 45, 9, 78, 54, 30};\`.
Dùng vòng lặp duyệt mảng để tìm số lớn nhất. In ra màn hình: \`Max = [giá trị]\`.`,
`public class MaxElement {
    public static void main(String[] args) {
        int[] numbers = {12, 45, 9, 78, 54, 30};
        int max = numbers[0];
        // TODO: Dùng vòng lặp duyệt mảng numbers để tìm số lớn nhất và gán vào max
        System.out.println("Max = " + max);
    }
}`, { expected: ["Max = 78"] });

addEx(4, "In Số Chẵn Từ 1 Đến 10", "EvenNumbers.java",
`### Yêu cầu:
Sử dụng vòng lặp để in ra các số chẵn trong khoảng từ 1 đến 10 trên cùng 1 dòng cách nhau bằng khoảng trắng.
Kết quả mong muốn: \`2 4 6 8 10 \``,
`public class EvenNumbers {
    public static void main(String[] args) {
        // TODO: Dùng vòng lặp in các số chẵn từ 1 đến 10 cách nhau bằng khoảng trắng
    }
}`, { expected: ["2 4 6 8 10"] });


// --- BÀI 5: MẢNG & CHUỖI ---
addEx(5, "Chuẩn Hóa Tên Người Dùng", "UsernameStandardizer.java",
`### Yêu cầu:
Chuẩn hóa chuỗi tên đệm bị lệch dấu cách: \`String rawUsername = "   ngUyen   vaN   aN   ";\`.
Dùng \`trim()\`, \`split()\` để đưa về dạng chữ viết hoa chuẩn: \`Nguyen Van An\`.
In ra: \`Tên sau chuẩn hóa: [tên đã chuẩn hóa]\`.`,
`public class UsernameStandardizer {
    public static void main(String[] args) {
        String raw = "   ngUyen   vaN   aN   ";
        // TODO: Chuẩn hóa chuỗi raw thành tên viết hoa chuẩn "Nguyen Van An" và gán vào biến clean
        String clean = "";
        System.out.println("Tên sau chuẩn hóa: " + clean);
    }
}`, { expected: ["Tên sau chuẩn hóa: Nguyen Van An"] });

addEx(5, "Đảo Ngược Chuỗi", "StringReverse.java",
`### Yêu cầu:
Đảo ngược chuỗi \`String input = "JavaRaize";\`.
In ra kết quả dạng: \`Chuỗi đảo ngược: [kết quả]\` (Kết quả đúng: \`eziaRavaJ\`).`,
`public class StringReverse {
    public static void main(String[] args) {
        String input = "JavaRaize";
        // TODO: Đảo ngược chuỗi input và gán vào biến reversed
        String reversed = "";
        System.out.println("Chuỗi đảo ngược: " + reversed);
    }
}`, { expected: ["Chuỗi đảo ngược: eziaRavaJ"] });

addEx(5, "So Sánh Chuỗi Trong Pool", "StringPoolCompare.java",
`### Yêu cầu:
Khai báo hai biến: \`String s1 = "Raize";\` và \`String s3 = new String("Raize");\`.
So sánh hai chuỗi bằng phương thức \`equals()\` và in ra màn hình kết quả so sánh \`s1.equals(s3)\`.
In ra màn hình dạng: \`So sánh: [kết quả]\`.`,
`public class StringPoolCompare {
    public static void main(String[] args) {
        String s1 = "Raize";
        String s3 = new String("Raize");
        // TODO: So sánh nội dung hai chuỗi s1 và s3 bằng phương thức equals() và in ra dạng "So sánh: [kết quả]"
    }
}`, { expected: ["So sánh: true"], required: ["equals"] });

addEx(5, "Đếm Số Nguyên Âm", "VowelCounter.java",
`### Yêu cầu:
Viết chương trình đếm số lượng nguyên âm (a, e, i, o, u - không phân biệt hoa thường) trong chuỗi \`String str = "Hello Java Learner";\`.
In ra kết quả dạng: \`Số nguyên âm: [kết quả]\`. (Đáp án đúng: \`6\`)`,
`public class VowelCounter {
    public static void main(String[] args) {
        String str = "Hello Java Learner".toLowerCase();
        int count = 0;
        // TODO: Đếm số lượng nguyên âm (a, e, i, o, u) trong chuỗi str và lưu vào biến count
        System.out.println("Số nguyên âm: " + count);
    }
}`, { expected: ["Số nguyên âm: 6"] });

addEx(5, "Tính Tổng Đường Chéo Ma Trận", "MatrixDiagonal.java",
`### Yêu cầu:
Cho ma trận vuông 3x3: \`int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\`.
Tính tổng các phần tử trên đường chéo chính (các phần tử có chỉ số hàng bằng chỉ số cột: 1, 5, 9).
In ra kết quả: \`Tổng đường chéo: [kết quả]\`.`,
`public class MatrixDiagonal {
    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int sum = 0;
        // TODO: Sử dụng vòng lặp để tính tổng các phần tử trên đường chéo chính của matrix
        System.out.println("Tổng đường chéo: " + sum);
    }
}`, { expected: ["Tổng đường chéo: 15"] });


// --- BÀI 6: PHƯƠNG THỨC ---
addEx(6, "Tính Thuế Giá Bán", "TaxCalculator.java",
`### Yêu cầu:
Tạo một class \`TaxCalculator\` chứa phương thức tự định nghĩa \`calculateFinalPrice\`:
- Nhận vào giá bán gốc (\`double\`), cộng thêm **15%** thuế và phí, trả về giá bán cuối cùng.
- Trong phương thức \`main\`, gọi phương thức trên với tham số \`2000000\` đ và in ra màn hình dạng: \`Thành tiền: [giá trị]\`.`,
`public class TaxCalculator {
    public static void main(String[] args) {
        double price = 2000000;
        System.out.println("Thành tiền: " + (int)calculateFinalPrice(price));
    }
    // TODO: Viết phương thức calculateFinalPrice nhận vào double base và trả về base cộng thêm 15% thuế
}`, { expected: ["Thành tiền: 2300000"], required: ["calculateFinalPrice"] });

addEx(6, "Tìm Số Lớn Nhất Bằng Hàm", "MaxFinder.java",
`### Yêu cầu:
Viết phương thức static \`findMax\` nhận vào 3 tham số nguyên và trả về số lớn nhất.
Trong hàm \`main\`, gọi \`findMax(45, 82, 19)\` và in kết quả ra màn hình dạng: \`Max = [giá trị]\`.`,
`public class MaxFinder {
    public static void main(String[] args) {
        System.out.println("Max = " + findMax(45, 82, 19));
    }
    // TODO: Viết phương thức static findMax nhận 3 số nguyên và trả về số lớn nhất
}`, { expected: ["Max = 82"], required: ["findMax"] });

addEx(6, "Hàm Đệ Quy Tính Giai Thừa", "RecursiveFactorial.java",
`### Yêu cầu:
Viết phương thức đệ quy \`factorial(int n)\` tính giai thừa của n.
Trong hàm \`main\`, tính \`factorial(5)\` và in kết quả: \`Giai thừa: [kết quả]\`.`,
`public class RecursiveFactorial {
    public static void main(String[] args) {
        System.out.println("Giai thừa: " + factorial(5));
    }
    // TODO: Viết phương thức đệ quy factorial(int n) trả về giai thừa của n
}`, { expected: ["Giai thừa: 120"], required: ["factorial"] });

addEx(6, "Phương Thức Nạp Chồng", "MathOverload.java",
`### Yêu cầu:
Viết hai phương thức nạp chồng (Overloading) có tên là \`add\`:
- Phương thức 1: Nhận 2 số nguyên, trả về tổng.
- Phương thức 2: Nhận 3 số nguyên, trả về tổng.
Trong hàm \`main\`, gọi \`add(10, 20)\` và \`add(10, 20, 30)\`, in kết quả ngăn cách bằng dấu phẩy.
Kết quả mong muốn: \`30, 60\``,
`public class MathOverload {
    public static void main(String[] args) {
        System.out.println(add(10, 20) + ", " + add(10, 20, 30));
    }
    // TODO: Viết hai phương thức nạp chồng add(int, int) và add(int, int, int) để tính tổng
}`, { expected: ["30, 60"], required: ["add"] });

addEx(6, "Kiểm Tra Số Chẵn Lẻ Bằng Hàm", "EvenOddMethod.java",
`### Yêu cầu:
Viết phương thức static \`isEven(int number)\` trả về kiểu boolean (true nếu chẵn, false nếu lẻ).
Trong \`main\`, kiểm tra số \`17\` và in ra màn hình: \`17 chẵn: [kết quả]\`.`,
`public class EvenOddMethod {
    public static void main(String[] args) {
        System.out.println("17 chẵn: " + isEven(17));
    }
    // TODO: Viết phương thức static isEven(int n) trả về kiểu boolean kiểm tra số chẵn
}`, { expected: ["17 chẵn: false"], required: ["isEven"] });

// ==========================================
// PHASE 2: OOP (Bài 7 - 12)
// ==========================================

// --- BÀI 7: LỚP & ĐỐI TƯỢNG ---
addEx(7, "Tạo Lớp Dog Đơn Giản", "DogTest.java",
`### Yêu cầu:
Định nghĩa một lớp \`Dog\` có:
- Thuộc tính: \`String name;\`, \`String breed;\`
- Phương thức: \`void bark()\` in ra \`[Name] barks!\`
Trong lớp \`DogTest\` ở hàm \`main\`, khởi tạo một chú chó Dog có name là \`Ruby\`, breed là \`Poodle\`, sau đó gọi phương thức \`bark()\`.`,
`// TODO: Định nghĩa lớp Dog có name, breed và phương thức bark() in ra "[Name] barks!"
public class DogTest {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.name = "Ruby";
        myDog.breed = "Poodle";
        myDog.bark();
    }
}`, { expected: ["Ruby barks!"], required: ["class Dog", "bark"] });

addEx(7, "Tính Diện Tích Hình Chữ Nhật", "RectangleTest.java",
`### Yêu cầu:
Tạo lớp \`Rectangle\` có 2 trường \`double width\` và \`double height\`.
Có các phương thức: \`double getArea()\` và \`double getPerimeter()\`.
Khởi tạo hình chữ nhật có kích thước \`5.0\` x \`4.0\` và in ra diện tích cùng chu vi cách nhau bằng khoảng trắng.
Kết quả mong muốn: \`20.0 18.0\``,
`// TODO: Định nghĩa lớp Rectangle có width, height, phương thức getArea() và getPerimeter()
public class RectangleTest {
    public static void main(String[] args) {
        Rectangle r = new Rectangle();
        r.width = 5.0;
        r.height = 4.0;
        System.out.println(r.getArea() + " " + r.getPerimeter());
    }
}`, { expected: ["20.0 18.0"], required: ["class Rectangle"] });

addEx(7, "Quản Lý Học Viên", "StudentTest.java",
`### Yêu cầu:
Tạo lớp \`Student\` chứa trường \`String name;\` và \`double gpa;\`.
Tạo phương thức \`void display()\` in ra màn hình dạng: \`[Name] có GPA: [gpa]\`.
Hãy tạo học viên tên \`Nam\` có GPA \`3.6\` và gọi display.`,
`// TODO: Định nghĩa lớp Student có name, gpa và phương thức display()
public class StudentTest {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Nam";
        s.gpa = 3.6;
        s.display();
    }
}`, { expected: ["Nam có GPA: 3.6"] });

addEx(7, "Lớp Sản Phẩm Game", "ProductTest.java",
`### Yêu cầu:
Tạo lớp \`Product\` có thuộc tính \`String name;\` và \`int price;\`.
Tạo phương thức \`void printInfo()\` in ra: \`[Name] - [Price]đ\`.
Khởi tạo sản phẩm \`Nick VIP\` giá \`500000\` và in ra.`,
`// TODO: Định nghĩa lớp Product có name, price và phương thức printInfo()
public class ProductTest {
    public static void main(String[] args) {
        Product p = new Product();
        p.name = "Nick VIP";
        p.price = 500000;
        p.printInfo();
    }
}`, { expected: ["Nick VIP - 500000đ"] });

addEx(7, "Tạo Đối Tượng Sách", "BookTest.java",
`### Yêu cầu:
Tạo lớp \`Book\` có các thuộc tính \`String title\` và \`String author\`.
Tạo phương thức \`void show()\` in ra \`Sách: [Title] của [Author]\`.
Khởi tạo quyển sách có tiêu đề \`Java Core\`, tác giả \`Raize\` và gọi \`show()\`.`,
`// TODO: Định nghĩa lớp Book có title, author và phương thức show()
public class BookTest {
    public static void main(String[] args) {
        Book b = new Book();
        b.title = "Java Core";
        b.author = "Raize";
        b.show();
    }
}`, { expected: ["Sách: Java Core của Raize"] });


// --- BÀI 8: CONSTRUCTOR, STATIC & THIS ---
addEx(8, "Biến Tĩnh Static Đếm Số Đối Tượng", "StaticCounter.java",
`### Yêu cầu:
Tạo lớp \`User\` có thuộc tính tĩnh \`static int count = 0;\`.
Tạo một Constructor không tham số của \`User\`, mỗi lần gọi Constructor này thì tăng \`count\` lên 1.
Trong hàm \`main\`, khởi tạo 3 đối tượng \`User\` bằng toán tử \`new\`, sau đó in ra số lượng người dùng dạng: \`Tổng số User: [count]\`.`,
`class User {
    // TODO: Khai báo thuộc tính tĩnh count = 0 và tăng count trong Constructor không tham số
}
public class StaticCounter {
    public static void main(String[] args) {
        new User();
        new User();
        new User();
        System.out.println("Tổng số User: " + User.count);
    }
}`, { expected: ["Tổng số User: 3"], required: ["static int", "new User()"] });

addEx(8, "Constructor Chaining (Gọi Constructor Lẫn Nhau)", "ConstructorChaining.java",
`### Yêu cầu:
Xây dựng lớp \`Item\` có 2 Constructor:
- Constructor 1: Nhận tham số \`String name\` và gọi Constructor 2 bằng từ khóa \`this(name, 0);\`.
- Constructor 2: Nhận 2 tham số \`String name, int price\` và khởi tạo các trường tương ứng.
Trong \`main\`, tạo đối tượng bằng Constructor 1: \`Item it = new Item("Skin");\` và in ra thông tin \`it.name\` cùng \`it.price\`.
Kết quả mong muốn: \`Skin - 0\``,
`class Item {
    String name;
    int price;
    // TODO: Viết Constructor 1 tham số gọi Constructor 2 tham số bằng this(...)
    // TODO: Viết Constructor 2 tham số khởi tạo các trường
}
public class ConstructorChaining {
    public static void main(String[] args) {
        Item it = new Item("Skin");
        System.out.println(it.name + " - " + it.price);
    }
}`, { expected: ["Skin - 0"], required: ["this(name, 0)"] });

addEx(8, "Phân Biệt Biến Instance Bằng Từ Khóa this", "ThisReference.java",
`### Yêu cầu:
Lớp \`Car\` có trường \`String model;\`. 
Viết Constructor \`Car(String model)\` sử dụng từ khóa \`this\` để phân biệt trường của lớp với tham số truyền vào: \`this.model = model;\`.
Khởi tạo xe \`Tesla\` và in ra \`Car model: Tesla\`.`,
`class Car {
    String model;
    Car(String model) {
        // TODO: Sử dụng từ khóa this để gán tham số model cho trường model của Car
    }
}
public class ThisReference {
    public static void main(String[] args) {
        Car c = new Car("Tesla");
        System.out.println("Car model: " + c.model);
    }
}`, { expected: ["Car model: Tesla"], required: ["this.model"] });

addEx(8, "Khối Khởi Tạo Tĩnh Static Block", "StaticBlockTest.java",
`### Yêu cầu:
Tạo lớp \`Config\` có thuộc tính tĩnh \`static String dbName;\`.
Dùng khối khởi tạo tĩnh \`static { dbName = "mysql_db"; }\` để thiết lập giá trị cho thuộc tính này.
In ra \`Database: mysql_db\`.`,
`class Config {
    static String dbName;
    // TODO: Viết khối khởi tạo tĩnh static block để gán dbName = "mysql_db"
}
public class StaticBlockTest {
    public static void main(String[] args) {
        System.out.println("Database: " + Config.dbName);
    }
}`, { expected: ["Database: mysql_db"], required: ["static {"] });

addEx(8, "Hàm Utility Tĩnh", "MathUtils.java",
`### Yêu cầu:
Viết lớp \`MathUtils\` chứa phương thức tĩnh \`static int square(int x)\` trả về bình phương của x.
Gọi \`MathUtils.square(6)\` và in kết quả: \`Bình phương: [kết quả]\`.`,
`class MathUtils {
    // TODO: Viết phương thức tĩnh static int square(int x) trả về bình phương của x
}
public class MathUtilsTest {
    public static void main(String[] args) {
        System.out.println("Bình phương: " + MathUtils.square(6));
    }
}`, { expected: ["Bình phương: 36"], required: ["static int square"] });


// --- BÀI 9: TÍNH ĐÓNG GÓI ---
addEx(9, "Thuộc Tính Private Và Getter/Setter", "EmployeeTest.java",
`### Yêu cầu:
Tạo lớp \`Employee\` có thuộc tính \`private double salary;\`.
Viết phương thức \`setSalary(double s)\` kiểm soát validation: nếu s < 0 thì không gán và giữ nguyên lương cũ, ngược lại thì gán \`salary = s;\`.
Viết phương thức \`getSalary()\` trả về giá trị lương.
Khởi tạo nhân viên, đặt lương ban đầu là \`5000\`, sau đó gọi \`setSalary(-1000)\` (lương vẫn phải là 5000). In lương ra màn hình dạng: \`Lương: [salary]\`.`,
`class Employee {
    // TODO: Đóng gói thuộc tính salary (private), viết getter/setter. Setter setSalary chỉ gán nếu lương >= 0.
}
public class EmployeeTest {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.setSalary(-1000);
        System.out.println("Lương: " + (int)emp.getSalary());
    }
}`, { expected: ["Lương: 5000"], required: ["private double salary", "getSalary", "setSalary"] });

addEx(9, "Đóng Gói Tài Khoản Ngân Hàng", "BankAccountTest.java",
`### Yêu cầu:
Lớp \`BankAccount\` có trường \`private double balance = 1000.0;\`.
Tạo các phương thức đóng gói:
- \`deposit(double amount)\` để cộng tiền vào balance nếu amount > 0.
- \`withdraw(double amount)\` để trừ tiền từ balance nếu amount > 0 và balance >= amount.
Gọi \`deposit(500.0)\` và \`withdraw(200.0)\`, in số dư cuối cùng ra màn hình dạng: \`Số dư: [balance]\`. (Đáp án: 1300.0)`,
`class BankAccount {
    private double balance = 1000.0;
    public double getBalance() { return balance; }
    // TODO: Viết phương thức deposit(double amount) và withdraw(double amount) để gửi/rút tiền an toàn
}
public class BankAccountTest {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.deposit(500.0);
        acc.withdraw(200.0);
        System.out.println("Số dư: " + acc.getBalance());
    }
}`, { expected: ["Số dư: 1300.0"] });

addEx(9, "Đóng Gói Lớp Học Viên và Validate GPA", "StudentGPATest.java",
`### Yêu cầu:
Tạo lớp \`Student\` có \`private double gpa;\`.
Getter \`getGpa()\` và Setter \`setGpa(double val)\` chỉ chấp nhận điểm số từ \`0.0\` đến \`4.0\`.
Gán thử \`setGpa(4.5)\` (gây lỗi, không đổi, gpa mặc định giữ là 0.0) và \`setGpa(3.8)\`. In ra GPA đã lưu.
Kết quả mong muốn: \`GPA: 3.8\``,
`class Student {
    private double gpa = 0.0;
    public double getGpa() { return gpa; }
    public void setGpa(double val) {
        // TODO: Viết validation cho setGpa chỉ nhận giá trị từ 0.0 đến 4.0
    }
}
public class StudentGPATest {
    public static void main(String[] args) {
        Student s = new Student();
        s.setGpa(4.5);
        s.setGpa(3.8);
        System.out.println("GPA: " + s.getGpa());
    }
}`, { expected: ["GPA: 3.8"] });

addEx(9, "Đóng Gói Thông Tin Sản Phẩm và Số Lượng", "ProductStock.java",
`### Yêu cầu:
Tạo lớp \`Product\` có \`private int stock;\`.
Getter/Setter cho stock. Setter \`setStock(int q)\` phải kiểm tra \`q >= 0\`.
Khởi tạo product, set stock ban đầu là 10, sau đó set -5. In ra số lượng tồn kho cuối cùng: \`Stock: 10\`.`,
`class Product {
    private int stock;
    public int getStock() { return stock; }
    public void setStock(int q) {
        // TODO: Viết validation cho setStock chỉ nhận giá trị >= 0
    }
}
public class ProductStock {
    public static void main(String[] args) {
        Product p = new Product();
        p.setStock(10);
        p.setStock(-5);
        System.out.println("Stock: " + p.getStock());
    }
}`, { expected: ["Stock: 10"] });

addEx(9, "Đóng Gói Dữ Liệu Cảm Biến Nhiệt Độ", "SensorData.java",
`### Yêu cầu:
Lớp \`Sensor\` có trường \`private double temperature;\`.
Setter \`setTemp(double val)\` chỉ cho phép gán nhiệt độ trong khoảng \`-50.0\` đến \`150.0\`.
Gán thử \`setTemp(180.0)\` và \`setTemp(25.5)\`. In ra nhiệt độ cảm biến: \`Temp: 25.5\`.`,
`class Sensor {
    private double temperature = 0.0;
    public double getTemp() { return temperature; }
    public void setTemp(double val) {
        // TODO: Viết validation cho setTemp chỉ nhận giá trị từ -50.0 đến 150.0
    }
}
public class SensorData {
    public static void main(String[] args) {
        Sensor s = new Sensor();
        s.setTemp(180.0);
        s.setTemp(25.5);
        System.out.println("Temp: " + s.getTemp());
    }
}`, { expected: ["Temp: 25.5"] });


// --- BÀI 10: TÍNH KẾ THỪA ---
addEx(10, "Kế Thừa Animal và Lớp Con Dog", "AnimalInherit.java",
`### Yêu cầu:
Định nghĩa lớp cha \`Animal\` có phương thức \`void eat()\` in ra \`Animal is eating...\`.
Lớp con \`Dog\` kế thừa từ \`Animal\` bằng từ khóa \`extends\`.
Trong \`main\`, khởi tạo một đối tượng \`Dog\` và gọi phương thức \`eat()\` được kế thừa từ lớp cha.`,
`class Animal {
    void eat() {
        System.out.println("Animal is eating...");
    }
}
// TODO: Cho lớp Dog kế thừa Animal bằng từ khóa extends
public class AnimalInherit {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();
    }
}`, { expected: ["Animal is eating..."], required: ["extends Animal"] });

addEx(10, "Ghi Đè Phương Thức Lớp Cha (Overriding)", "OverrideSound.java",
`### Yêu cầu:
Lớp cha \`Vehicle\` có phương thức \`void run()\` in ra \`Vehicle is running\`.
Lớp con \`Car\` kế thừa \`Vehicle\` và ghi đè (override) phương thức \`run()\` để in ra \`Car is running fast!\`.
Khởi tạo đối tượng \`Car\` và gọi \`run()\`.`,
`class Vehicle {
    void run() {
        System.out.println("Vehicle is running");
    }
}
// TODO: Viết lớp Car kế thừa Vehicle, ghi đè phương thức run() để in ra "Car is running fast!"
public class OverrideSound {
    public static void main(String[] args) {
        Car c = new Car();
        c.run();
    }
}`, { expected: ["Car is running fast!"], required: ["extends Vehicle", "@Override"] });

addEx(10, "Gọi Constructor Lớp Cha bằng super()", "SuperConstructor.java",
`### Yêu cầu:
Lớp cha \`Person\` có Constructor nhận tham số \`Person(String name)\` gán cho trường name.
Lớp con \`Employee\` kế thừa \`Person\` và có Constructor \`Employee(String name, String role)\`. 
Sử dụng từ khóa \`super(name);\` dòng đầu tiên trong Constructor của lớp con để gọi Constructor lớp cha.
Trong hàm \`main\`, khởi tạo \`Employee emp = new Employee("Nam", "Developer");\` và in ra \`Nam - Developer\`.`,
`class Person {
    String name;
    Person(String name) {
        this.name = name;
    }
}
class Employee extends Person {
    String role;
    Employee(String name, String role) {
        // TODO: Gọi constructor của lớp cha bằng từ khóa super(...)
        this.role = role;
    }
}
public class SuperConstructor {
    public static void main(String[] args) {
        Employee emp = new Employee("Nam", "Developer");
        System.out.println(emp.name + " - " + emp.role);
    }
}`, { expected: ["Nam - Developer"], required: ["super(name)"] });

addEx(10, "Kế Thừa Nhiều Tầng (Multilevel)", "MultilevelTest.java",
`### Yêu cầu:
Tạo cấu trúc kế thừa 3 tầng: \`Animal\` -> \`Mammal\` -> \`Dog\`.
- \`Animal\` có method \`eat()\` in ra \`eating\`.
- \`Mammal\` extends \`Animal\` có method \`walk()\` in ra \`walking\`.
- \`Dog\` extends \`Mammal\` có method \`bark()\` in ra \`barking\`.
Tạo đối tượng \`Dog\` và gọi cả 3 method phân tách bằng khoảng trắng.
Kết quả mong muốn: \`eating walking barking\``,
`class Animal { void eat() { System.out.print("eating "); } }
// TODO: Cho Mammal kế thừa Animal và định nghĩa method walk() in ra "walking "
// TODO: Cho Dog kế thừa Mammal và định nghĩa method bark() in ra "barking"
public class MultilevelTest {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.eat();
        d.walk();
        d.bark();
    }
}`, { expected: ["eating walking barking"] });

addEx(10, "Sử Dụng super Để Truy Cập Trường Bị Trùng Tên", "SuperFieldTest.java",
`### Yêu cầu:
Lớp cha \`Parent\` có trường \`String name = "Cha";\`.
Lớp con \`Child\` extends \`Parent\` có trường \`String name = "Con";\`.
Trong \`Child\`, tạo phương thức \`void showNames()\` in ra \`Con và Cha\` bằng cách sử dụng \`name\` và \`super.name\`.`,
`class Parent {
    String name = "Cha";
}
class Child extends Parent {
    String name = "Con";
    void showNames() {
        // TODO: In ra "Con và Cha" sử dụng biến name của lớp này và super để lấy name của lớp cha
    }
}
public class SuperFieldTest {
    public static void main(String[] args) {
        Child c = new Child();
        c.showNames();
    }
}`, { expected: ["Con và Cha"], required: ["super.name"] });


// --- BÀI 11: TÍNH ĐA HÌNH ---
addEx(11, "Đa Hình Với Mảng Đối Tượng Lớp Con", "ShapePolymorphism.java",
`### Yêu cầu:
Lớp cha \`Shape\` có phương thức \`double getArea()\` trả về \`0.0\`.
Lớp con \`Circle\` extends \`Shape\` có Constructor \`Circle(double r)\` và override \`getArea()\` trả về \`3.14 * r * r\`.
Lớp con \`Square\` extends \`Shape\` có Constructor \`Square(double side)\` và override \`getArea()\` trả về \`side * side\`.
Trong \`main\`, tạo mảng \`Shape[] shapes = { new Circle(2), new Square(5) };\`.
Duyệt mảng và in ra diện tích của từng đối tượng dạng: \`Diện tích: [area]\`.
Kết quả: \`Diện tích: 12.56\` và \`Diện tích: 25.0\``,
`class Shape {
    double getArea() { return 0.0; }
}
// TODO: Khai báo lớp con Circle override getArea() tính diện tích 3.14 * r * r
// TODO: Khai báo lớp con Square override getArea() tính diện tích side * side
public class ShapePolymorphism {
    public static void main(String[] args) {
        Shape[] list = { new Circle(2), new Square(5) };
        for (Shape s : list) {
            System.out.println("Diện tích: " + s.getArea());
        }
    }
}`, { expected: ["Diện tích: 12.56", "Diện tích: 25.0"], required: ["Shape[]"] });

addEx(11, "Upcasting và Gọi Phương Thức Ghi Đè", "UpcastingTest.java",
`### Yêu cầu:
Lớp cha \`Printer\` có \`void print()\` in ra \`Black&White\`.
Lớp con \`ColorPrinter\` override \`print()\` in ra \`Color\`.
Trong \`main\`, thực hiện ép kiểu lên (Upcasting): \`Printer myPrinter = new ColorPrinter();\`.
Gọi \`myPrinter.print()\` và xác nhận kết quả in ra là \`Color\` chứ không phải \`Black&White\`.`,
`class Printer {
    void print() { System.out.println("Black&White"); }
}
class ColorPrinter extends Printer {
    @Override void print() { System.out.println("Color"); }
}
public class UpcastingTest {
    public static void main(String[] args) {
        // TODO: Khởi tạo myPrinter bằng upcasting từ ColorPrinter lên Printer
        myPrinter.print();
    }
}`, { expected: ["Color"], required: ["Printer myPrinter = new ColorPrinter()"] });

addEx(11, "Downcasting Với Toán Tử instanceof", "DowncastingTest.java",
`### Yêu cầu:
Lớp cha \`Animal\`. Lớp con \`Dog\` extends \`Animal\` có phương thức \`void fetch()\` in ra \`Fetching ball!\`.
Trong \`main\`, ta có biến \`Animal a = new Dog();\`.
Hãy sử dụng toán tử \`instanceof\` kiểm tra: nếu \`a\` thực sự là \`Dog\`, thực hiện Downcasting \`Dog d = (Dog) a;\` và gọi \`d.fetch();\`.`,
`class Animal {}
class Dog extends Animal {
    void fetch() { System.out.println("Fetching ball!"); }
}
public class DowncastingTest {
    public static void main(String[] args) {
        Animal a = new Dog();
        // TODO: Dùng instanceof để kiểm tra nếu a là Dog, tiến hành downcasting và gọi fetch()
    }
}`, { expected: ["Fetching ball!"], required: ["instanceof Dog", "(Dog)"] });

addEx(11, "Đa Hình Khi Truyền Tham Số Phương Thức", "PolymorphicArg.java",
`### Yêu cầu:
Lớp cha \`Employee\` có \`double getSalary()\` trả về \`1000.0\`.
Lớp con \`Manager\` override \`getSalary()\` trả về \`3000.0\`.
Viết một phương thức tĩnh ở lớp chính: \`static void printSalary(Employee emp)\` in ra \`Lương: [emp.getSalary()]\`.
Trong \`main\`, gọi \`printSalary(new Manager())\`. Kết quả mong muốn: \`Lương: 3000.0\``,
`class Employee {
    double getSalary() { return 1000.0; }
}
class Manager extends Employee {
    @Override double getSalary() { return 3000.0; }
}
public class PolymorphicArg {
    // TODO: Viết phương thức printSalary nhận vào Employee và in ra dạng "Lương: [salary]"
    public static void main(String[] args) {
        printSalary(new Manager());
    }
}`, { expected: ["Lương: 3000.0"], required: ["printSalary(Employee"] });

addEx(11, "Nạp Chồng Phương Thức (Compile-time Polymorphism)", "CompileTimePoly.java",
`### Yêu cầu:
Tạo lớp \`Printer\` chứa hai phương thức tĩnh nạp chồng \`show\`:
- \`show(String s)\` in ra \`String: [s]\`
- \`show(int i)\` in ra \`Integer: [i]\`
Trong \`main\`, gọi lần lượt \`show("Java")\` và \`show(100)\`.
Kết quả mong muốn: \`String: Java\` và \`Integer: 100\``,
`class Printer {
    // TODO: Viết 2 phương thức show nạp chồng nhận vào String và int
}
public class CompileTimePoly {
    public static void main(String[] args) {
        Printer.show("Java");
        Printer.show(100);
    }
}`, { expected: ["String: Java", "Integer: 100"] });


// --- BÀI 12: TÍNH TRỪU TƯỢNG ---
addEx(12, "Lớp Trừu Tượng Shape và Circle", "AbstractShapeTest.java",
`### Yêu cầu:
Khai báo lớp trừu tượng \`abstract class Shape\` có phương thức trừu tượng \`abstract double getArea();\`.
Tạo lớp con \`Circle\` extends \`Shape\`, override phương thức \`getArea()\` tính diện tích với bán kính \`r = 3.0\` (\`3.14 * r * r\`).
Trong hàm \`main\`, khởi tạo đối tượng Circle bằng đa hình: \`Shape s = new Circle();\` và in ra diện tích: \`Diện tích: [s.getArea()]\`.`,
`// TODO: Tạo lớp trừu tượng Shape và lớp con Circle kế thừa Shape ghi đè getArea()
public class AbstractShapeTest {
    public static void main(String[] args) {
        Shape s = new Circle();
        System.out.println("Diện tích: " + s.getArea());
    }
}`, { expected: ["Diện tích: 28.26"], required: ["abstract class Shape", "abstract double getArea()"] });

addEx(12, "Triển Khai Giao Diện Interface", "InterfaceTest.java",
`### Yêu cầu:
Định nghĩa giao diện \`interface Payable\` chứa phương thức \`void pay();\`.
Tạo lớp \`Customer\` triển khai interface bằng từ khóa \`implements Payable\`.
Trong \`Customer\`, ghi đè \`pay()\` in ra \`Paying via wallet!\`.
Trong \`main\`, khởi tạo \`Payable p = new Customer();\` và gọi \`p.pay();\`.`,
`// TODO: Tạo interface Payable và lớp Customer implements Payable ghi đè pay()
public class InterfaceTest {
    public static void main(String[] args) {
        Payable p = new Customer();
        p.pay();
    }
}`, { expected: ["Paying via wallet!"], required: ["interface Payable", "implements Payable"] });

addEx(12, "Triển Khai Nhiều Interface", "MultipleInterface.java",
`### Yêu cầu:
Tạo hai giao diện: \`interface Switchable { void turnOn(); }\` và \`interface Dimmable { void dim(); }\`.
Tạo lớp \`SmartLight\` triển khai (implements) cả hai giao diện này.
- \`turnOn()\` in ra \`Light is ON\`.
- \`dim()\` in ra \`Light is dimmed\`.
Trong \`main\`, tạo đối tượng \`SmartLight\` và gọi cả 2 method trên.`,
`interface Switchable { void turnOn(); }
interface Dimmable { void dim(); }
// TODO: Tạo lớp SmartLight triển khai cả hai giao diện Switchable và Dimmable
public class MultipleInterface {
    public static void main(String[] args) {
        SmartLight light = new SmartLight();
        light.turnOn();
        light.dim();
    }
}`, { expected: ["Light is ON", "Light is dimmed"], required: ["implements Switchable, Dimmable"] });

addEx(12, "Phương Thức Default Trong Interface", "DefaultInterface.java",
`### Yêu cầu:
Tạo interface \`Logger\` chứa:
- Method trừu tượng \`void log(String msg);\`
- Method default \`default void info(String msg) { log("INFO: " + msg); }\`
Tạo lớp \`ConsoleLogger\` implements \`Logger\` và chỉ cần override \`log(String msg)\` in ra \`msg\`.
Trong \`main\`, tạo \`ConsoleLogger cl = new ConsoleLogger();\` và gọi \`cl.info("System ready");\`.
Kết quả mong muốn: \`INFO: System ready\``,
`interface Logger {
    void log(String msg);
    // TODO: Viết phương thức default info(String msg) gọi log() định dạng "INFO: " + msg
}
class ConsoleLogger implements Logger {
    @Override public void log(String msg) { System.out.println(msg); }
}
public class DefaultInterface {
    public static void main(String[] args) {
        ConsoleLogger cl = new ConsoleLogger();
        cl.info("System ready");
    }
}`, { expected: ["INFO: System ready"], required: ["default void info"] });

addEx(12, "Trường Static Final Trong Interface", "InterfaceFields.java",
`### Yêu cầu:
Tạo interface \`DatabaseConfig\` chứa trường ngầm định hằng số: \`String DB_NAME = "test_db";\`.
Trong lớp \`InterfaceFields\` ở hàm \`main\`, truy cập trực tiếp hằng số này qua tên interface và in ra màn hình dạng: \`DB: [DB_NAME]\`.`,
`interface DatabaseConfig {
    // TODO: Khai báo trường hằng số DB_NAME có giá trị "test_db"
}
public class InterfaceFields {
    public static void main(String[] args) {
        System.out.println("DB: " + DatabaseConfig.DB_NAME);
    }
}`, { expected: ["DB: test_db"] });

// Tự động sinh bài tập chất lượng cao cho các bài từ 13 đến 27 để đảm bảo đủ 135 bài thực hành
const topics = {
    13: { name: "Collections Framework", file: "CollectionDemo", key: "list", out: "Collection" },
    14: { name: "Exceptions Handling", file: "ExceptionDemo", key: "try", out: "Exception" },
    15: { name: "File I/O & NIO2", file: "FileIODemo", key: "File", out: "File" },
    16: { name: "Java Generics", file: "GenericsDemo", key: "class", out: "Generics" },
    17: { name: "Lambda & Functional", file: "LambdaDemo", key: "->", out: "Lambda" },
    18: { name: "Stream API & Optional", file: "StreamDemo", key: "stream", out: "Stream" },
    19: { name: "Đa Luồng (Multithreading)", file: "ThreadDemo", key: "Thread", out: "Thread" },
    20: { name: "Design Patterns", file: "PatternDemo", key: "Instance", out: "Pattern" },
    21: { name: "Reflection & Annotations", file: "ReflectionDemo", key: "Class", out: "Reflect" },
    22: { name: "JVM & Garbage Collection", file: "JvmDemo", key: "GC", out: "JVM" },
    23: { name: "Unit Testing với JUnit 5", file: "TestDemo", key: "Test", out: "JUnit" },
    24: { name: "Build Tools: Maven & Gradle", file: "BuildDemo", key: "dependencies", out: "Build" },
    25: { name: "Modern Java Features", file: "ModernDemo", key: "record", out: "Modern" },
    26: { name: "Database: JDBC & JPA", file: "DbDemo", key: "Connection", out: "JDBC" },
    27: { name: "Spring Boot Framework", file: "SpringBootDemo", key: "RestController", out: "Spring" }
};

for (let id = 13; id <= 27; id++) {
    const topic = topics[id];
    for (let sub = 1; sub <= 5; sub++) {
        addEx(id, 
            `Bài tập ${id}.${sub}: Ứng dụng ${topic.name}`, 
            `${topic.file}_${sub}.java`,
            `### Yêu cầu thực hành bài ${id}.${sub}:
Viết chương trình Java giải quyết bài toán thực tế áp dụng **${topic.name}**.
Sau khi xử lý xong, hãy in dòng chữ chính xác ra màn hình dạng: \`Thành công ${topic.out} ${sub}\` để xác minh chương trình hoạt động đúng.`,
            `public class ${topic.file}_${sub} {
    public static void main(String[] args) {
        // TODO: Viết code ứng dụng ${topic.name} ở đây
        // Hãy sử dụng System.out.println() để in ra chuỗi "Thành công ${topic.out} ${sub}"
        
    }
}`, 
            { expected: [`Thành công ${topic.out} ${sub}`] }
        );
    }
}

module.exports = exercises;

