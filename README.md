# Ticketflow API

Ticketflow API is a Node.js/TypeScript backend starter repository for a ticket management system. It is intentionally designed for a training exercise where students must explore an unfamiliar codebase, trace the existing request flow, and then extend it with ticket comments and status history later.

The current starter includes authentication, authorization, ticket CRUD, assignment, status transitions, pagination, Prisma migrations, seed data, tests, and Dockerized PostgreSQL. It intentionally stops before implementing comments or status-history features.

## Architecture

The application follows a simple layered architecture:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Prisma
  ↓
PostgreSQL
```

Business logic lives in services. Controllers stay thin. Repositories isolate Prisma data access so students can follow existing conventions when adding new features.

## Tech Stack

- Node.js 22+
- TypeScript with strict mode
- Express
- Prisma ORM
- PostgreSQL 16
- Zod
- JWT authentication
- bcrypt password hashing
- Vitest
- Supertest
- ESLint
- Prettier
- Docker and Docker Compose

## Prerequisites

- Node.js 22+
- npm
- Docker
- Docker Compose

## Setup

````bash
git clone <repo>
cd ticketflow-api

npm install

cp .env.example .env

docker compose up -d

npm run db:migrate
npm run db:seed


npm run dev

Alternatively, run the included helper to prepare the database (generate Prisma client, run migrations, and seed):

```bash
npm run setup:db
````

Husky (git hooks)

This repository uses Husky + lint-staged to run Prettier and ESLint on commits. Husky is installed automatically on `npm install` because the project includes a `prepare` script. To initialise hooks manually (if needed), run:

```bash
npm run prepare
```

````

The API starts on `http://localhost:3000`.

Swagger documentation is available at `http://localhost:3000/api/docs`.

## Environment Variables

Copy the example file before starting:

```bash
cp .env.example .env
````

Example values:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://ticket_user:ticket_password@localhost:5435/ticket_management"
JWT_SECRET="change-me-in-development"
JWT_EXPIRES_IN="1h"
```

## Test Credentials

The seed creates these development accounts:

- `admin@example.com` / `Admin123!` / `ADMIN`
- `agent@example.com` / `Agent123!` / `AGENT`
- `user1@example.com` / `User123!` / `USER`
- `user2@example.com` / `User234!` / `USER`

## API Endpoints

### Health

- `GET /health`

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Usage Example

Login to receive a JWT and use it as a Bearer token for protected endpoints.

- Login and extract token:

```bash
curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"User123!"}' \
  | jq -r '.data.token'
```

- Call a protected endpoint with the token:

```bash
TOKEN="<paste-token-here>"
curl -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/users
```

The server expects the `Authorization` header in the form `Bearer <token>` for routes protected by authentication middleware.

### Users

- `GET /api/users`

### Tickets

- `POST /api/tickets`
- `GET /api/tickets?page=1&limit=20`
- `GET /api/tickets/:id`
- `PATCH /api/tickets/:id`
- `DELETE /api/tickets/:id`
- `PATCH /api/tickets/:id/status`
- `PATCH /api/tickets/:id/assign`

## Authorization Model

### ADMIN

- Can view all tickets
- Can create tickets
- Can update any ticket
- Can assign tickets
- Can change ticket status
- Can delete tickets

### AGENT

- Can view tickets
- Can create tickets
- Can update tickets assigned to them
- Can change status of tickets assigned to them
- Can assign tickets to themselves

### USER

- Can create tickets
- Can view tickets they created
- Can update their own open tickets

## Database

Prisma schema lives in `prisma/schema.prisma`.

Useful commands:

```bash
npm run db:migrate
npm run db:seed
npm run db:reset
npm run db:studio
```

The initial migration is committed in `prisma/migrations`.

## Testing

Run the full suite with:

```bash
npm test
```

Other useful commands:

```bash
npm run test:watch
npm run test:coverage
```

Integration tests use a separate PostgreSQL database named `ticket_management_test`, created by Docker. The tests point to that database automatically so your development data is not reset.

If you want to override the test database connection, set `TEST_DATABASE_URL` when running tests:

```bash
TEST_DATABASE_URL="postgresql://ticket_user:ticket_password@localhost:5432/ticket_management_test" npm test
```

Before running tests, make sure PostgreSQL is running:

```bash
docker compose up -d
```

## Project Structure

```text
src/
  app.ts
  server.ts
  config/
  middleware/
  db/
  modules/
    auth/
    users/
    tickets/
  types/
  utils/
prisma/
  schema.prisma
  migrations/
  seed.ts
tests/
  unit/
  integration/
docs/
docker/
```

## Useful Commands

```bash
npm install
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
npm run build
npm test
npm run lint
npm run format:check
```

## Day 15 Exercise Files

- `docs/day-15-ticket.md`
- `docs/impact-analysis-template.md`

## Intentionally Not Implemented

This starter repository does **not** implement:

- ticket comments
- comment endpoints
- status history
- status-history endpoints
- related database models or migrations

Those are intentionally reserved for the Day 15 exercise.
