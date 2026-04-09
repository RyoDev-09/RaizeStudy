# 📝 Bài Tập Thực Tế – Bài 04: Vòng Lặp

> 🎯 **Bối cảnh dự án:** Xử lý **dữ liệu hàng loạt** — duyệt danh sách sản phẩm, tạo báo cáo, tính toán tự động cho RaizeShop.

---

## 🔴 Bài Tập 1: Tạo Mã Sản Phẩm Tự Động ⭐

**Bối cảnh thực tế:** Khi admin upload hàng loạt sản phẩm, hệ thống cần tự động tạo mã SKU (Stock Keeping Unit) cho từng sản phẩm.

**Yêu cầu:** Tạo `SkuGenerator.java`, sinh ra 25 mã SKU theo định dạng:

```
RZ-WPN-0001    (Vũ khí)
RZ-WPN-0002
...
RZ-ARM-0001    (Giáp)
RZ-ARM-0002
...
RZ-MGC-0001    (Ma thuật)
```

**Yêu cầu cụ thể:**
- Mỗi danh mục: 5 mã (WPN, ARM, MGC, ACC, PET)
- Số thứ tự padding 4 chữ số: `0001`, `0002`...
- Dùng `String.format("RZ-%s-%04d", category, i)`

**Output bảng thống kê cuối:**
```
=== THỐNG KÊ MÃ SKU ===
WPN (Vũ khí)  : 5 mã — RZ-WPN-0001 đến RZ-WPN-0005
ARM (Giáp)    : 5 mã — RZ-ARM-0001 đến RZ-ARM-0005
MGC (Ma thuật): 5 mã — RZ-MGC-0001 đến RZ-MGC-0005
ACC (Phụ kiện): 5 mã — RZ-ACC-0001 đến RZ-ACC-0005
PET (Thú cưng): 5 mã — RZ-PET-0001 đến RZ-PET-0005
TỔNG          : 25 mã
```

---

## 🟡 Bài Tập 2: Phân Trang Danh Sách Sản Phẩm ⭐⭐

**Bối cảnh thực tế:** Pagination là tính năng bắt buộc trong mọi e-commerce. Backend API trả về kết quả theo từng trang để tránh load quá nhiều dữ liệu.

**Yêu cầu:** Tạo `ProductPagination.java`:

```java
int tongSanPham = 47;
int mauPerPage = 10;    // Số sản phẩm mỗi trang
int trangHienTai = 3;   // Đang xem trang 3

// TODO:
// 1. Tính tổng số trang (ceiling division: không dùng Math.ceil)
// 2. Tính chỉ số bắt đầu/kết thúc của trang hiện tại
// 3. Dùng vòng lặp "simulate" in ra các sản phẩm trên trang đó
// 4. In navigation bar: << Trang trước | 1 2 [3] 4 5 | Trang sau >>
```

**Output mong đợi:**
```
=== TRANG 3/5 ===
[21] Kiếm Rồng +8          - 800,000 đ
[22] Nhẫn Hộ Mệnh           - 250,000 đ
...
[30] Hài Tốc Độ +3          - 600,000 đ

Hiển thị 21-30 / 47 sản phẩm
<< Trang trước  |  1  2  [3]  4  5  |  Trang tiếp >>
```

**Gợi ý:** `int soTrang = (tongSanPham + mauPerPage - 1) / mauPerPage;` → ceiling division không cần float!

---

## 🟡 Bài Tập 3: Cron Job Tính Lãi Suất ⭐⭐

**Bối cảnh thực tế:** RaizeShop có tính năng "Gửi tiết kiệm item" — người dùng gửi tiền vào ví RaizeWallet để nhận lãi hàng ngày. Backend có cronjob chạy mỗi ngày để tính lãi.

**Yêu cầu:** Tạo `InterestCalculator.java` mô phỏng cronjob tính lãi kép 30 ngày:

```java
double soTienGoc = 10_000_000; // 10 triệu
double laiSuatNgay = 0.05;     // 0.05% mỗi ngày
int soNgay = 30;

// In bảng:
// Ngày | Tiền đầu ngày | Tiền lãi | Tiền cuối ngày
// ─────────────────────────────────────────────────
//   1  | 10,000,000   |  5,000  |  10,005,000
//   2  | 10,005,000   |  5,003  |  10,010,003
// ...
//  30  | ...          |  ...    |  ...
// TỔNG LÃI: ...
```

**Thử thách:** Tính lãi thêm "tiền thưởng" vào ngày 7, 14, 21, 28 (bonus 1% trên lãi ngày đó).

---

## 🔴 Bài Tập 4: Real-time Fraud Detection ⭐⭐⭐

**Bối cảnh thực tế:** Hệ thống phát hiện gian lận theo dõi chuỗi giao dịch để tìm pattern bất thường. Đây là ứng dụng thực tế của while + nested loop.

**Yêu cầu:** Tạo `FraudDetector.java`:

```java
// Mô phỏng 100 giao dịch gần nhất (dùng vòng lặp tạo data giả)
// Giao dịch i có giá trị = (i * 37 % 500 + 50) * 1000

// LUẬT PHÁT HIỆN GIAN LẶN:
// 1. GD đột biến: giá trị > 5 lần giá trị TB của 10 GD trước
// 2. Tần suất cao: > 5 GD trong 1 "phút" (mô phỏng bằng cứ 10 GD = 1 phút)
// 3. Vòng tiền: tổng 3 GD liên tiếp > 2,000,000 đ

// Output:
// In ra tất cả GD bị flag là suspicious
// Tổng kết: Bao nhiêu GD suspicious / tổng
// Risk score: LOW / MEDIUM / HIGH / CRITICAL
```

**Điều thực tế:** Đây là phiên bản đơn giản hóa của thuật toán fraud detection mà các công ty fintech như MoMo, VNPay dùng.

---

## 🟡 Bài Tập 5: Bảng Cửu Chương Tùy Chỉnh ⭐

**Bối cảnh thực tế:** Tính toán hoa hồng, discount matrix — đây là nested loop phổ biến nhất trong báo cáo tài chính.

**Yêu cầu:** Tạo `CommissionMatrix.java` — bảng tính hoa hồng theo hạng người bán và giá trị đơn hàng:

```
=== BẢNG HOA HỒNG (%) ===
Giá trị đơn \ Hạng  BRONZE  SILVER  GOLD  DIAMOND
        < 1 triệu     5.0%    4.0%  3.0%     2.0%
     1 - 5 triệu     4.5%    3.5%  2.5%     1.5%
     5 - 20 triệu    4.0%    3.0%  2.0%     1.0%
       > 20 triệu    3.0%    2.0%  1.5%     0.5%
```

**Yêu cầu kỹ thuật:**
- Dùng nested loop để tạo bảng
- Căn chỉnh cột bằng `%-10s` và `%6.1f%%`
- Thêm logic: tính hoa hồng thực tế cho 1 đơn hàng với hạng cho trước

---

## 🔴 Bài Tập 6 (BONUS): ASCII Progress Bar ⭐⭐

**Bối cảnh thực tế:** Giao diện CLI của các tool DevOps (npm install, pip, maven) đều có progress bar. Đây là cách dùng `\r` để update dòng hiện tại.

```
Upload sản phẩm: [████████████░░░░░░░░] 60% (6/10)
```

**Yêu cầu:** Tạo `ProgressBar.java`:

```java
// Simulate upload 10 sản phẩm, mỗi cái mất "2 giây"
// Dùng Thread.sleep(200) để tạo delay
// Dùng \r để clear dòng hiện tại và print lại

for (int i = 1; i <= total; i++) {
    // Tính % hoàn thành
    // Tính số ô đã fill và chưa fill
    // Print: [████░░░] XX% (i/total)
    // Thread.sleep(200);
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `for` vs `while` vs `do-while` — trong hệ thống retry kết nối database (thử tối đa 3 lần), dùng cái nào? Tại sao?
- [ ] Vòng lặp vô hạn `while(true)` — trong production, điều này có hợp lệ không? Đưa ra ví dụ hợp lệ.
- [ ] `break` vs `return` khi thoát vòng lặp sớm — khác nhau thế nào? Bài 4 (fraud detection) nên dùng cái nào?
- [ ] Bài toán pagination (bài 2): tại sao `(n + pageSize - 1) / pageSize` là ceiling division? Chứng minh bằng 3 case.
- [ ] Nested loop bài 5: độ phức tạp thời gian là O(n²). Với bảng hoa hồng 100x100, bao nhiêu phép tính? Khi nào O(n²) là vấn đề?

---

👉 **Tiếp theo:** [Bài 05 – Array & String](../bai-05-array-string/EXERCISES.md)
