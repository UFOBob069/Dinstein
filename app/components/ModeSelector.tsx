'use client';

interface ModeSelectorProps {
  mode: 'meal_prep' | 'restaurant';
  onModeChange: (mode: 'meal_prep' | 'restaurant') => void;
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        What are you looking for today?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onModeChange('meal_prep')}
          className={`p-6 rounded-xl border-2 transition-all ${
            mode === 'meal_prep'
              ? 'border-dinstein-orange bg-orange-50 text-dinstein-orange'
              : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🍳</div>
            <h3 className="text-lg font-semibold mb-2">Meal Prep</h3>
            <p className="text-sm text-gray-600">
              Plan and cook meals at home
            </p>
          </div>
        </button>
        
        <button
          onClick={() => onModeChange('restaurant')}
          className={`p-6 rounded-xl border-2 transition-all ${
            mode === 'restaurant'
              ? 'border-dinstein-orange bg-orange-50 text-dinstein-orange'
              : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">🍔</div>
            <h3 className="text-lg font-semibold mb-2">Restaurant</h3>
            <p className="text-sm text-gray-600">
              Find great places to order from
            </p>
          </div>
        </button>
      </div>
    </div>
  );
} 