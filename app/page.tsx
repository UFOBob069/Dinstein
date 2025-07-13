'use client';

import { useState, useRef } from 'react';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import MealPlannerForm from './components/MealPlannerForm';
import RestaurantFlow, { RestaurantData } from './components/RestaurantFlow';
import IngredientRain from './components/IngredientRain';

// Define the Suggestion type
interface Suggestion {
  restaurant: string;
  menuItem: string;
  description: string;
}

const RAIN_DURATION = 2000;

export default function Home() {
  const [mode, setMode] = useState<'meal_prep' | 'restaurant'>('meal_prep');
  const [restaurantSuggestions, setRestaurantSuggestions] = useState<Suggestion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showRain, setShowRain] = useState(false);

  const restaurantResultsRef = useRef<HTMLDivElement>(null);

  const handleRestaurantSubmit = async (data: RestaurantData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/restaurantRecommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setRestaurantSuggestions(result.suggestions);
        // Trigger rain and scroll
        setShowRain(true);
        setTimeout(() => {
          restaurantResultsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
        setTimeout(() => setShowRain(false), RAIN_DURATION);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setRestaurantSuggestions(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {showRain && <IngredientRain />}
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode Selector - Always visible at the top */}
        <ModeSelector mode={mode} onModeChange={setMode} />
        
        {/* Content based on selected mode */}
        {mode === 'meal_prep' ? (
          <MealPlannerForm />
        ) : (
          <div className="space-y-8">
            <RestaurantFlow onSubmit={handleRestaurantSubmit} loading={loading} />
            {restaurantSuggestions && (
              <div
                ref={restaurantResultsRef}
                className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto p-8"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="plate">🍽️</span> Here&apos;s what I found for you:
                </h3>
                <div className="space-y-4">
                  {restaurantSuggestions.map((s, i) => (
                    <div key={i} className="bg-orange-50 rounded-lg p-4 shadow">
                      <div className="font-bold text-dinstein-orange text-lg">{s.restaurant}</div>
                      <div className="font-semibold">{s.menuItem}</div>
                      <div className="text-gray-700">{s.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
