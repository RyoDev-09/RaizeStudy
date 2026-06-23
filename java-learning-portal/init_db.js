require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Đọc và phân tích lessonsData.js để lấy mảng dữ liệu bài học
let lessonsData = [];
try {
    const rawData = fs.readFileSync(path.join(__dirname, 'lessonsData.js'), 'utf8');
    const fn = new Function(rawData + '; return lessonsData;');
    lessonsData = fn();
    console.log(`📌 Đã đọc thành công ${lessonsData.length} bài học từ lessonsData.js`);
} catch (error) {
    console.error('❌ Lỗi khi đọc file lessonsData.js:', error);
    process.exit(1);
}

// Đọc danh sách 135 bài thực hành từ exercises_data.js
let exercisesData = [];
try {
    exercisesData = require('./exercises_data');
    console.log(`📌 Đã đọc thành công ${exercisesData.length} bài thực hành từ exercises_data.js`);
} catch (error) {
    console.error('❌ Lỗi khi đọc file exercises_data.js:', error);
    process.exit(1);
}

// Helper sinh chuỗi kiểm thử tự động (validateStr)
function generateValidateStr(ex) {
    if (ex.customValidate) {
        return ex.customValidate.toString();
    }
    
    const required = JSON.stringify(ex.requiredKeywords);
    const expected = JSON.stringify(ex.expectedOutputs);
    
    return `function validate(code, output) {
    const required = ${required};
    const expected = ${expected};
    for (const kw of required) {
        if (!code.includes(kw)) {
            return { pass: false, msg: "Em cần sử dụng từ khóa quan trọng: '" + kw + "'!" };
        }
    }
    for (const out of expected) {
        if (!output.includes(out)) {
            return { pass: false, msg: "Đầu ra in ra chưa chính xác. Yêu cầu hiển thị: '" + out + "'" };
        }
    }
    return { pass: true, msg: "Tuyệt vời! Em đã hoàn thành xuất sắc bài tập này!" };
}`;
}

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '123456'
    });

    console.log('🔌 Đang kết nối tới MySQL...');

    const dbName = process.env.DB_NAME || 'raize_study';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✅ Đã tạo/xác nhận cơ sở dữ liệu: ${dbName}`);

    await connection.query(`USE \`${dbName}\`;`);

    console.log('🛠️  Đang tạo/xác nhận các bảng dữ liệu nếu chưa tồn tại...');
    
    // 1. Tạo bảng users
    await connection.query(`
        CREATE TABLE IF NOT EXISTS \`users\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY,
            \`username\` VARCHAR(255) UNIQUE NOT NULL,
            \`password\` VARCHAR(255) NOT NULL,
            \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Tạo bảng lessons
    await connection.query(`
        CREATE TABLE IF NOT EXISTS \`lessons\` (
            \`id\` INT PRIMARY KEY,
            \`title\` VARCHAR(255) NOT NULL,
            \`phase\` VARCHAR(255) NOT NULL,
            \`time\` VARCHAR(50) NOT NULL,
            \`difficulty\` VARCHAR(50) NOT NULL,
            \`theory\` MEDIUMTEXT NOT NULL,
            \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Tạo bảng exercises (Bài tập thực hành tương tác có ID ổn định)
    await connection.query(`
        CREATE TABLE IF NOT EXISTS \`exercises\` (
            \`id\` INT PRIMARY KEY,
            \`lesson_id\` INT NOT NULL,
            \`title\` VARCHAR(255) NOT NULL,
            \`instructions\` MEDIUMTEXT NOT NULL,
            \`file_name\` VARCHAR(100) NOT NULL,
            \`starter_code\` TEXT NOT NULL,
            \`validate_str\` TEXT NOT NULL,
            FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Tạo bảng quizzes
    await connection.query(`
        CREATE TABLE IF NOT EXISTS \`quizzes\` (
            \`id\` INT AUTO_INCREMENT PRIMARY KEY,
            \`lesson_id\` INT NOT NULL,
            \`question\` TEXT NOT NULL,
            \`options\` TEXT NOT NULL,
            \`answer\` INT NOT NULL,
            \`explanation\` TEXT NOT NULL,
            \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Tạo bảng user_lesson_progress (Đánh giá hoàn thành lý thuyết bài học)
    await connection.query(`
        CREATE TABLE IF NOT EXISTS \`user_lesson_progress\` (
            \`user_id\` INT NOT NULL,
            \`lesson_id\` INT NOT NULL,
            \`completed\` BOOLEAN DEFAULT FALSE,
            \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`user_id\`, \`lesson_id\`),
            FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
            FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Tạo bảng user_exercise_progress (Lưu code và hoàn thành từng bài tập thực hành con)
    await connection.query(`
        CREATE TABLE IF NOT EXISTS \`user_exercise_progress\` (
            \`user_id\` INT NOT NULL,
            \`exercise_id\` INT NOT NULL,
            \`completed\` BOOLEAN DEFAULT FALSE,
            \`saved_code\` TEXT,
            \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`user_id\`, \`exercise_id\`),
            FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
            FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercises\` (\`id\`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Tạo bảng user_settings
    await connection.query(`
        CREATE TABLE IF NOT EXISTS \`user_settings\` (
            \`user_id\` INT PRIMARY KEY,
            \`last_lesson_id\` INT NOT NULL,
            \`last_exercise_id\` INT,
            \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
            FOREIGN KEY (\`last_lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE,
            FOREIGN KEY (\`last_exercise_id\`) REFERENCES \`exercises\` (\`id\`) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('💾 Đang import dữ liệu bài học và câu hỏi trắc nghiệm...');

    // Nạp dữ liệu vào bảng lessons và quizzes
    for (const lesson of lessonsData) {
        await connection.query(`
            INSERT INTO \`lessons\` (
                \`id\`, \`title\`, \`phase\`, \`time\`, \`difficulty\`, \`theory\`
            ) VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                \`title\` = VALUES(\`title\`),
                \`phase\` = VALUES(\`phase\`),
                \`time\` = VALUES(\`time\`),
                \`difficulty\` = VALUES(\`difficulty\`),
                \`theory\` = VALUES(\`theory\`)
        `, [
            lesson.id,
            lesson.title,
            lesson.phase,
            lesson.time,
            lesson.difficulty,
            lesson.theory
        ]);

        // Dọn dẹp quiz cũ của bài học này để tránh trùng lặp
        await connection.query('DELETE FROM `quizzes` WHERE `lesson_id` = ?', [lesson.id]);

        if (lesson.quizzes && lesson.quizzes.length > 0) {
            for (const quiz of lesson.quizzes) {
                await connection.query(`
                    INSERT INTO \`quizzes\` (
                        \`lesson_id\`, \`question\`, \`options\`, \`answer\`, \`explanation\`
                    ) VALUES (?, ?, ?, ?, ?)
                `, [
                    lesson.id,
                    quiz.q,
                    JSON.stringify(quiz.options),
                    quiz.answer,
                    quiz.explanation
                ]);
            }
        }
    }

    console.log(`💾 Đang nạp ${exercisesData.length} bài tập thực hành tương tác (5 bài/bài học)...`);
    
    // Nạp dữ liệu bài tập thực hành vào bảng exercises (Sử dụng ON DUPLICATE KEY UPDATE để giữ nguyên tiến độ)
    for (const ex of exercisesData) {
        const validateStr = generateValidateStr(ex);
        await connection.query(`
            INSERT INTO \`exercises\` (
                \`id\`, \`lesson_id\`, \`title\`, \`instructions\`, \`file_name\`, \`starter_code\`, \`validate_str\`
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                \`lesson_id\` = VALUES(\`lesson_id\`),
                \`title\` = VALUES(\`title\`),
                \`instructions\` = VALUES(\`instructions\`),
                \`file_name\` = VALUES(\`file_name\`),
                \`starter_code\` = VALUES(\`starter_code\`),
                \`validate_str\` = VALUES(\`validate_str\`)
        `, [
            ex.id,
            ex.lessonId,
            ex.title,
            ex.instructions,
            ex.fileName,
            ex.starterCode,
            validateStr
        ]);
    }

    // Dọn dẹp bài học / bài tập đã bị xóa khỏi file cấu hình cục bộ
    const activeLessonIds = lessonsData.map(l => l.id);
    if (activeLessonIds.length > 0) {
        await connection.query('DELETE FROM `lessons` WHERE `id` NOT IN (?)', [activeLessonIds]);
    }

    const activeExerciseIds = exercisesData.map(ex => ex.id);
    if (activeExerciseIds.length > 0) {
        await connection.query('DELETE FROM `exercises` WHERE `id` NOT IN (?)', [activeExerciseIds]);
    }

    console.log(`✨ Đã nạp thành công ${lessonsData.length} bài học, ${exercisesData.length} bài tập thực hành con và câu hỏi trắc nghiệm!`);
    await connection.end();
}

initializeDatabase()
    .then(() => {
        console.log('🎉 Khởi tạo và thiết kế lại cơ sở dữ liệu thành công!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Lỗi nghiêm trọng khi khởi tạo cơ sở dữ liệu:', error);
        process.exit(1);
    });
