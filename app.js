const express = require('express');
const app=express();

//controllers
const {getTopics, 
    getArticles,
    getArticleId,
    getCommentByArticleId
    }
    =require('./controllers/controllers');

//controllers.error
const {handle404Paths,
    handle500,
    handlePsqlErrors,
    handleCustomErrors
    }
    =require('./controllers/controllers.error');

//3
app.get('/api/topics',getTopics);

//4
app.get('/api/articles', getArticles);

//5
app.get('/api/articles/:article_id', getArticleId);

//6
app.get('/api/articles/:article_id/comments', getCommentByArticleId)

//endpoint not covered
app.all('*',handle404Paths)

//PSQL errors
app.use(handlePsqlErrors)

//custom errors
app.use(handleCustomErrors)

//Internal server error
app.use(handle500)

module.exports=app;