import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('posts', (table: Knex.CreateTableBuilder) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).unique();
    table.string('text').notNullable();
    table.uuid('author_id')
      .index()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('posts');
}
