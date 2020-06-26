import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  validUrl,
  generateId,
  formatUrl,
} from './helpers';
import {
  saveUrlToId,
  getUrlFromId,
} from './firebase';

const app = express();

const corsWhitelist = [
  undefined,
  'http://jrd.fyi',
  'https://jrd.fyi',
  'http://localhost',
  'http://localhost:3000',
  'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
];

const corsOptions = {
  origin(origin, callback) {
    const isAllowed = corsWhitelist.includes(origin);
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const respondWith = (res, status, message) => {
  res.status(status).send(message);
};

export const postShortenUrl = (req, res) => {
  const { url } = req.body;

  if (!url) {
    return respondWith(res, 400, 'No URL was provided to shorten.');
  }

  const id = generateId();

  if (!validUrl(url)) {
    return res.status(400).send('URL is not valid');
  }

  return getUrlFromId(id)
    .then((storedUrl) => {
      if (storedUrl) {
        // If ID has already been used, recursively call this function
        // to get a fresh id.
        return postShortenUrl(req, res);
      }

      const formattedUrl = formatUrl(url);

      return saveUrlToId(id, formattedUrl)
        .then(() => res.status(200).send({ id, url: formattedUrl }));
    });
};

export const getGetUrl = (req, res) => {
  const { id } = req.params;

  getUrlFromId(id)
    .then((url) => {
      if (!url) {
        return respondWith(res, 400, `No URL can be found for id '${id}'`);
      }
      return respondWith(res, 200, url);
    });
};

const redirectToUrl = (req, res) => {
  const id = req.url;

  return getUrlFromId(id)
    .then((storedUrl) => {
      res.redirect(storedUrl);
    });
};

app.get('/healthcheck', (req, res) => {
  respondWith(res, 200, 'OK');
});
app.post('/shortenUrl', postShortenUrl);
app.get('/getUrl/:id', getGetUrl);

app.get('*', redirectToUrl);

app.use((err, req, res) => {
  res.status(500).send(err.message || 'Oops - something went wrong!');
});

export default app;
