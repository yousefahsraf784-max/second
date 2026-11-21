-- CafeOrders schema: products, orders, public product images.
-- Public visitors can read available products and submit new orders.
-- Management policies are restricted to the single owner account created in Supabase Auth.
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 name_ar text,
 name_en text,
 price numeric(10,2) not null check (price > 0),
 price_ar numeric(10,2) not null check (price_ar > 0),
 price_en numeric(10,2) not null check (price_en > 0),
 category text not null,
 category_ar text not null,
 category_en text not null,
 image_url text,
 description text,
 is_available boolean not null default true,
 created_at timestamptz not null default now()
);
alter table public.products add column if not exists name_ar text;
alter table public.products add column if not exists name_en text;
alter table public.products add column if not exists price_ar numeric(10,2);
alter table public.products add column if not exists price_en numeric(10,2);
alter table public.products add column if not exists category_ar text;
alter table public.products add column if not exists category_en text;
update public.products set name_ar = coalesce(name_ar, name), name_en = coalesce(name_en, name), price_ar = coalesce(price_ar, price), price_en = coalesce(price_en, price), category_ar=coalesce(category_ar,category), category_en=coalesce(category_en,category) where name_ar is null or name_en is null or price_ar is null or price_en is null or category_ar is null or category_en is null;
alter table public.products alter column name_ar set not null;
alter table public.products alter column name_en set not null;
alter table public.products alter column price_ar set not null;
alter table public.products alter column price_en set not null;
alter table public.products alter column category_ar set not null;
alter table public.products alter column category_en set not null;

-- Keep older cached frontends compatible with required bilingual product fields.
create or replace function public.fill_product_compat_fields()
returns trigger
language plpgsql
set search_path = ''
as $
begin
  new.name := coalesce(new.name, new.name_ar, new.name_en, 'منتج');
  new.name_ar := coalesce(new.name_ar, new.name, new.name_en, 'منتج');
  new.name_en := coalesce(new.name_en, new.name, new.name_ar, 'Product');
  new.price := coalesce(new.price, new.price_ar, new.price_en);
  new.price_ar := coalesce(new.price_ar, new.price, new.price_en);
  new.price_en := coalesce(new.price_en, new.price, new.price_ar);
  new.category := coalesce(new.category, new.category_ar, new.category_en, 'عام');
  new.category_ar := coalesce(new.category_ar, new.category, new.category_en, 'عام');
  new.category_en := coalesce(new.category_en, new.category, new.category_ar, 'General');
  return new;
end;
$;

drop trigger if exists products_fill_compat_fields on public.products;
create trigger products_fill_compat_fields
before insert on public.products
for each row execute function public.fill_product_compat_fields();

create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 customer_name text not null,
 phone text not null,
 address text not null,
 notes text,
 items jsonb not null,
 total numeric(10,2) not null,
 status text not null default 'new' check (status in ('new','preparing','completed','out_for_delivery','delivered')),
 tracking_code text not null default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 16)),
 created_at timestamptz not null default now()
);
alter table public.orders add column if not exists tracking_code text;
alter table public.orders alter column tracking_code set default upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 16));
update public.orders set tracking_code = upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 16)) where tracking_code is null;
alter table public.orders alter column tracking_code set not null;
create unique index if not exists orders_tracking_code_key on public.orders (tracking_code);
alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check check (status in ('new','preparing','completed','out_for_delivery','delivered'));

create or replace function public.track_order(p_code text)
returns table (tracking_code text, status text, created_at timestamptz)
language sql
security definer
set search_path = ''
as $
  select o.tracking_code, o.status, o.created_at
  from public.orders as o
  where length(regexp_replace(upper(coalesce(p_code, '')), '[^A-Z0-9]', '', 'g')) = 16
    and o.tracking_code = regexp_replace(upper(coalesce(p_code, '')), '[^A-Z0-9]', '', 'g')
  limit 1;
$;
revoke all on function public.track_order(text) from public;
grant execute on function public.track_order(text) to anon, authenticated;

alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "public read available products" on public.products;
drop policy if exists "authenticated read products" on public.products;
drop policy if exists "admin manage products" on public.products;
drop policy if exists "admin read products" on public.products;
drop policy if exists "admin create products" on public.products;
drop policy if exists "admin update products" on public.products;
drop policy if exists "admin delete products" on public.products;
create policy "public read available products" on public.products
 for select to anon using (is_available = true);
create policy "admin read products" on public.products
 for select to authenticated
 using ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid);
create policy "admin create products" on public.products
 for insert to authenticated
 with check ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid);
create policy "admin update products" on public.products
 for update to authenticated
 using ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid)
 with check ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid);
create policy "admin delete products" on public.products
 for delete to authenticated
 using ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid);

drop policy if exists "public create orders" on public.orders;
drop policy if exists "admin read orders" on public.orders;
drop policy if exists "admin update orders" on public.orders;
create policy "public create orders" on public.orders
 for insert to anon, authenticated with check (status = 'new');
create policy "admin read orders" on public.orders
 for select to authenticated
 using ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid);
create policy "admin update orders" on public.orders
 for update to authenticated
 using ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid)
 with check ((select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid);

grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant select, insert, update, delete on public.products to authenticated;
grant select, update on public.orders to authenticated;

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public=true,file_size_limit=5242880,
 allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "public view product images" on storage.objects;
drop policy if exists "admin upload product images" on storage.objects;
drop policy if exists "admin delete product images" on storage.objects;
create policy "public view product images" on storage.objects
 for select to anon, authenticated using (bucket_id='product-images');
create policy "admin upload product images" on storage.objects
 for insert to authenticated with check (
   bucket_id='product-images'
   and (select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid
 );
create policy "admin delete product images" on storage.objects
 for delete to authenticated using (
   bucket_id='product-images'
   and (select auth.uid()) = '67552226-30c3-4ebb-9eaa-c6660d904574'::uuid
 );

do $$
begin
 if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='products') then
   alter publication supabase_realtime add table public.products;
 end if;
 if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='orders') then
   alter publication supabase_realtime add table public.orders;
 end if;
end $$;
