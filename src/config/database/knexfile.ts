import type { Knex } from 'knex';

const {
  NODE_ENV,
  POSTGRES_DATABASE = 'matefeed',
  POSTGRES_HOST = '127.0.0.1',
  POSTGRES_PASSWORD = 'matefeed',
  POSTGRES_PORT = 5432,
  POSTGRES_USER = 'matefeed',
} = process.env;

export default {
  client: 'postgresql',
  connection: {
    database: POSTGRES_DATABASE,
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
    port: POSTGRES_PORT,
    user: POSTGRES_USER,
    debug: NODE_ENV !== 'production',
  },
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './.migrations',
  },
  seeds: {
    directory: './.seeds',
  },
  debug: true,
} as Knex.Config;
