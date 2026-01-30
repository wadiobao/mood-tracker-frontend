import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from '../components/layout/Header';
import { MoodLogger } from '../features/moods/components/MoodLogger';
import { MoodHistory } from '../features/moods/components/MoodHistory';
import { useAuth } from '../hooks/useAuth';
import type { MoodEntry } from '../types';
import { API_URL } from '../config/constants';

export const HomePage: React.FC = () => {
    const [moods, setMoods] = useState<MoodEntry[]>([]);
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const fetchMoods = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`${API_URL}/moods`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMoods(response.data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        } catch (error) {
            console.error('Error fetching moods:', error);
        }
    };

    useEffect(() => {
        fetchMoods();
    }, [token]);

    const handleLogMood = async () => {
        if (!selectedMood || !token) return;
        setLoading(true);
        try {
            await axios.post(`${API_URL}/moods`,
                { mood: selectedMood, reason },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSelectedMood(null);
            setReason('');
            await fetchMoods();
        } catch (error) {
            console.error('Error logging mood:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <Header />
            <main>
                <MoodLogger
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                    reason={reason}
                    setReason={setReason}
                    loading={loading}
                    onLogMood={handleLogMood}
                />
                <MoodHistory moods={moods} />
            </main>
        </div>
    );
};
