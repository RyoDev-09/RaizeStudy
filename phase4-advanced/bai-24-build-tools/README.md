# 📦 Bài 24: Build Tools — Maven & Gradle

> 🔴 **Phase 4 – Bài 6/6** | Kiến thức cần có: Java cơ bản, biết chạy lệnh terminal

---

## 🎯 Mục Tiêu Bài Học

Sau bài này bạn có thể:
- ✅ Tạo và cấu hình dự án Maven từ đầu
- ✅ Quản lý dependencies với `pom.xml` đúng cách
- ✅ Hiểu lifecycle phases: `clean → compile → test → package → install → deploy`
- ✅ Dùng Maven profiles cho nhiều môi trường (dev/prod)
- ✅ Đọc và viết `build.gradle` cơ bản
- ✅ Tạo Fat JAR để deploy

---

## 🤔 Tại Sao Phải Học Build Tools?

```
❌ Không có build tool:
    - Copy JAR thủ công vào project
    - Conflict version giữa các thư viện
    - Không biết project cần thư viện gì
    - Build tay trên từng máy → "works on my machine"

✅ Với Maven/Gradle:
    - 1 file config → tất cả developer dùng cùng dependencies
    - Tự động download từ Maven Central
    - Tích hợp với CI/CD (GitHub Actions, Jenkins)
    - Reproducible builds — build ở đâu cũng ra kết quả giống nhau
```

---

## 🏗️ Maven — Convention Over Configuration

### Cấu Trúc Project Chuẩn

```
my-project/
├── pom.xml                    ← Trái tim của Maven project
└── src/
    ├── main/
    │   ├── java/              ← Source code
    │   └── resources/         ← Config files, templates
    └── test/
        ├── java/              ← Unit tests
        └── resources/         ← Test configs
```

### Maven Lifecycle

```
validate → compile → test → package → verify → install → deploy
```

| Phase | Làm gì |
|-------|--------|
| `compile` | Biên dịch `.java` → `.class` |
| `test` | Chạy unit tests |
| `package` | Đóng gói thành JAR/WAR |
| `install` | Copy JAR vào `~/.m2` local repo |
| `deploy` | Upload lên remote repository |

> ⚠️ Mỗi phase thực thi TẤT CẢ phases trước nó. `mvn package` = compile + test + package.

### Dependency Scopes

```xml
<!-- compile (default): cần lúc compile VÀ runtime -->
<scope>compile</scope>

<!-- test: chỉ cần khi chạy test, không vào JAR cuối -->
<scope>test</scope>

<!-- provided: container đã cung cấp (Tomcat có servlet-api) -->
<scope>provided</scope>

<!-- runtime: không cần compile, nhưng cần lúc chạy (JDBC driver) -->
<scope>runtime</scope>
```

---

## ⚡ Gradle — Flexibility & Speed

### So Với Maven

```kotlin
// build.gradle.kts (Kotlin DSL) — ngắn gọn hơn XML rất nhiều
plugins {
    kotlin("jvm") version "1.9.22"
    application
}

dependencies {
    implementation("com.google.code.gson:gson:2.10.1")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.1")
}
```

### Gradle Daemon & Incremental Build

```
Maven: Mỗi lần build = khởi động JVM mới → chậm
Gradle: Daemon chạy nền + chỉ rebuild cái đã thay đổi → nhanh hơn nhiều
```

---

## 🔑 Các Lệnh Quan Trọng

### Maven
```bash
mvn archetype:generate   # Tạo project mới từ template
mvn compile              # Biên dịch
mvn test                 # Chạy tests
mvn package              # Build JAR
mvn clean                # Xóa thư mục target/
mvn clean install        # Build sạch và install
mvn dependency:tree      # Xem dependency tree
mvn help:effective-pom   # Xem pom.xml đã merge đầy đủ
```

### Gradle
```bash
./gradlew init           # Tạo project mới
./gradlew build          # Build
./gradlew test           # Chạy tests
./gradlew clean build    # Build sạch
./gradlew dependencies   # Xem dependency tree
./gradlew tasks          # Xem tất cả tasks có thể chạy
```

---

## 📚 Resources

- [Maven in 5 Minutes](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)
- [Gradle Getting Started](https://docs.gradle.org/current/userguide/getting_started_eng.html)
- [MVN Repository](https://mvnrepository.com/) — tìm dependency coordinates

---

👉 **Bài Tập:** [EXERCISES.md](./EXERCISES.md)
👉 **Tiếp theo:** [Phase 5 – Modern Java Ecosystem](../../phase5-modern-ecosystem/bai-24-modern-java/EXERCISES.md)
