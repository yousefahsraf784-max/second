-- CafeOrders schema: products, orders, public product images.
-- Run as a Supabase migration. Public visitors can only read available products
-- and submit new orders. Authenticated users manage products and orders.
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 price numeric(10,2) not null check (price > 0),
 category text not null,
 image_url text,
 description text,
 is_available boolean not null default true,
 created_at timestamptz not null default now()
);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 customer_name text not null,
 phone text not null,
 address text not null,
 notes text,
 items jsonb not null,
 total numeric(10,2) not null,
 status text not null default 'new' check (status in ('new','preparing','completed','delivered')),
 created_at timestamptz not null default now()
);
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "public read available products" on public.products;
drop policy if exists "authenticated read products" on public.products;
drop policy if exists "admin manage products" on public.products;
create policy "public read available products" on public.products
 for select to anon using (is_available = true);
create policy "authenticated read products" on public.products
 for select to authenticated using (true);
create policy "admin manage products" on public.products
 for all to authenticated using (true) with check (true);

drop policy if exists "public create orders" on public.orders;
drop policy if exists "admin read orders" on public.orders;
drop policy if exists "admin update orders" on public.orders;
create policy "public create orders" on public.orders
 for insert to anon, authenticated with check (status = 'new');
create policy "admin read orders" on public.orders
 for select to authenticated using (true);
create policy "admin update orders" on public.orders
 for update to authenticated using (true) with check (true);

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
 for insert to authenticated with check (bucket_id='product-images');
create policy "admin delete product images" on storage.objects
 for delete to authenticated using (bucket_id='product-images');

do $$
begin
 if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='products') then
   alter publication supabase_realtime add table public.products;
 end if;
 if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='orders') then
   alter publication supabase_realtime add table public.orders;
 end if;
end $$;
