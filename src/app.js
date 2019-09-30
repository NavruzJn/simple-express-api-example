const { createServer: createHttpServer } = require("./express");

process.setMaxListeners(0);

function start() {
  const httpServer = createHttpServer();

  httpServer.listen(process.env.PORT || 3000, httpServerError => {
    if (httpServerError) {
      console.error(httpServerError);
    } else {
      console.log("Server is running on 3000 port")
    }
  });
}

module.exports = start;
