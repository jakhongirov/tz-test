# README.yaml
nomi: Test Task

ta'rif: |
Bu loyiha Fastify va TypeScript asosida yozilgan kichik backend server bo‘lib,
Postgres bilan ishlaydi va Skinport API dan itemlarni olish imkonini beradi.
Loyihada quyidagi funksiyalar mavjud: - Skinport API dan itemlarni olish va minimal tradable / non-tradable narxlarni ko‘rsatish - Foydalanuvchi balansini yangilash va tekshirish - Health-check endpoint

tech_stack:

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Axios
- pg (Postgres client, ORM ishlatilmagan)

environment_variables:

- PORT: Server porti (default 3000)
- DATABASE_URL: Postgres ulanish URL (masalan: postgres://user:password@localhost:5432/dbname)

install_va_run:

- step1: git clone <repository-url>
- step2: cd backend-test-task
- step3: npm install
- step4: .env faylini yaratib environment variables ni sozlash
- step5: Development uchun: npm run dev
- step6: Production build uchun:
   - npm run build
   - npm start

endpoints:

- path: /health
  method: GET
  description: Serverning sog‘lomligini tekshirish
  response_example:
  status: ok

- path: /skinport/items
  method: GET
  query_params:
   - app_id: CS:GO uchun 730 (default)
   - currency: USD (default)
     description: Skinport API dan itemlarni olish va minimal tradable/non-tradable narxlarni qaytaradi
     response_example:
   - market_hash_name: "AK-47 | Redline"
     min_price_tradable: 12.34
     min_price_not_tradable: 10.50

- path: /users/:id/withdraw
  method: POST
  body_example:
  amount: 100
  description: Foydalanuvchi balansidan miqdor yechadi. Balans 0 dan past bo‘lishi mumkin emas.
  response_example:
  success: true
  remaining_balance: 400

structure:
src: - app.ts: Fastify app konfiguratsiyasi - server.ts: Serverni ishga tushirish - db/index.ts: Postgres ulanish - routes/skinport.ts: Skinport endpoint - routes/users.ts: Foydalanuvchi balans endpoint - services/skinport.service.ts: Skinport API logikasi - cache/skinport.cache.ts: In-memory cache - types/skinport.ts: TypeScript tiplari
sql: - init.sql: Bazani boshlang‘ich yaratish

notes: |

- Loyihada ORM ishlatilmagan
- In-memory cache ishlatilgan, TTL = 60 soniya
- TypeScript strict mode bilan ishlaydi
