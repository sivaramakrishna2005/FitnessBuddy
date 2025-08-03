import React, { useState, useEffect } from 'react';
import { User, MessageCircle, Target, Utensils, Trophy, Dumbbell } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import UserProfile from './components/UserProfile';
import WorkoutRecommendations from './components/WorkoutRecommendations';
import NutritionGuidance from './components/NutritionGuidance';
import ProgressTracking from './components/ProgressTracking';
import { UserData, Message, WorkoutPlan } from './types';
import { AIService } from './services/AIService';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'profile' | 'workouts' | 'nutrition' | 'progress'>('chat');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your Fitness Buddy! 🏋️‍♂️ I'm here to help you achieve your fitness goals with personalized workouts, nutrition guidance, and motivation. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState<WorkoutPlan[]>([]);
  const aiService = new AIService();
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

//   useEffect(() => {
//    const savedUserData = localStorage.getItem('fitnessUserData');
//    if (savedUserData) {
//      setUserData(JSON.parse(savedUserData));
//    }
//  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await aiService.processMessage(content, userData);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserDataUpdate = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('fitnessUserData', JSON.stringify(data));
  };

  const tabs = [
    { id: 'chat' as const, label: 'Chat', icon: MessageCircle },
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'workouts' as const, label: 'Workouts', icon: Target },
    { id: 'nutrition' as const, label: 'Nutrition', icon: Utensils },
    { id: 'progress' as const, label: 'Progress', icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 transition-all duration-500">
      {/* Header */}
      <header className="bg-gray-800/90 backdrop-blur-sm shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Fitness Buddy</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!userData && (
                <>
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-white text-sm px-3 py-1 border border-blue-500 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setAuthMode('register')}
                    className="text-white text-sm px-3 py-1 border border-emerald-500 rounded-lg hover:bg-emerald-600 transition-all"
                  >
                    Register
                  </button>
                </>
              )}
              {userData && (
                <p className="text-sm font-medium text-white">Hi, {userData.name}!</p>
              )}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Auth Modals */}
      {authMode === 'login' && (
        <Login onClose={() => setAuthMode(null)} onLogin={(data) => { setUserData(data); setAuthMode(null); }} />
      )}
      {authMode === 'register' && (
        <Register onClose={() => setAuthMode(null)} onRegister={(data) => { setUserData(data); setAuthMode(null); }} />
      )}

      {/* Navigation */}
      <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400 shadow-lg'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {activeTab === 'chat' && (
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            userData={userData}
            isLoading={isLoading}
          />
        )}
        
        {activeTab === 'profile' && (
          <UserProfile
            userData={userData}
            onUpdateUserData={handleUserDataUpdate}
          />
        )}
        
        {activeTab === 'workouts' && (
          <WorkoutRecommendations 
            userData={userData} 
            completedWorkouts={completedWorkouts}
            onCompleteWorkout={(workout) => setCompletedWorkouts(prev => [...prev, workout])}
          />
        )}
        
        {activeTab === 'nutrition' && (
          <NutritionGuidance userData={userData} />
        )}
        
        {activeTab === 'progress' && (
          <ProgressTracking 
            userData={userData} 
            completedWorkouts={completedWorkouts}
          />
        )}
      </main>
    </div>
  );
}

export default App;