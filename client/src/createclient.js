import { createClient } from "@supabase/supabase-js";

// Configuration
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyb2FkbGl3a2ZpaHhvdHJ6cnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MDgxMTYsImV4cCI6MjAyODk4NDExNn0.meDlxb1L614PWVOuB6XuMuoDdogVbxHwl1cVjuy66fE';
const supaURL = 'https://uroadliwkfihxotrzrzl.supabase.co';

const analyticsSupabaseUrl = "https://tszzntoiljlcwzbyuexl.supabase.co";
const analyticsSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzenpudG9pbGpsY3d6Ynl1ZXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNDYyNzgsImV4cCI6MjA0MjYyMjI3OH0.g_vEhlv8paRPP_K9rZb5dr9A3bcmvmbD0DHaRPNCDyk";

const companiesSupabaseUrl = "https://mcmkqarwrxjxepfcesdr.supabase.co";
const companiesSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbWtxYXJ3cnhqeGVwZmNlc2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNjczNTQsImV4cCI6MjA0NzY0MzM1NH0.tR9FKWqu0UeRlrvqJwi-bDF-XfUxEDCGgs1ahylq5Fo";

// Singleton pattern to prevent multiple instances
let _analyticsSupabase = null;
let _supabase = null;
let _companiesSupabase = null;

export const analyticsSupabase = () => {
  if (!_analyticsSupabase) {
    _analyticsSupabase = createClient(analyticsSupabaseUrl, analyticsSupabaseAnonKey);
  }
  return _analyticsSupabase;
};

export const supabase = () => {
  if (!_supabase) {
    _supabase = createClient(supaURL, apiKey);
  }
  return _supabase;
};

export const companiesSupabase = () => {
  if (!_companiesSupabase) {
    _companiesSupabase = createClient(companiesSupabaseUrl, companiesSupabaseAnonKey);
  }
  return _companiesSupabase;
};

