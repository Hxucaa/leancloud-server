/* eslint-disable import/no-require */

const domain = require("domain");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const AV = require("leanengine");
const sniper = require("leanengine-sniper");

// 上传至Leancloud后,不再通过babel进行编译
if (!(process.env.LC_APP_ENV === "stage" || process.env.LC_APP_ENV === "production")) {

  // babel 编译
  require("babel-core/register");
  require("babel-polyfill");
  // All modules after this line will be transpiled, but not the current file.
  // 在这句后面引入的模块，都将会自动通过 babel 编译，但当前文件不会被 babel 编译。
}

//import cloud from "./cloud.js";
const cloud = require("./cloud.js");

// 各个模块
const cors = require("./config/cors");
//const cookieSecret = require("./config/cookie");

const app = express();

// 设置 view 引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

// 加载云代码方法
app.use(cloud);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//app.use(AV.Cloud.CookieSession({ secret: cookieSecret.secret, maxAge: 3600000, fetchUser: true }));

// 详情请看: https://github.com/leancloud/leanengine-sniper
app.use(sniper({ AV }));

// 未处理异常捕获 middleware
app.use((req, res, next) => {
  var d = null; // eslint-disable-line no-var

  if (process.domain) {
    d = process.domain;
  }
  else {
    d = domain.create();
  }
  d.add(req);
  d.add(res);
  d.on("error", err => {
    console.error(
      "uncaughtException url=%s, msg=%s",
      req.url,
      err.stack || err.message || err
    );
    if (!res.finished) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json; charset=UTF-8");
      res.end("uncaughtException");
    }
  });
  d.run(next);
});

// 跨域支持
app.all("/api/*", (req, res, next) => {
  const origin = req.headers.origin;

  if (cors.whiteOrigins.indexOf(origin) !== -1) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  }
  next();
});

// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use((req, res, next) => {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    const statusCode = err.status || 500;

    if (statusCode === 500) {
      console.error(err.stack || err);
    }
    res.status(statusCode);
    res.json({
      message: err.message || err,
      error: err
    });
    //res.render("error", {
    //  message: err.message || err,
    //  error: err
    //})
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || err,
    error: {}
  });
  //res.render("error", {
  //  message: err.message || err,
  //  error: {}
  //})
});

module.exports = app;
