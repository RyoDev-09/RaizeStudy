# 📝 Bài Tập Thực Tế – Bài 05: Array & String

> 🎯 **Bối cảnh dự án:** Xử lý **dữ liệu catalogue sản phẩm** — tìm kiếm, filter, sắp xếp, format chuỗi trong RaizeShop.

---

## 🔴 Bài Tập 1: Inventory Manager ⭐⭐

**Bối cảnh thực tế:** Hệ thống quản lý kho hàng — đây là nghiệp vụ cốt lõi của mọi e-commerce. Cần thống kê realtime để quyết định nhập hàng.

**Yêu cầu:** Tạo `InventoryManager.java`:

```java
String[] ten       = {"Kiếm Rồng +10", "Giáp Địa Long", "Nhẫn Ma Lực", 
                      "Hài Cát Bụi", "Kiếm Ánh Sáng", "Khiên Sắt", 
                      "Gậy Pháp Sư", "Dây Chuyền TP"};
double[] gia       = {2_500_000, 3_200_000, 800_000, 
                      450_000,   1_800_000, 1_200_000, 
                      950_000,   600_000};
int[] soLuong      = {5, 0, 12, 3, 0, 8, 1, 15};
double[] doanhThu  = {12_500_000, 0, 9_600_000, 
                      1_350_000,  0, 9_600_000, 
                      950_000,    9_000_000};
```

**Yêu cầu phân tích:**
1. In danh sách sản phẩm HẾT HÀNG với alert
2. In Top 3 sản phẩm doanh thu cao nhất
3. Tính tổng giá trị tồn kho hiện tại (giá × số lượng còn)
4. Tìm sản phẩm có số lượng tồn thấp nhất (cần nhập thêm)
5. Sắp xếp và in danh sách theo giá GIẢM DẦN

**Output mong đợi:**
```
⚠️  CẢNH BÁO HẾT HÀNG:
    - Giáp Địa Long   (mã: RZ-ARM-0002) — Liên hệ nhà cung cấp!
    - Kiếm Ánh Sáng   (mã: RZ-WPN-0005)

🏆 TOP 3 DOANH THU THÁNG:
    1. Kiếm Rồng +10  — 12,500,000 đ
    2. Giáp Địa Long  —  9,600,000 đ (dù hết hàng!)
    2. Khiên Sắt      —  9,600,000 đ

📦 GIÁ TRỊ TỒN KHO: 68,200,000 đ
🔴 CẦN NHẬP THÊM  : Gậy Pháp Sư (còn 1 cái)
```

---

## 🟡 Bài Tập 2: Full-text Search Engine ⭐⭐

**Bối cảnh thực tế:** Tính năng tìm kiếm là trái tim của mọi marketplace. Elasticsearch, Solr đều build trên nguyên tắc này.

**Yêu cầu:** Tạo `SearchEngine.java` implement **full-text search**:

```java
// Dữ liệu: 15 sản phẩm với mô tả chi tiết
String[] ten = {...};
String[] moTa = {
    "Kiếm rồng huyền thoại, sát thương tối đa, phù hợp warrior",
    "Giáp địa long cấp 80, phòng thủ cao, kháng phép thuật",
    ...
};
String[] tuKhoa = {"kiếm", "giáp", "nhẫn", "hài", ...};

// Implement tìm kiếm:
// 1. Tìm trong TÊN sản phẩm (weight: 3 điểm)
// 2. Tìm trong MÔ TẢ (weight: 1 điểm)
// 3. Tìm trong TỪ KHÓA (weight: 2 điểm)
// 4. Tính relevance score cho mỗi kết quả
// 5. Sắp xếp theo relevance score giảm dần
// 6. Không phân biệt hoa/thường
```

**Output mong đợi:**
```
🔍 Tìm kiếm: "kiếm rồng"

Kết quả (3 sản phẩm, sắp xếp theo độ phù hợp):
────────────────────────────────────────────────
[Score: 9] Kiếm Rồng +10        — 2,500,000 đ  ⭐⭐⭐⭐⭐
[Score: 5] Kiếm Ánh Sáng        — 1,800,000 đ  ⭐⭐⭐⭐  
[Score: 2] Giáp Địa Long        — 3,200,000 đ  ⭐⭐⭐   (mention trong mô tả)
```

---

## 🔴 Bài Tập 3: CSV Parser ⭐⭐⭐

**Bối cảnh thực tế:** Admin thường import sản phẩm từ file Excel/CSV. Backend cần parse CSV string thành data objects — đây là bài toán String manipulation thực tế nhất.

**Yêu cầu:** Tạo `CsvParser.java`:

```java
// Dữ liệu CSV thô (như nhận từ file upload)
String csvData = """
    id,name,price,category,quantity,status
    1001,Kiếm Rồng +10,2500000,weapon,5,active
    1002,"Giáp Địa Long, Cấp 80",3200000,armor,0,out_of_stock
    1003,Nhẫn Ma Lực,800000,magic,12,active
    1004,"Hài Cát, Phiên bản Limited",450000,accessory,3,active
    1005,INVALID_PRICE,not_a_number,weapon,5,active
    """;

// TODO:
// 1. Split theo newline để lấy từng dòng
// 2. Parse header dòng đầu tiên
// 3. Parse từng dòng data (chú ý: field trong nháy kép có thể chứa dấu phẩy!)
// 4. Validate: price phải là số hợp lệ, quantity >= 0
// 5. In báo cáo: X dòng thành công, Y dòng lỗi
// 6. In chi tiết dòng lỗi và lý do lỗi
```

**Output mong đợi:**
```
=== KẾT QUẢ IMPORT CSV ===
✅ Thành công: 4 sản phẩm
❌ Lỗi       : 1 dòng

Sản phẩm đã import:
  [1001] Kiếm Rồng +10              — 2,500,000 đ (5 cái)
  [1002] Giáp Địa Long, Cấp 80      — 3,200,000 đ (hết hàng)
  ...

Dòng lỗi:
  Dòng 6: price="not_a_number" — Không phải số hợp lệ
```

---

## 🟡 Bài Tập 4: Log Formatter ⭐⭐

**Bối cảnh thực tế:** Mọi hệ thống backend đều cần ghi log (Logback, Log4j). Đây là cách họ format log message với StringBuilder.

**Yêu cầu:** Tạo `LogFormatter.java` tạo log entry đúng chuẩn:

```java
// Format: [LEVEL] timestamp | requestId | userId | action | details | duration

// Implement LogFormatter.format() dùng StringBuilder để build log string
// Ví dụ output:
// [INFO ] 2024-04-03 15:30:00 | REQ-abc123 | USR-456 | PURCHASE | item=Kiếm Rồng +10 price=2500000 | 125ms
// [ERROR] 2024-04-03 15:30:01 | REQ-abc124 | USR-456 | PAYMENT  | error=InsufficientFunds balance=500000 needed=2500000 | 23ms
// [WARN ] 2024-04-03 15:30:02 | REQ-abc125 | USR-789 | LOGIN     | attempts=4 ip=192.168.1.1 | 8ms

// Tạo 20 log entries cho một "session" mua hàng điển hình
// Đếm số log mỗi level: INFO, WARN, ERROR
// Tính average response time
```

**Thử thách:** Implement `StringBuilder.insert()` để thêm `[CRITICAL]` prefix vào mọi dòng ERROR trong log sau khi đã tạo xong.

---

## 🔴 Bài Tập 5 (BONUS): 2D Array — Ma Trận Giá Theo Khung Giờ ⭐⭐⭐

**Bối cảnh thực tế:** Grab, Gojek tính giá theo giờ và ngày trong tuần. RaizeShop có thể áp dụng "flash sale" theo mô hình tương tự.

**Yêu cầu:** Tạo `DynamicPricing.java`:

```java
// Ma trận giảm giá: [7 ngày trong tuần][24 giờ trong ngày]
double[][] giaGiam = new double[7][24];

// Điền dữ liệu:
// Giờ vàng (6-8am, 12-14pm, 8-10pm): giảm 20%
// Cuối tuần (Sat, Sun): tất cả giờ giảm thêm 5%
// Flash sale (thứ 6, 20-22pm): giảm 40%
// Nếu không có sale: 0%

// In bảng nhiệt (heatmap) dạng text:
// Hàng = ngày, Cột = giờ (chỉ in 6am-11pm)
// [ 0] = không sale | [10] = 10% | [20] = 20% | [40] = 40%

// Tìm: Tổng số slot có sale, giờ nào có sale nhiều nhất
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Bài CSV Parser: tại sao không thể dùng `.split(",")` cho CSV có field trong nháy kép? Viết regex đúng hoặc logic xử lý thủ công.
- [ ] StringBuilder vs String concatenation: trong bài Log Formatter với 1 triệu log entries, hiệu năng chênh nhau bao nhiêu? (Ước tính, giải thích tại sao)
- [ ] Tại sao `Arrays.sort()` dùng được cho `int[]` nhưng không dùng được trực tiếp cho sort custom object theo field? (preview của Comparable/Comparator)
- [ ] `String.split()` với regex: `"a,,b".split(",")` trả về mấy phần tử? Kết quả là gì? Bạn có biết tham số limit?

---

👉 **Tiếp theo:** [Bài 06 – Method](../bai-06-method/EXERCISES.md)
