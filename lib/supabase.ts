import { createClient } from '@supabase/supabase-js';

// For now, we'll use localStorage as a simple DB
// You can add your Supabase credentials later for real persistence
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Simple localStorage-based leaderboard (works without Supabase)
export const saveScore = (game: string, score: number, name: string = 'Anonymous') => {
  const key = `leaderboard_${game}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  const newEntry = { name, score, date: new Date().toISOString() };
  const updated = [...existing, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
};

export const getLeaderboard = (game: string) => {
  const key = `leaderboard_${game}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

