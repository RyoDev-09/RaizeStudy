# 📝 Bài Tập Thực Tế – Bài 03: Câu Lệnh Điều Kiện

> 🎯 **Bối cảnh dự án:** Xây dựng **business logic** — phần lõi của RaizeShop: phân loại người dùng, áp dụng khuyến mãi, kiểm tra quyền hạn.

---

## 🔴 Bài Tập 1: Hệ Thống Phân Cấp Người Bán ⭐

**Bối cảnh thực tế:** Mọi marketplace (Shopee, Amazon, Tiki) đều có hệ thống xếp loại người bán dựa trên doanh số và đánh giá. Đây là logic `if-else` điển hình trong production.

**Yêu cầu:** Tạo `SellerRankSystem.java`:

```java
double rating = 4.6;       // Điểm đánh giá
int soGiaoDich = 75;       // Số giao dịch thành công
double doanhThu = 50_000_000; // Doanh thu tháng (VND)
int soKhieuNai = 2;        // Số khiếu nại

// Quy tắc xếp hạng:
// 🏆 DIAMOND: rating >= 4.8 VÀ giaoDich >= 100 VÀ khieuNai == 0
// 🥇 GOLD   : rating >= 4.5 VÀ giaoDich >= 50  VÀ khieuNai <= 2
// 🥈 SILVER : rating >= 4.0 VÀ giaoDich >= 20
// 🥉 BRONZE : rating >= 3.5
// ⚠️ WARNING: Còn lại (cần cải thiện)

// Quyền lợi tương ứng:
// DIAMOND → phí 2%, ưu tiên hiển thị, hỗ trợ riêng 24/7
// GOLD    → phí 3%, hiển thị tốt, hỗ trợ ưu tiên
// SILVER  → phí 4%, hiển thị bình thường
// BRONZE  → phí 5%
// WARNING → phí 7%, có thể bị suspend
```

**Output mong đợi:**
```
=== KẾT QUẢ XẾP HẠNG NGƯỜI BÁN ===
Rating      : 4.6 ⭐
Giao dịch   : 75
Doanh thu   : 50,000,000 đ
Khiếu nại   : 2
──────────────────────────────────
Hạng hiện tại: 🥇 GOLD
Phí giao dịch: 3%
Quyền lợi    : Hiển thị tốt + Hỗ trợ ưu tiên
Phí ước tính : 1,500,000 đ/tháng
```

---

## 🟡 Bài Tập 2: Engine Khuyến Mãi ⭐⭐

**Bối cảnh thực tế:** Shopee, Lazada có hệ thống voucher/coupon cực kỳ phức tạp. Đây là phiên bản mini của engine đó.

**Yêu cầu:** Tạo `PromotionEngine.java` — áp dụng đúng 1 khuyến mãi tốt nhất:

```java
double tongDonHang = 3_500_000; // Giá trị đơn hàng
String maVoucher = "SALE30";    // Mã voucher người dùng nhập
boolean laMemberVIP = true;      // Thành viên VIP?
boolean laKhachMoi = false;      // Khách mới?
int soSanPham = 5;               // Số sản phẩm trong giỏ

// BẢNG KHUYẾN MÃI:
// "SALE30"  : Giảm 30% nếu đơn >= 2,000,000 đ, tối đa giảm 500,000 đ
// "NEWUSER" : Giảm 50% cho khách mới, chỉ dùng lần đầu
// "VIP20"   : Giảm 20% cho VIP member
// Mua >= 5 sản phẩm: tặng thêm 5% (có thể cộng với voucher)
// Không có voucher hợp lệ: chỉ áp dụng chiết khấu sản phẩm (nếu có)

// TODO: Tính tiền sau khuyến mãi và in ra bảng kết quả rõ ràng
```

**Output mong đợi:**
```
=== ÁP DỤNG KHUYẾN MÃI ===
Đơn hàng gốc    : 3,500,000 đ
Voucher SALE30  : -500,000 đ (cap 500k)
Mua 5+ sản phẩm : -150,000 đ (5% thêm)
──────────────────────────────────────
TỔNG TIẾT KIỆM  : -650,000 đ
THANH TOÁN      :  2,850,000 đ
```

---

## 🟡 Bài Tập 3: Hệ Thống Xác Thực Đăng Nhập ⭐⭐

**Bối cảnh thực tế:** Mọi app đều cần authentication. Logic kiểm tra account status là `if-else` điển hình nhất trong backend.

**Yêu cầu:** Tạo `LoginValidator.java`:

- Account có các trạng thái: `ACTIVE`, `SUSPENDED`, `BANNED`, `PENDING_VERIFICATION`
- Nếu nhập sai mật khẩu 5 lần → tự động SUSPEND 30 phút
- Admin có thể đăng nhập kể cả khi account bị SUSPEND

```java
String username = "raize_user";
String inputPassword = "password123";
String actualPassword = "securePass!99";
String accountStatus = "ACTIVE";
int failedAttempts = 4;    // Đã nhập sai bao nhiêu lần
boolean isAdmin = false;
long suspendedUntil = -1;  // Unix timestamp, -1 = không bị suspend

// TODO: Implement logic kiểm tra đăng nhập đầy đủ
```

**Output mong đợi (khi sai password lần 5):**
```
=== KẾT QUẢ ĐĂNG NHẬP ===
Username    : raize_user
Trạng thái  : ACTIVE → SUSPENDED
Lý do       : Nhập sai mật khẩu 5 lần
Mở khóa sau : 30 phút
Hành động   : ❌ ĐĂNG NHẬP THẤT BẠI
Gợi ý       : Kiểm tra email để reset mật khẩu
```

---

## 🔴 Bài Tập 4: Report Logic Phức Tạp ⭐⭐⭐

**Bối cảnh thực tế:** Báo cáo doanh thu cuối tháng của admin — kết hợp nhiều điều kiện để phân tích dữ liệu.

**Yêu cầu:** Tạo `MonthlyReport.java` phân tích doanh thu tháng:

```java
double doanhThuThang = 125_000_000;
double doanhThuThangTruoc = 98_000_000;
int soGiaoDich = 1_247;
int soKhieuNai = 15;
int soNguoiBan = 430;
int soNguoiMua = 2_891;

// Phân tích:
// 1. Tăng trưởng doanh thu (%) so với tháng trước
// 2. Tỉ lệ chuyển đổi (giaoDich / nguoiMua * 100)
// 3. Tỉ lệ khiếu nại (khieuNai / giaoDich * 100)
// 4. Đánh giá tháng: XUẤT SẮC / TỐT / TRUNG BÌNH / KÉM
//    XUẤT SẮC: tăng trưởng >= 25% VÀ tỉ lệ khiếu nại < 1%
//    TỐT      : tăng trưởng >= 10% VÀ tỉ lệ khiếu nại < 2%
//    TRUNG BÌNH: dương VÀ tỉ lệ khiếu nại < 5%
//    KÉM      : còn lại
// 5. Đề xuất hành động cụ thể cho từng trường hợp
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Tại sao **không nên** dùng `if (status == "ACTIVE")` mà phải dùng `.equals()`? Giải thích bằng ví dụ thực tế có thể gây bug production.
- [ ] `switch` vs `if-else if` — trong hệ thống xếp hạng (nhiều mức), cái nào phù hợp hơn và tại sao?
- [ ] Toán tử `? :` (ternary) — đọc code nào dễ hơn? Khi nào dùng ternary làm code TỆ HƠN?
- [ ] Trong bài 2, nếu có 10+ loại voucher, bạn sẽ cấu trúc code thế nào để tránh `if-else if` dài 100 dòng?

---

👉 **Tiếp theo:** [Bài 04 – Vòng Lặp](../bai-04-vong-lap/EXERCISES.md)
