**Tests**

- **Purpose:** Short guide to run the project tests locally using Docker and the repository test scripts.

**Prerequisites**

- **Docker:** Installed and running (Docker Engine and Docker Compose).
- **Node:** Use Node >=22 as required by the project.
- **Repository:** Clone and install dependencies with `npm install`.

- **Safety:** Tests are configured to refuse running against a non-test database. Set `TEST_DATABASE_URL` to a test database (name should include `test`) to avoid accidental data loss.

**Start Database**

- **Bring up services:** Start the Postgres service defined in the repository `docker-compose.yml`:

```sh
# From the repository root
docker compose up -d
```

- **Verify health:** Wait for the Postgres container to become healthy. The compose file exposes the DB on host port `5435`.

**Run Tests**

- **Install dependencies (if you haven't):**

```sh
npm install
```

- **Run the test suite:**

```sh
npm test
```

- **Run tests in watch mode:**

```sh
npm run test:watch
```

- **Run coverage:**

```sh
npm run test:coverage
```

**Stop Services**

- **Tear down containers:**

```sh
docker compose down
```

**Notes & References**

- **Scripts:** See the npm scripts in [package.json](package.json#L1-L120).
- **Compose file:** DB service and port mapping are defined in [docker-compose.yml](docker-compose.yml#L1-L40).
- **Prisma:** If you need to reset or migrate the database for tests, use the included npm scripts such as `npm run db:migrate` or `npm run db:reset` (be careful: `db:reset` will wipe data).

If you want, I can also add a short GitHub Actions workflow to run tests in CI.``
