const { Post } = require('../models');

const postData = [
    {
        title: "Grandmas Cookies",
        ingredients: "flour, sugar, love",
        post_text: "instructions",
        category: "Dessert",
        user_id: 3
    },
    {
        title: "Strawberry Icebox Cake",
        ingredients: "whipped-cream, strawberries, grahamcrackers",
        post_text: "instructions",
        category: "Dessert",
        user_id: 3
    },
    {
        title: "Cookies & Ice-Cream Pie",
        ingredients: "peabut-butter, powderedsugar, chocolate",
        post_text: "instructions",
        category: "Dessert",
        user_id: 3
    },
    {
        title: "Peanut Butter Cups",
        ingredients: "flour, sugar, love",
        post_text: "instructions",
        category: "Dessert",
        user_id: 3
    },
    {
        title: "Grilled seafood platter",
        ingredients: "crabs, clams, lobster",
        post_text: "instructions",
        category: "Entree",
        user_id: 4
    },
    {
        title: "Oysters Rockefeller",
        ingredients: "oysters, breadcrumbs, bacon",
        post_text: "instructions",
        category: "Entree",
        user_id: 4
    },
    {
        title: "Stuffed zucchini",
        ingredients: "zucchini, meat, rice",
        post_text: "instructions",
        category: "Entree",
        user_id: 4
    },
    {
        title: "Saucy meatballs",
        ingredients: "meat, sauce, oil",
        post_text: "instructions",
        category: "Entree",
        user_id: 4
    },
    {
        title: "Manhattan",
        ingredients: "whisky, vermouth, bitters",
        post_text: "instructions",
        category: "Cocktail",
        user_id: 1
    },
    {
        title: "Old fashioned",
        ingredients: "whiskey, sugar, orange",
        post_text: "instructions",
        category: "Cocktail",
        user_id: 1
    },
    {
        title: "Bicicletta spritz",
        ingredients: "prosecco, campari, sodawater",
        post_text: "instructions",
        category: "Cocktail",
        user_id: 1
    },
     {
         title: "White russian",
         ingredients: "Vodka, coffee, cream",
         post_text: "instructions",
         category: "Cocktail",
         user_id: 1
     },



];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
