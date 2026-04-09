# Bài Tập — Bài 22: JVM Internals

> 🔴 **Phase 4 – Bài 4/5** | Ôn tập: Stack, Heap, GC, JIT

---

## Bài 1: Phân Tích Stack vs Heap ⭐

Đọc đoạn code sau và trả lời câu hỏi:

```java
public class BaiTap1 {

    static int dem = 0;      // (A)

    public static void xuLy() {
        int local = 10;      // (B)
        String ten = "Raize"; // (C)
        NguoiDung u = new NguoiDung("raize99"); // (D)
        dem++;               // (E)
    }

    public static void main(String[] args) {
        xuLy();
        // Sau khi xuLy() return, điều gì xảy ra với (B), (C), (D)?
    }
}
```

**Câu hỏi:**
1. Biến nào sống trên **Stack**? Biến nào sống trên **Heap**?
2. Sau khi `xuLy()` return, biến nào bị giải phóng ngay lập tức?
3. Object `NguoiDung` tại `(D)` sẽ bị GC xóa khi nào?
4. Biến `dem` tại `(A)` sống trên vùng nhớ nào?

**Viết giải thích** (không cần code, chỉ cần giải thích bằng text/comment).

---

## Bài 2: StackOverflowError vs OutOfMemoryError ⭐

**Yêu cầu:** Viết code tái hiện 2 lỗi sau (chỉ để hiểu, không phải để dùng trong production!):

### Part A — StackOverflowError

```java
public class StackTest {
    // TODO: Viết method đệ quy vô tận để gây StackOverflowError
    // Bắt exception và in ra message
    public static void main(String[] args) {
        try {
            // Gọi method đệ quy vô tận
        } catch (StackOverflowError e) {
            System.out.println("StackOverflowError! Stack đã đầy.");
            System.out.println("Nguyên nhân: đệ quy không có điều kiện dừng.");
        }
    }
}
```

### Part B — OutOfMemoryError

```java
import java.util.ArrayList;
import java.util.List;

public class HeapTest {
    // TODO: Thêm object vào list không giới hạn để gây OutOfMemoryError
    // Bắt exception, in message giải thích
    public static void main(String[] args) {
        try {
            // Thêm object liên tục vào list
        } catch (OutOfMemoryError e) {
            System.out.println("OutOfMemoryError! Heap đã đầy.");
            System.out.println("Nguyên nhân: thêm quá nhiều object, GC không kịp dọn.");
        }
    }
}
```

---

## Bài 3: Memory Leak — Phát Hiện và Sửa ⭐⭐

Đoạn code sau có **memory leak tiềm ẩn**. Hãy xác định vấn đề và sửa:

```java
import java.util.HashMap;
import java.util.Map;

public class SessionManager {
    // ❌ Possible memory leak!
    private static final Map<String, byte[]> sessionCache = new HashMap<>();

    public static void taoSession(String sessionId) {
        // Giả lập session data 1MB
        byte[] data = new byte[1024 * 1024];
        sessionCache.put(sessionId, data);
    }

    public static void xoaSession(String sessionId) {
        sessionCache.remove(sessionId);
    }

    // Giả lập: hàng ngàn session được tạo nhưng không bao giờ gọi xoaSession
    public static void main(String[] args) {
        for (int i = 0; i < 1000; i++) {
            taoSession("session-" + i);
            // Quên gọi xoaSession!
        }
        System.out.println("Sessions trong cache: " + sessionCache.size());
    }
}
```

**Yêu cầu:**
1. Giải thích tại sao đây là memory leak
2. Sửa bằng cách dùng `WeakHashMap`
3. Thêm một phương án nữa: giới hạn kích thước cache (xóa entry cũ nhất khi cache đầy)

---

## Bài 4: Garbage Collection Lifecycle ⭐⭐

```java
public class GCDemo {

    private String name;

    public GCDemo(String name) {
        this.name = name;
        System.out.println("Tạo: " + name);
    }

    @Override
    protected void finalize() throws Throwable {
        // finalize() được gọi khi GC chuẩn bị xóa object
        // (Deprecated trong Java 9+, chỉ dùng để demo)
        System.out.println("GC xóa: " + name);
    }

    public static void main(String[] args) throws InterruptedException {
        GCDemo obj1 = new GCDemo("Alpha");
        GCDemo obj2 = new GCDemo("Beta");
        GCDemo obj3 = new GCDemo("Gamma");

        obj1 = null;  // (1) Alpha không còn reference
        obj2 = obj3;  // (2) Beta không còn reference, Gamma có 2 reference

        // TODO: Gọi System.gc() để gợi ý JVM chạy GC
        // TODO: Thread.sleep(1000) để chờ GC chạy
        // TODO: In ra: obj2 và obj3 trỏ vào cùng object không?
        //       (Kiểm tra bằng ==)

        System.out.println("obj2 == obj3? " + /* TODO */false);
    }
}
```

**Câu hỏi sau khi chạy:**
- Object nào bị GC xóa? Tại sao?
- `obj2 == obj3` là `true` hay `false`? Giải thích.

---

## Bài 5: Tối Ưu Tạo Object ⭐⭐

So sánh 2 cách viết và giải thích hiệu năng:

```java
public class StringBenchmark {

    // Cách 1: Tạo String mới trong vòng lặp
    public static String cach1(int n) {
        String result = "";
        for (int i = 0; i < n; i++) {
            result += "item" + i + ", ";  // ❌ Tạo rất nhiều String object trên Heap!
        }
        return result;
    }

    // Cách 2: Dùng StringBuilder
    public static String cach2(int n) {
        // TODO: Viết lại dùng StringBuilder
        return "";
    }

    public static void main(String[] args) {
        int n = 10_000;

        long start1 = System.currentTimeMillis();
        cach1(n);
        long time1 = System.currentTimeMillis() - start1;

        long start2 = System.currentTimeMillis();
        cach2(n);
        long time2 = System.currentTimeMillis() - start2;

        System.out.printf("Cách 1 (String +): %d ms%n", time1);
        System.out.printf("Cách 2 (StringBuilder): %d ms%n", time2);
        System.out.printf("Cách 2 nhanh hơn %.1f lần%n", (double) time1 / time2);
    }
}
```

**Giải thích:** Tại sao `String +` trong vòng lặp tạo nhiều object trên Heap? `StringBuilder` giải quyết vấn đề này như thế nào?

---

## Bài 6 (Nâng Cao): JVM Flags Thực Hành ⭐⭐⭐

**Yêu cầu:** Chạy chương trình sau với các JVM flags khác nhau và so sánh kết quả:

```java
import java.util.ArrayList;
import java.util.List;

public class GCMonitor {
    public static void main(String[] args) throws InterruptedException {
        List<byte[]> list = new ArrayList<>();

        for (int round = 1; round <= 10; round++) {
            // Thêm 50MB
            for (int i = 0; i < 50; i++) {
                list.add(new byte[1024 * 1024]);  // 1MB mỗi lần
            }
            System.out.printf("Round %d: Đã thêm %d MB%n", round, round * 50);

            // Xóa một nửa để GC có cơ hội
            if (round % 2 == 0) {
                list.subList(0, list.size() / 2).clear();
                System.out.println("→ Đã xóa một nửa, gọi GC...");
                System.gc();
            }

            Thread.sleep(200);
        }
    }
}
```

**Thử các lệnh:**
```bash
# Lệnh 1: Heap nhỏ, xem GC hoạt động thường xuyên
java -Xms64m -Xmx256m -Xlog:gc GCMonitor

# Lệnh 2: Heap lớn
java -Xms512m -Xmx1g GCMonitor

# Lệnh 3: Dùng ZGC (Java 15+)
java -XX:+UseZGC -Xlog:gc GCMonitor
```

**Ghi lại:**
- Số lần GC xảy ra ở mỗi lệnh
- Thời gian pause (nếu có trong log)
- Tại sao heap nhỏ hơn lại trigger GC nhiều hơn?

---

## Tóm Tắt Kiến Thức Cần Nhớ

```
✅ Stack: biến local + tham số method — tự giải phóng khi method return
✅ Heap: tất cả object — GC quản lý
✅ Metaspace: class metadata, static variables
✅ StackOverflowError: đệ quy vô tận → Stack đầy
✅ OutOfMemoryError: object quá nhiều hoặc hết Heap
✅ Memory leak: object không dùng nhưng vẫn còn reference (GC không xóa được)
✅ WeakHashMap: tự động xóa entry khi key không còn reference ngoài
✅ StringBuilder > String + trong vòng lặp (ít tạo object Heap hơn)
✅ JVM flags: -Xms, -Xmx set heap; -Xlog:gc bật GC log
```

---

👉 **[Bài 23: Testing với JUnit 5 & Mockito](../bai-23-testing/EXERCISES.md)**
