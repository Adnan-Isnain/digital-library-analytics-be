run:
	npm run start

build:
	npm run build

generate:
	npx prisma generate --schema=src/plugins/prisma/schema.prisma

migrate:
	npx prisma migrate dev --schema=src/plugins/prisma/schema.prisma

migrate-reset:
	npx prisma migrate reset --schema=src/plugins/prisma/schema.prisma --force

seed:
	npx prisma db seed