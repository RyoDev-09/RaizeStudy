# 📝 Bài Tập Thực Tế – Bài 19: Multithreading

> 🎯 **Bối cảnh dự án:** Xử lý **concurrent operations** — nhiều user cùng mua hàng, background tasks, async notification.

---

## 🔴 Bài Tập 1: Concurrent Inventory ⭐⭐

**Bối cảnh thực tế:** Flash sale: 1000 người cùng ấn "Mua" 1 sản phẩm chỉ có 10 cái. Nếu không xử lý concurrency → overselling (bán vượt số lượng).

**Yêu cầu:** Tạo `ConcurrentInventory.java`:

```java
public class ConcurrentInventory {
    private Map<String, Integer> stock = new ConcurrentHashMap<>();
    private final Object lock = new Object();

    public void setStock(String productId, int quantity) {
        stock.put(productId, quantity);
    }

    // ❌ BUG VERSION: Race condition!
    public boolean purchaseBuggy(String productId, int qty) {
        int current = stock.getOrDefault(productId, 0);
        if (current >= qty) {
            // ⚠️ Giữa check và update, thread khác có thể đã thay đổi!
            stock.put(productId, current - qty);
            return true;
        }
        return false;
    }

    // ✅ FIX VERSION 1: synchronized
    public synchronized boolean purchaseSafe(String productId, int qty) { ... }

    // ✅ FIX VERSION 2: AtomicInteger (lock-free, hiệu năng cao hơn)
    private Map<String, AtomicInteger> atomicStock = new ConcurrentHashMap<>();
    public boolean purchaseAtomic(String productId, int qty) {
        AtomicInteger current = atomicStock.get(productId);
        // Dùng compareAndSet loop
    }
}

// TEST: 100 thread cùng mua 1 sản phẩm (stock = 10)
// Kỳ vọng: chỉ 10 thread mua được, 90 thread bị từ chối
// Chạy test 3 phiên bản và so sánh kết quả
```

**Test code:**
```java
ConcurrentInventory inv = new ConcurrentInventory();
inv.setStock("RZ-001", 10);

ExecutorService executor = Executors.newFixedThreadPool(100);
AtomicInteger successCount = new AtomicInteger(0);

for (int i = 0; i < 100; i++) {
    executor.submit(() -> {
        if (inv.purchaseSafe("RZ-001", 1)) {
            successCount.incrementAndGet();
        }
    });
}

executor.shutdown();
executor.awaitTermination(10, TimeUnit.SECONDS);

System.out.println("Mua thành công: " + successCount.get()); // Phải = 10
System.out.println("Stock còn lại: " + inv.getStock("RZ-001")); // Phải = 0
```

---

## 🟡 Bài Tập 2: Async Notification Service ⭐⭐

**Bối cảnh thực tế:** Khi đơn hàng tạo xong, gửi email + SMS + push notification ĐỒNG THỜI (không chờ nhau). Spring dùng `@Async` — đây là cách nó hoạt động bên dưới.

**Yêu cầu:** Tạo `AsyncNotificationService.java`:

```java
public class AsyncNotificationService {
    private final ExecutorService executor = Executors.newFixedThreadPool(5);

    public void notifyOrderCreated(Order order) {
        // Gửi 3 notification song song
        CompletableFuture<Void> emailFuture = CompletableFuture.runAsync(() -> {
            sendEmail(order);
        }, executor);

        CompletableFuture<Void> smsFuture = CompletableFuture.runAsync(() -> {
            sendSms(order);
        }, executor);

        CompletableFuture<Void> pushFuture = CompletableFuture.runAsync(() -> {
            sendPushNotification(order);
        }, executor);

        // Chờ TẤT CẢ xong (hoặc timeout 5s)
        CompletableFuture.allOf(emailFuture, smsFuture, pushFuture)
                .orTimeout(5, TimeUnit.SECONDS)
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        System.out.println("⚠️ Một số notification thất bại: " + ex.getMessage());
                    } else {
                        System.out.println("✅ Tất cả notification đã gửi thành công");
                    }
                });
    }

    // Giả lập delay
    private void sendEmail(Order order) {
        sleep(2000); // Email mất 2s
        System.out.println("[EMAIL] Đã gửi cho " + order.getBuyerEmail());
    }

    private void sendSms(Order order) {
        sleep(1000); // SMS mất 1s
        if (Math.random() < 0.3) throw new RuntimeException("SMS provider timeout");
        System.out.println("[SMS] Đã gửi cho " + order.getBuyerPhone());
    }

    private void sendPushNotification(Order order) {
        sleep(500); // Push nhanh nhất
        System.out.println("[PUSH] Đã gửi cho device " + order.getBuyerDeviceId());
    }

    public void shutdown() {
        executor.shutdown();
    }
}
```

---

## 🔴 Bài Tập 3: Background Job Scheduler ⭐⭐⭐

**Bối cảnh thực tế:** Cron jobs — Spring `@Scheduled`. Hệ thống cần chạy các task định kỳ: cập nhật ranking, cleanup expired carts, generate reports.

**Yêu cầu:** Tạo `JobScheduler.java`:

```java
public class JobScheduler {
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(3);
    private final Map<String, ScheduledFuture<?>> activeJobs = new ConcurrentHashMap<>();

    // Đăng ký job chạy định kỳ
    public void scheduleJob(String jobName, Runnable task, 
                            long initialDelay, long period, TimeUnit unit) {
        ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(() -> {
            try {
                System.out.printf("[JOB] %s bắt đầu lúc %s%n", jobName, LocalDateTime.now());
                long start = System.currentTimeMillis();
                task.run();
                long duration = System.currentTimeMillis() - start;
                System.out.printf("[JOB] %s hoàn thành trong %dms%n", jobName, duration);
            } catch (Exception e) {
                System.out.printf("[JOB ERROR] %s thất bại: %s%n", jobName, e.getMessage());
            }
        }, initialDelay, period, unit);

        activeJobs.put(jobName, future);
    }

    // Hủy job
    public void cancelJob(String jobName) { ... }

    // Liệt kê jobs đang chạy
    public void listActiveJobs() { ... }

    public void shutdown() { ... }
}

// Đăng ký các jobs cho RaizeShop:
JobScheduler scheduler = new JobScheduler();

// 1. Cập nhật seller ranking mỗi giờ
scheduler.scheduleJob("UpdateSellerRanking", () -> {
    // Tính ranking mới
}, 0, 1, TimeUnit.HOURS);

// 2. Xóa giỏ hàng bỏ quên mỗi 30 phút
scheduler.scheduleJob("CleanupExpiredCarts", () -> {
    // Xóa cart > 24 giờ
}, 0, 30, TimeUnit.MINUTES);

// 3. Generate daily report mỗi ngày
scheduler.scheduleJob("DailyReport", () -> {
    // Tạo report
}, 0, 24, TimeUnit.HOURS);
```

---

## 🟡 Bài Tập 4: Producer-Consumer — Order Queue ⭐⭐⭐

**Bối cảnh thực tế:** Message Queue pattern (RabbitMQ, Kafka). Orders từ frontend → queue → backend xử lý tuần tự.

```java
public class OrderQueue {
    private final BlockingQueue<Order> queue = new LinkedBlockingQueue<>(100); // Max 100 pending

    // Producer: Frontend submit orders
    public void submitOrder(Order order) throws InterruptedException {
        System.out.println("[SUBMIT] Đơn hàng " + order.getId() + " đang chờ xử lý...");
        queue.put(order); // Block nếu queue đầy
    }

    // Consumer: Backend process orders
    public void startWorker(String workerId) {
        new Thread(() -> {
            while (!Thread.currentThread().isInterrupted()) {
                try {
                    Order order = queue.take(); // Block cho đến khi có đơn
                    System.out.printf("[%s] Xử lý đơn %s...%n", workerId, order.getId());
                    processOrder(order);
                    System.out.printf("[%s] ✅ Hoàn thành đơn %s%n", workerId, order.getId());
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }, workerId).start();
    }
}

// Chạy 3 workers + 10 producers
OrderQueue oq = new OrderQueue();
oq.startWorker("Worker-1");
oq.startWorker("Worker-2");
oq.startWorker("Worker-3");

// Giả lập 20 đơn hàng từ nhiều users
for (int i = 0; i < 20; i++) {
    oq.submitOrder(new Order("ORD-" + i));
    Thread.sleep(100);
}
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] `synchronized` vs `ReentrantLock` vs `AtomicInteger` — performance ranking? Khi nào dùng cái nào?
- [ ] Thread pool size: CPU-bound task dùng `cores` threads, I/O-bound dùng `cores * 2` — tại sao?
- [ ] Deadlock: viết ví dụ 2 thread lock lẫn nhau và cách detect/prevent.
- [ ] `volatile` keyword — khác gì `synchronized`? Dùng khi nào? (Hint: visibility vs atomicity)

---

👉 **Tiếp theo:** [Bài 20 – Design Patterns](../bai-20-design-patterns/EXERCISES.md)
