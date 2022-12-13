const express = require('express');
const app=express();

const {getTopics, 
    getArticles,
    getArticleId}
    =require('./controllers/controllers');


app.get('/api/topics',getTopics);

app.get('/api/articles', getArticles);

app.use((err,req,res,next) => {
    res.status(500).send()
})

module.exports=app;



//////
const {getTopicInfo,
    getArticleInfo} 
    = require('../models/models');

exports.getTopics = (req,res) => {
    getTopicInfo().then((rows) => {
    res.status(200).send(rows)
    });
};

exports.getArticles = (req,res,next) => {
    getArticleInfo().then((articles) =>{
        res.status(200).send({articles})
    })
    .catch((err) => {
        next(err)
    })
};

/////

const db = require('../db/connection');

exports.getTopicInfo = () =>{
    return db.query('SELECT * FROM topics;')
    .then(({rows}) => {
        return (rows);
    });
};

exports.getArticleInfo = () => {
    const sqlquery = 'SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;'
    return db.query(sqlquery)
    .then(({rows}) => {
        return (rows);
    });
}

/////
const { TestWatcher } = require('jest');
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => seed(testData));
afterAll(() => db.end());

//3
describe('GET /api/topics task 3',() => {
    test('responds with status code 200, an array, object with keys [slug, description] and with appropriate data types',() => {
        return request(app).get('/api/topics')
        .expect(200)
        .then(({body}) => {
            expect(body.topics.length).toBe(3);
            body.topics.forEach((topicObj) => {
                expect(topicObj).toEqual(
                    expect.objectContaining({
                      slug: expect.any(String),
                      description: expect.any(String),
                    }));
            });
        });
    });
});


//4
describe.only('GET /api/articles task 4',() => {
    test('responds with status code 200, appropriate object properties and values',() => {
        return request(app).get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body.articles)).toBe(true);
            body.articles.forEach((articleObj) => {
                expect(articleObj).toEqual(
                    expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(String)
                    }))
            });
        });
    });
});

////
TABLES
    >VALUES

//1
topics
    >slug
    >description

//2
users
    >username
    >name
    >avatar_url

//3
articles
    >article_id
    >title
    >topic
    >author
    >body
    >created_at
    >votes

//4
comments
    >comment_id
    >body
    >article_id
    >author
    >author
    >votes
    >created_at