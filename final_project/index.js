const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  console.log(token);

  jwt.verify(token.split(" ")[1], "secretkey", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
});

const PORT = 3098;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running at port " + PORT));
