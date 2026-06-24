import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import Editor from '@monaco-editor/react';
import { marked } from 'marked';
import { runCodeEnv } from '../utils/JavaEngine';
import { Play, Trash2, Terminal, TerminalSquare } from 'lucide-react';

marked.setOptions({
    breaks: true,
    gfm: true
});

const handleEditorDidMount = (editor, monaco) => {
    if (!monaco) return;
    
    // Đăng ký các gợi ý tự động cho Java
    if (!window.monacoJavaRegistered) {
        window.monacoJavaRegistered = true;
        try {
            monaco.languages.registerCompletionItemProvider('java', {
                provideCompletionItems: (model, position) => {
                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };
                    
                    // Trích xuất các từ trong văn bản để tự động gợi ý biến/hàm/lớp do người dùng định nghĩa
                    const text = model.getValue();
                    const words = Array.from(new Set(text.match(/\b[a-zA-Z_]\w*\b/g) || []));
                    
                    const javaKeywords = [
                        'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
                        'import', 'package', 'void', 'static', 'final', 'new', 'return', 'this', 'super',
                        'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
                        'try', 'catch', 'finally', 'throw', 'throws', 'const', 'true', 'false', 'null'
                    ];

                    const javaDataTypes = [
                        'int', 'double', 'boolean', 'char', 'float', 'long', 'short', 'byte',
                        'String', 'System', 'Scanner', 'List', 'ArrayList', 'Map', 'HashMap', 'Set', 'HashSet',
                        'Integer', 'Double', 'Boolean', 'Character', 'Object'
                    ];

                    const javaKeywordsSet = new Set([...javaKeywords, ...javaDataTypes]);

                    const wordSuggestions = words
                        .filter(w => !javaKeywordsSet.has(w) && w !== word.word && w.length >= 2)
                        .map(w => ({
                            label: w,
                            kind: monaco.languages.CompletionItemKind.Variable,
                            documentation: 'Ký hiệu/Biến/Hàm tự định nghĩa',
                            insertText: w,
                            range: range
                        }));

                    const keywordSuggestions = javaKeywords.map(kw => ({
                        label: kw,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        documentation: 'Từ khóa Java',
                        insertText: kw,
                        range: range
                    }));

                    const dataTypeSuggestions = javaDataTypes.map(dt => ({
                        label: dt,
                        kind: monaco.languages.CompletionItemKind.Class,
                        documentation: 'Kiểu dữ liệu / Lớp Java',
                        insertText: dt,
                        range: range
                    }));

                    const snippets = [
                        {
                            label: 'psvm',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'public static void main(String[] args)',
                            insertText: 'public static void main(String[] args) {\n    $0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'sout',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'System.out.println()',
                            insertText: 'System.out.println($0);',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'sysout',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'System.out.println()',
                            insertText: 'System.out.println($0);',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'fori',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'for (int i = 0; i < max; i++)',
                            insertText: 'for (int i = 0; i < $1; i++) {\n    $0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'ifelse',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'if-else block',
                            insertText: 'if ($1) {\n    $2\n} else {\n    $0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'scanner',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'Scanner scanner = new Scanner(System.in)',
                            insertText: 'Scanner scanner = new Scanner(System.in);',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'list',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'List<Type> name = new ArrayList<>()',
                            insertText: 'List<$1> list = new ArrayList<>();',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        }
                    ];

                    return { suggestions: [...snippets, ...keywordSuggestions, ...dataTypeSuggestions, ...wordSuggestions] };
                }
            });
        } catch (e) {
            console.error("Lỗi khi đăng ký Java completion provider:", e);
        }
    }

    // Đăng ký các snippet gợi ý cho SQL
    if (!window.monacoSqlRegistered) {
        window.monacoSqlRegistered = true;
        try {
            monaco.languages.registerCompletionItemProvider('sql', {
                provideCompletionItems: (model, position) => {
                    const word = model.getWordUntilPosition(position);
                    const range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    };
                    
                    // Trích xuất các từ trong văn bản để tự động gợi ý bảng/cột
                    const text = model.getValue();
                    const words = Array.from(new Set(text.match(/\b[a-zA-Z_]\w*\b/g) || []));
                    
                    const sqlKeywords = [
                        'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
                        'DELETE', 'JOIN', 'ON', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'GROUP', 'BY',
                        'ORDER', 'LIMIT', 'HAVING', 'AND', 'OR', 'NOT', 'NULL', 'AS', 'CREATE',
                        'TABLE', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES'
                    ];

                    const sqlDataTypes = [
                        'INT', 'INTEGER', 'VARCHAR', 'CHAR', 'TEXT', 'DATE', 'DATETIME', 'TIMESTAMP',
                        'DECIMAL', 'NUMERIC', 'FLOAT', 'DOUBLE', 'BOOLEAN'
                    ];

                    const sqlKeywordsSet = new Set([...sqlKeywords, ...sqlDataTypes].map(kw => kw.toLowerCase()));

                    const wordSuggestions = words
                        .filter(w => !sqlKeywordsSet.has(w.toLowerCase()) && w !== word.word && w.length >= 2)
                        .map(w => ({
                            label: w,
                            kind: monaco.languages.CompletionItemKind.Field,
                            documentation: 'Bảng/Cột/Giá trị tự định nghĩa',
                            insertText: w,
                            range: range
                        }));

                    const keywordSuggestions = sqlKeywords.map(kw => ({
                        label: kw,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        documentation: 'Từ khóa SQL',
                        insertText: kw,
                        range: range
                    }));

                    const dataTypeSuggestions = sqlDataTypes.map(dt => ({
                        label: dt,
                        kind: monaco.languages.CompletionItemKind.Class,
                        documentation: 'Kiểu dữ liệu SQL',
                        insertText: dt,
                        range: range
                    }));

                    const snippets = [
                        {
                            label: 'select',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'SELECT statement',
                            insertText: 'SELECT * FROM $1;',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'insert',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'INSERT INTO statement',
                            insertText: 'INSERT INTO $1 ($2) VALUES ($3);',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'update',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'UPDATE statement',
                            insertText: 'UPDATE $1 SET $2 = $3 WHERE $4;',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        },
                        {
                            label: 'delete',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: 'DELETE statement',
                            insertText: 'DELETE FROM $1 WHERE $2;',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range: range
                        }
                    ];

                    return { suggestions: [...snippets, ...keywordSuggestions, ...dataTypeSuggestions, ...wordSuggestions] };
                }
            });
        } catch (e) {
            console.error("Lỗi khi đăng ký SQL completion provider:", e);
        }
    }
};


const TheoryTab = () => {
    const { currentLesson, mentorSpeak } = useCourse();
    const isSql = currentLesson ? currentLesson.id >= 33 : false;

    // Trạng thái code Sandbox
    const [code, setCode] = useState('');
    // Terminal output
    const [terminalOutput, setTerminalOutput] = useState([
        { type: 'system', text: '💡 Gõ code Java bên trên và nhấn Chạy để xem kết quả ngay!' }
    ]);
    const [isRunning, setIsRunning] = useState(false);

    // Kéo giãn độ rộng cột trái/phải
    const [leftWidth, setLeftWidth] = useState(600); // pixels
    const [isDraggingH, setIsDraggingH] = useState(false);

    // Kéo giãn chiều cao terminal (dọc)
    const [terminalHeight, setTerminalHeight] = useState(180); // pixels
    const [isDraggingV, setIsDraggingV] = useState(false);

    const layoutRef = useRef(null);
    const sandboxRef = useRef(null);

    // Nạp starter code tương ứng khi đổi bài
    useEffect(() => {
        if (!currentLesson) return;
        const starter = isSql
            ? `-- Viết câu truy vấn SQL của bạn ở đây\nSELECT 'Hello, SQL!' AS message;`
            : `public class Sandbox {\n    public static void main(String[] args) {\n        // Thực hành theo lý thuyết bên cạnh\n        System.out.println("Hello, Java!");\n    }\n}`;
        setCode(starter);
        setTerminalOutput([
            { type: 'system', text: isSql ? '💡 Gõ câu lệnh SQL và nhấn Chạy để truy vấn database!' : '💡 Gõ code Java bên trên và nhấn Chạy để xem kết quả ngay!' }
        ]);
    }, [currentLessonIdForTrigger(), isSql]);

    // Helper trigger useEffect when currentLesson.id changes safely
    function currentLessonIdForTrigger() {
        return currentLesson ? currentLesson.id : 1;
    }

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
            if (isDraggingV && sandboxRef.current) {
                const rect = sandboxRef.current.getBoundingClientRect();
                const containerHeight = rect.height;
                let newHeight = rect.bottom - e.clientY;
                if (newHeight < 80) newHeight = 80;
                if (newHeight > containerHeight - 120) newHeight = containerHeight - 120;
                setTerminalHeight(newHeight);
            }
        };

        const handleMouseUp = () => {
            if (isDraggingH) {
                setIsDraggingH(false);
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
            if (isDraggingV) {
                setIsDraggingV(false);
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
            }
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

    const handleClear = () => {
        setCode('');
    };

    const handleRun = () => {
        if (!code.trim()) {
            setTerminalOutput([{ type: 'system', text: 'ℹ️ Chưa có code để chạy. Hãy viết code vào editor!' }]);
            return;
        }

        setTerminalOutput([{ type: 'system', text: '⚙️ Đang biên dịch và chạy...' }]);
        setIsRunning(true);

        setTimeout(async () => {
            try {
                if (isSql) {
                    setTerminalOutput([
                        { type: 'error', text: '⚠️ Chế độ Sandbox lý thuyết hiện chỉ hỗ trợ code Java. Để học và chạy thử SQL, vui lòng sử dụng Tab "Thực Hành IDE"!' }
                    ]);
                    setIsRunning(false);
                    return;
                }

                const res = runCodeEnv(code);
                if (res.success) {
                    const lines = (res.output || '[Chương trình kết thúc nhưng không in ra gì]')
                        .split('\n')
                        .filter(l => l.length > 0 || res.output.indexOf(l) === res.output.length - 1);
                    
                    const out = lines.map(line => ({ type: 'output', text: line }));
                    setTerminalOutput([
                        ...out,
                        { type: 'success', text: '✅ Chạy thành công!' }
                    ]);
                } else {
                    setTerminalOutput([{ type: 'error', text: res.output }]);
                }
            } catch (e) {
                setTerminalOutput([{ type: 'error', text: `❌ Lỗi: ${e.message}` }]);
            } finally {
                setIsRunning(false);
            }
        }, 350);
    };

    if (!currentLesson) return <div className="loading-placeholder">Đang tải bài giảng...</div>;

    const htmlContent = marked(currentLesson.theory || '');

    return (
        <div 
            className="theory-split-layout" 
            ref={layoutRef}
            style={{ gridTemplateColumns: `${leftWidth}px 5px 1fr` }}
        >
            {/* Cột trái: Nội dung Markdown bài giảng */}
            <div className="theory-content-pane">
                <div 
                    className="theory-view markdown-body" 
                    dangerouslySetInnerHTML={{ __html: htmlContent }} 
                />
            </div>

            {/* Thanh kéo ngang */}
            <div 
                className={`theory-resizer ${isDraggingH ? 'dragging' : ''}`}
                onMouseDown={startResizeH}
            ></div>

            {/* Cột phải: Sandbox Monaco Editor */}
            <div 
                className="theory-sandbox-pane" 
                ref={sandboxRef}
                style={{ 
                    display: 'grid', 
                    gridTemplateRows: `auto 1fr 6px ${terminalHeight}px`,
                    height: '100%'
                }}
            >
                <div className="theory-sandbox-header">
                    <div className="theory-sandbox-title">
                        <TerminalSquare size={16} />
                        <span>📝 Sandbox – Code theo lý thuyết</span>
                    </div>
                    <div className="theory-sandbox-actions">
                        <button className="btn-theory-run" onClick={handleRun} disabled={isRunning} title="Chạy code">
                            <Play size={12} />
                            <span>Chạy</span>
                        </button>
                        <button className="btn-theory-clear" onClick={handleClear} title="Xóa code">
                            <Trash2 size={12} />
                        </button>
                    </div>
                </div>

                {/* Monaco Editor Container */}
                <div className="theory-editor-element" style={{ minHeight: 0 }}>
                    <Editor
                        height="100%"
                        language={isSql ? 'sql' : 'java'}
                        theme="vs-dark"
                        value={code}
                        onChange={(val) => setCode(val || '')}
                        onMount={handleEditorDidMount}
                        options={{
                            fontSize: 13,
                            fontFamily: "'Fira Code', monospace",
                            minimap: { enabled: false },
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            roundedSelection: false,
                            scrollbar: {
                                verticalScrollbarSize: 8,
                                horizontalScrollbarSize: 8
                            },
                            quickSuggestions: {
                                other: true,
                                comments: false,
                                strings: false
                            },
                            wordBasedSuggestions: "currentDocument",
                            suggestOnTriggerCharacters: true,
                            acceptSuggestionOnEnter: "on",
                            tabCompletion: "on"
                        }}
                    />
                </div>

                {/* Thanh kéo dọc */}
                <div 
                    className={`resizer-vertical ${isDraggingV ? 'dragging' : ''}`}
                    onMouseDown={startResizeV}
                ></div>

                {/* Terminal Output */}
                <div className="theory-terminal-pane" style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                    <div className="theory-terminal-header">
                        <Terminal size={14} />
                        <span>Kết quả</span>
                    </div>
                    <div className="theory-terminal-body" id="theory-terminal-output" style={{ flex: 1, overflowY: 'auto' }}>
                        {terminalOutput.map((line, idx) => (
                            <span 
                                key={idx} 
                                className={`terminal-line ${line.type === 'system' ? 'system-msg' : line.type === 'error' ? 'error-msg' : line.type === 'success' ? 'success-msg' : 'output'}`}
                            >
                                {line.text}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheoryTab;
