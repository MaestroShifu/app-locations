import Knex from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('locations', table => {
        table.increments('id').primary();
        table.text('name').notNullable();
        table.float('area_m2').notNullable();

        table.integer('location_parent_id').references('locations.id').onUpdate('CASCADE').onDelete('SET NULL'); // 0 EN CASO DE NO POSEER PADRE
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('locations');
}