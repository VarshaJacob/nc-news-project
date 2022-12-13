const {getTopicInfo,
    getArticleInfo,
    } 
    = require('../models/models');

exports.getTopics = (req,res) => {
    getTopicInfo().then((topics) => {
    res.status(200).send({topics})
    });
};

exports.getArticles = (req,res,next) => {
    getArticleInfo().then((articles) =>{
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    });
};

