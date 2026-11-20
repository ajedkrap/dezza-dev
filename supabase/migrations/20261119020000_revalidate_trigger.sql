-- Calls the site's /api/revalidate whenever any portfolio content table changes.
-- Replaces per-table Dashboard webhooks: one function, one trigger per table (per statement, not per row).
--
-- One-time setup, run by hand in the SQL editor (never commit the secret):
--   select vault.create_secret('https://dezza.dev/api/revalidate', 'revalidate_url');
--   select vault.create_secret('<REVALIDATE_SECRET>', 'revalidate_secret');
-- Until both secrets exist the trigger does nothing, so edits are never blocked.

create schema if not exists private;

create or replace function private.revalidate_site()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  _url    text;
  _secret text;
begin
  select decrypted_secret into _url    from vault.decrypted_secrets where name = 'revalidate_url';
  select decrypted_secret into _secret from vault.decrypted_secrets where name = 'revalidate_secret';

  if _url is not null and _secret is not null then
    perform net.http_post(
      url     := _url,
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-revalidate-secret', _secret),
      body    := jsonb_build_object('table', tg_table_name, 'op', tg_op)
    );
  end if;

  return null;
end;
$$;

revoke all on function private.revalidate_site() from public;

do $$
declare
  t text;
begin
  foreach t in array array[
    'experiences', 'experience_translations',
    'projects', 'project_translations',
    'education', 'education_translations', 'certificates',
    'skill_categories', 'skill_category_translations', 'skills',
    'stack_groups', 'stack_group_translations', 'stack_items'
  ] loop
    execute format('drop trigger if exists revalidate_site on public.%I', t);
    execute format(
      'create trigger revalidate_site after insert or update or delete or truncate on public.%I
         for each statement execute function private.revalidate_site()', t);
  end loop;
end $$;
