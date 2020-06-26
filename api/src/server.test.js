import supertest from 'supertest';
import server, { killServer} from './server';

const request = supertest(server)

describe('Express API', () => {
  afterAll((done) => {
    killServer(done)
  })

  describe('shortenUrl and getUrl', () => {
    test('gives an ID to a URL and can retrive URL from the ID', async (done) => {
      const targetUrl = `www.${Math.random()}.com`
      
      const postResponse = await request
        .post('/shortenUrl')
        .send({ url: targetUrl })
        .type('form')

      const postResult = JSON.parse(postResponse.text)

      expect(postResult.url).toBe(targetUrl)

      const getResult = await request.get(`/getUrl/${postResult.id}`)
      expect(getResult.text).toBe(targetUrl);
      done();
    });

    describe('shortenUrl', () => {
      test('', () => {
      })
    })

    describe('getUrl', () => {
      test('', () => {
      })
    })
  })
});
