import React, { useState, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';
import { Info, ArrowRight } from 'lucide-react';

const VisualizerTab = () => {
    const { currentLesson, mentorSpeak, mentorMessage } = useCourse();
    
    // States cho từng bài học cụ thể
    const [stepMem, setStepMem] = useState(1); // Cho bài 2, 8, 9

    useEffect(() => {
        // Mỗi lần chuyển bài, reset các bước mô phỏng
        setStepMem(1);
        
        // Gợi ý ban đầu của Mentor khi vào Tab Visualizer
        if (currentLesson) {
            if (currentLesson.id === 1) {
                mentorSpeak("Hãy click vào từng khối (File .java, File .class, Máy ảo JVM) để xem chi tiết cách hoạt động của quy trình biên dịch!");
            } else if (currentLesson.id === 2 || currentLesson.id === 8 || currentLesson.id === 9) {
                mentorSpeak("Click các dòng code Java bên trái để xem cách các ô nhớ Stack & Heap được sinh ra tương ứng trong RAM.");
            } else if (currentLesson.id === 5) {
                mentorSpeak("Click vào các toán tử so sánh bên dưới để xem sự khác biệt giữa so sánh địa chỉ ô nhớ và so sánh giá trị nội dung.");
            } else if (currentLesson.id === 13) {
                mentorSpeak("ArrayList lưu trữ các phần tử liên tục trong RAM giúp truy cập O(1), còn LinkedList lưu trữ các Node liên kết phân tán.");
            } else {
                mentorSpeak(`Bài học số ${currentLesson.id}: ${currentLesson.title}. Hãy học lý thuyết để mở khóa các bài tiếp theo nhé!`);
            }
        }
    }, [currentLesson ? currentLesson.id : 0]);

    if (!currentLesson) return <div className="loading-placeholder">Đang tải mô phỏng...</div>;

    const renderLesson1Visualizer = () => {
        return (
            <div className="vis-compilation-flow">
                <div className="vis-row" style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div className="vis-box" id="vis-flow-java" onClick={() => mentorSpeak("<b>Mã nguồn Java (.java)</b>: Là những dòng lệnh code chữ viết tay bằng ngôn ngữ Java mà con người đọc được. File này cần được biên dịch trước khi chạy.")}>
                        <strong>WelcomeScreen.java</strong>
                        <div className="vis-code-preview" style={{ fontFamily: 'monospace', fontSize: '10px' }}>public class Welcome...</div>
                    </div>
                    <div className="vis-arrow" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#a78bfa' }}>Biên dịch</span>
                        <ArrowRight size={14} style={{ color: '#a78bfa' }} />
                        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#c084fc' }}>javac</span>
                    </div>
                    <div className="vis-box" id="vis-flow-class" onClick={() => mentorSpeak("<b>Tập tin Bytecode (.class)</b>: File trung gian được tạo ra sau khi biên dịch. Chứa các chỉ lệnh nhị phân tối ưu hóa mà chỉ có JVM mới hiểu được, giúp Java đạt slogan 'Run Anywhere'.")}>
                        <strong>WelcomeScreen.class</strong>
                        <div className="vis-code-preview" style={{ fontFamily: 'monospace', fontSize: '10px' }}>CA FE BA BE (Bytecode)</div>
                    </div>
                    <div className="vis-arrow" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#22d3ee' }}>Thông dịch</span>
                        <ArrowRight size={14} style={{ color: '#22d3ee' }} />
                        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#22d3ee' }}>JVM</span>
                    </div>
                    <div className="vis-box" id="vis-flow-os" onClick={() => mentorSpeak("<b>Hệ điều hành & Mã máy</b>: JVM dịch bytecode sang mã máy bản địa (Windows/Linux/Mac) để CPU của máy thực thi trực tiếp, hiển thị kết quả.")}>
                        <strong>Hệ Điều Hành</strong>
                        <div className="vis-code-preview" style={{ fontFamily: 'monospace', fontSize: '10px' }}>Mã máy (Binaries)</div>
                    </div>
                </div>
                
                <div className="vis-jvm" id="vis-flow-jvm-box" style={{ marginTop: '25px' }}>
                    <div className="vis-jvm-title">Bên trong Máy ảo Java (JVM)</div>
                    <div className="vis-jvm-memory">
                        <div className="vis-mem-block">
                            <div className="vis-mem-title">Method Area</div>
                            <span style={{ color: 'var(--text-secondary)' }}>Tải file .class và chứa cấu trúc class</span>
                        </div>
                        <div className="vis-mem-block">
                            <div className="vis-mem-title">JVM Stack</div>
                            <span style={{ color: 'var(--text-secondary)' }}>Quản lý luồng chạy, biến cục bộ</span>
                        </div>
                        <div className="vis-mem-block">
                            <div className="vis-mem-title">Heap Area</div>
                            <span style={{ color: 'var(--text-secondary)' }}>Lưu trữ các đối tượng khởi tạo</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const handleStepClick = (step) => {
        setStepMem(step);
        if (step === 1) {
            mentorSpeak("<b>int age = 20;</b>: Biến nguyên thủy (primitive) được lưu trực tiếp giá trị trị số nguyên `20` ngay trong ngăn xếp Stack của hàm main.");
        } else if (step === 2) {
            mentorSpeak("<b>String name = \"Raize\";</b>: Biến `name` ở Stack thực chất chỉ giữ **địa chỉ con trỏ** `0x101`. Đối tượng chuỗi thực sự nằm ở Heap, cụ thể là vùng tối ưu **String Pool**.");
        } else if (step === 3) {
            mentorSpeak("<b>Dog d1 = new Dog(\"Ruby\");</b>: Từ khóa `new` bắt buộc tạo ra một vùng nhớ trống ở Heap (địa chỉ `0x202`) để chứa thông tin các trường của đối tượng Dog. `d1` ở Stack trỏ đến địa chỉ đó.");
        } else if (step === 4) {
            mentorSpeak("<b>Dog d2 = d1;</b>: Đây là điểm newbie rất hay sai! Phép gán đối tượng chỉ sao chép **địa chỉ ô nhớ** (`0x202`) từ `d1` sang `d2` chứ KHÔNG tạo thêm chú chó thứ hai ở Heap. Sửa thuộc tính qua `d2` sẽ làm thay đổi cả `d1`!");
        }
    };

    const renderMemoryVisualizer = () => {
        return (
            <div className="vis-mem-layout">
                {/* Dòng Code */}
                <div className="vis-code-panel">
                    <div className="vis-pane-title">Đoạn code Java mẫu</div>
                    <div 
                        className={`vis-code-line ${stepMem === 1 ? 'current' : ''}`} 
                        onClick={() => handleStepClick(1)}
                    >
                        1: int age = 20;
                    </div>
                    <div 
                        className={`vis-code-line ${stepMem === 2 ? 'current' : ''}`} 
                        onClick={() => handleStepClick(2)}
                    >
                        2: String name = "Raize";
                    </div>
                    <div 
                        className={`vis-code-line ${stepMem === 3 ? 'current' : ''}`} 
                        onClick={() => handleStepClick(3)}
                    >
                        3: Dog d1 = new Dog("Ruby");
                    </div>
                    <div 
                        className={`vis-code-line ${stepMem === 4 ? 'current' : ''}`} 
                        onClick={() => handleStepClick(4)}
                    >
                        4: Dog d2 = d1;
                    </div>
                </div>
                
                {/* Stack Pane */}
                <div className="vis-pane">
                    <div className="vis-pane-title">Bộ nhớ STACK (Ngăn xếp)</div>
                    <div className="vis-pane-content" id="vis-stack-content">
                        <div className="vis-stack-frame">
                            <div style={{ fontWeight: 700, fontSize: '11px', color: 'var(--accent-purple)' }}>main() frame</div>
                            
                            {stepMem >= 1 && (
                                <div className="vis-var">
                                    <span>age (int)</span>
                                    <span style={{ color: 'var(--success)' }}>20</span>
                                </div>
                            )}
                            {stepMem >= 2 && (
                                <div className="vis-var">
                                    <span>name (String)</span>
                                    <span style={{ color: 'var(--accent-cyan)' }}>0x101 (addr)</span>
                                </div>
                            )}
                            {stepMem >= 3 && (
                                <div className="vis-var">
                                    <span>d1 (Dog)</span>
                                    <span style={{ color: 'var(--accent-purple)' }}>0x202 (addr)</span>
                                </div>
                            )}
                            {stepMem >= 4 && (
                                <div className="vis-var">
                                    <span>d2 (Dog)</span>
                                    <span style={{ color: 'var(--accent-purple)' }}>0x202 (addr)</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Heap Pane */}
                <div className="vis-pane">
                    <div className="vis-pane-title">Bộ nhớ HEAP (Đống)</div>
                    <div className="vis-pane-content" id="vis-heap-content">
                        {stepMem === 1 && (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '20px' }}>Trống</div>
                        )}
                        
                        {stepMem >= 2 && (
                            <div className="vis-string-pool-block">
                                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '4px' }}>String Constant Pool</div>
                                <div className="vis-heap-object" style={{ borderColor: 'var(--accent-cyan)' }}>
                                    <div className="vis-obj-addr">0x101</div>
                                    <div className="vis-obj-type">String Object</div>
                                    <div>value: "Raize"</div>
                                </div>
                            </div>
                        )}

                        {stepMem >= 3 && (
                            <div style={{ marginTop: '10px' }}>
                                <div className="vis-heap-object">
                                    <div className="vis-obj-addr">0x202</div>
                                    <div className="vis-obj-type">
                                        Dog Object {stepMem === 4 && <span style={{ color: 'var(--warning)', fontSize: '9px' }}>(d1 & d2 trỏ chung)</span>}
                                    </div>
                                    <div>name: "Ruby" (String)</div>
                                    <div>age: 0 (default)</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderStringPoolVisualizer = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="vis-pane">
                        <div className="vis-pane-title">Khai Báo Dòng Code</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '2.0', padding: '10px' }}>
                            String s1 = "Hi";<br />
                            String s2 = "Hi";<br />
                            String s3 = new String("Hi");
                        </div>
                    </div>
                    <div className="vis-pane">
                        <div className="vis-pane-title">Sơ Đồ Bộ Nhớ RAM</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', position: 'relative', height: '130px' }}>
                            <div style={{ position: 'absolute', left: '10px', top: '10px', border: '1px solid #fff', padding: '4px', borderRadius: '4px' }}>s1 (Stack)</div>
                            <div style={{ position: 'absolute', left: '10px', top: '50px', border: '1px solid #fff', padding: '4px', borderRadius: '4px' }}>s2 (Stack)</div>
                            <div style={{ position: 'absolute', left: '10px', top: '90px', border: '1px solid #fff', padding: '4px', borderRadius: '4px' }}>s3 (Stack)</div>
                            
                            <div style={{ position: 'absolute', right: '10px', top: '10px', border: '1.5px dashed var(--accent-cyan)', padding: '10px', borderRadius: '8px', width: '140px', textAlign: 'center' }}>
                                <div style={{ fontSize: '9px', color: 'var(--accent-cyan)' }}>String Pool (Heap)</div>
                                <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', padding: '2px', borderRadius: '4px', marginTop: '4px' }}>"Hi" (0x55)</div>
                            </div>
                            
                            <div style={{ position: 'absolute', right: '10px', top: '85px', border: '1px solid var(--accent-purple)', padding: '4px', borderRadius: '4px', width: '140px', textAlign: 'center', fontSize: '10px' }}>
                                String Object (0x99)<br />
                                value -{'>'} 0x55
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="vis-pane">
                    <div className="vis-pane-title">Kết quả các phép so sánh</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px' }}>
                        <button className="btn-run" style={{ padding: '10px' }} onClick={() => mentorSpeak("<b>s1 == s2 => TRUE</b>: Cả s1 và s2 đều được khai báo dạng literal chuỗi cứng. Java tối ưu bộ nhớ bằng cách trỏ cả hai biến tới chung một địa chỉ `0x55` trong String Pool. So sánh địa chỉ `==` trả về `true`.")}>
                            So sánh s1 == s2 (Địa chỉ)
                        </button>
                        <button className="btn-run" style={{ padding: '10px' }} onClick={() => mentorSpeak("<b>s1 == s3 => FALSE</b>: s3 dùng từ khóa `new` nên Java ép buộc sinh ra một đối tượng String độc lập trong bộ nhớ Heap chung (địa chỉ `0x99`). So sánh địa chỉ `0x55 == 0x99` trả về `false` mặc dù nội dung chữ đều là 'Hi'!")}>
                            So sánh s1 == s3 (Địa chỉ)
                        </button>
                        <button className="btn-run" style={{ padding: '10px' }} onClick={() => mentorSpeak("<b>s1.equals(s3) => TRUE</b>: Phương thức `.equals()` của lớp String được thiết kế để nhảy vào ô nhớ so sánh từng ký tự bên trong chuỗi. Vì cả hai đều chứa chữ 'H' và 'i', kết quả trả về luôn là `true`. Hãy luôn dùng `.equals()` nhé!")}>
                            So sánh s1.equals(s3) (Nội dung)
                        </button>
                        <button className="btn-run" style={{ padding: '10px' }} onClick={() => mentorSpeak("<b>s1.equals(s2) => TRUE</b>: So sánh nội dung hai chuỗi giống nhau, trả về `true`.")}>
                            So sánh s1.equals(s2) (Nội dung)
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderCollectionsVisualizer = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                <div className="vis-pane">
                    <div className="vis-pane-title">ArrayList (Mảng Động Liên Tục)</div>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', margin: '15px 0' }}>
                        <div style={{ border: '1px solid #fff', padding: '12px', width: '50px', textAlign: 'center', background: 'var(--bg-tertiary)' }}>[0]<br />12</div>
                        <div style={{ border: '1px solid #fff', padding: '12px', width: '50px', textAlign: 'center', background: 'var(--bg-tertiary)' }}>[1]<br />45</div>
                        <div style={{ border: '1px solid #fff', padding: '12px', width: '50px', textAlign: 'center', background: 'var(--bg-tertiary)' }}>[2]<br />85</div>
                        <div style={{ border: '1.5px dashed var(--text-muted)', padding: '12px', width: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>[3]<br />-</div>
                        <div style={{ border: '1.5px dashed var(--text-muted)', padding: '12px', width: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>[4]<br />-</div>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '0 10px' }}>
                        Tốc độ truy cập cực nhanh qua index: <b>O(1)</b>. Nhược điểm: Chèn/Xóa ở giữa rất chậm vì phải dịch chuyển các phần tử phía sau.
                    </p>
                </div>
                
                <div className="vis-pane">
                    <div className="vis-pane-title">LinkedList (Danh Sách Liên Kết Móc Nối)</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', margin: '15px 0', flexWrap: 'wrap' }}>
                        <div style={{ border: '1px solid var(--accent-purple)', padding: '8px', borderRadius: '6px', background: 'var(--bg-tertiary)', fontSize: '11px', textAlign: 'center' }}>
                            Node [0]<br />Val: 12<br />Next -{'>'} [1]
                        </div>
                        <div style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>→</div>
                        <div style={{ border: '1px solid var(--accent-purple)', padding: '8px', borderRadius: '6px', background: 'var(--bg-tertiary)', fontSize: '11px', textAlign: 'center' }}>
                            Node [1]<br />Val: 45<br />Next -{'>'} [2]
                        </div>
                        <div style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>→</div>
                        <div style={{ border: '1px solid var(--accent-purple)', padding: '8px', borderRadius: '6px', background: 'var(--bg-tertiary)', fontSize: '11px', textAlign: 'center' }}>
                            Node [2]<br />Val: 85<br />Next -{'>'} null
                        </div>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '0 10px' }}>
                        Chèn/Xóa cực nhanh chỉ cần thay đổi móc nối địa chỉ: <b>O(1)</b>. Nhược điểm: Tìm kiếm phần tử rất chậm vì phải duyệt từ đầu danh sách: <b>O(N)</b>.
                    </p>
                </div>
            </div>
        );
    };

    const renderGenericVisualizer = () => {
        const isSqlLesson = currentLesson.id >= 33;
        const isLessonCompleted = currentLesson ? currentLesson.theory && currentLesson.theory.length > 0 : false;
        
        return (
            <div style={{ textAlign: 'center', padding: '30px' }}>
                <div className="logo-icon" style={{ fontSize: '60px', marginBottom: '15px', color: 'var(--accent-purple)' }}>
                    {isSqlLesson ? '🗄️' : '☕'}
                </div>
                <h4>Bài học: {currentLesson.title}</h4>
                <p style={{ color: 'var(--text-secondary)', margin: '10px 0', fontSize: '14px' }}>
                    Mức độ: <b>{currentLesson.difficulty}</b> | Thời lượng: <b>{currentLesson.time}</b>
                </p>
                <div style={{ marginTop: '20px', padding: '15px', borderRadius: '10px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'inline-block' }}>
                    Trạng thái: <span style={{ color: 'var(--warning)', fontWeight: 700 }}>⏳ ĐANG HỌC</span>
                </div>
            </div>
        );
    };

    const renderVisualizerContent = () => {
        if (currentLesson.id === 1) {
            return renderLesson1Visualizer();
        } else if (currentLesson.id === 2 || currentLesson.id === 8 || currentLesson.id === 9) {
            return renderMemoryVisualizer();
        } else if (currentLesson.id === 5) {
            return renderStringPoolVisualizer();
        } else if (currentLesson.id === 13) {
            return renderCollectionsVisualizer();
        } else {
            return renderGenericVisualizer();
        }
    };

    return (
        <section className="tab-panel active" id="panel-visual">
            <div className="visualizer-container">
                <div className="visualizer-header">
                    <h3 id="visualizer-title">
                        {currentLesson.id === 1 && "Sơ Đồ Biên Dịch Và Thực Thi Trong Java"}
                        {(currentLesson.id === 2 || currentLesson.id === 8 || currentLesson.id === 9) && "Trực Quan Hóa Ô Nhớ Stack & Heap Trong RAM"}
                        {currentLesson.id === 5 && "Trực Quan Hóa String Pool - So sánh String"}
                        {currentLesson.id === 13 && "Trực Quan Hóa Cấu Trúc Dữ Liệu ArrayList vs LinkedList"}
                        {currentLesson.id !== 1 && currentLesson.id !== 2 && currentLesson.id !== 8 && currentLesson.id !== 9 && currentLesson.id !== 5 && currentLesson.id !== 13 && "Trực Quan Hóa Trạng Thái Bài Học"}
                    </h3>
                    <p id="visualizer-description">
                        {currentLesson.id === 1 && "Click vào từng khối trong chu trình dịch code để xem chi tiết cách hoạt động."}
                        {(currentLesson.id === 2 || currentLesson.id === 8 || currentLesson.id === 9) && "Click vào từng dòng code Java bên trái để xem các ô dữ liệu được sinh ra trong bộ nhớ RAM."}
                        {currentLesson.id === 5 && "Click vào các toán tử so sánh bên dưới để xem sự khác biệt giữa so sánh địa chỉ và so sánh nội dung."}
                        {currentLesson.id === 13 && "Click các nút để xem cơ chế lưu trữ phần tử trong RAM khác nhau thế nào."}
                        {currentLesson.id !== 1 && currentLesson.id !== 2 && currentLesson.id !== 8 && currentLesson.id !== 9 && currentLesson.id !== 5 && currentLesson.id !== 13 && "Tiến độ học tập và mục tiêu tiếp cận."}
                    </p>
                </div>
                
                <div className="visualizer-body" id="visualizer-viewport" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {renderVisualizerContent()}
                </div>

                {/* Visualizer Explanation Box */}
                <div className="visualizer-explanation" id="visualizer-explanation" style={{ display: 'block', marginTop: '20px' }}>
                    <div className="explanation-title">
                        <Info size={16} />
                        <span>Giải thích của Mentor</span>
                    </div>
                    <div 
                        className="explanation-content" 
                        id="visualizer-explanation-text" 
                        dangerouslySetInnerHTML={{ __html: mentorMessage }}
                    />
                </div>
            </div>
        </section>
    );
};

export default VisualizerTab;
