import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szflygrwneflijjyvcfo.supabase.co';
const supabaseAnonKey = 'sb_publishable_gmfq5ldKsYcHaHOA8zweiA_TYTVysW4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
