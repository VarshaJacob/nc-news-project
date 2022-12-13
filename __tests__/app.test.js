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
    test('responds with status code 200',() => {
        return request(app).get('/api/topics')
        .expect(200)
    });
    test('respond body will contain an array of topic objects',() => {
        return request(app).get('/api/topics')
        .then(({body}) => {
            expect(Array.isArray(body.topics)).toBe(true);
            expect(body.topics.length).toBe(3);
        });
    });
    test('respond topic will contain properties slug and description',() => {
        return request(app).get('/api/topics')
        .then(({body}) => {
            body.topics.forEach((obj) => {
                expect(Object.keys(obj)).toEqual(['slug','description'])
            })
        });
    });
});

//4
describe.only('GET /api/articles task 4',() => {
    test('responds with status code 200',() => {
        return request(app).get('/api/articles')
        .expect(200)
    });
    test('respond body will contain an array of article objects',() => {
        return request(app).get('/api/articles')
        .then(({body}) => {
            expect(Array.isArray(body)).toBe(true);
        });
    });
    test('respond body will contain the properties author,title,article_id,topic,created_at,votes,comment_count',() => {
        return request(app).get('/api/articles')
        .then(({body}) => {
            expect(Array.isArray(body)).toBe(true);
        });
    });
});