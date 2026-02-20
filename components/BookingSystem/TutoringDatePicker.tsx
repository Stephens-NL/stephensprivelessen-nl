'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type BookingType = 'single' | 'packet';
type SelectedTimes = Record<string, string>;

const TIME_OPTIONS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'];

function TimeSelector({ date, onTimeSelect }: { date: Date; onTimeSelect: (time: string) => void }) {
  return (
    <Select onValueChange={onTimeSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        {TIME_OPTIONS.map((time) => (
          <SelectItem key={time} value={time}>{time}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const TutoringDatePicker: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [bookingType, setBookingType] = useState<BookingType>('single');
  const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({});

  const handleDateSelect = (days: Date[] | undefined) => {
    if (!days) return;
    
    if (bookingType === 'single') {
      setSelectedDates(days.slice(0, 1));
    } else {
      setSelectedDates(days.slice(0, 4));
    }
  };

  const handleTimeSelect = (date: Date, time: string) => {
    setSelectedTimes({
      ...selectedTimes,
      [date.toDateString()]: time
    });
  };

  const handleBookingTypeChange = (value: BookingType) => {
    setBookingType(value);
    setSelectedDates([]);
    setSelectedTimes({});
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tutoring Session Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={handleBookingTypeChange} defaultValue={bookingType}>
            <SelectTrigger>
              <SelectValue placeholder="Select booking type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Lesson</SelectItem>
              <SelectItem value="packet">4-Hour Lesson Packet</SelectItem>
            </SelectContent>
          </Select>

          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />

          {selectedDates.map((date) => (
            <div key={date.toDateString()} className="flex items-center space-x-2">
              <span>{date.toDateString()}</span>
              <TimeSelector date={date} onTimeSelect={(time) => handleTimeSelect(date, time)} />
            </div>
          ))}

          <Button className="w-full">
            Book {bookingType === 'single' ? 'Lesson' : 'Lesson Packet'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutoringDatePicker;