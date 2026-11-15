# نشر LFAEA على GitHub Pages بدون Node.js

هذه النسخة Static بالكامل، وتعمل من ملفات HTML وCSS وJavaScript وJSON المرفقة. لا تحتاج إلى Node.js أو Render أو Vercel أو مفتاح API.

## خطوات النشر

1. فك ضغط ملف ZIP.
2. افتح المجلد الذي يحتوي مباشرة على `index.html`.
3. ارفع **كل محتويات المجلد** إلى جذر مستودع GitHub؛ لا ترفع المجلد الأب كطبقة إضافية.
4. افتح المستودع ثم **Settings → Pages**.
5. في **Build and deployment** اختر **Deploy from a branch**.
6. اختر `main` ثم `/ (root)` واضغط Save.
7. بعد اكتمال النشر افتح رابط GitHub Pages.

## ملاحظات

- لا تحتاج إلى إعداد Build command أو Output directory.
- ملفات البيانات موجودة في `datasets/derived/`، والملفات المصدرية في `datasets/raw/`.
- ملفات PDF موجودة في `references/`.
- مساعد الأبحاث يعمل محليًا بالبحث في المقتطفات المرفقة، وليس نموذجًا توليديًا متصلًا بالإنترنت.
- لا تضف API key إلى ملفات الموقع العامة.
- احذف من المستودع عند استبدال النسخة القديمة أي ملفات تشغيل قديمة مثل `server.ts` أو `server.mjs` أو `package.json` أو `render.yaml` أو `vercel.json`، ومجلد `api/`، وملفات التشغيل القديمة. هذه النسخة لا تستخدم أيًا منها. لا ترفع ملف `.env` أو أي مفاتيح سرية.

## اختبار سريع بعد النشر

- افتح الصفحة الرئيسية.
- افتح Investigation Library وتأكد من ظهور السجلات.
- افتح PSI Data Studio وتأكد من تحميل الرسوم والبيانات.
- افتح Research Assistant واسأل: `What is missing before PSI-159 flow can be calculated?`
- افتح أحد مراجع PDF من قسم Method & Quality.
- The PDF "NASA_PSI_Microgravity_Combustion_Review_EN_With_Uploaded_Data.pdf" carries the note: "This document is solely my personal effort."
