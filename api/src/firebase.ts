import * as admin from 'firebase-admin';
const firebaseServiceAccount = require('../firebase-svc-acc-credentials.json');
const config = require('../config.json');

const { firebaseDatabaseUrl } = config;

if (!firebaseDatabaseUrl) {
  throw new Error('f1irebaseDatabaseUrl must be provided in /api/config.json');
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  databaseURL: firebaseDatabaseUrl,
});

const urls = 'urls';
const db = admin.database();

export const saveUrlToId = (
  id: string, url: string, timesAccessed: number = 0
) => db.ref(`${urls}/${id}`).set({ url, timesAccessed });

export const getUrlFromId = (id: string) => db.ref(`${urls}/${id}`).once('value')
  .then(((snapshot: admin.database.DataSnapshot) => {
    const result = (snapshot.val() && snapshot.val()) || {};
    const { url, timesAccessed } = result;

    if (url) {
      saveUrlToId(id, url, timesAccessed + 1);
    }

    return url;
  }));

export const killFirebase = () => admin.app().delete();
