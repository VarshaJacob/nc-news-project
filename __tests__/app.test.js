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
describe('GET /api/articles task 4',() => {
    test('responds with status code 200, appropriate object properties and values',() => {
        return request(app).get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles.length).toBe(12);
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
    test('response is in descding order of create_at',() => {
        return request(app).get('/api/articles')
        .then(({body}) => {
            const descOrder= body.articles.sort((a,b) => b.created_at - a.created_at)
            expect(body.articles).toEqual(descOrder)
        })
    })
});

//5
describe('GET /api/articles/:article_id task 5',() => {
    test('responds with status code 200, appropriate object properties and values',() => {
        const reqarticle_id=1
        return request(app).get(`/api/articles/${reqarticle_id}`)
        .expect(200)
        .then(({body}) =>{
            expect(body.article).toEqual(
                expect.objectContaining({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: reqarticle_id,
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                }))
        });
    });
    test('responds with status code 404, when article_id is valid but non-existent',() => {
        const reqarticle_id=89
        return request(app).get(`/api/articles/${reqarticle_id}`)
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual({message: 'Article ID not found'})
        });
    });
    test('responds with status code 400, when article_id is invalid',() => {
        const reqarticle_id="varsha"
        return request(app).get(`/api/articles/${reqarticle_id}`)
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual({message: 'Invalid endpoint'})
        });
    });
});

//6
describe('GET /api/articles/:article_id/comments task 6',() => {
    test('responds with status code 200, an array, object with appropriate data types',() => {
        const reqarticle_id = 1;
        return request(app).get(`/api/articles/${reqarticle_id}/comments`)
        .expect(200)
        .then(({body}) => {
            expect(body.comments.length).toBe(11)
            body.comments.forEach((commentObj) => {
                expect(commentObj).toEqual(
                    expect.objectContaining({
                      comment_id: expect.any(Number),
                      votes: expect.any(Number),
                      created_at: expect.any(String),
                      author: expect.any(String),
                      body: expect.any(String)
                    }));
            });
        });
    });
    test('responds with comments in descending order of creates_at',() => {
        const reqarticle_id = 1;
        return request(app).get(`/api/articles/${reqarticle_id}/comments`)
        .then(({body}) => {
            const descOrder= body.comments.sort((a,b) => b.created_at - a.created_at);
            expect(body.comments).toEqual(descOrder)
        });
    });
    test('responds with status code 404, when article_id is valid but non-existent',() => {
        const reqarticle_id=89
        return request(app).get(`/api/articles/${reqarticle_id}/comments`)
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual({message: 'article_id not found'})
        });
    });
    test('responds with status code 400, when article_id is invalid',() => {
        const reqarticle_id="varsha"
        return request(app).get(`/api/articles/${reqarticle_id}/comments`)
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual({message: 'Invalid endpoint'})
        });
    });
    test('responds with status code 200, when article_id has no comments gives empty array',() => {
        const reqarticle_id= 10
        return request(app).get(`/api/articles/${reqarticle_id}/comments`)
        .expect(200)
        .then((res) => {
            expect(res.body.comments).toEqual([])
        });
    });
});

//8
describe('PATCH /api/articles/:article_id task 8',() => {
    test('responds with status code 200, updates article and returns updated article',() => {
        const reqArticleID = 1;
        const votesToUpdate = {inc_votes: 29}
        return request(app).patch(`/api/articles/${reqArticleID}`)
        .send(votesToUpdate)
        .expect(200)
        .then(({body}) => {
            expect(body.updatedArticle).toEqual(
                expect.objectContaining({
                    article_id: 1,
                    title: "Living in the shadow of a great man",
                    topic: "mitch",
                    author: "butter_bridge",
                    body: "I find this existence challenging",
                    created_at: expect.any(String),
                    votes: 129,
                }));
        });
    });
    test('responds with status code 400, when input is missing',() => {
        const reqArticleID = 1;
        const votesToUpdate = {}
        return request(app).patch(`/api/articles/${reqArticleID}`)
        .send(votesToUpdate)
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual({message: "Missing information"})
        });
    });
    test('responds with status code 400, for invalid input',() => {
        const reqArticleID = 1;
        const votesToUpdate = {inc_votes: "varsha"}
        return request(app).patch(`/api/articles/${reqArticleID}`)
        .send(votesToUpdate)
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual({message: "Invalid input"})
        });
    });
    test('responds with status code 404, when article_id is valid but non-existent',() => {
        const reqArticleId=89
        const votesToUpdate = {inc_votes: 29}
        return request(app).patch(`/api/articles/${reqArticleId}`)
        .send(votesToUpdate)
        .expect(404)
        .then((res) => {
            expect(res.body).toEqual({message: 'article_id not found'})
        });
    });
    test('responds with status code 400, when article_id is invalid',() => {
        const reqArticleId="varsha"
        const votesToUpdate = {inc_votes: 29}
        return request(app).patch(`/api/articles/${reqArticleId}`)
        .send(votesToUpdate)
        .expect(400)
        .then((res) => {
            expect(res.body).toEqual({message: 'Invalid endpoint'})
        });
    });
});