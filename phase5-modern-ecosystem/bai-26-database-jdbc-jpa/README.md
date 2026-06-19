# Bài 25: Database với JDBC & JPA

> 🟣 **Phase 5 – Bài 2/3** | Thời gian: ~5 giờ

---

Mọi ứng dụng thực tế đều cần lưu dữ liệu xuống database. Bài này Tôi sẽ dạy bạn **2 tầng công nghệ**:
- **JDBC** — API cấp thấp, giao tiếp trực tiếp với DB bằng SQL
- **JPA/Hibernate** — ORM (Object-Relational Mapping), map object Java ↔ bảng DB

Hiểu JDBC trước để biết JPA làm gì bên dưới. Sau đó dùng JPA vì nó tiết kiệm code hơn rất nhiều.

---

## 1. JDBC — Giao Tiếp Thẳng Với Database

### Setup (Maven)

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

### Kết Nối Database

```java
import java.sql.*;

public class DatabaseConnection {
    private static final String URL  = "jdbc:mysql://localhost:3306/raizeshop";
    private static final String USER = "root";
    private static final String PASS = "password";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }
}
```

### CRUD Với JDBC

```java
public class NguoiDungDAO {

    // CREATE
    public void them(NguoiDung u) throws SQLException {
        String sql = "INSERT INTO nguoi_dung (username, email, so_du) VALUES (?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, u.getUsername());
            ps.setString(2, u.getEmail());
            ps.setDouble(3, u.getSoDuVi());
            ps.executeUpdate();

            // Lấy ID tự tăng vừa được tạo
            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    u.setId(rs.getInt(1));
                }
            }
        }
    }

    // READ
    public Optional<NguoiDung> timTheoUsername(String username) throws SQLException {
        String sql = "SELECT * FROM nguoi_dung WHERE username = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, username);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    NguoiDung u = new NguoiDung(
                        rs.getString("username"),
                        rs.getString("email")
                    );
                    u.setId(rs.getInt("id"));
                    u.setSoDuVi(rs.getDouble("so_du"));
                    return Optional.of(u);
                }
            }
        }
        return Optional.empty();
    }

    // UPDATE
    public void capNhatSoDu(int id, double soDuMoi) throws SQLException {
        String sql = "UPDATE nguoi_dung SET so_du = ? WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setDouble(1, soDuMoi);
            ps.setInt(2, id);
            int soHangAnh = ps.executeUpdate();
            if (soHangAnh == 0) throw new RuntimeException("User #" + id + " không tồn tại");
        }
    }

    // DELETE
    public boolean xoa(int id) throws SQLException {
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement("DELETE FROM nguoi_dung WHERE id = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
```

> ⚠️ **Quan trọng:** Luôn dùng `PreparedStatement`, KHÔNG BAO GIỜ nối string SQL thủ công — đó là cách hacker SQL Injection tấn công!
> ```java
> // ❌ SQL Injection vulnerability!
> String sql = "SELECT * FROM users WHERE username = '" + username + "'";
> // Nếu username = "'; DROP TABLE users; --" → XÓA TOÀN BỘ DỮ LIỆU!
>
> // ✅ Dùng PreparedStatement với ?
> String sql = "SELECT * FROM users WHERE username = ?";
> ps.setString(1, username);  // Tự động escape ký tự nguy hiểm
> ```

---

## 2. JPA & Hibernate — ORM Layer

**ORM** = Object-Relational Mapping — tự động chuyển đổi giữa Java object và database table.

```
Java Object        ←→        Database Table
NguoiDung               nguoi_dung
  - id                    - id (PK, AUTO_INCREMENT)
  - username              - username (VARCHAR)
  - email                 - email (VARCHAR)
  - soDuVi                - so_du (DECIMAL)
```

### Setup (Maven)

```xml
<dependency>
    <groupId>org.hibernate.orm</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>6.4.0.Final</version>
</dependency>
```

### Entity Class — Ánh Xạ Java ↔ Table

```java
import jakarta.persistence.*;

@Entity                           // Đánh dấu là JPA entity
@Table(name = "nguoi_dung")       // Tên bảng trong DB (nếu khác tên class)
public class NguoiDung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer id;

    @Column(name = "username", nullable = false, unique = true, length = 20)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(name = "so_du", precision = 15, scale = 2)
    private double soDuVi = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Relationship: 1 NguoiDung có nhiều DonHang
    @OneToMany(mappedBy = "nguoiMua", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DonHang> donHangs = new ArrayList<>();

    // Constructor, getter, setter...
}
```

### Repository Pattern Với JPA

```java
import jakarta.persistence.*;
import java.util.Optional;

public class NguoiDungRepository {
    private final EntityManagerFactory emf;

    public NguoiDungRepository() {
        emf = Persistence.createEntityManagerFactory("raizeshop");
    }

    public NguoiDung save(NguoiDung u) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            if (u.getId() == null) {
                em.persist(u);     // INSERT
            } else {
                u = em.merge(u);   // UPDATE
            }
            em.getTransaction().commit();
            return u;
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    public Optional<NguoiDung> findById(int id) {
        EntityManager em = emf.createEntityManager();
        try {
            NguoiDung u = em.find(NguoiDung.class, id);
            return Optional.ofNullable(u);
        } finally {
            em.close();
        }
    }

    // JPQL Query — SQL nhưng viết theo tên class Java, không phải tên bảng
    public List<NguoiDung> findByRole(String role) {
        EntityManager em = emf.createEntityManager();
        try {
            return em.createQuery(
                "SELECT u FROM NguoiDung u WHERE u.role = :role ORDER BY u.username",
                NguoiDung.class)
                .setParameter("role", role)
                .getResultList();
        } finally {
            em.close();
        }
    }
}
```

---

## 3. Spring Data JPA — Cách Làm Trong Dự Án Thực

Trong Spring Boot, bạn không cần viết Repository thủ công. Spring Data JPA tự generate:

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

// Interface thôi — Spring tự implement!
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    // Spring tự generate: findAll(), findById(), save(), delete()...

    // Đặt tên method đặc biệt → Spring tự generate SQL:
    Optional<NguoiDung> findByUsername(String username);
    List<NguoiDung> findByRoleOrderByUsernameAsc(String role);
    boolean existsByEmail(String email);
    long countByRole(String role);

    // Custom JPQL query:
    @Query("SELECT u FROM NguoiDung u WHERE u.soDuVi >= :min ORDER BY u.soDuVi DESC")
    List<NguoiDung> timNguoiDungGiau(@Param("min") double minSoDu);
}
```

---

## 4. Transaction — Đảm Bảo Tính Toàn Vẹn

```java
// @Transactional: nếu method throw exception → rollback tất cả thay đổi
@Service
public class MuaHangService {

    @Transactional
    public DonHang muaHang(int userId, int sanPhamId, int soLuong) {
        NguoiDung user = userRepo.findById(userId).orElseThrow();
        SanPham sp = spRepo.findById(sanPhamId).orElseThrow();

        double tongTien = sp.getGia() * soLuong;

        // Bước 1: Trừ tiền user
        if (user.getSoDuVi() < tongTien) throw new SoDuKhongDuException();
        user.setSoDuVi(user.getSoDuVi() - tongTien);

        // Bước 2: Trừ kho
        if (sp.getSoLuong() < soLuong) throw new KhoKhongDuException();
        sp.setSoLuong(sp.getSoLuong() - soLuong);

        // Bước 3: Tạo đơn hàng
        DonHang don = new DonHang(user, sp, soLuong, tongTien);

        // Nếu BẤT KỲ bước nào throw → Transaction rollback → không bước nào được lưu!
        userRepo.save(user);
        spRepo.save(sp);
        return donHangRepo.save(don);
    }
}
```

---

## Tóm Tắt — Bài 25

```
✅ JDBC: kết nối DB thấp cấp — Connection, PreparedStatement, ResultSet
✅ PreparedStatement: LUÔN dùng thay vì nối string (tránh SQL Injection!)
✅ JPA @Entity: ánh xạ class Java ↔ bảng DB
✅ EntityManager: giao tiếp với DB qua JPA (persist, find, merge, remove)
✅ JPQL: SQL viết theo tên entity Java, không phải tên bảng
✅ Spring Data JPA: interface thôi, Spring tự implement (findBy..., existsBy...)
✅ @Transactional: đảm bảo tất cả hoặc không gì được lưu
```

---

👉 **[Bài 26: Spring Boot — Bước Vào Framework](../bai-26-spring-boot/README.md)**
