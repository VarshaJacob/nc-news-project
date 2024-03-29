const cors = require('cors'); 

const express = require('express');
const app=express();

//controllers
const {getTopics, 
    getArticles,
    getArticleId,
    getCommentByArticleId,
    postNewComment,
    patchArticleById,
    getUsers,
    deleteCommentById
    }
    =require('./controllers/controllers');

//controllers.error
const {handle404Paths,
    handle500,
    handlePsqlErrors,
    handleCustomErrors
    }
    =require('./controllers/controllers.error');

app.use(cors());
app.use(express.json());


//3
app.get('/api/topics',getTopics);

//4 //10
app.get('/api/articles', getArticles);

//5 //11
app.get('/api/articles/:article_id', getArticleId);

//6
app.get('/api/articles/:article_id/comments', getCommentByArticleId);

//7
app.post('/api/articles/:article_id/comments', postNewComment);

//8
app.patch('/api/articles/:article_id', patchArticleById);

//9
app.get('/api/users', getUsers);

//12
app.delete('/api/comments/:comment_id',deleteCommentById)

//endpoint not covered
app.all('*',handle404Paths)

//PSQL errors
app.use(handlePsqlErrors)

//custom errors
app.use(handleCustomErrors)

//Internal server error
app.use(handle500)

module.exports=app;