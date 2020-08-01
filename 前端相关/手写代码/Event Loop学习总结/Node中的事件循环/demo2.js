setTimeout(() => {
    console.log("timer1");

    Promise.resolve().then(function() {
      console.log("promise1");
    });
  }, 0);

  process.nextTick(() => {
    console.log("nextTick");
  });
  // nextTick, timer1, promise1
