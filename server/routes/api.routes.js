const apiRoutes = require("express").Router();
const usersRoute = require("./api/users.routes");
const roadsRoute = require("./api/roads.routes.js");
const authRoute = require("./auth.routes.js");
const tokensRouter = require("./token.routes");

apiRoutes.use("/users", usersRoute);
apiRoutes.use("/roads", roadsRoute);
apiRoutes.use("/auth", authRoute);
apiRoutes.use("/tokens", tokensRouter);

module.exports = apiRoutes;
