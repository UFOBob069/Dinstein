import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RestaurantData } from '@/app/components/RestaurantFlow';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 25000,
});

export const runtime = 'edge';

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const data: RestaurantData = await request.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You're a helpful food-savvy assistant helping someone decide what to order for delivery or takeout from nearby restaurants.\n\nAlways provide specific suggestions as a JSON array called \"suggestions\", where each suggestion has:\n- \"restaurant\": a real, well-known restaurant name (e.g., Chipotle, Chick-fil-A, Shake Shack)\n- \"menuItem\": a specific item from their actual menu (e.g., 'Steak Burrito', 'Spicy Deluxe Chicken Sandwich')\n- \"description\": a short, fun description of why it's a good pick\n\nOnly recommend popular national or regional chains likely available in the given zip code via DoorDash or similar apps. Never make up restaurant names or menu items.\n\nRespond ONLY with valid JSON in this format:\n{\n  \"suggestions\": [\n    {\n      \"restaurant\": \"string\",\n      \"menuItem\": \"string\",\n      \"description\": \"string\"\n    }\n  ]\n}`
        },
        {
          role: 'user',
          content: `Zip Code: ${data.zipCode}\nMood: ${data.mood.join(", ")}\nCuisine Cravings: ${data.cuisine.join(", ")}\nDietary Restrictions: ${data.dietary.join(", ")}\nWhen: ${data.time}\nBudget per person: ${data.budget}\nGroup: ${data.group}\nOrder type: ${data.orderType}\n\nWhat are 2–3 great menu items I can order right now for delivery or pickup?`
        }
      ],
      temperature: 0.8,
      max_tokens: 400,
      response_format: { type: "json_object" }
    });

    if (!response.choices[0].message.content) {
      throw new Error('No response content received');
    }

    // Parse the JSON response
    const parsed = JSON.parse(response.choices[0].message.content.trim());
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error generating restaurant recommendation:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendation' },
      { status: 500 }
    );
  }
} 