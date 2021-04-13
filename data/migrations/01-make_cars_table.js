exports.up = function(knex){
    return knex.schema.createTable("cars", table =>{
        table.increments(); //create primary key (id), which auto increments
        table.text("vin", 128).unique().notNullable();
        table.text("make").notNullable();
        table.text("model").notNullable();
        table.decimal("mileage").notNullable();
        table.text("title", 128)
        table.text("transmission", 128)
    })
}
exports.down = function(knex){
    return knex.schema.dropTableIfExists("cars")
}