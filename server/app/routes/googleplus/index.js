"use strict";
var router = require("express").Router();
require("../../../db/models");
//var mongoose = require("mongoose");
module.exports = router;
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/googleplus/:url', function(req) {
    request(req.params.url, function(err, res, body) {
        if (!err & res.statusCode === 200) {
            var $ = cheerio.load(body);
            var numFollowers = $('span.count', '.primary_item').text();
            console.log(numFollowers);
            var numReviews = $('span.hidden', '.TopicReviewRatingLabel').find('span.count').find('span.value-title').attr('title');
            console.log(numReviews);
            var avgRating = $('span.review_rating').children().length;
            console.log(avgRating);
            res.json({
                googlePlusNumFollowers: numFollowers,
                googlePlusNumReviews: numReviews,
                googlePlusAvgRating: avgRating
            });
        }
    });
});

// the struggle is real. NOT DONE.