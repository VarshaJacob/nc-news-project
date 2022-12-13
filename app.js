const express = require('express');
const app=express();

const {getTopics, 
    getArticles,
    }
    =require('./controllers/controllers');


app.get('/api/topics',getTopics);

app.get('/api/articles', getArticles);


app.use((err,req,res,next) => {
    res.status(500).send()
})

module.exports=app;