// console.log(ctx.req.path); // undefined  ctx.req = req
    // console.log(ctx.request.path); // /a ctx.request是koa自己封装的属性
    // console.log(ctx.request.req.path); // undefined  ctx.request.req = req
    // console.log(ctx.path);// /a 用ctx来代理一下ctx.request属性