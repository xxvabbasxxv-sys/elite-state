# QBCore Control

لوحة خاصة مبنية لـ **Vercel + QBCore + qb-inventory**. لا تفتح منفذًا على جهازك: مورد FiveM يسحب الأوامر من Vercel باتصال HTTPS صادر.

## النشر

1. أنشئ قاعدة PostgreSQL مرتبطة بـVercel (مثل Neon من Marketplace)، ثم شغّل محتوى `db/schema.sql` في Query tab.
2. ارفع هذا المجلد إلى GitHub واربطه بـ Vercel. أضف متغيرات `.env.example` في إعدادات المشروع. أنشئ السرّين مثلًا عبر `openssl rand -hex 32`.
3. انسخ `fivem-resource` إلى `resources/[local]/qb-admin-bridge` ثم أضف التالي إلى `server.cfg` (ضع رابط النشر النهائي):

```cfg
set qb_panel_endpoint "https://YOUR-PROJECT.vercel.app"
set qb_panel_agent_key "نفس قيمة AGENT_KEY في Vercel"
ensure qb-admin-bridge
```

4. لا تمنح رابط Vercel أو `AGENT_KEY` لأي أحد. يجب وضع مورد الـbridge بعد `qb-core` و`qb-inventory`.

## ملاحظات مهمة

- **HeidiSQL برنامج إدارة لقاعدة البيانات وليس قاعدة بيانات**. إذا كان سيرفرك يستعمل MySQL/MariaDB وتفتحه عبر HeidiSQL، اتركه لـQBCore كما هو. هذه اللوحة تستخدم قاعدة PostgreSQL منفصلة للأوامر والسجل. هذا مقصود: غالبًا تكون MySQL على Windows وغير متاحة بأمان لـVercel، ولا تحتاج اللوحة وصولًا مباشرًا إليها.
- إجراءات `give_item` و`remove_item` تستعمل واجهات `qb-inventory`، ولذلك تحترم سعة الحقيبة والتحقق من الـitems.
- أمر `ban` يرسل `txaBan`. تحقّق منه على نسختك من txAdmin أولًا؛ واجهة أوامر txAdmin قد تختلف بين الإصدارات.
- أمر Console يملك صلاحية كاملة داخل FXServer. لا تضف مديرين إليه قبل إضافة نظام حسابات وأدوار منفصل.
- إيقاف وتشغيل عملية FXServer أو جهاز Windows نفسه يتطلب Windows Agent، وهو غير مضمّن عمدًا داخل مورد FiveM؛ لا تمنح تطبيق الويب صلاحية Windows الكاملة دون فصل أدوار ومراجعة أمنية.
