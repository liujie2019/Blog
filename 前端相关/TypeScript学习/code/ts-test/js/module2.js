"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./modle/user");
var article_1 = require("./modle/article");
var users = new user_1.Users('lisile', '22222'); // Users { username: 'lisile', password: '22222' }
console.log(user_1.UserModel.add(users));
var articles = new article_1.ArticleCate('react', '框架', 123);
console.log(article_1.articalModel.add(articles)); // ArticleCate { title: 'react', desc: '框架', status: 123 }
