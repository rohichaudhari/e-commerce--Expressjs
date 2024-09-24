const express = require('express');
const reviewRoutes = express.Router();
const { verifyToken } = require('../helpers/tokenverify');
const {
    addReview,
    getAllReview,
    deleteReview
} = require('../controller/review.controller');
reviewRoutes.post('/', verifyToken, addReview);
reviewRoutes.get('/', verifyToken, getAllReview);

reviewRoutes.delete('/', verifyToken, deleteReview);

module.exports = reviewRoutes;
  
    
