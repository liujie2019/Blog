setTimeout(() => {
    console.log(1);
  }, 0);

  new Promise((resolve, reject) => {
    resolve(2);
  }).then((data) => {
    console.log(data);
  });

  console.log(3);