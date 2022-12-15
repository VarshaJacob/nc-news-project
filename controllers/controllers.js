const {getTopicInfo,
    getArticleInfo,
    getComments,
    getArticleIdInfo
    } 
    = require('../models/models');

const {checkExists}=require('../utils');

//3
exports.getTopics = (req,res) => {
    getTopicInfo().then((topics) => {
    res.status(200).send({topics})
    });
};

//4
exports.getArticles = (req,res,next) => {
    getArticleInfo().then((articles) =>{
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    });
};

//5
exports.getArticleId = (req,res,next) => {
    const {article_id}=req.params;
    getArticleIdInfo(article_id).then((article) => {
        res.status(200).send({article})
    })
    .catch((err) => {
        next(err)
    });
};

//6
exports.getCommentByArticleId = (req,res,next) => {
    const {article_id} = req.params;
    const promises = [checkExists('articles', 'article_id',article_id), getComments(article_id)]
    
    Promise.all(promises)
    .then((response) => {
        const comments=response[1]
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    });
};

