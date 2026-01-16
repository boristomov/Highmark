import { createClient } from '@supabase/supabase-js';

// Supabase Configuration - Anon key is safe to expose (protected by Row Level Security)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vsrwwjdwkfvwoygixtwu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcnd3amR3a2Z2d295Z2l4dHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MzA5NDgsImV4cCI6MjA3NjUwNjk0OH0.fwPE6YqDj7mFNNr6_WlDcVfJ6Te_AFdH36IF6dSH5PE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

