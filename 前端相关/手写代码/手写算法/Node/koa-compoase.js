function compose(middleware) {
    return function() {
      return dispatch(0)
      function dispatch(i) {
        let fn = middleware[i]
        if (!fn) return
        return fn(function next() {
          return dispatch(i + 1)
        })
      }
    }
  }