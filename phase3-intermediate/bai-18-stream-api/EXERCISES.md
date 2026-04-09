# 📝 Bài Tập Thực Tế – Bài 18: Stream API

> 🎯 **Bối cảnh dự án:** Xử lý **dữ liệu hàng loạt** theo style khai báo — cách viết query logic trong Service layer modern Java.

---

## 🔴 Bài Tập 1: Product Service với Stream API ⭐⭐

**Bối cảnh thực tế:** Mọi method trong Service layer của Spring Boot project hiện đại đều dùng Stream API. Đây là bài tập convert từ for-loop sang Stream.

**Yêu cầu:** Implement `ProductService.java` HOÀN TOÀN bằng Stream API (không dùng for/while):

```java
public class ProductService {
    private List<Product> products;

    // Tất cả method dưới đây PHẢI dùng Stream API

    // Tìm kiếm theo keyword (trong tên hoặc mô tả)
    public List<Product> search(String keyword) {
        return products.stream()
                .filter(p -> p.getName().toLowerCase().contains(keyword.toLowerCase())
                          || p.getDescription().toLowerCase().contains(keyword.toLowerCase()))
                .sorted(Comparator.comparingDouble(Product::getRating).reversed())
                .collect(Collectors.toList());
    }

    // Top N sản phẩm bán chạy nhất
    public List<Product> getTopSelling(int n) {
        return products.stream()
                .sorted(Comparator.comparingInt(Product::getSoldCount).reversed())
                .limit(n)
                .collect(Collectors.toList());
    }

    // Tổng giá trị tồn kho
    public double getTotalInventoryValue() {
        return products.stream()
                .mapToDouble(p -> p.getPrice() * p.getStock())
                .sum();
    }

    // Giá trung bình theo category
    public Map<String, Double> getAveragePriceByCategory() {
        return products.stream()
                .collect(Collectors.groupingBy(
                        Product::getCategory,
                        Collectors.averagingDouble(Product::getPrice)));
    }

    // Đếm sản phẩm theo trạng thái stock
    public Map<String, Long> getStockStatusSummary() {
        return products.stream()
                .collect(Collectors.groupingBy(
                        p -> {
                            if (p.getStock() == 0) return "HẾT HÀNG";
                            if (p.getStock() <= 5) return "SẮP HẾT";
                            return "CÒN HÀNG";
                        },
                        Collectors.counting()));
    }

    // Phân trang
    public List<Product> getPage(int page, int size) {
        return products.stream()
                .skip((long)(page - 1) * size)
                .limit(size)
                .collect(Collectors.toList());
    }

    // Sản phẩm có giá ngoại lệ (> 2 std deviation từ giá TB)
    public List<Product> findPriceOutliers() { ... }

    // Dashboard summary string
    public String generateSummary() {
        // Dùng Collectors.joining() để tạo summary report
    }
}
```

---

## 🟡 Bài Tập 2: Order Analytics Dashboard ⭐⭐

**Bối cảnh thực tế:** Admin dashboard hiển thị KPIs — doanh thu, conversion rate, top customers. Tất cả tính bằng Stream aggregate operations.

**Yêu cầu:** Tạo `OrderDashboard.java`:

```java
public class OrderDashboard {
    private List<Order> orders;

    // Doanh thu theo tháng (dùng groupingBy + summingDouble)
    public Map<String, Double> revenueByMonth() {
        return orders.stream()
                .collect(Collectors.groupingBy(
                        o -> o.getCreatedAt().substring(0, 7), // "2024-04"
                        Collectors.summingDouble(Order::getTotalAmount)));
    }

    // Tỉ lệ đơn hàng theo status
    public Map<String, String> statusDistribution() {
        long total = orders.size();
        return orders.stream()
                .collect(Collectors.groupingBy(
                        Order::getStatus, Collectors.counting()))
                .entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        e -> String.format("%.1f%% (%d)", 
                                (double) e.getValue() / total * 100, e.getValue())));
    }

    // Top 5 khách hàng chi tiêu nhiều nhất
    public List<Map.Entry<String, Double>> topSpenders(int n) { ... }

    // Giờ cao điểm (giờ nào có nhiều đơn nhất)
    public Map.Entry<Integer, Long> peakHour() { ... }

    // Đơn hàng trung bình theo ngày trong tuần
    public Map<String, Double> avgOrdersByDayOfWeek() { ... }

    // Print dashboard đẹp
    public void printDashboard() {
        System.out.println("╔══════════════════════════════════════╗");
        System.out.println("║        📊 RAIZESHOP DASHBOARD        ║");
        System.out.println("╠══════════════════════════════════════╣");
        // ... dùng kết quả các method trên
    }
}
```

---

## 🔴 Bài Tập 3: Recommendation Engine ⭐⭐⭐

**Bối cảnh thực tế:** "Sản phẩm liên quan", "Khách hàng cũng mua" — tính năng recommendation cơ bản dựa trên co-occurrence trong đơn hàng.

**Yêu cầu:** Tạo `RecommendationEngine.java`:

```java
public class RecommendationEngine {
    private List<Order> orderHistory;
    private List<Product> allProducts;

    // "Sản phẩm thường mua cùng" — collaborative filtering đơn giản
    public List<Product> getFrequentlyBoughtTogether(String productId, int maxResults) {
        // 1. Tìm tất cả đơn hàng chứa productId
        // 2. Gom tất cả sản phẩm KHÁC trong các đơn hàng đó
        // 3. Đếm frequency mỗi sản phẩm
        // 4. Sort theo frequency giảm dần
        // 5. Trả về top N

        return orderHistory.stream()
                .filter(o -> o.getProductIds().contains(productId))
                .flatMap(o -> o.getProductIds().stream())
                .filter(id -> !id.equals(productId))
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(maxResults)
                .map(e -> findProductById(e.getKey()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    // "Sản phẩm phổ biến trong danh mục này"
    public List<Product> getPopularInCategory(String category, int maxResults) {
        // Filter by category → sort by soldCount → limit
    }

    // "Gợi ý cho bạn" dựa trên lịch sử mua
    public List<Product> getPersonalRecommendations(String userId, int maxResults) {
        // 1. Tìm categories user hay mua
        // 2. Tìm sản phẩm trong các categories đó
        // 3. Loại bỏ sản phẩm user đã mua
        // 4. Sort theo rating
    }

    // Trending: sản phẩm có tốc độ bán tăng nhanh nhất 7 ngày qua
    public List<Product> getTrending(int maxResults) { ... }
}
```

---

## 🟡 Bài Tập 4: Stream Parallel Processing ⭐⭐

**Bối cảnh thực tế:** Batch processing 100,000+ records — parallel stream tận dụng multi-core CPU.

```java
// Giả lập 100,000 đơn hàng
List<Order> bigData = generateOrders(100_000);

// Sequential vs Parallel — đo thời gian
long start = System.nanoTime();

// Sequential
double totalRevenue = bigData.stream()
        .filter(o -> "COMPLETED".equals(o.getStatus()))
        .mapToDouble(Order::getTotalAmount)
        .sum();

long seqTime = System.nanoTime() - start;

// Parallel
start = System.nanoTime();
double totalRevenueParallel = bigData.parallelStream()
        .filter(o -> "COMPLETED".equals(o.getStatus()))
        .mapToDouble(Order::getTotalAmount)
        .sum();

long parTime = System.nanoTime() - start;

System.out.printf("Sequential: %,d ns%n", seqTime);
System.out.printf("Parallel  : %,d ns%n", parTime);
System.out.printf("Speedup   : %.2fx%n", (double) seqTime / parTime);

// ⚠️ Thử thách: Khi nào parallel CHẬM HƠN sequential? Test và giải thích
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `stream()` vs `parallelStream()` — khi nào parallel CHẬM hơn? (Hint: overhead, data size, operation type)
- [ ] `collect(Collectors.toList())` vs `toList()` (Java 16+) — khác nhau thế nào? List nào mutable?
- [ ] `flatMap` vs `map` — giải thích sự khác nhau bằng ví dụ: "lấy tất cả productIds từ list đơn hàng".
- [ ] Tại sao KHÔNG nên dùng Stream cho đọc file lớn theo từng dòng trong production? (Gợi ý: memory, backpressure)

---

👉 **Tiếp theo:** [Bài 19 – Multithreading](../../phase4-advanced/bai-19-multithreading/EXERCISES.md)
