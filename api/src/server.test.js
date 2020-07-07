import supertest from 'supertest';
import server, { killServer } from './server.ts';

const request = supertest(server);

describe('Express API', () => {
  afterAll((done) => {
    killServer(done);
  });

  describe('shortenUrl and getUrl', () => {
    test('gives an ID to a URL and can retrive URL from the ID', async (done) => {
      const originalUrl = `www.${Math.random()}.com`;
      const displayedUrl = `http://${originalUrl}`;

      const postResponse = await request
        .post('/shortenUrl')
        .send({ url: originalUrl })
        .type('form');

      const postResult = JSON.parse(postResponse.text);

      expect(postResult.url).toBe(displayedUrl);

      const getResult = await request.get(`/getUrl/${postResult.id}`);
      expect(getResult.text).toBe(displayedUrl);
      done();
    });

    describe('shortenUrl', () => {
      test('', () => {
      });
    });

    describe('getUrl', () => {
      test('', () => {
      });
    });
  });
});
