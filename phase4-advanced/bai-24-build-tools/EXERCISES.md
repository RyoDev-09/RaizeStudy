# 📝 Bài Tập Thực Tế – Bài 24: Build Tools (Maven & Gradle)

> 🎯 **Bối cảnh dự án:** Mọi dự án Java production đều dùng Maven hoặc Gradle. Hiểu build tools = hiểu cách dependency management, test automation, và CI/CD hoạt động.

---

## 🔴 Bài Tập 1: Khởi Tạo Maven Project RaizeShop ⭐

**Bối cảnh thực tế:** Mọi Spring Boot project đều bắt đầu bằng `pom.xml`. Biết cấu trúc Maven = biết cách đọc và debug dependency conflict trong dự án thực.

**Yêu cầu:** Tạo Maven project `raizeshop-core` với cấu trúc chuẩn:

```
raizeshop-core/
├── pom.xml
└── src/
    ├── main/
    │   └── java/
    │       └── com/raize/shop/
    │           ├── model/
    │           │   └── Product.java
    │           ├── service/
    │           │   └── ProductService.java
    │           └── Main.java
    └── test/
        └── java/
            └── com/raize/shop/
                └── service/
                    └── ProductServiceTest.java
```

**Nội dung `pom.xml` cần có:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- TODO: Điền thông tin project -->
    <groupId>com.raize</groupId>
    <artifactId>raizeshop-core</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <properties>
        <java.version>21</java.version>
        <maven.compiler.source>${java.version}</maven.compiler.source>
        <maven.compiler.target>${java.version}</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- JUnit 5 để test -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.1</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.2.5</version>
            </plugin>
        </plugins>
    </build>
</project>
```

**Chạy các lệnh Maven cơ bản và ghi lại output:**
```bash
mvn compile              # Biên dịch source code
mvn test                 # Chạy unit tests
mvn package              # Đóng gói thành JAR
mvn clean install        # Clean build + install vào local repo
mvn dependency:tree      # Xem cây phụ thuộc
```

**Câu hỏi:** `.m2` là gì? Tìm thư mục `.m2` trên máy bạn và giải thích mục đích.

---

## 🟡 Bài Tập 2: Dependency Management — Thêm Thư Viện Thực Tế ⭐⭐

**Bối cảnh thực tế:** Trong dự án thực, bạn cần quản lý hàng chục dependencies. Biết cách đọc scope, resolve conflict là kỹ năng thiết yếu.

**Yêu cầu:** Thêm các dependency sau vào `pom.xml` và giải thích scope phù hợp:

```xml
<dependencies>
    <!-- 1. Gson — parse JSON (dùng ở runtime) -->
    <dependency>
        <groupId>com.google.code.gson</groupId>
        <artifactId>gson</artifactId>
        <version>2.10.1</version>
        <!-- TODO: scope là gì? -->
    </dependency>

    <!-- 2. Lombok — generate boilerplate code (chỉ cần lúc compile) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.30</version>
        <!-- TODO: scope là gì? -->
    </dependency>

    <!-- 3. SLF4J API — logging interface -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>2.0.9</version>
    </dependency>

    <!-- 4. Logback — SLF4J implementation (chỉ cần lúc chạy) -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.4.14</version>
        <!-- TODO: scope là gì? -->
    </dependency>

    <!-- 5. Mockito — chỉ dùng trong test -->
    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-core</artifactId>
        <version>5.8.0</version>
        <!-- TODO: scope là gì? -->
    </dependency>
</dependencies>
```

**Viết code demo sử dụng Gson:**
```java
// Tạo ProductDto.java và serialize/deserialize với Gson
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class GsonDemo {
    record ProductDto(String id, String name, double price, int stock) {}

    public static void main(String[] args) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        // Object → JSON
        ProductDto product = new ProductDto("RZ-001", "Kiếm Rồng +10", 1_500_000, 5);
        String json = gson.toJson(product);
        System.out.println("=== JSON OUTPUT ===");
        System.out.println(json);

        // JSON → Object
        String inputJson = "{\"id\":\"RZ-002\",\"name\":\"Giáp Rồng\",\"price\":800000,\"stock\":3}";
        ProductDto fromJson = gson.fromJson(inputJson, ProductDto.class);
        System.out.println("\n=== PARSED OBJECT ===");
        System.out.println(fromJson);
    }
}
```

**Mở rộng:** Chạy `mvn dependency:tree` và giải thích tại sao có các dependency "transitive" xuất hiện.

---

## 🟡 Bài Tập 3: Maven Profiles — Build Cho Nhiều Môi Trường ⭐⭐

**Bối cảnh thực tế:** Ứng dụng production có nhiều môi trường: dev, staging, production. Maven profiles cho phép build khác nhau cho từng môi trường.

**Yêu cầu:** Thêm profiles vào `pom.xml`:

```xml
<profiles>
    <!-- Profile: Development -->
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <app.env>development</app.env>
            <db.url>jdbc:h2:mem:testdb</db.url>
            <log.level>DEBUG</log.level>
        </properties>
    </profile>

    <!-- Profile: Production -->
    <profile>
        <id>prod</id>
        <properties>
            <app.env>production</app.env>
            <db.url>jdbc:mysql://prod-server:3306/raizeshop</db.url>
            <log.level>WARN</log.level>
        </properties>
        <build>
            <plugins>
                <!-- Nén và optimize JAR cho production -->
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-jar-plugin</artifactId>
                    <configuration>
                        <archive>
                            <manifest>
                                <mainClass>com.raize.shop.Main</mainClass>
                            </manifest>
                        </archive>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```

**Tạo file `src/main/resources/application.properties` có filter:**
```properties
app.env=${app.env}
db.url=${db.url}
log.level=${log.level}
app.name=RaizeShop
app.version=${project.version}
```

**Chạy và so sánh:**
```bash
mvn package -P dev    # Build với profile dev
mvn package -P prod   # Build với profile prod
```

**Kiểm tra:** Mở JAR bằng `jar tf target/raizeshop-core-1.0.0-SNAPSHOT.jar` và tìm `application.properties`. Nội dung có khác nhau giữa 2 profile không?

---

## 🔴 Bài Tập 4: Chuyển Sang Gradle — So Sánh Thực Tế ⭐⭐⭐

**Bối cảnh thực tế:** Nhiều dự án dùng Gradle (đặc biệt Android). Spring Initializr cho phép chọn Maven hoặc Gradle. Biết cả hai = linh hoạt hơn.

**Yêu cầu:** Tạo project Gradle tương đương:

```gradle
// build.gradle (Groovy DSL)
plugins {
    id 'java'
    id 'application'
}

group = 'com.raize'
version = '1.0.0'

java {
    sourceCompatibility = JavaVersion.VERSION_21
    targetCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    // Compile + runtime
    implementation 'com.google.code.gson:gson:2.10.1'
    implementation 'org.slf4j:slf4j-api:2.0.9'
    runtimeOnly 'ch.qos.logback:logback-classic:1.4.14'

    // Chỉ compile
    compileOnly 'org.projectlombok:lombok:1.18.30'
    annotationProcessor 'org.projectlombok:lombok:1.18.30'

    // Test
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'
    testImplementation 'org.mockito:mockito-core:5.8.0'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

application {
    mainClass = 'com.raize.shop.Main'
}

test {
    useJUnitPlatform()
    maxParallelForks = Runtime.runtime.availableProcessors()
}

// Custom task
tasks.register('generateVersion') {
    doLast {
        println "Building RaizeShop v${version} with Java ${System.getProperty('java.version')}"
    }
}
```

**Lệnh Gradle tương đương Maven:**
```bash
./gradlew compileJava     # = mvn compile
./gradlew test            # = mvn test
./gradlew build           # = mvn package
./gradlew clean build     # = mvn clean install
./gradlew dependencies    # = mvn dependency:tree
./gradlew generateVersion # Custom task
```

**So sánh bảng:**

| Tiêu chí | Maven | Gradle |
|----------|-------|--------|
| Cú pháp config | XML (pom.xml) | Groovy/Kotlin DSL |
| Tốc độ build | Chậm hơn | Nhanh hơn (incremental) |
| Learning curve | Dễ hơn | Khó hơn |
| Linh hoạt | Convention over config | Rất linh hoạt |
| Spring Boot | ✅ Hỗ trợ tốt | ✅ Hỗ trợ tốt |
| Android | ❌ Không dùng | ✅ Bắt buộc |

**Câu hỏi:** Khi nào bạn chọn Gradle thay vì Maven? Kể 3 trường hợp thực tế.

---

## 🔴 Bài Tập 5: Fat JAR — Deployment Artifact ⭐⭐

**Bối cảnh thực tế:** Khi deploy lên server, bạn cần đóng gói tất cả dependencies vào 1 file JAR duy nhất (Uber JAR / Fat JAR). Đây là cách Spring Boot hoạt động.

**Yêu cầu:** Cấu hình Maven Assembly Plugin để tạo Fat JAR:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>3.6.0</version>
    <configuration>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <archive>
            <manifest>
                <mainClass>com.raize.shop.Main</mainClass>
            </manifest>
        </archive>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

**Sau khi build:**
```bash
mvn clean package

# Chạy thin JAR (sẽ lỗi nếu thiếu dependency)
java -jar target/raizeshop-core-1.0.0-SNAPSHOT.jar

# Chạy Fat JAR (luôn chạy được)
java -jar target/raizeshop-core-1.0.0-SNAPSHOT-jar-with-dependencies.jar
```

**So sánh kích thước** 2 file JAR và giải thích sự khác biệt.

**Mở rộng:** Tạo script deploy giả lập:
```bash
#!/bin/bash
# deploy.sh
echo "🔨 Building RaizeShop..."
mvn clean package -P prod -q

echo "🚀 Deploying to server..."
java -jar target/*-jar-with-dependencies.jar &

echo "✅ RaizeShop đang chạy! PID: $!"
```

---

## ✅ Câu Hỏi Kiểm Tra Thực Tế

- [ ] **SNAPSHOT vs RELEASE version** — `1.0.0-SNAPSHOT` khác `1.0.0` thế nào? Khi nào dùng cái nào trong CI/CD?
- [ ] **Dependency scope** — `compile` vs `provided` vs `runtime` vs `test`. Tomcat container đã có `javax.servlet`, vậy trong pom.xml nên dùng scope gì?
- [ ] **Dependency conflict** — Project A dùng Gson 2.8, Project B (dependency của A) dùng Gson 2.10. Maven sẽ chọn version nào? Rule "nearest wins" là gì?
- [ ] **Local vs Remote repository** — Nếu bạn muốn dùng một thư viện nội bộ của công ty (không có trên Maven Central), cần làm gì?

---

👉 **Tiếp theo:** [Phase 5 – Modern Java Ecosystem](../../phase5-modern-ecosystem/bai-24-modern-java/EXERCISES.md)
