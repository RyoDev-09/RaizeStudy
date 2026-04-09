# 📝 Bài Tập Thực Tế – Bài 13: Collections Framework

> 🎯 **Bối cảnh dự án:** Thay thế mảng cứng nhắc bằng **Collections** — cách mọi dự án Java thực tế quản lý dữ liệu.

---

## 🔴 Bài Tập 1: Product Catalog với ArrayList ⭐⭐

**Bối cảnh thực tế:** Không ai dùng `Product[]` trong dự án thực. ArrayList là collection mặc định cho danh sách có thể thay đổi kích thước.

**Yêu cầu:** Tạo `ProductCatalog.java` — quản lý catalogue sản phẩm:

```java
import java.util.*;

public class ProductCatalog {
    private List<Product> products = new ArrayList<>();

    // CRUD Operations
    public void addProduct(Product product) { ... }
    public boolean removeProduct(String productId) { ... }
    public Product getById(String productId) { ... }

    // Search & Filter (trả về List mới, không sửa gốc)
    public List<Product> searchByName(String keyword) { ... }
    public List<Product> filterByCategory(String category) { ... }
    public List<Product> filterByPriceRange(double min, double max) { ... }
    public List<Product> filterInStock() { ... }

    // Sort (sửa trực tiếp danh sách)
    public void sortByPriceAsc() {
        // Implement manual sort hoặc dùng Comparator
        products.sort((a, b) -> Double.compare(a.getPrice(), b.getPrice()));
    }
    public void sortByPriceDesc() { ... }
    public void sortByRating() { ... }
    public void sortByName() { ... }

    // Statistics
    public double getAveragePrice() { ... }
    public Product getMostExpensive() { ... }
    public Product getCheapest() { ... }
    public int getTotalStock() { ... }
    public Map<String, Integer> getCountByCategory() { ... }

    // Display
    public void displayPage(int pageNumber, int pageSize) {
        int start = (pageNumber - 1) * pageSize;
        int end = Math.min(start + pageSize, products.size());
        // In ra sản phẩm từ start đến end
    }
}
```

**Test với 20 sản phẩm, search, filter, sort, và phân trang.**

---

## 🟡 Bài Tập 2: Shopping Cart với LinkedList + HashMap ⭐⭐

**Bối cảnh thực tế:** Giỏ hàng cần: thêm/xóa thường xuyên (LinkedList), lookup nhanh theo ID (HashMap).

**Yêu cầu:** Tạo `SmartShoppingCart.java`:

```java
public class SmartShoppingCart {
    // LinkedList: duy trì thứ tự thêm vào
    private LinkedList<CartItem> items = new LinkedList<>();
    // HashMap: lookup nhanh O(1) theo productId
    private Map<String, CartItem> itemIndex = new HashMap<>();

    public void addItem(Product product, int quantity) {
        if (itemIndex.containsKey(product.getId())) {
            // Đã có → tăng số lượng
            CartItem existing = itemIndex.get(product.getId());
            existing.setQuantity(existing.getQuantity() + quantity);
        } else {
            CartItem item = new CartItem(product, quantity);
            items.add(item);
            itemIndex.put(product.getId(), item);
        }
    }

    public void removeItem(String productId) {
        CartItem item = itemIndex.remove(productId);
        if (item != null) items.remove(item);
    }

    public void updateQuantity(String productId, int newQty) { ... }
    public double getSubtotal() { ... }
    public int getTotalItems() { ... } // Tổng số lượng (không phải số loại)

    // Hiển thị giỏ hàng đẹp
    public void display() {
        System.out.println("╔══════════════════════════════════════════════╗");
        System.out.println("║            🛒 GIỎ HÀNG CỦA BẠN              ║");
        System.out.println("╠══════════════════════════════════════════════╣");
        int stt = 1;
        for (CartItem item : items) {
            System.out.printf("║ %d. %-20s x%d  %,12.0f đ ║%n",
                    stt++, item.getProductName(), item.getQuantity(), item.getLineTotal());
        }
        System.out.println("╠══════════════════════════════════════════════╣");
        System.out.printf("║ TỔNG: %d items          %,15.0f đ ║%n", getTotalItems(), getSubtotal());
        System.out.println("╚══════════════════════════════════════════════╝");
    }
}
```

---

## 🟡 Bài Tập 3: Leaderboard với TreeMap ⭐⭐

**Bối cảnh thực tế:** Bảng xếp hạng Top Seller — dữ liệu cần luôn **tự động sắp xếp** khi thêm/cập nhật. TreeMap giữ keys đã sắp xếp.

**Yêu cầu:** Tạo `SellerLeaderboard.java`:

```java
public class SellerLeaderboard {
    // TreeMap: key = rating (tự sắp xếp), value = list sellers có cùng rating
    private TreeMap<Double, List<String>> board = new TreeMap<>(Collections.reverseOrder());
    // HashMap: lookup nhanh seller → rating hiện tại
    private Map<String, Double> sellerRatings = new HashMap<>();

    public void updateRating(String sellerName, double newRating) {
        // Xóa khỏi vị trí cũ (nếu có)
        // Thêm vào vị trí mới
    }

    public List<String> getTopN(int n) { ... }
    public int getRank(String sellerName) { ... }
    public void displayTop10() { ... }
}
```

---

## 🔴 Bài Tập 4: Order History & Analytics ⭐⭐⭐

**Bối cảnh thực tế:** Dashboard báo cáo cần aggregate data — group by, count, sum — tất cả đều dùng Map pattern.

**Yêu cầu:** Tạo `OrderAnalytics.java`:

```java
public class OrderAnalytics {
    private List<Order> orders; // Nhận từ constructor

    // Doanh thu theo tháng: Map<"2024-01", totalRevenue>
    public Map<String, Double> getRevenueByMonth() { ... }

    // Số đơn theo trạng thái: Map<"COMPLETED", count>
    public Map<String, Integer> getCountByStatus() { ... }

    // Top N sản phẩm bán chạy nhất: Map<productId, totalSold>
    public List<Map.Entry<String, Integer>> getTopSellingProducts(int n) { ... }

    // Khách hàng chi tiêu nhiều nhất
    public Map.Entry<String, Double> getTopSpender() { ... }

    // In report tổng hợp
    public void printDashboard() { ... }
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `ArrayList` vs `LinkedList` — trong 95% trường hợp nên dùng cái nào? Tại sao LinkedList hiếm khi tốt hơn trong thực tế?
- [ ] `HashMap` vs `TreeMap` vs `LinkedHashMap` — leaderboard dùng TreeMap để tự sort. Nhưng HashMap nhanh hơn. Khi nào chọn cái nào?
- [ ] `List<Product>` vs `Product[]` — tại sao trong dự án thực KHÔNG AI dùng array? Cho 3 lý do.
- [ ] `Collections.unmodifiableList()` — dùng khi nào? Tại sao method `searchByName()` nên trả về unmodifiable list?

---

👉 **Tiếp theo:** [Bài 14 – Exception Handling](../bai-14-exception-handling/EXERCISES.md)
