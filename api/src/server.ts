import app from './app';
import { killFirebase } from './firebase';

const port = process.env.API_PORT;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port} :)`);
});

export const killServer = () => {
  killFirebase();
  server.close(() => {
    console.log('Server has been killed :(');
  });
};

export default server;
