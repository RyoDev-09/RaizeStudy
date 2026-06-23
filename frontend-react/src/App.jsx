import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CourseProvider, useCourse } from './context/CourseContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TabsBar from './components/TabsBar';
import AuthModal from './components/AuthModal';
import TheoryTab from './components/TheoryTab';
import VisualizerTab from './components/VisualizerTab';
import QuizTab from './components/QuizTab';
import PracticeTab from './components/PracticeTab';
import { GraduationCap, Activity, Code2, HelpCircle } from 'lucide-react';

const MainAppContent = () => {
    const { isLoggedIn, login } = useAuth();
    const { currentTab, loading } = useCourse();
    
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isGuestMode, setIsGuestMode] = useState(false);

    // Màn hình loading lúc đang xác thực token
    if (loading && isLoggedIn) {
        return (
            <div className="loading-placeholder" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                Đang tải dữ liệu học tập...
            </div>
        );
    }

    // Hiển thị màn hình Intro Landing nếu chưa đăng nhập và không chọn Học thử
    if (!isLoggedIn && !isGuestMode) {
        return (
            <div className="intro-container" id="intro-container" style={{ display: 'flex' }}>
                <div className="intro-content">
                    <div className="intro-logo">
                        <span className="intro-logo-icon">☕</span>
                        <div className="intro-logo-text">
                            <span className="intro-logo-title">RaizeStudy</span>
                            <span className="intro-logo-subtitle">Java Mentor Portal</span>
                        </div>
                    </div>
                    
                    <h1 className="intro-headline">Cổng Học Lập Trình Java & SQL Cao Cấp</h1>
                    <p className="intro-subheadline">
                        Trực quan hóa bộ nhớ Stack & Heap, thực hành viết code trực tuyến và củng cố kiến thức cùng Mentor ảo đồng hành.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-intro-start" id="btn-intro-start" onClick={() => setIsAuthOpen(true)}>
                            <GraduationCap size={18} />
                            <span>Bắt Đầu Đăng Nhập Để Học</span>
                        </button>
                        <button 
                            className="btn-intro-start" 
                            style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                            onClick={() => setIsGuestMode(true)}
                        >
                            <span>Học Thử (Chế độ Guest)</span>
                        </button>
                    </div>
                    
                    <div className="intro-features">
                        <div className="intro-feature-card">
                            <div className="feature-icon-wrapper">
                                <Activity size={20} />
                            </div>
                            <h3>Trực Quan Hóa Bộ Nhớ</h3>
                            <p>Mô phỏng bộ nhớ Stack & Heap thay đổi trực quan sau mỗi câu lệnh, nắm vững bản chất tham chiếu.</p>
                        </div>
                        
                        <div className="intro-feature-card">
                            <div className="feature-icon-wrapper">
                                <Code2 size={20} />
                            </div>
                            <h3>IDE Thực Hành Trực Tuyến</h3>
                            <p>Viết code Java, thực thi truy vấn SQL trực tiếp trong trình duyệt với bộ testcase chấm điểm tự động.</p>
                        </div>
                        
                        <div className="intro-feature-card">
                            <div className="feature-icon-wrapper">
                                <HelpCircle size={20} />
                            </div>
                            <h3>Trắc Nghiệm & Bài Tập</h3>
                            <p>Hệ thống hơn 135 bài tập khuyết và câu hỏi trắc nghiệm phản xạ giúp nhớ lâu kiến thức cốt lõi.</p>
                        </div>
                    </div>
                </div>

                <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            </div>
        );
    }

    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    const handleLoginTriggerOnBanner = () => {
        setIsAuthOpen(true);
        setIsGuestMode(false);
    };

    return (
        <div className="app-container">
            {/* Sidebar điều hướng bài học */}
            <Sidebar isVisible={isSidebarVisible} />

            {/* Khối nội dung chính bên phải */}
            <main className="app-main">
                <Header 
                    onOpenAuth={() => setIsAuthOpen(true)} 
                    onToggleSidebar={toggleSidebar} 
                />

                {/* Banner cảnh báo chế độ Guest nếu chưa đăng nhập */}
                {!isLoggedIn && (
                    <div className="guest-mode-banner" id="guest-mode-banner">
                        <div className="guest-banner-text">
                            <strong>⚠️ Chế độ xem thử:</strong> Đăng nhập hoặc tạo tài khoản học tập để tự động lưu tiến độ học tập, câu trả lời trắc nghiệm và code của bạn vào cơ sở dữ liệu!
                        </div>
                        <button className="guest-banner-action" onClick={handleLoginTriggerOnBanner}>
                            Đăng nhập / Đăng ký
                        </button>
                    </div>
                )}

                <TabsBar />

                <div className="tabs-content" style={{ flex: 1, minHeight: 0 }}>
                    {currentTab === 'theory' && <TheoryTab />}
                    {currentTab === 'visual' && <VisualizerTab />}
                    {currentTab === 'quiz' && <QuizTab />}
                    {currentTab === 'practice' && <PracticeTab />}
                </div>
            </main>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <CourseProvider>
                <MainAppContent />
            </CourseProvider>
        </AuthProvider>
    );
};

export default App;
