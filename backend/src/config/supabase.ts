import {createClient} from '@supabase/supabase-js';
import 'dotenv/config';
import type { Database } from '../types/supabase.ts';

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken : false,
        persistSession : false
    }
});




