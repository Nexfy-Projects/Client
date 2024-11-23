import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const clientSupabase = createClient(supabaseUrl || "", supabaseKey || "");

export default clientSupabase;