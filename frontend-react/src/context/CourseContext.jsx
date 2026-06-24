import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const { token, isLoggedIn } = useAuth();
    
    const [lessons, setLessons] = useState([]);
    const [currentLessonId, setCurrentLessonId] = useState(1);
    const [currentExerciseId, setCurrentExerciseId] = useState(null);
    
    const [completedLessons, setCompletedLessons] = useState(new Set());
    const [completedExercises, setCompletedExercises] = useState(new Set());
    const [userCodes, setUserCodes] = useState({});
    const [completedQuizzes, setCompletedQuizzes] = useState(new Set());
    const [quizStates, setQuizStates] = useState({});

    
    const [activeCourse, setActiveCourse] = useState('java'); // 'java' hoặc 'sql'
    const [currentTab, setCurrentTab] = useState('theory'); // 'theory', 'visual', 'quiz', 'practice'
    
    const [loading, setLoading] = useState(true);
    const [mentorMessage, setMentorMessage] = useState("Chào mừng em đến với cổng học lập trình RaizeStudy! Hãy chọn bài học để bắt đầu.");

    // Hàm gọi Mentor nói
    const mentorSpeak = (msg) => {
        setMentorMessage(msg);
    };

    // 1. Fetch toàn bộ danh sách bài học động (public)
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await fetch('/api/lessons');
                if (res.ok) {
                    const data = await res.json();
                    setLessons(data);
                } else {
                    console.error("Lỗi khi tải danh sách bài học");
                }
            } catch (err) {
                console.error("Lỗi kết nối máy chủ:", err);
            }
        };
        fetchLessons();
    }, []);

    // 2. Nạp tiến trình học dựa trên việc đăng nhập
    useEffect(() => {
        const loadProgress = async () => {
            setLoading(true);
            if (isLoggedIn && token) {
                try {
                    const res = await fetch('/api/progress', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setCompletedLessons(new Set(data.completedLessons || []));
                        setCompletedExercises(new Set(data.completedExercises || []));
                        setUserCodes(data.userCodes || {});
                        setCompletedQuizzes(new Set(data.completedQuizzes || []));
                        setQuizStates(data.quizStates || {});
                        
                        const savedLessonId = parseInt(data.currentLessonId) || 1;
                        setCurrentLessonId(savedLessonId);
                        setCurrentExerciseId(data.currentExerciseId ? parseInt(data.currentExerciseId) : null);
                        setActiveCourse(savedLessonId >= 33 ? 'sql' : 'java');
                    }
                } catch (err) {
                    console.error("Lỗi nạp tiến trình học từ DB:", err);
                }
            } else {
                // Chế độ Guest fallback localStorage
                try {
                    const completed = localStorage.getItem('raize_java_completed');
                    const completedEx = localStorage.getItem('raize_java_completed_exercises');
                    const savedCodes = localStorage.getItem('raize_java_codes');
                    const lastL = localStorage.getItem('raize_java_last_lesson');
                    const lastEx = localStorage.getItem('raize_java_last_exercise');
                    const completedQuizzesStr = localStorage.getItem('raize_java_completed_quizzes');
                    const quizStatesStr = localStorage.getItem('raize_java_quiz_states');

                    setCompletedLessons(new Set(completed ? JSON.parse(completed) : []));
                    setCompletedExercises(new Set(completedEx ? JSON.parse(completedEx) : []));
                    setUserCodes(savedCodes ? JSON.parse(savedCodes) : {});
                    setCompletedQuizzes(new Set(completedQuizzesStr ? JSON.parse(completedQuizzesStr) : []));
                    setQuizStates(quizStatesStr ? JSON.parse(quizStatesStr) : {});

                    
                    const savedLessonId = lastL ? parseInt(lastL) : 1;
                    setCurrentLessonId(savedLessonId);
                    setCurrentExerciseId(lastEx ? parseInt(lastEx) : null);
                    setActiveCourse(savedLessonId >= 33 ? 'sql' : 'java');
                } catch (e) {
                    console.error("Lỗi nạp LocalStorage guest:", e);
                }
            }
            setLoading(false);
        };
        loadProgress();
    }, [isLoggedIn, token]);

    // 3. Đánh dấu hoàn thành lý thuyết bài học
    const completeLesson = async (lessonId, completed) => {
        const nextSet = new Set(completedLessons);
        if (completed) nextSet.add(lessonId);
        else nextSet.delete(lessonId);
        setCompletedLessons(nextSet);

        if (isLoggedIn && token) {
            try {
                await fetch('/api/progress/complete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ lessonId, completed })
                });
            } catch (err) {
                console.error("Lỗi đồng bộ completeLesson:", err);
            }
        } else {
            localStorage.setItem('raize_java_completed', JSON.stringify(Array.from(nextSet)));
        }
    };

    // 4. Đánh dấu hoàn thành bài tập thực hành
    const completeExercise = async (exerciseId, completed) => {
        const nextSet = new Set(completedExercises);
        if (completed) nextSet.add(exerciseId);
        else nextSet.delete(exerciseId);
        setCompletedExercises(nextSet);

        if (isLoggedIn && token) {
            try {
                await fetch('/api/progress/exercise/complete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ exerciseId, completed })
                });
            } catch (err) {
                console.error("Lỗi đồng bộ completeExercise:", err);
            }
        } else {
            localStorage.setItem('raize_java_completed_exercises', JSON.stringify(Array.from(nextSet)));
        }
    };

    // 5. Lưu mã nguồn đang làm dở
    const saveCode = async (exerciseId, code) => {
        const nextCodes = { ...userCodes, [exerciseId]: code };
        setUserCodes(nextCodes);

        if (isLoggedIn && token) {
            try {
                await fetch('/api/progress/exercise/code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ exerciseId, code })
                });
            } catch (err) {
                console.error("Lỗi đồng bộ saveCode:", err);
            }
        } else {
            localStorage.setItem('raize_java_codes', JSON.stringify(nextCodes));
        }
    };

    // 6. Lưu vết bài học/bài tập cuối cùng xem
    const saveLastLesson = async (lessonId, exerciseId) => {
        setCurrentLessonId(lessonId);
        setCurrentExerciseId(exerciseId);
        setActiveCourse(lessonId >= 33 ? 'sql' : 'java');

        if (isLoggedIn && token) {
            try {
                await fetch('/api/progress/last-lesson', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ lessonId, exerciseId })
                });
            } catch (err) {
                console.error("Lỗi đồng bộ saveLastLesson:", err);
            }
        } else {
            localStorage.setItem('raize_java_last_lesson', lessonId.toString());
            if (exerciseId) {
                localStorage.setItem('raize_java_last_exercise', exerciseId.toString());
            } else {
                localStorage.removeItem('raize_java_last_exercise');
            }
        }
    };

    // 7. Chuyển đổi khóa học (Java vs SQL)
    const selectCourse = (course) => {
        setActiveCourse(course);
        // Chọn bài học đầu tiên tương ứng của khóa học đó làm mặc định
        const targetLessonId = course === 'sql' ? 33 : 1;
        saveLastLesson(targetLessonId, null);
    };

    // 8. Đồng bộ và lưu tiến độ làm bài trắc nghiệm (Quiz)
    const saveQuizProgress = async (lessonId, completed, stateJson) => {
        const nextSet = new Set(completedQuizzes);
        if (completed) nextSet.add(lessonId);
        else nextSet.delete(lessonId);
        setCompletedQuizzes(nextSet);

        const nextStates = { ...quizStates, [lessonId]: stateJson };
        setQuizStates(nextStates);

        if (isLoggedIn && token) {
            try {
                await fetch('/api/progress/quiz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ lessonId, completed, stateJson })
                });
            } catch (err) {
                console.error("Lỗi đồng bộ saveQuizProgress:", err);
            }
        } else {
            localStorage.setItem('raize_java_completed_quizzes', JSON.stringify(Array.from(nextSet)));
            localStorage.setItem('raize_java_quiz_states', JSON.stringify(nextStates));
        }
    };

    // Lấy thông tin bài học hiện tại đang active
    const currentLesson = lessons.find(l => l.id === currentLessonId) || null;

    return (
        <CourseContext.Provider value={{
            lessons,
            currentLessonId,
            currentExerciseId,
            completedLessons,
            completedExercises,
            userCodes,
            activeCourse,
            currentTab,
            loading,
            mentorMessage,
            currentLesson,
            completedQuizzes,
            quizStates,
            setCurrentTab,
            completeLesson,
            completeExercise,
            saveCode,
            saveLastLesson,
            selectCourse,
            mentorSpeak,
            saveQuizProgress
        }}>

            {children}
        </CourseContext.Provider>
    );
};

export const useCourse = () => useContext(CourseContext);
