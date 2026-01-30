export interface MoodEntry {
    id: number;
    mood: string;
    reason?: string;
    timestamp: string;
}

export interface User {
    id: number;
    username: string;
}

export type Language = 'en' | 'vi';
