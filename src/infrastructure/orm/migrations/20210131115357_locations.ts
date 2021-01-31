import Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('locations', table => {
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.text('name').notNullable();
        table.float('area_m2').notNullable();

        table.uuid('location_parent_id').defaultTo(0).notNullable(); // 0 EN CASO DE NO POSEER PADRE
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('locations');
}