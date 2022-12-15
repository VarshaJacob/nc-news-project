const {getTopicInfo,
    getArticleInfo,
    getComments,
    getArticleIdInfo,
    newComment
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
    const promises = [checkExists('articles', 'article_id',article_id),getArticleIdInfo(article_id)];
    
    Promise.all(promises)
    .then((response) => {
        const article=response[1];
        res.status(200).send({article});
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

//7
exports.addNewComment = (req,res,next) => {
    const {article_id} = req.params;
    const promises = [checkExists('articles','article_id',article_id),newComment(req.body,article_id)];

    Promise.all(promises)
    .then((response) => {
        const comment = response[1];
        res.status(201).send({comment});
    })
    .catch((err) => {
        next(err)
    });
};

