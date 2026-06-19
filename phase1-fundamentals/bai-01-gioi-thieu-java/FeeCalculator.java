import java.math.BigDecimal;
import java.text.DecimalFormat;

public class FeeCalculator {
    public static void main(String[] args) {

        System.out.println();
        boolean isVIP = false;
        BigDecimal giaBan = new BigDecimal("20000000"); // Có thể đổi thành 12000000 để test đơn > 10M
        BigDecimal phisan;
        
        BigDecimal limit = new BigDecimal("10000000");
        if (giaBan.compareTo(limit) > 0) {
            phisan = new BigDecimal("0.02"); // Phí 2% nếu đơn hàng > 10,000,000 đ
        } else if (isVIP) {
            phisan = new BigDecimal("0.03"); // Phí 3% nếu là VIP
        } else {
            phisan = new BigDecimal("0.05"); // Phí 5% mặc định
        }

        BigDecimal tongPhi = giaBan.multiply(phisan);
        System.out.println("==========================================");
        System.out.println("💰 TÍNH PHÍ GIAO DỊCH");
        System.out.println("Giá bán   : " + formatMoney(giaBan));
        System.out.println("Phí sàn (" + formatPersent(phisan) + ") : " + formatMoney(tongPhi));
        System.out.println("Bạn nhận được : " + formatMoney(giaBan.subtract(tongPhi)));
        System.out.println("==========================================");

    }
    public static String formatMoney(BigDecimal money) {
         DecimalFormat formatter = new DecimalFormat("#,### đ");
         return formatter.format(money);
    }
    public static String formatPersent(BigDecimal persent) {
        BigDecimal phanTram = persent.multiply(new BigDecimal("100")).stripTrailingZeros();
        return  phanTram.toPlainString() + "%" ;
    }   
}