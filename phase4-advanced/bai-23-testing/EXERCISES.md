# Bài Tập — Bài 23: Testing với JUnit 5 & Mockito

> 🔴 **Phase 4 – Bài 5/5** | Ôn tập: JUnit 5, Parameterized Test, Mockito

---

## Setup Maven

Thêm vào `pom.xml` trước khi làm bài:

```xml
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
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.6.0</version>
    <scope>test</scope>
</dependency>
```

---

## Bài 1: Unit Test Cơ Bản cho TaiKhoan ⭐

Cho class sau:

```java
// src/main/java/TaiKhoan.java
public class TaiKhoan {
    private final String maTK;
    private final String chuTK;
    private double soDu;

    public TaiKhoan(String maTK, String chuTK, double soDuBanDau) {
        if (soDuBanDau < 0) throw new IllegalArgumentException("Số dư ban đầu không được âm");
        this.maTK = maTK;
        this.chuTK = chuTK;
        this.soDu = soDuBanDau;
    }

    public void napTien(double soTien) {
        if (soTien <= 0) throw new IllegalArgumentException("Số tiền nạp phải > 0");
        this.soDu += soTien;
    }

    public void rutTien(double soTien) {
        if (soTien <= 0) throw new IllegalArgumentException("Số tiền rút phải > 0");
        if (soTien > soDu) throw new IllegalStateException("Số dư không đủ");
        this.soDu -= soTien;
    }

    public double getSoDu()  { return soDu; }
    public String getMaTK()  { return maTK; }
    public String getChuTK() { return chuTK; }
}
```

**Yêu cầu:** Viết class `TaiKhoanTest` với đầy đủ các test case:

```java
// src/test/java/TaiKhoanTest.java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class TaiKhoanTest {

    private TaiKhoan tk;

    @BeforeEach
    void setup() {
        tk = new TaiKhoan("TK001", "Raize", 1_000_000);
    }

    // TODO: Test 1 — napTien hợp lệ → số dư tăng đúng
    @Test
    void napTien_hopLe_tangSoDu() {
        // Act
        tk.napTien(500_000);
        // Assert
        assertEquals(/* expected */, tk.getSoDu());
    }

    // TODO: Test 2 — napTien số âm → ném IllegalArgumentException với message chứa "> 0"

    // TODO: Test 3 — napTien = 0 → ném IllegalArgumentException

    // TODO: Test 4 — rutTien hợp lệ → số dư giảm đúng

    // TODO: Test 5 — rutTien vượt số dư → ném IllegalStateException

    // TODO: Test 6 — tạo TaiKhoan với soDuBanDau âm → ném IllegalArgumentException

    // TODO: Test 7 — kiểm tra getMaTK và getChuTK trả về đúng

    // TODO: Test 8 — nạp rồi rút rồi kiểm tra số dư cuối cùng
    @Test
    void napRoiRut_soduCuoiDung() {
        tk.napTien(200_000);
        tk.rutTien(300_000);
        assertEquals(/* expected */ 0, tk.getSoDu());
    }
}
```

---

## Bài 2: Parameterized Test ⭐⭐

Cho class validator sau:

```java
// src/main/java/Validator.java
public class Validator {

    // Username: 3-20 ký tự, chỉ a-z, 0-9, gạch dưới
    public static boolean hopLeUsername(String username) {
        if (username == null || username.isBlank()) return false;
        if (username.length() < 3 || username.length() > 20) return false;
        return username.matches("[a-z0-9_]+");
    }

    // Email cơ bản
    public static boolean hopLeEmail(String email) {
        if (email == null) return false;
        return email.matches("^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$");
    }

    // Mật khẩu: ít nhất 8 ký tự, có chữ hoa, chữ thường, số
    public static boolean hopLeMatKhau(String matKhau) {
        if (matKhau == null || matKhau.length() < 8) return false;
        boolean coHoa   = matKhau.chars().anyMatch(Character::isUpperCase);
        boolean coThuong = matKhau.chars().anyMatch(Character::isLowerCase);
        boolean coSo    = matKhau.chars().anyMatch(Character::isDigit);
        return coHoa && coThuong && coSo;
    }
}
```

**Yêu cầu:** Viết `ValidatorTest` với Parameterized Tests:

```java
// src/test/java/ValidatorTest.java
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import static org.junit.jupiter.api.Assertions.*;

class ValidatorTest {

    // TODO: Test username với @CsvSource ít nhất 8 bộ dữ liệu:
    // - "raize99, true"       — hợp lệ
    // - "ab, false"           — quá ngắn (< 3)
    // - "a, false"            — quá ngắn
    // - "012345678901234567890, false" — quá dài (> 20)
    // - "Raize99, false"      — có chữ hoa
    // - "raize-99, false"     — có ký tự không hợp lệ (dấu gạch ngang)
    // - ", false"             — blank
    // - "valid_name, true"    — hợp lệ với gạch dưới
    @ParameterizedTest
    @CsvSource({
        // TODO: Điền vào đây
    })
    void kiemTraUsername(String username, boolean expected) {
        assertEquals(expected, Validator.hopLeUsername(username));
    }

    // TODO: Test email với @CsvSource ít nhất 5 bộ dữ liệu

    // TODO: Test mật khẩu với @CsvSource ít nhất 6 bộ dữ liệu:
    // - "Password1, true"
    // - "password1, false"  — không có chữ hoa
    // - "PASSWORD1, false"  — không có chữ thường
    // - "Password, false"   — không có số
    // - "Pw1, false"        — quá ngắn
    // - "Super$ecret9, true"

    // TODO: Test các số âm với @ValueSource(ints = {-1, -100, 0})
    // gọi napTien trên TaiKhoan và expect IllegalArgumentException
}
```

---

## Bài 3: Test Exception và assertAll ⭐⭐

```java
// src/main/java/DangKyService.java (class đơn giản, không dùng Spring)
public class DangKyService {
    private final List<String> danhSachUsername = new ArrayList<>();

    public NguoiDung dangKy(String username, String email, String matKhau) {
        // Validate
        if (!Validator.hopLeUsername(username))
            throw new IllegalArgumentException("Username không hợp lệ: " + username);
        if (!Validator.hopLeEmail(email))
            throw new IllegalArgumentException("Email không hợp lệ: " + email);
        if (!Validator.hopLeMatKhau(matKhau))
            throw new IllegalArgumentException("Mật khẩu yếu: cần ít nhất 8 ký tự, hoa, thường, số");

        // Check trùng
        if (danhSachUsername.contains(username))
            throw new IllegalStateException("Username '" + username + "' đã tồn tại");

        // Tạo user
        danhSachUsername.add(username);
        return new NguoiDung(username, email);
    }
}
```

**Yêu cầu:** Viết `DangKyServiceTest`:

```java
class DangKyServiceTest {

    private DangKyService service;

    @BeforeEach
    void setup() {
        service = new DangKyService();
    }

    // TODO: Test 1 — đăng ký thành công → kiểm tra username và email bằng assertAll
    @Test
    void dangKy_thanhCong_userDuocTao() {
        NguoiDung u = service.dangKy("raize99", "r@mail.com", "Raize@123");

        assertAll("Kiểm tra NguoiDung vừa tạo",
            // TODO: Thêm ít nhất 2 assertion
        );
    }

    // TODO: Test 2 — username trùng → IllegalStateException với message chứa username

    // TODO: Test 3 — username không hợp lệ → IllegalArgumentException

    // TODO: Test 4 — email không hợp lệ → IllegalArgumentException

    // TODO: Test 5 — mật khẩu yếu → IllegalArgumentException với message chứa "8 ký tự"

    // TODO: Test 6 — đăng ký 2 user khác nhau → cả 2 thành công (không ảnh hưởng nhau)
}
```

---

## Bài 4: Mockito — Mock Dependency ⭐⭐⭐

Cho interface và class sau:

```java
// Interface
public interface NguoiDungRepository {
    boolean existsByUsername(String username);
    NguoiDung save(NguoiDung u);
    Optional<NguoiDung> findByUsername(String username);
}

public interface EmailService {
    void guiEmailChaoMung(String email, String username);
}

// Class cần test
public class DangKyServiceV2 {
    private final NguoiDungRepository userRepo;
    private final EmailService emailService;

    public DangKyServiceV2(NguoiDungRepository userRepo, EmailService emailService) {
        this.userRepo = userRepo;
        this.emailService = emailService;
    }

    public NguoiDung dangKy(String username, String email, String matKhau) {
        if (userRepo.existsByUsername(username))
            throw new IllegalStateException("Username đã tồn tại");

        NguoiDung u = new NguoiDung(username, email);
        NguoiDung saved = userRepo.save(u);

        emailService.guiEmailChaoMung(email, username);

        return saved;
    }
}
```

**Yêu cầu:** Viết `DangKyServiceV2Test` dùng Mockito:

```java
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DangKyServiceV2Test {

    @Mock
    private NguoiDungRepository userRepo;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private DangKyServiceV2 service;

    // TODO: Test 1 — đăng ký thành công
    // - when(userRepo.existsByUsername("raize99")).thenReturn(false)
    // - when(userRepo.save(any())).thenAnswer(inv -> inv.getArgument(0))
    // - Verify: emailService.guiEmailChaoMung() được gọi đúng 1 lần
    // - Verify: userRepo.save() được gọi đúng 1 lần

    // TODO: Test 2 — username đã tồn tại → IllegalStateException
    // - when(userRepo.existsByUsername("raize99")).thenReturn(true)
    // - Verify: userRepo.save() KHÔNG được gọi (verify với times(0) hoặc never())
    // - Verify: emailService KHÔNG được gọi

    // TODO: Test 3 — userRepo.save() ném exception → exception được propagate ra ngoài
    // - when(userRepo.save(any())).thenThrow(new RuntimeException("DB lỗi"))
    // - Kiểm tra RuntimeException được ném ra

    // TODO: Test 4 — verify đúng argument truyền vào emailService
    // - Dùng verify(emailService).guiEmailChaoMung(eq("r@mail.com"), eq("raize99"))
}
```

---

## Bài 5 (Nâng Cao): Test Coverage và Nguyên Tắc F.I.R.S.T ⭐⭐⭐

**Yêu cầu:** Viết test suite hoàn chỉnh cho class `MayTinhTienLai` sau, đảm bảo **coverage > 90%**:

```java
public class MayTinhTienLai {

    /**
     * Tính lãi kép
     * @param vonGoc  số tiền ban đầu (VND)
     * @param laiSuat lãi suất hàng năm (ví dụ: 0.08 = 8%)
     * @param soNam   số năm gửi
     * @return tổng tiền sau soNam năm
     */
    public double laiKep(double vonGoc, double laiSuat, int soNam) {
        if (vonGoc <= 0) throw new IllegalArgumentException("Vốn gốc phải > 0");
        if (laiSuat < 0 || laiSuat > 1) throw new IllegalArgumentException("Lãi suất phải trong [0, 1]");
        if (soNam <= 0) throw new IllegalArgumentException("Số năm phải > 0");
        return vonGoc * Math.pow(1 + laiSuat, soNam);
    }

    /**
     * Tính số tháng để đạt mục tiêu tiết kiệm
     * @param vonBanDau  tiền ban đầu
     * @param goiHangThang số tiền gửi thêm mỗi tháng
     * @param laiSuatThang lãi suất mỗi tháng
     * @param mucTieu   số tiền muốn đạt
     * @return số tháng cần thiết, hoặc -1 nếu không thể đạt (mục tiêu <= vốn ban đầu)
     */
    public int soThangDatMucTieu(double vonBanDau, double goiHangThang,
                                  double laiSuatThang, double mucTieu) {
        if (mucTieu <= vonBanDau) return 0;
        if (goiHangThang <= 0 && laiSuatThang <= 0) return -1;

        double soDu = vonBanDau;
        int thang = 0;
        while (soDu < mucTieu && thang < 1200) {  // max 100 năm
            soDu = soDu * (1 + laiSuatThang) + goiHangThang;
            thang++;
        }
        return soDu >= mucTieu ? thang : -1;
    }
}
```

**Checklist test cần viết (ít nhất 12 test cases):**
- [ ] `laiKep` kết quả đúng (dùng `assertEquals` với delta cho double)
- [ ] `laiKep` vonGoc = 0 → exception
- [ ] `laiKep` vonGoc âm → exception
- [ ] `laiKep` laiSuat âm → exception
- [ ] `laiKep` laiSuat > 1 → exception
- [ ] `laiKep` soNam = 0 → exception
- [ ] `laiKep` laiSuat = 0 → kết quả bằng vonGoc
- [ ] `soThangDatMucTieu` mucTieu <= vonBanDau → trả về 0
- [ ] `soThangDatMucTieu` không thể đạt → trả về -1
- [ ] `soThangDatMucTieu` kết quả hợp lý (số tháng > 0)
- [ ] `@ParameterizedTest`: nhiều bộ dữ liệu cho `laiKep`
- [ ] Test với số tiền lớn (tránh precision issue)

---

## Tóm Tắt Kiến Thức Cần Nhớ

```
✅ @Test: đánh dấu test case
✅ @BeforeEach: setup trước mỗi test (tạo object mới → test độc lập)
✅ assertEquals, assertThrows, assertAll, assertNotNull...
✅ @ParameterizedTest + @CsvSource/@ValueSource: test nhiều bộ dữ liệu
✅ Mockito @Mock: giả lập dependency, không gọi thật
✅ when().thenReturn() / when().thenThrow(): định nghĩa hành vi mock
✅ verify(): kiểm tra method được gọi đúng số lần, đúng argument
✅ @InjectMocks: inject mock vào class cần test
✅ Test tốt: Fast, Independent, Repeatable, Self-validating, Timely (F.I.R.S.T)
```

---

## 🎉 Phase 4 Hoàn Thành!

👉 **[Bài 24: Modern Java — Records, Sealed Classes, Pattern Matching](../../phase5-modern-ecosystem/bai-24-modern-java/EXERCISES.md)**
