import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';

const Sidebar = ({ isVisible }) => {
    const {
        lessons,
        currentLessonId,
        completedLessons,
        completedExercises,
        activeCourse,
        selectCourse,
        saveLastLesson
    } = useCourse();

    const [expandedPhases, setExpandedPhases] = useState({});

    // Lọc bài học tương ứng với khóa học active
    const filteredLessons = lessons.filter(l => 
        activeCourse === 'sql' ? l.id >= 33 : l.id < 33
    );

    // Tính phần trăm tiến độ
    const totalLessons = filteredLessons.length;
    const completedLessonsCount = filteredLessons.filter(l => completedLessons.has(l.id)).length;
    const progressPct = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    // Gom nhóm bài học theo Phase
    const phases = {};
    filteredLessons.forEach(lesson => {
        if (!phases[lesson.phase]) {
            phases[lesson.phase] = [];
        }
        phases[lesson.phase].push(lesson);
    });

    const togglePhase = (phaseName) => {
        setExpandedPhases(prev => ({
            ...prev,
            [phaseName]: !prev[phaseName]
        }));
    };

    return (
        <aside className={`app-sidebar ${isVisible ? 'visible' : ''}`} id="app-sidebar">
            <div className="sidebar-header">
                <div className="logo-area" style={{ marginBottom: '12px' }}>
                    <div className="logo-icon" id="logo-icon">
                        {activeCourse === 'sql' ? '🗄️' : '☕'}
                    </div>
                    <div className="logo-text">
                        <span className="logo-title">RaizeStudy</span>
                        <span className="logo-subtitle" id="logo-subtitle">
                            {activeCourse === 'sql' ? 'SQL Database Mentor' : 'Java Mentor Portal'}
                        </span>
                    </div>
                </div>
                {/* Course Selector */}
                <div className="course-selector-wrapper" style={{ width: '100%', marginTop: '4px' }}>
                    <select 
                        id="course-select" 
                        className="course-select-dropdown"
                        value={activeCourse}
                        onChange={(e) => selectCourse(e.target.value)}
                    >
                        <option value="java">☕ Học Java Core</option>
                        <option value="sql">🗄️ Học SQL Database</option>
                    </select>
                </div>
            </div>

            {/* Progress Card */}
            <div className="progress-card">
                <div className="progress-info">
                    <span className="progress-label">Tiến độ khóa học</span>
                    <span className="progress-percentage" id="overall-progress-text">{progressPct}%</span>
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar-fill" id="overall-progress-bar" style={{ width: `${progressPct}%` }}></div>
                </div>
                <div className="progress-stats">
                    <span id="completed-count">{completedLessonsCount}</span> / <span id="total-count">{totalLessons}</span> bài học
                </div>
            </div>

            {/* Lessons Navigation list */}
            <nav className="sidebar-nav" id="sidebar-nav">
                {Object.keys(phases).map((phaseName, phaseIndex) => {
                    const isExpanded = expandedPhases[phaseName] !== false; // Mặc định mở
                    return (
                        <div key={phaseIndex} className={`phase-group ${isExpanded ? 'expanded' : ''}`}>
                            <div className="phase-header" onClick={() => togglePhase(phaseName)}>
                                <span className="phase-title">{phaseName}</span>
                                {isExpanded ? <ChevronDown size={14} className="phase-icon-arrow" /> : <ChevronRight size={14} className="phase-icon-arrow" />}
                            </div>
                            
                            <div className="phase-lessons">
                                {phases[phaseName].map(lesson => {
                                    const isActive = lesson.id === currentLessonId;
                                    const isCompleted = completedLessons.has(lesson.id);
                                    
                                    const lessonExercises = lesson.exercises || [];
                                    const completedExCount = lessonExercises.filter(e => completedExercises.has(e.id)).length;
                                    const totalExCount = lessonExercises.length;
                                    
                                    return (
                                        <div 
                                            key={lesson.id} 
                                            className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                            onClick={() => saveLastLesson(lesson.id, null)}
                                        >
                                            <div className="lesson-check-icon">
                                                <Check size={12} />
                                            </div>
                                            <span className="lesson-title-text" title={lesson.title}>
                                                {String(lesson.id).padStart(2, '0')}. {lesson.title}
                                                {totalExCount > 0 && (
                                                    <span className="lesson-ex-count" style={{ opacity: 0.6, fontSize: '0.85em', marginLeft: '4px', fontWeight: 500 }}>
                                                        ({completedExCount}/{totalExCount})
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
