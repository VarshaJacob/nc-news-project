const {getTopicInfo,
    getArticleInfo,
    getComments
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

exports.getCommentByArticleId = (req,res,next) => {
    const {article_id} = req.params;
    getComments(article_id).then((comments) =>{
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    });
};