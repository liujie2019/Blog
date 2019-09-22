const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const {secretOrKey} = require('../config/constants');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                return done(err, false);
            });
    }));
};
/**
passport有策略(strategy)的概念，strategy是一些预定义的方法，它们会在请求抵达真正的路由之前执行。
如果你定义的strategy认定某个请求非法，则该路由不会被执行，而是返回401 Unauthorized。
*/