# FILM!

Киноафиша с возможностью бронирования билетов. Full-stack приложение на React + TypeScript (фронтенд) и Nest.js + PostgreSQL (бэкенд).

# Production Application:
https://film-nest-react.nomorepartiessbs.ru

# Admin Panel (PgAdmin):
http://158.160.170.16:8080
- Email: admin@example.com  
- Password: admin

# API Endpoints
- `GET /api/afisha/films` - список фильмов
- `GET /api/afisha/films/:id/schedule` - расписание фильма  
- `POST /api/afisha/order` - создание заказа

# Backend

cd backend
`npm ci` или `yarn install --frozen-lockfile`
`npm run start:dev` или `npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.

# Backend tests
cd backend && npm run test




