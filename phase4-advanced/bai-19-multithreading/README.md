# Bài 19: Multithreading & Concurrency

> 🔴 **Phase 4 – Bài 1/5** | Thời gian: ~5 giờ

---

Đây là chủ đề thầy phải thành thật: **Concurrency là phần khó nhất của Java**. Bug từ lỗi threading có thể chỉ xuất hiện 1 lần trong 10,000 lần chạy, cực kỳ khó reproduce và debug.

Nhưng đây cũng là kiến thức phân biệt junior và mid-level developer. Một ứng dụng server thực tế phải xử lý hàng nghìn request đồng thời — nếu bạn không hiểu threading, bạn không thể build được hệ thống đó.

---

## 1. Thread Là Gì?

Mặc định, chương trình Java chạy trên **1 thread** (main thread). Mọi lệnh chạy tuần tự, từng cái một.

**Thread** = luồng thực thi riêng. Nhiều thread = nhiều công việc chạy **song song** (hoặc xen kẽ nhau trên CPU đơn).

```
Không có thread:          Có 2 thread:
────────────────          ──────────────────────────
task1 → task2 → task3    Thread 1: task1 ----→ task3
                          Thread 2:     task2 ------→
                          Thời gian ngắn hơn!
```

---

## 2. Tạo Thread

### Cách 1: Extends `Thread`

```java
class TaiFileThread extends Thread {
    private String tenFile;

    TaiFileThread(String tenFile) {
        this.tenFile = tenFile;
    }

    @Override
    public void run() {  // Code thread chạy ở đây
        System.out.println("Đang tải: " + tenFile + " [Thread: " + getName() + "]");
        try {
            Thread.sleep(2000);  // Giả lập tải 2 giây
        } catch (InterruptedException e) {
            System.out.println("Thread bị ngắt!");
        }
        System.out.println("Tải xong: " + tenFile);
    }
}

// Dùng:
TaiFileThread t1 = new TaiFileThread("video.mp4");
TaiFileThread t2 = new TaiFileThread("image.jpg");

t1.start();  // start() — KHÔNG gọi run()! start() tạo thread mới rồi gọi run()
t2.start();  // Chạy song song với t1

// t1.run();  // ❌ Gọi trực tiếp run() sẽ chạy trong thread hiện tại — không song song!
```

### Cách 2: Implements `Runnable` (Hay Dùng Hơn)

```java
// Cách hay hơn — không chiếm mất inheritance
Runnable nhiemVu = () -> {
    System.out.println("Đang chạy trong: " + Thread.currentThread().getName());
};

Thread t = new Thread(nhiemVu);
t.start();

// Gọn hơn với lambda:
new Thread(() -> System.out.println("Thread nhanh!")).start();
```

---

## 3. Thread Lifecycle — Vòng Đời Thread

```
NEW → start() → RUNNABLE → (scheduler chọn) → RUNNING
                              ↓
                    Blocked/Waiting/Timed_Waiting
                              ↓
                           TERMINATED
```

```java
Thread t = new Thread(() -> {
    try {
        Thread.sleep(1000);  // Chuyển sang TIMED_WAITING trong 1 giây
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
});

System.out.println(t.getState());  // NEW
t.start();
System.out.println(t.getState());  // RUNNABLE hoặc TIMED_WAITING
t.join();                          // Đợi thread t kết thúc
System.out.println(t.getState());  // TERMINATED
```

---

## 4. Race Condition — Vấn Đề Khi Nhiều Thread Chia Sẻ Dữ Liệu

Đây là nơi mọi thứ trở nên nguy hiểm:

```java
// ❌ BUG! Không thread-safe:
public class TaiKhoan {
    private double soDu = 1_000_000;

    public void rut(double soTien) {
        if (soDu >= soTien) {
            // ⚠️ Thread có thể bị ngắt ở đây! Thread khác cũng đang đọc soDu
            soDu -= soTien;
        }
    }
}

TaiKhoan tk = new TaiKhoan();
// 2 thread cùng rút 800k lúc soDu = 1 triệu:
// Thread 1: đọc soDu = 1tr, đủ điều kiện
// Thread 2: đọc soDu = 1tr, đủ điều kiện (chưa kịp cập nhật!)
// Thread 1: soDu = 1tr - 800k = 200k
// Thread 2: soDu = 1tr - 800k = 200k  ← Sai! Phải là -600k
// Kết quả: soDu = 200k (đã "rút" tổng 1.6 triệu từ 1 triệu!)
```

---

## 5. `synchronized` — Khóa Mutex

```java
// ✅ Thread-safe với synchronized:
public class TaiKhoan {
    private double soDu = 1_000_000;

    public synchronized void rut(double soTien) {  // Chỉ 1 thread vào cùng lúc
        if (soDu >= soTien) {
            soDu -= soTien;
            System.out.printf("Rút %,.0f đ. Còn: %,.0f đ%n", soTien, soDu);
        } else {
            System.out.println("Không đủ tiền!");
        }
    }

    public synchronized double getSoDu() { return soDu; }
}
```

```java
// synchronized block — khóa cụ thể hơn (hiệu suất tốt hơn):
public void xuLy() {
    // Code không cần lock — chạy song song OK
    System.out.println("Chuẩn bị dữ liệu...");

    synchronized(this) {
        // Chỉ khóa phần cần thiết
        soDu -= 100_000;
    }

    // Code sau lock — tiếp tục song song
}
```

---

## 6. `ExecutorService` — Quản Lý Thread Pool

Tạo và hủy thread nhiều lần rất tốn kém. **Thread pool** tạo sẵn một tập thread, tái sử dụng chúng.

```java
import java.util.concurrent.*;

// Thread pool cố định 4 thread
ExecutorService pool = Executors.newFixedThreadPool(4);

// Submit nhiều task — pool quản lý thứ tự
for (int i = 1; i <= 10; i++) {
    int taskId = i;
    pool.submit(() -> {
        System.out.printf("Task %d đang chạy trong %s%n",
            taskId, Thread.currentThread().getName());
        Thread.sleep(500);
        return taskId * 2;  // Runnable vs Callable — Callable có return value
    });
}

pool.shutdown();           // Không nhận task mới, đợi task hiện tại hoàn thành
pool.awaitTermination(30, TimeUnit.SECONDS);  // Đợi tối đa 30s
```

### `Future` — Kết Quả Bất Đồng Bộ

```java
ExecutorService pool = Executors.newFixedThreadPool(2);

Callable<Double> tinhToanNang = () -> {
    Thread.sleep(2000);  // Giả lập tính toán nặng
    return 3.14159 * 100 * 100;
};

Future<Double> future = pool.submit(tinhToanNang);

// Làm việc khác trong lúc đang tính...
System.out.println("Đang làm việc khác...");

// Lấy kết quả — block nếu chưa xong
Double ketQua = future.get();  // Sẽ chờ đến khi có kết quả
System.out.println("Kết quả: " + ketQua);

pool.shutdown();
```

---

## 7. `AtomicInteger` — Thread-Safe Không Cần `synchronized`

```java
import java.util.concurrent.atomic.AtomicInteger;

// ❌ int thường không an toàn khi nhiều thread đọc/ghi:
int demLuot = 0;  // Race condition!

// ✅ AtomicInteger — thread-safe, hiệu suất tốt hơn synchronized:
AtomicInteger demLuot = new AtomicInteger(0);

// Các thread dùng:
demLuot.incrementAndGet();   // Tương đương ++demLuot, an toàn
demLuot.addAndGet(5);        // Cộng 5, trả về giá trị mới
demLuot.get();               // Đọc giá trị hiện tại
```

---

## 8. Volatile — Visibility Across Threads

```java
// volatile đảm bảo mọi thread đọc giá trị MỚI NHẤT từ RAM (không cache)
private volatile boolean dangChay = true;

// Thread 1: chạy vòng lặp
while (dangChay) {
    // làm việc...
}

// Thread 2: dừng thread 1
dangChay = false;  // Nếu không có volatile, Thread 1 có thể không thấy sự thay đổi!
```

---

## 9. Best Practices

```
✅ Minimize shared state: chia sẻ càng ít dữ liệu giữa thread càng tốt
✅ Prefer immutable objects: thread-safe tự nhiên
✅ Dùng thread pool (ExecutorService) thay vì tạo Thread thủ công
✅ Dùng AtomicXxx cho biến counter đơn giản — nhanh hơn synchronized
✅ Dùng synchronized chỉ khi cần — lock quá nhiều giảm hiệu năng
✅ join() để đợi thread con kết thúc trước khi xử lý kết quả
✅ Luôn shutdown() ExecutorService — tránh memory leak
```

---

## Tóm Tắt — Bài 19

```
✅ Thread: luồng thực thi riêng — dùng Runnable + lambda (cách phổ biến nhất)
✅ start() tạo thread mới, run() chạy trên thread hiện tại
✅ Race condition: nhiều thread cùng truy cập dữ liệu chia sẻ → bug khó nhận
✅ synchronized: chỉ 1 thread vào method/block cùng lúc
✅ ExecutorService/thread pool: quản lý thread hiệu quả
✅ Future<T>: lấy kết quả từ task bất đồng bộ
✅ AtomicInteger, volatile: đồng bộ nhẹ hơn synchronized
```

---

👉 **[Bài 20: Design Patterns — Mẫu Thiết Kế](../bai-20-design-patterns/README.md)**
