define(['jquery'], ($) => {
    return {
        getUser: () => {
            const def = $.Deferred();
            require(['./app/user'], (user) => {
                def.resolve(user);
            });
            return def;
        }
    }
});