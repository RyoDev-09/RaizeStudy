// TRẠNG THÁI HỆ THỐNG
let state = {
    lessons: [],
    currentLessonId: 1,
    currentTab: 'theory',
    completedLessons: new Set(),
    completedExercises: new Set(), // Theo dõi các exercise_id đã hoàn thành
    currentExerciseId: null, // ID bài tập hiện tại
    activeQuizQuestionIndex: 0,
    quizSelectedAnswer: null,
    quizAnswersCount: 0,
    editor: null,
    userCodes: {}, // Code lưu theo exercise_id
    token: localStorage.getItem('raize_java_token') || null,
    activeCourse: 'java' // 'java' hoặc 'sql'
};

// Cấu hình Marked.js
marked.setOptions({
    breaks: true,
    gfm: true
});

// KHỞI ĐỘNG HỆ THỐNG
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Làm mới LocalStorage lưu code cũ nếu phát hiện phiên bản bài tập khuyết mới
        const EX_VERSION = 'v2_incomplete';
        if (localStorage.getItem('raize_java_ex_version') !== EX_VERSION) {
            localStorage.removeItem('raize_java_codes');
            localStorage.removeItem('raize_java_completed');
            localStorage.removeItem('raize_java_completed_exercises');
            localStorage.removeItem('raize_java_last_lesson');
            localStorage.removeItem('raize_java_last_exercise');
            localStorage.setItem('raize_java_ex_version', EX_VERSION);
            console.log('🔄 Đã tự động làm mới tiến trình cũ để nạp danh sách 135 bài tập khuyết mới.');
        }

        // Đăng ký sự kiện trước để đảm bảo giao diện phản hồi
        setupEventHandlers();
        
        // Gọi API tải danh sách bài học động
        fetch('/api/lessons')
            .then(res => res.json())
            .then(async (lessons) => {
                state.lessons = lessons;
                
                // Nạp tiến độ học tương ứng
                if (state.token) {
                    await loadProgressFromDB();
                    // Khởi chạy ứng dụng khi đã đăng nhập
                    initApp();
                } else {
                    loadProgressFallback();
                }
            })
            .catch(err => {
                console.error("Lỗi khi fetch bài học:", err);
                document.getElementById('sidebar-nav').innerHTML = '<div class="loading-placeholder">Lỗi kết nối máy chủ backend!</div>';
            });
    } catch (e) {
        console.error("Lỗi khởi chạy ứng dụng:", e);
    }
});

// TẢI TIẾN ĐỘ CÁ NHÂN TỪ DB (KHI ĐÃ ĐĂNG NHẬP)
async function loadProgressFromDB() {
    try {
        const res = await fetch('/api/progress', {
            headers: {
                'Authorization': `Bearer ${state.token}`
            }
        });
        if (res.status === 401 || res.status === 403) {
            logout();
            return;
        }
        const data = await res.json();
        state.completedLessons = new Set(data.completedLessons || []);
        state.completedExercises = new Set(data.completedExercises || []);
        state.userCodes = data.userCodes || {};
        state.currentLessonId = parseInt(data.currentLessonId) || 1;
        state.currentExerciseId = data.currentExerciseId ? parseInt(data.currentExerciseId) : null;
        
        updateAuthUI(true);
    } catch (e) {
        console.error("Lỗi khi nạp tiến độ từ database:", e);
        loadProgressFallback();
    }
}

// TẢI TIẾN ĐỘ TỪ LOCALSTORAGE (GUEST MODE FALLBACK)
function loadProgressFallback() {
    state.completedLessons = new Set();
    state.completedExercises = new Set();
    state.userCodes = {};
    state.currentLessonId = 1;
    state.currentExerciseId = null;
    
    try {
        const completed = localStorage.getItem('raize_java_completed');
        if (completed && completed !== 'undefined' && completed !== 'null') {
            const parsed = JSON.parse(completed);
            if (Array.isArray(parsed)) {
                state.completedLessons = new Set(parsed);
            }
        }
        
        const completedEx = localStorage.getItem('raize_java_completed_exercises');
        if (completedEx && completedEx !== 'undefined' && completedEx !== 'null') {
            const parsed = JSON.parse(completedEx);
            if (Array.isArray(parsed)) {
                state.completedExercises = new Set(parsed);
            }
        }
        
        const savedCodes = localStorage.getItem('raize_java_codes');
        if (savedCodes && savedCodes !== 'undefined' && savedCodes !== 'null') {
            const parsed = JSON.parse(savedCodes);
            if (parsed && typeof parsed === 'object') {
                state.userCodes = parsed;
            }
        }
        
        const savedLastLesson = localStorage.getItem('raize_java_last_lesson');
        if (savedLastLesson && savedLastLesson !== 'undefined' && savedLastLesson !== 'null') {
            const parsed = parseInt(savedLastLesson);
            if (!isNaN(parsed) && parsed > 0) {
                state.currentLessonId = parsed;
            }
        }

        const savedLastExercise = localStorage.getItem('raize_java_last_exercise');
        if (savedLastExercise && savedLastExercise !== 'undefined' && savedLastExercise !== 'null') {
            const parsed = parseInt(savedLastExercise);
            if (!isNaN(parsed) && parsed > 0) {
                state.currentExerciseId = parsed;
            }
        }
    } catch (e) {
        console.error("Lỗi khi đọc LocalStorage fallback:", e);
    }
    
    updateAuthUI(false);
}

// LƯU TIẾN ĐỘ VÀ CODE
function saveProgress() {
    // 1. Cập nhật UI trước
    updateProgressUI();
    
    // 2. Đồng bộ tùy thuộc trạng thái đăng nhập
    if (state.token) {
        // Đồng bộ hoàn thành bài hiện tại (lý thuyết)
        fetch('/api/progress/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({
                lessonId: state.currentLessonId,
                completed: state.completedLessons.has(state.currentLessonId)
            })
        }).catch(err => console.error("Lỗi đồng bộ completed:", err));
        
        // Đồng bộ bài học & bài tập xem cuối cùng
        fetch('/api/progress/last-lesson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({
                lessonId: state.currentLessonId,
                exerciseId: state.currentExerciseId
            })
        }).catch(err => console.error("Lỗi đồng bộ last-lesson:", err));
    } else {
        try {
            localStorage.setItem('raize_java_completed', JSON.stringify(Array.from(state.completedLessons)));
            localStorage.setItem('raize_java_completed_exercises', JSON.stringify(Array.from(state.completedExercises)));
            localStorage.setItem('raize_java_last_lesson', state.currentLessonId.toString());
            if (state.currentExerciseId) {
                localStorage.setItem('raize_java_last_exercise', state.currentExerciseId.toString());
            } else {
                localStorage.removeItem('raize_java_last_exercise');
            }
        } catch (e) {
            console.error("Lỗi khi lưu LocalStorage:", e);
        }
    }
}

function saveCode(exerciseId, code) {
    if (!exerciseId) return;
    state.userCodes[exerciseId] = code;
    
    if (state.token) {
        fetch('/api/progress/exercise/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({
                exerciseId: exerciseId,
                code: code
            })
        }).catch(err => console.error("Lỗi đồng bộ mã nguồn:", err));
    } else {
        try {
            localStorage.setItem('raize_java_codes', JSON.stringify(state.userCodes));
        } catch (e) {
            console.error("Lỗi khi lưu code:", e);
        }
    }
}

// CẬP NHẬT GIAO DIỆN TIẾN ĐỘ
function updateProgressUI() {
    try {
        const filteredLessons = state.lessons.filter(l => 
            state.activeCourse === 'sql' ? l.id >= 33 : l.id < 33
        );
        const total = filteredLessons.length;
        const completed = filteredLessons.filter(l => state.completedLessons.has(l.id)).length;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        document.getElementById('overall-progress-text').innerText = `${pct}%`;
        document.getElementById('overall-progress-bar').style.width = `${pct}%`;
        document.getElementById('completed-count').innerText = completed;
        document.getElementById('total-count').innerText = total;
    } catch (e) {
        console.error("Lỗi cập nhật giao diện tiến độ:", e);
    }
}

// KHỞI ĐỘNG ỨNG DỤNG
function initApp() {
    try {
        // Đồng bộ hóa trạng thái Khóa học từ ID bài học hiện tại
        state.activeCourse = state.currentLessonId >= 33 ? 'sql' : 'java';
        
        const courseSelect = document.getElementById('course-select');
        if (courseSelect) {
            courseSelect.value = state.activeCourse;
            updateLogoAndSubtitle(state.activeCourse);
        }

        // Render danh sách menu bài học ở sidebar
        renderSidebar();
        
        // Khởi động Monaco Editor
        initMonaco();
        
        // Load bài học hiện tại
        loadLesson(state.currentLessonId);
        
        // Cập nhật thanh tiến độ
        updateProgressUI();
    } catch (e) {
        console.error("Lỗi khởi tạo ứng dụng:", e);
    }
}

// Cập nhật logo và tiêu đề phụ khóa học
function updateLogoAndSubtitle(course) {
    const logoIcon = document.getElementById('logo-icon');
    const logoSubtitle = document.getElementById('logo-subtitle');
    if (course === 'sql') {
        if (logoIcon) logoIcon.innerText = '🗄️';
        if (logoSubtitle) logoSubtitle.innerText = 'SQL Database Mentor';
    } else {
        if (logoIcon) logoIcon.innerText = '☕';
        if (logoSubtitle) logoSubtitle.innerText = 'Java Mentor Portal';
    }
}

// KHỞI TẠO MONACO EDITOR
function initMonaco() {
    if (state.editor) {
        // Cập nhật lại code cho bài học mới/bài tập mới
        const lesson = state.lessons.find(l => l.id === state.currentLessonId);
        if (lesson && lesson.exercises && lesson.exercises.length > 0) {
            let currentEx = lesson.exercises.find(e => e.id === state.currentExerciseId);
            if (!currentEx) {
                currentEx = lesson.exercises[0];
                state.currentExerciseId = currentEx.id;
            }
            const savedCode = state.userCodes[state.currentExerciseId];
            state.editor.setValue(savedCode || currentEx.starterCode || '');
            document.getElementById('editor-filename').innerText = currentEx.fileName || 'Main.java';
            
            const ext = (currentEx.fileName || 'Main.java').split('.').pop();
            const monacoLang = ext === 'sql' ? 'sql' : 'java';
            monaco.editor.setModelLanguage(state.editor.getModel(), monacoLang);
        }
        setTimeout(() => state.editor.layout(), 100);
        return;
    }

    require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        if (state.editor) return; // Bảo vệ bất đồng bộ trong require
        state.editor = monaco.editor.create(document.getElementById('editor-container'), {
            value: '',
            language: 'java',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            minimap: { enabled: false },
            lineNumbers: "on",
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10
            },
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false
        });

        // Lắng nghe sự kiện thay đổi code để lưu trữ tự động
        state.editor.onDidChangeModelContent(() => {
            const currentCode = state.editor.getValue();
            saveCode(state.currentExerciseId, currentCode);
        });

        // Set code sau khi editor load xong
        const lesson = state.lessons.find(l => l.id === state.currentLessonId);
        if (lesson && lesson.exercises && lesson.exercises.length > 0) {
            let currentEx = lesson.exercises.find(e => e.id === state.currentExerciseId);
            if (!currentEx) {
                currentEx = lesson.exercises[0];
                state.currentExerciseId = currentEx.id;
            }
            const savedCode = state.userCodes[state.currentExerciseId];
            state.editor.setValue(savedCode || currentEx.starterCode || '');
            document.getElementById('editor-filename').innerText = currentEx.fileName || 'Main.java';
            
            const ext = (currentEx.fileName || 'Main.java').split('.').pop();
            const monacoLang = ext === 'sql' ? 'sql' : 'java';
            monaco.editor.setModelLanguage(state.editor.getModel(), monacoLang);
        }
    });
}

// RENDER MENU DỌC (SIDEBAR)
function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = '';
    
    // Gom nhóm bài học theo Phase
    const phases = {};
    state.lessons.forEach(lesson => {
        // Lọc bài học theo Khóa học
        if (state.activeCourse === 'sql') {
            if (lesson.id < 33) return;
        } else {
            if (lesson.id >= 33) return;
        }

        if (!phases[lesson.phase]) {
            phases[lesson.phase] = [];
        }
        phases[lesson.phase].push(lesson);
    });
    
    Object.keys(phases).forEach((phaseName, phaseIndex) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = `phase-group expanded`;
        groupDiv.id = `phase-group-${phaseIndex}`;
        
        const header = document.createElement('div');
        header.className = 'phase-header';
        header.innerHTML = `
            <span class="phase-title">${phaseName}</span>
            <i data-lucide="chevron-down" class="phase-icon-arrow"></i>
        `;
        
        // Sự kiện gập mở phase
        header.addEventListener('click', () => {
            groupDiv.classList.toggle('expanded');
        });
        
        const lessonsContainer = document.createElement('div');
        lessonsContainer.className = 'phase-lessons';
        
        phases[phaseName].forEach(lesson => {
            const item = document.createElement('div');
            item.className = `lesson-item ${lesson.id === state.currentLessonId ? 'active' : ''} ${state.completedLessons.has(lesson.id) ? 'completed' : ''}`;
            item.id = `lesson-item-${lesson.id}`;
            
            const lessonExercises = lesson.exercises || [];
            const completedCount = lessonExercises.filter(e => state.completedExercises.has(e.id)).length;
            const totalCount = lessonExercises.length;
            const exercisesInfo = totalCount > 0 ? ` <span class="lesson-ex-count" style="opacity: 0.6; font-size: 0.85em; margin-left: 4px; font-weight: 500;">(${completedCount}/${totalCount})</span>` : '';
            
            item.innerHTML = `
                <div class="lesson-check-icon">
                    <i data-lucide="check"></i>
                </div>
                <span class="lesson-title-text" title="${lesson.title}">${lesson.id.toString().padStart(2, '0')}. ${lesson.title}${exercisesInfo}</span>
            `;
            
            item.addEventListener('click', () => {
                // Đổi bài học
                document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                loadLesson(lesson.id);
                
                // Thu sidebar trên mobile sau khi click
                if (window.innerWidth <= 1024) {
                    document.getElementById('app-sidebar').classList.remove('visible');
                }
            });
            
            lessonsContainer.appendChild(item);
        });
        
        groupDiv.appendChild(header);
        groupDiv.appendChild(lessonsContainer);
        nav.appendChild(groupDiv);
    });
    
    // Vẽ lại các icon lucide
    lucide.createIcons();
}

// THAY ĐỔI BÀI HỌC VÀ LOAD NỘI DUNG AN TOÀN
function loadLesson(lessonId) {
    try {
        state.currentLessonId = lessonId;
        let lesson = state.lessons.find(l => l.id === lessonId);
        
        // Hỗ trợ fallback nếu lưu ID sai lệch
        if (!lesson) {
            state.currentLessonId = 1;
            lesson = state.lessons.find(l => l.id === 1);
        }
        if (!lesson) return;

        // Đồng bộ hóa khóa học đang hoạt động từ bài học hiện tại
        const targetCourse = lesson.id >= 33 ? 'sql' : 'java';
        if (state.activeCourse !== targetCourse) {
            state.activeCourse = targetCourse;
            const courseSelect = document.getElementById('course-select');
            if (courseSelect) {
                courseSelect.value = targetCourse;
            }
            updateLogoAndSubtitle(targetCourse);
            renderSidebar();
        }
        
        // Cập nhật Header
        document.getElementById('header-phase-name').innerText = lesson.phase || 'Phase 1: Fundamentals';
        document.getElementById('header-lesson-title').innerText = `${lesson.id.toString().padStart(2, '0')}. ${lesson.title}`;
        document.getElementById('header-lesson-time').innerText = lesson.time || '2 giờ';
        document.getElementById('header-lesson-difficulty').innerText = lesson.difficulty || 'Dễ';
        
        // Cập nhật nút Đánh dấu hoàn thành
        const btnComplete = document.getElementById('btn-complete-lesson');
        if (btnComplete) {
            if (state.completedLessons && typeof state.completedLessons.has === 'function' && state.completedLessons.has(lesson.id)) {
                btnComplete.classList.add('completed');
                btnComplete.innerHTML = `<i data-lucide="check-circle"></i><span>Đã hoàn thành</span>`;
            } else {
                btnComplete.classList.remove('completed');
                btnComplete.innerHTML = `<i data-lucide="circle"></i><span>Đánh dấu hoàn thành</span>`;
            }
        }
        
        if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
            lucide.createIcons();
        }
        
        // 1. TẢI TAB LÝ THUYẾT (An toàn trước lỗi tải Marked/Prism)
        try {
            if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
                document.getElementById('theory-content').innerHTML = marked.parse(lesson.theory || '');
            } else {
                document.getElementById('theory-content').innerHTML = '<p>' + (lesson.theory || '').replace(/\n/g, '<br>') + '</p>';
            }
            
            parseGithubAlertsInTheory();
            
            if (typeof Prism !== 'undefined' && typeof Prism.highlightAll === 'function') {
                Prism.highlightAll();
            }
        } catch (e) {
            console.error("Lỗi khi render lý thuyết bài học:", e);
            document.getElementById('theory-content').innerHTML = `<div class="error-msg">Không thể hiển thị lý thuyết: ${e.message}</div>`;
        }
        
        // 2. TẢI TAB MÔ PHỎNG TRỰC QUAN
        try {
            initVisualizer(lesson);
        } catch (e) {
            console.error("Lỗi khi tải trình mô phỏng trực quan:", e);
        }
        
        // 3. TẢI TAB TRẮC NGHIỆM
        try {
            state.activeQuizQuestionIndex = 0;
            state.quizSelectedAnswer = null;
            renderQuizQuestion(lesson);
        } catch (e) {
            console.error("Lỗi khi tải câu hỏi trắc nghiệm:", e);
        }
        
        // 4. TẢI TAB THỰC HÀNH IDE
        try {
            if (lesson.exercises && lesson.exercises.length > 0) {
                renderExerciseSelector(lesson);
                
                let targetExId = state.currentExerciseId;
                const belongsToLesson = lesson.exercises.some(e => e.id === targetExId);
                if (!belongsToLesson || !targetExId) {
                    targetExId = lesson.exercises[0].id;
                }
                loadExercise(targetExId);
            } else {
                document.getElementById('practice-instructions-content').innerHTML = '<p>Không có bài thực hành cho phần này.</p>';
                document.getElementById('editor-filename').innerText = 'Main.java';
                if (state.editor) {
                    state.editor.setValue('');
                }
            }
        } catch (e) {
            console.error("Lỗi khi nạp IDE bài tập:", e);
        }
        
        // Lưu lại tiến trình
        saveProgress();
        
        // Chuyển về Tab mặc định là Lý Thuyết
        switchTab('theory');
        
        // Mentor chào mừng bài học mới
        mentorSpeak(`Chào mừng em đến với bài học <b>${lesson.title}</b>. Hãy bắt đầu đọc kỹ phần lý thuyết trước rồi chúng ta làm trắc nghiệm và code thực hành nhé!`);
    } catch (e) {
        console.error("Lỗi nghiêm trọng trong loadLesson:", e);
    }
}

// RENDER CHỌN BÀI TẬP DROPDOWN SELECTOR
function renderExerciseSelector(lesson) {
    const select = document.getElementById('exercise-select');
    if (!select) return;
    
    select.innerHTML = '';
    
    const exercises = lesson.exercises || [];
    exercises.forEach((ex, index) => {
        const option = document.createElement('option');
        option.value = ex.id;
        
        // Trạng thái hoàn thành bài tập con
        const isCompleted = state.completedExercises.has(ex.id);
        const prefix = isCompleted ? '✅ ' : '⏳ ';
        option.innerText = `${prefix}Bài ${index + 1}: ${ex.title}`;
        
        select.appendChild(option);
    });
    
    if (state.currentExerciseId) {
        select.value = state.currentExerciseId;
    }
}

// TẢI CHI TIẾT BÀI THỰC HÀNH CON
function loadExercise(exerciseId) {
    try {
        state.currentExerciseId = exerciseId;
        
        // Tìm bài học tương ứng với bài tập này
        let currentLesson = state.lessons.find(l => 
            l.exercises && l.exercises.some(e => e.id === exerciseId)
        );
        
        if (!currentLesson) {
            currentLesson = state.lessons.find(l => l.id === state.currentLessonId);
        }
        
        if (!currentLesson || !currentLesson.exercises) return;
        
        const exercise = currentLesson.exercises.find(e => e.id === exerciseId);
        if (!exercise) return;
        
        // Tải hướng dẫn đề bài
        if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
            document.getElementById('practice-instructions-content').innerHTML = marked.parse(exercise.instructions || '');
        } else {
            document.getElementById('practice-instructions-content').innerHTML = '<p>' + (exercise.instructions || '').replace(/\n/g, '<br>') + '</p>';
        }
        
        // Tên file trên Editor
        document.getElementById('editor-filename').innerText = exercise.fileName || 'Main.java';
        
        // Nạp code vào Monaco
        if (state.editor) {
            const savedCode = state.userCodes[exerciseId];
            state.editor.setValue(savedCode || exercise.starterCode || '');
            
            // Tự động đổi ngôn ngữ Monaco Editor theo đuôi file
            const ext = (exercise.fileName || '').split('.').pop();
            const monacoLang = ext === 'sql' ? 'sql' : 'java';
            if (state.editor.getModel()) {
                monaco.editor.setModelLanguage(state.editor.getModel(), monacoLang);
            }
            
            // Reset sandbox database để đảm bảo cô lập dữ liệu giữa các bài tập
            if (monacoLang === 'sql') {
                initSqlDatabase(true).catch(err => console.log("Khởi động/Reset SQLite database sandbox...", err));
            }
        }
        
        // Cập nhật lại giá trị dropdown (nếu cần thiết)
        const select = document.getElementById('exercise-select');
        if (select) {
            select.value = exerciseId;
        }
        
        // Cập nhật terminal
        const terminal = document.getElementById('terminal-output');
        if (terminal) {
            if ((exercise.fileName || '').endsWith('.sql')) {
                terminal.innerHTML = `<span class="terminal-line system-msg">Đã nạp bài tập SQL: ${exercise.title}. Hãy viết truy vấn SQL của bạn và bấm Chạy thử!</span>`;
            } else {
                terminal.innerHTML = `<span class="terminal-line system-msg">Đã nạp bài tập: ${exercise.title}. Sẵn sàng!</span>`;
            }
        }
        
        // Mentor chào mừng
        mentorSpeak(`Đang tải bài thực hành: <b>${exercise.title}</b>. Hãy đọc kỹ yêu cầu đề bài bên trái rồi thực hiện nhé!`);
        
        // Lưu tiến độ bài học & bài tập đang xem hiện tại
        saveProgress();
    } catch (e) {
        console.error("Lỗi khi tải bài thực hành:", e);
    }
}

// PARSE GITHUB ALERTS TRONG LÝ THUYẾT
function parseGithubAlertsInTheory() {
    try {
        const theoryDiv = document.getElementById('theory-content');
        if (!theoryDiv) return;
        const blockquotes = theoryDiv.getElementsByTagName('blockquote');
        
        for (let b of blockquotes) {
            const text = b.innerText;
            if (text.includes('[!NOTE]')) {
                b.className = 'alert-note';
                b.innerHTML = b.innerHTML.replace('[!NOTE]', '<strong>💡 LƯU Ý:</strong>');
            } else if (text.includes('[!TIP]')) {
                b.className = 'alert-tip';
                b.innerHTML = b.innerHTML.replace('[!TIP]', '<strong>⭐ MẸO MENTOR:</strong>');
            } else if (text.includes('[!WARNING]')) {
                b.className = 'alert-warning';
                b.innerHTML = b.innerHTML.replace('[!WARNING]', '<strong>⚠️ CẢNH BÁO:</strong>');
            } else if (text.includes('[!IMPORTANT]')) {
                b.className = 'alert-warning';
                b.innerHTML = b.innerHTML.replace('[!IMPORTANT]', '<strong>📌 QUAN TRỌNG:</strong>');
            }
        }
    } catch (e) {
        console.error("Lỗi parseGithubAlertsInTheory:", e);
    }
}

// CHUYỂN TAB TƯƠNG TÁC
function switchTab(tabId) {
    state.currentTab = tabId;
    
    // Reset visualizer explanation when switching tabs
    const visExp = document.getElementById('visualizer-explanation');
    if (visExp) visExp.style.display = 'none';

    // Update Tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update Tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    if (tabId === 'theory') document.getElementById('panel-theory').classList.add('active');
    if (tabId === 'visual') document.getElementById('panel-visual').classList.add('active');
    if (tabId === 'quiz') document.getElementById('panel-quiz').classList.add('active');
    if (tabId === 'practice') {
        document.getElementById('panel-practice').classList.add('active');
        // Kích hoạt lại bố cục Monaco editor
        if (state.editor) {
            setTimeout(() => state.editor.layout(), 100);
        }
    }
}

// KHỞI TẠO BỘ CO DÃN MÀN HÌNH THỰC HÀNH (SPLIT-PANES RESIZER)
function initResizers() {
    const resizerH = document.getElementById('practice-resizer-h');
    const resizerV = document.getElementById('practice-resizer-v');
    const layout = document.querySelector('.practice-layout');
    const codingArea = document.querySelector('.practice-coding-area');
    
    if (!resizerH || !resizerV || !layout || !codingArea) return;

    // Kéo co dãn ngang (Hướng dẫn vs Editor+Console)
    resizerH.addEventListener('mousedown', (e) => {
        e.preventDefault();
        resizerH.classList.add('dragging');
        
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        
        const computedStyle = window.getComputedStyle(layout);
        const gridCols = computedStyle.gridTemplateColumns.split(' ');
        const startLeftWidth = parseFloat(gridCols[0]);
        const startX = e.clientX;

        const onMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            let newLeftWidth = startLeftWidth + dx;
            
            // Giới hạn chiều rộng
            const minWidth = 250;
            const maxWidth = window.innerWidth - 350;
            if (newLeftWidth < minWidth) newLeftWidth = minWidth;
            if (newLeftWidth > maxWidth) newLeftWidth = maxWidth;
            
            layout.style.gridTemplateColumns = `${newLeftWidth}px 6px 1fr`;
            
            if (state.editor) {
                state.editor.layout();
            }
        };

        const onMouseUp = () => {
            resizerH.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Kéo co dãn dọc (Editor vs Console Terminal)
    resizerV.addEventListener('mousedown', (e) => {
        e.preventDefault();
        resizerV.classList.add('dragging');
        
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
        
        const computedStyle = window.getComputedStyle(codingArea);
        const gridRows = computedStyle.gridTemplateRows.split(' ');
        const startTerminalHeight = parseFloat(gridRows[2]);
        const startY = e.clientY;

        const onMouseMove = (moveEvent) => {
            const dy = moveEvent.clientY - startY;
            let newTerminalHeight = startTerminalHeight - dy; // Kéo lên làm giảm clientY -> tăng chiều cao
            
            // Giới hạn chiều cao
            const minHeight = 80;
            const maxHeight = codingArea.clientHeight - 100;
            if (newTerminalHeight < minHeight) newTerminalHeight = minHeight;
            if (newTerminalHeight > maxHeight) newTerminalHeight = maxHeight;
            
            codingArea.style.gridTemplateRows = `1fr 6px ${newTerminalHeight}px`;
            
            if (state.editor) {
                state.editor.layout();
            }
        };

        const onMouseUp = () => {
            resizerV.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

// THIẾT LẬP CÁC SỰ KIỆN XỬ LÝ LỚP HỌC
function setupEventHandlers() {
    // Khởi tạo resizers co dãn màn thực hành
    initResizers();

    // Đổi tab học tập
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-tab'));
        });
    });
    
    // Đánh dấu hoàn thành bài học
    document.getElementById('btn-complete-lesson').addEventListener('click', () => {
        toggleLessonComplete(state.currentLessonId);
    });
    
    // Chọn bài tập thực hành con
    const exerciseSelect = document.getElementById('exercise-select');
    if (exerciseSelect) {
        exerciseSelect.addEventListener('change', (e) => {
            const exId = parseInt(e.target.value);
            if (exId) {
                loadExercise(exId);
            }
        });
    }
    
    // Chọn khóa học (Course select)
    const courseSelect = document.getElementById('course-select');
    if (courseSelect) {
        courseSelect.addEventListener('change', (e) => {
            const selectedCourse = e.target.value;
            state.activeCourse = selectedCourse;
            updateLogoAndSubtitle(selectedCourse);
            renderSidebar();
            
            // Load bài học đầu tiên của khóa học đó
            const firstLessonId = selectedCourse === 'sql' ? 33 : 1;
            loadLesson(firstLessonId);
        });
    }
    
    // Toggle sidebar mobile
    document.getElementById('sidebar-toggle').addEventListener('click', () => {
        document.getElementById('app-sidebar').classList.toggle('visible');
    });
    
    // Reset code trong IDE
    document.getElementById('btn-reset-code').addEventListener('click', () => {
        const lesson = state.lessons.find(l => l.id === state.currentLessonId);
        if (lesson && lesson.exercises) {
            const exercise = lesson.exercises.find(e => e.id === state.currentExerciseId);
            if (exercise && confirm('Bạn có chắc chắn muốn khôi phục code ban đầu của bài tập này?')) {
                state.editor.setValue(exercise.starterCode);
                saveCode(exercise.id, exercise.starterCode);
                mentorSpeak("Đã khôi phục code ban đầu rồi em nhé! Bắt đầu lại thật cẩn thận nào.");
            }
        }
    });
    
    // Chạy thử code
    document.getElementById('btn-run-code').addEventListener('click', () => {
        runCodeSimulation();
    });
    
    // Nộp bài chấm điểm
    document.getElementById('btn-submit-code').addEventListener('click', () => {
        submitCodeChallenge();
    });

    // --- SỰ KIỆN XÁC THỰC NGƯỜI DÙNG (AUTH HANDLERS) ---
    
    const loginTrigger = document.getElementById('btn-login-trigger');
    const closeAuthModal = document.getElementById('btn-close-auth-modal');
    const introStartBtn = document.getElementById('btn-intro-start');
    
    if (loginTrigger) {
        loginTrigger.addEventListener('click', () => openAuthModal());
    }
    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', () => closeAuthModalFn());
    }
    if (introStartBtn) {
        introStartBtn.addEventListener('click', () => {
            openAuthModal();
        });
    }
    
    // Đổi tab Đăng nhập / Đăng ký
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    
    if (tabLogin && tabRegister && formLogin && formRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.style.display = 'flex';
            formRegister.style.display = 'none';
            document.getElementById('login-error-msg').style.display = 'none';
            document.getElementById('register-error-msg').style.display = 'none';
            document.getElementById('register-success-msg').style.display = 'none';
        });
        
        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            formRegister.style.display = 'flex';
            formLogin.style.display = 'none';
            document.getElementById('login-error-msg').style.display = 'none';
            document.getElementById('register-error-msg').style.display = 'none';
            document.getElementById('register-success-msg').style.display = 'none';
        });
    }
    
    // Xử lý nộp form Đăng nhập
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('login-username').value.trim();
            const passwordInput = document.getElementById('login-password').value;
            const errorMsg = document.getElementById('login-error-msg');
            
            errorMsg.style.display = 'none';
            
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usernameInput, password: passwordInput })
                });
                
                const data = await res.json();
                if (!res.ok) {
                    errorMsg.innerText = data.error || 'Đăng nhập thất bại!';
                    errorMsg.style.display = 'block';
                    return;
                }
                
                state.token = data.token;
                localStorage.setItem('raize_java_token', data.token);
                localStorage.setItem('raize_java_username', data.user.username);
                
                await loadProgressFromDB();
                closeAuthModalFn();
                initApp();
                
                mentorSpeak(`Chào mừng quay trở lại, học viên <b>${data.user.username}</b>! Hãy cùng nhau tiếp tục hành trình chinh phục Java nhé!`);
            } catch (err) {
                console.error(err);
                errorMsg.innerText = 'Lỗi kết nối tới máy chủ backend!';
                errorMsg.style.display = 'block';
            }
        });
    }
    
    // Xử lý nộp form Đăng ký
    if (formRegister) {
        formRegister.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('register-username').value.trim();
            const passwordInput = document.getElementById('register-password').value;
            const confirmPasswordInput = document.getElementById('register-confirm-password').value;
            const errorMsg = document.getElementById('register-error-msg');
            const successMsg = document.getElementById('register-success-msg');
            
            errorMsg.style.display = 'none';
            successMsg.style.display = 'none';
            
            if (passwordInput !== confirmPasswordInput) {
                errorMsg.innerText = 'Mật khẩu xác nhận không trùng khớp!';
                errorMsg.style.display = 'block';
                return;
            }
            
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usernameInput, password: passwordInput })
                });
                
                const data = await res.json();
                if (!res.ok) {
                    errorMsg.innerText = data.error || 'Đăng ký thất bại!';
                    errorMsg.style.display = 'block';
                    return;
                }
                
                successMsg.innerText = 'Đăng ký thành công! Đang chuyển sang đăng nhập...';
                successMsg.style.display = 'block';
                
                document.getElementById('register-username').value = '';
                document.getElementById('register-password').value = '';
                document.getElementById('register-confirm-password').value = '';
                
                setTimeout(() => {
                    tabLogin.click();
                    document.getElementById('login-username').value = usernameInput;
                    document.getElementById('login-password').focus();
                }, 1200);
            } catch (err) {
                console.error(err);
                errorMsg.innerText = 'Lỗi kết nối tới máy chủ!';
                errorMsg.style.display = 'block';
            }
        });
    }
    
    // Đăng xuất
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        // Tránh bị nhân đôi handler nếu setupEventHandlers được gọi lại
        btnLogout.replaceWith(btnLogout.cloneNode(true));
        document.getElementById('btn-logout').addEventListener('click', () => {
            logout();
        });
    }

    // Đăng ký sự kiện hiện/ẩn mật khẩu cho các trường input password
    document.querySelectorAll('.btn-toggle-password').forEach(btn => {
        // Tránh bị nhân đôi handler nếu setupEventHandlers được gọi lại
        const newBtn = btn.cloneNode(true);
        btn.replaceWith(newBtn);
        newBtn.addEventListener('click', () => {
            const input = newBtn.closest('.input-with-icon').querySelector('input');
            if (!input) return;
            
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            
            // Cập nhật icon Lucide
            const newIconName = isPassword ? 'eye-off' : 'eye';
            newBtn.innerHTML = `<i data-lucide="${newIconName}"></i>`;
            
            if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
                lucide.createIcons();
            }
        });
    });
}


// BẬT / TẮT HOÀN THÀNH BÀI HỌC
function toggleLessonComplete(lessonId) {
    const item = document.getElementById(`lesson-item-${lessonId}`);
    const btnComplete = document.getElementById('btn-complete-lesson');
    
    if (state.completedLessons.has(lessonId)) {
        state.completedLessons.delete(lessonId);
        if (item) item.classList.remove('completed');
        if (btnComplete) {
            btnComplete.classList.remove('completed');
            btnComplete.innerHTML = `<i data-lucide="circle"></i><span>Đánh dấu hoàn thành</span>`;
        }
        mentorSpeak("Đã bỏ đánh dấu hoàn thành bài học này.");
    } else {
        state.completedLessons.add(lessonId);
        if (item) item.classList.add('completed');
        if (btnComplete) {
            btnComplete.classList.add('completed');
            btnComplete.innerHTML = `<i data-lucide="check-circle"></i><span>Đã hoàn thành</span>`;
        }
        mentorSpeak("Chúc mừng em đã hoàn thành bài học này! Kiến thức rất chắc rồi đấy!");
        triggerConfetti();
    }
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }
    saveProgress();
}

// BẬT / TẮT HOÀN THÀNH BÀI TẬP THỰC HÀNH
function toggleExerciseComplete(exerciseId) {
    if (!state.completedExercises.has(exerciseId)) {
        state.completedExercises.add(exerciseId);
    }
    
    if (state.token) {
        fetch('/api/progress/exercise/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            },
            body: JSON.stringify({
                exerciseId: exerciseId,
                completed: true
            })
        }).catch(err => console.error("Lỗi đồng bộ completed exercise:", err));
    }
    
    const lesson = state.lessons.find(l => l.id === state.currentLessonId);
    if (lesson) {
        renderExerciseSelector(lesson);
    }
    renderSidebar();
    saveProgress();
}

// MENTOR ĐỐI THOẠI
function mentorSpeak(text) {
    const textEl = document.getElementById('mentor-text');
    if (textEl) {
        textEl.innerHTML = text;
    }
    
    // 1. Cập nhật hộp giải thích ở tab Visualizer nếu có
    const visExp = document.getElementById('visualizer-explanation');
    const visExpText = document.getElementById('visualizer-explanation-text');
    if (visExp && visExpText) {
        if (text && state.currentTab === 'visual') {
            visExp.style.display = 'block';
            visExpText.innerHTML = text;
        }
    }
    
    // 2. Ghi logs vào Console Terminal
    const terminal = document.getElementById('terminal-output');
    if (terminal) {
        // Loại bỏ HTML tags để in text sạch vào terminal
        const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
        terminal.innerHTML += `<span class="terminal-line system-msg" style="color: var(--accent-cyan); margin-top: 6px; padding: 6px 10px; background: rgba(6, 182, 212, 0.04); border-left: 3px solid var(--accent-cyan); border-radius: 0 4px 4px 0; display: block;">💬 Thầy Nam (Mentor): ${cleanText}</span>`;
        terminal.scrollTop = terminal.scrollHeight;
    }
}

// ----------------------------------------------------
// BỘ CHẠY THỬ CODE VÀ CHẤM ĐIỂM (JAVA IN JS ENGINE)
// ----------------------------------------------------

function runCodeEnv(javaCode) {
    let outputLines = [];
    const print = (text = "") => outputLines.push(String(text));
    const println = (text = "") => outputLines.push(String(text) + '\n');
    
    // Định nghĩa hàm printf
    const printf = (format, ...args) => {
        let result = format;
        let argIndex = 0;
        
        result = result.replace(/%[a-zA-Z%]|%,?\.\d+[fF]|%,d/g, (match) => {
            if (match === '%%') return '%';
            if (match === '%n') return '\n';
            
            let arg = args[argIndex++];
            if (arg === undefined) return match;
            
            if (match === '%s') return String(arg);
            if (match === '%d') return parseInt(arg).toString();
            
            if (match.includes(',') && (match.endsWith('f') || match.endsWith('F') || match.endsWith('d'))) {
                let parts = match.match(/%,?\.(\d+)f/);
                let decimals = parts ? parseInt(parts[1]) : 0;
                let formatted = Number(arg).toFixed(decimals);
                let numParts = formatted.split('.');
                numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return numParts.join('.');
            }
            if (match.endsWith('f') || match.endsWith('F')) {
                let parts = match.match(/%\.(\d+)f/);
                let decimals = parts ? parseInt(parts[1]) : 6;
                return Number(arg).toFixed(decimals);
            }
            return String(arg);
        });
        
        outputLines.push(result);
    };

    // Chuẩn hóa và làm sạch code Java để biên dịch sang JS thực thi
    let js = javaCode;
    
    // Xóa imports
    js = js.replace(/import\s+[\w\.]+(\.\*)?;/g, '');
    
    // Xử lý các phép nối chuỗi trong printf
    js = js.replace(/System\.out\.println\s*\((.*?)\);/g, 'println($1);');
    js = js.replace(/System\.out\.print\s*\((.*?)\);/g, 'print($1);');
    js = js.replace(/System\.out\.printf\s*\((.*?)\);/g, 'printf($1);');
    
    // Trích xuất mã lệnh bên trong hàm main
    let codeToRun = "";
    const mainStart = js.indexOf("public static void main");
    if (mainStart !== -1) {
        let braceStart = js.indexOf("{", mainStart);
        if (braceStart !== -1) {
            let braceCount = 1;
            let i = braceStart + 1;
            while (i < js.length && braceCount > 0) {
                if (js[i] === '{') braceCount++;
                else if (js[i] === '}') braceCount--;
                i++;
            }
            codeToRun = js.substring(braceStart + 1, i - 1);
        }
    } else {
        // Fallback: strip class
        codeToRun = js
            .replace(/public\s+class\s+\w+\s*\{/g, '')
            .replace(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s+\w+\s*\)\s*\{/g, '')
            .replace(/\}$/g, '')
            .replace(/\}$/g, '');
    }

    // Làm sạch cú pháp khai báo kiểu dữ liệu trong Java
    // Mảng: int[] a = {1,2} -> let a = [1,2]
    codeToRun = codeToRun.replace(/\b\w+\[\]\s+(\w+)\s*=\s*\{([\s\S]*?)\}/g, 'let $1 = [$2]');
    // Biến: int x = 5 -> let x = 5
    codeToRun = codeToRun.replace(/\b(int|double|float|String|boolean|char|var)\s+(\w+)\s*=/g, 'let $2 =');
    // Hằng số: final int X = 5 -> const X = 5
    codeToRun = codeToRun.replace(/\bfinal\s+(int|double|float|String|boolean|char|var)\s+(\w+)\s*=/g, 'const $2 =');
    
    // Môi trường chạy ảo
    const runEnv = {
        print,
        println,
        printf,
        Math,
        StringBuilder: function() {
            this.str = "";
            this.append = function(x) { this.str += String(x); return this; };
            this.toString = function() { return this.str; };
        }
    };
    
    try {
        const runner = new Function('print', 'println', 'printf', 'StringBuilder', codeToRun);
        runner(runEnv.print, runEnv.println, runEnv.printf, runEnv.StringBuilder);
        return { success: true, output: outputLines.join('') };
    } catch (err) {
        return { success: false, output: `[Lỗi biên dịch / Runtime Java]:\nLine: ${err.lineNumber || 'Unknown'} - ${err.message}` };
    }
}

// --- INTEGRATION: SQLITE WEB-ASSEMBLY FOR BROWSER SANDBOX ---
let SQL = null;
let dbInstance = null;

async function initSqlDatabase(forceReset = false) {
    if (dbInstance && !forceReset) return dbInstance;
    
    if (!SQL) {
        if (typeof initSqlJs === 'undefined') {
            throw new Error("Không thể tải thư viện sql.js. Vui lòng kiểm tra lại kết nối mạng!");
        }
        SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
    }
    
    const db = new SQL.Database();
    
    // Khởi tạo schema RaizeShop mẫu
    db.run(`
        CREATE TABLE categories (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        );
        
        CREATE TABLE products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            stock INTEGER NOT NULL,
            category_id INTEGER,
            rating REAL,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        );
        
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            balance REAL DEFAULT 0.0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            product_id INTEGER,
            quantity INTEGER NOT NULL,
            order_date TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
    `);
    
    // Categories
    db.run("INSERT INTO categories VALUES (1, 'Vũ khí');");
    db.run("INSERT INTO categories VALUES (2, 'Giáp bảo vệ');");
    db.run("INSERT INTO categories VALUES (3, 'Trang sức');");
    db.run("INSERT INTO categories VALUES (4, 'Vật phẩm hỗ trợ');");
    
    // Products
    db.run("INSERT INTO products VALUES (1, 'Kiếm Dragon +10', 1500000.0, 5, 1, 4.8);");
    db.run("INSERT INTO products VALUES (2, 'Gậy Thần Ma', 2000000.0, 3, 1, 4.9);");
    db.run("INSERT INTO products VALUES (3, 'Giáp Hắc Vương', 1200000.0, 8, 2, 4.7);");
    db.run("INSERT INTO products VALUES (4, 'Khiên Tinh Thể', 900000.0, 12, 2, 4.5);");
    db.run("INSERT INTO products VALUES (5, 'Bình Máu Siêu Cấp', 800000.0, 500, 4, 4.2);");
    db.run("INSERT INTO products VALUES (6, 'Bình Mana Siêu Cấp', 700000.0, 450, 4, 4.3);");
    db.run("INSERT INTO products VALUES (7, 'Vé Reset Điểm', 50000.0, 100, 4, 4.6);");
    db.run("INSERT INTO products VALUES (8, 'Nhẫn Bão Táp', 590000.0, 15, 3, 4.7);");
    
    // Users
    db.run("INSERT INTO users VALUES (1, 'raize', 'raize@yahoo.com', 12000000.0, '2026-06-01 10:00:00');");
    db.run("INSERT INTO users VALUES (2, 'dragonmaster99', 'dragonmaster99@gmail.com', 5000000.0, '2026-06-02 12:30:00');");
    db.run("INSERT INTO users VALUES (3, 'gameraise', 'gameraise@gmail.com', 150000.0, '2026-06-05 15:45:00');");
    db.run("INSERT INTO users VALUES (4, 'newbie123', 'newbie123@yahoo.com', 0.0, '2026-06-10 09:00:00');");
    
    // Orders
    db.run("INSERT INTO orders VALUES (1, 1, 1, 1, '2026-06-15 14:20:00');");
    db.run("INSERT INTO orders VALUES (2, 1, 7, 1, '2026-06-15 16:30:00');");
    db.run("INSERT INTO orders VALUES (3, 2, 2, 1, '2026-06-16 11:15:00');");
    db.run("INSERT INTO orders VALUES (4, 4, 3, 1, '2026-06-17 18:00:00');");
    db.run("INSERT INTO orders VALUES (5, 4, 4, 1, '2026-06-18 10:10:00');");
    db.run("INSERT INTO orders VALUES (6, 2, 5, 2, '2026-06-19 09:30:00');");
    db.run("INSERT INTO orders VALUES (7, 2, 8, 1, '2026-06-19 15:00:00');");
    
    dbInstance = db;
    return dbInstance;
}

function formatSqlResultsToHtmlTable(res) {
    if (!res || res.length === 0) {
        return '<span class="terminal-line output">[Không có dữ liệu trả về hoặc câu lệnh chạy thành công]</span>';
    }
    
    let html = '<table class="terminal-table">';
    // Header
    html += '<thead><tr>';
    res[0].columns.forEach(col => {
        html += `<th>${escapeHtml(col)}</th>`;
    });
    html += '</tr></thead>';
    
    // Body
    html += '<tbody>';
    res[0].values.forEach(row => {
        html += '<tr>';
        row.forEach(val => {
            const displayVal = val === null ? '<span style="color: var(--text-muted); font-style: italic;">NULL</span>' : escapeHtml(String(val));
            html += `<td>${displayVal}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Bấm nút Chạy Thử
function runCodeSimulation() {
    const lesson = state.lessons.find(l => l.id === state.currentLessonId);
    if (!lesson || !lesson.exercises) return;
    const exercise = lesson.exercises.find(e => e.id === state.currentExerciseId);
    const isSql = exercise && (exercise.fileName || '').endsWith('.sql');

    if (isSql) {
        runSqlCodeSimulation();
        return;
    }

    const code = state.editor.getValue();
    const terminal = document.getElementById('terminal-output');
    terminal.innerHTML = '<span class="terminal-line system-msg">Đang biên dịch và chạy file Java...</span>';
    
    // Tạo chút delay cho cảm giác biên dịch thật
    setTimeout(() => {
        const res = runCodeEnv(code);
        if (res.success) {
            terminal.innerHTML = `<span class="terminal-line output">${res.output || '[Chương trình kết thúc nhưng không in ra gì]'}</span>`;
            terminal.innerHTML += `<span class="terminal-line success-msg">>> Báo cáo: Chạy thử thành công!</span>`;
            mentorSpeak("Tuyệt vời! Code của em biên dịch và chạy ngon lành rồi. Giờ hãy bấm nút <b>Nộp Bài</b> để kiểm tra các test case nhé!");
        } else {
            terminal.innerHTML = `<span class="terminal-line error-msg">${res.output}</span>`;
            mentorSpeak("Ồ! Có vẻ code đang bị lỗi cú pháp hoặc runtime rồi em. Hãy xem kỹ thông báo lỗi ở Terminal màu đỏ nhé.");
        }
    }, 400);
}

async function runSqlCodeSimulation() {
    const code = state.editor.getValue();
    const terminal = document.getElementById('terminal-output');
    terminal.innerHTML = '<span class="terminal-line system-msg">Đang thực thi truy vấn SQL...</span>';
    
    try {
        const db = await initSqlDatabase();
        
        // Bắt đầu transaction
        db.run("BEGIN TRANSACTION;");
        
        // Chạy truy vấn
        const res = db.exec(code);
        const rowsModified = db.getRowsModified();
        
        // Lấy kết quả hiển thị
        let outputHtml = "";
        if (res.length > 0) {
            outputHtml = formatSqlResultsToHtmlTable(res);
        } else {
            outputHtml = `<span class="terminal-line output">Chạy thành công. Số dòng bị ảnh hưởng: ${rowsModified}</span>`;
        }
        
        // Rollback để reset trạng thái database
        db.run("ROLLBACK;");
        
        terminal.innerHTML = outputHtml;
        terminal.innerHTML += `<span class="terminal-line success-msg">>> Báo cáo: Thực thi SQL thành công!</span>`;
        mentorSpeak("Tuyệt vời! Truy vấn SQL của em đã chạy thành công. Hãy nhấn <b>Nộp Bài</b> để chấm điểm tự động nhé!");
        
    } catch (err) {
        // Đảm bảo rollback nếu có lỗi xảy ra giữa chừng
        try {
            const db = await initSqlDatabase();
            db.run("ROLLBACK;");
        } catch(e) {}
        
        terminal.innerHTML = `<span class="terminal-line error-msg">[Lỗi SQL]: ${err.message}</span>`;
        mentorSpeak("Ồ! Có vẻ câu truy vấn SQL của em đang bị lỗi cú pháp rồi. Hãy đọc kỹ thông báo lỗi ở Terminal nhé.");
    }
}

// Bấm nút Nộp Bài
function submitCodeChallenge() {
    const lesson = state.lessons.find(l => l.id === state.currentLessonId);
    if (!lesson || !lesson.exercises) return;
    
    const exercise = lesson.exercises.find(e => e.id === state.currentExerciseId);
    if (!exercise) return;
    
    const isSql = exercise && (exercise.fileName || '').endsWith('.sql');
    if (isSql) {
        submitSqlCodeChallenge();
        return;
    }

    const code = state.editor.getValue();
    const terminal = document.getElementById('terminal-output');
    terminal.innerHTML = '<span class="terminal-line system-msg">Đang chạy bộ test kiểm thử tự động...</span>';
    
    setTimeout(() => {
        const res = runCodeEnv(code);
        if (!res.success) {
            terminal.innerHTML = `<span class="terminal-line error-msg">[Thất bại]: Code bị lỗi biên dịch, không thể chạy test suite.\n${res.output}</span>`;
            mentorSpeak("Không thể chấm điểm vì code của em không biên dịch được. Sửa hết các lỗi đỏ đã nhé!");
            return;
        }
        
        // Trích xuất hàm validate từ chuỗi được biên dịch từ server
        let testResult = { pass: false, msg: "Lỗi cấu hình test case." };
        try {
            const validateFn = new Function('code', 'output', `return (${exercise.validateStr})(code, output);`);
            testResult = validateFn(code, res.output);
        } catch (e) {
            console.error("Lỗi chạy validate function: ", e);
            testResult = { pass: false, msg: "Hệ thống test case bị lỗi cú pháp." };
        }
        
        if (testResult.pass) {
            terminal.innerHTML = `<span class="terminal-line output">${res.output}</span>`;
            terminal.innerHTML += `<span class="terminal-line success-msg">>> CHÚC MỪNG: Vượt qua tất cả test cases! [100/100]</span>`;
            
            // Đánh dấu hoàn thành bài tập thực hành
            if (!state.completedExercises.has(exercise.id)) {
                toggleExerciseComplete(exercise.id);
            }
            
            mentorSpeak(`Thầy chúc mừng em! <b>${testResult.msg}</b> Thách thức đã hoàn thành xuất sắc!`);
            triggerConfetti();
        } else {
            terminal.innerHTML = `<span class="terminal-line output">${res.output}</span>`;
            terminal.innerHTML += `<span class="terminal-line error-msg">>> THẤT BẠI: Test case không đạt!\nLý do: ${testResult.msg}</span>`;
            mentorSpeak(`Chưa đạt rồi em ơi. Gợi ý: <i>${testResult.msg}</i>. Đọc kỹ yêu cầu và thử lại nhé!`);
        }
    }, 500);
}

async function submitSqlCodeChallenge() {
    const code = state.editor.getValue();
    const lesson = state.lessons.find(l => l.id === state.currentLessonId);
    if (!lesson || !lesson.exercises) return;
    
    const exercise = lesson.exercises.find(e => e.id === state.currentExerciseId);
    if (!exercise) return;
    
    const terminal = document.getElementById('terminal-output');
    terminal.innerHTML = '<span class="terminal-line system-msg">Đang chạy chấm điểm tự động...</span>';
    
    try {
        const db = await initSqlDatabase();
        
        // Chạy trong transaction
        db.run("BEGIN TRANSACTION;");
        
        // Chạy thử query của học sinh để lấy output (nếu SELECT)
        let output = "";
        let studentRes = null;
        try {
            studentRes = db.exec(code);
            if (studentRes.length > 0) {
                output = formatSqlResultsToHtmlTable(studentRes);
            } else {
                output = `Chạy thành công. Số dòng bị ảnh hưởng: ${db.getRowsModified()}`;
            }
        } catch (e) {
            db.run("ROLLBACK;");
            terminal.innerHTML = `<span class="terminal-line error-msg">[Thất bại]: Lỗi khi thực thi SQL.\n${e.message}</span>`;
            mentorSpeak("Không thể chấm điểm vì câu lệnh SQL của em có lỗi. Sửa lại đã nhé!");
            return;
        }
        
        // Trích xuất hàm validate từ validateStr
        let testResult = { pass: false, msg: "Lỗi cấu hình test case." };
        try {
            const validateFn = new Function('code', 'output', 'db', `return (${exercise.validateStr})(code, output, db);`);
            testResult = validateFn(code, output, db);
        } catch (e) {
            console.error("Lỗi chạy validate function SQL: ", e);
            testResult = { pass: false, msg: "Hệ thống test case bị lỗi cú pháp: " + e.message };
        }
        
        // Rollback để khôi phục trạng thái database ban đầu
        db.run("ROLLBACK;");
        
        if (testResult.pass) {
            terminal.innerHTML = studentRes && studentRes.length > 0 ? output : `<span class="terminal-line output">${output}</span>`;
            terminal.innerHTML += `<span class="terminal-line success-msg">>> CHÚC MỪNG: Vượt qua tất cả test cases! [100/100]</span>`;
            
            if (!state.completedExercises.has(exercise.id)) {
                toggleExerciseComplete(exercise.id);
            }
            
            mentorSpeak(`Thầy chúc mừng em! <b>${testResult.msg}</b> Thách thức đã hoàn thành xuất sắc!`);
            triggerConfetti();
        } else {
            terminal.innerHTML = studentRes && studentRes.length > 0 ? output : `<span class="terminal-line output">${output}</span>`;
            terminal.innerHTML += `<span class="terminal-line error-msg">>> THẤT BẠI: Test case không đạt!\nLý do: ${testResult.msg}</span>`;
            mentorSpeak(`Chưa đạt rồi em ơi. Gợi ý: <i>${testResult.msg}</i>. Thử lại nhé!`);
        }
        
    } catch (err) {
        terminal.innerHTML = `<span class="terminal-line error-msg">[Lỗi hệ thống chấm bài]: ${err.message}</span>`;
    }
}

// ----------------------------------------------------
// BỘ MÁY CHẠY TRẮC NGHIỆM TƯƠNG TÁC (QUIZ ENGINE)
// ----------------------------------------------------

function renderQuizQuestion(lesson) {
    const container = document.getElementById('quiz-question-card');
    if (!lesson.quizzes || lesson.quizzes.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">Không có câu hỏi trắc nghiệm cho bài học này.</div>';
        return;
    }
    
    // Tính phần trăm tiến trình quiz
    const pct = Math.round((state.activeQuizQuestionIndex / lesson.quizzes.length) * 100);
    document.getElementById('quiz-progress-fill').style.width = `${pct}%`;
    
    if (state.activeQuizQuestionIndex >= lesson.quizzes.length) {
        // Hoàn thành hết quiz
        renderQuizResult(lesson);
        return;
    }
    
    const quiz = lesson.quizzes[state.activeQuizQuestionIndex];
    state.quizSelectedAnswer = null;
    
    container.innerHTML = `
        <div class="quiz-q-num">Câu hỏi ${state.activeQuizQuestionIndex + 1} / ${lesson.quizzes.length}</div>
        <div class="quiz-question">${quiz.q}</div>
        <div class="quiz-options" id="quiz-options-container">
            ${quiz.options.map((opt, i) => `
                <div class="quiz-opt-card" data-idx="${i}">
                    <span class="quiz-opt-marker">${String.fromCharCode(65 + i)}</span>
                    <span class="quiz-opt-text">${opt}</span>
                </div>
            `).join('')}
        </div>
        <div id="quiz-explanation-box"></div>
        <div class="quiz-actions" style="display:none;" id="quiz-actions-bar">
            <button class="btn-next-question" id="btn-next-q">Tiếp Theo</button>
        </div>
    `;
    
    // Thêm sự kiện click đáp án
    const options = container.querySelectorAll('.quiz-opt-card');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            if (state.quizSelectedAnswer !== null) return; // Chỉ cho chọn 1 lần
            
            const selectedIdx = parseInt(opt.getAttribute('data-idx'));
            state.quizSelectedAnswer = selectedIdx;
            
            // So sánh
            const correctIdx = quiz.answer;
            const explanationBox = document.getElementById('quiz-explanation-box');
            
            if (selectedIdx === correctIdx) {
                opt.classList.add('correct');
                mentorSpeak("Đúng rồi em! Phản xạ xuất sắc. Hãy đọc giải thích chi tiết bên dưới nhé.");
                state.quizAnswersCount++;
            } else {
                opt.classList.add('incorrect');
                options[correctIdx].classList.add('correct'); // Highlight câu đúng
                mentorSpeak("Tiếc quá, chưa chính xác rồi em. Đọc lại giải thích để hiểu tại sao sai nhé.");
            }
            
            // Show giải thích
            explanationBox.className = 'quiz-explanation';
            explanationBox.innerHTML = `
                <div class="quiz-explanation-title">
                    <i data-lucide="help-circle" style="width:16px;height:16px;"></i>
                    <span>Giải Thích Của Mentor:</span>
                </div>
                <p>${quiz.explanation}</p>
            `;
            lucide.createIcons();
            
            // Show nút Next
            document.getElementById('quiz-actions-bar').style.display = 'flex';
        });
    });
    
    // Nút Next câu hỏi
    const btnNext = container.querySelector('#btn-next-q');
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            state.activeQuizQuestionIndex++;
            renderQuizQuestion(lesson);
        });
    }
}

function renderQuizResult(lesson) {
    const container = document.getElementById('quiz-question-card');
    document.getElementById('quiz-progress-fill').style.width = '100%';
    
    const pctCorrect = Math.round((state.quizAnswersCount / lesson.quizzes.length) * 100);
    
    container.innerHTML = `
        <div class="quiz-result-view">
            <div class="logo-icon" style="font-size:48px;margin-bottom:10px;">🏆</div>
            <h2>Kết Quả Ôn Tập</h2>
            <p>Em đã hoàn thành bài trắc nghiệm của bài học này!</p>
            <div class="quiz-result-score">${state.quizAnswersCount} / ${lesson.quizzes.length}</div>
            <p style="color:var(--text-secondary);margin-bottom:20px;">Tỉ lệ chính xác: <b>${pctCorrect}%</b></p>
            <button class="btn-next-question" id="btn-restart-quiz">Làm Lại Trắc Nghiệm</button>
        </div>
    `;
    
    // Mentor nhận xét
    if (pctCorrect === 100) {
        mentorSpeak("Không thể tin được! Em trả lời đúng 100% tất cả câu hỏi. Em là một thiên tài Java đấy!");
        triggerConfetti();
    } else if (pctCorrect >= 70) {
        mentorSpeak("Kết quả rất khá! Em đã hiểu cơ bản mọi vấn đề trọng tâm rồi. Cố gắng phát huy nhé!");
    } else {
        mentorSpeak("Hơi yếu một chút rồi em ơi. Nên đọc lại tab Lý thuyết và thử làm lại trắc nghiệm lần nữa nhé.");
    }
    
    container.querySelector('#btn-restart-quiz').addEventListener('click', () => {
        state.activeQuizQuestionIndex = 0;
        state.quizAnswersCount = 0;
        renderQuizQuestion(lesson);
    });
}

// ----------------------------------------------------
// BỘ TRỰC QUAN HÓA (VISUAL PLAYGROUND COMPONENT)
// ----------------------------------------------------

function initVisualizer(lesson) {
    const viewport = document.getElementById('visualizer-viewport');
    const title = document.getElementById('visualizer-title');
    const desc = document.getElementById('visualizer-description');
    
    viewport.innerHTML = '';
    
    // Cấu hình visualizer theo bài học
    if (lesson.id === 1) {
        title.innerText = "Sơ Đồ Biên Dịch Và Thực Thi Trong Java";
        desc.innerText = "Click vào từng khối trong chu trình dịch code để xem chi tiết cách hoạt động.";
        
        viewport.innerHTML = `
            <div class="vis-compilation-flow">
                <div class="vis-row">
                    <div class="vis-box" id="vis-flow-java">
                        <strong>WelcomeScreen.java</strong>
                        <div class="vis-code-preview">public class Welcome...</div>
                    </div>
                    <div class="vis-arrow">
                        <span>Biên dịch</span>
                        <i data-lucide="arrow-right"></i>
                        <span style="font-family:var(--font-mono);font-size:10px;color:var(--accent-purple);">javac</span>
                    </div>
                    <div class="vis-box" id="vis-flow-class">
                        <strong>WelcomeScreen.class</strong>
                        <div class="vis-code-preview">CA FE BA BE (Bytecode)</div>
                    </div>
                    <div class="vis-arrow">
                        <span>Thông dịch</span>
                        <i data-lucide="arrow-right"></i>
                        <span style="font-family:var(--font-mono);font-size:10px;color:var(--accent-cyan);">JVM</span>
                    </div>
                    <div class="vis-box" id="vis-flow-os">
                        <strong>Hệ Điều Hành</strong>
                        <div class="vis-code-preview">Mã máy (Binaries)</div>
                    </div>
                </div>
                
                <div class="vis-jvm" id="vis-flow-jvm-box">
                    <div class="vis-jvm-title">Bên trong Máy ảo Java (JVM)</div>
                    <div class="vis-jvm-memory">
                        <div class="vis-mem-block">
                            <div class="vis-mem-title">Method Area</div>
                            <span style="color:var(--text-secondary);">Tải file .class và chứa cấu trúc class</span>
                        </div>
                        <div class="vis-mem-block">
                            <div class="vis-mem-title">JVM Stack</div>
                            <span style="color:var(--text-secondary);">Quản lý luồng chạy, biến cục bộ</span>
                        </div>
                        <div class="vis-mem-block">
                            <div class="vis-mem-title">Heap Area</div>
                            <span style="color:var(--text-secondary);">Lưu trữ các đối tượng khởi tạo</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Sự kiện click mô phỏng
        const boxJava = document.getElementById('vis-flow-java');
        const boxClass = document.getElementById('vis-flow-class');
        const boxOs = document.getElementById('vis-flow-os');
        
        boxJava.addEventListener('click', () => {
            mentorSpeak("<b>Mã nguồn Java (.java)</b>: Là những dòng lệnh code chữ viết tay bằng ngôn ngữ Java mà con người đọc được. File này cần được biên dịch trước khi chạy.");
        });
        boxClass.addEventListener('click', () => {
            mentorSpeak("<b>Tập tin Bytecode (.class)</b>: File trung gian được tạo ra sau khi biên dịch. Chứa các chỉ lệnh nhị phân tối ưu hóa mà chỉ có JVM mới hiểu được, giúp Java đạt slogan 'Run Anywhere'.");
        });
        boxOs.addEventListener('click', () => {
            mentorSpeak("<b>Hệ điều hành & Mã máy</b>: JVM dịch bytecode sang mã máy bản địa (Windows/Linux/Mac) để CPU của máy thực thi trực tiếp, hiển thị kết quả.");
        });
        
    } else if (lesson.id === 2 || lesson.id === 8 || lesson.id === 9) {
        title.innerText = "Trực Quan Hóa Ô Nhớ Stack & Heap Trong RAM";
        desc.innerText = "Click vào từng dòng code Java bên trái để xem các ô dữ liệu được sinh ra trong bộ nhớ RAM.";
        
        viewport.innerHTML = `
            <div class="vis-mem-layout">
                <div class="vis-code-panel">
                    <div class="vis-pane-title">Đoạn code Java mẫu</div>
                    <div class="vis-code-line current" data-step="1">1: int age = 20;</div>
                    <div class="vis-code-line" data-step="2">2: String name = "Raize";</div>
                    <div class="vis-code-line" data-step="3">3: Dog d1 = new Dog("Ruby");</div>
                    <div class="vis-code-line" data-step="4">4: Dog d2 = d1;</div>
                </div>
                
                <div class="vis-pane">
                    <div class="vis-pane-title">Bộ nhớ STACK (Ngăn xếp)</div>
                    <div class="vis-pane-content" id="vis-stack-content">
                        <div class="vis-stack-frame">
                            <div style="font-weight:700;font-size:11px;color:var(--accent-purple);">main() frame</div>
                            <div class="vis-var">
                                <span>age</span>
                                <span style="color:var(--success);">20</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="vis-pane">
                    <div class="vis-pane-title">Bộ nhớ HEAP (Đống)</div>
                    <div class="vis-pane-content" id="vis-heap-content">
                        <div style="text-align:center;color:var(--text-muted);font-size:12px;margin-top:20px;">Trống</div>
                    </div>
                </div>
            </div>
        `;
        
        const lines = viewport.querySelectorAll('.vis-code-line');
        const stackContent = document.getElementById('vis-stack-content');
        const heapContent = document.getElementById('vis-heap-content');
        
        lines.forEach(line => {
            line.addEventListener('click', () => {
                lines.forEach(l => l.classList.remove('current'));
                line.classList.add('current');
                
                const step = parseInt(line.getAttribute('data-step'));
                
                if (step === 1) {
                    stackContent.innerHTML = `
                        <div class="vis-stack-frame">
                            <div style="font-weight:700;font-size:11px;color:var(--accent-purple);">main() frame</div>
                            <div class="vis-var">
                                <span>age (int)</span>
                                <span style="color:var(--success);">20</span>
                            </div>
                        </div>
                    `;
                    heapContent.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:12px;margin-top:20px;">Trống</div>';
                    mentorSpeak("<b>int age = 20;</b>: Biến nguyên thủy (primitive) được lưu trực tiếp giá trị trị số nguyên `20` ngay trong ngăn xếp Stack của hàm main.");
                } else if (step === 2) {
                    stackContent.innerHTML = `
                        <div class="vis-stack-frame">
                            <div style="font-weight:700;font-size:11px;color:var(--accent-purple);">main() frame</div>
                            <div class="vis-var">
                                <span>age (int)</span>
                                <span style="color:var(--success);">20</span>
                            </div>
                            <div class="vis-var">
                                <span>name (String)</span>
                                <span style="color:var(--accent-cyan);">0x101 (addr)</span>
                            </div>
                        </div>
                    `;
                    heapContent.innerHTML = `
                        <div class="vis-string-pool-block">
                            <div style="font-size:10px;font-weight:700;color:var(--accent-cyan);margin-bottom:6px;">String Constant Pool</div>
                            <div class="vis-heap-object" style="border-color:var(--accent-cyan)">
                                <div class="vis-obj-addr">0x101</div>
                                <div class="vis-obj-type">String Object</div>
                                <div>value: "Raize"</div>
                            </div>
                        </div>
                    `;
                    mentorSpeak("<b>String name = \"Raize\";</b>: Biến `name` ở Stack thực chất chỉ giữ **địa chỉ con trỏ** `0x101`. Đối tượng chuỗi thực sự nằm ở Heap, cụ thể là vùng tối ưu **String Pool**.");
                } else if (step === 3) {
                    stackContent.innerHTML = `
                        <div class="vis-stack-frame">
                            <div style="font-weight:700;font-size:11px;color:var(--accent-purple);">main() frame</div>
                            <div class="vis-var">
                                <span>age (int)</span>
                                <span style="color:var(--success);">20</span>
                            </div>
                            <div class="vis-var">
                                <span>name (String)</span>
                                <span style="color:var(--accent-cyan);">0x101 (addr)</span>
                            </div>
                            <div class="vis-var">
                                <span>d1 (Dog)</span>
                                <span style="color:var(--accent-purple);">0x202 (addr)</span>
                            </div>
                        </div>
                    `;
                    heapContent.innerHTML = `
                        <div class="vis-string-pool-block">
                            <div style="font-size:10px;font-weight:700;color:var(--accent-cyan);margin-bottom:4px;">String Constant Pool</div>
                            <div class="vis-heap-object" style="border-color:var(--accent-cyan)">
                                <div class="vis-obj-addr">0x101</div>
                                <div class="vis-obj-type">String Object</div>
                                <div>value: "Raize"</div>
                            </div>
                        </div>
                        <div style="margin-top:10px;">
                            <div class="vis-heap-object">
                                <div class="vis-obj-addr">0x202</div>
                                <div class="vis-obj-type">Dog Object</div>
                                <div>name: "Ruby" (String)</div>
                                <div>age: 0 (default)</div>
                            </div>
                        </div>
                    `;
                    mentorSpeak("<b>Dog d1 = new Dog(\"Ruby\");</b>: Từ khóa `new` bắt buộc tạo ra một vùng nhớ trống ở Heap (địa chỉ `0x202`) để chứa thông tin các trường của đối tượng Dog. `d1` ở Stack trỏ đến địa chỉ đó.");
                } else if (step === 4) {
                    stackContent.innerHTML = `
                        <div class="vis-stack-frame">
                            <div style="font-weight:700;font-size:11px;color:var(--accent-purple);">main() frame</div>
                            <div class="vis-var">
                                <span>age (int)</span>
                                <span style="color:var(--success);">20</span>
                            </div>
                            <div class="vis-var">
                                <span>name (String)</span>
                                <span style="color:var(--accent-cyan);">0x101 (addr)</span>
                            </div>
                            <div class="vis-var">
                                <span>d1 (Dog)</span>
                                <span style="color:var(--accent-purple);">0x202 (addr)</span>
                            </div>
                            <div class="vis-var">
                                <span>d2 (Dog)</span>
                                <span style="color:var(--accent-purple);">0x202 (addr)</span>
                            </div>
                        </div>
                    `;
                    heapContent.innerHTML = `
                        <div class="vis-string-pool-block">
                            <div style="font-size:10px;font-weight:700;color:var(--accent-cyan);margin-bottom:4px;">String Constant Pool</div>
                            <div class="vis-heap-object" style="border-color:var(--accent-cyan)">
                                <div class="vis-obj-addr">0x101</div>
                                <div class="vis-obj-type">String Object</div>
                                <div>value: "Raize"</div>
                            </div>
                        </div>
                        <div style="margin-top:10px;">
                            <div class="vis-heap-object">
                                <div class="vis-obj-addr">0x202</div>
                                <div class="vis-obj-type">Dog Object <span style="color:var(--warning)">(d1 & d2 trỏ chung)</span></div>
                                <div>name: "Ruby" (String)</div>
                                <div>age: 0</div>
                            </div>
                        </div>
                    `;
                    mentorSpeak("<b>Dog d2 = d1;</b>: Đây là điểm newbie rất hay sai! Phép gán đối tượng chỉ sao chép **địa chỉ ô nhớ** (`0x202`) từ `d1` sang `d2` chứ KHÔNG tạo thêm chú chó thứ hai ở Heap. Sửa thuộc tính qua `d2` sẽ làm thay đổi cả `d1`!");
                }
            });
        });
        
    } else if (lesson.id === 5) {
        title.innerText = "Trực Quan Hóa String Pool - So sánh String";
        desc.innerText = "Click vào các toán tử so sánh bên dưới để xem sự khác biệt giữa so sánh địa chỉ và so sánh nội dung.";
        
        viewport.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:20px;width:100%;">
                <div style="display:grid;grid-template-columns: 1fr 1fr;gap:20px;">
                    <div class="vis-pane">
                        <div class="vis-pane-title">Khai Báo Dòng Code</div>
                        <div style="font-family:var(--font-mono);font-size:13px;line-height:2.0;">
                            String s1 = "Hi";<br>
                            String s2 = "Hi";<br>
                            String s3 = new String("Hi");
                        </div>
                    </div>
                    <div class="vis-pane">
                        <div class="vis-pane-title">Sơ Đồ Bộ Nhớ RAM</div>
                        <div style="font-family:var(--font-mono);font-size:12px;position:relative;height:120px;">
                            <div style="position:absolute;left:10px;top:10px;border:1px solid #fff;padding:4px;border-radius:4px;">s1 (Stack)</div>
                            <div style="position:absolute;left:10px;top:50px;border:1px solid #fff;padding:4px;border-radius:4px;">s2 (Stack)</div>
                            <div style="position:absolute;left:10px;top:90px;border:1px solid #fff;padding:4px;border-radius:4px;">s3 (Stack)</div>
                            
                            <div style="position:absolute;right:10px;top:10px;border:1.5px dashed var(--accent-cyan);padding:10px;border-radius:8px;width:150px;text-align:center;">
                                <div style="font-size:9px;color:var(--accent-cyan);">String Pool (Heap)</div>
                                <div style="background-color:var(--bg-tertiary);border:1px solid var(--border-color);padding:2px;border-radius:4px;margin-top:4px;" id="vis-str-p">"Hi" (0x55)</div>
                            </div>
                            
                            <div style="position:absolute;right:10px;top:85px;border:1px solid var(--accent-purple);padding:4px;border-radius:4px;width:150px;text-align:center;" id="vis-str-h">
                                String Object (0x99)<br>
                                value -> 0x55
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="vis-pane">
                    <div class="vis-pane-title">Kết quả các phép so sánh</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                        <button class="btn-run" style="padding:10px;" id="btn-vis-comp1">So sánh s1 == s2 (Địa chỉ)</button>
                        <button class="btn-run" style="padding:10px;" id="btn-vis-comp2">So sánh s1 == s3 (Địa chỉ)</button>
                        <button class="btn-run" style="padding:10px;" id="btn-vis-comp3">So sánh s1.equals(s3) (Nội dung)</button>
                        <button class="btn-run" style="padding:10px;" id="btn-vis-comp4">So sánh s1.equals(s2) (Nội dung)</button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('btn-vis-comp1').addEventListener('click', () => {
            mentorSpeak("<b>s1 == s2 => TRUE</b>: Cả s1 và s2 đều được khai báo dạng literal chuỗi cứng. Java tối ưu bộ nhớ bằng cách trỏ cả hai biến tới chung một địa chỉ `0x55` trong String Pool. So sánh địa chỉ `==` trả về `true`.");
        });
        document.getElementById('btn-vis-comp2').addEventListener('click', () => {
            mentorSpeak("<b>s1 == s3 => FALSE</b>: s3 dùng từ khóa `new` nên Java ép buộc sinh ra một đối tượng String độc lập trong bộ nhớ Heap chung (địa chỉ `0x99`). So sánh địa chỉ `0x55 == 0x99` trả về `false` mặc dù nội dung chữ đều là 'Hi'!");
        });
        document.getElementById('btn-vis-comp3').addEventListener('click', () => {
            mentorSpeak("<b>s1.equals(s3) => TRUE</b>: Phương thức `.equals()` của lớp String được thiết kế để nhảy vào ô nhớ so sánh từng ký tự bên trong chuỗi. Vì cả hai đều chứa chữ 'H' và 'i', kết quả trả về luôn là `true`. Hãy luôn dùng `.equals()` nhé!");
        });
        document.getElementById('btn-vis-comp4').addEventListener('click', () => {
            mentorSpeak("<b>s1.equals(s2) => TRUE</b>: So sánh nội dung hai chuỗi giống nhau, trả về `true`.");
        });
        
    } else if (lesson.id === 13) {
        title.innerText = "Trực Quan Hóa Cấu Trúc Dữ Liệu ArrayList vs LinkedList";
        desc.innerText = "Click các nút để xem cơ chế lưu trữ phần tử trong RAM khác nhau thế nào.";
        
        viewport.innerHTML = `
            <div style="display:flex;flex-direction:column;gap:20px;width:100%;">
                <div class="vis-pane">
                    <div class="vis-pane-title">ArrayList (Mảng Động Liên Tục)</div>
                    <div style="display:flex;gap:4px;justify-content:center;margin:10px 0;" id="vis-array-list-row">
                        <div style="border:1px solid #fff;padding:12px;width:50px;text-align:center;background:var(--bg-tertiary);">[0]<br>12</div>
                        <div style="border:1px solid #fff;padding:12px;width:50px;text-align:center;background:var(--bg-tertiary);">[1]<br>45</div>
                        <div style="border:1px solid #fff;padding:12px;width:50px;text-align:center;background:var(--bg-tertiary);">[2]<br>85</div>
                        <div style="border:1.5px dashed var(--text-muted);padding:12px;width:50px;text-align:center;color:var(--text-muted);">[3]<br>-</div>
                        <div style="border:1.5px dashed var(--text-muted);padding:12px;width:50px;text-align:center;color:var(--text-muted);">[4]<br>-</div>
                    </div>
                    <p style="font-size:12px;color:var(--text-secondary);text-align:center;">
                        Tốc độ truy cập cực nhanh qua index: <b>O(1)</b>. Nhược điểm: Chèn/Xóa ở giữa rất chậm vì phải dịch chuyển các phần tử phía sau.
                    </p>
                </div>
                
                <div class="vis-pane">
                    <div class="vis-pane-title">LinkedList (Danh Sách Liên Kết Móc Nối)</div>
                    <div style="display:flex;gap:12px;align-items:center;justify-content:center;margin:10px 0;">
                        <div style="border:1px solid var(--accent-purple);padding:8px;border-radius:6px;background:var(--bg-tertiary);font-size:11px;">
                            Node [0]<br>Val: 12<br>Next -> [1]
                        </div>
                        <i data-lucide="arrow-right" style="color:var(--accent-purple);width:16px;"></i>
                        <div style="border:1px solid var(--accent-purple);padding:8px;border-radius:6px;background:var(--bg-tertiary);font-size:11px;">
                            Node [1]<br>Val: 45<br>Next -> [2]
                        </div>
                        <i data-lucide="arrow-right" style="color:var(--accent-purple);width:16px;"></i>
                        <div style="border:1px solid var(--accent-purple);padding:8px;border-radius:6px;background:var(--bg-tertiary);font-size:11px;">
                            Node [2]<br>Val: 85<br>Next -> null
                        </div>
                    </div>
                    <p style="font-size:12px;color:var(--text-secondary);text-align:center;">
                        Chèn/Xóa cực nhanh chỉ cần thay đổi móc nối địa chỉ: <b>O(1)</b>. Nhược điểm: Tìm kiếm phần tử rất chậm vì phải duyệt từ đầu danh sách: <b>O(N)</b>.
                    </p>
                </div>
            </div>
        `;
        lucide.createIcons();
        mentorSpeak("<b>ArrayList</b> quản lý bằng một mảng cứng cố định, khi đầy nó sẽ tự tạo mảng mới to gấp rưỡi và sao chép sang. <b>LinkedList</b> lưu trữ các Node phân tán rải rác trong bộ nhớ Heap và móc nối địa chỉ vào nhau.");
        
    } else {
        // Fallback generic visualizer
        title.innerText = "Trực Quan Hóa Trạng Thái Bài Học";
        desc.innerText = "Tiến độ học tập và mục tiêu tiếp cận.";
        
        const completed = state.completedLessons.has(lesson.id);
        
        viewport.innerHTML = `
            <div style="text-align:center;padding:20px;">
                <div class="logo-icon" style="font-size:60px;margin-bottom:15px;color:var(--accent-purple);">${lesson.id >= 33 ? '🗄️' : '☕'}</div>
                <h4>Bài học: ${lesson.title}</h4>
                <p style="color:var(--text-secondary);margin:10px 0;font-size:14px;">Mức độ: <b>${lesson.difficulty}</b> | Thời lượng: <b>${lesson.time}</b></p>
                <div style="margin-top:20px;padding:15px;border-radius:10px;background:var(--bg-tertiary);border:1px solid var(--border-color);display:inline-block;">
                    Trạng thái: ${completed ? '<span style="color:var(--success);font-weight:700;">✅ ĐÃ HOÀN THÀNH</span>' : '<span style="color:var(--warning);font-weight:700;">⏳ ĐANG HỌC</span>'}
                </div>
            </div>
        `;
        mentorSpeak(`Em đang ở bài học số <b>${lesson.id}</b>: ${lesson.title}. Hãy đọc hết lý thuyết và hoàn thành trắc nghiệm để vượt qua bài học này nhé!`);
    }
    
    lucide.createIcons();
}

// ----------------------------------------------------
// HIỆU ỨNG PHÁO HOA KHI HOÀN THÀNH (CONFETTI ANIMATION)
// ----------------------------------------------------

function triggerConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    
    // Tạo 80 mảnh confetti ngẫu nhiên
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Cấu hình random các thuộc tính
        const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 2 + Math.random() * 2;
        const size = 6 + Math.random() * 8;
        
        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = randomColor;
        confetti.style.animationDelay = `${delay}s`;
        confetti.style.animationDuration = `${duration}s`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // CSS Style trực tiếp cho confetti rơi
        confetti.style.position = 'absolute';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '999';
        confetti.style.pointerEvents = 'none';
        
        // Thêm chuyển động keyframe rơi ngẫu nhiên
        confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s infinite`;
        
        container.appendChild(confetti);
    }
    
    // Tự động xóa sau 5s
    setTimeout(() => {
        container.innerHTML = '';
    }, 6000);
}

// Bổ sung dynamic keyframes cho confetti rơi vào CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes confetti-fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);

// --- CÁC HÀM TIỆN ÍCH AUTH VÀ GIAO DIỆN (AUTH HELPER FUNCTIONS) ---

function openAuthModal() {
    const authModalOverlay = document.getElementById('auth-modal-overlay');
    if (authModalOverlay) {
        authModalOverlay.style.display = 'flex';
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-error-msg').style.display = 'none';
        
        setTimeout(() => {
            const loginUsername = document.getElementById('login-username');
            if (loginUsername) loginUsername.focus();
        }, 100);
    }
}

function closeAuthModalFn() {
    const authModalOverlay = document.getElementById('auth-modal-overlay');
    if (authModalOverlay) authModalOverlay.style.display = 'none';
}

function logout() {
    state.token = null;
    localStorage.removeItem('raize_java_token');
    localStorage.removeItem('raize_java_username');
    
    // Tải lại tiến độ dạng xem thử và hiển thị màn hình giới thiệu
    loadProgressFallback();
    mentorSpeak("Đã đăng xuất thành công. Bạn hiện đang ở màn hình giới thiệu.");
}

function toggleMainAppVisibility() {
    const introContainer = document.getElementById('intro-container');
    const appContainer = document.querySelector('.app-container');
    
    if (state.token) {
        if (introContainer) introContainer.style.display = 'none';
        if (appContainer) appContainer.style.display = 'grid';
    } else {
        if (introContainer) introContainer.style.display = 'flex';
        if (appContainer) appContainer.style.display = 'none';
    }
}

function updateAuthUI(isLoggedIn, username) {
    const loginTrigger = document.getElementById('btn-login-trigger');
    const profileMenu = document.getElementById('user-profile-menu');
    const usernameDisplay = document.getElementById('username-display');
    
    if (isLoggedIn) {
        const displayUser = username || localStorage.getItem('raize_java_username') || 'Học viên';
        if (loginTrigger) loginTrigger.style.display = 'none';
        if (profileMenu) profileMenu.style.display = 'flex';
        if (usernameDisplay) usernameDisplay.innerText = displayUser;
        hideGuestModeBanner();
    } else {
        if (loginTrigger) loginTrigger.style.display = 'flex';
        if (profileMenu) profileMenu.style.display = 'none';
        showGuestModeBanner();
    }
    
    toggleMainAppVisibility();
    
    // Vẽ lại icon lucide nếu có thay đổi cấu trúc cây DOM
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    }
}

function showGuestModeBanner() {
    hideGuestModeBanner();
    
    const banner = document.createElement('div');
    banner.className = 'guest-mode-banner';
    banner.id = 'guest-mode-banner';
    banner.innerHTML = `
        <div class="guest-banner-text">
            <strong>⚠️ Chế độ xem thử:</strong> Đăng nhập hoặc tạo tài khoản học tập để tự động lưu tiến độ học tập, câu trả lời trắc nghiệm và code của bạn vào cơ sở dữ liệu!
        </div>
        <button class="guest-banner-action" id="btn-banner-auth-trigger">Đăng nhập / Đăng ký</button>
    `;
    
    const appMain = document.querySelector('.app-main');
    const tabsBar = document.querySelector('.tabs-bar');
    if (appMain && tabsBar) {
        appMain.insertBefore(banner, tabsBar);
        
        // Thêm sự kiện click cho nút trên banner
        const bannerTrigger = document.getElementById('btn-banner-auth-trigger');
        if (bannerTrigger) {
            bannerTrigger.addEventListener('click', () => openAuthModal());
        }
    }
}

function hideGuestModeBanner() {
    const banner = document.getElementById('guest-mode-banner');
    if (banner) banner.remove();
}
