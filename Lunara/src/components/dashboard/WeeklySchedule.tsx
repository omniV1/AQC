import React from 'react';
import { Card } from '../ui/Card';

export const WeeklySchedule: React.FC = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <Card>
      <h2 className="font-serif text-xl text-forest-green mb-4">Weekly Care Schedule</h2>
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {days.map((day) => (
          <div key={day} className="text-brown-dark text-sm">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(35)].map((_, i) => (
          <div 
            key={i} 
            className="aspect-square border border-brown-light/20 rounded-sm cursor-pointer hover:bg-sage-light/50 transition-colors"
          />
        ))}
      </div>
    </Card>
  );
}; 