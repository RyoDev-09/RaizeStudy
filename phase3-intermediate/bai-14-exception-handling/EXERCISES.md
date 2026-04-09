# 📝 Bài Tập Thực Tế – Bài 14: Exception Handling

> 🎯 **Bối cảnh dự án:** Xây dựng **error handling chuyên nghiệp** — cách Spring Boot trả về lỗi 400/404/500, custom exception, và global error handler.

---

## 🔴 Bài Tập 1: Custom Exception Hierarchy ⭐⭐

**Bối cảnh thực tế:** Spring Boot dùng `@ControllerAdvice` catch exception rồi trả JSON error response. Bạn cần custom exception để phân biệt loại lỗi.

**Yêu cầu:** Thiết kế exception hierarchy cho RaizeShop:

```java
// Base exception cho toàn bộ RaizeShop
public class RaizeShopException extends RuntimeException {
    private final String errorCode;
    private final int httpStatus;

    public RaizeShopException(String errorCode, String message, int httpStatus) {
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
}

// 404 - Không tìm thấy
public class ResourceNotFoundException extends RaizeShopException {
    public ResourceNotFoundException(String resourceType, String id) {
        super("NOT_FOUND", resourceType + " với ID '" + id + "' không tồn tại", 404);
    }
}

// 400 - Input không hợp lệ
public class ValidationException extends RaizeShopException {
    private final List<String> errors;
    // Chứa nhiều lỗi validation cùng lúc
}

// 403 - Không có quyền
public class UnauthorizedException extends RaizeShopException { ... }

// 409 - Conflict (ví dụ: mua hàng hết stock)
public class BusinessConflictException extends RaizeShopException { ... }

// 402 - Payment failed
public class PaymentFailedException extends RaizeShopException {
    private final String paymentMethod;
    private final double amount;
}
```

**Test:**
```java
try {
    Product p = productService.findById("RZ-999");
    // Nếu không tìm thấy → throw ResourceNotFoundException
} catch (ResourceNotFoundException e) {
    System.out.printf("[%d] %s: %s%n", e.getHttpStatus(), e.getErrorCode(), e.getMessage());
    // [404] NOT_FOUND: Product với ID 'RZ-999' không tồn tại
}
```

---

## 🟡 Bài Tập 2: Order Processing với Error Handling ⭐⭐

**Bối cảnh thực tế:** Quy trình mua hàng có nhiều bước, mỗi bước có thể fail. Cần handle error ở đúng tầng và đảm bảo consistency.

**Yêu cầu:** Tạo `OrderProcessor.java`:

```java
public class OrderProcessor {

    public Order processOrder(String buyerId, String productId, int qty, String paymentMethod) {
        // Bước 1: Validate input
        // → throw ValidationException nếu input sai

        // Bước 2: Kiểm tra sản phẩm tồn tại
        // → throw ResourceNotFoundException nếu không tìm thấy

        // Bước 3: Kiểm tra stock đủ không
        // → throw BusinessConflictException nếu hết hàng

        // Bước 4: Kiểm tra ví đủ tiền không
        // → throw PaymentFailedException nếu không đủ

        // Bước 5: Thực hiện giao dịch
        // → try-catch cho bất kỳ lỗi unexpected nào

        // Bước 6: Gửi notification
        // → Lỗi ở đây KHÔNG được affect đơn hàng! (catch & log only)

        // FINALLY: Ghi log dù thành công hay thất bại
    }
}

// Client code:
OrderProcessor processor = new OrderProcessor();
try {
    Order order = processor.processOrder("user1", "RZ-001", 2, "WALLET");
    System.out.println("✅ Đặt hàng thành công: " + order.getId());
} catch (ValidationException e) {
    System.out.println("❌ Input không hợp lệ:");
    for (String err : e.getErrors()) System.out.println("   - " + err);
} catch (ResourceNotFoundException e) {
    System.out.println("❌ " + e.getMessage());
} catch (PaymentFailedException e) {
    System.out.printf("❌ Thanh toán thất bại: %s, số tiền: %,.0f đ%n",
            e.getPaymentMethod(), e.getAmount());
} catch (RaizeShopException e) {
    System.out.println("❌ Lỗi hệ thống: " + e.getMessage());
} finally {
    System.out.println("[LOG] Request xử lý xong.");
}
```

---

## 🔴 Bài Tập 3: Retry Mechanism ⭐⭐⭐

**Bối cảnh thực tế:** Khi gọi external API (payment gateway, SMS), request có thể fail tạm thời. Retry pattern là cách xử lý — Spring Retry library hoạt động theo nguyên tắc này.

**Yêu cầu:** Tạo `RetryableOperation.java`:

```java
public class RetryableOperation {

    public interface Operation<T> {
        T execute() throws Exception;
    }

    /**
     * Retry operation với exponential backoff
     * @param maxRetries số lần retry tối đa
     * @param initialDelayMs delay ban đầu (ms), tăng gấp đôi mỗi lần
     * @param operation lambda chứa logic cần retry
     */
    public static <T> T executeWithRetry(int maxRetries, long initialDelayMs,
                                          Operation<T> operation) {
        Exception lastException = null;
        long delay = initialDelayMs;

        for (int attempt = 1; attempt <= maxRetries + 1; attempt++) {
            try {
                T result = operation.execute();
                if (attempt > 1) {
                    System.out.printf("[RETRY] Thành công ở lần thử #%d%n", attempt);
                }
                return result;
            } catch (Exception e) {
                lastException = e;
                if (attempt <= maxRetries) {
                    System.out.printf("[RETRY] Lần %d thất bại: %s. Retry sau %dms...%n",
                            attempt, e.getMessage(), delay);
                    try { Thread.sleep(delay); } catch (InterruptedException ie) { break; }
                    delay *= 2; // Exponential backoff
                }
            }
        }

        throw new RuntimeException("Thất bại sau " + (maxRetries + 1) + " lần thử", lastException);
    }
}

// Sử dụng:
String result = RetryableOperation.executeWithRetry(3, 1000, () -> {
    // Giả lập API call có thể fail
    if (Math.random() < 0.7) throw new RuntimeException("Connection timeout");
    return "Payment SUCCESS";
});
```

---

## 🟡 Bài Tập 4: Error Response Builder ⭐⭐

**Bối cảnh thực tế:** REST API trả về error response dạng JSON chuẩn hóa. Đây là cách Spring Boot `@ExceptionHandler` build response.

**Yêu cầu:** Tạo `ErrorResponse.java` và `GlobalExceptionHandler.java`:

```java
public class ErrorResponse {
    private int status;
    private String error;
    private String message;
    private String timestamp;
    private String path;
    private List<String> details;

    // Build JSON string thủ công
    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\n");
        sb.append("  \"status\": ").append(status).append(",\n");
        sb.append("  \"error\": \"").append(error).append("\",\n");
        sb.append("  \"message\": \"").append(message).append("\",\n");
        sb.append("  \"timestamp\": \"").append(timestamp).append("\",\n");
        sb.append("  \"path\": \"").append(path).append("\"");
        if (details != null && !details.isEmpty()) {
            sb.append(",\n  \"details\": [\n");
            for (int i = 0; i < details.size(); i++) {
                sb.append("    \"").append(details.get(i)).append("\"");
                if (i < details.size() - 1) sb.append(",");
                sb.append("\n");
            }
            sb.append("  ]");
        }
        sb.append("\n}");
        return sb.toString();
    }
}

// Simulate: convert exception → JSON response
public class GlobalExceptionHandler {
    public static ErrorResponse handle(RaizeShopException ex, String requestPath) {
        // Map exception → ErrorResponse
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `RuntimeException` vs `checked Exception` — tại sao Spring toàn dùng RuntimeException cho business logic? Khi nào checked exception hợp lý?
- [ ] Bước 6 trong bài 2: notification fail **KHÔNG được** cancel đơn hàng. Tại sao? Đây gọi là nguyên tắc gì trong system design?
- [ ] `try-with-resources` — dùng khi nào? Viết ví dụ đọc file config cho quá trình thanh toán.
- [ ] Anti-pattern `catch (Exception e) {}` (catch rồi không làm gì) — tại sao đây là bug tệ nhất? Cho ví dụ production bug thực tế.

---

👉 **Tiếp theo:** [Bài 15 – File I/O](../bai-15-file-io/EXERCISES.md)
