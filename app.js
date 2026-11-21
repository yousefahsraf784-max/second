(() => {
 const cfg = window.CAFE_CONFIG || {};
 const ready = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
 const page = document.body.dataset.page;
 const $ = (s) => document.querySelector(s);
 let currentLang=localStorage.getItem("cafe-language")||"ar";
 const words={"كافيه":"Cafe","قهوة ومذاق يروق يومك":"Coffee & a little joy","السلة":"Cart","أهلاً بيك في مكانك":"Welcome to your place","خد لحظة راحة،":"Take a little break,","واختار مزاجك.":"choose your mood.","قهوة بتحبها وحاجة حلوة تكمل يومك.":"Coffee you love and a sweet treat for your day.","شوف المنيو":"Explore menu","اختياراتنا":"Our picks","المنيو":"Menu","اختار اللي على مزاجك":"Choose what you like","طلبك":"Your order","سلة المشتريات":"Shopping cart","الإجمالي":"Total","بيانات التوصيل":"Delivery details","الاسم":"Name","رقم الموبايل":"Phone number","العنوان بالتفصيل":"Full address","ملاحظات (اختياري)":"Notes (optional)","تأكيد الطلب":"Place order","دخول الإدارة":"Admin","كافيه — معمول بحب":"Cafe — made with love","عرض المتجر ↗":"View store ↗","لوحة الإدارة":"Admin dashboard","مساحة الإدارة":"Admin area","أهلاً بعودتك":"Welcome back","سجّل دخولك لإدارة المنتجات والطلبات.":"Sign in to manage products and orders.","البريد الإلكتروني":"Email","كلمة المرور":"Password","تسجيل الدخول":"Sign in","نظرة عامة":"Overview","إدارة الكافيه":"Cafe management","تسجيل الخروج":"Log out","الطلبات":"Orders","المنتجات":"Products","الطلبات الواردة":"Incoming orders","تحديث":"Refresh","إضافة منتج جديد":"Add a new product","اسم المنتج":"Product name","اسم المنتج بالعربي":"Product name in Arabic","اسم المنتج بالإنجليزي":"Product name in English","السعر بالعربي":"Arabic price","السعر بالإنجليزي":"English price","السعر بالعربي (جنيه مصري)":"Arabic price (EGP)","السعر بالإنجليزي (EGP)":"English price (EGP)","التصنيف بالعربي":"Category in Arabic","التصنيف بالإنجليزي":"Category in English","مثلاً: مشروبات":"e.g. Drinks","e.g. Drinks":"مثلاً: مشروبات","السعر بالجنيه":"Price (EGP)","التصنيف":"Category","صورة المنتج من جهازك":"Product image from your device","اختار صورة من الموبايل أو الكمبيوتر":"Choose an image from your phone or computer","وصف بسيط":"Short description","إضافة المنتج":"Add product","المنتجات الحالية":"Current products","العودة للمتجر":"Back to store","السلة لسه فاضية. اختار حاجة من المنيو ☕":"Your cart is empty. Choose something from the menu ☕","الكل":"All","طلب #":"Order #","للوحد":" each","كود الطلب: ":"Order code: ","طلب جديد":"New order","قيد التحضير":"Preparing","جاهز":"Ready","خرج للتوصيل":"Out for delivery","تم التسليم":"Delivered","تابع طلبك":"Track your order","اكتب كود المتابعة":"Enter tracking code","متابعة الطلب":"Track order","نسخ الكود":"Copy code","احتفظ بالكود لمتابعة حالة طلبك.":"Save this code to track your order.","تم نسخ الكود":"Code copied","الطلب غير موجود. راجع الكود وحاول تاني.":"Order not found. Check the code and try again.","حالة الطلب الحالية":"Current order status","تحديث الحالة":"Refresh status","تم استلام الطلب":"Order received","حالة الطلب":"Order status","مفيش منتجات مضافة لسه.":"No products added yet.","لسه مفيش طلبات.":"No orders yet.","المنيو بيتجهز حالياً، تابعنا قريباً ☕":"The menu is being prepared. Check back soon ☕","بنحمّل المنيو...":"Loading menu...","جاري تحميل الطلبات...":"Loading orders...","جاري تحميل المنتجات...":"Loading products...","متاح":"Available","مخفي":"Hidden","حذف":"Delete","ملاحظات:":"Notes:","ضيف منتجات للسلة الأول.":"Add products to your cart first.","جاري إرسال الطلب...":"Sending your order...","تم استلام طلبك بنجاح! رقم الطلب: ":"Your order was received! Order number: ","ما قدرناش نبعت الطلب. حاول تاني بعد التأكد من الاتصال.":"Could not send the order. Please try again.","جاري تسجيل الدخول...":"Signing in...","بيانات الدخول غير صحيحة أو الحساب غير مفعّل.":"Invalid login details or inactive account.","جاري إضافة المنتج...":"Adding product...","اتضاف المنتج بنجاح وهيظهر في المتجر.":"Product added! It will appear in the store.","تعذرت الإضافة. راجع الاتصال والحقول.":"Could not add product. Check your connection and fields.","تعذر تحميل الطلبات. تأكد من صلاحيات الإدارة.":"Could not load orders. Check admin permissions.","تعذر تحميل المنتجات.":"Could not load products.","تعذر تحميل المنيو. تأكد من إعداد قاعدة البيانات.":"Could not load menu. Check database setup."};
 Object.assign(words,{
 "قهوة / حلويات / مشروبات":"Coffee / Desserts / Drinks","مثلاً: آيس لاتيه":"e.g. Iced latte","وصف المنتج":"Product description","اسمك":"Your name","01xxxxxxxxx":"01xxxxxxxxx","المنطقة والشارع ورقم البيت":"Area, street and building number","أي تفاصيل للطلب":"Any order details","مثال: A1B2C3D4E5F6A7B8":"e.g. A1B2C3D4E5F6A7B8","كود متابعة الطلب":"Order tracking code","اكتب كود المتابعة اللي ظهر لك بعد الطلب":"Enter the tracking code shown after placing your order","أهلاً بيك في مكانك":"Welcome to your place","أهلاً بعودتك":"Welcome back","طلبك وصل لفين؟":"Where is your order?","متابعة طلبك":"Track your order","طلبك":"Your order","حالة الطلب الحالية":"Current order status","اكتب كود المتابعة الأول.":"Please enter your tracking code first.","جاري البحث عن الطلب...":"Searching for your order...","حصلت مشكلة أثناء جلب حالة الطلب. حاول تاني.":"Something went wrong while retrieving your order. Please try again.","الطلب غير موجود. راجع الكود وحاول تاني.":"Order not found. Check the code and try again.","حالة غير معروفة":"Unknown status","قهوة / حلويات / مشروبات":"Coffee / Desserts / Drinks","ضيف منتجات للسلة الأول.":"Please add items to your cart first.","جاري إرسال الطلب...":"Submitting your order...","تم استلام طلبك بنجاح! كود متابعة الطلب:":"Your order has been received! Tracking code:","احتفظ بالكود لمتابعة حالة طلبك.":"Keep this code to track your order.","نسخ الكود":"Copy code","تم نسخ الكود":"Code copied","تعذر تحميل المنيو. تأكد من إعداد قاعدة البيانات.":"Could not load the menu. Please check the database setup.","المنيو بيتجهز حالياً، تابعنا قريباً ☕":"Our menu is being prepared. Please check back soon.","جاري تحميل الطلبات...":"Loading orders...","تعذر تحميل الطلبات. تأكد من صلاحيات الإدارة.":"Could not load orders. Check admin permissions.","لسه مفيش طلبات.":"No orders yet.","جاري تحميل المنتجات...":"Loading products...","تعذر تحميل المنتجات.":"Could not load products.","مفيش منتجات مضافة لسه.":"No products have been added yet.","ملاحظات:":"Notes:","حالة الطلب":"Order status","طلب جديد":"New order","قيد التحضير":"Preparing","جاهز":"Ready","خرج للتوصيل":"Out for delivery","تم التسليم":"Delivered","متاح":"Available","مخفي":"Hidden","حذف":"Delete","السلة لسه فاضية. اختار حاجة من المنيو ☕":"Your cart is empty. Choose something from the menu ☕","للسلة لسه فاضية. اختار حاجة من المنيو ☕":"Your cart is empty. Choose something from the menu ☕","جاري تسجيل الدخول...":"Signing in...","الإيميل أو كلمة المرور مش مطابقين للحساب اللي اتعمل في Supabase.":"The email or password does not match the account.","تأكيد البريد الإلكتروني مطلوب قبل الدخول. افتح Supabase وتأكد من الحساب.":"Email confirmation is required before signing in. Check your Supabase account.","محاولات كتير؛ استنى شوية وجرب تاني.":"Too many attempts. Please wait and try again.","حصل خطأ أثناء تسجيل الدخول: ":"Sign-in error: ","جاري إضافة المنتج...":"Adding product...","اتضاف المنتج بنجاح وهيظهر في المتجر.":"Product added successfully. It will appear in the store.","تعذرت الإضافة. تأكد من إعداد رفع الصور والصلاحيات.":"Could not add the product. Check image upload setup and permissions.","اختار ملف صورة صحيح.":"Please choose a valid image file.","حجم الصورة لازم يكون أقل من 5 ميجا.":"The image must be smaller than 5 MB.","تعذر تحديث حالة الطلب.":"Could not update order status.","متأكد إنك عايز تحذف المنتج؟":"Are you sure you want to delete this product?","تعذر حذف المنتج.":"Could not delete the product.","العودة للمتجر":"Back to store","عرض المتجر ↗":"View store ↗","دخول الإدارة":"Admin"
 });
 Object.assign(words,{"السعر (جنيه مصري)":"Price (EGP)"});
 const reverseWords=Object.fromEntries(Object.entries(words).map(([ar,en])=>[en,ar]));
 function applyLanguage(){const en=currentLang==="en";document.documentElement.lang=en?"en":"ar";document.documentElement.dir=en?"ltr":"rtl";document.querySelectorAll("[data-language-toggle]").forEach(x=>x.textContent=en?"العربية":"English");const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.nodeValue.trim();if(!t)continue;const v=en?words[t]:reverseWords[t];if(v)n.nodeValue=n.nodeValue.replace(t,v);}document.querySelectorAll("input,textarea").forEach(x=>{if(x.placeholder){const v=en?words[x.placeholder]:reverseWords[x.placeholder];if(v)x.placeholder=v;}if(x.type==="email"&&en)x.placeholder="admin@example.com";if(x.type==="email"&&!en&&x.placeholder==="admin@example.com")x.placeholder="البريد الإلكتروني";});}
 document.querySelectorAll("[data-language-toggle]").forEach(x=>x.addEventListener("click",()=>{currentLang=currentLang==="ar"?"en":"ar";localStorage.setItem("cafe-language",currentLang);applyLanguage();document.dispatchEvent(new CustomEvent("cafe-language-changed"));}));
 applyLanguage();
 const money = (n) => Number(n || 0).toLocaleString(currentLang==="en"?"en-US":"ar-EG") + (currentLang==="en"?" EGP":" ج.م");
 const productPrice = p => Number(currentLang==="en"?(p.price_en ?? p.price):(p.price_ar ?? p.price));
 const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 document.querySelectorAll(".cafe-name").forEach(el => el.textContent = cfg.CAFE_NAME || "كافيه");
 if (!ready) {
   const msg = "الموقع جاهز من ناحية التصميم، وباقي إعداد قاعدة البيانات: راجع خطوات README وشغّل schema.sql ثم أضف بيانات Supabase في config.js.";
   if (page === "store") $("#products").innerHTML = '<div class="empty-state">' + msg + '</div>';
   if (page === "admin") { $("#login-feedback").textContent = msg; $("#login-form").querySelector("button").disabled = true; }
   return;
 }
 const db = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
 if (page === "store") initStore();
 if (page === "admin") initAdmin();
 function initStore() {
   let products = [], cart = [], activeCategory = null;
   const productName = p => currentLang==="en" ? (p.name_en || p.name || p.name_ar || "") : (p.name_ar || p.name || p.name_en || "");
   const productCategory = p => currentLang==="en" ? (p.category_en || p.category || p.category_ar || "") : (p.category_ar || p.category || p.category_en || "");
   document.addEventListener("cafe-language-changed",()=>{renderCategories();renderProducts();renderCart();});
   const productBox = $("#products");
   function renderCategories() {
     const cats = [null, ...new Set(products.map(p => p.category_ar || p.category).filter(Boolean))];
     $("#categories").innerHTML = cats.map(c => {const label=c===null?(currentLang==="en"?"All":"الكل"):productCategory(products.find(p=>(p.category_ar||p.category)===c)||{});return '<button class="category-chip '+(activeCategory===c?'active':'')+'" data-cat="'+esc(c===null?"__all__":c)+'">'+esc(label)+'</button>';}).join("");
     $("#categories").querySelectorAll("button").forEach(b => b.addEventListener("click", () => { activeCategory=b.dataset.cat==="__all__"?null:b.dataset.cat; renderCategories(); renderProducts(); })); applyLanguage();
   }
   function renderProducts() {
     const visible = products.filter(p => p.is_available && (activeCategory===null || (p.category_ar||p.category)===activeCategory));
     productBox.innerHTML = visible.length ? visible.map(p => '<article class="product-card"><div class="product-image">'+(p.image_url?'<img src="'+esc(p.image_url)+'" alt="'+esc(productName(p))+'" loading="lazy" onerror="this.style.display=\'none\'">':'<span class="product-placeholder" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M9 18h25v13a9 9 0 0 1-9 9h-7a9 9 0 0 1-9-9V18Z" stroke="currentColor" stroke-width="2.5"/><path d="M34 21h3a5 5 0 0 1 0 10h-4M15 8c-2 3 2 4 0 7m9-9c-2 3 2 4 0 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></span>')+'</div><div class="product-info"><h3>'+esc(productName(p))+'</h3><p>'+esc(p.description || productCategory(p) || "")+'</p><div class="product-bottom"><span class="price">'+money(productPrice(p))+'</span><button class="add-btn" data-add="'+p.id+'" aria-label="أضف للسلة">+</button></div></div></article>').join("") : '<div class="empty-state">المنيو بيتجهز حالياً، تابعنا قريباً ☕</div>';
     productBox.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => addToCart(b.dataset.add))); applyLanguage();
   }
   function addToCart(id) { const p=products.find(x=>x.id===id); if(!p)return; const item=cart.find(x=>x.id===id); item?item.qty++:cart.push({id:p.id,qty:1}); renderCart(); }
   function renderCart() {
     const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>{const p=products.find(v=>v.id===x.id);return s+(p?productPrice(p):0)*x.qty;},0);
     $("#cart-count").textContent=count; $("#cart-total").textContent=money(total);
     $("#cart-items").innerHTML=cart.length?cart.map(x=>{const p=products.find(v=>v.id===x.id);const price=p?productPrice(p):0;return '<div class="cart-row"><div><b>'+esc(p?productName(p):"")+'</b><br><small>'+money(price)+' للواحد</small></div><div class="qty-controls"><button data-minus="'+x.id+'">−</button><b>'+x.qty+'</b><button data-plus="'+x.id+'">+</button></div><b>'+money(price*x.qty)+'</b></div>';}).join(""):'<p class="muted">السلة لسه فاضية. اختار حاجة من المنيو ☕</p>';
     $("#cart-items").querySelectorAll("[data-minus]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.minus,-1)));
     $("#cart-items").querySelectorAll("[data-plus]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.plus,1))); applyLanguage();
   }
   function changeQty(id,d) { const x=cart.find(i=>i.id===id); if(!x)return; x.qty+=d; if(x.qty<=0)cart=cart.filter(i=>i.id!==id); renderCart(); }
   async function loadProducts() {
     const {data,error}=await db.from("products").select("*").eq("is_available",true).order("created_at",{ascending:false});
     if(error){productBox.innerHTML='<div class="empty-state">تعذر تحميل المنيو. تأكد من إعداد قاعدة البيانات.</div>';return;}
     products=data||[]; renderCategories(); renderProducts(); applyLanguage();
   }
   $("#order-form").addEventListener("submit", async e=>{
     e.preventDefault(); const feedback=$("#order-feedback");
     if(!cart.length){feedback.textContent="ضيف منتجات للسلة الأول.";return;}
     const f=new FormData(e.currentTarget), total=cart.reduce((s,x)=>{const p=products.find(v=>v.id===x.id);return s+(p?productPrice(p):0)*x.qty;},0);
     const order={customer_name:f.get("customer_name").trim(),phone:f.get("phone").trim(),address:f.get("address").trim(),notes:f.get("notes").trim(),items:cart.map(({id,qty})=>{const p=products.find(v=>v.id===id);return {id,name:p?productName(p):"",price:p?productPrice(p):0,qty};}),total,status:"new"};
     feedback.textContent="جاري إرسال الطلب...";
     const {data,error}=await db.from("orders").insert(order).select("tracking_code").single();
     if(error){feedback.textContent="ما قدرناش نبعت الطلب. حاول تاني بعد التأكد من الاتصال.";return;}
     feedback.innerHTML='<div class="order-confirmation"><p>تم استلام طلبك بنجاح! كود متابعة الطلب:</p><div class="tracking-code-row"><strong>'+esc(data.tracking_code)+'</strong><button type="button" class="copy-code-btn" data-copy-code="'+esc(data.tracking_code)+'">نسخ الكود</button></div><small>احتفظ بالكود لمتابعة حالة طلبك.</small></div>';
     applyLanguage(); feedback.querySelector("[data-copy-code]").addEventListener("click",async b=>{try{await navigator.clipboard.writeText(data.tracking_code);b.currentTarget.textContent="تم نسخ الكود";}catch(_){b.currentTarget.textContent=data.tracking_code;}});
     cart=[];renderCart();e.currentTarget.reset();
   });
   const getStatusLabels=()=>currentLang==="en"?{new:"Order received",preparing:"Preparing",completed:"Ready",out_for_delivery:"Out for delivery",delivered:"Delivered"}:{new:"تم استلام الطلب",preparing:"قيد التحضير",completed:"جاهز",out_for_delivery:"خرج للتوصيل",delivered:"تم التسليم"};
   $("#track-form").addEventListener("submit",async e=>{
     e.preventDefault();const code=$("#tracking-code").value.trim().toUpperCase();const box=$("#tracking-result");
     if(!code){box.textContent="اكتب كود المتابعة الأول.";return;}
     box.textContent="جاري البحث عن الطلب...";
     const {data,error}=await db.rpc("track_order",{p_code:code});
     if(error){box.textContent="حصلت مشكلة أثناء جلب حالة الطلب. حاول تاني.";return;}
     const order=Array.isArray(data)?data[0]:data;
     if(!order){box.textContent="الطلب غير موجود. راجع الكود وحاول تاني.";return;}
     const statusLabels=getStatusLabels();const steps=["new","preparing","completed","out_for_delivery","delivered"];const current=steps.indexOf(order.status);
     box.innerHTML='<div class="tracking-result-card"><span class="eyebrow">حالة الطلب الحالية</span><h3>'+esc(statusLabels[order.status]||"حالة غير معروفة")+'</h3><div class="tracking-steps">'+steps.map((st,i)=>'<span class="tracking-step '+(i<=current?"done":"")+'">'+esc(statusLabels[st])+'</span>').join("")+'</div><small>كود الطلب: '+esc(order.tracking_code)+'</small><button type="button" class="soft-btn" id="refresh-tracking">تحديث الحالة</button></div>';
     applyLanguage(); $("#refresh-tracking").addEventListener("click",()=>$("#track-form").requestSubmit());
   });
   loadProducts();
   db.channel("store-products").on("postgres_changes",{event:"*",schema:"public",table:"products"},loadProducts).subscribe();
 }
 function initAdmin() {
   const loginPanel=$("#login-panel"), dashboard=$("#dashboard");
   async function showSession(session) {
     if(!session){loginPanel.hidden=false;dashboard.hidden=true;return;}
     loginPanel.hidden=true;dashboard.hidden=false; await loadOrders(); await loadAdminProducts();
   }
   db.auth.getSession().then(({data})=>showSession(data.session));
   db.auth.onAuthStateChange((_event,session)=>showSession(session));
   $("#login-form").addEventListener("submit",async e=>{
     e.preventDefault();const f=new FormData(e.currentTarget);const feedback=$("#login-feedback");feedback.textContent="جاري تسجيل الدخول...";
     const {error}=await db.auth.signInWithPassword({email:f.get("email").trim(),password:f.get("password")});
     if(error){
       const msg=String(error.message||"").toLowerCase();
       if(msg.includes("invalid login credentials")) feedback.textContent="الإيميل أو كلمة المرور مش مطابقين للحساب اللي اتعمل في Supabase.";
       else if(msg.includes("email not confirmed")) feedback.textContent="تأكيد البريد الإلكتروني مطلوب قبل الدخول. افتح Supabase وتأكد من الحساب.";
       else if(msg.includes("too many requests")) feedback.textContent="محاولات كتير؛ استنى شوية وجرب تاني.";
       else feedback.textContent="حصل خطأ أثناء تسجيل الدخول: "+(error.message||"خطأ غير معروف");
       return;
     }
     feedback.textContent="";
   });
   $("#logout-btn").addEventListener("click",()=>db.auth.signOut());
   document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
     document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));
     document.querySelectorAll(".admin-view").forEach(x=>x.hidden=x.id!==b.dataset.tab);
   }));
   $("#refresh-orders").addEventListener("click",loadOrders);
   $("#product-form").addEventListener("submit",async e=>{
     e.preventDefault();const f=new FormData(e.currentTarget);const file=f.get("image_file");
     const nameAr=f.get("name_ar").trim(), nameEn=f.get("name_en").trim();
     const price=Number(f.get("price"));
     if(!nameAr||!nameEn||!Number.isFinite(price)||price<=0){const feedback=$("#product-feedback");feedback.textContent=currentLang==="en"?"Enter both product names and one valid price.":"اكتب اسم المنتج باللغتين وسعرًا صحيحًا أكبر من صفر.";return;}
     const categoryAr=f.get("category_ar").trim(), categoryEn=f.get("category_en").trim();
     if(!categoryAr||!categoryEn){const feedback=$("#product-feedback");feedback.textContent=currentLang==="en"?"Enter the category in both Arabic and English.":"اكتب التصنيف بالعربي والإنجليزي.";return;}
     const payload={name:nameAr,name_ar:nameAr,name_en:nameEn,price,price_ar:price,price_en:price,category:categoryAr,category_ar:categoryAr,category_en:categoryEn,image_url:null,description:f.get("description").trim()||null};
     const feedback=$("#product-feedback");feedback.textContent=currentLang==="en"?"Adding product...":"جاري إضافة المنتج...";
     let saveStage="upload";
     try{
       if(file&&file.size){
         if(!file.type.startsWith("image/"))throw new Error("اختار ملف صورة صحيح.");
         if(file.size>5*1024*1024)throw new Error("حجم الصورة لازم يكون أقل من 5 ميجا.");
         const ext=(file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg";
         const path=crypto.randomUUID()+"."+ext;
         const {error:uploadError}=await db.storage.from("product-images").upload(path,file,{cacheControl:"3600",upsert:false,contentType:file.type});
         if(uploadError)throw uploadError;
         payload.image_url=db.storage.from("product-images").getPublicUrl(path).data.publicUrl;
       }
       saveStage="database";
       const {data:createdProduct,error}=await db.from("products").insert(payload).select("id").single();if(error)throw error;if(!createdProduct?.id)throw new Error("لم يتم تأكيد حفظ المنتج في قاعدة البيانات.");
       feedback.textContent=currentLang==="en"?"Product added and will appear in the store.":"اتضاف المنتج بنجاح وهيظهر في المتجر.";
       e.currentTarget.reset();loadAdminProducts();
     }catch(err){
       const detail=err.message||err.details||err.hint||"خطأ غير معروف";
       if(err.message==="اختار ملف صورة صحيح."||err.message==="حجم الصورة لازم يكون أقل من 5 ميجا.")feedback.textContent=err.message;
       else if(saveStage==="upload")feedback.textContent=(currentLang==="en"?"Image upload failed: ":"فشل رفع الصورة: ")+detail;
       else feedback.textContent=(currentLang==="en"?"Product data could not be saved: ":"فشل حفظ بيانات المنتج: ")+detail;
     }
   });
   async function loadOrders() {
     const box=$("#orders-list");box.textContent="جاري تحميل الطلبات...";
     const {data,error}=await db.from("orders").select("*").neq("status","delivered").order("created_at",{ascending:false});
     if(error){box.textContent="تعذر تحميل الطلبات. تأكد من صلاحيات الإدارة.";return;}
     box.innerHTML=data.length?data.map(o=>'<article class="order-card"><div class="order-top"><b>طلب #'+esc(o.tracking_code||o.id.slice(0,8).toUpperCase())+'</b><b>'+money(o.total)+'</b></div><p>'+esc(o.customer_name)+' · '+esc(o.phone)+'</p><p>'+esc(o.address)+'</p><div class="order-items">'+(o.items||[]).map(i=>esc(i.name)+' × '+i.qty).join("، ")+'</div>'+(o.notes?'<p>ملاحظات: '+esc(o.notes)+'</p>':'')+'<div class="status-controls"><label>حالة الطلب <select data-status="'+o.id+'"><option value="new" '+(o.status==="new"?"selected":"")+' >طلب جديد</option><option value="preparing" '+(o.status==="preparing"?"selected":"")+' >قيد التحضير</option><option value="completed" '+(o.status==="completed"?"selected":"")+' >جاهز</option><option value="out_for_delivery" '+(o.status==="out_for_delivery"?"selected":"")+' >خرج للتوصيل</option><option value="delivered" '+(o.status==="delivered"?"selected":"")+' >تم التسليم</option></select></label><small>'+new Date(o.created_at).toLocaleString(currentLang==="en"?"en-US":"ar-EG")+'</small></div></article>').join(""):'<div class="empty-state">لسه مفيش طلبات.</div>';
     applyLanguage(); box.querySelectorAll("[data-status]").forEach(s=>s.addEventListener("change",async()=>{s.disabled=true;const {error}=await db.from("orders").update({status:s.value}).eq("id",s.dataset.status);if(error){alert(currentLang==="en"?"Could not update order status.":"تعذر تحديث حالة الطلب.");s.disabled=false;return;}if(s.value==="delivered"){await loadOrders();}else{s.disabled=false;}}));
   }
   document.addEventListener("cafe-language-changed",loadAdminProducts);
   async function loadAdminProducts() {
     const box=$("#admin-products");box.textContent="جاري تحميل المنتجات...";
     const {data,error}=await db.from("products").select("*").order("created_at",{ascending:false});
     if(error){box.textContent="تعذر تحميل المنتجات.";return;}
     box.innerHTML=data.length?data.map(p=>'<div class="admin-product-row"><div><b>'+esc(currentLang==="en"?(p.name_en||p.name):(p.name_ar||p.name))+'</b><br><small>'+esc(currentLang==="en"?(p.name_ar||p.name):(p.name_en||p.name))+' · '+(currentLang==="en"?money(p.price_en??p.price):money(p.price_ar??p.price))+' · '+esc(currentLang==="en"?(p.category_en||p.category):(p.category_ar||p.category))+' · '+(p.is_available?"متاح":"مخفي")+'</small></div><button class="delete-btn" data-delete="'+p.id+'">حذف</button></div>').join(""):'<p class="muted">مفيش منتجات مضافة لسه.</p>';
     applyLanguage(); box.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",async()=>{if(!confirm(currentLang==="en"?"Are you sure you want to delete this product?":"متأكد إنك عايز تحذف المنتج؟"))return;const {error}=await db.from("products").delete().eq("id",b.dataset.delete);if(error)alert(currentLang==="en"?"Could not delete the product.":"تعذر حذف المنتج.");else loadAdminProducts();}));
   }
   db.channel("admin-live").on("postgres_changes",{event:"*",schema:"public",table:"orders"},loadOrders).on("postgres_changes",{event:"*",schema:"public",table:"products"},loadAdminProducts).subscribe();
 }
})();