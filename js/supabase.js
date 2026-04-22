// Подключение к Supabase
const SUPABASE_URL = 'https://vbvaxwzgklmuqwellhtu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lVUwJzs560zcnm2YytK9Dw_TxUImWDR';

// Создаём клиент один раз
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);