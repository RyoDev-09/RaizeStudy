public class SystemInfor {
        public static void main(String[] args) {
        // Dùng System.getProperty() để lấy thông tin hệ thống
        System.out.println("=== RAIZESHOP SERVER INFO ===");
        String javaVersion = System.getProperty("java.version");
        String javaVendor = System.getProperty("java.vendor");
        String osName = System.getProperty("os.name");
        String osArch = System.getProperty("os.arch");
        int availableProcessors = Runtime.getRuntime().availableProcessors();
        String maxMemory = Runtime.getRuntime().maxMemory() / (1024 * 1024) + " MB";
        String userHome = System.getProperty("user.home");
        String workingDirectory = System.getProperty("user.dir");
        String serverStatus = "READY";
        System.out.println("Java Version: "+javaVersion);
        System.out.println("Java Vendor: "+javaVendor);
        System.out.println("OS Name: "+osName);
        System.out.println("OS Arch: "+osArch);
        System.out.println("Available Processors: "+availableProcessors);
        System.out.println("Max Memory: "+maxMemory);
        System.out.println("User Home: "+userHome);
        System.out.println("Working Directory: "+workingDirectory);
        System.out.println("=============================");
        System.out.println("Server Status: "+serverStatus);    
        
    }
}
