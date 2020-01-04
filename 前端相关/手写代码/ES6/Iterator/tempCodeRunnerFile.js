const hobbies = ['🏀', '⚽️', '🏉'];

hobbies.forEach(value => {
    if (value === 1) {
        break; // 报错
    }
    console.log(value);
});