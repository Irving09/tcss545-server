const base = require('./base');

const ingredientMapper = (ingredient) => {
    return {
        id: ingredient.id,
        name: ingredient.name
    };
};

exports.findIngredient = function (id) {
    return base.queryOne(`SELECT * FROM Ingredient WHERE id = ${id};`).then(ingredientMapper);
};

exports.findIngredientByName = function (id, callback) {
    base.query(`SELECT * FROM Ingredient WHERE name LIKE '%${id}%';`, callback).then(rows => {
        return rows.map(ingredientMapper);
    });
};

exports.findOfferingIngredients = function (offeringId) {
    return base.query(`CALL FindOfferingIngredients(${offeringId});`).then(rows => {
        return rows[0].map(ingredientMapper);
    });
};