const {getTopicInfo,
    getArticleInfo,
    getArticleIdInfo
    } 
    = require('../models/models');

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
        console.log(err)
        next(err)
    });
};

