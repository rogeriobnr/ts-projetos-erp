## O que foi feito

- Removi `url = env("DATABASE_URL")` do `datasource` em `backend/prisma/schema.prisma`.
- Adicionei `backend/prisma.config.ts` que exporta um adapter `PrismaPg` usando `DATABASE_URL`.
- Atualizei `backend/src/prisma/prisma.service.ts` para inicializar `PrismaClient` com `adapter: new PrismaPg({ connectionString })`.
- Adicionei dependência `@prisma/adapter-pg` em `backend/package.json`.

## Por que

Compatibilidade com Prisma 7+: a URL de conexão não deve mais ficar no `schema.prisma`. Agora a conexão é fornecida em runtime via adapter/config, o que é o comportamento correto para Migrate e Prisma Client.

## Como testar

1. `npm install`
2. `npx prisma generate`
3. `npx tsc --noEmit -p tsconfig.json`
4. `npm run start:dev`
5. `npx prisma migrate dev`

## Observações

- Branch remota existente: `feat/prisma-adapter-config`
- PR pode ser criado no GitHub usando o link abaixo.
