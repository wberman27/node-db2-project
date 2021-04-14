// STRETCH
exports.seed = function(knex){
    return knex("cars").truncate()
    .then(function(){
        return knex("cars").insert([
            {vin: "11111111111111112", make: "Honda", model: "Prop", mileage: "1234", title: "Bob", transmission: "big"},
            {vin: "11111111111111113", make: "Ford", model: "Challenger", mileage: "456", title: "Joe", transmission: "bigger"},
            {vin: "11111111111111114", make: "Crystler", model: "CarModel", mileage: "78.9", title: "Tim", transmission: "biggest"},
        ])
    })
}