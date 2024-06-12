import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyb2FkbGl3a2ZpaHhvdHJ6cnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MDgxMTYsImV4cCI6MjAyODk4NDExNn0.meDlxb1L614PWVOuB6XuMuoDdogVbxHwl1cVjuy66fE';
const supaURL = 'https://uroadliwkfihxotrzrzl.supabase.co';

export const supabase = createClient(supaURL, apiKey);

