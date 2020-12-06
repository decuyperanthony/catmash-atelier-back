const Cat = require("./cat");
const Vote = require("./vote");

/** Associations */

// association List <-> Card

Vote.belongsTo(Cat, {
    foreignKey: "cat_id",
    as: "cat"
});

Cat.hasMany(Vote, {
    foreignKey: "cat_id",
    as: "votes"
});

module.exports = {
    Cat,
    Vote
};