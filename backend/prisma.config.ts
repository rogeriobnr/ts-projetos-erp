import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable');
}

export default {
  datasource: {
    provider: 'postgresql',
  },
  adapter: () => new PrismaPg({ connectionString: databaseUrl }),
};
