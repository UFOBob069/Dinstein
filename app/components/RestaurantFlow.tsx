'use client';

import { useState } from 'react';

interface RestaurantFlowProps {
  onSubmit: (data: RestaurantData) => void;
  loading: boolean;
}

export interface RestaurantData {
  zipCode: string;
  mood: string[];
  cuisine: string[];
  dietary: string[];
  time: string;
  budget: string;
  group: string;
  orderType: string;
}

const MOOD_OPTIONS = [
  "Comfort Food", "Healthy", "Quick Bites", "Spicy", 
  "Something New", "Family Style", "Light & Fresh"
];

const CUISINE_OPTIONS = [
  "American", "Mexican", "Asian", "Mediterranean", 
  "Italian", "Indian", "BBQ", "Vegan", "Dessert"
];

const DIETARY_OPTIONS = [
  "Gluten-Free", "Low Carb", "Dairy-Free", "Nut-Free", 
  "Vegan", "Vegetarian", "None"
];

const TIME_OPTIONS = [
  "Now", "Lunch", "Dinner", "Late Night", "Brunch", "Snack Time"
];
const BUDGET_OPTIONS = [
  "$ (< $10)", "$$ ($10–20)", "$$$ ($20–30)", "$$$$ ($30+)"
];
const GROUP_OPTIONS = [
  "Just me", "Couple", "Family or group", "Office or team meal"
];
const ORDER_TYPE_OPTIONS = [
  "Delivery", "Pickup", "Dine In", "Any"
];

export default function RestaurantFlow({ onSubmit, loading }: RestaurantFlowProps) {
  const [zipCode, setZipCode] = useState('');
  const [mood, setMood] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [time, setTime] = useState('');
  const [budget, setBudget] = useState('');
  const [group, setGroup] = useState('');
  const [orderType, setOrderType] = useState('');

  const toggleSelection = (
    item: string, 
    currentSelection: string[], 
    setSelection: (items: string[]) => void
  ) => {
    setSelection(
      currentSelection.includes(item)
        ? currentSelection.filter(i => i !== item)
        : [...currentSelection, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      zipCode &&
      (mood.length > 0 || cuisine.length > 0) &&
      time && budget && group && orderType
    ) {
      onSubmit({ zipCode, mood, cuisine, dietary, time, budget, group, orderType });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl max-w-2xl mx-auto p-8">
      <div className="space-y-6">
        {/* Zip Code */}
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Your Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="e.g. 78704"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-dinstein-orange focus:ring-dinstein-orange"
            required
          />
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What kind of meal are you in the mood for?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {MOOD_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleSelection(option, mood, setMood)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  mood.includes(option)
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What type of cuisine are you craving?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CUISINE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleSelection(option, cuisine, setCuisine)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  cuisine.includes(option)
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Any dietary restrictions?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DIETARY_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleSelection(option, dietary, setDietary)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  dietary.includes(option)
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* When are you planning to eat? */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            When are you planning to eat?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TIME_OPTIONS.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setTime(option)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  time === option
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Budget per person */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What’s your budget per person?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BUDGET_OPTIONS.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setBudget(option)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  budget === option
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Who are you ordering for? */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Who are you ordering for?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {GROUP_OPTIONS.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setGroup(option)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  group === option
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Order type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Are you planning to pick it up or get it delivered, or dine in?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ORDER_TYPE_OPTIONS.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setOrderType(option)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  orderType === option
                    ? 'bg-orange-100 border-orange-500 text-orange-700'
                    : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !zipCode || (mood.length === 0 && cuisine.length === 0) || !time || !budget || !group || !orderType}
          className={`w-full py-4 px-6 rounded-lg text-white text-lg font-medium transition-all
            ${loading || !zipCode || (mood.length === 0 && cuisine.length === 0) || !time || !budget || !group || !orderType
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-dinstein-orange hover:bg-dinstein-orange-dark'
            }`}
        >
          {loading ? 'Finding restaurants...' : 'Find Me a Spot'}
        </button>
      </div>
    </form>
  );
} 