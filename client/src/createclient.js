import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyb2FkbGl3a2ZpaHhvdHJ6cnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MDgxMTYsImV4cCI6MjAyODk4NDExNn0.meDlxb1L614PWVOuB6XuMuoDdogVbxHwl1cVjuy66fE';
const supaURL = 'https://uroadliwkfihxotrzrzl.supabase.co';

const analyticsSupabaseUrl = "https://tszzntoiljlcwzbyuexl.supabase.co";
const analyticsSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzenpudG9pbGpsY3d6Ynl1ZXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNDYyNzgsImV4cCI6MjA0MjYyMjI3OH0.g_vEhlv8paRPP_K9rZb5dr9A3bcmvmbD0DHaRPNCDyk";

const companiesSupabaseUrl = "https://mcmkqarwrxjxepfcesdr.supabase.co"
const companiesSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbWtxYXJ3cnhqeGVwZmNlc2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjczNTQsImV4cCI6MjA0NzY0MzM1NH0.tR9FKWqu0UeRlrvqJwi-bDF-XfUxEDCGgs1ahylq5Fo"

export const analyticsSupabase = createClient(analyticsSupabaseUrl, analyticsSupabaseAnonKey);
export const supabase = createClient(supaURL, apiKey);
export const companiesSupabase = createClient(companiesSupabaseUrl, companiesSupabaseAnonKey);

