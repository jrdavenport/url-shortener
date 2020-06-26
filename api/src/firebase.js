const admin = require('firebase-admin');

const firebaseServiceAccount = require('../firebase-svc-acc-credentials.json');
const config = require('../config.json');

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: config.firebaseDatabaseUrl,
});

const urls = 'urls';
const db = admin.database();

export const saveUrlToId = (id, url, timesAccessed = 0) => db.ref(`${urls}/${id}`).set({ url, timesAccessed });

export const getUrlFromId = (id) => db.ref(`${urls}/${id}`).once('value')
  .then(((snapshot) => {
    const result = (snapshot.val() && snapshot.val()) || {};
    const { url, timesAccessed } = result;

    if (url) {
      saveUrlToId(id, url, timesAccessed + 1);
    }

    return url;
  }));

export const killFirebase = () => admin.app().delete();
