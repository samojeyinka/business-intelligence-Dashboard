import {createClient} from '@supabase/supabase-js'
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

const supabaseUrl = "https://kvepeebatpnvpeafqejp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZXBlZWJhdHBudnBlYWZxZWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzM1NjksImV4cCI6MjA1OTgwOTU2OX0.yEWbvixAbqmIDhueVlLe2dpL0myzdurJy8_DyCzOtNM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;