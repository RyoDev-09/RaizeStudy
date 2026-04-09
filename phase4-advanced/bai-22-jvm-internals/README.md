# Bài 22: JVM Internals — Bộ Nhớ và Garbage Collection

> 🔴 **Phase 4 – Bài 4/5** | Thời gian: ~3 giờ

---

Bạn đã code Java từ đầu nhưng luôn có "thứ gì đó" hoạt động bên dưới mà bạn không thấy. JVM — Java Virtual Machine — là trái tim của Java. Hiểu JVM giúp bạn viết code hiệu quả hơn, debug memory leak, tránh OutOfMemoryError, và giải thích được tại sao ứng dụng chậm.

---

## 1. Kiến Trúc JVM

```
┌─────────────────────────────────────────────────────────┐
│                        JVM                              │
│                                                         │
│  ClassLoader → Bytecode (.class) vào JVM               │
│                                                         │
│  Runtime Data Areas:                                    │
│  ┌─────────┐  ┌──────┐  ┌────────┐  ┌───────────────┐  │
│  │  Heap   │  │Stack │  │Metasp.│  │Program Counter│  │
│  │(Objects)│  │(Vars)│  │(Class)│  │   Register    │  │
│  └─────────┘  └──────┘  └────────┘  └───────────────┘  │
│                                                         │
│  Execution Engine: JIT Compiler (bytecode → machine)    │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Stack vs Heap — Phân Vùng Nhớ Quan Trọng Nhất

Đây là thứ giúp bạn hiểu tại sao object hoạt động như vậy (đã học sơ bài 07).

### Stack — Bộ Nhớ Cục Bộ Của Method

```java
public void tinhToan() {
    int a = 5;           // a sống trên Stack
    double b = 3.14;     // b sống trên Stack
    NguoiDung u = ...;   // u (địa chỉ) sống trên Stack, object thật chỗ khác
}
// Khi method return → tất cả biến local bị giải phóng khỏi Stack ngay lập tức
```

**Đặc điểm Stack:**
- Tốc độ cực nhanh (LIFO structure)
- Kích thước nhỏ (~512KB đến 1MB mặc định)
- Tự giải phóng khi method return
- **StackOverflowError** = Stack đầy (thường do đệ quy vô tận)

### Heap — Nơi Sống Của Object

```java
NguoiDung u = new NguoiDung("raize99", "r@m.com");
// u (reference) trên Stack, NguoiDung object thật trên Heap
```

**Đặc điểm Heap:**
- Lớn hơn nhiều (mặc định 256MB đến vài GB)
- Object sống trên Heap cho đến khi không còn reference nào trỏ vào
- Khi hết Heap → **OutOfMemoryError: Java heap space**
- Garbage Collector (GC) quản lý việc giải phóng

---

## 3. Garbage Collection — Dọn Rác Tự Động

Java tự động giải phóng object không còn được dùng. **Bạn không cần (và không thể) free memory thủ công** như C/C++.

```java
NguoiDung u1 = new NguoiDung("An", "an@mail.com");
NguoiDung u2 = u1;   // u2 cũng trỏ vào cùng object

u1 = null;         // u1 không còn trỏ vào object nữa
// u2 vẫn trỏ → GC KHÔNG xóa object

u2 = null;         // Bây giờ không còn reference nào → GC có thể xóa
// GC sẽ xóa object lúc nào đó trong tương lai
```

**Các loại GC trong Java:**

| GC | Đặc điểm | Dùng khi |
|----|---------|---------|
| Serial GC | Đơn giản, stop-the-world | App nhỏ, single thread |
| G1 GC (default) | Cân bằng throughput/latency | Hầu hết cases |
| ZGC | Pause < 1ms | Low latency (Java 15+) |
| Shenandoah | Tương tự ZGC | Low latency |

---

## 4. Heap Generations — Cách GC Hoạt Động

```
Heap:
┌──────────────────────────────────────────────────────┐
│ Young Generation                │ Old Generation      │
│ ┌─────────────┐ ┌────┐ ┌────┐  │                     │
│ │    Eden     │ │ S0 │ │ S1 │  │  Long-lived objects  │
│ │ (new alloc) │ │    │ │    │  │                     │
│ └─────────────┘ └────┘ └────┘  │                     │
│                                │                     │
│   Minor GC (nhanh, thường)     │  Major GC (chậm)    │
└──────────────────────────────────────────────────────┘
```

1. **Eden Space**: Object mới được tạo ở đây
2. **Survivor Spaces (S0, S1)**: Object sống sót qua Minor GC được chuyển đến đây
3. **Old Generation (Tenured)**: Object sống sót nhiều lần GC được "promote" vào đây
4. **Minor GC**: Dọn Young generation — nhanh, ít ảnh hưởng
5. **Major/Full GC**: Dọn Old generation — chậm, stop-the-world

> 💡 **Bí quyết tối ưu:** Hầu hết object có lifetime ngắn (local variables, temp data). Đây là "generational hypothesis" — lý do tại sao phân vùng theo generation hiệu quả hơn GC đơn giản.

---

## 5. Metaspace — Lưu Thông Tin Class

```java
// Metaspace (Java 8+, thay thế PermGen) lưu:
// - Class metadata (tên method, tên field...)
// - Static variables
// - Class literals

// OutOfMemoryError: Metaspace xảy ra khi:
// - Load quá nhiều class (dynamic class generation)
// - Memory leak trong ClassLoader
```

---

## 6. JIT Compiler — Tại Sao Java Nhanh Hơn Người Nghĩ

```
Bytecode (.class)  →  Interpreter  →  JIT Compiler  →  Native Machine Code
     (chậm)              (lần đầu)      (hot method)         (rất nhanh)
```

JIT (Just-In-Time) phát hiện **hot methods** (method gọi nhiều lần) và compile thành native machine code. Vì vậy Java app thường **chậm lúc khởi động, nhanh dần sau đó** — gọi là "warm-up".

---

## 7. Cấu Hình JVM Flags — Tinh Chỉnh Hiệu Năng

```bash
# Đặt heap size
java -Xms512m -Xmx2g MyApp     # Min 512MB, Max 2GB heap

# Bật GC logging (để phân tích)
java -Xlog:gc:logs/gc.log MyApp

# Chọn GC
java -XX:+UseG1GC MyApp        # G1 GC (default Java 9+)
java -XX:+UseZGC MyApp         # ZGC (Java 15+)

# Profile mode
java -XX:+PrintGCDetails MyApp
```

---

## 8. Phát Hiện Memory Leak

Memory leak trong Java = object không dùng nữa nhưng vẫn còn reference → GC không xóa được.

```java
// Ví dụ memory leak phổ biến:
public class CacheNguyHiem {
    private static final Map<String, Object> cache = new HashMap<>();
    // Map static luôn giữ reference → object trong cache không bao giờ bị GC
    // Nếu thêm mãi mà không xóa → OutOfMemoryError!

    // ✅ Dùng WeakHashMap — tự động xóa khi không còn reference khác:
    private static final Map<String, Object> cachAnToan = new WeakHashMap<>();
}
```

**Công cụ phân tích:**
- **jvisualvm**: GUI tool xem heap, thread, CPU (có sẵn trong JDK)
- **jmap**: dump heap snapshot
- **jstack**: dump thread stack
- **IntelliJ Profiler / JProfiler**: công cụ chuyên nghiệp

---

## Tóm Tắt — Bài 22

```
✅ Stack: biến local, tham số method — nhanh, tự giải phóng khi method return
✅ Heap: object — lớn, được GC quản lý
✅ StackOverflowError: Stack đầy (đệ quy vô tận)
✅ OutOfMemoryError: Heap đầy (memory leak hoặc dữ liệu quá lớn)
✅ GC tự động giải phóng object không còn reference
✅ Young Gen (minor GC nhanh) → Old Gen (major GC chậm)
✅ JIT: compile hot method → native code → Java nhanh dần khi warm up
✅ Memory leak: object vẫn còn reference nhưng không dùng nữa
```

---

👉 **[Bài 23: Testing với JUnit 5 & Mockito](../bai-23-testing/README.md)**
