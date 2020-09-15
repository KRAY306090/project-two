const { Post } = require('../models');

const postData = [
    {
        title: Grandmas-Cookies,
        ingredients: flour, sugar, love,
        post_text: 1,2,3,4,5...,
        category: Dessert,
        user_id: 3
    },

];

const seedPosts = () => Post.bulkCreate(post);

module.exports = seedPosts;
