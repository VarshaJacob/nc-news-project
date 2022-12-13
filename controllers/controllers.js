const {getTopicInfo,
    getArticleInfo,
    getArticleIdInfo} 
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

exports.getArticleId = (req,res) => {
    const {article_id}=req.params;
    getArticleIdInfo(article_id).then((article) => {
        res.status(200).send({article})
    });
}