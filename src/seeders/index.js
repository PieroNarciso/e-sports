const db = require('../db');
require('../models');

const main = () => {
  db.sync({ force: true }).then(() => {
    console.log('DB Connected');
    require('./usuario')()
      .then(() => {
        require('./equipos')()
          .then(() => {
            require('./torneos')()
              .then(() => {
                db.close().then(() => {
                  process.exit();
                });
              });
          });
      })
  });
}

main();
