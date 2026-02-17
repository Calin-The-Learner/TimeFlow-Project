import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zxtxzxmyzvyzpanpphll.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dHh6eG15enZ5enBhbnBwaGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMDEwOTEsImV4cCI6MjA4MzU3NzA5MX0.4hl0Sphxd3W3swP19zKaUBuuZQIHzK3mqTuLOGwj4ko";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
