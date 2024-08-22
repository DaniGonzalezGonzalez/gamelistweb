import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const auth = supabase.auth; // Equivalente a `getAuth(app)`
export const db = supabase.from;   // Equivalente a `getFirestore(app)`
export const storage = supabase.storage; // Equivalente a `getStorage(app)`