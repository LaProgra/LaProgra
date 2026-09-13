-- Ejecutar una sola vez en el SQL Editor después de desplegar la Edge Function.
-- Guarda primero la URL pública de tu proyecto y una clave aleatoria de cron en Vault.
select vault.create_secret('https://ddqiicipnnuapvssrusk.supabase.co', 'swiftair_sync_project_url');
select vault.create_secret('asereje_a_deve_1997', 'swiftair_sync_cron_secret');

-- El segundo secreto debe cargarse también en Edge Function Secrets como
-- SWIFTAIR_CRON_SECRET. El valor de APP_ORIGIN puede ser el dominio de la app
-- y SWIFTAIR_WEBCAL_ALLOWED_HOSTS admite una lista separada por comas; por
-- defecto solo se permiten subdominios de icloud.com.

select cron.unschedule(jobid)
from cron.job
where jobname = 'sync-swiftair-schedules-every-minute';

select cron.schedule(
  'sync-swiftair-schedules-every-minute',
  '* * * * *',
  $$
    select net.http_post(
      url := (select decrypted_secret from vault.decrypted_secrets where name = 'swiftair_sync_project_url') || '/functions/v1/swiftair-sync',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-swiftair-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'swiftair_sync_cron_secret')
      ),
      body := '{"mode":"cron"}'::jsonb
    );
  $$
);
