const {getTopicInfo,
    getArticleInfo} 
    = require('../models/models');

exports.getTopics = (req,res) => {
    getTopicInfo().then((rows) => {
    res.status(200).send(rows)
    });
};

exports.getArticles = (req,res) => {
    getArticleInfo().then((articles) =>{
        res.status(200).send(articles)
    });
};