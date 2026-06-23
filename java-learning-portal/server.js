require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'raize_study_jwt_secret_key_2026';

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '123456',
    database: process.env.DB_NAME || 'raize_study',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware xác thực JWT Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Chưa cung cấp token xác thực!' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token không hợp lệ hoặc đã hết hạn!' });
        }
        req.user = user;
        next();
    });
}

// ----------------------------------------------------
// API XÁC THỰC (AUTH API)
// ----------------------------------------------------

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ tài khoản và mật khẩu!' });
    }

    try {
        const [existingUsers] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Tên tài khoản này đã tồn tại!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await pool.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        const userId = result.insertId;

        // Khởi tạo cài đặt mặc định (bài học hiện tại là 1, bài tập hiện tại là null)
        await pool.query('INSERT INTO user_settings (user_id, last_lesson_id, last_exercise_id) VALUES (?, 1, NULL)', [userId]);

        res.status(201).json({ message: 'Đăng ký tài khoản thành công!' });
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi máy chủ!' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ tài khoản và mật khẩu!' });
    }

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không chính xác!' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không chính xác!' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Đăng nhập thành công!',
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi máy chủ!' });
    }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// ----------------------------------------------------
// API BÀI HỌC & BÀI TẬP (Công khai)
// ----------------------------------------------------
app.get('/api/lessons', async (req, res) => {
    try {
        const [lessonsRows] = await pool.query('SELECT * FROM lessons ORDER BY id ASC');
        const [quizzesRows] = await pool.query('SELECT * FROM quizzes ORDER BY id ASC');
        const [exercisesRows] = await pool.query('SELECT * FROM exercises ORDER BY id ASC');

        const lessons = lessonsRows.map(row => {
            const quizzes = quizzesRows
                .filter(q => q.lesson_id === row.id)
                .map(q => ({
                    q: q.question,
                    options: JSON.parse(q.options),
                    answer: q.answer,
                    explanation: q.explanation
                }));

            const exercises = exercisesRows
                .filter(e => e.lesson_id === row.id)
                .map(e => ({
                    id: e.id,
                    title: e.title,
                    instructions: e.instructions,
                    fileName: e.file_name,
                    starterCode: e.starter_code,
                    validateStr: e.validate_str
                }));

            return {
                id: row.id,
                title: row.title,
                phase: row.phase,
                time: row.time,
                difficulty: row.difficulty,
                theory: row.theory,
                quizzes: quizzes,
                exercises: exercises
            };
        });

        res.json(lessons);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bài học:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tải dữ liệu học tập!' });
    }
});

// ----------------------------------------------------
// API TIẾN ĐỘ HỌC TẬP CÁ NHÂN (Yêu cầu đăng nhập)
// ----------------------------------------------------

app.get('/api/progress', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        // 1. Lấy bài học & bài tập xem cuối cùng
        const [settings] = await pool.query('SELECT last_lesson_id, last_exercise_id FROM user_settings WHERE user_id = ?', [userId]);
        const currentLessonId = settings.length > 0 ? settings[0].last_lesson_id : 1;
        const currentExerciseId = settings.length > 0 ? settings[0].last_exercise_id : null;

        // 2. Lấy tiến độ đọc lý thuyết bài học
        const [lessonProgress] = await pool.query(
            'SELECT lesson_id, completed FROM user_lesson_progress WHERE user_id = ?',
            [userId]
        );
        const completedLessons = lessonProgress.filter(row => row.completed).map(row => row.lesson_id);

        // 3. Lấy tiến độ làm bài tập thực hành IDE
        const [exerciseProgress] = await pool.query(
            'SELECT exercise_id, completed, saved_code FROM user_exercise_progress WHERE user_id = ?',
            [userId]
        );

        const completedExercises = [];
        const userCodes = {};

        exerciseProgress.forEach(row => {
            if (row.completed) {
                completedExercises.push(row.exercise_id);
            }
            if (row.saved_code !== null && row.saved_code !== undefined) {
                userCodes[row.exercise_id] = row.saved_code;
            }
        });

        res.json({
            completedLessons,
            completedExercises,
            userCodes,
            currentLessonId,
            currentExerciseId
        });
    } catch (error) {
        console.error('Lỗi khi lấy tiến độ học:', error);
        res.status(500).json({ error: 'Không thể tải tiến độ học tập!' });
    }
});

// Cập nhật trạng thái hoàn thành lý thuyết bài học
app.post('/api/progress/complete', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, completed } = req.body;

    if (lessonId === undefined || completed === undefined) {
        return res.status(400).json({ error: 'Thiếu tham số!' });
    }

    try {
        await pool.query(`
            INSERT INTO user_lesson_progress (user_id, lesson_id, completed) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE completed = VALUES(completed)
        `, [userId, lessonId, completed]);

        res.json({ success: true, message: 'Đã cập nhật trạng thái lý thuyết!' });
    } catch (error) {
        console.error('Lỗi cập nhật lý thuyết:', error);
        res.status(500).json({ error: 'Lỗi đồng bộ tiến độ lý thuyết!' });
    }
});

// Cập nhật trạng thái hoàn thành một bài thực hành con (exercise)
app.post('/api/progress/exercise/complete', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { exerciseId, completed } = req.body;

    if (exerciseId === undefined || completed === undefined) {
        return res.status(400).json({ error: 'Thiếu tham số!' });
    }

    try {
        await pool.query(`
            INSERT INTO user_exercise_progress (user_id, exercise_id, completed) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE completed = VALUES(completed)
        `, [userId, exerciseId, completed]);

        res.json({ success: true, message: 'Đã cập nhật hoàn thành bài tập!' });
    } catch (error) {
        console.error('Lỗi cập nhật hoàn thành bài tập:', error);
        res.status(500).json({ error: 'Lỗi đồng bộ tiến độ bài tập!' });
    }
});

// Lưu code đang viết dở trong một bài thực hành cụ thể
app.post('/api/progress/exercise/code', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { exerciseId, code } = req.body;

    if (exerciseId === undefined || code === undefined) {
        return res.status(400).json({ error: 'Thiếu tham số!' });
    }

    try {
        await pool.query(`
            INSERT INTO user_exercise_progress (user_id, exercise_id, saved_code) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE saved_code = VALUES(saved_code)
        `, [userId, exerciseId, code]);

        res.json({ success: true, message: 'Đã lưu code bài tập thành công!' });
    } catch (error) {
        console.error('Lỗi khi lưu code bài tập:', error);
        res.status(500).json({ error: 'Lỗi lưu trữ mã nguồn!' });
    }
});

// Lưu bài học và bài tập cuối cùng vừa xem
app.post('/api/progress/last-lesson', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const { lessonId, exerciseId } = req.body;

    if (lessonId === undefined) {
        return res.status(400).json({ error: 'Thiếu tham số!' });
    }

    try {
        await pool.query(`
            INSERT INTO user_settings (user_id, last_lesson_id, last_exercise_id) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE last_lesson_id = VALUES(last_lesson_id), last_exercise_id = VALUES(last_exercise_id)
        `, [userId, lessonId, exerciseId || null]);

        res.json({ success: true, message: 'Đã ghi nhận bài học/bài tập đang xem!' });
    } catch (error) {
        console.error('Lỗi lưu cấu hình người dùng:', error);
        res.status(500).json({ error: 'Lỗi ghi nhận trạng thái!' });
    }
});

// Phục vụ trang index.html cho route gốc
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`\n============================================================`);
    console.log(`👨‍🏫 RAIZESTUDY JAVA MENTOR PORTAL`);
    console.log(`🚀 Máy chủ Express đã khởi động trên cổng ${PORT}`);
    console.log(`👉 Truy cập website tại: http://localhost:${PORT}`);
    console.log(`============================================================\n`);
});
