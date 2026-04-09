# Bài 13: Collections Framework — List, Set, Map

> 🟠 **Phase 3 – Bài 1/6** | Thời gian: ~4 giờ

---

Bạn đã học mảng (array) ở Bài 05. Nhưng mảng có một vấn đề lớn: **kích thước cố định**. Tạo ra mảng 10 phần tử thì chỉ chứa được 10, dù dữ liệu thực tế có thể nhiều hơn hay ít hơn.

Trong Java, **Collections Framework** là bộ công cụ xử lý tập hợp dữ liệu **linh hoạt** — danh sách có thể thêm/xóa tự do, tránh trùng lặp, tra cứu theo key... Đây là những thứ bạn dùng gần như trong mọi ứng dụng thực tế.

---

## 1. Bức Tranh Tổng Thể Collections

```
java.util.Collection
├── List (danh sách có thứ tự, cho phép trùng)
│   ├── ArrayList  ← hay dùng nhất
│   └── LinkedList
├── Set (tập hợp, KHÔNG trùng)
│   ├── HashSet    ← nhanh nhất
│   ├── LinkedHashSet  ← giữ thứ tự thêm vào
│   └── TreeSet    ← tự sắp xếp
└── Queue (hàng đợi FIFO)
    └── LinkedList, PriorityQueue

java.util.Map (key → value, KHÔNG trùng key)
├── HashMap     ← hay dùng nhất
├── LinkedHashMap  ← giữ thứ tự
└── TreeMap     ← key tự sắp xếp
```

---

## 2. `ArrayList` — Danh Sách Động

```java
import java.util.ArrayList;
import java.util.List;   // Nên dùng kiểu interface!

// Khai báo
List<String> sanPham = new ArrayList<>();
//    ↑ Interface      ↑ Implementation
// Thầy khuyên: luôn khai báo kiểu là interface (List, Set, Map)
// Lý do: dễ đổi sang LinkedList/TreeSet sau này mà không sửa code dùng

// Thêm phần tử
sanPham.add("Kiếm Rồng");
sanPham.add("Giáp Vàng");
sanPham.add("Nhẫn Ma");

// Truy cập
System.out.println(sanPham.get(0));      // "Kiếm Rồng"
System.out.println(sanPham.size());       // 3
System.out.println(sanPham.isEmpty());    // false
System.out.println(sanPham.contains("Giáp Vàng"));  // true

// Thêm vào vị trí cụ thể
sanPham.add(1, "Hài Cát");  // Thêm vào index 1, đẩy phần tử sau sang phải

// Xóa
sanPham.remove("Giáp Vàng");   // Xóa theo giá trị
sanPham.remove(0);              // Xóa theo index

// Duyệt
for (String sp : sanPham) {
    System.out.println(sp);
}

// Dùng index trong for
for (int i = 0; i < sanPham.size(); i++) {
    System.out.printf("%d. %s%n", i + 1, sanPham.get(i));
}
```

### Làm Việc Với Object

```java
List<NguoiDung> users = new ArrayList<>();
users.add(new NguoiDung("raize99", "r@mail.com"));
users.add(new NguoiDung("gamer", "g@mail.com"));
users.add(new NguoiDung("admin", "a@mail.com"));

// Tìm user theo username
NguoiDung timThay = null;
for (NguoiDung u : users) {
    if ("raize99".equals(u.getUsername())) {
        timThay = u;
        break;
    }
}

// Xóa user cụ thể (cần override equals() trong NguoiDung — sẽ học sau)
// Hoặc xóa qua iterator:
users.removeIf(u -> u.getUsername().equals("gamer"));  // Lambda (Bài 17!)
```

---

## 3. `HashSet` — Không Trùng Lặp

```java
import java.util.HashSet;
import java.util.Set;

Set<String> tags = new HashSet<>();
tags.add("gaming");
tags.add("action");
tags.add("pvp");
tags.add("gaming");  // Thêm lần 2 — BỊ BỎ QUA! Set tự loại trùng

System.out.println(tags.size());       // 3, không phải 4
System.out.println(tags.contains("pvp")); // true

// Dùng thực tế: tìm các game KHÔNG trùng trong danh sách đơn hàng
List<String> lichSuMua = List.of("Liên Minh", "PUBG", "Liên Minh", "Minecraft", "PUBG");
Set<String> gameUniQ = new HashSet<>(lichSuMua);  // Loại trùng
System.out.println(gameUniQ);  // [Liên Minh, PUBG, Minecraft] (thứ tự không đảm bảo)
System.out.println("Số game khác nhau: " + gameUniQ.size());  // 3
```

> 💡 **Khi nào dùng Set thay List?** Khi bạn cần đảm bảo **không trùng** và không cần thứ tự. Ví dụ: danh sách tag, email đã đăng ký, IP address đã chặn.

---

## 4. `HashMap` — Dữ Liệu Dạng Key-Value

```java
import java.util.HashMap;
import java.util.Map;

// Map<KiểuKey, KiểuValue>
Map<String, Integer> diemCutThhu = new HashMap<>();

// Thêm/cập nhật
diemCutThhu.put("raize99", 2500);
diemCutThhu.put("gamer_pro", 4800);
diemCutThhu.put("newbie01", 800);
diemCutThhu.put("raize99", 3000);  // Cập nhật — key trùng thì ghi đè value!

// Đọc
System.out.println(diemCutThhu.get("raize99"));         // 3000
System.out.println(diemCutThhu.get("khong_co"));        // null
System.out.println(diemCutThhu.getOrDefault("khong_co", 0));  // 0 (an toàn hơn)

System.out.println(diemCutThhu.containsKey("gamer_pro"));    // true
System.out.println(diemCutThhu.containsValue(800));           // true
System.out.println(diemCutThhu.size());                        // 3

// Xóa
diemCutThhu.remove("newbie01");

// Duyệt — 3 cách
// Cách 1: Qua entrySet (hay dùng nhất)
for (Map.Entry<String, Integer> entry : diemCutThhu.entrySet()) {
    System.out.println(entry.getKey() + " → " + entry.getValue() + " điểm");
}

// Cách 2: Chỉ duyệt key
for (String key : diemCutThhu.keySet()) {
    System.out.println(key);
}

// Cách 3: Chỉ duyệt value
for (int value : diemCutThhu.values()) {
    System.out.println(value);
}
```

### Ứng Dụng Thực Tế Của Map

```java
// Đếm số lần xuất hiện của từng game
List<String> danhSachMua = List.of("PUBG", "Liên Minh", "PUBG", "Minecraft", "Liên Minh", "PUBG");

Map<String, Integer> soLanMua = new HashMap<>();
for (String game : danhSachMua) {
    int soLan = soLanMua.getOrDefault(game, 0);
    soLanMua.put(game, soLan + 1);
}
// Hoặc gọn hơn: soLanMua.merge(game, 1, Integer::sum);

System.out.println(soLanMua);
// {PUBG=3, Liên Minh=2, Minecraft=1}
```

---

## 5. `Collections` Utility Class

```java
import java.util.Collections;

List<Integer> soList = new ArrayList<>(List.of(5, 2, 8, 1, 9, 3));

Collections.sort(soList);                     // Sắp xếp tăng dần
Collections.sort(soList, Collections.reverseOrder()); // Giảm dần
Collections.shuffle(soList);                  // Xáo trộn ngẫu nhiên
System.out.println(Collections.max(soList));  // Lớn nhất
System.out.println(Collections.min(soList));  // Nhỏ nhất
Collections.reverse(soList);                  // Đảo ngược

// Tạo list/set/map không thay đổi được (immutable):
List<String> coDinh = List.of("A", "B", "C");      // Java 9+
Set<String> coinhDinhSet = Set.of("X", "Y", "Z");
Map<String, Integer> fixedMap = Map.of("a", 1, "b", 2);

coDinh.add("D");  // ❌ UnsupportedOperationException!
```

---

## 6. Chọn Đúng Collection

Thầy tóm tắt cho bạn nguyên tắc chọn:

```
Cần DANH SÁCH có thứ tự, cho phép trùng?
    → ArrayList (nếu thường đọc)
    → LinkedList (nếu thường thêm/xóa ở đầu/giữa)

Cần TẬP HỢP không trùng?
    → HashSet (nhanh nhất, thứ tự ngẫu nhiên)
    → LinkedHashSet (giữ thứ tự thêm vào)
    → TreeSet (tự sắp xếp)

Cần tra cứu KEY → VALUE?
    → HashMap (nhanh nhất) ← hay dùng nhất
    → LinkedHashMap (giữ thứ tự)
    → TreeMap (key sắp xếp)
```

---

## 7. Ví Dụ Thực Tế — Giỏ Hàng

```java
import java.util.*;

public class GioHang {

    private Map<String, Integer> items = new LinkedHashMap<>();  // key=tên, value=số lượng
    private Map<String, Double> gia = new HashMap<>();

    public void them(String ten, double giaItem, int soLuong) {
        items.merge(ten, soLuong, Integer::sum);  // Nếu đã có thì cộng thêm
        gia.put(ten, giaItem);
        System.out.printf("✅ Thêm %d x %s vào giỏ%n", soLuong, ten);
    }

    public void xoa(String ten) {
        if (items.remove(ten) != null) {
            System.out.println("🗑️ Đã xóa: " + ten);
        } else {
            System.out.println("Không tìm thấy: " + ten);
        }
    }

    public void inGioHang() {
        if (items.isEmpty()) { System.out.println("Giỏ hàng trống!"); return; }

        System.out.println("\n========= GIỎ HÀNG =========");
        double tongTien = 0;
        for (Map.Entry<String, Integer> entry : items.entrySet()) {
            String ten = entry.getKey();
            int sl = entry.getValue();
            double g = gia.get(ten);
            double thanhTien = g * sl;
            tongTien += thanhTien;
            System.out.printf("%-15s x%d  %,10.0f đ%n", ten, sl, thanhTien);
        }
        System.out.println("─".repeat(35));
        System.out.printf("%-20s %,10.0f đ%n", "TỔNG", tongTien);
    }

    public static void main(String[] args) {
        GioHang gio = new GioHang();
        gio.them("Kiếm Rồng", 1_200_000, 1);
        gio.them("Nhẫn Ma", 500_000, 2);
        gio.them("Kiếm Rồng", 1_200_000, 1);  // Thêm 1 cái nữa → tổng 2
        gio.inGioHang();
        gio.xoa("Nhẫn Ma");
        gio.inGioHang();
    }
}
```

---

## Tóm Tắt — Bài 13

```
✅ ArrayList: danh sách động, có thứ tự, cho phép trùng
✅ HashSet: tập hợp, KHÔNG trùng, tra cứu nhanh O(1)
✅ HashMap: key → value, key KHÔNG trùng, tra cứu nhanh O(1)
✅ Khai báo kiểu là interface: List<T>, Set<T>, Map<K,V>
✅ getOrDefault(): lấy giá trị an toàn hơn get() (tránh null)
✅ List.of(), Set.of(), Map.of(): tạo collection bất biến (Java 9+)
✅ Chọn collection dựa trên: có thứ tự không? Cho phép trùng không? Cần key-value không?
```

---

## ➡️ Bài Tiếp Theo

Có bao giờ bạn thắc mắc: khi code bị lỗi - ứng dụng crash hoàn toàn hay cần xử lý khéo léo hơn? Bài tiếp theo thầy dạy cách **xử lý lỗi một cách có kiểm soát** — kỹ năng cực kỳ quan trọng trong ứng dụng thực tế.

👉 **[Bài 14: Exception Handling](../bai-14-exception-handling/README.md)**
