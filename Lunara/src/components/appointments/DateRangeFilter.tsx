import React from 'react';

interface DateRangeFilterProps {
  onDateRangeChange: (start: Date, end: Date) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');

  const handleDateChange = () => {
    if (startDate && endDate) {
      onDateRangeChange(new Date(startDate), new Date(endDate));
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-brown mb-1">
          From
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            if (endDate) handleDateChange();
          }}
          className="px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
        />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-brown mb-1">
          To
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            if (startDate) handleDateChange();
          }}
          min={startDate}
          className="px-3 py-2 border border-brown/20 rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-purple"
        />
      </div>
      <button
        onClick={() => {
          setStartDate('');
          setEndDate('');
          onDateRangeChange(new Date(0), new Date());
        }}
        className="mt-6 text-brown-dark hover:text-purple text-sm"
      >
        Clear Filter
      </button>
    </div>
  );
}; 