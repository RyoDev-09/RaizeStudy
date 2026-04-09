# 📝 Bài Tập Thực Tế – Bài 15: File I/O

> 🎯 **Bối cảnh dự án:** Xử lý **file trong hệ thống** — đọc config, export report, import CSV, ghi log. Đây là 4 use case file I/O phổ biến nhất trong backend.

---

## 🔴 Bài Tập 1: Configuration File Reader ⭐⭐

**Bối cảnh thực tế:** Spring Boot đọc `application.properties`. Đây là implementation đơn giản hóa — bạn sẽ hiểu tại sao `.properties` file hoạt động.

**Yêu cầu:** Tạo `ConfigReader.java` đọc file `shop.properties`:

```properties
# shop.properties
app.name=RaizeShop
app.version=1.0.0
app.port=8080
db.host=localhost
db.port=3306
db.name=raize_db
db.username=admin
db.password=secret123
payment.vat_rate=10.0
payment.platform_fee=5.0
payment.max_transaction=999999999
```

```java
public class ConfigReader {
    private Map<String, String> properties = new HashMap<>();

    public void load(String filePath) throws IOException {
        // Đọc file bằng BufferedReader
        // Bỏ qua dòng trống và comment (bắt đầu bằng #)
        // Parse key=value
        // Trim whitespace  
    }

    public String getString(String key) { ... }
    public String getString(String key, String defaultValue) { ... }
    public int getInt(String key) { ... }
    public double getDouble(String key) { ... }
    public boolean getBoolean(String key) { ... }

    // Hot reload: đọc lại file khi có thay đổi
    public void reload() throws IOException { ... }
}
```

---

## 🟡 Bài Tập 2: CSV Import/Export ⭐⭐

**Bối cảnh thực tế:** Admin upload file CSV sản phẩm, hệ thống parse → validate → import vào "database". Sau đó export danh sách ra CSV để chia sẻ.

**Yêu cầu:** Tạo `CsvService.java`:

```java
public class CsvService {

    // IMPORT: Đọc CSV → List<Product>
    public List<Product> importProducts(String filePath) throws IOException {
        List<Product> products = new ArrayList<>();
        List<String> errors = new ArrayList<>();
        int lineNum = 0;

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String header = br.readLine(); // Skip header
            String line;
            while ((line = br.readLine()) != null) {
                lineNum++;
                try {
                    Product p = parseCsvLine(line);
                    products.add(p);
                } catch (Exception e) {
                    errors.add("Dòng " + lineNum + ": " + e.getMessage());
                }
            }
        }

        // In kết quả import
        System.out.printf("✅ Import thành công: %d sản phẩm%n", products.size());
        if (!errors.isEmpty()) {
            System.out.printf("❌ Lỗi: %d dòng%n", errors.size());
            errors.forEach(System.out::println);
        }

        return products;
    }

    // EXPORT: List<Product> → CSV file
    public void exportProducts(List<Product> products, String filePath) throws IOException {
        try (PrintWriter pw = new PrintWriter(new FileWriter(filePath))) {
            pw.println("id,name,price,category,stock,rating");
            for (Product p : products) {
                pw.printf("%s,\"%s\",%.0f,%s,%d,%.1f%n",
                        p.getId(), p.getName(), p.getPrice(),
                        p.getCategory(), p.getStock(), p.getRating());
            }
        }
        System.out.println("📁 Export thành công: " + filePath);
    }
}
```

---

## 🟡 Bài Tập 3: Audit Log System ⭐⭐

**Bối cảnh thực tế:** Mọi hệ thống tài chính PHẢI có audit log — ghi lại AI làm gì, lúc nào, với data nào. Đây là yêu cầu pháp luật ở nhiều quốc gia.

**Yêu cầu:** Tạo `AuditLogger.java`:

```java
public class AuditLogger {
    private final String logDir;
    private PrintWriter currentWriter;
    private String currentDate;

    public AuditLogger(String logDir) {
        this.logDir = logDir;
        // Tạo thư mục nếu chưa có
    }

    // Mỗi ngày ghi vào file riêng: audit-2024-04-03.log
    public void log(String level, String userId, String action, String details) {
        ensureLogFile(); // Kiểm tra/tạo file cho ngày hiện tại

        String entry = String.format("[%s] %s | user=%s | action=%s | %s",
                getTimestamp(), level, userId, action, details);
        currentWriter.println(entry);
        currentWriter.flush(); // Đảm bảo ghi ngay, không buffer
    }

    // Convenience methods
    public void logLogin(String userId, String ip) {
        log("INFO", userId, "LOGIN", "ip=" + ip);
    }

    public void logPurchase(String userId, String orderId, double amount) {
        log("INFO", userId, "PURCHASE",
                String.format("orderId=%s amount=%.0f", orderId, amount));
    }

    public void logError(String userId, String action, Exception e) {
        log("ERROR", userId, action, "error=" + e.getClass().getSimpleName() + " msg=" + e.getMessage());
    }

    // Đọc log theo ngày (cho admin dashboard)
    public List<String> readLogs(String date) throws IOException { ... }

    // Tìm kiếm trong log (grep-like)
    public List<String> searchLogs(String date, String keyword) throws IOException { ... }

    // Cleanup: xóa log cũ hơn N ngày
    public int cleanupOldLogs(int keepDays) { ... }

    // Đóng writer khi app shutdown
    public void close() {
        if (currentWriter != null) currentWriter.close();
    }
}
```

---

## 🔴 Bài Tập 4: File-Based Cache System ⭐⭐⭐

**Bối cảnh thực tế:** Redis cache quá phức tạp cho app nhỏ. File-based cache là giải pháp đơn giản — serialize data ra file, đọc lại khi cần.

**Yêu cầu:** Tạo `FileCache.java`:

```java
public class FileCache {
    private final String cacheDir;

    // Lưu data vào cache file
    // Key: "products_page_1" → file: cache/products_page_1.cache
    public void put(String key, String data, int ttlSeconds) throws IOException {
        // File format:
        // Dòng 1: expireAt (timestamp)
        // Dòng 2+: data
    }

    // Đọc từ cache, trả null nếu expired hoặc không tồn tại
    public String get(String key) throws IOException {
        // Đọc file
        // Kiểm tra expired
        // Trả data hoặc null
    }

    // Xóa cache entry
    public void invalidate(String key) { ... }

    // Xóa toàn bộ cache
    public void clear() { ... }

    // Thống kê cache
    public void printStats() {
        // Số entry, tổng dung lượng, số entry expired
    }
}

// Sử dụng:
FileCache cache = new FileCache("./cache");

// Cache kết quả search 5 phút
String key = "search_kiem_rong";
String cached = cache.get(key);
if (cached != null) {
    System.out.println("📦 Cache HIT: " + key);
    // Dùng cached data
} else {
    System.out.println("🔍 Cache MISS: " + key);
    String result = productService.search("kiếm rồng"); // "Tốn" performance
    cache.put(key, result, 300); // Cache 5 phút
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `try-with-resources` vs đóng thủ công trong `finally` — viết cả hai và giải thích tại sao Java 7 thêm tính năng này.
- [ ] `BufferedReader` vs `Scanner` vs `Files.readAllLines()` — khi nào dùng cái nào? File 1GB dùng cái nào?
- [ ] Tại sao audit logger dùng `flush()` sau mỗi dòng? Performance impact là gì? Khi nào KHÔNG nên flush?
- [ ] File lock: nếu 2 process cùng ghi log file, xảy ra vấn đề gì? `FileLock` trong Java giải quyết thế nào?

---

👉 **Tiếp theo:** [Bài 16 – Generics](../bai-16-generics/EXERCISES.md)
