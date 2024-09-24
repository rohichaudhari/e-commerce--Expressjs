const express = require('express');
const favoriteRoutes = express.Router();
const { verifyToken } = require('../helpers/tokenverify');

const {
    addToFavorite,
    getAllFavorite,
    deleteFavorite
} = require('../controller/wishlist.controller')

favoriteRoutes.post('/', verifyToken, addToFavorite);
favoriteRoutes.get('/', verifyToken, getAllFavorite);
favoriteRoutes.delete('/', verifyToken, deleteFavorite);

module.exports = favoriteRoutes;