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
        .then(({body}) => {
            expect(body.topics.length).toBe(3);
            body.topics.forEach((topicObj) => {
                expect.objectContaining({
                    'slug': expect(typeof(topicObj['slug'])).toBe('string'),
                    'description': expect(typeof(topicObj['description'])).toBe('string')
                })
                // expect(Object.keys(obj)).toMatchObject(['description','slug'])
            })
        });
    });
});
