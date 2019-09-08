import {Users, UserModel} from './modle/user';
import {articalModel, ArticleCate} from './modle/article';

let users = new Users('lisile', '22222'); // Users { username: 'lisile', password: '22222' }
console.log(UserModel.add(users));

let articles = new ArticleCate('react', '框架', 123);
console.log(articalModel.add(articles)); // ArticleCate { title: 'react', desc: '框架', status: 123 }