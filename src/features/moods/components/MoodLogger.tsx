import React from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';
import { MOODS } from '../../../config/constants';

interface MoodLoggerProps {
    selectedMood: string | null;
    setSelectedMood: (mood: string | null) => void;
    reason: string;
    setReason: (reason: string) => void;
    loading: boolean;
    onLogMood: () => void;
}

export const MoodLogger: React.FC<MoodLoggerProps> = ({
    selectedMood,
    setSelectedMood,
    reason,
    setReason,
    loading,
    onLogMood
}) => {
    const { t } = useLanguage();

    return (
        <div className="card mood-selector">
            <div className="mood-grid">
                {MOODS.map((m) => {
                    const Icon = m.icon;
                    const label = (t.moods as any)[m.label] || m.label;
                    return (
                        <button
                            key={m.label}
                            className={`mood-btn ${selectedMood === m.label ? 'active' : ''}`}
                            onClick={() => setSelectedMood(m.label)}
                            style={{ '--mood-color': m.color } as any}
                        >
                            <Icon size={32} />
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="reason-input">
                <textarea
                    placeholder={t.placeholderReason}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                />
            </div>

            <button
                className="submit-btn"
                disabled={!selectedMood || loading}
                onClick={onLogMood}
            >
                {loading ? t.logging : t.logMood}
                <Send size={18} />
            </button>
        </div>
    );
};
