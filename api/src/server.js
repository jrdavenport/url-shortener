import app from './app'
import { killFirebase } from './firebase'

const port = process.env.API_PORT

var server = app.listen(port, function() {
  console.log(`Listening on port ${port} :)`);

});

export const killServer = () => {
  killFirebase()
  server.close(function() {
    console.log('Server has been killed :(');
  });
}

export default server