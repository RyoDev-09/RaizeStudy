import React from 'react';
import { useCourse } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import { Menu, ChevronRight, Clock, Zap, Circle, CheckCircle, LogIn, User, LogOut } from 'lucide-react';

const Header = ({ onOpenAuth, onToggleSidebar }) => {
    const { currentLesson, completedLessons, completeLesson, currentLessonId } = useCourse();
    const { isLoggedIn, user, logout } = useAuth();

    const isLessonCompleted = currentLesson ? completedLessons.has(currentLesson.id) : false;

    const handleCompleteToggle = () => {
        if (!currentLesson) return;
        completeLesson(currentLesson.id, !isLessonCompleted);
    };

    return (
        <header className="main-header">
            <button className="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle Sidebar" onClick={onToggleSidebar}>
                <Menu size={18} />
            </button>
            
            <div className="header-breadcrumbs">
                <span className="breadcrumb-phase" id="header-phase-name">
                    {currentLesson ? currentLesson.phase : 'Phase 1: Fundamentals'}
                </span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-lesson" id="header-lesson-title">
                    {currentLesson ? `${String(currentLesson.id).padStart(2, '0')}. ${currentLesson.title}` : 'Đang tải...'}
                </span>
            </div>
            
            <div className="header-actions">
                {currentLesson && (
                    <>
                        <div className="lesson-meta-pill">
                            <Clock size={14} />
                            <span id="header-lesson-time">{currentLesson.time}</span>
                        </div>
                        <div className="lesson-meta-pill">
                            <Zap size={14} />
                            <span id="header-lesson-difficulty">{currentLesson.difficulty}</span>
                        </div>
                        <button 
                            className={`btn-complete-lesson ${isLessonCompleted ? 'completed' : ''}`}
                            onClick={handleCompleteToggle}
                        >
                            {isLessonCompleted ? <CheckCircle size={14} /> : <Circle size={14} />}
                            <span>{isLessonCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
                        </button>
                    </>
                )}

                {/* Auth Section */}
                <div className="user-auth-section" id="user-auth-section">
                    {!isLoggedIn ? (
                        <button className="btn-auth-trigger" id="btn-login-trigger" onClick={onOpenAuth}>
                            <LogIn size={14} />
                            <span>Đăng nhập</span>
                        </button>
                    ) : (
                        <div className="user-profile-menu" id="user-profile-menu" style={{ display: 'flex' }}>
                            <User size={14} className="user-avatar-icon" />
                            <span className="username-display" id="username-display">
                                {user ? user.username : 'Học viên'}
                            </span>
                            <button className="btn-logout" id="btn-logout" title="Đăng xuất" onClick={logout}>
                                <LogOut size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
