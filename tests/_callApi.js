const request = require('supertest');
const app = require('../app');

async function callApi(route, body) {
    const res = await request(app.handler)
      .post(route)
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);

    return JSON.parse(res.text);
}

exports.callApi = callApi;