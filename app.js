(() => {
 const cfg = window.CAFE_CONFIG || {};
 const ready = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
 const page = document.body.dataset.page;
 const $ = (s) => document.querySelector(s);
 let currentLang=localStorage.getItem("cafe-language")||"ar";
 const words={"كافيه":"Cafe","قهوة ومذاق يروق يومك":"Coffee & a little joy","السلة":"Cart","أهلاً بيك في مكانك":"Welcome to your place","خد لحظة راحة،":"Take a little break,","واختار مزاجك.":"choose your mood.","قهوة بتحبها وحاجة حلوة تكمل يومك.":"Coffee you love and a sweet treat for your day.","شوف المنيو":"Explore menu","اختياراتنا":"Our picks","المنيو":"Menu","اختار اللي على مزاجك":"Choose what you like","طلبك":"Your order","سلة المشتريات":"Shopping cart","الإجمالي":"Total","بيانات التوصيل":"Delivery details","الاسم":"Name","رقم الموبايل":"Phone number","العنوان بالتفصيل":"Full address","ملاحظات (اختياري)":"Notes (optional)","تأكيد الطلب":"Place order","دخول الإدارة":"Admin","كافيه — معمول بحب":"Cafe — made with love","عرض المتجر ↗":"View store ↗","لوحة الإدارة":"Admin dashboard","مساحة الإدارة":"Admin area","أهلاً بعودتك":"Welcome back","سجّل دخولك لإدارة المنتجات والطلبات.":"Sign in to manage products and orders.","البريد الإلكتروني":"Email","كلمة المرور":"Password","تسجيل الدخول":"Sign in","نظرة عامة":"Overview","إدارة الكافيه":"Cafe management","تسجيل الخروج":"Log out","الطلبات":"Orders","المنتجات":"Products","الطلبات الواردة":"Incoming orders","تحديث":"Refresh","إضافة منتج جديد":"Add a new product","اسم المنتج":"Product name","السعر بالجنيه":"Price (EGP)","التصنيف":"Category","صورة المنتج من جهازك":"Product image from your device","اختار صورة من الموبايل أو الكمبيوتر":"Choose an image from your phone or computer","وصف بسيط":"Short description","إضافة المنتج":"Add product","المنتجات الحالية":"Current products","العودة للمتجر":"Back to store","السلة لسه فاضية. اختار حاجة من المنيو ☕":"Your cart is empty. Choose something from the menu ☕","الكل":"All","طلب جديد":"New order","قيد التحضير":"Preparing","جاهز":"Ready","تم التسليم":"Delivered","حالة الطلب":"Order status","مفيش منتجات مضافة لسه.":"No products added yet.","لسه مفيش طلبات.":"No orders yet.","المنيو بيتجهز حالياً، تابعنا قريباً ☕":"The menu is being prepared. Check back soon ☕","بنحمّل المنيو...":"Loading menu...","جاري تحميل الطلبات...":"Loading orders...","جاري تحميل المنتجات...":"Loading products...","متاح":"Available","مخفي":"Hidden","حذف":"Delete","ملاحظات:":"Notes:","ضيف منتجات للسلة الأول.":"Add products to your cart first.","جاري إرسال الطلب...":"Sending your order...","تم استلام طلبك بنجاح! رقم الطلب: ":"Your order was received! Order number: ","ما قدرناش نبعت الطلب. حاول تاني بعد التأكد من الاتصال.":"Could not send the order. Please try again.","جاري تسجيل الدخول...":"Signing in...","بيانات الدخول غير صحيحة أو الحساب غير مفعّل.":"Incorrect login details or account not activated.","جاري إضافة المنتج...":"Adding product...","اتضاف المنتج بنجاح وهيظهر في المتجر.":"Product added! It will appear in the store.","تعذرت الإضافة. راجع الاتصال والحقول.":"Could not add product. Check your connection and fields.","تعذر تحميل الطلبات. تأكد من صلاحيات الإدارة.":"Could not load orders. Check admin permissions.","تعذر تحميل المنتجات.":"Could not load products.","تعذر تحميل المنيو. تأكد من إعداد قاعدة البيانات.":"Could not load menu. Check database setup."};
 const reverseWords=Object.fromEntries(Object.entries(words).map(([ar,en])=>[en,ar]));
 function applyLanguage(){const en=currentLang==="en";document.documentElement.lang=en?"en":"ar";document.documentElement.dir=en?"ltr":"rtl";document.querySelectorAll("[data-language-toggle]").forEach(x=>x.textContent=en?"العربية":"English");const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.nodeValue.trim();if(!t)continue;const v=en?words[t]:reverseWords[t];if(v)n.nodeValue=n.nodeValue.replace(t,v);}document.querySelectorAll("input,textarea").forEach(x=>{if(x.placeholder){const v=en?words[x.placeholder]:reverseWords[x.placeholder];if(v)x.placeholder=v;}});}
 document.querySelectorAll("[data-language-toggle]").forEach(x=>x.addEventListener("click",()=>{currentLang=currentLang==="ar"?"en":"ar";localStorage.setItem("cafe-language",currentLang);applyLanguage();}));
 applyLanguage();

 const money = (n) => Number(n || 0).toLocaleString("ar-EG") + " ج.م";
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
   let products = [], cart = [], activeCategory = "الكل";
   const productBox = $("#products");
   function renderCategories() {
     const cats = ["الكل", ...new Set(products.map(p => p.category).filter(Boolean))];
     $("#categories").innerHTML = cats.map(c => '<button class="category-chip '+(activeCategory===c?'active':'')+'" data-cat="'+esc(c)+'">'+esc(c)+'</button>').join("");
     $("#categories").querySelectorAll("button").forEach(b => b.addEventListener("click", () => { activeCategory=b.dataset.cat; renderCategories(); renderProducts(); }));
   }
   function renderProducts() {
     const visible = products.filter(p => p.is_available && (activeCategory==="الكل" || p.category===activeCategory));
     productBox.innerHTML = visible.length ? visible.map(p => '<article class="product-card"><div class="product-image">'+(p.image_url?'<img src="'+esc(p.image_url)+'" alt="'+esc(p.name)+'" loading="lazy" onerror="this.style.display=\'none\'">':'<span class="product-placeholder">☕</span>')+'</div><div class="product-info"><h3>'+esc(p.name)+'</h3><p>'+esc(p.description || p.category || "")+'</p><div class="product-bottom"><span class="price">'+money(p.price)+'</span><button class="add-btn" data-add="'+p.id+'" aria-label="أضف للسلة">+</button></div></div></article>').join("") : '<div class="empty-state">المنيو بيتجهز حالياً، تابعنا قريباً ☕</div>';
     productBox.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => addToCart(b.dataset.add)));
   }
   function addToCart(id) { const p=products.find(x=>x.id===id); if(!p)return; const item=cart.find(x=>x.id===id); item?item.qty++:cart.push({id:p.id,name:p.name,price:Number(p.price),qty:1}); renderCart(); }
   function renderCart() {
     const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+x.price*x.qty,0);
     $("#cart-count").textContent=count; $("#cart-total").textContent=money(total);
     $("#cart-items").innerHTML=cart.length?cart.map(x=>'<div class="cart-row"><div><b>'+esc(x.name)+'</b><br><small>'+money(x.price)+' للواحد</small></div><div class="qty-controls"><button data-minus="'+x.id+'">−</button><b>'+x.qty+'</b><button data-plus="'+x.id+'">+</button></div><b>'+money(x.price*x.qty)+'</b></div>').join(""):'<p class="muted">السلة لسه فاضية. اختار حاجة من المنيو ☕</p>';
     $("#cart-items").querySelectorAll("[data-minus]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.minus,-1)));
     $("#cart-items").querySelectorAll("[data-plus]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.plus,1)));
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
     const f=new FormData(e.currentTarget), total=cart.reduce((s,x)=>s+x.price*x.qty,0);
     const order={customer_name:f.get("customer_name").trim(),phone:f.get("phone").trim(),address:f.get("address").trim(),notes:f.get("notes").trim(),items:cart.map(({id,name,price,qty})=>({id,name,price,qty})),total,status:"new"};
     feedback.textContent="جاري إرسال الطلب...";
     const {data,error}=await db.from("orders").insert(order).select("id").single();
     if(error){feedback.textContent="ما قدرناش نبعت الطلب. حاول تاني بعد التأكد من الاتصال.";return;}
     feedback.textContent="تم استلام طلبك بنجاح! رقم الطلب: "+data.id.slice(0,8).toUpperCase();
     cart=[];renderCart();e.currentTarget.reset();
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
     e.preventDefault();const f=new FormData(e.currentTarget);$("#login-feedback").textContent="جاري تسجيل الدخول...";
     const {error}=await db.auth.signInWithPassword({email:f.get("email"),password:f.get("password")});
     $("#login-feedback").textContent=error?"بيانات الدخول غير صحيحة أو الحساب غير مفعّل.":"";
   });
   $("#logout-btn").addEventListener("click",()=>db.auth.signOut());
   document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
     document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x===b));
     document.querySelectorAll(".admin-view").forEach(x=>x.hidden=x.id!==b.dataset.tab);
   }));
   $("#refresh-orders").addEventListener("click",loadOrders);
   $("#product-form").addEventListener("submit",async e=>{
     e.preventDefault();const f=new FormData(e.currentTarget);const file=f.get("image_file");
     const payload={name:f.get("name").trim(),price:Number(f.get("price")),category:f.get("category").trim(),image_url:null,description:f.get("description").trim()||null};
     const feedback=$("#product-feedback");feedback.textContent=currentLang==="en"?"Adding product...":"جاري إضافة المنتج...";
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
       const {error}=await db.from("products").insert(payload);if(error)throw error;
       feedback.textContent=currentLang==="en"?"Product added and will appear in the store.":"اتضاف المنتج بنجاح وهيظهر في المتجر.";
       e.currentTarget.reset();loadAdminProducts();
     }catch(err){feedback.textContent=(err.message==="اختار ملف صورة صحيح."||err.message==="حجم الصورة لازم يكون أقل من 5 ميجا.")?err.message:(currentLang==="en"?"Could not add product. Check image storage setup and permissions.":"تعذرت الإضافة. تأكد من إعداد رفع الصور والصلاحيات.");}
   });
   async function loadOrders() {
     const box=$("#orders-list");box.textContent="جاري تحميل الطلبات...";
     const {data,error}=await db.from("orders").select("*").order("created_at",{ascending:false});
     if(error){box.textContent="تعذر تحميل الطلبات. تأكد من صلاحيات الإدارة.";return;}
     box.innerHTML=data.length?data.map(o=>'<article class="order-card"><div class="order-top"><b>طلب #'+esc(o.id.slice(0,8).toUpperCase())+'</b><b>'+money(o.total)+'</b></div><p>'+esc(o.customer_name)+' · '+esc(o.phone)+'</p><p>'+esc(o.address)+'</p><div class="order-items">'+(o.items||[]).map(i=>esc(i.name)+' × '+i.qty).join("، ")+'</div>'+(o.notes?'<p>ملاحظات: '+esc(o.notes)+'</p>':'')+'<div class="status-controls"><label>حالة الطلب <select data-status="'+o.id+'"><option value="new" '+(o.status==="new"?"selected":"")+'>طلب جديد</option><option value="preparing" '+(o.status==="preparing"?"selected":"")+'>قيد التحضير</option><option value="completed" '+(o.status==="completed"?"selected":"")+'>جاهز</option><option value="delivered" '+(o.status==="delivered"?"selected":"")+'>تم التسليم</option></select></label><small>'+new Date(o.created_at).toLocaleString("ar-EG")+'</small></div></article>').join(""):'<div class="empty-state">لسه مفيش طلبات.</div>';
     box.querySelectorAll("[data-status]").forEach(s=>s.addEventListener("change",async()=>{const {error}=await db.from("orders").update({status:s.value}).eq("id",s.dataset.status);if(error)alert("تعذر تحديث حالة الطلب.");}));
   }
   async function loadAdminProducts() {
     const box=$("#admin-products");box.textContent="جاري تحميل المنتجات...";
     const {data,error}=await db.from("products").select("*").order("created_at",{ascending:false});
     if(error){box.textContent="تعذر تحميل المنتجات.";return;}
     box.innerHTML=data.length?data.map(p=>'<div class="admin-product-row"><div><b>'+esc(p.name)+'</b><br><small>'+money(p.price)+' · '+esc(p.category)+' · '+(p.is_available?"متاح":"مخفي")+'</small></div><button class="delete-btn" data-delete="'+p.id+'">حذف</button></div>').join(""):'<p class="muted">مفيش منتجات مضافة لسه.</p>';
     box.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",async()=>{if(!confirm("متأكد إنك عايز تحذف المنتج؟"))return;const {error}=await db.from("products").delete().eq("id",b.dataset.delete);if(error)alert("تعذر حذف المنتج.");else loadAdminProducts();}));
   }
   db.channel("admin-live").on("postgres_changes",{event:"*",schema:"public",table:"orders"},loadOrders).on("postgres_changes",{event:"*",schema:"public",table:"products"},loadAdminProducts).subscribe();
 }
})();