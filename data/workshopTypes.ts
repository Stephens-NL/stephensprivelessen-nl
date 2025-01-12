import { Bilingual } from './types';

export type WorkshopType = 'academic' | 'creative';
export type WorkshopLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional' | 'all_levels';
export type WorkshopFormat = 'interactive' | 'practical' | 'technical' | 'creative' | 'professional' | 'media' | 'flexible' | 'hands-on' | 'wellness';
export type WorkshopSchedule = 'single' | 'weekly' | 'monthly';

export interface Workshop {
    id: string;
    type: WorkshopType;
    title: Bilingual;
    description: Bilingual;
    durationMinutes: number;
    durationText: Bilingual;
    level: WorkshopLevel;
    format: WorkshopFormat;
    details: {
        EN: string[];
        NL: string[];
    };
    price: Bilingual;
    maxParticipants: number;
    prerequisites: Bilingual;
    materials: Bilingual;
    location: Bilingual;
    schedule: WorkshopSchedule;
}

export interface Workshops {
    [key: string]: Workshop;
} 