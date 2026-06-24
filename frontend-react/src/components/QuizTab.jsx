import React, { useState, useEffect } from 'react';
import { useCourse } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { HelpCircle, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

const QuizTab = () => {
    const { currentLesson, mentorSpeak, quizStates, saveQuizProgress, loading } = useCourse();
    const { user } = useAuth();
    const quizzes = currentLesson ? currentLesson.quizzes || [] : [];

    const username = user ? user.username : 'guest';
    const storageKey = `raize_quiz_state_${username}_l${currentLesson ? currentLesson.id : 0}`;

    const [activeIdx, setActiveIdx] = useState(0);
    const [selectedAns, setSelectedAns] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [showNext, setShowNext] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // Reset trạng thái initialized khi đổi bài học hoặc user
    useEffect(() => {
        setIsInitialized(false);
    }, [currentLesson ? currentLesson.id : 0, username]);

    // Reset state và load dữ liệu từ Database/Context hoặc LocalStorage
    useEffect(() => {
        if (loading || !currentLesson) return;

        let initialState = {
            activeIdx: 0,
            selectedAns: null,
            correctCount: 0,
            showNext: false,
            quizCompleted: false
        };

        const lessonId = currentLesson.id;
        const dbStateJson = quizStates ? quizStates[lessonId] : null;

        if (dbStateJson) {
            try {
                initialState = JSON.parse(dbStateJson);
            } catch (e) {
                console.error("Lỗi parse trạng thái trắc nghiệm từ database:", e);
            }
        } else {
            try {
                const savedState = localStorage.getItem(storageKey);
                if (savedState) {
                    initialState = JSON.parse(savedState);
                }
            } catch (e) {
                console.error("Lỗi đọc trạng thái trắc nghiệm từ LocalStorage:", e);
            }
        }

        setActiveIdx(initialState.activeIdx ?? 0);
        setSelectedAns(initialState.selectedAns ?? null);
        setCorrectCount(initialState.correctCount ?? 0);
        setShowNext(initialState.showNext ?? false);
        setQuizCompleted(initialState.quizCompleted ?? false);
        setIsInitialized(true);
    }, [currentLesson ? currentLesson.id : 0, username, loading]);

    // Tự động lưu trạng thái khi bất kỳ giá trị nào thay đổi (chỉ lưu sau khi đã khởi tạo xong)
    useEffect(() => {
        if (!isInitialized || !currentLesson) return;
        const stateToSave = {
            activeIdx,
            selectedAns,
            correctCount,
            showNext,
            quizCompleted
        };
        // Lưu LocalStorage làm phương án dự phòng/khách
        localStorage.setItem(storageKey, JSON.stringify(stateToSave));
        // Gọi hàm saveQuizProgress của context để đồng bộ với DB
        saveQuizProgress(currentLesson.id, quizCompleted, JSON.stringify(stateToSave));
    }, [activeIdx, selectedAns, correctCount, showNext, quizCompleted, isInitialized, storageKey, currentLesson]);


    if (quizzes.length === 0) {
        return (
            <section className="tab-panel active" id="panel-quiz">
                <div className="quiz-container">
                    <div className="loading-placeholder">Không có câu hỏi trắc nghiệm cho bài học này.</div>
                </div>
            </section>
        );
    }

    const handleOptionSelect = (idx) => {
        if (selectedAns !== null) return; // Chỉ cho phép chọn một lần
        setSelectedAns(idx);
        setShowNext(true);

        const currentQuiz = quizzes[activeIdx];
        if (idx === currentQuiz.answer) {
            setCorrectCount(prev => prev + 1);
            mentorSpeak("Đúng rồi em! Phản xạ xuất sắc. Hãy đọc giải thích chi tiết bên dưới nhé.");
        } else {
            mentorSpeak("Tiếc quá, chưa chính xác rồi em. Đọc lại giải thích để hiểu tại sao sai nhé.");
        }
    };

    const handleNext = () => {
        if (activeIdx + 1 < quizzes.length) {
            setActiveIdx(prev => prev + 1);
            setSelectedAns(null);
            setShowNext(false);
        } else {
            setQuizCompleted(true);
            const scorePct = Math.round((correctCount / quizzes.length) * 100);
            if (scorePct >= 80) {
                mentorSpeak(`Chúc mừng em đã hoàn thành xuất sắc phần trắc nghiệm bài này với điểm số ${scorePct}%! Hãy tiếp tục sang phần Thực hành nhé.`);
            } else {
                mentorSpeak(`Em đã hoàn thành phần trắc nghiệm với điểm số ${scorePct}%. Hãy bấm Làm Lại để ôn tập và đạt điểm tuyệt đối nhé!`);
            }
        }
    };

    const handleRestart = () => {
        setActiveIdx(0);
        setSelectedAns(null);
        setCorrectCount(0);
        setShowNext(false);
        setQuizCompleted(false);

        // Xóa khỏi LocalStorage
        try {
            localStorage.removeItem(storageKey);
        } catch (e) {}

        mentorSpeak("Bắt đầu ôn tập trắc nghiệm lại nhé. Cố gắng đạt điểm số tối đa!");
    };

    // Tính phần trăm tiến trình
    const progressPct = quizCompleted 
        ? 100 
        : Math.round((activeIdx / quizzes.length) * 100);

    if (quizCompleted) {
        const scorePct = Math.round((correctCount / quizzes.length) * 100);
        return (
            <section className="tab-panel active" id="panel-quiz">
                <div className="quiz-container" style={{ padding: '30px', textAlign: 'center' }}>
                    <div style={{ fontSize: '50px', marginBottom: '15px' }}>
                        {scorePct >= 80 ? '🏆' : '📝'}
                    </div>
                    <h3>Kết quả kiểm tra trắc nghiệm</h3>
                    <p style={{ fontSize: '18px', margin: '10px 0' }}>
                        Điểm số: <strong style={{ color: scorePct >= 80 ? 'var(--success)' : 'var(--warning)', fontSize: '24px' }}>{scorePct}%</strong>
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Đúng {correctCount} trên tổng số {quizzes.length} câu hỏi.
                    </p>
                    
                    <button className="btn-run" style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px' }} onClick={handleRestart}>
                        <RefreshCw size={14} />
                        <span>Làm Lại</span>
                    </button>
                </div>
            </section>
        );
    }

    const currentQuiz = quizzes[activeIdx];

    return (
        <section className="tab-panel active" id="panel-quiz">
            <div className="quiz-container">
                <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${progressPct}%` }}></div>
                </div>
                
                <div className="quiz-body" id="quiz-question-card">
                    <div className="quiz-q-num">Câu hỏi {activeIdx + 1} / {quizzes.length}</div>
                    <div className="quiz-question" dangerouslySetInnerHTML={{ __html: currentQuiz.q }} />
                    
                    <div className="quiz-options" id="quiz-options-container">
                        {currentQuiz.options.map((opt, i) => {
                            const isSelected = selectedAns === i;
                            const isCorrect = currentQuiz.answer === i;
                            
                            let optClass = '';
                            if (selectedAns !== null) {
                                if (isCorrect) optClass = 'correct';
                                else if (isSelected) optClass = 'incorrect';
                            }

                            return (
                                <div 
                                    key={i} 
                                    className={`quiz-opt-card ${optClass}`}
                                    onClick={() => handleOptionSelect(i)}
                                    style={{ cursor: selectedAns !== null ? 'default' : 'pointer' }}
                                >
                                    <span className="quiz-opt-marker">{String.fromCharCode(65 + i)}</span>
                                    <span className="quiz-opt-text">{opt}</span>
                                </div>
                            );
                        })}
                    </div>
                    
                    {selectedAns !== null && (
                        <div className="quiz-explanation" id="quiz-explanation-box" style={{ marginTop: '20px', display: 'block' }}>
                            <div className="quiz-explanation-title">
                                <HelpCircle size={16} />
                                <span>Giải Thích Của Mentor:</span>
                            </div>
                            <p>{currentQuiz.explanation}</p>
                        </div>
                    )}
                    
                    {showNext && (
                        <div className="quiz-actions" id="quiz-actions-bar" style={{ display: 'flex', marginTop: '20px' }}>
                            <button className="btn-next-question" id="btn-next-q" onClick={handleNext}>
                                Tiếp Theo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default QuizTab;
