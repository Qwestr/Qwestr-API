web: touch prisma/dev.db
web: touch prisma/.env
web: echo 'DATABASE_URL="file:./dev.db"' >> prisma/.env
web: yarn migrate:update
web: yarn generate
web: yarn start
