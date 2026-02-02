import { Heart, Smile, Meh, Coffee, Frown } from 'lucide-react';

export const API_URL = (window as any).env?.API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const GA_MEASUREMENT_ID = (window as any).env?.GA_MEASUREMENT_ID || 'G-code-test';

export const MOODS = [
    { icon: Heart, label: 'Love', color: '#f472b6' },
    { icon: Smile, label: 'Happy', color: '#fbbf24' },
    { icon: Meh, label: 'Boring', color: '#94a3b8' },
    { icon: Coffee, label: 'Relax', color: '#60a5fa' },
    { icon: Frown, label: 'Sad', color: '#a78bfa' },
];
