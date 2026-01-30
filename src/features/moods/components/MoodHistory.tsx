import React from 'react';
import { History } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { MOODS } from '../../../config/constants';
import type { MoodEntry } from '../../../types';

interface MoodHistoryProps {
    moods: MoodEntry[];
}

export const MoodHistory: React.FC<MoodHistoryProps> = ({ moods }) => {
    const { t, language } = useLanguage();

    return (
        <section className="history-section">
            <h2>
                <History size={24} />
                {t.history}
            </h2>
            <div className="history-list">
                {moods.length === 0 ? (
                    <p className="empty-state">{t.noMoods}</p>
                ) : (
                    moods.map((entry) => {
                        const moodData = MOODS.find(m => m.label === entry.mood) || MOODS[2];
                        const Icon = moodData.icon;
                        const label = (t.moods as any)[entry.mood] || entry.mood;
                        return (
                            <div key={entry.id} className="history-item">
                                <div className="mood-icon" style={{ backgroundColor: moodData.color }}>
                                    <Icon size={20} />
                                </div>
                                <div className="mood-info">
                                    <span className="mood-label">{label}</span>
                                    {entry.reason && <p className="mood-reason">{entry.reason}</p>}
                                    <span className="mood-time">
                                        {new Date(entry.timestamp).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};
