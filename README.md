# P2P Chat

Serversiz, to'g'ridan-to'g'ri (WebRTC) chat: matn, fayl, ovozli va video xabar. Yuborilgan matnni tahrirlash va ikkala tomondan o'chirish mumkin.

## Ishlatish

1. 1-qurilma: **Taklif kodini yaratish** → kodni do'stga yuboring (Telegram, SMS...).
2. 2-qurilma: **Qo'shilish** → kodni qo'yib, **Javob kodini yaratish** → javob kodini qaytaring.
3. 1-qurilma javob kodini kiritib **Ulanish** bosadi. Tamom — chat ochiladi.

Faqat shu bir marta kod almashiladi; keyin barcha ma'lumot to'g'ridan-to'g'ri qurilmalar orasida (shifrlangan) o'tadi. Hech qanday server yoki statik IP kerak emas.

- "Internet orqali ulanish" yoqilgan bo'lsa, NAT'ni aylanib o'tish uchun Google'ning ochiq STUN serveridan foydalaniladi (u faqat manzilni aniqlaydi, xabarlarni ko'rmaydi). O'chirilsa — faqat bir tarmoq (Wi‑Fi/LAN) ichida, tashqi xizmatsiz.
- Ba'zi qattiq korporativ/mobil tarmoqlarda (simmetrik NAT) to'g'ridan-to'g'ri ulanish bo'lmasligi mumkin; buning uchun TURN server kerak bo'ladi.

## Windows: portable EXE

Avtomatik (tavsiya): loyihani GitHub'ga yuklang → **Actions → Build P2P Chat → Run workflow**. Tayyor `P2PChat-portable.exe` "Artifacts"da chiqadi.

Qo'lda (Windows'da, Node.js 20+ bilan):

```
npm install
npm run dist:win
```

Natija: `dist/P2PChat-portable.exe` (o'rnatish shart emas; sozlamalari EXE yonidagi `P2PChat-data` papkasida).

Sinab ko'rish uchun: `npm start`.

## Telefon

- **Eng oson (tavsiya):** workflow `pages` ishini ham bajaradi → HTTPS havola hosil bo'ladi. Telefonda Chrome/Safari'da oching → "Bosh ekranga qo'shish". Birinchi ochilgandan keyin oflayn ham ochiladi, fayllarni saqlash ham to'liq ishlaydi.
- **APK:** workflow `android-apk` ishi `P2PChat-android-apk` artifactini beradi (debug APK; o'rnatish uchun "noma'lum manbalar"ga ruxsat bering). Eslatma: Android WebView'da qabul qilingan faylni "Saqlash" tugmasi ishlamasligi mumkin — fayl saqlash kerak bo'lsa, brauzer/PWA variantidan foydalaning.

## Fayl tuzilishi

- `www/` — ilovaning o'zi (`index.html`, PWA fayllari)
- `main.js`, `package.json` — Windows (Electron) qobig'i
- `.github/workflows/build.yml` — EXE, APK va veb-havolani avtomatik yig'ish
