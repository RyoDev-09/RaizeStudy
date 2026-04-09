# Bài 26: Spring Boot — Bước Vào Framework

> 🟣 **Phase 5 – Bài 3/3** | Thời gian: ~8 giờ (Bài học lớn nhất!)

---

Đây là bài cuối của lộ trình. Nhưng thầy muốn nói rõ trước: **Spring Boot không phải điểm kết thúc — đây là điểm bắt đầu của một hành trình mới**. Tuy nhiên, sau 25 bài học, bạn đã có đủ nền tảng để học Spring Boot một cách thực sự hiểu sâu, không chỉ copy-paste.

Dự án RaizeShop mà bạn đang tham khảo — chính là Spring Boot!

---

## 1. Spring Boot Là Gì?

**Spring Framework** = Bộ công cụ khổng lồ cho Java enterprise development (IoC Container, DI, AOP, MVC, Security, Data...).

**Spring Boot** = Spring + auto-configuration. Giúp bạn khởi tạo Spring app mà không cần cấu hình 100 trang XML như thời Spring 2.x.

```
Không có Spring Boot:
  - Cấu hình XML phức tạp
  - Phải deploy lên Tomcat riêng
  - Tích hợp thư viện thủ công

Với Spring Boot:
  - Application.java + @SpringBootApplication → Chạy!
  - Embedded server (Tomcat built-in)
  - Auto-configuration dựa trên thư viện trong classpath
```

---

## 2. Khởi Tạo Dự Án

```bash
# Cách 1: spring initializr (https://start.spring.io)
# Cách 2: IntelliJ → New Project → Spring Initializr
# Cách 3: Spring Boot CLI
```

**Chọn dependencies:**
- Spring Web (REST API)
- Spring Data JPA
- MySQL Driver
- Spring Security
- Lombok (giảm boilerplate)
- Spring Boot DevTools (hot reload)

**Cấu trúc project sau tạo:**
```
src/
└── main/
    ├── java/com/example/raizeshop/
    │   ├── RaizeshopApplication.java  ← Entry point
    │   ├── controller/
    │   ├── service/
    │   ├── repository/
    │   ├── entity/
    │   ├── dto/
    │   └── config/
    └── resources/
        └── application.properties    ← Cấu hình
```

---

## 3. application.properties — Cấu Hình Ứng Dụng

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/raizeshop
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA
spring.jpa.hibernate.ddl-auto=update       # create/update/validate/none
spring.jpa.show-sql=true                   # In SQL ra console
spring.jpa.properties.hibernate.format_sql=true

# Server
server.port=8080
server.servlet.context-path=/api           # Prefix /api cho tất cả endpoint

# Logging
logging.level.com.example=DEBUG
```

---

## 4. IoC & Dependency Injection — Trái Tim Spring

**IoC (Inversion of Control):** Thay vì bạn `new` object, Spring quản lý vòng đời của chúng.

**Dependency Injection:** Spring "inject" dependency vào class thay vì class tự tạo.

```java
// ❌ Không có DI — tight coupling:
public class DonHangService {
    private DonHangRepository repo = new DonHangRepository();  // Hard-coded!
    private EmailService email = new EmailService();           // Khó test!
}

// ✅ Với Spring DI — loose coupling:
@Service
public class DonHangService {
    private final DonHangRepository repo;
    private final EmailService email;

    // Constructor injection — cách khuyên dùng
    public DonHangService(DonHangRepository repo, EmailService email) {
        this.repo = repo;
        this.email = email;
    }
    // Spring tự inject khi khởi động ứng dụng!
}
```

---

## 5. Annotations Quan Trọng

```java
// Stereotype annotations — Spring tự detect và quản lý:
@Component      // Bean thông thường
@Service        // Business logic layer — kế thừa @Component
@Repository     // Data access layer — kế thừa @Component
@Controller     // Web layer (trả về View) — kế thừa @Component
@RestController // Web layer REST API (= @Controller + @ResponseBody)

// Cấu hình:
@Configuration  // Class chứa bean definitions
@Bean           // Method trả về bean instance

// Dependency Injection:
@Autowired      // Inject dependency (field/setter injection)
// Constructor injection — không cần @Autowired nếu chỉ có 1 constructor
@Qualifier("redisCache")  // Chọn bean cụ thể khi có nhiều cùng type

// Scope:
@Scope("prototype")      // Tạo bean mới mỗi lần inject (default: singleton)
```

---

## 6. REST Controller — Xây Dựng API

```java
@RestController
@RequestMapping("/api/v1/san-pham")  // Base URL
public class SanPhamController {

    private final SanPhamService sanPhamService;

    public SanPhamController(SanPhamService sanPhamService) {
        this.sanPhamService = sanPhamService;
    }

    // GET /api/v1/san-pham — Lấy tất cả
    @GetMapping
    public ResponseEntity<List<SanPhamDTO>> getAll() {
        return ResponseEntity.ok(sanPhamService.layTatCa());
    }

    // GET /api/v1/san-pham/1 — Lấy theo ID
    @GetMapping("/{id}")
    public ResponseEntity<SanPhamDTO> getById(@PathVariable int id) {
        return sanPhamService.timTheoId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/v1/san-pham — Tạo mới
    @PostMapping
    public ResponseEntity<SanPhamDTO> create(@RequestBody @Valid TaoSanPhamRequest req) {
        SanPhamDTO created = sanPhamService.taoBan(req);
        URI location = URI.create("/api/v1/san-pham/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    // PUT /api/v1/san-pham/1 — Cập nhật
    @PutMapping("/{id}")
    public ResponseEntity<SanPhamDTO> update(
            @PathVariable int id,
            @RequestBody @Valid CapNhatSanPhamRequest req) {
        return ResponseEntity.ok(sanPhamService.capNhat(id, req));
    }

    // DELETE /api/v1/san-pham/1 — Xóa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        sanPhamService.xoa(id);
        return ResponseEntity.noContent().build();
    }

    // GET /api/v1/san-pham?danh-muc=weapon&min-gia=100000&page=1&size=10
    @GetMapping("/search")
    public ResponseEntity<Page<SanPhamDTO>> search(
            @RequestParam(required = false) String danhMuc,
            @RequestParam(defaultValue = "0") double minGia,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(sanPhamService.timKiem(danhMuc, minGia, page, size));
    }
}
```

---

## 7. Service Layer — Business Logic

```java
@Service
@Transactional
public class SanPhamService {

    private final SanPhamRepository sanPhamRepo;

    public SanPhamService(SanPhamRepository sanPhamRepo) {
        this.sanPhamRepo = sanPhamRepo;
    }

    @Transactional(readOnly = true)   // Tối ưu cho read operations
    public List<SanPhamDTO> layTatCa() {
        return sanPhamRepo.findAll().stream()
            .map(this::toDTO)         // Entity → DTO
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<SanPhamDTO> timTheoId(int id) {
        return sanPhamRepo.findById(id).map(this::toDTO);
    }

    public SanPhamDTO taoBan(TaoSanPhamRequest req) {
        // Validate business rules
        if (sanPhamRepo.existsByTen(req.getTen())) {
            throw new TrungTenException("Sản phẩm '" + req.getTen() + "' đã tồn tại");
        }

        SanPham sp = new SanPham();
        sp.setTen(req.getTen());
        sp.setGia(req.getGia());
        sp.setSoLuong(req.getSoLuong());
        sp.setDanhMuc(req.getDanhMuc());

        return toDTO(sanPhamRepo.save(sp));
    }

    private SanPhamDTO toDTO(SanPham sp) {
        return new SanPhamDTO(sp.getId(), sp.getTen(), sp.getGia(), sp.getSoLuong());
    }
}
```

---

## 8. DTO — Không Expose Entity Trực Tiếp

```java
// ❌ Không expose Entity trực tiếp:
// Entity có thể chứa password, các field nội bộ

// ✅ Dùng DTO (Data Transfer Object) — chọn field muốn expose:
public record SanPhamDTO(
    int id,
    String ten,
    double gia,
    int soLuong
) {
    // Record = DTO hoàn hảo — immutable, gọn
}

public record TaoSanPhamRequest(
    @NotBlank String ten,
    @Min(0) double gia,
    @Min(0) int soLuong,
    String danhMuc
) {}
```

---

## 9. Exception Handling Global

```java
@RestControllerAdvice  // Bắt exception từ tất cả Controller
public class GlobalExceptionHandler {

    @ExceptionHandler(TrungTenException.class)
    public ResponseEntity<ErrorResponse> handleTrungTen(TrungTenException e) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)  // 409
            .body(new ErrorResponse("DUPLICATE", e.getMessage()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException e) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)  // 404
            .body(new ErrorResponse("NOT_FOUND", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
        String errors = e.getBindingResult().getFieldErrors().stream()
            .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)  // 400
            .body(new ErrorResponse("VALIDATION_ERROR", errors));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception e) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)  // 500
            .body(new ErrorResponse("SERVER_ERROR", "Lỗi server, vui lòng thử lại"));
    }

    public record ErrorResponse(String code, String message) {}
}
```

---

## 10. Spring Security — Xác Thực & Phân Quyền

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())  // API thường disable CSRF
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()   // Login/register: public
                .requestMatchers(HttpMethod.GET, "/api/v1/san-pham/**").permitAll() // Đọc SP: public
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()                      // Còn lại: phải login
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // JWT
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Hash password trước khi lưu DB
    }
}
```

---

## 11. Con Đường Tiếp Theo

Bạn đã học xong lộ trình cơ bản đến Spring Boot. Nhưng hành trình vẫn còn tiếp:

```
Tiếp theo nên học:
┌──────────────────────────────────────────────────────┐
│ 📦 Docker & Docker Compose                           │
│    → Container hóa ứng dụng, deploy dễ dàng hơn     │
├──────────────────────────────────────────────────────┤
│ 🔴 Redis                                             │
│    → Cache, session, rate limiting                   │
├──────────────────────────────────────────────────────┤
│ 📊 Monitoring: Actuator, Prometheus, Grafana         │
│    → Theo dõi ứng dụng production                   │
├──────────────────────────────────────────────────────┤
│ 🚀 CI/CD: GitHub Actions, Jenkins                    │
│    → Tự động test và deploy                          │
├──────────────────────────────────────────────────────┤
│ ☁️ Cloud: AWS/GCP/Azure cơ bản                      │
│    → Deploy lên cloud                                │
└──────────────────────────────────────────────────────┘
```

---

## Tóm Tắt — Bài 26

```
✅ Spring Boot = Spring + autoconfiguration + embedded server
✅ IoC: Spring quản lý bean lifecycle, không phải bạn
✅ DI: Spring inject dependency (ưu tiên constructor injection)
✅ @RestController + @GetMapping/PostMapping/...: xây dựng REST API
✅ Service layer: business logic, @Transactional
✅ Repository (Spring Data JPA): data access, Spring tự implement
✅ DTO: không expose Entity trực tiếp ra ngoài
✅ @RestControllerAdvice: xử lý exception tập trung
✅ Spring Security: auth/authz với JWT
```

---

## 🎓 CHÚC MỪNG — BẠN ĐÃ HOÀN THÀNH LỘ TRÌNH!

Bạn đã đi từng bước từ dòng `Hello World` đầu tiên đến Spring Boot REST API hoàn chỉnh. Đó là một hành trình rất dài và bạn đã kiên trì đi đến cuối.

```
Phase 1 ✅  Java Fundamentals    — Biến, vòng lặp, method, array...
Phase 2 ✅  OOP                  — Class, Inheritance, Polymorphism...
Phase 3 ✅  Java Intermediate    — Collections, Lambda, Stream API...
Phase 4 ✅  Advanced Java        — Threading, Design Patterns, JVM...
Phase 5 ✅  Modern Ecosystem     — Modern Java, JPA, Spring Boot...
```

**Lời nhắn của thầy:**
> Code đẹp không phải code thông minh — code đẹp là code dễ đọc, dễ test, dễ thay đổi. Hãy luôn đặt câu hỏi "Tại sao?" và "Có cách nào tốt hơn không?" khi viết code.
>
> Chúc bạn trở thành Java developer xuất sắc!
