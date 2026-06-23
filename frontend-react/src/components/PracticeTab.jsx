import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';
import { runCodeEnv } from '../utils/JavaEngine';
import confetti from 'canvas-confetti';
import { FileText, FileCode, RotateCcw, Play, CheckSquare, Terminal } from 'lucide-react';

// Cấu hình SQLite WASM
let SQL = null;
let dbInstance = null;

async function initSqlDatabase(forceReset = false) {
    if (dbInstance && !forceReset) return dbInstance;
    
    if (!SQL) {
        if (typeof window.initSqlJs === 'undefined') {
            throw new Error("Không thể tải thư viện sql.js. Vui lòng kiểm tra lại kết nối mạng!");
        }
        SQL = await window.initSqlJs({
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
    
    // Seed dữ liệu
    db.run("INSERT INTO categories VALUES (1, 'Vũ khí');");
    db.run("INSERT INTO categories VALUES (2, 'Giáp bảo vệ');");
    db.run("INSERT INTO categories VALUES (3, 'Trang sức');");
    db.run("INSERT INTO categories VALUES (4, 'Vật phẩm hỗ trợ');");
    
    db.run("INSERT INTO products VALUES (1, 'Kiếm Dragon +10', 1500000.0, 5, 1, 4.8);");
    db.run("INSERT INTO products VALUES (2, 'Gậy Thần Ma', 2000000.0, 3, 1, 4.9);");
    db.run("INSERT INTO products VALUES (3, 'Giáp Hắc Vương', 1200000.0, 8, 2, 4.7);");
    db.run("INSERT INTO products VALUES (4, 'Khiên Tinh Thể', 900000.0, 12, 2, 4.5);");
    db.run("INSERT INTO products VALUES (5, 'Bình Máu Siêu Cấp', 800000.0, 500, 4, 4.2);");
    db.run("INSERT INTO products VALUES (6, 'Bình Mana Siêu Cấp', 700000.0, 450, 4, 4.3);");
    db.run("INSERT INTO products VALUES (7, 'Vé Reset Điểm', 50000.0, 100, 4, 4.6);");
    db.run("INSERT INTO products VALUES (8, 'Nhẫn Bão Táp', 590000.0, 15, 3, 4.7);");
    
    db.run("INSERT INTO users VALUES (1, 'raize', 'raize@yahoo.com', 12000000.0, '2026-06-01 10:00:00');");
    db.run("INSERT INTO users VALUES (2, 'dragonmaster99', 'dragonmaster99@gmail.com', 5000000.0, '2026-06-02 12:30:00');");
    db.run("INSERT INTO users VALUES (3, 'gameraise', 'gameraise@gmail.com', 150000.0, '2026-06-05 15:45:00');");
    db.run("INSERT INTO users VALUES (4, 'newbie123', 'newbie123@yahoo.com', 0.0, '2026-06-10 09:00:00');");
    
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

const PracticeTab = () => {
    const {
        currentLesson,
        currentExerciseId,
        completedExercises,
        userCodes,
        saveCode,
        completeExercise,
        saveLastLesson,
        mentorSpeak
    } = useCourse();

    const exercises = currentLesson ? currentLesson.exercises || [] : [];
    
    // Tìm bài tập hiện tại hoạt động
    const activeExercise = exercises.find(e => e.id === currentExerciseId) || exercises[0] || null;
    const isSql = activeExercise ? (activeExercise.fileName || '').endsWith('.sql') : false;

    // Monaco editor code value local state
    const [editorCode, setEditorCode] = useState('');
    // Terminal results
    const [terminalOutput, setTerminalOutput] = useState([
        { type: 'system', text: 'Hệ thống đã sẵn sàng. Gõ code Java và nhấn Chạy Thử...' }
    ]);
    const [isRunning, setIsRunning] = useState(false);

    // Kéo giãn cột
    const [leftWidth, setLeftWidth] = useState(480);
    const [isDraggingH, setIsDraggingH] = useState(false);

    // Kéo giãn terminal
    const [terminalHeight, setTerminalHeight] = useState(200);
    const [isDraggingV, setIsDraggingV] = useState(false);

    const layoutRef = useRef(null);
    const codingRef = useRef(null);

    // Nạp code khi thay đổi bài tập
    useEffect(() => {
        if (!activeExercise) return;
        const currentSavedCode = userCodes[activeExercise.id] || activeExercise.starterCode || '';
        setEditorCode(currentSavedCode);
        setTerminalOutput([
            { type: 'system', text: isSql ? 'Hệ thống đã sẵn sàng. Viết câu lệnh SQL và nhấn Chạy Thử...' : 'Hệ thống đã sẵn sàng. Gõ code Java và nhấn Chạy Thử...' }
        ]);
    }, [activeExercise ? activeExercise.id : 0]);

    // Xử lý sự kiện kéo giãn cột dọc (ngang)
    const startResizeH = (e) => {
        e.preventDefault();
        setIsDraggingH(true);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    };

    // Xử lý sự kiện kéo giãn terminal (dọc)
    const startResizeV = (e) => {
        e.preventDefault();
        setIsDraggingV(true);
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDraggingH && layoutRef.current) {
                const rect = layoutRef.current.getBoundingClientRect();
                let newWidth = e.clientX - rect.left;
                if (newWidth < 300) newWidth = 300;
                if (newWidth > window.innerWidth - 350) newWidth = window.innerWidth - 350;
                setLeftWidth(newWidth);
            }
            if (isDraggingV && codingRef.current) {
                const rect = codingRef.current.getBoundingClientRect();
                const containerHeight = rect.height;
                let newHeight = rect.bottom - e.clientY;
                if (newHeight < 80) newHeight = 80;
                if (newHeight > containerHeight - 120) newHeight = containerHeight - 120;
                setTerminalHeight(newHeight);
            }
        };

        const handleMouseUp = () => {
            setIsDraggingH(false);
            setIsDraggingV(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        if (isDraggingH || isDraggingV) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDraggingH, isDraggingV]);

    const handleCodeChange = (val) => {
        const newCode = val || '';
        setEditorCode(newCode);
        if (activeExercise) {
            saveCode(activeExercise.id, newCode);
        }
    };

    const handleReset = () => {
        if (!activeExercise) return;
        if (window.confirm("Bạn có chắc chắn muốn khôi phục lại code ban đầu của bài tập này không?")) {
            setEditorCode(activeExercise.starterCode);
            saveCode(activeExercise.id, activeExercise.starterCode);
            mentorSpeak("Đã khôi phục lại code mẫu ban đầu.");
        }
    };

    const handleRunSimulation = async () => {
        if (!activeExercise) return;
        setIsRunning(true);
        setTerminalOutput([{ type: 'system', text: isSql ? 'Đang thực thi truy vấn SQL...' : 'Đang biên dịch và chạy file Java...' }]);

        setTimeout(async () => {
            try {
                if (isSql) {
                    const db = await initSqlDatabase();
                    db.run("BEGIN TRANSACTION;");
                    try {
                        const res = db.exec(editorCode);
                        const modified = db.getRowsModified();
                        db.run("ROLLBACK;");

                        if (res.length > 0) {
                            setTerminalOutput([
                                { type: 'sql-table', tableData: res },
                                { type: 'success', text: '>> Báo cáo: Thực thi SQL thành công!' }
                            ]);
                        } else {
                            setTerminalOutput([
                                { type: 'output', text: `Chạy thành công. Số dòng bị ảnh hưởng: ${modified}` },
                                { type: 'success', text: '>> Báo cáo: Thực thi SQL thành công!' }
                            ]);
                        }
                        mentorSpeak("Tuyệt vời! Truy vấn SQL của em đã chạy thành công. Hãy nhấn <b>Nộp Bài</b> để chấm điểm tự động nhé!");
                    } catch (sqlErr) {
                        try { db.run("ROLLBACK;"); } catch(e) {}
                        setTerminalOutput([{ type: 'error', text: `[Lỗi SQL]: ${sqlErr.message}` }]);
                        mentorSpeak("Ồ! Có vẻ câu truy vấn SQL của em đang bị lỗi cú pháp rồi. Hãy đọc kỹ thông báo lỗi ở Terminal nhé.");
                    }
                } else {
                    const res = runCodeEnv(editorCode);
                    if (res.success) {
                        const lines = (res.output || '[Chương trình kết thúc nhưng không in ra gì]')
                            .split('\n')
                            .filter(l => l.length > 0 || res.output.indexOf(l) === res.output.length - 1);
                        const out = lines.map(l => ({ type: 'output', text: l }));
                        
                        setTerminalOutput([
                            ...out,
                            { type: 'success', text: '>> Báo cáo: Chạy thử thành công!' }
                        ]);
                        mentorSpeak("Tuyệt vời! Code của em biên dịch và chạy ngon lành rồi. Giờ hãy bấm nút <b>Nộp Bài</b> để kiểm tra các test case nhé!");
                    } else {
                        setTerminalOutput([{ type: 'error', text: res.output }]);
                        mentorSpeak("Ồ! Có vẻ code đang bị lỗi cú pháp hoặc runtime rồi em. Hãy xem kỹ thông báo lỗi ở Terminal màu đỏ nhé.");
                    }
                }
            } catch (err) {
                setTerminalOutput([{ type: 'error', text: `❌ Lỗi hệ thống: ${err.message}` }]);
            } finally {
                setIsRunning(false);
            }
        }, 400);
    };

    const handleSubmit = async () => {
        if (!activeExercise) return;
        setIsRunning(true);
        setTerminalOutput([{ type: 'system', text: 'Đang chạy bộ test kiểm thử tự động...' }]);

        setTimeout(async () => {
            try {
                if (isSql) {
                    const db = await initSqlDatabase();
                    db.run("BEGIN TRANSACTION;");
                    
                    let output = "";
                    let studentRes = null;
                    let runSuccess = false;
                    try {
                        studentRes = db.exec(editorCode);
                        if (studentRes.length > 0) {
                            // Tạo HTML string để làm tham số cho hàm validator
                            output = formatSqlResultsToHtmlTableString(studentRes);
                        } else {
                            output = `Chạy thành công. Số dòng bị ảnh hưởng: ${db.getRowsModified()}`;
                        }
                        runSuccess = true;
                    } catch (e) {
                        db.run("ROLLBACK;");
                        setTerminalOutput([{ type: 'error', text: `[Thất bại]: Lỗi khi thực thi SQL.\n${e.message}` }]);
                        mentorSpeak("Không thể chấm điểm vì câu lệnh SQL của em có lỗi. Sửa lại đã nhé!");
                        setIsRunning(false);
                        return;
                    }

                    if (runSuccess) {
                        let testResult = { pass: false, msg: "Lỗi cấu hình test case." };
                        try {
                            const validateFn = new Function('code', 'output', 'db', `return (${activeExercise.validateStr})(code, output, db);`);
                            testResult = validateFn(editorCode, output, db);
                        } catch (e) {
                            console.error("Lỗi chạy validator SQL:", e);
                            testResult = { pass: false, msg: "Hệ thống test case bị lỗi cú pháp: " + e.message };
                        }

                        db.run("ROLLBACK;");

                        if (testResult.pass) {
                            if (studentRes && studentRes.length > 0) {
                                setTerminalOutput([
                                    { type: 'sql-table', tableData: studentRes },
                                    { type: 'success', text: `>> CHÚC MỪNG: Vượt qua tất cả test cases! [100/100]\n>> Báo cáo: ${testResult.msg}` }
                                ]);
                            } else {
                                setTerminalOutput([
                                    { type: 'output', text: output },
                                    { type: 'success', text: `>> CHÚC MỪNG: Vượt qua tất cả test cases! [100/100]\n>> Báo cáo: ${testResult.msg}` }
                                ]);
                            }
                            
                            if (!completedExercises.has(activeExercise.id)) {
                                completeExercise(activeExercise.id, true);
                            }
                            mentorSpeak(`Thầy chúc mừng em! <b>${testResult.msg}</b> Thách thức đã hoàn thành xuất sắc!`);
                            triggerConfettiEffect();
                        } else {
                            if (studentRes && studentRes.length > 0) {
                                setTerminalOutput([
                                    { type: 'sql-table', tableData: studentRes },
                                    { type: 'error', text: `>> THẤT BẠI: Test case không đạt!\nLý do: ${testResult.msg}` }
                                ]);
                            } else {
                                setTerminalOutput([
                                    { type: 'output', text: output },
                                    { type: 'error', text: `>> THẤT BẠI: Test case không đạt!\nLý do: ${testResult.msg}` }
                                ]);
                            }
                            mentorSpeak(`Chưa đạt rồi em ơi. Gợi ý: <i>${testResult.msg}</i>. Thử lại nhé!`);
                        }
                    }
                } else {
                    // Chấm bài Java
                    const res = runCodeEnv(editorCode);
                    if (!res.success) {
                        setTerminalOutput([{ type: 'error', text: `[Thất bại]: Code bị lỗi biên dịch, không thể chạy test suite.\n${res.output}` }]);
                        mentorSpeak("Không thể chấm điểm vì code của em không biên dịch được. Sửa hết các lỗi đỏ đã nhé!");
                        setIsRunning(false);
                        return;
                    }

                    let testResult = { pass: false, msg: "Lỗi cấu hình test case." };
                    try {
                        const validateFn = new Function('code', 'output', `return (${activeExercise.validateStr})(code, output);`);
                        testResult = validateFn(editorCode, res.output);
                    } catch (e) {
                        console.error("Lỗi chạy validator Java:", e);
                        testResult = { pass: false, msg: "Hệ thống test case bị lỗi cú pháp." };
                    }

                    const lines = (res.output || '')
                        .split('\n')
                        .filter(l => l.length > 0 || res.output.indexOf(l) === res.output.length - 1);
                    const out = lines.map(l => ({ type: 'output', text: l }));

                    if (testResult.pass) {
                        setTerminalOutput([
                            ...out,
                            { type: 'success', text: `>> CHÚC MỪNG: Vượt qua tất cả test cases! [100/100]\n>> Báo cáo: ${testResult.msg}` }
                        ]);

                        if (!completedExercises.has(activeExercise.id)) {
                            completeExercise(activeExercise.id, true);
                        }
                        mentorSpeak(`Thầy chúc mừng em! <b>${testResult.msg}</b> Thách thức đã hoàn thành xuất sắc!`);
                        triggerConfettiEffect();
                    } else {
                        setTerminalOutput([
                            ...out,
                            { type: 'error', text: `>> THẤT BẠI: Test case không đạt!\nLý do: ${testResult.msg}` }
                        ]);
                        mentorSpeak(`Chưa đạt rồi em ơi. Gợi ý: <i>${testResult.msg}</i>. Đọc kỹ yêu cầu và thử lại nhé!`);
                    }
                }
            } catch (err) {
                setTerminalOutput([{ type: 'error', text: `❌ Lỗi hệ thống: ${err.message}` }]);
            } finally {
                setIsRunning(false);
            }
        }, 500);
    };

    const triggerConfettiEffect = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    const formatSqlResultsToHtmlTableString = (res) => {
        if (!res || res.length === 0) return '';
        let html = '<table class="terminal-table"><thead><tr>';
        res[0].columns.forEach(col => {
            html += `<th>${col}</th>`;
        });
        html += '</tr></thead><tbody>';
        res[0].values.forEach(row => {
            html += '<tr>';
            row.forEach(val => {
                const displayVal = val === null ? 'NULL' : String(val);
                html += `<td>${displayVal}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        return html;
    };

    const handleExerciseChange = (e) => {
        const id = parseInt(e.target.value);
        saveLastLesson(currentLesson.id, id);
    };

    if (exercises.length === 0) {
        return (
            <section className="tab-panel active" id="panel-practice">
                <div className="practice-layout">
                    <div className="loading-placeholder">Bài học này không yêu cầu thực hành. Hãy chuyển sang Tab khác!</div>
                </div>
            </section>
        );
    }

    if (!activeExercise) return <div className="loading-placeholder">Đang tải bài tập...</div>;

    const instructionsHtml = marked(activeExercise.instructions || '');

    return (
        <section className="tab-panel active" id="panel-practice">
            <div className="practice-layout" ref={layoutRef} style={{ gridTemplateColumns: `${leftWidth}px 5px 1fr` }}>
                
                {/* Khối Trái: Đề bài và Selector */}
                <div className="practice-instructions" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="pane-header practice-instructions-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', gap: '10px' }}>
                        <div className="instructions-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={16} />
                            <span>Yêu cầu đề bài</span>
                        </div>
                        <div className="exercise-selector-wrapper">
                            <select 
                                id="exercise-select" 
                                className="exercise-select-dropdown"
                                value={activeExercise.id}
                                onChange={handleExerciseChange}
                            >
                                {exercises.map((ex, idx) => (
                                    <option key={ex.id} value={ex.id}>
                                        Bài {idx + 1}: {ex.title} {completedExercises.has(ex.id) ? '✓' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div 
                        className="pane-content markdown-body" 
                        style={{ flex: 1, overflowY: 'auto', padding: '15px' }}
                        dangerouslySetInnerHTML={{ __html: instructionsHtml }}
                    />
                </div>

                {/* Thanh kéo H */}
                <div 
                    className={`resizer-horizontal ${isDraggingH ? 'dragging' : ''}`}
                    onMouseDown={startResizeH}
                ></div>

                {/* Khối Phải: Code Editor + Terminal */}
                <div 
                    className="practice-coding-area" 
                    ref={codingRef}
                    style={{ 
                        display: 'grid', 
                        gridTemplateRows: `1fr 6px ${terminalHeight}px`,
                        height: '100%'
                    }}
                >
                    {/* Monaco Editor Pane */}
                    <div className="editor-pane" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                        <div className="pane-header editor-header-bar">
                            <div className="file-name">
                                <FileCode size={16} />
                                <span id="editor-filename">{activeExercise.fileName}</span>
                            </div>
                            <div className="editor-actions">
                                <button className="btn-editor-action" id="btn-reset-code" title="Khôi phục code gốc" onClick={handleReset}>
                                    <RotateCcw size={14} />
                                </button>
                            </div>
                        </div>
                        <div style={{ flex: 1, minHeight: 0 }}>
                            <Editor
                                height="100%"
                                language={isSql ? 'sql' : 'java'}
                                theme="vs-dark"
                                value={editorCode}
                                onChange={handleCodeChange}
                                options={{
                                    fontSize: 14,
                                    fontFamily: "'Fira Code', monospace",
                                    minimap: { enabled: false },
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    roundedSelection: false,
                                    scrollbar: {
                                        verticalScrollbarSize: 10,
                                        horizontalScrollbarSize: 10
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Thanh kéo V */}
                    <div 
                        className={`resizer-vertical ${isDraggingV ? 'dragging' : ''}`}
                        onMouseDown={startResizeV}
                    ></div>

                    {/* Console Terminal */}
                    <div className="terminal-pane" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                        <div className="pane-header terminal-header-bar">
                            <span>Console Terminal</span>
                            <div className="run-buttons">
                                <button className="btn-run" id="btn-run-code" onClick={handleRunSimulation} disabled={isRunning}>
                                    <Play size={12} />
                                    <span>Chạy Thử</span>
                                </button>
                                <button className="btn-submit" id="btn-submit-code" onClick={handleSubmit} disabled={isRunning}>
                                    <CheckSquare size={12} />
                                    <span>Nộp Bài</span>
                                </button>
                            </div>
                        </div>
                        <div className="terminal-body" id="terminal-output" style={{ flex: 1, overflowY: 'auto' }}>
                            {terminalOutput.map((line, idx) => {
                                if (line.type === 'sql-table') {
                                    const res = line.tableData;
                                    return (
                                        <table key={idx} className="terminal-table">
                                            <thead>
                                                <tr>
                                                    {res[0].columns.map((col, cIdx) => <th key={cIdx}>{col}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {res[0].values.map((row, rIdx) => (
                                                    <tr key={rIdx}>
                                                        {row.map((val, vIdx) => (
                                                            <td key={vIdx}>{val === null ? <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>NULL</span> : String(val)}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    );
                                }
                                return (
                                    <span 
                                        key={idx} 
                                        className={`terminal-line ${line.type === 'system' ? 'system-msg' : line.type === 'error' ? 'error-msg' : line.type === 'success' ? 'success-msg' : 'output'}`}
                                    >
                                        {line.text}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PracticeTab;
