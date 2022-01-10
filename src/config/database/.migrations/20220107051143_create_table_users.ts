import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('first_name').notNullable();
    table.string('last_name');
    table.string('email').notNullable().unique();
    table.string('username').notNullable().unique();
    table.string('password_hash').notNullable();
    table.dateTime('birthday');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
