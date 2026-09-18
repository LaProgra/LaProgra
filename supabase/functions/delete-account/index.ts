import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders as supabaseCorsHeaders } from "npm:@supabase/supabase-js@2/cors";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
const publishableKeys = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
const secretKey = secretKeys ? JSON.parse(secretKeys).default : Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const publishableKey = publishableKeys ? JSON.parse(publishableKeys).default : Deno.env.get("SUPABASE_ANON_KEY") || "";
const admin = createClient(supabaseUrl, secretKey, { auth: { autoRefreshToken: false, persistSession: false } });

const responseJson = (body: unknown, status: number, headers: HeadersInit) => Response.json(body, { status, headers });

Deno.serve(async (request) => {
  const headers = { ...supabaseCorsHeaders };
  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST") return responseJson({ error: "Método no permitido." }, 405, headers);

  try {
    const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!token || !supabaseUrl || !publishableKey || !secretKey) {
      return responseJson({ error: "Sesión no válida." }, 401, headers);
    }
    const client = createClient(supabaseUrl, publishableKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data, error: userError } = await client.auth.getUser(token);
    if (userError || !data.user) return responseJson({ error: "Sesión no válida." }, 401, headers);

    const { error } = await admin.auth.admin.deleteUser(data.user.id);
    if (error) throw error;
    return responseJson({ success: true }, 200, headers);
  } catch (error) {
    console.error("Error al eliminar la cuenta", error);
    return responseJson({ error: "No se ha podido eliminar la cuenta." }, 500, headers);
  }
});
