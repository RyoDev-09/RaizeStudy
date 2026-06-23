import React from 'react';
import { useCourse } from '../context/CourseContext';
import { BookOpen, Activity, HelpCircle, Code2 } from 'lucide-react';

const TabsBar = () => {
    const { currentTab, setCurrentTab } = useCourse();

    const tabs = [
        { id: 'theory', name: '📘 Lý Thuyết', icon: <BookOpen size={14} /> },
        { id: 'visual', name: '🔬 Trực Quan Hóa', icon: <Activity size={14} /> },
        { id: 'quiz', name: '📝 Trắc Nghiệm', icon: <HelpCircle size={14} /> },
        { id: 'practice', name: '💻 Thực Hành IDE', icon: <Code2 size={14} /> },
    ];

    return (
        <div className="tabs-bar">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    className={`tab-btn ${currentTab === tab.id ? 'active' : ''}`}
                    onClick={() => setCurrentTab(tab.id)}
                >
                    {tab.icon}
                    <span>{tab.name}</span>
                </button>
            ))}
        </div>
    );
};

export default TabsBar;
