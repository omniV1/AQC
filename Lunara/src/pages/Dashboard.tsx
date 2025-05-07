import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Resources } from '../components/dashboard/Resources';
import { WeeklySchedule } from '../components/dashboard/WeeklySchedule';
import { MusicPlayer } from '../components/dashboard/MusicPlayer';
import { Card } from '../components/ui/Card';

export const Dashboard: React.FC = () => {
  const { user, isProvider } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect providers to their dashboard
    if (isProvider) {
      navigate('/provider/dashboard');
    }
  }, [isProvider, navigate]);

  return (
    <div className="min-h-screen bg-cream p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <img 
              src="/images/logo.png"
              alt="Lunara Logo" 
              className="w-48 mx-auto mb-6"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-forest-green mb-2">
            Hello, {user?.firstName || 'there'}
          </h1>
          <p className="text-brown-dark text-lg mb-2">Welcome to Your Client Dashboard</p>
          <p className="text-brown-dark/80">Your postpartum care journey begins here</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Resources Section */}
          <div className="md:col-span-3">
            <Resources />
          </div>

          {/* Weekly Schedule */}
          <div className="md:col-span-5">
            <WeeklySchedule />
          </div>

          {/* Important Dates & Calendar */}
          <div className="md:col-span-4">
            <Card>
              <h2 className="font-serif text-xl text-forest-green mb-4">Important Dates</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-brown-dark">
                  <span>Jun 10</span>
                  <span>Start Care</span>
                </div>
                <div className="flex justify-between text-brown-dark">
                  <span>Jun 28</span>
                  <span>Postpartum Visit</span>
                </div>
              </div>

              {/* Calendar */}
              <div className="mt-8">
                <div className="text-center mb-4">
                  <div className="inline-block bg-olive rounded-full p-4">
                    <span className="text-white text-xl">Jun</span>
                  </div>
                  <h3 className="text-brown-dark mt-2">June 2024</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="text-brown-dark">{day}</div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Music Player */}
          <div className="md:col-span-3">
            <MusicPlayer />
          </div>

          {/* Healing Progress */}
          <div className="md:col-span-5">
            <Card>
              <h2 className="font-serif text-xl text-forest-green mb-4">
                <span className="mr-2">✓</span>
                Healing
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center text-brown-dark">
                  <span className="mr-2">✓</span>
                  Pelvic discomfort
                </li>
                <li className="flex items-center text-brown-dark">
                  <span className="mr-2">✓</span>
                  Abdominal care
                </li>
                <li className="flex items-center text-brown-dark">
                  <span className="mr-2">✓</span>
                  Emotional well being
                </li>
              </ul>
            </Card>
          </div>

          {/* Baby Milestones */}
          <div className="md:col-span-4">
            <Card>
              <h2 className="font-serif text-xl text-forest-green mb-4">
                <span className="mr-2">✓</span>
                Baby Milestones
              </h2>
              <ul className="space-y-2">
                <li className="flex items-center text-brown-dark">
                  <input type="checkbox" className="mr-2 accent-purple" />
                  First outing
                </li>
                <li className="flex items-center text-brown-dark">
                  <input type="checkbox" className="mr-2 accent-purple" />
                  Com-latch
                </li>
                <li className="flex items-center text-brown-dark">
                  <input type="checkbox" className="mr-2 accent-purple" />
                  Bath time
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}; 