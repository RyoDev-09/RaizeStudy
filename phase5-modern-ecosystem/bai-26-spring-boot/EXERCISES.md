# Bài Tập — Bài 26: Spring Boot

> 🟣 **Phase 5 – Bài 3/3** | Ôn tập: IoC/DI, REST Controller, Service, Repository, Exception Handling

---

## Chuẩn Bị Dự Án

Tạo Spring Boot project tại [start.spring.io](https://start.spring.io) với:
- **Group:** `com.raize`
- **Artifact:** `raize-shop-mini`
- **Dependencies:** Spring Web, Spring Data JPA, MySQL Driver, Lombok, Spring Validation

---

## Bài 1: Dependency Injection — Hiểu Cốt Lõi Spring ⭐

### Part A — Phân Tích Code

Đọc 2 version và giải thích sự khác biệt:

```java
// Version 1: Không có DI — tight coupling
public class DonHangServiceV1 {
    private DonHangRepository repo = new DonHangRepository();  // Hard-coded!
    private EmailService email = new EmailServiceImpl();       // Khó test, khó thay thế

    public void datHang(DonHang don) {
        repo.save(don);
        email.gui(don.getEmail(), "Xác nhận đơn hàng");
    }
}

// Version 2: Spring DI — loose coupling
@Service
public class DonHangServiceV2 {
    private final DonHangRepository repo;
    private final EmailService email;

    // Constructor injection
    public DonHangServiceV2(DonHangRepository repo, EmailService email) {
        this.repo = repo;
        this.email = email;
    }

    public void datHang(DonHang don) {
        repo.save(don);
        email.gui(don.getEmail(), "Xác nhận đơn hàng");
    }
}
```

**Câu hỏi (trả lời bằng comment):**
1. Tại sao `DonHangServiceV1` khó viết unit test?
2. Trong `DonHangServiceV2`, ai tạo object `DonHangRepository` và `EmailService`?
3. Nếu muốn đổi `EmailServiceImpl` thành `SmsServiceImpl`, V1 và V2 cần sửa ở đâu?
4. Tại sao nên dùng **constructor injection** thay vì `@Autowired` trên field?

### Part B — Tạo Bean Thực Tế

```java
// TODO: Tạo interface và 2 implementation, Spring chọn đúng bean theo profile

public interface ThongBaoService {
    void gui(String nguoiNhan, String noiDung);
}

// @Component cho môi trường production
// @Profile("prod")
public class EmailThongBaoService implements ThongBaoService {
    @Override
    public void gui(String nguoiNhan, String noiDung) {
        System.out.println("📧 Gửi email đến " + nguoiNhan + ": " + noiDung);
    }
}

// @Component cho môi trường development
// @Profile("dev")
public class ConsoleThongBaoService implements ThongBaoService {
    @Override
    public void gui(String nguoiNhan, String noiDung) {
        System.out.println("[CONSOLE] Thông báo → " + nguoiNhan + ": " + noiDung);
    }
}

// TODO: Inject ThongBaoService vào một Service khác, test với cả 2 profile
```

---

## Bài 2: REST API — CRUD Sản Phẩm ⭐⭐

Xây dựng REST API đầy đủ cho sản phẩm. **Cấu trúc bắt buộc:**

```
src/main/java/com/raize/raizeshopmini/
├── entity/SanPham.java
├── dto/
│   ├── SanPhamDTO.java          (record)
│   ├── TaoSanPhamRequest.java   (record với validation)
│   └── CapNhatRequest.java      (record)
├── repository/SanPhamRepository.java
├── service/SanPhamService.java
├── controller/SanPhamController.java
└── exception/
    ├── SanPhamKhongTonTaiException.java
    └── GlobalExceptionHandler.java
```

### Entity

```java
@Entity
@Table(name = "san_pham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String ten;

    @Column(nullable = false)
    private double gia;

    @Column(name = "so_luong")
    private int soLuong = 0;

    @Column(length = 50)
    private String danhMuc;

    // TODO: Thêm getters, setters (hoặc dùng @Data từ Lombok)
}
```

### DTO (dùng Record)

```java
// TODO: Tạo SanPhamDTO record với: id, ten, gia, soLuong, danhMuc

// TODO: TaoSanPhamRequest record với validation:
// - ten: @NotBlank, không quá 100 ký tự
// - gia: @Min(0)
// - soLuong: @Min(0)
// - danhMuc: không bắt buộc

// TODO: CapNhatRequest record (tương tự TaoSanPhamRequest)
```

### Repository

```java
public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
    // TODO: Thêm các method:
    // 1. Tìm theo danh mục (trả về List)
    // 2. Kiểm tra tên đã tồn tại chưa (existsBy...)
    // 3. Tìm theo khoảng giá (Between)
    // 4. Custom JPQL: tìm sản phẩm gần hết hàng (soLuong < nguong)
}
```

### Service

```java
@Service
public class SanPhamService {
    private final SanPhamRepository sanPhamRepo;

    public SanPhamService(SanPhamRepository sanPhamRepo) {
        this.sanPhamRepo = sanPhamRepo;
    }

    // TODO: Implement các method:
    // 1. layTatCa() → List<SanPhamDTO>
    // 2. timTheoId(int id) → SanPhamDTO (throw SanPhamKhongTonTaiException nếu không tìm thấy)
    // 3. timTheoDanhMuc(String danhMuc) → List<SanPhamDTO>
    // 4. tao(TaoSanPhamRequest req) → SanPhamDTO (validate tên không trùng)
    // 5. capNhat(int id, CapNhatRequest req) → SanPhamDTO
    // 6. xoa(int id) → void

    // Helper: Entity → DTO
    private SanPhamDTO toDTO(SanPham sp) {
        // TODO
        return null;
    }
}
```

### Controller

```java
@RestController
@RequestMapping("/api/v1/san-pham")
public class SanPhamController {
    private final SanPhamService sanPhamService;

    public SanPhamController(SanPhamService sanPhamService) {
        this.sanPhamService = sanPhamService;
    }

    // TODO: Implement 6 endpoints:
    // GET    /api/v1/san-pham                    → 200 + List<SanPhamDTO>
    // GET    /api/v1/san-pham/{id}               → 200 + SanPhamDTO | 404
    // GET    /api/v1/san-pham?danhMuc=vu-khi     → 200 + List<SanPhamDTO>
    // POST   /api/v1/san-pham                    → 201 (Created) + SanPhamDTO
    // PUT    /api/v1/san-pham/{id}               → 200 + SanPhamDTO
    // DELETE /api/v1/san-pham/{id}               → 204 (No Content)
}
```

---

## Bài 3: Exception Handling Global ⭐⭐

```java
// Custom Exception
public class SanPhamKhongTonTaiException extends RuntimeException {
    public SanPhamKhongTonTaiException(int id) {
        super("Sản phẩm #" + id + " không tồn tại");
    }
}

// TODO: Tạo GlobalExceptionHandler với @RestControllerAdvice
// Xử lý các exception:
// 1. SanPhamKhongTonTaiException → 404 NOT FOUND
// 2. MethodArgumentNotValidException → 400 BAD REQUEST (validation errors)
// 3. IllegalStateException → 409 CONFLICT (tên trùng)
// 4. Exception → 500 INTERNAL SERVER ERROR

// Error response record:
public record ErrorResponse(
    int status,
    String error,
    String message,
    String timestamp
) {}

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SanPhamKhongTonTaiException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(SanPhamKhongTonTaiException e) {
        // TODO
        return null;
    }

    // TODO: Thêm các handler khác
}
```

**Test bằng curl hoặc Postman:**
```bash
# Test 404
curl -X GET http://localhost:8080/api/v1/san-pham/9999

# Test validation 400
curl -X POST http://localhost:8080/api/v1/san-pham \
  -H "Content-Type: application/json" \
  -d '{"ten": "", "gia": -100}'

# Test 409 (tên trùng)
curl -X POST http://localhost:8080/api/v1/san-pham \
  -H "Content-Type: application/json" \
  -d '{"ten": "Kiếm Thần", "gia": 200000, "soLuong": 10}'
```

---

## Bài 4: Nhiều Entity và Relationship ⭐⭐⭐

Thêm entity `DonHang` với relationship đến `SanPham` và `NguoiDung`:

```java
// TODO: Tạo DonHang entity
@Entity
@Table(name = "don_hang")
public class DonHang {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // @ManyToOne → NguoiDung (người mua)
    // @ManyToOne → SanPham
    // soLuong
    // tongTien
    // trangThai: "DANG_XU_LY" | "HOAN_TAT" | "HUY"
    // ngayDatHang
}

// TODO: Tạo DonHangService với method datHang(int userId, int spId, int soLuong):
// 1. Kiểm tra user tồn tại
// 2. Kiểm tra SP tồn tại và đủ số lượng
// 3. Kiểm tra user đủ tiền
// 4. Trừ số lượng SP, trừ tiền user
// 5. Tạo DonHang
// Tất cả trong @Transactional — rollback nếu lỗi ở bất kỳ bước nào

// TODO: Thêm endpoint:
// POST /api/v1/don-hang { "userId": 1, "spId": 2, "soLuong": 3 }
// GET  /api/v1/don-hang/user/{userId}
```

---

## Bài 5 (Nâng Cao): Tích Hợp Đầy Đủ ⭐⭐⭐

Viết tính năng **Tìm kiếm + Phân trang**:

```java
// TODO: Endpoint:
// GET /api/v1/san-pham/search?ten=kiem&minGia=100000&maxGia=500000&danhMuc=vu-khi&page=0&size=10&sort=gia,asc

@GetMapping("/search")
public ResponseEntity<Page<SanPhamDTO>> search(
    @RequestParam(required = false) String ten,
    @RequestParam(required = false) Double minGia,
    @RequestParam(required = false) Double maxGia,
    @RequestParam(required = false) String danhMuc,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(defaultValue = "id,asc") String sort
) {
    // TODO: Implement logic tìm kiếm linh hoạt
    // Gợi ý: dùng Specification hoặc JPQL động
    return null;
}
```

**Gợi ý implementation:**
```java
// Trong Repository:
@Query("SELECT s FROM SanPham s WHERE " +
       "(:ten IS NULL OR LOWER(s.ten) LIKE LOWER(CONCAT('%', :ten, '%'))) AND " +
       "(:minGia IS NULL OR s.gia >= :minGia) AND " +
       "(:maxGia IS NULL OR s.gia <= :maxGia) AND " +
       "(:danhMuc IS NULL OR s.danhMuc = :danhMuc)")
Page<SanPham> timKiem(@Param("ten") String ten,
                       @Param("minGia") Double minGia,
                       @Param("maxGia") Double maxGia,
                       @Param("danhMuc") String danhMuc,
                       Pageable pageable);
```

---

## Kiểm Tra Cuối — Self-Review

Sau khi hoàn thành, hãy tự kiểm tra:

```
□ IoC/DI: các class đều dùng constructor injection, không dùng new trực tiếp
□ Layered Architecture: Controller chỉ điều phối, logic ở Service, data ở Repository
□ DTO: không expose Entity trực tiếp ra API response
□ Validation: @Valid + @NotBlank/@Min/... trên Request DTO
□ Exception Handling: GlobalExceptionHandler tập trung xử lý exception
□ HTTP Status Code: 200 OK, 201 Created, 204 No Content, 400, 404, 409, 500
□ @Transactional: đặt ở Service layer, readOnly = true cho read operations
□ Không có business logic trong Controller
□ Không có SQL thủ công trong Service (để Repository xử lý)
```

---

## Tóm Tắt Kiến Thức Cần Nhớ

```
✅ IoC: Spring quản lý bean lifecycle — bạn không new object thủ công
✅ DI: Constructor injection — dễ test, rõ ràng dependency
✅ @RestController + @RequestMapping: xây dựng REST API
✅ @GetMapping, @PostMapping, @PutMapping, @DeleteMapping: HTTP methods
✅ @PathVariable: lấy biến từ URL (/san-pham/{id})
✅ @RequestParam: lấy query param (?danhMuc=vu-khi)
✅ @RequestBody + @Valid: nhận và validate JSON body
✅ ResponseEntity: kiểm soát status code + body response
✅ @Service + @Transactional: business logic layer
✅ JpaRepository: CRUD miễn phí + findBy... tự generate
✅ @RestControllerAdvice: xử lý exception tập trung
✅ DTO (record): tách biệt API contract với database entity
```

---

## 🎓 CHÚC MỪNG — ĐÃ HOÀN THÀNH TOÀN BỘ LỘ TRÌNH!

```
Phase 1 ✅  Java Fundamentals    — Biến, vòng lặp, method, array
Phase 2 ✅  OOP                  — Class, Inheritance, Polymorphism
Phase 3 ✅  Java Intermediate    — Collections, Lambda, Stream API
Phase 4 ✅  Advanced Java        — Threading, Design Patterns, JVM, Testing
Phase 5 ✅  Modern Ecosystem     — Modern Java, JPA, Spring Boot
```

**Bước tiếp theo:**
- 📦 Docker & Docker Compose
- 🔐 JWT Authentication đầy đủ
- 🚀 CI/CD với GitHub Actions
- ☁️ Deploy lên Cloud (AWS/GCP)
