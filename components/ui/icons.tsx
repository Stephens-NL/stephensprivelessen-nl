'use client';

import React from 'react';
import { 
  BookOpen, 
  Code, 
  Database, 
  Calculator, 
  Calendar, 
  MessageCircle, 
  ClipboardList,
  LineChart,
  Clock,
  GraduationCap,
  Users,
  Mail
} from 'lucide-react';

const iconMap = {
  PersonalizedLearning: Users,
  ExpertSupport: GraduationCap,
  FlexibleScheduling: Clock,
  Calculator: Calculator,
  Code: Code,
  Database: Database,
  Chat: MessageCircle,
  Plan: ClipboardList,
  Calendar: Calendar,
  Chart: LineChart,
  Book: BookOpen,
  Mail: Mail,
};

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent className={className} />;
} 