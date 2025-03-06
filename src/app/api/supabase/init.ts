import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // 環境変数からURLを取得
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // 環境変数から匿名キーを取得

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabaseUrl and supabaseAnonKey are required.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
