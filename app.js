"use strict";

const domain = require("domain");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cloud = require("./cloud.js");

const app = express();

// 各个模块
//const config = require("./config");

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


// 未处理异常捕获 middleware
app.use((req, res, next) => {
  var d = null;
  if (process.domain) {
    d = process.domain;
  }
  else {
    d = domain.create();
  }
  d.add(req);
  d.add(res);
  d.on("error", err => {
    console.error("uncaughtException url=%s, msg=%s", req.url, err.stack || err.message || err);
    if (!res.finished) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json; charset=UTF-8");
      res.end("uncaughtException");
    }
  });
  d.run(next);
});


// 如果任何路由都没匹配到，则认为 404
// 生成一个异常让后面的 err handler 捕获
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
if (app.get("env") === "development") {
  app.use((err, req, res, next) => { // jshint ignore:line
    var statusCode = err.status || 500;
    if (statusCode === 500) {
      console.error(err.stack || err);
    }
    res.status(statusCode);
    res.render("error", {
      message: err.message || err,
      error: err
    });
  });
}

// 如果是非开发环境，则页面只输出简单的错误信息
app.use((err, req, res, next) => { // jshint ignore:line
  res.status(err.status || 500);
  res.render("error", {
    message: err.message || err,
    error: {}
  });
});

module.exports = app;
