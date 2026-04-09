# Bài 23: Testing với JUnit 5 & Mockito

> 🔴 **Phase 4 – Bài 5/5** | Thời gian: ~4 giờ

---

Thầy nói thật: khi thầy mới học lập trình, thầy nghĩ testing là "làm cho xong" — viết vài test cho có rồi thôi. Nhưng sau nhiều năm làm dự án thực tế, thầy nhận ra: **code không có test = code bạn không dám refactor, không dám deploy tự tin**.

Bài này thầy sẽ dạy bạn cách viết test **thực sự hữu ích**, không phải test cho có.

---

## 1. Tại Sao Cần Testing?

```
Không có test:                               Có test:
- Sửa bug A → tạo ra bug B (regression)    - Regression được phát hiện ngay
- Deploy xong mệt lắm, sợ mọi thứ vỡ     - Deploy tự tin
- Refactor = rủi ro cao                    - Refactor thoải mái
- Bug production = debug trong tối         - Bug = test case cụ thể reproduce
```

---

## 2. Cài Đặt (Maven)

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.6.0</version>
    <scope>test</scope>
</dependency>
```

---

## 3. JUnit 5 — Unit Test Cơ Bản

```java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class TaiKhoanTest {

    private TaiKhoan tk;

    @BeforeEach  // Chạy trước MỖI test method
    void setup() {
        tk = new TaiKhoan("TK001", "Raize", 1_000_000);
    }

    @AfterEach   // Chạy sau mỗi test (nếu cần cleanup)
    void tearDown() { }

    @BeforeAll   // Chạy 1 lần trước tất cả test (static!)
    static void setupOnce() { System.out.println("Bắt đầu test suite"); }

    @Test
    void napTien_hopLe_tangSoDu() {
        // Arrange — Chuẩn bị dữ liệu (đã xong trong @BeforeEach)

        // Act — Thực hiện hành động cần test
        tk.napTien(500_000);

        // Assert — Kiểm tra kết quả
        assertEquals(1_500_000, tk.getSoDu(), "Số dư sau nạp phải là 1,500,000");
    }

    @Test
    void napTien_soTienAm_nemException() {
        // Test xem exception có được ném không
        IllegalArgumentException ex = assertThrows(
            IllegalArgumentException.class,
            () -> tk.napTien(-1000)
        );
        assertTrue(ex.getMessage().contains("phải > 0"));
    }

    @Test
    void rutTien_dusoDu_giamSoDu() {
        tk.rutTien(300_000);
        assertEquals(700_000, tk.getSoDu());
    }

    @Test
    void rutTien_khongDuSoDu_nemException() {
        assertThrows(SoDuKhongDuException.class, () -> tk.rutTien(2_000_000));
    }

    @Test
    void getSoDu_taiKhoanMoi_bangSoBanDau() {
        assertEquals(1_000_000, tk.getSoDu());
    }
}
```

---

## 4. Các Assertion Thường Dùng

```java
// Kiểm tra giá trị
assertEquals(expected, actual);
assertEquals(3.14, result, 0.001);   // double với delta
assertNotEquals(expected, actual);

// Kiểm tra null/boolean
assertNull(obj);
assertNotNull(obj);
assertTrue(condition);
assertFalse(condition);

// Kiểm tra collection
assertArrayEquals(new int[]{1,2,3}, arr);
// Với AssertJ (thư viện khác, phổ biến hơn):
// assertThat(list).hasSize(3).contains("A").doesNotContain("Z");

// Fail thủ công
fail("Phần này không nên chạy đến");

// Nhiều assertion, và tất cả đều chạy (dù có fail):
assertAll("Kiểm tra NguoiDung",
    () -> assertEquals("raize99", user.getUsername()),
    () -> assertEquals("r@mail.com", user.getEmail()),
    () -> assertTrue(user.isActive())
);
```

---

## 5. Parameterized Test — Test Nhiều Bộ Dữ Liệu

```java
@ParameterizedTest
@CsvSource({
    "raize99,     true",   // username hợp lệ
    "ab,          false",  // quá ngắn
    "a_very_long_username_more_than_20_chars, false",  // quá dài
    "valid_name,  true",
    ",            false",  // null/blank
})
void kiemTraUsername(String username, boolean expected) {
    assertEquals(expected, Validator.hopLeUsername(username));
}

@ParameterizedTest
@ValueSource(ints = {-1, -100, 0})
void napTienSoAmNemException(int soTien) {
    assertThrows(IllegalArgumentException.class, () -> tk.napTien(soTien));
}
```

---

## 6. Mockito — Giả Lập Dependency

Khi test một class phụ thuộc vào class khác (DB, email service...), bạn không muốn gọi thật. **Mock** = giả lập dependency.

```java
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class DangKyServiceTest {

    @Mock
    private NguoiDungRepository userRepo;  // Mock — không gọi DB thật

    @Mock
    private EmailService emailService;     // Mock — không gửi email thật

    @InjectMocks
    private DangKyService dangKyService;   // Class cần test — inject mock vào

    @Test
    void dangKy_usernameHopLe_taoUserThanhCong() {
        // Arrange: setup mock behavior
        when(userRepo.existsByUsername("raize99")).thenReturn(false);  // Username chưa tồn tại
        when(userRepo.save(any(NguoiDung.class))).thenAnswer(inv -> inv.getArgument(0));

        // Act
        NguoiDung result = dangKyService.dangKy("raize99", "r@mail.com", "password123");

        // Assert
        assertNotNull(result);
        assertEquals("raize99", result.getUsername());

        // Verify: email service được gọi đúng 1 lần
        verify(emailService, times(1)).guiEmailXacNhan(eq("r@mail.com"), anyString());
        // Verify: save được gọi đúng 1 lần
        verify(userRepo, times(1)).save(any(NguoiDung.class));
    }

    @Test
    void dangKy_usernameToTon_nemException() {
        when(userRepo.existsByUsername("raize99")).thenReturn(true);  // Đã tồn tại

        assertThrows(UsernameConTonTaiException.class,
            () -> dangKyService.dangKy("raize99", "r@mail.com", "pass"));

        // Verify email KHÔNG được gửi
        verify(emailService, never()).guiEmailXacNhan(anyString(), anyString());
    }
}
```

---

## 7. Test Coverage — Bao Nhiêu Là Đủ?

```
Không phải 100% coverage = tốt!

Thầy khuyên:
- Core business logic: 80-90%+ coverage
- Utility classes: 70-80%
- Controller/API: Test integration, không cần unit test chi tiết
- Không cần test: getter/setter đơn giản, toString()

Công cụ đo coverage:
- IntelliJ: Run with Coverage (built-in)
- JaCoCo: plugin Maven/Gradle, báo cáo HTML
```

---

## 8. Nguyên Tắc Viết Test Tốt (F.I.R.S.T)

```
Fast:        Test chạy nhanh (dưới 100ms mỗi test)
Independent: Test không phụ thuộc vào nhau (thứ tự chạy không quan trọng)
Repeatable:  Cùng input → cùng output (không random, không network)
Self-validating: Test pass/fail rõ ràng — không cần nhìn output thủ công
Timely:      Viết test cùng lúc hoặc trước code (TDD)
```

---

## Tóm Tắt — Bài 23

```
✅ @Test: đánh dấu method là test case
✅ @BeforeEach/@AfterEach: setup/teardown trước/sau mỗi test
✅ assertEquals, assertThrows, assertNotNull...: kiểm tra kết quả
✅ @ParameterizedTest + @CsvSource: test nhiều bộ dữ liệu gọn gàng
✅ Mockito @Mock: giả lập dependency (không gọi DB/email thật)
✅ when().thenReturn(): định nghĩa hành vi mock
✅ verify(): kiểm tra method được gọi đúng số lần
✅ Test tốt: Fast, Independent, Repeatable, Self-validating
```

---

## 🎉 Phase 4 Hoàn Thành!

Bạn đã học những thứ mà nhiều developer Java kinh nghiệm 2-3 năm chưa chắc đã nắm vững. Đây là nền tảng để bạn bước vào Phase 5 — **Modern Java và Ecosystem**.

👉 **[Bài 24: Modern Java — Records, Sealed Classes, Pattern Matching](../../phase5-modern-ecosystem/bai-24-modern-java/README.md)**
