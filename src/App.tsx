import { useState, useEffect } from 'react';
import axios from 'axios';
import { Smile, Frown, Meh, Heart, Coffee, Send, History } from 'lucide-react';
import './App.css';

interface MoodEntry {
  id: number;
  mood: string;
  reason?: string;
  timestamp: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const MOODS = [
  { icon: Heart, label: 'Love', color: '#f472b6' },
  { icon: Smile, label: 'Happy', color: '#fbbf24' },
  { icon: Meh, label: 'Boring', color: '#94a3b8' },
  { icon: Coffee, label: 'Relax', color: '#60a5fa' },
  { icon: Frown, label: 'Sad', color: '#a78bfa' },
];

function App() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMoods = async () => {
    try {
      const response = await axios.get(`${API_URL}/moods`);
      setMoods(response.data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleLogMood = async () => {
    if (!selectedMood) return;
    setLoading(true);
    try {
      await axios.post(`${API_URL}/moods`, { mood: selectedMood, reason });
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
      <header>
        <h1>MoodTracker</h1>
        <p className="subtitle">How are you feeling today?</p>
      </header>

      <main>
        <div className="card mood-selector">
          <div className="mood-grid">
            {MOODS.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.label}
                  className={`mood-btn ${selectedMood === m.label ? 'active' : ''}`}
                  onClick={() => setSelectedMood(m.label)}
                  style={{ '--mood-color': m.color } as any}
                >
                  <Icon size={32} />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          <div className="reason-input">
            <textarea
              placeholder="Why are you feeling this way? (Optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <button
            className="submit-btn"
            disabled={!selectedMood || loading}
            onClick={handleLogMood}
          >
            {loading ? 'Logging...' : 'Log Mood'}
            <Send size={18} />
          </button>
        </div>

        <section className="history-section">
          <h2>
            <History size={24} />
            Recent History
          </h2>
          <div className="history-list">
            {moods.length === 0 ? (
              <p className="empty-state">No moods logged yet. How about one now?</p>
            ) : (
              moods.map((entry) => {
                const moodData = MOODS.find(m => m.label === entry.mood) || MOODS[2];
                const Icon = moodData.icon;
                return (
                  <div key={entry.id} className="history-item">
                    <div className="mood-icon" style={{ backgroundColor: moodData.color }}>
                      <Icon size={20} />
                    </div>
                    <div className="mood-info">
                      <span className="mood-label">{entry.mood}</span>
                      {entry.reason && <p className="mood-reason">{entry.reason}</p>}
                      <span className="mood-time">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
