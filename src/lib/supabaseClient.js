import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  const missing = [
    !supabaseUrl && "VITE_SUPABASE_URL",
    !supabasePublishableKey && "VITE_SUPABASE_PUBLISHABLE_KEY",
  ].filter(Boolean);

  throw new Error(
    `Configuración de Supabase incompleta. Falta${missing.length > 1 ? "n" : ""}: ${missing.join(", ")}. ` +
      "Configura las variables VITE_* antes de generar el build.",
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
);
