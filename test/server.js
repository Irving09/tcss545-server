const app = require('../app');

function makeServer() {
  let port = 3000;
  return app.listen(port, function() {
    console.log('Starbox listening at port %s', port);
  });
};

module.exports = makeServer();