-- نفّذ هذا الملف مرة واحدة في Supabase SQL Editor
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(), name text not null, price numeric(10,2) not null check (price > 0), category text not null, image_url text, description text, is_available boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(), customer_name text not null, phone text not null, address text not null, notes text, items jsonb not null, total numeric(10,2) not null, status text not null default 'new' check (status in ('new','preparing','completed','delivered')), created_at timestamptz not null default now()
);
alter table public.products enable row level security;
alter table public.orders enable row level security;
-- الزوار يقرؤون المنتجات المتاحة فقط
create policy "public read available products" on public.products for select to anon, authenticated using (is_available = true or auth.role() = 'authenticated');
-- الإدارة المسجلة فقط تضيف/تعدّل/تحذف المنتجات
create policy "admin manage products" on public.products for all to authenticated using (true) with check (true);
-- الزائر يرسل طلباً جديداً فقط
create policy "public create orders" on public.orders for insert to anon, authenticated with check (status = 'new');
-- لوحة الإدارة المسجلة تقرأ وتحدّث الطلبات
create policy "admin read orders" on public.orders for select to authenticated using (true);
create policy "admin update orders" on public.orders for update to authenticated using (true) with check (true);
-- فعّل Realtime للجدولين من Supabase Dashboard > Database > Replication

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp','image/gif']) on conflict (id) do update set public=true,file_size_limit=5242880;
create policy "public view product images" on storage.objects for select to anon,authenticated using (bucket_id='product-images');
create policy "admin upload product images" on storage.objects for insert to authenticated with check (bucket_id='product-images');
create policy "admin delete product images" on storage.objects for delete to authenticated using (bucket_id='product-images');
