public class Receipt {
    public static void main(String[] args) {
        // --- CẤU HÌNH CHUNG ---
        // Dùng String để format số tiền cho giống tiền Việt Nam
        String moneyFormat = "%,.0f đ";

        // Thông tin giao dịch
        String maGD = "RZ-2024-08-001";
        String thoiGian = "03/04/2024 15:30:00";
        String[] sanPham = { "Kiếm Rồng +10", "Nhẫn Ma Lực" };
        double tongTien = 2_300_000;
        double phi = 115_000;
        double thanhToan = tongTien + phi;

        // --- TẠO VIỀN TRÊN ---
        // String.repeat() là cách thông minh để lặp chuỗi, đỡ phải code tay
        int width = 40; // Chiều rộng khung
        String topBorder = "╔" + "═".repeat(width - 2) + "╗";
        String bottomBorder = "╚" + "═".repeat(width - 2) + "╝";
        String line = "║" + "-".repeat(width - 2) + "║";

        // --- IN RA KHUNG ---
        System.out.println(topBorder);

        // Dòng Tiêu Đề
        String title = "BIÊN LAI GIAO DỊCH";
        // Format: ║ + (tiêu đề căn giữa) + ║
        System.out.printf("║ %s ║%n",
                String.format("%" + (width - 4) + "s", title));
        System.out.println(line);

        // Dòng Mã Giao Dịch
        System.out.printf("║ Mã GD     : %s %n", maGD);

        // Dòng Thời Gian
        System.out.printf("║ Thời gian : %s %n", thoiGian);
        System.out.println(line);

        // --- DANH SÁCH SẢN PHẨM ---
        System.out.printf("║ SẢN PHẨM %6s ║%n", ""); // Căn chỉnh khoảng trống

        for (String item : sanPham) {
            // %-20s nghĩa là: căn trái, chiếm 20 ký tự
            System.out.printf("║   %-20s ║%n", item);
        }
        System.out.println(line);

        // --- TỔNG TIỀN & PHÍ ---
        // %.0f là làm tròn số thập phân về số nguyên
        System.out.printf("║ Tổng tiền : " + moneyFormat + "%n", tongTien);
        System.out.printf("║ Phí (5%%)  : " + moneyFormat + "%n", phi);

        // In phần THANH TOÁN to đậm hơn
        String thanhtoanStr = String.format(moneyFormat, thanhToan);
        System.out.printf("║ THANH TOÁN: %s ║%n",
                String.format("%" + (width - 16) + "s", thanhtoanStr));
        System.out.println(line);

        // --- TRẠNG THÁI ---
        String status = "THÀNH CÔNG";
        // Căn chỉnh để chữ nằm giữa 2 ký tự border còn lại
        System.out.printf("║ %s %23s ║%n", "Trạng thái:", status);

        System.out.println(bottomBorder);
    }
}
