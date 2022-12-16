const express = require('express');
const app=express();

//controllers
const {getTopics, 
    getArticles,
    getArticleId,
    getCommentByArticleId,
    patchArticleById
    }
    =require('./controllers/controllers');

//controllers.error
const {handle404Paths,
    handle500,
    handlePsqlErrors,
    handleCustomErrors
    }
    =require('./controllers/controllers.error');

app.use(express.json())

//3
app.get('/api/topics',getTopics);

//4
app.get('/api/articles', getArticles);

//5
app.get('/api/articles/:article_id', getArticleId);

//6
app.get('/api/articles/:article_id/comments', getCommentByArticleId)

//8
app.patch('/api/articles/:article_id', patchArticleById)

//endpoint not covered
app.all('*',handle404Paths)

//PSQL errors
app.use(handlePsqlErrors)

//custom errors
app.use(handleCustomErrors)

//Internal server error
app.use(handle500)

module.exports=app;