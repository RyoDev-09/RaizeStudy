# 📝 Bài Tập Thực Tế – Bài 17: Lambda & Functional Programming

> 🎯 **Bối cảnh dự án:** Viết code **ngắn gọn, khai báo** — cách Spring Security configs, JPA Specifications, và mọi modern Java code được viết.

---

## 🔴 Bài Tập 1: Refactor Code Cũ Sang Lambda ⭐⭐

**Bối cảnh thực tế:** Code review thường yêu cầu "refactor anonymous class sang lambda". Đây là kỹ năng bắt buộc trong team Java hiện đại.

**Yêu cầu:** Refactor mỗi block code từ anonymous class → lambda → method reference:

```java
// ======== TRƯỚC (cũ, dài dòng) ========

// 1. Sort products theo giá
Collections.sort(products, new Comparator<Product>() {
    @Override
    public int compare(Product a, Product b) {
        return Double.compare(a.getPrice(), b.getPrice());
    }
});

// 2. Filter products có stock > 0
List<Product> inStock = new ArrayList<>();
for (Product p : products) {
    if (p.getStock() > 0) {
        inStock.add(p);
    }
}

// 3. Chạy task bất đồng bộ
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Sending notification...");
    }
}).start();

// 4. Event handler
button.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked!");
    }
});

// ======== SAU (lambda, ngắn gọn) ========
// TODO: Refactor tất cả sang lambda và method reference
```

---

## 🟡 Bài Tập 2: Xây Dựng Filter & Sort Engine ⭐⭐

**Bối cảnh thực tế:** Trang danh sách sản phẩm có filter sidebar (theo giá, category, rating) và sort dropdown. Backend implement bằng Predicate chain.

**Yêu cầu:** Tạo `ProductFilterEngine.java`:

```java
public class ProductFilterEngine {
    private List<Predicate<Product>> filters = new ArrayList<>();
    private Comparator<Product> sorter = null;

    // Fluent API — chain filters
    public ProductFilterEngine filterByCategory(String category) {
        filters.add(p -> p.getCategory().equals(category));
        return this;
    }

    public ProductFilterEngine filterByPriceRange(double min, double max) {
        filters.add(p -> p.getPrice() >= min && p.getPrice() <= max);
        return this;
    }

    public ProductFilterEngine filterInStock() {
        filters.add(p -> p.getStock() > 0);
        return this;
    }

    public ProductFilterEngine filterByMinRating(double minRating) {
        filters.add(p -> p.getRating() >= minRating);
        return this;
    }

    public ProductFilterEngine filterByKeyword(String keyword) {
        filters.add(p -> p.getName().toLowerCase().contains(keyword.toLowerCase()));
        return this;
    }

    // Custom filter — accept bất kỳ Predicate nào
    public ProductFilterEngine filter(Predicate<Product> customFilter) {
        filters.add(customFilter);
        return this;
    }

    // Sort options
    public ProductFilterEngine sortBy(Comparator<Product> comparator) {
        this.sorter = comparator;
        return this;
    }

    public ProductFilterEngine sortByPriceAsc() {
        return sortBy(Comparator.comparingDouble(Product::getPrice));
    }

    public ProductFilterEngine sortByPriceDesc() {
        return sortBy(Comparator.comparingDouble(Product::getPrice).reversed());
    }

    public ProductFilterEngine sortByRating() {
        return sortBy(Comparator.comparingDouble(Product::getRating).reversed());
    }

    // Execute — áp dụng tất cả filters + sort
    public List<Product> execute(List<Product> products) {
        // Gộp tất cả Predicate bằng .and()
        Predicate<Product> combined = filters.stream()
                .reduce(Predicate::and)
                .orElse(p -> true); // Nếu không có filter → accept all

        List<Product> result = new ArrayList<>();
        for (Product p : products) {
            if (combined.test(p)) result.add(p);
        }
        if (sorter != null) result.sort(sorter);
        return result;
    }

    // Reset
    public ProductFilterEngine clear() {
        filters.clear();
        sorter = null;
        return this;
    }
}

// Sử dụng — đọc như câu văn tiếng Anh:
List<Product> result = new ProductFilterEngine()
        .filterByCategory("weapon")
        .filterByPriceRange(500_000, 3_000_000)
        .filterInStock()
        .filterByMinRating(4.0)
        .sortByPriceAsc()
        .execute(allProducts);
```

---

## 🟡 Bài Tập 3: Functional Validation Framework ⭐⭐

**Bối cảnh thực tế:** Bean Validation (`@NotNull`, `@Size`, `@Email`) compile thành chain of validators. Đây là implementation functional.

**Yêu cầu:** Tạo `Validator<T>` composable:

```java
@FunctionalInterface
public interface ValidationRule<T> {
    String validate(T value); // null = valid, String = error message
}

public class Validator<T> {
    private List<ValidationRule<T>> rules = new ArrayList<>();

    public Validator<T> addRule(ValidationRule<T> rule) {
        rules.add(rule);
        return this;
    }

    // Convenience methods
    public Validator<T> notNull(String fieldName) {
        return addRule(v -> v == null ? fieldName + " không được null" : null);
    }

    public List<String> validate(T value) {
        List<String> errors = new ArrayList<>();
        for (ValidationRule<T> rule : rules) {
            String error = rule.validate(value);
            if (error != null) errors.add(error);
        }
        return errors; // Empty = valid
    }

    public boolean isValid(T value) {
        return validate(value).isEmpty();
    }
}

// String validator
Validator<String> emailValidator = new Validator<String>()
        .notNull("Email")
        .addRule(s -> s.isBlank() ? "Email không được trống" : null)
        .addRule(s -> !s.contains("@") ? "Email phải chứa @" : null)
        .addRule(s -> s.length() > 100 ? "Email quá dài" : null);

// Product validator
Validator<Product> productValidator = new Validator<Product>()
        .notNull("Product")
        .addRule(p -> p.getName() == null || p.getName().isBlank() ? "Tên sản phẩm bắt buộc" : null)
        .addRule(p -> p.getPrice() <= 0 ? "Giá phải > 0" : null)
        .addRule(p -> p.getStock() < 0 ? "Stock không được âm" : null);

List<String> errors = productValidator.validate(product);
if (!errors.isEmpty()) {
    errors.forEach(e -> System.out.println("❌ " + e));
}
```

---

## 🔴 Bài Tập 4: Function Composition — Data Pipeline ⭐⭐⭐

**Bối cảnh thực tế:** ETL (Extract-Transform-Load) pipeline dùng function composition. Mỗi bước transform data rồi truyền cho bước tiếp.

```java
public class DataPipeline<T> {
    private List<Function<T, T>> steps = new ArrayList<>();

    public DataPipeline<T> then(Function<T, T> step) {
        steps.add(step);
        return this;
    }

    public T process(T input) {
        T result = input;
        for (Function<T, T> step : steps) {
            result = step.apply(result);
        }
        return result;
    }
}

// Pipeline xử lý giá sản phẩm
Function<Double, Double> addVat = price -> price * 1.1;
Function<Double, Double> addShipping = price -> price + 30_000;
Function<Double, Double> applyVoucher = price -> price * 0.85; // Giảm 15%
Function<Double, Double> roundPrice = price -> Math.ceil(price / 1000) * 1000;

// Compose
Function<Double, Double> finalPriceCalc = addVat
        .andThen(addShipping)
        .andThen(applyVoucher)
        .andThen(roundPrice);

double finalPrice = finalPriceCalc.apply(1_000_000.0);
System.out.printf("Giá cuối: %,.0f đ%n", finalPrice);

// Pipeline xử lý tên sản phẩm
Function<String, String> trimName = String::trim;
Function<String, String> capitalize = s -> s.substring(0, 1).toUpperCase() + s.substring(1);
Function<String, String> removeSpecialChars = s -> s.replaceAll("[<>\"']", "");
Function<String, String> truncate = s -> s.length() > 50 ? s.substring(0, 50) + "..." : s;

Function<String, String> cleanName = trimName
        .andThen(removeSpecialChars)
        .andThen(capitalize)
        .andThen(truncate);

System.out.println(cleanName.apply("  <script>kiếm rồng huyền thoại</script>  "));
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `Predicate`, `Function`, `Consumer`, `Supplier` — cho ví dụ thực tế của MỖI loại trong RaizeShop.
- [ ] Lambda capture: `int count = 0; list.forEach(x -> count++);` tại sao lỗi compile? Cách fix?
- [ ] Method reference `Product::getPrice` vs lambda `p -> p.getPrice()` — khi nào KHÔNG dùng method reference được?
- [ ] Effectively final: tại sao lambda chỉ capture được biến `final` hoặc effectively final? Giải thích bằng thread safety.

---

👉 **Tiếp theo:** [Bài 18 – Stream API](../bai-18-stream-api/EXERCISES.md)
