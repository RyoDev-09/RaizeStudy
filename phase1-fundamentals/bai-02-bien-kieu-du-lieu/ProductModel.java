public class ProductModel {
    public static void main(String[] args) {
        int productId     = 1001;          
        String productName   = "Kiếm Rồng +10"; 
        double price         = 1_500_000.0;  
        int quantity      = 5;              
        boolean isAvailable   = true;           
        double rating        = 4.8;            
        long sellerId      = 9_876_543_210L; 
        char category      = 'W';

        System.out.printf("ID: %d | Tên: %s | Giá: %,.0f đ%n", productId, productName, price);
        System.out.printf("Số lượng: %d | Còn hàng: %s%n", quantity, isAvailable);
        System.out.printf("Đánh giá: %.1f/5.0 | Người bán: %d | Danh mục: %c%n", rating, sellerId, category);

        System.out.printf("Danh mục: %c (chuyển sang chữ thường nếu là 'W')%n", category);

        if (category == 'W') {
            System.out.println("Danh mục: Vũ khí");
        }
       
    }
}
