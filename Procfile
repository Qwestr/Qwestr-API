release: touch prisma/dev.db
release: touch prisma/.env
release: echo 'DATABASE_URL="file:./dev.db"' >> prisma/.env
release: yarn migrate:update
release: yarn generate
web: yarn start
