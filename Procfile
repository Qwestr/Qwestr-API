release: cd prisma && touch dev.db
release: cd prisma && touch .env
release: cd prisma && echo 'DATABASE_URL="file:./dev.db"' >> .env
release: yarn migrate:update
release: yarn generate
web: yarn start
