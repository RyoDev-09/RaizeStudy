# 📝 Bài Tập Thực Tế – Bài 16: Generics

> 🎯 **Bối cảnh dự án:** Xây dựng **type-safe data structures** — cách Spring Data `JpaRepository<T, ID>`, `ResponseEntity<T>` hoạt động.

---

## 🔴 Bài Tập 1: Generic Repository ⭐⭐

**Bối cảnh thực tế:** Spring Data JPA cho phép bạn viết `interface ProductRepo extends JpaRepository<Product, Long>`. Bây giờ bạn sẽ tự build cái tương tự.

**Yêu cầu:** Tạo `GenericRepository<T>`:

```java
public class GenericRepository<T> {
    private List<T> storage = new ArrayList<>();
    private final String entityName;

    public GenericRepository(String entityName) {
        this.entityName = entityName;
    }

    public void save(T entity) { storage.add(entity); }
    public T getByIndex(int index) { return storage.get(index); }
    public List<T> getAll() { return Collections.unmodifiableList(storage); }
    public int count() { return storage.size(); }
    public boolean isEmpty() { return storage.isEmpty(); }

    // Tìm theo điều kiện — dùng Predicate<T>
    public List<T> findWhere(Predicate<T> condition) {
        List<T> result = new ArrayList<>();
        for (T item : storage) {
            if (condition.test(item)) result.add(item);
        }
        return result;
    }

    // Tìm 1 kết quả duy nhất
    public Optional<T> findFirst(Predicate<T> condition) {
        for (T item : storage) {
            if (condition.test(item)) return Optional.of(item);
        }
        return Optional.empty();
    }

    // Xóa theo điều kiện
    public int removeWhere(Predicate<T> condition) {
        int removed = 0;
        Iterator<T> it = storage.iterator();
        while (it.hasNext()) {
            if (condition.test(it.next())) {
                it.remove();
                removed++;
            }
        }
        return removed;
    }
}

// Sử dụng — một class, nhiều kiểu dữ liệu:
GenericRepository<Product> productRepo = new GenericRepository<>("Product");
GenericRepository<User> userRepo = new GenericRepository<>("User");
GenericRepository<Order> orderRepo = new GenericRepository<>("Order");

productRepo.save(new Product("Kiếm Rồng", 1_500_000));
List<Product> expensive = productRepo.findWhere(p -> p.getPrice() > 1_000_000);
```

---

## 🟡 Bài Tập 2: ApiResponse<T> — Generic Response Wrapper ⭐⭐

**Bối cảnh thực tế:** REST API luôn trả response theo format nhất quán. Spring dùng `ResponseEntity<T>`. Bạn sẽ build phiên bản riêng.

**Yêu cầu:** Tạo `ApiResponse<T>`:

```java
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private int statusCode;
    private String timestamp;
    private Map<String, Object> meta; // Pagination info, etc.

    // Private constructor — dùng static factory methods
    private ApiResponse() {
        this.timestamp = LocalDateTime.now().toString();
    }

    // Factory methods — type-safe và đọc code rõ ràng
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.success = true;
        response.statusCode = 200;
        response.data = data;
        response.message = "OK";
        return response;
    }

    public static <T> ApiResponse<T> success(T data, String message) { ... }

    public static <T> ApiResponse<T> created(T data) {
        // statusCode = 201
    }

    public static <T> ApiResponse<T> error(int statusCode, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.success = false;
        response.statusCode = statusCode;
        response.message = message;
        response.data = null;
        return response;
    }

    // Pagination support
    public ApiResponse<T> withPagination(int page, int size, long totalElements) {
        this.meta = new HashMap<>();
        meta.put("page", page);
        meta.put("size", size);
        meta.put("totalElements", totalElements);
        meta.put("totalPages", (int) Math.ceil((double) totalElements / size));
        return this;
    }

    public String toJson() { ... } // Build JSON thủ công
}

// Sử dụng:
ApiResponse<Product> resp1 = ApiResponse.success(product);
ApiResponse<List<Product>> resp2 = ApiResponse.success(products)
        .withPagination(1, 10, 47);
ApiResponse<Void> resp3 = ApiResponse.error(404, "Product not found");
```

---

## 🔴 Bài Tập 3: Generic Pair, Triple & PageResult ⭐⭐⭐

**Bối cảnh thực tế:** Method cần trả về 2-3 giá trị? Dùng `Pair<A,B>`. Pagination result chứa data + metadata? `PageResult<T>`.

**Yêu cầu:** Tạo các generic utility classes:

```java
// Pair: trả về 2 giá trị liên quan
public class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) { ... }

    public static <A, B> Pair<A, B> of(A first, B second) {
        return new Pair<>(first, second);
    }
}

// PageResult: kết quả phân trang
public class PageResult<T> {
    private final List<T> content;
    private final int pageNumber;
    private final int pageSize;
    private final long totalElements;

    public int getTotalPages() {
        return (int) Math.ceil((double) totalElements / pageSize);
    }
    public boolean hasNext() { return pageNumber < getTotalPages(); }
    public boolean hasPrevious() { return pageNumber > 1; }
    public boolean isEmpty() { return content.isEmpty(); }
}

// Sử dụng thực tế:
// Method trả về product + số lượng tồn kho
Pair<Product, Integer> result = Pair.of(product, stock);

// Service trả về page kết quả
PageResult<Product> page = productService.findAll(1, 10);
System.out.printf("Trang %d/%d (%d sản phẩm)%n",
        page.getPageNumber(), page.getTotalPages(), page.getTotalElements());
```

---

## 🟡 Bài Tập 4: Type-safe Event Bus ⭐⭐⭐

**Bối cảnh thực tế:** Event-driven architecture — Spring `ApplicationEventPublisher` publish typed events. Handler chỉ nhận event đúng type.

```java
public class EventBus {
    private Map<Class<?>, List<EventHandler<?>>> handlers = new HashMap<>();

    public <E> void subscribe(Class<E> eventType, EventHandler<E> handler) {
        handlers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(handler);
    }

    @SuppressWarnings("unchecked")
    public <E> void publish(E event) {
        List<EventHandler<?>> list = handlers.get(event.getClass());
        if (list != null) {
            for (EventHandler<?> handler : list) {
                ((EventHandler<E>) handler).handle(event);
            }
        }
    }
}

@FunctionalInterface
public interface EventHandler<E> {
    void handle(E event);
}

// Events
record OrderCreatedEvent(String orderId, String buyerId, double amount) {}
record PaymentCompletedEvent(String orderId, String paymentMethod) {}

// Subscribe — type-safe!
EventBus bus = new EventBus();
bus.subscribe(OrderCreatedEvent.class, event -> {
    System.out.println("📧 Email seller: đơn hàng mới #" + event.orderId());
});
bus.subscribe(PaymentCompletedEvent.class, event -> {
    System.out.println("💰 Thanh toán qua " + event.paymentMethod());
});

bus.publish(new OrderCreatedEvent("RZ-001", "user1", 1_500_000));
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `List<Product>` vs `List<Object>` — tại sao không thể gán `List<Product>` cho `List<Object>` dù Product extends Object?
- [ ] Wildcard `<? extends Product>` vs `<? super Product>` — PECS rule là gì? Áp dụng vào `findWhere(Predicate<? super T>)`.
- [ ] Type erasure: tại sao `new T()` không được phép trong Java? Tại sao `if (obj instanceof List<String>)` không compile?
- [ ] `Optional<T>` vs `null` — tại sao `findFirst()` trả về `Optional<T>` thay vì `null`? Production code nên chuẩn nào?

---

👉 **Tiếp theo:** [Bài 17 – Lambda & Functional](../bai-17-lambda-functional/EXERCISES.md)
