'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trash2, RefreshCw, AlertCircle, Search, Filter, BarChart2, PieChart, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { ChartDataPoint, ChartType, ExpandedEntries, FeedbackData, FilterOption, PieChartDataPoint } from '../../data';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const FeedbackDashboard: React.FC = () => {
    const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
    const [expandedEntries, setExpandedEntries] = useState<ExpandedEntries>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
    const [selectedChart, setSelectedChart] = useState<ChartType>('line');

    useEffect(() => {
        loadData();
    }, []);

    const resetLocalStorage = () => {
        if (window.confirm('Are you sure you want to reset all local storage? This action cannot be undone.')) {
            localStorage.clear();
            setFeedbackData([]);
            setExpandedEntries({});
            alert('Local storage has been reset.');
        }
    };

    const loadData = () => {
        setIsLoading(true);
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem('feedbackData') || '[]') as FeedbackData[];
            setFeedbackData(data);
            setIsLoading(false);
        }, 1000);
    };

    const clearData = () => {
        if (window.confirm('Are you sure you want to clear all feedback data?')) {
            localStorage.removeItem('feedbackData');
            setFeedbackData([]);
            setExpandedEntries({});
        }
    };

    const toggleExpand = (index: number) => {
        setExpandedEntries(prev => ({ ...prev, [index]: !prev[index] }));
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

    const renderChart = () => {
        if (selectedChart === 'line') {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="count" stroke="#8884d8" name="Feedback Count" />
                        <Line yAxisId="right" type="monotone" dataKey="avgRating" stroke="#82ca9d" name="Avg Rating" />
                    </LineChart>
                </ResponsiveContainer>
            );
        } else {
            return (
                <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </RePieChart>
                </ResponsiveContainer>
            );
        }
    };

    const renderFeedbackItem = (entry: FeedbackData, index: number) => (
        <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
            <div
                className="p-4 cursor-pointer flex justify-between items-center border-b border-gray-200"
                onClick={() => toggleExpand(index)}
            >
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">{index + 1}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{entry.generalInfo.learnerName}</h3>
                        <p className="text-sm text-gray-600">{formatDate(entry.timestamp)}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                        <Star className="text-yellow-500 mr-1" size={16} />
                        <span className="font-semibold text-yellow-700">{entry.ratings.overallQuality}</span>
                    </div>
                    {expandedEntries[index] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                </div>
            </div>
            {expandedEntries[index] && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 py-3 bg-gray-50"
                >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">General Info</h4>
                            <p><span className="font-medium">Subject:</span> {entry.generalInfo.subjects.join(', ')}</p>
                            <p><span className="font-medium">Form Type:</span> {entry.formType}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Ratings</h4>
                            {Object.entries(entry.ratings).map(([key, value]) => (
                                <p key={key}><span className="font-medium">{key}:</span> {value}/5</p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Open Feedback</h4>
                        {Object.entries(entry.openFeedback).map(([key, value]) => (
                            value && <p key={key}><span className="font-medium">{key}:</span> {value}</p>
                        ))}
                    </div>
                    {entry.quote.text && (
                        <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-blue-700 mb-2">Quote</h4>
                            <p className="italic">"{entry.quote.text}"</p>
                        </div>
                    )}
                </motion.div>
            )}
        </motion.div>
    );

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">Feedback Analytics Dashboard</h2>
                    <p className="text-blue-100">Analyzing {feedbackData.length} entries</p>
                </div>

                <div className="p-6">
                    <div className="flex justify-between mb-6 flex-wrap gap-4">
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={loadData}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                            >
                                <RefreshCw className="mr-2" size={18} />
                                Refresh Data
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearData}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                            >
                                <Trash2 className="mr-2" size={18} />
                                Clear All Data
                            </motion.button>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search feedback..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            </div>
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value as FilterOption)}
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Ratings</option>
                                <option value="high">High Ratings (4-5)</option>
                                <option value="low">Low Ratings (1-2)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-8 bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xl font-bold">Feedback Trends</h3>
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedChart('line')}
                                    className={`p-2 rounded-md ${selectedChart === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    <BarChart2 size={18} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedChart('pie')}
                                    className={`p-2 rounded-md ${selectedChart === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    <PieChart size={18} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetLocalStorage}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center"
                                >
                                    <RefreshCw className="mr-2" size={18} />
                                    Reset Local Storage
                                </motion.button>
                            </div>
                        </div>
                        {renderChart()}
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <RefreshCw size={48} className="text-blue-500" />
                            </motion.div>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="text-center py-12">
                            <AlertCircle size={48} className="text-yellow-500 mx-auto mb-4" />
                            <p className="text-xl text-gray-600">No matching feedback data available</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredData.map((entry, index) => renderFeedbackItem(entry, index))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackDashboard;