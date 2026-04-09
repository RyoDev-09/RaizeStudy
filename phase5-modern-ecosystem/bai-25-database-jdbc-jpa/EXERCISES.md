# Bài Tập — Bài 25: Database với JDBC & JPA

> 🟣 **Phase 5 – Bài 2/3** | Ôn tập: JDBC, PreparedStatement, JPA Entity, JPQL

---

## Chuẩn Bị

Tạo database MySQL cho các bài tập:

```sql
CREATE DATABASE raize_hoc;
USE raize_hoc;

CREATE TABLE san_pham (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    ten         VARCHAR(100) NOT NULL,
    gia         DECIMAL(15, 2) NOT NULL,
    so_luong    INT DEFAULT 0,
    danh_muc    VARCHAR(50),
    ngay_tao    DATETIME DEFAULT NOW()
);

CREATE TABLE nguoi_dung (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(20) UNIQUE NOT NULL,
    email       VARCHAR(100) NOT NULL,
    so_du       DECIMAL(15, 2) DEFAULT 0,
    role        VARCHAR(20) DEFAULT 'USER'
);

-- Dữ liệu mẫu
INSERT INTO san_pham (ten, gia, so_luong, danh_muc) VALUES
    ('Kiếm Thần', 150000, 50, 'vu-khi'),
    ('Giáp Rồng', 280000, 20, 'giap'),
    ('Thuốc Hồi Máu', 5000, 500, 'do-dung'),
    ('Cung Thần', 200000, 30, 'vu-khi'),
    ('Khiên Bạc', 95000, 40, 'giap');

INSERT INTO nguoi_dung (username, email, so_du, role) VALUES
    ('raize99', 'raize@mail.com', 1000000, 'ADMIN'),
    ('player1', 'p1@mail.com', 500000, 'USER'),
    ('player2', 'p2@mail.com', 250000, 'USER');
```

---

## Bài 1: JDBC — CRUD Cơ Bản ⭐

### Part A — Kết Nối và Read

```java
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SanPhamDAO {
    private static final String URL  = "jdbc:mysql://localhost:3306/raize_hoc";
    private static final String USER = "root";
    private static final String PASS = "your_password";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }

    // TODO 1: Lấy tất cả sản phẩm, sắp xếp theo giá tăng dần
    public List<SanPham> layTatCa() throws SQLException {
        String sql = "SELECT * FROM san_pham ORDER BY gia ASC";
        List<SanPham> danhSach = new ArrayList<>();

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                // TODO: Map ResultSet → SanPham object
                danhSach.add(/* TODO */);
            }
        }
        return danhSach;
    }

    // TODO 2: Tìm sản phẩm theo danh mục
    public List<SanPham> timTheoDanhMuc(String danhMuc) throws SQLException {
        // TODO: Dùng PreparedStatement với tham số ?
        return new ArrayList<>();
    }

    // TODO 3: Thêm sản phẩm mới, trả về ID được tạo
    public int them(SanPham sp) throws SQLException {
        String sql = "INSERT INTO san_pham (ten, gia, so_luong, danh_muc) VALUES (?, ?, ?, ?)";
        // TODO: Dùng Statement.RETURN_GENERATED_KEYS
        return -1;
    }

    // TODO 4: Cập nhật số lượng
    public boolean capNhatSoLuong(int id, int soLuongMoi) throws SQLException {
        // TODO
        return false;
    }

    // TODO 5: Xóa sản phẩm theo ID
    public boolean xoa(int id) throws SQLException {
        // TODO
        return false;
    }
}
```

### Part B — Main Test

```java
public class TestJDBC {
    public static void main(String[] args) throws SQLException {
        SanPhamDAO dao = new SanPhamDAO();

        // Test READ
        System.out.println("=== Tất cả sản phẩm ===");
        dao.layTatCa().forEach(System.out::println);

        // Test INSERT
        SanPham moi = new SanPham(0, "Phi Tiêu Vàng", 3000, 200, "vu-khi");
        int newId = dao.them(moi);
        System.out.println("\nThêm thành công, ID = " + newId);

        // Test UPDATE
        dao.capNhatSoLuong(newId, 150);
        System.out.println("Cập nhật số lượng thành công");

        // Test DELETE
        dao.xoa(newId);
        System.out.println("Xóa thành công");

        // Test tìm theo danh mục
        System.out.println("\n=== Vũ khí ===");
        dao.timTheoDanhMuc("vu-khi").forEach(System.out::println);
    }
}
```

---

## Bài 2: SQL Injection — Nhận Biết và Phòng Chống ⭐⭐

**Yêu cầu:** Phân tích 2 version sau và giải thích rủi ro:

```java
public class BaoMatDAO {

    // ❌ VERSION 1: Nguy hiểm — SQL Injection
    public boolean dangNhapKhongAnToan(String username, String matKhau) throws SQLException {
        // Nối string trực tiếp — NGUY HIỂM!
        String sql = "SELECT * FROM nguoi_dung WHERE username = '" + username
                   + "' AND mat_khau = '" + matKhau + "'";
        try (Connection conn = SanPhamDAO.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            return rs.next();
        }
    }

    // ✅ VERSION 2: An toàn — PreparedStatement
    public boolean dangNhapAnToan(String username, String matKhau) throws SQLException {
        // TODO: Viết lại dùng PreparedStatement
        return false;
    }

    public static void main(String[] args) throws SQLException {
        BaoMatDAO dao = new BaoMatDAO();

        // Tấn công SQL Injection:
        String username = "' OR '1'='1";
        String matKhau  = "' OR '1'='1";

        // TODO: Giải thích tại sao version 1 trả về true (đăng nhập được mà không cần mật khẩu đúng)
        // TODO: Giải thích tại sao version 2 luôn trả về false với input trên
        System.out.println("Version 1 (nguy hiểm): " + dao.dangNhapKhongAnToan(username, matKhau));
        System.out.println("Version 2 (an toàn): " + dao.dangNhapAnToan(username, matKhau));
    }
}
```

---

## Bài 3: JPA Entity — Ánh Xạ Database ⭐⭐

**Yêu cầu:** Tạo JPA Entity cho bảng `san_pham` và `nguoi_dung`:

```java
// TODO: Tạo SanPhamEntity với đầy đủ JPA annotations:
// @Entity, @Table(name = "san_pham")
// @Id, @GeneratedValue(strategy = GenerationType.IDENTITY)
// @Column cho từng field với thuộc tính phù hợp:
//   - ten: nullable = false, length = 100
//   - gia: precision = 15, scale = 2
//   - soLuong: default = 0
//   - danhMuc: nullable = true
//   - ngayTao: column = "ngay_tao", updatable = false

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "san_pham")
public class SanPhamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // TODO: Thêm đầy đủ annotations cho các fields sau:
    private String ten;
    private double gia;
    private int soLuong;
    private String danhMuc;
    private LocalDateTime ngayTao;

    // TODO: Thêm relationship: @ManyToOne NguoiDungEntity (người tạo sản phẩm)
    // FetchType.LAZY, nullable = true

    // TODO: Constructor, getters, setters
}
```

```java
// TODO: Tạo NguoiDungEntity tương tự
// Thêm @OneToMany relationship với SanPhamEntity (mappedBy = "nguoiTao")
```

---

## Bài 4: JPQL — Truy Vấn Nâng Cao ⭐⭐

Viết các JPQL query tương đương với SQL sau:

```java
public class SanPhamRepository {
    private EntityManagerFactory emf;

    public SanPhamRepository() {
        emf = Persistence.createEntityManagerFactory("raize_hoc");
    }

    // SQL: SELECT * FROM san_pham WHERE gia BETWEEN minGia AND maxGia ORDER BY gia
    // TODO: Viết bằng JPQL (dùng tên entity Java, không phải tên bảng SQL)
    public List<SanPhamEntity> timTheoKhoangGia(double minGia, double maxGia) {
        EntityManager em = emf.createEntityManager();
        try {
            return em.createQuery(
                "/* TODO: JPQL query */",
                SanPhamEntity.class)
                .setParameter("min", minGia)
                .setParameter("max", maxGia)
                .getResultList();
        } finally {
            em.close();
        }
    }

    // SQL: SELECT danh_muc, COUNT(*), AVG(gia) FROM san_pham GROUP BY danh_muc
    // TODO: JPQL với aggregate functions và GROUP BY
    public List<Object[]> thongKeoTheoDanhMuc() {
        EntityManager em = emf.createEntityManager();
        try {
            return em.createQuery(
                "/* TODO */"
            ).getResultList();
        } finally {
            em.close();
        }
    }

    // SQL: SELECT * FROM san_pham WHERE so_luong < 10 ORDER BY so_luong ASC
    // TODO: Sản phẩm gần hết hàng
    public List<SanPhamEntity> ganHetHang(int nguongCanhBao) {
        // TODO
        return new ArrayList<>();
    }

    // TODO: Transaction — Mua hàng (trừ số lượng SP + trừ tiền NguoiDung)
    public void muaHang(int userId, int spId, int soLuongMua) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();

            // 1. Tìm sản phẩm
            SanPhamEntity sp = em.find(SanPhamEntity.class, spId);
            if (sp == null) throw new RuntimeException("Sản phẩm không tồn tại");
            if (sp.getSoLuong() < soLuongMua) throw new RuntimeException("Không đủ hàng");

            // 2. Tìm người dùng
            NguoiDungEntity u = em.find(NguoiDungEntity.class, userId);
            double tongTien = sp.getGia() * soLuongMua;
            if (u.getSoDu() < tongTien) throw new RuntimeException("Không đủ tiền");

            // TODO: Trừ số lượng SP, trừ tiền user, save cả 2
            // (Nếu có lỗi → transaction tự rollback)

            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
}
```

---

## Bài 5 (Nâng Cao): So Sánh JDBC vs JPA ⭐⭐⭐

Viết cùng 1 chức năng bằng cả 2 cách, sau đó so sánh:

**Chức năng:** Tìm top 3 sản phẩm đắt nhất trong từng danh mục.

```java
// CÁCH 1: JDBC
public class TopSanPhamJDBC {
    public Map<String, List<SanPham>> topTheoLoai(int top) throws SQLException {
        // SQL:
        // SELECT s1.* FROM san_pham s1
        // WHERE (SELECT COUNT(*) FROM san_pham s2
        //        WHERE s2.danh_muc = s1.danh_muc AND s2.gia > s1.gia) < 3
        // ORDER BY danh_muc, gia DESC
        String sql = """
            SELECT s1.* FROM san_pham s1
            WHERE (SELECT COUNT(*) FROM san_pham s2
                   WHERE s2.danh_muc = s1.danh_muc 
                   AND s2.gia > s1.gia) < ?
            ORDER BY s1.danh_muc, s1.gia DESC
            """;
        // TODO: Implement
        return new HashMap<>();
    }
}

// CÁCH 2: JPQL
public class TopSanPhamJPA {
    public Map<String, List<SanPhamEntity>> topTheoLoai(int top) {
        // TODO: JPQL tương đương
        return new HashMap<>();
    }
}

// So sánh:
public class SoSanh {
    public static void main(String[] args) throws SQLException {
        // TODO: Chạy cả 2 cách, in kết quả
        // So sánh: code lượng dòng, khả năng đọc, hiệu suất
    }
}
```

**Viết báo cáo so sánh (comment trong code):**
- JDBC: ưu điểm, nhược điểm
- JPA: ưu điểm, nhược điểm
- Khi nào nên dùng JDBC, khi nào nên dùng JPA?

---

## Tóm Tắt Kiến Thức Cần Nhớ

```
✅ JDBC: Connection → PreparedStatement → ResultSet (luôn try-with-resources)
✅ PreparedStatement: dùng ? thay vì nối string — chống SQL Injection
✅ Statement.RETURN_GENERATED_KEYS: lấy ID auto-increment vừa INSERT
✅ JPA @Entity + @Table: ánh xạ class ↔ bảng
✅ @Id + @GeneratedValue: khóa chính tự tăng
✅ @Column: cấu hình cột (nullable, length, name...)
✅ @OneToMany / @ManyToOne: quan hệ giữa các entity
✅ EntityManager.persist() = INSERT, merge() = UPDATE, remove() = DELETE
✅ JPQL: viết theo tên Java class+field, không phải tên bảng SQL
✅ Transaction: begin() → commit() hoặc rollback() nếu có lỗi (tất cả hoặc không gì)
```

---

👉 **[Bài 26: Spring Boot — Bước Vào Framework](../bai-26-spring-boot/EXERCISES.md)**
