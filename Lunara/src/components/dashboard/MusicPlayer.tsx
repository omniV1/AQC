import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../ui/Card';

export const MusicPlayer: React.FC = () => {
  return (
    <Card variant="olive" className="p-4">
      <h2 className="font-serif text-white text-lg mb-2">Gentle Playlist</h2>
      <div className="flex justify-between items-center text-white">
        <button className="hover:opacity-80 transition-opacity">
          <FontAwesomeIcon icon={faBackward} className="cursor-pointer" />
        </button>
        <button className="hover:opacity-80 transition-opacity">
          <FontAwesomeIcon icon={faPlay} className="text-xl cursor-pointer" />
        </button>
        <button className="hover:opacity-80 transition-opacity">
          <FontAwesomeIcon icon={faForward} className="cursor-pointer" />
        </button>
      </div>
    </Card>
  );
}; 