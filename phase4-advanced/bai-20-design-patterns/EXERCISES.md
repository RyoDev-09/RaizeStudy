# 📝 Bài Tập Thực Tế – Bài 20: Design Patterns

> 🎯 **Bối cảnh dự án:** Áp dụng **design patterns thực tế** — cách Spring Framework, Hibernate, và các thư viện Java lớn thiết kế nội bộ.

---

## 🔴 Bài Tập 1: Strategy + Factory — Payment System ⭐⭐

**Bối cảnh thực tế:** Spring sử dụng Strategy pattern khắp nơi. PaymentService chọn strategy dựa trên input mà không cần `if-else`.

**Yêu cầu:** Implement **Strategy + Factory** hoàn chỉnh:

```java
// Strategy interface
public interface PaymentStrategy {
    PaymentResult process(double amount);
    String getName();
    double getFee(double amount);
    boolean supports(String methodCode);
}

// Implementations
public class WalletStrategy implements PaymentStrategy { ... }
public class MoMoStrategy implements PaymentStrategy { ... }
public class BankTransferStrategy implements PaymentStrategy { ... }
public class CryptoStrategy implements PaymentStrategy { ... }

// Factory — tự tìm strategy phù hợp
public class PaymentStrategyFactory {
    private final List<PaymentStrategy> strategies;

    public PaymentStrategyFactory() {
        strategies = List.of(
            new WalletStrategy(),
            new MoMoStrategy(),
            new BankTransferStrategy(),
            new CryptoStrategy()
        );
    }

    public PaymentStrategy getStrategy(String methodCode) {
        return strategies.stream()
                .filter(s -> s.supports(methodCode))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                    "Phương thức thanh toán không được hỗ trợ: " + methodCode));
    }
}

// Service — sạch sẽ, không if-else
public class PaymentService {
    private final PaymentStrategyFactory factory = new PaymentStrategyFactory();

    public PaymentResult pay(String method, double amount) {
        PaymentStrategy strategy = factory.getStrategy(method);
        double fee = strategy.getFee(amount);
        System.out.printf("Thanh toán %,.0f đ qua %s (phí: %,.0f đ)%n",
                amount, strategy.getName(), fee);
        return strategy.process(amount + fee);
    }
}
```

---

## 🟡 Bài Tập 2: Observer — Event System ⭐⭐

**Bối cảnh thực tế:** Spring ApplicationEvent, JavaScript addEventListener, Android BroadcastReceiver — tất cả là Observer pattern.

**Yêu cầu:** Tạo `EventSystem.java`:

```java
// Event types
public class OrderEvent {
    private final String type; // "CREATED", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"
    private final Order order;
    private final String timestamp;
    // ...
}

// Observer interface
@FunctionalInterface
public interface OrderObserver {
    void onEvent(OrderEvent event);
}

// Subject
public class OrderEventPublisher {
    private final Map<String, List<OrderObserver>> listeners = new HashMap<>();

    public void subscribe(String eventType, OrderObserver observer) {
        listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(observer);
    }

    public void unsubscribe(String eventType, OrderObserver observer) {
        List<OrderObserver> list = listeners.get(eventType);
        if (list != null) list.remove(observer);
    }

    public void publish(OrderEvent event) {
        List<OrderObserver> list = listeners.getOrDefault(event.getType(), List.of());
        for (OrderObserver obs : list) {
            try { obs.onEvent(event); } 
            catch (Exception e) { System.out.println("Observer error: " + e.getMessage()); }
        }
    }
}

// Concrete observers
// 1. EmailNotifier: gửi email khi PAID
// 2. InventoryUpdater: giảm stock khi PAID
// 3. AnalyticsTracker: ghi log mọi event
// 4. SellerNotifier: báo seller khi CREATED
// 5. RefundProcessor: hoàn tiền khi CANCELLED

OrderEventPublisher publisher = new OrderEventPublisher();
publisher.subscribe("PAID", event -> sendEmail(event.getOrder()));
publisher.subscribe("PAID", event -> updateInventory(event.getOrder()));
publisher.subscribe("CREATED", event -> notifySeller(event.getOrder()));
publisher.subscribe("CANCELLED", event -> processRefund(event.getOrder()));

// Khi order được thanh toán → tự động trigger tất cả listeners
publisher.publish(new OrderEvent("PAID", order));
```

---

## 🟡 Bài Tập 3: Builder + Decorator — Order Builder ⭐⭐⭐

**Bối cảnh thực tế:** Lombok `@Builder`, OkHttp Request.Builder, và Spring Security config đều dùng Builder. Decorator dùng cho middleware chain (filter/interceptor).

**Yêu cầu:** Implement cả hai pattern:

```java
// ======= BUILDER: Tạo Order phức tạp =======
public class OrderBuilder {
    private String buyerId;
    private List<OrderItem> items = new ArrayList<>();
    private String shippingAddress;
    private String paymentMethod;
    private String voucherCode;
    private String note;
    private boolean isGift;
    private String giftMessage;

    public OrderBuilder buyer(String buyerId) { this.buyerId = buyerId; return this; }
    public OrderBuilder addItem(String productId, int qty) { ... return this; }
    public OrderBuilder shippingTo(String address) { ... return this; }
    public OrderBuilder payWith(String method) { ... return this; }
    public OrderBuilder applyVoucher(String code) { ... return this; }
    public OrderBuilder withNote(String note) { ... return this; }
    public OrderBuilder asGift(String message) { ... return this; }

    public Order build() {
        // Validate bắt buộc: buyerId, ít nhất 1 item, address, payment
        if (buyerId == null) throw new IllegalStateException("Buyer is required");
        if (items.isEmpty()) throw new IllegalStateException("At least 1 item required");
        // ...
        return new Order(this);
    }
}

// ======= DECORATOR: Price modifiers chain =======
public interface PriceCalculator {
    double calculate(Order order);
}

public class BasePriceCalculator implements PriceCalculator {
    @Override
    public double calculate(Order order) {
        return order.getItems().stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();
    }
}

// Decorators
public class VatDecorator implements PriceCalculator {
    private final PriceCalculator wrapped;
    public VatDecorator(PriceCalculator wrapped) { this.wrapped = wrapped; }

    @Override
    public double calculate(Order order) {
        return wrapped.calculate(order) * 1.10; // +10% VAT
    }
}

public class ShippingDecorator implements PriceCalculator { ... }
public class VoucherDecorator implements PriceCalculator { ... }
public class LoyaltyDiscountDecorator implements PriceCalculator { ... }

// Chain decorators:
PriceCalculator calculator = new LoyaltyDiscountDecorator(
    new VoucherDecorator(
        new ShippingDecorator(
            new VatDecorator(
                new BasePriceCalculator()
            )
        ), "SALE20"
    ), "GOLD"
);

double finalPrice = calculator.calculate(order);
```

---

## 🔴 Bài Tập 4: State Machine — Order Lifecycle ⭐⭐⭐

**Bối cảnh thực tế:** Đơn hàng có lifecycle: CREATED → PAID → PROCESSING → SHIPPED → DELIVERED. Mỗi state chỉ cho phép chuyển sang một số state nhất định.

```java
public interface OrderState {
    String getName();
    boolean canTransitionTo(String targetState);
    void onEnter(Order order);
    void onExit(Order order);
}

public class CreatedState implements OrderState {
    @Override public String getName() { return "CREATED"; }
    @Override public boolean canTransitionTo(String target) {
        return Set.of("PAID", "CANCELLED").contains(target);
    }
    @Override public void onEnter(Order order) {
        System.out.println("[STATE] Đơn hàng " + order.getId() + " đã được tạo");
    }
}

// Implement: PaidState, ProcessingState, ShippedState, DeliveredState, CancelledState

public class OrderStateMachine {
    private final Map<String, OrderState> states = new HashMap<>();
    private OrderState currentState;

    public void transition(Order order, String targetState) {
        if (!currentState.canTransitionTo(targetState)) {
            throw new IllegalStateException(
                "Không thể chuyển từ " + currentState.getName() + " → " + targetState);
        }
        currentState.onExit(order);
        currentState = states.get(targetState);
        currentState.onEnter(order);
        order.setStatus(targetState);
    }
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] Spring dùng pattern nào nhiều nhất? (Hint: Factory, Proxy, Template Method, Strategy — cho ví dụ cho mỗi cái)
- [ ] Singleton vs Dependency Injection — Spring chọn DI thay vì Singleton. Tại sao?
- [ ] Anti-pattern: "God Object" — khi nào class quá lớn cần refactor? RaizeShop có class nào đang là God Object?
- [ ] Pattern nào giải quyết vấn đề "thêm payment method mới mà không sửa code cũ"? Giải thích Open/Closed Principle.

---

👉 **Tiếp theo:** [Bài 21 – Reflection & Annotations](../bai-21-reflection-annotations/EXERCISES.md)
