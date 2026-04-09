# Bài 21: Reflection & Annotations

> 🔴 **Phase 4 – Bài 3/5** | Thời gian: ~3 giờ

---

Bạn có bao giờ thắc mắc **Spring Boot hoạt động thế nào?** Tại sao chỉ cần gắn `@Controller`, `@Autowired`, `@GetMapping` là mọi thứ tự hoạt động? Đây là điều kỳ diệu bạn sắp học — **Reflection và Annotations**.

---

## 1. Annotation — Gắn Nhãn Vào Code

Annotation là **siêu dữ liệu (metadata)** gắn vào class, method, field. Bản thân annotation không làm gì — nhưng framework đọc chúng và thực hiện hành động.

```java
// Annotation có sẵn trong Java:
@Override          // Compiler kiểm tra — đây có thực sự override không?
@Deprecated        // Đánh dấu method cũ, không nên dùng nữa
@SuppressWarnings  // Tắt cảnh báo compiler cụ thể
@FunctionalInterface // Kiểm tra interface có đúng 1 abstract method

// Annotation của frameworks:
@SpringBootApplication  // Spring Boot app
@RestController         // HTTP REST controller
@Autowired              // Dependency injection
@Entity                 // JPA entity (map vào DB table)
@NotNull                // Validation
```

---

## 2. Tạo Custom Annotation

```java
import java.lang.annotation.*;

// @interface = khai báo annotation
@Retention(RetentionPolicy.RUNTIME)  // Giữ lại đến runtime (quan trọng!)
@Target(ElementType.METHOD)           // Chỉ dùng trên method
public @interface KiemTraPhanQuyen {
    String[] roles() default {"USER"};  // Tham số của annotation
    String message() default "Không có quyền truy cập!";
}

// Annotation khác cho field:
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface BatBuoc {
    String thuongBao() default "Trường này bắt buộc!";
    int doTaiMin() default 1;
    int doTaiMax() default 255;
}

// Dùng:
public class UserController {
    @KiemTraPhanQuyen(roles = {"ADMIN"}, message = "Chỉ Admin mới xóa được!")
    public void xoaNguoiDung(int id) { /* ... */ }

    @KiemTraPhanQuyen(roles = {"USER", "ADMIN"})
    public void xemHoSo() { /* ... */ }
}

public class NguoiDung {
    @BatBuoc(doTaiMin = 4, doTaiMax = 20)
    private String username;

    @BatBuoc(thuongBao = "Email không được để trống")
    private String email;
}
```

---

## 3. Reflection — Kiểm Tra Class Lúc Runtime

**Reflection** = Khả năng kiểm tra và thao tác vào cấu trúc class **khi đang chạy** (runtime), không phải compile time.

```java
import java.lang.reflect.*;

// Lấy Class object
Class<?> cls = NguoiDung.class;
// Hoặc:
NguoiDung u = new NguoiDung("test", "test@mail.com");
Class<?> cls2 = u.getClass();
// Hoặc từ tên string:
Class<?> cls3 = Class.forName("com.example.NguoiDung");

// Khám phá thông tin class
System.out.println(cls.getName());        // "com.example.NguoiDung"
System.out.println(cls.getSimpleName()); // "NguoiDung"
System.out.println(cls.getSuperclass().getSimpleName()); // "Object"

// Lấy tất cả methods
for (Method m : cls.getDeclaredMethods()) {
    System.out.printf("Method: %s(%s) → %s%n",
        m.getName(),
        Arrays.stream(m.getParameterTypes())
              .map(Class::getSimpleName)
              .collect(Collectors.joining(", ")),
        m.getReturnType().getSimpleName());
}

// Lấy tất cả fields
for (Field f : cls.getDeclaredFields()) {
    System.out.printf("Field: %s %s%n", f.getType().getSimpleName(), f.getName());
}
```

---

## 4. Gọi Method Qua Reflection

```java
NguoiDung user = new NguoiDung("raize99", "r@mail.com");

// Lấy method theo tên
Method getUsername = user.getClass().getMethod("getUsername");

// Gọi method
String username = (String) getUsername.invoke(user);  // Gọi user.getUsername()
System.out.println(username);  // "raize99"

// Gọi private method (phải setAccessible)
Method privateMethod = user.getClass().getDeclaredMethod("validateUsername", String.class);
privateMethod.setAccessible(true);  // Phá vỡ encapsulation — cẩn thận!
privateMethod.invoke(user, "newUser");
```

---

## 5. Kết Hợp Reflection + Annotation — Cách Framework Hoạt Động

Đây là phần thú vị nhất. Tôi sẽ cho bạn thấy cách xây dựng một mini validator như Bean Validation:

```java
import java.lang.reflect.*;

public class Validator {

    public static List<String> validate(Object obj) {
        List<String> errors = new ArrayList<>();
        Class<?> cls = obj.getClass();

        // Duyệt qua tất cả fields
        for (Field field : cls.getDeclaredFields()) {
            field.setAccessible(true);  // Cho phép đọc private field

            // Kiểm tra xem field có annotation @BatBuoc không
            if (field.isAnnotationPresent(BatBuoc.class)) {
                BatBuoc anno = field.getAnnotation(BatBuoc.class);

                try {
                    Object value = field.get(obj);

                    // Kiểm tra null hoặc blank
                    if (value == null || value.toString().isBlank()) {
                        errors.add(field.getName() + ": " + anno.thuongBao());
                        continue;
                    }

                    // Kiểm tra độ dài
                    String str = value.toString();
                    if (str.length() < anno.doTaiMin()) {
                        errors.add(field.getName() + ": Phải có ít nhất " + anno.doTaiMin() + " ký tự");
                    }
                    if (str.length() > anno.doTaiMax()) {
                        errors.add(field.getName() + ": Không được quá " + anno.doTaiMax() + " ký tự");
                    }

                } catch (IllegalAccessException e) {
                    errors.add("Không thể đọc field: " + field.getName());
                }
            }
        }

        return errors;
    }
}

// Demo:
public class Demo {
    public static void main(String[] args) {
        NguoiDung invalidUser = new NguoiDung("ab", "");  // username ngắn, email trống

        List<String> errors = Validator.validate(invalidUser);
        if (errors.isEmpty()) {
            System.out.println("✅ Dữ liệu hợp lệ!");
        } else {
            System.out.println("❌ Lỗi validation:");
            errors.forEach(e -> System.out.println("  - " + e));
        }
    }
}
```

Đây chính xác là cách **Hibernate Validator, Spring Validation** hoạt động bên dưới!

---

## 6. Lưu Ý Về Reflection

```
✅ Dùng để: build framework, serialization, dependency injection, validation
⚠️ KHÔNG lạm dụng: Reflection chậm hơn gọi trực tiếp ~10-100 lần
⚠️ Phá vỡ type safety: compiler không kiểm tra được
⚠️ setAccessible(true): phá vỡ encapsulation — code bình thường không nên dùng
⚠️ Từ Java 9: module system giới hạn reflection — cần cấu hình module-info
```

---

## Tóm Tắt — Bài 21

```
✅ Annotation = metadata gắn vào code, bản thân không làm gì
✅ @Retention(RUNTIME): cần để reflection đọc được lúc runtime
✅ @Target: xác định annotation dùng được ở đâu (class, method, field...)
✅ Reflection: đọc cấu trúc class và gọi method/field lúc runtime
✅ Class.getMethod() / getDeclaredMethod(): lấy method (getDeclared = kể cả private)
✅ method.invoke(obj, args): gọi method qua reflection
✅ annotation + reflection = nền tảng của Spring, Hibernate, JUnit
```

---

👉 **[Bài 22: JVM Internals — Bộ Nhớ và Garbage Collection](../bai-22-jvm-internals/README.md)**
