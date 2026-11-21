# Cafe ordering website

واجهة العميل: `index.html` — لوحة الإدارة: `admin.html`.

## إعداد الربط المباشر بين الموقعين
1. أنشئ مشروعاً في Supabase.
2. افتح SQL Editor وشغّل محتوى `schema.sql` (يتضمن إعداد رفع صور المنتجات).
3. من Project Settings > API انسخ Project URL و anon/public key وضعهما في `config.js`.
4. أنشئ حساب الإدارة من Authentication > Users (Add user). سجّل الدخول من `admin.html`.
5. فعّل Realtime لجدولي `products` و`orders` من Database > Replication.
6. انشر المستودع على GitHub Pages.

**أمان:** استخدم anon/public key فقط في config.js. لا تضع service_role key في ملفات الموقع. سياسات RLS مفعّلة؛ إدارة المنتجات والطلبات تتطلب تسجيل الدخول.

الأسعار بالجنيه المصري. من لوحة الإدارة اختار صورة المنتج مباشرة من جهازك (حتى 5 ميجا)، وسيتم رفعها تلقائياً وتظهر في متجر العملاء. زر English / العربية يبدّل لغة الموقعين.
