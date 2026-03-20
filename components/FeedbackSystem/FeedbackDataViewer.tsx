'use client';

import React, { useState, useEffect, useMemo, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trash2, RefreshCw, AlertCircle, Search, Filter, BarChart2, PieChart, Star } from 'lucide-react';
import { ChartDataPoint, ChartType, ExpandedEntries, FeedbackData, FilterOption, PieChartDataPoint } from '../../data';

const FeedbackCharts = dynamic(() => import('./FeedbackCharts').then((mod) => mod.FeedbackCharts), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center text-[var(--muted-text)]">Loading chart...</div>,
});

function FeedbackItem({
  entry,
  index,
  isExpanded,
  onToggle,
  formatDate,
}: {
  entry: FeedbackData;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  formatDate: (s: string) => string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-4 bg-[var(--cream)] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div
        role="button"
        tabIndex={0}
        className="p-4 cursor-pointer flex justify-between items-center border-b border-[var(--border-warm)]"
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-[var(--cream-dark)] rounded-full flex items-center justify-center">
            <span className="text-[var(--ink)] font-semibold text-lg">{index + 1}</span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-[var(--warm-text)]">{entry.generalInfo.learnerName}</h3>
            <p className="text-sm text-[var(--muted-text)]">{formatDate(entry.timestamp)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-[var(--cream-dark)] px-3 py-1 rounded-full">
            <Star className="text-[var(--amber)] mr-1" size={16} />
            <span className="font-semibold text-[var(--amber)]">{entry.ratings.overallQuality}</span>
          </div>
          {isExpanded ? <ChevronUp className="text-[var(--muted-text)]" /> : <ChevronDown className="text-[var(--muted-text)]" />}
        </div>
      </div>
      {isExpanded && (
        <m.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-3 bg-[var(--cream)]"
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-[var(--warm-text)] mb-2">General Info</h4>
              <p><span className="font-medium">Subject:</span> {entry.generalInfo.subjects.join(', ')}</p>
              <p><span className="font-medium">Form Type:</span> {entry.formType}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--warm-text)] mb-2">Ratings</h4>
              {Object.entries(entry.ratings).map(([key, value]) => (
                <p key={key}><span className="font-medium">{key}:</span> {value}/5</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--warm-text)] mb-2">Open Feedback</h4>
            {Object.entries(entry.openFeedback).map(([key, value]) => (
              value ? <p key={key}><span className="font-medium">{key}:</span> {value}</p> : null
            ))}
          </div>
          {entry.quote?.text && (
            <div className="mt-4 bg-[var(--cream-dark)] p-3 rounded-lg">
              <h4 className="font-semibold text-[var(--ink)] mb-2">Quote</h4>
              <p className="italic">&quot;{entry.quote?.text}&quot;</p>
            </div>
          )}
        </m.div>
      )}
    </m.div>
  );
}

type DashboardState = {
    feedbackData: FeedbackData[];
    expandedEntries: ExpandedEntries;
    isLoading: boolean;
    searchTerm: string;
    selectedFilter: FilterOption;
    selectedChart: ChartType;
};

function dashboardReducer(state: DashboardState, action: { type: string; payload?: unknown }): DashboardState {
    switch (action.type) {
        case 'SET_DATA': return { ...state, feedbackData: (action.payload as FeedbackData[]) ?? [] };
        case 'SET_EXPANDED': return { ...state, expandedEntries: (action.payload as ExpandedEntries) ?? {} };
        case 'TOGGLE_EXPAND': {
            const index = action.payload as number;
            return { ...state, expandedEntries: { ...state.expandedEntries, [index]: !state.expandedEntries[index] } };
        }
        case 'SET_LOADING': return { ...state, isLoading: (action.payload as boolean) ?? false };
        case 'SET_SEARCH': return { ...state, searchTerm: (action.payload as string) ?? '' };
        case 'SET_FILTER': return { ...state, selectedFilter: (action.payload as FilterOption) ?? 'all' };
        case 'SET_CHART': return { ...state, selectedChart: (action.payload as ChartType) ?? 'line' };
        case 'RESET': return { ...state, feedbackData: [], expandedEntries: {} };
        default: return state;
    }
}

const initialDashboardState: DashboardState = {
    feedbackData: [],
    expandedEntries: {},
    isLoading: true,
    searchTerm: '',
    selectedFilter: 'all',
    selectedChart: 'line',
};

const FeedbackDashboard: React.FC = () => {
    const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);
    const { feedbackData, expandedEntries, isLoading, searchTerm, selectedFilter, selectedChart } = state;

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: true });
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem('feedbackData') || '[]') as FeedbackData[];
            dispatch({ type: 'SET_DATA', payload: data });
            dispatch({ type: 'SET_LOADING', payload: false });
        }, 1000);
    }, []);

    const resetLocalStorage = () => {
        if (window.confirm('Are you sure you want to reset all local storage? This action cannot be undone.')) {
            localStorage.clear();
            dispatch({ type: 'RESET' });
            alert('Local storage has been reset.');
        }
    };

    const loadData = () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem('feedbackData') || '[]') as FeedbackData[];
            dispatch({ type: 'SET_DATA', payload: data });
            dispatch({ type: 'SET_LOADING', payload: false });
        }, 1000);
    };

    const clearData = () => {
        if (window.confirm('Are you sure you want to clear all feedback data?')) {
            localStorage.removeItem('feedbackData');
            dispatch({ type: 'RESET' });
        }
    };

    const toggleExpand = (index: number) => {
        dispatch({ type: 'TOGGLE_EXPAND', payload: index });
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleString();
    };

    const filteredData = useMemo<FeedbackData[]>(() => {
        return feedbackData
            .filter(entry =>
                JSON.stringify(entry).toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(entry => {
                if (selectedFilter === 'all') return true;
                if (selectedFilter === 'high') return entry.ratings.overallQuality >= 4;
                if (selectedFilter === 'low') return entry.ratings.overallQuality <= 2;
                return true;
            });
    }, [feedbackData, searchTerm, selectedFilter]);

    const chartData = useMemo<ChartDataPoint[]>(() => {
        const data: Record<string, ChartDataPoint> = feedbackData.reduce((acc, entry) => {
            const date = new Date(entry.timestamp).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = { date, count: 0, avgRating: 0 };
            }
            acc[date].count++;
            acc[date].avgRating += entry.ratings.overallQuality;
            return acc;
        }, {} as Record<string, ChartDataPoint>);

        return Object.values(data).map(item => ({
            ...item,
            avgRating: item.avgRating / item.count
        }));
    }, [feedbackData]);

    const pieChartData = useMemo<PieChartDataPoint[]>(() => {
        const data: Record<number, PieChartDataPoint> = feedbackData.reduce((acc, entry) => {
            const rating = Math.round(entry.ratings.overallQuality);
            if (!acc[rating]) {
                acc[rating] = { name: `${rating} Star`, value: 0 };
            }
            acc[rating].value++;
            return acc;
        }, {} as Record<number, PieChartDataPoint>);
        return Object.values(data);
    }, [feedbackData]);

    return (
        <div className="p-6 bg-gradient-to-br from-[var(--cream)] to-[var(--cream-dark)] min-h-screen">
            <div className="max-w-6xl mx-auto bg-[var(--cream)] rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[var(--ink)] to-[var(--ink-light)] p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">Feedback Analytics Dashboard</h2>
                    <p className="text-[var(--cream)]">Analyzing {feedbackData.length} entries</p>
                </div>

                <div className="p-6">
                    <div className="flex justify-between mb-6 flex-wrap gap-4">
                        <div className="flex gap-2">
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={loadData}
                                className="px-4 py-2 bg-[var(--sage)] text-white rounded-md hover:bg-[var(--sage)] flex items-center"
                            >
                                <RefreshCw className="mr-2" size={18} />
                                Refresh Data
                            </m.button>
                            <m.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearData}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                            >
                                <Trash2 className="mr-2" size={18} />
                                Clear All Data
                            </m.button>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search feedback..."
                                    value={searchTerm}
                                    onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
                                />
                                <Search className="absolute left-3 top-2.5 text-[var(--muted-text)]" size={18} />
                            </div>
                            <select
                                value={selectedFilter}
                                onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value as FilterOption })}
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
                            >
                                <option value="all">All Ratings</option>
                                <option value="high">High Ratings (4-5)</option>
                                <option value="low">Low Ratings (1-2)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-8 bg-[var(--cream-dark)] p-4 rounded-lg">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xl font-bold">Feedback Trends</h3>
                            <div className="flex gap-2">
                                <m.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => dispatch({ type: 'SET_CHART', payload: 'line' })}
                                    className={`p-2 rounded-md ${selectedChart === 'line' ? 'bg-[var(--ink)] text-white' : 'bg-[var(--cream-dark)]'}`}
                                >
                                    <BarChart2 size={18} />
                                </m.button>
                                <m.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => dispatch({ type: 'SET_CHART', payload: 'pie' })}
                                    className={`p-2 rounded-md ${selectedChart === 'pie' ? 'bg-[var(--ink)] text-white' : 'bg-[var(--cream-dark)]'}`}
                                >
                                    <PieChart size={18} />
                                </m.button>
                                <m.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetLocalStorage}
                                    className="px-4 py-2 bg-[var(--amber-hover)] text-white rounded-md hover:bg-[var(--amber)] flex items-center"
                                >
                                    <RefreshCw className="mr-2" size={18} />
                                    Reset Local Storage
                                </m.button>
                            </div>
                        </div>
                        <FeedbackCharts chartData={chartData} pieChartData={pieChartData} selectedChart={selectedChart} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <m.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <RefreshCw size={48} className="text-[var(--ink)]" />
                            </m.div>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle size={48} className="text-[var(--amber)] mx-auto mb-4" />
                            <p className="text-xl text-[var(--muted-text)]">No matching feedback data available</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredData.map((entry, index) => (
                                <FeedbackItem
                                    key={entry.id}
                                    entry={entry}
                                    index={index}
                                    isExpanded={!!expandedEntries[index]}
                                    onToggle={() => toggleExpand(index)}
                                    formatDate={formatDate}
                                />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackDashboard;