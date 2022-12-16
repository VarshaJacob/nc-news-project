const {getTopicInfo,
    getArticleInfo,
    getComments,
    getArticleIdInfo,
    addNewComment,
    updateArticleVotes,
    getUserInfo
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
    const {topic,sort_by,order} = req.query;
    getArticleInfo(topic,sort_by,order).then((articles) =>{
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
exports.postNewComment = (req,res,next) => {
    const {article_id} = req.params;
    const promises = [checkExists('articles','article_id',article_id),addNewComment(req.body,article_id)];

    Promise.all(promises)
    .then((response) => {
        const comment = response[1];
        res.status(201).send({comment});
    })
    .catch((err) => {
        next(err)
    });
};

//8
exports.patchArticleById = (req,res,next) => {
    const {article_id} = req.params;
    const promises = [checkExists('articles', 'article_id',article_id), updateArticleVotes(article_id,req.body)];
    

    Promise.all(promises)
    .then((response) => {
        const updatedArticle = response[1];
        res.status(200).send({updatedArticle})
    })
    .catch((err) => {
        next(err)
    });
};

//9
exports.getUsers = (req,res) => {
    getUserInfo().then((users) => {
        res.status(200).send({users})
    });
};
