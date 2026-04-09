# 📝 Bài Tập Thực Tế – Bài 12: Abstraction (Interface & Abstract Class)

> 🎯 **Bối cảnh dự án:** Thiết kế **contract/API** cho các module RaizeShop — cách Spring Framework, JPA Repository hoạt động.

---

## 🔴 Bài Tập 1: Repository Interface — Chuẩn Spring Data ⭐⭐

**Bối cảnh thực tế:** Spring Data JPA hoạt động bằng cách bạn khai báo interface → Spring tự generate implementation. Hiểu interface giúp bạn hiểu tại sao `JpaRepository<Product, Long>` hoạt động "như phép thuật".

**Yêu cầu:** Thiết kế và implement Repository pattern:

```java
// Interface — contract cho mọi loại repository
public interface Repository<T> {
    T findById(String id);
    T[] findAll();
    void save(T entity);
    void update(T entity);
    void deleteById(String id);
    int count();
    boolean existsById(String id);
}

// Interface mở rộng cho Product
public interface ProductRepository extends Repository<Product> {
    Product[] findByCategory(String category);
    Product[] findByPriceRange(double min, double max);
    Product[] findByNameContaining(String keyword);
    Product findCheapest();
    Product findMostExpensive();
    double getAveragePrice();
}

// Implementation dùng array (giả lập database)
public class InMemoryProductRepository implements ProductRepository {
    private Product[] storage = new Product[100];
    private int size = 0;

    @Override
    public Product findById(String id) {
        for (int i = 0; i < size; i++) {
            if (storage[i].getId().equals(id)) return storage[i];
        }
        return null;
    }

    // TODO: Implement tất cả method còn lại
}
```

**Test:**
```java
ProductRepository repo = new InMemoryProductRepository();
repo.save(new Product("RZ-001", "Kiếm Rồng", 1_500_000, "weapon"));
repo.save(new Product("RZ-002", "Giáp Vàng", 800_000, "armor"));

Product[] weapons = repo.findByCategory("weapon");
System.out.println("Vũ khí: " + weapons.length + " sản phẩm");

Product cheapest = repo.findCheapest();
System.out.println("Rẻ nhất: " + cheapest.getName());
```

---

## 🟡 Bài Tập 2: Service Layer với Interface ⭐⭐

**Bối cảnh thực tế:** Trong Spring Boot, Service layer luôn có interface + implementation. Tại sao? Vì có thể swap implementation (mock cho testing, cache cho production).

**Yêu cầu:** Tạo `OrderService` interface và 2 implementations:

```java
public interface OrderService {
    Order createOrder(String buyerId, String[] productIds, int[] quantities);
    Order getOrderById(String orderId);
    boolean cancelOrder(String orderId, String reason);
    Order[] getOrdersByUser(String userId);
    double calculateTotal(String[] productIds, int[] quantities, String voucherCode);
    String getOrderStatus(String orderId);
}

// Implementation 1: Bình thường
public class StandardOrderService implements OrderService {
    private ProductRepository productRepo;
    // Implementation đầy đủ logic
}

// Implementation 2: Có logging mọi action (Decorator pattern preview)
public class LoggingOrderService implements OrderService {
    private OrderService delegate; // Wrap implementation khác

    @Override
    public Order createOrder(String buyerId, String[] productIds, int[] quantities) {
        System.out.printf("[LOG] createOrder: buyer=%s, items=%d%n", buyerId, productIds.length);
        long start = System.currentTimeMillis();
        Order result = delegate.createOrder(buyerId, productIds, quantities);
        long duration = System.currentTimeMillis() - start;
        System.out.printf("[LOG] createOrder completed in %dms, orderId=%s%n", duration, result.getId());
        return result;
    }
}
```

---

## 🔴 Bài Tập 3: Plugin System — Interface Thực Chiến ⭐⭐⭐

**Bối cảnh thực tế:** Hệ thống plugin (WordPress hooks, VS Code extensions) hoạt động bằng interface — bất kỳ ai cũng có thể implement interface đã định nghĩa và "cắm" vào hệ thống.

**Yêu cầu:** Thiết kế plugin system cho RaizeShop:

```java
// Interface cho plugin
public interface ShopPlugin {
    String getName();
    String getVersion();
    void onEnable();
    void onDisable();
}

// Interface cho event hook
public interface OrderEventListener {
    void onOrderCreated(Order order);
    void onOrderPaid(Order order);
    void onOrderCancelled(Order order, String reason);
}

// Interface cho filter hook
public interface PriceFilter {
    double filterPrice(Product product, double currentPrice);
}

// Plugin ví dụ: Tự động gửi SMS khi có đơn
public class SmsNotifyPlugin implements ShopPlugin, OrderEventListener {
    @Override public void onOrderCreated(Order order) {
        System.out.println("[SMS] Gửi SMS cho seller: Đơn hàng mới #" + order.getId());
    }
    // ...
}

// Plugin ví dụ: Flash sale tự động giảm giá
public class FlashSalePlugin implements ShopPlugin, PriceFilter {
    private String[] saleProductIds;
    private double salePercent;

    @Override
    public double filterPrice(Product product, double currentPrice) {
        for (String id : saleProductIds) {
            if (product.getId().equals(id)) {
                return currentPrice * (1 - salePercent / 100);
            }
        }
        return currentPrice; // Không nằm trong sale → giữ nguyên
    }
}

// Plugin Manager: quản lý tất cả plugins
public class PluginManager {
    private ShopPlugin[] plugins = new ShopPlugin[20];
    private int pluginCount = 0;

    public void registerPlugin(ShopPlugin plugin) { ... }
    public void unregisterPlugin(String pluginName) { ... }

    // Gọi tất cả OrderEventListener khi có event
    public void fireOrderCreated(Order order) {
        for (int i = 0; i < pluginCount; i++) {
            if (plugins[i] instanceof OrderEventListener listener) {
                listener.onOrderCreated(order);
            }
        }
    }

    // Áp dụng tất cả PriceFilter theo chain
    public double applyPriceFilters(Product product) {
        double price = product.getBasePrice();
        for (int i = 0; i < pluginCount; i++) {
            if (plugins[i] instanceof PriceFilter filter) {
                price = filter.filterPrice(product, price);
            }
        }
        return price;
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `interface` vs `abstract class` — khi nào dùng cái nào? Repository dùng interface, nhưng PaymentMethod (bài 11) dùng abstract class — tại sao?
- [ ] Tại sao Spring luôn yêu cầu `interface OrderService` + `class OrderServiceImpl`? Trong dự án nhỏ có cần không?
- [ ] Java 8+ cho phép `default` method trong interface — điều này có phá vỡ nguyên tắc "interface = pure contract" không?
- [ ] Multiple interfaces: `class SmsPlugin implements ShopPlugin, OrderEventListener` — tại sao Java chỉ cho single class inheritance nhưng cho multiple interface implementation?

---

👉 **Tiếp theo:** [Bài 13 – Collections](../../phase3-intermediate/bai-13-collections/EXERCISES.md)
