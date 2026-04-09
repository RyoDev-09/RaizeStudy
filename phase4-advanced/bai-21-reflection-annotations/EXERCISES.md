# 📝 Bài Tập Thực Tế – Bài 21: Reflection & Annotations

> 🎯 **Bối cảnh dự án:** Hiểu **cách Spring Boot hoạt động** bên dưới — `@Autowired`, `@Entity`, `@GetMapping` đều dùng reflection + annotations.

---

## 🔴 Bài Tập 1: Custom Annotations — Validation Framework ⭐⭐

**Bối cảnh thực tế:** Bean Validation (`@NotNull`, `@Size`, `@Email`) hoạt động bằng cách tạo custom annotation → reflection đọc annotation → chạy logic validation.

**Yêu cầu:** Tạo mini validation framework:

```java
// Custom annotations
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface NotEmpty {
    String message() default "Không được để trống";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Range {
    double min();
    double max();
    String message() default "Giá trị ngoài phạm vi cho phép";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface MaxLength {
    int value();
    String message() default "Vượt quá độ dài cho phép";
}

// Sử dụng trên Product class
public class Product {
    @NotEmpty(message = "Tên sản phẩm bắt buộc")
    @MaxLength(value = 100, message = "Tên tối đa 100 ký tự")
    private String name;

    @Range(min = 1000, max = 999_999_999, message = "Giá phải từ 1,000 đến 999,999,999")
    private double price;

    @Range(min = 0, max = 9999)
    private int stock;
}

// Validation Engine dùng reflection
public class ValidationEngine {
    public static List<String> validate(Object obj) {
        List<String> errors = new ArrayList<>();
        Class<?> clazz = obj.getClass();

        for (Field field : clazz.getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object value = field.get(obj);

                // Check @NotEmpty
                if (field.isAnnotationPresent(NotEmpty.class)) {
                    NotEmpty ann = field.getAnnotation(NotEmpty.class);
                    if (value == null || (value instanceof String s && s.isBlank())) {
                        errors.add(field.getName() + ": " + ann.message());
                    }
                }

                // Check @Range
                if (field.isAnnotationPresent(Range.class)) {
                    Range ann = field.getAnnotation(Range.class);
                    if (value instanceof Number num) {
                        double val = num.doubleValue();
                        if (val < ann.min() || val > ann.max()) {
                            errors.add(field.getName() + ": " + ann.message()
                                    + " [" + ann.min() + " - " + ann.max() + "]");
                        }
                    }
                }

                // Check @MaxLength
                // TODO: Implement
            } catch (IllegalAccessException e) {
                errors.add("Cannot access field: " + field.getName());
            }
        }
        return errors;
    }
}

// Test
Product p = new Product("", -5000, -1);
List<String> errors = ValidationEngine.validate(p);
// name: Tên sản phẩm bắt buộc
// price: Giá phải từ 1,000 đến 999,999,999 [1000.0 - 9.99999999E8]
// stock: Giá trị ngoài phạm vi cho phép [0.0 - 9999.0]
```

---

## 🟡 Bài Tập 2: Mini Object Mapper (JSON Serializer) ⭐⭐

**Bối cảnh thực tế:** Jackson `@JsonProperty`, Gson — tất cả dùng reflection để convert Object ↔ JSON. Bạn sẽ build phiên bản mini.

**Yêu cầu:** Tạo `JsonMapper.java`:

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface JsonField {
    String name() default "";     // Tên field trong JSON (default = field name)
    boolean ignore() default false; // Bỏ qua field này khi serialize
}

public class Product {
    @JsonField(name = "product_id")
    private String id;

    @JsonField
    private String name;

    @JsonField(name = "unit_price")
    private double price;

    @JsonField(ignore = true)
    private String internalNote; // Không xuất ra JSON!

    private int stock; // Không có @JsonField → vẫn include (default behavior)
}

public class JsonMapper {
    // Object → JSON string
    public static String toJson(Object obj) {
        StringBuilder sb = new StringBuilder("{\n");
        // Dùng reflection đọc fields + annotations
        // ...
        return sb.toString();
    }

    // JSON string → Object (basic parser)
    public static <T> T fromJson(String json, Class<T> clazz) {
        T instance = clazz.getDeclaredConstructor().newInstance();
        // Parse JSON → set fields via reflection
        return instance;
    }
}

// Test
Product p = new Product("RZ-001", "Kiếm Rồng", 1_500_000, "secret note", 5);
String json = JsonMapper.toJson(p);
System.out.println(json);
// {
//   "product_id": "RZ-001",
//   "name": "Kiếm Rồng",
//   "unit_price": 1500000.0,
//   "stock": 5
// }
// Không có internalNote!
```

---

## 🔴 Bài Tập 3: Mini Dependency Injection Container ⭐⭐⭐

**Bối cảnh thực tế:** Đây là cách Spring IoC Container hoạt động bên dưới! `@Autowired` = inject dependency qua reflection.

**Yêu cầu:** Tạo `DiContainer.java`:

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Component {
    String name() default "";
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Inject {} // Như @Autowired

@Component
public class ProductRepository {
    public Product findById(String id) { ... }
}

@Component
public class ProductService {
    @Inject
    private ProductRepository repository; // Tự động inject!

    public Product getProduct(String id) {
        return repository.findById(id);
    }
}

// Container
public class DiContainer {
    private Map<Class<?>, Object> beans = new HashMap<>();

    // Scan và đăng ký tất cả @Component classes
    public void register(Class<?>... classes) {
        for (Class<?> clazz : classes) {
            if (clazz.isAnnotationPresent(Component.class)) {
                Object instance = clazz.getDeclaredConstructor().newInstance();
                beans.put(clazz, instance);
            }
        }
    }

    // Inject dependencies
    public void injectAll() {
        for (Object bean : beans.values()) {
            for (Field field : bean.getClass().getDeclaredFields()) {
                if (field.isAnnotationPresent(Inject.class)) {
                    Object dependency = beans.get(field.getType());
                    if (dependency != null) {
                        field.setAccessible(true);
                        field.set(bean, dependency);
                    }
                }
            }
        }
    }

    @SuppressWarnings("unchecked")
    public <T> T getBean(Class<T> clazz) {
        return (T) beans.get(clazz);
    }
}

// Sử dụng — giống Spring context!
DiContainer container = new DiContainer();
container.register(ProductRepository.class, ProductService.class);
container.injectAll();

ProductService service = container.getBean(ProductService.class);
Product p = service.getProduct("RZ-001"); // ProductRepository được inject tự động!
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `@Retention(RUNTIME)` vs `@Retention(SOURCE)` vs `@Retention(CLASS)` — Lombok dùng loại nào? Spring dùng loại nào? Tại sao khác nhau?
- [ ] Reflection performance: gọi method qua reflection chậm hơn bao nhiêu lần so với gọi trực tiếp? Tại sao Spring cache reflection metadata?
- [ ] Security: `field.setAccessible(true)` phá vỡ encapsulation. Trong production, điều này có nên dùng không?
- [ ] Bài 3 (DI Container): circular dependency xảy ra khi nào? A inject B, B inject A → Spring xử lý thế nào?

---

👉 **Tiếp theo:** [Bài 22 – JVM Internals](../bai-22-jvm-internals/EXERCISES.md)
