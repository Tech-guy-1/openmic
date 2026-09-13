/* ============================================================
   Fill these in from Supabase Dashboard → Project Settings → API
   ============================================================ */
const SUPABASE_URL = "https://qcmlvqsnkanlxauxgjpp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbWx2cXNua2FubHhhdXhnanBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjY3NTIsImV4cCI6MjEwNDU0Mjc1Mn0.lApZJWHaTzSUvpgg04Q-msvmzKNkTf5rjXYkLnFjejQ";

/* Global client used by both index.html and admin.html */
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
