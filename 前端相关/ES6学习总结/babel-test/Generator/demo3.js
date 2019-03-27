function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
      yield [propKey, obj[propKey]];
    }
  }

  let jane = { first: 'Jane', last: 'Doe' };

  for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
  }