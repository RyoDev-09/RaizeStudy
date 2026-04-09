# 📝 Bài Tập Thực Tế – Bài 11: Đa Hình (Polymorphism)

> 🎯 **Bối cảnh dự án:** Xây dựng hệ thống **Payment Processing** và **Discount Engine** — nơi polymorphism sáng nhất trong thực tế.

---

## 🔴 Bài Tập 1: Payment Gateway ⭐⭐

**Bối cảnh thực tế:** Mọi e-commerce đều hỗ trợ nhiều phương thức thanh toán. Mỗi gateway (MoMo, VNPay, Bank Transfer) có API khác nhau nhưng client code chỉ gọi `processPayment()` duy nhất. Đây chính là polymorphism trong thực tế.

**Yêu cầu:** Tạo hierarchy Payment:

```java
public abstract class PaymentMethod {
    protected String transactionId;
    protected double amount;
    protected String status; // "PENDING", "SUCCESS", "FAILED"

    public abstract boolean processPayment(double amount);
    public abstract double getProcessingFee();
    public abstract String getMethodName();

    // Template method pattern: quy trình chung cho tất cả
    public final String executePayment(double amount) {
        System.out.printf("[%s] Bắt đầu thanh toán %,.0f đ...%n", getMethodName(), amount);
        
        double fee = getProcessingFee();
        double total = amount + fee;
        System.out.printf("[%s] Phí xử lý: %,.0f đ | Tổng: %,.0f đ%n", getMethodName(), fee, total);
        
        boolean success = processPayment(total);
        this.status = success ? "SUCCESS" : "FAILED";
        return this.status;
    }
}

public class WalletPayment extends PaymentMethod {
    private double walletBalance;

    @Override
    public boolean processPayment(double amount) {
        if (walletBalance < amount) return false;
        walletBalance -= amount;
        return true;
    }

    @Override
    public double getProcessingFee() { return 0; } // Ví nội bộ miễn phí
}

public class MoMoPayment extends PaymentMethod {
    private String phoneNumber;

    @Override
    public boolean processPayment(double amount) {
        System.out.println("[MoMo] Gửi OTP tới " + phoneNumber + "...");
        System.out.println("[MoMo] Xác nhận thành công!");
        return true; // Giả lập luôn thành công
    }

    @Override
    public double getProcessingFee() { return amount * 0.01; } // 1%
}

public class BankTransfer extends PaymentMethod {
    private String bankCode;
    private String accountNumber;

    @Override
    public double getProcessingFee() { return 10_000; } // Phí cố định 10k
}

public class CryptoPayment extends PaymentMethod {
    private String walletAddress;
    private String coinType; // "BTC", "ETH", "USDT"

    @Override
    public double getProcessingFee() { return amount * 0.005; } // 0.5%
}
```

**Test polymorphism:**
```java
PaymentMethod[] methods = {
    new WalletPayment(5_000_000),
    new MoMoPayment("0912345678"),
    new BankTransfer("VCB", "123456789"),
    new CryptoPayment("0xABC...", "USDT")
};

double orderAmount = 1_500_000;
for (PaymentMethod pm : methods) {
    String result = pm.executePayment(orderAmount);
    System.out.printf("%-15s → %s%n%n", pm.getMethodName(), result);
}
```

---

## 🟡 Bài Tập 2: Discount Strategy Engine ⭐⭐

**Bối cảnh thực tế:** Shopee có hàng chục loại giảm giá (%, fixed, freeship, combo, flash sale...). Mỗi loại tính khác nhau nhưng hệ thống gọi cùng `apply()`.

**Yêu cầu:** Tạo hệ thống discount linh hoạt:

```java
public abstract class DiscountStrategy {
    protected String name;
    protected String code;

    public abstract double apply(double originalPrice);
    public abstract boolean isApplicable(double orderAmount, String userTier);
    public abstract String getDescription();
}

// Giảm theo %
public class PercentageDiscount extends DiscountStrategy {
    private double percent;
    private double maxDiscount; // Cap: giảm tối đa bao nhiêu

    @Override
    public double apply(double price) {
        double discount = price * percent / 100;
        if (discount > maxDiscount) discount = maxDiscount;
        return price - discount;
    }
}

// Giảm số tiền cố định
public class FixedDiscount extends DiscountStrategy {
    private double fixedAmount;
    private double minOrderAmount; // Đơn tối thiểu

    @Override
    public boolean isApplicable(double orderAmount, String userTier) {
        return orderAmount >= minOrderAmount;
    }
}

// Mua X tặng Y
public class BuyXGetYDiscount extends DiscountStrategy {
    private int buyQuantity;
    private int freeQuantity;

    @Override
    public double apply(double unitPrice) {
        int totalItems = buyQuantity + freeQuantity;
        return unitPrice * buyQuantity; // Chỉ tính tiền X item
    }
}

// Flash Sale: giảm mạnh nhưng có thời gian
public class FlashSaleDiscount extends DiscountStrategy {
    private double salePrice;        // Giá flash sale cố định
    private int remainingSlots;      // Số suất còn lại

    @Override
    public double apply(double price) {
        if (remainingSlots <= 0) return price; // Hết suất → giá gốc
        remainingSlots--;
        return salePrice;
    }
}
```

**Test: Áp dụng discount tốt nhất cho đơn hàng:**
```java
DiscountStrategy[] availableDiscounts = { /* ... */ };
double bestPrice = originalPrice;
String bestDiscount = "Không có";

for (DiscountStrategy ds : availableDiscounts) {
    if (ds.isApplicable(originalPrice, "GOLD")) {
        double newPrice = ds.apply(originalPrice);
        if (newPrice < bestPrice) {
            bestPrice = newPrice;
            bestDiscount = ds.getDescription();
        }
    }
}
System.out.printf("Giá tốt nhất: %,.0f đ (áp dụng: %s)%n", bestPrice, bestDiscount);
```

---

## 🔴 Bài Tập 3: Report Exporter ⭐⭐⭐

**Bối cảnh thực tế:** Admin dashboard cần export báo cáo ra JSON, CSV, PDF. Mỗi format khác nhau nhưng cùng nhận data và gọi `export()`.

**Yêu cầu:** Tạo `ReportExporter` system:

```java
public abstract class ReportExporter {
    public abstract String export(String[] headers, String[][] data);
    public abstract String getFileExtension();
    public abstract String getContentType();
}

public class CsvExporter extends ReportExporter {
    @Override
    public String export(String[] headers, String[][] data) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.join(",", headers)).append("\n");
        for (String[] row : data) {
            sb.append(String.join(",", row)).append("\n");
        }
        return sb.toString();
    }
}

public class JsonExporter extends ReportExporter {
    @Override
    public String export(String[] headers, String[][] data) {
        // Build JSON array manually
        // [...] 
    }
}

public class HtmlTableExporter extends ReportExporter {
    @Override
    public String export(String[] headers, String[][] data) {
        // Build <table> HTML
    }
}

public class MarkdownExporter extends ReportExporter {
    // Build markdown table: | Header1 | Header2 |
}
```

**Test với dữ liệu doanh thu:**
```java
String[] headers = {"Sản phẩm", "Số lượng", "Doanh thu"};
String[][] data = {
    {"Kiếm Rồng", "45", "67,500,000"},
    {"Giáp Vàng", "23", "73,600,000"},
    {"Nhẫn Ma Lực", "89", "71,200,000"},
};

ReportExporter[] exporters = {
    new CsvExporter(),
    new JsonExporter(),
    new HtmlTableExporter(),
    new MarkdownExporter()
};

for (ReportExporter ex : exporters) {
    System.out.println("=== " + ex.getFileExtension().toUpperCase() + " ===");
    System.out.println(ex.export(headers, data));
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `instanceof` check: `if (payment instanceof MoMoPayment)` — khi nào cần dùng? Tại sao nó thường là dấu hiệu thiết kế kém?
- [ ] Giải thích tại sao `PaymentMethod[] methods` có thể chứa cả `WalletPayment` và `MoMoPayment` — compiler kiểm tra gì? Runtime kiểm tra gì?
- [ ] Trong bài 2: nếu có 2 voucher áp dụng ĐỒNG THỜI (stack), thứ tự áp dụng ảnh hưởng kết quả thế nào? Giảm 20% rồi trừ 100k ≠ trừ 100k rồi giảm 20%?
- [ ] Method `executePayment` dùng `final` — tại sao? Điều gì xảy ra nếu subclass override nó?

---

👉 **Tiếp theo:** [Bài 12 – Abstraction](../bai-12-abstraction/EXERCISES.md)
