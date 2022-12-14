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
            expect(res.body).toEqual({message: 'Invalid article ID'})
        });
    });
});